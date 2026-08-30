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
  Cpu, Layers, Banknote, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Service, ServiceGalleryItem, ServiceFaq, ContactInfo, MarketingConfig } from '../types';
import { serviceService, DEFAULT_GREEN_HIGHLIGHT_LINE, DEFAULT_SERVICES } from '../utils/serviceData';
import { TREATMENTS } from '../data/treatments';
import { contactService, DEFAULT_CONTACT_INFO } from '../utils/contactData';
import { doctorService } from '../utils/doctorData';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { ClinicalCaseGallery } from '../components/ClinicalCaseGallery';
import { InstagramEmbed } from '../components/InstagramEmbed';
import { Mp4ReelPlayer } from '../components/Mp4ReelPlayer';
import { GooglePatientReviews } from '../components/GooglePatientReviews';
import { useSEO } from '../utils/seo';
const imgImplants = 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800';

function extractYouTubeId(url: string): string {
  if (!url) return '';
  const trimmedUrl = url.trim();
  
  try {
    // 1. Matches embed URLs like https://www.youtube.com/embed/VIDEO_ID
    if (trimmedUrl.includes('/embed/')) {
      const parts = trimmedUrl.split('/embed/');
      if (parts[1]) {
        const id = parts[1].split(/[?#&]/)[0];
        if (id.length === 11) return id;
      }
    }
    
    // 2. Matches short URLs like https://youtu.be/VIDEO_ID
    if (trimmedUrl.includes('youtu.be/')) {
      const parts = trimmedUrl.split('youtu.be/');
      if (parts[1]) {
        const id = parts[1].split(/[?#&]/)[0];
        if (id.length === 11) return id;
      }
    }

    // 3. Matches watch URLs like watch?v=VIDEO_ID or watch&v=VIDEO_ID
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

interface FeaturedTreatmentVideoProps {
  mConfig: MarketingConfig;
  serviceTitle: string;
  openAppointmentModal: (preselectedTreatment?: string) => void;
}

export const FeaturedTreatmentVideo: React.FC<FeaturedTreatmentVideoProps> = ({
  mConfig,
  serviceTitle,
  openAppointmentModal
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const defaultYtUrl = 'https://www.youtube.com/watch?v=SnOxxv_S2ew';
  const source = mConfig.featured_video_source || 'youtube';
  const youtubeUrl = (mConfig.featured_video_youtube_url || '').trim() || defaultYtUrl;
  const uploadUrl = (mConfig.featured_video_upload_url || '').trim();

  const hasVideo = source === 'youtube' ? !!youtubeUrl : !!uploadUrl;
  const isEnabled = mConfig.featured_video_enabled !== false;

  if (!isEnabled || !hasVideo) {
    return null;
  }

  const heading = mConfig.featured_video_heading || `Featured ${serviceTitle} Video`;
  const description = mConfig.featured_video_description || `Learn more about the advanced procedures and clinical excellence of ${serviceTitle} treatment at Patel Dental Hospital. Watch our expert walk-through of the process.`;
  const bullets = mConfig.featured_video_bullets && mConfig.featured_video_bullets.length > 0 
    ? mConfig.featured_video_bullets 
    : [
        'Advanced state-of-the-art procedure methods',
        'Minimally invasive and pain-free techniques',
        'Expert clinical execution and diagnostic precision'
      ];
  const ctaText = mConfig.featured_video_cta_text || 'Schedule A Consultation';
  const ctaLink = mConfig.featured_video_cta_link || '';

  const getYouTubeId = (url: string) => {
    return extractYouTubeId(url);
  };

  const buildYouTubeEmbedUrl = () => {
    const id = getYouTubeId(youtubeUrl);
    let embedUrl = `https://www.youtube.com/embed/${id}?rel=0`;
    
    // Always use autoplay=0, never autoplay=1
    embedUrl += '&autoplay=0';
    
    const loop = !!mConfig.featured_video_loop;
    if (loop) embedUrl += `&loop=1&playlist=${id}`;
    
    return embedUrl;
  };

  const getThumbnailUrl = () => {
    if (mConfig.featured_video_thumbnail_source === 'custom' && mConfig.featured_video_custom_thumbnail) {
      return mConfig.featured_video_custom_thumbnail;
    }
    if (source === 'youtube') {
      const ytId = getYouTubeId(youtubeUrl);
      if (ytId) {
        return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
      }
    }
    return '';
  };

  const [imgSrc, setImgSrc] = useState(getThumbnailUrl());

  useEffect(() => {
    setImgSrc(getThumbnailUrl());
  }, [
    mConfig.featured_video_thumbnail_source,
    mConfig.featured_video_custom_thumbnail,
    source,
    youtubeUrl
  ]);

  const handleImgError = () => {
    if (imgSrc && imgSrc.includes('maxresdefault.jpg')) {
      const ytId = getYouTubeId(youtubeUrl);
      if (ytId) {
        setImgSrc(`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`);
      }
    }
  };

  const handleCtaClick = () => {
    if (!ctaLink || ctaLink === '#appointment' || ctaLink === 'appointment') {
      openAppointmentModal(`${serviceTitle} - Featured Video CTA`);
    } else if (ctaLink.startsWith('http')) {
      window.open(ctaLink, '_blank', 'noopener,noreferrer');
    } else {
      if (ctaLink.startsWith('#')) {
        const id = ctaLink.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = ctaLink;
        }
      } else {
        window.location.href = ctaLink;
      }
    }
  };

  return (
    <div 
      className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-10 md:p-14 shadow-xs hover:shadow-sm transition-shadow duration-300 relative overflow-hidden" 
      id="featured-treatment-video-section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        
        {/* LEFT SIDE: Video Player (First in DOM so mobile/tablet is video first) */}
        <div className="w-full">
          <div className="relative aspect-video w-full bg-slate-900 rounded-2xl overflow-hidden shadow-md border border-slate-200/60 group">
            {isPlaying ? (
              source !== 'upload' ? (
                <iframe
                  src={buildYouTubeEmbedUrl()}
                  title={`${serviceTitle} Featured Video`}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={uploadUrl}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay={false}
                  loop={!!mConfig.featured_video_loop}
                />
              )
            ) : (
              <button 
                type="button"
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 w-full h-full cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50"
              >
                {/* Thumbnail Image / Poster */}
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={`${serviceTitle} Video Thumbnail`}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    onError={handleImgError}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  uploadUrl ? (
                    <video
                      src={uploadUrl}
                      className="w-full h-full object-cover"
                      preload="metadata"
                      muted
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#081C3A] to-[#0A264F] flex items-center justify-center">
                      <Video className="h-12 w-12 text-slate-400" />
                    </div>
                  )
                )}

                {/* Dark Overlay to increase play button contrast */}
                <div className="absolute inset-0 bg-slate-950/25 group-hover:bg-slate-950/35 transition-colors duration-300" />

                {/* Large Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 bg-white/95 text-[#0D9488] rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-8 w-8 sm:h-10 sm:w-10 fill-current translate-x-0.5" />
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Content */}
        <div className="space-y-4 sm:space-y-6 text-left font-sans">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
              <Video className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              Treatment Video
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#081C3A] tracking-tight leading-tight">
              {heading}
            </h2>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full" />
          </div>

          {description && (
            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed whitespace-pre-line">
              {description}
            </p>
          )}

          {bullets.length > 0 && (
            <ul className="space-y-2.5 pt-2">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={handleCtaClick}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50"
            >
              <span>{ctaText}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

const dentalImplantsFaqs: ServiceFaq[] = [
  {
    id: 'implants-faq-1',
    service_id: 'dental-implants',
    question: 'Are dental implants painful?',
    answer: 'Implant treatment is performed with appropriate anaesthesia and planned according to your clinical condition. Your dentist will also explain what to expect during recovery.',
    display_order: 10
  },
  {
    id: 'implants-faq-2',
    service_id: 'dental-implants',
    question: 'Am I a suitable candidate for dental implants?',
    answer: 'Suitability depends on your oral health, bone condition, number of missing teeth and overall treatment requirements. A clinical assessment and appropriate imaging are used to plan your treatment.',
    display_order: 20
  },
  {
    id: 'implants-faq-3',
    service_id: 'dental-implants',
    question: 'How long does dental implant treatment take?',
    answer: 'Treatment time varies from patient to patient and depends on the required implant procedure, healing and final restoration.',
    display_order: 30
  },
  {
    id: 'implants-faq-4',
    service_id: 'dental-implants',
    question: 'Can dental implants replace multiple missing teeth?',
    answer: 'Yes. Depending on your condition, treatment may involve one or multiple implants or implant-supported replacement teeth.',
    display_order: 40
  },
  {
    id: 'implants-faq-5',
    service_id: 'dental-implants',
    question: 'What happens if I do not have enough bone for an implant?',
    answer: 'Additional bone or site preparation may sometimes be required. Your treatment plan will be decided after clinical assessment and appropriate imaging.',
    display_order: 50
  },
  {
    id: 'implants-faq-6',
    service_id: 'dental-implants',
    question: 'Can I get fixed teeth quickly after implant placement?',
    answer: 'Immediate or early fixed-teeth options may be possible in selected cases when clinically appropriate. Your dentist will determine the suitable approach after assessment.',
    display_order: 60
  },
  {
    id: 'implants-faq-7',
    service_id: 'dental-implants',
    question: 'How should I maintain my dental implants?',
    answer: 'Good oral hygiene, regular professional follow-up and following your dentist’s maintenance instructions are important for long-term implant care.',
    display_order: 70
  },
  {
    id: 'implants-faq-8',
    service_id: 'dental-implants',
    question: 'Can I get a second opinion before starting implant treatment?',
    answer: 'Yes. You can discuss your treatment plan, ask questions and seek a second opinion before making your decision.',
    display_order: 80
  }
];

const fullMouthFaqs: ServiceFaq[] = [
  {
    id: 'fmr-faq-1',
    service_id: 'full-mouth-rehabilitation',
    question: 'What is included in the first appointment for Full Mouth Rehabilitation?',
    answer: 'During your first appointment, we conduct a comprehensive clinical examination, dental mapping, and digital diagnostic records. You will receive an initial, clearly explained treatment plan outlining every necessary phase and a transparent cost breakdown before any clinical work begins.',
    display_order: 10
  },
  {
    id: 'fmr-faq-2',
    service_id: 'full-mouth-rehabilitation',
    question: 'How long does a Full Mouth Reconstruction take?',
    answer: 'Contact Us for Treatment Timeline. Because full mouth rehabilitation is planned as a single, coordinated restoration, the total duration depends on the specific phases required—such as healing times for implants or custom-milling of your final zirconia crowns.',
    display_order: 20
  },
  {
    id: 'fmr-faq-3',
    service_id: 'full-mouth-rehabilitation',
    question: 'What is the total cost of a Full Mouth Rehabilitation?',
    answer: 'Contact Us for Pricing. The total cost is determined by your personalized treatment plan, which is completely finalized and provided as a written, fixed estimate before we begin. We offer flexible zero-interest EMI financing options to make your treatment plan accessible.',
    display_order: 30
  },
  {
    id: 'fmr-faq-4',
    service_id: 'full-mouth-rehabilitation',
    question: 'How are multiple specialists coordinated for my treatment?',
    answer: 'Your entire treatment is planned and executed under one roof at Patel Dental Hospital. Dr. Vipul Patel plans the entire case from the start, and our in-house specialists—including oral surgeons, prosthodontists, periodontists, and endodontists—work in perfect synchronization according to this single, unified plan.',
    display_order: 40
  },
  {
    id: 'fmr-faq-5',
    service_id: 'full-mouth-rehabilitation',
    question: 'Can I send my OPG or dental X-ray before visiting?',
    answer: 'Yes! We highly recommend sending us your OPG (Panoramic X-Ray) or existing dental scans on WhatsApp. Our surgical team will review your records and provide an indicative treatment plan and estimated cost range within 24 hours, completely free, before you travel or visit our clinic.',
    display_order: 50
  },
  {
    id: 'fmr-faq-6',
    service_id: 'full-mouth-rehabilitation',
    question: 'Why is Full Mouth Rehabilitation planned as one single rehabilitation?',
    answer: 'Unlike patching individual teeth one by one over several years, planning a full mouth reconstruction as a single coordinated rehabilitation ensures a balanced bite height, optimal muscle posture, correct alignment of both arches, and far superior long-term functional and aesthetic outcomes.',
    display_order: 60
  }
];

const invisibleAlignersFaqs: ServiceFaq[] = [
  {
    id: 'aligners-faq-1',
    service_id: 'invisible-aligners',
    question: 'How many hours a day do I need to wear my clear aligners?',
    answer: 'You must wear your clear aligners for 20 to 22 hours every day. You should only remove them to eat, drink anything other than water, and brush or floss your teeth.',
    display_order: 10
  },
  {
    id: 'aligners-faq-2',
    service_id: 'invisible-aligners',
    question: 'Will clear aligners affect my speech or cause a lisp?',
    answer: 'You may notice a very slight lisp during the first few days of adjusting to a new aligner tray. This is temporary and typically resolves within 48 to 72 hours as your tongue adapts to the aligners.',
    display_order: 20
  },
  {
    id: 'aligners-faq-3',
    service_id: 'invisible-aligners',
    question: 'Are retainers required after aligner treatment?',
    answer: 'Yes, retainers are absolutely required after any orthodontic or aligner treatment. Without a retainer, your teeth will slowly shift back to their original positions. Your clinical team will advise you on your custom retainer schedule.',
    display_order: 30
  },
  {
    id: 'aligners-faq-4',
    service_id: 'invisible-aligners',
    question: 'How often do I need to visit the clinic during treatment?',
    answer: 'Contact Us for Treatment Timeline. While aligners require fewer in-person visits than traditional braces, regular progress checks are essential to ensure your teeth are tracking perfectly according to the digital plan.',
    display_order: 40
  },
  {
    id: 'aligners-faq-5',
    service_id: 'invisible-aligners',
    question: 'Can I eat and drink normally with clear aligners?',
    answer: 'Yes! One of the biggest benefits of clear aligners is that you remove them when eating or drinking. There are no food restrictions. However, you must brush your teeth before putting the trays back in to prevent stains or decay.',
    display_order: 50
  }
];

const rootCanalFaqs: ServiceFaq[] = [
  {
    id: 'rct-faq-1',
    service_id: 'root-canal-treatment',
    question: 'Is a root canal painful?',
    answer: 'The procedure itself is done under local anaesthesia — most patients find it comparable to having a filling. The pain you have now is almost always worse than the treatment.',
    display_order: 10
  },
  {
    id: 'rct-faq-2',
    service_id: 'root-canal-treatment',
    question: 'Can a root canal really be completed in a single sitting?',
    answer: 'Yes. For suitable cases, modern single-sitting root canal treatment uses Japanese rotary endo motors and digital apex locators to clean, shape, disinfect, and seal the canals in one visit.',
    display_order: 20
  },
  {
    id: 'rct-faq-3',
    service_id: 'root-canal-treatment',
    question: 'What can I expect after the root canal treatment?',
    answer: 'You may experience mild soreness after treatment, which is normal and typically managed with routine painkillers prescribed by your dentist.',
    display_order: 30
  },
  {
    id: 'rct-faq-4',
    service_id: 'root-canal-treatment',
    question: 'Why is a custom crown recommended after a root canal?',
    answer: 'A custom crown is placed over the treated tooth to restore its structural strength, protect against fractures, and restore full chewing function.',
    display_order: 40
  },
  {
    id: 'rct-faq-5',
    service_id: 'root-canal-treatment',
    question: 'What is the cost of Root Canal Treatment?',
    answer: 'Contact Us for Pricing. The final cost depends on the tooth location (front tooth, premolar, or molar), whether it is a primary treatment or re-treatment, and the type of crown chosen.',
    display_order: 50
  },
  {
    id: 'rct-faq-6',
    service_id: 'root-canal-treatment',
    question: 'How long does a root canal appointment take?',
    answer: 'Contact Us for Treatment Timeline. A single-sitting root canal is planned efficiently based on the complexity of the tooth and number of canals.',
    display_order: 60
  }
];

const smileMakeoverFaqs: ServiceFaq[] = [
  {
    id: 'smile-faq-1',
    service_id: 'smile-makeover',
    question: 'Will it look fake?',
    answer: 'Only if it’s designed to a template. We proportion your smile to your face shape, lip line, skin tone and age — which is why the design step exists and why you see it before anything is done.',
    display_order: 10
  },
  {
    id: 'smile-faq-2',
    service_id: 'smile-makeover',
    question: 'What is Digital Smile Design (DSD)?',
    answer: 'Digital Smile Design is an advanced dental planning method that allows us to map and simulate your ideal smile coordinates using 3D scans and dental photography before starting treatment.',
    display_order: 20
  },
  {
    id: 'smile-faq-3',
    service_id: 'smile-makeover',
    question: 'Can I see the proposed result before treatment?',
    answer: 'Yes. We generate a detailed 3D visual preview of your proposed smile makeover so you can evaluate and adjust it beforehand.',
    display_order: 30
  },
  {
    id: 'smile-faq-4',
    service_id: 'smile-makeover',
    question: 'What is a physical smile mock-up?',
    answer: 'A physical mock-up is a temporary, non-invasive overlay placed over your teeth. This allows you to try on and see the proposed shape, length, and position of your new teeth in your mouth.',
    display_order: 40
  },
  {
    id: 'smile-faq-5',
    service_id: 'smile-makeover',
    question: 'Can I request changes or adjust the proposed design?',
    answer: 'Yes. The design process is completely collaborative. You can adjust the proportions, alignment, or color of the mock-up until you are completely satisfied with the proposed direction.',
    display_order: 50
  },
  {
    id: 'smile-faq-6',
    service_id: 'smile-makeover',
    question: 'Has tooth preparation already happened when I see the preview?',
    answer: 'No. All digital previews and physical mock-up trials are performed before any tooth preparation begins, ensuring a completely risk-free decision.',
    display_order: 60
  },
  {
    id: 'smile-faq-7',
    service_id: 'smile-makeover',
    question: 'How do I choose between different treatment routes?',
    answer: 'Our clinical team will help you compare options like veneers, whitening, composite bonding, or aligners to find the best route for your specific aesthetic goals and dental structure.',
    display_order: 70
  }
];

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
        schema: [
          ...createSchema(sTitle, sDesc),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": dentalImplantsFaqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }
        ]
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
        schema: [
          ...createSchema(sTitle, sDesc),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": rootCanalFaqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }
        ]
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
        schema: [
          ...createSchema(sTitle, sDesc),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": smileMakeoverFaqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }
        ]
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
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [allServicesList, setAllServicesList] = useState<Service[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(DEFAULT_CONTACT_INFO);
  const [drVipulImg, setDrVipulImg] = useState('/dr. patel.png');
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    doctorService.getDoctors().then(docs => {
      const vipul = docs.find(d => d.id === 'vipul');
      if (vipul && vipul.img) {
        setDrVipulImg(vipul.img);
      }
    }).catch(err => {
      console.error('Failed to load doctor image:', err);
    });
  }, []);
  const [error, setError] = useState<string | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  const [expandedImplantFaqId, setExpandedImplantFaqId] = useState<string | null>(null);

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
    return service?.id === 'rct' || service?.id === 'rct-srv' || service?.slug === 'root-canal-treatment' || slug === 'root-canal-treatment';
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
      faq: isDentalImplants ? 'Dental Implant FAQs' : `Frequently Asked Questions about ${kwPlural}`
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
      setAllServicesList(previewRelatedServices || DEFAULT_SERVICES);
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
          setAllServicesList(allServices);

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
    }
    return [...list]
      .map((p: any) => {
        if (!p) return null;
        const before = p.before || p.before_image || p.before_image_url || p.beforeImg || p.before_storage_path || '';
        const after = p.after || p.after_image || p.after_image_url || p.afterImg || p.after_storage_path || '';
        const title = p.title || p.caption || p.treatment_name || '';
        return {
          ...p,
          before,
          after,
          before_image: before,
          after_image: after,
          title,
          caption: title
        };
      })
      .filter((p: any) => p && p.before && p.after)
      .sort((a: any, b: any) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
  }, [mConfig, service, fallback, isFullMouth, isInvisibleAligners, isSmileMakeover, isCrownsAndBridges, isTeethWhitening, isPediatricDentistry, isBracesTreatment, isWisdomToothSurgery, isToothColouredFilling]);

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
    const text = `Hi Patel Dental Hospital, I'm interested in booking a consultation for the "${service.title}" treatment. Please let me know the next available slot!`;
    const num = (mConfig.contact_whatsapp_number && mConfig.contact_whatsapp_number.trim() !== '')
      ? mConfig.contact_whatsapp_number.replace(/\s+/g, '')
      : contactInfo.whatsappRaw;
    return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
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
            const textMsg = `Hi Patel Dental Hospital, I'm interested in booking a consultation for "${service?.title}".`;
            const num = (mConfig.contact_whatsapp_number && mConfig.contact_whatsapp_number.trim() !== '')
              ? mConfig.contact_whatsapp_number.replace(/\s+/g, '')
              : contactInfo.whatsappRaw || '919924225500';
            window.open(`https://wa.me/${num}?text=${encodeURIComponent(textMsg)}`, '_blank', 'noopener,noreferrer');
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

        {/* Phase 4 Dynamic Section Layout Engine */}
        {(() => {
          const clinicName = mConfig.contact_clinic_name || "Patel Dental Hospital";

          const smileMakeoverWhatsAppUrl = (() => {
            const num = (mConfig.contact_whatsapp_number && mConfig.contact_whatsapp_number.trim() !== '')
              ? mConfig.contact_whatsapp_number.replace(/\s+/g, '')
              : contactInfo.whatsappRaw || '919924225500';
            const text = "Hello, I want to see a digital preview of my smile. Here is a photo of my current smile:";
            return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
          })();

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
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full border border-teal-100/50">
                            FIXED TEETH IN JUST ONE WEEK
                          </span>
                          
                          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] text-[#081C3A] tracking-tight leading-[1.15]">
                            Missing Teeth? Get Fixed Teeth with Dental Implants.
                          </h1>
                        </div>

                        <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                          Replace missing or loose teeth with strong, natural-looking fixed teeth designed to restore comfortable chewing, confidence, and your smile.
                        </p>

                        {/* PROOF BAR */}
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 py-3 px-4 bg-slate-50 border border-slate-100 rounded-2xl w-fit">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">16000+ Implant Placements</span>
                          </div>
                          <span className="hidden sm:inline text-slate-300 font-light">|</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">800+ Full Mouth Cases</span>
                          </div>
                          <span className="hidden sm:inline text-slate-300 font-light">|</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">Fixed Teeth in 1 Week</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                          <button
                            type="button"
                            onClick={() => openAppointmentModal("Dental Implants - Hero CTA")}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50"
                          >
                            <Calendar className="h-4 w-4" />
                            <span>BOOK FREE IMPLANT CONSULTATION</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </button>

                          <a
                            href={`https://wa.me/${(mConfig.contact_whatsapp_number && mConfig.contact_whatsapp_number.trim() !== '') ? mConfig.contact_whatsapp_number.replace(/\s+/g, '') : contactInfo.whatsappRaw || '919924225500'}?text=${encodeURIComponent("Hello, I have missing teeth and want to know about dental implants. Here is my X-ray:")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
                          >
                            <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
                            <span>WHATSAPP YOUR X-RAY</span>
                          </a>
                        </div>
                      </>
                    ) : isFullMouth ? (
                      <>
                        <div className="space-y-3">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full border border-teal-100/50">
                            FULL MOUTH RECONSTRUCTION
                          </span>
                          
                          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] text-[#081C3A] tracking-tight leading-[1.15]">
                            FMR: Struggle to Chew, Speak or Smile?
                          </h1>
                        </div>

                        <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                          Full mouth rehabilitation combining implants, crowns, root canals and gum treatment in one coordinated plan, led by Dr. Vipul Patel with a full specialist team in-house.
                        </p>

                        {/* PROOF BAR */}
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 py-3 px-4 bg-slate-50 border border-slate-100 rounded-2xl w-fit">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">Complete plan before you start</span>
                          </div>
                          <span className="hidden sm:inline text-slate-300 font-light">|</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">Written, fixed cost</span>
                          </div>
                          <span className="hidden sm:inline text-slate-300 font-light">|</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">2 specialists, one clinic</span>
                          </div>
                          <span className="hidden sm:inline text-slate-300 font-light">|</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">EMI available</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                          <a
                            href="https://wa.me/+91%209510397046?text=Hello%2C%20most%20of%20my%20teeth%20are%20damaged%20or%20missing.%20I%20want%20to%20know%20about%20full%20mouth%20treatment."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 whitespace-nowrap"
                          >
                            <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
                            <span>Send your X-ray on WhatsApp</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => openAppointmentModal("Full Mouth Rehabilitation - Hero CTA")}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50 whitespace-nowrap"
                          >
                            <Calendar className="h-4 w-4" />
                            <span>FREE CONSULTATION</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </>
                    ) : isInvisibleAligners ? (
                      <>
                        <div className="space-y-3">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full border border-teal-100/50">
                            Straighten teeth invisibly
                          </span>
                          
                          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] text-[#081C3A] tracking-tight leading-[1.15]">
                            Straight Teeth Without Anyone Noticing
                          </h1>
                        </div>

                        <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                          Custom clear aligners planned on CBCT and intraoral scanning. See your predicted final result before you start. Removable for eating, meetings and photographs.
                        </p>

                        {/* PROOF BAR */}
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 py-3 px-4 bg-slate-50 border border-slate-100 rounded-2xl w-fit">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">See your result before starting</span>
                          </div>
                          <span className="hidden sm:inline text-slate-300 font-light">|</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">Removable</span>
                          </div>
                          <span className="hidden sm:inline text-slate-300 font-light">|</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">Contact Us for Treatment Timeline</span>
                          </div>
                          <span className="hidden sm:inline text-slate-300 font-light">|</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">EMI available</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                          <button
                            type="button"
                            onClick={() => openAppointmentModal("Invisible Aligners - Hero CTA")}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50"
                          >
                            <Calendar className="h-4 w-4" />
                            <span>BOOK FREE ALIGNER CONSULTATION</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </button>

                          <a
                            href={`https://wa.me/${(mConfig.contact_whatsapp_number && mConfig.contact_whatsapp_number.trim() !== '') ? mConfig.contact_whatsapp_number.replace(/\s+/g, '') : contactInfo.whatsappRaw || '919924225500'}?text=${encodeURIComponent("Hello, I want straight teeth without visible braces. Here is a photo of my teeth:")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 whitespace-nowrap"
                          >
                            <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
                            <span>Send a photo of your teeth — get your aligner plan</span>
                          </a>
                        </div>
                      </>
                    ) : isRootCanal ? (
                      <>
                        <div className="space-y-3">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full border border-teal-100/50">
                            Painless Single Sitting Root Canal Specialist
                          </span>
                          
                          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] text-[#081C3A] tracking-tight leading-[1.15]">
                            Stop Severe Tooth Pain in a Single Visit
                          </h1>
                        </div>

                        <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                          Save your natural tooth and resolve throbbing toothaches comfortably in just one visit. Using advanced Japanese rotary endo motors, digital apex locators, and biocompatible MTA sealers, our specialist endodontists provide precise, gentle, and painless root canal treatments.
                        </p>

                        {/* PROOF BAR */}
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 py-3 px-4 bg-slate-50 border border-slate-100 rounded-2xl w-fit">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">Completed in 1 Visit</span>
                          </div>
                          <span className="hidden sm:inline text-slate-300 font-light">|</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">Microscopic Precision</span>
                          </div>
                          <span className="hidden sm:inline text-slate-300 font-light">|</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">Painless RCT Specialist</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              window.location.href = `tel:${mConfig.phone_number || "+919510397046"}`;
                            }}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50"
                          >
                            <Calendar className="h-4 w-4" />
                            <span>CALL NOW — SAME-DAY APPOINTMENT</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </button>

                          <a
                            href={`https://wa.me/${(mConfig.contact_whatsapp_number && mConfig.contact_whatsapp_number.trim() !== '') ? mConfig.contact_whatsapp_number.replace(/\s+/g, '') : contactInfo.whatsappRaw || '919924225500'}?text=${encodeURIComponent("Hello, I am experiencing severe tooth pain and want to know about Single Sitting Root Canal Treatment. Here is a photo of my tooth or X-ray:")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 whitespace-nowrap"
                          >
                            <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
                            <span>WHATSAPP US</span>
                          </a>
                        </div>
                      </>
                    ) : isSmileMakeover ? (
                      <>
                        <div className="space-y-3">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full border border-teal-100/50">
                            DIGITAL SMILE DESIGN
                          </span>
                          
                          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] text-[#081C3A] tracking-tight leading-[1.15]">
                            See Your New Smile Before You Commit to It
                          </h1>
                        </div>

                        <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                          Digital Smile Design shows you exactly what we’re planning before we touch your teeth. Try the shape and length in a physical mock-up. Approve it, adjust it, or walk away — no pressure.
                        </p>

                        {/* PROOF BAR */}
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 py-3 px-4 bg-slate-50 border border-slate-100 rounded-2xl w-fit">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">See it before you start</span>
                          </div>
                          <span className="hidden sm:inline text-slate-300 font-light">|</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">Physical mock-up included</span>
                          </div>
                          <span className="hidden sm:inline text-slate-300 font-light">|</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">Digital Smile Design</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                          <a
                            href={smileMakeoverWhatsAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
                          >
                            <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
                            <span>Send a smile photo on WhatsApp — get a digital preview</span>
                          </a>
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

          const featuredVideoElement = (
            <FeaturedTreatmentVideo
              mConfig={mConfig}
              serviceTitle={service.title}
              openAppointmentModal={openAppointmentModal}
            />
          );

          const introElement = (mConfig.show_introduction !== false) ? (
            isNewArchitecture ? (
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
                            📸 {img.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          ) : null;

          const processElement = (mConfig.show_process !== false && displaySteps.length > 0) ? (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-3xl p-6 sm:p-8 md:p-10 space-y-6 animate-fade-in" id="cms-section-process">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-8 w-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488]">
                  <Activity className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h2 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">
                    Methodical Procedures
                  </h2>
                  <h3 className="text-lg font-black text-[#081C3A] tracking-tight">
                    {seoHeadings.process}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {displaySteps.map((step, idx) => (
                  <PremiumMedicalCard
                    key={idx}
                    icon={<Activity />}
                    title={step.title}
                  >
                    {step.description}
                  </PremiumMedicalCard>
                ))}
              </div>
            </div>
          ) : null;

          const benefitsElement = (mConfig.show_benefits !== false && displayFeatures.length > 0) ? (
            <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-3xl p-6 sm:p-8 md:p-10 space-y-6 animate-fade-in" id="cms-section-benefits">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-8 w-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488]">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h2 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">
                    Premium Highlights
                  </h2>
                  <h3 className="text-lg font-black text-[#081C3A] tracking-tight">
                    {seoHeadings.whyChooseUs}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                {displayFeatures.map((feat, idx) => (
                  <PremiumMedicalCard
                    key={idx}
                    icon={<Sparkles />}
                    title={feat.title}
                  >
                    {feat.description}
                  </PremiumMedicalCard>
                ))}
              </div>
            </div>
          ) : null;

          const galleryElement = (mConfig.show_gallery !== false && displayGallery.length > 0) ? (
            <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-3xs space-y-6" id="cms-section-gallery">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488]">
                    <ImageIcon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">
                      Patient Transformations
                    </h4>
                    <h3 className="text-lg font-black text-[#081C3A] tracking-tight">
                      {seoHeadings.caseGallery}
                    </h3>
                  </div>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2.5 py-1 rounded-md">
                  {displayGallery.length} Images
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayGallery.map((item, index) => (
                  <motion.div 
                    key={item.id} 
                    whileHover={{ y: -2 }}
                    onClick={() => openLightbox(index)}
                    className="group relative bg-slate-100 border border-slate-150 rounded-2xl overflow-hidden aspect-[4/3] shadow-3xs hover:shadow-md transition-all duration-300 cursor-zoom-in"
                  >
                    <img 
                      src={item.image_url} 
                      alt={item.alt_text || item.caption || service.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Caption Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-4 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="text-white w-full">
                        <p className="text-[11px] font-bold tracking-tight">
                          {item.caption || item.alt_text || `${service.title} Result`}
                        </p>
                        <span className="text-[9px] text-[#0D9488] font-black uppercase tracking-widest mt-0.5 block">
                          View Case &rarr;
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : null;

          const defaultVideoUrl = (isDentalImplants || isRootCanal || isFullMouth || isInvisibleAligners || isSmileMakeover || isCrownsAndBridges || isTeethWhitening || isPediatricDentistry || isBracesTreatment || isWisdomToothSurgery || isToothColouredFilling) 
            ? ((isFullMouth || isInvisibleAligners || isSmileMakeover || isCrownsAndBridges || isTeethWhitening || isPediatricDentistry || isBracesTreatment || isWisdomToothSurgery || isToothColouredFilling) ? 'https://www.youtube.com/watch?v=SnOxxv_S2ew' : 'https://www.instagram.com/reel/C8qLd9MyWwG/') 
            : (fallback?.procedure_video_url || fallback?.marketing_config?.procedure_video_url || '');
          const effectiveVideoUrl = (videoUrl || service?.procedure_video_url || mConfig.procedure_video_url || mConfig.video_url || defaultVideoUrl || '').trim();
          
          const effectiveVideoTitle = seoHeadings.video;

          const videoElement = (mConfig.show_procedure_video !== false && effectiveVideoUrl) ? (
            <div className="py-10 border-t border-slate-100 space-y-8 animate-fade-in" id="cms-section-video">
              {effectiveVideoTitle && (
                <div className="text-center max-w-xl mx-auto px-4">
                  <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#081C3A] tracking-tight leading-tight text-center">
                    {effectiveVideoTitle}
                  </h2>
                  <div className="h-0.5 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
                </div>
              )}

              <div className="max-w-[640px] mx-auto w-full px-2 sm:px-0">
                {isMp4Url(effectiveVideoUrl) ? (
                  <div className="w-full max-w-[430px] mx-auto flex justify-center">
                    <Mp4ReelPlayer src={effectiveVideoUrl} />
                  </div>
                ) : isYouTubeUrl(effectiveVideoUrl) ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-md bg-black">
                    <iframe
                      src={getYouTubeEmbedUrl(effectiveVideoUrl)}
                      title={effectiveVideoTitle || 'Procedure Video'}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <InstagramEmbed
                    url={effectiveVideoUrl}
                    title={effectiveVideoTitle || 'Procedure Video'}
                  />
                )}
              </div>
            </div>
          ) : null;

          const renderCombinedGallery = () => {
            const isSectionEnabled = mConfig.show_hospital_photos !== false && mConfig.show_hospital_team_photos !== false;
            const hasCmsImages = displayTeamPhotos.length > 0;
            const sectionTitle = "Patel Dental Hospital " + seoHeadings.keywordPlural + " Clinical Facility & Team Gallery";

            if (!isSectionEnabled || !hasCmsImages) return null;

            return (
              <div className="py-12 border-t border-slate-100 space-y-8 animate-fade-in" id="cms-section-hospital-gallery">
                {sectionTitle && (
                  <div className="text-center max-w-xl mx-auto px-4">
                    <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#081C3A] tracking-tight leading-tight text-center">
                      {sectionTitle}
                    </h2>
                    <div className="h-0.5 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                  {displayTeamPhotos.map((p: any, idx: number) => {
                    const imgUrl = (p.image_url || p.photo_url || '').trim();
                    const titleText = (p.caption || p.title || p.name || '').trim();
                    if (!imgUrl) return null;

                    return (
                      <div 
                        key={p.id || idx} 
                        className="group bg-white border border-[#E5EEF5] rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_12px_24px_rgba(8,28,58,0.08)] hover:border-[#B9D1E6] transition-all duration-300 flex flex-col hover:-translate-y-1"
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
                          <img
                            src={imgUrl}
                            alt={titleText || 'Hospital Gallery Photo'}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        {titleText && (
                          <div className="p-4 bg-slate-50/50 border-t border-[#E5EEF5] text-center">
                            <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">
                              {titleText}
                            </h4>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          };

          const validTestimonialVideos = displayTestimonials.filter((t: any) => {
            const url = (t?.video_url || t?.instagram_url || t?.reel_url || '').trim();
            return url !== '';
          });

          const testimonialsTitle = seoHeadings.keywordPlural + " Patient Testimonials & Success Stories";

          const testimonialsElement = (mConfig.show_testimonials !== false && validTestimonialVideos.length > 0) ? (
            <div className="py-10 border-t border-slate-100 space-y-8 animate-fade-in" id="cms-section-testimonials">
              {testimonialsTitle && (
                <div className="text-center max-w-xl mx-auto px-4">
                  <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#081C3A] tracking-tight leading-tight text-center">
                    {testimonialsTitle}
                  </h2>
                  <div className="h-0.5 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
                {validTestimonialVideos.map((t: any, idx: number) => {
                  const reelUrl = (t.video_url || t.instagram_url || t.reel_url || '').trim();
                  const patientName = typeof t.patient_name === 'string' ? t.patient_name.trim() : '';
                  return (
                    <div key={t.id || idx} className="flex flex-col items-center w-full">
                      {isMp4Url(reelUrl) ? (
                        <div className="w-full max-w-[430px] mx-auto flex justify-center">
                          <Mp4ReelPlayer src={reelUrl} />
                        </div>
                      ) : isYouTubeUrl(reelUrl) ? (
                        <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-black">
                          <iframe
                            src={getYouTubeEmbedUrl(reelUrl)}
                            title={patientName ? `${patientName} Testimonial` : (testimonialsTitle || 'Patient Testimonial Video')}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <InstagramEmbed
                          url={reelUrl}
                          title={patientName ? `${patientName} Testimonial` : (testimonialsTitle || 'Patient Testimonial Reel')}
                        />
                      )}
                      {patientName && patientName !== 'Patient Name' && (
                        <span className="text-xs font-bold text-slate-700 mt-2 text-center block">
                          {patientName}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null;

          const displayFaqs = isDentalImplants ? dentalImplantsFaqs : isRootCanal ? rootCanalFaqs : isFullMouth ? fullMouthFaqs : isInvisibleAligners ? invisibleAlignersFaqs : isSmileMakeover ? smileMakeoverFaqs : faqs;

          const faqElement = (mConfig.show_faq !== false && displayFaqs.length > 0) ? (
            isDentalImplants ? (
              <div className="bg-white border border-slate-200/80 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-14 shadow-sm space-y-8 sm:space-y-10" id="cms-section-faq">
                {/* Header */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60">
                      DENTAL IMPLANT FAQ
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight">
                    Frequently Asked Questions About Dental Implants
                  </h2>
                  <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                </div>

                {/* Accordion List */}
                <div className="space-y-4 max-w-4xl mx-auto">
                  {displayFaqs.map((faq) => {
                    const isExpanded = expandedFaqId === faq.id || (!expandedFaqId && faq.id === displayFaqs[0]?.id);
                    return (
                      <div 
                        key={faq.id}
                        className={`rounded-[18px] sm:rounded-[20px] transition-all duration-200 border ${
                          isExpanded 
                            ? 'border-[#0D9488] bg-white shadow-xs' 
                            : 'border-slate-200/80 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                        >
                          <span className={`text-base sm:text-lg font-bold tracking-tight leading-snug transition-colors ${
                            isExpanded ? 'text-[#0D9488]' : 'text-[#081C3A]'
                          }`}>
                            {faq.question}
                          </span>
                          <span className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isExpanded ? 'bg-teal-50 text-[#0D9488]' : 'bg-slate-50 text-slate-400'
                          }`}>
                            {isExpanded ? (
                              <ChevronUp className="h-4.5 w-4.5" />
                            ) : (
                              <ChevronDown className="h-4.5 w-4.5" />
                            )}
                          </span>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-slate-100 text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed whitespace-pre-wrap">
                                <div className="pt-4">
                                  {faq.answer}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : isRootCanal ? (
              <div className="bg-white border border-slate-200/80 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-14 shadow-sm space-y-8 sm:space-y-10" id="cms-section-faq">
                {/* Header */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60">
                      ROOT CANAL FAQ
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight">
                    Frequently Asked Questions About Root Canal Treatment
                  </h2>
                  <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                </div>

                {/* Accordion List */}
                <div className="space-y-4 max-w-4xl mx-auto">
                  {displayFaqs.map((faq) => {
                    const isExpanded = expandedFaqId === faq.id || (!expandedFaqId && faq.id === displayFaqs[0]?.id);
                    return (
                      <div 
                        key={faq.id}
                        className={`rounded-[18px] sm:rounded-[20px] transition-all duration-200 border ${
                          isExpanded 
                            ? 'border-[#0D9488] bg-white shadow-xs' 
                            : 'border-slate-200/80 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                        >
                          <span className={`text-base sm:text-lg font-bold tracking-tight leading-snug transition-colors ${
                            isExpanded ? 'text-[#0D9488]' : 'text-[#081C3A]'
                          }`}>
                            {faq.question}
                          </span>
                          <span className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isExpanded ? 'bg-teal-50 text-[#0D9488]' : 'bg-slate-50 text-slate-400'
                          }`}>
                            {isExpanded ? (
                              <ChevronUp className="h-4.5 w-4.5" />
                            ) : (
                              <ChevronDown className="h-4.5 w-4.5" />
                            )}
                          </span>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-slate-100 text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed whitespace-pre-wrap">
                                <div className="pt-4">
                                  {faq.answer}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : isFullMouth ? (
              <div className="bg-white border border-slate-200/80 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-14 shadow-sm space-y-8 sm:space-y-10" id="cms-section-faq">
                {/* Header */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60">
                      FULL MOUTH FAQ
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight">
                    Frequently Asked Questions About Full Mouth Rehabilitation
                  </h2>
                  <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                </div>

                {/* Accordion List */}
                <div className="space-y-4 max-w-4xl mx-auto">
                  {displayFaqs.map((faq) => {
                    const isExpanded = expandedFaqId === faq.id || (!expandedFaqId && faq.id === displayFaqs[0]?.id);
                    return (
                      <div 
                        key={faq.id}
                        className={`rounded-[18px] sm:rounded-[20px] transition-all duration-200 border ${
                          isExpanded 
                            ? 'border-[#0D9488] bg-white shadow-xs' 
                            : 'border-slate-200/80 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                        >
                          <span className={`text-base sm:text-lg font-bold tracking-tight leading-snug transition-colors ${
                            isExpanded ? 'text-[#0D9488]' : 'text-[#081C3A]'
                          }`}>
                            {faq.question}
                          </span>
                          <span className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isExpanded ? 'bg-teal-50 text-[#0D9488]' : 'bg-slate-50 text-slate-400'
                          }`}>
                            {isExpanded ? (
                              <ChevronUp className="h-4.5 w-4.5" />
                            ) : (
                              <ChevronDown className="h-4.5 w-4.5" />
                            )}
                          </span>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-slate-100 text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed whitespace-pre-wrap">
                                <div className="pt-4">
                                  {faq.answer}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : isInvisibleAligners ? (
              <div className="bg-white border border-slate-200/80 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-14 shadow-sm space-y-8 sm:space-y-10" id="cms-section-faq">
                {/* Header */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60">
                      CLEAR ALIGNER FAQ
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight">
                    Frequently Asked Questions About Invisible Aligners
                  </h2>
                  <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                </div>

                {/* Accordion List */}
                <div className="space-y-4 max-w-4xl mx-auto">
                  {displayFaqs.map((faq) => {
                    const isExpanded = expandedFaqId === faq.id || (!expandedFaqId && faq.id === displayFaqs[0]?.id);
                    return (
                      <div 
                        key={faq.id}
                        className={`rounded-[18px] sm:rounded-[20px] transition-all duration-200 border ${
                          isExpanded 
                            ? 'border-[#0D9488] bg-white shadow-xs' 
                            : 'border-slate-200/80 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                        >
                          <span className={`text-base sm:text-lg font-bold tracking-tight leading-snug transition-colors ${
                            isExpanded ? 'text-[#0D9488]' : 'text-[#081C3A]'
                          }`}>
                            {faq.question}
                          </span>
                          <span className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isExpanded ? 'bg-teal-50 text-[#0D9488]' : 'bg-slate-50 text-slate-400'
                          }`}>
                            {isExpanded ? (
                              <ChevronUp className="h-4.5 w-4.5" />
                            ) : (
                              <ChevronDown className="h-4.5 w-4.5" />
                            )}
                          </span>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-slate-100 text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed whitespace-pre-wrap">
                                <div className="pt-4">
                                  {faq.answer}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : isSmileMakeover ? (
              <div className="bg-white border border-slate-200/80 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-14 shadow-sm space-y-8 sm:space-y-10" id="cms-section-faq">
                {/* Header */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60">
                      SMILE MAKEOVER FAQ
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight">
                    Frequently Asked Questions About Smile Designing
                  </h2>
                  <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                </div>

                {/* Accordion List */}
                <div className="space-y-4 max-w-4xl mx-auto">
                  {displayFaqs.map((faq) => {
                    const isExpanded = expandedFaqId === faq.id || (!expandedFaqId && faq.id === displayFaqs[0]?.id);
                    return (
                      <div 
                        key={faq.id}
                        className={`rounded-[18px] sm:rounded-[20px] transition-all duration-200 border ${
                          isExpanded 
                            ? 'border-[#0D9488] bg-white shadow-xs' 
                            : 'border-slate-200/80 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                        >
                          <span className={`text-base sm:text-lg font-bold tracking-tight leading-snug transition-colors ${
                            isExpanded ? 'text-[#0D9488]' : 'text-[#081C3A]'
                          }`}>
                            {faq.question}
                          </span>
                          <span className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isExpanded ? 'bg-teal-50 text-[#0D9488]' : 'bg-slate-50 text-slate-400'
                          }`}>
                            {isExpanded ? (
                              <ChevronUp className="h-4.5 w-4.5" />
                            ) : (
                              <ChevronDown className="h-4.5 w-4.5" />
                            )}
                          </span>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-slate-100 text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed whitespace-pre-wrap">
                                <div className="pt-4">
                                  {faq.answer}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-3xs space-y-6" id="cms-section-faq">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="h-8 w-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488]">
                    <HelpCircle className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">
                      Patient Support Hub
                    </h4>
                    <h3 className="text-lg font-black text-[#081C3A] tracking-tight">
                      {seoHeadings.faq}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {displayFaqs.map((faq) => {
                    const isExpanded = expandedFaqId === faq.id || (!expandedFaqId && faq.id === displayFaqs[0]?.id);
                    return (
                      <div 
                        key={faq.id}
                        className={`border rounded-2xl transition-all duration-300 ${
                          isExpanded 
                            ? 'border-[#0D9488] bg-teal-50/10' 
                            : 'border-slate-150 hover:border-slate-200 bg-white'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full text-left p-4 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                        >
                          <div className="flex gap-2.5 items-start">
                            <span className="text-xs font-black text-[#0D9488] bg-teal-50 h-5 w-5 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                              Q
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[#081C3A] leading-relaxed">
                              {faq.question}
                            </span>
                          </div>
                          <span className="shrink-0 p-1 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-[#0D9488]" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </span>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 pt-1 border-t border-slate-100/50 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-wrap pl-11">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          ) : null;

          const getServiceHeroImage = (targetSlug: string) => {
            const fromLoaded = allServicesList.find(s => s.slug === targetSlug);
            if (fromLoaded?.hero_image && fromLoaded.hero_image.trim() !== '') {
              return fromLoaded.hero_image;
            }
            const fromDefault = DEFAULT_SERVICES.find(s => s.slug === targetSlug);
            if (fromDefault?.hero_image && fromDefault.hero_image.trim() !== '') {
              return fromDefault.hero_image;
            }
            const treatmentId = 
              targetSlug === 'full-mouth-rehabilitation' ? 'fullmouth' : 
              targetSlug === 'crowns-bridges' ? 'crowns' : 
              targetSlug === 'smile-makeover' ? 'smile' : 
              targetSlug === 'braces-treatment' ? 'braces' : 
              targetSlug === 'dental-implants' ? 'implants' : 
              targetSlug === 'invisible-aligners' ? 'aligners' : 
              targetSlug === 'pediatric-dentistry' ? 'kids' : 
              targetSlug === 'wisdom-tooth-surgery' ? 'wisdom' : 
              targetSlug === 'tooth-coloured-filling' ? 'filling' : 
              targetSlug === 'root-canal-treatment' ? 'rct' : 
              targetSlug;
            const fromTreatment = TREATMENTS.find(t => t.id === treatmentId);
            if (fromTreatment?.image && fromTreatment.image.trim() !== '') {
              return fromTreatment.image;
            }
            return '';
          };

          const dentalImplantsRelatedCards = [
            {
              slug: 'full-mouth-rehabilitation',
              title: 'Full Mouth Rehabilitation',
              description: 'Comprehensive treatment for patients with multiple missing, damaged, or severely worn teeth across both upper and lower jaws.',
              image: getServiceHeroImage('full-mouth-rehabilitation')
            },
            {
              slug: 'crowns-bridges',
              title: 'Crowns & Bridges',
              description: 'Restore damaged or missing teeth with high-strength, custom-milled zirconia crowns and fixed bridges.',
              image: getServiceHeroImage('crowns-bridges')
            },
            {
              slug: 'smile-makeover',
              title: 'Smile Makeover',
              description: 'Improve the appearance, shade, shape, and overall harmony of your smile with personalized cosmetic dental solutions.',
              image: getServiceHeroImage('smile-makeover')
            }
          ];

          const fullMouthRelatedCards = [
            {
              slug: 'dental-implants',
              title: 'Dental Implants',
              description: 'Permanent tooth replacement utilizing premium titanium root implants for secure, stable, and natural-looking fixed teeth.',
              image: getServiceHeroImage('dental-implants')
            },
            {
              slug: 'crowns-bridges',
              title: 'Crowns & Bridges',
              description: 'Restore damaged or missing teeth with high-strength, custom-milled zirconia crowns and fixed bridges.',
              image: getServiceHeroImage('crowns-bridges')
            },
            {
              slug: 'smile-makeover',
              title: 'Smile Makeover',
              description: 'Improve the appearance, shade, shape, and overall harmony of your smile with personalized cosmetic dental solutions.',
              image: getServiceHeroImage('smile-makeover')
            }
          ];

          const rootCanalRelatedCards = [
            {
              slug: 'crowns-bridges',
              title: 'Crowns & Bridges',
              description: 'Restore damaged or missing teeth with high-strength, custom-milled zirconia crowns and fixed bridges.',
              image: getServiceHeroImage('crowns-bridges')
            },
            {
              slug: 'dental-implants',
              title: 'Dental Implants',
              description: 'Permanent tooth replacement utilizing premium titanium root implants for secure, stable, and natural-looking fixed teeth.',
              image: getServiceHeroImage('dental-implants')
            },
            {
              slug: 'full-mouth-rehabilitation',
              title: 'Full Mouth Rehabilitation',
              description: 'Comprehensive treatment for patients with multiple missing, damaged, or severely worn teeth across both upper and lower jaws.',
              image: getServiceHeroImage('full-mouth-rehabilitation')
            }
          ];

          const invisibleAlignersRelatedCards = [
            {
              slug: 'braces-treatment',
              title: 'Braces Treatment',
              description: 'Classic orthodontic corrections using durable ceramic, metal, or lingual bracket systems to align teeth and correct bite issues.',
              image: getServiceHeroImage('braces-treatment')
            },
            {
              slug: 'smile-makeover',
              title: 'Smile Makeover',
              description: 'Improve the appearance, shade, shape, and overall harmony of your smile with personalized cosmetic dental solutions and hand-finished veneers.',
              image: getServiceHeroImage('smile-makeover')
            },
            {
              slug: 'dental-implants',
              title: 'Dental Implants',
              description: 'Permanent tooth replacement utilizing premium titanium root implants for secure, stable, and natural-looking fixed teeth.',
              image: getServiceHeroImage('dental-implants')
            }
          ];

          const smileMakeoverRelatedCards = [
            {
              slug: 'invisible-aligners',
              title: 'Invisible Aligners',
              description: 'Straighten your teeth discretely with advanced clear aligners, planned completely digitally to complement your smile.',
              image: getServiceHeroImage('invisible-aligners')
            },
            {
              slug: 'teeth-whitening',
              title: 'Laser Teeth Whitening',
              description: 'Brighten your smile by several shades in a single sitting with safe, clinically supervised laser tooth whitening.',
              image: getServiceHeroImage('teeth-whitening')
            },
            {
              slug: 'crowns-bridges',
              title: 'Crowns & Bridges',
              description: 'Restore missing or damaged teeth with custom-milled premium zirconia dental crowns and porcelain fixed bridges.',
              image: getServiceHeroImage('crowns-bridges')
            }
          ];

          const relatedServicesElement = (mConfig.show_related_services !== false) ? (
            isDentalImplants ? (
              <div className="space-y-8 sm:space-y-10 pt-6 sm:pt-10" id="cms-section-related-services">
                {/* Centered Badge, Heading & Teal Underline */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60">
                      RELATED TREATMENTS
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight">
                    Related Treatments
                  </h2>
                  <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                </div>

                {/* 3 Equal Treatment Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto items-stretch">
                  {dentalImplantsRelatedCards.map((card) => (
                    <div
                      key={card.slug}
                      onClick={() => handleNavigateToService(card.slug)}
                      className="bg-white border border-slate-200/80 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_16px_36px_rgba(8,28,58,0.1)] hover:border-[#14B8A6]/50 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
                    >
                      <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                        <img 
                          src={card.image} 
                          alt={card.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                        <div className="space-y-2.5">
                          <h3 className="font-sans font-bold text-lg sm:text-xl text-[#081C3A] group-hover:text-[#0D9488] transition-colors leading-snug tracking-tight">
                            {card.title}
                          </h3>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                            {card.description}
                          </p>
                        </div>
                        <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                          <span>Learn Details</span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : isRootCanal ? (
              <div className="space-y-8 sm:space-y-10 pt-6 sm:pt-10" id="cms-section-related-services">
                {/* Centered Badge, Heading & Teal Underline */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60">
                      RELATED TREATMENTS
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight">
                    Related Treatments
                  </h2>
                  <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                </div>

                {/* 3 Equal Treatment Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto items-stretch">
                  {rootCanalRelatedCards.map((card) => (
                    <div
                      key={card.slug}
                      onClick={() => handleNavigateToService(card.slug)}
                      className="bg-white border border-slate-200/80 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_16px_36px_rgba(8,28,58,0.1)] hover:border-[#14B8A6]/50 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
                    >
                      <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                        <img 
                          src={card.image} 
                          alt={card.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                        <div className="space-y-2.5">
                          <h3 className="font-sans font-bold text-lg sm:text-xl text-[#081C3A] group-hover:text-[#0D9488] transition-colors leading-snug tracking-tight">
                            {card.title}
                          </h3>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                            {card.description}
                          </p>
                        </div>
                        <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                          <span>Learn Details</span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : isFullMouth ? (
              <div className="space-y-8 sm:space-y-10 pt-6 sm:pt-10" id="cms-section-related-services">
                {/* Centered Badge, Heading & Teal Underline */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60">
                      RELATED TREATMENTS
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight">
                    Related Treatments
                  </h2>
                  <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                </div>

                {/* 3 Equal Treatment Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto items-stretch">
                  {fullMouthRelatedCards.map((card) => (
                    <div
                      key={card.slug}
                      onClick={() => handleNavigateToService(card.slug)}
                      className="bg-white border border-slate-200/80 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_16px_36px_rgba(8,28,58,0.1)] hover:border-[#14B8A6]/50 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
                    >
                      <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                        <img 
                          src={card.image} 
                          alt={card.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                        <div className="space-y-2.5">
                          <h3 className="font-sans font-bold text-lg sm:text-xl text-[#081C3A] group-hover:text-[#0D9488] transition-colors leading-snug tracking-tight">
                            {card.title}
                          </h3>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                            {card.description}
                          </p>
                        </div>
                        <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                          <span>Learn Details</span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : isInvisibleAligners ? (
              <div className="space-y-8 sm:space-y-10 pt-6 sm:pt-10" id="cms-section-related-services">
                {/* Centered Badge, Heading & Teal Underline */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60">
                      RELATED TREATMENTS
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight">
                    Related Treatments
                  </h2>
                  <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                </div>

                {/* 3 Equal Treatment Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto items-stretch">
                  {invisibleAlignersRelatedCards.map((card) => (
                    <div
                      key={card.slug}
                      onClick={() => handleNavigateToService(card.slug)}
                      className="bg-white border border-slate-200/80 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_16px_36px_rgba(8,28,58,0.1)] hover:border-[#14B8A6]/50 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
                    >
                      <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                        <img 
                          src={card.image} 
                          alt={card.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                        <div className="space-y-2.5">
                          <h3 className="font-sans font-bold text-lg sm:text-xl text-[#081C3A] group-hover:text-[#0D9488] transition-colors leading-snug tracking-tight">
                            {card.title}
                          </h3>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                            {card.description}
                          </p>
                        </div>
                        <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                          <span>Learn Details</span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : isSmileMakeover ? (
              <div className="space-y-8 sm:space-y-10 pt-6 sm:pt-10" id="cms-section-related-services">
                {/* Centered Badge, Heading & Teal Underline */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60">
                      RELATED TREATMENTS
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight">
                    Related Treatments
                  </h2>
                  <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                </div>

                {/* 3 Equal Treatment Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto items-stretch">
                  {smileMakeoverRelatedCards.map((card) => (
                    <div
                      key={card.slug}
                      onClick={() => handleNavigateToService(card.slug)}
                      className="bg-white border border-slate-200/80 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_16px_36px_rgba(8,28,58,0.1)] hover:border-[#14B8A6]/50 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
                    >
                      <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                        <img 
                          src={card.image} 
                          alt={card.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                        <div className="space-y-2.5">
                          <h3 className="font-sans font-bold text-lg sm:text-xl text-[#081C3A] group-hover:text-[#0D9488] transition-colors leading-snug tracking-tight">
                            {card.title}
                          </h3>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                            {card.description}
                          </p>
                        </div>
                        <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                          <span>Learn Details</span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : relatedServices.length > 0 ? (
              <div className="space-y-6 pt-6" id="cms-section-related-services">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-[9px] text-[#0D9488] font-black uppercase tracking-widest block">
                    Explore More Solutions
                  </span>
                  <h2 className="font-display font-black text-2xl text-[#081C3A] tracking-tight">
                    Other Treatments
                  </h2>
                  <p className="text-slate-500 text-xs">
                    Learn about other specialized cosmetic, restorative, and general dental care treatments we offer.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedServices.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white border border-[#E5EEF5] rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_12px_24px_rgba(8,28,58,0.08)] hover:border-[#B9D1E6] transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                          <img 
                            src={DEFAULT_SERVICES.find(s => s.slug === item.slug || s.id === item.id)?.hero_image || item.hero_image || 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600'} 
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="p-6 space-y-2.5">
                          <h3 className="font-display font-extrabold text-base text-[#081C3A] line-clamp-1 tracking-tight group-hover:text-[#0D9488] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                            {item.short_description}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0">
                        <button
                          onClick={() => handleNavigateToService(item.slug)}
                          className="w-full py-2 bg-slate-50 hover:bg-[#0D9488]/5 border border-slate-150 text-[#081C3A] hover:text-[#0D9488] text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          Learn Details
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : null
          ) : null;

          const dentalImplantsWhatsAppUrl = (() => {
            const num = (mConfig.contact_whatsapp_number && mConfig.contact_whatsapp_number.trim() !== '')
              ? mConfig.contact_whatsapp_number.replace(/\s+/g, '')
              : contactInfo.whatsappRaw;
            const text = "Hello, I have missing teeth and want to know about dental implants. Here is my X-ray:";
            return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
          })();

          const rootCanalWhatsAppUrl = (() => {
            const num = (mConfig.contact_whatsapp_number && mConfig.contact_whatsapp_number.trim() !== '')
              ? mConfig.contact_whatsapp_number.replace(/\s+/g, '')
              : contactInfo.whatsappRaw || '919924225500';
            const text = "Hello, I am having tooth pain and would like to book a root canal consultation.";
            return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
          })();

          const fullMouthWhatsAppUrl = (() => {
            const num = (mConfig.contact_whatsapp_number && mConfig.contact_whatsapp_number.trim() !== '')
              ? mConfig.contact_whatsapp_number.replace(/\s+/g, '')
              : contactInfo.whatsappRaw;
            const text = "Hello, most of my teeth are damaged or missing. I want to know about full mouth treatment.";
            return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
          })();

          const invisibleAlignersWhatsAppUrl = (() => {
            const num = (mConfig.contact_whatsapp_number && mConfig.contact_whatsapp_number.trim() !== '')
              ? mConfig.contact_whatsapp_number.replace(/\s+/g, '')
              : contactInfo.whatsappRaw || '919924225500';
            const text = "Hello, I want straight teeth without visible braces. Here is a photo of my teeth:";
            return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
          })();

          const bottomCtaElement = (mConfig.show_bottom_cta !== false) ? (
            isDentalImplants ? (
              <div className="relative bg-[#0B1528] border border-slate-800 rounded-[26px] sm:rounded-[32px] p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden text-center space-y-6 sm:space-y-8" id="cms-section-bottom-cta">
                {/* Background Clinic Interior Ambient Layer */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none" 
                  style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600")' }} 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1528]/80 via-[#0B1528]/95 to-[#0B1528] pointer-events-none" />

                <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5 relative z-10">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0D9488]/20 border border-[#0D9488]/40 text-[#2DD4BF] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="h-3.5 w-3.5 text-[#2DD4BF] shrink-0" />
                      DENTAL IMPLANT CONSULTATION
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-4xl lg:text-[42px] text-white tracking-tight leading-[1.2] max-w-2xl mx-auto">
                    Ready to Explore Your Dental<br />Implant Options?
                  </h2>
                  <p className="text-slate-300/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium font-sans">
                    Book a personalised consultation to discuss your oral condition, suitable treatment options, expected treatment timeline, and estimated treatment plan.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 relative z-10 pt-2">
                  <button
                    onClick={() => {
                      const link = mConfig.bottom_cta_primary_link;
                      if (link && link.trim() !== '') {
                        if (link.startsWith('http')) {
                          window.open(link, '_blank', 'noopener,noreferrer');
                        } else {
                          window.location.hash = link;
                        }
                      } else {
                        openAppointmentModal('Dental Implants - Closing CTA');
                      }
                    }}
                    className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>BOOK YOUR CONSULTATION</span>
                    <ArrowRight className="h-4 w-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  
                  <a
                    href={dentalImplantsWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" />
                    <span>CHAT ON WHATSAPP</span>
                  </a>
                </div>
              </div>
            ) : isRootCanal ? (
              <div className="relative bg-[#0B1528] border border-slate-800 rounded-[26px] sm:rounded-[32px] p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden text-center space-y-6 sm:space-y-8" id="cms-section-bottom-cta">
                {/* Background Clinic Interior Ambient Layer */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none" 
                  style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600")' }} 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1528]/80 via-[#0B1528]/95 to-[#0B1528] pointer-events-none" />

                <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5 relative z-10">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0D9488]/20 border border-[#0D9488]/40 text-[#2DD4BF] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="h-3.5 w-3.5 text-[#2DD4BF] shrink-0" />
                      EMERGENCY & SAME-DAY CARE
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-4xl lg:text-[42px] text-white tracking-tight leading-[1.2] max-w-2xl mx-auto">
                    In Pain? Get Relief Today with Single Sitting RCT
                  </h2>
                  <p className="text-slate-300/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium font-sans">
                    Call our emergency desk now for a same-day appointment or message us on WhatsApp for immediate guidance.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 relative z-10 pt-2">
                  <button
                    onClick={() => {
                      const phone = (mConfig.contact_call_number || mConfig.phone_number || contactInfo.callRaw || '+919924225500').replace(/\s+/g, '');
                      window.location.href = `tel:${phone}`;
                    }}
                    className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>CALL NOW — SAME-DAY APPOINTMENT</span>
                    <ArrowRight className="h-4 w-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  
                  <a
                    href={rootCanalWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" />
                    <span>CHAT ON WHATSAPP</span>
                  </a>
                </div>
              </div>
            ) : isInvisibleAligners ? (
              <div className="relative bg-[#0B1528] border border-slate-800 rounded-[26px] sm:rounded-[32px] p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden text-center space-y-6 sm:space-y-8" id="cms-section-bottom-cta">
                {/* Background Clinic Interior Ambient Layer */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none" 
                  style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600")' }} 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1528]/80 via-[#0B1528]/95 to-[#0B1528] pointer-events-none" />

                <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5 relative z-10">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0D9488]/20 border border-[#0D9488]/40 text-[#2DD4BF] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="h-3.5 w-3.5 text-[#2DD4BF] shrink-0" />
                      INVISIBLE ALIGNER CONSULTATION
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-4xl lg:text-[42px] text-white tracking-tight leading-[1.2] max-w-2xl mx-auto">
                    Ready to Straighten Your Teeth Without Visible Braces?
                  </h2>
                  <p className="text-slate-300/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium font-sans">
                    Book a free aligner consultation or WhatsApp a photo of your teeth to see your predicted final smile simulation and customized treatment options.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 relative z-10 pt-2">
                  <button
                    onClick={() => {
                      openAppointmentModal('Invisible Aligners - Closing CTA');
                    }}
                    className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>BOOK FREE CONSULTATION</span>
                    <ArrowRight className="h-4 w-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  
                  <a
                    href={invisibleAlignersWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 fill-white text-[#25D366]" />
                    <span>WHATSAPP YOUR PHOTO</span>
                  </a>
                </div>
              </div>
            ) : isFullMouth ? (
              <div className="relative bg-[#0B1528] border border-slate-800 rounded-[26px] sm:rounded-[32px] p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden text-center space-y-6 sm:space-y-8" id="cms-section-bottom-cta">
                {/* Background Clinic Interior Ambient Layer */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none" 
                  style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600")' }} 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1528]/80 via-[#0B1528]/95 to-[#0B1528] pointer-events-none" />

                <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5 relative z-10">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0D9488]/20 border border-[#0D9488]/40 text-[#2DD4BF] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="h-3.5 w-3.5 text-[#2DD4BF] shrink-0" />
                      Indicative Cost & Plan in 24 Hours
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-4xl lg:text-[42px] text-white tracking-tight leading-[1.2] max-w-2xl mx-auto">
                    Get an Indicative Plan and Cost Range Before You Visit
                  </h2>
                  <p className="text-slate-300/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium font-sans">
                    Send us your OPG on WhatsApp and receive an indicative plan and cost range within 24 hours — before you visit.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 relative z-10 pt-2">
                  <a
                    href={fullMouthWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 fill-white text-[#22C55E]" />
                    <span>Send OPG on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      openAppointmentModal('Full Mouth Rehabilitation - Closing CTA');
                    }}
                    className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>BOOK YOUR APPOINTMENT</span>
                    <ArrowRight className="h-4 w-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ) : isSmileMakeover ? (
              <div className="relative bg-[#0B1528] border border-slate-800 rounded-[26px] sm:rounded-[32px] p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden text-center space-y-6 sm:space-y-8" id="cms-section-bottom-cta">
                {/* Background Clinic Interior Ambient Layer */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none" 
                  style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600")' }} 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1528]/80 via-[#0B1528]/95 to-[#0B1528] pointer-events-none" />

                <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5 relative z-10">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0D9488]/20 border border-[#0D9488]/40 text-[#2DD4BF] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="h-3.5 w-3.5 text-[#2DD4BF] shrink-0" />
                      DIGITAL SMILE PREVIEW
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-4xl lg:text-[42px] text-white tracking-tight leading-[1.2] max-w-2xl mx-auto">
                    See Your Final Result Before You Pay
                  </h2>
                  <p className="text-slate-300/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium font-sans">
                    Send a smile photo on WhatsApp to get your digital smile preview and try a physical mock-up in your mouth before tooth preparation — no pressure.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 relative z-10 pt-2">
                  <a
                    href={smileMakeoverWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 fill-white text-[#25D366]" />
                    <span>Send a smile photo on WhatsApp — get a digital preview</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-150 rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl relative overflow-hidden text-center space-y-6" id="cms-section-bottom-cta">
                <div className="max-w-xl mx-auto space-y-4 relative z-10">
                  <span className="inline-flex items-center gap-1 bg-[#0D9488] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full leading-none">
                    Consultation Booking
                  </span>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-[#081C3A] tracking-tight leading-tight">
                    {seoHeadings.bottomCta}
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {mConfig.bottom_cta_description || `Book a pain-free diagnostic consultation with our specialists in Rajkot. Experience high-end treatment tailored exactly to your clinical expectations.`}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 relative z-10 pt-2">
                  <button
                    onClick={() => {
                      const link = mConfig.bottom_cta_primary_link;
                      if (link && link.trim() !== '') {
                        if (link.startsWith('http')) {
                          window.open(link, '_blank', 'noopener,noreferrer');
                        } else {
                          window.location.hash = link;
                        }
                      } else {
                        openAppointmentModal(`${service.title} - Bottom CTA`);
                      }
                    }}
                    className="w-full sm:w-auto px-8 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-xl shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <Calendar className="h-4.5 w-4.5" />
                    <span>{mConfig.bottom_cta_primary_text || "Free Consultation"}</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  
                  <a
                    href={mConfig.bottom_cta_secondary_link && mConfig.bottom_cta_secondary_link.trim() !== '' ? mConfig.bottom_cta_secondary_link : getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black rounded-xl shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4.5 w-4.5" />
                    <span>{mConfig.bottom_cta_secondary_text || "WhatsApp Us"}</span>
                  </a>
                </div>
              </div>
            )
          ) : null;

          // Dispatch switcher
          const getSectionNode = (key) => {
            switch (key) {
              case 'hero':
                return heroElement;
              case 'featured_video':
                return featuredVideoElement;
              case 'intro':
                return introElement;
              case 'process':
                return processElement;
              case 'benefits':
                return benefitsElement;
              case 'gallery':
                return galleryElement;
              case 'video':
                return videoElement;
              case 'hospital_photos':
                return renderCombinedGallery();
              case 'team_photos':
                return null;
              case 'testimonials':
                return testimonialsElement;
              case 'faq':
                return faqElement;
              case 'related_services':
                return relatedServicesElement;
              case 'bottom_cta':
                return bottomCtaElement;
              default:
                return null;
            }
          };

          // Formulate order lists
          const defaultOrder = [
            'hero',
            'featured_video',
            'intro',
            'process',
            'benefits',
            'gallery',
            'video',
            'testimonials',
            'hospital_photos',
            'team_photos',
            'faq',
            'bottom_cta',
            'related_services'
          ];
          const currentOrder = Array.isArray(mConfig.section_order) 
            ? mConfig.section_order 
            : defaultOrder;

          const cleanOrder = [...currentOrder];
          defaultOrder.forEach(sec => {
            if (!cleanOrder.includes(sec)) {
              cleanOrder.push(sec);
            }
          });
          const sectionOrder = cleanOrder.filter(sec => defaultOrder.includes(sec));

          const innerKeys = ['intro', 'process', 'benefits', 'gallery', 'faq'];
          const outerBeforeGridKeys = [];
          const outerAfterGridKeys = [];
          const innerGridKeys = [];

          let foundInner = false;
          sectionOrder.forEach(sec => {
            if (innerKeys.includes(sec)) {
              foundInner = true;
              innerGridKeys.push(sec);
            } else {
              if (!foundInner) {
                outerBeforeGridKeys.push(sec);
              } else {
                outerAfterGridKeys.push(sec);
              }
            }
          });

          if (isNewArchitecture) {
            if (isSmileMakeover) {
              return (
                <div className="space-y-8 sm:space-y-16 lg:space-y-20">
                  {heroElement}

                  {/* Section 2: Symptom Qualification */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="symptom-qualification-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0D9488]" />
                        Symptom Qualification
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        A smile makeover might be for you if:
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto pt-8">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Self-Conscious Smiling
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          You cover your mouth when you laugh or smile, holding back your natural expression.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Teeth Gaps
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          You have noticeable gaps or spacing between your teeth that you want unified.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Chipped or Uneven
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          Your teeth are chipped, worn down, or unevenly shaped from wear or micro-fractures.
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Deep Discolouration
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          Your teeth are badly discoloured, and standard teeth whitening alone is insufficient.
                        </p>
                      </div>

                      {/* Card 5 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Gummy Smile
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          You have a gummy smile or an uneven gumline that makes your teeth look too short.
                        </p>
                      </div>

                      {/* Card 6 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Proportion & Size
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          Your teeth look too small, too short, or mismatched with your overall facial proportions.
                        </p>
                      </div>

                      {/* Card 7 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Crooked Front Teeth
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          You have minor crowding on front teeth but want to avoid long traditional orthodontic treatments.
                        </p>
                      </div>

                      {/* Card 8 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Mismatched Crowns
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          You have old, dark, or mismatched crowns or fillings that disrupt the aesthetic of your natural teeth.
                        </p>
                      </div>

                      {/* Card 9 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Upcoming Life Milestone
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          You have a wedding or major career event coming up and want to feel absolutely confident in photographs.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: The Route Comparison */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="route-comparison-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        Treatment Comparison
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Compare Smile Makeover Routes
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-7xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[680px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Concern
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Likely Treatment
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Treatment Timeline
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Starting Price
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Gaps or chipped/uneven teeth
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Composite bonding
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Treatment Timeline
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Pricing
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Dull, stained or yellow teeth
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Whitening
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Treatment Timeline
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Pricing
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Small, worn or deeply discoloured teeth
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Porcelain veneers
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Treatment Timeline
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Pricing
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Crooked teeth with staining
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Aligners / braces + whitening
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Treatment Timeline
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Pricing
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Heavily damaged or missing teeth
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Crowns / Full Mouth Rehabilitation
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Treatment Timeline
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Pricing
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Gummy smile or uneven gumline
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Laser gum contouring
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Treatment Timeline
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Pricing
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: The DSD Offer - Centrepiece */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="dsd-centrepiece-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0 animate-pulse" />
                        Digital Smile Preview
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Your Digital Smile Preview
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-5xl mx-auto bg-[#0B1528] rounded-3xl p-6 sm:p-10 lg:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden">
                      {/* Sub-header background texture */}
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none" />
                      
                      <div className="relative z-10 space-y-8">
                        <div className="text-center max-w-2xl mx-auto space-y-3">
                          <p className="text-[#2DD4BF] text-xs sm:text-sm font-black uppercase tracking-wider">
                            See your final result before you pay
                          </p>
                          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                            Try the shape and length in a physical mock-up before any tooth preparation. You can approve the design, request fine adjustments, or simply walk away.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4">
                          <div className="bg-[#121E36] border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-[#0D9488]/30 text-[#2DD4BF] font-black text-sm flex items-center justify-center">1</div>
                            <h4 className="font-bold text-sm">3D Imaging</h4>
                            <p className="text-xs text-slate-400 font-medium">Precision DSLR photos and intraoral scans of your exact dental structure.</p>
                          </div>

                          <div className="bg-[#121E36] border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-[#0D9488]/30 text-[#2DD4BF] font-black text-sm flex items-center justify-center">2</div>
                            <h4 className="font-bold text-sm">Design Lab</h4>
                            <p className="text-xs text-slate-400 font-medium">Digital design simulation projecting ideal tooth proportions and curves.</p>
                          </div>

                          <div className="bg-[#121E36] border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-[#0D9488]/30 text-[#2DD4BF] font-black text-sm flex items-center justify-center">3</div>
                            <h4 className="font-bold text-sm">Comparison</h4>
                            <p className="text-xs text-slate-400 font-medium">Review a side-by-side current vs. proposed smile digital mock-up.</p>
                          </div>

                          <div className="bg-[#121E36] border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-[#0D9488]/30 text-[#2DD4BF] font-black text-sm flex items-center justify-center">4</div>
                            <h4 className="font-bold text-sm">Fine Tune</h4>
                            <p className="text-xs text-slate-400 font-medium">Collaborative adjustments to shape, color, and alignment coordinates.</p>
                          </div>

                          <div className="bg-[#121E36] border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-[#0D9488]/30 text-[#2DD4BF] font-black text-sm flex items-center justify-center">5</div>
                            <h4 className="font-bold text-sm">Physical Trial</h4>
                            <p className="text-xs text-slate-400 font-medium">Try on a removable physical mock-up in-mouth before clinical prep.</p>
                          </div>
                        </div>

                        <div className="flex justify-center pt-2">
                          <a
                            href={smileMakeoverWhatsAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
                            <span>Preview My Smile on WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Transparent Pricing */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="transparent-pricing-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        TRANSPARENT PRICING
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Transparent Smile Makeover Pricing
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        We believe in complete pricing transparency. Below are the structured options for custom Smile Makeover treatments.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-4xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[540px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Treatment Option
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Starting Price
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Ideal For
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Composite Bonding
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Quick correction of minor chips and small gaps
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Teeth Whitening
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Removing deep stains and brightening teeth
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Porcelain Veneers
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Permanent correction of shape, alignment, and color
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Aligners / Braces + Whitening
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Comprehensive orthodontic alignment and brightening
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Modern Crowns
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Strengthening and restoring heavily damaged teeth
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Full Mouth Rehabilitation
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Comprehensive restoration of chewing function and aesthetics
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Laser Gum Contouring
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Correcting gummy smiles and uneven gum lines
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 space-y-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                          <div className="space-y-1">
                            <p className="text-xs sm:text-sm text-slate-700 font-bold">
                              Included in every plan:
                            </p>
                            <p className="text-xs text-slate-600 font-medium max-w-xl">
                              All standard prep-consultations, 3D intraoral digital mapping, shade optimization matching, and initial digital mock-up preview.
                            </p>
                          </div>
                          <button
                            onClick={() => openAppointmentModal('Smile Makeover Pricing - Consultation')}
                            className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                          >
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>Book Consultation</span>
                          </button>
                        </div>

                        <div className="border-t border-slate-200/60 pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-700">
                          <div>
                            💳 EMI Options: <span className="text-[#0D9488]">EMI available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 6: Treatment Timeline */}
                  <div className="pt-6 sm:pt-14 border-t border-slate-200/60" id="timeline-section">
                    <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[28px] sm:rounded-[36px] p-6 sm:p-12 lg:p-14 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
                      {/* Heading area */}
                      <div className="space-y-3 max-w-2xl mx-auto text-center mb-10 sm:mb-14">
                        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                          <Clock className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                          TREATMENT TIMELINE
                        </span>
                        <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                          Your Smile Makeover Treatment Timeline
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center font-normal">
                          The exact timeline depends on your selected treatment route.
                        </p>
                        <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
                      </div>

                      {/* 4 horizontal numbered timeline steps */}
                      <div className="relative">
                        {/* Horizontal connector line on desktop/tablet */}
                        <div className="hidden md:block absolute top-[36px] left-[12.5%] right-[12.5%] h-[2px] bg-[#5eead4] z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                          {/* Step 1 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              1
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Digital Assessment
                            </h3>
                            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium px-4">
                              We capture high-resolution DSLR photos and 3D digital impressions to map your facial coordinates.
                            </p>
                          </div>

                          {/* Step 2 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              2
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Planning & Mock-up
                            </h3>
                            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium px-4">
                              Our team designs your new smile and prepares a physical mock-up you can try in before any treatment starts.
                            </p>
                          </div>

                          {/* Step 3 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              3
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Precise Preparation
                            </h3>
                            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium px-4">
                              We carry out conservative tooth preparation or contouring according to your approved preview.
                            </p>
                          </div>

                          {/* Step-4 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              4
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              The Final Reveal
                            </h3>
                            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium px-4">
                              We bond your permanent custom restorations (veneers, crowns, or bonding) for a flawless, long-lasting smile.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* General Treatment Examples note */}
                      <div className="mt-12 pt-6 border-t border-slate-100 flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-bold text-slate-500">
                        <span>⚡ Individual timelines vary for:</span>
                        <span>• Teeth Whitening</span>
                        <span>• Composite Bonding</span>
                        <span>• Porcelain Veneers</span>
                        <span>• Aligners / Braces</span>
                        <span>• Crowns</span>
                        <span>• Gum Contouring</span>
                      </div>
                    </div>
                  </div>

                  {/* Section 7: Risk Reversal / Reassurance */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="risk-reversal-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0D9488]" />
                        Risk Reversal & Reassurance
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        See your new smile before you commit to it.
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto pt-8">
                      {/* Reassurance 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] overflow-hidden text-left flex flex-col justify-between">
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#0D9488]" />
                        <div className="space-y-3">
                          <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight leading-tight">
                            Digital Preview
                          </h3>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                            The proposed smile is digitally previewed before treatment starts. View 3D simulation overlays so you know exactly how the results will look.
                          </p>
                        </div>
                      </div>

                      {/* Reassurance 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] overflow-hidden text-left flex flex-col justify-between">
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#0D9488]" />
                        <div className="space-y-3">
                          <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight leading-tight">
                            Try the Physical Mock-Up
                          </h3>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                            You can review the proposed design, request any number of fine-tuning adjustments, and try a removable physical mock-up directly in your mouth.
                          </p>
                        </div>
                      </div>

                      {/* Reassurance 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] overflow-hidden text-left flex flex-col justify-between">
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#0D9488]" />
                        <div className="space-y-3">
                          <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight leading-tight">
                            Walk-Away Option
                          </h3>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                            If you are not completely satisfied with the proposed smile direction during the mock-up phase, you can walk away before any tooth preparation begins.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 8: Interactive Before & After Smile Transformations */}
                  {mConfig.show_before_after !== false && beforeAfterPairs.length > 0 && (
                    <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="before-after-gallery-section">
                      <div className="space-y-3 max-w-3xl mx-auto text-center">
                        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                          <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                          Transformations
                        </span>
                        <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                          {seoHeadings.transformations}
                        </h2>
                        <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-start max-w-7xl mx-auto pt-4 px-4 sm:px-0">
                        {beforeAfterPairs.map((pair, idx) => (
                          <div 
                            key={idx} 
                            className="bg-white border border-[#E5EEF5] rounded-[20px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_12px_24px_rgba(8,28,58,0.08)] hover:border-[#B9D1E6] transition-all duration-300"
                          >
                            <BeforeAfterSlider
                              beforeImage={pair.before_image}
                              afterImage={pair.after_image}
                              caption={pair.caption || pair.title}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Section 8: Clinical Case Gallery */}
                  {mConfig.show_gallery !== false && (
                    <ClinicalCaseGallery
                      heading={seoHeadings.caseGallery}
                      description={mConfig.gallery_description}
                      items={Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery}
                      singleGallery={isRootCanal || isFullMouth || isInvisibleAligners || isSmileMakeover || isCrownsAndBridges || isTeethWhitening || isPediatricDentistry || isBracesTreatment || isWisdomToothSurgery || isToothColouredFilling}
                    />
                  )}

                  {/* Section 8: Procedure Video */}
                  {videoElement}

                  {/* Section 8: Patient Testimonial Reels */}
                  {testimonialsElement}

                  {/* Section 8: Google Patient Reviews */}
                  {mConfig.show_google_reviews !== false && (
                    <GooglePatientReviews
                      heading={seoHeadings.reviews}
                      reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
                    />
                  )}

                  {/* Section 9: Why Patel Dental / Why This Doctor */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="smile-makeover-why-patel-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        WHY PATEL DENTAL
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Digital Smile Design & Esthetic Veneer Expertise
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Your new smile is crafted using advanced 3D digital smile design workflows, facial mapping, and meticulous preparation designed to preserve healthy tooth structure.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight pt-2">
                          Digital Smile Design
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          We map your facial coordinates, lips, and smile parameters using advanced 3D planning software to create a highly tailored and proportional design.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight pt-2">
                          Try-In Physical Mock-Up
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Try a physical smile mockup in your mouth to preview the shape, length, and shade. You can request changes and see the flow before any preparation begins.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight pt-2">
                          Micro-Prep Style
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          We prioritize conserving your natural enamel. Veneers are custom-milled to ultra-thin levels, ensuring minimal adjustments are made to your teeth.
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight pt-2">
                          Realistic Translucency
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Porcelain restorations are crafted with micro-translucency, realistic textures, and customized gradients to look identical to natural, healthy enamel.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 11: FAQ Accordion */}
                  {faqElement}

                  {/* Section 12: Bottom CTA */}
                  {bottomCtaElement}

                  {/* Section 13: Related Services */}
                  {relatedServicesElement}
                </div>
              );
            }

            if (isInvisibleAligners) {
              return (
                <div className="space-y-8 sm:space-y-16 lg:space-y-20">
                  {heroElement}

                  {/* Section 2: Symptom Qualification */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="symptom-qualification-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0D9488]" />
                        Symptom Qualification
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        You May Need Invisible Aligners If…
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto pt-8">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Mild to Moderate Teeth Crowding or Spacing
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          You are looking for a reliable, predictable solution to align gaps or mild crowding.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Desire for a Discrete Alignment Option
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          You want to straighten your teeth without anyone noticing, avoiding visible metal or ceramic braces.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Preference for Removable Trays
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          You want a treatment that fits your lifestyle, allowing you to remove trays easily for eating, meetings, and photographs.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Option Comparison */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="option-comparison-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        Option Comparison
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Braces vs. Clear Aligners Comparison
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-7xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[680px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Feature / Factor
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4 relative">
                                <div className="flex items-center justify-between gap-2">
                                  <span>Invisible Aligners</span>
                                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest whitespace-nowrap">
                                    Recommended
                                  </span>
                                </div>
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Metal Braces
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Ceramic Braces
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            {/* Row 1: Visibility */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Visibility
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Nearly invisible</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Clearly visible
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Less visible
                              </td>
                            </tr>

                            {/* Row 2: Removable */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Removable
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Yes</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                No
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                No
                              </td>
                            </tr>

                            {/* Row 3: Food restrictions */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Food restrictions
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>None — remove to eat</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Many
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Many
                              </td>
                            </tr>

                            {/* Row 4: Cleaning your teeth */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Cleaning your teeth
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Normal</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Difficult
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Difficult
                              </td>
                            </tr>

                            {/* Row 5: Clinic visits */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Clinic visits
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Contact Us for Treatment Timeline</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Contact Us for Treatment Timeline
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Contact Us for Treatment Timeline
                              </td>
                            </tr>

                            {/* Row 6: Discomfort */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Discomfort
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Mild pressure with each new tray</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Wire tightening; possible ulcers
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Same
                              </td>
                            </tr>

                            {/* Row 7: Handles complex cases */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Handles complex cases
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Mild to moderate</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                All cases, including severe
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                All cases
                              </td>
                            </tr>

                            {/* Row 8: Requires discipline */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Requires discipline
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Yes — 20–22 hrs/day</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                No — fixed on
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                No
                              </td>
                            </tr>

                            {/* Row 9: Cost */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Cost
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Contact Us for Pricing
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Trust-Building Paragraph */}
                    <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left space-y-3 mt-4">
                      <div className="flex items-center gap-2 text-[#0D9488]">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <h4 className="font-sans font-bold text-sm sm:text-base text-[#081C3A]">
                          An Honest Note on Treatment Suitability
                        </h4>
                      </div>
                      <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium">
                        Honestly: aligners only work if you wear them. If you know you won’t keep them in for 22 hours a day, braces will give you a better result for less money. And for severe crowding or complex bite correction, braces remain the more predictable option. We’ll tell you at your consultation which one actually suits your case — we fit both.
                      </p>
                    </div>
                  </div>

                  {/* Section 4: Transparent Pricing */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="transparent-pricing-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        TRANSPARENT PRICING
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Transparent Invisible Aligners Pricing
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        We believe in complete pricing transparency. Below are the structured options for custom aligner treatments.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-4xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[540px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Aligner Plan
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Starting Price
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Scope of Treatment
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Minor correction
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Minor adjustments and slight alignments
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Moderate correction
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Full single or dual arch moderate crowding correction
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Comprehensive
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Multi-arch comprehensive bite and alignment correction
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Retainers after treatment
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Crucial post-treatment retention to hold your new smile
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Refinement aligners if needed
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Fine-tuning trays to achieve optimal final alignment
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 space-y-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                          <div className="space-y-1">
                            <p className="text-xs sm:text-sm text-slate-700 font-bold">
                              Included in every plan:
                            </p>
                            <p className="text-xs text-slate-600 font-medium max-w-xl">
                              CBCT and intraoral scan, digital treatment simulation, all aligner sets, and all review appointments.
                            </p>
                          </div>
                          <button
                            onClick={() => openAppointmentModal('Invisible Aligners Pricing - Consultation')}
                            className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                          >
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>Book Aligner Consultation</span>
                          </button>
                        </div>

                        <div className="border-t border-slate-200/60 pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-700">
                          <div>
                            💳 EMI Options: <span className="text-[#0D9488]">EMI available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Timeline */}
                  <div className="pt-6 sm:pt-14 border-t border-slate-200/60" id="timeline-section">
                    <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[28px] sm:rounded-[36px] p-6 sm:p-12 lg:p-14 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
                      {/* Heading area */}
                      <div className="space-y-3 max-w-2xl mx-auto text-center mb-10 sm:mb-14">
                        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                          <Clock className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                          TREATMENT TIMELINE
                        </span>
                        <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                          Your Invisible Aligner Treatment Timeline
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center font-normal">
                          Treatment Timeline: <span className="font-bold text-[#0D9488]">Contact Us for Treatment Timeline</span>. Digital simulation shows your teeth moving week by week to the final position.
                        </p>
                        <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
                      </div>

                      {/* 4 horizontal numbered timeline steps */}
                      <div className="relative">
                        {/* Horizontal connector line on desktop/tablet */}
                        <div className="hidden md:block absolute top-[36px] left-[12.5%] right-[12.5%] h-[2px] bg-[#5eead4] z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                          {/* Step 1 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              1
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Digital Simulation
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              CBCT and intraoral scanning to generate a digital simulation of your teeth moving week by week.
                            </p>
                          </div>

                          {/* Step 2 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              2
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Custom Manufacture
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              Fabrication of your complete series of custom-fit clear, removable aligner trays.
                            </p>
                          </div>

                          {/* Step 3 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              3
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Aligner Progression
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              Wear trays for 20-22 hours daily, progressing to the next tray in sequence as teeth align.
                            </p>
                          </div>

                          {/* Step 4 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              4
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Clinic Progress Reviews
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              Regular progress check-ups at Patel Dental Hospital. Contact us for treatment timeline and visit intervals.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 6: Risk Reversal */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="warranty-reassurance-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        RISK REVERSAL & REASSURANCE
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Our Aligner Commitment to You
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        See your final predicted result before you pay, with total transparency around refinement, retainers, and clinical suitability.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Point 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          See your final result before you pay
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          After the scan, see a digital simulation of your teeth moving week by week to the final position before committing to treatment. If you don’t like the predicted result, you don’t proceed.
                        </p>
                      </div>

                      {/* Point 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Refinement & Retainer Policies
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Transparency around lost aligner replacement, retainer cost/inclusion, and fine-tuning refinement trays is fully detailed inside your initial treatment agreement.
                        </p>
                      </div>

                      {/* Point 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Clinical Suitability Check
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          We only recommend clear aligners if your specific case is clinically suitable. If traditional braces remain a safer or more predictable choice, we will advise you honestly.
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={() => openAppointmentModal('Invisible Aligners - Reassurance CTA')}
                        className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                      >
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span>Discuss Your Aligner Options</span>
                      </button>
                    </div>
                  </div>

                  {/* Section 5: Interactive Before & After Smile Transformations */}
                  {mConfig.show_before_after !== false && beforeAfterPairs.length > 0 && (
                    <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="before-after-gallery-section">
                      <div className="space-y-3 max-w-3xl mx-auto text-center">
                        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                          <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                          Transformations
                        </span>
                        <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                          {seoHeadings.transformations}
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-medium font-sans">
                          {mConfig.before_after_description || (isToothColouredFilling ? 'See real composite filling tooth restoration results.' : isWisdomToothSurgery ? 'See real smile transformations of our wisdom tooth surgery patients.' : isBracesTreatment ? 'See real smile transformations of our braces treatment patients.' : isSmileMakeover ? 'See real smile transformations of our smile makeover patients.' : isInvisibleAligners ? 'See real smile transformations of our invisible aligners patients.' : isFullMouth ? 'See real smile transformations of our full mouth rehabilitation patients.' : 'See real smile transformations of our patients.')}
                        </p>
                        <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-start max-w-7xl mx-auto">
                        {beforeAfterPairs.map((pair, pIdx) => (
                          <div 
                            key={pair.id || pIdx} 
                            className="bg-white border border-[#E5EEF5] rounded-[20px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_12px_24px_rgba(8,28,58,0.08)] hover:border-[#B9D1E6] transition-all duration-300"
                          >
                            <BeforeAfterSlider
                              beforeImage={pair.before_image}
                              afterImage={pair.after_image}
                              caption={pair.caption}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Section 6: Clinical Case Gallery */}
                  {mConfig.show_gallery !== false && (
                    <ClinicalCaseGallery
                      heading={seoHeadings.caseGallery}
                      description={mConfig.gallery_description}
                      items={Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery}
                      singleGallery={isRootCanal || isFullMouth || isInvisibleAligners || isSmileMakeover || isCrownsAndBridges || isTeethWhitening || isPediatricDentistry || isBracesTreatment || isWisdomToothSurgery || isToothColouredFilling}
                    />
                  )}

                  {/* Section 6: Procedure Video (Loaded dynamically from CMS Instagram Reel) */}
                  {videoElement}

                  {/* Section 7: Patient Testimonial Reels */}
                  {testimonialsElement}

                  {/* Section 10: Google Patient Reviews (100% CMS-driven premium slider) */}
                  {mConfig.show_google_reviews !== false && (
                    <GooglePatientReviews
                      heading={seoHeadings.reviews}
                      reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
                    />
                  )}

                  {/* Section 8: Why This Clinic / Doctor (Why Patel Dental) */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="aligner-expertise-why-patel-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        WHY PATEL DENTAL
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Advanced Aligner Expertise Focused on Your Treatment
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Your invisible aligner treatment is planned with advanced orthodontics expertise, digital planning and techniques designed to provide precise, personalised care.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          CBCT Planning
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          We use high-definition CBCT scans to analyze your bone structure and root anatomy, ensuring safe and predictable tooth movement.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Intraoral Scanning
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Say goodbye to messy traditional clay molds. Our 3D intraoral scanner captures highly accurate digital impressions of your teeth in minutes.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Digital Simulation
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          See your personalized treatment projection beforehand. Our digital workflow maps out each stage of tooth movement before tray fabrication.
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Suitability Assessment
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          We prioritize your health. We only recommend aligners if your specific case is clinically suitable, otherwise recommending predictable traditional alternatives.
                        </p>
                      </div>
                    </div>

                    {/* Bottom Reassurance */}
                    <div className="max-w-3xl mx-auto text-center pt-2">
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        Your treatment plan is personalised after clinical examination and appropriate diagnostic assessment.
                      </p>
                    </div>
                  </div>

                  {/* Section 9: Advanced Aligner Technology */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="aligner-technology-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        ADVANCED ALIGNER TECHNOLOGY
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Advanced Technology Designed Around Your Aligner Treatment
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Digital planning and guided aligner techniques help your treatment team plan teeth alignment with greater precision and a more controlled orthodontic approach.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch justify-center">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          High-Definition CBCT Diagnostics
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Allows precise visualization of root angles and surrounding bone, ensuring tooth movement occurs safely within healthy biological boundaries.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          3D Intraoral Scanning
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Generates a perfect, high-resolution digital model of your teeth in minutes, avoiding messy traditional impressions and maximizing aligner tray fit.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Digital Smile Simulation
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Maps out the sequential movement of your teeth week-by-week so you can preview your final straight smile before your aligners are manufactured.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 11: FAQ Accordion */}
                  {faqElement}

                  {/* Section 12: Bottom CTA */}
                  {bottomCtaElement}

                  {/* Section 13: Related Services (FINAL CONTENT SECTION, immediately ABOVE Footer) */}
                  {relatedServicesElement}
                </div>
              );
            }

            return (
              <div className="space-y-8 sm:space-y-16 lg:space-y-20">
                {heroElement}
                {!isFullMouth && featuredVideoElement}

                {/* Section 2: Symptom Qualification for Full Mouth Rehabilitation */}
                {isFullMouth && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-symptom-qualification-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Is full mouth rehabilitation right for you?
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto pt-8">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        {/* Left accent line */}
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Multiple Broken, Decayed or Loose Teeth
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          When simple fillings or individual crowns are no longer enough to save your bite.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        {/* Left accent line */}
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Severe Wear & Flattened Bite
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          Teeth that are heavily worn down, causing jaw pain, chewing difficulty, or a collapsed facial appearance.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        {/* Left accent line */}
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Missing Most or All of Your Teeth
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          Struggling with loose dentures and wanting a permanent, secure, and life-changing fixed-teeth solution.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 3: Comparison Table for Full Mouth Rehabilitation */}
                {isFullMouth && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-comparison-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        Option Comparison
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        What doing nothing costs
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-7xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[680px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Feature / Factor
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4 relative">
                                <div className="flex items-center justify-between gap-2">
                                  <span>Full Mouth Rehabilitation</span>
                                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest whitespace-nowrap">
                                    Recommended
                                  </span>
                                </div>
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Continuing to patch tooth by tooth
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Full Dentures
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Chewing restored
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Reconstructed to restore 100% full chewing power.</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Chewing ability continues to decline as more teeth fail.
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Limited chewing power (20%–30%); restricts diet significantly.
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Bite and jaw joint corrected
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Yes; fully aligns and balances dental arches to correct TMJ pain.</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                No; uneven tooth wear and tooth movement worsen TMJ stress.
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                No; slipping appliances cannot support natural joint alignment.
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Facial support restored
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Yes; supports cheeks and lips naturally, reversing collapsed look.</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                No; progressive tooth wear causes facial height collapse.
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Temporary; jawbone shrinkage over time leads to a sunken facial appearance.
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Bone loss
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Prevented; implants stimulate bone and preserve natural jaw structure.</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Continues to accelerate in missing tooth areas.
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Accelerated bone loss due to constant surface pressure on gum ridges.
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Total cost over 10 years
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Contact Us for Pricing</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                High; multiple emergency procedures and crowns accumulate a high lifetime cost.
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Ongoing expenses for adjustments, relining, adhesives, and replacements.
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Result
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Permanent, highly functional, and fully stable natural-looking teeth.</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Chronic toothaches, unstable bite, and progressive tooth loss.
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Loose, uncomfortable removable appliance that can slip while speaking or eating.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 4: Pricing & Financing for Full Mouth Rehabilitation */}
                {isFullMouth && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-pricing-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        Pricing & Financing
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Full Mouth Reconstruction Costs
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        We provide completely transparent costs with structured financial options to help make full mouth reconstruction accessible and stress-free.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-4xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[540px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Treatment
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Starting Price
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Best For
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Single-arch rehabilitation
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Rebuilding one entire arch of teeth
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Full-mouth (both arches)
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Comprehensive restoration of both upper and lower arches
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                All-on-4 — per arch, fixed teeth
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Fixed teeth on 4 dental implants per arch
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                All-on-6 — per arch, fixed teeth
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Fixed teeth on 6 dental implants per arch for maximum stability
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Full-mouth crowns (no implants needed)
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Complete natural teeth restoration using high-quality crowns
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Financing information inside table footer container, perfectly matching spacing, typography, and buttons */}
                      <div className="p-6 sm:p-8 bg-slate-50/80 border-t border-slate-100 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                          <div className="bg-white border border-slate-100 rounded-2xl p-5 text-left flex items-start gap-3 shadow-sm">
                            <div className="h-9 w-9 rounded-lg bg-teal-50 flex items-center justify-center text-[#0D9488] border border-teal-100 shrink-0 mt-0.5">
                              <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                                Zero-Interest EMI
                              </h4>
                              <p className="text-slate-500 text-xs sm:text-sm mt-0.5 font-medium leading-relaxed">
                                Convenient monthly installment plans are available at zero interest to ease the treatment cost.
                              </p>
                            </div>
                          </div>

                          <div className="bg-white border border-slate-100 rounded-2xl p-5 text-left flex items-start gap-3 shadow-sm">
                            <div className="h-9 w-9 rounded-lg bg-teal-50 flex items-center justify-center text-[#0D9488] border border-teal-100 shrink-0 mt-0.5">
                              <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                                Multi-Bank Support
                              </h4>
                              <p className="text-slate-500 text-xs sm:text-sm mt-0.5 font-medium leading-relaxed">
                                We partner with leading financial providers to offer instant approvals and flexible tenures.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                          <a
                            href={`https://wa.me/${(mConfig.contact_whatsapp_number && mConfig.contact_whatsapp_number.trim() !== '') ? mConfig.contact_whatsapp_number.replace(/\s+/g, '') : contactInfo.whatsappRaw || '919924225500'}?text=${encodeURIComponent("Hello, most of my teeth are damaged or missing. I want to know about full mouth treatment.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer"
                          >
                            <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
                            <span>Check EMI Eligibility on WhatsApp</span>
                          </a>

                          <button
                            onClick={() => openAppointmentModal('Full Mouth Rehabilitation - Pricing')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                          >
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>Request Treatment Estimate</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 5: Phased Roadmap for Full Mouth Rehabilitation */}
                {isFullMouth && (
                  <div className="pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-timeline-section">
                    <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[28px] sm:rounded-[36px] p-6 sm:p-12 lg:p-14 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
                      {/* Heading area */}
                      <div className="space-y-3 max-w-2xl mx-auto text-center mb-10 sm:mb-14">
                        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                          <Clock className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                          Treatment Timeline
                        </span>
                        <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                          Your Full Mouth Reconstruction Roadmap
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center font-normal">
                          We divide complex full mouth rehabilitation into structured phases to ensure maximum precision, patient comfort, and long-term treatment success.
                        </p>
                        <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
                      </div>

                      {/* 4 horizontal numbered timeline steps */}
                      <div className="relative">
                        {/* Horizontal connector line on desktop/tablet */}
                        <div className="hidden md:block absolute top-[36px] left-[12.5%] right-[12.5%] h-[2px] bg-[#5eead4] z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                          {/* Step 1 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              1
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Comprehensive Planning
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              Complete planning including diagnostic records, 3D CBCT scans, and diagnostic mockups before starting treatment.
                            </p>
                          </div>

                          {/* Step 2 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              2
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Foundation Work & Preparation
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              Address root canal therapy, tooth extractions, and gum treatment as required.
                            </p>
                          </div>

                          {/* Step 3 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              3
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Implant Placement & Temporary Teeth
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              Secure implant placement and custom temporary restorations to preserve function and comfort.
                            </p>
                          </div>

                          {/* Step 4 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-[#0D9488] border-2 border-[#0D9488] flex items-center justify-center text-white font-bold text-xl mb-5 shadow-md">
                              4
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Final Custom Reconstruction
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              Custom final crown and bridge work to restore permanent natural appearance and chewing power.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 6: Risk Reversal / Patient Reassurance for Full Mouth Rehabilitation */}
                {isFullMouth && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-reassurance-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        REASSURANCE & TRANSPARENCY
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Our Reassurance for Your Full Mouth Reconstruction
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Rebuilding your smile is a major decision. We provide full clinical transparency, coordinated care, and ongoing support so you can feel completely secure at every step.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Point 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Full Clinical Transparency
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Full mouth rehabilitation combines multiple clinical treatments, each planned thoroughly with written documentation and transparent cost breakdowns before any work begins.
                        </p>
                      </div>

                      {/* Point 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Multi-disciplinary Care Coordination
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Your treatment plan is fully coordinated in-house under one clinic roof by our expert team. This ensures perfect synchronization and eliminates fragmented external referrals.
                        </p>
                      </div>

                      {/* Point 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Proactive Support & Follow-up
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          We outline a structured regimen of follow-ups and maintenance checks to monitor proper healing, bite accuracy, and ensure long-term functional stability.
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={() => openAppointmentModal('Full Mouth Rehabilitation - Reassurance')}
                        className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                      >
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span>Discuss Your Custom Treatment Plan</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Symptom Qualification Section for Dental Implants */}
                {isDentalImplants && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="symptom-qualification-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        You May Need Dental Implants If…
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-8 max-w-7xl mx-auto pt-8">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
                        {/* Left accent line */}
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          You Have One or More Missing Teeth
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          Missing teeth are affecting your smile, chewing, or confidence.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
                        {/* Left accent line */}
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Your Denture Feels Loose or Uncomfortable
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          You want a more stable and fixed alternative to removable dentures.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
                        {/* Left accent line */}
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          You Have a Damaged Tooth That Cannot Be Saved
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          A severely damaged or decayed tooth may need to be replaced.
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2 md:col-start-2">
                        {/* Left accent line */}
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          You Find It Difficult to Chew Properly
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          Missing teeth are making everyday eating uncomfortable or difficult.
                        </p>
                      </div>

                      {/* Card 5 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
                        {/* Left accent line */}
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          You Want a Long-Term Fixed Teeth Solution
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          You are looking for natural-looking replacement teeth designed for long-term function.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dental Implants Option Comparison Table Section */}
                {isDentalImplants && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="dental-implants-comparison-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        Option Comparison
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Dental Implants vs. Dental Bridge vs. Removable Dentures
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Compare tooth replacement options to understand why dental implants provide the highest standard of durability, jawbone health, and natural comfort.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-7xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[680px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Feature / Factor
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4 relative">
                                <div className="flex items-center justify-between gap-2">
                                  <span>Dental Implants</span>
                                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                                    Recommended
                                  </span>
                                </div>
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Dental Bridge
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Removable Dentures
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Support & Tooth Impact
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Self-supported root; zero damage to adjacent healthy teeth</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Requires cutting and grinding down healthy adjacent teeth
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Rests on gum ridge with clasps; can stress remaining teeth
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Durability & Lifespan
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Lifetime permanent solution with routine dental hygiene</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Typically lasts 7–10 years before requiring replacement
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Lasts 5–7 years; requires regular adjustments as jaw changes
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Jawbone Preservation
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Preserves natural jawbone & prevents facial sagging/shrinkage</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Does not prevent bone resorption under missing tooth area
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Accelerates bone loss over time due to surface pressure
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Chewing Efficiency
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>95%–100% natural bite force; eat all your favorite foods</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                60%–70% chewing efficiency; cautious with hard foods
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                20%–30% chewing power; significant restrictions on diet
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Stability & Comfort
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>100% permanently fixed; no slipping, clicking, or adhesives</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Fixed permanently, but food can lodge under bridge pontic
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Removable; prone to slipping, sore spots, and clicking
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Maintenance & Cleaning
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Regular daily brushing and flossing like natural teeth</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Requires special floss threaders under the bridge
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Must be removed nightly and soaked in cleaning solutions
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dental Implants Transparent Pricing Section */}
                {isDentalImplants && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="dental-implants-pricing-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        TRANSPARENT PRICING
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Dental Implant Cost & Pricing
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        The cost of dental implants depends on the number of missing teeth, type of implant treatment, bone condition, and whether additional procedures are required.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-4xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[540px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Treatment
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Starting Price
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Best For
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Single Tooth Implant
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Replacing one missing tooth
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Multiple Teeth Implants
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Replacing multiple missing teeth
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Full Mouth Dental Implants
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Full arch or complete teeth replacement
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
                          Your final treatment plan and cost will be determined after a clinical examination and treatment planning.
                        </p>
                        <button
                          onClick={() => openAppointmentModal('Dental Implants')}
                          className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                        >
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span>Get a Personalized Treatment Plan</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dental Implants Treatment Timeline Section */}
                {isDentalImplants && (
                  <div className="pt-6 sm:pt-14 border-t border-slate-200/60" id="dental-implants-timeline-section">
                    <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[28px] sm:rounded-[36px] p-6 sm:p-12 lg:p-14 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
                      {/* Heading area */}
                      <div className="space-y-3 max-w-2xl mx-auto text-center mb-10 sm:mb-14">
                        <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                          Your Dental Implant Treatment Timeline
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center font-normal">
                          Your treatment timeline depends on your oral condition, treatment plan, and whether any additional procedures are required.
                        </p>
                        <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
                      </div>

                      {/* 4 horizontal numbered timeline steps */}
                      <div className="relative">
                        {/* Horizontal connector line on desktop/tablet */}
                        <div className="hidden md:block absolute top-[36px] left-[12.5%] right-[12.5%] h-[2px] bg-[#5eead4] z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                          {/* Step 1 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              1
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Consultation & Assessment
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              Your teeth, gums, and jawbone are examined to determine the right implant treatment plan.
                            </p>
                          </div>

                          {/* Step 2 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              2
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Implant Placement
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              The dental implant is carefully placed in the planned position.
                            </p>
                          </div>

                          {/* Step 3 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              3
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Healing & Integration
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              The implant is given time to integrate with the jawbone for a stable foundation.
                            </p>
                          </div>

                          {/* Step 4 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-[#0D9488] border-2 border-[#0D9488] flex items-center justify-center text-white font-bold text-xl mb-5 shadow-md">
                              4
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Final Fixed Teeth
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              Your custom final teeth are placed to restore function, comfort, and appearance.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dental Implants Warranty & Patient Reassurance Section */}
                {isDentalImplants && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="dental-implants-warranty-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        WARRANTY & PATIENT REASSURANCE
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Your Dental Implant Treatment, Backed by Clear Reassurance
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        We believe patients should understand their treatment, expected care and warranty policy before proceeding. Our team is available to answer your questions and provide treatment details clearly.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Point 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Clear Warranty Policy
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Warranty terms and applicable conditions are explained clearly as part of your treatment planning.
                        </p>
                      </div>

                      {/* Point 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0">
                          <FileText className="h-5 w-5" />
                        </div>
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Personalised Treatment Planning
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Your implant treatment is planned according to your clinical condition, treatment requirements and long-term oral health.
                        </p>
                      </div>

                      {/* Point 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0">
                          <HelpCircle className="h-5 w-5" />
                        </div>
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Second-Opinion Reassurance
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Have questions or want another opinion? We are happy to discuss your treatment plan and help you make an informed decision.
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={() => openAppointmentModal('Dental Implants - Warranty Reassurance')}
                        className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                      >
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span>Contact Us for Details</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Section 2: Symptom Qualification for Root Canal */}
                {isRootCanal && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="symptom-qualification-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0D9488]" />
                        Symptom Qualification
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        You May Need a Root Canal If…
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-8 max-w-7xl mx-auto pt-8">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Severe, Throbbing Toothache
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          Persistent, pounding pain that worsens when lying down or applying chewing pressure.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Extreme Hot & Cold Sensitivity
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          Lingering pain that remains for minutes even after hot or cold food/drink is removed.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Gum Swelling & Tenderness
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          Tender, swollen, or dark gums near the painful tooth, sometimes with a pimple-like bump.
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2 md:col-start-2">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Pain When Chewing or Biting
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          Sharp, intense discomfort or inability to bite down on a specific tooth during meals.
                        </p>
                      </div>

                      {/* Card 5 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Tooth Discoloration or Darkening
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          A tooth that has turned grey, black, or dark, indicating the nerve inside has died or is dying.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 3: Option Comparison for Root Canal */}
                {isRootCanal && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="option-comparison-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        Option Comparison
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Single Sitting RCT vs. Other Options
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-7xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[680px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Feature / Factor
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4 relative">
                                <div className="flex items-center justify-between gap-2">
                                  <span>Single Sitting RCT</span>
                                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest whitespace-nowrap">
                                    Recommended
                                  </span>
                                </div>
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Multiple Visit RCT
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Tooth Extraction
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Visits Required
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>1 visit — Completed in 45–60 mins</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                3–4 visits — Requires multiple appointments
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                1 visit — Followed by months of replacement healing
                              </td>
                            </tr>

                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Success & Preservation
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>95%–98% — Saves natural tooth & bone</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                85%–90% — Higher risk of re-infection between visits
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                0% — Permanent loss of natural tooth structure
                              </td>
                            </tr>

                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Anesthesia & Comfort
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>1 injection — Minimized discomfort</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                3–4 injections — Recurrent needle stress & soreness
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                1 injection — Significant post-extraction socket pain
                              </td>
                            </tr>

                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Cross-Infection Risk
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Zero — Canal sealed immediately</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Moderate — Temporary fillings can leak saliva/bacteria
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Low — Risk of dry socket or localized bone infection
                              </td>
                            </tr>

                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Total Cost over 10 Years
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Contact Us for Pricing</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Highest — Requires expensive bridges/implants later
                              </td>
                            </tr>

                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Bite & Chewing Restored
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>100% natural bite & support restored</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                100% restored after final crown placement
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Permanent chewing loss; neighboring teeth shift
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 4: Transparent Pricing for Root Canal */}
                {isRootCanal && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="transparent-pricing-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        TRANSPARENT PRICING
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Transparent Single Sitting RCT Pricing
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        The cost of root canal treatment depends on tooth anatomy, location, infection severity, and whether permanent crowning or re-treatment is required.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-4xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[540px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Treatment
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Starting Price
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Best For
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Front tooth Root Canal Treatment
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Single-rooted anterior teeth (incisors & canines)
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Premolar Root Canal Treatment
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Mid-arch premolar teeth with 1–2 root canals
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Molar Root Canal Treatment
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Multi-rooted posterior molar teeth
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Root Canal Re-treatment
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Revision or re-treatment of previously treated canals
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Crown
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Long-term protection and reinforcement of root-treated teeth
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Root Canal + Crown bundled treatment
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Complete single-sitting RCT with permanent crown restoration
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
                          Your final treatment plan and cost will be determined after a clinical examination and diagnostic assessment.
                        </p>
                        <button
                          onClick={() => openAppointmentModal('Single Sitting Root Canal Treatment')}
                          className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                        >
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span>Get a Personalized Treatment Plan</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 5: Treatment Timeline for Root Canal */}
                {isRootCanal && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="timeline-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center mb-10 sm:mb-14">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Clock className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        TREATMENT TIMELINE
                      </span>
                      <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Your Root Canal Treatment Timeline
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-normal">
                        Treatment Timeline: <span className="font-bold text-[#0D9488]">Contact Us for Treatment Timeline</span>. Completed safely in a single efficient sitting.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                      <div className="relative">
                        {/* Horizontal connector line on desktop/tablet */}
                        <div className="hidden md:block absolute top-[36px] left-[12.5%] right-[12.5%] h-[2px] bg-[#5eead4] z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                          {/* Step 1 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              1
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Diagnosis & Digital X-Ray
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              3D CBCT imaging and digital X-rays precisely measure canal depth and verify infection boundaries.
                            </p>
                          </div>

                          {/* Step 2 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              2
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Precision Disinfection
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              Advanced Japanese rotary endo motors gently clean, shape, and fully sterilize infected canals instantly.
                            </p>
                          </div>

                          {/* Step 3 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              3
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Biocompatible Sealing
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              The disinfected root canal is sealed with high-grade, bio-compatible Gutta Percha or MTA sealer to seal out bacteria.
                            </p>
                          </div>

                          {/* Step 4 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-[#0D9488] border-2 border-[#0D9488] flex items-center justify-center text-white font-bold text-xl mb-5 shadow-md">
                              4
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Custom Crown Placement
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              A durable, custom-fabricated ceramic crown is placed over the treated tooth to restore full chewing power.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 6: Risk Reversal / Reassurance for Root Canal */}
                {isRootCanal && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="warranty-reassurance-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        REASSURANCE & TRANSPARENCY
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Our Reassurance to Save Your Natural Tooth
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Treating a severe toothache is an important choice. We provide absolute clinical clarity, comfortable modern anesthesia, and honest recommendations so you feel 100% secure.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Point 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Painless Treatment Protocol
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          We utilize computerized local anesthesia, fine needles, and specialized endodontic cooling irrigation to ensure your root canal treatment is completely comfortable and pain-free.
                        </p>
                      </div>

                      {/* Point 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Clinical Suitability Verification
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          We only perform single-sitting root canals on teeth that are clinically suited. If a multi-sitting approach is safer for deep chronic bone infections, we will advise you honestly.
                        </p>
                      </div>

                      {/* Point 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Second-Opinion Reassurance
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Have questions or want another opinion about whether your tooth can be saved? We are happy to review your digital X-rays and help you make a fully informed decision.
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={() => {
                          window.location.href = `tel:${mConfig.phone_number || "+919510397046"}`;
                        }}
                        className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                      >
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span>Discuss Your Custom Treatment Plan</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Section 5: Interactive Before & After Smile Transformations */}
                {mConfig.show_before_after !== false && beforeAfterPairs.length > 0 && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="before-after-gallery-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        Transformations
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {seoHeadings.transformations}
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-medium font-sans">
                        {mConfig.before_after_description || (isToothColouredFilling ? 'See real composite filling tooth restoration results.' : isWisdomToothSurgery ? 'See real smile transformations of our wisdom tooth surgery patients.' : isBracesTreatment ? 'See real smile transformations of our braces treatment patients.' : isSmileMakeover ? 'See real smile transformations of our smile makeover patients.' : isInvisibleAligners ? 'See real smile transformations of our invisible aligners patients.' : isFullMouth ? 'See real smile transformations of our full mouth rehabilitation patients.' : 'See real smile transformations of our patients.')}
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-start max-w-7xl mx-auto">
                      {beforeAfterPairs.map((pair, pIdx) => (
                        <div 
                          key={pair.id || pIdx} 
                          className="bg-white border border-[#E5EEF5] rounded-[20px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_12px_24px_rgba(8,28,58,0.08)] hover:border-[#B9D1E6] transition-all duration-300"
                        >
                          <BeforeAfterSlider
                            beforeImage={pair.before_image}
                            afterImage={pair.after_image}
                            caption={pair.caption}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 6: Clinical Case Gallery */}
                {mConfig.show_gallery !== false && (
                  <ClinicalCaseGallery
                    heading={seoHeadings.caseGallery}
                    description={mConfig.gallery_description}
                    items={Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery}
                    singleGallery={isRootCanal || isFullMouth || isInvisibleAligners || isSmileMakeover || isCrownsAndBridges || isTeethWhitening || isPediatricDentistry || isBracesTreatment || isWisdomToothSurgery || isToothColouredFilling}
                  />
                )}

                {/* Section 6: Procedure Video (Loaded dynamically from CMS Instagram Reel) */}
                {videoElement}

                {/* Section 7: Patient Testimonial Reels */}
                {testimonialsElement}

                {/* Section 10: Google Patient Reviews (100% CMS-driven premium slider) */}
                {mConfig.show_google_reviews !== false && (
                  <GooglePatientReviews
                    heading={seoHeadings.reviews}
                    reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
                  />
                )}

                {/* Section 8: The Reconstruction Team for Full Mouth Rehabilitation */}
                {isFullMouth && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-team-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50/90 border border-teal-100/60 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                        <Users className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        THE RECONSTRUCTION TEAM
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Led by Dr. Vipul Patel & Clinical Team
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Full mouth rehabilitation is highly complex and requires expert planning. Dr. Vipul Patel personally plans your entire reconstruction to ensure correct bite function, joint harmony, and muscular symmetry.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto items-stretch pt-4">
                      {/* Left: Dr. Vipul Patel Main Card */}
                      <div className="lg:col-span-7 bg-white border border-[#E8EEF5] rounded-[28px] p-6 sm:p-8 md:p-10 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] hover:border-[#14B8A6] transition-all duration-300 flex flex-col md:flex-row gap-6 sm:gap-8 relative overflow-hidden">
                        <div className="absolute left-0 top-10 bottom-10 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        
                        {/* Profile Image Column */}
                        <div className="w-full md:w-2/5 shrink-0">
                          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative">
                            <img 
                              src={drVipulImg} 
                              alt="Dr. Vipul Patel"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>

                        {/* Details Column */}
                        <div className="flex flex-col justify-between space-y-4 text-left">
                          <div className="space-y-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-teal-50 text-[#0D9488] text-xs font-semibold uppercase tracking-wider border border-teal-100/40">
                              Chief Implantologist
                            </span>
                            <h3 className="font-sans font-black text-[#081C3A] text-2xl tracking-tight">
                              Dr. Vipul Patel
                            </h3>
                            <p className="text-slate-500 text-xs sm:text-sm font-semibold uppercase tracking-wider leading-snug">
                              MDS, Masters in Implantology (USA)
                            </p>
                            <div className="h-[1px] bg-slate-100 w-full pt-1" />
                          </div>

                          <div className="space-y-3 flex-1">
                            <div className="flex items-start gap-2 text-slate-600 text-xs sm:text-sm">
                              <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                              <span>Completed Masters in Implantology (USA) with extensive advanced surgery training.</span>
                            </div>
                            <div className="flex items-start gap-2 text-slate-600 text-xs sm:text-sm">
                              <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                              <span>Over 14 years of implant surgery and complex full mouth rehabilitation experience.</span>
                            </div>
                            <div className="flex items-start gap-2 text-slate-600 text-xs sm:text-sm">
                              <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                              <span>Active Life Member of Indian Society of Oral Implantology (ISOI).</span>
                            </div>
                          </div>

                          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <span className="inline-flex items-center gap-1.5 text-xs text-[#0D9488] font-bold tracking-wide">
                              <Award className="h-4 w-4 shrink-0" />
                              Certified USA Diplomate & Fellow
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if (setCurrentPage) {
                                  setCurrentPage('doctors');
                                }
                                window.location.hash = 'doctors';
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="px-4 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-[11px] font-black uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition-all duration-300 cursor-pointer text-center"
                            >
                              LEARN MORE
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right: FMR-specific supporting cards */}
                      <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                        {/* Bullet 1: Both surgeons, every case */}
                        <div className="bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-6 shadow-[0_12px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] hover:border-[#14B8A6]/60 transition-all duration-300 flex items-start gap-4 text-left relative overflow-hidden">
                          <div className="absolute left-0 top-4 bottom-4 w-[4px] rounded-r-[4px] bg-[#14B8A6]" />
                          <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] border border-teal-100/60 shrink-0 mt-0.5">
                            <Stethoscope className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-sans font-bold text-[#081C3A] text-base leading-snug">
                              Both Surgeons, Every Case
                            </h4>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                              Your treatment is planned and performed collaboratively by our clinical leadership: Dr. Vipul Patel (MDS) and Dr. Kinjal Patel (BDS).
                            </p>
                          </div>
                        </div>

                        {/* Bullet 2: One coordinated plan */}
                        <div className="bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-6 shadow-[0_12px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] hover:border-[#14B8A6]/60 transition-all duration-300 flex items-start gap-4 text-left relative overflow-hidden">
                          <div className="absolute left-0 top-4 bottom-4 w-[4px] rounded-r-[4px] bg-[#14B8A6]" />
                          <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] border border-teal-100/60 shrink-0 mt-0.5">
                            <Layers className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-sans font-bold text-[#081C3A] text-base leading-snug">
                              One Coordinated Plan
                            </h4>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                              Your full-mouth reconstruction is designed as a single coordinated workflow to ensure correct bite function, joint alignment, and consistent smile symmetry.
                            </p>
                          </div>
                        </div>

                        {/* Bullet 3: Written cost, honoured */}
                        <div className="bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-6 shadow-[0_12px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] hover:border-[#14B8A6]/60 transition-all duration-300 flex items-start gap-4 text-left relative overflow-hidden">
                          <div className="absolute left-0 top-4 bottom-4 w-[4px] rounded-r-[4px] bg-[#14B8A6]" />
                          <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] border border-teal-100/60 shrink-0 mt-0.5">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-sans font-bold text-[#081C3A] text-base leading-snug">
                              Written Cost, Honoured
                            </h4>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                              Receive an itemised, completely transparent written treatment estimate before we begin. No hidden charges, completely predictable investment.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 9: Advanced Rehabilitation Technology for Full Mouth Rehabilitation */}
                {isFullMouth && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-technology-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50/90 border border-teal-100/60 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        ADVANCED REHABILITATION TECHNOLOGY
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Precision Digital Technology Designed Around Your Treatment
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Digital diagnostic mapping and CAD/CAM fabrication help your treatment team execute your full mouth rehabilitation with greater safety, comfort, and perfect bite alignment.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          3D CBCT Scan & Mapping
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Full 3D mapping of jawbone depth, density, and nerve pathways to plan optimal implant anchors and avoid critical anatomical structures.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Digital Intraoral Scanners
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Replaces messy physical mouth molds with a seamless, highly precise 3D digital scanner to capture comfortable, ultra-accurate models of your mouth.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          In-House CAD/CAM Milling
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Our clinical lab designs and mills premium, highly biological zirconia arches with computer-aided manufacturing for seamless, heavy-duty durability.
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Bite Height & TMJ Diagnostics
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Advanced diagnostics to measure jaw joint orientation, ensuring your new teeth restore your optimal biological bite height and relieve TMJ stress.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dental Implants: Why Patel Dental / Why This Doctor Section */}
                {isDentalImplants && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="dental-implants-why-patel-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        WHY PATEL DENTAL
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Advanced Implant Expertise Focused on Your Treatment
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Your dental implant treatment is planned with advanced implantology expertise, digital planning and techniques designed to provide precise, personalised care.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Advanced Oral Implantology
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Immediate loading and complete fixed-teeth replacement approaches planned according to your clinical needs.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Digital & Guided Implant Planning
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Digital planning and guided surgical techniques help the team plan implant placement with greater precision.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Bone Grafting & Sinus Lift Expertise
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Advanced bone-regeneration and sinus-augmentation techniques are available when additional preparation is required.
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Immediate Loading & Fixed Teeth
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Specialised implant protocols support fixed-teeth treatment options where clinically appropriate.
                        </p>
                      </div>
                    </div>

                    {/* Bottom Reassurance */}
                    <div className="max-w-3xl mx-auto text-center pt-2">
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        Your treatment plan is personalised after clinical examination and appropriate diagnostic assessment.
                      </p>
                    </div>
                  </div>
                )}

                {/* Dental Implants: Technology — Patient Benefit Section */}
                {isDentalImplants && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="dental-implants-technology-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        ADVANCED IMPLANT TECHNOLOGY
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Advanced Technology Designed Around Your Implant Treatment
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Digital planning and guided implant techniques help your treatment team plan implant placement with greater precision and a more controlled surgical approach.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0">
                          <Cpu className="h-5 w-5" />
                        </div>
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Digital & Guided Surgery
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Digital planning and guided surgery support precise implant placement and help create a more controlled treatment approach.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0">
                          <Activity className="h-5 w-5" />
                        </div>
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          CBCT-Based Digital Workflow
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          CBCT-based digital planning helps the treatment team assess the implant site and plan the surgical workflow before treatment.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Immediate Loading Protocols
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Advanced immediate-loading protocols can support fixed teeth solutions when clinically appropriate.
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0">
                          <Layers className="h-5 w-5" />
                        </div>
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Bone & Soft Tissue Planning
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Advanced bone and soft-tissue techniques help prepare challenging implant sites when additional treatment is required.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 8: Why Patel Dental Hospital / Root Canal Specialists */}
                {isRootCanal && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="root-canal-why-patel-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        ENDODONTIC SPECIALIST CARE
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Why Choose Patel Dental Hospital for Your Root Canal
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Root canal treatment requires high precision, specialized rotary instruments, and digital accuracy to ensure complete canal disinfection and long-term tooth preservation.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Single Sitting Efficiency
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Most root canal cases are completed in a single comfortable visit using advanced Japanese rotary endodontic systems.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Gentle & Painless Care
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Profound local anaesthesia and gentle treatment techniques ensure you remain completely relaxed and pain-free throughout.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Digital Apex Precision
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Electronic apex locators measure root canal depth with sub-millimeter precision, eliminating guesswork and preventing over-instrumentation.
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Permanent Crown Restoration
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          High-strength custom zirconia or ceramic crowns protect the treated tooth against fractures and restore 100% natural chewing strength.
                        </p>
                      </div>
                    </div>

                    {/* Bottom Reassurance */}
                    <div className="max-w-3xl mx-auto text-center pt-2">
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        Every root canal is performed with strict sterilization and isolated working fields for the highest success rate.
                      </p>
                    </div>
                  </div>
                )}

                {/* Section 9: Advanced Endodontic Technology */}
                {isRootCanal && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="root-canal-technology-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        ADVANCED ENDODONTIC TECHNOLOGY
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Precision Technology Designed for Painless, Accurate Root Canals
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Our modern endodontic equipment enables faster, safer, and more thorough canal disinfection to save your natural tooth with predictable long-term results.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Japanese Rotary Endo Motors
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Ultra-smooth, torque-controlled rotary instrumentation allows quick, quiet, and highly comfortable canal shaping in a single sitting.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Digital Apex Locators
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Real-time electronic depth monitoring accurately determines the root apex location for complete cleaning down to the exact millimeter.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Low-Radiation Digital RVG
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Instant high-definition digital sensor imaging provides clear visualization of curved roots and bone healing with minimal radiation exposure.
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Sonic & Ultrasonic Irrigation
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Acoustic micro-streaming activates disinfectants deep into microscopic lateral canals, eliminating bacteria and preventing reinfection.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 11: FAQ Accordion */}
                {faqElement}

                {/* Section 12: Bottom CTA */}
                {bottomCtaElement}

                {/* Section 13: Related Services (FINAL CONTENT SECTION, immediately ABOVE Footer) */}
                {relatedServicesElement}
              </div>
            );
          }

          return (
            <div className="space-y-8 sm:space-y-16 lg:space-y-20">
              {heroElement}
              {featuredVideoElement}

              {/* Section 5: Interactive Before & After Smile Transformations */}
              {mConfig.show_before_after !== false && beforeAfterPairs.length > 0 && (
                <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="before-after-gallery-section">
                  <div className="space-y-3 max-w-3xl mx-auto text-center">
                    <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                      <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                      Transformations
                    </span>
                    <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                      {seoHeadings.transformations}
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-medium font-sans">
                      {mConfig.before_after_description || (isToothColouredFilling ? 'See real composite filling tooth restoration results.' : isWisdomToothSurgery ? 'See real smile transformations of our wisdom tooth surgery patients.' : isBracesTreatment ? 'See real smile transformations of our braces treatment patients.' : isSmileMakeover ? 'See real smile transformations of our smile makeover patients.' : isInvisibleAligners ? 'See real smile transformations of our invisible aligners patients.' : isFullMouth ? 'See real smile transformations of our full mouth rehabilitation patients.' : 'See real smile transformations of our patients.')}
                    </p>
                    <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-start max-w-7xl mx-auto">
                    {beforeAfterPairs.map((pair, pIdx) => (
                      <div 
                        key={pair.id || pIdx} 
                        className="bg-white border border-[#E5EEF5] rounded-[20px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_12px_24px_rgba(8,28,58,0.08)] hover:border-[#B9D1E6] transition-all duration-300"
                      >
                        <BeforeAfterSlider
                          beforeImage={pair.before_image}
                          afterImage={pair.after_image}
                          caption={pair.caption}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 6: Clinical Case Gallery */}
              {galleryElement}

              {/* Section 6: Procedure Video (Loaded dynamically from CMS Instagram Reel) */}
              {videoElement}

              {/* Section 7: Patient Testimonial Reels */}
              {testimonialsElement}

              {/* Section 10: Google Patient Reviews (100% CMS-driven premium slider) */}
              {mConfig.show_google_reviews !== false && (
                <GooglePatientReviews
                  heading={seoHeadings.reviews}
                  reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
                />
              )}
            </div>
          );
        })()}

      </div>

      {/* 7. Image Lightbox Modal with Framer Motion */}
      <AnimatePresence>
        {lightboxIndex !== null && displayGallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 cursor-zoom-out select-none"
          >
            {/* Lightbox Header Controls */}
            <div className="w-full max-w-5xl mx-auto flex items-center justify-between text-white py-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                IMAGE {lightboxIndex + 1} OF {displayGallery.length}
              </span>
              <button
                onClick={closeLightbox}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white cursor-pointer focus:outline-none"
                title="Close overlay"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Image Stage */}
            <div className="flex-1 flex items-center justify-center max-w-5xl mx-auto w-full relative">
              {/* Prev Button */}
              <button
                onClick={prevLightboxImage}
                className="absolute left-0 p-3 bg-white/10 hover:bg-white/20 active:scale-95 rounded-full text-white transition-all cursor-pointer focus:outline-none z-10"
                title="Previous case image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
                src={displayGallery[lightboxIndex].image_url}
                alt={displayGallery[lightboxIndex].caption || service.title}
                className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl"
                referrerPolicy="no-referrer"
              />

              {/* Next Button */}
              <button
                onClick={nextLightboxImage}
                className="absolute right-0 p-3 bg-white/10 hover:bg-white/20 active:scale-95 rounded-full text-white transition-all cursor-pointer focus:outline-none z-10"
                title="Next case image"
              >
                <ChevronLeft className="h-6 w-6 rotate-180" />
              </button>
            </div>

            {/* Lightbox Footer Captions */}
            <div className="w-full max-w-3xl mx-auto text-center py-4 space-y-1">
              <p className="text-sm font-bold text-white tracking-wide">
                {displayGallery[lightboxIndex].caption || `${service.title} - Treatment Case Result`}
              </p>
              {displayGallery[lightboxIndex].alt_text && (
                <p className="text-xs text-slate-400">
                  {displayGallery[lightboxIndex].alt_text}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
