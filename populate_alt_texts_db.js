import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://wmgzhqtqmnddfjykaykm.supabase.co';
const supabaseKey = 'sb_publishable_Dp-26wBXw6LjWvRLtdUC3g_aO5tAjJW';

const supabase = createClient(supabaseUrl, supabaseKey);

// 5 descriptive patient smile templates
const smileDescriptions = [
  'Patient smiling happily with a bright, healthy smile after successful dental treatment at Patel Dental Hospital, Rajkot.',
  'Happy dental patient showing a restored smile after receiving professional care at Patel Dental Hospital, Rajkot.',
  'A smiling patient posing with the dentist at Patel Dental Hospital in Rajkot following treatment.',
  'Dental patient showing a confident, healthy smile after expert cosmetic dental care at Patel Dental Hospital.',
  'Pleased patient sharing a bright smile following a comfortable dental visit and successful rehabilitation.'
];

async function populate() {
  try {
    console.log('--- STARTING ALT TEXT POPULATION ---');
    const scan = JSON.parse(fs.readFileSync('db-scan.json', 'utf8'));
    
    let totalUpdated = 0;

    // 1. Doctors
    console.log('Populating Doctors...');
    for (const doc of scan.doctors) {
      let alt = '';
      if (doc.id === 'kinjal') {
        alt = 'Dr. Kinjal Patel, cosmetic and aesthetic dentist, posing at Patel Dental Hospital, Rajkot.';
      } else if (doc.id === 'vipul') {
        alt = 'Dr. Vipul Patel, senior maxillofacial surgeon and implantologist, at Patel Dental Hospital, Rajkot.';
      }
      
      if (alt && doc.alt_text !== alt) {
        const { error } = await supabase.from('doctors').update({ alt_text: alt }).eq('id', doc.id);
        if (error) console.error(`Error updating doctor ${doc.id}:`, error);
        else {
          console.log(`Updated Doctor ${doc.id}`);
          totalUpdated++;
        }
      }
    }

    // 2. Gallery
    console.log('Populating Gallery...');
    let smileCounter = 0;
    for (const item of scan.gallery) {
      let alt = item.alt_text || '';
      
      if (!alt) {
        if (item.item_type === 'general') {
          const titleLower = (item.title || '').toLowerCase();
          if (titleLower.includes('implant')) {
            if (titleLower.includes('double')) {
              alt = 'Intraoral photograph showing double dental implants at Patel Dental Hospital, Rajkot.';
            } else {
              alt = 'Dental treatment photograph showing dental implant reconstruction at Patel Dental Hospital, Rajkot.';
            }
          } else if (titleLower.includes('fmr') || titleLower.includes('teeth')) {
            alt = 'Full mouth dental rehabilitation case treatment outcome at Patel Dental Hospital, Rajkot.';
          } else if (titleLower.includes('rct')) {
            alt = 'Root canal treatment procedure showing advanced microscopic endodontics at Patel Dental Hospital, Rajkot.';
          } else if (titleLower.includes('single implant')) {
            alt = 'Single dental implant replacement case showing a natural-looking crown on a stable titanium implant at Patel Dental Hospital, Rajkot.';
          } else if (titleLower.includes('smile design')) {
            alt = 'Aesthetic smile makeover showing cosmetic dental veneers at Patel Dental Hospital, Rajkot.';
          } else if (titleLower.includes('wisdom')) {
            alt = 'Wisdom tooth surgery procedure condition showing impacted tooth removal at Patel Dental Hospital, Rajkot.';
          } else if (titleLower.includes('nri')) {
            alt = 'International patient smiling with Dr. Vipul Patel after successful dental treatment at Patel Dental Hospital, Rajkot.';
          } else if (item.title === 'Before & After Smile Transformation') {
            alt = 'Smile transformation before and after orthodontic and cosmetic dental treatment.';
          } else if (item.title === 'Microscopic Dental Diagnostics') {
            alt = 'Microscopic dental diagnostics equipment setup inside the clinic at Patel Dental Hospital, Rajkot.';
          } else if (item.title === 'High-Tech Dental Operatory') {
            alt = 'High-tech dental operatory surgery room setup with advanced dental chair.';
          } else if (item.title === 'Clinical Medical Faculty') {
            alt = 'Team of experienced dentists and clinical medical faculty at Patel Dental Hospital, Rajkot.';
          } else if (item.title === 'Premium Patient Care Ward') {
            alt = 'Premium recovery ward and patient care room with modern facilities.';
          } else if (item.title === 'Expert Consultation Panel') {
            alt = 'Expert dentist consultation meeting and dental care planning area.';
          } else {
            alt = `Dental clinic gallery moment showing ${item.title || 'treatment'} at Patel Dental Hospital, Rajkot.`;
          }
        } else if (item.item_type === 'smile') {
          alt = smileDescriptions[smileCounter % smileDescriptions.length];
          smileCounter++;
        }

        if (alt) {
          const { error } = await supabase.from('gallery').update({ alt_text: alt }).eq('id', item.id);
          if (error) console.error(`Error updating gallery ${item.id}:`, error);
          else {
            console.log(`Updated Gallery ${item.id} -> ${alt}`);
            totalUpdated++;
          }
        }
      }
    }

    // 3. Technology
    console.log('Populating Technology...');
    for (const tech of scan.technology) {
      let alt = tech.alt_text || '';
      if (!alt) {
        const title = tech.title || '';
        if (title.includes('Chair')) {
          alt = 'Advanced dental treatment chair inside the modern operatory of Patel Dental Hospital, Rajkot.';
        } else if (title.includes('Implant')) {
          alt = 'Advanced physiodispenser implant surgery system used for high-precision dental implant procedures.';
        } else if (title.includes('Piezoelectric')) {
          alt = 'Piezoelectric surgical unit for high-precision, minimally invasive bone surgery.';
        } else if (title.includes('Scanner')) {
          alt = 'Digital intraoral scanner used for 3D digital impressions and custom crown design.';
        } else if (title.includes('Microscope')) {
          alt = 'Advanced dental operating microscope for high-magnification root canal diagnostics.';
        } else if (title.includes('CBCT') || title.includes('3D')) {
          alt = 'Digital CBCT 3D scanner for advanced dental imaging and diagnostics.';
        } else {
          alt = `${title} used for state-of-the-art dental treatments at Patel Dental Hospital, Rajkot.`;
        }

        if (alt) {
          const { error } = await supabase.from('technology').update({ alt_text: alt }).eq('id', tech.id);
          if (error) console.error(`Error updating technology ${tech.id}:`, error);
          else {
            console.log(`Updated Technology ${tech.id} -> ${alt}`);
            totalUpdated++;
          }
        }
      }
    }

    // 4. Social Service
    console.log('Populating Social Service...');
    for (const soc of scan.social_service) {
      let alt = soc.alt_text || '';
      if (!alt) {
        const title = soc.title || '';
        if (title && !title.startsWith('http')) {
          if (title.includes('Camp')) {
            alt = `Free dental awareness and diagnostics camp conducted by Patel Dental Hospital for the community in Rajkot.`;
          } else if (title.includes('Campaign')) {
            alt = `Community oral health screening and hygiene promotion campaign conducted by dentists.`;
          } else if (title.includes('School') || title.includes('Screening')) {
            alt = `School oral health screening and dental hygiene awareness activity with students.`;
          } else {
            alt = `${title} community social service activity conducted by Patel Dental Hospital.`;
          }
        } else {
          alt = 'Community oral health awareness and dental hygiene diagnostics camp conducted in Rajkot.';
        }

        if (alt) {
          const { error } = await supabase.from('social_service').update({ alt_text: alt }).eq('id', soc.id);
          if (error) console.error(`Error updating social_service ${soc.id}:`, error);
          else {
            console.log(`Updated Social Service ${soc.id} -> ${alt}`);
            totalUpdated++;
          }
        }
      }
    }

    // 5. Awards
    console.log('Populating Awards...');
    for (const aw of scan.awards) {
      let alt = aw.alt_text || '';
      if (!alt) {
        const title = aw.title || '';
        const subtitle = aw.subtitle || '';
        const name = aw.person_name || '';
        const date = aw.date || '';
        
        if (title || subtitle) {
          alt = `Award certificate representing ${title || 'Recognition'} ${subtitle ? `for ${subtitle}` : ''}${name ? ` awarded to ${name}` : ''}${date ? ` on ${date}` : ''}.`;
        } else {
          alt = 'Dentistry excellence award certificate received by Patel Dental Hospital.';
        }

        if (alt) {
          const { error } = await supabase.from('awards').update({ alt_text: alt }).eq('id', aw.id);
          if (error) console.error(`Error updating awards ${aw.id}:`, error);
          else {
            console.log(`Updated Awards ${aw.id} -> ${alt}`);
            totalUpdated++;
          }
        }
      }
    }

    // 6. International Patients Gallery
    console.log('Populating International Patients Gallery...');
    for (const ip of scan.international_patients_gallery) {
      let alt = ip.alt_text || '';
      if (!alt) {
        alt = 'International patient posing with Dr. Vipul Patel and the dental team at Patel Dental Hospital, Rajkot.';
        
        const { error } = await supabase.from('international_patients_gallery').update({ alt_text: alt }).eq('id', ip.id);
        if (error) console.error(`Error updating international_patients_gallery ${ip.id}:`, error);
        else {
          console.log(`Updated International Patient Gallery ${ip.id}`);
          totalUpdated++;
        }
      }
    }

    // 7. Services
    console.log('Populating Services (Hero/Card images)...');
    const serviceAltRules = {
      'wisdom-srv': {
        hero: 'Wisdom tooth surgery and oral extraction planning at Patel Dental Hospital, Rajkot.',
        card: 'Wisdom tooth extraction surgical setup and care.'
      },
      'filling-srv': {
        hero: 'Tooth coloured composite filling restoration procedure at Patel Dental Hospital, Rajkot.',
        card: 'Natural-looking tooth coloured composite filling on teeth.'
      },
      'aligners-srv': {
        hero: 'Invisible aligners treatment showing transparent medical-grade aligners for teeth straightening.',
        card: 'Clear plastic orthodontic aligners on a clinical surface.'
      },
      'braces-srv': {
        hero: 'Orthodontic braces treatment showing high-precision low-friction dental braces at Patel Dental Hospital.',
        card: 'Ceramic and metal orthodontic braces on teeth.'
      },
      'implants-srv': {
        hero: 'Dental implant treatment procedure demonstration at Patel Dental Hospital, Rajkot.',
        card: 'Modern dental implant showing a titanium post and custom zirconia crown.'
      },
      'crowns': {
        hero: 'Advanced aesthetic crowns and bridges prosthetic fittings at Patel Dental Hospital, Rajkot.',
        card: 'Aesthetic dental crowns and bridge restoration.'
      },
      'pediatric': {
        hero: 'Pediatric dentistry child-friendly dental care visit at Patel Dental Hospital.',
        card: 'Gentle pediatric dentist comforting a child patient during check-up.'
      },
      'whitening': {
        hero: 'Teeth whitening laser treatment showing dental bleaching session at Patel Dental Hospital.',
        card: 'Professional power teeth whitening treatment outcome.'
      },
      'fmr-srv': {
        hero: 'Full mouth rehabilitation treatment setup and clinical planning at Patel Dental Hospital, Rajkot.',
        card: 'Comprehensive restoration showing a completely rehabilitated smile.'
      },
      'smile-makeover-srv': {
        hero: 'Cosmetic smile makeover planning showing porcelain dental veneers at Patel Dental Hospital.',
        card: 'Beautiful symmetrical smile makeover outcome with porcelain veneers.'
      },
      'root-canal-srv': {
        hero: 'Single sitting root canal treatment using advanced rotary endodontics and dental microscope.',
        card: 'Root canal treatment microscopic diagnostics and procedure.'
      }
    };

    for (const srv of scan.services) {
      let mConfig = srv.marketing_config || {};
      if (typeof mConfig === 'string') {
        try {
          mConfig = JSON.parse(mConfig);
        } catch (e) {
          mConfig = {};
        }
      }

      const rules = serviceAltRules[srv.id];
      if (rules) {
        let changed = false;
        
        if (!mConfig.hero_image_alt) {
          mConfig.hero_image_alt = rules.hero;
          changed = true;
        }
        if (!mConfig.homepage_card_image_alt) {
          mConfig.homepage_card_image_alt = rules.card;
          changed = true;
        }

        if (changed) {
          const { error } = await supabase.from('services').update({
            marketing_config: mConfig
          }).eq('id', srv.id);

          if (error) console.error(`Error updating service ${srv.id}:`, error);
          else {
            console.log(`Updated Service ${srv.id} (Hero and Card Alt Text)`);
            totalUpdated++;
          }
        }
      }
    }

    console.log(`\n=== SUCCESS: POPULATED ${totalUpdated} ALT TEXT ENTRIES IN SUPABASE ===`);
  } catch (err) {
    console.error('Population failed with exception:', err);
  }
}

populate();
