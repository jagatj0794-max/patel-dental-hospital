/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Calendar, Sparkles, AlertCircle, 
  ChevronDown, ChevronUp, Image as ImageIcon, MessageCircle, HelpCircle, 
  ArrowRight, Phone, Heart, CheckCircle2, X, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Service, ServiceGalleryItem, ServiceFaq, ContactInfo } from '../types';
import { serviceService } from '../utils/serviceData';
import { contactService, DEFAULT_CONTACT_INFO } from '../utils/contactData';

interface ServiceDetailProps {
  slug: string;
  openAppointmentModal: (preselectedTreatment?: string) => void;
  setCurrentPage?: (page: string) => void;
}

export default function ServiceDetail({ slug, openAppointmentModal, setCurrentPage }: ServiceDetailProps) {
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

  // Fetch Service and Related Content
  useEffect(() => {
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

          // Filter out the current service, ensure they are active, and slice to first 3
          const filteredRelated = allServices
            .filter(item => item.id !== fetchedService.id && item.is_active)
            .slice(0, 3);
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
    if (lightboxIndex !== null && gallery.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % gallery.length);
    }
  };

  const prevLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && gallery.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length);
    }
  };

  // Formulate WhatsApp API direct URL
  const getWhatsAppUrl = () => {
    if (!service) return '';
    const text = `Hi Patel Dental Hospital, I'm interested in booking a consultation for the "${service.title}" treatment. Please let me know the next available slot!`;
    return `https://wa.me/${contactInfo.whatsappRaw}?text=${encodeURIComponent(text)}`;
  };

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

        {/* 1. Hero Section (Premium Split Layout / Full Header Overlay) */}
        <div className="bg-white border border-slate-150 rounded-3xl overflow-hidden shadow-sm relative grid grid-cols-1 md:grid-cols-12">
          {/* Hero Left Info Section */}
          <div className="p-8 sm:p-12 md:col-span-7 flex flex-col justify-center space-y-6 relative z-10">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1 bg-teal-50 text-[#0D9488] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-teal-100/50">
                <Sparkles className="h-3 w-3 text-[#0D9488] animate-pulse" />
                Premium Care treatment
              </span>
              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#081C3A] tracking-tight leading-tight">
                {service.title}
              </h1>
            </div>
            
            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
              {service.short_description}
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
              <button
                type="button"
                onClick={() => openAppointmentModal(service.title)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <Calendar className="h-4 w-4" />
                Book Appointment
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Hero Right Media Image Section */}
          <div className="md:col-span-5 relative min-h-[300px] md:min-h-[450px] overflow-hidden bg-slate-100">
            <img
              src={service.hero_image || 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200'}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Elegant vignette shadow gradients */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent via-[#081C3A]/10 to-white md:to-white" />
          </div>
        </div>

        {/* 2. Grid Column Layout: About Treatment and Side Info Column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Informative Column */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* About / Full Description */}
            <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 md:p-10 shadow-3xs space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-8 w-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488]">
                  <Heart className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h2 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">
                    Advanced Dental Care
                  </h2>
                  <h3 className="text-lg font-black text-[#081C3A] tracking-tight">
                    About the Treatment
                  </h3>
                </div>
              </div>
              
              <div className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans font-medium">
                {service.description}
              </div>
            </div>

            {/* 3. Treatment Gallery Section */}
            {gallery.length > 0 && (
              <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-3xs space-y-6">
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
                    {gallery.length} Images
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gallery.map((item, index) => (
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
            )}

            {/* 4. FAQs Section */}
            {faqs.length > 0 && (
              <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-3xs space-y-6">
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
            )}

          </div>

          {/* Sidebar Area */}
          <div className="space-y-6 lg:sticky lg:top-24">
            
            {/* Quick Consultation Booking Box */}
            <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-3xs space-y-6">
              <div className="space-y-2">
                <span className="text-[9px] bg-red-50 text-rose-600 border border-rose-100 px-2.5 py-0.5 font-bold rounded-full uppercase tracking-widest leading-none inline-block animate-pulse">
                  Active booking
                </span>
                <h3 className="text-sm font-black text-[#081C3A] uppercase tracking-wider">
                  Clinic Slot Request
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Secure an expert panel diagnostic for your smiles. Pre-book to reduce waiting line queues.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => openAppointmentModal(service.title)}
                  className="w-full py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <Calendar className="h-4 w-4" />
                  Request Booking Slot
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
                
                <a
                  href={`tel:${contactInfo.phoneRaw}`}
                  className="w-full py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#081C3A] text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call Clinic Desk
                </a>
              </div>

              {/* Guarantees / High trust badges */}
              <div className="border-t border-slate-100 pt-5 space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-teal-50 flex items-center justify-center text-[#0D9488] shrink-0">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider">Expert Panel Doctors</h4>
                    <p className="text-[10px] text-slate-400">Treatment led by qualified professionals</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-teal-50 flex items-center justify-center text-[#0D9488] shrink-0">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider">Transparent Pricing</h4>
                    <p className="text-[10px] text-slate-400">Honest billing details before procedure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Helpline quick block */}
            <div className="bg-[#081C3A] text-white rounded-3xl p-6 shadow-md space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] bg-[#0D9488] text-white px-2 py-0.5 font-bold rounded-full uppercase tracking-widest leading-none inline-block">
                  Support
                </span>
                <h4 className="font-display font-black text-sm tracking-tight">Need Urgent Help?</h4>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Call our central reception branch or connect via WhatsApp to instantly handle urgent pain relief schedules.
                </p>
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <a 
                  href={`tel:${contactInfo.phoneRaw}`} 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-teal-300 transition-colors"
                >
                  📞 {contactInfo.phone}
                </a>
                <a 
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors"
                >
                  💬 WhatsApp Desk
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* 5. Related Services Component */}
        {relatedServices.length > 0 && (
          <div className="space-y-6 pt-6">
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
        )}

        {/* 6. Bottom Premium Large CTA */}
        <div className="bg-[#081C3A] text-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl relative overflow-hidden text-center space-y-6">
          {/* Subtle background glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0D9488]/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1 bg-[#0D9488] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full leading-none">
              Consultation Booking
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              Ready to Transform Your Smile?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Book a pain-free diagnostic consultation with our specialists in Rajkot. Experience high-end treatment tailored exactly to your clinical expectations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 relative z-10 pt-2">
            <button
              onClick={() => openAppointmentModal(service.title)}
              className="w-full sm:w-auto px-8 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-xl shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <Calendar className="h-4.5 w-4.5" />
              Book Appointment
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black rounded-xl shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-4.5 w-4.5" />
              WhatsApp Us
            </a>
          </div>
        </div>

      </div>

      {/* 7. Image Lightbox Modal with Framer Motion */}
      <AnimatePresence>
        {lightboxIndex !== null && gallery.length > 0 && (
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
                IMAGE {lightboxIndex + 1} OF {gallery.length}
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
                src={gallery[lightboxIndex].image_url}
                alt={gallery[lightboxIndex].caption || service.title}
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
                {gallery[lightboxIndex].caption || `${service.title} - Treatment Case Result`}
              </p>
              {gallery[lightboxIndex].alt_text && (
                <p className="text-xs text-slate-400">
                  {gallery[lightboxIndex].alt_text}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
