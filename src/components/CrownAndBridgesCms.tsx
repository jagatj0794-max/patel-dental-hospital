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

interface CrownAndBridgesCmsProps {
  onSaveSuccess?: () => void;
}

export default function CrownAndBridgesCms({ onSaveSuccess }: CrownAndBridgesCmsProps = {}) {
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

  // Fetch Crown and Bridges service on load
  useEffect(() => {
    async function loadService() {
      setLoading(true);
      try {
        const services = await serviceService.getServices();
        let found = services.find(s => 
          s.slug === 'crowns-bridges' || 
          s.slug === 'crown-and-bridges' || 
          s.slug === 'crowns-and-bridges' || 
          s.id === 'crowns' || 
          s.id === 'crowns-srv' || 
          s.title?.toLowerCase().includes('crown')
        );
        
        if (!found) {
          // Fallback initial state if record is missing
          found = {
            id: 'crowns',
            slug: 'crowns-bridges',
            title: 'Crowns & Bridges',
            short_description: 'Crown and Bridges restore missing or damaged teeth to rebuild your chewing efficiency, natural aesthetics, and confident smile.',
            hero_description: 'Crown and Bridges restore missing or damaged teeth to rebuild your chewing efficiency, natural aesthetics, and confident smile.',
            description: 'Crown and Bridges are custom-crafted fixed prosthetic restorations designed to strengthen damaged teeth and replace missing teeth with natural-looking aesthetics.',
            intro_title: 'What are Crown and Bridges?',
            hero_image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200',
            icon: 'Layers',
            display_order: 6,
            is_active: true,
            process_steps: [
              {
                id: 'crowns-step-1',
                phase: 'Step 1',
                title: 'Tooth Preparation & Digital Impressions',
                description: 'The damaged tooth is carefully reshaped and digital impressions or scans are taken for precision fitting.',
                display_order: 10
              },
              {
                id: 'crowns-step-2',
                phase: 'Step 2',
                title: 'Custom Crown & Bridge Fabrication',
                description: 'High-grade ceramic or zirconia crowns are custom engineered to match your natural tooth shade and bite alignment.',
                display_order: 20
              },
              {
                id: 'crowns-step-3',
                phase: 'Step 3',
                title: 'Permanent Cementation & Bite Alignment',
                description: 'The finished crown or bridge is permanently cemented, restoring optimal function, aesthetics, and chewing comfort.',
                display_order: 30
              }
            ],
            features: [],
            procedure_video_title: 'Crown & Bridges Procedure Video',
            procedure_video_url: '',
            patient_testimonials: [],
            hospital_team_photos: [],
            marketing_config: {
              green_highlight_line: 'Crown and Bridges restore missing or damaged teeth to rebuild your chewing efficiency, natural aesthetics, and confident smile.',
              process_section_title: 'Crown & Bridges Treatment Planning',
              candidate_section_title: 'Crown & Bridge Materials',
              candidate_items: [
                {
                  id: 'mat-1',
                  title: 'Metal Fused Ceramic',
                  description: 'Strong metal core porcelain fused crowns combining durable interior structural support with tooth-colored outer ceramic.',
                  display_order: 10
                },
                {
                  id: 'mat-2',
                  title: 'Metal-Free Zirconia',
                  description: 'Highly durable, premium metal-free zirconia crowns offering outstanding natural translucency and supreme fracture resistance.',
                  display_order: 20
                },
                {
                  id: 'mat-3',
                  title: 'Natural Appearance',
                  description: 'Custom shaded and sculpted to seamlessly replicate the natural translucency, contours, and aesthetics of surrounding teeth.',
                  display_order: 30
                },
                {
                  id: 'mat-4',
                  title: 'MRI Safe & Biocompatible',
                  description: 'Bio-inert tissue-friendly materials completely safe for future diagnostic MRI scans without producing artifact interference.',
                  display_order: 40
                }
              ],
              gallery_heading: 'Clinical Case Gallery',
              gallery_description: 'Clinical case study transformations of Crown & Bridges treatments.',
              gallery_items: [],
              before_after_heading: 'Before & After Gallery',
              before_after_description: 'See real crown & bridge tooth restoration transformations.',
              before_after_pairs: [],
              procedure_video_title: 'Crown & Bridges Procedure Video',
              procedure_video_url: '',
              testimonials_section_title: 'Patient Testimonials',
              hospital_team_title: 'Hospital & Team Gallery',
              cost_heading: 'Crown & Bridges Cost / Offer',
              cost_description: '',
              cost_starting_price: '',
              cost_cards: [],
              google_reviews_heading: 'Google Patient Reviews',
              google_reviews: [],
              sec11_heading: 'Book Your Crown & Bridges Consultation',
              phone_number: '+91 9510397046',
              whatsapp_number: '+91 9510397046',
              faqs: [],
              show_hero: true,
              show_introduction: true,
              show_process: true,
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

        // Ensure candidate_section_title is set to Crown & Bridge Materials
        const mConfig = (found.marketing_config || {}) as any;
        if (!mConfig.candidate_section_title) {
          mConfig.candidate_section_title = 'Crown & Bridge Materials';
        }
        if (!mConfig.candidate_items || !Array.isArray(mConfig.candidate_items) || mConfig.candidate_items.length === 0) {
          mConfig.candidate_items = [
            {
              id: 'mat-1',
              title: 'Metal Fused Ceramic',
              description: 'Strong metal core porcelain fused crowns combining durable interior structural support with tooth-colored outer ceramic.',
              display_order: 10
            },
            {
              id: 'mat-2',
              title: 'Metal-Free Zirconia',
              description: 'Highly durable, premium metal-free zirconia crowns offering outstanding natural translucency and supreme fracture resistance.',
              display_order: 20
            },
            {
              id: 'mat-3',
              title: 'Natural Appearance',
              description: 'Custom shaded and sculpted to seamlessly replicate the natural translucency, contours, and aesthetics of surrounding teeth.',
              display_order: 30
            },
            {
              id: 'mat-4',
              title: 'MRI Safe & Biocompatible',
              description: 'Bio-inert tissue-friendly materials completely safe for future diagnostic MRI scans without producing artifact interference.',
              display_order: 40
            }
          ];
        }

        setService(found);
      } catch (err: any) {
        console.error('Error loading Crown & Bridges service:', err);
        setErrorMsg('Failed to load Crown & Bridges data.');
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
        <p className="mt-3 text-xs text-slate-500 font-medium">Loading Crown & Bridges CMS...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="p-8 text-center bg-rose-50 text-rose-800 rounded-2xl border border-rose-200">
        <p className="font-bold text-sm">Failed to load Crown & Bridges configuration.</p>
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
        title: service.title?.trim() || 'Crowns & Bridges',
        slug: service.slug || 'crowns-bridges',
        process_steps: Array.isArray(service.process_steps) ? service.process_steps : [],
        features: Array.isArray(service.features) ? service.features : [],
        patient_testimonials: Array.isArray(service.patient_testimonials) ? service.patient_testimonials : [],
        hospital_team_photos: Array.isArray(service.hospital_team_photos) ? service.hospital_team_photos : [],
      };

      const result = await serviceService.saveService(payload);
      if (result.success) {
        setSuccessMsg('Crown & Bridges CMS configurations saved successfully!');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onSaveSuccess?.();
      } else {
        setErrorMsg(result.error || 'Failed to save Crown & Bridges configuration changes.');
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

  // Section 4: Crown & Bridge Materials
  const candidateItems = Array.isArray(mConfig.candidate_items) ? mConfig.candidate_items : [];
  const addCandidateItem = () => {
    const nextOrder = candidateItems.length > 0 ? Math.max(...candidateItems.map((c: any) => Number(c.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `mat-${Date.now()}`,
      title: '',
      description: 'Enter material description...',
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
  const updateCandidateField = (index: number, key: string, val: any) => {
    const updated = [...candidateItems];
    updated[index] = { ...updated[index], [key]: val };
    updateMConfigField('candidate_items', updated);
  };

  // Section 5: Before & After Gallery
  const beforeAfterPairs = Array.isArray(mConfig.before_after_pairs) ? mConfig.before_after_pairs : [];
  const addBeforeAfterPair = () => {
    const nextOrder = beforeAfterPairs.length > 0 ? Math.max(...beforeAfterPairs.map((p: any) => Number(p.display_order) || 0)) + 10 : 10;
    const newPair = {
      id: `ba-${Date.now()}`,
      title: 'Crown & Bridge Transformation',
      description: 'Before & after smile restoration case study',
      before_image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
      after_image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
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
  const updateBeforeAfterField = (index: number, key: string, val: any) => {
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
      title: 'Clinical Case Study',
      caption: 'Crown & bridge restoration details',
      category: 'Crown & Bridge Case',
      image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
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
  const updateGalleryField = (index: number, key: string, val: any) => {
    const updated = [...galleryItems];
    updated[index] = { ...updated[index], [key]: val };
    updateMConfigField('gallery_items', updated);
  };

  // Section 8: Patient Testimonials
  const testimonials = Array.isArray(service.patient_testimonials) ? service.patient_testimonials : [];
  const addTestimonial = () => {
    const nextOrder = testimonials.length > 0 ? Math.max(...testimonials.map((t: any) => Number(t.display_order) || 0)) + 10 : 10;
    const newTesti = {
      id: `testi-${Date.now()}`,
      patient_name: 'Patient Review',
      treatment_name: 'Crowns & Bridges',
      short_review: 'Excellent crown fitting and natural appearance by Dr. Vipul Patel.',
      video_url: '',
      display_order: nextOrder
    };
    updateServiceField('patient_testimonials', [...testimonials, newTesti]);
  };
  const deleteTestimonial = (index: number) => {
    updateServiceField('patient_testimonials', testimonials.filter((_, i) => i !== index));
  };
  const moveTestimonial = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= testimonials.length) return;
    const updated = [...testimonials];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updateServiceField('patient_testimonials', updated);
  };
  const updateTestimonialField = (index: number, key: string, val: any) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [key]: val };
    updateServiceField('patient_testimonials', updated);
  };

  // Section 9: Hospital & Team Gallery
  const hospitalTeamPhotos = Array.isArray(service.hospital_team_photos) ? service.hospital_team_photos : [];
  const addHospitalTeamPhoto = (type: 'hospital' | 'team') => {
    const nextOrder = hospitalTeamPhotos.length > 0 ? Math.max(...hospitalTeamPhotos.map((h: any) => Number(h.display_order) || 0)) + 10 : 10;
    const newPhoto = {
      id: `hosp-${Date.now()}`,
      type,
      caption: type === 'hospital' ? 'Modern Clinical Setup' : 'Our Specialist Team',
      image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
      display_order: nextOrder
    };
    updateServiceField('hospital_team_photos', [...hospitalTeamPhotos, newPhoto]);
  };
  const deleteHospitalTeamPhoto = (index: number) => {
    updateServiceField('hospital_team_photos', hospitalTeamPhotos.filter((_, i) => i !== index));
  };
  const moveHospitalTeamPhoto = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= hospitalTeamPhotos.length) return;
    const updated = [...hospitalTeamPhotos];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updateServiceField('hospital_team_photos', updated);
  };
  const updateHospitalTeamField = (index: number, key: string, val: any) => {
    const updated = [...hospitalTeamPhotos];
    updated[index] = { ...updated[index], [key]: val };
    updateServiceField('hospital_team_photos', updated);
  };

  // Section 10: Cost Cards / Packages
  const costCards = Array.isArray(mConfig.cost_cards) ? mConfig.cost_cards : [];
  const addCostCard = () => {
    const nextOrder = costCards.length > 0 ? Math.max(...costCards.map((c: any) => Number(c.display_order) || 0)) + 10 : 10;
    const newCard = {
      id: `cost-${Date.now()}`,
      title: 'Zirconia Crown Package',
      price: 'Contact for Pricing',
      description: 'Includes digital scanning, shade matching, custom crown fabrication and lifetime warranty.',
      features: ['Digital Scanning', 'Natural Shade Matching', 'High Fracture Resistance'],
      display_order: nextOrder
    };
    updateMConfigField('cost_cards', [...costCards, newCard]);
  };
  const deleteCostCard = (index: number) => {
    updateMConfigField('cost_cards', costCards.filter((_, i) => i !== index));
  };
  const updateCostCardField = (index: number, key: string, val: any) => {
    const updated = [...costCards];
    updated[index] = { ...updated[index], [key]: val };
    updateMConfigField('cost_cards', updated);
  };

  // Section 11: Google Patient Reviews
  const googleReviews = Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : [];
  const addGoogleReview = () => {
    const nextOrder = googleReviews.length > 0 ? Math.max(...googleReviews.map((r: any) => Number(r.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `rev-${Date.now()}`,
      patient_name: 'Patient Name',
      patient_photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      rating: 5,
      review_text: 'Got my metal-free zirconia crown done at Patel Dental Hospital. Perfectly matched my teeth shade and feels completely natural!',
      review_date: 'Recently',
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
      question: 'How long do zirconia dental crowns last?',
      answer: 'With proper oral hygiene and regular dental checkups, zirconia crowns can easily last 15–20 years or more.',
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
            <span className="text-slate-500 text-xs font-semibold">Crowns & Bridges</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#081C3A] mt-1 tracking-tight">
            Crown & Bridges Content Management
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Manage all 13 sections for the Crown & Bridges service page.
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
                    value={service.title || 'Crowns & Bridges'}
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

        {/* 2. WHAT ARE CROWN AND BRIDGES? */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('intro')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Layers className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">2. What are Crown and Bridges?</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure introductory description and highlight banner box</span>
              </div>
            </div>
            {expandedSections.intro ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.intro && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle introduction section visible/hidden on frontend</span>
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
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Section Title</label>
                  <input
                    type="text"
                    value={service.intro_title || 'What are Crown and Bridges?'}
                    onChange={(e) => updateServiceField('intro_title', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Detailed Description</label>
                  <textarea
                    rows={4}
                    value={service.description || ''}
                    onChange={(e) => updateServiceField('description', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                    <span>Green Highlight Banner Text</span>
                  </label>
                  <textarea
                    rows={3}
                    value={mConfig.green_highlight_line || ''}
                    onChange={(e) => updateMConfigField('green_highlight_line', e.target.value)}
                    placeholder="Enter key highlight statement for Crown & Bridges..."
                    className="w-full px-3.5 py-2.5 text-xs border border-teal-200 rounded-xl bg-teal-50/50 text-teal-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. CROWN & BRIDGES TREATMENT PLANNING */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('process')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Stethoscope className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">3. Crown & Bridges Treatment Planning</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure step-by-step clinical workflow steps</span>
              </div>
            </div>
            {expandedSections.process ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.process && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle process steps block visible/hidden on frontend</span>
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
                  value={mConfig.process_section_title || 'Crown & Bridges Treatment Planning'}
                  onChange={(e) => updateMConfigField('process_section_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#081C3A]">Process Steps ({steps.length})</span>
                  <button
                    type="button"
                    onClick={addStep}
                    className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Step</span>
                  </button>
                </div>

                {steps.map((step: any, idx: number) => (
                  <div key={step.id || idx} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-teal-800 uppercase tracking-wider">
                        Step #{idx + 1}
                      </span>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Phase / Label</label>
                        <input
                          type="text"
                          value={step.phase || `Step ${idx + 1}`}
                          onChange={(e) => updateStepField(idx, 'phase', e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Step Title</label>
                        <input
                          type="text"
                          value={step.title || ''}
                          onChange={(e) => updateStepField(idx, 'title', e.target.value)}
                          placeholder="e.g. Preparation & Impressions"
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Description</label>
                      <textarea
                        rows={2}
                        value={step.description || ''}
                        onChange={(e) => updateStepField(idx, 'description', e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. CROWN & BRIDGE MATERIALS */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('materials')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Shield className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">4. Crown & Bridge Materials</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure material types (Metal Fused Ceramic, Metal-Free Zirconia, Natural Appearance, MRI Safe)</span>
              </div>
            </div>
            {expandedSections.materials ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.materials && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle materials section visible/hidden on frontend</span>
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
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Section Heading</label>
                <input
                  type="text"
                  value={mConfig.candidate_section_title || 'Crown & Bridge Materials'}
                  onChange={(e) => updateMConfigField('candidate_section_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#081C3A]">Material Cards ({candidateItems.length})</span>
                  <button
                    type="button"
                    onClick={addCandidateItem}
                    className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Material Card</span>
                  </button>
                </div>

                {candidateItems.map((item: any, idx: number) => (
                  <div key={item.id || idx} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-teal-800 uppercase tracking-wider">
                        Card #{idx + 1}
                      </span>
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

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Material Name / Card Title</label>
                      <input
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => updateCandidateField(idx, 'title', e.target.value)}
                        placeholder="e.g. Metal-Free Zirconia"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Material Description</label>
                      <textarea
                        rows={2}
                        value={item.description || ''}
                        onChange={(e) => updateCandidateField(idx, 'description', e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                      />
                    </div>
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
            onClick={() => toggleSection('before_after')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Sliders className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">5. Before & After Gallery</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure slider comparison image pairs</span>
              </div>
            </div>
            {expandedSections.before_after ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.before_after && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Before & After slider visible/hidden on frontend</span>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Section Heading</label>
                  <input
                    type="text"
                    value={mConfig.before_after_heading || 'Before & After Gallery'}
                    onChange={(e) => updateMConfigField('before_after_heading', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Description</label>
                  <input
                    type="text"
                    value={mConfig.before_after_description || ''}
                    onChange={(e) => updateMConfigField('before_after_description', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#081C3A]">Before & After Pairs ({beforeAfterPairs.length})</span>
                  <button
                    type="button"
                    onClick={addBeforeAfterPair}
                    className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Pair</span>
                  </button>
                </div>

                {beforeAfterPairs.map((pair: any, idx: number) => (
                  <div key={pair.id || idx} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-teal-800 uppercase tracking-wider">
                        Pair #{idx + 1}
                      </span>
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
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Case Title</label>
                        <input
                          type="text"
                          value={pair.title || ''}
                          onChange={(e) => updateBeforeAfterField(idx, 'title', e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Case Description</label>
                        <input
                          type="text"
                          value={pair.description || ''}
                          onChange={(e) => updateBeforeAfterField(idx, 'description', e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Before Image URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={pair.before_image || ''}
                            onChange={(e) => updateBeforeAfterField(idx, 'before_image', e.target.value)}
                            className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                          />
                          <label className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1 shrink-0">
                            <Upload className="h-3 w-3" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const url = await handleFileUpload(e.target.files[0]);
                                  if (url) updateBeforeAfterField(idx, 'before_image', url);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">After Image URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={pair.after_image || ''}
                            onChange={(e) => updateBeforeAfterField(idx, 'after_image', e.target.value)}
                            className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                          />
                          <label className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1 shrink-0">
                            <Upload className="h-3 w-3" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const url = await handleFileUpload(e.target.files[0]);
                                  if (url) updateBeforeAfterField(idx, 'after_image', url);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
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
            onClick={() => toggleSection('gallery')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><ImageIcon className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">6. Clinical Case Gallery</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure clinical case images and photos</span>
              </div>
            </div>
            {expandedSections.gallery ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.gallery && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle clinical case gallery visible/hidden on frontend</span>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Section Heading</label>
                  <input
                    type="text"
                    value={mConfig.gallery_heading || 'Clinical Case Gallery'}
                    onChange={(e) => updateMConfigField('gallery_heading', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Description</label>
                  <input
                    type="text"
                    value={mConfig.gallery_description || ''}
                    onChange={(e) => updateMConfigField('gallery_description', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#081C3A]">Gallery Case Images ({galleryItems.length})</span>
                  <button
                    type="button"
                    onClick={addGalleryItem}
                    className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Gallery Image</span>
                  </button>
                </div>

                {galleryItems.map((item: any, idx: number) => (
                  <div key={item.id || idx} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-teal-800 uppercase tracking-wider">
                        Image #{idx + 1}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveGalleryItem(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveGalleryItem(idx, 'down')}
                          disabled={idx === galleryItems.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteGalleryItem(idx)}
                          className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Case Title</label>
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => updateGalleryField(idx, 'title', e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Caption</label>
                        <input
                          type="text"
                          value={item.caption || ''}
                          onChange={(e) => updateGalleryField(idx, 'caption', e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Image URL</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={item.image_url || ''}
                          onChange={(e) => updateGalleryField(idx, 'image_url', e.target.value)}
                          className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                        />
                        <label className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1 shrink-0">
                          <Upload className="h-3 w-3" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const url = await handleFileUpload(e.target.files[0]);
                                if (url) updateGalleryField(idx, 'image_url', url);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
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
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure procedure demonstration video URL</span>
              </div>
            </div>
            {expandedSections.video ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.video && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle procedure video visible/hidden on frontend</span>
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
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Video Title</label>
                  <input
                    type="text"
                    value={mConfig.procedure_video_title || service.procedure_video_title || 'Crown & Bridges Procedure Video'}
                    onChange={(e) => {
                      updateMConfigField('procedure_video_title', e.target.value);
                      updateServiceField('procedure_video_title', e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Video URL (YouTube / Instagram Reel)</label>
                  <input
                    type="text"
                    value={mConfig.procedure_video_url || service.procedure_video_url || ''}
                    onChange={(e) => {
                      updateMConfigField('procedure_video_url', e.target.value);
                      updateServiceField('procedure_video_url', e.target.value);
                    }}
                    placeholder="https://www.youtube.com/watch?v=... or Instagram Reel URL"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
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
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure patient review reels and testimonials</span>
              </div>
            </div>
            {expandedSections.testimonials ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.testimonials && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle testimonials visible/hidden on frontend</span>
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
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#081C3A]">Testimonials ({testimonials.length})</span>
                  <button
                    type="button"
                    onClick={addTestimonial}
                    className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Testimonial</span>
                  </button>
                </div>

                {testimonials.map((testi: any, idx: number) => (
                  <div key={testi.id || idx} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-teal-800 uppercase tracking-wider">
                        Testimonial #{idx + 1}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveTestimonial(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveTestimonial(idx, 'down')}
                          disabled={idx === testimonials.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTestimonial(idx)}
                          className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Patient Name</label>
                        <input
                          type="text"
                          value={testi.patient_name || ''}
                          onChange={(e) => updateTestimonialField(idx, 'patient_name', e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Treatment / Subtitle</label>
                        <input
                          type="text"
                          value={testi.treatment_name || 'Crowns & Bridges'}
                          onChange={(e) => updateTestimonialField(idx, 'treatment_name', e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Reel / Video URL</label>
                      <input
                        type="text"
                        value={testi.video_url || ''}
                        onChange={(e) => updateTestimonialField(idx, 'video_url', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                      />
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
            onClick={() => toggleSection('hospital_photos')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Users className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">9. Hospital & Team Gallery</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure hospital facilities and specialist doctors photos</span>
              </div>
            </div>
            {expandedSections.hospital_photos ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.hospital_photos && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle hospital & team gallery visible/hidden on frontend</span>
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
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Section Heading</label>
                <input
                  type="text"
                  value={mConfig.hospital_team_title || 'Hospital & Team Gallery'}
                  onChange={(e) => updateMConfigField('hospital_team_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#081C3A]">Photos ({hospitalTeamPhotos.length})</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addHospitalTeamPhoto('hospital')}
                      className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Hospital Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addHospitalTeamPhoto('team')}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Team Photo</span>
                    </button>
                  </div>
                </div>

                {hospitalTeamPhotos.map((photo: any, idx: number) => (
                  <div key={photo.id || idx} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-teal-800 uppercase tracking-wider">
                        Photo #{idx + 1} ({photo.type || 'hospital'})
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveHospitalTeamPhoto(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveHospitalTeamPhoto(idx, 'down')}
                          disabled={idx === hospitalTeamPhotos.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteHospitalTeamPhoto(idx)}
                          className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Category Type</label>
                        <select
                          value={photo.type || 'hospital'}
                          onChange={(e) => updateHospitalTeamField(idx, 'type', e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                        >
                          <option value="hospital">Hospital / Operatory</option>
                          <option value="team">Doctor / Specialist Team</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Caption</label>
                        <input
                          type="text"
                          value={photo.caption || ''}
                          onChange={(e) => updateHospitalTeamField(idx, 'caption', e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Image URL</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={photo.image_url || ''}
                          onChange={(e) => updateHospitalTeamField(idx, 'image_url', e.target.value)}
                          className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                        />
                        <label className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1 shrink-0">
                          <Upload className="h-3 w-3" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const url = await handleFileUpload(e.target.files[0]);
                                if (url) updateHospitalTeamField(idx, 'image_url', url);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
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
            onClick={() => toggleSection('cost')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><DollarSign className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">10. Cost / Offer</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure treatment pricing packages and discount offers</span>
              </div>
            </div>
            {expandedSections.cost ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.cost && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle pricing & offers visible/hidden on frontend</span>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Cost Section Heading</label>
                  <input
                    type="text"
                    value={mConfig.cost_heading || 'Crown & Bridges Cost / Offer'}
                    onChange={(e) => updateMConfigField('cost_heading', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Starting Price / Badge</label>
                  <input
                    type="text"
                    value={mConfig.cost_starting_price || ''}
                    onChange={(e) => updateMConfigField('cost_starting_price', e.target.value)}
                    placeholder="e.g. ₹3,000 / Tooth"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#081C3A]">Package Cards ({costCards.length})</span>
                  <button
                    type="button"
                    onClick={addCostCard}
                    className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Pricing Card</span>
                  </button>
                </div>

                {costCards.map((card: any, idx: number) => (
                  <div key={card.id || idx} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-teal-800 uppercase tracking-wider">
                        Package #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteCostCard(idx)}
                        className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Package Name</label>
                        <input
                          type="text"
                          value={card.title || ''}
                          onChange={(e) => updateCostCardField(idx, 'title', e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Price</label>
                        <input
                          type="text"
                          value={card.price || ''}
                          onChange={(e) => updateCostCardField(idx, 'price', e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Description</label>
                      <textarea
                        rows={2}
                        value={card.description || ''}
                        onChange={(e) => updateCostCardField(idx, 'description', e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 11. GOOGLE PATIENT REVIEWS */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('google_reviews')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Star className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">11. Google Patient Reviews</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure verified Google reviews and star ratings</span>
              </div>
            </div>
            {expandedSections.google_reviews ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.google_reviews && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Google reviews block visible/hidden on frontend</span>
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
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#081C3A]">Google Reviews ({googleReviews.length})</span>
                  <button
                    type="button"
                    onClick={addGoogleReview}
                    className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Review</span>
                  </button>
                </div>

                {googleReviews.map((review: any, idx: number) => (
                  <div key={review.id || idx} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-teal-800 uppercase tracking-wider">
                        Review #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteGoogleReview(idx)}
                        className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Patient Name</label>
                        <input
                          type="text"
                          value={review.patient_name || ''}
                          onChange={(e) => updateGoogleReviewField(idx, 'patient_name', e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Review Date</label>
                        <input
                          type="text"
                          value={review.review_date || 'Recently'}
                          onChange={(e) => updateGoogleReviewField(idx, 'review_date', e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Review Text</label>
                      <textarea
                        rows={2}
                        value={review.review_text || ''}
                        onChange={(e) => updateGoogleReviewField(idx, 'review_text', e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                      />
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
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Phone className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">12. Bottom CTA</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure bottom appointment booking call to action banner</span>
              </div>
            </div>
            {expandedSections.cta ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.cta && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle bottom CTA section visible/hidden on frontend</span>
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

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">CTA Heading</label>
                  <input
                    type="text"
                    value={mConfig.sec11_heading || 'Book Your Crown & Bridges Consultation'}
                    onChange={(e) => updateMConfigField('sec11_heading', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="text"
                      value={mConfig.phone_number || '+91 9510397046'}
                      onChange={(e) => updateMConfigField('phone_number', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">WhatsApp Number</label>
                    <input
                      type="text"
                      value={mConfig.whatsapp_number || '+91 9510397046'}
                      onChange={(e) => updateMConfigField('whatsapp_number', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 13. FAQ */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('faqs')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><HelpCircle className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">13. Frequently Asked Questions (FAQ)</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure common patient questions and answers</span>
              </div>
            </div>
            {expandedSections.faqs ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.faqs && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle FAQ section visible/hidden on frontend</span>
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
                  <span className="text-xs font-bold text-[#081C3A]">FAQ Items ({faqs.length})</span>
                  <button
                    type="button"
                    onClick={addFaq}
                    className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add FAQ Item</span>
                  </button>
                </div>

                {faqs.map((faq: any, idx: number) => (
                  <div key={faq.id || idx} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-teal-800 uppercase tracking-wider">
                        FAQ #{idx + 1}
                      </span>
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

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Question</label>
                      <input
                        type="text"
                        value={faq.question || ''}
                        onChange={(e) => updateFaqField(idx, 'question', e.target.value)}
                        placeholder="e.g. What is the difference between a crown and a bridge?"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white font-bold text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Answer</label>
                      <textarea
                        rows={2}
                        value={faq.answer || ''}
                        onChange={(e) => updateFaqField(idx, 'answer', e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 z-30 bg-[#081C3A] text-white p-4 rounded-2xl shadow-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-4 w-4 text-teal-400 shrink-0" />
          <span className="text-xs font-semibold text-slate-200">
            Unsaved changes will be applied instantly to the Crown & Bridges service page.
          </span>
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
    </div>
  );
}
