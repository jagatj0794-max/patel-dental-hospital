/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, ServiceGalleryItem, ServiceFaq, MarketingConfig } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';
import { TREATMENTS } from '../data/treatments';

export const DEFAULT_GREEN_HIGHLIGHT_LINE = "Replace missing teeth with dental implants in just one week with advance technology.";
export const DEFAULT_RCT_GREEN_HIGHLIGHT_LINE = "At Patel Dental Hospital, one of Gujarat's leading dental hospitals, we complete Root Canal Treatment in just one visit to save the patient's valuable time.\n\nWe use advanced technology including:\n• Apex Locator\n• Made in Japan Endo Motor\n• Digital X-Ray\n• Biocompatible MTA Sealer\nto provide excellent quality treatment at an affordable price.";
export const DEFAULT_FMR_GREEN_HIGHLIGHT_LINE = "The processes of rebuilding or repairing all teeth, gums and temporomandibular joint in both upper and lower jaw are called as Full Mouth Rehabilitation or Reconstruction or Restoration.";

export const DEFAULT_RCT_GOOGLE_REVIEWS = [
  {
    id: 'rct-review-1',
    patient_name: 'Ramesh Patel',
    patient_photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    review_text: 'Got my root canal done in a single sitting by Dr. Vipul Patel. Completely painless experience with modern Endo Motor technology. Highly recommend Patel Dental Hospital in Rajkot!',
    review_date: '1 month ago',
    review_url: 'https://maps.google.com/?cid=pateldentalhospital',
    display_order: 10,
    enabled: true
  },
  {
    id: 'rct-review-2',
    patient_name: 'Priya Shah',
    patient_photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    review_text: 'I was very scared of root canal treatment pain, but Dr. Vipul Patel completed the entire RCT in just one visit using digital Apex Locator and X-ray. Zero pain during and after the procedure!',
    review_date: '2 weeks ago',
    review_url: 'https://maps.google.com/?cid=pateldentalhospital',
    display_order: 20,
    enabled: true
  },
  {
    id: 'rct-review-3',
    patient_name: 'Amit Trivedi',
    patient_photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    review_text: 'Excellent single sitting root canal treatment at an affordable price. Biocompatible MTA sealer and Japanese Endo Motor equipment made the treatment very quick and comfortable.',
    review_date: '3 weeks ago',
    review_url: 'https://maps.google.com/?cid=pateldentalhospital',
    display_order: 30,
    enabled: true
  },
  {
    id: 'rct-review-4',
    patient_name: 'Neha Mehta',
    patient_photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    review_text: 'Best dental hospital in Rajkot for Single Sitting Root Canal. Saved so much of my time and the doctor explained everything very clearly before starting.',
    review_date: '1 month ago',
    review_url: 'https://maps.google.com/?cid=pateldentalhospital',
    display_order: 40,
    enabled: true
  }
];

