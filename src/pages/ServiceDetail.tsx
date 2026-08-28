/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Calendar, Sparkles, AlertCircle, 
  ChevronDown, ChevronUp, Image as ImageIcon, MessageCircle, HelpCircle, 
  ArrowRight, Phone, Heart, CheckCircle2, X, ChevronLeft,
  Activity, Stethoscope, Video, Mail, MapPin, 
  Facebook, Instagram, Youtube, Linkedin, Twitter, MessageSquare, Star,
  Award, Shield, Check, Clock, Users, ShieldCheck, FileText, CheckCircle, Play,
  Smile, Layers, UtensilsCrossed, Scale, Repeat
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Service, ServiceGalleryItem, ServiceFaq, ContactInfo, MarketingConfig } from '../types';
import { serviceService, DEFAULT_GREEN_HIGHLIGHT_LINE, UNIVERSAL_GOOGLE_REVIEWS, DEFAULT_SERVICES } from '../utils/serviceData';
import { contactService, DEFAULT_CONTACT_INFO, getWhatsAppUrl as getGlobalWhatsAppUrl } from '../utils/contactData';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { ClinicalCaseGallery } from '../components/ClinicalCaseGallery';
import { InstagramEmbed } from '../components/InstagramEmbed';
import { Mp4ReelPlayer } from '../components/Mp4ReelPlayer';
import { GooglePatientReviews } from '../components/GooglePatientReviews';
import { useSEO } from '../utils/seo';
const imgImplants = 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800';

interface RelatedTreatmentCard {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
}

const ALL_APPROVED_RELATED_SERVICES: Record<string, RelatedTreatmentCard> = {
  'dental-implants': {
    id: 'rel-implants',
    slug: 'dental-implants',
    title: 'Dental Implants',
    description: 'Restore missing teeth with permanent, natural-looking dental implants for lifelong chewing comfort and smile confidence.',
    image: DEFAULT_SERVICES.find(s => s.slug === 'dental-implants')?.hero_image || 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800'
  },
  'full-mouth-rehabilitation': {
    id: 'rel-fmr',
    slug: 'full-mouth-rehabilitation',
    title: 'Full Mouth Rehabilitation',
    description: 'Comprehensive treatment for patients with multiple missing, damaged, or severely worn teeth across both upper and lower jaws.',
    image: DEFAULT_SERVICES.find(s => s.slug === 'full-mouth-rehabilitation')?.hero_image || 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800'
  },
  'invisible-aligners': {
    id: 'rel-aligners',
    slug: 'invisible-aligners',
    title: 'Invisible Aligners',
    description: 'Straighten teeth discreetly and comfortably with customized, removable clear aligner trays.',
    image: DEFAULT_SERVICES.find(s => s.slug === 'invisible-aligners')?.hero_image || 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1784407659917_xj46d3vp.webp'
  },
  'root-canal-treatment': {
    id: 'rel-rct',
    slug: 'root-canal-treatment',
    title: 'Single Sitting Root Canal Treatment',
    description: 'Fast, pain-free single-visit root canal therapy to relieve severe infection and preserve your natural tooth structure.',
    image: DEFAULT_SERVICES.find(s => s.slug === 'root-canal-treatment')?.hero_image || 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800'
  },
  'smile-makeover': {
    id: 'rel-smile',
    slug: 'smile-makeover',
    title: 'Smile Makeover',
    description: 'Improve the appearance, shade, shape, and overall harmony of your smile with personalized cosmetic dental solutions.',
    image: DEFAULT_SERVICES.find(s => s.slug === 'smile-makeover')?.hero_image || 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200'
  },
  'crowns-bridges': {
    id: 'rel-crowns',
    slug: 'crowns-bridges',
    title: 'Crowns & Bridges',
    description: 'Restore damaged or missing teeth with high-strength, custom-milled zirconia crowns and fixed bridges.',
    image: DEFAULT_SERVICES.find(s => s.slug === 'crowns-bridges')?.hero_image || 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200'
  },
  'pediatric-dentistry': {
    id: 'rel-pediatric',
    slug: 'pediatric-dentistry',
    title: 'Pediatric Dentistry',
    description: 'Gentle, comforting preventive and restorative dental care tailored specifically for children and young teenagers.',
    image: DEFAULT_SERVICES.find(s => s.slug === 'pediatric-dentistry')?.hero_image || 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200'
  },
  'teeth-whitening': {
    id: 'rel-whitening',
    slug: 'teeth-whitening',
    title: 'Teeth Whitening',
    description: 'Advanced in-clinic laser teeth whitening to eliminate stubborn stains and dramatically brighten your natural enamel.',
    image: DEFAULT_SERVICES.find(s => s.slug === 'teeth-whitening')?.hero_image || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600'
  },
  'braces-treatment': {
    id: 'rel-braces',
    slug: 'braces-treatment',
    title: 'Braces Treatment',
    description: 'Time-tested orthodontic bracket systems to correct bite alignment, crowding, and irregular tooth spacing.',
    image: DEFAULT_SERVICES.find(s => s.slug === 'braces-treatment')?.hero_image || 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=800'
  },
  'wisdom-tooth-surgery': {
    id: 'rel-wisdom',
    slug: 'wisdom-tooth-surgery',
    title: 'Wisdom Tooth Surgery',
    description: 'Safe, pain-free surgical extraction of painful or impacted wisdom teeth with quick recovery.',
    image: DEFAULT_SERVICES.find(s => s.slug === 'wisdom-tooth-surgery')?.hero_image || 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800'
  },
  'tooth-coloured-filling': {
    id: 'rel-filling',
    slug: 'tooth-coloured-filling',
    title: 'Tooth Coloured Filling',
    description: 'Natural-looking composite resin restorations to seal cavities, repair chipped edges, and restore teeth.',
    image: DEFAULT_SERVICES.find(s => s.slug === 'tooth-coloured-filling')?.hero_image || 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=600'
  }
};

const RELATED_SLUGS_BY_SERVICE: Record<string, string[]> = {
  'dental-implants': ['full-mouth-rehabilitation', 'crowns-bridges', 'smile-makeover'],
  'full-mouth-rehabilitation': ['dental-implants', 'crowns-bridges', 'root-canal-treatment'],
  'invisible-aligners': ['braces-treatment', 'smile-makeover', 'teeth-whitening'],
  'clear-aligners': ['braces-treatment', 'smile-makeover', 'teeth-whitening'],
  'root-canal-treatment': ['crowns-bridges', 'tooth-coloured-filling', 'dental-implants'],
  'smile-makeover': ['invisible-aligners', 'teeth-whitening', 'crowns-bridges'],
  'crowns-bridges': ['dental-implants', 'root-canal-treatment', 'full-mouth-rehabilitation'],
  'crown-and-bridges': ['dental-implants', 'root-canal-treatment', 'full-mouth-rehabilitation'],
  'crowns-and-bridges': ['dental-implants', 'root-canal-treatment', 'full-mouth-rehabilitation'],
  'pediatric-dentistry': ['tooth-coloured-filling', 'braces-treatment', 'root-canal-treatment'],
  'pediatric': ['tooth-coloured-filling', 'braces-treatment', 'root-canal-treatment'],
  'teeth-whitening': ['smile-makeover', 'invisible-aligners', 'tooth-coloured-filling'],
  'laser-teeth-whitening': ['smile-makeover', 'invisible-aligners', 'tooth-coloured-filling'],
  'braces-treatment': ['invisible-aligners', 'smile-makeover', 'pediatric-dentistry'],
  'braces': ['invisible-aligners', 'smile-makeover', 'pediatric-dentistry'],
  'wisdom-tooth-surgery': ['root-canal-treatment', 'dental-implants', 'tooth-coloured-filling'],
  'wisdom-teeth-surgery': ['root-canal-treatment', 'dental-implants', 'tooth-coloured-filling'],
  'wisdom': ['root-canal-treatment', 'dental-implants', 'tooth-coloured-filling'],
  'tooth-coloured-filling': ['root-canal-treatment', 'crowns-bridges', 'teeth-whitening'],
  'composite-filling': ['root-canal-treatment', 'crowns-bridges', 'teeth-whitening']
};

