import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, ChevronDown, ChevronUp, Save, Check, 
  Image as ImageIcon, Video, Sliders, Shield, Heart,
  Sparkles, MessageSquare, ArrowUp, ArrowDown, Info, Upload, Star, HelpCircle, Stethoscope
} from 'lucide-react';
import { Service } from '../types';
import { serviceService } from '../utils/serviceData';
import { uploadImage } from '../utils/supabaseStorage';
import { isSupabaseConfigured } from '../utils/supabase';

interface RootCanalCmsProps {
  onSaveSuccess?: () => void;
}

export default function RootCanalCms({ onSaveSuccess }: RootCanalCmsProps = {}) {
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

  // Load Root Canal service on mount
  useEffect(() => {
    async function loadService() {
      try {
        setLoading(true);
        const list = await serviceService.getServices();
        let found = list.find(s => s.slug === 'root-canal-treatment' || s.id === 'rct');
        
        if (!found) {
          // Default fallback template if not present in DB
          found = {
            id: 'rct',
            slug: 'root-canal-treatment',
            title: 'Single Sitting Root Canal Treatment',
            short_description: 'Pain-free, advanced single sitting root canal therapy in 30 minutes.',
            description: 'Get your root canal done in a single sitting with painless laser and rotary endodontic treatment.',
            hero_image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
            icon: 'Activity',
            display_order: 2,
            is_active: true,
            process_steps: [
              {
                id: 'step-1',
                title: '3D CBCT & Digital X-Ray Diagnosis',
                description: 'In-depth digital scanning to pinpoint root canals with 3D precision.',
                display_order: 10
              },
              {
                id: 'step-2',
                title: 'Painless Local Anesthesia & Cleaning',
                description: 'Complete numbing followed by rotary canal shaping and bio-sanitization.',
                display_order: 20
              },
              {
                id: 'step-3',
                title: 'Laser Sterilization & Biocompatible Filling',
                description: 'Laser disinfection and 3D gutta-percha canal sealing completed in one visit.',
                display_order: 30
              }
            ],
            features: [
              {
                id: 'sup-1',
                title: 'Pain-Free Anesthesia Protocol',
                description: 'Advanced computerized local numbing ensures zero discomfort during treatment.',
                display_order: 10
              },
              {
                id: 'sup-2',
                title: 'Single Sitting Completion',
                description: 'Complete treatment in 30 to 45 minutes without requiring multiple painful visits.',
                display_order: 20
              },
              {
                id: 'sup-3',
                title: '3D Rotary & Laser Endodontics',
                description: 'Microscopic precision canal cleaning preventing secondary infection risks.',
                display_order: 30
              }
            ],
            patient_testimonials: [],
            hospital_team_photos: [],
            marketing_config: {
              green_highlight_line: 'Painless, single sitting root canal treatment using modern rotary endodontics and laser technology.',
              process_section_title: 'How We Perform Single Sitting Root Canal',
              benefits_section_title: 'Why Our Modern Root Canal Method is Superior',
              testimonials_section_title: 'Patient Testimonial Reels',
              show_hero: true,
              show_introduction: true,
              show_process: true,
              show_benefits: true,
              show_gallery: true,
              show_procedure_video: true,
              show_testimonials: true,
              show_before_after: true,
              show_cost: true,
              show_google_reviews: true,
              show_faqs: true,
              show_bottom_cta: true,
            }
          };
        }

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
      } catch (e: any) {
        setErrorMsg('Failed to fetch Root Canal Treatment service configurations.');
      } finally {
        setLoading(false);
      }
    }
    loadService();
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-slate-100 p-12 rounded-2xl text-center shadow-3xs flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D9488] mb-3"></div>
        <p className="text-slate-500 text-xs font-medium">Loading Root Canal Treatment CMS Configurations...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-sm">
        ⚠️ Error: Root Canal Treatment service record was not found in database.
      </div>
    );
  }

  const mConfig = (service.marketing_config || {}) as any;

  const updateServiceField = (field: keyof Service, val: any) => {
    setService(prev => {
      if (!prev) return prev;
      return { ...prev, [field]: val };
    });
  };

  const updateMConfigField = (key: string, val: any) => {
    setService(prev => {
      if (!prev) return prev;
      const currentConfig = typeof prev.marketing_config === 'string' ? {} : (prev.marketing_config || {});
      return {
        ...prev,
        marketing_config: {
          ...currentConfig,
          [key]: val
        }
      };
    });
  };

  // Save All handler
  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const payload: Service = {
        ...service,
        title: service.title?.trim() || 'Single Sitting Root Canal Treatment',
        process_steps: Array.isArray(service.process_steps) ? service.process_steps : [],
        features: Array.isArray(service.features) ? service.features : [],
        patient_testimonials: Array.isArray(service.patient_testimonials) ? service.patient_testimonials : [],
        hospital_team_photos: Array.isArray(service.hospital_team_photos) ? service.hospital_team_photos : [],
      };

      const result = await serviceService.saveService(payload);
      if (result.success) {
        setSuccessMsg('Single Sitting Root Canal Treatment configurations saved successfully! Changes are immediately live.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onSaveSuccess?.();
      } else {
        setErrorMsg(result.error || 'Failed to save Root Canal Treatment configuration changes.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected exception occurred during save operations.');
    } finally {
      setSaving(false);
    }
  };

  // Section 3: Dynamic Steps
  const steps = Array.isArray(service.process_steps) ? service.process_steps : [];
  const addStep = () => {
    const nextOrder = steps.length > 0 ? Math.max(...steps.map((s: any) => Number(s.display_order) || 0)) + 10 : 10;
    const newStep = {
      id: `step-${Date.now()}`,
      title: 'New Workflow Phase',
      description: 'Phase clinical description detail text.',
      display_order: nextOrder
    };
    updateServiceField('process_steps', [...steps, newStep]);
  };
  const deleteStep = (index: number) => {
    updateServiceField('process_steps', steps.filter((_, i) => i !== index));
  };
  const moveStep = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= steps.length) return;
    const updated = [...steps];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updateServiceField('process_steps', updated);
  };
  const updateStepField = (index: number, key: string, val: any) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [key]: val };
    updateServiceField('process_steps', updated);
  };

  // Section 4: Dynamic Superior Cards
  const cards = Array.isArray(service.features) ? service.features : [];
  const addCard = () => {
    const nextOrder = cards.length > 0 ? Math.max(...cards.map((c: any) => Number(c.display_order) || 0)) + 10 : 10;
    const newCard = {
      id: `card-${Date.now()}`,
      number: String(cards.length + 1).padStart(2, '0'),
      title: 'New Superior Feature',
      description: 'Detail explaining clinical edge or high standard comparison.',
      display_order: nextOrder
    };
    updateServiceField('features', [...cards, newCard]);
  };
  const deleteCard = (index: number) => {
    updateServiceField('features', cards.filter((_, i) => i !== index));
  };
  const moveCard = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= cards.length) return;
    const updated = [...cards];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updateServiceField('features', updated);
  };
  const updateCardField = (index: number, key: string, val: any) => {
    const updated = [...cards];
    updated[index] = { ...updated[index], [key]: val };
    updateServiceField('features', updated);
  };

  // Section 5: Clinical Case Gallery Items
  const galleryItems = Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : [];
  const addGalleryItem = (url?: string) => {
    const nextOrder = galleryItems.length > 0 ? Math.max(...galleryItems.map((g: any) => Number(g.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `gallery-item-${Date.now()}`,
      image_url: url || '',
      category: 'Root Canal Case',
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

  // Section 7: Patient Testimonials
  const testimonials = Array.isArray(service.patient_testimonials) ? service.patient_testimonials : [];
  const addTestimonialItem = () => {
    const nextOrder = testimonials.length > 0 ? Math.max(...testimonials.map((t: any) => Number(t.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `testi-${Date.now()}`,
      patient_name: 'Patient Name',
      video_url: '',
      thumbnail: '',
      treatment_name: 'Root Canal Treatment',
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

  // Section 8: Hospital & Team Photos
  const hostPhotos = Array.isArray(service.hospital_team_photos) ? service.hospital_team_photos : [];
  const addHostPhotoItem = () => {
    const nextOrder = hostPhotos.length > 0 ? Math.max(...hostPhotos.map((h: any) => Number(h.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `photo-${Date.now()}`,
      image_url: 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=800',
      type: 'hospital',
      display_order: nextOrder
    };
    updateServiceField('hospital_team_photos', [...hostPhotos, newItem]);
  };
  const deleteHostPhotoItem = (index: number) => {
    updateServiceField('hospital_team_photos', hostPhotos.filter((_, i) => i !== index));
  };
  const moveHostPhotoItem = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= hostPhotos.length) return;
    const updated = [...hostPhotos];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updateServiceField('hospital_team_photos', updated);
  };
  const updateHostPhotoItemField = (index: number, key: string, val: any) => {
    const updated = [...hostPhotos];
    updated[index] = { ...updated[index], [key]: val };
    updateServiceField('hospital_team_photos', updated);
  };

  // Section 8.7: Before & After Gallery
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

  // Section 10: Google Patient Reviews
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

  // Section 12: FAQs
  const faqs = Array.isArray(mConfig.faqs) ? mConfig.faqs : [];
  const addFaq = () => {
    const nextOrder = faqs.length > 0 ? Math.max(...faqs.map((f: any) => Number(f.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `faq-${Date.now()}`,
      question: '',
      answer: '',
      display_order: nextOrder,
      enabled: true
    };
    updateMConfigField('faqs', [...faqs, newItem]);
  };
  const deleteFaq = (index: number) => {
    updateMConfigField('faqs', faqs.filter((_, i) => i !== index));
  };
  const moveFaq = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= faqs.length) return;
    const updated = [...faqs];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updateMConfigField('faqs', updated);
  };
  const updateFaqField = (index: number, key: string, val: any) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [key]: val };
    updateMConfigField('faqs', updated);
  };

  return (
    <div className="space-y-6" id="root-canal-cms-root">
      {/* CMS Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-3xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#F0FDFA] text-[#0D9488]"><Shield className="h-5 w-5" /></span>
            Single Sitting Root Canal Treatment CMS Module
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-1">
            Configure every visible element of the Root Canal Treatment service page section-by-section.
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
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure top branding, intro tagline, background image and actions</span>
              </div>
            </div>
            {expandedSections.hero ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.hero && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-150 space-y-4">
                <span className="text-[10px] font-black text-[#0D9488] uppercase tracking-wider block">Service Core Settings</span>
                
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

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Service Page Slug (URL path)</label>
                  <input
                    type="text"
                    value={service.slug || 'root-canal-treatment'}
                    onChange={(e) => updateServiceField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-'))}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-mono bg-white text-slate-800"
                    placeholder="e.g. root-canal-treatment"
                  />
                  <p className="text-[9px] text-slate-400 mt-0.5">Live page will be hosted on <span className="font-mono">/services/{service.slug}</span></p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Homepage Card Image (Featured Image)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={service.homepage_card_image || ''}
                      onChange={(e) => updateServiceField('homepage_card_image', e.target.value)}
                      className="flex-1 px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                      placeholder="e.g. https://images.unsplash.com/... or upload"
                    />
                    <div className="shrink-0">
                      <button
                        type="button"
                        onClick={() => document.getElementById('rct-homepage-card-file-input')?.click()}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-700 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <ImageIcon className="h-3.5 w-3.5" />
                        Browse
                      </button>
                      <input
                        type="file"
                        id="rct-homepage-card-file-input"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = await handleFileUpload(e.target.files[0]);
                            if (url) updateServiceField('homepage_card_image', url);
                          }
                        }}
                      />
                    </div>
                  </div>
                  {service.homepage_card_image && (
                    <div className="mt-2 border border-slate-150 p-1 rounded-lg bg-slate-50 max-w-xs">
                      <img src={service.homepage_card_image} alt="Card Preview" className="h-20 w-full object-cover rounded-md border border-slate-100 shadow-3xs" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Home Card Description</label>
                  <textarea
                    rows={6}
                    value={service.homepage_short_description || service.short_description || ''}
                    onChange={(e) => updateServiceField('homepage_short_description', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 leading-relaxed"
                    placeholder="Enter short description for home card..."
                  />
                </div>

                <div className="space-y-1.5 border-t border-slate-100 pt-3">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Homepage Card Green Highlight Line</label>
                  <input
                    type="text"
                    value={mConfig.green_highlight_line || ''}
                    onChange={(e) => updateMConfigField('green_highlight_line', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                    placeholder="Painless, single sitting root canal treatment..."
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Hero Section</span>
                  <span className="text-[9px] text-slate-400">Toggle whether the top Hero Header should be visible on the live page</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mConfig.show_hero !== false}
                    onChange={(e) => updateMConfigField('show_hero', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Service Title</label>
                <input
                  type="text"
                  value={service.title || 'Single Sitting Root Canal Treatment'}
                  onChange={(e) => updateServiceField('title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#0D9488] font-medium bg-white text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Hero Subtitle / Tagline</label>
                <input
                  type="text"
                  value={service.hero_title || ''}
                  onChange={(e) => updateServiceField('hero_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#0D9488] font-medium bg-white text-slate-800"
                  placeholder="e.g. Save Your Natural Tooth Painlessly in 30 Minutes"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Hero Description</label>
                <textarea
                  rows={4}
                  value={service.hero_description || service.description || ''}
                  onChange={(e) => updateServiceField('hero_description', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#0D9488] font-medium bg-white text-slate-800 leading-relaxed"
                  placeholder="Type the intro paragraphs explaining Root Canal Treatment here..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Hero Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={service.hero_image || ''}
                    onChange={(e) => updateServiceField('hero_image', e.target.value)}
                    className="flex-1 px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#0D9488] font-medium bg-white text-slate-800"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => document.getElementById('rct-hero-file-input')?.click()}
                      className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-slate-700 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <ImageIcon className="h-4 w-4" />
                      Browse
                    </button>
                    <input
                      type="file"
                      id="rct-hero-file-input"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const url = await handleFileUpload(e.target.files[0]);
                          if (url) updateServiceField('hero_image', url);
                        }
                      }}
                    />
                  </div>
                </div>
                {service.hero_image && (
                  <div className="mt-2 border border-slate-150 p-1.5 rounded-xl bg-slate-50 max-w-sm">
                    <img src={service.hero_image} alt="Hero Preview" className="h-32 w-full object-cover rounded-lg border border-slate-100 shadow-3xs" referrerPolicy="no-referrer" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 2. TREATMENT OVERVIEW */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('intro')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Info className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">2. Treatment Overview</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure section visibility, title, and descriptive introduction</span>
              </div>
            </div>
            {expandedSections.intro ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.intro && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle whether the Treatment Overview section is active</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mConfig.show_introduction !== false}
                    onChange={(e) => updateMConfigField('show_introduction', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Section Title</label>
                <input
                  type="text"
                  value={service.intro_title || 'What is Single Sitting Root Canal Treatment?'}
                  onChange={(e) => updateServiceField('intro_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#0D9488] font-medium bg-white text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Description</label>
                <textarea
                  rows={5}
                  value={service.intro_description || ''}
                  onChange={(e) => updateServiceField('intro_description', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#0D9488] font-medium bg-white text-slate-800 leading-relaxed"
                  placeholder="Type the full detailed introduction text..."
                />
              </div>
            </div>
          )}
        </div>

        {/* 3. HOW WE PERFORM */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('process')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Sliders className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">3. How We Perform Root Canal Treatment</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Manage advanced clinical workflow stages and step-by-step descriptions</span>
              </div>
            </div>
            {expandedSections.process ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.process && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle clinical steps workflow section active/inactive</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mConfig.show_process !== false}
                    onChange={(e) => updateMConfigField('show_process', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Section Title</label>
                <input
                  type="text"
                  value={mConfig.process_section_title || 'How We Perform Single Sitting Root Canal'}
                  onChange={(e) => updateMConfigField('process_section_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#0D9488] font-medium bg-white text-slate-800"
                />
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Dynamic Clinical Workflow Steps</h5>
                  <button
                    type="button"
                    onClick={addStep}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:text-teal-600 rounded-lg text-xs font-bold transition cursor-pointer text-slate-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Step
                  </button>
                </div>

                {steps.map((step: any, idx: number) => (
                  <div key={step.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row gap-4 items-start relative shadow-3xs">
                    <div className="flex items-center gap-2 sm:flex-col sm:gap-1.5">
                      <span className="h-7 w-7 rounded-full bg-teal-500 text-white font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div className="flex bg-white border border-slate-150 rounded-lg p-0.5">
                        <button type="button" disabled={idx === 0} onClick={() => moveStep(idx, 'up')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp className="h-3 w-3" /></button>
                        <button type="button" disabled={idx === steps.length - 1} onClick={() => moveStep(idx, 'down')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown className="h-3 w-3" /></button>
                      </div>
                    </div>

                    <div className="flex-1 space-y-3 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Step Title</label>
                          <input type="text" value={step.title || ''} onChange={(e) => updateStepField(idx, 'title', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Phase</label>
                          <input type="text" value={step.phase || ''} onChange={(e) => updateStepField(idx, 'phase', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Description</label>
                        <textarea rows={2} value={step.description || ''} onChange={(e) => updateStepField(idx, 'description', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                      </div>
                    </div>

                    <button type="button" onClick={() => deleteStep(idx)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. WHY OUR METHOD IS SUPERIOR */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('superior')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Heart className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">4. Why Our Method Is Superior</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure section headline and add/reorder feature cards</span>
              </div>
            </div>
            {expandedSections.superior ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.superior && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle whether this superior features block is displayed</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mConfig.show_benefits !== false}
                    onChange={(e) => updateMConfigField('show_benefits', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Section Title</label>
                <input
                  type="text"
                  value={mConfig.benefits_section_title || 'Why Our Modern Root Canal Method is Superior'}
                  onChange={(e) => updateMConfigField('benefits_section_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#0D9488] font-medium bg-white text-slate-800"
                />
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Dynamic Comparison Cards</h5>
                  <button type="button" onClick={addCard} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-bold text-slate-700">
                    <Plus className="h-3.5 w-3.5" /> Add Card
                  </button>
                </div>

                {cards.map((card: any, idx: number) => (
                  <div key={card.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row gap-4 items-start relative shadow-3xs">
                    <div className="flex items-center gap-2 sm:flex-col sm:gap-1.5">
                      <span className="h-7 w-7 rounded-full bg-[#0D9488]/10 text-[#0D9488] font-bold text-xs flex items-center justify-center">
                        {card.number || String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="flex bg-white border border-slate-150 rounded-lg p-0.5">
                        <button type="button" disabled={idx === 0} onClick={() => moveCard(idx, 'up')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp className="h-3 w-3" /></button>
                        <button type="button" disabled={idx === cards.length - 1} onClick={() => moveCard(idx, 'down')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown className="h-3 w-3" /></button>
                      </div>
                    </div>

                    <div className="flex-1 space-y-3 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Card Title</label>
                          <input type="text" value={card.title || ''} onChange={(e) => updateCardField(idx, 'title', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Badge Number</label>
                          <input type="text" value={card.number || ''} onChange={(e) => updateCardField(idx, 'number', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Description</label>
                        <textarea rows={2} value={card.description || ''} onChange={(e) => updateCardField(idx, 'description', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                      </div>
                    </div>

                    <button type="button" onClick={() => deleteCard(idx)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 5. CLINICAL CASE GALLERY */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('gallery')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><ImageIcon className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">5. Clinical Case Gallery</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure section show/hide and manage gallery images</span>
              </div>
            </div>
            {expandedSections.gallery ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.gallery && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle case transformations gallery block visible/hidden</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mConfig.show_gallery !== false}
                    onChange={(e) => updateMConfigField('show_gallery', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                </label>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                {galleryItems.map((item: any, idx: number) => (
                  <div key={item.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex items-center gap-4">
                    <img src={item.image_url} alt="Gallery" className="h-16 w-24 object-cover rounded-xl border" referrerPolicy="no-referrer" />
                    <div className="flex-1 space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Category</label>
                      <input type="text" value={item.category || ''} onChange={(e) => updateGalleryItemField(idx, 'category', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white" />
                    </div>
                    <button type="button" onClick={() => deleteGalleryItem(idx)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}

                <div className="pt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={() => document.getElementById('rct-add-gallery-file')?.click()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-xl text-xs font-black"
                  >
                    <Plus className="h-4 w-4" /> Add Gallery Image
                  </button>
                  <input
                    type="file"
                    id="rct-add-gallery-file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        const url = await handleFileUpload(e.target.files[0]);
                        if (url) addGalleryItem(url);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 6. PROCEDURE VIDEO */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('video')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Video className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">6. Procedure Video</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure procedure video title, URL, and summary text</span>
              </div>
            </div>
            {expandedSections.video ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.video && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle procedure video guide active/inactive</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mConfig.show_procedure_video !== false}
                    onChange={(e) => updateMConfigField('show_procedure_video', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Section Title</label>
                <input
                  type="text"
                  value={service.procedure_video_title || '3D Laser & Rotary Root Canal Procedure'}
                  onChange={(e) => updateServiceField('procedure_video_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#0D9488] font-medium bg-white text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Video / Instagram Reel URL</label>
                <input
                  type="text"
                  value={service.procedure_video_url || ''}
                  onChange={(e) => updateServiceField('procedure_video_url', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#0D9488] font-medium bg-white text-slate-800"
                  placeholder="e.g. https://www.instagram.com/reel/..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Video Description</label>
                <textarea
                  rows={2}
                  value={service.procedure_video_description || ''}
                  onChange={(e) => updateServiceField('procedure_video_description', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#0D9488] font-medium bg-white text-slate-800"
                />
              </div>
            </div>
          )}
        </div>

        {/* 7. PATIENT TESTIMONIAL REELS */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('testimonials')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><MessageSquare className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">7. Patient Testimonials</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Manage video & written patient testimonials</span>
              </div>
            </div>
            {expandedSections.testimonials ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.testimonials && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle patient testimonials section active/inactive</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mConfig.show_testimonials !== false}
                    onChange={(e) => updateMConfigField('show_testimonials', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                </label>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Patient Testimonials</h5>
                  <button type="button" onClick={addTestimonialItem} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border rounded-lg text-xs font-bold text-slate-700">
                    <Plus className="h-3.5 w-3.5" /> Add Testimonial
                  </button>
                </div>

                {testimonials.map((testi: any, idx: number) => (
                  <div key={testi.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row gap-4 items-start relative">
                    <div className="flex-1 space-y-2 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Patient Name</label>
                          <input type="text" value={testi.patient_name || ''} onChange={(e) => updateTestimonialItemField(idx, 'patient_name', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border rounded-lg bg-white" />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Video URL</label>
                          <input type="text" value={testi.video_url || ''} onChange={(e) => updateTestimonialItemField(idx, 'video_url', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border rounded-lg bg-white" placeholder="Instagram reel / YouTube URL" />
                        </div>
                      </div>
                    </div>
                    <button type="button" onClick={() => deleteTestimonialItem(idx)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 8. HOSPITAL & TEAM GALLERY */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('hospital')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Stethoscope className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">8. Hospital & Team Gallery</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Upload hospital premises and clinical team photo collections dynamically</span>
              </div>
            </div>
            {expandedSections.hospital ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.hospital && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle hospital Premise & clinical team split image section visible/hidden</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mConfig.show_hospital_photos !== false}
                    onChange={(e) => updateMConfigField('show_hospital_photos', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                </label>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Hospital & Clinical Team Photos</h5>
                  <button
                    type="button"
                    onClick={addHostPhotoItem}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:text-teal-600 rounded-lg text-xs font-bold transition cursor-pointer text-slate-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Photo Record
                  </button>
                </div>

                {hostPhotos.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    No photos uploaded yet. Uploaded clinic and team photos will be displayed on the live page.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {hostPhotos.map((photo: any, idx: number) => (
                      <div key={photo.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col md:flex-row gap-4 items-start relative shadow-3xs hover:border-slate-300 transition-colors">
                        <div className="flex items-center gap-2 md:flex-col md:gap-1.5 shrink-0">
                          <span className="h-7 w-7 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-300 shadow-xs">
                            {idx + 1}
                          </span>
                          <div className="flex bg-white border border-slate-150 rounded-lg p-0.5 shadow-3xs">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveHostPhotoItem(idx, 'up')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                              title="Move Up"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === hostPhotos.length - 1}
                              onClick={() => moveHostPhotoItem(idx, 'down')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                              title="Move Down"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Image Preview & Replacement */}
                        <div className="w-full md:w-32 space-y-1.5 shrink-0">
                          <img src={photo.image_url} alt="Premise or Team" className="w-full h-20 object-cover rounded-xl border border-slate-200/60 shadow-3xs" referrerPolicy="no-referrer" />
                          <button
                            type="button"
                            onClick={() => document.getElementById(`rct-host-photo-file-${idx}`)?.click()}
                            className="w-full px-2 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[10px] font-bold text-slate-600 shadow-3xs transition cursor-pointer"
                          >
                            Replace Image
                          </button>
                          <input
                            type="file"
                            id={`rct-host-photo-file-${idx}`}
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const url = await handleFileUpload(e.target.files[0]);
                                if (url) updateHostPhotoItemField(idx, 'image_url', url);
                              }
                            }}
                          />
                        </div>

                        <div className="flex-1 space-y-3 w-full">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase">Photo Type / Category</label>
                              <select
                                value={photo.type || 'hospital'}
                                onChange={(e) => updateHostPhotoItemField(idx, 'type', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800 font-bold"
                              >
                                <option value="hospital">Hospital Premise Photo</option>
                                <option value="team">Clinical / Team Staff Photo</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase">Caption text (optional)</label>
                              <input
                                type="text"
                                value={photo.caption || ''}
                                onChange={(e) => updateHostPhotoItemField(idx, 'caption', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                                placeholder="Describe who or what is shown..."
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteHostPhotoItem(idx)}
                          className="absolute top-4 right-4 p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition duration-200"
                          title="Delete Record"
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

        {/* 9. COST SECTION */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('cost')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Sparkles className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">9. Cost Section</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure pricing details, saving highlight, call/WhatsApp numbers, and offer actions</span>
              </div>
            </div>
            {expandedSections.cost ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.cost && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle the entire pricing/cost CTA card active/inactive</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mConfig.show_cost !== false}
                    onChange={(e) => updateMConfigField('show_cost', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Section Heading</label>
                <input
                  type="text"
                  value={mConfig.cost_heading || 'Cost of Single Sitting Root Canal'}
                  onChange={(e) => updateMConfigField('cost_heading', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 font-display font-bold text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Highlight Text (Main Highlight)</label>
                  <input
                    type="text"
                    value={mConfig.cost_highlight_text || 'Affordable & Transparent'}
                    onChange={(e) => updateMConfigField('cost_highlight_text', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Highlight Subtext</label>
                  <input
                    type="text"
                    value={mConfig.cost_highlight_sub || 'Single Sitting RCT'}
                    onChange={(e) => updateMConfigField('cost_highlight_sub', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Contact Text / Prompt</label>
                  <input
                    type="text"
                    value={mConfig.cost_contact_text || 'Contact now for more information.'}
                    onChange={(e) => updateMConfigField('cost_contact_text', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Phone Number</label>
                  <input
                    type="text"
                    value={mConfig.cost_phone_number || '+91 9510397046'}
                    onChange={(e) => updateMConfigField('cost_phone_number', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Call Button Label</label>
                  <input
                    type="text"
                    value={mConfig.cost_call_label || '📞 Call Now'}
                    onChange={(e) => updateMConfigField('cost_call_label', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">WhatsApp Button Label</label>
                  <input
                    type="text"
                    value={mConfig.cost_whatsapp_label || '💬 WhatsApp Now'}
                    onChange={(e) => updateMConfigField('cost_whatsapp_label', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 10. GOOGLE PATIENT REVIEWS */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('googleReviews')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Star className="h-4 w-4 fill-teal-500 text-teal-500" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">10. Google Patient Reviews</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure patient Google Reviews cards, ratings, descriptions, photos, and links</span>
              </div>
            </div>
            {expandedSections.googleReviews ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.googleReviews && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle the entire Google Patient Reviews section</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mConfig.show_google_reviews !== false}
                    onChange={(e) => updateMConfigField('show_google_reviews', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Section Heading</label>
                <input
                  type="text"
                  value={mConfig.google_reviews_heading || 'Google Patient Reviews'}
                  onChange={(e) => updateMConfigField('google_reviews_heading', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 font-display font-bold text-sm"
                />
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Patient Reviews List</h5>
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
                    No reviews added yet. This section will be hidden on the live page unless reviews are added.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {googleReviews.map((review: any, idx: number) => (
                      <div key={review.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col md:flex-row gap-4 items-start relative shadow-3xs hover:border-slate-300 transition-colors">
                        <div className="flex items-center gap-2 md:flex-col md:gap-1.5 shrink-0">
                          <span className="h-7 w-7 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-300 shadow-xs">
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

                        {/* Patient Photo and Name details column */}
                        <div className="w-full md:w-64 shrink-0 space-y-3">
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-slate-500 uppercase block">Patient Photo (Optional)</label>
                            {review.patient_photo_url && review.patient_photo_url.trim() !== '' ? (
                              <img src={review.patient_photo_url} alt="Patient" className="w-16 h-16 object-cover rounded-full border border-slate-200 shadow-3xs" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-[10px] font-bold">No Photo</div>
                            )}
                            <div className="flex gap-2 mt-1">
                              <button
                                type="button"
                                onClick={() => document.getElementById(`rct-patient-photo-file-${idx}`)?.click()}
                                className="px-2 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[9px] font-bold text-slate-600 shadow-3xs transition cursor-pointer"
                              >
                                Upload Photo
                              </button>
                              {review.patient_photo_url && (
                                <button
                                  type="button"
                                  onClick={() => updateGoogleReviewField(idx, 'patient_photo_url', '')}
                                  className="px-2 py-1 bg-white border border-red-200 hover:bg-red-50 rounded-lg text-[9px] font-bold text-red-600 shadow-3xs transition cursor-pointer"
                                >
                                  Clear
                                </button>
                              )}
                            </div>
                            <input
                              type="file"
                              id={`rct-patient-photo-file-${idx}`}
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const url = await handleFileUpload(e.target.files[0]);
                                  if (url) updateGoogleReviewField(idx, 'patient_photo_url', url);
                                }
                              }}
                            />
                            <input
                              type="text"
                              value={review.patient_photo_url || ''}
                              onChange={(e) => updateGoogleReviewField(idx, 'patient_photo_url', e.target.value)}
                              placeholder="Or paste photo URL..."
                              className="w-full px-2 py-1.5 text-[10px] border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-[#081C3A] uppercase block">Patient Name</label>
                            <input
                              type="text"
                              value={review.patient_name || ''}
                              onChange={(e) => updateGoogleReviewField(idx, 'patient_name', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white font-bold text-slate-800"
                              placeholder="e.g. Rahul Sharma"
                              required
                            />
                          </div>
                        </div>

                        {/* Review Content & Settings column */}
                        <div className="flex-1 space-y-3 w-full">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase block">Google Rating (1-5 Stars)</label>
                              <select
                                value={review.rating || 5}
                                onChange={(e) => updateGoogleReviewField(idx, 'rating', Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white font-medium text-slate-800"
                              >
                                <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                                <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                                <option value="3">⭐⭐⭐ (3 Stars)</option>
                                <option value="2">⭐⭐ (2 Stars)</option>
                                <option value="1">⭐ (1 Star)</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase block">Display Order</label>
                              <input
                                type="number"
                                value={review.display_order || 0}
                                onChange={(e) => updateGoogleReviewField(idx, 'display_order', Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-500 uppercase block">Review Text</label>
                            <textarea
                              rows={3}
                              value={review.review_text || ''}
                              onChange={(e) => updateGoogleReviewField(idx, 'review_text', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800 leading-normal"
                              placeholder="Type patient's review comment here..."
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase block">Review Date (Optional)</label>
                              <input
                                type="text"
                                value={review.review_date || ''}
                                onChange={(e) => updateGoogleReviewField(idx, 'review_date', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                                placeholder="e.g. 2 weeks ago"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase block">Google Review URL (Optional)</label>
                              <input
                                type="text"
                                value={review.review_url || ''}
                                onChange={(e) => updateGoogleReviewField(idx, 'review_url', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                                placeholder="https://maps.google.com/..."
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={review.enabled !== false}
                                onChange={(e) => updateGoogleReviewField(idx, 'enabled', e.target.checked)}
                                className="rounded text-teal-600 focus:ring-teal-500 h-3.5 w-3.5 border-slate-300"
                              />
                              <span className="text-[10px] font-bold text-slate-600 uppercase">Active / Visible</span>
                            </label>

                            <button
                              type="button"
                              onClick={() => deleteGoogleReview(idx)}
                              className="flex items-center gap-1 text-[10px] font-black text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete Card
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 11. BOTTOM CALL TO ACTION */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('bottomCtaNew')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Sparkles className="h-4 w-4 fill-teal-500 text-teal-500" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">11. Bottom Call To Action</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure premium full-width CTA block with section heading, short description, action buttons, and background image</span>
              </div>
            </div>
            {expandedSections.bottomCtaNew ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.bottomCtaNew && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle the entire Bottom Call To Action section</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mConfig.show_sec11_cta !== false}
                    onChange={(e) => updateMConfigField('show_sec11_cta', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Section Heading</label>
                <input
                  type="text"
                  value={mConfig.sec11_heading || 'Ready for a Pain-Free Smile in One Visit?'}
                  onChange={(e) => updateMConfigField('sec11_heading', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 font-display font-bold text-sm"
                  placeholder="e.g. Schedule a Pain-Free Root Canal Consultation"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Short Description</label>
                <textarea
                  rows={2}
                  value={mConfig.sec11_description || 'Schedule your single sitting root canal treatment consultation with Dr. Vipul Patel today.'}
                  onChange={(e) => updateMConfigField('sec11_description', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 leading-normal"
                  placeholder="e.g. Experience advanced single sitting dental care..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Primary Button Label</label>
                  <input
                    type="text"
                    value={mConfig.sec11_primary_label || 'Book Appointment'}
                    onChange={(e) => updateMConfigField('sec11_primary_label', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                    placeholder="e.g. Book Appointment"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Secondary Button Label</label>
                  <input
                    type="text"
                    value={mConfig.sec11_secondary_label || 'Chat on WhatsApp'}
                    onChange={(e) => updateMConfigField('sec11_secondary_label', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                    placeholder="e.g. Chat on WhatsApp"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Phone Number</label>
                  <input
                    type="text"
                    value={mConfig.sec11_phone || '+91 95103 97046'}
                    onChange={(e) => updateMConfigField('sec11_phone', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                    placeholder="e.g. +91 95103 97046"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">WhatsApp Number</label>
                  <input
                    type="text"
                    value={mConfig.sec11_whatsapp || '919510397046'}
                    onChange={(e) => updateMConfigField('sec11_whatsapp', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                    placeholder="e.g. 919510397046"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Background Image (Optional)</label>
                <div className="flex items-center gap-3">
                  {mConfig.sec11_bg_image && (
                    <img src={mConfig.sec11_bg_image} alt="Background" className="w-16 h-12 object-cover rounded-lg border border-slate-200 shadow-3xs" />
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => document.getElementById('rct-sec11-bg-file')?.click()}
                      className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-600 shadow-3xs transition cursor-pointer"
                    >
                      Upload Image
                    </button>
                    {mConfig.sec11_bg_image && (
                      <button
                        type="button"
                        onClick={() => updateMConfigField('sec11_bg_image', '')}
                        className="px-3 py-1.5 bg-white border border-red-200 hover:bg-red-50 rounded-lg text-xs font-bold text-red-600 shadow-3xs transition cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <input
                    type="file"
                    id="rct-sec11-bg-file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        const url = await handleFileUpload(e.target.files[0]);
                        if (url) updateMConfigField('sec11_bg_image', url);
                      }
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={mConfig.sec11_bg_image || ''}
                  onChange={(e) => updateMConfigField('sec11_bg_image', e.target.value)}
                  placeholder="Or paste background image URL..."
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none bg-white text-slate-800"
                />
              </div>
            </div>
          )}
        </div>

        {/* 12. FREQUENTLY ASKED QUESTIONS (FAQ) */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('faqs')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><HelpCircle className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">12. Frequently Asked Questions (FAQ)</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure custom Frequently Asked Questions with questions, answers, and display ordering</span>
              </div>
            </div>
            {expandedSections.faqs ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.faqs && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle the entire FAQ section on the frontend page</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mConfig.show_faq_sec !== false}
                    onChange={(e) => updateMConfigField('show_faq_sec', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Section Heading</label>
                <input
                  type="text"
                  value={mConfig.faq_sec_heading || 'Frequently Asked Questions'}
                  onChange={(e) => updateMConfigField('faq_sec_heading', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 font-display font-bold text-sm"
                  placeholder="e.g. Frequently Asked Questions"
                />
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">FAQ Items ({faqs.length})</span>
                  <button
                    type="button"
                    onClick={addFaq}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:text-teal-600 rounded-lg text-xs font-bold transition cursor-pointer text-slate-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add FAQ
                  </button>
                </div>

                {faqs.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    No FAQ items added yet. This section will be hidden on the live page unless FAQs are added.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {faqs.map((faq: any, idx: number) => (
                      <div key={faq.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col md:flex-row gap-4 items-start relative shadow-3xs hover:border-slate-300 transition-colors">
                        <div className="flex items-center gap-2 md:flex-col md:gap-1.5 shrink-0">
                          <span className="h-7 w-7 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-300 shadow-xs">
                            {idx + 1}
                          </span>
                          <div className="flex bg-white border border-slate-150 rounded-lg p-0.5 shadow-3xs">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveFaq(idx, 'up')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                              title="Move Up"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === faqs.length - 1}
                              onClick={() => moveFaq(idx, 'down')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                              title="Move Down"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        <div className="flex-1 space-y-3 w-full">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                            <div className="md:col-span-8 space-y-1">
                              <label className="text-[9px] font-bold text-[#081C3A] uppercase block">Question</label>
                              <input
                                type="text"
                                value={faq.question || ''}
                                onChange={(e) => updateFaqField(idx, 'question', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white font-bold text-slate-800"
                                placeholder="e.g. Is single sitting root canal painful?"
                              />
                            </div>
                            <div className="md:col-span-4 space-y-1">
                              <label className="text-[9px] font-bold text-[#081C3A] uppercase block">Display Order</label>
                              <input
                                type="number"
                                value={faq.display_order ?? idx * 10}
                                onChange={(e) => updateFaqField(idx, 'display_order', Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-500 uppercase block">Answer</label>
                            <textarea
                              rows={3}
                              value={faq.answer || ''}
                              onChange={(e) => updateFaqField(idx, 'answer', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800 leading-normal"
                              placeholder="Type answer here..."
                            />
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={faq.enabled !== false}
                                onChange={(e) => updateFaqField(idx, 'enabled', e.target.checked)}
                                className="rounded text-teal-600 focus:ring-teal-500 h-3.5 w-3.5 border-slate-300"
                              />
                              <span className="text-[10px] font-bold text-slate-600 uppercase">Active / Visible</span>
                            </label>

                            <button
                              type="button"
                              onClick={() => deleteFaq(idx)}
                              className="flex items-center gap-1 text-[10px] font-black text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete FAQ
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