export const DEFAULT_FMR_GOOGLE_REVIEWS = [
  {
    id: 'fmr-review-1',
    patient_name: 'Suresh Patel',
    patient_photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    review_text: 'Had my Full Mouth Rehabilitation done by Dr. Vipul Patel. Completely transformed my smile and chewing ability. Outstanding care and precision at Patel Dental Hospital!',
    review_date: '1 month ago',
    review_url: 'https://maps.google.com/?cid=pateldentalhospital',
    display_order: 10,
    enabled: true
  },
  {
    id: 'fmr-review-2',
    patient_name: 'Bhavna Joshi',
    patient_photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    review_text: 'I had severe bite issues and multiple worn out teeth. The full mouth reconstruction treatment was planned meticulously and executed flawlessly. Extremely satisfied!',
    review_date: '2 weeks ago',
    review_url: 'https://maps.google.com/?cid=pateldentalhospital',
    display_order: 20,
    enabled: true
  }
];

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 'implants-srv',
    slug: 'dental-implants',
    title: 'Dental Implants',
    short_description: TREATMENTS.find(t => t.id === 'implants')?.shortDesc || '',
    description: TREATMENTS.find(t => t.id === 'implants')?.longDesc || '',
    hero_image: TREATMENTS.find(t => t.id === 'implants')?.image || '',
    icon: 'Shield',
    display_order: 1,
    is_active: true,
    process_steps: [
      {
        id: 'step-1',
        title: '',
        description: 'We take CBCT scan with in-house X-ray machine.',
        display_order: 10
      },
      {
        id: 'step-2',
        title: '',
        description: 'Dr. Vipul Patel will go through CBCT scan and do virtual planning of dental implant and prosthetic teeth.\n\nIn this planning implant are placed in most accurate favourable position corresponding to opposite arch teeth for better chewing efficiency and to enhance smile line for better look, with better cleans ability to increase life of implant supported fix teeth.',
        display_order: 20
      },
      {
        id: 'step-3',
        title: '',
        description: 'After planning, Dr. Vipul Patel executes same planning in your mouth and give your implant supported fix teeth in just one week.',
        display_order: 30
      }
    ],
    features: [
      {
        id: 'sup-1',
        title: '',
        description: 'The use of implants that are permanently attached to the bone and serve you life time for efficient chewing. Where in basal implant, they are just mechanically seated in the bone and is not permanently attached to the bone. So chances of failure are more in basal implant.',
        display_order: 10
      },
      {
        id: 'sup-2',
        title: '',
        description: 'In our method we use Ti retaining small screw for securing prosthetic teeth over dental implant so that when you want to remove your fixed teeth for cleaning, you can remove it with help of doctor in just five minutes.',
        display_order: 20
      },
      {
        id: 'sup-3',
        title: '',
        description: 'The doctor unscrews the Ti retaining screw from the teeth with a driver, lifts the teeth from the implant, cleans them, and fixes the same teeth again.',
        display_order: 30
      },
      {
        id: 'sup-4',
        title: '',
        description: 'This technique is a boon for Pan Masala chewer patients.',
        display_order: 40
      },
      {
        id: 'sup-5',
        title: '',
        description: 'Screw-on-screw is used to fix the tooth so that the life of the implant is increased. In the basal method, the tooth is attached with cement, and cement goes beneath the gums, reducing implant life and increasing the chances of loosening.',
        display_order: 50
      },
      {
        id: 'sup-6',
        title: '',
        description: 'More than 7000 implant placements and more than 350 full mouth rehabilitation cases done by Dr. Vipul Patel.',
        display_order: 60
      },
      {
        id: 'sup-7',
        title: '',
        description: 'After placement of fixed teeth, they are checked properly with in-house CBCT to enhance the life of the teeth.',
        display_order: 70
      },
      {
        id: 'sup-8',
        title: '',
        description: 'In patients with poor ridges and bone, we use ultra-modern bone grafts to generate new bone before placing implant-supported fixed teeth.',
        display_order: 80
      },
      {
        id: 'sup-9',
        title: '',
        description: 'Get to know the experience of our happy patients who have completed 2–5 years after fixing their teeth before making your decision.',
        display_order: 90
      },
      {
        id: 'sup-10',
        title: '',
        description: 'We use implant practices that meet international quality standards. At Patel Dental Hospital, we believe implants are not just about restoring teeth but about creating life-changing experiences for patients.',
        display_order: 100
      }
    ],
    procedure_video_title: 'Procedure Video',
    procedure_video_description: '',
    procedure_video_url: 'https://www.instagram.com/reel/C8qLd9MyWwG/',
    patient_testimonials: [
      {
        id: 'testi-1',
        patient_name: 'Patient Testimonial',
        video_url: 'https://www.instagram.com/reel/C8qLd9MyWwG/',
        display_order: 10
      }
    ],
    marketing_config: {
      green_highlight_line: DEFAULT_GREEN_HIGHLIGHT_LINE,
      process_section_title: 'How We Perform Dental Implants',
      benefits_section_title: 'How our Ultra Modern Method is superior to basal implants or any other Implant?',
      testimonials_section_title: 'Patient Testimonial Reels',
      show_procedure_video: true,
      procedure_video_title: 'Procedure Video',
      procedure_video_description: '',
      procedure_video_url: 'https://www.instagram.com/reel/C8qLd9MyWwG/'
    }
  },
  {
    id: 'rct',
    slug: 'root-canal-treatment',
    title: 'Single Sitting Root Canal Treatment',
    short_description: "When decay reaches the nerve of the tooth, it causes severe pain to the patient.\n\nAt Patel Dental Hospital, we complete Root Canal Treatment in just one visit to save the patient's valuable time.\n\nWe use advanced technology including Apex Locator, Made in Japan Endo Motor, Digital X-Ray and Biocompatible MTA Sealer to provide excellent quality treatment at an affordable price.",
    hero_description: "When decay reaches the nerve of the tooth, it causes severe pain to the patient.\n\nAt Patel Dental Hospital, we complete Root Canal Treatment in just one visit to save the patient's valuable time.\n\nWe use advanced technology including Apex Locator, Made in Japan Endo Motor, Digital X-Ray and Biocompatible MTA Sealer to provide excellent quality treatment at an affordable price.",
    description: 'When decay reaches the nerve of the tooth, it causes severe pain to the patient. In such conditions the dentist removes all decayed and infected portions of the tooth and cleans the root canal with files and medicine.\n\nAfter cleaning and disinfecting the root canal system, our dentist fills the canal with biocompatible materials like Gutta Percha and MTA.\n\nOur professionals top the tooth with a crown or permanent filling to add protection against decay.',
    hero_image: TREATMENTS.find(t => t.id === 'rct')?.image || '',
    icon: 'Activity',
    display_order: 2,
    is_active: true,
    process_steps: [
      {
        id: 'rct-step-1',
        phase: 'Step 1',
        title: 'Tooth Decay Reaches Nerve',
        description: 'When decay reaches the nerve of the tooth, it causes severe pain to the patient.',
        display_order: 10
      },
      {
        id: 'rct-step-2',
        phase: 'Step 2',
        title: 'Remove Infected Portion',
        description: 'The dentist removes all decayed and infected portions of the tooth.',
        display_order: 20
      },
      {
        id: 'rct-step-3',
        phase: 'Step 3',
        title: 'Clean Root Canals',
        description: 'Cleans the root canal with files and medicine.',
        display_order: 30
      },
      {
        id: 'rct-step-4',
        phase: 'Step 4',
        title: 'Disinfect Canals',
        description: 'Disinfecting the root canal system.',
        display_order: 40
      },
      {
        id: 'rct-step-5',
        phase: 'Step 5',
        title: 'Fill with Gutta Percha & MTA',
        description: 'Fills the canal with biocompatible materials like Gutta Percha and MTA.',
        display_order: 50
      },
      {
        id: 'rct-step-6',
        phase: 'Step 6',
        title: 'Crown or Permanent Filling',
        description: 'Topping the tooth with a crown or permanent filling to add protection against decay.',
        display_order: 60
      }
    ],
    features: [
      {
        id: 'rct-adv-1',
        title: 'One Visit Treatment',
        description: "At Patel Dental Hospital, one of Gujarat's leading dental hospitals, we complete Root Canal Treatment in just one visit to save the patient's valuable time.",
        display_order: 10
      },
      {
        id: 'rct-adv-2',
        title: 'Apex Locator',
        description: 'Advanced digital Apex Locator technology for precise working length measurement.',
        display_order: 20
      },
      {
        id: 'rct-adv-3',
        title: 'Made in Japan Endo Motor',
        description: 'Made in Japan Endo Motor for smooth, precise, and fast root canal cleaning.',
        display_order: 30
      },
      {
        id: 'rct-adv-4',
        title: 'Digital X-Ray',
        description: 'Digital X-Ray technology for clear diagnostic imaging and accurate treatment monitoring.',
        display_order: 40
      },
      {
        id: 'rct-adv-5',
        title: 'Biocompatible MTA Sealer',
        description: 'Filling and sealing the root canal system with biocompatible MTA sealer for superior long-term tissue healing.',
        display_order: 50
      },
      {
        id: 'rct-adv-6',
        title: 'Excellent Quality & Affordable Price',
        description: 'Providing excellent quality treatment at an affordable price.',
        display_order: 60
      },
      {
        id: 'rct-adv-7',
        title: 'Advantages of Single Sitting Root Canal Treatment',
        description: '• No need for multiple visits.\n• Saves valuable time.\n• Only one local anesthesia injection.\n• Less medicine or no medicine after treatment in many cases.\n• Reduced chance of saliva cross infection compared to multiple sitting treatment.\n• Better long-term success of the saved tooth.',
        display_order: 70
      }
    ],
    procedure_video_title: 'Single Sitting Root Canal Procedure',
    procedure_video_url: 'https://www.instagram.com/reel/C8qLd9MyWwG/',
    patient_testimonials: [
      {
        id: 'rct-testi-1',
        patient_name: 'Patient Review Video',
        video_url: 'https://www.instagram.com/reel/C8qLd9MyWwG/',
        treatment_name: 'Single Sitting Root Canal Treatment',
        display_order: 10
      },
      {
        id: 'rct-testi-2',
        patient_name: 'Patient Testimonial Video',
        video_url: 'https://www.instagram.com/reel/C8qLd9MyWwG/',
        treatment_name: 'Single Sitting Root Canal Treatment',
        display_order: 20
      }
    ],
    hospital_team_photos: [
      {
        id: 'rct-hosp-1',
        type: 'hospital',
        caption: 'Hospital Photo - Operatory Unit',
        image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
        display_order: 10
      },
      {
        id: 'rct-hosp-2',
        type: 'hospital',
        caption: 'Hospital Photo - Clinical Setup',
        image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
        display_order: 20
      },
      {
        id: 'rct-team-1',
        type: 'team',
        caption: 'Team Photo - Specialist Doctors',
        image_url: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800',
        display_order: 30
      }
    ],
    marketing_config: {
      green_highlight_line: DEFAULT_RCT_GREEN_HIGHLIGHT_LINE,
      process_section_title: 'How We Perform Single Sitting Root Canal',
      benefits_section_title: 'Why Our Modern Root Canal Method is Superior',
      testimonials_section_title: 'Patient Testimonial Reels',
      hospital_team_title: 'Hospital & Team Gallery',
      procedure_video_title: 'Single Sitting Root Canal Procedure',
      procedure_video_url: 'https://www.instagram.com/reel/C8qLd9MyWwG/',
      gallery_items: [
        {
          id: 'rct-gal-1',
          category: 'Single Case',
          title: 'Single Case',
          caption: 'Single Case Root Canal Treatment',
          image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
          display_order: 10
        },
        {
          id: 'rct-gal-2',
          category: 'Multiple Case',
          title: 'Multiple Case',
          caption: 'Multiple Case Root Canal Treatment',
          image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
          display_order: 20
        },
        {
          id: 'rct-gal-3',
          category: 'Full Mouth Rehabilitation (FMR) Case',
          title: 'Full Mouth Rehabilitation (FMR) Case',
          caption: 'Full Mouth Rehabilitation (FMR) Root Canal Case',
          image_url: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800',
          display_order: 30
        }
      ],
      cost_packages: [],
      cost_included_items: [],
      cost_starting_price: '',
      cost_heading: 'Single Sitting Root Canal Treatment Cost',
      cost_description: '',
      cost_cards: [],
      faqs: [],
      phone_number: '+91 9510397046',
      whatsapp_number: '+91 9510397046',
      sec11_heading: 'Book Your Single Sitting Root Canal Appointment',
      show_procedure_video: true,
      show_testimonials: true,
      show_hospital_photos: true,
      show_cost: true,
      show_google_reviews: true,
      google_reviews_heading: 'Google Patient Reviews',
      google_reviews: DEFAULT_RCT_GOOGLE_REVIEWS,
      show_faqs: true,
      show_bottom_cta: true
    }
  },
  {
    id: 'fmr-srv',
    slug: 'full-mouth-rehabilitation',
    title: 'Full Mouth Rehabilitation',
    short_description: 'The processes of rebuilding or repairing all teeth, gums and temporomandibular joint in both upper and lower jaw are called Full Mouth Rehabilitation or Reconstruction or Restoration.',
    hero_description: 'The processes of rebuilding or repairing all teeth, gums and temporomandibular joint in both upper and lower jaw are called Full Mouth Rehabilitation or Reconstruction or Restoration.',
    description: 'The processes of rebuilding or repairing all teeth, gums and temporomandibular joint in both upper and lower jaw are called as Full Mouth Rehabilitation or Reconstruction or Restoration.',
    hero_image: TREATMENTS.find(t => t.id === 'fullmouth')?.image || 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
    icon: 'Sparkles',
    display_order: 3,
    is_active: true,
    process_steps: [
      {
        id: 'fmr-step-1',
        phase: 'Step 1',
        title: '',
        description: 'For Full Mouth Reconstruction, first of all you have to visit Patel Dental Hospital, a top most dental hospital in Gujarat where Dr. Vipul Patel and team do clinical examination of the mouth and perform a Full Mouth OPG X-Ray.',
        display_order: 10
      },
      {
        id: 'fmr-step-2',
        phase: 'Step 2',
        title: '',
        description: 'After studying the OPG X-Ray and intraoral and extraoral clinical data, Dr. Vipul Patel gives you a treatment plan where the role of:\n• Oral Surgeon\n• Implantologist\n• Periodontist\n• Prosthodontist\n• Endodontist (RCT Specialist)\nis very well defined.',
        display_order: 20
      },
      {
        id: 'fmr-step-3',
        phase: 'Step 3',
        title: '',
        description: 'Subsequently, each member of the team executes their work to establish the form, function and aesthetics of teeth, gums, joint and face to create a world-class treatment experience.',
        display_order: 30
      }
    ],
    features: [
      {
        id: 'fmr-plan-1',
        title: '',
        description: 'Tooth Coloured Filling (Composite)',
        display_order: 10
      },
      {
        id: 'fmr-plan-2',
        title: '',
        description: 'Root Canal Treatment',
        display_order: 20
      },
      {
        id: 'fmr-plan-3',
        title: '',
        description: 'Crown and Bridges',
        display_order: 30
      },
      {
        id: 'fmr-plan-4',
        title: '',
        description: 'E-max Veneers and Crowns',
        display_order: 40
      },
      {
        id: 'fmr-plan-5',
        title: '',
        description: 'Dental Implant',
        display_order: 50
      },
      {
        id: 'fmr-plan-6',
        title: '',
        description: 'Wisdom Tooth or any other Impacted Tooth Removal',
        display_order: 60
      },
      {
        id: 'fmr-plan-7',
        title: '',
        description: 'Laser Treatment of Gums for Pyorrhea',
        display_order: 70
      },
      {
        id: 'fmr-plan-8',
        title: '',
        description: 'Braces or Invisible Aligners for Alignment of Teeth',
        display_order: 80
      }
    ],
    procedure_video_title: 'Full Mouth Rehabilitation Procedure',
    procedure_video_url: '',
    patient_testimonials: [],
    hospital_team_photos: [],
    marketing_config: {
      green_highlight_line: DEFAULT_FMR_GREEN_HIGHLIGHT_LINE,
      process_section_title: 'How We Perform Full Mouth Rehabilitation',
      benefits_section_title: 'Treatment Planning Includes',
      candidate_section_title: 'Who Is a Candidate for Full Mouth Rehabilitation',
      candidate_items: [
        {
          id: 'cand-1',
          title: '',
          description: 'Worn out teeth due to Pan Masala chewing.',
          display_order: 10
        },
        {
          id: 'cand-2',
          title: '',
          description: 'Teeth lost due to trauma or accident.',
          display_order: 20
        },
        {
          id: 'cand-3',
          title: '',
          description: 'Sensitive eroded teeth due to prolonged acid erosion from meals, severe acidity, acid reflux disorder and excessive use of cold drinks and lemon juice.',
          display_order: 30
        },
        {
          id: 'cand-4',
          title: '',
          description: 'Temporomandibular joint disorder causing long-term headache, jaw muscle pain, joint pain, clicking sounds and ear pain due to improper traumatic bite.',
          display_order: 40
        }
      ],
      gallery_heading: 'Clinical Case Gallery',
      gallery_description: 'Before and after transformations of full mouth rehabilitation cases.',
      gallery_items: [
        {
          id: 'fmr-gal-1',
          caption: 'Picture of FMR with RCT + Bridge + Implant + Extraction',
          image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
          display_order: 10
        }
      ],
      cost_packages: [],
      cost_included_items: [],
      cost_starting_price: '',
      cost_heading: 'Save up to 50% on Full Mouth Rehabilitation',
      cost_description: '',
      cost_cards: [],
      faqs: [],
      phone_number: '+91 9510397046',
      whatsapp_number: '+91 9510397046',
      testimonials_section_title: 'Patient Testimonials',
      hospital_team_title: 'Hospital & Team Gallery',
      procedure_video_title: 'Full Mouth Rehabilitation Procedure',
      procedure_video_url: '',
      sec11_heading: 'Book Your Full Mouth Rehabilitation Consultation',
      google_reviews_heading: 'Google Patient Reviews',
      google_reviews: DEFAULT_FMR_GOOGLE_REVIEWS,
      before_after_heading: 'Before & After Smile Transformations',
      before_after_description: 'See real smile transformations of our full mouth rehabilitation patients.',
      before_after_pairs: [],
      show_hero: true,
      show_introduction: true,
      show_process: true,
      show_benefits: true,
      show_candidate: true,
      show_before_after: true,
      show_gallery: true,
      show_procedure_video: true,
      show_testimonials: true,
      show_hospital_photos: true,
      show_cost: true,
      show_google_reviews: true,
      show_faqs: false,
      show_bottom_cta: true
    }
  },
  {
    id: 'aligners-srv',
    slug: 'invisible-aligners',
    title: 'Invisible Aligners',
    short_description: TREATMENTS.find(t => t.id === 'aligners')?.shortDesc || '',
    description: TREATMENTS.find(t => t.id === 'aligners')?.longDesc || '',
    hero_image: TREATMENTS.find(t => t.id === 'aligners')?.image || '',
    icon: 'EyeOff',
    display_order: 4,
    is_active: true
  },
  {
    id: 'smile-srv',
    slug: 'smile-makeover',
    title: 'Smile Makeover',
    short_description: TREATMENTS.find(t => t.id === 'smilemakeover')?.shortDesc || '',
    description: TREATMENTS.find(t => t.id === 'smilemakeover')?.longDesc || '',
    hero_image: TREATMENTS.find(t => t.id === 'smilemakeover')?.image || '',
    icon: 'Heart',
    display_order: 5,
    is_active: true
  },
  {
    id: 'crowns',
    slug: 'crowns-bridges',
    title: 'Crowns & Bridges',
    short_description: TREATMENTS.find(t => t.id === 'crowns')?.shortDesc || '',
    description: TREATMENTS.find(t => t.id === 'crowns')?.longDesc || '',
    hero_image: TREATMENTS.find(t => t.id === 'crowns')?.image || '',
    icon: 'Layers',
    display_order: 6,
    is_active: true
  },
  {
    id: 'whitening-srv',
    slug: 'teeth-whitening',
    title: 'Teeth Whitening',
    short_description: 'Brighten your smile with our premium clinical teeth whitening treatments.',
    description: 'Our state-of-the-art dental teeth whitening uses advanced clinical whitening gels and specialized curing light systems to safe and fast lighten stains and discolouration.',
    hero_image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600',
    icon: 'Sparkles',
    display_order: 7,
    is_active: true
  },
  {
    id: 'kids',
    slug: 'pediatric-dentistry',
    title: 'Pediatric Dentistry',
    short_description: TREATMENTS.find(t => t.id === 'kids')?.shortDesc || '',
    description: TREATMENTS.find(t => t.id === 'kids')?.longDesc || '',
    hero_image: TREATMENTS.find(t => t.id === 'kids')?.image || '',
    icon: 'Baby',
    display_order: 8,
    is_active: true
  },
  {
    id: 'braces-srv',
    slug: 'braces-treatment',
    title: 'Braces Treatment',
    short_description: TREATMENTS.find(t => t.id === 'braces')?.shortDesc || '',
    description: TREATMENTS.find(t => t.id === 'braces')?.longDesc || '',
    hero_image: TREATMENTS.find(t => t.id === 'braces')?.image || '',
    icon: 'Grid',
    display_order: 9,
    is_active: true
  },
  {
    id: 'wisdom-srv',
    slug: 'wisdom-tooth-surgery',
    title: 'Wisdom Tooth Surgery',
    short_description: TREATMENTS.find(t => t.id === 'wisdom')?.shortDesc || '',
    description: TREATMENTS.find(t => t.id === 'wisdom')?.longDesc || '',
    hero_image: TREATMENTS.find(t => t.id === 'wisdom')?.image || '',
    icon: 'Scissors',
    display_order: 10,
    is_active: true
  },
  {
    id: 'filling-srv',
    slug: 'tooth-coloured-filling',
    title: 'Tooth Coloured Filling (Composite Filling)',
    short_description: 'Composite Filling, also known as Tooth Coloured Filling, is a long-lasting and natural-looking restoration used to repair decayed, chipped or broken teeth.',
    description: 'Composite fillings are made from advanced ceramic and resin materials that chemically bond to the natural tooth, restoring both function and aesthetics.',
    hero_image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=600',
    icon: 'CheckCircle',
    display_order: 11,
    is_active: true
  }
];

