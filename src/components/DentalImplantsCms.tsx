import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, ChevronDown, ChevronUp, Save, Undo, Check, 
  Image as ImageIcon, Video, Sliders, Shield, Heart, Eye, EyeOff,
  Stethoscope, Sparkles, MessageSquare, ArrowUp, ArrowDown, Info, Link
} from 'lucide-react';
import { Service } from '../types';
import { serviceService, DEFAULT_GREEN_HIGHLIGHT_LINE } from '../utils/serviceData';
import { uploadImage } from '../utils/supabaseStorage';
import { isSupabaseConfigured } from '../utils/supabase';

interface DentalImplantsCmsProps {
  onSaveSuccess?: () => void;
}

export default function DentalImplantsCms({ onSaveSuccess }: DentalImplantsCmsProps = {}) {
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
        // Fallback to base64 for offline/localStorage
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

  // Load Dental Implants service on mount
  useEffect(() => {
    async function loadService() {
      try {
        setLoading(true);
        const list = await serviceService.getServices();
        const found = list.find(s => s.slug === 'dental-implants' || s.id === 'implants-srv');
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
          setErrorMsg('Dental Implants service record could not be located.');
        }
      } catch (e: any) {
        setErrorMsg('Failed to fetch Dental Implants service configurations.');
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
        <p className="text-slate-500 text-xs font-medium">Loading Dental Implants CMS Configurations...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-sm">
        ⚠️ Error: Dental Implants service with ID "implants-srv" or slug "dental-implants" was not found in database.
      </div>
    );
  }

  // Helpers to get/set fields in service and marketing_config
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

  // Action handlers
  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      // Ensure arrays are serializable/cleaned up
      const payload: Service = {
        ...service,
        title: service.title?.trim() || 'Dental Implants',
        process_steps: Array.isArray(service.process_steps) ? service.process_steps : [],
        features: Array.isArray(service.features) ? service.features : [],
        patient_testimonials: Array.isArray(service.patient_testimonials) ? service.patient_testimonials : [],
        hospital_team_photos: Array.isArray(service.hospital_team_photos) ? service.hospital_team_photos : [],
      };

      const result = await serviceService.saveService(payload);
      if (result.success) {
        setSuccessMsg('Dental Implants configurations saved successfully! Changes are immediately live.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onSaveSuccess?.();
      } else {
        setErrorMsg(result.error || 'Failed to save Dental Implants configuration changes.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected exception occurred during save operations.');
    } finally {
      setSaving(false);
    }
  };

  // Section 3: Dynamic Steps functions
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

  // Section 4: Dynamic Superior Cards functions
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
      image_url: url || 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800',
      category: 'single',
      title: '',
      caption: '',
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

  // Section 7: Patient Testimonial Videos
  const testimonials = Array.isArray(service.patient_testimonials) ? service.patient_testimonials : [];
  const addTestimonialItem = () => {
    const nextOrder = testimonials.length > 0 ? Math.max(...testimonials.map((t: any) => Number(t.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `testi-${Date.now()}`,
      patient_name: 'Patient Name',
      video_url: '',
      thumbnail: '',
      treatment_name: 'Full Mouth Rehabilitation',
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
      type: 'hospital', // hospital or team
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

  return (
    <div className="space-y-6" id="dental-implants-cms-root">
      {/* CMS Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-3xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#F0FDFA] text-[#0D9488]"><Shield className="h-5 w-5" /></span>
            Dental Implants CMS Module
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-1">
            Configure every visible element of the Dental Implants service page section-by-section.
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

                {/* Homepage Card Image / Featured Image */}
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
                        onClick={() => document.getElementById('homepage-card-file-input')?.click()}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-700 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <ImageIcon className="h-3.5 w-3.5" />
                        Browse
                      </button>
                      <input
                        type="file"
                        id="homepage-card-file-input"
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

                 {/* Homepage Short Description */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Home Card Description (Preserves Paragraphs)</label>
                  <textarea
                    rows={6}
                    value={service.homepage_short_description || ''}
                    onChange={(e) => updateServiceField('homepage_short_description', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 leading-relaxed"
                    placeholder="Enter description. Press Enter twice to create separate paragraphs with blank lines.&#10;&#10;e.g.&#10;Dental implant is an artificial tooth placed in your mouth...&#10;&#10;It is ideal for replacement of missing and loose teeth..."
                  />
                </div>

                {/* Green Highlight Line */}
                <div className="space-y-1.5 border-t border-slate-100 pt-3">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Homepage Card Green Highlight Line</label>
                  <input
                    type="text"
                    value={mConfig.green_highlight_line || ''}
                    onChange={(e) => updateMConfigField('green_highlight_line', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                    placeholder="Replace missing teeth with dental implants..."
                  />
                  <p className="text-[9px] text-slate-400 mt-0.5">The green highlight text displayed directly below the image in the home card.</p>
                </div>
              </div>
              
              {/* Enable / Disable section toggle */}
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

              {/* Service Title */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Service Title</label>
                <input
                  type="text"
                  value={service.title || ''}
                  onChange={(e) => updateServiceField('title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  placeholder="e.g. Dental Implants"
                />
              </div>

              {/* Tagline / Subtitle */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Hero Subtitle / Tagline</label>
                <input
                  type="text"
                  value={service.hero_title || ''}
                  onChange={(e) => updateServiceField('hero_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  placeholder="e.g. Restore Your Natural Smile & Chewing Strength"
                />
              </div>

              {/* Hero Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Hero Description</label>
                <textarea
                  rows={4}
                  value={service.hero_description || ''}
                  onChange={(e) => updateServiceField('hero_description', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 leading-relaxed"
                  placeholder="Type the intro paragraphs explaining Dental Implants here..."
                />
              </div>

              {/* Hero Image */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Hero Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={service.hero_image || ''}
                    onChange={(e) => updateServiceField('hero_image', e.target.value)}
                    className="flex-1 px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => document.getElementById('hero-file-input')?.click()}
                      className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-slate-700 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <ImageIcon className="h-4 w-4" />
                      Browse
                    </button>
                    <input
                      type="file"
                      id="hero-file-input"
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

              {/* Buttons Configurations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Book Appointment Button Text</label>
                  <input
                    type="text"
                    value={mConfig.cta_appointment_text || 'Book Appointment'}
                    onChange={(e) => updateMConfigField('cta_appointment_text', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Book Appointment Link override (optional)</label>
                  <input
                    type="text"
                    value={mConfig.primary_cta_link || ''}
                    onChange={(e) => updateMConfigField('primary_cta_link', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                    placeholder="e.g. #appointment-form or empty for Modal"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">WhatsApp Button Text</label>
                  <input
                    type="text"
                    value={mConfig.cta_whatsapp_text || 'WhatsApp Now'}
                    onChange={(e) => updateMConfigField('cta_whatsapp_text', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">WhatsApp Number (with country code)</label>
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
                  <span className="text-[9px] text-slate-400">Toggle whether the Treatment Overview section is active on the page</span>
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
                  value={service.intro_title || ''}
                  onChange={(e) => updateServiceField('intro_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  placeholder="e.g. What Are Dental Implants?"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Description</label>
                <textarea
                  rows={5}
                  value={service.intro_description || ''}
                  onChange={(e) => updateServiceField('intro_description', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 leading-relaxed"
                  placeholder="Type the full detailed introduction text..."
                />
              </div>
            </div>
          )}
        </div>

        {/* 3. HOW WE PERFORM DENTAL IMPLANTS */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('process')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Sliders className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">3. How We Perform Dental Implants</span>
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
                  value={mConfig.process_section_title || 'Our Advanced Clinical Workflow'}
                  onChange={(e) => updateMConfigField('process_section_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
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

                {steps.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    No steps created. Live page will use default hardcoded fallback steps.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {steps.map((step: any, idx: number) => (
                      <div key={step.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row gap-4 items-start relative shadow-3xs hover:border-slate-300 transition-colors">
                        <div className="flex items-center gap-2 sm:flex-col sm:gap-1.5">
                          <span className="h-7 w-7 rounded-full bg-teal-500 text-white font-bold text-xs flex items-center justify-center border border-teal-600 shadow-sm">
                            {idx + 1}
                          </span>
                          <div className="flex bg-white border border-slate-150 rounded-lg p-0.5 shadow-3xs">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveStep(idx, 'up')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                              title="Move Up"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === steps.length - 1}
                              onClick={() => moveStep(idx, 'down')}
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
                              <label className="text-[9px] font-bold text-slate-500 uppercase">Step Title</label>
                              <input
                                type="text"
                                value={step.title || ''}
                                onChange={(e) => updateStepField(idx, 'title', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase">Phase (e.g. Diagnostic Phase)</label>
                              <input
                                type="text"
                                value={step.phase || ''}
                                onChange={(e) => updateStepField(idx, 'phase', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                                placeholder="e.g. Diagnostic Phase"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-500 uppercase">Step Description</label>
                            <textarea
                              rows={2}
                              value={step.description || ''}
                              onChange={(e) => updateStepField(idx, 'description', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800 leading-normal"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteStep(idx)}
                          className="absolute top-4 right-4 p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition duration-200"
                          title="Delete Step"
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
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure section headline and add/reorder comparison highlight cards</span>
              </div>
            </div>
            {expandedSections.superior ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.superior && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle whether this competitive comparison block is displayed</span>
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
                  value={mConfig.benefits_section_title || 'Why Our Method Is Superior'}
                  onChange={(e) => updateMConfigField('benefits_section_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                />
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Dynamic Comparison Cards</h5>
                  <button
                    type="button"
                    onClick={addCard}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:text-teal-600 rounded-lg text-xs font-bold transition cursor-pointer text-slate-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Card
                  </button>
                </div>

                {cards.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    No custom comparison cards created. Page will show default 10 clinical cards fallback.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {cards.map((card: any, idx: number) => (
                      <div key={card.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row gap-4 items-start relative shadow-3xs hover:border-slate-300 transition-colors">
                        <div className="flex items-center gap-2 sm:flex-col sm:gap-1.5">
                          <span className="h-7 w-7 rounded-full bg-[#0D9488]/10 text-[#0D9488] font-bold text-xs flex items-center justify-center border border-[#0D9488]/20 shadow-xs">
                            {card.number || String(idx + 1).padStart(2, '0')}
                          </span>
                          <div className="flex bg-white border border-slate-150 rounded-lg p-0.5 shadow-3xs">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveCard(idx, 'up')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                              title="Move Up"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === cards.length - 1}
                              onClick={() => moveCard(idx, 'down')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                              title="Move Down"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        <div className="flex-1 space-y-3 w-full">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="space-y-1 sm:col-span-2">
                              <label className="text-[9px] font-bold text-slate-500 uppercase">Card Title</label>
                              <input
                                type="text"
                                value={card.title || ''}
                                onChange={(e) => updateCardField(idx, 'title', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase">Badge Number</label>
                              <input
                                type="text"
                                value={card.number || ''}
                                onChange={(e) => updateCardField(idx, 'number', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800 font-mono"
                                placeholder="e.g. 01"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-500 uppercase">Card Detail Description</label>
                            <textarea
                              rows={2}
                              value={card.description || ''}
                              onChange={(e) => updateCardField(idx, 'description', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800 leading-normal"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteCard(idx)}
                          className="absolute top-4 right-4 p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition duration-200"
                          title="Delete Card"
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
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure section show/hide and manage clinical gallery images</span>
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
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Dynamic Gallery Items</h5>
                </div>

                {galleryItems.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    No custom gallery items uploaded. Page will render default 5 high-res clinical cases fallback.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {galleryItems.map((item: any, idx: number) => (
                      <div key={item.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex items-center gap-4 relative shadow-3xs hover:border-slate-300 transition-colors">
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="h-7 w-7 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-300 shadow-xs">
                            {idx + 1}
                          </span>
                          <div className="flex bg-white border border-slate-150 rounded-lg p-0.5 shadow-3xs">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveGalleryItem(idx, 'up')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                              title="Move Up"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === galleryItems.length - 1}
                              onClick={() => moveGalleryItem(idx, 'down')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                              title="Move Down"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Image Preview & File Browser */}
                        <div className="flex items-center gap-3">
                          <div className="relative h-16 w-24 shrink-0 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                            <img src={item.image_url} alt="Gallery item" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() => document.getElementById(`gallery-item-file-${idx}`)?.click()}
                              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 hover:text-teal-600 rounded-lg text-xs font-bold text-slate-700 shadow-3xs transition cursor-pointer flex items-center gap-1.5"
                            >
                              Replace Image
                            </button>
                            <input
                              type="file"
                              id={`gallery-item-file-${idx}`}
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const url = await handleFileUpload(e.target.files[0]);
                                  if (url) updateGalleryItemField(idx, 'image_url', url);
                                }
                              }}
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteGalleryItem(idx)}
                          className="ml-auto p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition duration-200"
                          title="Delete Item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={() => document.getElementById('add-gallery-item-file')?.click()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-xl text-xs font-black transition cursor-pointer shadow-3xs"
                  >
                    <Plus className="h-4 w-4 text-teal-600" />
                    Add New Image
                  </button>
                  <input
                    type="file"
                    id="add-gallery-item-file"
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
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure procedure title description, video embed URL, and custom overlay thumbnail</span>
              </div>
            </div>
            {expandedSections.video ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.video && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle procedure video guide visible/hidden</span>
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
                  value={service.procedure_video_title || 'Screw Retained Prosthesis Procedure'}
                  onChange={(e) => updateServiceField('procedure_video_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Instagram Reel URL</label>
                <input
                  type="text"
                  value={service.procedure_video_url || 'https://www.instagram.com/reel/C8qLd9MyWwG/'}
                  onChange={(e) => updateServiceField('procedure_video_url', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  placeholder="e.g. https://www.instagram.com/reel/..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Short Video Summary Description</label>
                <textarea
                  rows={2}
                  value={service.procedure_video_description || 'Watch this comprehensive guide detailing how we construct, position, and securely lock the modern screw-retained teeth prosthesis onto premium implants.'}
                  onChange={(e) => updateServiceField('procedure_video_description', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 leading-normal"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Video Thumbnail overlay (optional)</label>
                <input
                  type="text"
                  value={service.procedure_video_thumbnail || ''}
                  onChange={(e) => updateServiceField('procedure_video_thumbnail', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  placeholder="URL of a cover photo when video is not active"
                />
              </div>
            </div>
          )}
        </div>

        {/* 7. PATIENT TESTIMONIAL VIDEOS */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('testimonials')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><MessageSquare className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">7. Patient Testimonial Reels</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure patient Reel testimonial list, names, Instagram Reel URLs, and sort order</span>
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
                  <h5 className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Patient Testimonial Videos</h5>
                  <button
                    type="button"
                    onClick={addTestimonialItem}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:text-teal-600 rounded-lg text-xs font-bold transition cursor-pointer text-slate-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Testimonial Video
                  </button>
                </div>

                {testimonials.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    No custom testimonial videos added yet. Live page will use default placeholder cards.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {testimonials.map((testi: any, idx: number) => (
                      <div key={testi.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col md:flex-row gap-4 items-start relative shadow-3xs hover:border-slate-300 transition-colors">
                        <div className="flex items-center gap-2 md:flex-col md:gap-1.5 shrink-0">
                          <span className="h-7 w-7 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-300 shadow-xs">
                            {idx + 1}
                          </span>
                          <div className="flex bg-white border border-slate-150 rounded-lg p-0.5 shadow-3xs">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveTestimonialItem(idx, 'up')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                              title="Move Up"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === testimonials.length - 1}
                              onClick={() => moveTestimonialItem(idx, 'down')}
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
                                value={testi.patient_name || ''}
                                onChange={(e) => updateTestimonialItemField(idx, 'patient_name', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800 font-bold"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase">Treatment Tag Name</label>
                              <input
                                type="text"
                                value={testi.treatment_name || 'Full Mouth Rehabilitation'}
                                onChange={(e) => updateTestimonialItemField(idx, 'treatment_name', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800 font-medium"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase">Instagram Reel URL</label>
                              <input
                                type="text"
                                value={testi.video_url || ''}
                                onChange={(e) => updateTestimonialItemField(idx, 'video_url', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                                placeholder="e.g. https://www.instagram.com/reel/..."
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase">Custom Cover Thumbnail URL (optional)</label>
                              <input
                                type="text"
                                value={testi.thumbnail || ''}
                                onChange={(e) => updateTestimonialItemField(idx, 'thumbnail', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                                placeholder="Provide a cover image URL for the Reel preview"
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteTestimonialItem(idx)}
                          className="absolute top-4 right-4 p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition duration-200"
                          title="Delete Testimonial"
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

        {/* 8. HOSPITAL & TEAM */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('hospital')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Stethoscope className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">8. Hospital & Team</span>
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
                    No custom images added. Live page will fall back to default hospital & staff image rows.
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
                            onClick={() => document.getElementById(`host-photo-file-${idx}`)?.click()}
                            className="w-full px-2 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[10px] font-bold text-slate-600 shadow-3xs transition cursor-pointer"
                          >
                            Replace Image
                          </button>
                          <input
                            type="file"
                            id={`host-photo-file-${idx}`}
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

        {/* COST OF DENTAL IMPLANTS */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('cost')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Sparkles className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">8.5 Cost of Dental Implants</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure premium cost display, saving highlight, call/WhatsApp numbers, and actions</span>
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
                  value={mConfig.cost_heading || 'Cost of Dental Implants'}
                  onChange={(e) => updateMConfigField('cost_heading', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 font-display font-bold text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Highlight Text (Main Highlight)</label>
                  <input
                    type="text"
                    value={mConfig.cost_highlight_text || 'Save up to 50%'}
                    onChange={(e) => updateMConfigField('cost_highlight_text', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Highlight Subtext</label>
                  <input
                    type="text"
                    value={mConfig.cost_highlight_sub || 'On Dental Implants'}
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

        {/* BEFORE & AFTER GALLERY */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('beforeAfter')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><ImageIcon className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">8.7 Before & After Gallery</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure smile transformations, images before, images after, captions, and display order</span>
              </div>
            </div>
            {expandedSections.beforeAfter ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.beforeAfter && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle the entire Before & After Smile Transformation section</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mConfig.show_before_after !== false}
                    onChange={(e) => updateMConfigField('show_before_after', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Section Heading</label>
                <input
                  type="text"
                  value={mConfig.before_after_heading || 'Before & After Smile Transformations'}
                  onChange={(e) => updateMConfigField('before_after_heading', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 font-display font-bold text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Section Description</label>
                <input
                  type="text"
                  value={mConfig.before_after_description || 'See real smile transformations of our dental implant patients.'}
                  onChange={(e) => updateMConfigField('before_after_description', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                />
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Before & After Smile Transformation Pairs</h5>
                  <button
                    type="button"
                    onClick={addBeforeAfterPair}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:text-teal-600 rounded-lg text-xs font-bold transition cursor-pointer text-slate-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add New Pair
                  </button>
                </div>

                {beforeAfterPairs.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    No transformation pairs added yet. Live page will fall back to default smile transformation pairs.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {beforeAfterPairs.map((pair: any, idx: number) => (
                      <div key={pair.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col md:flex-row gap-4 items-start relative shadow-3xs hover:border-slate-300 transition-colors">
                        <div className="flex items-center gap-2 md:flex-col md:gap-1.5 shrink-0">
                          <span className="h-7 w-7 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-300 shadow-xs">
                            {idx + 1}
                          </span>
                          <div className="flex bg-white border border-slate-150 rounded-lg p-0.5 shadow-3xs">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveBeforeAfterPair(idx, 'up')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                              title="Move Up"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === beforeAfterPairs.length - 1}
                              onClick={() => moveBeforeAfterPair(idx, 'down')}
                              className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition"
                              title="Move Down"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Image Fields Grid */}
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0 md:w-80">
                          {/* Before Image */}
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-red-500 uppercase block">Before Image</label>
                            <img src={pair.before_image} alt="Before" className="w-full h-20 object-cover rounded-xl border border-slate-200/60 shadow-3xs" referrerPolicy="no-referrer" />
                            <button
                              type="button"
                              onClick={() => document.getElementById(`before-image-file-${idx}`)?.click()}
                              className="w-full px-2 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[10px] font-bold text-slate-600 shadow-3xs transition cursor-pointer"
                            >
                              Replace Before
                            </button>
                            <input
                              type="file"
                              id={`before-image-file-${idx}`}
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const url = await handleFileUpload(e.target.files[0]);
                                  if (url) updateBeforeAfterPairField(idx, 'before_image', url);
                                }
                              }}
                            />
                          </div>

                          {/* After Image */}
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-emerald-600 uppercase block">After Image</label>
                            <img src={pair.after_image} alt="After" className="w-full h-20 object-cover rounded-xl border border-slate-200/60 shadow-3xs" referrerPolicy="no-referrer" />
                            <button
                              type="button"
                              onClick={() => document.getElementById(`after-image-file-${idx}`)?.click()}
                              className="w-full px-2 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[10px] font-bold text-slate-600 shadow-3xs transition cursor-pointer"
                            >
                              Replace After
                            </button>
                            <input
                              type="file"
                              id={`after-image-file-${idx}`}
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const url = await handleFileUpload(e.target.files[0]);
                                  if (url) updateBeforeAfterPairField(idx, 'after_image', url);
                                }
                              }}
                            />
                          </div>
                        </div>

                        {/* Optional Caption & Display Order */}
                        <div className="flex-1 space-y-3 w-full">
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-500 uppercase">Caption text (optional)</label>
                            <input
                              type="text"
                              value={pair.caption || ''}
                              onChange={(e) => updateBeforeAfterPairField(idx, 'caption', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                              placeholder="Describe the smile reconstruction/treatment..."
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-500 uppercase">Display Order</label>
                            <input
                              type="number"
                              value={pair.display_order || ''}
                              onChange={(e) => updateBeforeAfterPairField(idx, 'display_order', Number(e.target.value))}
                              className="w-24 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                              placeholder="10"
                            />
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => deleteBeforeAfterPair(idx)}
                          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="Delete Pair"
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

        {/* 9. FINAL CTA */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('bottomCta')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Sparkles className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">9. Final CTA</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure bottom action block, call numbers, WhatsApp prompts, and request callback triggers</span>
              </div>
            </div>
            {expandedSections.bottomCta ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.bottomCta && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle bottom contact CTA card active/inactive</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mConfig.show_bottom_cta !== false}
                    onChange={(e) => updateMConfigField('show_bottom_cta', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">CTA Heading</label>
                <input
                  type="text"
                  value={mConfig.bottom_cta_heading || 'Ready to Restore Your Natural Chew & Beautiful Smile?'}
                  onChange={(e) => updateMConfigField('bottom_cta_heading', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 font-display font-bold text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">CTA Description</label>
                <textarea
                  rows={2}
                  value={mConfig.bottom_cta_description || 'Schedule your private clinical consultation with Dr. Vipul Patel today.'}
                  onChange={(e) => updateMConfigField('bottom_cta_description', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 leading-normal"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Call Number</label>
                  <input
                    type="text"
                    value={mConfig.contact_call_number || '+91 95103 97046'}
                    onChange={(e) => updateMConfigField('contact_call_number', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">WhatsApp Number</label>
                  <input
                    type="text"
                    value={mConfig.contact_whatsapp_number || '919510397046'}
                    onChange={(e) => updateMConfigField('contact_whatsapp_number', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Callback Button Text</label>
                  <input
                    type="text"
                    value={mConfig.bottom_cta_secondary_btn_text || 'Request Callback'}
                    onChange={(e) => updateMConfigField('bottom_cta_secondary_btn_text', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 10. SEO */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('seo')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Sliders className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">10. SEO</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure SEO page search engine title, meta description, search tags/keywords, and social OG share graphics</span>
              </div>
            </div>
            {expandedSections.seo ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.seo && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">SEO Title</label>
                <input
                  type="text"
                  value={service.seo_title || ''}
                  onChange={(e) => updateServiceField('seo_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  placeholder="e.g. Best Dental Implants in Rajkot - Patel Dental Hospital"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Meta Description</label>
                <textarea
                  rows={3}
                  value={service.seo_description || ''}
                  onChange={(e) => updateServiceField('seo_description', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 leading-normal"
                  placeholder="Write a catchy summary of dental implants search result..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Meta Keywords (comma separated)</label>
                <input
                  type="text"
                  value={mConfig.seo_keywords || ''}
                  onChange={(e) => updateMConfigField('seo_keywords', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  placeholder="e.g. dental implants, tooth implants, rajkot dental hospital, Vipul Patel"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">OG Image URL (Social Share Graphic)</label>
                <input
                  type="text"
                  value={mConfig.og_image || ''}
                  onChange={(e) => updateMConfigField('og_image', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  placeholder="e.g. https://images.unsplash.com/photo-..."
                />
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Floating Save Action Bar */}
      <div className="sticky bottom-6 z-20 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-150 shadow-lg flex justify-between items-center max-w-4xl mx-auto">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Dental Implants CMS Editor</span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSaveAll()}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-50 text-white text-xs font-black rounded-xl shadow-md transition duration-200 cursor-pointer"
          >
            <Check className="h-4 w-4" />
            {saving ? 'Saving...' : 'Apply & Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
