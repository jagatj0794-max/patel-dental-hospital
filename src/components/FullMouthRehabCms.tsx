import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, ChevronDown, ChevronUp, Save, Check, 
  Image as ImageIcon, Video, Sliders, Shield, Heart,
  Sparkles, MessageSquare, ArrowUp, ArrowDown, Info, Upload, Star, HelpCircle, Stethoscope, Users
} from 'lucide-react';
import { Service } from '../types';
import { serviceService, DEFAULT_FMR_GOOGLE_REVIEWS, DEFAULT_FMR_GREEN_HIGHLIGHT_LINE } from '../utils/serviceData';
import { uploadImage } from '../utils/supabaseStorage';
import { isSupabaseConfigured } from '../utils/supabase';

interface FullMouthRehabCmsProps {
  onSaveSuccess?: () => void;
}

export default function FullMouthRehabCms({ onSaveSuccess }: FullMouthRehabCmsProps = {}) {
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

  // Fetch Full Mouth Rehabilitation service on load
  useEffect(() => {
    async function loadService() {
      setLoading(true);
      try {
        const services = await serviceService.getServices();
        let found = services.find(s => s.slug === 'full-mouth-rehabilitation' || s.id === 'fmr-srv' || s.id === 'fullmouth');
        
        if (!found) {
          // Fallback initial state if record is missing
          found = {
            id: 'fmr-srv',
            slug: 'full-mouth-rehabilitation',
            title: 'Full Mouth Rehabilitation',
            short_description: 'The processes of rebuilding or repairing all teeth, gums and temporomandibular joint in both upper and lower jaw are called Full Mouth Rehabilitation or Reconstruction or Restoration.',
            hero_description: 'The processes of rebuilding or repairing all teeth, gums and temporomandibular joint in both upper and lower jaw are called Full Mouth Rehabilitation or Reconstruction or Restoration.',
            description: 'The processes of rebuilding or repairing all teeth, gums and temporomandibular joint in both upper and lower jaw are called as Full Mouth Rehabilitation or Reconstruction or Restoration.',
            hero_image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
            icon: 'Sparkles',
            display_order: 3,
            is_active: true,
            process_steps: [
              {
                id: 'fmr-step-1',
                phase: 'Step 1',
                title: '',
                description: 'For Full Mouth Reconstruction, first of all you have to visit Patel Dental Hospital, a top most dental hospital in Gujarat where Dr. Vipul Patel and team do clinical examination of the mouth and perform a Full Mouth OPG X-Ray.',
                display_order: 10
              },
              {
                id: 'fmr-step-2',
                phase: 'Step 2',
                title: '',
                description: 'After studying the OPG X-Ray and intraoral and extraoral clinical data, Dr. Vipul Patel gives you a treatment plan where the role of:\n• Oral Surgeon\n• Implantologist\n• Periodontist\n• Prosthodontist\n• Endodontist (RCT Specialist)\nis very well defined.',
                display_order: 20
              },
              {
                id: 'fmr-step-3',
                phase: 'Step 3',
                title: '',
                description: 'Subsequently, each member of the team executes their work to establish the form, function and aesthetics of teeth, gums, joint and face to create a world-class treatment experience.',
                display_order: 30
              }
            ],
            features: [
              {
                id: 'fmr-plan-1',
                title: '',
                description: 'Tooth Coloured Filling (Composite)',
                display_order: 10
              },
              {
                id: 'fmr-plan-2',
                title: '',
                description: 'Root Canal Treatment',
                display_order: 20
              },
              {
                id: 'fmr-plan-3',
                title: '',
                description: 'Crown and Bridges',
                display_order: 30
              },
              {
                id: 'fmr-plan-4',
                title: '',
                description: 'E-max Veneers and Crowns',
                display_order: 40
              },
              {
                id: 'fmr-plan-5',
                title: '',
                description: 'Dental Implant',
                display_order: 50
              },
              {
                id: 'fmr-plan-6',
                title: '',
                description: 'Wisdom Tooth or any other Impacted Tooth Removal',
                display_order: 60
              },
              {
                id: 'fmr-plan-7',
                title: '',
                description: 'Laser Treatment of Gums for Pyorrhea',
                display_order: 70
              },
              {
                id: 'fmr-plan-8',
                title: '',
                description: 'Braces or Invisible Aligners for Alignment of Teeth',
                display_order: 80
              }
            ],
            procedure_video_title: 'Full Mouth Rehabilitation Procedure',
            procedure_video_url: '',
            patient_testimonials: [],
            hospital_team_photos: [],
            marketing_config: {
              green_highlight_line: DEFAULT_FMR_GREEN_HIGHLIGHT_LINE,
              process_section_title: 'How We Perform Full Mouth Rehabilitation',
              benefits_section_title: 'Treatment Planning Includes',
              candidate_section_title: 'Who Is a Candidate for Full Mouth Rehabilitation',
              candidate_items: [
                {
                  id: 'cand-1',
                  title: '',
                  description: 'Worn out teeth due to Pan Masala chewing.',
                  display_order: 10
                },
                {
                  id: 'cand-2',
                  title: '',
                  description: 'Teeth lost due to trauma or accident.',
                  display_order: 20
                },
                {
                  id: 'cand-3',
                  title: '',
                  description: 'Sensitive eroded teeth due to prolonged acid erosion from meals, severe acidity, acid reflux disorder and excessive use of cold drinks and lemon juice.',
                  display_order: 30
                },
                {
                  id: 'cand-4',
                  title: '',
                  description: 'Temporomandibular joint disorder causing long-term headache, jaw muscle pain, joint pain, clicking sounds and ear pain due to improper traumatic bite.',
                  display_order: 40
                }
              ],
              gallery_heading: 'Clinical Case Gallery',
              gallery_description: 'Before and after transformations of full mouth rehabilitation cases.',
              before_after_heading: 'Before & After Smile Transformations',
              before_after_description: 'See real smile transformations of our full mouth rehabilitation patients.',
              before_after_pairs: [],
              gallery_items: [
                {
                  id: 'fmr-gal-1',
                  caption: 'Picture of FMR with RCT + Bridge + Implant + Extraction',
                  image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
                  display_order: 10
                }
              ],
              cost_packages: [],
              cost_included_items: [],
              cost_starting_price: '',
              cost_heading: 'Save up to 50% on Full Mouth Rehabilitation',
              cost_description: '',
              cost_cards: [],
              faqs: [],
              phone_number: '+91 9510397046',
              whatsapp_number: '+91 9510397046',
              testimonials_section_title: 'Patient Testimonials',
              hospital_team_title: 'Hospital & Team Gallery',
              procedure_video_title: 'Full Mouth Rehabilitation Procedure',
              procedure_video_url: '',
              sec11_heading: 'Book Your Full Mouth Rehabilitation Consultation',
              google_reviews_heading: 'Google Patient Reviews',
              google_reviews: DEFAULT_FMR_GOOGLE_REVIEWS,
              show_hero: true,
              show_introduction: true,
              show_process: true,
              show_benefits: true,
              show_candidate: true,
              show_before_after: true,
              show_gallery: true,
              show_procedure_video: true,
              show_testimonials: true,
              show_hospital_photos: true,
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
        const mCfg = normalized.marketing_config as any;
        if (!mCfg.google_reviews || !Array.isArray(mCfg.google_reviews) || mCfg.google_reviews.length === 0) {
          mCfg.google_reviews = DEFAULT_FMR_GOOGLE_REVIEWS;
        }
        if (!mCfg.candidate_items || !Array.isArray(mCfg.candidate_items) || mCfg.candidate_items.length === 0) {
          mCfg.candidate_items = [
            { id: 'cand-1', title: '', description: 'Worn out teeth due to Pan Masala chewing.', display_order: 10 },
            { id: 'cand-2', title: '', description: 'Teeth lost due to trauma or accident.', display_order: 20 },
            { id: 'cand-3', title: '', description: 'Sensitive eroded teeth due to prolonged acid erosion from meals, severe acidity, acid reflux disorder and excessive use of cold drinks and lemon juice.', display_order: 30 },
            { id: 'cand-4', title: '', description: 'Temporomandibular joint disorder causing long-term headache, jaw muscle pain, joint pain, clicking sounds and ear pain due to improper traumatic bite.', display_order: 40 }
          ];
        }
        if (!mCfg.candidate_section_title) {
          mCfg.candidate_section_title = 'Who Is a Candidate for Full Mouth Rehabilitation';
        }
        if (!mCfg.before_after_heading) {
          mCfg.before_after_heading = 'Before & After Smile Transformations';
        }
        if (!mCfg.before_after_description) {
          mCfg.before_after_description = 'See real smile transformations of our full mouth rehabilitation patients.';
        }
        if (!mCfg.before_after_pairs || !Array.isArray(mCfg.before_after_pairs)) {
          mCfg.before_after_pairs = [];
        }
        if (!mCfg.green_highlight_line) {
          mCfg.green_highlight_line = DEFAULT_FMR_GREEN_HIGHLIGHT_LINE;
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
        setErrorMsg('Failed to fetch Full Mouth Rehabilitation CMS configurations.');
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
        <p className="text-slate-500 text-xs font-medium">Loading Full Mouth Rehabilitation CMS Configurations...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-sm">
        ⚠️ Error: Full Mouth Rehabilitation service record was not found in database.
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
        title: service.title?.trim() || 'Full Mouth Rehabilitation',
        process_steps: Array.isArray(service.process_steps) ? service.process_steps : [],
        features: Array.isArray(service.features) ? service.features : [],
        patient_testimonials: Array.isArray(service.patient_testimonials) ? service.patient_testimonials : [],
        hospital_team_photos: Array.isArray(service.hospital_team_photos) ? service.hospital_team_photos : [],
      };

      const result = await serviceService.saveService(payload);
      if (result.success) {
        setSuccessMsg('Full Mouth Rehabilitation CMS configurations saved successfully!');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onSaveSuccess?.();
      } else {
        setErrorMsg(result.error || 'Failed to save Full Mouth Rehabilitation configuration changes.');
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
      title: 'New Treatment Phase',
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

  // Section 4: Treatment Planning Items / Features
  const features = Array.isArray(service.features) ? service.features : [];
  const addFeature = () => {
    const nextOrder = features.length > 0 ? Math.max(...features.map((c: any) => Number(c.display_order) || 0)) + 10 : 10;
    const newFeature = {
      id: `feat-${Date.now()}`,
      title: 'New Planning Inclusion',
      description: 'Detail explaining clinical scope or restoration protocol.',
      display_order: nextOrder
    };
    updateServiceField('features', [...features, newFeature]);
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

  // Section 5: Candidate Items
  const candidateItems = Array.isArray(mConfig.candidate_items) ? mConfig.candidate_items : [];
  const addCandidateItem = () => {
    const nextOrder = candidateItems.length > 0 ? Math.max(...candidateItems.map((c: any) => Number(c.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `cand-${Date.now()}`,
      title: 'Candidate Clinical Criteria',
      description: 'Description of patient indication for full mouth rehabilitation.',
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

  // Section 5.5: Before & After Gallery Pairs
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

  // Section 6: Clinical Case Gallery (SIMPLIFIED - SINGLE GALLERY GRID)
  const galleryItems = Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : [];
  const addGalleryItem = (url: string) => {
    const nextOrder = galleryItems.length > 0 ? Math.max(...galleryItems.map((g: any) => Number(g.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `gal-${Date.now()}`,
      caption: '',
      image_url: url,
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
      patient_name: 'Patient Review Video',
      video_url: 'https://www.youtube.com/watch?v=SnOxxv_S2ew',
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

  // Section 9: Hospital & Team Photos
  const hostPhotos = Array.isArray(service.hospital_team_photos) ? service.hospital_team_photos : [];
  const addHostPhotoItem = () => {
    const nextOrder = hostPhotos.length > 0 ? Math.max(...hostPhotos.map((h: any) => Number(h.display_order) || 0)) + 10 : 10;
    const newItem = {
      id: `photo-${Date.now()}`,
      image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
      type: 'hospital',
      caption: 'Hospital Operatory Setup',
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
      answer: 'Detailed response explaining full mouth rehabilitation treatment details.',
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
            <span className="text-slate-500 text-xs font-mono">full-mouth-rehabilitation</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-display text-slate-900 mt-1 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[#0D9488]" />
            Full Mouth Rehabilitation CMS
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-1">
            Manage all 13 sections for Full Mouth Rehabilitation with live live preview and instant persistence.
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
                    value={service.title || ''}
                    onChange={(e) => updateServiceField('title', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Hero Description / Subtitle</label>
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

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Hero Image URL / Upload</label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="text"
                      value={service.hero_image || ''}
                      onChange={(e) => updateServiceField('hero_image', e.target.value)}
                      placeholder="https://..."
                      className="flex-1 w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                    />
                    <label className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-slate-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0">
                      <Upload className="h-4 w-4" />
                      <span>Upload Hero Image</span>
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

        {/* 2. ABOUT FULL MOUTH REHABILITATION */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('about')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Info className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">2. About Full Mouth Rehabilitation</span>
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
                  <span className="text-[9px] text-slate-400">Toggle About section visible/hidden</span>
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
                    rows={4}
                    value={service.description || ''}
                    onChange={(e) => updateServiceField('description', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Green Highlight Banner Line / Key Note</label>
                  <textarea
                    rows={3}
                    value={mConfig.green_highlight_line || ''}
                    onChange={(e) => updateMConfigField('green_highlight_line', e.target.value)}
                    placeholder="Enter green highlight line text..."
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-emerald-50/50 text-emerald-900 border-emerald-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. HOW WE PERFORM FULL MOUTH REHABILITATION */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('process')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Sliders className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">3. How We Perform Full Mouth Rehabilitation</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure step-by-step treatment process steps</span>
              </div>
            </div>
            {expandedSections.process ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.process && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle process steps section visible/hidden</span>
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
                  value={mConfig.process_section_title || 'How We Perform Full Mouth Rehabilitation'}
                  onChange={(e) => updateMConfigField('process_section_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Treatment Process Steps ({steps.length})</span>
                  <button
                    type="button"
                    onClick={addStep}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-lg text-xs font-extrabold transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Process Step
                  </button>
                </div>

                {steps.map((step: any, idx: number) => (
                  <div key={step.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row gap-4 items-start relative shadow-3xs">
                    <div className="flex items-center gap-2 sm:flex-col sm:gap-1.5 shrink-0">
                      <span className="h-7 w-7 rounded-full bg-[#0D9488]/10 text-[#0D9488] font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div className="flex bg-white border border-slate-150 rounded-lg p-0.5">
                        <button type="button" disabled={idx === 0} onClick={() => moveStep(idx, 'up')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp className="h-3 w-3" /></button>
                        <button type="button" disabled={idx === steps.length - 1} onClick={() => moveStep(idx, 'down')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown className="h-3 w-3" /></button>
                      </div>
                    </div>

                    <div className="flex-1 space-y-3 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Phase Badge</label>
                          <input type="text" value={step.phase || ''} onChange={(e) => updateStepField(idx, 'phase', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                        </div>
                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Step Title</label>
                          <input type="text" value={step.title || ''} onChange={(e) => updateStepField(idx, 'title', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Description</label>
                        <textarea rows={2} value={step.description || ''} onChange={(e) => updateStepField(idx, 'description', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                      </div>
                    </div>

                    <button type="button" onClick={() => deleteStep(idx)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. TREATMENT PLANNING INCLUDES */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('benefits')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Shield className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">4. Treatment Planning Includes</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure inclusions, advantages, and clinical planning scope</span>
              </div>
            </div>
            {expandedSections.benefits ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.benefits && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Treatment Planning section visible/hidden</span>
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

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Section Heading</label>
                <input
                  type="text"
                  value={mConfig.benefits_section_title || 'Treatment Planning Includes'}
                  onChange={(e) => updateMConfigField('benefits_section_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Planning Scope Items ({features.length})</span>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-lg text-xs font-extrabold transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Item
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

                    <div className="flex-1 space-y-3 w-full">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Item Title</label>
                        <input type="text" value={feat.title || ''} onChange={(e) => updateFeatureField(idx, 'title', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Description</label>
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

        {/* 5. WHO IS A CANDIDATE FOR FULL MOUTH REHABILITATION */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('candidate')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Users className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">5. Who Is a Candidate for Full Mouth Rehabilitation</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure clinical criteria and candidate indications</span>
              </div>
            </div>
            {expandedSections.candidate ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.candidate && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Candidate section visible/hidden</span>
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
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Candidate Section Heading</label>
                <input
                  type="text"
                  value={mConfig.candidate_section_title || 'Who Is a Candidate for Full Mouth Rehabilitation'}
                  onChange={(e) => updateMConfigField('candidate_section_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Candidate Criteria ({candidateItems.length})</span>
                  <button
                    type="button"
                    onClick={addCandidateItem}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-lg text-xs font-extrabold transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Criteria
                  </button>
                </div>

                {candidateItems.map((item: any, idx: number) => (
                  <div key={item.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row gap-4 items-start relative shadow-3xs">
                    <div className="flex items-center gap-2 sm:flex-col sm:gap-1.5 shrink-0">
                      <span className="h-7 w-7 rounded-full bg-[#0D9488]/10 text-[#0D9488] font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div className="flex bg-white border border-slate-150 rounded-lg p-0.5">
                        <button type="button" disabled={idx === 0} onClick={() => moveCandidateItem(idx, 'up')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp className="h-3 w-3" /></button>
                        <button type="button" disabled={idx === candidateItems.length - 1} onClick={() => moveCandidateItem(idx, 'down')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown className="h-3 w-3" /></button>
                      </div>
                    </div>

                    <div className="flex-1 space-y-3 w-full">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Indication Title</label>
                        <input type="text" value={item.title || ''} onChange={(e) => updateCandidateItemField(idx, 'title', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Description</label>
                        <textarea rows={2} value={item.description || ''} onChange={(e) => updateCandidateItemField(idx, 'description', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                      </div>
                    </div>

                    <button type="button" onClick={() => deleteCandidateItem(idx)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
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
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Sparkles className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">Before & After Gallery</span>
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
                  value={mConfig.before_after_description || 'See real smile transformations of our full mouth rehabilitation patients.'}
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
                    No transformation pairs added yet. This section will be hidden on the live page unless pairs are added.
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
                              onClick={() => document.getElementById(`fmr-before-image-file-${idx}`)?.click()}
                              className="w-full px-2 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[10px] font-bold text-slate-600 shadow-3xs transition cursor-pointer"
                            >
                              Replace Before
                            </button>
                            <input
                              type="file"
                              id={`fmr-before-image-file-${idx}`}
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
                              onClick={() => document.getElementById(`fmr-after-image-file-${idx}`)?.click()}
                              className="w-full px-2 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[10px] font-bold text-slate-600 shadow-3xs transition cursor-pointer"
                            >
                              Replace After
                            </button>
                            <input
                              type="file"
                              id={`fmr-after-image-file-${idx}`}
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
                            <label className="text-[9px] font-bold text-slate-500 uppercase block">Caption text (optional)</label>
                            <input
                              type="text"
                              value={pair.caption || ''}
                              onChange={(e) => updateBeforeAfterPairField(idx, 'caption', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteBeforeAfterPair(idx)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
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

        {/* 6. CLINICAL CASE GALLERY (SIMPLIFIED - ONE GALLERY GRID, NO CATEGORIES) */}
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
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Upload, delete, and reorder full mouth clinical gallery images (Single Gallery)</span>
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
                {galleryItems.length === 0 ? (
                  <p className="text-center text-xs text-slate-400 py-4">No gallery images added yet.</p>
                ) : (
                  galleryItems.map((item: any, idx: number) => (
                    <div key={item.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex items-center gap-4">
                      <img src={item.image_url} alt="Gallery" className="h-16 w-24 object-cover rounded-xl border shrink-0 bg-white" referrerPolicy="no-referrer" />
                      <div className="flex-1 space-y-1 min-w-0">
                        <label className="text-[9px] font-bold text-slate-500 uppercase block">Caption / Title (Optional)</label>
                        <input
                          type="text"
                          value={item.caption || item.title || ''}
                          onChange={(e) => updateGalleryItemField(idx, 'caption', e.target.value)}
                          placeholder="e.g. Full Mouth Reconstruction Case"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#0D9488]"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveGalleryItem(idx, 'up')}
                          className="p-1 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30"
                          title="Move Up"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === galleryItems.length - 1}
                          onClick={() => moveGalleryItem(idx, 'down')}
                          className="p-1 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30"
                          title="Move Down"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteGalleryItem(idx)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Image"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}

                <div className="pt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={() => document.getElementById('fmr-add-gallery-file')?.click()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-xl text-xs font-black transition-colors cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Upload Gallery Images
                  </button>
                  <input
                    type="file"
                    id="fmr-add-gallery-file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        for (let i = 0; i < e.target.files.length; i++) {
                          const url = await handleFileUpload(e.target.files[i]);
                          if (url) addGalleryItem(url);
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 7. PROCEDURE VIDEO */}
        <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('procedure_video')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Video className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">7. Procedure Video</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure single clinical procedure demonstration video</span>
              </div>
            </div>
            {expandedSections.procedure_video ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.procedure_video && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle procedure video visible/hidden</span>
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
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Procedure Video Title</label>
                  <input
                    type="text"
                    value={mConfig.procedure_video_title || service.procedure_video_title || 'Full Mouth Rehabilitation Procedure'}
                    onChange={(e) => {
                      updateMConfigField('procedure_video_title', e.target.value);
                      updateServiceField('procedure_video_title', e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Procedure Video URL (YouTube / Instagram Reel / MP4)</label>
                  <input
                    type="text"
                    value={mConfig.procedure_video_url || service.procedure_video_url || ''}
                    onChange={(e) => {
                      updateMConfigField('procedure_video_url', e.target.value);
                      updateServiceField('procedure_video_url', e.target.value);
                    }}
                    placeholder="https://www.youtube.com/watch?v=..."
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
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Video className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">8. Patient Testimonials</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure multiple patient video review reels</span>
              </div>
            </div>
            {expandedSections.testimonials ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.testimonials && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Patient Testimonials section visible/hidden</span>
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
                  <span className="text-xs font-bold text-slate-700">Patient Video Testimonials ({testimonials.length})</span>
                  <button
                    type="button"
                    onClick={addTestimonialItem}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-lg text-xs font-extrabold transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Video Testimonial
                  </button>
                </div>

                {testimonials.map((testi: any, idx: number) => (
                  <div key={testi.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row gap-4 items-start relative shadow-3xs">
                    <div className="flex items-center gap-2 sm:flex-col sm:gap-1.5 shrink-0">
                      <span className="h-7 w-7 rounded-full bg-[#0D9488]/10 text-[#0D9488] font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div className="flex bg-white border border-slate-150 rounded-lg p-0.5">
                        <button type="button" disabled={idx === 0} onClick={() => moveTestimonialItem(idx, 'up')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp className="h-3 w-3" /></button>
                        <button type="button" disabled={idx === testimonials.length - 1} onClick={() => moveTestimonialItem(idx, 'down')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown className="h-3 w-3" /></button>
                      </div>
                    </div>

                    <div className="flex-1 space-y-3 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Patient / Title Name</label>
                          <input type="text" value={testi.patient_name || ''} onChange={(e) => updateTestimonialItemField(idx, 'patient_name', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Treatment Tag</label>
                          <input type="text" value={testi.treatment_name || 'Full Mouth Rehabilitation'} onChange={(e) => updateTestimonialItemField(idx, 'treatment_name', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Video URL (Instagram Reel / YouTube / MP4)</label>
                        <input type="text" value={testi.video_url || ''} onChange={(e) => updateTestimonialItemField(idx, 'video_url', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800" />
                      </div>
                    </div>

                    <button type="button" onClick={() => deleteTestimonialItem(idx)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
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
            onClick={() => toggleSection('hospital_team')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><ImageIcon className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">9. Hospital & Team Gallery</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure hospital infrastructure and specialist doctor team photos</span>
              </div>
            </div>
            {expandedSections.hospital_team ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.hospital_team && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Hospital & Team gallery block visible/hidden</span>
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
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Gallery Title</label>
                <input
                  type="text"
                  value={mConfig.hospital_team_title || 'Hospital & Team Gallery'}
                  onChange={(e) => updateMConfigField('hospital_team_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
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
                    <Plus className="h-3.5 w-3.5" /> Add Photo
                  </button>
                </div>

                {hostPhotos.map((photo: any, idx: number) => (
                  <div key={photo.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex items-center gap-4">
                    <img src={photo.image_url} alt="Host/Team" className="h-16 w-24 object-cover rounded-xl border shrink-0 bg-white" referrerPolicy="no-referrer" />
                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase block">Type</label>
                          <select
                            value={photo.type || 'hospital'}
                            onChange={(e) => updateHostPhotoItemField(idx, 'type', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                          >
                            <option value="hospital">Hospital Facility</option>
                            <option value="team">Specialist Team</option>
                          </select>
                        </div>
                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-[9px] font-bold text-slate-500 uppercase block">Caption</label>
                          <input
                            type="text"
                            value={photo.caption || ''}
                            onChange={(e) => updateHostPhotoItemField(idx, 'caption', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase block">Image URL / Upload</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={photo.image_url || ''}
                            onChange={(e) => updateHostPhotoItemField(idx, 'image_url', e.target.value)}
                            className="flex-1 px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                          />
                          <label className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded-lg cursor-pointer flex items-center gap-1 shrink-0">
                            <Upload className="h-3 w-3" />
                            <span>Upload</span>
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
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <button type="button" disabled={idx === 0} onClick={() => moveHostPhotoItem(idx, 'up')} className="p-1 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button>
                      <button type="button" disabled={idx === hostPhotos.length - 1} onClick={() => moveHostPhotoItem(idx, 'down')} className="p-1 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button>
                    </div>

                    <button type="button" onClick={() => deleteHostPhotoItem(idx)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
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
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><Stethoscope className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">10. Cost / Offer</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure package pricing heading, descriptions, and starting offers</span>
              </div>
            </div>
            {expandedSections.cost ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.cost && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Cost / Offer section visible/hidden</span>
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
                    value={mConfig.cost_heading || 'Full Mouth Rehabilitation Cost & Offer'}
                    onChange={(e) => updateMConfigField('cost_heading', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Cost Section Description</label>
                  <textarea
                    rows={2}
                    value={mConfig.cost_description || ''}
                    onChange={(e) => updateMConfigField('cost_description', e.target.value)}
                    placeholder="Customized full mouth packages tailored to your jaw condition..."
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Starting Price / Special Offer Badge (Optional)</label>
                  <input
                    type="text"
                    value={mConfig.cost_starting_price || ''}
                    onChange={(e) => updateMConfigField('cost_starting_price', e.target.value)}
                    placeholder="e.g. Starting from ₹ customized package / Free Consultation"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>
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
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure service-specific Google reviews and ratings</span>
              </div>
            </div>
            {expandedSections.google_reviews ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.google_reviews && (
            <div className="p-6 border-t border-slate-100 space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
                  <span className="text-[9px] text-slate-400">Toggle Google Patient Reviews visible/hidden</span>
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
                  <span className="text-xs font-bold text-slate-700">Patient Google Reviews ({googleReviews.length})</span>
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
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-amber-100 text-amber-700 font-bold text-[10px] flex items-center justify-center">
                          ★ {rev.rating || 5}
                        </span>
                        <span className="text-xs font-bold text-slate-800">{rev.patient_name || 'Anonymous Patient'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" disabled={idx === 0} onClick={() => moveGoogleReview(idx, 'up')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp className="h-3 w-3" /></button>
                        <button type="button" disabled={idx === googleReviews.length - 1} onClick={() => moveGoogleReview(idx, 'down')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown className="h-3 w-3" /></button>
                        <button type="button" onClick={() => deleteGoogleReview(idx)} className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Patient Name</label>
                        <input type="text" value={rev.patient_name || ''} onChange={(e) => updateGoogleReviewField(idx, 'patient_name', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Review Date Tag</label>
                        <input type="text" value={rev.review_date || ''} onChange={(e) => updateGoogleReviewField(idx, 'review_date', e.target.value)} placeholder="e.g. 2 weeks ago" className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Review Text</label>
                      <textarea rows={3} value={rev.review_text || ''} onChange={(e) => updateGoogleReviewField(idx, 'review_text', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white" />
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
            onClick={() => toggleSection('bottom_cta')}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600"><MessageSquare className="h-4 w-4" /></span>
              <div>
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">12. Bottom CTA</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure bottom call to action section, phone number, and WhatsApp link</span>
              </div>
            </div>
            {expandedSections.bottom_cta ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {expandedSections.bottom_cta && (
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

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">CTA Heading</label>
                  <input
                    type="text"
                    value={mConfig.sec11_heading || 'Book Your Full Mouth Rehabilitation Consultation'}
                    onChange={(e) => updateMConfigField('sec11_heading', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">13. FAQ Section</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">Configure service-specific frequently asked questions</span>
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
                    <Plus className="h-3.5 w-3.5" /> Add FAQ
                  </button>
                </div>

                {faqs.map((faq: any, idx: number) => (
                  <div key={faq.id || idx} className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl space-y-3 relative shadow-3xs">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-[#081C3A]">FAQ #{idx + 1}</span>
                      <div className="flex items-center gap-2">
                        <button type="button" disabled={idx === 0} onClick={() => moveFaq(idx, 'up')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp className="h-3 w-3" /></button>
                        <button type="button" disabled={idx === faqs.length - 1} onClick={() => moveFaq(idx, 'down')} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown className="h-3 w-3" /></button>
                        <button type="button" onClick={() => deleteFaq(idx)} className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Question</label>
                      <input type="text" value={faq.question || ''} onChange={(e) => updateFaqField(idx, 'question', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Answer</label>
                      <textarea rows={3} value={faq.answer || ''} onChange={(e) => updateFaqField(idx, 'answer', e.target.value)} className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Bottom Floating/Persistent Save Action */}
      <div className="sticky bottom-6 pt-4 bg-gradient-to-t from-slate-50/90 to-transparent flex justify-end">
        <button
          type="button"
          onClick={handleSaveAll}
          disabled={saving}
          className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0D9488] hover:bg-[#0B7A70] text-white rounded-xl text-xs font-extrabold shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              <span>Saving Configurations...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save All Configurations</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
