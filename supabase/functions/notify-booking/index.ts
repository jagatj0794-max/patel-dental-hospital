import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// In-memory rate limiting per IP address (10 requests per 60 seconds)
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;
const ipRequestStore = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestStore.get(ip);

  // Clean up expired entries if map gets too large
  if (ipRequestStore.size > 1000) {
    for (const [key, value] of ipRequestStore.entries()) {
      if (now > value.resetTime) {
        ipRequestStore.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    ipRequestStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PHONE_REGEX = /^[+\d\s()-]{7,20}$/;

function parseToSqlDate(dateStr?: string): string | null {
  if (!dateStr || dateStr === 'N/A') return null;
  const isoMatch = dateStr.match(/^\d{4}-\d{2}-\d{2}$/);
  if (isoMatch) return dateStr;
  const timestamp = Date.parse(dateStr);
  if (!isNaN(timestamp)) {
    return new Date(timestamp).toISOString().split('T')[0];
  }
  return null;
}

function parseToSqlTime(timeStr?: string): string | null {
  if (!timeStr || timeStr === 'N/A') return null;
  const firstPart = timeStr.split(/[-–]|to/)[0].trim();
  const match = firstPart.match(/(\d+)(?::(\d+))?\s*(AM|PM)?/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const ampm = match[3];
  if (ampm) {
    if (ampm.toUpperCase() === 'PM' && hours < 12) hours += 12;
    else if (ampm.toUpperCase() === 'AM' && hours === 12) hours = 0;
  }
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
}

async function logNotificationFailure(
  supabaseAdmin: any,
  appointmentId: string | null,
  errorMessage: string,
  retryCount = 0
) {
  try {
    if (!supabaseAdmin) return;
    await supabaseAdmin.from('notification_logs').insert([
      {
        appointment_id: appointmentId,
        error_message: errorMessage,
        created_at: new Date().toISOString(),
        retry_count: retryCount,
      }
    ]);
  } catch (logErr) {
    console.error('[Notify Booking] Failed to write failure log to notification_logs:', logErr);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Helper response builder
  const createResponse = (body: object, status: number) => {
    return new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  };

  let supabaseAdmin: any = null;
  let cleanApptId: string | null = null;

  try {
    // 1. Retrieve Env Variables inside Edge Function environment
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      return createResponse(
        { success: false, error: 'Server configuration error: Required env variables are missing.' },
        500
      );
    }

    // 2. Initialize Supabase Admin Client
    supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // 3. Rate Limiting Check
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      req.headers.get('cf-connecting-ip') ||
      'unknown';

    if (isRateLimited(clientIp)) {
      await logNotificationFailure(
        supabaseAdmin,
        null,
        'Rate limit exceeded. Too many requests. Please try again later.'
      );
      return createResponse(
        { success: false, error: 'Rate limit exceeded. Too many requests. Please try again later.' },
        429
      );
    }

    // 4. Parse JSON Body
    let body: any;
    try {
      body = await req.json();
    } catch (_e) {
      await logNotificationFailure(
        supabaseAdmin,
        null,
        'Malformed request: Invalid JSON body.'
      );
      return createResponse(
        { success: false, error: 'Malformed request: Invalid JSON body.' },
        400
      );
    }

    const {
      appointment_id,
      patient_name,
      patient_phone,
      mobile_number,
      doctor_name,
      doctor,
      appointment_date,
      appointment_time,
    } = body || {};

    const phone = (patient_phone || mobile_number || '').trim();
    const docName = (doctor_name || doctor || 'To Be Assigned').trim();

    // 5. Strict Field Validations
    if (!appointment_id || typeof appointment_id !== 'string' || !UUID_REGEX.test(appointment_id.trim())) {
      const errMsg = 'Field "appointment_id" is required and must be a valid UUID.';
      await logNotificationFailure(supabaseAdmin, null, errMsg);
      return createResponse({ success: false, error: errMsg }, 400);
    }

    cleanApptId = appointment_id.trim();

    if (!patient_name || typeof patient_name !== 'string' || patient_name.trim().length < 2 || patient_name.trim().length > 100) {
      const errMsg = 'Field "patient_name" is required and must be between 2 and 100 characters.';
      await logNotificationFailure(supabaseAdmin, cleanApptId, errMsg);
      return createResponse({ success: false, error: errMsg }, 400);
    }

    const cleanPatientName = patient_name.trim();

    if (!phone || !PHONE_REGEX.test(phone)) {
      const errMsg = 'Field "patient_phone" or "mobile_number" is required and must be a valid phone number (7-20 digits).';
      await logNotificationFailure(supabaseAdmin, cleanApptId, errMsg);
      return createResponse({ success: false, error: errMsg }, 400);
    }

    const sqlDate = parseToSqlDate(appointment_date);
    if (!sqlDate) {
      const errMsg = 'Field "appointment_date" is required and must be a valid date (e.g. YYYY-MM-DD).';
      await logNotificationFailure(supabaseAdmin, cleanApptId, errMsg);
      return createResponse({ success: false, error: errMsg }, 400);
    }

    const sqlTime = parseToSqlTime(appointment_time);
    if (!sqlTime) {
      const errMsg = 'Field "appointment_time" is required and must be a valid time.';
      await logNotificationFailure(supabaseAdmin, cleanApptId, errMsg);
      return createResponse({ success: false, error: errMsg }, 400);
    }

    // 6. Verify Referenced Appointment Exists
    const { data: existingAppt, error: apptErr } = await supabaseAdmin
      .from('appointments')
      .select('id')
      .eq('id', cleanApptId)
      .maybeSingle();

    if (apptErr) {
      console.error('[Notify Booking] Error checking appointments table:', apptErr);
      const errMsg = `Database error verifying referenced appointment: ${apptErr.message}`;
      await logNotificationFailure(supabaseAdmin, cleanApptId, errMsg);
      return createResponse({ success: false, error: 'Database error verifying referenced appointment.' }, 500);
    }

    if (!existingAppt) {
      const errMsg = `Referenced appointment with ID "${cleanApptId}" does not exist.`;
      await logNotificationFailure(supabaseAdmin, cleanApptId, errMsg);
      return createResponse({ success: false, error: errMsg }, 404);
    }

    // 7. Prevent Duplicate Notifications for the Same appointment_id
    const { data: existingNotif, error: notifErr } = await supabaseAdmin
      .from('notifications')
      .select('id, created_at')
      .eq('appointment_id', cleanApptId)
      .maybeSingle();

    if (notifErr) {
      console.error('[Notify Booking] Error checking duplicate notifications:', notifErr);
      const errMsg = `Database error checking duplicate notifications: ${notifErr.message}`;
      await logNotificationFailure(supabaseAdmin, cleanApptId, errMsg);
      return createResponse({ success: false, error: 'Database error checking duplicate notifications.' }, 500);
    }

    if (existingNotif) {
      const errMsg = 'Duplicate notification: A notification has already been created for this appointment.';
      await logNotificationFailure(supabaseAdmin, cleanApptId, errMsg);
      return createResponse(
        {
          success: false,
          error: errMsg,
          existing_id: existingNotif.id,
        },
        409
      );
    }

    // 8. Construct Payload and Insert Notification
    const title = `New Booking Request`;
    const message = `Patient ${cleanPatientName} has booked a slot for ${sqlDate} at ${appointment_time || 'N/A'}.`;

    const payload = {
      appointment_id: cleanApptId,
      title,
      message,
      patient_name: cleanPatientName,
      patient_phone: phone,
      doctor_name: docName,
      appointment_date: sqlDate,
      appointment_time: sqlTime,
      is_read: false,
    };

    const { data, error: insertErr } = await supabaseAdmin
      .from('notifications')
      .insert([payload])
      .select()
      .single();

    if (insertErr) {
      console.error('[Notify Booking] Insert error:', insertErr);
      const errMsg = `Failed to insert notification into database: ${insertErr.message}`;
      await logNotificationFailure(supabaseAdmin, cleanApptId, errMsg);
      return createResponse({ success: false, error: insertErr.message }, 500);
    }

    return createResponse({ success: true, data }, 200);
  } catch (err: any) {
    console.error('[Notify Booking Exception]', err);
    if (supabaseAdmin) {
      await logNotificationFailure(
        supabaseAdmin,
        cleanApptId,
        `Unhandled exception in notify-booking: ${err.message || 'Unknown error'}`
      );
    }
    return createResponse(
      { success: false, error: err.message || 'An unexpected error occurred.' },
      500
    );
  }
});

