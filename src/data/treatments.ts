/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Treatment } from '../types';

const imgImplants = 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800';
const imgSameday = 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800';
const imgFullmouth = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800';
const imgRct = 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800';
const imgBraces = 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=800';
const imgAligners = 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=800';
const imgKids = 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800';
const imgCosmetic = 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800';
const imgGum = 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800';
const imgCleaning = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800';
const imgWisdom = 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800';
const imgDentures = 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800';
const imgCrowns = 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800';
const imgSmilemakeover = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800';
const imgOralsurgery = 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800';

export const TREATMENTS: Treatment[] = [
  {
    id: 'implants',
    title: 'Dental Implants',
    shortDesc: 'Permanent and highly natural replacement for missing teeth using premium titanium anchors.',
    longDesc: 'Dental implants are screw-like titanium posts placed surgically into the jawbone to act as artificial roots. Over time, they fuse seamlessly with your biological bone structure, providing a rock-solid foundation for permanent dental crowns or bridges that replicate the exact function, aesthetics, and structural support of your original tooth.',
    benefits: [
      'Feels, looks, and functions like natural teeth',
      'Prevents bone loss and preserves facial structure',
      'Zero impact or adjacent damage to surrounding healthy teeth',
      'Provides lifelong durability with proper professional maintenance',
      'Restores chewing capacity and speech clarity completely'
    ],
    duration: '2 - 4 Months (Healing included)',
    image: imgImplants,
    popular: true
  },
  {
    id: 'sameday',
    title: 'Same Day Fix Teeth',
    shortDesc: 'Complete restoration of a fully functional smile using immediate loading implants in just 24 hours.',
    longDesc: 'Our revolutionary Same Day Fix Teeth protocol utilizes advanced immediate-loading implantology. By placing highly stable implant anchors and attaching high-performance, custom-crafted prosthetic teeth on the exact same day, we bypass months of waiting. This technique allows you to walk into our clinic with compromised or missing teeth and walk out with a permanent, gorgeous smile.',
    benefits: [
      'Complete smile transformation in a single day',
      'Requires no long, uncomfortable healing gaps without teeth',
      'Uses state-of-the-art USA FDA approved prosthetic materials',
      'Extremely high success rate with CBCT-guided micro-surgery',
      'Significantly lower overall chair-time and post-op discomfort'
    ],
    duration: '1 Day (24 Hours)',
    image: imgSameday,
    popular: true
  },
  {
    id: 'fullmouth',
    title: 'Full Mouth Rehabilitation',
    shortDesc: 'Comprehensive reconstruction of your entire bite, alignment, and aesthetic smile structure.',
    longDesc: 'Full Mouth Rehabilitation is an advanced, highly customized combination of restorative, aesthetic, and neuromuscular dental procedures. It is specifically designed for patients with multiple missing teeth, severe structural wear, complex bite issues, or widespread breakdown. We rebuild your bite from the ground up for healthy muscle function and unmatched aesthetics.',
    benefits: [
      'Corrects complex jaw alignments and chronic TMJ pain',
      'Re-establishes a youthful, biochemically sound facial proportion',
      'Combines crowns, bridges, and implants for unified structural strength',
      'Fully customized to match your biological facial profile'
    ],
    duration: '2 - 3 Weeks (Phased planning)',
    image: imgFullmouth,
    popular: true
  },
  {
    id: 'rct',
    title: 'Root Canal Treatment (RCT)',
    shortDesc: 'Painless, highly advanced laser and rotary endodontics to save infected natural teeth.',
    longDesc: 'We specialize in modern, painless micro-endodontics. Using premium digital apex locators, high-performance rotary instruments, and medical-grade laser sterilization, we extract infected pulp tissue, thoroughly sterilize the internal canal pathways, and seal them securely to comfortably preserve your natural dental structure for decades.',
    benefits: [
      'Virtually pain-free procedure under localized care',
      'Saves your native tooth and avoids complex extractions',
      'Prevents spreading infections to adjacent jawbone structures',
      'Completed in single or dual sessions with minimal discomfort'
    ],
    duration: '1 - 2 Sessions',
    image: imgRct
  },
  {
    id: 'braces',
    title: 'Braces Treatment',
    shortDesc: 'Classic orthodontic corrections using durable ceramic, metal, or lingual bracket systems.',
    longDesc: 'Our orthodontic division provides customized orthodontic solutions for patients of all ages. By carefully modulating pressure over time through premium metal, aesthetic ceramic, or self-ligating braces, we align crowded teeth, close wide gaps, and correct open-bites, under-bites, or cross-bites for dynamic aesthetic oral harmony.',
    benefits: [
      'Corrects long-term bite issues and prevents enamel wear',
      'Significantly improves general oral hygiene access',
      'Aesthetic, transparent ceramic options available for teens and adults',
      'Durable, predictable, and highly stable results'
    ],
    duration: '12 - 18 Months',
    image: imgBraces
  },
  {
    id: 'aligners',
    title: 'Clear Aligners',
    shortDesc: 'Invisible, removable custom aligners that subtly straighten your smile with maximum lifestyle freedom.',
    longDesc: 'Welcome to the future of orthodontics. Clear Aligners are series of virtually invisible, medical-grade polyurethane trays custom-scanned and manufactured to incrementally reposition your teeth. They can be safely popped out during meals, important meetings, and daily cleaning, making them the ultimate lifestyle-friendly aesthetic solution.',
    benefits: [
      'Completely invisible for absolute social and workplace confidence',
      'Easily removable to maintain perfect native flossing and brushing',
      'No metal wires, food traps, or painful cuts on oral tissues',
      'Digitally mapped smile journey, so you see your final results beforehand'
    ],
    duration: '6 - 12 Months',
    image: imgAligners,
    popular: true
  },
  {
    id: 'kids',
    title: 'Kids Dentistry',
    shortDesc: 'Gentle, warm, and highly protective pediatric dental care to nurture lifelong healthy smiles.',
    longDesc: 'We believe childhood dental visits set the psychological tone for a lifetime of health. Our pediatric dentistry combines a warm, playful environment with advanced preventive care like tooth sealants, protective fluoride therapies, gentle habit breakers, and pediatric pulp treatments to defend expanding smiles against early decay.',
    benefits: [
      'Designed exclusively to relieve fear and dental anxiety',
      'Highly effective cavity prevention using advanced dental sealants',
      'Proactive monitoring of jaw development and primary teeth retention'
    ],
    duration: '30 - 45 Mins',
    image: imgKids
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    shortDesc: 'Modern dental bonding, custom porcelain veneers, and enamel contouring for a radiant smile.',
    longDesc: 'Transform minor dental blemishes, gaps, chips, and discolorations with cosmetic aesthetic solutions. Using ultra-thin, life-like composite resins or customized premium porcelain veneers, we reshape, re-color, and perfectly balance your teeth to frame your unique facial structure brilliantly.',
    benefits: [
      'Instantly hides persistent stains, chips, and irregular gaps',
      'Custom color-matched to your surrounding natural enamel',
      'Veneers resist coffee, tea, and soda staining long-term'
    ],
    duration: '2 - 5 Days',
    image: imgCosmetic
  },
  {
    id: 'gum',
    title: 'Gum Treatment',
    shortDesc: 'Advanced deep cleaning, scaling, root planing, and laser therapy for healthy support tissues.',
    longDesc: 'Healthy gums are the crucial structural foundation of healthy teeth. Our periodontal treatments address bleeding, swelling, bad breath, and receding gum lines. We perform advanced scaling, micro-ultrasonic root planing, and direct dental laser bacterial debridement to completely eliminate deep-seated tartar and halt gum disease.',
    benefits: [
      'Stops persistent gum bleeding and reduces tooth mobility',
      'Reverses early gingivitis and manages long-term periodontitis',
      'Eliminates chronic bad breath caused by underlying pocket infections'
    ],
    duration: '1 - 2 Sessions',
    image: imgGum
  },
  {
    id: 'cleaning',
    title: 'Teeth Cleaning',
    shortDesc: 'Comprehensive ultrasonic scale removal and gentle active airflow polishing.',
    longDesc: 'A vital routine procedure for every individual. We use state-of-the-art ultrasonic scalers to cleanly break down hardened calculus/plaque buildup from hidden surfaces. We follow this up with high-end airflow dynamic polishing to erase superficial stains and leave your teeth smooth, shiny, and refreshed.',
    benefits: [
      'Thoroughly cleans areas unreachable by daily manual brushing',
      'Significantly lowers risk of tooth decay and sudden nerve infections',
      'Polishes away surface coffee, tea, and tobacco stains'
    ],
    duration: '30 Mins',
    image: imgCleaning
  },
  {
    id: 'wisdom',
    title: 'Wisdom Tooth Removal',
    shortDesc: 'Safe, pain-free, surgical extraction of impacted or painful wisdom teeth.',
    longDesc: 'Impacted wisdom teeth can push against other molars, trigger intense jaw pain, and breed hidden infections. Our expert dental surgeons perform highly precise, suture-less, and remarkably comfortable third-molar extractions supported by high-resolution OPG x-ray mapping for guaranteed safety.',
    benefits: [
      'Alleviates chronic radiating jaw pain, localized swelling, and stiffness',
      'Safeguards adjacent molers from pressure-induced root cavities',
      'Painless surgical navigation ensures minimal post-extraction downtime'
    ],
    duration: '45 Mins',
    image: imgWisdom
  },
  {
    id: 'dentures',
    title: 'Dentures',
    shortDesc: 'Highly comfortable, flexible, and custom-molded complete or partial dentures.',
    longDesc: 'We offer advanced, premium material dentures, including lightweight acrylic and breakthrough flexible thermal plastics (like BPS systems). Designed to mirror original gum shades and natural tooth gradients, they provide secure suction dynamics and restored speaking comfort without bulky discomfort.',
    benefits: [
      'Ultra-lightweight, customizable base for ultimate daily stability',
      'Flexible material ensures no painful friction blisters',
      'Restores the joy of dining and speaking confidently'
    ],
    duration: '5 - 7 Days',
    image: imgDentures
  },
  {
    id: 'crowns',
    title: 'Crowns & Bridges',
    shortDesc: 'High-strength Zirconia and E-Max restorations fabricated with advanced CAD/CAM tech.',
    longDesc: 'Rebuild fractured, weakened, or missing teeth with custom crowns and bridges. Patel Dental Hospital utilizes CAD/CAM digital scanning and milling technology to engineer incredibly tough, metal-free Zirconia and E-Max lithium disilicate crowns that replicate the natural translucent glaze of natural enamel.',
    benefits: [
      'High structural fracture resistance for heavy grinding zones',
      'Flawless aesthetic blending with metal-free inner margins',
      'Bridges safely fill empty spaces, anchoring reliably onto surrounding teeth'
    ],
    duration: '2 - 3 Days',
    image: imgCrowns
  },
  {
    id: 'smilemakeover',
    title: 'Smile Makeover',
    shortDesc: 'Complete dynamic smile transformation blending veneers, alignment, and bleaching.',
    longDesc: 'Our premier artistic service. A Smile Makeover is a comprehensive aesthetic project where we analyze your facial parameters, lip-line profiles, and skin undertones to craft your dream smile. Combining micro-contouring, laser teeth whitening, aesthetic bonding, and hand-finished ultra-thin veneers, we create a symmetrical masterpiece.',
    benefits: [
      'Engineered scientifically using Digital Smile Design (DSD) software',
      'Dramatically elevates social confidence and dynamic facial youth',
      'Instantly corrects multi-factorial shade, chip, and alignment issues'
    ],
    duration: '5 - 10 Days',
    image: imgSmilemakeover,
    popular: true
  },
  {
    id: 'oralsurgery',
    title: 'Oral Surgery',
    shortDesc: 'Expert surgical management of jaw fractures, cyst enucleations, and soft tissue biopsies.',
    longDesc: 'Headed by seasoned surgical consultants, our oral and maxillofacial division handles complex procedures including complex surgical impactions, jaw alignment correction surgery (orthognathic), sinus lifts, cyst removals, and comprehensive facial trauma reconstruction with clinical perfection and strict global operating room guidelines.',
    benefits: [
      'Highest surgical accuracy using high-definition CBCT diagnostics',
      'Highly modern surgical setup with comprehensive vital monitoring',
      'Covers both intra-oral corrective and extra-oral reconstructive surgery'
    ],
    duration: 'Varies with case complexity',
    image: imgOralsurgery
  }
];
