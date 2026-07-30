-- Migration script for social_service table
-- Create social_service table with UUID primary key
CREATE TABLE IF NOT EXISTS public.social_service (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  title text,
  description text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.social_service ENABLE ROW LEVEL SECURITY;

-- Drop previous policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public read access to social_service" ON public.social_service;
DROP POLICY IF EXISTS "Allow all write operations to social_service" ON public.social_service;
DROP POLICY IF EXISTS "Allow insert access to social_service" ON public.social_service;
DROP POLICY IF EXISTS "Allow update access to social_service" ON public.social_service;
DROP POLICY IF EXISTS "Allow delete access to social_service" ON public.social_service;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON public.social_service;
DROP POLICY IF EXISTS "Enable select for anonymous users" ON public.social_service;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.social_service;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.social_service;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.social_service;

-- Create policies for authenticated users
CREATE POLICY "Enable select for authenticated users" ON public.social_service
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.social_service
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON public.social_service
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users" ON public.social_service
  FOR DELETE TO authenticated USING (true);

-- Enable select for anonymous users (so public frontend page is able to display records)
CREATE POLICY "Enable select for anonymous users" ON public.social_service
  FOR SELECT TO anon USING (true);
