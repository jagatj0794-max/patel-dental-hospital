import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://wmgzhqtqmnddfjykaykm.supabase.co';
const supabaseKey = 'sb_publishable_Dp-26wBXw6LjWvRLtdUC3g_aO5tAjJW';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  try {
    // 1. Fetch dental tourism before after
    const { data: dtData, error: dtErr } = await supabase
      .from('dental_tourism_before_after')
      .select('*')
      .order('display_order', { ascending: true });
      
    // 2. Fetch services
    const { data: svData, error: svErr } = await supabase
      .from('services')
      .select('id, title, slug, marketing_config')
      .order('id', { ascending: true });

    console.log('DT Count:', dtData?.length);
    console.log('SV Count:', svData?.length);

    const report = {
      dt: dtData || [],
      sv: svData || []
    };

    fs.writeFileSync('ba-report.json', JSON.stringify(report, null, 2));
    console.log('Successfully wrote ba-report.json');
  } catch (err) {
    console.error('Exception:', err);
  }
}

run();
