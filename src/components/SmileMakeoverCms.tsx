import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, ChevronDown, ChevronUp, Save, Check, 
  Image as ImageIcon, Video, Sliders, Shield, Heart,
  Sparkles, MessageSquare, ArrowUp, ArrowDown, Info, Upload, Star, HelpCircle, Stethoscope, Users
} from 'lucide-react';
import { Service } from '../types';
import { serviceService } from '../utils/serviceData';
import { uploadImage } from '../utils/supabaseStorage';
import { isSupabaseConfigured } from '../utils/supabase';

interface SmileMakeoverCmsProps {
  onSaveSuccess?: () => void;
}

export default function SmileMakeoverCms({ onSaveSuccess }: SmileMakeoverCmsProps = {}) {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Expanded sections state
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    hero: true, // Keep hero open by default
  });

  const toggleSection = (sec: string) => {
    setExpandedSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  // Base64 file reader fallback
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

  // Fetch Smile Makeover service on load
  useEffect(() => {
    async function loadService() {
      setLoading(true);
      try {
        const services = await serviceService.getServices();
        let found = services.find(s => s.slug === 'smile-makeover' || s.id === 'smile-srv' || s.id === 'smile' || s.title === 'Smile Makeover');
        
        if (!found) {
          // Fallback initial state if record is missing
          found = {
            id: 'smile-srv',
            slug: 'smile-makeover',
            title: 'Smile Makeover',
            short_description: 'Transform your smile with custom aesthetic procedures combining technology and dental artistry.',
            hero_description: 'Transform your smile with custom aesthetic procedures combining technology and dental artistry.',
            description: 'A Smile Makeover is a comprehensive cosmetic dental treatment tailored to improve your teeth appearance, symmetry, and overall facial aesthetics.',
            intro_title: 'What is Smile Makeover?',
            hero_image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200',
            icon: 'Sparkles',
            display_order: 5,
            is_active: true,
            process_steps: [
              {
                id: 'smile-step-1',
                phase: 'Step 1',
                title: 'Comprehensive Smile Analysis & Scans',
                description: 'Detailed clinical assessment, digital imaging, DSLR photography, and face shape evaluation.',
                display_order: 10
              },
              {
                id: 'smile-step-2',
                phase: 'Step 2',
                title: 'Digital Smile Design & Trial',
                description: 'Customizing your smile makeover plan with virtual preview and mock-up fitting.',
                display_order: 20
              },
              {
                id: 'smile-step-3',
                phase: 'Step 3',
                title: 'Treatment Execution & Final Reveal',
                description: 'Precise application of chosen aesthetic solutions for a radiant and natural smile.',
                display_order: 30
              }
            ],
            features: [
              {
                id: 'smile-feat-1',
                title: 'Personalized Facial Aesthetics',
                description: 'Customized to align with your facial symmetry, lip line, and skin tone.',
                display_order: 10
              }
            ],
            procedure_video_title: 'Smile Makeover Procedure',
            procedure_video_url: '',
            patient_testimonials: [],
            hospital_team_photos: [],
            marketing_config: {
              green_highlight_line: 'Enhance your confidence and aesthetics with personalized Smile Makeover treatments.',
              process_section_title: 'Smile Makeover Treatment Planning',
              benefits_section_title: 'Smile Makeover Options',
              candidate_section_title: 'Smile Makeover Options',
              candidate_items: [
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
              ],
              gallery_heading: 'Clinical Case Gallery',
              gallery_description: 'Clinical case transformations of smile makeover patients.',
              before_after_heading: 'Before & After Smile Transformations',
              before_after_description: 'See real smile transformations of our smile makeover patients.',
              before_after_pairs: [],
              gallery_items: [],
              sec11_heading: 'Book Your Smile Makeover Consultation',
              phone_number: '+91 9510397046',
              whatsapp_number: '+91 9510397046',
              cost_heading: 'Smile Makeover Consultation',
              cost_description: '',
              cost_starting_price: '',
              google_reviews_heading: 'Google Patient Reviews',
              google_reviews: [],
              hospital_team_title: 'Hospital & Team Gallery',
              testimonials_section_title: 'Patient Testimonials',
              faqs: [],
              show_hero: true,
              show_introduction: true,
              show_process: true,
              show_benefits: false,
              show_candidate: true,
              show_before_after: true,
              show_gallery: true,
              show_procedure_video: true,
              show_testimonials: true,
              show_hospital_photos: true,
              show_cost: true,
              show_google_reviews: true,
              show_faqs: true,
              show_bottom_cta: true
            }
          };
        }

        // Ensure marketing_config exists and is initialized
        if (!found.marketing_config) {
          found.marketing_config = {};
        }

        setService(found);
      } catch (err: any) {
        console.error('Error loading Smile Makeover service:', err);
        setErrorMsg('Failed to load Smile Makeover data.');
      } finally {
        setLoading(false);
      }
    }

    loadService();
  }, []);

  if (loading) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-100 shadow-3xs">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D9488] mx-auto" />
        <p className="mt-3 text-xs text-slate-500 font-medium">Loading Smile Makeover CMS...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="p-8 text-center bg-rose-50 text-rose-800 rounded-2xl border border-rose-200">
        <p className="font-bold text-sm">Failed to load Smile Makeover configuration.</p>
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
        title: service.title?.trim() || 'Smile Makeover',
        slug: 'smile-makeover',
        process_steps: Array.isArray(service.process_steps) ? service.process_steps : [],
        features: Array.isArray(service.features) ? service.features : [],
        patient_testimonials: Array.isArray(service.patient_testimonials) ? service.patient_testimonials : [],
        hospital_team_photos: Array.isArray(service.hospital_team_photos) ? service.hospital_team_photos : [],
      };

      const result = await serviceService.saveService(payload);
      if (result.success) {
        setSuccessMsg('Smile Makeover CMS configurations saved successfully!');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onSaveSuccess?.();
      } else {
        setErrorMsg(result.error || 'Failed to save Smile Makeover configuration changes.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected exception occurred during save operations.');
    } finally {
      setSaving(false);
    }
  };

  // Section 3: Process Steps
  const steps = Array.isArray(service.process_steps) ? service.process_steps : [];
  const addStep = () => {
    const nextOrder = steps.length > 0 ? Math.max(...steps.map((s: any) => Number(s.display_order) || 0)) + 10 : 10;
    const newStep = {
      id: `step-${Date.now()}`,
      phase: `Step ${steps.length + 1}`,
      title: '',
      description: 'Enter treatment process step description...',
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

  // Section 3.5: Features / Treatment Planning Items
  const features = Array.isArray(service.features) ? service.features : [];
  const addFeature = () => {
    const nextOrder = features.length > 0 ? Math.max(...features.map((f: any) => Number(f.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `plan-${Date.now()}`,
      title: '',
      description: 'New treatment planning detail or feature item...',
      display_order: nextOrder
    };
    updateServiceField('features', [...features, newItem]);
  };
  const deleteFeature = (index: number) => {
    updateServiceField('features', features.filter((_, i) => i !== index));
  };
  const moveFeature = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= features.length) return;
    const updated = [...features];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updateServiceField('features', updated);
  };
  const updateFeatureField = (index: number, key: string, val: any) => {
    const updated = [...features];
    updated[index] = { ...updated[index], [key]: val };
    updateServiceField('features', updated);
  };

  // Section 4: Smile Makeover Options (Candidate Items)
  const candidateItems = Array.isArray(mConfig.candidate_items) ? mConfig.candidate_items : [];
  const addCandidateItem = () => {
    const nextOrder = candidateItems.length > 0 ? Math.max(...candidateItems.map((c: any) => Number(c.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `cand-${Date.now()}`,
      title: '',
      description: 'Enter option description...',
      display_order: nextOrder
    };
    updateMConfigField('candidate_items', [...candidateItems, newItem]);
  };
  const deleteCandidateItem = (index: number) => {
    updateMConfigField('candidate_items', candidateItems.filter((_, i) => i !== index));
  };
  const moveCandidateItem = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= candidateItems.length) return;
    const updated = [...candidateItems];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updateMConfigField('candidate_items', updated);
  };
  const updateCandidateItemField = (index: number, key: string, val: any) => {
    const updated = [...candidateItems];
    updated[index] = { ...updated[index], [key]: val };
    updateMConfigField('candidate_items', updated);
  };

  // Section 5: Before & After Gallery Pairs
  const beforeAfterPairs = Array.isArray(mConfig.before_after_pairs) ? mConfig.before_after_pairs : [];
  const addBeforeAfterPair = () => {
    const nextOrder = beforeAfterPairs.length > 0 ? Math.max(...beforeAfterPairs.map((p: any) => Number(p.display_order) || 0)) + 10 : 10;
    const newPair = {
      id: `ba-${Date.now()}`,
      before_image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
      after_image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
      caption: '',
      display_order: nextOrder
    };
    updateMConfigField('before_after_pairs', [...beforeAfterPairs, newPair]);
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

  // Section 6: Clinical Case Gallery
  const galleryItems = Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : [];
  const addGalleryItem = () => {
    const nextOrder = galleryItems.length > 0 ? Math.max(...galleryItems.map((g: any) => Number(g.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `gal-${Date.now()}`,
      caption: 'Clinical Case Image',
      image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
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

  // Section 8: Patient Testimonials
  const testimonials = Array.isArray(service.patient_testimonials) ? service.patient_testimonials : [];
  const addTestimonialItem = () => {
    const nextOrder = testimonials.length > 0 ? Math.max(...testimonials.map((t: any) => Number(t.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `testi-${Date.now()}`,
      patient_name: '',
      video_url: '',
      treatment_name: 'Smile Makeover',
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

  // Section 9: Hospital & Team Photos
  const hostPhotos = Array.isArray(service.hospital_team_photos) ? service.hospital_team_photos : [];
  const addHostPhotoItem = () => {
    const nextOrder = hostPhotos.length > 0 ? Math.max(...hostPhotos.map((h: any) => Number(h.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `hosp-${Date.now()}`,
      type: 'hospital',
      caption: '',
      image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
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

  // Section 11: Google Patient Reviews
  const googleReviews = Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : [];
  const addGoogleReview = () => {
    const nextOrder = googleReviews.length > 0 ? Math.max(...googleReviews.map((r: any) => Number(r.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `review-${Date.now()}`,
      patient_name: '',
      patient_photo_url: '',
      rating: 5,
      review_text: '',
      review_date: 'Recently',
      review_url: '',
      display_order: nextOrder,
      enabled: true
    };
    updateMConfigField('google_reviews', [...googleReviews, newItem]);
  };
  const deleteGoogleReview = (index: number) => {
    updateMConfigField('google_reviews', googleReviews.filter((_, i) => i !== index));
  };
  const updateGoogleReviewField = (index: number, key: string, val: any) => {
    const updated = [...googleReviews];
    updated[index] = { ...updated[index], [key]: val };
    updateMConfigField('google_reviews', updated);
  };

  // Section 13: FAQ
  const faqs = Array.isArray(mConfig.faqs) ? mConfig.faqs : [];
  const addFaq = () => {
    const nextOrder = faqs.length > 0 ? Math.max(...faqs.map((f: any) => Number(f.display_order) || 0)) + 10 : 10;
    const newFaq = {
      id: `faq-${Date.now()}`,
      question: '',
      answer: '',
      display_order: nextOrder
    };
    updateMConfigField('faqs', [...faqs, newFaq]);
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
    <div className="space-y-6">
      {/* CMS Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-3xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#0D9488] text-[10px] font-black uppercase tracking-wider">
              Universal Service CMS
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-500 text-xs font-semibold">Smile Makeover</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#081C3A] mt-1 tracking-tight">
            Smile Makeover Content Management
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Manage all 13 sections for the Smile Makeover service page.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0D9488] hover:bg-[#0D9488]/90 text-white rounded-xl text-xs font-bold shadow-3xs transition-all disabled:opacity-50 cursor-pointer shrink-0"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save All Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-3xs">
          <Check className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2 shadow-3xs">
          <Info className="h-4 w-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 13 CMS SECTIONS ACCORDION CONTAINER */}
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
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">1. Hero Section</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure main title, hero description, and hero banner image</span>
              </div>
            </div>
            {expandedSections.hero ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.hero && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Hero block visible/hidden on frontend</span>
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

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Service Title</label>
                  <input
                    type="text"
                    value={service.title || 'Smile Makeover'}
                    onChange={(e) => updateServiceField('title', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Hero Description</label>
                  <textarea
                    rows={3}
                    value={service.hero_description || service.short_description || ''}
                    onChange={(e) => {
                      updateServiceField('hero_description', e.target.value);
                      updateServiceField('short_description', e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Hero Banner Image URL / Upload</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={service.hero_image || ''}
                      onChange={(e) => updateServiceField('hero_image', e.target.value)}
                      placeholder="https://..."
                      className="flex-1 px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                    />
                    <label className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold rounded-xl cursor-pointer flex items-center gap-1.5 shrink-0 transition-colors">
                      <Upload className="h-3.5 w-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = await handleFileUpload(e.target.files[0]);
                            if (url) updateServiceField('hero_image', url);
                          }
                        }}
                      />
                    </label>
                  </div>
                  {service.hero_image && (
                    <div className="mt-2 relative w-full h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                      <img src={service.hero_image} alt="Hero Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. WHAT IS SMILE MAKEOVER? */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('about')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Info className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">2. What is Smile Makeover?</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure introduction text, clinical overview, and highlight banner</span>
              </div>
            </div>
            {expandedSections.about ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.about && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle What is Smile Makeover section visible/hidden</span>
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

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Clinical Description</label>
                  <textarea
                    rows={5}
                    value={service.description || ''}
                    onChange={(e) => updateServiceField('description', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Green Highlight Banner Line</label>
                  <textarea
                    rows={2}
                    value={mConfig.green_highlight_line || ''}
                    onChange={(e) => updateMConfigField('green_highlight_line', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. SMILE MAKEOVER TREATMENT PLANNING */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('process')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Sliders className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">3. Smile Makeover Treatment Planning</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure treatment steps, phases, and technology details</span>
              </div>
            </div>
            {expandedSections.process ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.process && (
            <div className="p-6 border-t border-slate-100 space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Treatment Planning section visible/hidden</span>
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

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Process Section Heading</label>
                <input
                  type="text"
                  value={mConfig.process_section_title || 'Smile Makeover Treatment Planning'}
                  onChange={(e) => updateMConfigField('process_section_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>

              {/* Treatment Steps List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Treatment Steps ({steps.length})</span>
                  <button
                    type="button"
                    onClick={addStep}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-lg text-xs font-extrabold transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Step
                  </button>
                </div>

                {steps.map((st: any, idx: number) => (
                  <div key={st.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row gap-4 items-start relative shadow-3xs">
                    <div className="flex items-center gap-2 sm:flex-col sm:gap-1.5 shrink-0">
                      <span className="h-7 w-7 rounded-full bg-[#0D9488]/10 text-[#0D9488] font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div className="flex bg-white border border-slate-150 rounded-lg p-0.5">
                        <button type="button" disabled={idx === 0} onClick={() => moveStep(idx, 'up')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp className="h-3 w-3" /></button>
                        <button type="button" disabled={idx === steps.length - 1} onClick={() => moveStep(idx, 'down')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown className="h-3 w-3" /></button>
                      </div>
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Phase / Tag</label>
                          <input type="text" value={st.phase || ''} onChange={(e) => updateStepField(idx, 'phase', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Step Title</label>
                          <input type="text" value={st.title || ''} onChange={(e) => updateStepField(idx, 'title', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Step Description</label>
                        <textarea rows={2} value={st.description || ''} onChange={(e) => updateStepField(idx, 'description', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                      </div>
                    </div>

                    <button type="button" onClick={() => deleteStep(idx)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>

              {/* Treatment Features / Technology Items */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Technology & Features ({features.length})</span>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-lg text-xs font-extrabold transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Feature Item
                  </button>
                </div>

                {features.map((feat: any, idx: number) => (
                  <div key={feat.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row gap-4 items-start relative shadow-3xs">
                    <div className="flex items-center gap-2 sm:flex-col sm:gap-1.5 shrink-0">
                      <span className="h-7 w-7 rounded-full bg-[#0D9488]/10 text-[#0D9488] font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div className="flex bg-white border border-slate-150 rounded-lg p-0.5">
                        <button type="button" disabled={idx === 0} onClick={() => moveFeature(idx, 'up')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp className="h-3 w-3" /></button>
                        <button type="button" disabled={idx === features.length - 1} onClick={() => moveFeature(idx, 'down')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown className="h-3 w-3" /></button>
                      </div>
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Feature Title</label>
                        <input type="text" value={feat.title || ''} onChange={(e) => updateFeatureField(idx, 'title', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Feature Description</label>
                        <textarea rows={2} value={feat.description || ''} onChange={(e) => updateFeatureField(idx, 'description', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                      </div>
                    </div>

                    <button type="button" onClick={() => deleteFeature(idx)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. SMILE MAKEOVER OPTIONS */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('candidate')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Users className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">4. Smile Makeover Options</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure options cards for Smile Makeover treatments</span>
              </div>
            </div>
            {expandedSections.candidate ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.candidate && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Smile Makeover Options section visible/hidden</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mConfig.show_candidate !== false}
                    onChange={(e) => updateMConfigField('show_candidate', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                </label>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Options Section Heading</label>
                <input
                  type="text"
                  value={mConfig.candidate_section_title || 'Smile Makeover Options'}
                  onChange={(e) => updateMConfigField('candidate_section_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Smile Makeover Option Cards ({candidateItems.length})</span>
                  <button
                    type="button"
                    onClick={addCandidateItem}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-lg text-xs font-extrabold transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Option Card
                  </button>
                </div>

                {candidateItems.map((cand: any, idx: number) => (
                  <div key={cand.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row gap-4 items-start relative shadow-3xs">
                    <div className="flex items-center gap-2 sm:flex-col sm:gap-1.5 shrink-0">
                      <span className="h-7 w-7 rounded-full bg-[#0D9488]/10 text-[#0D9488] font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div className="flex bg-white border border-slate-150 rounded-lg p-0.5">
                        <button type="button" disabled={idx === 0} onClick={() => moveCandidateItem(idx, 'up')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp className="h-3 w-3" /></button>
                        <button type="button" disabled={idx === candidateItems.length - 1} onClick={() => moveCandidateItem(idx, 'down')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown className="h-3 w-3" /></button>
                      </div>
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Option Title</label>
                        <input type="text" value={cand.title || ''} onChange={(e) => updateCandidateItemField(idx, 'title', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Option Description</label>
                        <textarea rows={2} value={cand.description || ''} onChange={(e) => updateCandidateItemField(idx, 'description', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                      </div>
                    </div>

                    <button type="button" onClick={() => deleteCandidateItem(idx)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
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
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Sparkles className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">5. Before & After Gallery</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Manage Before & After image pairs for smile transformations</span>
              </div>
            </div>
            {expandedSections.beforeAfter ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>
          
          {expandedSections.beforeAfter && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400 font-normal">Toggle the entire Before & After Smile Transformation section</span>
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

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Section Heading</label>
                  <input
                    type="text"
                    value={mConfig.before_after_heading || 'Before & After Smile Transformations'}
                    onChange={(e) => updateMConfigField('before_after_heading', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Section Description</label>
                  <input
                    type="text"
                    value={mConfig.before_after_description || 'See real smile transformations of our smile makeover patients.'}
                    onChange={(e) => updateMConfigField('before_after_description', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Before & After Image Pairs ({beforeAfterPairs.length})</span>
                    <button
                      type="button"
                      onClick={addBeforeAfterPair}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-lg text-xs font-extrabold transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Image Pair
                    </button>
                  </div>

                  {beforeAfterPairs.map((pair: any, idx: number) => (
                    <div key={pair.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl space-y-3 relative shadow-3xs">
                      <div className="flex items-center justify-between border-b border-slate-150 pb-2">
                        <span className="text-xs font-extrabold text-[#081C3A]">Pair #{idx + 1}</span>
                        <div className="flex items-center gap-1">
                          <button type="button" disabled={idx === 0} onClick={() => moveBeforeAfterPair(idx, 'up')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button>
                          <button type="button" disabled={idx === beforeAfterPairs.length - 1} onClick={() => moveBeforeAfterPair(idx, 'down')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button>
                          <button type="button" onClick={() => deleteBeforeAfterPair(idx)} className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg ml-2"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Before Image URL</label>
                          <div className="flex gap-2">
                            <input type="text" value={pair.before_image || ''} onChange={(e) => updateBeforeAfterPairField(idx, 'before_image', e.target.value)} className="flex-1 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white" />
                            <label className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg cursor-pointer shrink-0">
                              Upload
                              <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const url = await handleFileUpload(e.target.files[0]);
                                  if (url) updateBeforeAfterPairField(idx, 'before_image', url);
                                }
                              }} />
                            </label>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">After Image URL</label>
                          <div className="flex gap-2">
                            <input type="text" value={pair.after_image || ''} onChange={(e) => updateBeforeAfterPairField(idx, 'after_image', e.target.value)} className="flex-1 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white" />
                            <label className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg cursor-pointer shrink-0">
                              Upload
                              <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const url = await handleFileUpload(e.target.files[0]);
                                  if (url) updateBeforeAfterPairField(idx, 'after_image', url);
                                }
                              }} />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 6. CLINICAL CASE GALLERY */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('gallery')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><ImageIcon className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">6. Clinical Case Gallery</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure gallery heading and individual clinical case photos</span>
              </div>
            </div>
            {expandedSections.gallery ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.gallery && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Clinical Case Gallery section visible/hidden</span>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Gallery Heading</label>
                  <input
                    type="text"
                    value={mConfig.gallery_heading || 'Clinical Case Gallery'}
                    onChange={(e) => updateMConfigField('gallery_heading', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Gallery Description</label>
                  <input
                    type="text"
                    value={mConfig.gallery_description || 'Clinical case transformations of smile makeover patients.'}
                    onChange={(e) => updateMConfigField('gallery_description', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Gallery Items ({galleryItems.length})</span>
                  <button
                    type="button"
                    onClick={addGalleryItem}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-lg text-xs font-extrabold transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Gallery Photo
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {galleryItems.map((gal: any, idx: number) => (
                    <div key={gal.id || idx} className="p-3 bg-slate-50/50 border border-slate-150 rounded-2xl space-y-2 relative shadow-3xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-[#081C3A]">Photo #{idx + 1}</span>
                        <button type="button" onClick={() => deleteGalleryItem(idx)} className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Image URL / Upload</label>
                        <div className="flex gap-1.5">
                          <input type="text" value={gal.image_url || ''} onChange={(e) => updateGalleryItemField(idx, 'image_url', e.target.value)} className="flex-1 px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white" />
                          <label className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold rounded-lg cursor-pointer shrink-0">
                            Upload
                            <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const url = await handleFileUpload(e.target.files[0]);
                                if (url) updateGalleryItemField(idx, 'image_url', url);
                              }
                            }} />
                          </label>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Caption</label>
                        <input type="text" value={gal.caption || ''} onChange={(e) => updateGalleryItemField(idx, 'caption', e.target.value)} className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 7. PROCEDURE VIDEO */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('video')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Video className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">7. Procedure Video</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Embed procedure demonstration video link (YouTube / Instagram / Direct MP4)</span>
              </div>
            </div>
            {expandedSections.video ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.video && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Procedure Video section visible/hidden</span>
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

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Video Section Title</label>
                  <input
                    type="text"
                    value={service.procedure_video_title || 'Smile Makeover Procedure'}
                    onChange={(e) => updateServiceField('procedure_video_title', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Procedure Video URL</label>
                  <input
                    type="text"
                    value={service.procedure_video_url || ''}
                    onChange={(e) => updateServiceField('procedure_video_url', e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or https://www.instagram.com/reel/..."
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 8. PATIENT TESTIMONIALS */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('testimonials')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><MessageSquare className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">8. Patient Testimonials</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Manage video testimonials and patient stories</span>
              </div>
            </div>
            {expandedSections.testimonials ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.testimonials && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Testimonials section visible/hidden</span>
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

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Testimonials Section Title</label>
                <input
                  type="text"
                  value={mConfig.testimonials_section_title || 'Patient Testimonials'}
                  onChange={(e) => updateMConfigField('testimonials_section_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Video Testimonials ({testimonials.length})</span>
                  <button
                    type="button"
                    onClick={addTestimonialItem}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-lg text-xs font-extrabold transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Testimonial
                  </button>
                </div>

                {testimonials.map((t: any, idx: number) => (
                  <div key={t.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl space-y-3 relative shadow-3xs">
                    <div className="flex items-center justify-between border-b border-slate-150 pb-2">
                      <span className="text-xs font-extrabold text-[#081C3A]">Testimonial #{idx + 1}</span>
                      <button type="button" onClick={() => deleteTestimonialItem(idx)} className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Patient Name / Title</label>
                        <input type="text" value={t.patient_name || ''} onChange={(e) => updateTestimonialItemField(idx, 'patient_name', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white" />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Video URL (YouTube / Instagram)</label>
                        <input type="text" value={t.video_url || ''} onChange={(e) => updateTestimonialItemField(idx, 'video_url', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 9. HOSPITAL & TEAM GALLERY */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('hospital')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Stethoscope className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">9. Hospital & Team Gallery</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Showcase hospital infrastructure and clinical team photos</span>
              </div>
            </div>
            {expandedSections.hospital ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.hospital && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Hospital & Team Gallery section visible/hidden</span>
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

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Section Title</label>
                <input
                  type="text"
                  value={mConfig.hospital_team_title || 'Hospital & Team Gallery'}
                  onChange={(e) => updateMConfigField('hospital_team_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Hospital & Team Photos ({hostPhotos.length})</span>
                  <button
                    type="button"
                    onClick={addHostPhotoItem}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-lg text-xs font-extrabold transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Hospital Photo
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hostPhotos.map((hp: any, idx: number) => (
                    <div key={hp.id || idx} className="p-3 bg-slate-50/50 border border-slate-150 rounded-2xl space-y-2 relative shadow-3xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-[#081C3A]">Photo #{idx + 1}</span>
                        <button type="button" onClick={() => deleteHostPhotoItem(idx)} className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Image URL / Upload</label>
                        <div className="flex gap-1.5">
                          <input type="text" value={hp.image_url || ''} onChange={(e) => updateHostPhotoItemField(idx, 'image_url', e.target.value)} className="flex-1 px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white" />
                          <label className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold rounded-lg cursor-pointer shrink-0">
                            Upload
                            <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const url = await handleFileUpload(e.target.files[0]);
                                if (url) updateHostPhotoItemField(idx, 'image_url', url);
                              }
                            }} />
                          </label>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Caption</label>
                        <input type="text" value={hp.caption || ''} onChange={(e) => updateHostPhotoItemField(idx, 'caption', e.target.value)} className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 10. COST / CALL */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('cost')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Shield className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">10. Cost / Call Section</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure promotional pricing banner, contact numbers, and offers</span>
              </div>
            </div>
            {expandedSections.cost ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.cost && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Cost / Call section visible/hidden</span>
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

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Cost Section Heading</label>
                  <input
                    type="text"
                    value={mConfig.cost_heading || 'Smile Makeover Consultation'}
                    onChange={(e) => updateMConfigField('cost_heading', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Cost Section Description</label>
                  <textarea
                    rows={2}
                    value={mConfig.cost_description || ''}
                    onChange={(e) => updateMConfigField('cost_description', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="text"
                      value={mConfig.phone_number || '+91 9510397046'}
                      onChange={(e) => updateMConfigField('phone_number', e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">WhatsApp Number</label>
                    <input
                      type="text"
                      value={mConfig.whatsapp_number || '+91 9510397046'}
                      onChange={(e) => updateMConfigField('whatsapp_number', e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 11. GOOGLE PATIENT REVIEWS */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('reviews')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Star className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">11. Google Patient Reviews</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Manage Google patient review cards, star ratings, and links</span>
              </div>
            </div>
            {expandedSections.reviews ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.reviews && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Google Patient Reviews section visible/hidden</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mConfig.show_google_reviews !== false}
                    onChange={(e) => updateMConfigField('show_google_reviews', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                </label>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Reviews Section Title</label>
                <input
                  type="text"
                  value={mConfig.google_reviews_heading || 'Google Patient Reviews'}
                  onChange={(e) => updateMConfigField('google_reviews_heading', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Google Reviews ({googleReviews.length})</span>
                  <button
                    type="button"
                    onClick={addGoogleReview}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-lg text-xs font-extrabold transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Review
                  </button>
                </div>

                {googleReviews.map((rev: any, idx: number) => (
                  <div key={rev.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl space-y-3 relative shadow-3xs">
                    <div className="flex items-center justify-between border-b border-slate-150 pb-2">
                      <span className="text-xs font-extrabold text-[#081C3A]">Review #{idx + 1}</span>
                      <button type="button" onClick={() => deleteGoogleReview(idx)} className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Patient Name</label>
                        <input type="text" value={rev.patient_name || ''} onChange={(e) => updateGoogleReviewField(idx, 'patient_name', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white" />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Review Date</label>
                        <input type="text" value={rev.review_date || ''} onChange={(e) => updateGoogleReviewField(idx, 'review_date', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Review Text</label>
                      <textarea rows={2} value={rev.review_text || ''} onChange={(e) => updateGoogleReviewField(idx, 'review_text', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 12. BOTTOM CTA */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('cta')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Heart className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">12. Bottom CTA Banner</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure bottom call-to-action title and appointment buttons</span>
              </div>
            </div>
            {expandedSections.cta ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.cta && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Bottom CTA section visible/hidden</span>
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

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">CTA Banner Heading</label>
                <input
                  type="text"
                  value={mConfig.sec11_heading || 'Book Your Smile Makeover Consultation'}
                  onChange={(e) => updateMConfigField('sec11_heading', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                />
              </div>
            </div>
          )}
        </div>

        {/* 13. FAQ SECTION */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('faqs')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><HelpCircle className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">13. FAQ Section</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure frequently asked questions and answers</span>
              </div>
            </div>
            {expandedSections.faqs ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.faqs && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle FAQ section visible/hidden</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mConfig.show_faqs !== false}
                    onChange={(e) => updateMConfigField('show_faqs', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                </label>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Frequently Asked Questions ({faqs.length})</span>
                  <button
                    type="button"
                    onClick={addFaq}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-lg text-xs font-extrabold transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add FAQ Item
                  </button>
                </div>

                {faqs.map((faq: any, idx: number) => (
                  <div key={faq.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row gap-4 items-start relative shadow-3xs">
                    <div className="flex items-center gap-2 sm:flex-col sm:gap-1.5 shrink-0">
                      <span className="h-7 w-7 rounded-full bg-[#0D9488]/10 text-[#0D9488] font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div className="flex bg-white border border-slate-150 rounded-lg p-0.5">
                        <button type="button" disabled={idx === 0} onClick={() => moveFaq(idx, 'up')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp className="h-3 w-3" /></button>
                        <button type="button" disabled={idx === faqs.length - 1} onClick={() => moveFaq(idx, 'down')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown className="h-3 w-3" /></button>
                      </div>
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Question</label>
                        <input type="text" value={faq.question || ''} onChange={(e) => updateFaqField(idx, 'question', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Answer</label>
                        <textarea rows={2} value={faq.answer || ''} onChange={(e) => updateFaqField(idx, 'answer', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                      </div>
                    </div>

                    <button type="button" onClick={() => deleteFaq(idx)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Bottom Floating Save Button */}
      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={handleSaveAll}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#0D9488] hover:bg-[#0D9488]/90 text-white rounded-xl text-sm font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              <span>Saving Configurations...</span>
            </>
          ) : (
            <>
              <Save className="h-4.5 w-4.5" />
              <span>Save All Configurations</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
