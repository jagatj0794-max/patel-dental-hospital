-- Migration script for notification_logs table (Admin-Only Audit Log)
CREATE TABLE IF NOT EXISTS public.notification_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id uuid NULL,
  error_message text NOT NULL,
  retry_count integer DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.notification_logs ENABLE ROW LEVEL SECURITY;

-- Revoke all default privileges from public/anon
REVOKE ALL ON public.notification_logs FROM public, anon;

-- Create policies for authenticated users (Administrators)
CREATE POLICY "Enable select for authenticated users" ON public.notification_logs
  FOR SELECT TO authenticated USING (true);

-- No insert/update/delete policies for anon or authenticated; service_role (Edge Function) bypasses RLS to write failure logs safely.

-- Indexes for rapid administrative querying
CREATE INDEX IF NOT EXISTS notification_logs_created_at_idx ON public.notification_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS notification_logs_appointment_id_idx ON public.notification_logs (appointment_id);