export const serviceService = {
  /**
   * Fetch all services ordered by display_order ascending.
   */
  getServices: async (): Promise<Service[]> => {
    if (!isSupabaseConfigured()) {
      const stored = localStorage.getItem('hospital_services');
      if (stored) {
        try {
          const list = JSON.parse(stored) as Service[];
          let updated = false;
          const resultList = list.map(svc => {
            if (svc.id === 'rct' || svc.slug === 'root-canal-treatment') {
              const defaultSvc = DEFAULT_SERVICES.find(d => d.id === 'rct' || d.slug === 'root-canal-treatment');
              if (defaultSvc) {
                updated = true;
                const mConfigObj = typeof svc.marketing_config === 'string'
                  ? JSON.parse(svc.marketing_config)
                  : (svc.marketing_config || {});
                return {
                  ...svc,
                  title: defaultSvc.title,
                  short_description: defaultSvc.short_description,
                  hero_description: defaultSvc.hero_description,
                  description: defaultSvc.description,
                  process_steps: defaultSvc.process_steps,
                  features: defaultSvc.features,
                  patient_testimonials: defaultSvc.patient_testimonials,
                  hospital_team_photos: defaultSvc.hospital_team_photos,
                  procedure_video_title: defaultSvc.procedure_video_title,
                  procedure_video_url: defaultSvc.procedure_video_url,
                  marketing_config: {
                    ...mConfigObj,
                    ...(defaultSvc.marketing_config as MarketingConfig)
                  }
                };
              }
            }
            if (svc.id === 'implants-srv') {
              const defaultSvc = DEFAULT_SERVICES.find(d => d.id === 'implants-srv');
              const steps = Array.isArray(svc.process_steps) ? svc.process_steps : [];
              const rawFeats = typeof svc.features === 'string'
                ? JSON.parse(svc.features)
                : (Array.isArray(svc.features) ? svc.features : []);
              const mConfigObj = typeof svc.marketing_config === 'string'
                ? JSON.parse(svc.marketing_config)
                : (svc.marketing_config || {});
              const isBenefitsTitleMissing = !mConfigObj.benefits_section_title;
              if ((steps.length === 0 || rawFeats.length === 0 || isBenefitsTitleMissing) && defaultSvc) {
                updated = true;
                return {
                  ...svc,
                  process_steps: steps.length === 0 ? defaultSvc.process_steps : svc.process_steps,
                  features: rawFeats.length === 0 ? defaultSvc.features : svc.features,
                  marketing_config: {
                    ...mConfigObj,
                    process_section_title: mConfigObj.process_section_title || 'How We Perform Dental Implants',
                    benefits_section_title: mConfigObj.benefits_section_title || (defaultSvc.marketing_config as MarketingConfig)?.benefits_section_title
                  }
                };
              }
            }
            if (svc.id === 'fmr-srv' || svc.slug === 'full-mouth-rehabilitation') {
              const defaultSvc = DEFAULT_SERVICES.find(d => d.id === 'fmr-srv' || d.slug === 'full-mouth-rehabilitation');
              if (defaultSvc) {
                updated = true;
                const mConfigObj = typeof svc.marketing_config === 'string'
                  ? JSON.parse(svc.marketing_config)
                  : (svc.marketing_config || {});
                const defaultMCfg = (defaultSvc.marketing_config as MarketingConfig) || {};

                const testimonials = (Array.isArray(svc.patient_testimonials) && svc.patient_testimonials.length > 0)
                  ? svc.patient_testimonials
                  : (Array.isArray(mConfigObj.patient_testimonials) && mConfigObj.patient_testimonials.length > 0)
                    ? mConfigObj.patient_testimonials
                    : defaultSvc.patient_testimonials || [];

                const videoUrl = svc.procedure_video_url || mConfigObj.procedure_video_url || defaultSvc.procedure_video_url || '';
                const videoTitle = svc.procedure_video_title || mConfigObj.procedure_video_title || defaultSvc.procedure_video_title || 'Full Mouth Rehabilitation Procedure';

                const hospitalTeamPhotos = (Array.isArray(svc.hospital_team_photos) && svc.hospital_team_photos.length > 0)
                  ? svc.hospital_team_photos
                  : defaultSvc.hospital_team_photos || [];

                const galleryItems = (Array.isArray(mConfigObj.gallery_items) && mConfigObj.gallery_items.length > 0)
                  ? mConfigObj.gallery_items
                  : defaultMCfg.gallery_items || [];

                const beforeAfterPairs = (Array.isArray(mConfigObj.before_after_pairs) && mConfigObj.before_after_pairs.length > 0)
                  ? mConfigObj.before_after_pairs
                  : defaultMCfg.before_after_pairs || [];

                return {
                  ...svc,
                  title: defaultSvc.title,
                  short_description: defaultSvc.short_description,
                  hero_description: defaultSvc.hero_description,
                  description: defaultSvc.description,
                  process_steps: defaultSvc.process_steps,
                  features: defaultSvc.features,
                  procedure_video_url: videoUrl,
                  procedure_video_title: videoTitle,
                  patient_testimonials: testimonials,
                  hospital_team_photos: hospitalTeamPhotos,
                  marketing_config: {
                    ...defaultMCfg,
                    ...mConfigObj,
                    green_highlight_line: defaultMCfg.green_highlight_line,
                    process_section_title: defaultMCfg.process_section_title,
                    benefits_section_title: defaultMCfg.benefits_section_title,
                    candidate_section_title: defaultMCfg.candidate_section_title,
                    candidate_items: defaultMCfg.candidate_items,
                    gallery_heading: defaultMCfg.gallery_heading,
                    gallery_items: galleryItems,
                    cost_heading: defaultMCfg.cost_heading,
                    cost_description: defaultMCfg.cost_description,
                    cost_packages: defaultMCfg.cost_packages || [],
                    cost_cards: defaultMCfg.cost_cards || [],
                    phone_number: defaultMCfg.phone_number,
                    whatsapp_number: defaultMCfg.whatsapp_number,
                    faqs: defaultMCfg.faqs || [],
                    patient_testimonials: testimonials,
                    procedure_video_url: videoUrl,
                    procedure_video_title: videoTitle,
                    before_after_pairs: beforeAfterPairs,
                    before_after_heading: defaultMCfg.before_after_heading,
                    before_after_description: defaultMCfg.before_after_description,
                    show_candidate: mConfigObj.show_candidate !== false,
                    show_before_after: mConfigObj.show_before_after !== false,
                    show_procedure_video: mConfigObj.show_procedure_video !== false,
                    show_testimonials: mConfigObj.show_testimonials !== false,
                    show_faqs: false
                  }
                };
              }
            }
            const defaultSvc = DEFAULT_SERVICES.find(d => d.id === svc.id);
            if (defaultSvc && defaultSvc.marketing_config) {
              if (!svc.marketing_config) {
                return { ...svc, marketing_config: defaultSvc.marketing_config };
              } else {
                const mConfigObj = typeof svc.marketing_config === 'string'
                  ? JSON.parse(svc.marketing_config)
                  : (svc.marketing_config || {});
                if (mConfigObj.green_highlight_line === undefined && (defaultSvc.marketing_config as MarketingConfig)?.green_highlight_line) {
                  return {
                    ...svc,
                    marketing_config: {
                      ...mConfigObj,
                      green_highlight_line: (defaultSvc.marketing_config as MarketingConfig).green_highlight_line
                    }
                  };
                }
              }
            }
            return svc;
          });
          if (updated) {
            localStorage.setItem('hospital_services', JSON.stringify(resultList));
          }
          return resultList;
        } catch (e) {
          console.error('Failed to parse services from localStorage:', e);
        }
      }
      localStorage.setItem('hospital_services', JSON.stringify(DEFAULT_SERVICES));
      return DEFAULT_SERVICES;
    }

    try {
      const { data, error } = await supabase.client
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.warn('Error fetching services from Supabase, using local storage fallback:', error);
        const stored = localStorage.getItem('hospital_services');
        if (stored) {
          try {
            return JSON.parse(stored);
          } catch (e) {
            // ignore
          }
        }
        return DEFAULT_SERVICES;
      }

      if (!data || data.length === 0) {
        // Table is empty, seed default services
        const seedRows = DEFAULT_SERVICES.map(s => ({
          id: s.id,
          slug: s.slug,
          title: s.title,
          short_description: s.short_description,
          description: s.description,
          hero_image: s.hero_image,
          icon: s.icon || null,
          display_order: s.display_order,
          is_active: s.is_active,
          seo_title: s.seo_title || null,
          seo_description: s.seo_description || null,
          homepage_card_image: null,
          homepage_short_description: null,
          features: s.features || null,
          marketing_config: s.marketing_config || null,
          updated_at: new Date().toISOString()
        }));

        let { error: insertError } = await supabase.client
          .from('services')
          .insert(seedRows);

        if (insertError && (insertError.message?.includes('homepage_card_image') || insertError.message?.includes('homepage_short_description') || insertError.message?.includes('column'))) {
          console.warn('Seeding failed due to missing new columns, retrying without new fields...');
          const fallbackSeedRows = seedRows.map(({ homepage_card_image, homepage_short_description, ...rest }) => rest);
          const { error: retryInsertError } = await supabase.client
            .from('services')
            .insert(fallbackSeedRows);
          insertError = retryInsertError;
        }

        if (insertError) {
          console.warn('Error seeding default services:', insertError);
        }

        // Fetch immediately from database after seeding
        const { data: refetchedData, error: refetchError } = await supabase.client
          .from('services')
          .select('*')
          .order('display_order', { ascending: true });

        if (refetchError) {
          console.warn('Error re-fetching services after seeding:', refetchError);
          return DEFAULT_SERVICES;
        }

        return refetchedData || DEFAULT_SERVICES;
      } else {
        // Table is not empty, but check if any of the default services are missing and seed them
        const existingIds = new Set(data.map(s => s.id));
        const missingServices = DEFAULT_SERVICES.filter(s => !existingIds.has(s.id));

        if (missingServices.length > 0) {
          console.log(`Table has data but is missing ${missingServices.length} default services. Seeding missing ones...`);
          const seedRows = missingServices.map(s => ({
            id: s.id,
            slug: s.slug,
            title: s.title,
            short_description: s.short_description,
            description: s.description,
            hero_image: s.hero_image,
            icon: s.icon || null,
            display_order: s.display_order,
            is_active: s.is_active,
            seo_title: s.seo_title || null,
            seo_description: s.seo_description || null,
            homepage_card_image: null,
            homepage_short_description: null,
            features: s.features || null,
            marketing_config: s.marketing_config || null,
            updated_at: new Date().toISOString()
          }));

          let { error: insertError } = await supabase.client
            .from('services')
            .insert(seedRows);

          if (insertError && (insertError.message?.includes('homepage_card_image') || insertError.message?.includes('homepage_short_description') || insertError.message?.includes('column'))) {
            const fallbackSeedRows = seedRows.map(({ homepage_card_image, homepage_short_description, ...rest }) => rest);
            const { error: retryInsertError } = await supabase.client
              .from('services')
              .insert(fallbackSeedRows);
            insertError = retryInsertError;
          }

          if (insertError) {
            console.warn('Error seeding missing default services:', insertError);
          } else {
            // Re-fetch to get the complete set
            const { data: refetchedData, error: refetchError } = await supabase.client
              .from('services')
              .select('*')
              .order('display_order', { ascending: true });
            if (!refetchError && refetchedData) {
              return refetchedData;
            }
          }
        }
      }

      if (data && data.length > 0) {
        let needsRefetch = false;

        const rct = data.find(s => s.id === 'rct' || s.slug === 'root-canal-treatment');
        if (rct) {
          const defaultRct = DEFAULT_SERVICES.find(d => d.id === 'rct' || d.slug === 'root-canal-treatment');
          const mConfigObj = typeof rct.marketing_config === 'string'
            ? JSON.parse(rct.marketing_config)
            : (rct.marketing_config || {});
          if (defaultRct && (
            rct.title !== defaultRct.title || 
            rct.short_description !== defaultRct.short_description || 
            !rct.hero_description || 
            rct.short_description?.includes('Painless, highly advanced') ||
            !mConfigObj.google_reviews ||
            !Array.isArray(mConfigObj.google_reviews) ||
            mConfigObj.google_reviews.length === 0
          )) {
            const updatedRct = {
              ...rct,
              title: defaultRct.title,
              short_description: defaultRct.short_description,
              hero_description: defaultRct.hero_description,
              description: defaultRct.description,
              process_steps: defaultRct.process_steps,
              features: defaultRct.features,
              patient_testimonials: defaultRct.patient_testimonials,
              hospital_team_photos: defaultRct.hospital_team_photos,
              procedure_video_title: defaultRct.procedure_video_title,
              procedure_video_url: defaultRct.procedure_video_url,
              marketing_config: {
                ...mConfigObj,
                ...(defaultRct.marketing_config as MarketingConfig)
              }
            };
            await serviceService.saveService(updatedRct);
            needsRefetch = true;
          }
        }

        const implants = data.find(s => s.id === 'implants-srv');
        if (implants) {
          const steps = typeof implants.process_steps === 'string'
            ? JSON.parse(implants.process_steps)
            : (Array.isArray(implants.process_steps) ? implants.process_steps : []);
          const rawFeats = typeof implants.features === 'string'
            ? JSON.parse(implants.features)
            : (Array.isArray(implants.features) ? implants.features : []);
          const mConfig = typeof implants.marketing_config === 'string'
            ? JSON.parse(implants.marketing_config)
            : (implants.marketing_config || {});
          const isBenefitsTitleMissing = !mConfig.benefits_section_title;
          if (steps.length === 0 || rawFeats.length === 0 || isBenefitsTitleMissing) {
            const defaultSvc = DEFAULT_SERVICES.find(d => d.id === 'implants-srv');
            if (defaultSvc) {
              const updatedImplants = {
                ...implants,
                process_steps: steps.length === 0 ? defaultSvc.process_steps : steps,
                features: rawFeats.length === 0 ? defaultSvc.features : rawFeats,
                marketing_config: {
                  ...mConfig,
                  process_section_title: mConfig.process_section_title || 'How We Perform Dental Implants',
                  benefits_section_title: mConfig.benefits_section_title || (defaultSvc.marketing_config as MarketingConfig)?.benefits_section_title
                }
              };
              await serviceService.saveService(updatedImplants);
              needsRefetch = true;
            }
          }
        }

        const fmr = data.find(s => s.id === 'fmr-srv' || s.slug === 'full-mouth-rehabilitation' || s.id === 'fullmouth');
        if (fmr) {
          const defaultFmr = DEFAULT_SERVICES.find(d => d.id === 'fmr-srv' || d.slug === 'full-mouth-rehabilitation');
          const mConfigObj = typeof fmr.marketing_config === 'string'
            ? JSON.parse(fmr.marketing_config)
            : (fmr.marketing_config || {});
          if (defaultFmr && (
            fmr.short_description !== defaultFmr.short_description ||
            !mConfigObj.candidate_items ||
            mConfigObj.candidate_items.length === 0 ||
            mConfigObj.cost_heading !== (defaultFmr.marketing_config as MarketingConfig)?.cost_heading
          )) {
            const defaultMCfg = (defaultFmr.marketing_config as MarketingConfig) || {};
            const updatedFmr = {
              ...fmr,
              title: defaultFmr.title,
              short_description: defaultFmr.short_description,
              hero_description: defaultFmr.hero_description,
              description: defaultFmr.description,
              process_steps: defaultFmr.process_steps,
              features: defaultFmr.features,
              marketing_config: {
                ...defaultMCfg,
                ...mConfigObj,
                candidate_items: defaultMCfg.candidate_items,
                cost_heading: defaultMCfg.cost_heading,
                cost_description: defaultMCfg.cost_description,
                green_highlight_line: defaultMCfg.green_highlight_line,
                process_section_title: defaultMCfg.process_section_title,
                benefits_section_title: defaultMCfg.benefits_section_title,
                candidate_section_title: defaultMCfg.candidate_section_title,
                phone_number: defaultMCfg.phone_number,
                whatsapp_number: defaultMCfg.whatsapp_number,
                show_faqs: false
              }
            };
            await serviceService.saveService(updatedFmr);
            needsRefetch = true;
          }
        }

        if (needsRefetch) {
          const { data: refetched } = await supabase.client
            .from('services')
            .select('*')
            .order('display_order', { ascending: true });
          if (refetched) return refetched;
        }
      }

      return data || [];
    } catch (e) {
      console.warn('Exception in getServices:', e);
      return DEFAULT_SERVICES;
    }
  },

  /**
   * Fetch a service by its slug.
   */
  getServiceBySlug: async (slug: string): Promise<Service | null> => {
    let resolvedSlug = slug;
    if (slug === 'laser-teeth-whitening') {
      resolvedSlug = 'teeth-whitening';
    } else if (slug === 'clear-aligners') {
      resolvedSlug = 'invisible-aligners';
    }

    if (!isSupabaseConfigured()) {
      const services = await serviceService.getServices();
      let found = services.find(s => s.slug === resolvedSlug);
      if (!found && resolvedSlug === 'teeth-whitening') {
        found = services.find(s => s.slug === 'laser-teeth-whitening');
      }
      if (!found && resolvedSlug === 'invisible-aligners') {
        found = services.find(s => s.slug === 'clear-aligners');
      }
      return found || null;
    }

    try {
      const { data, error } = await supabase.client
        .from('services')
        .select('*')
        .eq('slug', resolvedSlug)
        .maybeSingle();

      if (error) {
        console.warn('Error fetching service by slug:', error);
        const services = await serviceService.getServices();
        let found = services.find(s => s.slug === resolvedSlug);
        if (!found && resolvedSlug === 'teeth-whitening') {
          found = services.find(s => s.slug === 'laser-teeth-whitening');
        }
        if (!found && resolvedSlug === 'invisible-aligners') {
          found = services.find(s => s.slug === 'clear-aligners');
        }
        return found || null;
      }

      if (!data) {
        // Fallback check if the other slug name was saved instead
        const fallbackSlug = resolvedSlug === 'teeth-whitening' ? 'laser-teeth-whitening' : 
                             resolvedSlug === 'invisible-aligners' ? 'clear-aligners' : null;
        if (fallbackSlug) {
          const { data: fbData, error: fbError } = await supabase.client
            .from('services')
            .select('*')
            .eq('slug', fallbackSlug)
            .maybeSingle();
          if (!fbError && fbData) {
            // Check if this implants record needs auto-populate
            if (fbData.id === 'implants-srv') {
              const steps = typeof fbData.process_steps === 'string'
                ? JSON.parse(fbData.process_steps)
                : (Array.isArray(fbData.process_steps) ? fbData.process_steps : []);
              const rawFeats = typeof fbData.features === 'string'
                ? JSON.parse(fbData.features)
                : (Array.isArray(fbData.features) ? fbData.features : []);
              const mConfig = typeof fbData.marketing_config === 'string'
                ? JSON.parse(fbData.marketing_config)
                : (fbData.marketing_config || {});
              const isBenefitsTitleMissing = !mConfig.benefits_section_title;
              if (steps.length === 0 || rawFeats.length === 0 || isBenefitsTitleMissing) {
                const defaultSvc = DEFAULT_SERVICES.find(d => d.id === 'implants-srv');
                if (defaultSvc) {
                  const updatedImplants = {
                    ...fbData,
                    process_steps: steps.length === 0 ? defaultSvc.process_steps : steps,
                    features: rawFeats.length === 0 ? defaultSvc.features : rawFeats,
                    marketing_config: {
                      ...mConfig,
                      process_section_title: mConfig.process_section_title || 'How We Perform Dental Implants',
                      benefits_section_title: mConfig.benefits_section_title || (defaultSvc.marketing_config as MarketingConfig)?.benefits_section_title
                    }
                  };
                  await serviceService.saveService(updatedImplants);
                  return updatedImplants;
                }
              }
            }
            return fbData;
          }
        }

        // If not found in database, fallback to DEFAULT_SERVICES
        const services = await serviceService.getServices();
        let found = services.find(s => s.slug === resolvedSlug);
        if (!found && resolvedSlug === 'teeth-whitening') {
          found = services.find(s => s.slug === 'laser-teeth-whitening');
        }
        if (!found && resolvedSlug === 'invisible-aligners') {
          found = services.find(s => s.slug === 'clear-aligners');
        }
        return found || null;
      }

      if (data && (data.id === 'rct' || data.slug === 'root-canal-treatment')) {
        const defaultRct = DEFAULT_SERVICES.find(d => d.id === 'rct' || d.slug === 'root-canal-treatment');
        const mConfigObj = typeof data.marketing_config === 'string'
          ? JSON.parse(data.marketing_config)
          : (data.marketing_config || {});
        if (defaultRct && (
          data.title !== defaultRct.title || 
          data.short_description !== defaultRct.short_description || 
          !data.hero_description || 
          data.short_description?.includes('Painless, highly advanced') ||
          !mConfigObj.google_reviews ||
          !Array.isArray(mConfigObj.google_reviews) ||
          mConfigObj.google_reviews.length === 0
        )) {
          const updatedRct = {
            ...data,
            title: defaultRct.title,
            short_description: defaultRct.short_description,
            hero_description: defaultRct.hero_description,
            description: defaultRct.description,
            process_steps: defaultRct.process_steps,
            features: defaultRct.features,
            patient_testimonials: defaultRct.patient_testimonials,
            hospital_team_photos: defaultRct.hospital_team_photos,
            procedure_video_title: defaultRct.procedure_video_title,
            procedure_video_url: defaultRct.procedure_video_url,
            marketing_config: {
              ...mConfigObj,
              ...(defaultRct.marketing_config as MarketingConfig)
            }
          };
          await serviceService.saveService(updatedRct);
          return updatedRct;
        }
      }

      if (data && (data.id === 'fmr-srv' || data.slug === 'full-mouth-rehabilitation' || data.id === 'fullmouth')) {
        const defaultFmr = DEFAULT_SERVICES.find(d => d.id === 'fmr-srv' || d.slug === 'full-mouth-rehabilitation');
        const mConfigObj = typeof data.marketing_config === 'string'
          ? JSON.parse(data.marketing_config)
          : (data.marketing_config || {});
        if (defaultFmr && (
          data.short_description !== defaultFmr.short_description || 
          !data.hero_description || 
          data.short_description?.includes('combination of restorative') ||
          !mConfigObj.candidate_items ||
          !Array.isArray(mConfigObj.candidate_items) ||
          mConfigObj.candidate_items.length === 0 ||
          mConfigObj.cost_heading !== (defaultFmr.marketing_config as MarketingConfig)?.cost_heading
        )) {
          const updatedFmr = {
            ...data,
            title: defaultFmr.title,
            short_description: defaultFmr.short_description,
            hero_description: defaultFmr.hero_description,
            description: defaultFmr.description,
            process_steps: defaultFmr.process_steps,
            features: defaultFmr.features,
            patient_testimonials: defaultFmr.patient_testimonials,
            hospital_team_photos: defaultFmr.hospital_team_photos,
            procedure_video_title: defaultFmr.procedure_video_title,
            procedure_video_url: defaultFmr.procedure_video_url,
            marketing_config: {
              ...mConfigObj,
              ...(defaultFmr.marketing_config as MarketingConfig)
            }
          };
          await serviceService.saveService(updatedFmr);
          return updatedFmr;
        }
      }

      if (data && data.id === 'implants-srv') {
        const steps = typeof data.process_steps === 'string'
          ? JSON.parse(data.process_steps)
          : (Array.isArray(data.process_steps) ? data.process_steps : []);
        const rawFeats = typeof data.features === 'string'
          ? JSON.parse(data.features)
          : (Array.isArray(data.features) ? data.features : []);
        const mConfig = typeof data.marketing_config === 'string'
          ? JSON.parse(data.marketing_config)
          : (data.marketing_config || {});
        const isBenefitsTitleMissing = !mConfig.benefits_section_title;
        if (steps.length === 0 || rawFeats.length === 0 || isBenefitsTitleMissing) {
          const defaultSvc = DEFAULT_SERVICES.find(d => d.id === 'implants-srv');
          if (defaultSvc) {
            const updatedImplants = {
              ...data,
              process_steps: steps.length === 0 ? defaultSvc.process_steps : steps,
              features: rawFeats.length === 0 ? defaultSvc.features : rawFeats,
              marketing_config: {
                ...mConfig,
                process_section_title: mConfig.process_section_title || 'How We Perform Dental Implants',
                benefits_section_title: mConfig.benefits_section_title || (defaultSvc.marketing_config as MarketingConfig)?.benefits_section_title
              }
            };
            await serviceService.saveService(updatedImplants);
            return updatedImplants;
          }
        }
      }

      return data;
    } catch (e) {
      console.error('Exception in getServiceBySlug:', e);
      // Fallback on exception
      const services = await serviceService.getServices();
      let found = services.find(s => s.slug === resolvedSlug);
      if (!found && resolvedSlug === 'teeth-whitening') {
        found = services.find(s => s.slug === 'laser-teeth-whitening');
      }
      if (!found && resolvedSlug === 'invisible-aligners') {
        found = services.find(s => s.slug === 'clear-aligners');
      }
      return found || null;
    }
  },

  /**
   * Save (Insert/Update) a service record.
   */
  saveService: async (service: Service): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseConfigured()) {
      try {
        const services = await serviceService.getServices();
        const existingIndex = services.findIndex(s => s.id === service.id);
        if (existingIndex >= 0) {
          services[existingIndex] = { ...services[existingIndex], ...service };
        } else {
          services.push(service);
        }
        localStorage.setItem('hospital_services', JSON.stringify(services));
        return { success: true };
      } catch (e: any) {
        return { success: false, error: e.message || String(e) };
      }
    }

    console.log('Saving Service...');
    try {
      let { error } = await supabase.client
        .from('services')
        .upsert({
          id: service.id,
          slug: service.slug,
          title: service.title,
          short_description: service.short_description,
          description: service.description,
          hero_image: service.hero_image,
          icon: service.icon || null,
          display_order: service.display_order,
          is_active: service.is_active,
          seo_title: service.seo_title || null,
          seo_description: service.seo_description || null,
          homepage_card_image: service.homepage_card_image || null,
          homepage_short_description: service.homepage_short_description || null,
          hero_title: service.hero_title || null,
          hero_description: service.hero_description || null,
          hero_image_caption: service.hero_image_caption || null,
          intro_title: service.intro_title || null,
          intro_description: service.intro_description || null,
          process_steps: service.process_steps || null,
          features: service.features || null,
          content_images: service.content_images || null,
          procedure_video_url: service.procedure_video_url || null,
          procedure_video_title: service.procedure_video_title || null,
          procedure_video_description: service.procedure_video_description || null,
          procedure_video_thumbnail: service.procedure_video_thumbnail || null,
          patient_testimonials: service.patient_testimonials || null,
          hospital_team_photos: service.hospital_team_photos || null,
          marketing_config: service.marketing_config || null,
          updated_at: new Date().toISOString()
        });

      if (error && (error.message?.includes('marketing_config') || error.message?.includes('column "marketing_config"'))) {
        console.warn('marketing_config column might not exist yet in Supabase table. Retrying save without marketing_config...', error);
        const { error: retryError } = await supabase.client
          .from('services')
          .upsert({
            id: service.id,
            slug: service.slug,
            title: service.title,
            short_description: service.short_description,
            description: service.description,
            hero_image: service.hero_image,
            icon: service.icon || null,
            display_order: service.display_order,
            is_active: service.is_active,
            seo_title: service.seo_title || null,
            seo_description: service.seo_description || null,
            homepage_card_image: service.homepage_card_image || null,
            homepage_short_description: service.homepage_short_description || null,
            hero_title: service.hero_title || null,
            hero_description: service.hero_description || null,
            hero_image_caption: service.hero_image_caption || null,
            intro_title: service.intro_title || null,
            intro_description: service.intro_description || null,
            process_steps: service.process_steps || null,
            features: service.features || null,
            content_images: service.content_images || null,
            procedure_video_url: service.procedure_video_url || null,
            procedure_video_title: service.procedure_video_title || null,
            procedure_video_description: service.procedure_video_description || null,
            procedure_video_thumbnail: service.procedure_video_thumbnail || null,
            patient_testimonials: service.patient_testimonials || null,
            hospital_team_photos: service.hospital_team_photos || null,
            updated_at: new Date().toISOString()
          });
        error = retryError;
      }

      if (error && (error.message?.includes('homepage_card_image') || error.message?.includes('homepage_short_description') || error.message?.includes('hero_title') || error.message?.includes('content_images') || error.message?.includes('column'))) {
        console.warn('New columns might not exist yet in Supabase table. Retrying save with basic fields only...', error);
        // Retry without the new fields
        const { error: retryError } = await supabase.client
          .from('services')
          .upsert({
            id: service.id,
            slug: service.slug,
            title: service.title,
            short_description: service.short_description,
            description: service.description,
            hero_image: service.hero_image,
            icon: service.icon || null,
            display_order: service.display_order,
            is_active: service.is_active,
            seo_title: service.seo_title || null,
            seo_description: service.seo_description || null,
            updated_at: new Date().toISOString()
          });
        error = retryError;
      }

      if (error) {
        console.log(`Supabase Error: ${error.message}`);
        console.error('Error upserting service:', error);
        return { success: false, error: error.message || JSON.stringify(error) };
      }

      console.log('Service Saved');
      return { success: true };
    } catch (e: any) {
      console.log(`Supabase Error: ${e.message || String(e)}`);
      console.error('Exception in saveService:', e);
      return { success: false, error: e.message || String(e) };
    }
  },

  /**
   * Delete a service by its ID.
   * Cascade delete will automatically clean up referencing gallery and faq entries.
   */
  deleteService: async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      try {
        const services = await serviceService.getServices();
        const filtered = services.filter(s => s.id !== id);
        localStorage.setItem('hospital_services', JSON.stringify(filtered));
        return true;
      } catch (e) {
        return false;
      }
    }

    try {
      const { error } = await supabase.client
        .from('services')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting service:', error);
        return false;
      }

      return true;
    } catch (e) {
      console.error('Exception in deleteService:', e);
      return false;
    }
  },

  /**
   * Fetch all gallery items associated with a service, ordered by display_order.
   */
  getGallery: async (serviceId: string): Promise<ServiceGalleryItem[]> => {
    if (!isSupabaseConfigured()) {
      const stored = localStorage.getItem(`gallery_${serviceId}`);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse gallery from localStorage:', e);
        }
      }
      const defaults = DEFAULT_SERVICE_GALLERY.filter(item => item.service_id === serviceId);
      localStorage.setItem(`gallery_${serviceId}`, JSON.stringify(defaults));
      return defaults;
    }

    try {
      const { data, error } = await supabase.client
        .from('service_gallery')
        .select('*')
        .eq('service_id', serviceId)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching service gallery:', error);
        return [];
      }

      // Check if the service_gallery table is empty across all services
      const { count } = await supabase.client
        .from('service_gallery')
        .select('*', { count: 'exact', head: true });

      if (count === 0) {
        console.log('service_gallery table is empty, seeding default service gallery...');
        const { error: insertError } = await supabase.client
          .from('service_gallery')
          .insert(DEFAULT_SERVICE_GALLERY);

        if (insertError) {
          console.warn('Error seeding default service gallery:', insertError);
        } else {
          // Re-fetch immediate data for the requested service
          const { data: refetchedData, error: refetchError } = await supabase.client
            .from('service_gallery')
            .select('*')
            .eq('service_id', serviceId)
            .order('display_order', { ascending: true });

          if (!refetchError && refetchedData) {
            return refetchedData;
          }
        }
      }

      return data || [];
    } catch (e) {
      console.error('Exception in getGallery:', e);
      return [];
    }
  },

  /**
   * Sync/save the entire gallery array for a specific service.
   * Deletes those not present in the current set, and upserts current set.
   */
  saveGallery: async (serviceId: string, items: ServiceGalleryItem[]): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseConfigured()) {
      try {
        localStorage.setItem(`gallery_${serviceId}`, JSON.stringify(items));
        return { success: true };
      } catch (e: any) {
        return { success: false, error: e.message || String(e) };
      }
    }

    console.log('Saving Gallery...');
    try {
      // Rule 3: Never attempt to insert into service_gallery or service_faqs unless the parent service already exists.
      const { data: serviceExists, error: serviceCheckError } = await supabase.client
        .from('services')
        .select('id')
        .eq('id', serviceId)
        .maybeSingle();

      if (serviceCheckError || !serviceExists) {
        const checkErrorMsg = serviceCheckError 
          ? serviceCheckError.message 
          : `Parent service with ID "${serviceId}" does not exist in the database. Please save the service first.`;
        console.log(`Supabase Error: ${checkErrorMsg}`);
        return { success: false, error: checkErrorMsg };
      }

      const itemIds = items.map(item => item.id);

      // 1. Delete old items that are no longer in the list
      if (itemIds.length > 0) {
        const { error: deleteError } = await supabase.client
          .from('service_gallery')
          .delete()
          .eq('service_id', serviceId)
          .not('id', 'in', `(${itemIds.map(id => `'${id}'`).join(',')})`);

        if (deleteError) {
          console.log(`Supabase Error: ${deleteError.message}`);
          console.error('Error deleting obsolete gallery items:', deleteError);
          return { success: false, error: deleteError.message || JSON.stringify(deleteError) };
        }
      } else {
        const { error: deleteError } = await supabase.client
          .from('service_gallery')
          .delete()
          .eq('service_id', serviceId);

        if (deleteError) {
          console.log(`Supabase Error: ${deleteError.message}`);
          console.error('Error clearing gallery:', deleteError);
          return { success: false, error: deleteError.message || JSON.stringify(deleteError) };
        }
      }

      // 2. Upsert current list items
      if (items.length > 0) {
        const rowsToUpsert = items.map((item, idx) => ({
          id: item.id,
          service_id: serviceId,
          image_url: item.image_url,
          title: item.title || null,
          caption: item.caption || null,
          alt_text: item.alt_text || null,
          display_order: item.display_order !== undefined ? item.display_order : idx
        }));

        let { error: upsertError } = await supabase.client
          .from('service_gallery')
          .upsert(rowsToUpsert);

        if (upsertError && (upsertError.message?.includes('title') || upsertError.message?.includes('column'))) {
          console.warn('The title column might be missing from service_gallery, retrying upsert without title field...');
          const rowsFallback = items.map((item, idx) => ({
            id: item.id,
            service_id: serviceId,
            image_url: item.image_url,
            caption: item.caption || null,
            alt_text: item.alt_text || null,
            display_order: item.display_order !== undefined ? item.display_order : idx
          }));
          const { error: retryError } = await supabase.client
            .from('service_gallery')
            .upsert(rowsFallback);
          upsertError = retryError;
        }

        if (upsertError) {
          console.log(`Supabase Error: ${upsertError.message}`);
          console.error('Error upserting gallery items:', upsertError);
          return { success: false, error: upsertError.message || JSON.stringify(upsertError) };
        }
      }

      console.log('Gallery Saved');
      return { success: true };
    } catch (e: any) {
      console.log(`Supabase Error: ${e.message || String(e)}`);
      console.error('Exception in saveGallery:', e);
      return { success: false, error: e.message || String(e) };
    }
  },

  /**
   * Delete a single gallery image by its unique ID.
   */
  deleteGalleryImage: async (id: string): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseConfigured()) {
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('gallery_')) {
            const stored = localStorage.getItem(key);
            if (stored) {
              const items: ServiceGalleryItem[] = JSON.parse(stored);
              const filtered = items.filter(item => item.id !== id);
              if (filtered.length !== items.length) {
                localStorage.setItem(key, JSON.stringify(filtered));
              }
            }
          }
        }
        return { success: true };
      } catch (e: any) {
        return { success: false, error: e.message || String(e) };
      }
    }

    try {
      const { error } = await supabase.client
        .from('service_gallery')
        .delete()
        .eq('id', id);

      if (error) {
        console.log(`Supabase Error: ${error.message}`);
        console.error('Error deleting gallery image:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (e: any) {
      console.log(`Supabase Error: ${e.message || String(e)}`);
      console.error('Exception in deleteGalleryImage:', e);
      return { success: false, error: e.message || String(e) };
    }
  },

  /**
   * Fetch all FAQs associated with a service, ordered by display_order.
   */
  getFaqs: async (serviceId: string): Promise<ServiceFaq[]> => {
    if (!isSupabaseConfigured()) {
      const stored = localStorage.getItem(`faqs_${serviceId}`);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse FAQs from localStorage:', e);
        }
      }
      const defaults = DEFAULT_SERVICE_FAQS.filter(item => item.service_id === serviceId);
      localStorage.setItem(`faqs_${serviceId}`, JSON.stringify(defaults));
      return defaults;
    }

    try {
      const { data, error } = await supabase.client
        .from('service_faqs')
        .select('*')
        .eq('service_id', serviceId)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching service FAQs:', error);
        return [];
      }

      // Check if service_faqs is empty
      const { count } = await supabase.client
        .from('service_faqs')
        .select('*', { count: 'exact', head: true });

      if (count === 0) {
        console.log('service_faqs table is empty, seeding default service FAQs...');
        const { error: insertError } = await supabase.client
          .from('service_faqs')
          .insert(DEFAULT_SERVICE_FAQS);

        if (insertError) {
          console.warn('Error seeding default service FAQs:', insertError);
        } else {
          // Re-fetch immediate data for the requested service
          const { data: refetchedData, error: refetchError } = await supabase.client
            .from('service_faqs')
            .select('*')
            .eq('service_id', serviceId)
            .order('display_order', { ascending: true });

          if (!refetchError && refetchedData) {
            return refetchedData;
          }
        }
      }

      return data || [];
    } catch (e) {
      console.error('Exception in getFaqs:', e);
      return [];
    }
  },

  /**
   * Sync/save the entire FAQs array for a specific service.
   * Deletes those not present in the current set, and upserts current set.
   */
  saveFaqs: async (serviceId: string, faqs: ServiceFaq[]): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseConfigured()) {
      try {
        localStorage.setItem(`faqs_${serviceId}`, JSON.stringify(faqs));
        return { success: true };
      } catch (e: any) {
        return { success: false, error: e.message || String(e) };
      }
    }

    console.log('Saving FAQ...');
    try {
      // Rule 3: Never attempt to insert into service_gallery or service_faqs unless the parent service already exists.
      const { data: serviceExists, error: serviceCheckError } = await supabase.client
        .from('services')
        .select('id')
        .eq('id', serviceId)
        .maybeSingle();

      if (serviceCheckError || !serviceExists) {
        const checkErrorMsg = serviceCheckError 
          ? serviceCheckError.message 
          : `Parent service with ID "${serviceId}" does not exist in the database. Please save the service first.`;
        console.log(`Supabase Error: ${checkErrorMsg}`);
        return { success: false, error: checkErrorMsg };
      }

      const faqIds = faqs.map(faq => faq.id);

      // 1. Delete old FAQs that are no longer in the list
      if (faqIds.length > 0) {
        const { error: deleteError } = await supabase.client
          .from('service_faqs')
          .delete()
          .eq('service_id', serviceId)
          .not('id', 'in', `(${faqIds.map(id => `'${id}'`).join(',')})`);

        if (deleteError) {
          console.log(`Supabase Error: ${deleteError.message}`);
          console.error('Error deleting obsolete FAQs:', deleteError);
          return { success: false, error: deleteError.message || JSON.stringify(deleteError) };
        }
      } else {
        const { error: deleteError } = await supabase.client
          .from('service_faqs')
          .delete()
          .eq('service_id', serviceId);

        if (deleteError) {
          console.log(`Supabase Error: ${deleteError.message}`);
          console.error('Error clearing FAQs:', deleteError);
          return { success: false, error: deleteError.message || JSON.stringify(deleteError) };
        }
      }

      // 2. Upsert current FAQs
      if (faqs.length > 0) {
        const rowsToUpsert = faqs.map((faq, idx) => ({
          id: faq.id,
          service_id: serviceId,
          question: faq.question,
          answer: faq.answer,
          display_order: faq.display_order !== undefined ? faq.display_order : idx
        }));

        const { error: upsertError } = await supabase.client
          .from('service_faqs')
          .upsert(rowsToUpsert);

        if (upsertError) {
          console.log(`Supabase Error: ${upsertError.message}`);
          console.error('Error upserting FAQs:', upsertError);
          return { success: false, error: upsertError.message || JSON.stringify(upsertError) };
        }
      }

      console.log('FAQ Saved');
      return { success: true };
    } catch (e: any) {
      console.log(`Supabase Error: ${e.message || String(e)}`);
      console.error('Exception in saveFaqs:', e);
      return { success: false, error: e.message || String(e) };
    }
  },

  /**
   * Delete a single FAQ by its unique ID.
   */
  deleteFaq: async (id: string): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseConfigured()) {
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('faqs_')) {
            const stored = localStorage.getItem(key);
            if (stored) {
              const items: ServiceFaq[] = JSON.parse(stored);
              const filtered = items.filter(item => item.id !== id);
              if (filtered.length !== items.length) {
                localStorage.setItem(key, JSON.stringify(filtered));
              }
            }
          }
        }
        return { success: true };
      } catch (e: any) {
        return { success: false, error: e.message || String(e) };
      }
    }

    try {
      const { error } = await supabase.client
        .from('service_faqs')
        .delete()
        .eq('id', id);

      if (error) {
        console.log(`Supabase Error: ${error.message}`);
        console.error('Error deleting FAQ:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (e: any) {
      console.log(`Supabase Error: ${e.message || String(e)}`);
      console.error('Exception in deleteFaq:', e);
      return { success: false, error: e.message || String(e) };
    }
  }
};

