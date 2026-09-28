-- Migration: Add alt text columns to dental_tourism_before_after table
-- Highly backward-compatible and safe: uses ADD COLUMN IF NOT EXISTS to prevent duplicates or failures

ALTER TABLE public.dental_tourism_before_after
  ADD COLUMN IF NOT EXISTS before_alt_text text NULL,
  ADD COLUMN IF NOT EXISTS after_alt_text text NULL;

-- Enable public read and authenticated write access rules (already handled by RLS policies, but ensures columns are fully queried and upserted safely)
-- Note: Do NOT execute this query directly; it is provided as a static SQL schema update script for administrative use.
