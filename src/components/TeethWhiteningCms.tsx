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

interface TeethWhiteningCmsProps {
  onSaveSuccess?: () => void;
}

export default function TeethWhiteningCms({ onSaveSuccess }: TeethWhiteningCmsProps = {}) {
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

  // Fetch Teeth Whitening service on load
  useEffect(() => {
    async function loadService() {
      setLoading(true);
      try {
        const services = await serviceService.getServices();
        let found = services.find(s => 
          s.slug === 'teeth-whitening' || 
          s.slug === 'laser-teeth-whitening' || 
          s.id === 'whitening-srv' || 
          s.id === 'whitening' || 
          s.title?.toLowerCase().includes('whitening')
        );
        
        if (!found) {
          // Fallback initial state if record is missing
          found = {
            id: 'whitening-srv',
            slug: 'teeth-whitening',
            title: 'Teeth Whitening',
            short_description: 'Teeth whitening means a variety of procedures are used to whiten your natural teeth at Best Dental Care of Gujarat, India – Patel Dental Hospital.\n\nScaling, polishing, bleaching, and ultraviolet therapy are used for teeth whitening.\n\nThis is one of the easiest, safest, and most affordable ways to whiten your teeth.',
            hero_description: 'Teeth whitening means a variety of procedures are used to whiten your natural teeth at Best Dental Care of Gujarat, India – Patel Dental Hospital.\n\nScaling, polishing, bleaching, and ultraviolet therapy are used for teeth whitening.\n\nThis is one of the easiest, safest, and most affordable ways to whiten your teeth.',
            description: 'Teeth whitening means a variety of procedures are used to whiten your natural teeth at Best Dental Care of Gujarat, India – Patel Dental Hospital.\n\nScaling, polishing, bleaching, and ultraviolet therapy are used for teeth whitening.\n\nThis is one of the easiest, safest, and most affordable ways to whiten your teeth.',
            intro_title: 'What is Teeth Whitening?',
            hero_image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600',
            icon: 'Sparkles',
            display_order: 7,
            is_active: true,
            process_steps: [
              {
                id: 'white-step-1',
                phase: '',
                title: '',
                description: 'We offer two types of teeth whitening procedures at Patel Dental Hospital.\n\n• Hospital-Based Teeth Whitening Procedure\n\n• Home-Based Teeth Whitening Procedure',
                display_order: 10
              }
            ],
            features: [],
            procedure_video_title: 'Teeth Whitening Procedure Video',
            procedure_video_url: 'https://www.youtube.com/watch?v=SnOxxv_S2ew',
            patient_testimonials: [],
            hospital_team_photos: [],
            marketing_config: {
              green_highlight_line: 'Save 50% Off',
              process_section_title: 'Teeth Whitening Treatment Planning',
              candidate_section_title: 'Teeth Whitening Methods',
              candidate_items: [
                {
                  id: 'meth-1',
                  title: 'Hospital-Based Teeth Whitening Procedure',
                  description: 'Here we use higher-concentration whitening ingredients, which are applied to the front surfaces of the teeth. Then, ultraviolet light is applied for half an hour, which removes stains from your teeth and gives you instant white teeth.\n\nWe use CE and FDA-approved teeth whitening kits, which are completely safe for your teeth. You get sensitivity-free instant teeth whitening in just half an hour.\n\nIn some cases, such as severe fluorosis stains, you may need multiple sittings to achieve the desired level of whitening.',
                  display_order: 10
                },
                {
                  id: 'meth-2',
                  title: 'Home-Based Teeth Whitening Procedure',
                  description: 'In this method, we provide a customized tray for your teeth. You need to load the tray with a mild teeth whitening ingredient and wear it properly over your teeth for the recommended period of time.\n\nGradually, your teeth will become whiter at home.\n\nThe kit provided by us is completely safe, easy to use, and includes all the necessary solutions, equipment, and proper user guide manuals.',
                  display_order: 20
                }
              ],
              gallery_heading: 'Clinical Case Gallery',
              gallery_description: 'Clinical case study transformations of Teeth Whitening treatments.',
              gallery_items: [],
              before_after_heading: 'Before & After Gallery',
              before_after_description: 'See real teeth whitening treatment transformations.',
              before_after_pairs: [],
              procedure_video_title: 'Teeth Whitening Procedure Video',
              procedure_video_url: 'https://www.youtube.com/watch?v=SnOxxv_S2ew',
              testimonials_section_title: 'Patient Testimonials',
              hospital_team_title: 'Hospital & Team Gallery',
              cost_heading: 'Teeth Whitening Cost & Offer',
              cost_description: 'Save 50% Off - Call or WhatsApp: 9510397046',
              cost_starting_price: '',
              cost_cards: [],
              google_reviews_heading: 'Google Patient Reviews',
              google_reviews: [],
              sec11_heading: 'Patel Dental Hospital',
              phone_number: '9510397046',
              whatsapp_number: '9510397046',
              faqs: []
            }
          };
        } else {
          // Ensure Section 3 and Section 4 are properly configured
          const curMConfig = (found.marketing_config || {}) as any;
          const candidateItems = Array.isArray(curMConfig.candidate_items) ? curMConfig.candidate_items : [];
          
          let updatedCandidateItems = [...candidateItems];
          if (updatedCandidateItems.length === 0 || !updatedCandidateItems[0]?.description?.includes('Here we use higher-concentration whitening ingredients')) {
            updatedCandidateItems = [
              {
                id: 'meth-1',
                title: 'Hospital-Based Teeth Whitening Procedure',
                description: 'Here we use higher-concentration whitening ingredients, which are applied to the front surfaces of the teeth. Then, ultraviolet light is applied for half an hour, which removes stains from your teeth and gives you instant white teeth.\n\nWe use CE and FDA-approved teeth whitening kits, which are completely safe for your teeth. You get sensitivity-free instant teeth whitening in just half an hour.\n\nIn some cases, such as severe fluorosis stains, you may need multiple sittings to achieve the desired level of whitening.',
                display_order: 10
              },
              {
                id: 'meth-2',
                title: 'Home-Based Teeth Whitening Procedure',
                description: 'In this method, we provide a customized tray for your teeth. You need to load the tray with a mild teeth whitening ingredient and wear it properly over your teeth for the recommended period of time.\n\nGradually, your teeth will become whiter at home.\n\nThe kit provided by us is completely safe, easy to use, and includes all the necessary solutions, equipment, and proper user guide manuals.',
                display_order: 20
              }
            ];
          }

          let updatedProcessSteps = [
            {
              id: 'white-step-1',
              phase: '',
              title: '',
              description: 'We offer two types of teeth whitening procedures at Patel Dental Hospital.\n\n• Hospital-Based Teeth Whitening Procedure\n\n• Home-Based Teeth Whitening Procedure',
              display_order: 10
            }
          ];

          found = {
            ...found,
            process_steps: updatedProcessSteps,
            marketing_config: {
              ...curMConfig,
              process_section_title: 'Teeth Whitening Treatment Planning',
              candidate_section_title: 'Teeth Whitening Methods',
              candidate_items: updatedCandidateItems
            }
          };
        }

        setService(found);
      } catch (err: any) {
        console.error('Error loading Teeth Whitening service:', err);
        setErrorMsg('Failed to load Teeth Whitening data.');
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
        <p className="mt-3 text-xs text-slate-500 font-medium">Loading Teeth Whitening CMS...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="p-8 text-center bg-rose-50 text-rose-800 rounded-2xl border border-rose-200">
        <p className="font-bold text-sm">Failed to load Teeth Whitening configuration.</p>
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
        title: service.title?.trim() || 'Teeth Whitening',
        slug: service.slug || 'teeth-whitening',
        process_steps: Array.isArray(service.process_steps) ? service.process_steps : [],
        features: Array.isArray(service.features) ? service.features : [],
        patient_testimonials: Array.isArray(service.patient_testimonials) ? service.patient_testimonials : [],
        hospital_team_photos: Array.isArray(service.hospital_team_photos) ? service.hospital_team_photos : [],
        marketing_config: {
          ...mConfig,
          candidate_section_title: 'Teeth Whitening Methods'
        }
      };

      const result = await serviceService.saveService(payload);
      if (result.success) {
        setSuccessMsg('Teeth Whitening CMS configurations saved successfully!');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onSaveSuccess?.();
      } else {
        setErrorMsg(result.error || 'Failed to save Teeth Whitening configuration changes.');
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

  // Section 4: Teeth Whitening Methods (Candidate Items)
  const candidateItems = Array.isArray(mConfig.candidate_items) ? mConfig.candidate_items : [];
  const addCandidateItem = () => {
    const nextOrder = candidateItems.length > 0 ? Math.max(...candidateItems.map((c: any) => Number(c.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `meth-${Date.now()}`,
      title: '',
      description: 'Enter method description...',
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
      treatment_name: 'Teeth Whitening',
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

  // Section 10: Features/Cost Items
  const features = Array.isArray(service.features) ? service.features : [];
  const addFeature = () => {
    const nextOrder = features.length > 0 ? Math.max(...features.map((f: any) => Number(f.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `feat-${Date.now()}`,
      title: '',
      description: 'Feature description or cost highlight detail...',
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

  // Section 13: FAQ
  const faqs = Array.isArray(mConfig.faqs) ? mConfig.faqs : [];
  const addFaq = () => {
    const nextOrder = faqs.length > 0 ? Math.max(...faqs.map((f: any) => Number(f.display_order) || 0)) + 10 : 10;
    const newFaq = {
      id: `faq-${Date.now()}`,
      question: 'Frequently Asked Question Title',
      answer: 'Detailed response explaining teeth whitening treatment details.',
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
      {/* Top Banner & Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-3xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200">
              Universal CMS
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-500 text-xs font-mono">teeth-whitening</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-display text-slate-900 mt-1 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[#0D9488]" />
            Teeth Whitening CMS
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-1">
            Manage all 13 sections for Teeth Whitening with live preview and instant persistence.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          disabled={saving}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0D9488] hover:bg-[#0B7A70] text-white rounded-xl text-xs font-extrabold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50 shrink-0"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save All Configurations</span>
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
                    value={service.title || 'Teeth Whitening'}
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
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Green Highlight Banner Text</label>
                  <input
                    type="text"
                    value={mConfig.green_highlight_line || ''}
                    onChange={(e) => updateMConfigField('green_highlight_line', e.target.value)}
                    placeholder="Enter green highlight banner sentence..."
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. WHAT IS TEETH WHITENING? */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('whatIs')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Info className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">2. What is Teeth Whitening?</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure intro section heading and overview content</span>
              </div>
            </div>
            {expandedSections.whatIs ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.whatIs && (
            <div className="p-6 border-t border-slate-100 space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Intro Heading Title</label>
                <input
                  type="text"
                  value={service.intro_title || 'What is Teeth Whitening?'}
                  onChange={(e) => updateServiceField('intro_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Main Description Content</label>
                <textarea
                  rows={5}
                  value={service.description || ''}
                  onChange={(e) => updateServiceField('description', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>
            </div>
          )}
        </div>

        {/* 3. TEETH WHITENING TREATMENT PLANNING */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('treatmentPlanning')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Sliders className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">3. Teeth Whitening Treatment Planning</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure step-by-step treatment procedure flow</span>
              </div>
            </div>
            {expandedSections.treatmentPlanning ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.treatmentPlanning && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Section Title</label>
                <input
                  type="text"
                  value={mConfig.process_section_title || 'Teeth Whitening Treatment Planning'}
                  onChange={(e) => updateMConfigField('process_section_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Treatment Procedure Steps ({steps.length})</span>
                  <button
                    type="button"
                    onClick={addStep}
                    className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg border border-teal-200 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Step</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {steps.map((st: any, idx: number) => (
                    <div key={st.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <input
                            type="text"
                            value={st.phase || ''}
                            onChange={(e) => updateStepField(idx, 'phase', e.target.value)}
                            placeholder="Phase Badge (e.g. Step 1)"
                            className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 font-bold"
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveStep(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveStep(idx, 'down')}
                            disabled={idx === steps.length - 1}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteStep(idx)}
                            className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={st.title || ''}
                        onChange={(e) => updateStepField(idx, 'title', e.target.value)}
                        placeholder="Step Title..."
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 font-bold focus:outline-none focus:border-[#0D9488]"
                      />

                      <textarea
                        rows={2}
                        value={st.description || ''}
                        onChange={(e) => updateStepField(idx, 'description', e.target.value)}
                        placeholder="Step Description..."
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 font-medium focus:outline-none focus:border-[#0D9488]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. TEETH WHITENING METHODS */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('methods')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Layers className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">4. Teeth Whitening Methods</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure Hospital-Based and Home-Based whitening cards</span>
              </div>
            </div>
            {expandedSections.methods ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.methods && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Section Title</label>
                <input
                  type="text"
                  value={mConfig.candidate_section_title || 'Teeth Whitening Methods'}
                  onChange={(e) => updateMConfigField('candidate_section_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Teeth Whitening Method Cards ({candidateItems.length})</span>
                  <button
                    type="button"
                    onClick={addCandidateItem}
                    className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg border border-teal-200 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Method Card</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {candidateItems.map((c: any, idx: number) => (
                    <div key={c.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[#081C3A]">Card #{idx + 1}</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveCandidateItem(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveCandidateItem(idx, 'down')}
                            disabled={idx === candidateItems.length - 1}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteCandidateItem(idx)}
                            className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={c.title || ''}
                        onChange={(e) => updateCandidateItemField(idx, 'title', e.target.value)}
                        placeholder="Method Title (e.g. Hospital-Based Teeth Whitening)..."
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 font-bold focus:outline-none focus:border-[#0D9488]"
                      />

                      <textarea
                        rows={2}
                        value={c.description || ''}
                        onChange={(e) => updateCandidateItemField(idx, 'description', e.target.value)}
                        placeholder="Method Description..."
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 font-medium focus:outline-none focus:border-[#0D9488]"
                      />
                    </div>
                  ))}
                </div>
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
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><ImageIcon className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">5. Before & After Gallery</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure side-by-side comparison image sliders</span>
              </div>
            </div>
            {expandedSections.beforeAfter ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.beforeAfter && (
            <div className="p-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Before & After Pairs ({beforeAfterPairs.length})</span>
                <button
                  type="button"
                  onClick={addBeforeAfterPair}
                  className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg border border-teal-200 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Pair</span>
                </button>
              </div>

              <div className="space-y-4">
                {beforeAfterPairs.map((p: any, idx: number) => (
                  <div key={p.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#081C3A]">Pair #{idx + 1}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveBeforeAfterPair(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveBeforeAfterPair(idx, 'down')}
                          disabled={idx === beforeAfterPairs.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteBeforeAfterPair(idx)}
                          className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 uppercase">Before Image URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={p.before_image || ''}
                            onChange={(e) => updateBeforeAfterPairField(idx, 'before_image', e.target.value)}
                            className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                          />
                          <label className="px-2.5 py-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1">
                            <Upload className="h-3 w-3" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const url = await handleFileUpload(e.target.files[0]);
                                  if (url) updateBeforeAfterPairField(idx, 'before_image', url);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 uppercase">After Image URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={p.after_image || ''}
                            onChange={(e) => updateBeforeAfterPairField(idx, 'after_image', e.target.value)}
                            className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                          />
                          <label className="px-2.5 py-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1">
                            <Upload className="h-3 w-3" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const url = await handleFileUpload(e.target.files[0]);
                                  if (url) updateBeforeAfterPairField(idx, 'after_image', url);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <input
                      type="text"
                      value={p.caption || ''}
                      onChange={(e) => updateBeforeAfterPairField(idx, 'caption', e.target.value)}
                      placeholder="Comparison Caption (e.g. 8 Shades Brighter in 45 Mins)..."
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 font-medium"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 6. CLINICAL CASE GALLERY */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('clinicalGallery')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Stethoscope className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">6. Clinical Case Gallery</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure showcase photo grid of completed clinical cases</span>
              </div>
            </div>
            {expandedSections.clinicalGallery ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.clinicalGallery && (
            <div className="p-6 border-t border-slate-100 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Gallery Title</label>
                  <input
                    type="text"
                    value={mConfig.gallery_heading || 'Clinical Case Gallery'}
                    onChange={(e) => updateMConfigField('gallery_heading', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Gallery Description</label>
                  <input
                    type="text"
                    value={mConfig.gallery_description || ''}
                    onChange={(e) => updateMConfigField('gallery_description', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Gallery Photos ({galleryItems.length})</span>
                  <button
                    type="button"
                    onClick={addGalleryItem}
                    className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg border border-teal-200 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Photo</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {galleryItems.map((g: any, idx: number) => (
                    <div key={g.id || idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500">Photo #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => deleteGalleryItem(idx)}
                          className="text-rose-500 hover:text-rose-700 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={g.image_url || ''}
                          onChange={(e) => updateGalleryItemField(idx, 'image_url', e.target.value)}
                          placeholder="Image URL..."
                          className="flex-1 px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                        />
                        <label className="px-2 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1">
                          <Upload className="h-3 w-3" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const url = await handleFileUpload(e.target.files[0]);
                                if (url) updateGalleryItemField(idx, 'image_url', url);
                              }
                            }}
                          />
                        </label>
                      </div>

                      <input
                        type="text"
                        value={g.caption || ''}
                        onChange={(e) => updateGalleryItemField(idx, 'caption', e.target.value)}
                        placeholder="Caption..."
                        className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                      />
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
            onClick={() => toggleSection('procedureVideo')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Video className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">7. Procedure Video</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure procedure walkthrough video link and thumbnail</span>
              </div>
            </div>
            {expandedSections.procedureVideo ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.procedureVideo && (
            <div className="p-6 border-t border-slate-100 space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Video Section Title</label>
                <input
                  type="text"
                  value={service.procedure_video_title || 'Teeth Whitening Procedure Video'}
                  onChange={(e) => updateServiceField('procedure_video_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Video URL (YouTube/MP4)</label>
                <input
                  type="text"
                  value={service.procedure_video_url || ''}
                  onChange={(e) => updateServiceField('procedure_video_url', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Video Description</label>
                <textarea
                  rows={2}
                  value={service.procedure_video_description || ''}
                  onChange={(e) => updateServiceField('procedure_video_description', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Video Custom Thumbnail Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={service.procedure_video_thumbnail || ''}
                    onChange={(e) => updateServiceField('procedure_video_thumbnail', e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                  />
                  <label className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const url = await handleFileUpload(e.target.files[0]);
                          if (url) updateServiceField('procedure_video_thumbnail', url);
                        }
                      }}
                    />
                  </label>
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
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure patient experience stories and video reviews</span>
              </div>
            </div>
            {expandedSections.testimonials ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.testimonials && (
            <div className="p-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Testimonials ({testimonials.length})</span>
                <button
                  type="button"
                  onClick={addTestimonialItem}
                  className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg border border-teal-200 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Testimonial</span>
                </button>
              </div>

              <div className="space-y-3">
                {testimonials.map((t: any, idx: number) => (
                  <div key={t.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#081C3A]">Testimonial #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => deleteTestimonialItem(idx)}
                        className="text-rose-500 hover:text-rose-700 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={t.patient_name || ''}
                        onChange={(e) => updateTestimonialItemField(idx, 'patient_name', e.target.value)}
                        placeholder="Patient Name..."
                        className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                      />
                      <input
                        type="text"
                        value={t.video_url || ''}
                        onChange={(e) => updateTestimonialItemField(idx, 'video_url', e.target.value)}
                        placeholder="Video URL (optional)..."
                        className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-mono"
                      />
                    </div>

                    <textarea
                      rows={2}
                      value={t.review_text || ''}
                      onChange={(e) => updateTestimonialItemField(idx, 'review_text', e.target.value)}
                      placeholder="Review text..."
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                    />
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
            onClick={() => toggleSection('hospitalTeam')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Users className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">9. Hospital & Team Gallery</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure facility, infrastructure, and specialist doctor photos</span>
              </div>
            </div>
            {expandedSections.hospitalTeam ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.hospitalTeam && (
            <div className="p-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Hospital & Team Photos ({hostPhotos.length})</span>
                <button
                  type="button"
                  onClick={addHostPhotoItem}
                  className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg border border-teal-200 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Photo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hostPhotos.map((h: any, idx: number) => (
                  <div key={h.id || idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500">Photo #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => deleteHostPhotoItem(idx)}
                        className="text-rose-500 hover:text-rose-700 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={h.image_url || ''}
                        onChange={(e) => updateHostPhotoItemField(idx, 'image_url', e.target.value)}
                        placeholder="Image URL..."
                        className="flex-1 px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                      />
                      <label className="px-2 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1">
                        <Upload className="h-3 w-3" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                              const url = await handleFileUpload(e.target.files[0]);
                              if (url) updateHostPhotoItemField(idx, 'image_url', url);
                            }
                          }}
                        />
                      </label>
                    </div>

                    <input
                      type="text"
                      value={h.caption || ''}
                      onChange={(e) => updateHostPhotoItemField(idx, 'caption', e.target.value)}
                      placeholder="Photo Caption..."
                      className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 10. COST / OFFER */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('costOffer')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><DollarSign className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">10. Cost / Offer</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure transparency pricing, discounts, and consultation offers</span>
              </div>
            </div>
            {expandedSections.costOffer ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.costOffer && (
            <div className="p-6 border-t border-slate-100 space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Cost Section Heading</label>
                <input
                  type="text"
                  value={mConfig.cost_heading || 'Teeth Whitening Cost & Special Offers'}
                  onChange={(e) => updateMConfigField('cost_heading', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Cost Description</label>
                <textarea
                  rows={2}
                  value={mConfig.cost_description || ''}
                  onChange={(e) => updateMConfigField('cost_description', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Cost Features ({features.length})</span>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg border border-teal-200 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Cost Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {features.map((f: any, idx: number) => (
                    <div key={f.id || idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={f.title || ''}
                          onChange={(e) => updateFeatureField(idx, 'title', e.target.value)}
                          placeholder="Feature Title..."
                          className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white font-bold flex-1 mr-2"
                        />
                        <button
                          type="button"
                          onClick={() => deleteFeature(idx)}
                          className="text-rose-500 hover:text-rose-700 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={f.description || ''}
                        onChange={(e) => updateFeatureField(idx, 'description', e.target.value)}
                        placeholder="Feature Description..."
                        className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 11. GOOGLE PATIENT REVIEWS */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('googleReviews')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Star className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">11. Google Patient Reviews</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure authentic Google patient star ratings and feedback</span>
              </div>
            </div>
            {expandedSections.googleReviews ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.googleReviews && (
            <div className="p-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Google Reviews ({googleReviews.length})</span>
                <button
                  type="button"
                  onClick={addGoogleReview}
                  className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg border border-teal-200 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="space-y-3">
                {googleReviews.map((r: any, idx: number) => (
                  <div key={r.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#081C3A]">Review #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => deleteGoogleReview(idx)}
                        className="text-rose-500 hover:text-rose-700 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={r.patient_name || ''}
                        onChange={(e) => updateGoogleReviewField(idx, 'patient_name', e.target.value)}
                        placeholder="Patient Name..."
                        className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-bold"
                      />
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={r.rating || 5}
                        onChange={(e) => updateGoogleReviewField(idx, 'rating', Number(e.target.value))}
                        placeholder="Rating (1-5)..."
                        className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                      />
                    </div>

                    <textarea
                      rows={2}
                      value={r.review_text || ''}
                      onChange={(e) => updateGoogleReviewField(idx, 'review_text', e.target.value)}
                      placeholder="Google Review text..."
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                    />
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
            onClick={() => toggleSection('bottomCta')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Phone className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">12. Bottom CTA</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure footer conversion banner buttons and contact channels</span>
              </div>
            </div>
            {expandedSections.bottomCta ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.bottomCta && (
            <div className="p-6 border-t border-slate-100 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                  <input
                    type="text"
                    value={mConfig.phone_number || ''}
                    onChange={(e) => updateMConfigField('phone_number', e.target.value)}
                    placeholder="+91 98252..."
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">WhatsApp Number</label>
                  <input
                    type="text"
                    value={mConfig.whatsapp_number || ''}
                    onChange={(e) => updateMConfigField('whatsapp_number', e.target.value)}
                    placeholder="+91 98252..."
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">CTA Banner Heading</label>
                <input
                  type="text"
                  value={mConfig.cta_heading || ''}
                  onChange={(e) => updateMConfigField('cta_heading', e.target.value)}
                  placeholder="Ready to Brighten Your Smile Today?"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">CTA Banner Subtitle</label>
                <input
                  type="text"
                  value={mConfig.cta_description || ''}
                  onChange={(e) => updateMConfigField('cta_description', e.target.value)}
                  placeholder="Book your expert teeth whitening consultation at Patel Dental Hospital."
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* 13. FAQ */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('faq')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><HelpCircle className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">13. FAQ Section</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure patient questions and detailed answers accordion</span>
              </div>
            </div>
            {expandedSections.faq ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.faq && (
            <div className="p-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Frequently Asked Questions ({faqs.length})</span>
                <button
                  type="button"
                  onClick={addFaq}
                  className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg border border-teal-200 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="space-y-3">
                {faqs.map((f: any, idx: number) => (
                  <div key={f.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#081C3A]">FAQ #{idx + 1}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveFaq(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveFaq(idx, 'down')}
                          disabled={idx === faqs.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteFaq(idx)}
                          className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <input
                      type="text"
                      value={f.question || ''}
                      onChange={(e) => updateFaqField(idx, 'question', e.target.value)}
                      placeholder="Question..."
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 font-bold focus:outline-none focus:border-[#0D9488]"
                    />

                    <textarea
                      rows={3}
                      value={f.answer || ''}
                      onChange={(e) => updateFaqField(idx, 'answer', e.target.value)}
                      placeholder="Detailed Answer..."
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 font-medium focus:outline-none focus:border-[#0D9488]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