export const DEFAULT_SERVICE_GALLERY: ServiceGalleryItem[] = [
  // Dental Implants
  {
    id: 'gal-implants-1',
    service_id: 'implants-srv',
    image_url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=600',
    caption: 'State-of-the-art titanium dental implant procedure setup',
    alt_text: 'Dental implant procedure',
    display_order: 1
  },
  {
    id: 'gal-implants-2',
    service_id: 'implants-srv',
    image_url: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?q=80&w=600',
    caption: 'Precisely fitted ceramic crown on custom titanium implant anchor',
    alt_text: 'Fitted ceramic crown on titanium implant',
    display_order: 2
  },
  {
    id: 'gal-implants-3',
    service_id: 'implants-srv',
    image_url: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=600',
    caption: 'Advanced digital CBCT diagnostics for implant planning',
    alt_text: 'Advanced dental diagnostics planning',
    display_order: 3
  },

  // Full Mouth Rehabilitation
  {
    id: 'gal-fmr-1',
    service_id: 'fmr-srv',
    image_url: 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?q=80&w=600',
    caption: 'Comprehensive full arch smile rehabilitation mapping',
    alt_text: 'Comprehensive full mouth rehabilitation',
    display_order: 1
  },
  {
    id: 'gal-fmr-2',
    service_id: 'fmr-srv',
    image_url: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=600',
    caption: 'Restored occlusion and vertical dimension with premium zirconia prosthetics',
    alt_text: 'Full mouth restoration results',
    display_order: 2
  },

  // Clear Aligners
  {
    id: 'gal-aligners-1',
    service_id: 'aligners-srv',
    image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600',
    caption: 'Premium custom orthodontic clear aligner trays',
    alt_text: 'Clear aligner trays',
    display_order: 1
  },
  {
    id: 'gal-aligners-2',
    service_id: 'aligners-srv',
    image_url: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=600',
    caption: 'Invisible orthodontic alignment session for adult patients',
    alt_text: 'Invisible orthodontic session',
    display_order: 2
  },

  // Root Canal Treatment
  {
    id: 'gal-rct-1',
    service_id: 'rct',
    image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600',
    caption: 'Precision endodontic procedure with digital rotary apex locator',
    alt_text: 'Endodontic procedure',
    display_order: 1
  },
  {
    id: 'gal-rct-2',
    service_id: 'rct',
    image_url: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?q=80&w=600',
    caption: 'Laser sterilization of root canal pathways',
    alt_text: 'Laser root canal sterilization',
    display_order: 2
  },

  // Smile Makeover
  {
    id: 'gal-smile-1',
    service_id: 'smile-srv',
    image_url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600',
    caption: 'Post-treatment smile transformation using porcelain veneers',
    alt_text: 'Smile makeover porcelain veneers',
    display_order: 1
  },
  {
    id: 'gal-smile-2',
    service_id: 'smile-srv',
    image_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600',
    caption: 'Perfected alignment, symmetry, and shade match results',
    alt_text: 'Perfect smile shade match',
    display_order: 2
  },

  // Crowns & Bridges
  {
    id: 'gal-crowns-1',
    service_id: 'crowns',
    image_url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=600',
    caption: 'Prepped structure for customized zirconia crown placement',
    alt_text: 'Zirconia crown placement',
    display_order: 1
  },
  {
    id: 'gal-crowns-2',
    service_id: 'crowns',
    image_url: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?q=80&w=600',
    caption: 'Precision 3D CAD/CAM scan of dental bridge model',
    alt_text: 'Dental bridge scan',
    display_order: 2
  },

  // Kids Dentistry
  {
    id: 'gal-kids-1',
    service_id: 'kids',
    image_url: 'https://images.unsplash.com/photo-1484981138541-3d074aa97716?q=80&w=600',
    caption: 'Friendly pediatric dental checkup and dental health education',
    alt_text: 'Pediatric dental checkup',
    display_order: 1
  },
  {
    id: 'gal-kids-2',
    service_id: 'kids',
    image_url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=600',
    caption: 'Fluoride varnish treatment in a comfortable, anxiety-free setting',
    alt_text: 'Kids fluoride treatment',
    display_order: 2
  }
];

