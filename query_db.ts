import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL || '';
const key = process.env.VITE_SUPABASE_ANON_KEY || '';

console.log('Querying Supabase at:', url);

async function run() {
  const supabase = createClient(url, key);
  
  console.log('--- Database Tables ---');
  const { data: services, error: tableError } = await supabase
    .from('services')
    .select('*');

  if (tableError) {
    console.error('Error fetching services:', tableError);
  } else {
    console.log(`Services table exists. Found ${services?.length} services.`);
    console.log(JSON.stringify(services, null, 2));
  }

  // Probe other tables
  for (const table of ['service_gallery', 'service_faqs', 'gallery']) {
    const { error } = await supabase.from(table).select('id').limit(1);
    if (error) {
      console.log(`Table "${table}" might not exist or error:`, error.message);
    } else {
      console.log(`Table "${table}" exists.`);
    }
  }
}

run();
