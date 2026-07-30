import { supabase } from './supabase';

export interface DbNotification {
  id: string;
  appointment_id?: string;
  patient_name: string;
  mobile_number?: string;
  appointment_date?: string;
  appointment_time?: string;
  doctor?: string;
  is_read: boolean;
  created_at: string;
  title?: string;
  message?: string;
}

// Helpers to format inputs to match strict DATE and TIME column structures in Supabase
function parseTimeToSqlTime(timeStr?: string): string | null {
  if (!timeStr) return null;
  const firstPart = timeStr.split(/[-–]|to/)[0].trim();
  const match = firstPart.match(/(\d+)(?::(\d+))?\s*(AM|PM)?/i);
  if (!match) return null;
  
  let hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const ampm = match[3];
  
  if (ampm) {
    if (ampm.toUpperCase() === 'PM' && hours < 12) {
      hours += 12;
    } else if (ampm.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }
  }
  
  const hStr = String(hours).padStart(2, '0');
  const mStr = String(minutes).padStart(2, '0');
  return `${hStr}:${mStr}:00`;
}

function parseDateToSqlDate(dateStr?: string): string | null {
  if (!dateStr || dateStr === 'N/A') return null;
  const match = dateStr.match(/^\d{4}-\d{2}-\d{2}$/);
  if (match) return dateStr;
  
  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) {
    return new Date(parsed).toISOString().split('T')[0];
  }
  return null;
}

function formatSqlTimeToUserTime(timeStr: string): string {
  if (!timeStr) return 'N/A';
  const parts = timeStr.split(':');
  if (parts.length < 2) return timeStr;
  let hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  if (isNaN(hours) || isNaN(minutes)) return timeStr;
  
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;
  
  const hStr = String(hours).padStart(2, '0');
  const mStr = String(minutes).padStart(2, '0');
  
  const endHours = (hours === 12 ? 1 : hours + 1);
  const endAmpm = (hours === 11 ? (ampm === 'AM' ? 'PM' : 'AM') : ampm);
  const endHStr = String(endHours).padStart(2, '0');
  
  return `${hStr}:${mStr} ${ampm} - ${endHStr}:${mStr} ${endAmpm}`;
}

function isUuid(str?: string): boolean {
  if (!str) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
}

export const dbNotificationService = {
  /**
   * Fetches all notifications from the Supabase public.notifications table.
   */
  getNotifications: async (): Promise<DbNotification[]> => {
    try {
      const { data, error } = await supabase.client
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const mapped: DbNotification[] = (data || []).map((row: any) => ({
        id: row.id,
        appointment_id: row.appointment_id || undefined,
        patient_name: row.patient_name || 'Anonymous',
        mobile_number: row.patient_phone || 'N/A',
        appointment_date: row.appointment_date || 'N/A',
        appointment_time: row.appointment_time ? formatSqlTimeToUserTime(row.appointment_time) : 'N/A',
        doctor: row.doctor_name || 'To Be Assigned',
        is_read: !!row.is_read,
        created_at: row.created_at || new Date().toISOString(),
        title: row.title,
        message: row.message
      }));

      return mapped;
    } catch (e: any) {
      console.error('[Notifications] Failed to load notifications from database:', e);
      throw e;
    }
  },

  /**
   * Creates a new notification in Supabase by invoking the 'notify-booking' Edge Function.
   * Direct inserts from the browser are disabled by security policies.
   */
  createNotification: async (notification: Omit<DbNotification, 'id' | 'created_at' | 'is_read'>): Promise<DbNotification | null> => {
    const rawApptId = notification.appointment_id;
    const validatedApptId = isUuid(rawApptId) ? rawApptId : null;

    const payload = {
      appointment_id: validatedApptId,
      patient_name: notification.patient_name || 'Anonymous',
      patient_phone: notification.mobile_number || 'N/A',
      doctor_name: notification.doctor || 'To Be Assigned',
      appointment_date: notification.appointment_date,
      appointment_time: notification.appointment_time
    };

    try {
      console.log('[Notifications] Invoking Edge Function "notify-booking" to securely create notification...');
      const { data, error } = await supabase.client.functions.invoke('notify-booking', {
        body: payload
      });

      if (error) {
        throw error;
      }

      if (data && data.success && data.data) {
        const row = data.data;
        return {
          id: row.id,
          appointment_id: row.appointment_id || undefined,
          patient_name: row.patient_name,
          mobile_number: row.patient_phone,
          appointment_date: row.appointment_date,
          appointment_time: row.appointment_time ? formatSqlTimeToUserTime(row.appointment_time) : 'N/A',
          doctor: row.doctor_name,
          is_read: !!row.is_read,
          created_at: row.created_at,
          title: row.title,
          message: row.message
        };
      }
      return null;
    } catch (e: any) {
      console.error('[Notifications] Failed to create notification via Edge Function:', e);
      throw e;
    }
  },

  /**
   * Marks a specific notification as read in Supabase.
   */
  markAsRead: async (id: string): Promise<boolean> => {
    try {
      const isNotificationUuid = isUuid(id);
      
      let query = supabase.client.from('notifications').update({ is_read: true });
      if (isNotificationUuid) {
        query = query.or(`id.eq.${id},appointment_id.eq.${id}`);
      } else {
        query = query.eq('appointment_id', id);
      }

      const { error } = await query;

      if (error) throw error;
      return true;
    } catch (e: any) {
      console.error(`[Notifications] Failed to mark notification ${id} as read in database:`, e);
      throw e;
    }
  },

  /**
   * Marks all notifications as read in Supabase.
   */
  markAllAsRead: async (): Promise<boolean> => {
    try {
      const { error } = await supabase.client
        .from('notifications')
        .update({ is_read: true })
        .neq('id', '00000000-0000-0000-0000-000000000000'); // matches everything since uuid is valid

      if (error) {
        throw error;
      }
      return true;
    } catch (e: any) {
      console.error('[Notifications] Failed to mark all notifications as read in database:', e);
      throw e;
    }
  },

  /**
   * Deletes/clears all notifications from Supabase.
   */
  clearAll: async (): Promise<boolean> => {
    try {
      const { error } = await supabase.client
        .from('notifications')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (error) {
        throw error;
      }
      return true;
    } catch (e: any) {
      console.error('[Notifications] Failed to clear notifications in database:', e);
      throw e;
    }
  }
};
