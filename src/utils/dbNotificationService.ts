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
    // 1. Check for localStorage cached notifications
    let cached: DbNotification[] = [];
    try {
      const stored = localStorage.getItem('patel_dental_notifications_cache');
      if (stored) {
        cached = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('[Notifications] Failed to parse local cached notifications:', e);
    }

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

      // Cache successfully fetched notifications
      try {
        localStorage.setItem('patel_dental_notifications_cache', JSON.stringify(mapped));
      } catch (e) {
        // ignore quota limits
      }

      return mapped;
    } catch (e: any) {
      console.warn('[Notifications] Failed to load notifications from database, using cached fallback:', e.message || e);
      return cached;
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
        const created: DbNotification = {
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

        // Cache the newly created notification locally
        try {
          const stored = localStorage.getItem('patel_dental_notifications_cache');
          let current: DbNotification[] = stored ? JSON.parse(stored) : [];
          current = [created, ...current];
          localStorage.setItem('patel_dental_notifications_cache', JSON.stringify(current));
        } catch (e) {
          // ignore
        }

        return created;
      }
      return null;
    } catch (e: any) {
      console.warn('[Notifications] Failed to create notification via Edge Function, creating local-only notification:', e.message || e);
      
      const localId = `notif-${Date.now()}`;
      const localNotif: DbNotification = {
        id: localId,
        appointment_id: notification.appointment_id,
        patient_name: notification.patient_name || 'Anonymous',
        mobile_number: notification.mobile_number || 'N/A',
        appointment_date: notification.appointment_date || 'N/A',
        appointment_time: notification.appointment_time || 'N/A',
        doctor: notification.doctor || 'To Be Assigned',
        is_read: false,
        created_at: new Date().toISOString(),
        title: 'New Booking Request',
        message: `Patient ${notification.patient_name} has booked a slot for ${notification.appointment_date || 'N/A'} at ${notification.appointment_time || 'N/A'}.`
      };

      try {
        const stored = localStorage.getItem('patel_dental_notifications_cache');
        let current: DbNotification[] = stored ? JSON.parse(stored) : [];
        current = [localNotif, ...current];
        localStorage.setItem('patel_dental_notifications_cache', JSON.stringify(current));
      } catch (err) {
        console.warn('[Notifications] Failed to cache local-only notification:', err);
      }

      return localNotif;
    }
  },

  /**
   * Marks a specific notification as read in Supabase.
   */
  markAsRead: async (id: string): Promise<boolean> => {
    try {
      // 1. Optimistically update local cache
      try {
        const stored = localStorage.getItem('patel_dental_notifications_cache');
        if (stored) {
          const cached: DbNotification[] = JSON.parse(stored);
          const updated = cached.map(n => {
            if (n.id === id || n.appointment_id === id) {
              return { ...n, is_read: true };
            }
            return n;
          });
          localStorage.setItem('patel_dental_notifications_cache', JSON.stringify(updated));
        }
      } catch (e) {
        console.warn('[Notifications] Failed to update local cache on markAsRead:', e);
      }

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
      console.warn(`[Notifications] Failed to mark notification ${id} as read in database:`, e.message || e);
      return true;
    }
  },

  /**
   * Marks all notifications as read in Supabase.
   */
  markAllAsRead: async (): Promise<boolean> => {
    try {
      // 1. Optimistically update local cache
      try {
        const stored = localStorage.getItem('patel_dental_notifications_cache');
        if (stored) {
          const cached: DbNotification[] = JSON.parse(stored);
          const updated = cached.map(n => ({ ...n, is_read: true }));
          localStorage.setItem('patel_dental_notifications_cache', JSON.stringify(updated));
        }
      } catch (e) {
        console.warn('[Notifications] Failed to update local cache on markAllAsRead:', e);
      }

      const { error } = await supabase.client
        .from('notifications')
        .update({ is_read: true })
        .neq('id', '00000000-0000-0000-0000-000000000000'); // matches everything since uuid is valid

      if (error) {
        throw error;
      }
      return true;
    } catch (e: any) {
      console.warn('[Notifications] Failed to mark all notifications as read in database:', e.message || e);
      return true;
    }
  },

  /**
   * Deletes/clears all notifications from Supabase.
   */
  clearAll: async (): Promise<boolean> => {
    try {
      // 1. Optimistically update local cache
      try {
        localStorage.removeItem('patel_dental_notifications_cache');
      } catch (e) {
        console.warn('[Notifications] Failed to clear local cache:', e);
      }

      const { error } = await supabase.client
        .from('notifications')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (error) {
        throw error;
      }
      return true;
    } catch (e: any) {
      console.warn('[Notifications] Failed to clear notifications in database:', e.message || e);
      return true;
    }
  }
};
