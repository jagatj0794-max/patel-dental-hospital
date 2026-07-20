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
import { serviceService } from '../utils/serviceData';
import { contactService, DEFAULT_CONTACT_INFO } from '../utils/contactData';
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

  // Lightbox modal state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Active videos for iframe embedding
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});

  // Active photo tab for split media galleries
  const [activePhotoTab, setActivePhotoTab] = useState<'hospital' | 'team' | 'equipment'>('hospital');
  
  // Custom states for Dental Implants specific view
  const [implantCategory, setImplantCategory] = useState<string>('all');
  const [implantLightboxIndex, setImplantLightboxIndex] = useState<number | null>(null);

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
    if (rawSteps.length === 0 && fallback.process_steps) {
      return fallback.process_steps;
    }
    return Array.isArray(rawSteps)
      ? [...rawSteps].sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
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
    if (rawFeatures.length === 0 && fallback.features) {
      return fallback.features;
    }
    return Array.isArray(rawFeatures)
      ? [...rawFeatures].sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
      : [];
  }, [service, fallback]);

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

  const isDentalImplants = slug === 'dental-implants' || (service && service.slug === 'dental-implants');

  if (isDentalImplants) {
    // Parse marketing_config safely
    const rawConfig = service?.marketing_config || {};
    const mConfig: any = typeof rawConfig === 'string'
      ? (() => { try { return JSON.parse(rawConfig); } catch(e) { return {}; } })()
      : rawConfig;

    // 1. Hero variables
    const showHero = mConfig.show_hero !== false;
    const heroTitle = service?.title || 'Dental Implants';
    const heroSubtitle = service?.hero_title || 'Restore Your Natural Smile & Chewing Strength';
    const heroDescText = service?.hero_description || "Dental implant is an artificial tooth placed in your mouth for better chewing efficiency and to enhance your smile and quality of life.\n\nIt is ideal for replacing missing teeth and loose teeth due to pyorrhea.\n\nPatel Dental Hospital provides fixed teeth in just one week using advanced dental implant technology.";
    const heroImgUrl = service?.hero_image || service?.homepage_card_image || imgImplants;
    const bookBtnText = mConfig.cta_appointment_text || 'Book Appointment';
    const bookBtnLink = mConfig.primary_cta_link || '';
    const whatsappBtnText = mConfig.cta_whatsapp_text || 'WhatsApp Now';
    const whatsappNumber = mConfig.contact_whatsapp_number || '919510397046';

    // 2. Overview variables
    const showOverview = mConfig.show_overview !== false;
    const overviewSubtitle = mConfig.overview_subtitle || 'Procedural Overview';
    const overviewTitle = mConfig.overview_title || 'What Are Dental Implants?';
    const overviewDesc = service?.description || "A dental implant is a premium, highly stable biological titanium screw post placed securely into the jawbone. It serves as an artificial root that permanently supports natural-looking ceramic crowns or fixed prosthetics.";
    const overviewHighlight = mConfig.overview_highlight || "Ideal solution for patients suffering from loose teeth or severe bone loss due to pyorrhea, restoring 100% biting and chewing force.";
    
    const DEFAULT_INFO_CARDS = [
      { title: "Missing Teeth Replacement", desc: "Permanently fills single, multiple, or completely bare dental arches with natural-looking teeth." },
      { title: "Loose Teeth due to Pyorrhea", desc: "Provides absolute stability for loose teeth, anchoring them firmly into healthy, supportive bone." },
      { title: "Better Chewing Efficiency", desc: "Fully restores mastication forces, allowing you to eat tough or firm foods with ease." },
      { title: "Better Smile Aesthetics", desc: "Crafts a natural look that aligns perfectly with your facial features and lip support." },
      { title: "Better Quality of Life", desc: "Enhances communication, dietary freedom, and daily confidence permanently." }
    ];
    const infoCards = Array.isArray(mConfig.info_cards) && mConfig.info_cards.length > 0
      ? mConfig.info_cards
      : DEFAULT_INFO_CARDS;

    // 3. Workflow steps variables
    const showWorkflow = mConfig.show_workflow !== false;
    const workflowBadge = mConfig.workflow_badge || 'Scientific Protocol';
    const workflowTitle = mConfig.workflow_title || 'Our Advanced Clinical Workflow';
    const workflowSubtitle = mConfig.workflow_subtitle || 'Step-by-step path to delivering permanently fixed, high-functioning teeth with absolute precision and safety.';
    
    // Workflow process_steps array from service
    const rawSteps = service?.process_steps;
    const stepsArray = Array.isArray(rawSteps)
      ? rawSteps
      : (typeof rawSteps === 'string'
        ? (() => { try { return JSON.parse(rawSteps); } catch(e) { return []; } })()
        : []);
    
    // Bullet list for Step 2 of workflow
    const DEFAULT_VIRTUAL_BULLETS = [
      { label: "Accurate implant positioning", text: "Mathematically mapped to avoid vital nerves." },
      { label: "Opposite arch alignment", text: "Guarantees a perfectly balanced chewing bite." },
      { label: "Better chewing efficiency", text: "Restores massive chewing and biting forces." },
      { label: "Smile line enhancement", text: "Aligns crowns flawlessly with your lip contours." },
      { label: "Better aesthetics", text: "Replicates natural tooth contours and shade." },
      { label: "Better cleansability", text: "Designed for simple daily flossing & hygiene." },
      { label: "Long implant life", text: "Increases structural stability for lifelong success." }
    ];
    const virtualBullets = Array.isArray(mConfig.virtual_planning_bullets) && mConfig.virtual_planning_bullets.length > 0
      ? mConfig.virtual_planning_bullets
      : DEFAULT_VIRTUAL_BULLETS;

    // 4. Clinical Cards variables
    const showSuperior = mConfig.show_superior !== false;
    const superiorBadge = mConfig.superior_badge || 'Aesthetic Superiority';
    const superiorTitle = mConfig.superior_title || 'Why Our Method Is Superior';
    const superiorSubtitle = mConfig.superior_subtitle || 'A comparison of our advanced surgical and prosthetic standards against conventional alternatives.';
    
    // Clinical cards array from service.features
    const rawFeatures = service?.features;
    const featuresArray = Array.isArray(rawFeatures)
      ? rawFeatures
      : (typeof rawFeatures === 'string'
        ? (() => { try { return JSON.parse(rawFeatures); } catch(e) { return []; } })()
        : []);

    const DEFAULT_FEATURES = [
      {
        title: "Osseointegrated Stability",
        text: "Our dental implants are permanently attached and biological fused directly into your bone, ensuring massive support. We completely avoid temporary or conventional basal implants, which offer inferior bone bonding and stability."
      },
      {
        title: "Screw Retained Prosthesis",
        text: "Instead of using messy cement which can leak and trigger gum infections, we implement high-tech, clean screw-retained prosthetics which are incredibly safe and stable."
      },
      {
        title: "5-Minute Removal Capability",
        text: "Our specialized screw-on systems allow the doctor to safely remove the entire prosthetic teeth within five minutes for deep clinical cleaning, sterilization, and easy maintenance checkups."
      },
      {
        title: "Ideal for Pan Masala Patients",
        text: "Engineered specifically using high-grade, resilient materials that can withstand high abrasive mastication and biting forces. It is the ideal setup even for pan masala chewing patients."
      },
      {
        title: "Screw-on-Screw Fixation",
        text: "Our advanced double screw-on-screw secure system guarantees that the connection remains perfectly rigid and completely eliminates any risk of screw loosening, drastically extending implant assembly life."
      },
      {
        title: "Profound Clinical Volume",
        text: "Led by Dr. Vipul Patel, our clinical team has completed over 7000+ successful dental implant placements and over 350+ complex Full Mouth Rehabilitation cases with impeccable outcomes."
      },
      {
        title: "In-House CBCT Verification",
        text: "We perform an immediate in-house CBCT scan checkup post-placement. This allows our clinical team to instantly verify the exact perfect angle, depth, and osseous alignment."
      },
      {
        title: "Advanced Bone Grafting",
        text: "No bone? No problem. We perform specialized sinus lifts, ridge expansions, and advanced bone grafting for patients with deficient or thin bone structure, enabling lifelong implant stability."
      },
      {
        title: "Long-Term Proven Safety",
        text: "We don't just place and forget. Our clinical records track active patient follow-up cases spanning 2 to 5 years, showcasing zero bone resorption and 100% active chewing success."
      },
      {
        title: "International Implant Standards",
        text: "We import only the finest clinical systems. Patel Dental Hospital utilizes strictly premium, US FDA-approved titanium implants and high-purity zirconia materials matching European centers."
      }
    ];

    const finalFeatures = featuresArray.length > 0 ? featuresArray : DEFAULT_FEATURES;

    // 5. Clinical Gallery variables
    const showGallery = mConfig.show_gallery !== false;
    const galleryBadge = mConfig.gallery_badge || 'Visual Evidence';
    const galleryTitle = mConfig.gallery_title || 'Clinical Case Gallery';
    const gallerySubtitle = mConfig.gallery_subtitle || 'Explore real successful clinical outcomes from Patel Dental Hospital.';
    
    const IMPLANT_GALLERY_ITEMS = Array.isArray(mConfig.gallery_items) && mConfig.gallery_items.length > 0
      ? mConfig.gallery_items
      : [
          {
            id: 'g-single-1',
            category: 'single',
            image_url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800',
            caption: 'Single Tooth Implant with precision ceramic crown replacement',
            alt_text: 'Single Implant restoration'
          },
          {
            id: 'g-double-1',
            category: 'double',
            image_url: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800',
            caption: 'Double Dental Implant anchors for stable tooth-coloured restoration',
            alt_text: 'Double Implant placement'
          },
          {
            id: 'g-quadrant-1',
            category: 'quadrant',
            image_url: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&q=80&w=800',
            caption: 'Partial Quadrant bridge supported securely by titanium implants',
            alt_text: 'Quadrant dental implant restoration'
          },
          {
            id: 'g-fullmouth-1',
            category: 'fullmouth',
            image_url: 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=800',
            caption: 'Complete Full Mouth Rehabilitation with implant-supported hybrid prosthesis',
            alt_text: 'Full Mouth Rehabilitation'
          },
          {
            id: 'g-fullmouth-2',
            category: 'fullmouth',
            image_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
            caption: 'Restored smile bite and face harmony with fixed screw-retained bridges',
            alt_text: 'Smile transformation full arch'
          }
        ];

    const IMPLANT_REVIEWS = Array.isArray(mConfig.written_reviews) && mConfig.written_reviews.length > 0
      ? mConfig.written_reviews
      : [
          {
            name: 'Rajesh Shah',
            age: 58,
            location: 'Ahmedabad',
            treatment: 'Full Mouth Rehabilitation',
            text: "For years I suffered from loose teeth due to pyorrhea and couldn't chew properly. Dr. Vipul Patel placed implants and within a week, I received my fixed teeth. I can eat everything comfortably now, my chewing efficiency is back!",
            rating: 5
          },
          {
            name: 'Meena Patel',
            age: 46,
            location: 'Mehsana',
            treatment: 'Single & Double Implants',
            text: "The digital CBCT planning made the procedure painless. The placement was so accurate and there was no swelling. The cost of implants at Patel Dental Hospital was half of what other clinics quoted, with US FDA standard quality.",
            rating: 5
          },
          {
            name: 'Anil Desai',
            age: 62,
            location: 'Unjha',
            treatment: 'Screw-Retained Prosthesis',
            text: "Highly recommended for dental implants. The screw-on-screw technology is excellent, and Dr. Patel explained everything very professionally. Their in-house CBCT scan verified everything perfectly.",
            rating: 5
          }
        ];

    const filteredGallery = implantCategory === 'all'
      ? IMPLANT_GALLERY_ITEMS
      : IMPLANT_GALLERY_ITEMS.filter((item: any) => item.category === implantCategory);

    // 6. Procedure Video variables
    const showProcedureVideo = mConfig.show_procedure_video !== false;
    const procedureVideoBadge = mConfig.procedure_video_badge || 'Procedure Guide Video';
    const procedureVideoTitle = mConfig.procedure_video_title || 'Screw Retained Prosthesis Procedure';
    const procedureVideoSubtitle = mConfig.procedure_video_subtitle || 'Watch this comprehensive guide detailing how we construct, position, and securely lock the modern screw-retained teeth prosthesis onto premium implants.';
    const procedureVideoEmbedUrl = mConfig.procedure_video_embed_url || 'https://www.youtube.com/embed/cbVcmy53KBs?rel=0&autoplay=0';

    // 7. Patient Testimonial Videos variables
    const showTestimonialSection = mConfig.show_testimonials !== false;
    const testimonialsBadge = mConfig.testimonials_badge || 'Clinical Outcomes';
    const testimonialsTitle = mConfig.testimonials_title || 'Patient Testimonial Videos';

    // 8. Hospital & Team variables
    const showHospitalSection = mConfig.show_hospital_team !== false;
    const hospitalBadge = mConfig.hospital_team_badge || 'Hospital & Team';
    const hospitalTitle = mConfig.hospital_team_title || 'Our Advanced Premise & Elite Team';
    const hospitalSubtitle = mConfig.hospital_team_subtitle || 'A visual tour of our world-class surgical theatres, high-resolution diagnosis suits, and doctor-team collaboration environments.';
    
    // 9. Final CTA variables
    const showFinalCta = mConfig.show_final_cta !== false;
    const ctaTitle = mConfig.final_cta_title || 'Ready to Restore Your Biting Force & Natural Smile?';
    const ctaSubtitle = mConfig.final_cta_subtitle || 'Schedule an in-house CBCT scan and consult directly with Dr. Vipul Patel to design your custom fixed dental implant treatment path.';
    const ctaCallText = mConfig.final_cta_call_text || 'Call Now';
    const ctaCallNumber = mConfig.final_cta_call_number || '+919510397046';
    const ctaWhatsappText = mConfig.final_cta_whatsapp_text || 'Chat on WhatsApp';
    const ctaWhatsappNumber = mConfig.final_cta_whatsapp_number || '919510397046';
    const ctaCallbackText = mConfig.final_cta_callback_text || 'Request Callback';

    return (
      <div className="min-h-screen bg-slate-50/50 pb-20 selection:bg-[#0D9488]/20 selection:text-[#081C3A] font-sans antialiased text-slate-800">
        
        {/* Navigation Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToServices}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0D9488] transition-colors py-2 px-4 bg-white border border-slate-200/80 rounded-xl shadow-xs cursor-pointer group"
            >
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Back to Treatments
            </button>
            <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider">
              <span className="cursor-pointer hover:text-slate-600" onClick={handleBackToServices}>Treatments</span>
              <span>/</span>
              <span className="text-[#0D9488] font-black">Dental Implants</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: Premium Hero */}
        {showHero && (
          <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Hero content */}
                <div className="lg:col-span-7 space-y-8 text-left">
                  
                  <div className="space-y-4">
                    <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#081C3A] tracking-tight leading-[1.1]">
                      {heroTitle}
                    </h1>
                    <p className="text-lg sm:text-xl text-[#0D9488] font-bold tracking-wide">
                      {heroSubtitle}
                    </p>
                  </div>

                  <div className="text-slate-600 space-y-4 text-sm sm:text-base leading-relaxed max-w-2xl">
                    {heroDescText.split('\n\n').map((para, pIdx) => (
                      <p key={pIdx} className={pIdx === heroDescText.split('\n\n').length - 1 ? "font-semibold text-[#081C3A]" : ""}>
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Hero CTA buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    {bookBtnLink ? (
                      <a
                        href={bookBtnLink}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-sm font-black rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>{bookBtnText}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    ) : (
                      <button
                        onClick={() => openAppointmentModal("Dental Implants - Hero Page CTA")}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-sm font-black rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>{bookBtnText}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    )}
                    <a
                      href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20Patel%20Dental%20Hospital,%20I%20am%20interested%20in%20Dental%20Implants.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-black rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <MessageSquare className="h-4 w-4 fill-white" />
                      <span>{whatsappBtnText}</span>
                    </a>
                  </div>
                </div>

                {/* Hero image panel */}
                <div className="lg:col-span-5 relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-3xl blur-2xl -z-10" />
                  <div className="border border-slate-200/60 bg-white p-3 rounded-[32px] shadow-xl">
                    <img
                      src={heroImgUrl}
                      alt={heroTitle}
                      className="w-full h-[400px] object-cover rounded-[24px]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: Treatment Overview */}
        {showOverview && (
          <section className="py-16 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Text column */}
                <div className="space-y-6 text-left">
                  <div className="space-y-2">
                    <p className="text-xs font-black text-[#0D9488] uppercase tracking-widest">{overviewSubtitle}</p>
                    <h2 className="font-display font-black text-3xl sm:text-4xl text-[#081C3A] tracking-tight">
                      {overviewTitle}
                    </h2>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    {overviewDesc}
                  </p>

                  <div className="border-l-4 border-[#0D9488] pl-4 py-1.5 bg-teal-50/30 rounded-r-xl">
                    <p className="text-[#081C3A] font-bold text-sm leading-relaxed">
                      {overviewHighlight}
                    </p>
                  </div>
                </div>

                {/* Value list column */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {infoCards.map((item: any, idx: number) => (
                    <div key={idx} className="p-5 bg-slate-50 border border-slate-150 rounded-2xl text-left space-y-2 hover:border-teal-500/20 transition-all">
                      <div className="h-8 w-8 bg-teal-50 text-[#0D9488] rounded-lg flex items-center justify-center font-bold text-xs">
                        0{idx + 1}
                      </div>
                      <h3 className="font-bold text-[#081C3A] text-sm">{item.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc || item.description}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: How We Perform Dental Implants */}
        {showWorkflow && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <span className="text-xs font-black text-[#0D9488] uppercase tracking-widest">{workflowBadge}</span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-[#081C3A] tracking-tight">
                  {workflowTitle}
                </h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  {workflowSubtitle}
                </p>
              </div>

              {/* Vertical timeline */}
              <div className="max-w-4xl mx-auto relative before:absolute before:inset-y-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-slate-200">
                {finalSteps.map((step: any, idx: number) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div key={idx} className={`relative ${idx === finalSteps.length - 1 ? "" : "mb-12 sm:mb-16"}`}>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-12">
                        {/* Left / Top panel */}
                        {isEven ? (
                          <div className="sm:w-[45%] text-left sm:text-right space-y-2 pl-10 sm:pl-0 order-2 sm:order-1">
                            <span className="inline-block px-3 py-1 bg-teal-50 text-[#0D9488] text-[10px] font-extrabold uppercase rounded-md">{step.tag || step.badge || 'Clinical Phase'}</span>
                            <h3 className="font-display font-black text-lg text-[#081C3A]">{step.title}</h3>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                              {step.description || step.desc}
                            </p>
                          </div>
                        ) : (
                          <div className="sm:w-[45%] hidden sm:block order-1" />
                        )}

                        {/* Timeline circle */}
                        <div className={`absolute left-0 sm:left-1/2 -translate-x-1/2 h-8 w-8 bg-[#0D9488] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-md z-10 ${isEven ? 'order-1' : 'order-2'}`}>
                          {idx + 1}
                        </div>

                        {/* Right / Bottom panel */}
                        {!isEven ? (
                          <div className="sm:w-[45%] text-left space-y-3 pl-10 sm:pl-0 order-3">
                            <span className="inline-block px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-extrabold uppercase rounded-md">{step.tag || step.badge || 'Clinical Phase'}</span>
                            <h3 className="font-display font-black text-lg text-[#081C3A]">{step.title}</h3>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                              {step.description || step.desc}
                            </p>
                            
                            {/* If index is 1 (Step 2: Virtual Planning), we can display the custom bullets list! */}
                            {idx === 1 && (
                              <div className="grid grid-cols-1 gap-2 border-t border-slate-100 pt-3">
                                {virtualBullets.map((bullet: any, bidx: number) => (
                                  <div key={bidx} className="flex items-start gap-2 text-xs text-left">
                                    <CheckCircle className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                    <div>
                                      <span className="font-bold text-[#081C3A]">{bullet.label}</span>
                                      <span className="text-slate-500"> - {bullet.text}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="sm:w-[45%] order-3 hidden sm:block" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>
        )}

        {/* SECTION 5: Why Our Ultra Modern Method Is Superior */}
        {showSuperior && (
          <section className="py-20 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <span className="text-xs font-black text-[#0D9488] uppercase tracking-widest">{superiorBadge}</span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-[#081C3A] tracking-tight">
                  {superiorTitle}
                </h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  {superiorSubtitle}
                </p>
              </div>

              {/* 10 elegant numbered cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {finalFeatures.map((point: any, pidx: number) => (
                  <div 
                    key={pidx} 
                    className="flex flex-col h-full p-8 bg-white border border-slate-100 rounded-3xl text-left space-y-6 hover:border-[#0D9488]/30 transition-all duration-300 hover:shadow-xl relative overflow-hidden group shadow-xs"
                  >
                    <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-[#0D9488]/5 to-transparent rounded-full -z-10 group-hover:scale-110 transition-transform duration-500" />
                    
                    <div className="h-12 w-12 bg-teal-50/75 border border-teal-100/50 rounded-2xl flex items-center justify-center font-display font-black text-[#0D9488] shadow-xs group-hover:bg-[#0D9488] group-hover:text-white transition-colors duration-300">
                      {String(pidx + 1).padStart(2, '0')}
                    </div>

                    <div className="space-y-3 flex-grow">
                      <h3 className="font-display font-black text-lg text-[#081C3A] tracking-tight group-hover:text-[#0D9488] transition-colors duration-300">
                        {point.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed font-normal">
                        {point.text || point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 6: Clinical Case Gallery */}
        {showGallery && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
                <span className="text-xs font-black text-[#0D9488] uppercase tracking-widest">{galleryBadge}</span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-[#081C3A] tracking-tight">
                  {galleryTitle}
                </h2>
                <p className="text-slate-500 text-sm sm:text-base">
                  {gallerySubtitle}
                </p>
              </div>

              {/* Category tabs */}
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {[
                  { id: 'all', label: 'All Cases' },
                  { id: 'single', label: 'Single Implant' },
                  { id: 'double', label: 'Double Implant' },
                  { id: 'quadrant', label: 'Quadrant Cases' },
                  { id: 'fullmouth', label: 'Full Mouth Rehabilitation' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setImplantCategory(tab.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      implantCategory === tab.id
                        ? 'bg-[#0D9488] text-white shadow-md'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGallery.map((item: any, idx: number) => (
                  <div
                    key={item.id || idx}
                    onClick={() => setImplantLightboxIndex(idx)}
                    className="bg-white border border-slate-150 p-2.5 rounded-2xl hover:border-teal-500/40 transition-all hover:shadow-lg cursor-zoom-in group"
                  >
                    <div className="relative overflow-hidden rounded-xl h-56 bg-slate-100">
                      <img
                        src={item.image_url}
                        alt={item.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                          <ImageIcon className="h-4 w-4" />
                          Click to view full case
                        </span>
                      </div>
                    </div>
                    <div className="p-3 text-left">
                      <p className="text-xs font-black text-[#0D9488] uppercase tracking-wider mb-1">
                        {item.category === 'single' ? 'Single Implant' : 
                         item.category === 'double' ? 'Double Implant' : 
                         item.category === 'quadrant' ? 'Quadrant Case' : 'Full Mouth Rehabilitation'}
                      </p>
                      <p className="text-xs font-semibold text-[#081C3A] line-clamp-2">{item.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 7: Procedure Video */}
        {showVideo && (
          <section className="py-20 bg-white border-y border-slate-100">
            <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-black text-[#0D9488] uppercase tracking-widest block mb-1">Procedure Guide Video</span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-[#081C3A] tracking-tight">
                  {videoTitle}
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                  {videoDesc}
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-150 p-3 sm:p-5 shadow-xl max-w-3xl mx-auto">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-950 shadow-inner">
                  <iframe
                    src={videoSource}
                    title={videoTitle}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 7.5: Patient Testimonial Videos */}
        {showTestimonialVideos && (
          <section className="py-20 bg-slate-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
              <div className="space-y-3 max-w-2xl mx-auto">
                <span className="text-xs font-black text-[#0D9488] uppercase tracking-widest block mb-1">
                  {testimonialVideosSubtitle}
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-[#081C3A] tracking-tight">
                  {testimonialVideosTitle}
                </h2>
              </div>

              {displayTestimonials.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayTestimonials.map((t: any, idx: number) => (
                    <div key={idx} className="bg-white rounded-3xl border border-slate-150 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 space-y-4 flex flex-col justify-between">
                      {t.video_url && (
                        <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
                          {activeVideos[`testimonial-implants-${idx}`] ? (
                            isYouTubeUrl(t.video_url) ? (
                              <iframe
                                className="w-full h-full border-0 absolute inset-0 z-10"
                                src={`${getYouTubeEmbedUrl(t.video_url)}?autoplay=1&rel=0`}
                                title={`${t.patient_name}'s Review`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
                              onClick={() => setActiveVideos(prev => ({ ...prev, [`testimonial-implants-${idx}`]: true }))}
                              className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                              aria-label={`Play review by ${t.patient_name}`}
                            >
                              <img
                                src={isYouTubeUrl(t.video_url) ? `https://img.youtube.com/vi/${t.video_url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)?.[2] || 'cbVcmy53KBs'}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600'}
                                alt={`${t.patient_name}'s video review thumbnail`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
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
                      <div className="text-left space-y-1">
                        <h4 className="font-display font-black text-base text-[#081C3A] tracking-tight">{t.patient_name}</h4>
                        <p className="text-xs text-[#0D9488] font-bold uppercase tracking-wider">{t.treatment_name || 'Patient Testimonial'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="bg-white rounded-3xl border border-slate-150 p-4 sm:p-5 shadow-sm space-y-4 flex flex-col justify-between opacity-80">
                      <div className="aspect-video w-full bg-slate-100 rounded-2xl relative overflow-hidden flex items-center justify-center border border-dashed border-slate-200">
                        <div className="flex flex-col items-center justify-center space-y-2 text-slate-400">
                          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 text-[#0D9488]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 translate-x-0.5"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider">CMS Ready Video Placeholder</span>
                        </div>
                      </div>
                      <div className="text-left space-y-1">
                        <h4 className="font-display font-black text-base text-slate-300 tracking-tight">Patient Name</h4>
                        <p className="text-xs text-slate-300 font-bold uppercase tracking-wider">Short Treatment Title</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* SECTION 8: Call & WhatsApp Section */}
        {showQuestions && (
          <section className="py-16">
            <div className="max-w-5xl mx-auto px-4">
              <div className="bg-white border border-slate-150 rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4 text-left">
                    <span className="inline-flex px-3 py-1 bg-teal-50 text-[#0D9488] text-[10px] font-black uppercase tracking-widest rounded-md leading-none">
                      {questionsBadge}
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-[#081C3A] tracking-tight leading-tight">
                      {questionsTitle}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
                      {questionsDesc}
                    </p>
                  </div>

                  <div className="lg:col-span-5 flex flex-col gap-3.5 w-full">
                    <a
                      href={questionsCallLink}
                      className="w-full py-4 px-6 bg-white border border-slate-200 hover:bg-slate-50 text-[#081C3A] font-black text-sm rounded-xl flex items-center justify-center gap-3 shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <Phone className="h-4 w-4 text-[#0D9488]" />
                      <span>{questionsCallText}</span>
                    </a>
                    <a
                      href={questionsWaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-white font-black text-sm rounded-xl flex items-center justify-center gap-3 shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <MessageSquare className="h-4 w-4 fill-white" />
                      <span>{questionsWaText}</span>
                    </a>
                    <button
                      onClick={() => openAppointmentModal("Dental Implants - Quick Connect Section")}
                      className="w-full py-4 px-6 bg-amber-500 hover:bg-amber-600 text-[#081C3A] font-black text-sm rounded-xl flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>{questionsCallbackText}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 9: Cost Of Dental Implants */}
        {showCost && (
          <section className="py-12 bg-white border-y border-slate-100">
            <div className="max-w-4xl mx-auto px-4">
              <div className="border border-slate-200 bg-slate-50/50 p-8 sm:p-12 rounded-[32px] shadow-sm relative overflow-hidden text-center space-y-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 bg-amber-50 text-amber-500 border border-amber-100 rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8" />
                </div>
                
                <div className="space-y-2 pt-6">
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#081C3A]">
                    {costTitle}
                  </h3>
                  <div className="h-1 w-16 bg-[#0D9488] mx-auto rounded-full" />
                </div>

                <div className="py-4">
                  <span className="inline-block bg-amber-500 text-[#081C3A] font-display font-black text-3xl sm:text-4xl md:text-5xl px-8 py-3.5 rounded-2xl shadow-sm tracking-tight transform rotate-[-1deg]">
                    {costBadge}
                  </span>
                  <p className="mt-4 font-display font-bold text-lg text-[#0D9488] uppercase tracking-wider">
                    {costSub}
                  </p>
                </div>

                <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  {costDesc}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 border-t border-slate-150 max-w-md mx-auto">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Connect to check exact pricing:</p>
                  <div className="flex gap-3">
                    <a href={costCallLink} className="p-2.5 bg-white border border-slate-200 rounded-xl text-[#081C3A] font-black text-xs hover:border-teal-500 transition-colors">
                      {costCallText}
                    </a>
                    <a href={costWaLink} className="p-2.5 bg-[#25D366] text-white rounded-xl font-black text-xs hover:bg-[#20BA5A] transition-colors">
                      {costWaText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 10: Hospital & Team */}
        {showHospital && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <span className="text-xs font-black text-[#0D9488] uppercase tracking-widest">{hospitalBadge}</span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-[#081C3A] tracking-tight">
                  {hospitalTitle}
                </h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  {hospitalSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Hospital image */}
                <div className="lg:col-span-6">
                  <div className="border border-slate-200 p-2.5 bg-white rounded-3xl shadow-lg">
                    <img
                      src={hospitalImage}
                      alt={hospitalTitle}
                      className="w-full h-80 object-cover rounded-2xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Team profile info */}
                <div className="lg:col-span-6 text-left space-y-6">
                  <div className="space-y-1">
                    <h3 className="font-display font-black text-2xl text-[#081C3A]">{hospitalDoctorName}</h3>
                    <p className="text-[#0D9488] text-sm font-black uppercase tracking-wider">{hospitalDoctorTitle}</p>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {hospitalDoctorDesc}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-slate-150 rounded-xl">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{hospitalLegacyTitle}</p>
                      <p className="text-sm font-bold text-[#081C3A]">{hospitalLegacyDesc}</p>
                    </div>
                    <div className="p-4 bg-white border border-slate-150 rounded-xl">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{hospitalEquipTitle}</p>
                      <p className="text-sm font-bold text-[#081C3A]">{hospitalEquipDesc}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* SECTION 11: Patient Reviews */}
        <section className="py-20 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs font-black text-[#0D9488] uppercase tracking-widest">Testimonials</span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-[#081C3A] tracking-tight">
                Patient Success Stories
              </h2>
              <p className="text-slate-500 text-sm sm:text-base">
                Read real-life transformations from patients who restored their chewing force and smiles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {IMPLANT_REVIEWS.map((review, ridx) => (
                <div key={ridx} className="p-6 bg-slate-50 border border-slate-150 rounded-2xl text-left space-y-4 hover:border-teal-500/20 transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                      "{review.text}"
                    </p>
                  </div>
                  
                  <div className="border-t border-slate-150 pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-[#081C3A]">{review.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{review.treatment} - {review.location}</p>
                    </div>
                    <span className="text-[10px] font-black bg-teal-50 text-[#0D9488] py-1 px-2.5 rounded-md uppercase tracking-wider">Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 12: Final CTA */}
        <section className="py-20 bg-slate-50/30">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white border border-slate-150 rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl text-center space-y-8">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full">
                  <Sparkles className="h-3.5 w-3.5 text-[#0D9488] animate-pulse" />
                  Restore Your Smile Today
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#081C3A] tracking-tight leading-tight">
                  Ready For Fixed Teeth In 1 Week?
                </h2>
                <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                  Take the first step towards perfect chewing and a premium beautiful smile. Schedule your 3D CBCT consultation with Dr. Vipul Patel today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <button
                  onClick={() => openAppointmentModal("Dental Implants - Final CTA")}
                  className="w-full sm:w-auto px-8 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Appointment</span>
                </button>
                <a
                  href="tel:+919510397046"
                  className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-[#081C3A] text-xs font-black rounded-xl shadow-md hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="h-4 w-4 text-[#0D9488]" />
                  <span>Call Now</span>
                </a>
                <a
                  href="https://wa.me/919510397046?text=Hi%20Patel%20Dental%20Hospital,%20I'm%20interested%20in%20Dental%20Implants."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white text-xs font-black rounded-xl shadow-md hover:bg-[#20BA5A] transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-4 w-4 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Lightbox Overlay for Section 6 */}
        <AnimatePresence>
          {implantLightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setImplantLightboxIndex(null)}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 cursor-zoom-out select-none"
            >
              <div className="w-full max-w-5xl mx-auto flex items-center justify-between text-white py-2">
                <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-widest">
                  CASE IMAGE {implantLightboxIndex + 1} OF {filteredGallery.length}
                </span>
                <button
                  onClick={() => setImplantLightboxIndex(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white cursor-pointer focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 flex items-center justify-center max-w-5xl mx-auto w-full relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setImplantLightboxIndex((implantLightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
                  }}
                  className="absolute left-0 p-3 bg-white/10 hover:bg-white/20 active:scale-95 rounded-full text-white transition-all cursor-pointer focus:outline-none z-10"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <motion.img
                  key={implantLightboxIndex}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  src={filteredGallery[implantLightboxIndex].image_url}
                  alt={filteredGallery[implantLightboxIndex].caption}
                  className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setImplantLightboxIndex((implantLightboxIndex + 1) % filteredGallery.length);
                  }}
                  className="absolute right-0 p-3 bg-white/10 hover:bg-white/20 active:scale-95 rounded-full text-white transition-all cursor-pointer focus:outline-none z-10"
                >
                  <ChevronLeft className="h-6 w-6 rotate-180" />
                </button>
              </div>

              <div className="w-full max-w-3xl mx-auto text-center py-4 space-y-1 text-white">
                <p className="text-sm font-bold tracking-wide">
                  {filteredGallery[implantLightboxIndex].caption}
                </p>
                <p className="text-xs text-slate-400">
                  Patel Dental Hospital - Treatment Case Result
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
        {(mConfig.offer_show !== false && mConfig.show_offer_banner !== false) && (
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

          const enabledWrittenReviews = (mConfig.written_reviews || []).filter((r: any) => r.enabled !== false);

          const testimonialsElement = (mConfig.show_testimonials !== false && (displayTestimonials.length > 0 || enabledWrittenReviews.length > 0)) ? (
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
              {enabledWrittenReviews.length > 0 && (
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
                    {enabledWrittenReviews.map((r) => (
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
