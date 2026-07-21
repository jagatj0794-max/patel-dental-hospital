-- Production-safe migration script for services table (Non-destructive)
-- This script only adds the missing columns if they do not already exist.
-- It does NOT drop, recreate, or modify any existing tables, data, or RLS security policies.

-- Add missing text columns to public.services
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS homepage_card_image text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS homepage_short_description text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS hero_title text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS hero_description text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS hero_image_caption text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS intro_title text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS intro_description text;

-- Add missing jsonb/structured columns to public.services
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS process_steps jsonb;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS features jsonb;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS content_images jsonb;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS patient_testimonials jsonb;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS hospital_team_photos jsonb;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS marketing_config jsonb;

-- Add procedure video columns to public.services
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS procedure_video_url text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS procedure_video_title text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS procedure_video_description text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS procedure_video_thumbnail text;
