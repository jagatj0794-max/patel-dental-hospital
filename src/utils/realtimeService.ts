import { supabase } from './supabase';

export interface RealtimeAppointmentPayload {
  id: string;
  patientName: string;
  mobileNumber: string;
  appointmentDate: string;
  appointmentTime: string;
  doctor: string;
}

export const realtimeService = {
  /**
   * Triggers a real-time broadcast notification event for a newly created appointment.
   * This serves as an immediate delivery mechanism alongside Postgres INSERT replication.
   */
  triggerNewAppointment: async (appointment: RealtimeAppointmentPayload): Promise<boolean> => {
    try {
      console.log('[RealtimeService] Triggering real-time broadcast for:', appointment);
      
      const channel = supabase.client.channel('appointments-realtime');
      
      return new Promise<boolean>((resolve) => {
        channel.subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            try {
              const response = await channel.send({
                type: 'broadcast',
                event: 'new-appointment',
                payload: {
                  id: appointment.id,
                  patient_name: appointment.patientName,
                  mobile_number: appointment.mobileNumber,
                  appointment_date: appointment.appointmentDate,
                  appointment_time: appointment.appointmentTime,
                  doctor: appointment.doctor
                }
              });
              console.log('[RealtimeService] Broadcast sent successfully:', response);
              resolve(true);
            } catch (sendErr) {
              console.error('[RealtimeService] Error during channel.send:', sendErr);
              resolve(false);
            }
          } else if (status === 'CHANNEL_ERROR') {
            console.warn('[RealtimeService] Realtime channel subscription failed.');
            resolve(false);
          }
        });
      });
    } catch (err) {
      console.error('[RealtimeService] Exception during broadcast trigger:', err);
      return false;
    }
  }
};
