-- Migration script for Services CMS (Phase 1)

-- 1. Create Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id text PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  short_description text NOT NULL,
  description text NOT NULL,
  hero_image text NOT NULL,
  icon text,
  display_order integer DEFAULT 0 NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Service Gallery Table
CREATE TABLE IF NOT EXISTS public.service_gallery (
  id text PRIMARY KEY,
  service_id text NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text,
  alt_text text,
  display_order integer DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Service FAQs Table
CREATE TABLE IF NOT EXISTS public.service_faqs (
  id text PRIMARY KEY,
  service_id text NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  display_order integer DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_faqs ENABLE ROW LEVEL SECURITY;

-- 4. Set up Policies for services
CREATE POLICY "Allow public read access to services" ON public.services
  FOR SELECT USING (true);

CREATE POLICY "Allow all operations to services" ON public.services
  FOR ALL USING (true) WITH CHECK (true);

-- 5. Set up Policies for service_gallery
CREATE POLICY "Allow public read access to service_gallery" ON public.service_gallery
  FOR SELECT USING (true);

CREATE POLICY "Allow all operations to service_gallery" ON public.service_gallery
  FOR ALL USING (true) WITH CHECK (true);

-- 6. Set up Policies for service_faqs
CREATE POLICY "Allow public read access to service_faqs" ON public.service_faqs
  FOR SELECT USING (true);

CREATE POLICY "Allow all operations to service_faqs" ON public.service_faqs
  FOR ALL USING (true) WITH CHECK (true);
