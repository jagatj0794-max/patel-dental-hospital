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
  Award, Shield, Check, Clock, Users, ShieldCheck, FileText, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Service, ServiceGalleryItem, ServiceFaq, ContactInfo } from '../types';
import { serviceService, DEFAULT_GREEN_HIGHLIGHT_LINE } from '../utils/serviceData';
import { contactService, DEFAULT_CONTACT_INFO } from '../utils/contactData';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { ClinicalCaseGallery } from '../components/ClinicalCaseGallery';
import { InstagramEmbed } from '../components/InstagramEmbed';
import { GooglePatientReviews } from '../components/GooglePatientReviews';
const imgImplants = 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800';

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
  let heroImg = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200';
  let heroCap = 'State-of-the-art dental clinical care at Patel Dental Hospital.';
  
  return {
    hero_image: heroImg,
    hero_image_caption: heroCap,
    content_images: [],
    gallery: [],
    procedure_video_url: '',
    procedure_video_title: '',
    procedure_video_description: '',
    procedure_video_thumbnail: '',
    patient_testimonials: [],
    hospital_team_photos: [],
    process_steps: [],
    features: [],
    faqs: []
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
    if (service?.id === 'implants-srv') {
      const raw = Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : [];
      return [...raw].sort((a: any, b: any) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    }
    if (gallery && gallery.length > 0) {
      return gallery;
    }
    return fallback.gallery;
  }, [service, gallery, fallback, mConfig]);

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
      if (service.id === 'implants-srv') {
        return [
          {
            id: 'testi-1',
            patient_name: 'Patient Testimonial',
            video_url: 'https://www.instagram.com/reel/C8qLd9MyWwG/',
            display_order: 10
          }
        ];
      }
      return fallback.patient_testimonials || [];
    }
    return [...list].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
  }, [service, fallback, mConfig]);

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
    if (service.id === 'implants-srv') {
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
    if (service.id === 'implants-srv') {
      // For Dental Implants, we do NOT load any fallback features
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
    if (!mConfig || !Array.isArray(mConfig.before_after_pairs)) return [];
    return [...mConfig.before_after_pairs]
      .filter((p: any) => p && p.before_image && p.after_image)
      .sort((a: any, b: any) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
  }, [mConfig]);

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
      const text = mConfig.cta_appointment_text || 'Book Appointment';
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
        {(mConfig.offer_show !== false && mConfig.show_offer_banner !== false && service.id !== 'implants-srv') && (
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
            service.id === 'implants-srv' ? (
              <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 md:p-14 shadow-xs relative overflow-hidden" id="dental-implants-hero-section">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* LEFT SIDE: Content */}
                  <div className="lg:col-span-7 space-y-6 md:space-y-8 order-2 lg:order-1 text-left">
                    <div className="space-y-3">
                      {/* Hero Title */}
                      <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-[#081C3A] tracking-tight leading-[1.15]">
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
                    <p className="text-slate-600 text-xs sm:text-sm md:text-base font-medium leading-relaxed whitespace-pre-line">
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
                          btnClass = "inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer group";
                        } else {
                          btnClass = "inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#081C3A] hover:bg-[#112C55] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer";
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
                  </div>

                  {/* RIGHT SIDE: Large Hero Image */}
                  <div className="lg:col-span-5 order-1 lg:order-2">
                    <div className="relative aspect-[4/3] sm:aspect-[1.5] lg:aspect-[4/5] xl:aspect-square w-full bg-slate-50 rounded-2xl overflow-hidden shadow-md">
                      <img
                        src={heroImage}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
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
                  
                  {/* Optional Hero Image Caption overlay */}
                  {heroImageCaption && heroImageCaption.trim() !== '' && (
                    <div className="absolute bottom-3 left-3 right-3 bg-slate-900/75 backdrop-blur-xs text-white text-[10px] font-medium py-1.5 px-3 rounded-lg border border-white/10 z-20">
                      📸 {heroImageCaption}
                    </div>
                  )}
                </div>
              </div>
            )
          ) : null;

          const introElement = (mConfig.show_introduction !== false) ? (
            service.id === 'implants-srv' ? (
              <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 md:p-14 shadow-xs space-y-8" id="dental-implants-treatment-overview">
                <div className="space-y-3 max-w-3xl">
                  {/* Small category tag or subtle text line to match style, e.g. Teal colored accent line or small text */}
                  <span className="text-[#0D9488] font-sans font-extrabold text-xs tracking-wider uppercase">
                    Treatment Overview
                  </span>
                  
                  {/* Section Heading */}
                  <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#081C3A] tracking-tight leading-tight">
                    {service.intro_title && service.intro_title.trim() !== '' ? service.intro_title : 'About the Treatment'}
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
                      {service.intro_title && service.intro_title.trim() !== '' ? service.intro_title : 'About the Treatment'}
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

          const defaultImplantsUrl = service?.id === 'implants-srv' ? 'https://www.instagram.com/reel/C8qLd9MyWwG/' : '';
          const effectiveVideoUrl = (videoUrl || service?.procedure_video_url || mConfig.procedure_video_url || mConfig.video_url || defaultImplantsUrl || '').trim();
          
          let effectiveVideoTitle = '';
          const pVideoTitleVal = service?.id === 'implants-srv'
            ? (service?.procedure_video_title !== undefined ? service.procedure_video_title : mConfig.procedure_video_title)
            : (service?.procedure_video_title || mConfig.procedure_video_title || mConfig.video_heading);

          if (pVideoTitleVal === undefined || pVideoTitleVal === null) {
            if (service?.id === 'implants-srv') {
              effectiveVideoTitle = 'Screw Retained Prosthesis Procedure';
            } else {
              effectiveVideoTitle = fallback.procedure_video_title || '';
            }
          } else {
            effectiveVideoTitle = typeof pVideoTitleVal === 'string' ? pVideoTitleVal.trim() : '';
          }

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

              <div className="max-w-[440px] mx-auto w-full px-2 sm:px-0">
                <InstagramEmbed
                  url={effectiveVideoUrl}
                  title={effectiveVideoTitle || 'Procedure Video'}
                />
              </div>
            </div>
          ) : null;

          const renderCombinedGallery = () => {
            const isSectionEnabled = mConfig.show_hospital_photos !== false;
            const hasCmsImages = displayTeamPhotos.length > 0;
            const sectionTitle = (mConfig.hospital_team_title || mConfig.hospital_section_title || mConfig.hospital_photos_title || service?.hospital_team_title || '').trim();

            console.log("==================================================");
            console.log("CHECK 1 - Hospital & Team Gallery Debug Values:");
            console.log("- mConfig.show_hospital_photos:", mConfig.show_hospital_photos);
            console.log("- displayTeamPhotos.length:", displayTeamPhotos.length);
            console.log("- displayTeamPhotos:", displayTeamPhotos);
            console.log("- sectionTitle:", sectionTitle);
            console.log("==================================================");

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
                        className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
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
                          <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
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

          let testimonialsTitle = '';
          const pTestimonialsTitleVal = service?.id === 'implants-srv'
            ? (mConfig.testimonials_section_title !== undefined ? mConfig.testimonials_section_title : mConfig.testimonial_section_title)
            : (mConfig.testimonials_section_title || mConfig.testimonial_section_title);

          if (pTestimonialsTitleVal === undefined || pTestimonialsTitleVal === null) {
            if (service?.id === 'implants-srv') {
              testimonialsTitle = 'Patient Testimonial Reels';
            } else {
              testimonialsTitle = 'Patient Testimonial Videos';
            }
          } else {
            testimonialsTitle = typeof pTestimonialsTitleVal === 'string' ? pTestimonialsTitleVal.trim() : '';
          }

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
                      <InstagramEmbed
                        url={reelUrl}
                        title={patientName ? `${patientName} Testimonial` : (testimonialsTitle || 'Patient Testimonial Reel')}
                      />
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
            <div className="bg-white border border-slate-150 rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl relative overflow-hidden text-center space-y-6" id="cms-section-bottom-cta">
              <div className="max-w-xl mx-auto space-y-4 relative z-10">
                <span className="inline-flex items-center gap-1 bg-[#0D9488] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full leading-none">
                  Consultation Booking
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-[#081C3A] tracking-tight leading-tight">
                  {mConfig.bottom_cta_heading || "Ready to Transform Your Smile?"}
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
            'intro',
            'process',
            'benefits',
            'gallery',
            'video',
            'testimonials',
            'hospital_photos',
            'team_photos',
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

          if (service.id === 'implants-srv') {
            return (
              <div className="space-y-10">
                {heroElement}

                {/* Section 3: How We Perform Dental Implants (Clinical Workflow Steps) */}
                {displaySteps.length > 0 && (
                  <div className="space-y-12" id="dental-implants-workflow">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      {/* Section Heading dynamically from CMS */}
                      <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#081C3A] tracking-tight leading-tight">
                        {mConfig.process_section_title || 'How We Perform Dental Implants'}
                      </h2>
                      {/* Subtle divider line */}
                      <div className="h-0.5 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-7xl mx-auto">
                      {displaySteps.map((step, idx) => (
                        <div 
                          key={step.id || idx} 
                          className="bg-white border border-slate-150/80 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col h-full"
                        >
                          {/* Step Number inside the same card */}
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-mono text-3xl sm:text-4xl font-black text-[#0D9488]/30 leading-none">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            {step.phase && (
                              <span className="inline-block text-[10px] font-bold text-[#0D9488] bg-teal-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                                {step.phase}
                              </span>
                            )}
                          </div>

                          {/* Optional Step Title from CMS (if any) */}
                          {step.title && step.title.trim() !== '' && (
                            <h3 className="font-sans font-extrabold text-base sm:text-lg text-[#081C3A] tracking-tight mb-2">
                              {step.title}
                            </h3>
                          )}

                          {/* Step Description with comfortable line-height & paragraph width */}
                          <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium flex-1">
                            {step.description}
                          </p>

                          {/* Optional Step Image */}
                          {step.image_url && step.image_url.trim() !== '' && (
                            <div className="rounded-xl overflow-hidden bg-slate-50 border border-slate-100 w-full shadow-3xs aspect-[16/10] mt-6">
                              <img
                                src={step.image_url}
                                alt={step.title || `Step ${idx + 1}`}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 4: Why Our Method Is Superior (Dynamic Comparison Cards) */}
                {mConfig.show_benefits !== false && displayFeatures.length > 0 && (
                  <div className="space-y-12 pt-10 border-t border-slate-100" id="dental-implants-superior">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      {/* Section Heading dynamically from CMS */}
                      <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#081C3A] tracking-tight leading-tight">
                        {mConfig.benefits_section_title || 'Why Our Method Is Superior'}
                      </h2>
                      {/* Subtle divider line */}
                      <div className="h-0.5 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-7xl mx-auto">
                      {displayFeatures.map((card, idx) => (
                        <div 
                          key={card.id || idx} 
                          className="bg-white border border-slate-150/80 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col h-full"
                        >
                          {/* Card Description / Doctor's Original Description */}
                          <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium flex-1">
                            {card.description}
                          </p>

                          {/* Optional Card Image (if available) */}
                          {(card.image_url || card.image) && (card.image_url || card.image).trim() !== '' && (
                            <div className="rounded-xl overflow-hidden bg-slate-50 border border-slate-100 w-full shadow-3xs aspect-[16/10] mt-6">
                              <img
                                src={card.image_url || card.image}
                                alt={`Method comparison detail ${idx + 1}`}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 5: Interactive Before & After Smile Transformations (100% CMS-driven) */}
                {mConfig.show_before_after !== false && beforeAfterPairs.length > 0 && (
                  <div className="space-y-12 pt-10 border-t border-slate-100" id="before-after-gallery-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full inline-block">
                        Transformations
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {mConfig.before_after_heading || 'Before & After Smile Transformations'}
                      </h2>
                      <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed text-center">
                        {mConfig.before_after_description || 'See real smile transformations of our dental implant patients.'}
                      </p>
                      <div className="h-0.5 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start max-w-7xl mx-auto">
                      {beforeAfterPairs.map((pair, pIdx) => (
                        <div 
                          key={pair.id || pIdx} 
                          className="bg-white border border-slate-150 rounded-2xl p-4 shadow-xs hover:shadow-sm transition-all duration-300"
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

                {/* Section 6: Clinical Case Gallery (CMS Category-based Accordion Sliders) */}
                {mConfig.show_gallery !== false && (
                  <ClinicalCaseGallery
                    heading={mConfig.gallery_heading || 'Clinical Case Gallery'}
                    description={mConfig.gallery_description}
                    items={Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery}
                  />
                )}

                {/* Section 6: Procedure Video (Loaded dynamically from CMS Instagram Reel) */}
                {videoElement}

                {/* Section 7: Patient Testimonial Reels */}
                {testimonialsElement}

                {/* Section 8: Hospital & Team Gallery */}
                {renderCombinedGallery()}

                {/* Section 9: Cost of Dental Implants (100% CMS-driven, Premium Two-column card) */}
                {mConfig.show_cost !== false && (
                  <div className="pt-10 border-t border-slate-100 space-y-8 animate-fade-in" id="dental-implants-cost">
                    {/* Two-column responsive card wrapper */}
                    <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-150 rounded-2xl p-6 sm:p-10 shadow-xs hover:shadow-sm transition-all duration-300 max-w-7xl mx-auto">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        
                        {/* Left Column: Heading, Highlight, Subtext, Contact Text */}
                        <div className="lg:col-span-7 space-y-4">
                          {/* Optional Section Heading */}
                          {mConfig.cost_heading && mConfig.cost_heading.trim() !== '' && (
                            <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#081C3A] tracking-tight leading-tight">
                              {mConfig.cost_heading}
                            </h2>
                          )}

                          {/* Optional Highlight text group */}
                          {((mConfig.cost_highlight_text && mConfig.cost_highlight_text.trim() !== '') || 
                            (mConfig.cost_highlight_sub && mConfig.cost_highlight_sub.trim() !== '')) && (
                            <div className="space-y-1.5 mt-2">
                              {mConfig.cost_highlight_text && mConfig.cost_highlight_text.trim() !== '' && (
                                <div className="font-sans font-black text-3xl sm:text-4xl text-[#0D9488] tracking-tight">
                                  {mConfig.cost_highlight_text}
                                </div>
                              )}
                              {mConfig.cost_highlight_sub && mConfig.cost_highlight_sub.trim() !== '' && (
                                <p className="text-[#081C3A] font-extrabold text-lg sm:text-xl tracking-tight">
                                  {mConfig.cost_highlight_sub}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Optional Contact Prompt */}
                          {mConfig.cost_contact_text && mConfig.cost_contact_text.trim() !== '' && (
                            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-xl">
                              {mConfig.cost_contact_text}
                            </p>
                          )}
                        </div>

                        {/* Right Column: CTA Actions */}
                        <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 w-full sm:justify-start lg:justify-center items-stretch sm:items-center lg:items-stretch">
                          {/* Call Button */}
                          {mConfig.cost_phone_number && mConfig.cost_call_label && mConfig.cost_call_label.trim() !== '' && (
                            <a
                              href={`tel:${String(mConfig.cost_phone_number).replace(/[^\d+]/g, '')}`}
                              className="px-6 py-4 bg-[#081C3A] hover:bg-[#0c2b59] text-white text-sm font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center flex items-center justify-center gap-2"
                            >
                              <Phone className="h-4.5 w-4.5" />
                              <span>{mConfig.cost_call_label}</span>
                            </a>
                          )}

                          {/* WhatsApp Button */}
                          {mConfig.cost_phone_number && mConfig.cost_whatsapp_label && mConfig.cost_whatsapp_label.trim() !== '' && (
                            <a
                              href={`https://wa.me/${String(mConfig.cost_phone_number).replace(/[^\d+]/g, '').replace('+', '')}`}
                              target="_blank"
                              referrerPolicy="no-referrer"
                              className="px-6 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center flex items-center justify-center gap-2"
                            >
                              <MessageCircle className="h-4.5 w-4.5" />
                              <span>{mConfig.cost_whatsapp_label}</span>
                            </a>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                )}

                {/* Section 10: Google Patient Reviews (100% CMS-driven premium slider) */}
                {mConfig.show_google_reviews !== false && (
                  <GooglePatientReviews
                    heading={mConfig.google_reviews_heading}
                    reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
                  />
                )}

                {/* Section 11: Bottom Call To Action (100% CMS-driven, Premium full-width block) */}
                {mConfig.show_sec11_cta !== false && (
                  <div className="pt-14 border-t border-slate-100 animate-fade-in" id="sec11-bottom-cta">
                    <div 
                      className={`relative overflow-hidden rounded-3xl py-12 px-6 sm:py-16 sm:px-12 max-w-7xl mx-auto border text-center flex flex-col items-center justify-center gap-6 ${
                        mConfig.sec11_bg_image 
                          ? 'border-transparent bg-cover bg-center' 
                          : 'border-slate-150 bg-gradient-to-br from-slate-50 to-white shadow-3xs hover:shadow-2xs hover:border-slate-300 transition-all duration-300'
                      }`}
                      style={mConfig.sec11_bg_image ? { backgroundImage: `url(${mConfig.sec11_bg_image})` } : {}}
                    >
                      {/* Dark Overlay for background image readability */}
                      {mConfig.sec11_bg_image && (
                        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs z-0" />
                      )}
                      
                      <div className="relative z-10 max-w-3xl space-y-4">
                        {mConfig.sec11_heading && mConfig.sec11_heading.trim() !== '' && (
                          <h2 className={`font-sans font-black text-2xl sm:text-4xl tracking-tight leading-tight ${
                            mConfig.sec11_bg_image ? 'text-white' : 'text-[#081C3A]'
                          }`}>
                            {mConfig.sec11_heading}
                          </h2>
                        )}
                        {mConfig.sec11_description && mConfig.sec11_description.trim() !== '' && (
                          <p className={`text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto ${
                            mConfig.sec11_bg_image ? 'text-slate-200' : 'text-slate-600'
                          }`}>
                            {mConfig.sec11_description}
                          </p>
                        )}
                      </div>

                      <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto min-w-[280px] sm:min-w-0 justify-center items-stretch sm:items-center mt-2">
                        {mConfig.sec11_primary_label && mConfig.sec11_primary_label.trim() !== '' && (
                          <button
                            type="button"
                            onClick={() => openAppointmentModal('Dental Implants')}
                            className={`px-8 py-4 sm:py-3.5 font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center flex items-center justify-center gap-2 text-sm cursor-pointer ${
                              mConfig.sec11_bg_image 
                                ? 'bg-[#0D9488] hover:bg-[#0F766E] text-white' 
                                : 'bg-[#081C3A] hover:bg-[#0c2b59] text-white'
                            }`}
                          >
                            <Calendar className="h-4.5 w-4.5" />
                            <span>{mConfig.sec11_primary_label}</span>
                          </button>
                        )}

                        {mConfig.sec11_secondary_label && mConfig.sec11_secondary_label.trim() !== '' && mConfig.sec11_whatsapp && mConfig.sec11_whatsapp.trim() !== '' && (
                          <a
                            href={`https://wa.me/${String(mConfig.sec11_whatsapp).replace(/[^\d+]/g, '').replace('+', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            referrerPolicy="no-referrer"
                            className="px-8 py-4 sm:py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <MessageCircle className="h-4.5 w-4.5" />
                            <span>{mConfig.sec11_secondary_label}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 12: Frequently Asked Questions (FAQ) (100% CMS-driven premium accordion) */}
                {mConfig.show_faq_sec !== false && (Array.isArray(mConfig.faqs) && mConfig.faqs.filter((faq: any) => faq && faq.enabled !== false && faq.question && faq.question.trim() !== '').length > 0) && (
                  <div className="pt-14 border-t border-slate-100 animate-fade-in" id="sec12-faq">
                    <div className="max-w-4xl mx-auto px-4 space-y-8">
                      <div className="text-center space-y-3">
                        <span className="text-[10px] font-black text-[#0D9488] uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full">
                          Support & Info
                        </span>
                        <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#081C3A] tracking-tight leading-tight">
                          {mConfig.faq_sec_heading || 'Frequently Asked Questions'}
                        </h2>
                        <div className="h-0.5 w-12 bg-[#0D9488] rounded-full mx-auto mt-2" />
                      </div>

                      <div className="space-y-4">
                        {mConfig.faqs
                          .filter((faq: any) => faq && faq.enabled !== false && faq.question && faq.question.trim() !== '')
                          .sort((a: any, b: any) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0))
                          .map((faq: any, idx: number) => {
                            const isExpanded = expandedImplantFaqId === faq.id;
                            return (
                              <div 
                                key={faq.id || idx}
                                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                                  isExpanded 
                                    ? 'border-[#0D9488]/30 shadow-2xs' 
                                    : 'border-slate-150 hover:border-slate-300 shadow-3xs'
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() => setExpandedImplantFaqId(isExpanded ? null : faq.id)}
                                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-slate-50/40"
                                >
                                  <span className={`font-sans font-bold text-sm sm:text-base leading-snug pr-4 transition-colors duration-200 ${
                                    isExpanded ? 'text-[#0D9488]' : 'text-[#081C3A]'
                                  }`}>
                                    {faq.question}
                                  </span>
                                  <span className={`p-1.5 rounded-lg shrink-0 transition-all duration-300 ${
                                    isExpanded ? 'bg-teal-50 text-[#0D9488] rotate-180' : 'bg-slate-50 text-slate-400'
                                  }`}>
                                    <ChevronDown className="h-4 w-4 transition-transform duration-300" />
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
                                      <div className="px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100/50 bg-slate-50/20">
                                        <p className="whitespace-pre-line font-medium">
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
                  </div>
                )}
              </div>
            );
          }

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
                          const showYt = false;
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
        {(mConfig.contact_bar_show && service.id !== 'implants-srv') && (
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
