-- Create the dental tourism before after gallery table
CREATE TABLE IF NOT EXISTS public.dental_tourism_before_after (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  treatment_name text NOT NULL,
  before_image_url text NOT NULL,
  before_storage_path text,
  after_image_url text NOT NULL,
  after_storage_path text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.dental_tourism_before_after ENABLE ROW LEVEL SECURITY;

-- 1. SELECT Policy: Allow read access to both anonymous and authenticated users (public)
CREATE POLICY "Allow public read access" ON public.dental_tourism_before_after
  FOR SELECT TO anon, authenticated USING (true);

-- 2. INSERT Policy: Restricted to authenticated users only
CREATE POLICY "Allow authenticated insert" ON public.dental_tourism_before_after
  FOR INSERT TO authenticated WITH CHECK (true);

-- 3. UPDATE Policy: Restricted to authenticated users only
CREATE POLICY "Allow authenticated update" ON public.dental_tourism_before_after
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- 4. DELETE Policy: Restricted to authenticated users only
CREATE POLICY "Allow authenticated delete" ON public.dental_tourism_before_after
  FOR DELETE TO authenticated USING (true);

-- Create automatic trigger to update the updated_at timestamp on record updates
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_dental_tourism_before_after_updated_at ON public.dental_tourism_before_after;
CREATE TRIGGER update_dental_tourism_before_after_updated_at
  BEFORE UPDATE ON public.dental_tourism_before_after
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
