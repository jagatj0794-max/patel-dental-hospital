import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wmgzhqtqmnddfjykaykm.supabase.co';
const supabaseKey = 'sb_publishable_Dp-26wBXw6LjWvRLtdUC3g_aO5tAjJW';

const supabase = createClient(supabaseUrl, supabaseKey);

// Define the comprehensive alt text mapping for all 49 existing clinical case gallery images
const ALT_TEXT_MAPPINGS: Record<string, string> = {
  // === Tooth Coloured Filling (1 item) ===
  'gallery-item-1788240136337': 'Dr. Vipul Patel with a patient during a tooth coloured filling procedure at Patel Dental Hospital, Rajkot.',

  // === Wisdom Tooth Surgery (3 items) ===
  'gal-1786795694821': 'Dr. Vipul Patel performing a wisdom tooth surgery procedure on a patient at Patel Dental Hospital, Rajkot.',
  'gal-1786795724980': 'Dr. Vipul Patel explaining the wisdom tooth surgery steps using 3D digital imaging at Patel Dental Hospital, Rajkot.',
  'gal-1786795736987': 'Dr. Vipul Patel showing the clinical results of a successful wisdom tooth surgery at Patel Dental Hospital, Rajkot.',

  // === Braces Treatment (3 items) ===
  'gal-1786795605561': 'Dr. Vipul Patel examining a patient\'s orthodontic progress during braces treatment at Patel Dental Hospital, Rajkot.',
  'gal-1786795641540': 'Dr. Vipul Patel with a patient demonstrating orthodontic alignment during braces treatment at Patel Dental Hospital, Rajkot.',
  'gal-1786795654670': 'Dr. Vipul Patel showing the dental correction results of a braces treatment at Patel Dental Hospital, Rajkot.',

  // === Invisible Aligners (1 item) ===
  'gal-1786794185082': 'Dr. Vipul Patel presenting custom transparent aligners for invisible aligner treatment to a patient at Patel Dental Hospital, Rajkot.',

  // === Dental Implants (19 items) ===
  'gallery-item-1785737235879': 'Dr. Vipul Patel demonstrating a state-of-the-art dental implant treatment clinical case at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737249567': 'Dr. Vipul Patel consulting with a patient about advanced dental implant treatment options at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737265882': 'Dr. Vipul Patel reviewing a 3D digital CBCT scan for dental implant treatment planning at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737279825': 'Dr. Vipul Patel preparing the digital surgical guide for dental implant treatment at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737295981': 'Dr. Vipul Patel performing a precise, computer-guided dental implant treatment procedure at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737314672': 'Dr. Vipul Patel explaining the stability of titanium anchors in dental implant treatment at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737414201': 'Dr. Vipul Patel showing the prosthetic tooth attachment phase of a dental implant treatment at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737439490': 'Dr. Vipul Patel examining a patient\'s healed gums post-procedure during dental implant treatment at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737458575': 'Dr. Vipul Patel demonstrating the screw-retained mechanism of a dental implant treatment at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737479634': 'Dr. Vipul Patel presenting a successful single-tooth dental implant treatment result at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737496558': 'Dr. Vipul Patel with a patient smiling after completing their dental implant treatment at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737514298': 'Dr. Vipul Patel explaining post-treatment care for patients undergoing dental implant treatment at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737534018': 'Dr. Vipul Patel demonstrating the aesthetics of high-strength zirconia crowns in dental implant treatment at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737595616': 'Dr. Vipul Patel using advanced intraoral scanning technology for dental implant treatment at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737621002': 'Dr. Vipul Patel checking bite alignment after finishing a dental implant treatment procedure at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737639201': 'Dr. Vipul Patel presenting a multi-unit dental implant treatment clinical case at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737661323': 'Dr. Vipul Patel showing a comparison of natural teeth with advanced dental implant treatment at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737679129': 'Dr. Vipul Patel with a patient expressing their satisfaction with dental implant treatment at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785737698086': 'Dr. Vipul Patel highlighting the long-term success of premium dental implant treatment at Patel Dental Hospital, Rajkot.',

  // === Crowns & Bridges (1 item) ===
  'gal-1785823080484': 'Dr. Vipul Patel demonstrating advanced ceramic bridge fitting for crowns and bridges treatment at Patel Dental Hospital, Rajkot.',

  // === Root Canal Treatment (5 items) ===
  'gallery-item-1785785700414': 'Dr. Vipul Patel performing high-precision root canal treatment on a patient using an operating microscope at Patel Dental Hospital, Rajkot.',
  'gallery-item-1785785710540': 'Dr. Vipul Patel utilizing an electronic apex locator during root canal treatment at Patel Dental Hospital, Rajkot.',
  'gallery-item-1786794342112': 'Dr. Vipul Patel demonstrating a clean and sealed root canal treatment case on digital x-ray at Patel Dental Hospital, Rajkot.',
  'gallery-item-1786794352211': 'Dr. Vipul Patel with a patient discussing a comfortable, pain-free root canal treatment at Patel Dental Hospital, Rajkot.',
  'gallery-item-1786794362610': 'Dr. Vipul Patel presenting a successfully restored tooth following root canal treatment at Patel Dental Hospital, Rajkot.',

  // === Smile Makeover (8 items) ===
  'gal-1786794448412': 'Dr. Vipul Patel analyzing facial symmetry and aesthetics during a custom smile makeover consultation at Patel Dental Hospital, Rajkot.',
  'gal-1786794486395': 'Dr. Vipul Patel designing a custom smile makeover utilizing Digital Smile Design (DSD) software at Patel Dental Hospital, Rajkot.',
  'gal-1786794497445': 'Dr. Vipul Patel fitting cosmetic porcelain veneers on a patient during a smile makeover at Patel Dental Hospital, Rajkot.',
  'gal-1786794507219': 'Dr. Vipul Patel with a patient verifying tooth shade and translucency during a smile makeover at Patel Dental Hospital, Rajkot.',
  'gal-1786794519260': 'Dr. Vipul Patel demonstrating custom-made aesthetic restorations for a Hollywood smile makeover at Patel Dental Hospital, Rajkot.',
  'gal-1786794532139': 'Dr. Vipul Patel performing a minimally invasive tooth-colored resin sculpting procedure for a smile makeover at Patel Dental Hospital, Rajkot.',
  'gal-1786794547540': 'Dr. Vipul Patel with a patient showcasing the final transformation of a custom smile makeover at Patel Dental Hospital, Rajkot.',
  'gal-1786794553521': 'Dr. Vipul Patel highlighting the dramatic aesthetic improvement of a completed smile makeover at Patel Dental Hospital, Rajkot.',

  // === Full Mouth Rehabilitation (3 items) ===
  'gal-1786794017199': 'Dr. Vipul Patel reviewing dental implant and restorative alignment for a full mouth rehabilitation case at Patel Dental Hospital, Rajkot.',
  'gal-1786794145096': 'Dr. Vipul Patel examining a patient\'s occlusion and bite dynamics during full mouth rehabilitation at Patel Dental Hospital, Rajkot.',
  'gal-1785786563840': 'Dr. Vipul Patel presenting the finalized fixed-prosthesis results of a full mouth rehabilitation at Patel Dental Hospital, Rajkot.',

  // === Pediatric Dentistry (4 items) ===
  'gal-1785825741734': 'Dr. Vipul Patel providing a gentle, child-friendly check-up during a pediatric dental treatment at Patel Dental Hospital, Rajkot.',
  'gal-1785825772325': 'Dr. Vipul Patel educating a child and parent on correct oral hygiene during a pediatric dental treatment at Patel Dental Hospital, Rajkot.',
  'gal-1785825788498': 'Dr. Vipul Patel demonstrating protective sealant application during a pediatric dental treatment at Patel Dental Hospital, Rajkot.',
  'gal-1785825818471': 'Dr. Vipul Patel with a happy child patient after completing a pediatric dental treatment at Patel Dental Hospital, Rajkot.',

  // === Teeth Whitening (1 item) ===
  'gal-1785838619078': 'Dr. Vipul Patel performing a professional, clinically guided teeth whitening procedure for a patient at Patel Dental Hospital, Rajkot.'
};

