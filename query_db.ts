import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL || '';
const key = process.env.VITE_SUPABASE_ANON_KEY || '';

console.log('Querying Supabase at:', url);

async function run() {
  const supabase = createClient(url, key);
  
  console.log('--- Database Tables ---');
  const { data: videos, error: tableError } = await supabase
    .from('videos')
    .select('*');

  if (tableError) {
    console.error('Error fetching videos:', tableError);
  } else {
    console.log(`Videos table exists. Found ${videos?.length} videos.`);
    console.log(JSON.stringify(videos, null, 2));
  }

  // Probe other tables
  for (const table of ['service_gallery', 'service_faqs', 'gallery', 'awards']) {
    const { data, error } = await supabase.from(table).select('*').limit(5);
    if (error) {
      console.log(`Table "${table}" might not exist or error:`, error.message);
    } else {
      console.log(`Table "${table}" exists. Row count limit 5:`, data?.length);
      if (table === 'awards') {
        console.log(JSON.stringify(data, null, 2));
      }
    }
  }

  console.log('--- Testing direct INSERT into awards table ---');
  const testId = 'test-award-' + Date.now();
  const testRow = {
    id: testId,
    title: 'Test Clinical Award ' + new Date().getFullYear(),
    image_url: 'https://example.com/test.jpg',
    display_order: 1,
    is_active: true
  };
  console.log('Payload:', testRow);
  const { data: insertData, error: insertError } = await supabase
    .from('awards')
    .insert(testRow)
    .select();
  
  if (insertError) {
    console.error('Test INSERT into awards failed:', insertError);
  } else {
    console.log('Test INSERT into awards succeeded! Returned row:', insertData);
    
    console.log('--- Cleaning up test row from awards ---');
    const { error: deleteError } = await supabase
      .from('awards')
      .delete()
      .eq('id', testId);
    console.log('Cleanup error (if any):', deleteError);
  }

  console.log('--- Testing direct INSERT into gallery table ---');
  const testGalleryId = 'test-gallery-' + Date.now();
  const testGalleryRow = {
    id: testGalleryId,
    item_type: 'general',
    url: 'https://example.com/test-gallery.jpg',
    title: 'Test Gallery Item',
    category: 'Interior',
    branch: 'amin_marg',
    display_order: 1
  };
  const { data: galleryInsert, error: galleryError } = await supabase
    .from('gallery')
    .insert(testGalleryRow)
    .select();

  if (galleryError) {
    console.error('Test INSERT into gallery failed:', galleryError);
  } else {
    console.log('Test INSERT into gallery succeeded:', galleryInsert);
    console.log('--- Cleaning up test row from gallery ---');
    await supabase.from('gallery').delete().eq('id', testGalleryId);
  }
}

run();
