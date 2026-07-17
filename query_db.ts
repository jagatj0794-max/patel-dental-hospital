import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL || '';
const key = process.env.VITE_SUPABASE_ANON_KEY || '';

console.log('Querying Supabase at:', url);

async function run() {
  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching services:', error);
    return;
  }

  console.log('--- Database Services Count ---');
  console.log(`Total count of services: ${data?.length}`);
  console.log('--- List of Services in Database ---');
  data?.forEach((s, idx) => {
    console.log(`${idx + 1}. ID: "${s.id}" | Title: "${s.title}" | Slug: "${s.slug}" | Active: ${s.is_active} | Order: ${s.display_order}`);
  });
}

run();
