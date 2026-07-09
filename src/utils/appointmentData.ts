/**
 * Patel Dental Hospital - Appointments Data Layer
 * Handles state, typescript interfaces, filters, and local storage synchronization.
 */

import { supabase } from './supabase';

export interface AdminAppointment {
  id: string;
  patientName: string;
  mobileNumber: string;
  email: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  doctor: string;       // Dr. Kinjal Patel, Dr. Vipul Patel
  branch: 'Gayatrinagar Branch' | 'Amin Marg Branch';
  service: string;      // e.g. Root Canal, Wisdom Tooth Extraction, Dental Implant, Aligners, Braces
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // e.g. 10:30 AM, 04:30 PM
  bookingDate: string;     // YYYY-MM-DD (date of creation)
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  symptoms: string;
  notes: string;
}

export interface AppointmentFilters {
  searchPatient: string;
  searchMobile: string;
  doctor: string;
  branch: string;
  status: string;
  date: string;
}

export interface AppointmentStats {
  todayAppointments: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  doctorsAvailable: number;
}

function mapDbToAppointment(row: any): AdminAppointment {
  return {
    id: row.id,
    patientName: row.patient_name,
    mobileNumber: row.mobile_number,
    email: row.email || '',
    age: row.age || 0,
    gender: row.gender || 'Male',
    doctor: row.doctor || 'To Be Assigned',
    branch: row.branch,
    service: row.service,
    appointmentDate: row.appointment_date,
    appointmentTime: row.appointment_time,
    bookingDate: row.booking_date,
    status: row.status || 'Pending',
    symptoms: row.symptoms || '',
    notes: row.notes || '',
  };
}

function mapAppointmentToDb(apt: Partial<AdminAppointment>): any {
  const row: any = {};
  if (apt.id) row.id = apt.id;
  if (apt.patientName !== undefined) row.patient_name = apt.patientName;
  if (apt.mobileNumber !== undefined) row.mobile_number = apt.mobileNumber;
  if (apt.email !== undefined) row.email = apt.email;
  if (apt.age !== undefined) row.age = apt.age;
  if (apt.gender !== undefined) row.gender = apt.gender;
  if (apt.doctor !== undefined) row.doctor = apt.doctor;
  if (apt.branch !== undefined) row.branch = apt.branch;
  if (apt.service !== undefined) row.service = apt.service;
  if (apt.appointmentDate !== undefined) row.appointment_date = apt.appointmentDate;
  if (apt.appointmentTime !== undefined) row.appointment_time = apt.appointmentTime;
  if (apt.bookingDate !== undefined) row.booking_date = apt.bookingDate;
  if (apt.status !== undefined) row.status = apt.status;
  if (apt.symptoms !== undefined) row.symptoms = apt.symptoms;
  if (apt.notes !== undefined) row.notes = apt.notes;
  return row;
}

export const appointmentService = {
  /**
   * Fetches all appointments from Supabase
   */
  getAllAppointments: async (): Promise<AdminAppointment[]> => {
    try {
      const { data, error } = await supabase.client
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching appointments from Supabase:', error);
        return [];
      }

      return (data || []).map(mapDbToAppointment);
    } catch (e) {
      console.error('Exception fetching appointments:', e);
      return [];
    }
  },

  /**
   * Saves list (no-op, kept for historical compatibility)
   */
  saveAppointments: async (appointments: AdminAppointment[]): Promise<void> => {
    // No-op for compatibility
  },

  /**
   * Update status of an appointment
   */
  updateStatus: async (id: string, status: AdminAppointment['status']): Promise<AdminAppointment[]> => {
    try {
      const { error } = await supabase.client
        .from('appointments')
        .update({ status })
        .eq('id', id);

      if (error) {
        console.error('Error updating status on Supabase:', error);
      }
    } catch (e) {
      console.error('Exception updating status:', e);
    }
    return appointmentService.getAllAppointments();
  },

  /**
   * Save (Update or Create) an appointment
   */
  saveAppointment: async (appointment: AdminAppointment): Promise<AdminAppointment[]> => {
    try {
      const dbRow = mapAppointmentToDb(appointment);
      
      const { data: existing, error: checkError } = await supabase.client
        .from('appointments')
        .select('id')
        .eq('id', appointment.id)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase.client
          .from('appointments')
          .update(dbRow)
          .eq('id', appointment.id);
        if (error) console.error('Error updating appointment on Supabase:', error);
      } else {
        const { error } = await supabase.client
          .from('appointments')
          .insert(dbRow);
        if (error) console.error('Error inserting appointment on Supabase:', error);
      }
    } catch (e) {
      console.error('Exception saving appointment:', e);
    }
    return appointmentService.getAllAppointments();
  },

  /**
   * Computes dashboard statistics from appointments list
   */
  getStats: (appointments: AdminAppointment[]): AppointmentStats => {
    const todayStr = '2026-07-05';
    const todayApts = appointments.filter(apt => apt.appointmentDate === todayStr);

    return {
      todayAppointments: todayApts.length,
      pending: appointments.filter(apt => apt.status === 'Pending').length,
      confirmed: appointments.filter(apt => apt.status === 'Confirmed').length,
      completed: appointments.filter(apt => apt.status === 'Completed').length,
      cancelled: appointments.filter(apt => apt.status === 'Cancelled').length,
      doctorsAvailable: 2 // Dr. Kinjal Patel & Dr. Vipul Patel
    };
  },

  /**
   * Reset appointments
   */
  resetToDefault: async (): Promise<AdminAppointment[]> => {
    try {
      const { error } = await supabase.client
        .from('appointments')
        .delete()
        .neq('id', '');
      if (error) console.error('Error resetting appointments on Supabase:', error);
    } catch (e) {
      console.error('Exception resetting appointments:', e);
    }
    return [];
  },

  /**
   * Fetches the booked timeslots for a given date and branch
   */
  getBookedSlots: async (date: string, branch: string): Promise<string[]> => {
    try {
      if (!date || !branch) return [];
      const { data, error } = await supabase.client
        .from('appointments')
        .select('appointment_time')
        .eq('appointment_date', date)
        .eq('branch', branch)
        .neq('status', 'Cancelled');

      if (error) {
        console.error('Error fetching booked slots:', error);
        return [];
      }
      return (data || []).map(row => row.appointment_time);
    } catch (e) {
      console.error('Exception in getBookedSlots:', e);
      return [];
    }
  },

  /**
   * Checks if a specific slot is available (not booked by a non-cancelled appointment)
   */
  isSlotAvailable: async (date: string, timeSlot: string, branch: string): Promise<boolean> => {
    try {
      if (!date || !timeSlot || !branch) return false;
      const { data, error } = await supabase.client
        .from('appointments')
        .select('id')
        .eq('appointment_date', date)
        .eq('appointment_time', timeSlot)
        .eq('branch', branch)
        .neq('status', 'Cancelled')
        .limit(1);

      if (error) {
        console.error('Error checking slot availability:', error);
        return false;
      }
      return (data || []).length === 0;
    } catch (e) {
      console.error('Exception in isSlotAvailable:', e);
      return false;
    }
  },

  /**
   * Refreshes booked slots and returns available slots based on full timeslots list
   */
  refreshBookedSlots: async (date: string, branch: string, allSlots: string[]): Promise<string[]> => {
    const booked = await appointmentService.getBookedSlots(date, branch);
    return allSlots.filter(slot => !booked.includes(slot));
  }
};
