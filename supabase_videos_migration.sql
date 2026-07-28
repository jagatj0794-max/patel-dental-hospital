-- Complete Migration script for Videos module and Supabase Storage RLS configuration
-- 1. Create public.videos table if it does not exist
CREATE TABLE IF NOT EXISTS public.videos (
  id text PRIMARY KEY, -- YouTube Video ID, Instagram Reel ID, or MP4 URL
  title text NOT NULL,
  treatment text NOT NULL,
  display_order integer DEFAULT 0,
  "videoPlatform" text DEFAULT 'youtube', -- youtube, instagram, or mp4
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure videoPlatform column exists if table was previously created without it
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS "videoPlatform" text DEFAULT 'youtube';

-- Enable Row Level Security (RLS) on public.videos
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Drop previous policies on public.videos to avoid conflicts
DROP POLICY IF EXISTS "Allow public read access to videos" ON public.videos;
DROP POLICY IF EXISTS "Allow all write operations to videos" ON public.videos;
DROP POLICY IF EXISTS "Allow insert access to videos" ON public.videos;
DROP POLICY IF EXISTS "Allow update access to videos" ON public.videos;
DROP POLICY IF EXISTS "Allow delete access to videos" ON public.videos;

-- Create SELECT policy (Allow public and authenticated read access)
CREATE POLICY "Allow public read access to videos" ON public.videos
  FOR SELECT USING (true);

-- Create INSERT policy (Allow authenticated admin users and app upload operations)
CREATE POLICY "Allow insert access to videos" ON public.videos
  FOR INSERT WITH CHECK (true);

-- Create UPDATE policy (Allow update operations on videos table)
CREATE POLICY "Allow update access to videos" ON public.videos
  FOR UPDATE USING (true) WITH CHECK (true);

-- Create DELETE policy (Allow delete operations on videos table)
CREATE POLICY "Allow delete access to videos" ON public.videos
  FOR DELETE USING (true);

-- Create ALL write operations policy
CREATE POLICY "Allow all write operations to videos" ON public.videos
  FOR ALL USING (true) WITH CHECK (true);


-- 2. Storage Bucket & Storage Objects RLS Policies
-- Ensure the 'media' storage bucket exists in storage.buckets and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Enable Row Level Security on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing storage policies for media bucket if present
DROP POLICY IF EXISTS "Allow public select access to media bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow upload access to media bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow update access to media bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete access to media bucket" ON storage.objects;

-- Storage SELECT policy: Allow public read access to objects in 'media' bucket
CREATE POLICY "Allow public select access to media bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

-- Storage INSERT policy: Allow upload access to objects in 'media' bucket
CREATE POLICY "Allow upload access to media bucket" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'media');

-- Storage UPDATE policy: Allow update access to objects in 'media' bucket
CREATE POLICY "Allow update access to media bucket" ON storage.objects
  FOR UPDATE USING (bucket_id = 'media') WITH CHECK (bucket_id = 'media');

-- Storage DELETE policy: Allow delete access to objects in 'media' bucket
CREATE POLICY "Allow delete access to media bucket" ON storage.objects
  FOR DELETE USING (bucket_id = 'media');
