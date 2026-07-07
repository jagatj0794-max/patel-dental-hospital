-- Migration script for the Videos module
-- Create videos table
CREATE TABLE IF NOT EXISTS public.videos (
  id text PRIMARY KEY, -- YouTube Video ID
  title text NOT NULL,
  treatment text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Select policy (Allow public read access)
CREATE POLICY "Allow public read access to videos" ON public.videos
  FOR SELECT USING (true);

-- Write policy (Allow all write operations)
CREATE POLICY "Allow all write operations to videos" ON public.videos
  FOR ALL USING (true) WITH CHECK (true);