export const DEFAULT_SERVICE_FAQS: ServiceFaq[] = [
  // Dental Implants
  {
    id: 'faq-implants-1',
    service_id: 'implants-srv',
    question: 'How long do dental implants last?',
    answer: 'With proper oral hygiene and regular professional dental checkups, titanium dental implants can last a lifetime. The ceramic crown attached to the implant typically lasts 10 to 15 years before natural wear may require replacement.',
    display_order: 1
  },
  {
    id: 'faq-implants-2',
    service_id: 'implants-srv',
    question: 'Is the dental implant procedure painful?',
    answer: 'The procedure is performed under local anesthesia, meaning you will feel absolutely no pain during the surgery. After the anesthesia wears off, there may be mild discomfort which can be easily managed with standard prescribed painkillers.',
    display_order: 2
  },
  {
    id: 'faq-implants-3',
    service_id: 'implants-srv',
    question: 'Am I a candidate for dental implants?',
    answer: 'Generally, anyone with missing teeth who has adequate jawbone density and healthy gums is an excellent candidate for dental implants. We perform a full 3D CBCT scan during your consultation to verify your bone structure.',
    display_order: 3
  },

  // Full Mouth Rehabilitation
  {
    id: 'faq-fmr-1',
    service_id: 'fmr-srv',
    question: 'What is Full Mouth Rehabilitation?',
    answer: 'It is a comprehensive clinical treatment plan that combines multiple procedures—such as crowns, bridges, dental implants, and veneers—to restore the function, health, and aesthetics of a patient’s entire bite and oral structure.',
    display_order: 1
  },
  {
    id: 'faq-fmr-2',
    service_id: 'fmr-srv',
    question: 'How long does a Full Mouth Rehabilitation take?',
    answer: 'Because of its highly customized nature, the timeline can vary. Simple reconstructions take about 2 to 3 weeks, while complex cases involving bone grafts or implant healing can be phased over several months.',
    display_order: 2
  },

  // Clear Aligners
  {
    id: 'faq-aligners-1',
    service_id: 'aligners-srv',
    question: 'How many hours a day must I wear my clear aligners?',
    answer: 'For optimal results, you must wear your clear aligners for 20 to 22 hours every day. You should only remove them when eating, drinking anything other than water, brushing, and flossing.',
    display_order: 1
  },
  {
    id: 'faq-aligners-2',
    service_id: 'aligners-srv',
    question: 'Are clear aligners really invisible?',
    answer: 'Yes! They are made of medical-grade transparent polyurethane plastic. Once they are fitted over your teeth, they are virtually unnoticeable to others, making them an excellent choice for professionals.',
    display_order: 2
  },

  // Root Canal Treatment
  {
    id: 'faq-rct-1',
    service_id: 'rct',
    question: 'Is a root canal painful?',
    answer: 'With modern micro-endodontic rotary files and advanced local anesthetics, a root canal is as painless and comfortable as getting a standard dental filling. The procedure actually relieves the intense pain caused by the tooth infection.',
    display_order: 1
  },
  {
    id: 'faq-rct-2',
    service_id: 'rct',
    question: 'Why do I need a crown after a root canal?',
    answer: 'After a root canal, the tooth loses its internal blood and nerve supply, which can make it brittle and susceptible to fracture under chewing pressure. A customized crown covers and strengthens the tooth structure completely.',
    display_order: 2
  },

  // Smile Makeover
  {
    id: 'faq-smile-1',
    service_id: 'smile-srv',
    question: 'What treatments are included in a Smile Makeover?',
    answer: 'A smile makeover is tailored to your unique goals. It can include teeth whitening, porcelain veneers, cosmetic bonding, clear aligners, and laser gum contouring to achieve the perfect balance and symmetry.',
    display_order: 1
  },
  {
    id: 'faq-smile-2',
    service_id: 'smile-srv',
    question: 'How long does a Smile Makeover take?',
    answer: 'Porcelain veneer treatments can be completed in just 2 to 3 sessions over a week. If orthodontic alignment or implants are needed first, the process will be planned in coordinated phases.',
    display_order: 2
  },

  // Crowns & Bridges
  {
    id: 'faq-crowns-1',
    service_id: 'crowns',
    question: 'What is the difference between a crown and a bridge?',
    answer: 'A crown is a custom cap that fits over a single damaged or decayed tooth to restore its shape and strength. A bridge is used to replace one or more missing teeth by anchoring prosthetic teeth to the healthy teeth on either side.',
    display_order: 1
  },
  {
    id: 'faq-crowns-2',
    service_id: 'crowns',
    question: 'How should I care for my dental bridge?',
    answer: 'You should brush twice daily and floss under the bridge using a specialized threader or dental water flosser. Maintaining healthy anchor teeth is crucial to the long-term success of your dental bridge.',
    display_order: 2
  },

  // Kids Dentistry
  {
    id: 'faq-kids-1',
    service_id: 'kids',
    question: 'When should a child have their first dental visit?',
    answer: 'The American Academy of Pediatric Dentistry recommends that a child should visit the dentist by their first birthday or within six months of their first baby tooth erupting.',
    display_order: 1
  },
  {
    id: 'faq-kids-2',
    service_id: 'kids',
    question: 'What are dental sealants and are they safe?',
    answer: 'Yes, sealants are 100% safe. They are thin, protective plastic coatings applied to the chewing surfaces of the back molars. They act as a barrier to prevent food debris and bacteria from causing cavities.',
    display_order: 2
  }
];
