-- Complete Migration script for Awards module and Supabase Storage RLS configuration
-- 1. Create public.awards table if it does not exist with all required fields
CREATE TABLE IF NOT EXISTS public.awards (
  id text PRIMARY KEY,
  title text NOT NULL,
  image_url text NOT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on public.awards
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;

-- Drop previous policies on public.awards to avoid conflicts
DROP POLICY IF EXISTS "Allow public read access to awards" ON public.awards;
DROP POLICY IF EXISTS "Allow all write operations to awards" ON public.awards;
DROP POLICY IF EXISTS "Allow insert access to awards" ON public.awards;
DROP POLICY IF EXISTS "Allow update access to awards" ON public.awards;
DROP POLICY IF EXISTS "Allow delete access to awards" ON public.awards;

-- Create SELECT policy (Allow public and authenticated read access)
CREATE POLICY "Allow public read access to awards" ON public.awards
  FOR SELECT USING (true);

-- Create INSERT policy (Allow insert access to awards for anyone/anon)
CREATE POLICY "Allow insert access to awards" ON public.awards
  FOR INSERT WITH CHECK (true);

-- Create UPDATE policy (Allow update access to awards for anyone/anon)
CREATE POLICY "Allow update access to awards" ON public.awards
  FOR UPDATE USING (true) WITH CHECK (true);

-- Create DELETE policy (Allow delete access to awards for anyone/anon)
CREATE POLICY "Allow delete access to awards" ON public.awards
  FOR DELETE USING (true);

-- Create ALL write operations policy (Allows full admin capabilities without Auth session lock)
CREATE POLICY "Allow all write operations to awards" ON public.awards
  FOR ALL USING (true) WITH CHECK (true);
