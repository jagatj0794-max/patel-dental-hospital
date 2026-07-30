-- Migration script for technology table
-- Create technology table with UUID primary key
CREATE TABLE IF NOT EXISTS public.technology (
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
ALTER TABLE public.technology ENABLE ROW LEVEL SECURITY;

-- Drop previous policies to avoid conflicts
DROP POLICY IF EXISTS "Enable select for authenticated users" ON public.technology;
DROP POLICY IF EXISTS "Enable select for anonymous users" ON public.technology;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.technology;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.technology;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.technology;

-- Create policies for authenticated users
CREATE POLICY "Enable select for authenticated users" ON public.technology
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.technology
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON public.technology
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users" ON public.technology
  FOR DELETE TO authenticated USING (true);

-- Enable select for anonymous users (so public frontend page is able to display records)
CREATE POLICY "Enable select for anonymous users" ON public.technology
  FOR SELECT TO anon USING (true);
