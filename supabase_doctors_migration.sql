-- Migration script for Doctors directory
-- Create doctors table
CREATE TABLE IF NOT EXISTS public.doctors (
  id text PRIMARY KEY,
  name text NOT NULL,
  titles text,
  designation text,
  img text,
  brief_intro text,
  quote text,
  bds_year text,
  bds_institution text,
  stats jsonb DEFAULT '[]'::jsonb,
  expertises jsonb DEFAULT '[]'::jsonb,
  branch text DEFAULT 'Gayatrinagar Branch',
  experience text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

-- Select policy (Allow public read access)
CREATE POLICY "Allow public read access to doctors" ON public.doctors
  FOR SELECT USING (true);

-- Write policy (Allow all write operations)
CREATE POLICY "Allow all write operations to doctors" ON public.doctors
  FOR ALL USING (true) WITH CHECK (true);
