-- Create the international patients gallery table
CREATE TABLE IF NOT EXISTS public.international_patients_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  storage_path text,
  alt_text text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.international_patients_gallery ENABLE ROW LEVEL SECURITY;

-- 1. SELECT Policy: Allow read access to both anonymous and authenticated users (public)
CREATE POLICY "Allow public read access" ON public.international_patients_gallery
  FOR SELECT TO anon, authenticated USING (true);

-- 2. INSERT Policy: Restricted to authenticated users only
CREATE POLICY "Allow authenticated insert" ON public.international_patients_gallery
  FOR INSERT TO authenticated WITH CHECK (true);

-- 3. UPDATE Policy: Restricted to authenticated users only
CREATE POLICY "Allow authenticated update" ON public.international_patients_gallery
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- 4. DELETE Policy: Restricted to authenticated users only
CREATE POLICY "Allow authenticated delete" ON public.international_patients_gallery
  FOR DELETE TO authenticated USING (true);

-- Create automatic trigger to update the updated_at timestamp on record updates
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_international_patients_gallery_updated_at
  BEFORE UPDATE ON public.international_patients_gallery
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
