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
  Facebook, Instagram, Youtube, Linkedin, Twitter, MessageSquare, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Service, ServiceGalleryItem, ServiceFaq, ContactInfo } from '../types';
import { serviceService } from '../utils/serviceData';
import { contactService, DEFAULT_CONTACT_INFO } from '../utils/contactData';
import Implants from './Implants';
import RootCanal from './RootCanal';
import FullMouthRehab from './FullMouthRehab';
import InvisibleAligners from './InvisibleAligners';
import SmileMakeover from './SmileMakeover';
import CrownsBridges from './CrownsBridges';
import TeethWhitening from './TeethWhitening';
import PediatricDentistry from './PediatricDentistry';
import Braces from './Braces';
import WisdomToothSurgery from './WisdomToothSurgery';
import ToothColouredFilling from './ToothColouredFilling';

function getYouTubeEmbedUrl(url: string) {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return url;
}

function isYouTubeUrl(url: string) {
  if (!url) return false;
  return url.includes('youtube.com') || url.includes('youtu.be');
}

function getFallbackMedia(slug: string, title: string) {
  const norm = slug.toLowerCase();
  
  let heroImg = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200';
  let heroCap = 'State-of-the-art dental clinical care at Patel Dental Hospital.';
  let youtubeVideo = 'cbVcmy53KBs'; // Default procedure video
  let videoTitle = `${title || 'Dental'} Procedure Guide`;
  let videoDesc = `Watch this comprehensive walkthrough video to understand the step-by-step procedure and clinical process of ${title || 'our'} treatment.`;
  
  if (norm.includes('filling') || norm.includes('composite')) {
    heroImg = 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=1200';
    heroCap = 'Natural Looking Tooth Coloured Fillings for a Healthy & Beautiful Smile.';
    youtubeVideo = 'cbVcmy53KBs';
  } else if (norm.includes('braces') || norm.includes('orthodontic')) {
    heroImg = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200';
    heroCap = 'Safest, most comfortable tooth-straightening orthodontic solutions.';
    youtubeVideo = 'cbVcmy53KBs';
  } else if (norm.includes('implant')) {
    heroImg = 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1200';
    heroCap = 'Premium lifetime warranty titanium implants.';
    youtubeVideo = 'cbVcmy53KBs';
  } else if (norm.includes('whitening') || norm.includes('bleaching')) {
    heroImg = 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&q=80&w=1200';
    heroCap = 'Advanced laser smile bleaching and whitening.';
    youtubeVideo = 'cbVcmy53KBs';
  } else if (norm.includes('canal') || norm.includes('rct')) {
    heroImg = 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=1200';
    heroCap = 'Pain-free root canal treatment with modern rotary systems.';
    youtubeVideo = 'cbVcmy53KBs';
  } else if (norm.includes('wisdom') || norm.includes('surgery')) {
    heroImg = 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1200';
    heroCap = 'Painless surgical extractions and wisdom tooth removal.';
    youtubeVideo = 'cbVcmy53KBs';
  } else if (norm.includes('pediatric') || norm.includes('kids')) {
    heroImg = 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&q=80&w=1200';
    heroCap = 'Friendly, comfortable pediatric dentistry for happy children.';
    youtubeVideo = 'cbVcmy53KBs';
  } else if (norm.includes('crown') || norm.includes('bridge')) {
    heroImg = 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200';
    heroCap = 'Durable ceramic crowns and fixed prosthetic dental bridges.';
    youtubeVideo = 'cbVcmy53KBs';
  } else if (norm.includes('aligner')) {
    heroImg = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200';
    heroCap = 'Completely clear invisible custom-made tooth aligner trays.';
    youtubeVideo = 'cbVcmy53KBs';
  } else if (norm.includes('makeover') || norm.includes('smile')) {
    heroImg = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200';
    heroCap = 'Complete cosmetic smile designing and dental veneers.';
    youtubeVideo = 'cbVcmy53KBs';
  }

  return {
    hero_image: heroImg,
    hero_image_caption: heroCap,
    content_images: [
      { image_url: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600', caption: 'Clinical evaluation & preparation', alt_text: 'Clinical evaluation', display_order: 10 }
    ],
    gallery: [
      { id: 'g1', image_url: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600', caption: 'Before Treatment state', alt_text: 'Before', display_order: 10 },
      { id: 'g2', image_url: 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=600', caption: 'After Alignment & polish', alt_text: 'After', display_order: 20 }
    ],
    procedure_video_url: `https://www.youtube.com/watch?v=${youtubeVideo}`,
    procedure_video_title: videoTitle,
    procedure_video_description: videoDesc,
    procedure_video_thumbnail: `https://img.youtube.com/vi/${youtubeVideo}/hqdefault.jpg`,
    patient_testimonials: [
      { video_url: 'https://www.youtube.com/watch?v=cyai6CjMD0s', patient_name: 'Aarav Mehta', treatment_name: title || 'Dental', short_review: `Exceptional pain-free dental care. Dr. Vipul Patel performed my treatment flawlessly. Highly recommended!`, display_order: 10 },
      { video_url: 'https://www.youtube.com/watch?v=cyai6CjMD0s', patient_name: 'Kirti Sharma', treatment_name: title || 'Dental', short_review: `Very clean hospital, modern equipment, and highly skilled doctors. The result is outstanding!`, display_order: 20 }
    ],
    hospital_team_photos: [
      { image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800', title: 'DR. VIPUL PATEL & PANEL EXPERTS', caption: 'State-of-the-art dental care since generations with advanced USA standards.', display_order: 10 }
    ]
  };
}

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
  const [contactInfo, setContactInfo] = useState<ContactInfo>(DEFAULT_CONTACT_INFO);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Lightbox modal state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Active videos for iframe embedding
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});

  // Active photo tab for split media galleries
  const [activePhotoTab, setActivePhotoTab] = useState<'hospital' | 'team' | 'equipment'>('hospital');

  const fallback = React.useMemo(() => {
    return getFallbackMedia(slug, service?.title || '');
  }, [slug, service?.title]);

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
    if (gallery && gallery.length > 0) {
      return gallery;
    }
    return fallback.gallery;
  }, [gallery, fallback]);

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
    if (!list || list.length === 0) {
      return fallback.patient_testimonials;
    }
    return [...list].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
  }, [service, fallback]);

  const displayTeamPhotos = React.useMemo(() => {
    if (!service) return [];
    let list: any[] = [];
    if (Array.isArray(service.hospital_team_photos)) {
      list = service.hospital_team_photos;
    } else if (typeof service.hospital_team_photos === 'string') {
      try {
        list = JSON.parse(service.hospital_team_photos);
      } catch (e) {}
    }
    if (!list || list.length === 0) {
      return fallback.hospital_team_photos;
    }
    return [...list].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
  }, [service, fallback]);

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
          const sortedFaqs = [...fetchedFaqs].sort((a, b) => a.display_order - b.display_order);
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
  }, [slug]);

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

  // If loading, display the skeleton state first
  if (isLoading) {
    // We will render skeleton below
  } else if (!hasCustomContent) {
    // If no custom text has been configured by the doctor, fall back to the existing static page design
    if (slug === 'tooth-coloured-filling' || slug === 'composite-filling') {
      return (
        <ToothColouredFilling
          setCurrentPage={(page) => setCurrentPage?.(page)}
          openAppointmentModal={openAppointmentModal}
        />
      );
    }

    if (slug === 'wisdom-tooth-surgery' || slug === 'wisdom') {
      return (
        <WisdomToothSurgery
          setCurrentPage={(page) => setCurrentPage?.(page)}
          openAppointmentModal={openAppointmentModal}
        />
      );
    }

    if (slug === 'braces-treatment' || slug === 'braces') {
      return (
        <Braces
          setCurrentPage={(page) => setCurrentPage?.(page)}
          openAppointmentModal={openAppointmentModal}
        />
      );
    }

    if (slug === 'pediatric-dentistry' || slug === 'kids-dentistry') {
      return (
        <PediatricDentistry
          setCurrentPage={(page) => setCurrentPage?.(page)}
          openAppointmentModal={openAppointmentModal}
        />
      );
    }

    if (slug === 'teeth-whitening') {
      return (
        <TeethWhitening
          setCurrentPage={(page) => setCurrentPage?.(page)}
          openAppointmentModal={openAppointmentModal}
        />
      );
    }

    if (slug === 'crowns-bridges' || slug === 'crowns-and-bridges') {
      return (
        <CrownsBridges
          setCurrentPage={(page) => setCurrentPage?.(page)}
          openAppointmentModal={openAppointmentModal}
        />
      );
    }

    if (slug === 'dental-implants') {
      return (
        <Implants
          setCurrentPage={(page) => setCurrentPage?.(page)}
          openAppointmentModal={openAppointmentModal}
        />
      );
    }

    if (slug === 'root-canal-treatment') {
      return (
        <RootCanal
          setCurrentPage={(page) => setCurrentPage?.(page)}
          openAppointmentModal={openAppointmentModal}
        />
      );
    }

    if (slug === 'full-mouth-rehabilitation') {
      return (
        <FullMouthRehab
          setCurrentPage={(page) => setCurrentPage?.(page)}
          openAppointmentModal={openAppointmentModal}
        />
      );
    }

    if (slug === 'invisible-aligners') {
      return (
        <InvisibleAligners
          setCurrentPage={(page) => setCurrentPage?.(page)}
          openAppointmentModal={openAppointmentModal}
        />
      );
    }

    if (slug === 'smile-makeover') {
      return (
        <SmileMakeover
          setCurrentPage={(page) => setCurrentPage?.(page)}
          openAppointmentModal={openAppointmentModal}
        />
      );
    }
  }

  // Update page title & meta description for SEO
  useEffect(() => {
    if (service) {
      const originalTitle = document.title;
      let metaDescription = document.querySelector('meta[name="description"]');
      const originalDescription = metaDescription ? metaDescription.getAttribute('content') : '';

      // Set new Title
      const newTitle = service.seo_title || `${service.title} | Patel Dental Hospital`;
      document.title = newTitle;

      // Set new Description
      const newDescription = service.seo_description || service.short_description;
      if (newDescription) {
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', newDescription);
      }

      return () => {
        document.title = originalTitle;
        if (metaDescription) {
          if (originalDescription) {
            metaDescription.setAttribute('content', originalDescription);
          } else {
            metaDescription.remove();
          }
        }
      };
    }
  }, [service]);

  // Handle navigating to back / treatment page
  const handleBackToServices = () => {
    window.location.hash = '#treatments';
    if (setCurrentPage) {
      setCurrentPage('treatments');
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

  // Formulate WhatsApp API direct URL
  const getWhatsAppUrl = () => {
    if (!service) return '';
    const text = `Hi Patel Dental Hospital, I'm interested in booking a consultation for the "${service.title}" treatment. Please let me know the next available slot!`;
    const num = (mConfig.contact_whatsapp_number && mConfig.contact_whatsapp_number.trim() !== '')
      ? mConfig.contact_whatsapp_number.replace(/\s+/g, '')
      : contactInfo.whatsappRaw;
    return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
  };

  const renderCtaButton = (type: 'primary' | 'secondary', defaultText: string, defaultIcon: React.ReactNode, isPrimary: boolean) => {
    const text = type === 'primary' 
      ? (mConfig.cta_primary_text || defaultText) 
      : (mConfig.cta_secondary_text || defaultText);
    
    const actionType = type === 'primary'
      ? (mConfig.cta_primary_action || 'appointment')
      : (mConfig.cta_secondary_action || 'whatsapp');

    const customValue = type === 'primary'
      ? mConfig.cta_primary_value
      : mConfig.cta_secondary_value;

    const baseClass = isPrimary
      ? "inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
      : "inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer";

    // Set specialized class for WhatsApp if it's the WhatsApp action and not styled as primary
    let resolvedClass = baseClass;
    if (actionType === 'whatsapp' && !isPrimary) {
      resolvedClass = "inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer";
    }

    const handleClick = () => {
      if (actionType === 'appointment') {
        openAppointmentModal(`${service.title} - CTA`);
      } else if (actionType === 'whatsapp') {
        const textMsg = `Hi Patel Dental Hospital, I'm interested in booking a consultation for "${service.title}".`;
        const num = (customValue && customValue.trim() !== '') 
          ? customValue.replace(/\s+/g, '') 
          : (mConfig.contact_whatsapp_number ? mConfig.contact_whatsapp_number.replace(/\s+/g, '') : contactInfo.whatsappRaw);
        window.open(`https://wa.me/${num}?text=${encodeURIComponent(textMsg)}`, '_blank', 'noopener,noreferrer');
      } else if (actionType === 'call') {
        const phone = (customValue && customValue.trim() !== '')
          ? customValue.replace(/\s+/g, '')
          : (mConfig.contact_call_number ? mConfig.contact_call_number.replace(/\s+/g, '') : contactInfo.callRaw);
        window.location.href = `tel:${phone}`;
      } else if (actionType === 'custom') {
        if (customValue && customValue.trim() !== '') {
          window.open(customValue, '_blank', 'noopener,noreferrer');
        }
      }
    };

    const icon = actionType === 'appointment' ? <Calendar className="h-4 w-4" />
      : actionType === 'whatsapp' ? <MessageCircle className="h-4 w-4" />
      : actionType === 'call' ? <Phone className="h-4 w-4" />
      : defaultIcon;

    return (
      <button type="button" onClick={handleClick} className={resolvedClass}>
        {icon}
        <span>{text}</span>
        {actionType === 'appointment' && isPrimary && <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />}
      </button>
    );
  };

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
    return Array.isArray(rawSteps)
      ? [...rawSteps].sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
      : [];
  }, [service]);

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
    return Array.isArray(rawFeatures)
      ? [...rawFeatures].sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
      : [];
  }, [service]);

  // Loading Skeleton State
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
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#0D9488]/20 selection:text-[#081C3A]">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToServices}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0D9488] transition-colors py-2 px-4 bg-white border border-slate-150 rounded-xl shadow-3xs cursor-pointer group"
          >
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Treatments
          </button>
          
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider">
            <span className="cursor-pointer hover:text-slate-600" onClick={handleBackToServices}>Treatments</span>
            <span>/</span>
            <span className="text-[#0D9488] font-black">{service.title}</span>
          </div>
        </div>

        {/* Dynamic Offer Banner (Promotional Section) */}
        {mConfig.offer_show && (
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
                className="w-full md:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-[#081C3A] text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
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
                  {renderCtaButton('primary', 'Book Appointment', <Calendar className="h-4 w-4" />, true)}
                  {renderCtaButton('secondary', 'WhatsApp Us', <MessageCircle className="h-4 w-4" />, false)}
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
                
                {/* Optional Hero Image Caption overlay */}
                {heroImageCaption && heroImageCaption.trim() !== '' && (
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-900/75 backdrop-blur-xs text-white text-[10px] font-medium py-1.5 px-3 rounded-lg border border-white/10 z-20">
                    📸 {heroImageCaption}
                  </div>
                )}
              </div>
            </div>
          ) : null;

          const introElement = (mConfig.show_introduction !== false) ? (
            <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 md:p-10 shadow-3xs space-y-6" id="cms-section-intro">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-8 w-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488]">
                  <Heart className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h2 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">
                    Advanced Dental Care
                  </h2>
                  <h3 className="text-lg font-black text-[#081C3A] tracking-tight">
                    {service.intro_title && service.intro_title.trim() !== '' ? service.intro_title : 'About the Treatment'}
                  </h3>
                </div>
              </div>
              
              <div className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans font-medium">
                {service.intro_description && service.intro_description.trim() !== '' ? service.intro_description : service.description}
              </div>

              {displayContentImages.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                  {displayContentImages.map((img, idx) => (
                    <div key={idx} className="space-y-2 group">
                      <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-slate-50 border border-slate-150 relative shadow-3xs">
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
          ) : null;

          const processElement = (mConfig.show_process !== false && displaySteps.length > 0) ? (
            <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 md:p-10 shadow-3xs space-y-6 animate-fade-in" id="cms-section-process">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-8 w-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488]">
                  <Activity className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h2 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">
                    Methodical Procedures
                  </h2>
                  <h3 className="text-lg font-black text-[#081C3A] tracking-tight">
                    Treatment Process & Timeline
                  </h3>
                </div>
              </div>

              <div className="relative border-l border-slate-150 pl-6 ml-3 space-y-8 py-2">
                {displaySteps.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Step Bubble */}
                    <span className="absolute -left-[35px] top-0.5 h-6 w-6 rounded-full bg-white border-2 border-[#0D9488] flex items-center justify-center text-[10px] font-black text-[#0D9488] shadow-3xs">
                      {idx + 1}
                    </span>
                    
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">
                        {step.title}
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null;

          const benefitsElement = (mConfig.show_benefits !== false && displayFeatures.length > 0) ? (
            <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 md:p-10 shadow-3xs space-y-6 animate-fade-in" id="cms-section-benefits">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-8 w-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488]">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h2 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">
                    Premium Highlights
                  </h2>
                  <h3 className="text-lg font-black text-[#081C3A] tracking-tight">
                    Why Choose This Treatment
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayFeatures.map((feat, idx) => (
                  <div key={idx} className="p-5 bg-slate-50/50 border border-slate-150 rounded-2xl space-y-2 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                        <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">
                          {feat.title}
                        </h4>
                      </div>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                        {feat.description}
                      </p>
                    </div>
                  </div>
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
                      Treatment Gallery
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

          const videoElement = (mConfig.show_procedure_video !== false && videoUrl) ? (
            <div className="py-12 border-t border-slate-100 space-y-8 animate-fade-in" id="cms-section-video">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-[10px] text-[#0D9488] font-black uppercase tracking-widest block">
                  Visual Treatment Guide
                </span>
                <h2 className="font-display font-black text-2xl text-[#081C3A] tracking-tight">
                  {videoTitle || 'Procedure Video'}
                </h2>
                {videoDesc && (
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
                    {videoDesc}
                  </p>
                )}
                <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
              </div>

              <div className="bg-white rounded-3xl border border-slate-150 p-4 md:p-6 shadow-md max-w-3xl mx-auto">
                <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
                  {activeVideos['proc-vid'] ? (
                    isYouTubeUrl(videoUrl) ? (
                      <iframe
                        className="w-full h-full border-0 absolute inset-0 z-10"
                        src={`${getYouTubeEmbedUrl(videoUrl)}?autoplay=1&rel=0`}
                        title={videoTitle || 'Procedure Video'}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    ) : (
                      <video
                        className="w-full h-full absolute inset-0 z-10 bg-black"
                        src={videoUrl}
                        controls
                        autoPlay
                        referrerPolicy="no-referrer"
                      />
                    )
                  ) : (
                    <button
                      onClick={() => setActiveVideos(prev => ({ ...prev, 'proc-vid': true }))}
                      className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                      aria-label="Play procedure guide video"
                    >
                      <img
                        src={isYouTubeUrl(videoUrl) ? `https://img.youtube.com/vi/${videoUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)?.[2] || 'cbVcmy53KBs'}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600'}
                        alt="Procedure video thumbnail"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300 pointer-events-none" />
                      <div className="absolute z-20 flex items-center justify-center w-14 h-14 rounded-full bg-white/95 text-[#0D9488] shadow-md group-hover:scale-110 transition-all duration-300 pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 translate-x-0.5"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : null;

          const renderSplitPhotos = (category) => {
            const isHospital = category === 'hospital';
            const showFlag = isHospital ? mConfig.show_hospital_photos !== false : mConfig.show_team_photos !== false;
            
            // Check if the actual photos are populated
            const photos = isHospital ? (mConfig.hospital_photos || []) : (mConfig.team_photos || []);
            if (!showFlag || !Array.isArray(photos) || photos.length === 0) return null;

            return (
              <div className="py-12 border-t border-slate-100 space-y-8 animate-fade-in" key={category} id={`cms-section-${category}`}>
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-[10px] text-[#0D9488] font-black uppercase tracking-widest block">
                    {isHospital ? "Our Infrastructure" : "Specialist Care"}
                  </span>
                  <h2 className="font-display font-black text-2xl text-[#081C3A] tracking-tight">
                    {isHospital ? "Clinic & Hospital Facilities" : "Specialist Panel & Doctors"}
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
                    {isHospital 
                      ? "Take a look at our state-of-the-art sterile clinics, advanced machinery, and comfortable patient wards."
                      : "Meet our world-class specialist panels and qualified doctors dedicated to your high-end oral treatments."}
                  </p>
                  <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {photos.map((p, idx) => (
                    <div key={idx} className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                        <img
                          src={p.image_url || p.photo_url}
                          alt={p.title || p.name || 'Clinical / Doctor Photo'}
                          className="w-full h-full object-cover hover:scale-[1.03] transition duration-500"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-4 bg-slate-50/50 space-y-1 border-t border-slate-100 text-center">
                        <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">
                          {p.title || p.name || (isHospital ? 'Clinic Infrastructure' : 'Patel Dental Expert')}
                        </h4>
                        {(p.caption || p.designation) && (
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                            {p.caption || p.designation}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          };

          const testimonialsElement = (mConfig.show_testimonials !== false && (displayTestimonials.length > 0 || (mConfig.written_reviews && mConfig.written_reviews.length > 0))) ? (
            <div className="py-12 border-t border-slate-100 space-y-12 animate-fade-in" id="cms-section-testimonials">
              {/* Video Testimonials Section */}
              {displayTestimonials.length > 0 && (
                <div className="space-y-8">
                  <div className="text-center max-w-xl mx-auto space-y-2">
                    <span className="text-[10px] text-[#0D9488] font-black uppercase tracking-widest block">
                      Clinical Outcomes
                    </span>
                    <h2 className="font-display font-black text-2xl text-[#081C3A] tracking-tight">
                      Patient Testimonial Videos
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                      Listen to the clinical satisfaction shared directly by our happy patients who underwent {service.title} treatment.
                    </p>
                    <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {displayTestimonials.map((t, idx) => (
                      <div key={idx} className="bg-white rounded-3xl border border-slate-150 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-4 flex flex-col justify-between">
                        {t.video_url && (
                          <div className="aspect-video w-full bg-slate-900 rounded-xl relative overflow-hidden shadow-inner">
                            {activeVideos[`testimonial-${idx}`] ? (
                              isYouTubeUrl(t.video_url) ? (
                                <iframe
                                  className="w-full h-full border-0 absolute inset-0 z-10"
                                  src={`${getYouTubeEmbedUrl(t.video_url)}?autoplay=1&rel=0`}
                                  title={`${t.patient_name}'s Review`}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                  loading="lazy"
                                ></iframe>
                              ) : (
                                <video
                                  className="w-full h-full absolute inset-0 z-10 bg-black"
                                  src={t.video_url}
                                  controls
                                  autoPlay
                                  referrerPolicy="no-referrer"
                                />
                              )
                            ) : (
                              <button
                                onClick={() => setActiveVideos(prev => ({ ...prev, [`testimonial-${idx}`]: true }))}
                                className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                                aria-label={`Play review by ${t.patient_name}`}
                              >
                                <img
                                  src={isYouTubeUrl(t.video_url) ? `https://img.youtube.com/vi/${t.video_url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)?.[2] || 'cbVcmy53KBs'}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600'}
                                  alt={`${t.patient_name}'s video review thumbnail`}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300 pointer-events-none" />
                                <div className="absolute z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/95 text-[#0D9488] shadow-md group-hover:scale-110 transition-all duration-300 pointer-events-none">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 translate-x-0.5"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </button>
                            )}
                          </div>
                        )}

                        <div className="space-y-2 flex-1 flex flex-col justify-between pt-2">
                          <p className="text-slate-600 text-xs sm:text-sm font-medium italic leading-relaxed">
                            "{t.short_review || t.review || 'No written review text provided.'}"
                          </p>
                          <div className="border-t border-slate-100 pt-3 mt-2">
                            <span className="block text-xs font-black text-[#081C3A]">{t.patient_name || 'Anonymous'}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.treatment_name || service.title} Patient</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Written Reviews & Transformation Smiles */}
              {mConfig.written_reviews && mConfig.written_reviews.length > 0 && (
                <div className="space-y-8 pt-8 border-t border-slate-100">
                  <div className="text-center max-w-xl mx-auto space-y-2">
                    <span className="text-[10px] text-[#0D9488] font-black uppercase tracking-widest block">
                      Patient Journals & Transformations
                    </span>
                    <h2 className="font-display font-black text-2xl text-[#081C3A] tracking-tight">
                      Written Testimonials & Smile Gallery
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      Read verified patient experiences and view their beautiful smile transformations.
                    </p>
                    <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {mConfig.written_reviews.map((r) => (
                      <div key={r.id} className="bg-white rounded-3xl border border-slate-150 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-5">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-amber-400">
                              {Array.from({ length: r.rating || 5 }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400 shrink-0" />
                              ))}
                            </div>
                            <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold tracking-wide uppercase">
                              {r.treatment_name || service.title}
                            </span>
                          </div>

                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                            "{r.review}"
                          </p>
                        </div>

                        {/* Before/After Transformation Smile Photos */}
                        {(r.before_image || r.after_image) && (
                          <div className="grid grid-cols-2 gap-3 pt-2">
                            {r.before_image && (
                              <div className="space-y-1 relative group">
                                <span className="absolute top-2 left-2 z-10 bg-rose-500/95 backdrop-blur-xs text-white text-[8px] font-black px-1.5 py-0.5 rounded-md">
                                  BEFORE
                                </span>
                                <div className="rounded-xl overflow-hidden aspect-[4/3] border border-slate-150 bg-slate-50">
                                  <img 
                                    src={r.before_image} 
                                    alt={`${r.patient_name} Before`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              </div>
                            )}
                            {r.after_image && (
                              <div className="space-y-1 relative group">
                                <span className="absolute top-2 left-2 z-10 bg-emerald-500/95 backdrop-blur-xs text-white text-[8px] font-black px-1.5 py-0.5 rounded-md">
                                  AFTER
                                </span>
                                <div className="rounded-xl overflow-hidden aspect-[4/3] border border-slate-150 bg-slate-50">
                                  <img 
                                    src={r.after_image} 
                                    alt={`${r.patient_name} After`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                          <div>
                            <span className="block text-xs font-black text-[#081C3A]">{r.patient_name}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Verified Patient Journey</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null;

          const faqElement = (mConfig.show_faq !== false && faqs.length > 0) ? (
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
                    Treatment FAQs
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {faqs.map((faq) => {
                  const isExpanded = expandedFaqId === faq.id;
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
          ) : null;

          const relatedServicesElement = (mConfig.show_related_services !== false && relatedServices.length > 0) ? (
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
                    whileHover={{ y: -3 }}
                    className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-3xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                        <img 
                          src={item.hero_image || 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600'} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="font-display font-bold text-sm text-[#081C3A] line-clamp-1 tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
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
          ) : null;

          const bottomCtaElement = (mConfig.show_bottom_cta !== false) ? (
            <div className="bg-[#081C3A] text-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl relative overflow-hidden text-center space-y-6" id="cms-section-bottom-cta">
              {/* Subtle background glows */}
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0D9488]/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

              <div className="max-w-xl mx-auto space-y-4 relative z-10">
                <span className="inline-flex items-center gap-1 bg-[#0D9488] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full leading-none">
                  Consultation Booking
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                  {mConfig.bottom_cta_heading || "Ready to Transform Your Smile?"}
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
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
                  <span>{mConfig.bottom_cta_primary_text || "Book Appointment"}</span>
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
          ) : null;

          // Dispatch switcher
          const getSectionNode = (key) => {
            switch (key) {
              case 'hero':
                return heroElement;
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
                return renderSplitPhotos('hospital');
              case 'team_photos':
                return renderSplitPhotos('team');
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
            'intro',
            'process',
            'benefits',
            'gallery',
            'video',
            'hospital_photos',
            'team_photos',
            'testimonials',
            'faq',
            'related_services',
            'bottom_cta'
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

          return (
            <div className="space-y-10">
              {/* Pre-Grid Outer Sections */}
              {outerBeforeGridKeys.map(key => (
                <React.Fragment key={key}>
                  {getSectionNode(key)}
                </React.Fragment>
              ))}

              {/* 2-Column Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Main Left Column (Inner ordered sections) */}
                <div className="lg:col-span-2 space-y-10">
                  {innerGridKeys.map(key => (
                    <React.Fragment key={key}>
                      {getSectionNode(key)}
                    </React.Fragment>
                  ))}
                </div>

                {/* Sticky Right Sidebar (Preserves premium UI) */}
                <div className="space-y-6 lg:sticky lg:top-24">
                  {/* Quick Consultation Booking Box */}
                  <div className="bg-gradient-to-br from-[#081C3A] to-[#0A264F] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-750 relative overflow-hidden space-y-5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
                    
                    <div className="space-y-2 relative z-10">
                      <span className="text-[10px] text-teal-400 font-bold uppercase tracking-widest block">
                        Quick Actions
                      </span>
                      <h4 className="font-display font-black text-xl leading-tight">
                        Instant Solution Consultant
                      </h4>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        Secure a clinical reservation or discuss treatment estimates with our desk assistants immediately.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2 relative z-10">
                      <button
                        onClick={() => openAppointmentModal(service.title)}
                        className="w-full py-3.5 px-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 group active:scale-98"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Book Clinic Slot</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>

                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>WhatsApp Assistant</span>
                      </a>
                    </div>

                    {/* Guarantees / High trust badges */}
                    <div className="border-t border-slate-800/80 pt-4 mt-2 space-y-2.5 relative z-10 text-[10px] text-slate-300 font-medium">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                        <span>100% Sterile Consultation Environment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                        <span>Flexible Clinical Financing Options</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Helpline and Contact Card */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden space-y-5">
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-teal-400 font-black uppercase tracking-widest block">
                        Direct Helpline
                      </span>
                      <h4 className="font-display font-black text-lg leading-tight">
                        Reach Patel Dental Hosp.
                      </h4>
                    </div>

                    <div className="space-y-3.5 text-xs text-slate-300">
                      <a 
                        href={`tel:${(mConfig.contact_call_number || contactInfo.phoneRaw).replace(/\s+/g, '')}`} 
                        className="flex items-start gap-2.5 hover:text-white transition group"
                      >
                        <Phone className="h-4 w-4 text-teal-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <div className="min-w-0">
                          <span className="block text-[10px] text-slate-500 font-bold uppercase">Call Emergency Desk</span>
                          <span className="font-black text-[13px]">{mConfig.contact_call_number || contactInfo.phone}</span>
                        </div>
                      </a>

                      {(mConfig.contact_email || mConfig.contact_email === undefined) && (
                        <a 
                          href={`mailto:${mConfig.contact_email || 'info@pateldentalhospital.com'}`}
                          className="flex items-start gap-2.5 hover:text-white transition group"
                        >
                          <Mail className="h-4 w-4 text-teal-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <div className="min-w-0 flex-1">
                            <span className="block text-[10px] text-slate-500 font-bold uppercase">Send Clinical Mail</span>
                            <span className="truncate block font-semibold">{mConfig.contact_email || 'info@pateldentalhospital.com'}</span>
                          </div>
                        </a>
                      )}

                      {(mConfig.contact_address || mConfig.contact_address === undefined) && (
                        <div className="flex items-start gap-2.5">
                          <MapPin className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <span className="block text-[10px] text-slate-500 font-bold uppercase">Physical Location</span>
                            <p className="text-[11px] leading-relaxed font-semibold">
                              {mConfig.contact_address || `${clinicName}, Rajkot, Gujarat`}
                            </p>
                            {mConfig.contact_map_url && (
                              <a 
                                href={mConfig.contact_map_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[#0D9488] hover:text-[#0F766E] text-[10px] font-black mt-1.5 transition uppercase tracking-wider"
                              >
                                View Interactive Map &rarr;
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Working Hours Override */}
                      {mConfig.contact_working_hours && (
                        <div className="flex items-start gap-2.5 pt-2.5 border-t border-slate-800/80">
                          <Calendar className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <span className="block text-[10px] text-slate-500 font-bold uppercase">Working Hours</span>
                            <p className="text-[11px] leading-relaxed font-semibold text-slate-200">
                              {mConfig.contact_working_hours}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Dynamic Follow Us Social block in Sidebar */}
                    <div className="border-t border-slate-800/80 pt-4 mt-2 space-y-2.5">
                      <span className="block text-[10px] text-slate-500 font-bold uppercase">Connect With Specialists</span>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const showFb = mConfig.social_fb_enabled !== undefined ? !!mConfig.social_fb_enabled : true;
                          const showIg = mConfig.social_ig_enabled !== undefined ? !!mConfig.social_ig_enabled : true;
                          const showYt = mConfig.social_yt_enabled !== undefined ? !!mConfig.social_yt_enabled : false;
                          const showLi = mConfig.social_li_enabled !== undefined ? !!mConfig.social_li_enabled : false;
                          const showTw = mConfig.social_tw_enabled !== undefined ? !!mConfig.social_tw_enabled : false;
                          const showWa = mConfig.social_wa_enabled !== undefined ? !!mConfig.social_wa_enabled : false;

                          return (
                            <>
                              {showFb && (
                                <a 
                                  href={mConfig.social_fb_link || "https://facebook.com"} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="p-1.5 bg-slate-800 hover:bg-[#0D9488] rounded-lg transition text-slate-400 hover:text-white"
                                  title="Connect on Facebook"
                                >
                                  <Facebook className="h-3.5 w-3.5" />
                                </a>
                              )}
                              {showIg && (
                                <a 
                                  href={mConfig.social_ig_link || "https://instagram.com"} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="p-1.5 bg-slate-800 hover:bg-[#0D9488] rounded-lg transition text-slate-400 hover:text-white"
                                  title="Connect on Instagram"
                                >
                                  <Instagram className="h-3.5 w-3.5" />
                                </a>
                              )}
                              {showYt && (
                                <a 
                                  href={mConfig.social_yt_link || "https://youtube.com"} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="p-1.5 bg-slate-800 hover:bg-[#0D9488] rounded-lg transition text-slate-400 hover:text-white"
                                  title="Watch on Youtube"
                                >
                                  <Youtube className="h-3.5 w-3.5" />
                                </a>
                              )}
                              {showLi && (
                                <a 
                                  href={mConfig.social_li_link || "https://linkedin.com"} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="p-1.5 bg-slate-800 hover:bg-[#0D9488] rounded-lg transition text-slate-400 hover:text-white"
                                  title="Connect on Linkedin"
                                >
                                  <Linkedin className="h-3.5 w-3.5" />
                                </a>
                              )}
                              {showTw && (
                                <a 
                                  href={mConfig.social_tw_link || "https://twitter.com"} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="p-1.5 bg-slate-800 hover:bg-[#0D9488] rounded-lg transition text-slate-400 hover:text-white"
                                  title="Connect on Twitter"
                                >
                                  <Twitter className="h-3.5 w-3.5" />
                                </a>
                              )}
                              {showWa && (
                                <a 
                                  href={mConfig.social_wa_link || "https://wa.me"} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="p-1.5 bg-slate-800 hover:bg-[#0D9488] rounded-lg transition text-slate-400 hover:text-white"
                                  title="Message on WhatsApp"
                                >
                                  <MessageSquare className="h-3.5 w-3.5" />
                                </a>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post-Grid Outer Sections */}
              {outerAfterGridKeys.map(key => (
                <React.Fragment key={key}>
                  {getSectionNode(key)}
                </React.Fragment>
              ))}
            </div>
          );
        })()}

        {/* Dynamic Floating Mobile Contact Bar */}
        {mConfig.contact_bar_show && (
          <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden animate-fade-in-up" id="mobile-floating-contact-bar">
            <div className="bg-white/95 backdrop-blur-md border border-slate-200/85 rounded-2xl p-2.5 shadow-xl flex items-center gap-2 justify-around max-w-md mx-auto">
              {mConfig.contact_bar_call_enabled && (
                <a
                  href={`tel:${(mConfig.contact_call_number || contactInfo.phoneRaw).replace(/\s+/g, '')}`}
                  className="flex-1 py-3 px-3 bg-[#081C3A] text-white rounded-xl text-center font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-xs hover:bg-slate-900 transition active:scale-95"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call</span>
                </a>
              )}
              {mConfig.contact_bar_whatsapp_enabled && (
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-3 bg-[#25D366] text-white rounded-xl text-center font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#20BA5A] transition active:scale-95"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp</span>
                </a>
              )}
              {mConfig.contact_bar_appointment_enabled && (
                <button
                  onClick={() => openAppointmentModal(`${service.title} - Floating Bar`)}
                  className="flex-1 py-3 px-3 bg-[#0D9488] text-white rounded-xl text-center font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#0F766E] transition active:scale-95 cursor-pointer"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Book Slot</span>
                </button>
              )}
            </div>
          </div>
        )}

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
