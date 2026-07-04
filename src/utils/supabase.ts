/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClientInstance: SupabaseClient | null = null;

export function sanitizeEnvValue(val: string | undefined): string | undefined {
  if (!val) return undefined;
  let trimmed = val.trim();
  // Strip surrounding quotes if present
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    trimmed = trimmed.substring(1, trimmed.length - 1).trim();
  }
  return trimmed;
}

export function getSupabaseConfigError(): string | null {
  const rawUrl = import.meta.env.VITE_SUPABASE_URL;
  const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const url = sanitizeEnvValue(rawUrl);
  const key = sanitizeEnvValue(rawKey);

  if (!rawUrl && !rawKey) {
    return 'Supabase URL and Anon Key are missing from environment variables. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables in the Settings menu.';
  }
  if (!url) {
    return 'Supabase URL is missing or empty. Please add VITE_SUPABASE_URL to your environment variables in the Settings menu.';
  }
  if (!key) {
    return 'Supabase Anon Key is missing or empty. Please add VITE_SUPABASE_ANON_KEY to your environment variables in the Settings menu.';
  }

  // Check for common placeholders
  const placeholderPatterns = [
    'your_supabase_url',
    'your-supabase-url',
    'your_supabase_anon_key',
    'your-supabase-anon-key',
    'placeholder',
    'insert-your',
    '<your-',
    '[your-',
    '<project-id>',
    '[project-id]',
    'your-project',
    'your_project',
    'example.com'
  ];

  const lowerUrl = url.toLowerCase();
  const lowerKey = key.toLowerCase();

  for (const pattern of placeholderPatterns) {
    if (lowerUrl.includes(pattern)) {
      return `The configured Supabase URL "${url}" appears to be a placeholder ("${pattern}"). Please replace it with your actual Supabase Project URL in the Settings menu.`;
    }
    if (lowerKey.includes(pattern)) {
      return `The configured Supabase Anon Key appears to be a placeholder ("${pattern}"). Please replace it with your actual Supabase Anon Key in the Settings menu.`;
    }
  }

  // Check URL format
  if (!url.startsWith('https://') && !url.startsWith('http://')) {
    return `Invalid Supabase URL: "${url}". The URL must start with "https://" (or "http://" for local development).`;
  }

  try {
    new URL(url);
  } catch (e) {
    return `Invalid URL format for Supabase URL: "${url}". Please verify the URL structure.`;
  }

  // Check for spaces or newlines in key or URL
  if (/\s/.test(url)) {
    return `The Supabase URL contains whitespace characters (spaces or newlines). Please check and clean your environment variables in the Settings menu.`;
  }
  if (/\s/.test(key)) {
    return `The Supabase Anon Key contains whitespace characters (spaces or newlines). Please check and clean your environment variables in the Settings menu.`;
  }

  // Check if Anon Key is a valid JWT (Segment check)
  const keyParts = key.split('.');
  if (keyParts.length < 3) {
    return `The Supabase Anon Key format is invalid. A valid Supabase Anon Key must be a JSON Web Token (JWT) containing three dot-separated segments. Please make sure you copied the correct "anon" "public" key from your Supabase Dashboard API Settings.`;
  }

  return null;
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfigError() === null;
}

/**
 * Returns the lazily initialized Supabase client instance.
 * Handles missing credentials gracefully by warning instead of throwing on application startup,
 * and only errors if the client is actively accessed without credentials configured.
 */
export function getSupabase(): SupabaseClient {
  if (supabaseClientInstance) {
    return supabaseClientInstance;
  }

  const supabaseUrl = sanitizeEnvValue(import.meta.env.VITE_SUPABASE_URL);
  const supabaseAnonKey = sanitizeEnvValue(import.meta.env.VITE_SUPABASE_ANON_KEY);

  if (!isSupabaseConfigured()) {
    console.warn(
      'Supabase credentials are not configured. Please define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.'
    );
    // Return a dummy client proxy to prevent breaking module loading
    return new Proxy({} as SupabaseClient, {
      get() {
        throw new Error(
          'Supabase client accessed but credentials are not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
        );
      }
    });
  }

  console.log("SUPABASE URL RAW =", JSON.stringify(supabaseUrl));
  console.log("SUPABASE KEY RAW =", JSON.stringify(supabaseAnonKey));

  supabaseClientInstance = createClient(supabaseUrl!, supabaseAnonKey!);
  return supabaseClientInstance;
}

// Export a default lazy instance getter
export const supabase = {
  get client(): SupabaseClient {
    return getSupabase();
  }
};