async function run() {
  console.log('Retrieving all existing services from Supabase...');
  const { data: services, error } = await supabase.from('services').select('id, title, slug, marketing_config');
  if (error) {
    console.error('Error retrieving services:', error);
    process.exit(1);
  }

  let totalPagesChecked = 0;
  let totalImagesChecked = 0;
  let totalNewPopulated = 0;
  let totalPreserved = 0;
  let hasFailedUpdates = false;

  for (const s of services) {
    totalPagesChecked++;
    const mc = s.marketing_config || {};
    const gi = mc.gallery_items || [];
    let isModified = false;

    console.log(`Checking service: "${s.title}" (slug: ${s.slug}), gallery images count: ${gi.length}`);

    for (const item of gi) {
      totalImagesChecked++;
      const targetAlt = ALT_TEXT_MAPPINGS[item.id];
      if (targetAlt) {
        if (!item.alt_text || item.alt_text.trim() === '') {
          item.alt_text = targetAlt;
          totalNewPopulated++;
          isModified = true;
          console.log(`  -> Populated Alt Text for item: ${item.id}`);
        } else {
          totalPreserved++;
          console.log(`  -> Preserved existing Alt Text for item: ${item.id} ("${item.alt_text}")`);
        }
      } else {
        console.warn(`  -> No Alt Text mapping found for item ID: ${item.id}`);
      }
    }

    if (isModified) {
      console.log(`Saving updated marketing_config for "${s.title}" to Supabase database...`);
      const { error: updateError } = await supabase
        .from('services')
        .update({ marketing_config: mc })
        .eq('id', s.id);

      if (updateError) {
        console.error(`  -> Failed to update service ID ${s.id}:`, updateError.message);
        hasFailedUpdates = true;
      } else {
        console.log(`  -> Successfully updated service "${s.title}" in database.`);
      }
    } else {
      console.log(`  -> No modifications required for "${s.title}".`);
    }
  }

  console.log('\n==================================================');
  console.log('POPULATION RUN SUMMARY:');
  console.log(`- Service Pages Checked: ${totalPagesChecked}`);
  console.log(`- Clinical Case Gallery Images Checked: ${totalImagesChecked}`);
  console.log(`- New Alt Text Values Populated: ${totalNewPopulated}`);
  console.log(`- Existing Alt Text Values Preserved: ${totalPreserved}`);
  console.log(`- Database Persistence Status: ${hasFailedUpdates ? 'PARTIAL/FAILED' : 'SUCCESS (100% Persisted)'}`);
  console.log('==================================================\n');

  if (hasFailedUpdates) {
    process.exit(1);
  }
}

run();
