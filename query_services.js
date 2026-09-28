import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://wmgzhqtqmnddfjykaykm.supabase.co';
const supabaseKey = 'sb_publishable_Dp-26wBXw6LjWvRLtdUC3g_aO5tAjJW';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('id, title, slug, marketing_config');
      
    if (error) {
      console.error('Error:', error);
      return;
    }
    
    const results = [];
    for (const service of data) {
      let mConfig = service.marketing_config;
      if (typeof mConfig === 'string') {
        try {
          mConfig = JSON.parse(mConfig);
        } catch(e) {
          mConfig = {};
        }
      }
      
      const beforeAfterPairs = mConfig?.before_after_pairs || [];
      results.push({
        id: service.id,
        title: service.title,
        slug: service.slug,
        pairs: beforeAfterPairs
      });
    }
    
    fs.writeFileSync('services-ba.json', JSON.stringify(results, null, 2));
    console.log('Successfully wrote services-ba.json');
  } catch (err) {
    console.error('Exception:', err);
  }
}

run();
