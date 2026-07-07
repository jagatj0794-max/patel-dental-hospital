-- Migration script for the Contact module
-- Create contact table
CREATE TABLE IF NOT EXISTS public.contact_info (
  id text PRIMARY KEY DEFAULT 'default',
  phone text NOT NULL,
  phone_raw text NOT NULL,
  whatsapp text NOT NULL,
  whatsapp_raw text NOT NULL,
  email text NOT NULL,
  address text NOT NULL,
  maps_link text NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

-- Select policy (Allow public read access)
CREATE POLICY "Allow public read access to contact_info" ON public.contact_info
  FOR SELECT USING (true);

-- Write policy (Allow all write operations)
CREATE POLICY "Allow all write operations to contact_info" ON public.contact_info
  FOR ALL USING (true) WITH CHECK (true);
