import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wmgzhqtqmnddfjykaykm.supabase.co';
const supabaseKey = 'sb_publishable_Dp-26wBXw6LjWvRLtdUC3g_aO5tAjJW';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const tables = ['doctors', 'gallery', 'technology', 'social_service', 'awards', 'services', 'international_patients_gallery'];
  for (const table of tables) {
    try {
      // Fetch one row from each table
      const { data, error } = await supabase.from(table).select('*').limit(1);
      if (error) {
        console.log(`Table ${table} error:`, error.message);
      } else {
        console.log(`Table ${table} sample row keys:`, data[0] ? Object.keys(data[0]) : '(empty table)');
      }
    } catch (e) {
      console.log(`Table ${table} exception:`, e.message);
    }
  }
}

run();
