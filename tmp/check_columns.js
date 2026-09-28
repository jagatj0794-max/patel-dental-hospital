import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Key missing in environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTable(tableName) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('alt_text')
      .limit(1);
    
    if (error) {
      if (error.code === '42703') {
        console.log(`Table "${tableName}" does NOT have alt_text column.`);
      } else {
        console.log(`Table "${tableName}" select alt_text returned error:`, error.message, error.code);
      }
    } else {
      console.log(`Table "${tableName}" has alt_text column.`);
    }
  } catch (err) {
    console.error(`Error checking table "${tableName}":`, err);
  }
}

async function run() {
  const tables = ['social_service', 'technology', 'doctors', 'awards', 'services'];
  for (const table of tables) {
    await checkTable(table);
  }
}

run();
