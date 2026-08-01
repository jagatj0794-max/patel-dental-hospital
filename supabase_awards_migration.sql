-- Complete Clean Reset SQL Migration for Awards Module
DROP TABLE IF EXISTS public.awards CASCADE;

CREATE TABLE public.awards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable select for authenticated users" ON public.awards FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable select for anonymous users" ON public.awards FOR SELECT TO anon USING (true);
CREATE POLICY "Enable insert for authenticated users" ON public.awards FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable insert for anonymous users" ON public.awards FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users" ON public.awards FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable update for anonymous users" ON public.awards FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete for authenticated users" ON public.awards FOR DELETE TO authenticated USING (true);
CREATE POLICY "Enable delete for anonymous users" ON public.awards FOR DELETE TO anon USING (true);
