-- Migration script for unified gallery table (Smile Gallery + General Media)
-- Create unified gallery table
CREATE TABLE IF NOT EXISTS public.gallery (
  id text PRIMARY KEY,
  item_type text NOT NULL, -- 'general' or 'smile'
  url text NOT NULL,
  title text,
  category text,
  branch text,
  alt_text text,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Select policy (Allow anyone to read)
CREATE POLICY "Allow public read access to gallery" ON public.gallery
  FOR SELECT USING (true);

-- All write operations policy (Allow authenticated / public insert/update/delete for the app's needs)
CREATE POLICY "Allow all write operations to gallery" ON public.gallery
  FOR ALL USING (true) WITH CHECK (true);
