import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, ChevronDown, ChevronUp, Save, Check, 
  Image as ImageIcon, Video, Shield, Sparkles, MessageSquare, 
  ArrowUp, ArrowDown, Info, Link, Upload, Star, Eye
} from 'lucide-react';
import { Service, MarketingConfig } from '../types';
import { serviceService } from '../utils/serviceData';
import { uploadImage } from '../utils/supabaseStorage';
import { isSupabaseConfigured } from '../utils/supabase';
import CmsSectionToggle from './CmsSectionToggle';
import ProcedureVideoCmsSection from './ProcedureVideoCmsSection';
import TestimonialThumbnailUpload from './TestimonialThumbnailUpload';

interface UnifiedServiceCmsProps {
  serviceSlug: string;
  onSaveSuccess?: () => void;
}

export default function UnifiedServiceCms({ serviceSlug, onSaveSuccess }: UnifiedServiceCmsProps) {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Expanded sections state
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    hero: true, // Keep the first one open by default
  });

  const toggleSection = (sec: string) => {
    setExpandedSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  // Base64 file reader fallback for localStorage environments
  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Universal upload image handler
  const handleFileUpload = async (file: File): Promise<string | null> => {
    try {
      if (isSupabaseConfigured()) {
        return await uploadImage(file);
      } else {
        return await readFileAsBase64(file);
      }
    } catch (e: any) {
      console.error('File upload error, falling back to base64:', e);
      try {
        return await readFileAsBase64(file);
      } catch (fallbackErr) {
        setErrorMsg('Failed to process file upload.');
        return null;
      }
    }
  };

  // Load service on mount
  useEffect(() => {
    async function loadService() {
      try {
        setLoading(true);
        const list = await serviceService.getServices();
        const isCrownsSlug = (slug: string) => 
          slug === 'crowns' || 
          slug === 'crowns-bridges' || 
          slug === 'crown-and-bridges' || 
          slug === 'crowns-and-bridges';

        const found = list.find(s => {
          if (s.slug === serviceSlug || s.id === serviceSlug) return true;
          if (isCrownsSlug(serviceSlug) && (s.id === 'crowns' || isCrownsSlug(s.slug))) return true;
          return false;
        });
        if (found) {
          // Normalize service fields & marketing_config
          const normalized = { ...found };
          if (typeof normalized.marketing_config === 'string') {
            try {
              normalized.marketing_config = JSON.parse(normalized.marketing_config);
            } catch (e) {
              normalized.marketing_config = {};
            }
          }
          if (!normalized.marketing_config) {
            normalized.marketing_config = {};
          }
          if (typeof normalized.process_steps === 'string') {
            try {
              normalized.process_steps = JSON.parse(normalized.process_steps);
            } catch (e) {
              normalized.process_steps = [];
            }
          }
          if (typeof normalized.features === 'string') {
            try {
              normalized.features = JSON.parse(normalized.features);
            } catch (e) {
              normalized.features = [];
            }
          }
          if (typeof normalized.patient_testimonials === 'string') {
            try {
              normalized.patient_testimonials = JSON.parse(normalized.patient_testimonials);
            } catch (e) {
              normalized.patient_testimonials = [];
            }
          }
          if (typeof normalized.hospital_team_photos === 'string') {
            try {
              normalized.hospital_team_photos = JSON.parse(normalized.hospital_team_photos);
            } catch (e) {
              normalized.hospital_team_photos = [];
            }
          }

          setService(normalized);
        } else {
          setErrorMsg(`Service with slug "${serviceSlug}" could not be found.`);
        }
      } catch (err: any) {
        setErrorMsg(err.message || 'Failed to fetch service configuration.');
      } finally {
        setLoading(false);
      }
    }

    loadService();
  }, [serviceSlug]);

  if (loading) {
    return (
      <div className="p-8 bg-white border border-slate-150 rounded-2xl shadow-3xs flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D9488]" />
          <p className="text-slate-500 text-xs font-bold">Loading Service configurations...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="p-8 bg-white border border-slate-150 rounded-2xl shadow-3xs text-center">
        <p className="text-rose-500 text-xs font-bold">Error: Service details not loaded properly.</p>
      </div>
    );
  }

  const mConfig: MarketingConfig = service.marketing_config || {};

  const updateServiceField = (field: keyof Service, val: any) => {
    setService(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: val
      };
    });
  };

  const updateMConfigField = (key: string, val: any) => {
    setService(prev => {
      if (!prev) return prev;
      const currentConfig = typeof prev.marketing_config === 'string' ? {} : (prev.marketing_config || {});
      return {
        ...prev,
        ...((key === 'green_highlight_line') ? { green_highlight_line: val } : {}), // also sync directly if green_highlight_line
        marketing_config: {
          ...currentConfig,
          [key]: val
        }
      };
    });
  };

  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const payload: Service = {
        ...service,
        title: service.title?.trim() || service.title,
        process_steps: Array.isArray(service.process_steps) ? service.process_steps : [],
        features: Array.isArray(service.features) ? service.features : [],
        patient_testimonials: Array.isArray(service.patient_testimonials) ? service.patient_testimonials : [],
        hospital_team_photos: Array.isArray(service.hospital_team_photos) ? service.hospital_team_photos : [],
      };

      const result = await serviceService.saveService(payload);
      if (result.success) {
        setSuccessMsg('Service configurations saved successfully! Changes are immediately live.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onSaveSuccess?.();
      } else {
        setErrorMsg(result.error || 'Failed to save service configuration changes.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected exception occurred during save operations.');
    } finally {
      setSaving(false);
    }
  };

  // Section 2: Clinical Case Gallery Items
  const galleryItems = Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : [];
  const addGalleryItem = (url?: string) => {
    const nextOrder = galleryItems.length > 0 ? Math.max(...galleryItems.map((g: any) => Number(g.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `gallery-item-${Date.now()}`,
      image_url: url || '',
      category: 'Treatment Case',
      display_order: nextOrder
    };
    updateMConfigField('gallery_items', [...galleryItems, newItem]);
  };
  const deleteGalleryItem = (index: number) => {
    updateMConfigField('gallery_items', galleryItems.filter((_, i) => i !== index));
  };
  const moveGalleryItem = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= galleryItems.length) return;
    const updated = [...galleryItems];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updateMConfigField('gallery_items', updated);
  };
  const updateGalleryItemField = (index: number, key: string, val: any) => {
    const updated = [...galleryItems];
    updated[index] = { ...updated[index], [key]: val };
    updateMConfigField('gallery_items', updated);
  };

  // Section 4: Patient Testimonial Videos
  const testimonials = Array.isArray(service.patient_testimonials) ? service.patient_testimonials : [];
  const addTestimonialItem = () => {
    const nextOrder = testimonials.length > 0 ? Math.max(...testimonials.map((t: any) => Number(t.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `testi-${Date.now()}`,
      patient_name: 'Patient Name',
      video_url: '',
      thumbnail: '',
      treatment_name: service.title || 'Treatment',
      display_order: nextOrder
    };
    updateServiceField('patient_testimonials', [...testimonials, newItem]);
  };
  const deleteTestimonialItem = (index: number) => {
    updateServiceField('patient_testimonials', testimonials.filter((_, i) => i !== index));
  };
  const moveTestimonialItem = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= testimonials.length) return;
    const updated = [...testimonials];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updateServiceField('patient_testimonials', updated);
  };
  const updateTestimonialItemField = (index: number, key: string, val: any) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [key]: val };
    updateServiceField('patient_testimonials', updated);
  };

  // Section 5: Before & After Gallery
  const beforeAfterPairs = Array.isArray(mConfig.before_after_pairs) ? mConfig.before_after_pairs : [];
  const addBeforeAfterPair = () => {
    const nextOrder = beforeAfterPairs.length > 0 ? Math.max(...beforeAfterPairs.map((b: any) => Number(b.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `pair-${Date.now()}`,
      before_image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
      after_image: 'https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=600',
      caption: '',
      display_order: nextOrder
    };
    updateMConfigField('before_after_pairs', [...beforeAfterPairs, newItem]);
  };
  const deleteBeforeAfterPair = (index: number) => {
    updateMConfigField('before_after_pairs', beforeAfterPairs.filter((_, i) => i !== index));
  };
  const moveBeforeAfterPair = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= beforeAfterPairs.length) return;
    const updated = [...beforeAfterPairs];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updateMConfigField('before_after_pairs', updated);
  };
  const updateBeforeAfterPairField = (index: number, key: string, val: any) => {
    const updated = [...beforeAfterPairs];
    updated[index] = { ...updated[index], [key]: val };
    updateMConfigField('before_after_pairs', updated);
  };

  // Section 6: Google Patient Reviews
  const googleReviews = Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : [];
  const addGoogleReview = () => {
    const nextOrder = googleReviews.length > 0 ? Math.max(...googleReviews.map((r: any) => Number(r.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `review-${Date.now()}`,
      patient_name: '',
      patient_photo_url: '',
      rating: 5,
      review_text: '',
      review_date: '',
      review_url: '',
      display_order: nextOrder,
      enabled: true
    };
    updateMConfigField('google_reviews', [...googleReviews, newItem]);
  };
  const deleteGoogleReview = (index: number) => {
    updateMConfigField('google_reviews', googleReviews.filter((_, i) => i !== index));
  };
  const moveGoogleReview = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= googleReviews.length) return;
    const updated = [...googleReviews];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updateMConfigField('google_reviews', updated);
  };
  const updateGoogleReviewField = (index: number, key: string, val: any) => {
    const updated = [...googleReviews];
    updated[index] = { ...updated[index], [key]: val };
    updateMConfigField('google_reviews', updated);
  };

  return (
    <div className="space-y-6">
      {/* CMS Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-3xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#F0FDFA] text-[#0D9488]"><Shield className="h-5 w-5" /></span>
            {service.title} CMS Module
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-1">
            Configure every visible element of the {service.title} service page section-by-section.
          </p>
        </div>

        <button
          type="button"
          disabled={saving}
          onClick={() => handleSaveAll()}
          className="flex items-center gap-2 px-5 py-3 bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-50 text-white text-xs md:text-sm font-black rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          {saving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          ) : (
            <Save className="h-4.5 w-4.5" />
          )}
          Save All Changes
        </button>
      </div>

      {/* Success / Error Messages */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-xs font-bold leading-relaxed flex items-center gap-2 animate-fade-in shadow-2xs">
          <Check className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs font-bold leading-relaxed flex items-center gap-2 animate-fade-in shadow-2xs">
          <span>⚠️</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Collapsible Form Sections Container */}
      <div className="space-y-4">

        {/* 1. HERO SECTION */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('hero')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Sparkles className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">1. Hero Header</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure top branding, intro tagline, background image and dual actions</span>
              </div>
            </div>
            {expandedSections.hero ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.hero && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              {/* --- GENERAL SERVICE SETTINGS --- */}
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-150 space-y-4">
                <span className="text-[10px] font-black text-[#0D9488] uppercase tracking-wider block">Service Core Settings</span>
                
                {/* Service Active Status */}
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-800 block">Service Status (Enable/Disable)</span>
                    <span className="text-[9px] text-slate-400 font-medium">Toggle whether this service is enabled/active on the website</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={service.is_active !== false}
                      onChange={(e) => updateServiceField('is_active', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                  </label>
                </div>

                {/* Service Slug */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Service Page Slug (URL path)</label>
                  <input
                    type="text"
                    value={service.slug || ''}
                    onChange={(e) => updateServiceField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-'))}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-mono bg-white text-slate-800"
                    placeholder="e.g. dental-implants"
                  />
                  <p className="text-[9px] text-slate-400 mt-0.5">Live page will be hosted on <span className="font-mono">/services/{service.slug}</span></p>
                </div>

                {/* Service Title */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Service Header Name</label>
                  <input
                    type="text"
                    value={service.title || ''}
                    onChange={(e) => updateServiceField('title', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800"
                  />
                </div>

                {/* Homepage Card Image / Featured Image */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Card Preview Image URL (Used on Services Page / Homepage lists)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={service.homepage_card_image || ''}
                      onChange={(e) => updateServiceField('homepage_card_image', e.target.value)}
                      className="flex-1 px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('image-url-file-card')?.click()}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg transition cursor-pointer shrink-0"
                    >
                      Upload
                    </button>
                    <input
                      type="file"
                      id="image-url-file-card"
                      className="hidden"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleFileUpload(file);
                          if (url) updateServiceField('homepage_card_image', url);
                        }
                      }}
                    />
                  </div>
                  {service.homepage_card_image && (
                    <div className="mt-2 w-28 aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
                      <img src={service.homepage_card_image} alt="Card Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>

                {/* Homepage Short Intro */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Homepage Grid Short Summary description</label>
                  <textarea
                    rows={2}
                    value={service.short_description || ''}
                    onChange={(e) => updateServiceField('short_description', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 leading-relaxed"
                  />
                </div>
              </div>

              {/* Tagline, Detailed Intro, and Highlight line */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-black text-[#0D9488] uppercase tracking-wider block">Hero Section Copy & Highlights</span>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Main Tagline Headline</label>
                  <input
                    type="text"
                    value={service.hero_title || ''}
                    onChange={(e) => updateServiceField('hero_title', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-bold"
                    placeholder="e.g. Best Dental Implants Treatment in Rajkot"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Main Detailed Intro description</label>
                  <textarea
                    rows={4}
                    value={service.hero_description || ''}
                    onChange={(e) => updateServiceField('hero_description', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 leading-relaxed"
                  />
                </div>

                {/* Green Highlight Row text */}
                <div className="space-y-1.5 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  <label className="text-[10px] font-black text-[#0D9488] uppercase tracking-wider block">Emerald Highlight Block Text</label>
                  <textarea
                    rows={3}
                    value={service.green_highlight_line || mConfig.green_highlight_line || ''}
                    onChange={(e) => updateMConfigField('green_highlight_line', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-emerald-200 rounded-xl focus:outline-none focus:border-teal-500 font-bold bg-white text-emerald-950 leading-relaxed"
                    placeholder="e.g. Replace missing teeth with dental implants in just one week..."
                  />
                </div>
              </div>

              {/* BACKGROUND IMAGES */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-black text-[#0D9488] uppercase tracking-wider block">Hero Section Background Visuals</span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Desktop Background */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Desktop Hero Background Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={service.hero_image || ''}
                        onChange={(e) => updateServiceField('hero_image', e.target.value)}
                        className="flex-1 px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('hero-image-desktop-file')?.click()}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg transition cursor-pointer shrink-0"
                      >
                        Upload
                      </button>
                      <input
                        type="file"
                        id="hero-image-desktop-file"
                        className="hidden"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleFileUpload(file);
                            if (url) updateServiceField('hero_image', url);
                          }
                        }}
                      />
                    </div>
                    {service.hero_image && (
                      <div className="mt-2 w-36 aspect-[16/9] rounded-xl overflow-hidden border border-slate-200 shadow-2xs relative group">
                        <img src={service.hero_image} alt="Desktop Hero Bg" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}
                  </div>

                  {/* Mobile Background */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Mobile Hero Background Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={service.hero_bg_image_mobile || mConfig.hero_bg_image_mobile || ''}
                        onChange={(e) => updateMConfigField('hero_bg_image_mobile', e.target.value)}
                        className="flex-1 px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('hero-image-mobile-file')?.click()}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg transition cursor-pointer shrink-0"
                      >
                        Upload
                      </button>
                      <input
                        type="file"
                        id="hero-image-mobile-file"
                        className="hidden"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleFileUpload(file);
                            if (url) updateMConfigField('hero_bg_image_mobile', url);
                          }
                        }}
                      />
                    </div>
                    {(service.hero_bg_image_mobile || mConfig.hero_bg_image_mobile) && (
                      <div className="mt-2 w-20 aspect-[9/16] rounded-xl overflow-hidden border border-slate-200 shadow-2xs relative group">
                        <img src={service.hero_bg_image_mobile || mConfig.hero_bg_image_mobile} alt="Mobile Hero Bg" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* DUAL CALL TO ACTION CONFIGURATIONS */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-black text-[#0D9488] uppercase tracking-wider block">Hero Dual Action Buttons</span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Primary Call Action: Book Appointment */}
                  <div className="p-4 bg-slate-50/50 border border-slate-150 rounded-xl space-y-3">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider block">Primary Action (Appointment Flow)</span>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-700">Button Label</label>
                      <input
                        type="text"
                        value={mConfig.cta_appointment_text || 'Book Appointment'}
                        onChange={(e) => updateMConfigField('cta_appointment_text', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Secondary Call Action: WhatsApp Link */}
                  <div className="p-4 bg-emerald-50/20 border border-emerald-100 rounded-xl space-y-3">
                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-wider block">Secondary Action (WhatsApp Link)</span>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-700">Button Label</label>
                      <input
                        type="text"
                        value={mConfig.cta_whatsapp_text || 'Contact on WhatsApp'}
                        onChange={(e) => updateMConfigField('cta_whatsapp_text', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-700">WhatsApp Number (with country code)</label>
                      <input
                        type="text"
                        value={mConfig.contact_whatsapp_number || '919510397046'}
                        onChange={(e) => updateMConfigField('contact_whatsapp_number', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                        placeholder="e.g. 919510397046"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. CLINICAL CASE GALLERY */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('gallery')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><ImageIcon className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">2. Clinical Case Gallery</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure section show/hide and manage clinical gallery images</span>
              </div>
            </div>
            {expandedSections.gallery ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.gallery && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <CmsSectionToggle
                checked={mConfig.show_gallery !== false}
                onChange={(checked) => updateMConfigField('show_gallery', checked)}
              />

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Gallery Section Title</label>
                <input
                  type="text"
                  value={mConfig.gallery_heading || 'Our Premium Clinical Cases'}
                  onChange={(e) => updateMConfigField('gallery_heading', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 font-display font-bold text-sm"
                />
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Dynamic Gallery Showcase Items</h5>
                  <button
                    type="button"
                    onClick={() => addGalleryItem()}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:text-teal-600 rounded-lg text-xs font-bold transition cursor-pointer text-slate-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Image Case
                  </button>
                </div>

                {galleryItems.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    No images added. Live page will render fallback images.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {galleryItems.map((item: any, idx: number) => (
                      <div key={item.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-xl flex gap-3 relative hover:border-slate-300 transition-colors">
                        <div className="space-y-1 flex bg-white border border-slate-150 rounded-lg p-0.5 h-fit shadow-3xs self-center shrink-0">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveGalleryItem(idx, 'up')}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === galleryItems.length - 1}
                            onClick={() => moveGalleryItem(idx, 'down')}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-500 uppercase">Case Photo URL</label>
                            <input
                              type="text"
                              value={item.image_url || ''}
                              onChange={(e) => updateGalleryItemField(idx, 'image_url', e.target.value)}
                              className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase">Category Tag</label>
                              <input
                                type="text"
                                value={item.category || ''}
                                onChange={(e) => updateGalleryItemField(idx, 'category', e.target.value)}
                                className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800 font-bold"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-[#081C3A] uppercase block">Upload File</label>
                              <button
                                type="button"
                                onClick={() => document.getElementById(`gallery-file-${idx}`)?.click()}
                                className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-[10px] font-black uppercase rounded-lg transition cursor-pointer"
                              >
                                <Upload className="h-3 w-3" />
                                <span>Upload</span>
                              </button>
                              <input
                                type="file"
                                id={`gallery-file-${idx}`}
                                className="hidden"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const url = await handleFileUpload(file);
                                    if (url) updateGalleryItemField(idx, 'image_url', url);
                                  }
                                }}
                              />
                            </div>
                          </div>

                          {item.image_url && (
                            <div className="mt-2 w-24 aspect-[4/3] rounded-lg overflow-hidden border border-slate-150 shadow-3xs">
                              <img src={item.image_url} alt="Gallery Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteGalleryItem(idx)}
                          className="absolute top-2 right-2 p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 3. PROCEDURE VIDEO */}
        <ProcedureVideoCmsSection
          service={service}
          mConfig={mConfig}
          updateServiceField={updateServiceField}
          updateMConfigField={updateMConfigField}
          sectionNumber={3}
          isExpanded={!!expandedSections.video}
          onToggle={() => toggleSection('video')}
        />

        {/* 4. PATIENT TESTIMONIAL REELS */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('testimonials')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><MessageSquare className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">4. Patient Testimonial Reels</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure section show/hide and manage premium real patient testimonial videos</span>
              </div>
            </div>
            {expandedSections.testimonials ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.testimonials && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <CmsSectionToggle
                checked={mConfig.show_testimonials !== false}
                onChange={(checked) => updateMConfigField('show_testimonials', checked)}
              />

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Section Title</label>
                <input
                  type="text"
                  value={mConfig.testimonials_heading || 'Patient Testimonial Reels'}
                  onChange={(e) => updateMConfigField('testimonials_heading', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 font-display font-bold text-sm"
                />
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Dynamic Testimonial Videos (Youtube / Instagram Reels / MP4)</h5>
                  <button
                    type="button"
                    onClick={addTestimonialItem}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:text-teal-600 rounded-lg text-xs font-bold transition cursor-pointer text-slate-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Video Reels
                  </button>
                </div>

                {testimonials.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    No testimonials configured. Live page will show fallback testimonials.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {testimonials.map((testi: any, idx: number) => (
                      <div key={testi.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row gap-4 items-start relative shadow-3xs hover:border-slate-300 transition-colors">
                        <div className="flex items-center gap-2 sm:flex-col sm:gap-1.5 shrink-0 self-center">
                          <span className="h-7 w-7 rounded-full bg-[#0D9488] text-white font-bold text-xs flex items-center justify-center border border-teal-600 shadow-sm">
                            {idx + 1}
                          </span>
                          <div className="flex bg-white border border-slate-150 rounded-lg p-0.5 shadow-3xs">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveTestimonialItem(idx, 'up')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === testimonials.length - 1}
                              onClick={() => moveTestimonialItem(idx, 'down')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        <div className="flex-1 space-y-3 w-full">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase">Patient Name</label>
                              <input
                                type="text"
                                value={testi.patient_name || ''}
                                onChange={(e) => updateTestimonialItemField(idx, 'patient_name', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800 font-bold"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase">Treatment / Category Label</label>
                              <input
                                type="text"
                                value={testi.treatment_name || ''}
                                onChange={(e) => updateTestimonialItemField(idx, 'treatment_name', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase">Video URL (Instagram / Youtube / MP4)</label>
                              <input
                                type="text"
                                value={testi.video_url || ''}
                                onChange={(e) => updateTestimonialItemField(idx, 'video_url', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                                placeholder="e.g. https://www.instagram.com/reel/... or YouTube Link"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase">Thumbnail Image URL (Optional)</label>
                              <TestimonialThumbnailUpload
                                value={testi.thumbnail || ''}
                                onChange={(val) => updateTestimonialItemField(idx, 'thumbnail', val)}
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteTestimonialItem(idx)}
                          className="absolute top-4 right-4 p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 5. BEFORE & AFTER GALLERY */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('beforeAfter')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Eye className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">5. Before & After Gallery</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure section show/hide and manage Before/After slider showcase pairs</span>
              </div>
            </div>
            {expandedSections.beforeAfter ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.beforeAfter && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <CmsSectionToggle
                checked={mConfig.show_before_after !== false}
                onChange={(checked) => updateMConfigField('show_before_after', checked)}
              />

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Section Title</label>
                <input
                  type="text"
                  value={mConfig.before_after_heading || 'Before & After Transformative Results'}
                  onChange={(e) => updateMConfigField('before_after_heading', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 font-display font-bold text-sm"
                />
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Before & After Slider Cases</h5>
                  <button
                    type="button"
                    onClick={addBeforeAfterPair}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:text-teal-600 rounded-lg text-xs font-bold transition cursor-pointer text-slate-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Slider Pair
                  </button>
                </div>

                {beforeAfterPairs.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    No Before/After pairs added. Live page will render default sliders.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {beforeAfterPairs.map((pair: any, idx: number) => (
                      <div key={pair.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-xl flex gap-3 relative hover:border-slate-300 transition-colors">
                        <div className="space-y-1 flex bg-white border border-slate-150 rounded-lg p-0.5 h-fit shadow-3xs self-center shrink-0">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveBeforeAfterPair(idx, 'up')}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === beforeAfterPairs.length - 1}
                            onClick={() => moveBeforeAfterPair(idx, 'down')}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-500 uppercase">Caption / Case Title</label>
                            <input
                              type="text"
                              value={pair.caption || ''}
                              onChange={(e) => updateBeforeAfterPairField(idx, 'caption', e.target.value)}
                              className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                              placeholder="e.g. Single tooth implant transformation"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {/* Before Image */}
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase block">Before Image URL</label>
                              <div className="flex gap-1">
                                <input
                                  type="text"
                                  value={pair.before_image || ''}
                                  onChange={(e) => updateBeforeAfterPairField(idx, 'before_image', e.target.value)}
                                  className="flex-1 px-1.5 py-1 text-[10px] border border-slate-200 rounded focus:outline-none bg-white text-slate-800"
                                />
                                <button
                                  type="button"
                                  onClick={() => document.getElementById(`before-file-${idx}`)?.click()}
                                  className="px-1.5 py-1 bg-slate-100 border border-slate-200 rounded text-[9px] font-bold"
                                >
                                  Up
                                </button>
                                <input
                                  type="file"
                                  id={`before-file-${idx}`}
                                  className="hidden"
                                  accept="image/*"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const url = await handleFileUpload(file);
                                      if (url) updateBeforeAfterPairField(idx, 'before_image', url);
                                    }
                                  }}
                                />
                              </div>
                            </div>

                            {/* After Image */}
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase block">After Image URL</label>
                              <div className="flex gap-1">
                                <input
                                  type="text"
                                  value={pair.after_image || ''}
                                  onChange={(e) => updateBeforeAfterPairField(idx, 'after_image', e.target.value)}
                                  className="flex-1 px-1.5 py-1 text-[10px] border border-slate-200 rounded focus:outline-none bg-white text-slate-800"
                                />
                                <button
                                  type="button"
                                  onClick={() => document.getElementById(`after-file-${idx}`)?.click()}
                                  className="px-1.5 py-1 bg-slate-100 border border-slate-200 rounded text-[9px] font-bold"
                                >
                                  Up
                                </button>
                                <input
                                  type="file"
                                  id={`after-file-${idx}`}
                                  className="hidden"
                                  accept="image/*"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const url = await handleFileUpload(file);
                                      if (url) updateBeforeAfterPairField(idx, 'after_image', url);
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {pair.before_image && (
                              <div className="w-12 aspect-[4/3] rounded overflow-hidden border border-slate-150">
                                <img src={pair.before_image} alt="Before" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            )}
                            {pair.after_image && (
                              <div className="w-12 aspect-[4/3] rounded overflow-hidden border border-slate-150">
                                <img src={pair.after_image} alt="After" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteBeforeAfterPair(idx)}
                          className="absolute top-2 right-2 p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Slider Pair"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 6. GOOGLE PATIENT REVIEWS */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('reviews')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Star className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">6. Google Patient Reviews</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure section show/hide and manage authentic verified Google patient testimonials</span>
              </div>
            </div>
            {expandedSections.reviews ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.reviews && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <CmsSectionToggle
                checked={mConfig.show_reviews !== false}
                onChange={(checked) => updateMConfigField('show_reviews', checked)}
              />

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Section Heading Title</label>
                <input
                  type="text"
                  value={mConfig.reviews_heading || 'Google Patient Reviews'}
                  onChange={(e) => updateMConfigField('reviews_heading', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 font-display font-bold text-sm"
                />
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Verified Patient Google Reviews</h5>
                  <button
                    type="button"
                    onClick={addGoogleReview}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:text-teal-600 rounded-lg text-xs font-bold transition cursor-pointer text-slate-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add New Review
                  </button>
                </div>

                {googleReviews.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    No custom Google reviews configured. Live page will load default universal hospital reviews.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {googleReviews.map((rev: any, idx: number) => (
                      <div key={rev.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row gap-4 items-start relative shadow-3xs hover:border-slate-300 transition-colors">
                        <div className="flex items-center gap-2 sm:flex-col sm:gap-1.5 shrink-0 self-center">
                          <span className="h-7 w-7 rounded-full bg-[#0D9488] text-white font-bold text-xs flex items-center justify-center border border-teal-600 shadow-sm">
                            {idx + 1}
                          </span>
                          <div className="flex bg-white border border-slate-150 rounded-lg p-0.5 shadow-3xs">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveGoogleReview(idx, 'up')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                              title="Move Up"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === googleReviews.length - 1}
                              onClick={() => moveGoogleReview(idx, 'down')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                              title="Move Down"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        <div className="flex-1 space-y-3 w-full">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase">Patient Name</label>
                              <input
                                type="text"
                                value={rev.patient_name || ''}
                                onChange={(e) => updateGoogleReviewField(idx, 'patient_name', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800 font-bold"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase">Review Date Text (e.g. 3 weeks ago)</label>
                              <input
                                type="text"
                                value={rev.review_date || ''}
                                onChange={(e) => updateGoogleReviewField(idx, 'review_date', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                                placeholder="e.g. 2 months ago"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-amber-500 uppercase">Rating Star Count (1 - 5)</label>
                              <select
                                value={rev.rating || 5}
                                onChange={(e) => updateGoogleReviewField(idx, 'rating', Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                              >
                                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                                <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                                <option value={3}>⭐⭐⭐ (3 Stars)</option>
                                <option value={2}>⭐⭐ (2 Stars)</option>
                                <option value={1}>⭐ (1 Star)</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase">Review Map Link (Optional)</label>
                              <input
                                type="text"
                                value={rev.review_url || ''}
                                onChange={(e) => updateGoogleReviewField(idx, 'review_url', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                                placeholder="e.g. https://g.page/r/..."
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-500 uppercase">Full Patient Review Description Text</label>
                            <textarea
                              rows={3}
                              value={rev.review_text || ''}
                              onChange={(e) => updateGoogleReviewField(idx, 'review_text', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800 leading-normal"
                            />
                          </div>

                          {/* Show/Hide Row switch */}
                          <div className="flex items-center gap-2 pt-1.5">
                            <input
                              type="checkbox"
                              id={`rev-enable-${idx}`}
                              checked={rev.enabled !== false}
                              onChange={(e) => updateGoogleReviewField(idx, 'enabled', e.target.checked)}
                              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <label htmlFor={`rev-enable-${idx}`} className="text-[10px] font-bold text-slate-600 select-none cursor-pointer">
                              Enable/Render review in slider list
                            </label>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteGoogleReview(idx)}
                          className="absolute top-4 right-4 p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition duration-200"
                          title="Delete Review"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Floating Save Action Bar */}
      <div className="sticky bottom-6 z-20 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-150 shadow-lg flex justify-between items-center max-w-4xl mx-auto">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{service.title} CMS Editor</span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSaveAll()}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-50 text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <Check className="h-4.5 w-4.5" />
            )}
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
