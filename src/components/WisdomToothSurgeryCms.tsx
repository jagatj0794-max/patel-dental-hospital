import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, ChevronDown, ChevronUp, Save, Check, 
  Image as ImageIcon, Video, Sliders, Shield, Heart,
  Sparkles, MessageSquare, ArrowUp, ArrowDown, Info, Upload, Star, HelpCircle, Stethoscope, Users, Layers, DollarSign, Phone
} from 'lucide-react';
import { Service } from '../types';
import { serviceService } from '../utils/serviceData';
import { uploadImage } from '../utils/supabaseStorage';
import { isSupabaseConfigured } from '../utils/supabase';

interface WisdomToothSurgeryCmsProps {
  onSaveSuccess?: () => void;
}

export default function WisdomToothSurgeryCms({ onSaveSuccess }: WisdomToothSurgeryCmsProps = {}) {
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

  // Default 3 Treatment Planning stages for Wisdom Tooth Surgery
  const DEFAULT_WISDOM_PROCESS_STEPS = [
    {
      id: 'wisdom-step-1',
      phase: 'Stage 1',
      title: 'Diagnosis',
      description: '',
      display_order: 10
    },
    {
      id: 'wisdom-step-2',
      phase: 'Stage 2',
      title: 'Numbing',
      description: '',
      display_order: 20
    },
    {
      id: 'wisdom-step-3',
      phase: 'Stage 3',
      title: 'Tooth Removal',
      description: '',
      display_order: 30
    }
  ];

  // Default 1 Advanced Surgical Technology card
  const DEFAULT_WISDOM_CANDIDATE_ITEMS = [
    {
      id: 'wisdom-tech-1',
      title: 'Piezoelectric Device',
      description: '',
      display_order: 10
    }
  ];

  // Fetch Wisdom Tooth Surgery service on load
  useEffect(() => {
    async function loadService() {
      setLoading(true);
      try {
        const services = await serviceService.getServices();
        let found = services.find(s => 
          s.slug === 'wisdom-tooth-surgery' || 
          s.slug === 'wisdom-teeth-surgery' || 
          s.slug === 'wisdom' || 
          s.id === 'wisdom-srv' || 
          s.id === 'wisdom' || 
          s.title?.toLowerCase().includes('wisdom')
        );
        
        if (!found) {
          // Fallback initial state if record is missing
          found = {
            id: 'wisdom-srv',
            slug: 'wisdom-tooth-surgery',
            title: 'Wisdom Tooth Surgery',
            short_description: '',
            hero_description: '',
            description: '',
            intro_title: 'What is Wisdom Tooth Surgery?',
            hero_image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200',
            icon: 'Activity',
            display_order: 10,
            is_active: true,
            process_steps: DEFAULT_WISDOM_PROCESS_STEPS,
            features: [],
            procedure_video_title: 'Wisdom Tooth Surgery Procedure Video',
            procedure_video_url: '',
            patient_testimonials: [],
            hospital_team_photos: [],
            marketing_config: {
              green_highlight_line: '',
              process_section_title: 'Wisdom Tooth Surgery Treatment Planning',
              candidate_section_title: 'Advanced Surgical Technology',
              candidate_items: DEFAULT_WISDOM_CANDIDATE_ITEMS,
              gallery_heading: 'Clinical Case Gallery',
              gallery_description: '',
              gallery_items: [],
              before_after_heading: 'Before & After Gallery',
              before_after_description: '',
              before_after_pairs: [],
              procedure_video_title: 'Wisdom Tooth Surgery Procedure Video',
              procedure_video_url: '',
              testimonials_section_title: 'Patient Testimonials',
              hospital_team_title: 'Hospital & Team Gallery',
              cost_heading: 'Wisdom Tooth Surgery Cost & Offers',
              cost_description: '',
              cost_starting_price: '',
              cost_cards: [],
              google_reviews_heading: 'Google Patient Reviews',
              google_reviews: [],
              sec11_heading: 'Patel Dental Hospital',
              phone_number: '9510397046',
              whatsapp_number: '9510397046',
              faqs: [],
              show_hero: true
            }
          };
        } else {
          const curMConfig = (found.marketing_config || {}) as any;
          const candidateItems = Array.isArray(curMConfig.candidate_items) ? curMConfig.candidate_items : [];
          
          let updatedCandidateItems = [...candidateItems];
          if (updatedCandidateItems.length === 0) {
            updatedCandidateItems = DEFAULT_WISDOM_CANDIDATE_ITEMS;
          }

          let updatedProcessSteps = Array.isArray(found.process_steps) && found.process_steps.length > 0 
            ? found.process_steps 
            : DEFAULT_WISDOM_PROCESS_STEPS;

          found = {
            ...found,
            process_steps: updatedProcessSteps,
            marketing_config: {
              ...curMConfig,
              process_section_title: curMConfig.process_section_title || 'Wisdom Tooth Surgery Treatment Planning',
              candidate_section_title: curMConfig.candidate_section_title || 'Advanced Surgical Technology',
              candidate_items: updatedCandidateItems
            }
          };
        }

        setService(found);
      } catch (err: any) {
        console.error('Error loading Wisdom Tooth Surgery service:', err);
        setErrorMsg('Failed to load Wisdom Tooth Surgery data.');
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
        <p className="mt-3 text-xs text-slate-500 font-medium">Loading Wisdom Tooth Surgery CMS...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="p-8 text-center bg-rose-50 text-rose-800 rounded-2xl border border-rose-200">
        <p className="font-bold text-sm">Failed to load Wisdom Tooth Surgery configuration.</p>
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
        title: service.title?.trim() || 'Wisdom Tooth Surgery',
        slug: service.slug || 'wisdom-tooth-surgery',
        process_steps: Array.isArray(service.process_steps) ? service.process_steps : [],
        features: Array.isArray(service.features) ? service.features : [],
        patient_testimonials: Array.isArray(service.patient_testimonials) ? service.patient_testimonials : [],
        hospital_team_photos: Array.isArray(service.hospital_team_photos) ? service.hospital_team_photos : [],
        marketing_config: {
          ...mConfig,
          process_section_title: mConfig.process_section_title || 'Wisdom Tooth Surgery Treatment Planning',
          candidate_section_title: mConfig.candidate_section_title || 'Advanced Surgical Technology'
        }
      };

      const result = await serviceService.saveService(payload);
      if (result.success) {
        setSuccessMsg('Wisdom Tooth Surgery CMS configurations saved successfully!');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onSaveSuccess?.();
      } else {
        setErrorMsg(result.error || 'Failed to save Wisdom Tooth Surgery configuration changes.');
      }
    } catch (err: any) {
      console.error('Error saving Wisdom Tooth Surgery CMS:', err);
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
      phase: `Stage ${steps.length + 1}`,
      title: '',
      description: '',
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

  // Section 4: Advanced Surgical Technology Items (Candidate Items)
  const candidateItems = Array.isArray(mConfig.candidate_items) ? mConfig.candidate_items : [];
  const addCandidateItem = () => {
    const nextOrder = candidateItems.length > 0 ? Math.max(...candidateItems.map((c: any) => Number(c.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `tech-${Date.now()}`,
      title: '',
      description: '',
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
      before_image: '',
      after_image: '',
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
      caption: '',
      image_url: '',
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
      treatment_name: 'Wisdom Tooth Surgery',
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
      image_url: '',
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
    const newRev = {
      id: `rev-${Date.now()}`,
      author: '',
      rating: 5,
      reviewText: '',
      dateText: 'Recently'
    };
    updateMConfigField('google_reviews', [...googleReviews, newRev]);
  };
  const deleteGoogleReview = (index: number) => {
    updateMConfigField('google_reviews', googleReviews.filter((_, i) => i !== index));
  };
  const updateGoogleReviewField = (index: number, key: string, val: any) => {
    const updated = [...googleReviews];
    updated[index] = { ...updated[index], [key]: val };
    updateMConfigField('google_reviews', updated);
  };

  // Section 13: FAQs
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
    <div className="space-y-6 font-sans text-slate-800">
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-teal-50 text-[#0D9488] text-[10px] font-extrabold uppercase tracking-wider rounded-lg border border-teal-100">
              Universal Service CMS
            </span>
            <span className="text-xs text-slate-400 font-mono">wisdom-tooth-surgery</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#081C3A] mt-1">Wisdom Tooth Surgery CMS Manager</h2>
          <p className="text-xs text-slate-500 font-medium">Manage all 13 content sections for Wisdom Tooth Surgery service page.</p>
        </div>

        <button
          type="button"
          onClick={() => handleSaveAll()}
          disabled={saving}
          className="px-6 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2 disabled:opacity-50 cursor-pointer"
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
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-600 hover:text-emerald-900 text-xs font-bold">Dismiss</button>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-xl flex items-center justify-between animate-fade-in">
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="text-rose-600 hover:text-rose-900 text-xs font-bold">Dismiss</button>
        </div>
      )}

      {/* 13 CMS SECTIONS */}

      {/* SECTION 1: HERO */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs">
        <button
          type="button"
          onClick={() => toggleSection('hero')}
          className="w-full px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-50 text-[#0D9488] rounded-xl">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#081C3A]">Section 1: Hero Banner</h3>
              <p className="text-[11px] text-slate-400 font-medium">Title, Description and Hero Background Image</p>
            </div>
          </div>
          {expandedSections.hero ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>

        {expandedSections.hero && (
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Hero Title *</label>
              <input
                type="text"
                value={service.title || ''}
                onChange={(e) => updateServiceField('title', e.target.value)}
                placeholder="Wisdom Tooth Surgery"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white text-slate-800 font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Hero Description *</label>
              <textarea
                rows={3}
                value={service.hero_description || service.short_description || ''}
                onChange={(e) => {
                  updateServiceField('hero_description', e.target.value);
                  updateServiceField('short_description', e.target.value);
                }}
                placeholder="Enter hero description..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white text-slate-800 leading-relaxed font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Hero Background Image URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={service.hero_image || ''}
                  onChange={(e) => updateServiceField('hero_image', e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white font-mono text-slate-700"
                />
                <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition flex items-center gap-1">
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
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: WHAT IS WISDOM TOOTH SURGERY */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs">
        <button
          type="button"
          onClick={() => toggleSection('whatis')}
          className="w-full px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#081C3A]">Section 2: What is Wisdom Tooth Surgery?</h3>
              <p className="text-[11px] text-slate-400 font-medium">Introductory Title & Full Description Paragraphs</p>
            </div>
          </div>
          {expandedSections.whatis ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>

        {expandedSections.whatis && (
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Section Title</label>
              <input
                type="text"
                value={service.intro_title || 'What is Wisdom Tooth Surgery?'}
                onChange={(e) => updateServiceField('intro_title', e.target.value)}
                placeholder="What is Wisdom Tooth Surgery?"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white text-slate-800 font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Full Detailed Description</label>
              <textarea
                rows={6}
                value={service.description || ''}
                onChange={(e) => updateServiceField('description', e.target.value)}
                placeholder="Enter full description..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white text-slate-800 leading-relaxed font-medium"
              />
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: TREATMENT PLANNING (STAGES) */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs">
        <button
          type="button"
          onClick={() => toggleSection('planning')}
          className="w-full px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#081C3A]">Section 3: Wisdom Tooth Surgery Treatment Planning</h3>
              <p className="text-[11px] text-slate-400 font-medium">3 Treatment Stages (Diagnosis, Numbing, Tooth Removal)</p>
            </div>
          </div>
          {expandedSections.planning ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>

        {expandedSections.planning && (
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Process Section Title</label>
              <input
                type="text"
                value={mConfig.process_section_title || 'Wisdom Tooth Surgery Treatment Planning'}
                onChange={(e) => updateMConfigField('process_section_title', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white text-slate-800 font-semibold"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Treatment Stages ({steps.length})</span>
                <button
                  type="button"
                  onClick={addStep}
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Stage</span>
                </button>
              </div>

              {steps.map((st: any, idx: number) => (
                <div key={st.id || idx} className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] font-extrabold rounded">
                        #{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={st.phase || ''}
                        onChange={(e) => updateStepField(idx, 'phase', e.target.value)}
                        placeholder="Stage 1"
                        className="w-28 px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white font-bold"
                      />
                      <input
                        type="text"
                        value={st.title || ''}
                        onChange={(e) => updateStepField(idx, 'title', e.target.value)}
                        placeholder="Stage Title (e.g. Diagnosis)"
                        className="flex-1 px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white font-semibold"
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveStep(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveStep(idx, 'down')}
                        disabled={idx === steps.length - 1}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteStep(idx)}
                        className="p-1 text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      value={st.description || ''}
                      onChange={(e) => updateStepField(idx, 'description', e.target.value)}
                      placeholder="Stage description..."
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 leading-relaxed font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: ADVANCED SURGICAL TECHNOLOGY */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs">
        <button
          type="button"
          onClick={() => toggleSection('tech')}
          className="w-full px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Sliders className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#081C3A]">Section 4: Advanced Surgical Technology</h3>
              <p className="text-[11px] text-slate-400 font-medium">1 Card (Piezoelectric Device)</p>
            </div>
          </div>
          {expandedSections.tech ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>

        {expandedSections.tech && (
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Section Title</label>
              <input
                type="text"
                value={mConfig.candidate_section_title || 'Advanced Surgical Technology'}
                onChange={(e) => updateMConfigField('candidate_section_title', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white text-slate-800 font-semibold"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Technology Cards ({candidateItems.length})</span>
                <button
                  type="button"
                  onClick={addCandidateItem}
                  className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold rounded-xl transition flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Card</span>
                </button>
              </div>

              {candidateItems.map((item: any, idx: number) => (
                <div key={item.id || idx} className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-extrabold rounded">
                        #{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => updateCandidateItemField(idx, 'title', e.target.value)}
                        placeholder="Piezoelectric Device"
                        className="flex-1 px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white font-bold text-slate-800"
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveCandidateItem(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveCandidateItem(idx, 'down')}
                        disabled={idx === candidateItems.length - 1}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCandidateItem(idx)}
                        className="p-1 text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      value={item.description || ''}
                      onChange={(e) => updateCandidateItemField(idx, 'description', e.target.value)}
                      placeholder="Card description..."
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 leading-relaxed font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 5: BEFORE & AFTER GALLERY */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs">
        <button
          type="button"
          onClick={() => toggleSection('beforeAfter')}
          className="w-full px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <ImageIcon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#081C3A]">Section 5: Before & After Gallery</h3>
              <p className="text-[11px] text-slate-400 font-medium">Before/After Image Pairs & Captions</p>
            </div>
          </div>
          {expandedSections.beforeAfter ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>

        {expandedSections.beforeAfter && (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Section Heading</label>
                <input
                  type="text"
                  value={mConfig.before_after_heading || 'Before & After Gallery'}
                  onChange={(e) => updateMConfigField('before_after_heading', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white text-slate-800 font-semibold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Section Subtitle</label>
                <input
                  type="text"
                  value={mConfig.before_after_description || ''}
                  onChange={(e) => updateMConfigField('before_after_description', e.target.value)}
                  placeholder="Before and after transformation cases"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white text-slate-800 font-medium"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Before / After Pairs ({beforeAfterPairs.length})</span>
                <button
                  type="button"
                  onClick={addBeforeAfterPair}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl transition flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Pair</span>
                </button>
              </div>

              {beforeAfterPairs.map((pair: any, idx: number) => (
                <div key={pair.id || idx} className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800">Pair #{idx + 1}</span>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => moveBeforeAfterPair(idx, 'up')} disabled={idx === 0} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button>
                      <button type="button" onClick={() => moveBeforeAfterPair(idx, 'down')} disabled={idx === beforeAfterPairs.length - 1} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button>
                      <button type="button" onClick={() => deleteBeforeAfterPair(idx)} className="p-1 text-rose-500 hover:text-rose-700"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Before Image URL</label>
                      <input
                        type="text"
                        value={pair.before_image || ''}
                        onChange={(e) => updateBeforeAfterPairField(idx, 'before_image', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">After Image URL</label>
                      <input
                        type="text"
                        value={pair.after_image || ''}
                        onChange={(e) => updateBeforeAfterPairField(idx, 'after_image', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Caption</label>
                    <input
                      type="text"
                      value={pair.caption || ''}
                      onChange={(e) => updateBeforeAfterPairField(idx, 'caption', e.target.value)}
                      placeholder="e.g. Impacted Wisdom Tooth Extraction Transformation"
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 6: CLINICAL CASE GALLERY */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs">
        <button
          type="button"
          onClick={() => toggleSection('gallery')}
          className="w-full px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <ImageIcon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#081C3A]">Section 6: Clinical Case Gallery</h3>
              <p className="text-[11px] text-slate-400 font-medium">Surgical Case Photographs</p>
            </div>
          </div>
          {expandedSections.gallery ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>

        {expandedSections.gallery && (
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Clinical Case Images ({galleryItems.length})</span>
                <button
                  type="button"
                  onClick={addGalleryItem}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold rounded-xl transition flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Case Image</span>
                </button>
              </div>

              {galleryItems.map((item: any, idx: number) => (
                <div key={item.id || idx} className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800">Case Image #{idx + 1}</span>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => moveGalleryItem(idx, 'up')} disabled={idx === 0} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button>
                      <button type="button" onClick={() => moveGalleryItem(idx, 'down')} disabled={idx === galleryItems.length - 1} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button>
                      <button type="button" onClick={() => deleteGalleryItem(idx)} className="p-1 text-rose-500 hover:text-rose-700"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Image URL</label>
                      <input
                        type="text"
                        value={item.image_url || ''}
                        onChange={(e) => updateGalleryItemField(idx, 'image_url', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Caption</label>
                      <input
                        type="text"
                        value={item.caption || ''}
                        onChange={(e) => updateGalleryItemField(idx, 'caption', e.target.value)}
                        placeholder="Clinical Case Description"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-medium"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 7: PROCEDURE VIDEO */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs">
        <button
          type="button"
          onClick={() => toggleSection('video')}
          className="w-full px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 text-red-600 rounded-xl">
              <Video className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#081C3A]">Section 7: Procedure Video</h3>
              <p className="text-[11px] text-slate-400 font-medium">YouTube / Video URL and Section Title</p>
            </div>
          </div>
          {expandedSections.video ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>

        {expandedSections.video && (
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Video Title</label>
              <input
                type="text"
                value={service.procedure_video_title || mConfig.procedure_video_title || 'Wisdom Tooth Surgery Procedure Video'}
                onChange={(e) => {
                  updateServiceField('procedure_video_title', e.target.value);
                  updateMConfigField('procedure_video_title', e.target.value);
                }}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white text-slate-800 font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Procedure Video URL (YouTube or Direct URL)</label>
              <input
                type="text"
                value={service.procedure_video_url || mConfig.procedure_video_url || ''}
                onChange={(e) => {
                  updateServiceField('procedure_video_url', e.target.value);
                  updateMConfigField('procedure_video_url', e.target.value);
                }}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white font-mono text-slate-800"
              />
            </div>
          </div>
        )}
      </div>

      {/* SECTION 8: PATIENT TESTIMONIALS */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs">
        <button
          type="button"
          onClick={() => toggleSection('testimonials')}
          className="w-full px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-50 text-pink-600 rounded-xl">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#081C3A]">Section 8: Patient Testimonials</h3>
              <p className="text-[11px] text-slate-400 font-medium">Video Reviews & Patient Experience Stories</p>
            </div>
          </div>
          {expandedSections.testimonials ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>

        {expandedSections.testimonials && (
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Testimonial Videos ({testimonials.length})</span>
                <button
                  type="button"
                  onClick={addTestimonialItem}
                  className="px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold rounded-xl transition flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Testimonial</span>
                </button>
              </div>

              {testimonials.map((t: any, idx: number) => (
                <div key={t.id || idx} className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-pink-800">Testimonial #{idx + 1}</span>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => moveTestimonialItem(idx, 'up')} disabled={idx === 0} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button>
                      <button type="button" onClick={() => moveTestimonialItem(idx, 'down')} disabled={idx === testimonials.length - 1} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button>
                      <button type="button" onClick={() => deleteTestimonialItem(idx)} className="p-1 text-rose-500 hover:text-rose-700"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Patient / Title</label>
                      <input
                        type="text"
                        value={t.patient_name || ''}
                        onChange={(e) => updateTestimonialItemField(idx, 'patient_name', e.target.value)}
                        placeholder="Patient Name / Journey Title"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Video URL</label>
                      <input
                        type="text"
                        value={t.video_url || ''}
                        onChange={(e) => updateTestimonialItemField(idx, 'video_url', e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 9: HOSPITAL & TEAM GALLERY */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs">
        <button
          type="button"
          onClick={() => toggleSection('hospital')}
          className="w-full px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-50 text-cyan-600 rounded-xl">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#081C3A]">Section 9: Hospital & Team Gallery</h3>
              <p className="text-[11px] text-slate-400 font-medium">Clinic Environment & Dental Team Photos</p>
            </div>
          </div>
          {expandedSections.hospital ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>

        {expandedSections.hospital && (
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Clinic & Team Photos ({hostPhotos.length})</span>
                <button
                  type="button"
                  onClick={addHostPhotoItem}
                  className="px-3 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 text-xs font-bold rounded-xl transition flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Photo</span>
                </button>
              </div>

              {hostPhotos.map((h: any, idx: number) => (
                <div key={h.id || idx} className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-800">Photo #{idx + 1}</span>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => moveHostPhotoItem(idx, 'up')} disabled={idx === 0} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button>
                      <button type="button" onClick={() => moveHostPhotoItem(idx, 'down')} disabled={idx === hostPhotos.length - 1} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button>
                      <button type="button" onClick={() => deleteHostPhotoItem(idx)} className="p-1 text-rose-500 hover:text-rose-700"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Image URL</label>
                      <input
                        type="text"
                        value={h.image_url || ''}
                        onChange={(e) => updateHostPhotoItemField(idx, 'image_url', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Caption</label>
                      <input
                        type="text"
                        value={h.caption || ''}
                        onChange={(e) => updateHostPhotoItemField(idx, 'caption', e.target.value)}
                        placeholder="Patel Dental Hospital Clinic Room"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-medium"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 10: COST / OFFER */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs">
        <button
          type="button"
          onClick={() => toggleSection('cost')}
          className="w-full px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0D9488]/10 text-[#0D9488] rounded-xl">
              <DollarSign className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#081C3A]">Section 10: Cost & Call Offer</h3>
              <p className="text-[11px] text-slate-400 font-medium">Pricing, Consultation Info & Contact Phone Number</p>
            </div>
          </div>
          {expandedSections.cost ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>

        {expandedSections.cost && (
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Cost Section Title</label>
              <input
                type="text"
                value={mConfig.cost_heading || 'Wisdom Tooth Surgery Cost & Offers'}
                onChange={(e) => updateMConfigField('cost_heading', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white text-slate-800 font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Cost Subtitle / Offer Text</label>
              <textarea
                rows={2}
                value={mConfig.cost_description || ''}
                onChange={(e) => updateMConfigField('cost_description', e.target.value)}
                placeholder="Call: 9510397046"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white text-slate-800 leading-relaxed font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Phone Number (Call)</label>
                <input
                  type="text"
                  value={mConfig.phone_number || '9510397046'}
                  onChange={(e) => updateMConfigField('phone_number', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white text-slate-800 font-semibold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">WhatsApp Number</label>
                <input
                  type="text"
                  value={mConfig.whatsapp_number || '9510397046'}
                  onChange={(e) => updateMConfigField('whatsapp_number', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white text-slate-800 font-semibold"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 11: GOOGLE PATIENT REVIEWS */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs">
        <button
          type="button"
          onClick={() => toggleSection('reviews')}
          className="w-full px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 text-yellow-600 rounded-xl">
              <Star className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#081C3A]">Section 11: Google Patient Reviews</h3>
              <p className="text-[11px] text-slate-400 font-medium">Google Star Ratings & Written Review Quotes</p>
            </div>
          </div>
          {expandedSections.reviews ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>

        {expandedSections.reviews && (
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Google Patient Reviews ({googleReviews.length})</span>
                <button
                  type="button"
                  onClick={addGoogleReview}
                  className="px-3 py-1.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 text-xs font-bold rounded-xl transition flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Review</span>
                </button>
              </div>

              {googleReviews.map((rev: any, idx: number) => (
                <div key={rev.id || idx} className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-yellow-800">Review #{idx + 1}</span>
                    <button type="button" onClick={() => deleteGoogleReview(idx)} className="p-1 text-rose-500 hover:text-rose-700"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Author Name</label>
                      <input
                        type="text"
                        value={rev.author || ''}
                        onChange={(e) => updateGoogleReviewField(idx, 'author', e.target.value)}
                        placeholder="Patient Name"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Date Text</label>
                      <input
                        type="text"
                        value={rev.dateText || ''}
                        onChange={(e) => updateGoogleReviewField(idx, 'dateText', e.target.value)}
                        placeholder="Recently"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Review Comment</label>
                    <textarea
                      rows={2}
                      value={rev.reviewText || ''}
                      onChange={(e) => updateGoogleReviewField(idx, 'reviewText', e.target.value)}
                      placeholder="Patient review quote..."
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 12: BOTTOM CTA */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs">
        <button
          type="button"
          onClick={() => toggleSection('cta')}
          className="w-full px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 text-slate-700 rounded-xl">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#081C3A]">Section 12: Bottom Call To Action</h3>
              <p className="text-[11px] text-slate-400 font-medium">Patel Dental Hospital Contact & Booking Information</p>
            </div>
          </div>
          {expandedSections.cta ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>

        {expandedSections.cta && (
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Clinic Name / CTA Heading</label>
              <input
                type="text"
                value={mConfig.sec11_heading || 'Patel Dental Hospital'}
                onChange={(e) => updateMConfigField('sec11_heading', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white text-slate-800 font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Call Phone Number</label>
              <input
                type="text"
                value={mConfig.phone_number || '9510397946'}
                onChange={(e) => updateMConfigField('phone_number', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white text-slate-800 font-semibold"
              />
            </div>
          </div>
        )}
      </div>

      {/* SECTION 13: FAQ */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs">
        <button
          type="button"
          onClick={() => toggleSection('faqs')}
          className="w-full px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <HelpCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#081C3A]">Section 13: Frequently Asked Questions</h3>
              <p className="text-[11px] text-slate-400 font-medium">Add or edit FAQs for Wisdom Tooth Surgery</p>
            </div>
          </div>
          {expandedSections.faqs ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>

        {expandedSections.faqs && (
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">FAQs ({faqs.length})</span>
                <button
                  type="button"
                  onClick={addFaq}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl transition flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add FAQ</span>
                </button>
              </div>

              {faqs.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No FAQs added.</p>
              ) : (
                faqs.map((f: any, idx: number) => (
                  <div key={f.id || idx} className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-800">FAQ #{idx + 1}</span>
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => moveFaq(idx, 'up')} disabled={idx === 0} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button>
                        <button type="button" onClick={() => moveFaq(idx, 'down')} disabled={idx === faqs.length - 1} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button>
                        <button type="button" onClick={() => deleteFaq(idx)} className="p-1 text-rose-500 hover:text-rose-700"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Question</label>
                      <input
                        type="text"
                        value={f.question || ''}
                        onChange={(e) => updateFaqField(idx, 'question', e.target.value)}
                        placeholder="e.g. Is wisdom tooth extraction painful?"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-medium text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Answer</label>
                      <textarea
                        rows={2}
                        value={f.answer || ''}
                        onChange={(e) => updateFaqField(idx, 'answer', e.target.value)}
                        placeholder="Answer details..."
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-medium text-slate-700"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Save Button Bottom */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={() => handleSaveAll()}
          disabled={saving}
          className="px-8 py-3 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              <span>Saving Configurations...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save All Wisdom Tooth Surgery Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
