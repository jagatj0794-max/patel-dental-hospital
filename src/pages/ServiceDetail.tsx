/**
 * @license
 * Copyright © 2026 Patel Dental Hospital (રાજકોટ / Rajkot).
 * All Rights Reserved.
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
import { dentalImplantsFaqs, fullMouthFaqs, invisibleAlignersFaqs, rootCanalFaqs, smileMakeoverFaqs, crownsBridgesFaqs } from '../data/serviceFaqs';
import { contactService, DEFAULT_CONTACT_INFO } from '../utils/contactData';
import { doctorService } from '../utils/doctorData';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { ClinicalCaseGallery } from '../components/ClinicalCaseGallery';
import { InstagramEmbed } from '../components/InstagramEmbed';
import { Mp4ReelPlayer } from '../components/Mp4ReelPlayer';
import { GooglePatientReviews } from '../components/GooglePatientReviews';
import { RootCanalView } from '../components/service/RootCanalView';
import { FullMouthRehabView } from '../components/service/FullMouthRehabView';
import { DentalImplantsView } from '../components/service/DentalImplantsView';
import { InvisibleAlignersView } from '../components/service/InvisibleAlignersView';
import { SmileMakeoverView } from '../components/service/SmileMakeoverView';
import { useSEO } from '../utils/seo';
import { getServiceSEO } from '../utils/serviceSeoData';
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
          title: 'Gaps / Spaces Between Teeth',
          description: 'Visible spaces (diastema) between front teeth affecting your confidence and smile symmetry.',
          display_order: 10
        },
        {
          id: 'cand-2',
          title: 'Chipped or Broken Teeth',
          description: 'Wear and tear, trauma, or minor fractures on front teeth that need seamless aesthetic repair.',
          display_order: 20
        },
        {
          id: 'cand-3',
          title: 'Deep Stains or Discoloration',
          description: 'Fluorosis, medication stains, or aging tooth discoloration resistant to standard whitening.',
          display_order: 30
        },
        {
          id: 'cand-4',
          title: 'Uneven or Worn Teeth',
          description: 'Irregular tooth lengths, jagged edges, or asymmetric smile lines that need harmonious proportioning.',
          display_order: 40
        }
      ];
    }
    return [];
  }, [mConfig, service, fallback, isFullMouth, isSmileMakeover]);

  const displayTeamPhotos = React.useMemo(() => {
    let list: any[] = [];
    if (isNewArchitecture && Array.isArray(mConfig.team_photos) && mConfig.team_photos.length > 0) {
      list = mConfig.team_photos;
    } else if (Array.isArray(mConfig.hospital_photos) && mConfig.hospital_photos.length > 0) {
      list = mConfig.hospital_photos;
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
  }, [service, mConfig, isNewArchitecture]);

  const displayTestimonials = React.useMemo(() => {
    if (isNewArchitecture && Array.isArray(mConfig.testimonials) && mConfig.testimonials.length > 0) {
      return mConfig.testimonials;
    }
    return Array.isArray(mConfig.testimonials) ? mConfig.testimonials : [];
  }, [mConfig, isNewArchitecture]);

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
                            <span>Send a photo of your teeth  -  get your aligner plan</span>
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
                            <span>CALL NOW  -  SAME-DAY APPOINTMENT</span>
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
                          Digital Smile Design shows you exactly what we're planning before we touch your teeth. Try the shape and length in a physical mock-up. Approve it, adjust it, or walk away  -  no pressure.
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
                            <span>Send a smile photo on WhatsApp  -  get a digital preview</span>
                          </a>
                        </div>
                      </>
                    ) : isCrownsAndBridges ? (
                      <>
                        <div className="space-y-3">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full border border-teal-100/50">
                            CROWNS & BRIDGES
                          </span>
                          
                          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] text-[#081C3A] tracking-tight leading-[1.15]">
                            Crowns & Bridges in Rajkot
                          </h1>
                        </div>

                        <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                          Custom-shaded, precision-fitted restorations that chew like your own tooth. We'll explain the honest difference between materials  -  including when the cheaper option is the right one.
                        </p>

                        {/* PROOF BAR */}
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 py-3 px-4 bg-slate-50 border border-slate-100 rounded-2xl w-fit">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">Digital shade matching</span>
                          </div>
                          <span className="hidden sm:inline text-slate-300 font-light">|</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">Metal-free zirconia available</span>
                          </div>
                          <span className="hidden sm:inline text-slate-300 font-light">|</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">Warranty</span>
                          </div>
                          <span className="hidden sm:inline text-slate-300 font-light">|</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                            <span className="text-xs font-black text-[#081C3A] tracking-tight">2 visits</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                          <button
                            type="button"
                            onClick={() => openAppointmentModal("Crowns & Bridges - Hero CTA")}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50"
                          >
                            <Calendar className="h-4 w-4" />
                            <span>Get your crown options & cost</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </button>

                          <a
                            href={`https://wa.me/${(mConfig.contact_whatsapp_number && mConfig.contact_whatsapp_number.trim() !== '') ? mConfig.contact_whatsapp_number.replace(/\s+/g, '') : contactInfo.whatsappRaw || '919924225500'}?text=${encodeURIComponent("Hello, I want to know about Crowns & Bridges treatment options and cost. Here is my dental X-ray:")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 whitespace-nowrap"
                          >
                            <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
                            <span>WHATSAPP US</span>
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

          const displayFaqs = isDentalImplants ? dentalImplantsFaqs : isRootCanal ? rootCanalFaqs : isFullMouth ? fullMouthFaqs : isInvisibleAligners ? invisibleAlignersFaqs : isSmileMakeover ? smileMakeoverFaqs : isCrownsAndBridges ? crownsBridgesFaqs : faqs;

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
            ) : isCrownsAndBridges ? (
              <div className="bg-white border border-slate-200/80 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-14 shadow-sm space-y-8 sm:space-y-10" id="cms-section-faq">
                {/* Header */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60">
                      CROWNS & BRIDGES FAQ
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight">
                    Frequently Asked Questions About Crowns & Bridges
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

          const crownsBridgesRelatedCards = [
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
            },
            {
              slug: 'smile-makeover',
              title: 'Smile Makeover',
              description: 'Improve the appearance, shade, shape, and overall harmony of your smile with personalized cosmetic dental solutions.',
              image: getServiceHeroImage('smile-makeover')
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
            ) : isCrownsAndBridges ? (
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
                  {crownsBridgesRelatedCards.map((card) => (
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

          const crownsBridgesWhatsAppUrl = (() => {
            const num = (mConfig.contact_whatsapp_number && mConfig.contact_whatsapp_number.trim() !== '')
              ? mConfig.contact_whatsapp_number.replace(/\s+/g, '')
              : contactInfo.whatsappRaw || '919924225500';
            const text = "Hello, I want to know about dental crown and bridge options and costs for my teeth.";
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
                    <span>CALL NOW  -  SAME-DAY APPOINTMENT</span>
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
                    Send us your OPG on WhatsApp and receive an indicative plan and cost range within 24 hours  -  before you visit.
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
                    Send a smile photo on WhatsApp to get your digital smile preview and try a physical mock-up in your mouth before tooth preparation  -  no pressure.
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
                    <span>Send a smile photo on WhatsApp  -  get a digital preview</span>
                  </a>
                </div>
              </div>
            ) : isCrownsAndBridges ? (
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
                      CUSTOM RESTORATION CONSULTATION
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-4xl lg:text-[42px] text-white tracking-tight leading-[1.2] max-w-2xl mx-auto">
                    Get Your Crown Options & Cost
                  </h2>
                  <p className="text-slate-300/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium font-sans">
                    Schedule a clinical evaluation with our dental specialists in Rajkot to explore the most suitable crown and bridge materials for your teeth.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 relative z-10 pt-2">
                  <button
                    onClick={() => {
                      openAppointmentModal('Crowns & Bridges - Closing CTA');
                    }}
                    className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>BOOK YOUR APPOINTMENT</span>
                    <ArrowRight className="h-4 w-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <a
                    href={crownsBridgesWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 fill-white text-[#22C55E]" />
                    <span>Chat on WhatsApp</span>
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
            if (isCrownsAndBridges) {
              return (
                <div className="space-y-8 sm:space-y-16 lg:space-y-20">
                  {heroElement}

                  {/* Section 2: Symptom Qualification */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="symptom-qualification-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0D9488]" />
                        Candidate Check
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Are You a Candidate for a Crown or Bridge?
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Crowns and bridges are designed to solve specific dental structural and functional issues. See if your current tooth condition qualifies:
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto pt-8">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-8 md:p-10 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-8 sm:bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[24px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Weak or Broken Tooth
                        </h3>
                        <p className="text-[#475569] text-sm sm:text-base leading-[1.6] font-medium flex-1">
                          Your tooth is heavily decayed, fractured, or has a large filling that is failing. A crown completely caps the tooth, restoring its strength and protecting it from cracking.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-8 md:p-10 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-8 sm:bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[24px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          After Root Canal Treatment
                        </h3>
                        <p className="text-[#475569] text-sm sm:text-base leading-[1.6] font-medium flex-1">
                          Once a root canal removes the infected nerve, the remaining tooth becomes brittle and prone to fracturing. A crown is essential to seal the tooth and handle chewing forces.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-8 md:p-10 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-8 sm:bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[24px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Missing One or More Teeth
                        </h3>
                        <p className="text-[#475569] text-sm sm:text-base leading-[1.6] font-medium flex-1">
                          You have a gap from a missing tooth, causing adjacent teeth to drift and altering your bite. A dental bridge uses adjacent teeth as anchors to securely fill the empty space.
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-8 md:p-10 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-8 sm:bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[24px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Cosmetic Tooth Wear
                        </h3>
                        <p className="text-[#475569] text-sm sm:text-base leading-[1.6] font-medium flex-1">
                          Severely worn, discolored, or misshapen teeth that affect your smile. Custom ceramic or zirconia crowns can restore a natural, beautifully aligned appearance.
                        </p>
                      </div>
                    </div>
                  </div>

                  
                  {/* Section 3: Material Comparison */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="material-comparison-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Layers className="h-3.5 w-3.5 text-[#0D9488]" />
                        Material Options
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Compare Crown & Bridge Materials
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Different materials serve different clinical purposes. We help you choose based on durability, aesthetics, and location in your mouth:
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
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Metal-Ceramic (PFM)
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4 relative">
                                <div className="flex items-center justify-between gap-2">
                                  <span>Zirconia</span>
                                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest whitespace-nowrap">
                                    Popular Choice
                                  </span>
                                </div>
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                E-max
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            {/* Row 1: Best For */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Best For
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Back teeth (molars) where chewing force is high and aesthetic demand is moderate.
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Both front (highly visible) and back teeth (high load molars).</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Front teeth (incisors and canines) requiring the absolute highest level of cosmetic match.
                              </td>
                            </tr>

                            {/* Row 2: Appearance */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Appearance
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                <div className="flex items-start gap-2">
                                  <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                                  <span>Moderate aesthetics; a thin dark metal line may become visible near the gumline over time as gums naturally recede.</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>High aesthetics; natural light-reflection, biocompatible, and completely metal-free.</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Elite aesthetics; mimics natural enamel translucency perfectly, completely metal-free for premium aesthetics.</span>
                                </div>
                              </td>
                            </tr>

                            {/* Row 3: Strength */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Strength
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Highly durable, cost-effective, proven long-term track record.
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Virtually indestructible, solid monolithic strength.</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Strong, but slightly less chip-resistant than solid monolithic zirconia under heavy grinding.
                              </td>
                            </tr>

                            {/* Row 4: MRI-safe */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                MRI-safe
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                No (contains metal core)
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Yes (completely metal-free)</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Yes (completely metal-free)
                              </td>
                            </tr>

                            {/* Row 5: Tooth removal required */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Tooth removal required
                              </td>
                              <td className="p-4 sm:p-5 text-[#0D9488] font-bold">
                                Contact Us for Details
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Details
                              </td>
                              <td className="p-4 sm:p-5 text-[#0D9488] font-bold">
                                Contact Us for Details
                              </td>
                            </tr>

                            {/* Row 6: Lifespan */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Lifespan
                              </td>
                              <td className="p-4 sm:p-5 text-[#0D9488] font-bold">
                                Contact Us for Details
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Details
                              </td>
                              <td className="p-4 sm:p-5 text-[#0D9488] font-bold">
                                Contact Us for Details
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* Section 4: Transparent Pricing Table */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="pricing-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        Transparent Pricing
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Transparent, Honest Pricing
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        No hidden charges. We believe in providing clear upfront costs so you can make an informed decision for your oral health.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-4xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[540px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Material Type
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Pricing
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Warranty
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Best For
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Metal Fused Ceramic Crown
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-semibold">
                                Warranty
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Classic durable option for chewing strength & back teeth
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Solid Monolithic Zirconia Crown
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-semibold">
                                Warranty
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Premium chip-resistant strength for high load molars & longevity
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Ultra-Aesthetic Layered Zirconia
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-semibold">
                                Warranty
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Elite natural look for highly visible front teeth
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
                          All plans include consultation, clinical fitting, and custom bite-matching adjustments by our specialists.
                        </p>
                        <button
                          type="button"
                          onClick={() => openAppointmentModal("Crowns & Bridges Pricing - Consultation")}
                          className="w-full sm:w-auto px-5 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-300"
                        >
                          Book Free Consultation
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Timeline */}
                  <div className="pt-6 sm:pt-14 border-t border-slate-200/60" id="timeline-section">
                    <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[28px] sm:rounded-[36px] p-6 sm:p-12 lg:p-14 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
                      <div className="space-y-3 max-w-2xl mx-auto text-center mb-10 sm:mb-14">
                        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                          <Clock className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                          TREATMENT TIMELINE
                        </span>
                        <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                          Your Treatment Timeline
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center font-normal">
                          Two comfortable appointments spaced over a few days are all it takes to fully restore your smile. Here is what to expect:
                        </p>
                        <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
                      </div>

                      <div className="relative">
                        <div className="hidden md:block absolute top-[36px] left-[12.5%] right-[12.5%] h-[2px] bg-[#5eead4] z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                          {/* Step 1 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              1
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Preparation & Scan (Visit 1)
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              We gently prepare the tooth, capture a precise digital impression using our high-definition 3D scanner, select your custom tooth shade, and place a temporary crown.
                            </p>
                          </div>

                          {/* Step 2 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              2
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Lab Fabrication (In-Between)
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              Our state-of-the-art dental laboratory uses computer-aided design and milling (CAD/CAM) to sculpt your custom restoration from high-grade zirconia or ceramic.
                            </p>
                          </div>

                          {/* Step 3 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              3
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Bonding & Fitting (Visit 2)
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              We remove the temporary crown, verify the fit, bite alignment, and color match of your permanent restoration, and securely bond it in place.
                            </p>
                          </div>

                          {/* Step 4 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              4
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Follow-Up & Care (Aftercare)
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              A routine check-up to ensure your bite feels natural and your gums are adapting comfortably, accompanied by simple care instructions for maximum longevity.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 6: Quality Commitments */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="commitments-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Shield className="h-3.5 w-3.5 text-[#0D9488]" />
                        Commitment to Quality
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Our Quality & Durability Commitments
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        We stand behind our crowns and bridges. Every restoration is crafted using biocompatible, certified materials from leading global manufacturers to ensure maximum durability, safety, and comfort.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto pt-8">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-8 sm:bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-4 leading-tight">
                          Genuine Certified Materials
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          We only use original, FDA-approved materials from internationally recognized manufacturers (such as Ivoclar, 3M, and Vita). Every premium crown comes with an official authenticity card.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-8 sm:bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-4 leading-tight">
                          Specialist Precision Fit
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Your crowns and bridges are designed and fitted under the care of specialized prosthodontists. We use digital scanning and computer-aided design (CAD/CAM) to ensure micron-level margin accuracy.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-8 sm:bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-4 leading-tight">
                          Bite & Comfort Guarantee
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Your chewing comfort is our priority. If you feel any minor bite discomfort or high points after placement, we provide complimentary, precise bite adjustments until it feels completely natural.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 7+: standard content elements */}
                  {mConfig.show_before_after !== false && beforeAfterPairs.length > 0 && (
                    <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="before-after-gallery-section">
                      <div className="space-y-3 max-w-3xl mx-auto text-center">
                        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                          <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                          BEFORE & AFTER TRANSFORMATIONS
                        </span>
                        <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight text-center">
                          {seoHeadings.transformations}
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-medium font-sans">
                          {mConfig.before_after_description || "See real smile transformations of our patients."}
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

                  {mConfig.show_gallery !== false && (
                    <ClinicalCaseGallery
                      heading={seoHeadings.caseGallery}
                      description={mConfig.gallery_description}
                      items={Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery}
                      singleGallery={true}
                    />
                  )}

                  {videoElement}
                  {testimonialsElement}

                  {mConfig.show_google_reviews !== false && (
                    <GooglePatientReviews
                      heading={seoHeadings.reviews}
                      reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
                    />
                  )}

                  {/* Section 8: Why Patel Dental Hospital for Crowns & Bridges */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="crowns-bridges-why-patel-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        PROSTHODONTIC & RESTORATIVE CARE
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Why Choose Patel Dental Hospital for Your Crowns & Bridges
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        We combine honest material recommendations, digital scanning accuracy, and custom CAD/CAM craftsmanship to deliver long-lasting, natural-looking restorations tailored to your specific tooth and chewing needs.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Honest Material Guidance
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          We clearly explain the pros and cons of each material (PFM, Monolithic Zirconia, Layered Zirconia, and E-max), helping you choose the right balance of strength, aesthetics, and budget without upselling.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Digital Shade Matching
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Advanced shade-matching protocols analyze your adjacent teeth, enamel translucency, and natural contours so your crown or bridge blends seamlessly with your smile.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Precision CAD/CAM Fit
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Computer-aided design and milling ensure micron-level margin fit, eliminating gaps, preventing food lodgement, and protecting the underlying tooth against secondary decay.
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Balanced Bite & Function
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Every crown and bridge is customized to harmonize with your natural bite dynamics, ensuring optimal chewing comfort, joint alignment, and long-term durability.
                        </p>
                      </div>
                    </div>

                    {/* Bottom Reassurance */}
                    <div className="max-w-3xl mx-auto text-center pt-2">
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        We guide you toward the most conservative, durable option for your tooth — explaining when a lower-cost material is completely appropriate.
                      </p>
                    </div>
                  </div>

                  {/* Section 9: Advanced Restorative Technology */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="crowns-bridges-technology-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        PRECISION RESTORATIVE TECHNOLOGY
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Advanced Technology Designed for Precision Crowns & Bridges
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Modern digital dentistry streamlines every stage of crown and bridge fabrication, ensuring exceptional comfort, pinpoint accuracy, and durable aesthetics.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          3D Digital Impressions & Scanning
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          High-definition intraoral scanners capture distortion-free digital 3D models of your teeth in seconds, eliminating messy, uncomfortable traditional impression trays.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          CAD/CAM Design & Milling
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Automated computer-aided design and precision multi-axis milling carve solid zirconia and glass-ceramic restorations with structural integrity and exact margins.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Biocompatible Monolithic Zirconia
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Full-contour medical-grade zirconia provides superior fracture resistance for heavy chewing molars without the risk of porcelain chipping or metal exposure.
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          High-Translucency E-max Ceramics
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Lithium disilicate glass-ceramics deliver lifelike light transmission and natural enamel luminescence for front teeth restorations and aesthetic bridge pontics.
                        </p>
                      </div>
                    </div>

                    {/* Bottom Reassurance */}
                    <div className="max-w-3xl mx-auto text-center pt-2">
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        Digital workflow ensures consistent precision, excellent marginal seal, and lasting durability for every restoration.
                      </p>
                    </div>
                  </div>

                  {faqElement}
                  {bottomCtaElement}
                  {relatedServicesElement}
                </div>
              );
            }

            if (isSmileMakeover) {
              return (
                <SmileMakeoverView
                  heroElement={heroElement}
                  videoElement={videoElement}
                  testimonialsElement={testimonialsElement}
                  faqElement={faqElement}
                  bottomCtaElement={bottomCtaElement}
                  relatedServicesElement={relatedServicesElement}
                  mConfig={mConfig}
                  beforeAfterPairs={beforeAfterPairs}
                  displayGallery={displayGallery}
                  seoHeadings={seoHeadings}
                  openAppointmentModal={openAppointmentModal}
                  smileMakeoverWhatsAppUrl={smileMakeoverWhatsAppUrl}
                />
              );
            }

            if (isInvisibleAligners) {
              return (
                <InvisibleAlignersView
                  heroElement={heroElement}
                  videoElement={videoElement}
                  testimonialsElement={testimonialsElement}
                  faqElement={faqElement}
                  bottomCtaElement={bottomCtaElement}
                  relatedServicesElement={relatedServicesElement}
                  mConfig={mConfig}
                  beforeAfterPairs={beforeAfterPairs}
                  displayGallery={displayGallery}
                  seoHeadings={seoHeadings}
                  openAppointmentModal={openAppointmentModal}
                />
              );
            }

            if (isDentalImplants) {
              return (
                <DentalImplantsView
                  heroElement={heroElement}
                  featuredVideoElement={featuredVideoElement}
                  videoElement={videoElement}
                  testimonialsElement={testimonialsElement}
                  faqElement={faqElement}
                  bottomCtaElement={bottomCtaElement}
                  relatedServicesElement={relatedServicesElement}
                  mConfig={mConfig}
                  beforeAfterPairs={beforeAfterPairs}
                  displayGallery={displayGallery}
                  seoHeadings={seoHeadings}
                  openAppointmentModal={openAppointmentModal}
                />
              );
            }

            if (isFullMouth) {
              return (
                <FullMouthRehabView
                  heroElement={heroElement}
                  videoElement={videoElement}
                  testimonialsElement={testimonialsElement}
                  faqElement={faqElement}
                  bottomCtaElement={bottomCtaElement}
                  relatedServicesElement={relatedServicesElement}
                  mConfig={mConfig}
                  contactInfo={contactInfo}
                  beforeAfterPairs={beforeAfterPairs}
                  displayGallery={displayGallery}
                  seoHeadings={seoHeadings}
                  openAppointmentModal={openAppointmentModal}
                  drVipulImg={drVipulImg}
                  setCurrentPage={setCurrentPage}
                />
              );
            }

            if (isRootCanal) {
              return (
                <RootCanalView
                  heroElement={heroElement}
                  featuredVideoElement={featuredVideoElement}
                  videoElement={videoElement}
                  testimonialsElement={testimonialsElement}
                  faqElement={faqElement}
                  bottomCtaElement={bottomCtaElement}
                  relatedServicesElement={relatedServicesElement}
                  mConfig={mConfig}
                  beforeAfterPairs={beforeAfterPairs}
                  displayGallery={displayGallery}
                  seoHeadings={seoHeadings}
                  openAppointmentModal={openAppointmentModal}
                />
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
