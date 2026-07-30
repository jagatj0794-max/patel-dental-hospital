/**
 * Patel Dental Hospital - WhatsApp Notification Service Abstraction
 * Formulates and prepares JSON payloads for WhatsApp API integrations
 * (including WhatsApp Cloud API, Twilio WhatsApp API, and Meta Business Suite API).
 */

export interface WhatsAppPayload {
  patientName: string;
  mobileNumber: string;
  doctorName: string;
  date: string;
  time: string;
}

export const whatsappNotificationService = {
  /**
   * Prepares and stages a WhatsApp notification payload without hardcoding any specific API key.
   * Logs payloads for WhatsApp Cloud API, Twilio WhatsApp API, and Meta Business API.
   * @param payload Payload containing patientName, mobileNumber, doctorName, date, time
   */
  sendWhatsAppNotification: async (payload: WhatsAppPayload): Promise<boolean> => {
    console.log('[NotificationService] Preparing WhatsApp notification for appointment:', payload);

    try {
      // 1. WhatsApp Cloud API Payload Structure (Reference)
      const cloudApiPayload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: payload.mobileNumber.startsWith('+') ? payload.mobileNumber : `+91${payload.mobileNumber.replace(/\D/g, '')}`,
        type: "template",
        template: {
          name: "appointment_confirmation",
          language: {
            code: "en_US"
          },
          components: [
            {
              type: "header",
              parameters: [
                {
                  type: "text",
                  text: "Patel Dental Hospital"
                }
              ]
            },
            {
              type: "body",
              parameters: [
                { type: "text", text: payload.patientName },
                { type: "text", text: payload.doctorName },
                { type: "text", text: payload.date },
                { type: "text", text: payload.time }
              ]
            }
          ]
        }
      };

      // 2. Twilio WhatsApp API Payload Structure (Reference)
      const twilioPayload = {
        from: "whatsapp:+14155238886", // Twilio Sandbox Number
        to: `whatsapp:${payload.mobileNumber.startsWith('+') ? payload.mobileNumber : `+91${payload.mobileNumber.replace(/\D/g, '')}`}`,
        body: `Dear ${payload.patientName}, your appointment at Patel Dental Hospital with ${payload.doctorName} is successfully booked on ${payload.date} at ${payload.time}.`
      };

      // 3. Meta Business Suite API Payload Structure (Reference)
      const metaBusinessPayload = {
        messaging_type: "MESSAGE_TAG",
        tag: "CONFIRMED_EVENT_UPDATE",
        recipient: {
          phone_number: payload.mobileNumber.startsWith('+') ? payload.mobileNumber : `+91${payload.mobileNumber.replace(/\D/g, '')}`
        },
        message: {
          text: `Hello ${payload.patientName}, your dental appointment with ${payload.doctorName} is confirmed for ${payload.date} at ${payload.time}. Thank you for choosing Patel Dental Hospital.`
        }
      };

      // Print prepared payloads in standard console log format
      console.group('--- WhatsApp Notification Service Payload Stage ---');
      console.log('Patient Name:', payload.patientName);
      console.log('Mobile Number:', payload.mobileNumber);
      console.log('Doctor Name:', payload.doctorName);
      console.log('Date:', payload.date);
      console.log('Time:', payload.time);
      console.log('[Payload Target] WhatsApp Cloud API:', JSON.stringify(cloudApiPayload, null, 2));
      console.log('[Payload Target] Twilio API:', JSON.stringify(twilioPayload, null, 2));
      console.log('[Payload Target] Meta Business API:', JSON.stringify(metaBusinessPayload, null, 2));
      console.groupEnd();

      return true;
    } catch (error) {
      console.error('[NotificationService] Error building WhatsApp notification payloads:', error);
      return false;
    }
  }
};
