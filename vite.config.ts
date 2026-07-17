import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
  let envUrl = 'https://wmgzhqtqmnddfjykaykm.supabase.co';
  let envKey = 'sb_publishable_Dp-26wBXw6LjWvRLtdUC3g_aO5tAjJW';

  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const lines = envContent.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('VITE_SUPABASE_URL=')) {
          envUrl = trimmed.substring('VITE_SUPABASE_URL='.length).trim();
        }
        if (trimmed.startsWith('VITE_SUPABASE_ANON_KEY=')) {
          envKey = trimmed.substring('VITE_SUPABASE_ANON_KEY='.length).trim();
        }
      }
    }
  } catch (err) {
    console.error('Error reading .env in config:', err);
  }

  // Strip possible surrounding quotes
  const cleanEnvValue = (val: string) => {
    let trimmed = val.trim();
    if (
      (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
      trimmed = trimmed.substring(1, trimmed.length - 1).trim();
    }
    return trimmed;
  };

  envUrl = cleanEnvValue(envUrl);
  envKey = cleanEnvValue(envKey);

  process.env.VITE_SUPABASE_URL = envUrl;
  process.env.VITE_SUPABASE_ANON_KEY = envKey;

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(envUrl),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(envKey),
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