function extractYouTubeId(url: string): string {
  if (!url) return '';
  const trimmedUrl = url.trim();
  
  try {
    // 1. Matches shorts URLs like https://www.youtube.com/shorts/VIDEO_ID
    if (trimmedUrl.includes('/shorts/')) {
      const parts = trimmedUrl.split('/shorts/');
      if (parts[1]) {
        const id = parts[1].split(/[?#&]/)[0];
        if (id.length === 11) return id;
      }
    }

    // 2. Matches embed URLs like https://www.youtube.com/embed/VIDEO_ID
    if (trimmedUrl.includes('/embed/')) {
      const parts = trimmedUrl.split('/embed/');
      if (parts[1]) {
        const id = parts[1].split(/[?#&]/)[0];
        if (id.length === 11) return id;
      }
    }
    
    // 3. Matches short URLs like https://youtu.be/VIDEO_ID
    if (trimmedUrl.includes('youtu.be/')) {
      const parts = trimmedUrl.split('youtu.be/');
      if (parts[1]) {
        const id = parts[1].split(/[?#&]/)[0];
        if (id.length === 11) return id;
      }
    }

    // 4. Matches watch URLs like watch?v=VIDEO_ID or watch&v=VIDEO_ID
    if (trimmedUrl.includes('v=')) {
      const parts = trimmedUrl.split('v=');
      if (parts[1]) {
        const id = parts[1].split(/[?#&]/)[0];
        if (id.length === 11) return id;
      }
    }
    
    // Fallback regex match for any other pattern
    const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11}).*/;
    const match = trimmedUrl.match(regExp);
    if (match && match[1] && match[1].length === 11) {
      return match[1];
    }
  } catch (e) {
    // Ignore errors
  }
  
  return '';
}

function getYouTubeEmbedUrl(url: string) {
  const id = extractYouTubeId(url);
  if (id) {
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
}

function isYouTubeUrl(url: string) {
  if (!url) return false;
  return url.includes('youtube.com') || url.includes('youtu.be');
}

function isMp4Url(url: string) {
  if (!url) return false;
  return url.endsWith('.mp4') || url.includes('supabase.co');
}



function getFallbackMedia(slug: string, title: string) {
  let heroImg = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200';
  let heroCap = 'State-of-the-art dental clinical care at Patel Dental Hospital.';
  
  const isFullMouthSlug = slug === 'full-mouth-rehabilitation' || slug === 'fmr-srv' || slug === 'fullmouth';

  return {
    hero_image: heroImg,
    hero_image_caption: heroCap,
    content_images: [],
    gallery: [],
    procedure_video_url: '',
    procedure_video_title: isFullMouthSlug ? 'Full Mouth Rehabilitation Procedure' : '',
    procedure_video_description: '',
    procedure_video_thumbnail: '',
    patient_testimonials: [],
    candidate_items: isFullMouthSlug ? [
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
    ] : [],
    hospital_team_photos: [],
    process_steps: [],
    features: [],
    faqs: []
  };
}

interface PremiumMedicalCardProps {
  icon?: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  imageUrl?: string;
}

export const PremiumMedicalCard: React.FC<PremiumMedicalCardProps> = ({ icon, title, children, imageUrl }) => {
  return (
    <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
      {/* Left accent line */}
      <div className="absolute left-0 top-[36px] bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
      
      {/* Icon */}
      {icon && (
        <div className="text-[#14B8A6] w-[30px] h-[30px] flex items-center justify-start shrink-0">
          {React.cloneElement(icon as React.ReactElement, { className: "h-[30px] w-[30px] text-[#14B8A6]" })}
        </div>
      )}
      
      {/* Title */}
      {title && title.trim() !== '' && (
        <h3 className="font-sans font-bold text-[#081C3A] text-[24px] sm:text-[30px] tracking-tight mt-6 mb-4 leading-tight">
          {title}
        </h3>
      )}
      
      {/* Body Content */}
      <div className="text-[#475569] text-[17px] leading-[1.8] font-medium flex-1">
        {children}
      </div>

      {/* Optional Card Image */}
      {imageUrl && imageUrl.trim() !== '' && (
        <div className="rounded-xl overflow-hidden bg-slate-50 border border-slate-100 w-full shadow-2xs aspect-[16/10] mt-6 group-hover:shadow-xs transition-shadow">
          <img
            src={imageUrl}
            alt={title || "Card illustration"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
};

const getServiceSEO = (slug: string, title: string, fallbackDesc: string) => {
  const canonicalUrl = `https://www.pateldentalhospital.com/#services/${slug}`;

  const createSchema = (srvTitle: string, srvDesc: string) => {
    return [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.pateldentalhospital.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.pateldentalhospital.com/#treatments"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": srvTitle,
            "item": canonicalUrl
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Dentist",
        "name": "Patel Dental Hospital",
        "image": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
        "@id": "https://www.pateldentalhospital.com/#dentist",
        "url": "https://www.pateldentalhospital.com/",
        "telephone": "+919510397046",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Gayatrinagar Main Road & Amin Marg",
          "addressLocality": "Rajkot",
          "addressRegion": "Gujarat",
          "postalCode": "360005",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "22.2856",
          "longitude": "70.7912"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "20:00"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Dental Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalSpecialty",
                "name": srvTitle,
                "description": srvDesc
              }
            }
          ]
        }
      }
    ];
  };

  switch (slug) {
    case 'dental-implants': {
      const sTitle = 'Best Dental Implants in Rajkot | Tooth Implant Specialist';
      const sDesc = 'Get lifetime-warranty dental implants in Rajkot at Patel Dental Hospital. Permanent tooth replacement, painless 3D CBCT guided surgery by Dr. Vipul Patel.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Dental Implants, Best Dental Implants in Rajkot, Dental Implant Specialist, Implantology Rajkot, Same Day Dental Implants, Full Mouth Rehabilitation, Tooth Replacement, Missing Tooth Replacement, Single Tooth Implant, Full Mouth Dental Implants',
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
    case 'root-canal-treatment': {
      const sTitle = 'Painless Single Sitting Root Canal Treatment in Rajkot | RCT Specialist';
      const sDesc = 'Experience comfortable, single-sitting Root Canal Treatment (RCT) in Rajkot at Patel Dental Hospital. Endodontic specialist care to resolve tooth pain & save natural teeth.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Root Canal Treatment, RCT, Single Sitting RCT, Root Canal Specialist, Tooth Pain Treatment, Endodontic Treatment, Best Dentist in Rajkot, Dental Clinic in Rajkot, Patel Dental Hospital',
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
    case 'full-mouth-rehabilitation': {
      const sTitle = 'Full Mouth Rehabilitation & Restoration in Rajkot | Patel Dental Hospital';
      const sDesc = 'Complete smile reconstruction and bite correction with full mouth rehabilitation in Rajkot. Painless restorative procedures by specialist clinicians at Patel Dental Hospital.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Full Mouth Rehabilitation, Full Mouth Restoration, Complete Dental Rehabilitation, Full Mouth Reconstruction, Restorative Dentistry, Advanced Dental Care in Rajkot, Dentist in Rajkot',
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
    case 'invisible-aligners': {
      const sTitle = 'Invisible Aligners & Clear Aligners in Rajkot | Clear Braces Specialist';
      const sDesc = 'Straighten your teeth discreetly with invisible aligners & clear aligners in Rajkot. Get comfortable orthodontic treatment customized by experts at Patel Dental Hospital.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Invisible Aligners, Clear Aligners, Invisible Braces, Teeth Straightening, Orthodontic Treatment, Clear Aligners Rajkot, Clear Braces Rajkot, Best Dentist in Rajkot, Patel Dental Hospital',
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
    case 'smile-makeover': {
      const sTitle = 'Smile Makeover & Cosmetic Smile Designing in Rajkot | Patel Dental Hospital';
      const sDesc = 'Get your dream smile designed by expert cosmetic dentists in Rajkot. Patel Dental Hospital offers professional smile correction, veneers, and aesthetic smile makeovers.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Smile Makeover, Smile Designing, Cosmetic Dentistry, Smile Correction, Aesthetic Dentistry, Cosmetic Dentist Rajkot, Porcelain Veneers, Digital Smile Design, Patel Dental Hospital',
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
    case 'crowns-bridges': {
      const sTitle = 'Premium Dental Crowns & Bridges in Rajkot | Zirconia & Ceramic Caps';
      const sDesc = 'Restore damaged or missing teeth with high-durability Zirconia and Ceramic dental crowns and bridges in Rajkot at Patel Dental Hospital. CAD/CAM custom restorations.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Crowns and Bridges, Dental Crown, Zirconia Crown, Ceramic Crown, Dental Bridge, Tooth Cap, Best Dentist in Rajkot, Dental Clinic Rajkot, Restorative Dentistry, Patel Dental Hospital',
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
    case 'teeth-whitening': {
      const sTitle = 'Professional Laser Teeth Whitening in Rajkot | Instant Bright Smile';
      const sDesc = 'Get a sparkling white smile in under 60 minutes with advanced laser teeth whitening in Rajkot at Patel Dental Hospital. Safe, painless, and highly effective shade brightening.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Teeth Whitening, Laser Teeth Whitening, Professional Teeth Whitening, Tooth Whitening, Cosmetic Dentist Rajkot, Best Dental Hospital in Rajkot, Instant Teeth Brightening, Patel Dental Hospital',
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
    case 'pediatric-dentistry': {
      const sTitle = 'Best Pediatric Dentist in Rajkot | Child & Kids Dental Clinic';
      const sDesc = 'Warm, gentle, and pain-free children\'s dental care in Rajkot. Patel Dental Hospital offers expert pediatric dentistry, cavity prevention, fluoride therapy, and dental sealants.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Child Dentist, Kids Dentist, Pediatric Dentist, Children\'s Dental Care, Kids Dentist Rajkot, Pediatric Dentist Rajkot, Cavity Prevention, Preventive Dentistry, Patel Dental Hospital',
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
    case 'braces-treatment': {
      const sTitle = 'Orthodontic Braces Treatment in Rajkot | Metal & Ceramic Braces';
      const sDesc = 'Align your crooked or crowded teeth perfectly with metal, ceramic, or self-ligating dental braces in Rajkot. Comprehensive orthodontic solutions under senior consultants.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Braces Treatment, Metal Braces, Ceramic Braces, Orthodontics, Teeth Alignment, Orthodontic Treatment Rajkot, Best Orthodontist Rajkot, Teeth Straightening Rajkot, Patel Dental Hospital',
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
    case 'wisdom-tooth-surgery': {
      const sTitle = 'Painless Wisdom Tooth Surgery & Removal in Rajkot | Patel Dental Hospital';
      const sDesc = 'Safe, comfortable, and pain-free wisdom tooth removal and impacted tooth surgery in Rajkot at Patel Dental Hospital. Advanced micromotor systems for fast post-op recovery.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Wisdom Tooth Removal, Wisdom Tooth Surgery, Impacted Tooth Surgery, Tooth Extraction, Best Dentist in Rajkot, Oral Surgeon Rajkot, Painless Extraction Rajkot, Patel Dental Hospital',
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
    case 'tooth-coloured-filling': {
      const sTitle = 'Biocompatible Tooth Coloured Fillings in Rajkot | Composite Restoration';
      const sDesc = 'Restore cavities naturally with dental composite fillings in Rajkot. Patel Dental Hospital offers durable, aesthetic, and metal-free tooth-coloured tooth restorations.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Tooth Filling, Composite Filling, Tooth Coloured Filling, Dental Filling, Cavity Restoration, Best Dentist in Rajkot, Dental Clinic Rajkot, Preventive Dentistry, Patel Dental Hospital',
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
    default: {
      const sTitle = `${title} | Advanced Dental Treatment in Rajkot`;
      const sDesc = fallbackDesc || `Advanced, reliable ${title} at Patel Dental Hospital, Rajkot. Led by expert senior dentists using world-class technologies and safe sterile guidelines.`;
      return {
        title: sTitle,
        description: sDesc,
        keywords: `${title}, Best Dentist in Rajkot, Dental Clinic in Rajkot, Patel Dental Hospital, Dental Treatment, Rajkot Dentist`,
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
  }
};

interface ServiceDetailProps {
  slug: string;
  openAppointmentModal: (preselectedTreatment?: string) => void;
  setCurrentPage?: (page: string) => void;
  previewService?: Service;
  previewGallery?: ServiceGalleryItem[];
  previewFaqs?: ServiceFaq[];
  previewRelatedServices?: Service[];
}

export default function ServiceDetail({ 
  slug, 
  openAppointmentModal, 
  setCurrentPage,
  previewService,
  previewGallery,
  previewFaqs,
  previewRelatedServices
}: ServiceDetailProps) {
  const [service, setService] = useState<Service | null>(null);
  const [gallery, setGallery] = useState<ServiceGalleryItem[]>([]);
  const [faqs, setFaqs] = useState<ServiceFaq[]>([]);
  const [allServicesList, setAllServicesList] = useState<Service[]>(DEFAULT_SERVICES);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(DEFAULT_CONTACT_INFO);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  const [expandedImplantFaqId, setExpandedImplantFaqId] = useState<string | null>(null);
  const [expandedDentalFaqIdx, setExpandedDentalFaqIdx] = useState<number | null>(null);

  // Lightbox modal state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Active videos for iframe embedding
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});

  // Active photo tab for split media galleries
  const [activePhotoTab, setActivePhotoTab] = useState<'hospital' | 'team' | 'equipment'>('hospital');
  
  // Custom states for Dental Implants specific view
  const [implantCategory, setImplantCategory] = useState<string>('all');
  const [implantLightboxIndex, setImplantLightboxIndex] = useState<number | null>(null);

  const isDentalImplants = React.useMemo(() => {
    return service?.id === 'implants-srv' || service?.slug === 'dental-implants' || slug === 'dental-implants';
  }, [service, slug]);

  const isRootCanal = React.useMemo(() => {
    return service?.id === 'rct' || service?.id === 'rct-srv' || service?.slug === 'root-canal-treatment' || service?.slug === 'single-sitting-root-canal' || service?.slug === 'root-canal' || slug === 'root-canal-treatment' || slug === 'single-sitting-root-canal' || slug === 'root-canal' || (service?.title ? service.title.toLowerCase().includes('root canal') : false);
  }, [service, slug]);

  const isFullMouth = React.useMemo(() => {
    return service?.id === 'fmr-srv' || service?.id === 'fullmouth' || service?.slug === 'full-mouth-rehabilitation' || slug === 'full-mouth-rehabilitation';
  }, [service, slug]);

  const isInvisibleAligners = React.useMemo(() => {
    return service?.id === 'aligners-srv' || service?.id === 'aligners' || service?.slug === 'invisible-aligners' || service?.slug === 'clear-aligners' || slug === 'invisible-aligners' || slug === 'clear-aligners';
  }, [service, slug]);

  const isSmileMakeover = React.useMemo(() => {
    return service?.id === 'smile-srv' || service?.id === 'smile' || service?.slug === 'smile-makeover' || slug === 'smile-makeover';
  }, [service, slug]);

  const isCrownsAndBridges = React.useMemo(() => {
    return service?.id === 'crowns' || service?.id === 'crowns-srv' || service?.slug === 'crowns-bridges' || service?.slug === 'crown-and-bridges' || service?.slug === 'crowns-and-bridges' || slug === 'crowns-bridges' || slug === 'crown-and-bridges' || slug === 'crowns-and-bridges';
  }, [service, slug]);

  const isTeethWhitening = React.useMemo(() => {
    return service?.id === 'whitening-srv' || service?.id === 'whitening' || service?.slug === 'teeth-whitening' || service?.slug === 'laser-teeth-whitening' || slug === 'teeth-whitening' || slug === 'laser-teeth-whitening';
  }, [service, slug]);

  const isPediatricDentistry = React.useMemo(() => {
    return service?.id === 'kids' || service?.id === 'pediatric' || service?.id === 'pediatric-srv' || service?.slug === 'pediatric-dentistry' || service?.slug === 'pediatric' || slug === 'pediatric-dentistry' || slug === 'pediatric';
  }, [service, slug]);

  const isBracesTreatment = React.useMemo(() => {
    return service?.id === 'braces-srv' || service?.id === 'braces' || service?.slug === 'braces-treatment' || service?.slug === 'braces' || slug === 'braces-treatment' || slug === 'braces' || (service?.title ? service.title.toLowerCase().includes('braces') : false);
  }, [service, slug]);

  const isWisdomToothSurgery = React.useMemo(() => {
    return service?.id === 'wisdom-srv' || service?.id === 'wisdom' || service?.slug === 'wisdom-tooth-surgery' || service?.slug === 'wisdom-teeth-surgery' || service?.slug === 'wisdom' || slug === 'wisdom-tooth-surgery' || slug === 'wisdom-teeth-surgery' || slug === 'wisdom' || (service?.title ? service.title.toLowerCase().includes('wisdom') : false);
  }, [service, slug]);

  const isToothColouredFilling = React.useMemo(() => {
    return service?.id === 'filling-srv' || service?.id === 'filling' || service?.slug === 'tooth-coloured-filling' || service?.slug === 'composite-filling' || slug === 'tooth-coloured-filling' || slug === 'composite-filling' || (service?.title ? service.title.toLowerCase().includes('filling') || service.title.toLowerCase().includes('tooth coloured') : false);
  }, [service, slug]);

  const isNewArchitecture = React.useMemo(() => {
    return isDentalImplants || isRootCanal || isFullMouth || isInvisibleAligners || isSmileMakeover || isCrownsAndBridges || isTeethWhitening || isPediatricDentistry || isBracesTreatment || isWisdomToothSurgery || isToothColouredFilling;
  }, [isDentalImplants, isRootCanal, isFullMouth, isInvisibleAligners, isSmileMakeover, isCrownsAndBridges, isTeethWhitening, isPediatricDentistry, isBracesTreatment, isWisdomToothSurgery, isToothColouredFilling]);

  const mConfig = React.useMemo(() => {
    if (!service || !service.marketing_config) return {};
    if (typeof service.marketing_config === 'string') {
      try {
        return JSON.parse(service.marketing_config);
      } catch (e) {
        return {};
      }
    }
    return service.marketing_config || {};
  }, [service]);

  const currentNormalizedSlug = React.useMemo(() => {
    if (isDentalImplants) return 'dental-implants';
    if (isRootCanal) return 'root-canal-treatment';
    if (isFullMouth) return 'full-mouth-rehabilitation';
    if (isInvisibleAligners) return 'invisible-aligners';
    if (isSmileMakeover) return 'smile-makeover';
    if (isCrownsAndBridges) return 'crowns-bridges';
    if (isTeethWhitening) return 'teeth-whitening';
    if (isPediatricDentistry) return 'pediatric-dentistry';
    if (isBracesTreatment) return 'braces-treatment';
    if (isWisdomToothSurgery) return 'wisdom-tooth-surgery';
    if (isToothColouredFilling) return 'tooth-coloured-filling';
    return slug || service?.slug || 'dental-implants';
  }, [
    isDentalImplants, isRootCanal, isFullMouth, isInvisibleAligners,
    isSmileMakeover, isCrownsAndBridges, isTeethWhitening, isPediatricDentistry,
    isBracesTreatment, isWisdomToothSurgery, isToothColouredFilling, slug, service
  ]);

  const relatedCardsToDisplay = React.useMemo(() => {
    const currentKey = currentNormalizedSlug;
    const targetSlugs = RELATED_SLUGS_BY_SERVICE[currentKey] || [
      'dental-implants',
      'full-mouth-rehabilitation',
      'crowns-bridges'
    ];
    return targetSlugs
      .filter(s => s !== currentKey && ALL_APPROVED_RELATED_SERVICES[s])
      .slice(0, 3)
      .map(s => {
        const baseCard = ALL_APPROVED_RELATED_SERVICES[s];
        // Find existing service object from fetched services or default services
        const existingSvc = (allServicesList && allServicesList.length > 0)
          ? allServicesList.find(svc => svc.slug === s || (s === 'teeth-whitening' && svc.slug === 'laser-teeth-whitening') || (s === 'invisible-aligners' && svc.slug === 'clear-aligners'))
          : null;
        const defaultSvc = DEFAULT_SERVICES.find(svc => svc.slug === s);
        const resolvedHeroImage = existingSvc?.hero_image || defaultSvc?.hero_image || baseCard.image;
        return {
          ...baseCard,
          image: resolvedHeroImage
        };
      });
  }, [currentNormalizedSlug, allServicesList]);

  const fallback = React.useMemo(() => {
    return getFallbackMedia(slug, service?.title || '');
  }, [slug, service?.title]);

  const seoHeadings = React.useMemo(() => {
    let kw = 'Dental Care';
    let kwPlural = 'Dental Care';
    
    if (isDentalImplants) {
      kw = 'Dental Implant';
      kwPlural = 'Dental Implants';
    } else if (isRootCanal) {
      kw = 'Root Canal Treatment';
      kwPlural = 'Root Canal Treatment';
    } else if (isFullMouth) {
      kw = 'Full Mouth Rehabilitation';
      kwPlural = 'Full Mouth Rehabilitation';
    } else if (isInvisibleAligners) {
      kw = 'Invisible Aligners';
      kwPlural = 'Invisible Aligners';
    } else if (isSmileMakeover) {
      kw = 'Smile Makeover';
      kwPlural = 'Smile Makeover';
    } else if (isCrownsAndBridges) {
      kw = 'Crowns & Bridges';
      kwPlural = 'Crowns & Bridges';
    } else if (isTeethWhitening) {
      kw = 'Teeth Whitening';
      kwPlural = 'Teeth Whitening';
    } else if (isPediatricDentistry) {
      kw = 'Pediatric Dentistry';
      kwPlural = 'Pediatric Dentistry';
    } else if (isBracesTreatment) {
      kw = 'Braces Treatment';
      kwPlural = 'Braces Treatment';
    } else if (isWisdomToothSurgery) {
      kw = 'Wisdom Tooth Surgery';
      kwPlural = 'Wisdom Tooth Surgery';
    } else if (isToothColouredFilling) {
      kw = 'Composite Filling';
      kwPlural = 'Composite Filling';
    } else {
      kw = service?.title || 'Dental Care';
      kwPlural = service?.title || 'Dental Care';
    }

    return {
      keyword: kw,
      keywordPlural: kwPlural,
      intro: isDentalImplants ? 'What is a Dental Implant?'
           : isRootCanal ? 'What is Single Sitting Root Canal Treatment?'
           : isFullMouth ? 'What is Full Mouth Rehabilitation?'
           : isInvisibleAligners ? 'What are Invisible Aligners?'
           : isSmileMakeover ? 'What is a Smile Makeover?'
           : isCrownsAndBridges ? 'What are Dental Crowns & Bridges?'
           : isTeethWhitening ? 'What is Laser Teeth Whitening?'
           : isPediatricDentistry ? 'What is Pediatric Dentistry?'
           : isBracesTreatment ? 'What is Braces Treatment?'
           : isWisdomToothSurgery ? 'What is Wisdom Tooth Surgery?'
           : isToothColouredFilling ? 'What is a Composite Filling?'
           : `About ${kw}`,
      process: isDentalImplants ? 'Dental Implant Treatment Procedure'
             : isRootCanal ? 'Root Canal Treatment Process & Timeline'
             : isFullMouth ? 'Full Mouth Rehabilitation Treatment Process'
             : isInvisibleAligners ? 'Invisible Aligners Treatment Process'
             : isSmileMakeover ? 'Smile Makeover Treatment Process'
             : isCrownsAndBridges ? 'Crowns & Bridges Treatment Process'
             : isTeethWhitening ? 'Teeth Whitening Treatment Process'
             : isPediatricDentistry ? 'Pediatric Dentistry Treatment Process'
             : isBracesTreatment ? 'Braces Treatment Process'
             : isWisdomToothSurgery ? 'Wisdom Tooth Surgery Process'
             : isToothColouredFilling ? 'Composite Filling Treatment Process'
             : `${kw} Treatment Process`,
      whyChooseUs: `Why Choose Patel Dental Hospital for ${kwPlural} in Rajkot`,
      benefits: `Benefits of ${kwPlural}`,
      candidate: isDentalImplants ? 'Who Is a Candidate for Dental Implants?'
               : isRootCanal ? 'Who Needs Root Canal Treatment?'
               : isFullMouth ? 'Who Is a Candidate for Full Mouth Rehabilitation?'
               : isInvisibleAligners ? 'Who Is a Candidate for Invisible Aligners?'
               : isSmileMakeover ? 'Who Is a Candidate for a Smile Makeover?'
               : isCrownsAndBridges ? 'Who Needs Dental Crowns & Bridges?'
               : isTeethWhitening ? 'Who Is a Candidate for Teeth Whitening?'
               : isPediatricDentistry ? 'Specialized Pediatric Dentistry Services'
               : isBracesTreatment ? 'Who Needs Braces Treatment?'
               : isWisdomToothSurgery ? 'Who Needs Wisdom Tooth Surgery?'
               : isToothColouredFilling ? 'Who Needs a Composite Filling?'
               : `Candidates for ${kw}`,
      transformations: `Before & After ${kwPlural} Transformations`,
      caseGallery: `${kw} Clinical Case Gallery`,
      video: `${kw} Treatment Procedure Video`,
      cost: `${kw} Cost & Special Treatment Offers`,
      reviews: `Google Patient Reviews for ${kwPlural}`,
      bottomCta: `Why Choose Patel Dental Hospital for ${kwPlural} in Rajkot`,
      faq: `Frequently Asked Questions about ${kwPlural}`
    };
  }, [
    isDentalImplants, isRootCanal, isFullMouth, isInvisibleAligners,
    isSmileMakeover, isCrownsAndBridges, isTeethWhitening, isPediatricDentistry,
    isBracesTreatment, isWisdomToothSurgery, isToothColouredFilling, service
  ]);

  const heroImage = service?.hero_image || fallback.hero_image;
  const heroImageCaption = service?.hero_image_caption || fallback.hero_image_caption;

  const displayContentImages = React.useMemo(() => {
    if (!service) return [];
    let list: any[] = [];
    if (Array.isArray(service.content_images)) {
      list = service.content_images;
    } else if (typeof service.content_images === 'string') {
      try {
        list = JSON.parse(service.content_images);
      } catch (e) {}
    }
    if (!list || list.length === 0) {
      return fallback.content_images;
    }
    return [...list].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
  }, [service, fallback]);

  const displayGallery = React.useMemo(() => {
    if (isNewArchitecture) {
      const raw = Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : [];
      return [...raw].sort((a: any, b: any) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    }
    if (gallery && gallery.length > 0) {
      return gallery;
    }
    return fallback.gallery;
  }, [service, gallery, fallback, mConfig, isNewArchitecture]);

  const displayCandidateItems = React.useMemo(() => {
    if (Array.isArray(mConfig.candidate_items) && mConfig.candidate_items.length > 0) {
      return mConfig.candidate_items;
    }
    if (service && Array.isArray((service as any).candidate_items) && (service as any).candidate_items.length > 0) {
      return (service as any).candidate_items;
    }
    if (fallback?.marketing_config && Array.isArray(fallback.marketing_config.candidate_items) && fallback.marketing_config.candidate_items.length > 0) {
      return fallback.marketing_config.candidate_items;
    }
    if (fallback && Array.isArray((fallback as any).candidate_items) && (fallback as any).candidate_items.length > 0) {
      return (fallback as any).candidate_items;
    }
    if (isFullMouth) {
      return [
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
      ];
    }
    if (isSmileMakeover) {
      return [
        {
          id: 'cand-1',
          title: 'Composite Smile Correction',
          description: 'Quick, minimally invasive tooth-colored resin sculpting for small gaps, chips, and minor misalignment.',
          display_order: 10
        },
        {
          id: 'cand-2',
          title: 'Porcelain Veneers (Hollywood Smile)',
          description: 'Ultra-thin custom porcelain shells placed over front teeth for durable, stain-resistant, flawless aesthetics.',
          display_order: 20
        },
        {
          id: 'cand-3',
          title: 'Braces / Invisible Aligners',
          description: 'Orthodontic solutions to straighten misaligned or crowded teeth discreetly and comfortably.',
          display_order: 30
        },
        {
          id: 'cand-4',
          title: 'Teeth Whitening',
          description: 'Advanced clinical bleaching to remove deep stains and dramatically brighten your natural smile.',
          display_order: 40
        }
      ];
    }
    if (isCrownsAndBridges) {
      return [
        {
          id: 'mat-1',
          title: 'Metal Fused Ceramic',
          description: 'Strong metal core porcelain fused crowns combining durable interior structural support with tooth-colored outer ceramic.',
          display_order: 10
        },
        {
          id: 'mat-2',
          title: 'Metal-Free Zirconia',
          description: 'Highly durable, premium metal-free zirconia crowns offering outstanding natural translucency and supreme fracture resistance.',
          display_order: 20
        },
        {
          id: 'mat-3',
          title: 'Natural Appearance',
          description: 'Custom shaded and sculpted to seamlessly replicate the natural translucency, contours, and aesthetics of surrounding teeth.',
          display_order: 30
        },
        {
          id: 'mat-4',
          title: 'MRI Safe & Biocompatible',
          description: 'Bio-inert tissue-friendly materials completely safe for future diagnostic MRI scans without producing artifact interference.',
          display_order: 40
        }
      ];
    }
    if (isTeethWhitening) {
      return [
        {
          id: 'wm-1',
          title: 'Hospital-Based Teeth Whitening',
          description: 'In-clinic professional whitening performed by experienced dental specialists using advanced light-activated bleaching gels for fast and dramatic results.',
          display_order: 10
        },
        {
          id: 'wm-2',
          title: 'Home-Based Teeth Whitening',
          description: 'Custom-fitted bleaching trays provided with dentist-prescribed professional gel for convenient and safe whitening at home.',
          display_order: 20
        }
      ];
    }
    if (isPediatricDentistry) {
      return [
        {
          id: 'ped-1',
          title: 'Caries Assessment & Prevention',
          description: 'Comprehensive risk assessment and preventive treatments for children.',
          display_order: 10
        },
        {
          id: 'ped-2',
          title: 'Cleaning & Fluoride Application',
          description: 'Gentle professional dental cleaning and cavity-inhibiting fluoride gel.',
          display_order: 20
        },
        {
          id: 'ped-3',
          title: 'Habit Counseling & Guidance',
          description: 'Friendly oral habit management for thumb sucking and pacifiers.',
          display_order: 30
        },
        {
          id: 'ped-4',
          title: 'Pediatric Orthodontics',
          description: 'Early interceptive orthodontic guidance and space maintainers.',
          display_order: 40
        }
      ];
    }
    if (isWisdomToothSurgery) {
      return [
        {
          id: 'wisdom-tech-1',
          title: 'Piezoelectric Device',
          description: '',
          display_order: 10
        }
      ];
    }
    if (isToothColouredFilling) {
      return [
        {
          id: 'fill-cand-1',
          title: 'Natural Looking',
          description: 'Restorations blend seamlessly with your surrounding natural tooth structure.',
          display_order: 10
        },
        {
          id: 'fill-cand-2',
          title: 'Repairs Chipped & Broken Teeth',
          description: 'Restores structural integrity and aesthetics to damaged or decayed teeth.',
          display_order: 20
        },
        {
          id: 'fill-cand-3',
          title: 'Long-lasting Restoration',
          description: 'High-strength composite resin provides durable and resilient function.',
          display_order: 30
        }
      ];
    }
    return [];
  }, [mConfig, service, fallback, isFullMouth, isSmileMakeover, isCrownsAndBridges, isTeethWhitening, isPediatricDentistry, isWisdomToothSurgery, isToothColouredFilling]);

  const displayTestimonials = React.useMemo(() => {
    if (!service) return [];
    let list: any[] = [];
    if (Array.isArray(service.patient_testimonials)) {
      list = service.patient_testimonials;
    } else if (typeof service.patient_testimonials === 'string') {
      try {
        list = JSON.parse(service.patient_testimonials);
      } catch (e) {}
    }
    if ((!list || list.length === 0) && mConfig) {
      if (Array.isArray(mConfig.patient_testimonials)) {
        list = mConfig.patient_testimonials;
      } else if (typeof mConfig.patient_testimonials === 'string') {
        try {
          list = JSON.parse(mConfig.patient_testimonials);
        } catch (e) {}
      }
    }
    if (!list || list.length === 0) {
      if (fallback && Array.isArray(fallback.patient_testimonials) && fallback.patient_testimonials.length > 0) {
        return fallback.patient_testimonials;
      }
      if (fallback?.marketing_config && Array.isArray(fallback.marketing_config.patient_testimonials) && fallback.marketing_config.patient_testimonials.length > 0) {
        return fallback.marketing_config.patient_testimonials;
      }
      if (isDentalImplants || isRootCanal || isFullMouth || isInvisibleAligners || isSmileMakeover || isCrownsAndBridges || isTeethWhitening || isPediatricDentistry || isBracesTreatment || isWisdomToothSurgery || isToothColouredFilling) {
        return [
          {
            id: 'testi-1',
            patient_name: isToothColouredFilling ? 'Patient Tooth Coloured Filling Journey' : isWisdomToothSurgery ? 'Patient Wisdom Tooth Surgery Journey' : isBracesTreatment ? 'Patient Braces Treatment Journey' : isPediatricDentistry ? 'Child & Parent Care Journey' : isTeethWhitening ? 'Patient Teeth Whitening Journey' : isCrownsAndBridges ? 'Patient Crown & Bridges Journey' : isSmileMakeover ? 'Patient Smile Makeover Journey' : isInvisibleAligners ? 'Patient Invisible Aligners Journey' : isFullMouth ? 'Patient Full Mouth Journey' : 'Patient Testimonial',
            video_url: (isFullMouth || isInvisibleAligners || isSmileMakeover || isCrownsAndBridges || isTeethWhitening || isPediatricDentistry || isBracesTreatment || isWisdomToothSurgery || isToothColouredFilling) ? 'https://www.youtube.com/watch?v=SnOxxv_S2ew' : 'https://www.instagram.com/reel/C8qLd9MyWwG/',
            treatment_name: service?.title || (isToothColouredFilling ? 'Tooth Coloured Filling' : isWisdomToothSurgery ? 'Wisdom Tooth Surgery' : isBracesTreatment ? 'Braces Treatment' : isPediatricDentistry ? 'Pediatric Dentistry' : isTeethWhitening ? 'Teeth Whitening' : isCrownsAndBridges ? 'Crowns & Bridges' : isSmileMakeover ? 'Smile Makeover' : isInvisibleAligners ? 'Invisible Aligners' : isFullMouth ? 'Full Mouth Rehabilitation' : 'Dental Treatment'),
            display_order: 10
          }
        ];
      }
      return [];
    }
    return [...list].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
  }, [service, fallback, mConfig, isDentalImplants, isRootCanal, isFullMouth, isInvisibleAligners, isSmileMakeover, isCrownsAndBridges, isTeethWhitening, isPediatricDentistry, isBracesTreatment, isWisdomToothSurgery, isToothColouredFilling]);

  const displayTeamPhotos = React.useMemo(() => {
    let list: any[] = [];
    if (service) {
      if (Array.isArray(service.hospital_team_photos)) {
        list = service.hospital_team_photos;
      } else if (typeof service.hospital_team_photos === 'string') {
        try {
          list = JSON.parse(service.hospital_team_photos);
        } catch (e) {}
      }
    }

    // If list is empty, fall back to general mConfig.hospital_photos and mConfig.team_photos
    if ((!list || list.length === 0) && mConfig) {
      const hPhotos = Array.isArray(mConfig.hospital_photos) ? mConfig.hospital_photos : [];
      const tPhotos = Array.isArray(mConfig.team_photos) ? mConfig.team_photos : [];
      list = [...hPhotos, ...tPhotos];
    }

    // Filter out items that don't have a valid image_url or photo_url
    // Do NOT display placeholder or default images
    let cleanList = list.filter((item: any) => {
      if (!item) return false;
      const url = (item.image_url || item.photo_url || '').trim();
      return url !== '' && !url.includes('placeholder') && !url.includes('example.com');
    });

    // CRITICAL FALLBACK: If we still have no photos (e.g. empty in database and mConfig),
    // we MUST populate high-quality default hospital/team photos so that the Hospital & Team Gallery section is ALWAYS visible.
    if (cleanList.length === 0) {
      cleanList = [
        {
          id: 'default-h1',
          type: 'hospital',
          caption: 'Advanced Implantology Operatory Room',
          image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
          display_order: 10
        },
        {
          id: 'default-h2',
          type: 'hospital',
          caption: 'State-of-the-Art Diagnostic Unit',
          image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
          display_order: 20
        },
        {
          id: 'default-t1',
          type: 'team',
          caption: 'Specialist Implantologists & Surgical Staff',
          image_url: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800',
          display_order: 30
        }
      ];
    }

    return [...cleanList].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
  }, [service, mConfig]);

  const videoUrl = service?.procedure_video_url || fallback.procedure_video_url;
  const videoTitle = service?.procedure_video_title || fallback.procedure_video_title;
  const videoDesc = service?.procedure_video_description || fallback.procedure_video_description;
  const videoThumb = service?.procedure_video_thumbnail || fallback.procedure_video_thumbnail;

  // Fetch Service and Related Content
  useEffect(() => {
    if (previewService) {
      setService(previewService);
      setGallery(previewGallery || []);
      setFaqs(previewFaqs || []);
      setRelatedServices(previewRelatedServices || []);
      setIsLoading(false);
      return;
    }
    let active = true;
    const loadServiceData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 1. Fetch current service
        const fetchedService = await serviceService.getServiceBySlug(slug);
        
        if (!active) return;

        if (!fetchedService) {
          setService(null);
          setIsLoading(false);
          return;
        }

        setService(fetchedService);

        // 2. Fetch FAQs, Gallery, All Services & Contact Info in parallel using service ID
        const [fetchedGallery, fetchedFaqs, allServices, fetchedContact] = await Promise.all([
          serviceService.getGallery(fetchedService.id),
          serviceService.getFaqs(fetchedService.id),
          serviceService.getServices(),
          contactService.getContactInfo().catch(() => DEFAULT_CONTACT_INFO)
        ]);

        if (active) {
          // Sort gallery by display order
          const sortedGallery = [...fetchedGallery].sort((a, b) => a.display_order - b.display_order);
          setGallery(sortedGallery);

          // Sort FAQs by display order
          const fb = getFallbackMedia(slug, fetchedService.title || '');
          const sortedFaqs = fetchedFaqs.length > 0
            ? [...fetchedFaqs].sort((a, b) => a.display_order - b.display_order)
            : (fb.faqs || []);
          setFaqs(sortedFaqs);

          // Update contact info
          setContactInfo(fetchedContact);
          setAllServicesList(allServices);

          // Load custom related services if configured, otherwise fallback to first 3 active other services
          const mConfig: any = fetchedService.marketing_config
            ? (typeof fetchedService.marketing_config === 'string'
              ? (() => { try { return JSON.parse(fetchedService.marketing_config) } catch(e) { return {} } })()
              : fetchedService.marketing_config)
            : {};

          let filteredRelated: Service[] = [];
          if (mConfig.related_services && Array.isArray(mConfig.related_services) && mConfig.related_services.length > 0) {
            filteredRelated = mConfig.related_services
              .filter((item: any) => item && item.enabled !== false)
              .map((item: any) => {
                const sId = typeof item === 'string' ? item : item.id;
                return allServices.find(s => s.id === sId);
              })
              .filter((s: any): s is Service => !!s && s.id !== fetchedService.id && s.is_active);
          }

          if (filteredRelated.length === 0) {
            filteredRelated = allServices
              .filter(item => item.id !== fetchedService.id && item.is_active)
              .slice(0, 3);
          }
          setRelatedServices(filteredRelated);

          // Automatically expand the first FAQ if any exist
          if (sortedFaqs.length > 0) {
            setExpandedFaqId(sortedFaqs[0].id);
          }
        }
      } catch (err) {
        console.error('Error fetching service details:', err);
        if (active) {
          setError('An error occurred while loading the treatment details. Please try again.');
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadServiceData();
    return () => {
      active = false;
    };
  }, [slug, previewService, previewGallery, previewFaqs, previewRelatedServices]);

  // Always scroll window to top instantly on initial mount, when slug changes, or when service data finishes loading
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [slug, isLoading]);

  // Check if we have any custom text fields or media fields populated
  const hasCustomContent = React.useMemo(() => {
    if (!service) return false;
    
    const hasHeroTitle = !!(service.hero_title && service.hero_title.trim() !== '');
    const hasHeroDesc = !!(service.hero_description && service.hero_description.trim() !== '');
    const hasHeroImgCap = !!(service.hero_image_caption && service.hero_image_caption.trim() !== '');
    const hasIntroTitle = !!(service.intro_title && service.intro_title.trim() !== '');
    const hasIntroDesc = !!(service.intro_description && service.intro_description.trim() !== '');
    
    let hasSteps = false;
    if (Array.isArray(service.process_steps) && service.process_steps.length > 0) {
      hasSteps = true;
    } else if (typeof service.process_steps === 'string' && service.process_steps.trim() !== '' && service.process_steps !== '[]') {
      try {
        const parsed = JSON.parse(service.process_steps);
        if (Array.isArray(parsed) && parsed.length > 0) {
          hasSteps = true;
        }
      } catch (e) {}
    }

    let hasFeats = false;
    if (Array.isArray(service.features) && service.features.length > 0) {
      hasFeats = true;
    } else if (typeof service.features === 'string' && service.features.trim() !== '' && service.features !== '[]') {
      try {
        const parsed = JSON.parse(service.features);
        if (Array.isArray(parsed) && parsed.length > 0) {
          hasFeats = true;
        }
      } catch (e) {}
    }

    let hasMedia = false;
    if (service.procedure_video_url && service.procedure_video_url.trim() !== '') {
      hasMedia = true;
    }
    
    if (Array.isArray(service.content_images) && service.content_images.length > 0) {
      hasMedia = true;
    } else if (typeof service.content_images === 'string' && service.content_images.trim() !== '' && service.content_images !== '[]') {
      try {
        const parsed = JSON.parse(service.content_images);
        if (Array.isArray(parsed) && parsed.length > 0) {
          hasMedia = true;
        }
      } catch (e) {}
    }

    if (Array.isArray(service.patient_testimonials) && service.patient_testimonials.length > 0) {
      hasMedia = true;
    } else if (typeof service.patient_testimonials === 'string' && service.patient_testimonials.trim() !== '' && service.patient_testimonials !== '[]') {
      try {
        const parsed = JSON.parse(service.patient_testimonials);
        if (Array.isArray(parsed) && parsed.length > 0) {
          hasMedia = true;
        }
      } catch (e) {}
    }

    if (Array.isArray(service.hospital_team_photos) && service.hospital_team_photos.length > 0) {
      hasMedia = true;
    } else if (typeof service.hospital_team_photos === 'string' && service.hospital_team_photos.trim() !== '' && service.hospital_team_photos !== '[]') {
      try {
        const parsed = JSON.parse(service.hospital_team_photos);
        if (Array.isArray(parsed) && parsed.length > 0) {
          hasMedia = true;
        }
      } catch (e) {}
    }

    return hasHeroTitle || hasHeroDesc || hasHeroImgCap || hasIntroTitle || hasIntroDesc || hasSteps || hasFeats || hasMedia;
  }, [service]);

  const seoData = React.useMemo(() => {
    if (!service) {
      return {
        title: 'Advanced Dental Care & Treatment in Rajkot | Patel Dental Hospital',
        description: 'Patel Dental Hospital offers state-of-the-art dental care in Rajkot, Gujarat. Painless implants, smile makeovers, root canals, braces, and full mouth rehabilitation.',
        keywords: 'Best Dental Hospital in Rajkot, Dental Clinic in Rajkot, Dentist in Rajkot',
        ogImage: undefined,
        canonicalUrl: undefined,
        schema: undefined
      };
    }

    const dynamicSEO = getServiceSEO(service.slug, service.title, service.short_description || '');

    return {
      title: service.seo_title || dynamicSEO.title,
      description: service.seo_description || dynamicSEO.description,
      keywords: dynamicSEO.keywords,
      ogImage: service.hero_image || undefined,
      canonicalUrl: dynamicSEO.canonicalUrl,
      schema: dynamicSEO.schema
    };
  }, [service]);

  useSEO({
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    ogImage: seoData.ogImage,
    canonicalUrl: seoData.canonicalUrl,
    schema: seoData.schema
  });

  const displaySteps: any[] = React.useMemo(() => {
    if (!service) return [];
    let rawSteps: any[] = [];
    if (Array.isArray(service.process_steps)) {
      rawSteps = service.process_steps;
    } else if (typeof service.process_steps === 'string') {
      try {
        rawSteps = JSON.parse(service.process_steps);
      } catch (e) {
        rawSteps = [];
      }
    }
    if (isNewArchitecture) {
      if (isToothColouredFilling && rawSteps.length === 0) {
        return [
          { id: 'fill-step-1', phase: 'Card 1', title: 'Comfortable Treatment Experience', description: 'We know that getting a cavity filled can be a stressful experience for many adults and children, but we do our best to provide a safe, friendly, and comfortable atmosphere.\n\nAt Patel Dental Hospital, we have many options available to treat anxious patients.', display_order: 10 },
          { id: 'fill-step-2', phase: 'Card 2', title: 'Advanced Filling Materials', description: 'You can rely on our professionals and advanced materials made in the USA for an effective and long-lasting filling.', display_order: 20 },
          { id: 'fill-step-3', phase: 'Card 3', title: 'State-of-the-Art Equipment', description: 'We use the most advanced state-of-the-art equipment and materials, so your teeth receive the highest quality care they deserve.', display_order: 30 }
        ];
      }
      return Array.isArray(rawSteps)
        ? [...rawSteps].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0))
        : [];
    }
    if (rawSteps.length === 0 && fallback.process_steps) {
      return fallback.process_steps;
    }
    return Array.isArray(rawSteps)
      ? [...rawSteps].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0))
      : [];
  }, [service, fallback]);

  const displayFeatures: any[] = React.useMemo(() => {
    if (!service) return [];
    let rawFeatures: any[] = [];
    if (Array.isArray(service.features)) {
      rawFeatures = service.features;
    } else if (typeof service.features === 'string') {
      try {
        rawFeatures = JSON.parse(service.features);
      } catch (e) {
        rawFeatures = [];
      }
    }
    if (isNewArchitecture) {
      // For Dental Implants & Root Canal, we do NOT load any fallback features
      return Array.isArray(rawFeatures)
        ? [...rawFeatures].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0))
        : [];
    }
    if (rawFeatures.length === 0 && fallback.features) {
      return fallback.features;
    }
    return Array.isArray(rawFeatures)
      ? [...rawFeatures].sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
      : [];
  }, [service, fallback]);

  const beforeAfterPairs: any[] = React.useMemo(() => {
    let list: any[] = [];
    if (mConfig && Array.isArray(mConfig.before_after_pairs) && mConfig.before_after_pairs.length > 0) {
      list = mConfig.before_after_pairs;
    } else if (service && Array.isArray((service as any).before_after_pairs) && (service as any).before_after_pairs.length > 0) {
      list = (service as any).before_after_pairs;
    } else if (fallback?.marketing_config && Array.isArray(fallback.marketing_config.before_after_pairs) && fallback.marketing_config.before_after_pairs.length > 0) {
      list = fallback.marketing_config.before_after_pairs;
    } else if (isFullMouth) {
      list = [
        {
          id: 'fmr-ba-1',
          before_image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
          after_image: 'https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=600',
          caption: 'Full Mouth Reconstruction Case 1',
          display_order: 10
        },
        {
          id: 'fmr-ba-2',
          before_image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600',
          after_image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
          caption: 'Full Mouth Reconstruction Case 2',
          display_order: 20
        }
      ];
    } else if (isInvisibleAligners) {
      list = [
        {
          id: 'aligners-ba-1',
          before_image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
          after_image: 'https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=600',
          caption: 'Invisible Aligners Transformation 1',
          display_order: 10
        }
      ];
    } else if (isSmileMakeover) {
      list = [
        {
          id: 'smile-ba-1',
          before_image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
          after_image: 'https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=600',
          caption: 'Smile Makeover Transformation 1',
          display_order: 10
        }
      ];
    } else if (isCrownsAndBridges) {
      list = [
        {
          id: 'crowns-ba-1',
          before_image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
          after_image: 'https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=600',
          caption: 'Crown & Bridge Restorative Transformation',
          display_order: 10
        }
      ];
    } else if (isTeethWhitening) {
      list = [
        {
          id: 'whitening-ba-1',
          before_image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
          after_image: 'https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=600',
          caption: 'Teeth Whitening Transformation',
          display_order: 10
        }
      ];
    } else if (isPediatricDentistry) {
      list = [
        {
          id: 'pediatric-ba-1',
          before_image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
          after_image: 'https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=600',
          caption: 'Pediatric Smile Restoration',
          display_order: 10
        }
      ];
    } else if (isBracesTreatment) {
      list = [
        {
          id: 'braces-ba-1',
          before_image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
          after_image: 'https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=600',
          caption: 'Braces Alignment Smile Transformation',
          display_order: 10
        }
      ];
    } else if (isWisdomToothSurgery) {
      list = [
        {
          id: 'wisdom-ba-1',
          before_image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
          after_image: 'https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=600',
          caption: 'Wisdom Tooth Surgery Extraction',
          display_order: 10
        }
      ];
    } else if (isToothColouredFilling) {
      list = [
        {
          id: 'fill-ba-1',
          before_image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
          after_image: 'https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=600',
          caption: 'Composite Filling Tooth Restoration',
          display_order: 10
        }
      ];
    } else if (isRootCanal) {
      list = [
        {
          id: 'rct-ba-1',
          before_image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
          after_image: 'https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=600',
          caption: 'Single Sitting Root Canal & Cap Restoration',
          display_order: 10
        }
      ];
    }
    return [...list]
      .filter((p: any) => p && p.before_image && p.after_image)
      .sort((a: any, b: any) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
  }, [mConfig, service, fallback, isFullMouth, isInvisibleAligners, isSmileMakeover, isCrownsAndBridges, isTeethWhitening, isPediatricDentistry, isBracesTreatment, isWisdomToothSurgery, isToothColouredFilling, isRootCanal]);

  // If loading, display the skeleton state first
  if (isLoading) {
    return (
      <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-4xl space-y-8 animate-pulse">
          {/* Back Button Skeleton */}
          <div className="h-6 w-32 bg-slate-200 rounded-lg" />
          
          {/* Hero Section Skeleton */}
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs">
            <div className="h-64 sm:h-80 md:h-96 bg-slate-200" />
            <div className="p-6 sm:p-10 space-y-4">
              <div className="h-8 w-2/3 bg-slate-200 rounded-lg" />
              <div className="h-4 w-full bg-slate-200 rounded-lg" />
              <div className="h-4 w-5/6 bg-slate-200 rounded-lg" />
            </div>
          </div>

          {/* Double Column content skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-40 bg-white border border-slate-100 rounded-3xl p-6 space-y-4 shadow-3xs">
                <div className="h-6 w-1/3 bg-slate-200 rounded-lg" />
                <div className="h-4 w-full bg-slate-200 rounded-lg" />
                <div className="h-4 w-5/6 bg-slate-200 rounded-lg" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-64 bg-white border border-slate-100 rounded-3xl p-6 shadow-3xs" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Every service is rendered through the universal premium Service Detail page architecture.
  // Content and styling are fully dynamic and populated by CMS database entries with robust fallback logic.

  // Handle navigating to back / treatment page
  const handleBackToServices = () => {
    window.location.hash = '#home';
    if (setCurrentPage) {
      setCurrentPage('home');
    }
  };

  // Navigating to other services
  const handleNavigateToService = (targetSlug: string) => {
    window.location.hash = `#services/${targetSlug}`;
    if (setCurrentPage) {
      setCurrentPage(`services/${targetSlug}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFaq = (id: string) => {
    setExpandedFaqId(prev => prev === id ? null : id);
  };

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && displayGallery.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % displayGallery.length);
    }
  };

  const prevLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && displayGallery.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + displayGallery.length) % displayGallery.length);
    }
  };



  // Formulate WhatsApp API direct URL
  const getWhatsAppUrl = () => {
    if (!service) return '';
    const text = `Hello Patel Dental Hospital, I would like to book a free consultation for "${service.title}". Please share the available appointment slots.`;
    return getGlobalWhatsAppUrl(text);
  };

  // Get configured Call To Action buttons dynamically
  const getCtaButtons = () => {
    const list: Array<{
      id: string;
      text: string;
      icon: React.ReactNode;
      onClick: () => void;
      isWhatsappSecondary: boolean;
    }> = [];

    // 1. Book Appointment Button
    const appointmentEnabled = mConfig.cta_appointment_enabled !== undefined 
      ? !!mConfig.cta_appointment_enabled 
      : true; // Default fallback: enabled
    
    if (appointmentEnabled) {
      const text = mConfig.cta_appointment_text || 'Free Consultation';
      const dest = mConfig.cta_appointment_dest || 'appointment';
      const value = mConfig.cta_appointment_dest_value || '';
      
      list.push({
        id: 'appointment',
        text,
        icon: <Calendar className="h-4 w-4" />,
        onClick: () => {
          if (dest === 'appointment') {
            openAppointmentModal(`${service?.title} - Book Appointment`);
          } else if (dest === 'internal') {
            window.location.href = value;
          } else if (dest === 'external') {
            const url = value.startsWith('http') ? value : 'https://' + value;
            window.open(url, '_blank', 'noopener,noreferrer');
          }
        },
        isWhatsappSecondary: false
      });
    }

    // 2. Call Now Button
    const callEnabled = mConfig.cta_call_enabled !== undefined 
      ? !!mConfig.cta_call_enabled 
      : false; // Default fallback: disabled
    
    if (callEnabled) {
      const text = mConfig.cta_call_text || 'Call Now';
      const dest = mConfig.cta_call_dest || 'clinic';
      const value = mConfig.cta_call_dest_value || '';
      
      list.push({
        id: 'call',
        text,
        icon: <Phone className="h-4 w-4" />,
        onClick: () => {
          const phone = dest === 'custom' 
            ? value.replace(/\s+/g, '') 
            : (mConfig.contact_call_number ? mConfig.contact_call_number.replace(/\s+/g, '') : contactInfo.callRaw || '9924225500');
          window.location.href = `tel:${phone}`;
        },
        isWhatsappSecondary: false
      });
    }

    // 3. WhatsApp Button
    const whatsappEnabled = mConfig.cta_whatsapp_enabled !== undefined 
      ? !!mConfig.cta_whatsapp_enabled 
      : true; // Default fallback: enabled
    
    if (whatsappEnabled) {
      const text = mConfig.cta_whatsapp_text || 'WhatsApp Us';
      const dest = mConfig.cta_whatsapp_dest || 'clinic';
      const value = mConfig.cta_whatsapp_dest_value || '';
      
      list.push({
        id: 'whatsapp',
        text,
        icon: <MessageCircle className="h-4 w-4" />,
        onClick: () => {
          if (dest === 'custom') {
            const url = value.startsWith('http') ? value : 'https://' + value;
            window.open(url, '_blank', 'noopener,noreferrer');
          } else {
            const textMsg = `Hello Patel Dental Hospital, I would like to book a free consultation for "${service?.title}". Please share the available appointment slots.`;
            window.open(getGlobalWhatsAppUrl(textMsg), '_blank', 'noopener,noreferrer');
          }
        },
        isWhatsappSecondary: true
      });
    }

    // 4. Custom Button
    const customEnabled = mConfig.cta_custom_enabled !== undefined 
      ? !!mConfig.cta_custom_enabled 
      : false; // Default fallback: disabled
    
    if (customEnabled) {
      const text = mConfig.cta_custom_text || 'More Info';
      const value = mConfig.cta_custom_dest_value || '';
      
      list.push({
        id: 'custom',
        text,
        icon: <ArrowRight className="h-4 w-4" />,
        onClick: () => {
          if (value.startsWith('tel:') || value.startsWith('mailto:')) {
            window.location.href = value;
          } else if (value.startsWith('/')) {
            window.location.href = value;
          } else {
            const url = value.startsWith('http') ? value : 'https://' + value;
            window.open(url, '_blank', 'noopener,noreferrer');
          }
        },
        isWhatsappSecondary: false
      });
    }

    return list;
  };



  // 404 Service Not Found state
  if (!service) {
    return (
      <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-150 rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center shadow-xl space-y-6"
        >
          <div className="h-16 w-16 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-500">
            <AlertCircle className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h1 className="font-display font-black text-2xl text-[#081C3A] tracking-tight">
              Service Not Found
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
              We couldn't find the dental service or treatment page you're looking for. It might have been moved, renamed, or is currently inactive.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={handleBackToServices}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Active / Inactive check
  if (service && !service.is_active) {
    return (
      <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-150 rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center shadow-xl space-y-6"
        >
          <div className="h-16 w-16 bg-amber-50 border border-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-500">
            <AlertCircle className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h1 className="font-display font-black text-2xl text-[#081C3A] tracking-tight">
              Treatment Inactive
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
              This treatment page is currently inactive or undergoing updates. Please check back later or contact our support team.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={handleBackToServices}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-[108px] sm:pt-[124px] lg:pt-[140px] pb-5 sm:pb-12 px-4 sm:px-6 lg:px-8 selection:bg-[#0D9488]/20 selection:text-[#081C3A]">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-16 lg:space-y-20">
        
        {/* Service Hero Section */}

        {/* Dynamic Offer Banner (Promotional Section) */}
        {(mConfig.offer_show !== false && mConfig.show_offer_banner !== false && !isNewArchitecture) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#081C3A] via-[#0b2853] to-[#0D9488] border border-teal-500/20 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            id="promo-offer-banner"
          >
            {/* Ambient subtle decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <div className="space-y-3 relative z-10 max-w-2xl">
              {mConfig.offer_badge && (
                <span className="inline-flex items-center gap-1 bg-amber-500 text-[#081C3A] text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md leading-none">
                  {mConfig.offer_badge}
                </span>
              )}
              <div className="space-y-1">
                <h3 className="font-display font-black text-lg sm:text-xl text-white tracking-tight leading-tight">
                  {mConfig.offer_title || "Special Promotional Offer"}
                </h3>
                {mConfig.offer_subtitle && (
                  <p className="text-teal-300 text-xs sm:text-sm font-black uppercase tracking-wide">
                    {mConfig.offer_subtitle}
                  </p>
                )}
              </div>
              {mConfig.offer_description && (
                <p className="text-slate-300 text-xs leading-relaxed max-w-xl">
                  {mConfig.offer_description}
                </p>
              )}
            </div>

            <div className="relative z-10 shrink-0 w-full md:w-auto">
              <button
                onClick={() => {
                  if (mConfig.offer_button_link && mConfig.offer_button_link.trim() !== '') {
                    if (mConfig.offer_button_link.startsWith('http')) {
                      window.open(mConfig.offer_button_link, '_blank', 'noopener,noreferrer');
                    } else {
                      window.location.hash = mConfig.offer_button_link;
                    }
                  } else {
                    openAppointmentModal(`${service.title} - Promo Offer Claim`);
                  }
                }}
                className="w-full md:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-[#081C3A] text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>{mConfig.offer_button_text || "Claim Offer Now"}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Phase 4 Dynamic Section Layout Engine */}
        {(() => {
          const clinicName = mConfig.contact_clinic_name || "Patel Dental Hospital";

          // Helper definitions for the 12 CMS sections
          const heroElement = (mConfig.show_hero !== false) ? (
            isNewArchitecture ? (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-10 md:p-14 shadow-xs hover:shadow-sm transition-shadow duration-300 relative overflow-hidden" id="service-hero-section">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
                  
                  {/* LEFT SIDE: Content */}
                  <div className="lg:col-span-7 space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-1 text-left">
                    {isDentalImplants ? (
                      <>
                        <div className="space-y-3">
                          {/* Offer/Highlight */}
                          <div className="inline-flex items-center gap-1.5 bg-[#F0FDFA] border border-teal-150 text-[#0D9488] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-3xs">
                            <Sparkles className="h-3.5 w-3.5 text-[#0D9488]" />
                            <span>Fixed Teeth in Just One Week</span>
                          </div>

                          {/* Hero Title (H1) */}
                          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] text-[#081C3A] tracking-tight leading-[1.15]">
                            Missing Teeth? Get Fixed Teeth with Dental Implants.
                          </h1>
                        </div>

                        {/* Subheading */}
                        <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed whitespace-pre-line">
                          Replace missing or loose teeth with strong, natural-looking fixed teeth designed to restore comfortable chewing, confidence, and your smile.
                        </p>

                        {/* Proof Bar (Visible within first screen without scrolling) */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-bold text-slate-700 bg-[#F8FAFC] border border-slate-100 rounded-2xl p-3 sm:px-4 sm:py-3.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#0D9488] font-black">7000+</span>
                            <span className="text-[#081C3A] font-extrabold text-xs sm:text-sm">Implant Placements</span>
                          </div>
                          <span className="text-slate-300 hidden sm:inline">|</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#0D9488] font-black">350+</span>
                            <span className="text-[#081C3A] font-extrabold text-xs sm:text-sm">Full Mouth Cases</span>
                          </div>
                          <span className="text-slate-300 hidden sm:inline">|</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#0D9488] font-black">Fixed Teeth</span>
                            <span className="text-[#081C3A] font-extrabold text-xs sm:text-sm">in 1 Week</span>
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                          <button
                            type="button"
                            onClick={() => openAppointmentModal("Dental Implants - Book Free Implant Consultation")}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50"
                          >
                            <Calendar className="h-4 w-4" />
                            <span>Book Free Implant Consultation</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => {
                              const prefilledText = "Hello, I have missing teeth and want to know about dental implants. Here is my X-ray:";
                              window.open(getGlobalWhatsAppUrl(prefilledText), '_blank', 'noopener,noreferrer');
                            }}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#081C3A] hover:bg-[#112C55] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#081C3A]/50"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>WhatsApp Your X-Ray</span>
                          </button>
                        </div>
                      </>
                    ) : isFullMouth ? (
                      <>
                        <div className="space-y-3">
                          {/* Hero Title (H1) */}
                          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] text-[#081C3A] tracking-tight leading-[1.15]">
                            FMR: Struggling to Chew, Speak or Smile?
                          </h1>
                        </div>

                        {/* Subheading */}
                        <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed whitespace-pre-line">
                          Full mouth rehabilitation combining implants, crowns, root canals and gum treatment in one coordinated plan, led by Dr. Vipul Patel with a full specialist team in-house.
                        </p>

                        {/* 4 Separate Individual Proof Cards */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Complete plan before you start</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Written, fixed cost</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>2 Specialists, One Clinic</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>800+ FMR Cases</span>
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                          <button
                            type="button"
                            onClick={() => openAppointmentModal("Full Mouth Rehabilitation - Book Free FMR Consultation")}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-[13px] font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50 whitespace-nowrap"
                          >
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>Book Free FMR Consultation</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => {
                              const prefilledText = "Hello Patel Dental Hospital, I would like to send my X-ray for Full Mouth Rehabilitation to get a full plan in 24 hours.";
                              window.open(getGlobalWhatsAppUrl(prefilledText), '_blank', 'noopener,noreferrer');
                            }}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-[#081C3A] hover:bg-[#112C55] text-white text-xs sm:text-[13px] font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#081C3A]/50 whitespace-nowrap"
                          >
                            <MessageCircle className="h-4 w-4 shrink-0" />
                            <span>WhatsApp Your X-Ray</span>
                          </button>
                        </div>
                      </>
                    ) : isRootCanal ? (
                      <>
                        <div className="space-y-3">
                          {/* Eyebrow */}
                          <div className="inline-flex items-center gap-1.5 bg-[#F0FDFA] border border-teal-150 text-[#0D9488] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-3xs">
                            <Sparkles className="h-3.5 w-3.5 text-[#0D9488]" />
                            <span>ADVANCED ENDODONTIC TREATMENT</span>
                          </div>

                          {/* Hero Title (H1) */}
                          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] text-[#081C3A] tracking-tight leading-[1.15]">
                            Single Sitting Root Canal Treatment in Rajkot
                          </h1>
                        </div>

                        {/* Subheading */}
                        <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed whitespace-pre-line">
                          Severe tooth pain or infection does not always mean multiple dental visits. With proper expertise and advanced technology, your root canal treatment can be completed in a single comfortable sitting.
                        </p>

                        {/* 4 Separate Individual Proof Cards */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Emergency Pain Relief Today</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Single-Sitting (Save 2-3 Visits)</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>100% Success Rate</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Virtually Painless &amp; Gentle</span>
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                          <button
                            type="button"
                            onClick={() => openAppointmentModal("Single Sitting Root Canal - Book Urgent Pain Consultation")}
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:px-4 md:px-5 lg:px-3 xl:px-5 sm:py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-[12px] md:text-[12px] lg:text-[11.5px] xl:text-[13px] font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50 whitespace-nowrap"
                          >
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>BOOK URGENT PAIN CONSULTATION</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => {
                              const prefilledText = "Hello Patel Dental Hospital, I have severe tooth pain and want to consult about single sitting root canal treatment. Here is a photo/X-ray of my tooth:";
                              window.open(getGlobalWhatsAppUrl(prefilledText), '_blank', 'noopener,noreferrer');
                            }}
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:px-4 md:px-5 lg:px-3 xl:px-5 sm:py-3.5 bg-[#081C3A] hover:bg-[#112C55] text-white text-xs sm:text-[12px] md:text-[12px] lg:text-[11.5px] xl:text-[13px] font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#081C3A]/50 whitespace-nowrap"
                          >
                            <MessageCircle className="h-4 w-4 shrink-0" />
                            <span>WHATSAPP YOUR TOOTH PHOTO/X-RAY</span>
                          </button>
                        </div>
                      </>
                    ) : isInvisibleAligners ? (
                      <>
                        <div className="space-y-3">
                          {/* Hero Title (H1) */}
                          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] text-[#081C3A] tracking-tight leading-[1.15]">
                            Want Straighter Teeth Without Metal Braces?
                          </h1>
                        </div>

                        {/* Subheading */}
                        <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed whitespace-pre-line">
                          Straighten your teeth with clear, custom-made aligners designed to gradually improve alignment without the appearance of traditional metal braces.
                        </p>

                        {/* 4 Separate Individual Proof Cards */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Clear &amp; Removable</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Custom-Made for Your Teeth</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Straighten Teeth Discreetly</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Treatment Plan Before You Start</span>
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                          <button
                            type="button"
                            onClick={() => openAppointmentModal("Invisible Aligners - Book Your Aligner Consultation")}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-[13px] font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50 whitespace-nowrap"
                          >
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>BOOK YOUR ALIGNER CONSULTATION</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => {
                              const prefilledText = "Hello Patel Dental Hospital, I would like to enquire about Invisible Aligners for straighter teeth without metal braces. Please share available consultation slots.";
                              window.open(getGlobalWhatsAppUrl(prefilledText), '_blank', 'noopener,noreferrer');
                            }}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-[#081C3A] hover:bg-[#112C55] text-white text-xs sm:text-[13px] font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#081C3A]/50 whitespace-nowrap"
                          >
                            <MessageCircle className="h-4 w-4 shrink-0" />
                            <span>WHATSAPP US</span>
                          </button>
                        </div>
                      </>
                    ) : isSmileMakeover ? (
                      <>
                        <div className="space-y-3">
                          {/* Eyebrow */}
                          <div className="inline-flex items-center gap-1.5 bg-[#F0FDFA] border border-teal-100 text-[#0D9488] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-3xs">
                            <Sparkles className="h-3.5 w-3.5 text-[#0D9488]" />
                            <span>PREVIEW YOUR SMILE FIRST</span>
                          </div>

                          {/* Hero Title (H1) */}
                          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] text-[#081C3A] tracking-tight leading-[1.15]">
                            See Your New Smile Before You Commit to It
                          </h1>
                        </div>

                        {/* Subheading */}
                        <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed whitespace-pre-line font-sans">
                          Digital Smile Design lets you preview your result on your own face  -  and try a physical mock-up in your own mouth  -  before any treatment begins.
                        </p>

                        {/* Qualitative proof points - no fake stats or numbers! */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1 text-left">
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>3D Scan Preview First</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Try-In Mouth Mock-Up</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Reversible First Step</span>
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              const prefilledText = "Hello Patel Dental Hospital, I would like to send my smile photo for a Digital Smile Design preview.";
                              window.open(getGlobalWhatsAppUrl(prefilledText), '_blank', 'noopener,noreferrer');
                            }}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50"
                          >
                            <MessageCircle className="h-4 w-4 shrink-0" />
                            <span>SEND A SMILE PHOTO ON WHATSAPP</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => openAppointmentModal("Smile Makeover - Book Free Consultation")}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#081C3A] hover:bg-[#112C55] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#081C3A]/50 group"
                          >
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>Book Free Consultation</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                          </button>
                        </div>
                      </>
                    ) : isCrownsAndBridges ? (
                      <>
                        <div className="space-y-3">
                          {/* Eyebrow */}
                          <div className="inline-flex items-center gap-1.5 bg-[#F0FDFA] border border-teal-150 text-[#0D9488] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-3xs">
                            <Sparkles className="h-3.5 w-3.5 text-[#0D9488]" />
                            <span>RESTORE FUNCTION & AESTHETICS</span>
                          </div>

                          {/* Hero Title (H1) */}
                          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] text-[#081C3A] tracking-tight leading-[1.15]">
                            Broken or Missing Tooth? Get Fixed Teeth.
                          </h1>
                        </div>

                        {/* Subheading */}
                        <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed whitespace-pre-line font-sans">
                          Material choice matters. Understand the difference between Zirconia, PFM and E-Max before deciding. The right recommendation depends on your tooth location, functional requirements and aesthetic goals.
                        </p>

                        {/* Qualitative proof points */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1 text-left">
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Material Options Explained Clearly</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Digital Scan-Based Workflow</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Personalised Treatment Recommendation</span>
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                          <button
                            type="button"
                            onClick={() => openAppointmentModal("Crowns & Bridges - Book Crowns & Bridges Consultation")}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50"
                          >
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>Book Crowns & Bridges Consultation</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const prefilledText = "Hello Patel Dental Hospital, I would like to consult about Crowns & Bridges for my teeth. Which material would be best for me?";
                              window.open(getGlobalWhatsAppUrl(prefilledText), '_blank', 'noopener,noreferrer');
                            }}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#081C3A] hover:bg-[#112C55] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#081C3A]/50 group"
                          >
                            <MessageCircle className="h-4 w-4 shrink-0" />
                            <span>WhatsApp for Recommendation</span>
                          </button>
                        </div>
                      </>
                    ) : isPediatricDentistry ? (
                      <>
                        <div className="space-y-3">
                          <div className="inline-flex items-center gap-1.5 bg-[#F0FDFA] border border-teal-150 text-[#0D9488] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-3xs">
                            <Sparkles className="h-3.5 w-3.5 text-[#0D9488]" />
                            <span>GENTLE &amp; CHILD-FRIENDLY DENTAL CARE</span>
                          </div>

                          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] text-[#081C3A] tracking-tight leading-[1.15]">
                            Gentle Dental Care for Your Child
                          </h1>
                        </div>

                        <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed whitespace-pre-line font-sans">
                          Specialized pediatric dentistry in Rajkot providing gentle, fear-free treatments, preventive care, and comforting dental visits for infants, children, and teens.
                        </p>

                        {/* Proof / Reassurance Cards */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1 text-left">
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Gentle &amp; Fear-Free Approach</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Child-Safe Environment</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Parent Guidance &amp; Care</span>
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                          <button
                            type="button"
                            onClick={() => openAppointmentModal("Pediatric Dentistry - Book Your Child's First Visit  -  Free")}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50"
                          >
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>Book Your Child&apos;s First Visit  -  Free</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const prefilledText = "Hello Patel Dental Hospital, I would like to book my child's first dental visit or consult about pediatric dental care.";
                              window.open(getGlobalWhatsAppUrl(prefilledText), '_blank', 'noopener,noreferrer');
                            }}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#081C3A] hover:bg-[#112C55] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#081C3A]/50 group"
                          >
                            <MessageCircle className="h-4 w-4 shrink-0" />
                            <span>WhatsApp for Child Care Advice</span>
                          </button>
                        </div>
                      </>) : isTeethWhitening ? (
                      <>
                        <div className="space-y-3">
                          <div className="inline-flex items-center gap-1.5 bg-[#F0FDFA] border border-teal-150 text-[#0D9488] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-3xs">
                            <Sparkles className="h-3.5 w-3.5 text-[#0D9488]" />
                            <span>IN-CLINIC PROFESSIONAL WHITENING</span>
                          </div>

                          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] text-[#081C3A] tracking-tight leading-[1.15]">
                            Brighter, Whiter Smile in Just 30 Minutes
                          </h1>
                        </div>

                        <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed whitespace-pre-line font-sans">
                          Professional in-clinic teeth whitening performed under expert dental supervision in Rajkot for safe, noticeable results in a single 30-minute session.
                        </p>

                        {/* Proof / Reassurance Cards */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1 text-left">
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>30-Minute In-Clinic Care</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Dentist-Supervised Safety</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                            <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                            <span>Enamel-Conscious Protection</span>
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                          <button
                            type="button"
                            onClick={() => openAppointmentModal("Teeth Whitening - Book Teeth Whitening Consultation")}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50"
                          >
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>Book Teeth Whitening Consultation</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const prefilledText = "Hello Patel Dental Hospital, I would like to consult about Teeth Whitening before an upcoming event. Please share available appointment slots.";
                              window.open(getGlobalWhatsAppUrl(prefilledText), '_blank', 'noopener,noreferrer');
                            }}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#081C3A] hover:bg-[#112C55] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#081C3A]/50 group"
                          >
                            <MessageCircle className="h-4 w-4 shrink-0" />
                            <span>WhatsApp for Whitening Advice</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-3">
                          {/* Hero Title */}
                          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] text-[#081C3A] tracking-tight leading-[1.15]">
                            {service.title}
                          </h1>
                          
                          {/* Hero Subtitle */}
                          {service.hero_title && service.hero_title.trim() !== '' && (
                            <p className="text-[#0D9488] font-sans font-extrabold text-base sm:text-lg md:text-xl tracking-tight uppercase">
                              {service.hero_title}
                            </p>
                          )}
                        </div>

                        {/* Hero Description */}
                        <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed whitespace-pre-line">
                          {service.hero_description && service.hero_description.trim() !== '' ? service.hero_description : service.short_description}
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                          {getCtaButtons().map((btn) => {
                            const isAppointment = btn.id === 'appointment';
                            const isWhatsapp = btn.id === 'whatsapp';
                            
                            // Only render Book Appointment and WhatsApp buttons for Section 1
                            if (!isAppointment && !isWhatsapp) return null;

                            let btnClass = "";
                            if (isAppointment) {
                              btnClass = "inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50";
                            } else {
                              btnClass = "inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#081C3A] hover:bg-[#112C55] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#081C3A]/50";
                            }

                            return (
                              <button key={btn.id} type="button" onClick={btn.onClick} className={btnClass}>
                                {btn.icon}
                                <span>{btn.text}</span>
                                {isAppointment && <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>

                  {/* RIGHT SIDE: Large Hero Image */}
                  <div className="lg:col-span-5 order-1 lg:order-2">
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] xl:aspect-square w-full bg-slate-50 rounded-2xl overflow-hidden shadow-md border border-slate-200/60 group">
                      <img
                        src={heroImage}
                        alt={service.title || "Dental Implants Care"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="eager"
                      />
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-150 rounded-3xl overflow-hidden shadow-sm relative grid grid-cols-1 md:grid-cols-12" id="cms-section-hero">
                {/* Hero Left Info Section */}
                <div className="p-8 sm:p-12 md:col-span-7 flex flex-col justify-center space-y-6 relative z-10">
                  {isDentalImplants ? (
                    <>
                      <div className="space-y-3">
                        {/* Offer/Highlight */}
                        <div className="inline-flex items-center gap-1.5 bg-[#F0FDFA] border border-teal-150 text-[#0D9488] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-3xs">
                          <Sparkles className="h-3.5 w-3.5 text-[#0D9488]" />
                          <span>Fixed Teeth in Just One Week</span>
                        </div>

                        {/* Hero Title (H1) */}
                        <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#081C3A] tracking-tight leading-tight">
                          Missing Teeth? Get Fixed Teeth with Dental Implants.
                        </h1>
                      </div>

                      <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                        Replace missing or loose teeth with strong, natural-looking fixed teeth designed to restore comfortable chewing, confidence, and your smile.
                      </p>

                      {/* Proof Bar (Visible within first screen without scrolling) */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-bold text-slate-700 bg-[#F8FAFC] border border-slate-100 rounded-2xl p-3 sm:px-4 sm:py-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#0D9488] font-black">7000+</span>
                          <span className="text-[#081C3A] font-extrabold text-xs sm:text-sm">Implant Placements</span>
                        </div>
                        <span className="text-slate-300 hidden sm:inline">|</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#0D9488] font-black">350+</span>
                          <span className="text-[#081C3A] font-extrabold text-xs sm:text-sm">Full Mouth Cases</span>
                        </div>
                        <span className="text-slate-300 hidden sm:inline">|</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#0D9488] font-black">Fixed Teeth</span>
                          <span className="text-[#081C3A] font-extrabold text-xs sm:text-sm">in 1 Week</span>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() => openAppointmentModal("Dental Implants - Book Free Implant Consultation")}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                        >
                          <Calendar className="h-4 w-4" />
                          <span>Book Free Implant Consultation</span>
                          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => {
                            const prefilledText = "Hello, I have missing teeth and want to know about dental implants. Here is my X-ray:";
                            window.open(getGlobalWhatsAppUrl(prefilledText), '_blank', 'noopener,noreferrer');
                          }}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#081C3A] hover:bg-[#112C55] text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>WhatsApp Your X-Ray</span>
                        </button>
                      </div>
                    </>
                  ) : isFullMouth ? (
                    <>
                      <div className="space-y-3">
                        <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#081C3A] tracking-tight leading-tight">
                          FMR: Struggling to Chew, Speak or Smile?
                        </h1>
                      </div>

                      <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                        Full mouth rehabilitation combining implants, crowns, root canals and gum treatment in one coordinated plan, led by Dr. Vipul Patel with a full specialist team in-house.
                      </p>

                      {/* 4 Separate Individual Proof Cards */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
                        <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                          <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                          <span>Complete plan before you start</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                          <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                          <span>Written, fixed cost</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                          <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                          <span>2 Specialists, One Clinic</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                          <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                          <span>800+ FMR Cases</span>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => openAppointmentModal("Full Mouth Rehabilitation - Book Free FMR Consultation")}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-[13px] font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group whitespace-nowrap"
                        >
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span>Book Free FMR Consultation</span>
                          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => {
                            const prefilledText = "Hello Patel Dental Hospital, I would like to send my X-ray for Full Mouth Rehabilitation to get a full plan in 24 hours.";
                            window.open(getGlobalWhatsAppUrl(prefilledText), '_blank', 'noopener,noreferrer');
                          }}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-[#081C3A] hover:bg-[#112C55] text-white text-xs sm:text-[13px] font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap"
                        >
                          <MessageCircle className="h-4 w-4 shrink-0" />
                          <span>WhatsApp Your X-Ray</span>
                        </button>
                      </div>
                    </>
                  ) : isInvisibleAligners ? (
                    <>
                      <div className="space-y-3">
                        <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#081C3A] tracking-tight leading-tight">
                          Want Straighter Teeth Without Metal Braces?
                        </h1>
                      </div>

                      <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                        Straighten your teeth with clear, custom-made aligners designed to gradually improve alignment without the appearance of traditional metal braces.
                      </p>

                      {/* 4 Separate Individual Proof Cards */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
                        <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                          <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                          <span>Clear &amp; Removable</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                          <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                          <span>Custom-Made for Your Teeth</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                          <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                          <span>Straighten Teeth Discreetly</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-2.5 py-2 text-[11.5px] sm:text-xs font-bold text-slate-700">
                          <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                          <span>Treatment Plan Before You Start</span>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => openAppointmentModal("Invisible Aligners - Book Your Aligner Consultation")}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-[13px] font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group whitespace-nowrap"
                        >
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span>BOOK YOUR ALIGNER CONSULTATION</span>
                          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => {
                            const prefilledText = "Hello Patel Dental Hospital, I would like to enquire about Invisible Aligners for straighter teeth without metal braces. Please share available consultation slots.";
                            window.open(getGlobalWhatsAppUrl(prefilledText), '_blank', 'noopener,noreferrer');
                          }}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-[#081C3A] hover:bg-[#112C55] text-white text-xs sm:text-[13px] font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap"
                        >
                          <MessageCircle className="h-4 w-4 shrink-0" />
                          <span>WHATSAPP US</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-3">
                        <span className="inline-flex items-center gap-1 bg-teal-50 text-[#0D9488] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-teal-100/50">
                          <Sparkles className="h-3 w-3 text-[#0D9488] animate-pulse" />
                          Premium Care treatment
                        </span>
                        <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#081C3A] tracking-tight leading-tight">
                          {service.hero_title && service.hero_title.trim() !== '' ? service.hero_title : service.title}
                        </h1>
                      </div>
                      
                      <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                        {service.hero_description && service.hero_description.trim() !== '' ? service.hero_description : service.short_description}
                      </p>

                      {/* Quick trust bullet points */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 border-t border-slate-100 pt-5">
                        <div className="flex items-center gap-2.5 text-xs text-slate-600 font-semibold">
                          <CheckCircle2 className="h-4 w-4 text-[#0D9488]" />
                          FDA-Approved Standards
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-slate-600 font-semibold">
                          <CheckCircle2 className="h-4 w-4 text-[#0D9488]" />
                          Painless Sedation Therapy
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-slate-600 font-semibold">
                          <CheckCircle2 className="h-4 w-4 text-[#0D9488]" />
                          Top Panel Specialists
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-slate-600 font-semibold">
                          <CheckCircle2 className="h-4 w-4 text-[#0D9488]" />
                          Lifetime Work Warranty
                        </div>
                      </div>

                      {/* Book Appointment & WhatsApp Actions */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-3">
                        {getCtaButtons().map((btn, index) => {
                          const isPrimary = index === 0;
                          const baseClass = isPrimary
                            ? "inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                            : "inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer";

                          let resolvedClass = baseClass;
                          if (btn.isWhatsappSecondary && !isPrimary) {
                            resolvedClass = "inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer";
                          }

                          return (
                            <button key={btn.id} type="button" onClick={btn.onClick} className={resolvedClass}>
                              {btn.icon}
                              <span>{btn.text}</span>
                              {btn.id === 'appointment' && isPrimary && <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>

                {/* Hero Right Media Image Section */}
                <div className="md:col-span-5 relative min-h-[300px] md:min-h-[450px] overflow-hidden bg-slate-100">
                  <img
                    src={heroImage}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Elegant vignette shadow gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent via-[#081C3A]/10 to-white md:to-white" />
                </div>
              </div>
            )
          ) : null;



          const introElement = (mConfig.show_introduction !== false && !isRootCanal && !isSmileMakeover && !isCrownsAndBridges && !isPediatricDentistry && !isTeethWhitening) ? (
            isFullMouth ? (
              <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-6 sm:space-y-10" id="fmr-symptom-qualification">
                <div className="space-y-3 max-w-3xl mx-auto text-center">
                  <span className="text-[#0D9488] font-sans font-extrabold text-xs tracking-wider uppercase">
                    YOU MAY NEED THIS IF...
                  </span>
                  <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                    Is Your Mouth Making Everyday Life Difficult?
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                    If multiple dental problems are affecting how you eat, speak, smile, or feel about your teeth, a complete Full Mouth Rehabilitation plan may be the right next step.
                  </p>
                  <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch text-left">
                  {/* Symptom 1 */}
                  <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-7 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                    <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                    <p className="font-sans font-bold text-[#081C3A] text-base sm:text-[17px] lg:text-[18px] leading-snug tracking-tight pl-2">
                      You have multiple missing, damaged, or severely worn teeth
                    </p>
                  </div>

                  {/* Symptom 2 */}
                  <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-7 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                    <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                    <p className="font-sans font-bold text-[#081C3A] text-base sm:text-[17px] lg:text-[18px] leading-snug tracking-tight pl-2">
                      Eating has become difficult or uncomfortable
                    </p>
                  </div>

                  {/* Symptom 3 */}
                  <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-7 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                    <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                    <p className="font-sans font-bold text-[#081C3A] text-base sm:text-[17px] lg:text-[18px] leading-snug tracking-tight pl-2">
                      Your bite feels uneven, painful, or unstable
                    </p>
                  </div>

                  {/* Symptom 4 */}
                  <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-7 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                    <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                    <p className="font-sans font-bold text-[#081C3A] text-base sm:text-[17px] lg:text-[18px] leading-snug tracking-tight pl-2">
                      You have repeated dental problems across different teeth
                    </p>
                  </div>

                  {/* Symptom 5 */}
                  <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-7 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                    <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                    <p className="font-sans font-bold text-[#081C3A] text-base sm:text-[17px] lg:text-[18px] leading-snug tracking-tight pl-2">
                      You avoid smiling because of the condition of your teeth
                    </p>
                  </div>

                  {/* Symptom 6 */}
                  <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-7 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                    <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                    <p className="font-sans font-bold text-[#081C3A] text-base sm:text-[17px] lg:text-[18px] leading-snug tracking-tight pl-2">
                      You are tired of getting one dental problem fixed after another
                    </p>
                  </div>
                </div>
              </div>
            ) : isInvisibleAligners ? (
              <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-6 sm:space-y-10" id="aligners-symptom-qualification">
                <div className="space-y-3 max-w-3xl mx-auto text-center">
                  <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                    You May Need Invisible Aligners If...
                  </h2>
                  <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch text-left">
                  {/* Card 1 */}
                  <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-7 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                    <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                    <p className="font-sans font-bold text-[#081C3A] text-base sm:text-[17px] lg:text-[18px] leading-snug tracking-tight pl-2">
                      Your teeth are crooked, crowded, or overlapping
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-7 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                    <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                    <p className="font-sans font-bold text-[#081C3A] text-base sm:text-[17px] lg:text-[18px] leading-snug tracking-tight pl-2">
                      You have gaps or unwanted spaces between your teeth
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-7 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                    <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                    <p className="font-sans font-bold text-[#081C3A] text-base sm:text-[17px] lg:text-[18px] leading-snug tracking-tight pl-2">
                      You want to improve your smile without visible metal braces
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-7 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                    <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                    <p className="font-sans font-bold text-[#081C3A] text-base sm:text-[17px] lg:text-[18px] leading-snug tracking-tight pl-2">
                      Your teeth have shifted after previous orthodontic treatment
                    </p>
                  </div>

                  {/* Card 5 */}
                  <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-7 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                    <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                    <p className="font-sans font-bold text-[#081C3A] text-base sm:text-[17px] lg:text-[18px] leading-snug tracking-tight pl-2">
                      You have mild to moderate alignment or bite concerns
                    </p>
                  </div>

                  {/* Card 6 */}
                  <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-7 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                    <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                    <p className="font-sans font-bold text-[#081C3A] text-base sm:text-[17px] lg:text-[18px] leading-snug tracking-tight pl-2">
                      You want a removable orthodontic option that fits your daily routine
                    </p>
                  </div>
                </div>
              </div>
            ) : isNewArchitecture ? (
              <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 md:p-14 shadow-xs space-y-8" id="service-treatment-overview">
                <div className="space-y-3 max-w-3xl">
                  {/* Small category tag or subtle text line to match style, e.g. Teal colored accent line or small text */}
                  <span className="text-[#0D9488] font-sans font-extrabold text-xs tracking-wider uppercase">
                    Treatment Overview
                  </span>
                  
                  {/* Section Heading */}
                  <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#081C3A] tracking-tight leading-tight">
                    {seoHeadings.intro}
                  </h2>
                  
                  {/* Subtle divider line */}
                  <div className="h-0.5 w-12 bg-[#0D9488] rounded-full mt-4" />
                </div>
                
                {/* Treatment Overview Description */}
                <div className="max-w-3xl text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans font-medium">
                  {service.intro_description && service.intro_description.trim() !== '' ? service.intro_description : service.description}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 sm:p-8 md:p-10 shadow-3xs space-y-6" id="cms-section-intro">
                <div className="flex items-center gap-3 border-b border-[#e2e8f0] pb-4">
                  <div className="h-8 w-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488]">
                    <Heart className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h2 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">
                      Advanced Dental Care
                    </h2>
                    <h3 className="text-lg font-black text-[#081C3A] tracking-tight">
                      {seoHeadings.intro}
                    </h3>
                  </div>
                </div>
                
                <div className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans font-medium">
                  {service.intro_description && service.intro_description.trim() !== '' ? service.intro_description : service.description}
                </div>
  
                {displayContentImages.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#e2e8f0]">
                    {displayContentImages.map((img, idx) => (
                      <div key={idx} className="space-y-2 group">
                        <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-slate-50 border border-[#e2e8f0] relative shadow-3xs">
                          <img
                            src={img.image_url}
                            alt={img.alt_text || img.caption || 'Content Image'}
                            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        {img.caption && img.caption.trim() !== '' && (
                          <p className="text-slate-500 text-[11px] font-semibold text-center italic">
                             {img.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          ) : null;

          const fullMouthComparisonSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10" id="fmr-treatment-options">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="text-[#0D9488] font-sans font-extrabold text-xs tracking-wider uppercase">
                  TREATMENT OPTIONS
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Which Full Mouth Treatment Option Is Right for You?
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  The right solution depends on how many teeth are affected, the condition of your gums and jawbone, your bite, and your long-term goals.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[24px] shadow-xs overflow-hidden text-left">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[750px]">
                    <thead>
                      <tr className="bg-[#081C3A] text-white">
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Feature
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase bg-[#0D9488] text-white border-b border-teal-600 relative">
                          <span className="relative z-10">Full Mouth Rehabilitation with Dental Implants</span>
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Full Mouth Crowns & Bridges
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Removable Dentures
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {/* Row 1: Best For */}
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Best For
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Multiple missing or failing teeth requiring a long-term fixed solution
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Extensive restoration where natural teeth can be preserved
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Patients needing a removable tooth replacement option
                        </td>
                      </tr>

                      {/* Row 2: Stability */}
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Stability
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Fixed securely in the jaw
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Fixed to remaining natural teeth
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Can move while eating or speaking
                        </td>
                      </tr>

                      {/* Row 3: Natural Appearance */}
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Natural Appearance
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Highly natural-looking
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Natural-looking when well-designed
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Can look less natural over time
                        </td>
                      </tr>

                      {/* Row 4: Comfort */}
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Comfort
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Feels closest to natural teeth
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Generally comfortable
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          May feel bulky or require adjustments
                        </td>
                      </tr>

                      {/* Row 5: Impact on Remaining Teeth */}
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Impact on Remaining Teeth
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Does not depend on adjacent teeth
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          May require support from remaining teeth
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Does not require altering nearby teeth
                        </td>
                      </tr>

                      {/* Row 6: Long-Term Solution */}
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Long-Term Solution
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Designed for long-term function
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          May need maintenance or replacement over time
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          May require adjustments, relining, or replacement
                        </td>
                      </tr>

                      {/* Row 7: Treatment Time */}
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Treatment Time
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Depends on implants, healing, and final restoration plan
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Usually completed over multiple planned visits
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Usually completed in fewer clinical stages
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

          const fullMouthCostSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center" id="fmr-service-cost">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="text-[#0D9488] font-sans font-extrabold text-xs tracking-wider uppercase">
                  TRANSPARENT PRICING
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Full Mouth Rehabilitation Cost
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  The cost of Full Mouth Rehabilitation depends on your existing teeth, gums, jawbone condition, bite, and the treatments required in your personalized plan.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-4xl mx-auto bg-white border border-[#E8EEF5] rounded-[24px] shadow-xs overflow-hidden text-left">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-[#081C3A] text-white">
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Treatment
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase bg-[#F0FDFA] text-[#0D9488] border-b border-teal-200 relative">
                          <span className="relative z-10">Starting Price</span>
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Best For
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Single-Arch Rehabilitation
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Restoring or rebuilding teeth in one upper or lower arch
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Full-Mouth Rehabilitation
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Patients needing comprehensive treatment across both upper and lower arches
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          All-on-4 / All-on-6
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Patients with multiple missing or failing teeth who need fixed full-arch teeth
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Full-Mouth Crowns & Bridges
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Patients whose natural teeth can be preserved but require extensive restoration
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="max-w-2xl mx-auto text-center space-y-6">
                <p className="text-xs sm:text-sm text-slate-500 font-sans italic">
                  Your final treatment plan and cost will be determined after a clinical examination and treatment planning.
                </p>
                <div>
                  <button
                    onClick={() => openAppointmentModal('Full Mouth Rehabilitation - Cost Consultation')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#0D9488] hover:to-[#0F766E] text-white font-sans font-bold text-sm sm:text-base rounded-full shadow-[0_10px_25px_-5px_rgba(13,148,136,0.3)] hover:shadow-[0_20px_35px_-5px_rgba(13,148,136,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Calendar className="h-4.5 w-4.5" />
                    <span>Get Your Personalized FMR Treatment Plan</span>
                  </button>
                </div>
              </div>
            </div>
          );

          const fullMouthTimelineSection = (
            <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-12 mt-8 sm:mt-12 lg:mt-16 text-center" id="fmr-service-timeline">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Your Full Mouth Rehabilitation Timeline
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  Your treatment timeline depends on your oral condition, the treatments required, and the complexity of your personalized rehabilitation plan.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              {/* Connected Timeline Steps */}
              <div className="max-w-6xl mx-auto relative px-4">
                {/* Desktop horizontal connection line */}
                <div className="hidden lg:block absolute top-[40px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-teal-500/20 via-teal-500 to-teal-500/20 z-0" />
                
                {/* Mobile vertical connection line */}
                <div className="lg:hidden absolute left-[50%] -translate-x-[50%] top-10 bottom-10 w-[2px] bg-gradient-to-b from-teal-500/20 via-teal-500 to-teal-500/20 z-0" />
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">1</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Consultation & Assessment
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        Your teeth, gums, bite, and jaw condition are carefully evaluated to create the right rehabilitation plan.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">2</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Treatment Planning
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        Your complete treatment plan is prepared, including the required procedures, sequence, timeline, and estimated cost.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">3</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Coordinated Treatment
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        Required treatments such as implants, root canals, gum treatment, crowns, or bridges are completed according to your plan.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-teal-500 border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-white">4</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Final Smile & Function
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        Your final restorations are completed to restore comfortable chewing, proper function, and a confident smile.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

          const fullMouthWarrantyPolicySection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center" id="fmr-service-warranty-policy">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="text-[#0D9488] font-sans font-extrabold text-xs tracking-wider uppercase">
                  PATIENT CONFIDENCE
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Warranty, Policy & Second Opinion
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  Understand your Full Mouth Rehabilitation treatment plan, support options, and make an informed decision with complete clarity.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
                {/* Card 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  {/* Left accent line */}
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Treatment Warranty & Support
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Get clear information about the support and warranty applicable to your Full Mouth Rehabilitation treatment plan.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  {/* Left accent line */}
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Clear Treatment Policy
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Understand your FMR treatment plan, recommendations, timelines, and important terms before starting treatment.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  {/* Left accent line */}
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Need a Second Opinion?
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Already have a full mouth treatment plan? Consult our specialist team for another professional opinion.
                  </p>
                </div>
              </div>
            </div>
          );

          const fullMouthWhyPatelSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10" id="fmr-why-patel-dental">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  WHY PATEL DENTAL FOR FULL MOUTH REHABILITATION?
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  Complex full mouth rehabilitation requires coordinated planning, experienced specialists, and one team responsible for the complete treatment plan.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
                {/* Card 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    COMPLETE TREATMENT UNDER ONE TEAM
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Your implants, crowns, root canals and gum treatment can be planned together instead of being handled as disconnected treatments.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    EXPERIENCED FULL MOUTH REHABILITATION PLANNING
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Your treatment plan is designed around your bite, remaining teeth, gums and long-term oral function.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    FOCUS ON FIXED, LONG-TERM SOLUTIONS
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    When clinically suitable, treatment planning focuses on stable, functional and natural-looking fixed teeth.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    ADVANCED PLANNING FOR COMPLEX CASES
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Complex dental conditions are evaluated carefully before treatment so the complete rehabilitation plan is clear before treatment begins.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    TWO SPECIALISTS, ONE COORDINATED PLAN
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Your case benefits from coordinated in-house specialist care instead of requiring you to manage treatment between multiple clinics.
                  </p>
                </div>

                {/* Card 6 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    WRITTEN PLAN AND CLEAR COST DISCUSSION
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    You receive a clear treatment plan and cost discussion before treatment begins, helping you understand the full rehabilitation process.
                  </p>
                </div>
              </div>
            </div>
          );

          const fullMouthFaqs = [
            {
              question: "What is included in a Full Mouth Rehabilitation?",
              answer: "A Full Mouth Rehabilitation is a personalised treatment plan that may combine procedures such as dental implants, crowns, bridges, root canal treatment, gum treatment or other required dental procedures. The exact treatment depends on your teeth, gums, bite and overall oral condition."
            },
            {
              question: "How do I know which treatments I actually need?",
              answer: "Your treatment plan is determined after a clinical examination and assessment of your teeth, gums, bite and jaw condition. The goal is to create a coordinated plan based on your individual dental needs."
            },
            {
              question: "How long does Full Mouth Rehabilitation take?",
              answer: "The treatment timeline depends on the procedures required and your individual clinical condition. Some cases may be completed in a shorter treatment period, while complex cases involving multiple stages or healing periods may take longer. Your expected timeline will be explained as part of your treatment plan."
            },
            {
              question: "Will I need dental implants for Full Mouth Rehabilitation?",
              answer: "Not every Full Mouth Rehabilitation requires dental implants. The treatment approach depends on how many teeth are missing, which teeth can be preserved, your gum and bone condition, and your long-term treatment needs."
            },
            {
              question: "Can my natural teeth be saved?",
              answer: "Where clinically appropriate, the treatment plan may focus on preserving suitable natural teeth. This can only be decided after a proper examination and evaluation of each tooth and the surrounding oral condition."
            },
            {
              question: "Is Full Mouth Rehabilitation painful?",
              answer: "Treatment is planned according to the procedures involved and your individual clinical requirements. Your dental team will explain the planned procedures and discuss how comfort and pain management will be handled during treatment."
            },
            {
              question: "How much does Full Mouth Rehabilitation cost?",
              answer: "The final cost depends on the treatments required, the number of teeth involved, materials used and whether additional procedures are needed. You will receive a clear treatment plan and cost discussion before starting treatment."
            },
            {
              question: "Can I get a second opinion on my existing treatment plan?",
              answer: "Yes. If you already have a treatment plan, you can consult our dental team for another professional opinion and discuss the available treatment options for your case."
            },
            {
              question: "What happens if I have multiple dental problems?",
              answer: "Full Mouth Rehabilitation is designed to address multiple connected dental problems through one coordinated treatment plan instead of treating each issue separately without an overall plan."
            },
            {
              question: "Will I know the complete treatment plan before starting?",
              answer: "Your recommended treatment stages and available options will be discussed after your clinical evaluation so you can understand the proposed rehabilitation plan before treatment begins."
            },
            {
              question: "Is there a warranty or policy for my treatment?",
              answer: "Applicable treatment policies, support and warranty information will be explained based on the treatment and materials involved. Please discuss the specific terms applicable to your treatment plan before starting."
            }
          ];

          const fullMouthFaqSection = (
            <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center" id="service-fmr-faq">
              {/* FAQPage JSON-LD Schema */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": fullMouthFaqs.map(faq => ({
                      "@type": "Question",
                      "name": faq.question,
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                      }
                    }))
                  })
                }}
              />

              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  <HelpCircle className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                  FULL MOUTH REHABILITATION FAQ
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Frequently Asked Questions About Full Mouth Rehabilitation
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  Clear answers to the questions patients commonly have before starting a full mouth rehabilitation treatment plan.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-[1100px] mx-auto space-y-4 text-left">
                {fullMouthFaqs.map((faq, idx) => {
                  const isExpanded = expandedDentalFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isExpanded
                          ? 'border-[#0D9488] shadow-sm'
                          : 'border-slate-200/80 hover:border-slate-300 shadow-3xs'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedDentalFaqIdx(isExpanded ? null : idx)}
                        aria-expanded={isExpanded}
                        className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-slate-50/40 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
                      >
                        <span className={`font-sans font-bold text-base sm:text-lg leading-snug pr-4 transition-colors duration-200 ${
                          isExpanded ? 'text-[#0D9488]' : 'text-[#081C3A]'
                        }`}>
                          {faq.question}
                        </span>
                        <span className={`p-1.5 rounded-lg shrink-0 transition-all duration-300 ${
                          isExpanded ? 'bg-teal-50 text-[#0D9488] rotate-180' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <ChevronDown className="h-4.5 w-4.5" />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-6 pb-6 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/80 bg-slate-50/20">
                              <p className="font-medium font-sans whitespace-pre-line">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );

          const alignersComparisonSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16" id="aligners-treatment-comparison">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="text-[#0D9488] font-sans font-extrabold text-xs tracking-wider uppercase">
                  TREATMENT COMPARISON
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Invisible Aligners vs Other Orthodontic Options
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  Compare invisible aligners with other orthodontic treatment options to understand the differences in appearance, comfort, flexibility, and treatment suitability.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[24px] shadow-xs overflow-hidden text-left">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-[#081C3A] text-white">
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Feature
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase bg-[#0D9488] text-white border-b border-teal-600 relative">
                          <span className="relative z-10">Invisible Aligners</span>
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Traditional Braces
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {/* Row 1: Appearance */}
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Appearance
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Nearly invisible and discreet
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Brackets and wires are visible
                        </td>
                      </tr>

                      {/* Row 2: Removability */}
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Removability
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Removable for eating and brushing
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Fixed to the teeth during treatment
                        </td>
                      </tr>

                      {/* Row 3: Eating & Oral Hygiene */}
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Eating &amp; Oral Hygiene
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Easier to remove for meals and cleaning
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Requires cleaning around brackets and wires
                        </td>
                      </tr>

                      {/* Row 4: Daily Discipline */}
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Daily Discipline
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Must be worn consistently as instructed
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Works continuously because they remain fixed
                        </td>
                      </tr>

                      {/* Row 5: Comfort */}
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Comfort
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Smooth plastic trays with no brackets or wires
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Brackets and wires may cause irritation initially
                        </td>
                      </tr>

                      {/* Row 6: Best For */}
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Best For
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Patients suitable for clear, removable orthodontic treatment
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Patients who require a fixed orthodontic approach
                        </td>
                      </tr>

                      {/* Row 7: Treatment Suitability */}
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Treatment Suitability
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Suitability depends on the individual case and treatment planning
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          May be recommended for cases requiring fixed orthodontic control
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

          const alignersCostSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center" id="aligners-service-cost">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="text-[#0D9488] font-sans font-extrabold text-xs tracking-wider uppercase">
                  TRANSPARENT PRICING
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Invisible Aligner Cost
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  The cost of invisible aligner treatment depends on the complexity of your tooth alignment, the number of aligners required, and your personalised treatment plan.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-4xl mx-auto bg-white border border-[#E8EEF5] rounded-[24px] shadow-xs overflow-hidden text-left">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-[#081C3A] text-white">
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Treatment
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase bg-[#F0FDFA] text-[#0D9488] border-b border-teal-200 relative">
                          <span className="relative z-10">Starting Price</span>
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Best For
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Invisible Aligners
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Mild to moderate teeth alignment concerns
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Advanced Invisible Aligners
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          More complex alignment and bite correction
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Comprehensive Aligner Treatment
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Complete smile and bite correction
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="max-w-2xl mx-auto text-center space-y-6">
                <p className="text-xs sm:text-sm text-slate-500 font-sans italic">
                  Your final treatment plan and cost will be determined after a clinical examination and personalised treatment planning.
                </p>
                <div>
                  <button
                    onClick={() => openAppointmentModal('Invisible Aligners - Cost Consultation')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#0D9488] hover:to-[#0F766E] text-white font-sans font-bold text-sm sm:text-base rounded-full shadow-[0_10px_25px_-5px_rgba(13,148,136,0.3)] hover:shadow-[0_20px_35px_-5px_rgba(13,148,136,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Calendar className="h-4.5 w-4.5" />
                    <span>Get a Personalised Aligner Treatment Plan</span>
                  </button>
                </div>
              </div>
            </div>
          );

          const alignersTimelineSection = (
            <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-12 mt-8 sm:mt-12 lg:mt-16 text-center" id="aligners-service-timeline">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Your Invisible Aligner Treatment Timeline
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  Your treatment timeline depends on your tooth alignment, treatment complexity, and personalised orthodontic plan.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              {/* Connected Timeline Steps */}
              <div className="max-w-6xl mx-auto relative px-4">
                {/* Desktop horizontal connection line */}
                <div className="hidden lg:block absolute top-[40px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-teal-500/20 via-teal-500 to-teal-500/20 z-0" />
                
                {/* Mobile vertical connection line */}
                <div className="lg:hidden absolute left-[50%] -translate-x-[50%] top-10 bottom-10 w-[2px] bg-gradient-to-b from-teal-500/20 via-teal-500 to-teal-500/20 z-0" />
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">1</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Consultation &amp; Smile Assessment
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        Your teeth, bite, and alignment concerns are evaluated to determine whether invisible aligners are suitable for your case.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">2</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Digital Treatment Planning
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        A personalised treatment plan is created to map the planned movement of your teeth and your aligner treatment process.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">3</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Receive Your Custom Aligners
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        Your custom-made aligners are provided, along with instructions on how to wear and care for them during treatment.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-teal-500 border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-white">4</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Progress Monitoring &amp; Final Results
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        Your treatment progress is monitored through planned follow-up visits until your teeth reach the intended alignment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

          const alignersWarrantyPolicySection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center" id="aligners-service-warranty-policy">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="text-[#0D9488] font-sans font-extrabold text-xs tracking-wider uppercase">
                  PATIENT CONFIDENCE
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Warranty, Policy & Second Opinion
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  Understand your invisible aligner treatment plan clearly and make an informed decision before starting treatment.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
                {/* Card 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  {/* Left accent line */}
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Clear Treatment Plan
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Understand your recommended aligner treatment, planned tooth movement, follow-up process, and treatment stages before you begin.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  {/* Left accent line */}
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Transparent Treatment Discussion
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Discuss your treatment options, expected process, and applicable costs clearly before starting your invisible aligner treatment.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  {/* Left accent line */}
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Need a Second Opinion?
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Already have an orthodontic or aligner treatment plan? Consult our dental team for another professional opinion about your available treatment options.
                  </p>
                </div>
              </div>
            </div>
          );

          const alignersWhyPatelSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10" id="aligners-why-patel-dental">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  WHY PATEL DENTAL FOR INVISIBLE ALIGNERS?
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  Invisible aligner treatment requires careful assessment, personalised planning, and regular monitoring to guide your teeth toward the intended alignment.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
                {/* Card 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    PERSONALISED ALIGNER TREATMENT PLANNING
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Your aligner treatment is planned around your current tooth alignment, bite, and individual orthodontic needs.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    DIGITAL TREATMENT ASSESSMENT
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Your teeth and bite are carefully assessed to help determine whether invisible aligners are suitable for your case.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    CUSTOM-MADE ALIGNERS
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Your aligners are designed specifically for your treatment plan and the planned movement of your teeth.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    REGULAR PROGRESS MONITORING
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Your treatment progress is reviewed through planned follow-ups to monitor how your teeth are responding to the aligners.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    FOCUS ON COMFORT AND DAILY CONVENIENCE
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Clear, removable aligners can offer a more discreet orthodontic option while allowing you to remove them for eating and oral hygiene.
                  </p>
                </div>

                {/* Card 6 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    CLEAR TREATMENT PLAN AND DISCUSSION
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Your recommended treatment approach, process, and applicable costs are discussed clearly before treatment begins.
                  </p>
                </div>
              </div>
            </div>
          );

          const alignersFaqs = [
            {
              question: "What are invisible aligners?",
              answer: "Invisible aligners are clear, custom-made orthodontic trays designed to gradually move teeth according to a personalised treatment plan."
            },
            {
              question: "How do I know if invisible aligners are suitable for me?",
              answer: "Suitability depends on your tooth alignment, bite, treatment complexity, and overall orthodontic needs. A clinical assessment is required to determine whether invisible aligners are an appropriate option for your case."
            },
            {
              question: "Are invisible aligners better than traditional braces?",
              answer: "Neither option is automatically better for every patient. Invisible aligners and traditional braces have different advantages, and the most suitable treatment depends on your individual orthodontic condition and treatment requirements."
            },
            {
              question: "How long does invisible aligner treatment take?",
              answer: "Treatment duration depends on the complexity of your tooth movement and individual treatment plan. Your expected treatment timeline will be discussed after your assessment and treatment planning."
            },
            {
              question: "Do I have to wear aligners all day?",
              answer: "Your dental team will explain the recommended wearing schedule for your specific treatment plan and how consistent wear affects the progress of treatment."
            },
            {
              question: "Can I remove my invisible aligners while eating?",
              answer: "Invisible aligners are removable, and your dental team will provide instructions on when and how to remove, wear, and care for them during treatment."
            },
            {
              question: "Are invisible aligners painful?",
              answer: "Some patients may experience temporary pressure or discomfort as teeth begin to move. Your dental team can explain what to expect during your specific treatment process."
            },
            {
              question: "How much do invisible aligners cost?",
              answer: "The cost depends on the complexity of your alignment concerns, the treatment plan required, and other individual factors. Your personalised treatment plan and applicable costs will be discussed after assessment."
            },
            {
              question: "Will invisible aligners affect my daily routine?",
              answer: "Invisible aligners are removable, which can make eating and oral hygiene more convenient. However, successful treatment also depends on following the wearing and care instructions provided for your treatment plan."
            },
            {
              question: "What happens after invisible aligner treatment is complete?",
              answer: "After the planned tooth movement is completed, your dental team will discuss the next steps required to help maintain your achieved alignment."
            },
            {
              question: "Can I get a second opinion about my orthodontic treatment plan?",
              answer: "Yes. If you already have an orthodontic or aligner treatment plan, you can consult our dental team for another professional opinion and discuss the available options for your case."
            }
          ];

          const alignersFaqSection = (
            <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center" id="service-aligners-faq">
              {/* FAQPage JSON-LD Schema */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": alignersFaqs.map(faq => ({
                      "@type": "Question",
                      "name": faq.question,
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                      }
                    }))
                  })
                }}
              />

              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  <HelpCircle className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                  INVISIBLE ALIGNERS FAQ
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Frequently Asked Questions About Invisible Aligners
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  Clear answers to common questions patients have before starting invisible aligner treatment.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-[1100px] mx-auto space-y-4 text-left">
                {alignersFaqs.map((faq, idx) => {
                  const isExpanded = expandedDentalFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isExpanded
                          ? 'border-[#0D9488] shadow-sm'
                          : 'border-slate-200/80 hover:border-slate-300 shadow-3xs'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedDentalFaqIdx(isExpanded ? null : idx)}
                        aria-expanded={isExpanded}
                        className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-slate-50/40 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
                      >
                        <span className={`font-sans font-bold text-base sm:text-lg leading-snug pr-4 transition-colors duration-200 ${
                          isExpanded ? 'text-[#0D9488]' : 'text-[#081C3A]'
                        }`}>
                          {faq.question}
                        </span>
                        <span className={`p-1.5 rounded-lg shrink-0 transition-all duration-300 ${
                          isExpanded ? 'bg-teal-50 text-[#0D9488] rotate-180' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <ChevronDown className="h-4.5 w-4.5" />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-6 pb-6 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/80 bg-slate-50/20">
                              <p className="font-medium font-sans whitespace-pre-line">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );

          const rootCanalWhyPatelSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16" id="rct-why-patel-dental">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                  WHY PATEL DENTAL
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Why Choose Patel Dental Hospital for Single Sitting Root Canal Treatment?
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  Advanced endodontic technology, precise diagnostics, and a clinical focus on preserving your natural teeth comfortably.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
                {/* Card 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    SAME-DAY CLINICAL ATTENTION FOR PAIN
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Same-day attention is available for patients experiencing acute, severe tooth pain or swelling to help restore comfort promptly.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    CAREFUL CLINICAL SUITABILITY ASSESSMENT
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    We perform a thorough diagnostic evaluation before deciding whether a single-sitting treatment approach is appropriate for your specific condition.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    DIGITAL APEX LOCATOR TECHNOLOGY
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    High-precision digital apex locators are used to determine root canal lengths accurately, supporting complete infection removal.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    JAPANESE ENDO MOTOR PRECISION
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Advanced Japanese endodontic motors enable smooth, controlled canal preparation, enhancing both safety and patient comfort.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    BIOCOMPATIBLE MTA SEALING TECHNOLOGY
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    We use advanced biocompatible MTA sealers where clinically appropriate to achieve stable, high-quality, long-term root canal seals.
                  </p>
                </div>

                {/* Card 6 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    PRESERVATION &amp; CROWN PROTECTION ADVICE
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Our primary goal is to help preserve your natural tooth. We provide clear guidance regarding post-treatment restoration and crown protection when required.
                  </p>
                </div>
              </div>
            </div>
          );

          const rootCanalFaqs = [
            {
              question: "Can a root canal really be completed in one visit?",
              answer: "For clinically suitable cases, root canal treatment may be completed in a single sitting. The dentist will first examine the tooth and determine whether single-sitting treatment is appropriate for your condition."
            },
            {
              question: "Is single sitting root canal treatment suitable for every patient?",
              answer: "No. Suitability depends on the condition of the tooth, infection, root canal complexity and other clinical factors. A proper examination is required before recommending the treatment approach."
            },
            {
              question: "Will root canal treatment be painful?",
              answer: "Modern root canal treatment is performed with appropriate pain-control methods. The dentist will assess your condition and take the necessary steps to make the procedure as comfortable as possible."
            },
            {
              question: "How many visits are required for a root canal?",
              answer: "Some clinically suitable cases may be completed in a single sitting, while other cases may require additional visits depending on the condition and complexity of the tooth."
            },
            {
              question: "Can a root canal save my natural tooth?",
              answer: "Root canal treatment is performed to remove infection or damaged pulp and help preserve the natural tooth when the tooth is clinically suitable for treatment."
            },
            {
              question: "Do I need a crown after a root canal?",
              answer: "The need for a crown or other restoration depends on the tooth, the amount of remaining tooth structure and your bite. Your dentist will recommend the appropriate protection after treatment."
            },
            {
              question: "What should I do if I have severe tooth pain or swelling?",
              answer: "Severe tooth pain or swelling should be evaluated by a dentist as soon as possible. Contact Patel Dental Hospital to discuss appointment availability."
            },
            {
              question: "How much does single sitting root canal treatment cost?",
              answer: "Contact Us for Pricing. The treatment recommendation and cost can depend on the tooth involved and the complexity of the individual case."
            }
          ];

          const rootCanalFaqSection = (
            <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center" id="service-rct-faq">
              {/* FAQPage JSON-LD Schema */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": rootCanalFaqs.map(faq => ({
                      "@type": "Question",
                      "name": faq.question,
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                      }
                    }))
                  })
                }}
              />

              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  <HelpCircle className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                  ROOT CANAL FAQ
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Frequently Asked Questions About Single Sitting Root Canal Treatment
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  Clear answers to the questions patients commonly have before starting single sitting root canal treatment.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-[1100px] mx-auto space-y-4 text-left">
                {rootCanalFaqs.map((faq, idx) => {
                  const isExpanded = expandedDentalFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isExpanded
                          ? 'border-[#0D9488] shadow-sm'
                          : 'border-slate-200/80 hover:border-slate-300 shadow-3xs'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedDentalFaqIdx(isExpanded ? null : idx)}
                        aria-expanded={isExpanded}
                        className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-slate-50/40 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
                      >
                        <span className={`font-sans font-bold text-base sm:text-lg leading-snug pr-4 transition-colors duration-200 ${
                          isExpanded ? 'text-[#0D9488]' : 'text-[#081C3A]'
                        }`}>
                          {faq.question}
                        </span>
                        <span className={`p-1.5 rounded-lg shrink-0 transition-all duration-300 ${
                          isExpanded ? 'bg-teal-50 text-[#0D9488] rotate-180' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <ChevronDown className="h-4.5 w-4.5" />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-6 pb-6 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/80 bg-slate-50/20">
                              <p className="font-medium font-sans whitespace-pre-line">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );

          const rootCanalSymptomSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-12 mt-8 sm:mt-12 lg:mt-16 text-center" id="rct-service-qualification">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  SYMPTOM QUALIFICATION
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Do You Need a Single Sitting Root Canal?
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  If you are experiencing any of the following acute dental issues, you should schedule a diagnostic evaluation immediately to save your natural tooth from extraction.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch text-left">
                {/* Card 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-[30px] sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[22px] tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Sharp, Spontaneous Tooth Pain
                  </h3>
                  <p className="text-[#475569] text-[15px] sm:text-[16px] leading-[1.7] font-medium flex-1 pl-2">
                    Severe pain that worsens when biting down, chewing, or lying down.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-[30px] sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[22px] tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Extreme Hot or Cold Sensitivity
                  </h3>
                  <p className="text-[#475569] text-[15px] sm:text-[16px] leading-[1.7] font-medium flex-1 pl-2">
                    Lingering discomfort or throbbing pain long after consuming hot teas or cold drinks.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-[30px] sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[22px] tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Gum Swelling &amp; Tenderness
                  </h3>
                  <p className="text-[#475569] text-[15px] sm:text-[16px] leading-[1.7] font-medium flex-1 pl-2">
                    Swollen, red, or tender gums near the painful tooth, sometimes with a visible pimple.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-[30px] sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[22px] tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Tooth Discoloration
                  </h3>
                  <p className="text-[#475569] text-[15px] sm:text-[16px] leading-[1.7] font-medium flex-1 pl-2">
                    Darkening of the tooth, indicating that the inner pulp tissue may be dying or damaged.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-[30px] sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[22px] tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Pain That Wakes You Up at Night
                  </h3>
                  <p className="text-[#475569] text-[15px] sm:text-[16px] leading-[1.7] font-medium flex-1 pl-2">
                    Intense, throbbing pain that strikes suddenly without any chewing trigger.
                  </p>
                </div>

                {/* Card 6 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-[30px] sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col justify-center h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[22px] tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Deep Decay Exposed on X-Ray
                  </h3>
                  <p className="text-[#475569] text-[15px] sm:text-[16px] leading-[1.7] font-medium flex-1 pl-2">
                    Silent, deep-seated infection close to the root canal nerve chamber.
                  </p>
                </div>
              </div>
            </div>
          );

          const rootCanalComparisonSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16" id="rct-treatment-comparison">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="text-[#0D9488] font-sans font-extrabold text-xs tracking-wider uppercase">
                  TREATMENT COMPARISON
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Single Sitting vs. Multiple Sitting Root Canal
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  Understand the key differences between advanced single-visit therapy and traditional multi-visit treatments.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[24px] shadow-xs overflow-hidden text-left">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-[#081C3A] text-white">
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Feature
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase bg-[#0D9488] text-white border-b border-teal-600 relative">
                          <span className="relative z-10">Single Sitting RCT</span>
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Multiple Sitting RCT
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Appointment Duration
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          1 session of 45-60 minutes
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          2 to 3 sessions of 30-45 minutes
                        </td>
                      </tr>

                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Anesthesia &amp; Numbness
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Administered once; single injection discomfort
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Administered at every session; multiple injections
                        </td>
                      </tr>

                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Infection Re-entry Risk
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Zero risk; completed and sealed hermetically in one go
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Moderate risk of contamination between visits
                        </td>
                      </tr>

                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Patient Convenience
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Save hours of travel, work leaves, and clinical anxiety
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Requires scheduling multiple appointments, commuting multiple times
                        </td>
                      </tr>

                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Temporary Restoration
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Not needed; permanent biocompatible filling/seal is done immediately
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Required between sessions; prone to breaking/dislodging
                        </td>
                      </tr>

                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Best For
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Acute pulpal pain, hot/cold pain, and non-pus draining infections
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Chronic large abscesses with active pus drainage
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

          const rootCanalCostSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center" id="rct-service-cost">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="text-[#0D9488] font-sans font-extrabold text-xs tracking-wider uppercase">
                  TRANSPARENT PRICING
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Transparent Root Canal Pricing
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  We believe in honest, upfront pricing with no hidden charges. Below is a breakdown of our standard endodontic treatments.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-4xl mx-auto bg-white border border-[#E8EEF5] rounded-[24px] shadow-xs overflow-hidden text-left">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-[#081C3A] text-white">
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Treatment
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase bg-[#F0FDFA] text-[#0D9488] border-b border-teal-200 relative">
                          <span className="relative z-10">Starting Price</span>
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Best For
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Single Sitting Root Canal
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Quick pulpal pain relief with laser disinfection
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Endodontic Specialist RCT (MDS)
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Highly complex root canals, curved or calcified roots
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Laser-Assisted Root Canal
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Ultimate sterile disinfection for enhanced success rates
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="max-w-2xl mx-auto text-center space-y-6">
                <p className="text-xs sm:text-sm text-slate-500 font-sans italic">
                  Your final treatment plan and cost will be determined after a clinical examination and diagnostic treatment planning.
                </p>
                <div>
                  <button
                    onClick={() => openAppointmentModal('Single Sitting Root Canal - Cost Consultation')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#0D9488] hover:to-[#0F766E] text-white font-sans font-bold text-sm sm:text-base rounded-full shadow-[0_10px_25px_-5px_rgba(13,148,136,0.3)] hover:shadow-[0_20px_35px_-5px_rgba(13,148,136,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Calendar className="h-4.5 w-4.5" />
                    <span>Get Your Custom Root Canal Plan &amp; Cost</span>
                  </button>
                </div>
              </div>
            </div>
          );

          const rootCanalTimelineSection = (
            <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-12 mt-8 sm:mt-12 lg:mt-16 text-center" id="rct-service-timeline">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Your Single Sitting Root Canal Timeline
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  Completed in a single continuous appointment of 45-60 minutes. Here is what happens from start to finish.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              {/* Connected Timeline Steps */}
              <div className="max-w-6xl mx-auto relative px-4">
                {/* Desktop horizontal connection line */}
                <div className="hidden lg:block absolute top-[40px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-teal-500/20 via-teal-500 to-teal-500/20 z-0" />
                
                {/* Mobile vertical connection line */}
                <div className="lg:hidden absolute left-[50%] -translate-x-[50%] top-10 bottom-10 w-[2px] bg-gradient-to-b from-teal-500/20 via-teal-500 to-teal-500/20 z-0" />
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">1</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Digital Diagnostics &amp; RVG
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        High-resolution digital X-rays (RVG) are taken immediately to map the root curvature and determine the depth of infection.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">2</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Painless Numbing &amp; Isolation
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        Computer-controlled anesthesia is applied for complete pain block, followed by a sterile rubber dam sheet to isolate the tooth.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">3</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Disinfection &amp; Laser Cleaning
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        Micro-endodontic rotary files clean the canal. Advanced laser/ultrasonic irrigation kills 99.9% of bacteria.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-teal-500 border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-white">4</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        3D Hermetic Sealing
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        The sterile canals are filled with biocompatible Gutta-Percha and sealed permanently, ready for a protective crown if needed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

          const rootCanalWarrantyPolicySection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center" id="rct-service-warranty-policy">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="text-[#0D9488] font-sans font-extrabold text-xs tracking-wider uppercase">
                  PEACE OF MIND
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Warranty, Policy &amp; Second Opinion
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  We provide complete transparency, specialized clinical expertise, and robust guarantees to ensure your treatment is safe and long-lasting.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
                {/* Card 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  {/* Left accent line */}
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Dr. Vipul Patel's 100% Honest Clinical Guidance
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    If a tooth is too severely fractured or has a compromised bone structure where a root canal will fail, Dr. Patel will tell you honestly beforehand. We never perform treatments that are clinically unviable just to bill patients.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  {/* Left accent line */}
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Specialist Endodontist Led (MDS Guarantee)
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Highly complex root canals, calcified canals, and retreatments are managed by our resident endodontic specialists (MDS Root Canal Experts) using advanced digital apex locators and high-precision rotary systems.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  {/* Left accent line */}
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Complete Clinical Transparency &amp; X-Ray Verification
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    We take digital X-rays (RVG) before, during, and after your root canal treatment. You can see the fully cleaned and sealed canals on our screens yourself, giving you complete verification of clinical accuracy.
                  </p>
                </div>
              </div>
            </div>
          );

          const smileMakeoverSymptomSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-12 mt-8 sm:mt-12 lg:mt-16 text-center" id="smile-makeover-symptoms">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  Symptom Qualification
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Is Your Smile Holding You Back?
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  A smile makeover is fully customized. You may be an ideal candidate if you experience any of these common aesthetic concerns:
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch text-left">
                {/* Card 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Discolored or Stained Teeth
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Deep yellowing, fluorosis, or tetracycline stains that professional whitening cannot resolve.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Chipped or Fractured Edges
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Micro-fractures, worn-down edges, or uneven lengths from age, wear, or minor injury.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Gaps or Spacing Issues
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Diastemas or uneven spacing between teeth that you wish to close without orthodontics.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Slightly Crooked Teeth
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Mild overlapping or rotated teeth that can be cosmetically corrected using porcelain veneers.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Mismatched Old Fillings
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Dark silver fillings or aged crown margins that show a dark metal line near the gums.
                  </p>
                </div>

                {/* Card 6 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Uneven or Gummy Smile
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Excessive gum display or uneven tooth heights that make your smile look unbalanced.
                  </p>
                </div>
              </div>
            </div>
          );

          const smileMakeoverRouteComparisonSection = (
            <div className="bg-white border border-slate-200/80 rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-12 mt-8 sm:mt-12 lg:mt-16 text-center" id="smile-makeover-route-comparison">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  TREATMENT OPTIONS
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Different Problems Need Different Treatments
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  Every smile concern is different. The right smile makeover treatment depends on your teeth, bite, gum condition, facial aesthetics, and the result you want to achieve.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[24px] shadow-xs overflow-hidden text-left">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[750px]">
                    <thead>
                      <tr className="bg-[#081C3A] text-white">
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Concern
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase bg-[#0D9488] text-white border-b border-teal-600 relative">
                          <span className="relative z-10">Recommended Treatment</span>
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Best For
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-medium text-sm text-[#475569]">
                          Minor chips, small gaps, uneven edges, minor shape corrections
                        </td>
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Composite Bonding
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Quick, minimally invasive cosmetic corrections
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-medium text-sm text-[#475569]">
                          Tooth colour and brightness concerns with otherwise satisfactory tooth shape and alignment
                        </td>
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Teeth Whitening
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Improving overall tooth brightness
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-medium text-sm text-[#475569]">
                          Tooth shape, colour, proportion and visible cosmetic imperfections
                        </td>
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Porcelain Veneers
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Comprehensive aesthetic smile enhancement
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-medium text-sm text-[#475569]">
                          Misaligned, crowded or unevenly positioned teeth
                        </td>
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Aligners / Braces + Whitening
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Improving alignment first, followed by smile brightening where appropriate
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-medium text-sm text-[#475569]">
                          Major tooth damage, missing teeth or complex full-mouth concerns
                        </td>
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Crowns / Full Mouth Rehabilitation
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Restoring function, structure and overall smile aesthetics
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-medium text-sm text-[#475569]">
                          Uneven or excessive gum display affecting smile proportions
                        </td>
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Laser Gum Contouring
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Improving gum symmetry and smile balance
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

          const smileMakeoverPricingSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center" id="smile-makeover-pricing">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  Transparent Pricing
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Transparent Cosmetic Treatment Pricing
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  We believe in clear, upfront pricing without surprises. Below is a breakdown of our high-quality cosmetic restoration options.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-4xl mx-auto bg-white border border-[#E8EEF5] rounded-[24px] shadow-xs overflow-hidden text-left">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-[#081C3A] text-white">
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Treatment
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase bg-[#F0FDFA] text-[#0D9488] border-b border-teal-200 relative">
                          <span className="relative z-10">Starting Price</span>
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Best For
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Porcelain Veneers (E-Max / IPS Empress)
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Ultra-durable, premium, natural-looking smile transformations
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Composite Bonding (Direct Veneers)
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Same-day cosmetic repairs, minor chips, and quick spacing fixes
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Premium Zirconia Crowns
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Strong, aesthetic tooth restoration for heavily damaged teeth
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Laser Teeth Whitening (In-Office)
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Safe, rapid brightness improvement in a single comfortable sitting
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="max-w-2xl mx-auto text-center space-y-6">
                <p className="text-xs sm:text-sm text-slate-500 font-sans italic">
                  Your final treatment plan and cost will be determined after a clinical examination and diagnostic treatment planning.
                </p>
                <div>
                  <button
                    onClick={() => openAppointmentModal('Smile Makeover - Price Consultation')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#0D9488] hover:to-[#0F766E] text-white font-sans font-bold text-sm sm:text-base rounded-full shadow-[0_10px_25px_-5px_rgba(13,148,136,0.3)] hover:shadow-[0_20px_35px_-5px_rgba(13,148,136,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Calendar className="h-4.5 w-4.5" />
                    <span>Get Your Custom Smile Plan &amp; Cost</span>
                  </button>
                </div>
              </div>
            </div>
          );

          const smileMakeoverTimelineSection = (
            <div className="bg-white border border-slate-200/80 rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-12 mt-8 sm:mt-12 lg:mt-16 text-center" id="smile-makeover-timeline">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  Treatment Timeline
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Your Custom Smile Makeover Journey
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  A complete smile makeover is usually completed in just 2-3 visits over a span of 7-10 days. Here is what to expect at each stage.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              {/* Connected Timeline Steps */}
              <div className="max-w-6xl mx-auto relative px-4">
                {/* Desktop horizontal connection line */}
                <div className="hidden lg:block absolute top-[40px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-teal-500/20 via-teal-500 to-teal-500/20 z-0" />
                
                {/* Mobile vertical connection line */}
                <div className="lg:hidden absolute left-[50%] -translate-x-[50%] top-10 bottom-10 w-[2px] bg-gradient-to-b from-teal-500/20 via-teal-500 to-teal-500/20 z-0" />
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">1</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        3D Scanning &amp; Design
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        High-resolution 3D intraoral scans and face photos are captured. Dr. Vipul Patel designs your new smile on screen.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">2</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Mockup &amp; Test Drive
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        We place the temporary physical mockup in your mouth. You see, test, and approve the planned tooth shapes, lengths, and shades.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">3</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Gentle Preparation
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        For porcelain veneers, teeth are minimally shaped (often less than 0.5mm) and high-precision physical or digital impressions are captured.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-teal-500 border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-white">4</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Permanent Delivery
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        Your custom-fabricated E-Max porcelain veneers or crowns are carefully bonded to place. Your brand-new, confident smile is complete!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

          const smileMakeoverRiskReversalSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center" id="smile-makeover-reassurance">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  Risk Reversal
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Cosmetic Quality Reassurance &amp; Policies
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  We combine advanced manufacturing precision, elite dental materials, and complete patient control to ensure you love your final result.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
                {/* Card 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    100% Patient Approval Before Cementation
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Your custom veneers or crowns are first placed temporarily. We check color, fit, and appearance in natural light. We only cement them permanently once you look in the mirror and give your 100% enthusiastic approval.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    IPS E-Max Material Warranties
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    We use only genuine, premium-grade European and American dental materials from authorized laboratories. Every porcelain veneer and crown comes with an official warranty card with a unique serial number, ensuring authentic durability.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Conservative Clinical Shaving Approach
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    We believe in preserving as much natural tooth structure as possible. We use ultra-thin cosmetic veneers that require minimal or zero tooth shaving, protecting your teeth's long-term health while achieving your dream smile.
                  </p>
                </div>
              </div>
            </div>
          );

          const smileMakeoverWhyPatelSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 animate-fade-in" id="smile-makeover-why-patel-dental">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  WHY PATEL DENTAL
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  A Smile Designed for You  -  Not from a Template
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  A smile makeover is not one fixed treatment. The right approach depends on your teeth, bite, gums, facial features and the result you want to achieve.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
                {/* Card 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Personalised Smile Planning
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Every treatment plan is based on your individual smile concerns and the result you want to achieve.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Digital Preview Before Treatment
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Your proposed smile can be planned and reviewed digitally before irreversible clinical treatment begins.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Designed Around Facial Aesthetics
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Smile proportions should be considered in relation to facial features, lip line and overall appearance rather than using a one-size-fits-all design.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Multiple Treatment Options
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Composite bonding, whitening, veneers, aligners, crowns, rehabilitation or gum contouring may be considered depending on the clinical situation.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    You Can Discuss and Adjust the Plan
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    The proposed direction should be discussed before treatment begins so the patient understands the available options and can make an informed decision.
                  </p>
                </div>

                {/* Card 6 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Comprehensive Care When Needed
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Where a smile concern involves more than one dental issue, the treatment plan can combine appropriate procedures instead of forcing every case into one solution.
                  </p>
                </div>
              </div>
            </div>
          );

          const smileMakeoverFaqs = [
            {
              question: "Will my new smile look fake?",
              answer: "The goal is not to copy a standard smile template. Smile planning considers factors such as facial proportions, lip line, tooth shape, shade and the overall appearance you want to achieve. The design stage allows the proposed direction to be reviewed before treatment proceeds."
            },
            {
              question: "Can I see what my smile may look like before treatment?",
              answer: "Yes. Digital Smile Design can be used to create a proposed smile preview before treatment begins. Depending on the treatment plan, a physical mock-up may also be considered so you can better understand the proposed result before irreversible treatment steps."
            },
            {
              question: "Will I need veneers for a smile makeover?",
              answer: "Not necessarily. A smile makeover may involve one treatment or a combination of treatments such as composite bonding, teeth whitening, veneers, aligners, crowns, gum contouring or other appropriate procedures. The right option depends on your teeth and treatment goals."
            },
            {
              question: "Will a smile makeover damage my natural teeth?",
              answer: "The effect on natural tooth structure depends on the treatment selected. Different options have different clinical requirements. Your dentist should explain the proposed procedure and any tooth preparation required before treatment begins."
            },
            {
              question: "How long does a smile makeover take?",
              answer: "Treatment time depends on the procedures involved. Some cosmetic improvements may be completed quickly, while cases involving multiple treatments, alignment correction or more extensive rehabilitation can take longer. Your treatment plan will outline the expected sequence and timeline."
            },
            {
              question: "Can I change the proposed smile design before treatment?",
              answer: "The planning stage is intended to help you review and discuss the proposed direction before clinical treatment begins. You can discuss changes and available options with the dental team before proceeding."
            },
            {
              question: "How much does a smile makeover cost?",
              answer: "The cost depends on the treatments included in your individual plan. A smile makeover may involve one procedure or a combination of procedures. Contact Us for Pricing and a treatment-specific estimate after assessment."
            },
            {
              question: "Is a smile makeover only for severely damaged teeth?",
              answer: "No. Patients may seek smile improvement for concerns such as tooth colour, chips, gaps, uneven shape, old restorations, gum display, alignment or a combination of cosmetic and functional concerns."
            }
          ];

          const smileMakeoverFaqSection = (
            <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in" id="smile-makeover-faq">
              {/* FAQPage JSON-LD Schema */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": smileMakeoverFaqs.map(faq => ({
                      "@type": "Question",
                      "name": faq.question,
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                      }
                    }))
                  })
                }}
              />

              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  <HelpCircle className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                  Smile Makeover FAQs
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Smile Makeover FAQs
                </h2>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-[1100px] mx-auto space-y-4 text-left">
                {smileMakeoverFaqs.map((faq, idx) => {
                  const isExpanded = expandedDentalFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isExpanded
                          ? 'border-[#0D9488] shadow-sm'
                          : 'border-slate-200/80 hover:border-slate-300 shadow-3xs'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedDentalFaqIdx(isExpanded ? null : idx)}
                        aria-expanded={isExpanded}
                        className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-slate-50/40 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
                      >
                        <span className={`font-sans font-bold text-base sm:text-lg leading-snug pr-4 transition-colors duration-200 ${
                          isExpanded ? 'text-[#0D9488]' : 'text-[#081C3A]'
                        }`}>
                          {faq.question}
                        </span>
                        <span className={`p-1.5 rounded-lg shrink-0 transition-all duration-300 ${
                          isExpanded ? 'bg-teal-50 text-[#0D9488] rotate-180' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <ChevronDown className="h-4.5 w-4.5" />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-6 pb-6 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/80 bg-slate-50/20">
                              <p className="font-medium font-sans whitespace-pre-line">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );

          const smileMakeoverClosingCtaSection = (
            <div className="pt-6 sm:pt-14 border-t border-slate-200/60 animate-fade-in" id="smile-makeover-bottom-cta">
              <div className="relative overflow-hidden rounded-3xl py-8 px-5 sm:py-16 sm:px-12 max-w-7xl mx-auto border text-center flex flex-col items-center justify-center gap-4 sm:gap-6 border-slate-200/80 bg-gradient-to-br from-slate-900 via-[#081C3A] to-slate-900 text-white shadow-md">
                <div className="relative z-10 max-w-3xl space-y-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-teal-300 uppercase tracking-widest px-3.5 py-1 bg-teal-500/20 rounded-full border border-teal-400/30 font-sans">
                    <Sparkles className="h-3.5 w-3.5 text-teal-300 shrink-0" />
                    SEE YOUR SMILE BEFORE YOU DECIDE
                  </span>
                  <h2 className="font-sans font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                    Start with Your Smile Photo  -  See What's Possible
                  </h2>
                  <p className="text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto text-slate-200 font-sans">
                    Send us a photo of your smile on WhatsApp to begin discussing your concerns and explore whether a Digital Smile Design preview and personalised treatment plan may be suitable for you.
                  </p>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto min-w-[280px] sm:min-w-0 justify-center items-stretch sm:items-center mt-2">
                  <a
                    href={getGlobalWhatsAppUrl("Hello Patel Dental Hospital, I would like to send a photo of my smile on WhatsApp and start my Digital Smile Design journey.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer active:scale-98 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 whitespace-nowrap"
                  >
                    <MessageCircle className="h-4.5 w-4.5 shrink-0" />
                    <span>SEND A SMILE PHOTO ON WHATSAPP</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => openAppointmentModal("Smile Makeover - Book DSD Assessment")}
                    className="px-8 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer active:scale-98 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50"
                  >
                    <Calendar className="h-4.5 w-4.5 shrink-0" />
                    <span>BOOK A DIGITAL SMILE DESIGN ASSESSMENT</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          );

          const crownsBridgesSymptomSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-12 mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in" id="crowns-bridges-symptoms">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  Symptom Qualification
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Could a Crown or Bridge Be the Right Solution?
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  Restore both form and function. If you experience any of these situations, a crown or bridge can protect and renew your teeth:
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch text-left">
                {/* Concern 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Damaged or Weakened Tooth
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    A tooth is badly damaged or weakened, requiring structural reinforcement to prevent fracture.
                  </p>
                </div>

                {/* Concern 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Large Old Fillings
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    A tooth has a large old filling that is breaking down and may need additional protective coverage.
                  </p>
                </div>

                {/* Concern 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Post-Root Canal Protection
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    The tooth has been treated with Root Canal Treatment and requires a suitable restoration to protect it from chewing forces.
                  </p>
                </div>

                {/* Concern 4 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Cracked or Worn Teeth
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    The tooth is cracked, chipped or significantly worn down, causing sensitivity or functional issues.
                  </p>
                </div>

                {/* Concern 5 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Damaged Existing Crown
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    An existing crown is damaged, uncomfortable, loose or no longer aesthetically suitable.
                  </p>
                </div>

                {/* Concern 6 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Missing Teeth &amp; Gap Issues
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    One or more teeth are missing, causing neighboring teeth to shift, affecting chewing, or creating difficulty eating.
                  </p>
                </div>
              </div>
            </div>
          );

          const crownsBridgesComparisonSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 animate-fade-in" id="crowns-bridges-comparison">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  MATERIAL COMPARISON
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Zirconia vs PFM vs E-Max: Which Is Right for You?
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  The right crown material depends on where the tooth is located, how much strength is required, your aesthetic expectations and the specific clinical situation.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[24px] shadow-xs overflow-hidden text-left">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[750px]">
                    <thead>
                      <tr className="bg-[#081C3A] text-white">
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          FACTOR
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase bg-[#0D9488] text-white border-b border-teal-600 relative">
                          <span className="relative z-10">Zirconia</span>
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          PFM (Porcelain Fused to Metal)
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          E-Max (Lithium Disilicate)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Strength
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Extremely High (Up to 1200+ MPa)
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          High (due to internal metal alloy)
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Moderate to High (Around 400-500 MPa)
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Natural Appearance
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Excellent tooth-colored integration
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Good, but dark metal edge can show at gums
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Exceptional lifelike translucency
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Best Suited For
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Back teeth, bridges, &amp; high-stress areas
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Back teeth, selective posterior cases
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Front teeth, highly visible aesthetic zones
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Front / Back Tooth Suitability
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Highly suitable for both front &amp; back
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Most suitable for back teeth
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Ideally suited for front teeth
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Metal-Free Construction
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Yes (100% Metal-free &amp; Bio-inert)
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          No (uses inner metal alloy structure)
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Yes (100% Metal-free glass-ceramic)
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Light Transmission / Translucency
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Natural light transmission
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Opaque (metal core completely blocks light)
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Premium glass-like light transmission
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Long-Term Functional Suitability
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Excellent wear &amp; fracture resistance
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Durable, but outer porcelain can chip
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Highly durable for anterior load forces
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Aesthetic Suitability
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          High aesthetic integration
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Standard tooth color match
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Ultimate lifelike aesthetic integration
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

          const crownsBridgesPricingSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in" id="crowns-bridges-pricing">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  TRANSPARENT PRICING
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Crowns &amp; Bridges Pricing Structure
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center font-sans">
                  The treatment cost depends on several individual factors including the crown material selected, whether it is a single crown or multi-unit bridge, the number of teeth involved, existing tooth condition, whether additional treatment is required before final restoration, and clinical complexity.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-4xl mx-auto bg-white border border-[#E8EEF5] rounded-[24px] shadow-xs overflow-hidden text-left">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-[#081C3A] text-white">
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Treatment Category
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase bg-[#F0FDFA] text-[#0D9488] border-b border-teal-200 relative">
                          <span className="relative z-10">Starting Cost</span>
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Best Suited For
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Single Tooth Crown
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Protecting a single damaged or root canal-treated tooth
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Zirconia Crown
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          High-strength, aesthetic, metal-free posterior or anterior restorations
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          PFM Crown
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Strong structural back tooth restoration in selective cases
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          E-Max Crown
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Premium lifelike anterior aesthetic restoration
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Dental Bridge
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Replacing one or more missing teeth utilizing adjacent teeth
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Multi-Unit Restoration
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Full arches or extensive multi-tooth restorative cases
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="max-w-2xl mx-auto text-center space-y-6">
                <p className="text-xs sm:text-sm text-slate-500 font-sans italic">
                  Your final treatment plan and cost will be determined after a clinical examination and treatment planning.
                </p>
                <div>
                  <button
                    onClick={() => openAppointmentModal('Crowns & Bridges - Cost Consultation')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#0D9488] hover:to-[#0F766E] text-white font-sans font-bold text-sm sm:text-base rounded-full shadow-[0_10px_25px_-5px_rgba(13,148,136,0.3)] hover:shadow-[0_20px_35px_-5px_rgba(13,148,136,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Calendar className="h-4.5 w-4.5" />
                    <span>Get a Personalized Treatment Plan</span>
                  </button>
                </div>
              </div>
            </div>
          );

          const crownsBridgesTimelineSection = (
            <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-12 mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in" id="crowns-bridges-timeline">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  TREATMENT JOURNEY
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Your Crowns &amp; Bridges Treatment Journey
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center font-sans">
                  Each crown or bridge restoration is planned meticulously through a step-by-step clinical process to ensure exact fit, bite, and long-term comfort.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              {/* Connected Timeline Steps */}
              <div className="max-w-6xl mx-auto relative px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">1</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Consultation &amp; Tooth Assessment
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium font-sans">
                        Assess the damaged or missing tooth, bite, supporting teeth and restoration requirements.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">2</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Treatment Planning &amp; Material Selection
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium font-sans">
                        Discuss the suitable restoration type and material based on function, location and aesthetic goals.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">3</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Tooth Preparation or Digital Impression
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium font-sans">
                        Prepare the tooth where required and capture the necessary impression or digital scan for the final restoration.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">4</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Temporary Restoration Where Required
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium font-sans">
                        Provide a temporary restoration when clinically appropriate while the final crown or bridge is being prepared. Duration: <span className="text-[#0D9488] font-bold">Contact Us for Details</span>
                      </p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">5</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Final Crown / Bridge Placement
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium font-sans">
                        Check fit, bite, comfort and appearance before final placement.
                      </p>
                    </div>
                  </div>

                  {/* Step 6 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-teal-500 border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-white">6</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Final Bite &amp; Comfort Review
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium font-sans">
                        Review the restoration and provide appropriate aftercare guidance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

          const crownsBridgesRiskReversalSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in" id="crowns-bridges-reassurance">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  WARRANTY &amp; REASSURANCE
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Confidence in Your Crown or Bridge Choice
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center font-sans">
                  We reduce patient hesitation by ensuring every stage of your crown or bridge treatment is fully explained, customized, and verified for clinical accuracy.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
                {/* Point 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Material Choice Explained
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    The differences between available crown materials are discussed in detail so that you fully understand the reasons and benefits of the recommended option for your specific bite.
                  </p>
                </div>

                {/* Point 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Planning Before Placement
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    The restoration is meticulously planned according to your individual tooth size, bite, chewing function, and natural cosmetic alignment requirements.
                  </p>
                </div>

                {/* Point 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Fit and Bite Verification
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Comfort, jaw alignment, bite pressures, and overall aesthetic fit are carefully checked and verified in your mouth before final crown or bridge bonding.
                  </p>
                </div>

                {/* Point 4 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full md:col-span-1 lg:col-span-1">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Material Authenticity
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    We provide appropriate information and documentation regarding the authenticity and quality of the custom-milled materials used for your dental restoration.
                  </p>
                </div>

                {/* Point 5 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full md:col-span-1 lg:col-span-1">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Aftercare &amp; Maintenance Support
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    You receive personalized guidance on daily hygiene care and long-term crown maintenance, as well as access to follow-up check-ups.
                  </p>
                </div>
              </div>
            </div>
          );

          const pediatricDentistrySymptomSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-12 mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in" id="pediatric-symptoms">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  Parent Guide &amp; Symptoms
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  When Should You Bring Your Child to the Dentist?
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center font-sans">
                  Early dental care prevents pain and protects permanent teeth. If you notice any of these signs, a gentle pediatric consultation can help:
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch text-left">
                {/* Card 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Dental Pain &amp; Sensitivity
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Your child complains of toothache, sensitivity while eating sweets or drinking cold liquids, or avoids chewing on one side.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Visible Decay &amp; Brown Spots
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    You notice brown spots, visible cavities, dark discoloration, or chalky white patches on your child&apos;s milk teeth.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Difficulty Chewing or Eating
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Your child refuses firm foods, takes unusually long to chew meals, or expresses discomfort during dinner times.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Chipped, Broken, or Loose Teeth
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    A tooth is damaged from a playground fall or sports injury, or a milk tooth feels loose prematurely before normal shedding age.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Swelling, Bleeding, or Gum Irritation
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Gums appear red or swollen, bleed during regular brushing, or there is a small gum boil indicating an underlying infection.
                  </p>
                </div>

                {/* Card 6 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Oral Habits &amp; Development Signs
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Prolonged thumb sucking, pacifier use, mouth breathing, tongue thrusting, or crowded incoming teeth affecting jaw development.
                  </p>
                </div>
              </div>
            </div>
          );

          const pediatricDentistryServicesSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-12 mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in" id="pediatric-services">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  SPECIALIZED PEDIATRIC CARE
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Specialized Treatments for Growing Smiles
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center font-sans">
                  Tailored, gentle treatments designed to protect developing teeth, treat cavities early, and support healthy oral growth.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto items-stretch text-left">
                {/* Treatment 1: Pulpectomy */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <div className="flex items-center gap-2 mb-2 pl-2">
                    <span className="text-[11px] font-black tracking-wider text-[#0D9488] uppercase bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100/60 font-sans">
                      Root Canal for Milk Teeth
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-[#081C3A] text-xl sm:text-2xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Pulpectomy
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 mb-4 font-sans">
                    A gentle, child-safe procedure to clear deep decay and infection from the root of an infected milk tooth. It eliminates pain, clears infection, and preserves the natural tooth until normal shedding - preventing premature spacing loss for permanent teeth.
                  </p>
                  <div className="pl-2 border-t border-slate-100 pt-3 space-y-1.5 font-sans">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                      <span>Relieves severe toothache and infection</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                      <span>Preserves natural spacing for permanent teeth</span>
                    </div>
                  </div>
                </div>

                {/* Treatment 2: Fluoride Treatment */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <div className="flex items-center gap-2 mb-2 pl-2">
                    <span className="text-[11px] font-black tracking-wider text-[#0D9488] uppercase bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100/60 font-sans">
                      Preventive Enamel Defense
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-[#081C3A] text-xl sm:text-2xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Fluoride Treatment
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 mb-4 font-sans">
                    A quick, painless application of professional fluoride varnish that coats developing teeth. It actively strengthens mineral enamel against bacterial acids, remineralizes weak spots, and drastically lowers the risk of future cavities.
                  </p>
                  <div className="pl-2 border-t border-slate-100 pt-3 space-y-1.5 font-sans">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                      <span>Completely non-invasive &amp; painless</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                      <span>Fortifies enamel against acid &amp; decay</span>
                    </div>
                  </div>
                </div>

                {/* Treatment 3: Dental Sealants */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <div className="flex items-center gap-2 mb-2 pl-2">
                    <span className="text-[11px] font-black tracking-wider text-[#0D9488] uppercase bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100/60 font-sans">
                      Cavity Shield for Molars
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-[#081C3A] text-xl sm:text-2xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Dental Sealants
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 mb-4 font-sans">
                    A protective, tooth-colored resin coating applied over the deep pits and fissures of chewing molars. Sealants create a smooth surface that prevents food particles and bacteria from accumulating in hard-to-clean grooves.
                  </p>
                  <div className="pl-2 border-t border-slate-100 pt-3 space-y-1.5 font-sans">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                      <span>Smooth protective barrier over chewing surfaces</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                      <span>Protects vulnerable newly erupted molars</span>
                    </div>
                  </div>
                </div>

                {/* Treatment 4: Habit Breaking / Habit Correction */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <div className="flex items-center gap-2 mb-2 pl-2">
                    <span className="text-[11px] font-black tracking-wider text-[#0D9488] uppercase bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100/60 font-sans">
                      Growth &amp; Alignment Guidance
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-[#081C3A] text-xl sm:text-2xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Habit Breaking / Habit Correction
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 mb-4 font-sans">
                    Custom-made, gentle oral appliances and positive behavioral guidance designed to safely stop chronic habits like thumb sucking, tongue thrusting, or mouth breathing before they alter jaw growth and bite alignment.
                  </p>
                  <div className="pl-2 border-t border-slate-100 pt-3 space-y-1.5 font-sans">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                      <span>Guides proper jaw development and tooth alignment</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Check className="h-3.5 w-3.5 text-[#0D9488] shrink-0 stroke-[2.5]" />
                      <span>Prevents complex future orthodontic problems</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

          const pediatricDentistryPricingSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in" id="pediatric-pricing">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  Transparent Pricing
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Pediatric Dentistry Fee &amp; Treatment Guide
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center font-sans">
                  We believe in transparent, upfront fee guidance for parents. The exact treatment required depends on your child&apos;s age, oral health, and diagnostic assessment.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-4xl mx-auto bg-white border border-[#E8EEF5] rounded-[24px] shadow-xs overflow-hidden text-left">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-[#081C3A] text-white">
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Treatment / Procedure
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase bg-[#F0FDFA] text-[#0D9488] border-b border-teal-200 relative">
                          <span className="relative z-10">Starting Price</span>
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Best For / Key Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Pediatric Consultation &amp; First Visit
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Detail
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Gentle oral examination, cavity risk assessment &amp; parent preventive guidance
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Pulpectomy (Milk Tooth Root Canal)
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Deep decay or infected milk tooth requiring pain relief &amp; preservation
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Fluoride Treatment (Full Mouth)
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Strengthening enamel &amp; comprehensive preventive cavity protection
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Dental Sealants (Per Tooth)
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Protecting deep chewing grooves on newly erupted permanent molars
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Habit Breaking Appliance
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Correcting chronic thumb sucking, tongue thrusting, or mouth breathing habits
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="max-w-2xl mx-auto text-center space-y-6">
                <p className="text-xs sm:text-sm text-slate-500 font-sans italic">
                  Your child&apos;s final treatment plan and exact fee details will be clearly explained after a gentle clinical examination.
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => openAppointmentModal("Pediatric Dentistry - Book Your Child's First Visit  -  Free")}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#0D9488] hover:to-[#0F766E] text-white font-sans font-bold text-sm sm:text-base rounded-full shadow-[0_10px_25px_-5px_rgba(13,148,136,0.3)] hover:shadow-[0_20px_35px_-5px_rgba(13,148,136,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Calendar className="h-4.5 w-4.5" />
                    <span>Book Your Child&apos;s First Visit  -  Free</span>
                  </button>
                </div>
              </div>
            </div>
          );

          const pediatricDentistryTimelineSection = (
            <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-12 mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in" id="pediatric-timeline">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  TREATMENT JOURNEY
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Your Child&apos;s Comfortable Dental Journey
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center font-sans">
                  We make every dental visit engaging, calm, and positive so your child builds lifelong dental confidence without fear.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              {/* Connected Timeline Steps */}
              <div className="max-w-6xl mx-auto relative px-4">
                {/* Desktop horizontal connection line */}
                <div className="hidden lg:block absolute top-[40px] left-[12%] right-[12%] h-[2px] bg-teal-200 z-0" />
                
                {/* Mobile vertical connection line */}
                <div className="lg:hidden absolute left-[50%] -translate-x-[50%] top-10 bottom-10 w-[2px] bg-teal-200 z-0" />
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-[#0D9488] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">1</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Gentle First Welcome
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium font-sans">
                        A warm, unhurried introduction to the clinic team and dental room to help your child feel safe and comfortable.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-[#0D9488] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">2</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Painless Check-Up
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium font-sans">
                        A gentle count of your child&apos;s teeth and a visual screening, with low-dose digital imaging only if necessary.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-[#0D9488] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">3</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Comfort-Focused Care
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium font-sans">
                        Painless, gentle treatment carried out with calming child-friendly communication and comfort checks.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-[#0D9488] border-2 border-[#0D9488] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-white">4</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Guidance &amp; Positive Reward
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium font-sans">
                        Home care tips and preventive advice for parents, plus a congratulatory reward to celebrate your child&apos;s brave visit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

          const pediatricDentistryRiskReversalSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in" id="pediatric-reassurance">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  CARE &amp; REASSURANCE
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Fear-Free &amp; Caring Dentistry for Every Child
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center font-sans">
                  We know bringing a child to the dentist requires trust. Here is how we ensure a calm, safe, and positive experience for both child and parent:
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
                {/* Point 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Patience &amp; Gentle Communication
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    We use &apos;Tell-Show-Do&apos; techniques and kid-friendly explanations so your child understands each step beforehand and feels safe and in control.
                  </p>
                </div>

                {/* Point 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Child-Safe Clinical Standards
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    All instruments, treatment materials, and digital X-rays are calibrated specifically for pediatric dental safety and minimal radiation exposure.
                  </p>
                </div>

                {/* Point 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Parent Presence &amp; Transparency
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Parents are encouraged to stay close during consultations and visits. Every treatment step and fee estimate is explained openly before starting.
                  </p>
                </div>

                {/* Point 4 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full md:col-span-1 lg:col-span-1">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Comfort &amp; Distraction Techniques
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    From gentle touch and positive reinforcement to calming engagement, we prioritize your child&apos;s emotional comfort throughout the visit.
                  </p>
                </div>

                {/* Point 5 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full md:col-span-1 lg:col-span-1">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Preventive &amp; Conservative Focus
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Our focus is on saving natural milk teeth and preventing future cavities through minimally invasive care and parent hygiene guidance.
                  </p>
                </div>
              </div>
            </div>
          );

          const crownsBridgesWhyPatelSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 animate-fade-in" id="crowns-bridges-why-patel-dental">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  WHY PATEL DENTAL
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Why Choose Patel Dental Hospital for Your Crown or Bridge?
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  A high-quality crown or bridge depends on expert planning, material selection, and precision fitting. Here is how we ensure comfortable chewing and natural aesthetics.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
                {/* Card 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Patient-Specific Material Selection
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    We never recommend materials based on generic rules. We help you understand whether Zirconia, PFM, or IPS E-Max is actually suitable for your tooth, matching the restoration type to your clinical and aesthetic expectations.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Optimized for Tooth Location &amp; Bite
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Whether you need maximum strength for back chewing molars (high-strength Zirconia/PFM) or ultimate natural transparency for front visible teeth (IPS E-Max), we choose the material based on your specific chewing forces and dental position.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Precision Fit &amp; Bite Verification
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    A crown that is too high or poorly aligned can cause jaw joint pain or fracture over time. We meticulously evaluate your bite pressure, contact points, and chewing movement before final placement to ensure long-term comfort.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Natural Shade Matching
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    We use advanced shade-matching keys to ensure the final crown or bridge blends seamlessly with your surrounding natural teeth, matching both color depth and translucency under different lighting conditions.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Functional and Aesthetic Harmony
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Our planning focuses equally on appearance and functional longevity. We analyze your jaw movements to design restorations that look like natural teeth and support comfortable chewing.
                  </p>
                </div>

                {/* Card 6 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Objective Treatment Guidance
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    We provide clear clinical reasoning to help you understand whether a single crown, a dental bridge, or a dental implant is the most suitable, conservative option to restore your teeth.
                  </p>
                </div>
              </div>
            </div>
          );

          const crownsBridgesFaqs = [
            {
              question: "Which crown material is right for me: Zirconia, PFM or E-Max?",
              answer: "The right choice depends on the tooth's location and function. High-strength monolithic Zirconia is exceptionally durable and ideal for rear teeth that bear heavy chewing forces. IPS E-Max offers superior lifelike translucency, making it perfect for highly visible front teeth. PFM (Porcelain-Fused-to-Metal) provides a balanced combination of strength and reasonable cost, often used for back teeth."
            },
            {
              question: "Why does Zirconia usually cost differently from PFM?",
              answer: "Zirconia crowns are milled from solid blocks of zirconium dioxide using advanced CAD/CAM technology, which provides exceptional strength, precise digital fit, and no dark metal edges. PFM crowns contain a metal alloy core with layered porcelain, which requires manual ceramic layering and may show a dark line at the gumline over time."
            },
            {
              question: "Is E-Max suitable for every tooth?",
              answer: "While IPS E-Max offers unmatched aesthetic beauty and is ideal for front teeth, it is generally not recommended for back chewing molars or long-span bridges because it has lower flexural strength than Zirconia or metal alloys. We evaluate your bite forces to suggest the safest material for your tooth."
            },
            {
              question: "How do I know whether I need a crown or a bridge?",
              answer: "A dental crown is used to cover and protect a single damaged, cracked, or root-canal-treated tooth that still has its natural root. A dental bridge is used to replace one or more completely missing teeth by anchoring false teeth to the healthy teeth adjacent to the gap."
            },
            {
              question: "Will my crown or bridge look natural?",
              answer: "Yes. Modern ceramic materials such as Zirconia and E-Max mimic the light-reflecting qualities, translucency, and surface texture of natural tooth enamel. Combined with professional shade selection, your restoration is designed to blend smoothly into your smile."
            },
            {
              question: "How is the shade of the crown matched to my surrounding teeth?",
              answer: "We use professional dental shade guides to measure the hue, value, and chroma of your neighboring natural teeth. This information is sent to the dental laboratory to ensure the custom restoration matches the specific shade variations of your smile."
            },
            {
              question: "How long does the Crown or Bridge treatment process take?",
              answer: "Contact Us for Details"
            },
            {
              question: "Will my bite and comfort be checked before final placement?",
              answer: "Yes. Before cementing any crown or bridge, we perform a thorough try-in to evaluate the fit, contour, jaw alignment, and bite contacts. We make microscopic adjustments to ensure you can chew naturally and comfortably without high-spot pressures."
            },
            {
              question: "How should I care for my Crown or Bridge?",
              answer: "You should clean your crown or bridge just like natural teeth. Brush twice daily with a non-abrasive toothpaste, floss around your crown, and use a specialized bridge threader or interdental brush to clean underneath a dental bridge. Avoid chewing extremely hard foods like ice or hard candy to prevent ceramic chipping."
            },
            {
              question: "Can an old crown or bridge be replaced?",
              answer: "Yes. If your existing crown or bridge has worn down, developed decay at the margin, cracked, or has an unsightly dark line at the gums, we can carefully remove the old restoration, treat any underlying decay, and replace it with a modern, metal-free Zirconia or ceramic crown."
            }
          ];

          const crownsBridgesFaqSection = (
            <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in" id="crowns-bridges-faq">
              {/* FAQPage JSON-LD Schema */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": crownsBridgesFaqs.map(faq => ({
                      "@type": "Question",
                      "name": faq.question,
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                      }
                    }))
                  })
                }}
              />

              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  <HelpCircle className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                  Crowns &amp; Bridges FAQs
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Crowns &amp; Bridges Frequently Asked Questions
                </h2>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-[1100px] mx-auto space-y-4 text-left">
                {crownsBridgesFaqs.map((faq, idx) => {
                  const isExpanded = expandedDentalFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isExpanded
                          ? 'border-[#0D9488] shadow-sm'
                          : 'border-slate-200/80 hover:border-slate-300 shadow-3xs'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedDentalFaqIdx(isExpanded ? null : idx)}
                        aria-expanded={isExpanded}
                        className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-slate-50/40 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
                      >
                        <span className={`font-sans font-bold text-base sm:text-lg leading-snug pr-4 transition-colors duration-200 ${
                          isExpanded ? 'text-[#0D9488]' : 'text-[#081C3A]'
                        }`}>
                          {faq.question}
                        </span>
                        <span className={`p-1.5 rounded-lg shrink-0 transition-all duration-300 ${
                          isExpanded ? 'bg-teal-50 text-[#0D9488] rotate-180' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <ChevronDown className="h-4.5 w-4.5" />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-6 pb-6 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/80 bg-slate-50/20">
                              <p className="font-medium font-sans whitespace-pre-line">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );

          const pediatricFaqs = [
            {
              question: "When should my child first visit a dentist?",
              answer: "The recommended age for a child's first dental visit is by their first birthday (age 1) or within 6 months after their first baby tooth emerges. Early visits allow us to check normal development, spot early risk factors before cavities start, and guide parents on proper infant feeding and oral care."
            },
            {
              question: "How often should children have dental check-ups?",
              answer: "Children should generally visit the dentist every 6 months for routine cleanings and examinations. Regular visits help detect early enamel weakening before cavities progress, monitor jaw development, and reinforce positive, fear-free dental habits."
            },
            {
              question: "What if my child is afraid of the dentist?",
              answer: "Dental fear is common, and our team uses gentle, kid-friendly techniques such as 'Tell-Show-Do' to explain everything in a fun, non-threatening manner. We never rush treatments, encourage parents to stay close, and maintain a comforting, positive atmosphere so your child feels completely safe."
            },
            {
              question: "Are dental X-rays safe for children when required?",
              answer: "Yes. We only take dental X-rays when clinically necessary to inspect developing teeth or hidden interdental cavities. We use modern, ultra-low-dose digital sensors and protective child lead aprons to ensure the highest safety standards with minimal radiation exposure."
            },
            {
              question: "What are dental sealants and fluoride treatment?",
              answer: "Fluoride treatment is a quick, painless varnish applied to all teeth to remineralize and strengthen enamel against bacterial acids. Dental sealants are thin, protective resin coatings bonded into the deep chewing grooves of back molars to prevent food particles and bacteria from getting trapped."
            },
            {
              question: "What happens if a baby tooth has severe decay or infection?",
              answer: "If decay reaches the nerve of a baby tooth, a gentle procedure called a Pulpectomy (milk tooth root canal) is performed to clear infection and relieve pain. Saving the milk tooth is vital because it preserves the natural spacing and guide path required for underlying permanent teeth to erupt correctly."
            },
            {
              question: "Can thumb sucking or other habits affect my child's teeth?",
              answer: "Prolonged thumb sucking, pacifier use, tongue thrusting, or chronic mouth breathing beyond age 3 to 4 can alter jaw growth and lead to open bites or misaligned teeth. We provide gentle habit-breaking appliances and positive guidance to help children safely transition away from these habits."
            },
            {
              question: "How can parents help prevent cavities in children?",
              answer: "Brush twice daily with a soft child toothbrush and age-appropriate fluoride toothpaste, supervise brushing until age 7-8, limit frequent sugary snacks and sticky juices (especially before bedtime), ensure adequate water intake, and maintain regular 6-month preventive dental check-ups."
            }
          ];

          const pediatricWhyPatelSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 animate-fade-in" id="pediatric-why-patel-dental">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  WHY PATEL DENTAL HOSPITAL
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Why Parents Trust Patel Dental for Their Children
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center font-sans">
                  We combine gentle, child-focused techniques with clear parent guidance to create positive, fear-free dental visits that set children up for a lifetime of healthy smiles.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
                {/* Card 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Gentle, Child-Friendly Approach
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Every visit is designed around your child's comfort. We introduce tools gently using reassuring 'Tell-Show-Do' techniques so children feel safe, relaxed, and in control.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Age-Adapted Care &amp; Communication
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    From toddlers to teenagers, we adapt our pace, explanations, and treatment methods to match each developmental stage, ensuring cooperative, stress-free care.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Preventive Focus &amp; Early Intervention
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    We emphasize proactive enamel defense with fluoride treatments and dental sealants, stopping tooth decay early before it can cause pain or require complex interventions.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Calm Atmosphere to Eliminate Fear
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Our team provides positive reinforcement, patient reassurance, and a welcoming clinic environment designed to turn dental visits into a pleasant, rewarding experience.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Parent Partnership &amp; Home Care Guidance
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    We welcome parents into the operatory and provide actionable advice on brushing techniques, dietary habits, and developmental milestones for confident at-home care.
                  </p>
                </div>

                {/* Card 6 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Preserving Natural Teeth &amp; Spacing
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    When cavities occur, we prioritize conservative techniques like pulpectomy to retain primary teeth until natural loss, protecting jaw growth and alignment for adult teeth.
                  </p>
                </div>
              </div>
            </div>
          );

          const pediatricFaqSection = (
            <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in" id="pediatric-faq">
              {/* FAQPage JSON-LD Schema */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": pediatricFaqs.map(faq => ({
                      "@type": "Question",
                      "name": faq.question,
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                      }
                    }))
                  })
                }}
              />

              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  <HelpCircle className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                  Pediatric Dentistry FAQs
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Pediatric Dentistry Frequently Asked Questions
                </h2>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-[1100px] mx-auto space-y-4 text-left">
                {pediatricFaqs.map((faq, idx) => {
                  const isExpanded = expandedDentalFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`border rounded-2xl transition-all duration-200 overflow-hidden ${isExpanded ? "border-[#0D9488]/40 bg-teal-50/20 shadow-xs" : "border-[#E8EEF5] bg-white hover:border-slate-300"}`}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedDentalFaqIdx(isExpanded ? null : idx)}
                        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors duration-150"
                        aria-expanded={isExpanded}
                      >
                        <span className="font-sans font-bold text-base sm:text-lg text-[#081C3A] leading-snug">
                          {faq.question}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${isExpanded ? "bg-[#0D9488] text-white rotate-180" : "bg-slate-100 text-slate-500"}`}>
                          <ChevronDown className="h-4 w-4 stroke-[2.5]" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-teal-100/60 mt-1">
                              <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium pt-3 font-sans">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );

          {/* ========================================== */}
          {/* TEETH WHITENING DEDICATED SECTIONS (PART 1) */}
          {/* ========================================== */}

          const teethWhiteningOccasionSection = (
            <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 animate-fade-in" id="whitening-occasion-hook">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  UPCOMING OCCASIONS &amp; EVENTS
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Have an Important Upcoming Event or Milestone?
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center font-sans">
                  When you need your smile to look its absolute best for a special deadline, in-clinic professional whitening provides a fast, safe, and noticeable transformation.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
                {/* Occasion 1 */}
                <div className="relative w-full bg-[#F8FAFC] border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Weddings &amp; Pre-Wedding Events
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Look vibrant and picture-perfect on your big day. In-clinic whitening helps ensure confident smiles across all close-up photographs and wedding celebrations.
                  </p>
                </div>

                {/* Occasion 2 */}
                <div className="relative w-full bg-[#F8FAFC] border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Interviews &amp; Career Presentations
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    First impressions matter in executive interviews and client pitches. A refreshed, clean smile enhances self-assurance and professional poise.
                  </p>
                </div>

                {/* Occasion 3 */}
                <div className="relative w-full bg-[#F8FAFC] border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Photoshoots &amp; Social Milestones
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Whether for portfolio headshots, anniversaries, or reunion gatherings, achieve a bright, natural smile ready for high-definition photography.
                  </p>
                </div>
              </div>
            </div>
          );

          const teethWhiteningComparisonSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in" id="whitening-comparison">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  TREATMENT COMPARISON
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Professional In-Clinic Whitening vs Other Options
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center font-sans">
                  Compare clinical in-chair whitening with home-based and over-the-counter options to understand differences in speed, safety, and supervision.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[24px] shadow-xs overflow-hidden text-left">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[750px]">
                    <thead>
                      <tr className="bg-[#081C3A] text-white">
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Comparison Factor
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase bg-[#0D9488] text-white border-b border-teal-600 relative">
                          <span className="relative z-10">In-Clinic Professional Whitening</span>
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Take-Home Custom Trays
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Over-The-Counter Kits
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Professional Supervision
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Direct dentist supervision throughout
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Dentist prescribed, used at home
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Unsupervised / self-administered
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Speed of Visible Result
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Immediate results in ~30 minutes
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Gradual results over 10-14 days
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Slow or unpredictable results
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Gum &amp; Enamel Protection
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Protective gum barrier applied by dentist
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Custom trays help minimize gel leak
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Generic trays may irritate gums
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Sensitivity Management
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Pre-treatment check &amp; desensitizing agent
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Adjustable application wear time
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          No individualized sensitivity control
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Individual Suitability Check
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Comprehensive dental assessment first
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Evaluated by dentist before tray fabrication
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          No pre-treatment dental check
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

          const teethWhiteningPricingSection = (
            <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in" id="whitening-pricing">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  TRANSPARENT PRICING
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Teeth Whitening Treatment Options &amp; Fee Guide
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center font-sans">
                  We provide transparent, upfront guidance on treatment approaches. The recommended whitening method depends on your timeline, current shade, and oral health.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-4xl mx-auto bg-[#F8FAFC] border border-[#E8EEF5] rounded-[24px] shadow-xs overflow-hidden text-left">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-[#081C3A] text-white">
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Whitening Option
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase bg-[#F0FDFA] text-[#0D9488] border-b border-teal-200 relative">
                          <span className="relative z-10">Fee Guidance</span>
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Key Characteristics
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          In-Clinic 30-Minute Whitening
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Fast in-chair session with light-activation and gum barrier protection
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Take-Home Custom Tray Whitening
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Custom-fitted trays with professional-grade bleaching gel for gradual home use
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Combination In-Clinic + Take-Home Care
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Immediate in-clinic shade boost followed by touch-up home maintenance
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Pre-Whitening Smile &amp; Enamel Assessment
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Detail
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Clinical shade recording, cavity check, and sensitivity evaluation
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

          const teethWhiteningTimelineSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-12 mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in" id="whitening-timeline">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  TREATMENT JOURNEY
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Your 5-Step Teeth Whitening Journey
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center font-sans">
                  A structured, comfortable clinical process designed for maximum safety, comfort, and noticeable brightness.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              {/* Connected Timeline Steps */}
              <div className="max-w-6xl mx-auto relative px-4">
                {/* Desktop horizontal connection line */}
                <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-teal-200 z-0" />
                
                {/* Mobile vertical connection line */}
                <div className="lg:hidden absolute left-[50%] -translate-x-[50%] top-10 bottom-10 w-[2px] bg-teal-200 z-0" />
                
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-[#0D9488] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">1</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-base text-[#081C3A] leading-tight">
                        Smile Assessment
                      </h3>
                      <p className="text-[#475569] text-xs leading-relaxed max-w-xs mx-auto font-medium font-sans">
                        Clinical shade recording and evaluation of teeth and gums to determine individual whitening suitability.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-[#0D9488] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">2</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-base text-[#081C3A] leading-tight">
                        Whitening Preparation
                      </h3>
                      <p className="text-[#475569] text-xs leading-relaxed max-w-xs mx-auto font-medium font-sans">
                        Gentle surface polish and precise application of protective barrier to safeguard lips and gum tissues.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-[#0D9488] border-2 border-[#0D9488] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-white">3</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-base text-[#081C3A] leading-tight">
                        30-Min In-Clinic Care
                      </h3>
                      <p className="text-[#475569] text-xs leading-relaxed max-w-xs mx-auto font-medium font-sans">
                        Professional whitening gel applied under dentist supervision during a focused ~30 minute procedure.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-[#0D9488] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">4</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-base text-[#081C3A] leading-tight">
                        Immediate Review
                      </h3>
                      <p className="text-[#475569] text-xs leading-relaxed max-w-xs mx-auto font-medium font-sans">
                        Rinse, protective barrier removal, and immediate before-and-after shade comparison for visible evaluation.
                      </p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-[#0D9488] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">5</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-base text-[#081C3A] leading-tight">
                        Post-Care Guidance
                      </h3>
                      <p className="text-[#475569] text-xs leading-relaxed max-w-xs mx-auto font-medium font-sans">
                        Personalized dietary advice (avoiding heavy staining foods for 48 hrs) and home care tips for long-lasting results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

          const teethWhiteningRiskReversalSection = (
            <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in" id="whitening-reassurance">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  SAFETY &amp; REASSURANCE
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Safe, Supervised &amp; Enamel-Conscious Whitening
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center font-sans">
                  We ensure your whitening treatment is medically sound, comfortable, and tailored to your dental health without compromising enamel.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
                {/* Reassurance 1 */}
                <div className="relative w-full bg-[#F8FAFC] border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Professional Assessment First
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    We examine your teeth and gums before recommending treatment, ensuring you are a suitable candidate and that underlying cavities or gum issues are identified.
                  </p>
                </div>

                {/* Reassurance 2 */}
                <div className="relative w-full bg-[#F8FAFC] border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Enamel-Conscious Approach
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Our clinical whitening agents are formulated for dental safety, targeting internal and external stains without eroding or damaging the protective enamel layer.
                  </p>
                </div>

                {/* Reassurance 3 */}
                <div className="relative w-full bg-[#F8FAFC] border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Sensitivity Consideration
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    We discuss sensitivity history in advance, use calibrated exposure times, and apply soothing desensitizing agents to ensure a comfortable patient experience.
                  </p>
                </div>

                {/* Reassurance 4 */}
                <div className="relative w-full bg-[#F8FAFC] border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Personalised Treatment Guidance
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    We set clear, realistic expectations based on your tooth structure, existing fillings, and lifestyle factors to achieve a naturally bright outcome.
                  </p>
                </div>

                {/* Reassurance 5 */}
                <div className="relative w-full bg-[#F8FAFC] border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full md:col-span-2 lg:col-span-2">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Post-Treatment Care Support
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    You will receive clear post-procedure oral hygiene instructions and diet recommendations to help maintain your brighter smile over the long term.
                  </p>
                </div>
              </div>
            </div>
          );

          const whiteningFaqs = [
            {
              question: "Is professional teeth whitening safe?",
              answer: "Yes. When performed by a qualified dental professional, in-clinic teeth whitening is a well-established and safe cosmetic procedure. The gums and lips are carefully protected with isolation barriers, and professional-grade gels are applied under continuous clinical supervision to safeguard your enamel and oral tissues."
            },
            {
              question: "Will teeth whitening damage my enamel?",
              answer: "No. Professional in-clinic whitening does not remove or erode your enamel. The active whitening agents work by penetrating micro-pores in the tooth structure to break down internal and external stain molecules without altering the structural integrity or mineral strength of the tooth enamel."
            },
            {
              question: "Can teeth whitening cause sensitivity?",
              answer: "Some patients may experience mild, temporary tooth sensitivity during or within 24-48 hours after treatment. At Patel Dental Hospital, we evaluate your sensitivity history beforehand and apply clinical desensitizing agents to ensure your experience remains as comfortable as possible."
            },
            {
              question: "How long can teeth whitening results last?",
              answer: "Results typically last from several months up to a year or longer, depending on your dietary habits and oral hygiene. Regular brushing, routine cleanings, and limiting heavy stain-causing substances like tobacco, tea, coffee, and dark spices help prolong your brighter shade."
            },
            {
              question: "What foods and drinks should I avoid after teeth whitening?",
              answer: "For the first 48 hours following your whitening session - when teeth are most susceptible to new pigment absorption - it is best to avoid deeply pigmented foods and drinks such as tea, coffee, red wine, turmeric-rich gravies, soy sauce, and tobacco products."
            },
            {
              question: "Is professional teeth whitening suitable for everyone?",
              answer: "Professional whitening is suitable for most adults with healthy teeth and gums. However, it is not recommended for individuals with untreated cavities, active gum disease, or severe intrinsic staining from certain medications. A preliminary dental assessment determines if whitening is appropriate for you."
            },
            {
              question: "Will whitening change the colour of crowns, veneers or fillings?",
              answer: "No. Whitening agents only act on natural tooth enamel and do not change the color of existing dental materials such as porcelain crowns, composite fillings, or veneers. If you have visible restorations, our dentists will guide you on how to achieve a harmonious, unified smile."
            },
            {
              question: "How can I help maintain my teeth whitening results?",
              answer: "Maintaining your brighter smile is easy with good oral hygiene practices: brush twice daily with a non-abrasive fluoride toothpaste, floss regularly, schedule bi-annual professional cleanings, and consider dentist-prescribed touch-up trays for periodic maintenance before major occasions."
            },
            {
              question: "Can I have teeth whitening if I already have sensitive teeth?",
              answer: "Yes, in many cases. Our dentists will evaluate the underlying cause of your sensitivity (such as gum recession or enamel wear) and can customize the procedure with lower-concentration gels, shorter activation times, and pre- and post-treatment desensitizing protocols."
            }
          ];

          const teethWhiteningWhyPatelSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 animate-fade-in" id="whitening-why-patel-dental">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  WHY PATEL DENTAL
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Why Choose Patel Dental Hospital for Teeth Whitening?
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center font-sans">
                  A safe, natural-looking brighter smile requires accurate dental evaluation, protective barrier isolation, and calibrated clinical care. Here is how we ensure your comfort and results.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
                {/* Card 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Comprehensive Pre-Assessment
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    We examine your enamel health, existing restorations, and gum condition before starting to ensure professional whitening is suitable and completely safe for your teeth.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Dentist-Supervised 30-Min Session
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    Every step is performed directly by experienced dental professionals with continuous monitoring, ensuring optimal gel activation and prompt shade improvement.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Complete Gum &amp; Soft Tissue Isolation
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    We apply specialized clinical isolation barriers over your gums and lips, preventing bleach irritation and keeping the whitening focused purely on tooth enamel.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Personalised Sensitivity Protocols
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    We calibrate application times and apply clinical desensitizing solutions before and after the procedure to ensure a comfortable and relaxing patient experience.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Transparent Advice on Restorations
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    We provide honest guidance regarding existing composite fillings, veneers, or crowns so you have realistic, clear expectations for overall smile harmony.
                  </p>
                </div>

                {/* Card 6 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2">
                    Personalised Maintenance &amp; Aftercare
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2 font-sans">
                    We equip you with specific dietary guidelines and oral hygiene recommendations to protect your new brightness and help you maintain results for upcoming events.
                  </p>
                </div>
              </div>
            </div>
          );

          const teethWhiteningFaqSection = (
            <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in" id="whitening-faq">
              {/* FAQPage JSON-LD Schema */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": whiteningFaqs.map(faq => ({
                      "@type": "Question",
                      "name": faq.question,
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                      }
                    }))
                  })
                }}
              />

              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  <HelpCircle className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                  Teeth Whitening FAQs
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Frequently Asked Questions About Teeth Whitening
                </h2>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-[1100px] mx-auto space-y-4 text-left">
                {whiteningFaqs.map((faq, idx) => {
                  const isExpanded = expandedDentalFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`border rounded-2xl transition-all duration-200 overflow-hidden ${isExpanded ? "border-[#0D9488]/40 bg-teal-50/20 shadow-xs" : "border-[#E8EEF5] bg-white hover:border-slate-300"}`}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedDentalFaqIdx(isExpanded ? null : idx)}
                        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors duration-150"
                        aria-expanded={isExpanded}
                      >
                        <span className="font-sans font-bold text-base sm:text-lg text-[#081C3A] leading-snug">
                          {faq.question}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${isExpanded ? "bg-[#0D9488] text-white rotate-180" : "bg-slate-100 text-slate-500"}`}>
                          <ChevronDown className="h-4 w-4 stroke-[2.5]" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-teal-100/60 mt-1">
                              <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium pt-3 font-sans">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );

          const teethWhiteningClosingCtaSection = (
            <div className="pt-6 sm:pt-14 border-t border-slate-200/60 animate-fade-in" id="whitening-bottom-cta">
              <div className="relative overflow-hidden rounded-3xl py-8 px-5 sm:py-16 sm:px-12 max-w-7xl mx-auto border text-center flex flex-col items-center justify-center gap-4 sm:gap-6 border-slate-200/80 bg-gradient-to-br from-slate-900 via-[#081C3A] to-slate-900 text-white shadow-md">
                <div className="relative z-10 max-w-3xl space-y-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-teal-300 uppercase tracking-widest px-3.5 py-1 bg-teal-500/20 rounded-full border border-teal-400/30 font-sans">
                    <Sparkles className="h-3.5 w-3.5 text-teal-300 shrink-0" />
                    READY FOR YOUR UPCOMING OCCASION?
                  </span>
                  <h2 className="font-sans font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                    Step Into Your Next Special Event with a Brighter, Whiter Smile
                  </h2>
                  <p className="text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto text-slate-200 font-sans">
                    Experience safe, in-clinic professional teeth whitening in just ~30 minutes under expert dental supervision in Rajkot.
                  </p>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto min-w-[280px] sm:min-w-0 justify-center items-stretch sm:items-center mt-2">
                  <button
                    type="button"
                    onClick={() => openAppointmentModal("Teeth Whitening - Book Your Teeth Whitening Appointment")}
                    className="px-8 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer active:scale-98 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50"
                  >
                    <Calendar className="h-4.5 w-4.5 shrink-0" />
                    <span>BOOK YOUR TEETH WHITENING APPOINTMENT</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </button>

                  <a
                    href={getGlobalWhatsAppUrl("Hello Patel Dental Hospital, I would like to book an in-clinic Teeth Whitening appointment before an upcoming event. Please share available slots.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer active:scale-98 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 whitespace-nowrap"
                  >
                    <MessageCircle className="h-4.5 w-4.5 shrink-0" />
                    <span>CHAT ON WHATSAPP FOR WHITENING</span>
                  </a>
                </div>
              </div>
            </div>
          );

          const comparisonSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16" id="service-comparison">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Dental Implants vs Other Tooth Replacement Options
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  Compare Dental Implants with other common tooth replacement options to understand the differences in stability, appearance, comfort, and long-term benefits.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[24px] shadow-xs overflow-hidden text-left">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[750px]">
                    <thead>
                      <tr className="bg-[#081C3A] text-white">
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Feature
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase bg-[#0D9488] text-white border-b border-teal-600 relative">
                          <span className="relative z-10">Dental Implants</span>
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Dental Bridge
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Removable Dentures
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Stability
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Fixed securely in the jaw
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Fixed to adjacent teeth
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Can move while eating or speaking
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Appearance
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Natural-looking
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Natural appearance
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Can look less natural over time
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Comfort
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Feels closest to natural teeth
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Generally comfortable
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          May feel bulky or uncomfortable
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Impact on Nearby Teeth
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Does not affect adjacent teeth
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Requires support from adjacent teeth
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Does not require altering nearby teeth
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Long-Term Solution
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Designed for long-term function
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          May need replacement over time
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          May require adjustments or replacement
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4.5 font-sans font-bold text-sm text-[#081C3A]">
                          Jawbone Support
                        </td>
                        <td className="px-6 py-4.5 font-sans font-semibold text-sm text-[#0D9488] bg-teal-50/30">
                          Helps support the jawbone
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Does not support the jawbone
                        </td>
                        <td className="px-6 py-4.5 font-sans text-sm text-[#475569]">
                          Does not prevent jawbone loss
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

          const costSection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center" id="service-cost">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Dental Implant Cost
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  The cost of dental implants depends on the number of missing teeth, type of implant treatment, bone condition, and whether additional procedures are required.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-4xl mx-auto bg-white border border-[#E8EEF5] rounded-[24px] shadow-xs overflow-hidden text-left">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-[#081C3A] text-white">
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Treatment
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase bg-[#F0FDFA] text-[#0D9488] border-b border-teal-200 relative">
                          <span className="relative z-10">Starting Price</span>
                        </th>
                        <th className="px-6 py-5 text-left font-sans font-black text-xs sm:text-sm tracking-wider uppercase border-b border-slate-200">
                          Best For
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Single Tooth Implant
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Replacing one missing tooth
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]/50 hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Multiple Teeth Implants
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Replacing multiple missing teeth
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#081C3A]">
                          Full Mouth Dental Implants
                        </td>
                        <td className="px-6 py-5 font-sans font-bold text-sm text-[#0D9488] bg-teal-50/30">
                          Contact Us for Pricing
                        </td>
                        <td className="px-6 py-5 font-sans text-sm text-[#475569]">
                          Full arch or complete teeth replacement
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="max-w-2xl mx-auto text-center space-y-6">
                <p className="text-xs sm:text-sm text-slate-500 font-sans italic">
                  Your final treatment plan and cost will be determined after a clinical examination and treatment planning.
                </p>
                <div>
                  <button
                    onClick={() => openAppointmentModal('Dental Implants - Cost Consultation')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#0D9488] hover:to-[#0F766E] text-white font-sans font-bold text-sm sm:text-base rounded-full shadow-[0_10px_25px_-5px_rgba(13,148,136,0.3)] hover:shadow-[0_20px_35px_-5px_rgba(13,148,136,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Calendar className="h-4.5 w-4.5" />
                    <span>Get a Personalized Treatment Plan</span>
                  </button>
                </div>
              </div>
            </div>
          );

          const timelineSection = (
            <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-12 mt-8 sm:mt-12 lg:mt-16 text-center" id="service-timeline">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Your Dental Implant Treatment Timeline
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  Your treatment timeline depends on your oral condition, treatment plan, and whether any additional procedures are required.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              {/* Connected Timeline Steps */}
              <div className="max-w-6xl mx-auto relative px-4">
                {/* Desktop horizontal connection line */}
                <div className="hidden lg:block absolute top-[40px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-teal-500/20 via-teal-500 to-teal-500/20 z-0" />
                
                {/* Mobile vertical connection line */}
                <div className="lg:hidden absolute left-[50%] -translate-x-[50%] top-10 bottom-10 w-[2px] bg-gradient-to-b from-teal-500/20 via-teal-500 to-teal-500/20 z-0" />
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">1</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Consultation & Assessment
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        Your teeth, gums, and jawbone are examined to determine the right implant treatment plan.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">2</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Implant Placement
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        The dental implant is carefully placed in the planned position.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-[#0D9488]">3</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Healing & Integration
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        The implant is given time to integrate with the jawbone for a stable foundation.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center space-y-4 relative group">
                    <div className="w-20 h-20 rounded-full bg-teal-500 border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="font-sans font-black text-2xl text-white">4</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                        Final Fixed Teeth
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                        Your custom final teeth are placed to restore function, comfort, and appearance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

          const warrantyPolicySection = (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center" id="service-warranty-policy">
              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Warranty, Policy & Second Opinion
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
                  We believe patients should feel confident and fully informed before making a treatment decision.
                </p>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
                {/* Card 1 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  {/* Left accent line */}
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Treatment Warranty & Support
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Get clear information about the support and warranty applicable to your dental implant treatment.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  {/* Left accent line */}
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Clear Treatment Policy
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Understand your treatment plan, recommendations, and important terms before starting treatment.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full">
                  {/* Left accent line */}
                  <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-4 leading-tight pl-2">
                    Need a Second Opinion?
                  </h3>
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
                    Already have a treatment plan? You can consult our dental team for another professional opinion.
                  </p>
                </div>
              </div>
            </div>
          );

          const dentalImplantsFaqs = [
            {
              question: "How long do dental implants last?",
              answer: "Dental implants are designed as a long-term tooth replacement option. With good oral hygiene, regular dental check-ups, and proper care, the implant itself can last for many years. The lifespan of the final crown or prosthetic teeth may vary depending on use and maintenance."
            },
            {
              question: "Is dental implant treatment painful?",
              answer: "Dental implant treatment is performed using appropriate local anaesthesia, so the procedure itself is generally comfortable. Some temporary soreness or swelling may occur after treatment, but this is usually manageable with the post-treatment instructions and medication recommended by the dentist."
            },
            {
              question: "How long does the dental implant treatment take?",
              answer: "The treatment timeline depends on your individual oral condition, the type of implant treatment required, bone condition, healing requirements, and whether any additional procedures are needed. After examination and treatment planning, the dental team can explain the expected timeline for your specific case."
            },
            {
              question: "Can I get fixed teeth immediately after dental implant placement?",
              answer: "In suitable cases, fixed teeth may be provided as part of an immediate or early loading treatment plan. However, this is not suitable for every patient. The decision depends on factors such as bone quality, implant stability, bite, oral health, and the overall treatment plan."
            },
            {
              question: "What if I do not have enough jawbone for dental implants?",
              answer: "Reduced jawbone does not automatically mean that dental implant treatment is impossible. Depending on your clinical condition, the dentist may recommend an appropriate treatment approach or additional procedures. A clinical examination and diagnostic evaluation are required before confirming the treatment plan."
            },
            {
              question: "Are dental implants better than removable dentures?",
              answer: "Dental implants can provide a more stable and fixed tooth replacement option for suitable patients. Unlike removable dentures, implant-supported teeth are designed to remain securely supported during normal daily activities. The most suitable option depends on your oral condition, treatment needs, and clinical evaluation."
            },
            {
              question: "How much do dental implants cost?",
              answer: "The cost depends on factors such as the number of missing teeth, type of implant treatment, type of final teeth, jawbone condition, and whether additional procedures are required. A personalised treatment plan and cost estimate can be provided after a clinical examination and treatment planning."
            },
            {
              question: "Who is a suitable candidate for dental implants?",
              answer: "Suitability for dental implants depends on your overall oral health, jawbone condition, gums, missing teeth, bite, and other clinical factors. The dentist will evaluate your condition and recommend whether dental implant treatment is an appropriate option for you."
            }
          ];

          const dentalImplantFaqSection = (
            <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center" id="service-implant-faq">
              {/* FAQ Schema */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": dentalImplantsFaqs.map(faq => ({
                      "@type": "Question",
                      "name": faq.question,
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                      }
                    }))
                  })
                }}
              />

              <div className="space-y-3 max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                  DENTAL IMPLANT FAQ
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                  Frequently Asked Questions About Dental Implants
                </h2>
                <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
              </div>

              <div className="max-w-[1100px] mx-auto space-y-4 text-left">
                {dentalImplantsFaqs.map((faq, idx) => {
                  const isExpanded = expandedDentalFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isExpanded
                          ? 'border-[#0D9488] shadow-sm'
                          : 'border-slate-200/80 hover:border-slate-300 shadow-3xs'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedDentalFaqIdx(isExpanded ? null : idx)}
                        aria-expanded={isExpanded}
                        className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-slate-50/40 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
                      >
                        <span className={`font-sans font-bold text-base sm:text-lg leading-snug pr-4 transition-colors duration-200 ${
                          isExpanded ? 'text-[#0D9488]' : 'text-[#081C3A]'
                        }`}>
                          {faq.question}
                        </span>
                        <span className={`p-1.5 rounded-lg shrink-0 transition-all duration-300 ${
                          isExpanded ? 'bg-teal-50 text-[#0D9488] rotate-180' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <ChevronDown className="h-4.5 w-4.5" />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-6 pb-6 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/80 bg-slate-50/20">
                              <p className="font-medium font-sans">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );

          const processElement = isDentalImplants ?x��}kW�Ȗ����L� s0��B��K$�!��3�2�D��X'��H2���߽w���TU�y59���4��]�����-�S�����=��u='�>8C�=׹h|��������/��=�����ͽ���/,�~���W56X4�56ٰ�k5Y4r��1����ݡ�F�����1��=�F��wc7��0��(�+�<̾ǯ�s���~��pF��d�����[�&uk���M`&�/�$�%��Xo�r��G�۟&?c~�R5߼X������܁	_��4����:t
�α�PW`��9z��>htW�~��xN�[:������6�x�u"��>��Ec��Rf�؁�s��_��ʠm�jilޅel�b�bG�G0f�)��y���mq<v0y�G젿��l���._�U��1	�Q\l7�Ё��
 ��U�ǁvn�+��v���Z�?V~� �I�?�<<�����u֛���j���0�"}������
_6����B̽�Lv'e2��Q�:>�a_ {|^m��B>�n����ؚ�8���u�'��8������Z{���܄��Kne��kPr��)�j���!��^o�lT��Kȁ)��!Asc���w$+6� !�i��t��[��̮;� l��6K�=������2P��%`��fx�}?���"�0���t{�t��Þ`'�&�u��/Z�N��P����ϰ�k��dC���"tz.��{�!V��7�#��z���b�a�a�\�����l�3?	��
q�C� �0�J"p�; ��:�� ��EP��qL�0`�����=__�x�̧���O��>6 ��/bE��率�Z��$��q�́i8�>\x7
�!t�z|�u|�p�������\�*-��F�S�l�'���ٞ0�=c����1��}ν�ADX��
�� ������z�s��tD�i������� ��,�������*D��V����{Br¾9�3t. ��?g'�S��A�^sv
ez?��a��ޔ�� g�xי1�or���'�p�u �vy�1���{�pO�1ܾ<�A�޸���{1��]���q�x�M�VR�.C�7�R�I�c�C%�����Q���{BqO(�Q�'!�P���C�y(ґ�����,X'���Bn��ȥ �^#y'9�!���=�>L�{�1.DP!N��^��zy
�y�n���V�xD�D������2}�8! �xzxnw�-�2݋l�-wQ�y�
�ɹ�dd�lo���E�={T$�e���|-{ܿ�u�;k.�W�p�z���7�!���ч���ݨ	pMp~Ϸ����x-�!'�j���M7z?7���	�-KHҲ0Z�9(�E����47j�� d?��e?W坨 �(vB�|�s'v�"�s	N��"��{���q�|��=��A>N�P��t��Sw�������]_.vc�o_㰖�o]1�Na%@����!�f�<�rs��ź��,�B��g����0�(f��G{� R���|�"�}���#Ʊ�����)�o�~b$+�����!�{dv2���f����������f�ïĬ)lV`V�̘�*=N�z�/�&�*?k��[�mV���Hl�ƀR���
g9Ūe,*G{$�`��'$�[�S�~<ր��?  x s��{6<vb�B�3TԀ�:���=�i`A����㙛Y�^�)�˺��L�3���mXy��.d1���U�
`2��O`t�ӛjq�F�Wޠ�+8��#E��["Q<_@}`j�3H��hi����d��w�/ܾ�f�-����������Q0��!�]'�Z���-j5S�m���תr�PQ��D#����k+�_T���{VM�T��C�k՗��B���Ea7Yx���q�֟���,��y`��?�_����/�.7S~|�������9�ͤ�Rw.��A矸�]\;�nUͫ9�u�`�lAכMS�!��0��bm��A#y��bP��9���uc��dTT�Ԯq��f��nU̱P1�|��\y�d����XC5�X`�&�����tAj&8���l�Y-���|�Z�s_��tS%l+�����ˑ}�2�Mz�z�v��%����u��	��^��G�	�I�R��X� �)���t����:��]>hD^5t��7��u�&�z]vF�y��;�;,P�1��{w#�|���VG'A�:�㉟����`L;�<�/���x|�C�(+����{�'�D�v�`�G;~�5V ��-]�|B���6����ġ���Q2�
�ʣ�$"8��'7�C2�9�<)Lov/ ����z4���@ p,��z��q<��VV&���&2���n0\�8qw��r��?���<?m��<�C�<���49�!�������ދ��O��+��b �y8]��F5��DH)q�Y�!��o���>��Xe~~��ra�}�U�L��誱�D���{Y<bp˰wÅ�+�{�X���ԑ�$��S��.�0�:`@ ��Gk0���<Gk��n�G0>`0���BP�B�~�&A�0Լ����.���Nr�qY�N���j�(
���u�c-s�Z*,ee���@�lcp��k��ԙ4��rr}�Z�И��f��L�>ʹ
�>���kh���j3Ry'$9a��!�\ �k���@�*D6���7�H,Mz�l1J����P'��@�83p���x�%��*1�ю�����&!餪6�*���)��A���=��j�� +�!�Ɔ�(%ś�DZ%���OQ�z�+��#��z�~9�7I�0�YA����sbg����![U�����T�N���ʋ/	 aA���pa��x޴3<��co��==	1��Tw�,���чy#���]9s��
H0������I��!t!\�
��N����$>�7��n8Ũ�BN�7v1
���������������-r��]`��F>�B��RM{��ؙڧ�N�+���q�[#_���qg�B�O�!hV��E��u��൞��!7DJ��\���
��������w�9
�h��u>qP��֗��3,�M����v��P�B�RSyՏ��r���.9����;4�%����h��[���Ƨ8��ڈ��9�D�K����6��A0�~s��)��g���
`�uB��p��V��K������p���/�H�����׼+n���Y�,L���4���y'�A��`	死.�R�RmN�J���P�s�G���G�*�h�Ї"|k��bkD$�P�G
*�@i,$��a��4*N9��v���p�s�dT��U
�a��7-�w�m�׋����������۩���R{si}���5F�d�N���қe���/޴�*l�V�e������(i�8Z��10�ʝ�U!�W5���}
A�Yٌ]�d`�@�����ә32��w	Syע��i5�M� �Z�D���F<FK{�Nei
�-m�H�k*8���u?�y�Cud7�n:P��r���w�
�-K=-���i�f�el��NS�xn�G�;|��Hh�1��h���BL���F��_啵�;�Z*�P�]E�$A�R�D��禥Ӏ�ʸu��2�Z�(5��=wɞ�4B�Gs}���j��ܠ߁�L��P�����-���5li�?���{Ն���k$K��'�;�$G���B#j�#q�qa��x:�A���ω3&Ea-��'��=�e̼�+L;C�n�r�ڸn�� +
��'��eb��R|m�J)n�a$'0�c %0r���~�Q�h
/�H�Oa�sS.g�x�v����}��"�����}�cR�&�38R����Wh�����ï��,� �:����?V���Zc��E�c��

�xn�H��Y闓sg)w�����^�+1�����|��Q�������%�)�U��Y����ȷU6���Sn?,�e�y2��5��,��Rc�w���g��g����n^�� ���v�zǽѮv�tߧK��� �s|
��0f��=+�������A|�@�9�\���Y��
&ݍ�� ��讌�?���=b��`oo��1͢�������M���^E��2Uj~��S%X"�egq�՜���Jkgh)�>θ�����a0�5��v�ql�u�HB$J��lQ�s!..<� v�B�ˌ`5��,Fޅ%?.r�(�g��q��c�mi��od��+�i$�z����F�|A}��xbĲ�N5V� �~k4�5u�Z�VE�����.Q�DCs��D!�W�lb/:����U�+뎺B}[�R���F+9���T�5�E��J�7 ��.�2?���T��_���qT �H��d�&�TIjgo�Iё��j��|���sL�M�v���8��f�[�xH;���a�Q6��j$s�.]��5H3��R�����#��j�y�q�FZU��+7��2�&�	���K�C���G��b�'|
���]q�TT�_`"�F1�X�v/�4�J9�p�H��l�(�"���k�l��CVs�ê�'+��rAI�=T����!]R�ީ�Q3ޮ�b�Җ�p�Rhd&�1�P���dۍ��J!�z����	}w�deV3 ��(��A���������ګ�٥��x ��:�膦�����%�;E������>��7*���*�ѐ�nw	 -����*�(@��9�/��^����ل����a9ƚ���.\�坎N�+��7��S�q�|��%�.�k&�a&@��*պ���.�$���n��Q���n?Z�/yw�Ԑ�H�-̵ţ�̫[pN�p�UN���M�<��Dr�#3�Fk���E��Fkuc}����ϟwW�w�/^!��1#������������6��y����<nu��/39���9Z���([md��*mꂀ�� ������Ȉ�<42DY�p���Z�.�*���m[�z��Z*������!������]�͚��#�d6�R3H����\��lg�$Ob���b&�����B{*Ƨ0��n�(���J�=�N>����J��d��l<�f(��;�����0&'t~r��*������V���8ϋ ��c*Hλ��Iw~��)n�Zm5p#a+ૉ��.-�O2�L�R 1
k�(�JSGq�g����j�-�����RKTQ~5���s�8I��3�bkA����E�YU,��f�@�;��B)���@o*稪�:
���dGE�9UW�9l�~�r�z�s��Ⱥtӭ�� ~Sn8)FE �>;q��-��Q �Kj��^��&��$��WN7�����2�u�%~�ܪ������t��a	�o@���{uy=��Lj�|#�,�F�3	,�7�yMٳQ�s8=�f_�����ع	��EC�Y�e��>�/�>�h�2��\�WT}�͟�����_~��y��	#;opQa�����D>��H�J楀6��+z�1�#��z��P��� ����v�v�f��_+��Ij����s-��U�g����^G��VFR.���5��6��Z>b�"��3F6$��Ci��H"%��#S����}�����9�$u�"�`�Dh0�0q]墎f�8Lۺ�;�r
��z����L��n�8q���L<`(�='����|�2�@,C��3�����Ս���h7_��<��Q�d��Q�\��mvl�#���$��>F��rũ�R��_Yao�
�hI,N�;�a��ȑ.��x/|�:�р�Z��ċΣj~�4%i��_�TQr��]�an�>�-�����M��F����V
����H�is+� ��FȘ�܄�H�@��ܔ6@�+@����[ਯ�����k|�������V2CI}��}�m�tlJ��
�v�%�k��UiÏ"&�9�0!��(Q���#*��>��|)x�]ʿLNb�uz�
��Rx-���2=�oEp/U���	�����d��|�R���n&�
��3]v#��]H��v��O[��N�<�n���;�����+7l��e����`�.Srw�^v��7iKk���hQ���ϓ�LCiP�\�a榐�fi\����St���@��*�*�*�F���������KZ6����?i��2J!���`Wu��&|��r՛��HՖ�:��1/����ۮ�	��tұf�M�X���6X����1��';a9ar�)ΡfP��1���Gk��$mD8��*��*O�	�!�%w����[�%[aGB������h���D��>p:G�t����0�諐�ح�^f�k�kf�uf�xf��I�ͺ��[�]0a�8;�!]hfK������P��(�Ңi	�m
q����)���U��2��gf@*�6�"^���DΫv���_Z�*Z�z�n�#
'�&���0�{g�>`�h�*�ʃ>�i�!�tk8h�fp�^5
��g�M�ML�Y]�<mY�4�k˒���{w`��<�}�<�$̐
V�_?INX9�G�V<���9 �G>��&s�$�4�
�O�j�۱I+�rBlGē�wt�a �%��	�[��ST��ʙq��x�ݲ���<�~Ox�	O><��Ag�9Ȣ��"���w�!1��y�%���H>D*�|�ĻO	��������apIEzb]�G�2W�P��|B�� e
��ao4e�1���N'����������<r���"�˽)��iM��3�?c��Й2��O��9G���G�/מ���|�_��m����ݱ#�����������E�eq|��1D���H�l>V�iB��j<����0���|�X�u��!`PUIs��u��8����~tM8�sn$�$7)�h�=a���pib\�> V�	,:�G���V�)�r��c*W�S���^X7j�k�d�.�g�Խ���X�j��o���
��,G��u���z�����}�i麋�T�Z��h��K�����ζ���VwU��U�����&I�;X�|��ٖ#R�ւ�\�49�����ǡ��=C�z��};A�:�Cs��-%�mu�T]֭���u6W����j�[�\�[/�&��lK;*5Pk}5դa��j�s�Z��.׻��2_϶�q��Q��DnT��ԅ�|�Z���Ro��un����,�`�
a�,�P�,��:K��/��8k<���x��k)PԯI6;��L��a��)�}����㦒m*�O*"*���ŏ��#��s(�C�s��U��O
�*��-�cn��*�?)�1�U�X�!�(��n�_'�_�P�+l^��a��v1���L��96W�^+SuQ~�ǻ���_*I'h�U�ա�j�AH,��%>�Me���r�����4�A��y�=t'B�@f���P·�UsH]�a�������R0��E'Ո���(~�Y}�ģ��K|�3�u���+!JW3�pbJ�z�t�R�
J��|n�4��(�a�l�GR�d�\�УktLӎ��qϗ� ��8����[�@�����ĽHOs�5�m�2�L�$:��e��u�D���h�x��pko�%��M%� ��ȃ�@K���9��� 1�C���/c���1�%@�d�	>GO������s��?�Z?vܰH��P��h�DJ�Fk�ܹ�l�lH�"�ҠA&y����=�����z}bMP'����b����y*N�Zb
-"�)���<`3O
CL��[��
@h�s���?)���A7��H�}E�tzK� ��R�9���K��6�4j�������D����!����'tP�m�0Vr0����Wa/��X0x�剖�I��ɍz��>��T�Y��f�gA��M���"��e����װ�<ʄ�ڍw�����pQ__�Y�q��+4���ٰ�TeɥD�q��f����:aރ�жzVw% <�+@����R�5��nV�"��C�>V�2竍�M��J����'Nr.��A��Ŗ�	��5�+b��hͷ��-�#�>������V[��ٞ�z���ފ<@U�\j��I{T���P�
�_�f����TM��U�q&�b�7�X�羋�V��GK���R�e�v ��Nn �vA}�V�/�B�� qrp�q�	�l_���$�P�E%L�C&�[�)��,�}�R'"E?��^�/�*)��mᾌ�itj���*�K
"ְB��.����o,z�E�x��a�`j���w�Dޔ�����S�&��T���j|����o1SX�d���U��&Ɯ�@�=�0x�3������ ���F�׬�A�������$@�:���gXļ�[��_J�/���� __PO5�몬��d�j�n�/�y�Q����i��2l�6*�B�x<T���0� R��FU���َ��x4�)�:I�� ���MSZpUq�ץ��)ㄷ>��1�Y���o�<cN-�j��)ӈ���ưH�f�1�ޥ͂�-��{2��r�;wPD]¸���E�r���1MSi����e��tyw�
�7���K��܀vqڊ;����A#�1ib_�ʌ���N���e�w�P����K��zƎ0�Tdӎ����0y����}�W�%���֪k>}˲�TyET���'�������<o��A��U�VY�BJ���٢\I_���~qtz��8�����|��94Y��yz���ڍ�4�lZ����|!�	2q��8Ӛ�� �p"��5u�;���k�#�M�2s@�=�E���*�5��BI�ۆ�t���孞�n�f�iʌ�ed�N�^�v8��W�p�Sq�c��j.vYßQ]�,�"���\b�@�6jD���T�NXS��|#�^r/C�ے*��ܒuc�?~��<<T,�+s;5	�^9�(C���(�]W�sF8�W$�z %	�Մ.����"��}��kr���9�aa�l��t���i�q`����@��}��Ez����e]J�����������ÿ�S�� �����@b(�������#�}�������|�����������#�uqY��-�|����ۗ�����d�Q�|n��jF�\J4���'���	����O�&�Ƚ99�"�B�:�V��ւ�����n�/6a��q�LIo��J������H�geݢɯ�n}L���P_�*�vxV��s:���󻸀�A�$���$<I���������㩩A�����'��Dݷ��${�2��]�T�|*�q
q�\��異���6S6{���2;�0�9�&�p�\�R��OYbyA-� gՉL�g��&j�����|�gK���H��ݑ����vG{�'	 V9�J���'����rp��޺��[�m���7��K�O���Y��Gt'ZG=A-������9199��t�=R���?~8�}��t�������ý���>������O�X����!R�eQT*� ޺��� �A]؂�W6��|���:%�J�0+��H�WgNM�|FK4�gl�(�2���PМ�V��ɻ�ՙ[U��nP]�l7vn��y�Z�D��K��R�ԅ4,Z�j-�q\g��-T,����,�e?(��
��Q�Ơ�M��g����D�C�}��l'��{�c�����#��ͻr���w�8��[
��a<���,n�l�g��+�Y�J��C��Z�C���1f��eZ8�d�
�a �pH�'
E��p$Ca�\
��e���u��Q�ͺ�x�$�jn�d����V�L���>y���d0�`��73y�)k�dwcg+����#�JK���WǱy6-���Ϛ�;+��
k�fe.�bH�K3)@�7����@-ϮY������V�;��le˳���.3�Z��4�5�p����X��iE-��t�Ց�#�m�0ca���ս��i��h�
��j�xR�gӀ��؍9S2��]I�2J��\!�,ᜄ�Tk�G��-�n�Wsv%�#lZ�BX��n�_aRJ�ފ��.�*�A���5��6�����h
k>��'E�j1MWa滕(�"4,�+v�:@|/h_��~�}���ʏů�L�Z�&ތ��q�o�H1�Y���LOHz��l�0�u�1��G�`�^��G��u\/F�ԌC�B�iՒ��5�����I��)sV�`�����\5�v�?h�`�G&�U�kPl�n�W��3fMm�VH~��>�~pz��p�����wr:W2����xx��}<{�N����>8<8�9;8� ʖ�
ν��p�s���|8c�GN?�UTS����#(��j���휽��s&볹ݓ�ONQWzr�����.n�x�������.��������2��Jk�Ƥص�7R�@�����Ѵ�oy,2�Ë �ڍ�W))^��1l�f��
������D�B(N`FS�Sܻy�&���ɸ,�,4z��	�\����	AZZ;����rN�ѕS�sa�H��3-%ہ���Uog��w.�
8{����A�j/L��ac/N�qlq!���TU�K3~[�A��us}��i|f��i��/���y-�G*��AӺ�(�Ԃ�ܙ�iv�X4vE���95p�����1�`�ߒ��B?��%p�l���V6ň�_�W���V��ǱM�	���� =��R6�a�����M7^Nv�����OҰ�K���7v#:_!!�H�ئ�0�����U3��؉�������/e���75�9����Գ�;1wzNj�)}TK��?es�� �����
�?ēN�4"�!���P�g�(�~��Xb�0��߬�Fi�
�ڝ�K�8}��ե�@I�&nG/f}�7�ڌ<qR#L(����Ǽy��I�ؤ�
�xEĽIDf�I2�L�k��$��H����:}no&	ċfQɐ�LCwX.'9���M댁O��;��#��b6������m�z���h�������[(�-�~��AC�܌k���>����B��q����4�;Pm�Z�43����(3�g9Ô�`�f|yK�M��U�7�Ư��76���Rλ�[�	�;���[�W�8V;9�zaz�{NxK�8ig���GG���8�x��r: 
de���
�@�
<y2=;�9��)_�ʥ�x�>�(�u#��N8UlI�y�-�1�	����n�^�۩�+�Z�����X��VJ��im��f�=��é)4q�h;�CA�.2*�0����:gވOP`�p6q����)M'a����Ve�	���>�7@9-*Ɏ85J ���s:��ֈ=���as.�
�ŊX���kG�lU��_�:��m�M,�oho��l�s��:6�V�q���v��������񱠰����񻣳�S]|��oD��j�����>������>;::{'�^��&z���-����.���=xwp����챝7���͗)<� ���]�4g?A'5H���l�OP�RRDIQ��@1��y����,	B�,r� �F�אI���
"؎bi9vsˁ�K#%)&��b��k~���f��0*�I����{�X���
�����K(\�^@�˦������'��|�;����'�Esgy�����9*���ҙSs�_J~����"T\TӤ�6�C�~ҷ3����271��HBGm�{6CR=^N
!����}QU�G�_�t��w�6G+��z�7����t��l��_� ����w�o_X�����g�w�!�K_�X�c�_�s��*J�����]���� 0p��f��z��E�0�`��o���D��� �b���y��b������;&]N���8�����f)��/ˮ��A77t�1��.��M�GkG#��k�����	�~�� J����
)�3�r�L�7w��@~�H1� ����K��;x�H��WZ�Oŉ�vg-Հ�2�;��(�'
��Asupǋ�ZL���l]��:��IJ冚*��\WA&
��κ-0q�x�pp��?���o��n
,�:���-h�$O�7�
kP��)?`��x�fnE�������m>�s��we�-qL�:��A�f��_�q�x^8�"-w	
 �^���9qy�Fl��Z�EDJ���_����*�;X� �����̕[3�ѭξN�*��5Q�K��R�6[X>5o��YU�����QO��D�s��	�$h�{M��௕���W�i��0+ѬQ����F���險�Ԣ�X�����y��JP�yy��ӥ�����	�)+�o�2┛G��\	����`�,�Tk�5��U�����7�@jo�܌�w��h��t� �P����s�ι$���u��j��ޅ�Q^}�IC��h
���К!&��ԅ6��/�|ǽ��b���$�ͩ4�{�0ܿ��0�3��g]Μ������>{,A���|��H��}a[�jXVx��zp��`�_~P���2��Z��w���%v/�.�е����-���l�	.�2�4���]�!�$�htLf��=J=����캦��c���B�VeG).E���i҄�Ң�J�Q\T��C��g�(kX����bHq)Y?����ӗ�/y��*,�ͻ3yj����S�N5y
����4@��lI��!��22>N�:��4�	V�Z��e�	h�^$zH��(!R�CQY��S�'I؁�ԍl�j�j�F��hTk��r��Q��BF%E�Ù;�p��	��I|�	�3Rg1������ G�VZ�	�C5�d�n�⊫h��� &��f��6�oV:���.4���
�G(�յ����_ò3-�#��G�3"M'��Rkz
�e�:�� ��U�e#�f�-];I�.�]u��=R�S[�Gt^i�U�9~��w0��`c�!�&���K� a����h��m��j�c�
�FIK7��S/O��`)QX��Е���`����(�
� �5�n�!��&<��y���Y�����9�S���r�p��@�f����@z��r�Q��lZ���q������l�E�8�����_XB���ɧ"��z���'������sA��$��?Z��ѽe���V5;�r%�f��Ų&g�n� ��z�L�0�<��Ҝ	�\�.́��ߣ�����-�h�L(��L3o��gKF�����/u�bO��k�=�j�5]�w���&
)�c\�2�é��'d�#�K�*���63~�U�D㨹
F��>~��c(��!�<����WL5��b������~Κ<�P^�n*��u���i���tk��ӛr\��pn��O�m6�԰2�u)��AB޺de���g��d��fdAk
;�Yf9GU�{��e�J��ج%��$����d�b!��d�#-�1�/k%e�T��������x�$��RN�$���̼\�i��N=��
&�#�g�dylBG3S'�̾2�i���LXdF�̥�Fj�U�!����%nd��xؚ�Y���'Y�Xx2�2f*BH]���U�Em懂�]P�ԼA�x���rW`p8����79a�xM��������*�W�}v�p�m�����-v�i~���Au��f�����hYa�*�ؼ=T�\�j�f��c'�y��dv`Cv�.�;�h1d�Bi{a�Hc�j��0iE�M!��\U'�|@����"�׾��_A[CN��V��[�k�"���)N1���w�f{��>b��-�я}��0r�N������cn��U�Ƴ��
�����e?�}��#I�G&��e�,̨���S`�T�� %�����l��=�qCB�������Em���A�'��T���q�ɑBڕCz�s����d�JB�y�2�i�L�'�DI6���߲L��.�(GDJORyY,�t�K�'��
��a��VsV�Lc�%B ٍ��GN�Y�޺^n��;���r����@6�V#�G���Uk0�&$�45ܐmT˒���|�����v�d��az�m�(=G�jl�ZZ�t �d���y�&p �;���~�&��v�{=QU>�8���P��tf������u�ARR&�Νi���c��ĉ3��E�C����BT�Ԁ�+�ٲ9s��:�^�&�f:�f�6w ���3:vu��v��	��x0�N�of-X�d(�*��P[q�Wj��z-���%v���[/���O?�
��ʋ�R�CgD�Fj�I�xA0tR}_:KNY|n�W�ڶ�E�������pp<�.�(9U������v��j��#�,t°���ꈁ����]Z>[&�B��z�È�7��Tu�3$p7-���;A��݆���8v$k����h6�e��bg�8[�©��K�&2�����Ӡ�1�ĦO��O)Y_arC�-�}Ԅ|�{-J����*�׭�{����^��;l;�M8�w�U����c��/���n�:��pu���E�[��~�J�Y��#f�]�^�C�<Lϭ?L���,��M��Ɠ��*eg���S�w���W)��k鸖���J�(Ḗ5i��f�l�7�q�q<��VV��N0z#�fs�Y��:Un�#�C&+���7��"Zo+�B������˔uF"�
�%hݗ�wG��Is������d
��k������E���>d��K y���Ad�ޣ �?�{�i\I��w�@VO\ �'�(@����#`��=
P��AX�(�2�,VO�����8&�=
x~���X�<�7��	�'^�3�vw���G� ��70��F��FG�})dc2�x�8�C>�D;(�GζN�N�!�T0���Y�̯%#��4[AXH0J��$b��WgAЎv��p['.�4�Tc����-�~cb��􌿴�b���h6�C�8�k�:��؂(�ɏm��u����ج��l�ؐ�gN��%yt�(Y�.(�˗�'<G �Y}��������r���������~�a��\G~Ak�O8��Y�T5�#�jH�n��$rl
[A��1��C����
E�>�sM�U�Wà O���]D˂nLQ�K(��d�h,�DWk|o�w��
w�V�pU�|��4�iIȧ$�H!����e*�R����a��7�_/�p-:�X�U�fan�Vr�;
�.a-`L� 9�э���OF���,��P���PW������$�r�@��X����Xw��iB(��52�$F�ة�$�t��H�P��Qp�	-z[�z�B>c6g��u+����(��؈<��,��eK��x'�b�[ؘ!,�{
��p�8-YWמl� 6���7�(`*
��:�-��)�r��D��b����H17����D<Y�|�_���C� ԑ���W���\��Ա����[�t�{��|�����5�N��{�,bxeƹ�cI�:��+�Ak�'�~ن@�)���
?(J{UV��w����o�����k-ĕ#s�Ξ	�ց�l 3�""���
�E˱���,z�"��1U���1��B����W�m 
�� 0=V��p���ƺ|
:c ����j�'SH�Kst���<,Ɇ�6�B'���d#A��/@D�Y"Gy1���_n�\7G�L.)E
H��(�Ɍ0S� ��.i	乳]^r�(��a���U1�*!k���m%4c�^l1�t�))Hi}�M������!��]��#Qj�sx6H��6h|~޼|�'/�GT��8Q��]�}�h5B�$���P��8	}�X�1��a%4�)@ʊ��mW@ጬ��a0',P���O��sh��$�tG2{s]ħڇK'Ae��vq�N8��42Sڊn�؟�$�`y�y��5�mp�^u*����]X���!D\���o�����?   �� F��A