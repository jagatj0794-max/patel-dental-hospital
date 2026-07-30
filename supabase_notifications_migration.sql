-- Migration script for the Notifications table with Authenticated-Only security
-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id uuid NULL,
  title text NOT NULL,
  message text NOT NULL,
  patient_name text,
  patient_phone text,
  doctor_name text,
  appointment_date date,
  appointment_time time without time zone,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Revoke all default privileges from the public/anonymous role to secure the table
REVOKE ALL ON public.notifications FROM public, anon;

-- Drop all old permissive policies
DROP POLICY IF EXISTS "Enable select for everyone" ON public.notifications;
DROP POLICY IF EXISTS "Enable insert for everyone" ON public.notifications;
DROP POLICY IF EXISTS "Enable update for everyone" ON public.notifications;
DROP POLICY IF EXISTS "Enable delete for everyone" ON public.notifications;

DROP POLICY IF EXISTS "Enable select for authenticated users" ON public.notifications;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.notifications;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.notifications;

-- Create policies for authenticated users (Administrators who have successfully logged in via Supabase Auth)
CREATE POLICY "Enable select for authenticated users" ON public.notifications
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable update for authenticated users" ON public.notifications
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users" ON public.notifications
  FOR DELETE TO authenticated USING (true);

-- No INSERT policies are created for 'anon' or 'authenticated' roles, ensuring only service_role (Edge Functions) can insert.

-- Create indexes for performance and rapid querying
CREATE INDEX IF NOT EXISTS notifications_created_at_idx ON public.notifications (created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_is_read_idx ON public.notifications (is_read);
CREATE INDEX IF NOT EXISTS notifications_appointment_id_idx ON public.notifications (appointment_id);
