/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Users, 
  Image as ImageIcon, 
  Phone, 
  LogOut, 
  Stethoscope, 
  Video, 
  MapPin, 
  Menu, 
  X,
  Activity,
  UserCheck,
  Upload,
  Trash2,
  Eye,
  Check,
  RotateCcw,
  ShieldCheck,
  Calendar,
  MessageCircle,
  Clock,
  Play,
  GripVertical,
  ExternalLink,
  Building2,
  Mail,
  ChevronUp,
  ChevronDown,
  Sliders,
  Settings,
  Layers,
  Star,
  EyeOff
} from 'lucide-react';
import { PageId, Doctor, PatientMoment, ContactInfo, DentalVideo, Service, ServiceGalleryItem, ServiceFaq } from '../types';
import { Plus, Pencil, Save, X as CloseIcon, ArrowLeft, CalendarDays, Link } from 'lucide-react';
import { safeStorage } from '../utils/storage';
import { supabase } from '../utils/supabase';
import { uploadImage } from '../utils/supabaseStorage';
import { heroService } from '../utils/heroData';
import { doctorService } from '../utils/doctorData';
import { galleryService } from '../utils/galleryData';
import { videoService } from '../utils/videoData';
import { contactService } from '../utils/contactData';
import { serviceService } from '../utils/serviceData';
import Appointments from './Appointments';
import ServiceDetail from './ServiceDetail';

interface AdminProps {
  setCurrentPage: (page: PageId) => void;
  heroHeading: string;
  setHeroHeading: (val: string) => void;
  heroDescription: string;
  setHeroDescription: (val: string) => void;
  heroBgImage: string;
  setHeroBgImage: (val: string) => void;
  heroBgImageMobile: string;
  setHeroBgImageMobile: (val: string) => void;
  doctorsList: Doctor[];
  setDoctorsList: (val: Doctor[]) => void;
  mediaImages: Array<{ id: string; url: string; title: string; category: string; branch: string; altText?: string }>;
  setMediaImages: React.Dispatch<React.SetStateAction<Array<{ id: string; url: string; title: string; category: string; branch: string; altText?: string }>>>;
  patientMoments: PatientMoment[];
  setPatientMoments: React.Dispatch<React.SetStateAction<PatientMoment[]>>;
  videosList: DentalVideo[];
  setVideosList: React.Dispatch<React.SetStateAction<DentalVideo[]>>;
  contactInfo: ContactInfo;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;
}

type SidebarTab = 'dashboard' | 'hero' | 'doctors' | 'media' | 'appointments' | 'contact' | 'services';

export default function Admin({ 
  setCurrentPage, 
  heroHeading, 
  setHeroHeading, 
  heroDescription, 
  setHeroDescription, 
  heroBgImage, 
  setHeroBgImage,
  heroBgImageMobile,
  setHeroBgImageMobile,
  doctorsList,
  setDoctorsList,
  mediaImages,
  setMediaImages,
  patientMoments,
  setPatientMoments,
  videosList,
  setVideosList,
  contactInfo,
  setContactInfo
}: AdminProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Editable local form draft states
  const [draftHeading, setDraftHeading] = useState(heroHeading);
  const [draftDescription, setDraftDescription] = useState(heroDescription);
  const [draftBgImage, setDraftBgImage] = useState(heroBgImage);
  const [draftBgImageMobile, setDraftBgImageMobile] = useState(heroBgImageMobile);

  // Synchronize draft states when parent props change (e.g. once loaded from Supabase)
  useEffect(() => {
    setDraftHeading(heroHeading);
    setDraftDescription(heroDescription);
    setDraftBgImage(heroBgImage);
    setDraftBgImageMobile(heroBgImageMobile);
  }, [heroHeading, heroDescription, heroBgImage, heroBgImageMobile]);

  // Contact details draft state
  const [draftPhone, setDraftPhone] = useState(contactInfo?.phone || '');
  const [draftPhoneRaw, setDraftPhoneRaw] = useState(contactInfo?.phoneRaw || '');
  const [draftWhatsapp, setDraftWhatsapp] = useState(contactInfo?.whatsapp || '');
  const [draftWhatsappRaw, setDraftWhatsappRaw] = useState(contactInfo?.whatsappRaw || '');
  const [draftEmail, setDraftEmail] = useState(contactInfo?.email || '');
  const [draftAddress, setDraftAddress] = useState(contactInfo?.address || '');
  const [draftMapsLink, setDraftMapsLink] = useState(contactInfo?.mapsLink || '');

  useEffect(() => {
    if (contactInfo) {
      setDraftPhone(contactInfo.phone || '');
      setDraftPhoneRaw(contactInfo.phoneRaw || '');
      setDraftWhatsapp(contactInfo.whatsapp || '');
      setDraftWhatsappRaw(contactInfo.whatsappRaw || '');
      setDraftEmail(contactInfo.email || '');
      setDraftAddress(contactInfo.address || '');
      setDraftMapsLink(contactInfo.mapsLink || '');
    }
  }, [contactInfo]);

  // Doctors local draft states
  const [draftDoctors, setDraftDoctors] = useState<Doctor[]>(() => doctorsList);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [docPhotoDragging, setDocPhotoDragging] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<string | null>(null);
  const [smileToDelete, setSmileToDelete] = useState<string | null>(null);

  // Services Tab states
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceImgUploading, setServiceImgUploading] = useState(false);
  const [homePageImgUploading, setHomePageImgUploading] = useState(false);
  const [serviceFormError, setServiceFormError] = useState<string | null>(null);
  const [isSlugTouched, setIsSlugTouched] = useState(false);

  const steps: any[] = Array.isArray(editingService?.process_steps)
    ? editingService.process_steps
    : (typeof editingService?.process_steps === 'string'
        ? (() => { try { return JSON.parse(editingService.process_steps || '[]') } catch(e) { return [] } })()
        : []);
  
  const feats: any[] = Array.isArray(editingService?.features)
    ? editingService.features
    : (typeof editingService?.features === 'string'
        ? (() => { try { return JSON.parse(editingService.features || '[]') } catch(e) { return [] } })()
        : []);

  const updateStep = (index: number, key: string, value: any) => {
    if (!editingService) return;
    const currentSteps = [...steps];
    currentSteps[index] = { ...currentSteps[index], [key]: value };
    if (key === 'display_order') {
      currentSteps.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    }
    setEditingService({ ...editingService, process_steps: currentSteps });
  };

  const deleteStep = (index: number) => {
    if (!editingService) return;
    const currentSteps = steps.filter((_, idx) => idx !== index);
    setEditingService({ ...editingService, process_steps: currentSteps });
  };

  const addStep = () => {
    if (!editingService) return;
    const currentSteps = [...steps];
    const nextOrder = currentSteps.length > 0 ? Math.max(...currentSteps.map(s => s.display_order || 0)) + 10 : 10;
    currentSteps.push({ title: '', description: '', display_order: nextOrder });
    setEditingService({ ...editingService, process_steps: currentSteps });
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (!editingService) return;
    const currentSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentSteps.length) return;
    
    const temp = currentSteps[index];
    currentSteps[index] = currentSteps[targetIndex];
    currentSteps[targetIndex] = temp;
    
    const tempOrder = currentSteps[index].display_order;
    currentSteps[index].display_order = currentSteps[targetIndex].display_order;
    currentSteps[targetIndex].display_order = tempOrder;
    
    setEditingService({ ...editingService, process_steps: currentSteps });
  };

  const updateFeat = (index: number, key: string, value: any) => {
    if (!editingService) return;
    const currentFeats = [...feats];
    currentFeats[index] = { ...currentFeats[index], [key]: value };
    if (key === 'display_order') {
      currentFeats.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    }
    setEditingService({ ...editingService, features: currentFeats });
  };

  const deleteFeat = (index: number) => {
    if (!editingService) return;
    const currentFeats = feats.filter((_, idx) => idx !== index);
    setEditingService({ ...editingService, features: currentFeats });
  };

  const addFeat = () => {
    if (!editingService) return;
    const currentFeats = [...feats];
    const nextOrder = currentFeats.length > 0 ? Math.max(...currentFeats.map(f => f.display_order || 0)) + 10 : 10;
    currentFeats.push({ title: '', description: '', display_order: nextOrder });
    setEditingService({ ...editingService, features: currentFeats });
  };

  const moveFeat = (index: number, direction: 'up' | 'down') => {
    if (!editingService) return;
    const currentFeats = [...feats];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentFeats.length) return;
    
    const temp = currentFeats[index];
    currentFeats[index] = currentFeats[targetIndex];
    currentFeats[targetIndex] = temp;
    
    const tempOrder = currentFeats[index].display_order;
    currentFeats[index].display_order = currentFeats[targetIndex].display_order;
    currentFeats[targetIndex].display_order = tempOrder;
    
    setEditingService({ ...editingService, features: currentFeats });
  };

  const contentImages: any[] = Array.isArray(editingService?.content_images)
    ? editingService.content_images
    : (typeof editingService?.content_images === 'string'
        ? (() => { try { return JSON.parse(editingService.content_images || '[]') } catch(e) { return [] } })()
        : []);

  const testimonials: any[] = Array.isArray(editingService?.patient_testimonials)
    ? editingService.patient_testimonials
    : (typeof editingService?.patient_testimonials === 'string'
        ? (() => { try { return JSON.parse(editingService.patient_testimonials || '[]') } catch(e) { return [] } })()
        : []);

  const teamPhotos: any[] = Array.isArray(editingService?.hospital_team_photos)
    ? editingService.hospital_team_photos
    : (typeof editingService?.hospital_team_photos === 'string'
        ? (() => { try { return JSON.parse(editingService.hospital_team_photos || '[]') } catch(e) { return [] } })()
        : []);

  const updateContentImage = (index: number, key: string, value: any) => {
    if (!editingService) return;
    const current = [...contentImages];
    current[index] = { ...current[index], [key]: value };
    if (key === 'display_order') {
      current.sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    }
    setEditingService({ ...editingService, content_images: current });
  };

  const deleteContentImage = (index: number) => {
    if (!editingService) return;
    const current = contentImages.filter((_, idx) => idx !== index);
    setEditingService({ ...editingService, content_images: current });
  };

  const addContentImage = () => {
    if (!editingService) return;
    const current = [...contentImages];
    const nextOrder = current.length > 0 ? Math.max(...current.map(i => Number(i.display_order) || 0)) + 10 : 10;
    current.push({ image_url: '', caption: '', alt_text: '', display_order: nextOrder });
    setEditingService({ ...editingService, content_images: current });
  };

  const updateTestimonial = (index: number, key: string, value: any) => {
    if (!editingService) return;
    const current = [...testimonials];
    current[index] = { ...current[index], [key]: value };
    if (key === 'display_order') {
      current.sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    }
    setEditingService({ ...editingService, patient_testimonials: current });
  };

  const deleteTestimonial = (index: number) => {
    if (!editingService) return;
    const current = testimonials.filter((_, idx) => idx !== index);
    setEditingService({ ...editingService, patient_testimonials: current });
  };

  const addTestimonial = () => {
    if (!editingService) return;
    const current = [...testimonials];
    const nextOrder = current.length > 0 ? Math.max(...current.map(t => Number(t.display_order) || 0)) + 10 : 10;
    current.push({ video_url: '', patient_name: '', treatment_name: '', short_review: '', display_order: nextOrder });
    setEditingService({ ...editingService, patient_testimonials: current });
  };

  const updateTeamPhoto = (index: number, key: string, value: any) => {
    if (!editingService) return;
    const current = [...teamPhotos];
    current[index] = { ...current[index], [key]: value };
    if (key === 'display_order') {
      current.sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    }
    setEditingService({ ...editingService, hospital_team_photos: current });
  };

  const deleteTeamPhoto = (index: number) => {
    if (!editingService) return;
    const current = teamPhotos.filter((_, idx) => idx !== index);
    setEditingService({ ...editingService, hospital_team_photos: current });
  };

  const addTeamPhoto = () => {
    if (!editingService) return;
    const current = [...teamPhotos];
    const nextOrder = current.length > 0 ? Math.max(...current.map(p => Number(p.display_order) || 0)) + 10 : 10;
    current.push({ image_url: '', title: '', caption: '', display_order: nextOrder });
    setEditingService({ ...editingService, hospital_team_photos: current });
  };

  const updateMarketingConfig = (key: string, value: any) => {
    if (!editingService) return;
    const currentConfig = typeof editingService.marketing_config === 'string'
      ? (() => { try { return JSON.parse(editingService.marketing_config) } catch(e) { return {} } })()
      : (editingService.marketing_config || {});
    
    const updatedConfig = { ...currentConfig, [key]: value };
    
    // Sync to legacy hospital_team_photos if we updated any of the split fields
    let updatedHospitalTeamPhotos = editingService.hospital_team_photos;
    if (['hospital_photos', 'team_photos', 'equipment_photos'].includes(key)) {
      const merged: any[] = [];
      const hList = updatedConfig.hospital_photos || [];
      const tList = updatedConfig.team_photos || [];
      const eList = updatedConfig.equipment_photos || [];
      
      hList.forEach((h: any) => {
        merged.push({
          image_url: h.image_url || '',
          title: h.caption || 'Clinic Infrastructure',
          caption: 'Hospital Photo',
          display_order: Number(h.display_order) || 0
        });
      });
      
      tList.forEach((t: any) => {
        merged.push({
          image_url: t.photo_url || '',
          title: t.name || 'Team Specialist',
          caption: t.designation ? `${t.designation}${t.caption ? ` - ${t.caption}` : ''}` : (t.caption || 'Team Member'),
          display_order: Number(t.display_order) || 0
        });
      });
      
      eList.forEach((e: any) => {
        merged.push({
          image_url: e.image_url || '',
          title: e.name || 'Clinical Equipment',
          caption: e.caption || 'Advanced Technology',
          display_order: Number(e.display_order) || 0
        });
      });
      
      updatedHospitalTeamPhotos = merged;
    }
    
    setEditingService({ 
      ...editingService, 
      marketing_config: updatedConfig,
      hospital_team_photos: updatedHospitalTeamPhotos
    });
  };

  const isSlugUnique = (slug: string, id: string) => {
    return !servicesList.some(s => s.slug.trim().toLowerCase() === slug.trim().toLowerCase() && s.id !== id);
  };

  const handleAddService = () => {
    setIsSlugTouched(false);
    setServiceFormError(null);
    setActiveServiceEditorTab('details');
    setEditingService({
      id: `svc-${Date.now()}`,
      slug: '',
      title: '',
      short_description: '',
      description: '',
      hero_image: '',
      icon: 'Stethoscope',
      display_order: servicesList.length > 0 ? Math.max(...servicesList.map(s => s.display_order)) + 10 : 10,
      is_active: true,
      seo_title: '',
      seo_description: '',
      homepage_card_image: '',
      homepage_short_description: '',
      hero_title: '',
      hero_description: '',
      hero_image_caption: '',
      intro_title: '',
      intro_description: '',
      process_steps: [],
      features: [],
      content_images: [],
      procedure_video_url: '',
      procedure_video_title: '',
      procedure_video_description: '',
      procedure_video_thumbnail: '',
      patient_testimonials: [],
      hospital_team_photos: [],
      marketing_config: {},
    });
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setServiceFormError(null);

    // Validate fields
    if (!editingService.title.trim()) {
      setServiceFormError('Service title is required.');
      return;
    }
    if (!editingService.slug.trim()) {
      setServiceFormError('Service slug is required.');
      return;
    }
    // Validate slug uniqueness
    if (!isSlugUnique(editingService.slug, editingService.id)) {
      setServiceFormError('Service slug must be unique. This slug is already in use.');
      return;
    }
    if (!editingService.short_description.trim()) {
      setServiceFormError('Short description is required.');
      return;
    }
    if (!editingService.description.trim()) {
      setServiceFormError('Full description is required.');
      return;
    }
    if (!editingService.hero_image.trim()) {
      setServiceFormError('Hero image is required. Please upload or specify an image URL.');
      return;
    }
    if (isNaN(Number(editingService.display_order))) {
      setServiceFormError('Display order must be a valid numeric value.');
      return;
    }

    setSaveMessage('Saving service to Supabase...');
    try {
      const isNew = !servicesList.some(s => s.id === editingService.id);
      const serviceToSave: Service = {
        ...editingService,
        title: editingService.title.trim(),
        slug: editingService.slug.trim().toLowerCase().replace(/\s+/g, '-'),
        short_description: editingService.short_description.trim(),
        description: editingService.description.trim(),
        display_order: Number(editingService.display_order),
        seo_title: editingService.seo_title?.trim() || null,
        seo_description: editingService.seo_description?.trim() || null,
        homepage_card_image: editingService.homepage_card_image?.trim() || null,
        homepage_short_description: editingService.homepage_short_description?.trim() || null,
        hero_title: editingService.hero_title?.trim() || null,
        hero_description: editingService.hero_description?.trim() || null,
        hero_image_caption: editingService.hero_image_caption?.trim() || null,
        intro_title: editingService.intro_title?.trim() || null,
        intro_description: editingService.intro_description?.trim() || null,
        process_steps: editingService.process_steps || [],
        features: editingService.features || [],
        content_images: editingService.content_images || [],
        procedure_video_url: editingService.procedure_video_url?.trim() || null,
        procedure_video_title: editingService.procedure_video_title?.trim() || null,
        procedure_video_description: editingService.procedure_video_description?.trim() || null,
        procedure_video_thumbnail: editingService.procedure_video_thumbnail?.trim() || null,
        patient_testimonials: editingService.patient_testimonials || [],
        hospital_team_photos: editingService.hospital_team_photos || [],
      };

      // Store a backup of the current list for rollback on error
      const oldServicesList = [...servicesList];

      // Optimistically update the local services list immediately
      setServicesList(prev => {
        const exists = prev.some(s => s.id === serviceToSave.id);
        if (exists) {
          return prev.map(s => s.id === serviceToSave.id ? serviceToSave : s);
        } else {
          return [...prev, serviceToSave];
        }
      });

      // Keep the editor open in edit mode instantly with the new data
      setEditingService(serviceToSave);

      // Perform background database synchronization
      serviceService.saveService(serviceToSave).then((result) => {
        if (result.success) {
          if (isNew) {
            setSaveMessage('Service created successfully. You can now add Gallery images and FAQs.');
          } else {
            setSaveMessage('Service saved successfully!');
          }
        } else {
          // Revert local state if save fails
          setServicesList(oldServicesList);
          setServiceFormError(result.error || 'Failed to save service on Supabase.');
          setSaveMessage(null);
        }
      }).catch((err: any) => {
        setServicesList(oldServicesList);
        setServiceFormError('Error saving service: ' + (err.message || err));
        setSaveMessage(null);
      });

    } catch (err: any) {
      console.error('Error in save service setup:', err);
      setServiceFormError('Error saving service: ' + (err.message || err));
      setSaveMessage(null);
    } finally {
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleServiceHeroImageUpload = async (file: File) => {
    setServiceImgUploading(true);
    setServiceFormError(null);
    try {
      const publicUrl = await uploadImage(file);
      if (editingService) {
        setEditingService({ ...editingService, hero_image: publicUrl });
      }
    } catch (err: any) {
      console.error('Error uploading service image:', err);
      setServiceFormError('Image upload failed: ' + (err.message || err));
    } finally {
      setServiceImgUploading(false);
    }
  };

  const handleHomePageCardImageUpload = async (file: File) => {
    setHomePageImgUploading(true);
    setServiceFormError(null);
    try {
      const publicUrl = await uploadImage(file);
      if (editingService) {
        setEditingService({ ...editingService, homepage_card_image: publicUrl });
      }
    } catch (err: any) {
      console.error('Error uploading home page card image:', err);
      setServiceFormError('Image upload failed: ' + (err.message || err));
    } finally {
      setHomePageImgUploading(false);
    }
  };

  const loadServicesList = async () => {
    setLoadingServices(true);
    setServicesError(null);
    try {
      const data = await serviceService.getServices();
      setServicesList(data || []);
    } catch (err: any) {
      console.error('[Services] Failed to fetch services:', err);
      setServicesError('Failed to fetch services. Please try again.');
    } finally {
      setLoadingServices(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'services') {
      loadServicesList();
    }
  }, [activeTab]);

  const handleDeleteService = async () => {
    if (!serviceToDelete) return;
    setSaveMessage('Deleting service from Supabase...');
    const targetId = serviceToDelete;
    const oldServicesList = [...servicesList];

    // Optimistically update the services list local state immediately
    setServicesList(prev => prev.filter(s => s.id !== targetId));
    setServiceToDelete(null);

    try {
      const success = await serviceService.deleteService(targetId);
      if (success) {
        setSaveMessage('Service deleted successfully!');
      } else {
        // Rollback on failure
        setServicesList(oldServicesList);
        setSaveMessage('Failed to delete service on Supabase.');
      }
    } catch (err: any) {
      console.error('Error deleting service:', err);
      setServicesList(oldServicesList);
      setSaveMessage('Error deleting service: ' + (err.message || err));
    } finally {
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  // Service Gallery Tab states
  const [activeServiceEditorTab, setActiveServiceEditorTab] = useState<'details' | 'media' | 'gallery' | 'faqs' | 'marketing'>('details');
  const [serviceGalleryList, setServiceGalleryList] = useState<ServiceGalleryItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [gallerySaving, setGallerySaving] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Add by URL states
  const [isAddByUrlOpen, setIsAddByUrlOpen] = useState(false);
  const [addByUrlInput, setAddByUrlInput] = useState('');
  const [addByUrlCaption, setAddByUrlCaption] = useState('');
  const [addByUrlAltText, setAddByUrlAltText] = useState('');
  const [addByUrlError, setAddByUrlError] = useState<string | null>(null);

  // Replace & Delete states
  const [replacingGalleryItemIndex, setReplacingGalleryItemIndex] = useState<number | null>(null);
  const [replaceUrlInput, setReplaceUrlInput] = useState('');
  const [replaceError, setReplaceError] = useState<string | null>(null);
  const [galleryImageToDelete, setGalleryImageToDelete] = useState<string | null>(null);

  // Service FAQs Tab states
  const [serviceFaqsList, setServiceFaqsList] = useState<ServiceFaq[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(false);
  const [faqsError, setFaqsError] = useState<string | null>(null);
  const [faqsSaving, setFaqsSaving] = useState(false);
  const [draggedFaqIndex, setDraggedFaqIndex] = useState<number | null>(null);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqEditQuestion, setFaqEditQuestion] = useState('');
  const [faqEditAnswer, setFaqEditAnswer] = useState('');

  // Written Reviews edit states
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [reviewDraftName, setReviewDraftName] = useState('');
  const [reviewDraftTreatment, setReviewDraftTreatment] = useState('');
  const [reviewDraftText, setReviewDraftText] = useState('');
  const [reviewDraftRating, setReviewDraftRating] = useState<number>(5);
  const [reviewDraftBeforeImage, setReviewDraftBeforeImage] = useState('');
  const [reviewDraftAfterImage, setReviewDraftAfterImage] = useState('');
  const [reviewDraftDisplayOrder, setReviewDraftDisplayOrder] = useState<number>(10);

  // Derived Marketing Media States
  const mConfig = typeof editingService?.marketing_config === 'string'
    ? (() => { try { return JSON.parse(editingService.marketing_config) } catch(e) { return {} } })()
    : (editingService?.marketing_config || {});

  const triggerUpload = async (accept: string, onUpload: (url: string) => void) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.onchange = async (eEvent: any) => {
      if (eEvent.target.files && eEvent.target.files[0]) {
        setSaveMessage('Uploading media file...');
        try {
          const url = await uploadImage(eEvent.target.files[0]);
          if (url) {
            onUpload(url);
            setSaveMessage('Uploaded successfully!');
          }
        } catch (err: any) {
          console.error(err);
          setServiceFormError('Upload failed: ' + (err.message || String(err)));
        } finally {
          setTimeout(() => setSaveMessage(null), 2500);
        }
      }
    };
    input.click();
  };

  const clinicalVideosList = mConfig.procedure_videos || (editingService?.procedure_video_url ? [{
    title: editingService.procedure_video_title || 'Procedure Video',
    video_url: editingService.procedure_video_url || '',
    thumbnail: editingService.procedure_video_thumbnail || '',
    description: editingService.procedure_video_description || '',
    display_order: 10
  }] : []);

  const hospitalPhotosList = mConfig.hospital_photos || [];
  const teamPhotosList = mConfig.team_photos || [];
  const equipmentPhotosList = mConfig.equipment_photos || [];

  const saveProcedureVideos = (videos: any[]) => {
    if (!editingService) return;
    const updatedConfig = { ...mConfig, procedure_videos: videos };
    if (videos.length > 0) {
      setEditingService({
        ...editingService,
        marketing_config: updatedConfig,
        procedure_video_url: videos[0].video_url,
        procedure_video_title: videos[0].title,
        procedure_video_description: videos[0].description,
        procedure_video_thumbnail: videos[0].thumbnail
      });
    } else {
      setEditingService({
        ...editingService,
        marketing_config: updatedConfig,
        procedure_video_url: null,
        procedure_video_title: null,
        procedure_video_description: null,
        procedure_video_thumbnail: null
      });
    }
  };

  useEffect(() => {
    if (editingService?.id) {
      const loadGallery = async () => {
        setLoadingGallery(true);
        setGalleryError(null);
        try {
          const items = await serviceService.getGallery(editingService.id);
          setServiceGalleryList(items || []);
        } catch (err: any) {
          console.error('Error fetching service gallery:', err);
          setGalleryError('Failed to fetch gallery images.');
        } finally {
          setLoadingGallery(false);
        }
      };

      const loadFaqs = async () => {
        setLoadingFaqs(true);
        setFaqsError(null);
        try {
          const items = await serviceService.getFaqs(editingService.id);
          setServiceFaqsList(items || []);
        } catch (err: any) {
          console.error('Error fetching service FAQs:', err);
          setFaqsError('Failed to fetch FAQs.');
        } finally {
          setLoadingFaqs(false);
        }
      };

      loadGallery();
      loadFaqs();
    } else {
      setServiceGalleryList([]);
      setServiceFaqsList([]);
      setEditingFaqId(null);
    }
  }, [editingService?.id]);

  const handleAddGalleryImages = async (files: FileList) => {
    if (!editingService) return;
    setGalleryUploading(true);
    setGalleryError(null);
    try {
      const newItems: ServiceGalleryItem[] = [];
      let startOrder = serviceGalleryList.length > 0
        ? Math.max(...serviceGalleryList.map(item => item.display_order)) + 10
        : 10;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const publicUrl = await uploadImage(file);
        if (publicUrl) {
          newItems.push({
            id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            service_id: editingService.id,
            image_url: publicUrl,
            caption: file.name.split('.')[0] || '',
            alt_text: file.name.split('.')[0] || '',
            display_order: startOrder,
          });
          startOrder += 10;
        }
      }

      if (newItems.length > 0) {
        const updatedList = [...serviceGalleryList, ...newItems];
        setServiceGalleryList(updatedList);
        const result = await serviceService.saveGallery(editingService.id, updatedList);
        if (result.success) {
          const items = await serviceService.getGallery(editingService.id);
          setServiceGalleryList(items || []);
        } else {
          setGalleryError(result.error || 'Failed to save gallery item to database.');
        }
      }
    } catch (err: any) {
      console.error('Error uploading gallery images:', err);
      setGalleryError('Failed to upload some gallery images: ' + (err.message || err));
    } finally {
      setGalleryUploading(false);
    }
  };

  const handleAddGalleryByUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    setAddByUrlError(null);

    const url = addByUrlInput.trim();
    if (!url) {
      setAddByUrlError('Image URL is required.');
      return;
    }

    // Validate that the URL is a valid http/https image URL.
    if (!/^https?:\/\/.+/i.test(url)) {
      setAddByUrlError('Please enter a valid HTTP or HTTPS image URL.');
      return;
    }

    setGallerySaving(true);
    try {
      let startOrder = serviceGalleryList.length > 0
        ? Math.max(...serviceGalleryList.map(item => item.display_order)) + 10
        : 10;

      const newItem: ServiceGalleryItem = {
        id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        service_id: editingService.id,
        image_url: url,
        caption: addByUrlCaption.trim() || null,
        alt_text: addByUrlAltText.trim() || null,
        display_order: startOrder,
      };

      const updatedList = [...serviceGalleryList, newItem];
      setServiceGalleryList(updatedList);
      const result = await serviceService.saveGallery(editingService.id, updatedList);
      if (result.success) {
        const items = await serviceService.getGallery(editingService.id);
        setServiceGalleryList(items || []);
        // Reset states and close modal
        setAddByUrlInput('');
        setAddByUrlCaption('');
        setAddByUrlAltText('');
        setIsAddByUrlOpen(false);
      } else {
        setAddByUrlError(result.error || 'Failed to save gallery item to database.');
      }
    } catch (err: any) {
      console.error('Error adding gallery image by URL:', err);
      setAddByUrlError('Error: ' + (err.message || err));
    } finally {
      setGallerySaving(false);
    }
  };

  const handleReplaceUploadedFile = async (index: number, file: File) => {
    if (!editingService) return;
    setGalleryUploading(true);
    setReplaceError(null);
    setGalleryError(null);
    try {
      const publicUrl = await uploadImage(file);
      if (publicUrl) {
        const updatedList = [...serviceGalleryList];
        updatedList[index] = {
          ...updatedList[index],
          image_url: publicUrl
        };
        setServiceGalleryList(updatedList);
        const result = await serviceService.saveGallery(editingService.id, updatedList);
        if (result.success) {
          const items = await serviceService.getGallery(editingService.id);
          setServiceGalleryList(items || []);
          setReplacingGalleryItemIndex(null);
          setReplaceUrlInput('');
        } else {
          setReplaceError(result.error || 'Failed to save replaced gallery image.');
          setGalleryError(result.error || 'Failed to save replaced gallery image.');
        }
      }
    } catch (err: any) {
      console.error('Error replacing gallery image:', err);
      setReplaceError(err.message || 'Failed to replace image.');
      setGalleryError(err.message || 'Failed to replace image.');
    } finally {
      setGalleryUploading(false);
    }
  };

  const handleReplaceByUrl = async (index: number) => {
    if (!editingService) return;
    const url = replaceUrlInput.trim();
    if (!url) {
      setReplaceError('Image URL is required.');
      return;
    }
    if (!/^https?:\/\/.+/i.test(url)) {
      setReplaceError('Please enter a valid HTTP or HTTPS image URL.');
      return;
    }

    setGallerySaving(true);
    setReplaceError(null);
    setGalleryError(null);
    try {
      const updatedList = [...serviceGalleryList];
      updatedList[index] = {
        ...updatedList[index],
        image_url: url
      };
      setServiceGalleryList(updatedList);
      const result = await serviceService.saveGallery(editingService.id, updatedList);
      if (result.success) {
        const items = await serviceService.getGallery(editingService.id);
        setServiceGalleryList(items || []);
        setReplacingGalleryItemIndex(null);
        setReplaceUrlInput('');
      } else {
        setReplaceError(result.error || 'Failed to save replaced gallery image.');
        setGalleryError(result.error || 'Failed to save replaced gallery image.');
      }
    } catch (err: any) {
      console.error('Error replacing gallery image by URL:', err);
      setReplaceError(err.message || 'Failed to replace image.');
      setGalleryError(err.message || 'Failed to replace image.');
    } finally {
      setGallerySaving(false);
    }
  };

  const handleDeleteGalleryImage = (itemId: string) => {
    setGalleryImageToDelete(itemId);
  };

  const handleConfirmDeleteGalleryImage = async () => {
    if (!galleryImageToDelete || !editingService) return;
    setGallerySaving(true);
    setGalleryError(null);
    const targetId = galleryImageToDelete;
    const oldGalleryList = [...serviceGalleryList];

    // Optimistically update local state immediately
    setServiceGalleryList(prev => prev.filter(img => img.id !== targetId));
    setGalleryImageToDelete(null);

    try {
      const result = await serviceService.deleteGalleryImage(targetId);
      if (!result.success) {
        // Rollback on failure
        setServiceGalleryList(oldGalleryList);
        setGalleryError(result.error || 'Failed to delete gallery image.');
      }
    } catch (err: any) {
      console.error('Error deleting gallery image:', err);
      setServiceGalleryList(oldGalleryList);
      setGalleryError(err.message || 'Failed to delete gallery image.');
    } finally {
      setGallerySaving(false);
    }
  };

  const handleUpdateGalleryItem = async (index: number, updatedFields: Partial<ServiceGalleryItem>) => {
    const updatedList = [...serviceGalleryList];
    updatedList[index] = { ...updatedList[index], ...updatedFields };
    setServiceGalleryList(updatedList);

    if (editingService) {
      setGallerySaving(true);
      try {
        const result = await serviceService.saveGallery(editingService.id, updatedList);
        if (!result.success) {
          setGalleryError(result.error || 'Failed to save gallery item.');
        }
      } catch (err: any) {
        console.error('Error updating gallery item metadata:', err);
        setGalleryError('Error: ' + (err.message || err));
      } finally {
        setGallerySaving(false);
      }
    }
  };

  const handleGalleryDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleGalleryDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const items = [...serviceGalleryList];
    const draggedItem = items[draggedIndex];
    items.splice(draggedIndex, 1);
    items.splice(index, 0, draggedItem);

    const updatedItems = items.map((item, idx) => ({
      ...item,
      display_order: (idx + 1) * 10
    }));

    setServiceGalleryList(updatedItems);
    setDraggedIndex(index);
  };

  const handleGalleryDragEnd = async () => {
    setDraggedIndex(null);
    if (editingService) {
      setGallerySaving(true);
      try {
        const result = await serviceService.saveGallery(editingService.id, serviceGalleryList);
        if (!result.success) {
          setGalleryError(result.error || 'Failed to save gallery item.');
        }
      } catch (err: any) {
        console.error('Error saving reordered gallery:', err);
        setGalleryError('Error: ' + (err.message || err));
      } finally {
        setGallerySaving(false);
      }
    }
  };

  // Service FAQ Helper Handlers
  const handleAddFaq = () => {
    if (!editingService) return;
    const newFaqId = `new-faq-${Date.now()}`;
    const newFaq: ServiceFaq = {
      id: newFaqId,
      service_id: editingService.id,
      question: '',
      answer: '',
      display_order: serviceFaqsList.length > 0
        ? Math.max(...serviceFaqsList.map(f => f.display_order)) + 10
        : 10
    };
    setServiceFaqsList(prev => [...prev, newFaq]);
    setEditingFaqId(newFaqId);
    setFaqEditQuestion('');
    setFaqEditAnswer('');
  };

  const handleEditFaq = (faq: ServiceFaq) => {
    setEditingFaqId(faq.id);
    setFaqEditQuestion(faq.question);
    setFaqEditAnswer(faq.answer);
  };

  const handleSaveFaq = async (faqId: string) => {
    if (!editingService) return;
    if (!faqEditQuestion.trim() || !faqEditAnswer.trim()) {
      setFaqsError('Question and Answer cannot be empty.');
      return;
    }
    setFaqsSaving(true);
    setFaqsError(null);
    try {
      const updatedList = serviceFaqsList.map(faq => {
        if (faq.id === faqId) {
          return { ...faq, question: faqEditQuestion, answer: faqEditAnswer };
        }
        return faq;
      });
      setServiceFaqsList(updatedList);
      setEditingFaqId(null); // Close the form instantly

      const result = await serviceService.saveFaqs(editingService.id, updatedList);
      if (!result.success) {
        setFaqsError(result.error || 'Failed to save FAQs to database.');
      }
    } catch (err: any) {
      console.error('Error saving FAQ:', err);
      setFaqsError('Failed to save FAQ: ' + (err.message || err));
    } finally {
      setFaqsSaving(false);
    }
  };

  const handleCancelFaqEdit = (faqId: string) => {
    setEditingFaqId(null);
    setFaqsError(null);
    // If it was a newly added FAQ and was left completely blank, discard it
    const faq = serviceFaqsList.find(f => f.id === faqId);
    if (faq && faq.id.startsWith('new-faq-') && !faq.question && !faq.answer) {
      setServiceFaqsList(prev => prev.filter(f => f.id !== faqId));
    }
  };

  const handleDeleteFaq = async (faqId: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    setFaqsSaving(true);
    setFaqsError(null);
    const oldFaqsList = [...serviceFaqsList];

    // Optimistically update the UI instantly
    setServiceFaqsList(prev => prev.filter(f => f.id !== faqId));

    try {
      if (!faqId.startsWith('new-faq-')) {
        const result = await serviceService.deleteFaq(faqId);
        if (!result.success) {
          setServiceFaqsList(oldFaqsList);
          setFaqsError(result.error || 'Failed to delete FAQ record from database.');
        }
      }
    } catch (err: any) {
      console.error('Error deleting FAQ:', err);
      setServiceFaqsList(oldFaqsList);
      setFaqsError('Failed to delete FAQ: ' + (err.message || err));
    } finally {
      setFaqsSaving(false);
    }
  };

  const handleFaqDragStart = (index: number) => {
    setDraggedFaqIndex(index);
  };

  const handleFaqDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedFaqIndex === null || draggedFaqIndex === index) return;

    const items = [...serviceFaqsList];
    const draggedItem = items[draggedFaqIndex];
    items.splice(draggedFaqIndex, 1);
    items.splice(index, 0, draggedItem);

    const updatedItems = items.map((item, idx) => ({
      ...item,
      display_order: (idx + 1) * 10
    }));

    setServiceFaqsList(updatedItems);
    setDraggedFaqIndex(index);
  };

  const handleFaqDragEnd = async () => {
    setDraggedFaqIndex(null);
    if (editingService) {
      setFaqsSaving(true);
      try {
        const result = await serviceService.saveFaqs(editingService.id, serviceFaqsList);
        if (!result.success) {
          setFaqsError(result.error || 'Failed to save FAQs.');
        }
      } catch (err: any) {
        console.error('Error saving reordered FAQs:', err);
        setFaqsError('Error: ' + (err.message || err));
      } finally {
        setFaqsSaving(false);
      }
    }
  };

  // Service Media Tab state helpers
  const handleAddContentImage = async (files: FileList | null, url?: string) => {
    if (!editingService) return;
    const currentList = Array.isArray(editingService.content_images) ? editingService.content_images : [];
    const updated = [...currentList];
    let startOrder = currentList.length > 0 ? Math.max(...currentList.map((c: any) => Number(c.display_order || 0))) + 10 : 10;

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const publicUrl = await uploadImage(file);
        if (publicUrl) {
          updated.push({
            image_url: publicUrl,
            caption: file.name.split('.')[0] || '',
            alt_text: file.name.split('.')[0] || '',
            display_order: startOrder,
          });
          startOrder += 10;
        }
      }
    } else if (url) {
      updated.push({
        image_url: url,
        caption: 'New Image',
        alt_text: 'Service content section image',
        display_order: startOrder,
      });
    }

    setEditingService({ ...editingService, content_images: updated });
  };

  const handleAddTestimonial = () => {
    if (!editingService) return;
    const currentList = Array.isArray(editingService.patient_testimonials) ? editingService.patient_testimonials : [];
    const startOrder = currentList.length > 0 ? Math.max(...currentList.map((t: any) => Number(t.display_order || 0))) + 10 : 10;
    const updated = [
      ...currentList,
      {
        video_url: '',
        patient_name: '',
        treatment_name: '',
        short_review: '',
        display_order: startOrder
      }
    ];
    setEditingService({ ...editingService, patient_testimonials: updated });
  };

  const handleUploadTestimonialVideo = async (index: number, file: File) => {
    if (!editingService) return;
    try {
      const publicUrl = await uploadImage(file);
      if (publicUrl) {
        const currentList = Array.isArray(editingService.patient_testimonials) ? editingService.patient_testimonials : [];
        const updated = [...currentList];
        updated[index] = { ...updated[index], video_url: publicUrl };
        setEditingService({ ...editingService, patient_testimonials: updated });
      }
    } catch (e: any) {
      console.error(e);
      setServiceFormError('Video upload failed: ' + (e.message || String(e)));
    }
  };

  const handleAddTeamPhoto = async (files: FileList | null, url?: string) => {
    if (!editingService) return;
    const currentList = Array.isArray(editingService.hospital_team_photos) ? editingService.hospital_team_photos : [];
    const updated = [...currentList];
    let startOrder = currentList.length > 0 ? Math.max(...currentList.map((t: any) => Number(t.display_order || 0))) + 10 : 10;

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const publicUrl = await uploadImage(file);
        if (publicUrl) {
          updated.push({
            image_url: publicUrl,
            title: file.name.split('.')[0] || '',
            caption: '',
            display_order: startOrder,
          });
          startOrder += 10;
        }
      }
    } else if (url) {
      updated.push({
        image_url: url,
        title: 'New Photo',
        caption: '',
        display_order: startOrder,
      });
    }

    setEditingService({ ...editingService, hospital_team_photos: updated });
  };

  // Media local interactive states
  const [activeMediaTab, setActiveMediaTab] = useState<'gallery' | 'smiles' | 'videos'>('gallery');
  const [categories, setCategories] = useState<string[]>([
    'Homepage Slider',
    'Homepage Gallery',
    'Dental Implants',
    'Full Mouth Rehabilitation',
    'Clear Aligners',
    'Root Canal',
    'Smile Makeover',
    'Clinic Interior',
    'Doctors',
    'Patient Testimonials',
    'Before / After',
    'Hidden'
  ]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

  const [mediaVideos, setMediaVideos] = useState<Array<{ id: string; youtubeUrl: string; title: string; thumbnail: string }>>([
    { id: 'vid-1', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Full Mouth Dental Implant Treatment Testimonial', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg' },
    { id: 'vid-2', youtubeUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U', title: 'Same Day Smile Restoration Experience', thumbnail: 'https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg' },
    { id: 'vid-3', youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4', title: 'Aesthetic Veneers Case Study - Patel Dental', thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg' },
  ]);

  const [previewImage, setPreviewImage] = useState<{ id: string; url: string; title: string; category?: string; branch?: string; altText?: string } | null>(null);
  const [videoDrawerOpen, setVideoDrawerOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<{ id: string; youtubeUrl: string; title: string; thumbnail: string } | null>(null);
  const [contactSaved, setContactSaved] = useState(false);
  const [videoUrlInput, setVideoUrlInput] = useState('');

  // Image Edit Drawer states
  const [imageDrawerOpen, setImageDrawerOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<{ id: string; url: string; title: string; category: string; branch: string; altText?: string } | null>(null);
  const [drawerImageUrl, setDrawerImageUrl] = useState('');
  const [drawerImageTitle, setDrawerImageTitle] = useState('');
  const [drawerImageCategory, setDrawerImageCategory] = useState('Homepage Gallery');
  const [drawerImageBranch, setDrawerImageBranch] = useState('All Branches');
  const [drawerImageAltText, setDrawerImageAltText] = useState('');

  // Synchronize draftDoctors when props change
  useEffect(() => {
    setDraftDoctors(doctorsList);
  }, [doctorsList]);

  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingMobile, setIsDraggingMobile] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Keep draft states updated if the props change (e.g. from outer system)
  useEffect(() => {
    setDraftHeading(heroHeading);
  }, [heroHeading]);

  useEffect(() => {
    setDraftDescription(heroDescription);
  }, [heroDescription]);

  useEffect(() => {
    setDraftBgImage(heroBgImage);
  }, [heroBgImage]);

  useEffect(() => {
    setDraftBgImageMobile(heroBgImageMobile);
  }, [heroBgImageMobile]);

  // Tabs config
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'hero', label: 'Hero', icon: Sparkles },
    { id: 'doctors', label: 'Doctors', icon: Users },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'appointments', label: 'Appointments', icon: CalendarDays },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'services', label: 'Services', icon: Stethoscope },
  ] as const;

  const handleLogout = async () => {
    try {
      await supabase.client.auth.signOut();
    } catch (err) {
      console.warn('Error signing out:', err);
    }
    // Return to public homepage view
    setCurrentPage('home');
    window.location.hash = 'home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Upload handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], 'desktop');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], 'desktop');
    }
  };

  // Mobile upload handlers
  const handleDragOverMobile = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingMobile(true);
  };

  const handleDragLeaveMobile = () => {
    setIsDraggingMobile(false);
  };

  const handleDropMobile = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingMobile(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], 'mobile');
    }
  };

  const handleFileInputMobile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], 'mobile');
    }
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleFile = async (file: File, target: 'desktop' | 'mobile' = 'desktop') => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }

    // Inform user if the file is quite large
    if (file.size > 2 * 1024 * 1024) {
      alert('Warning: This image file is quite large (' + (file.size / (1024 * 1024)).toFixed(1) + 'MB). For optimal rendering performance, please consider using an image under 2MB.');
    }

    try {
      const imageUrl = await uploadImage(file);
      if (target === 'desktop') {
        setDraftBgImage(imageUrl);
        setSaveMessage('Hero background image (Desktop) uploaded successfully!');
      } else {
        setDraftBgImageMobile(imageUrl);
        setSaveMessage('Hero background image (Mobile) uploaded successfully!');
      }
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err: any) {
      console.warn('Supabase storage upload failed, falling back to local Base64 storage:', err);
      try {
        const localDataUrl = await readFileAsDataURL(file);
        if (target === 'desktop') {
          setDraftBgImage(localDataUrl);
          setSaveMessage('Notice: The Desktop image was loaded locally because the Supabase storage connection is restricted or offline.');
        } else {
          setDraftBgImageMobile(localDataUrl);
          setSaveMessage('Notice: The Mobile image was loaded locally because the Supabase storage connection is restricted or offline.');
        }
        setTimeout(() => setSaveMessage(null), 5000);
      } catch (fallbackErr: any) {
        console.error('Local fallback failed:', fallbackErr);
        alert('Failed to upload to Supabase and failed to read file locally: ' + (fallbackErr.message || fallbackErr));
      }
    }
  };

  const handleResetImage = () => {
    setDraftBgImage('');
  };

  const handleResetImageMobile = () => {
    setDraftBgImageMobile('');
  };

  // Save changes
  const handleSave = async () => {
    setSaveMessage('Saving Hero content...');
    const oldHeading = heroHeading;
    const oldDescription = heroDescription;
    const oldBgImage = heroBgImage;
    const oldBgImageMobile = heroBgImageMobile;

    // Optimistically update parent-level states immediately
    setHeroHeading(draftHeading);
    setHeroDescription(draftDescription);
    setHeroBgImage(draftBgImage);
    setHeroBgImageMobile(draftBgImageMobile);

    try {
      // Pack both images as a JSON string to keep database backward compatibility
      const packedBgImage = JSON.stringify({
        desktop: draftBgImage,
        mobile: draftBgImageMobile
      });

      const success = await heroService.saveHeroContent({
        heading: draftHeading,
        description: draftDescription,
        bg_image: packedBgImage
      });

      if (success) {
        setSaveMessage('Hero section saved to Supabase successfully! Your website is updated.');
      } else {
        // Rollback on failure
        setHeroHeading(oldHeading);
        setHeroDescription(oldDescription);
        setHeroBgImage(oldBgImage);
        setHeroBgImageMobile(oldBgImageMobile);
        setSaveMessage('Failed to save Hero content to Supabase. Check your connection or table setup.');
      }
    } catch (err: any) {
      console.error('Error saving Hero content to Supabase:', err);
      setHeroHeading(oldHeading);
      setHeroDescription(oldDescription);
      setHeroBgImage(oldBgImage);
      setHeroBgImageMobile(oldBgImageMobile);
      setSaveMessage('Error saving Hero content: ' + (err.message || err));
    } finally {
      setTimeout(() => setSaveMessage(null), 4000);
    }
  };

  // Discard changes
  const handleCancel = () => {
    setDraftHeading(heroHeading);
    setDraftDescription(heroDescription);
    setDraftBgImage(heroBgImage);
    setDraftBgImageMobile(heroBgImageMobile);
    setSaveMessage('Changes discarded.');
    setTimeout(() => setSaveMessage(null), 2500);
  };

  const renderTabContent = () => {
    // Dynamically calculate clinical counts for statistics
    const totalDoctors = doctorsList?.length || 0;
    const totalImages = mediaImages?.length || 0;
    const totalVideos = videosList?.length || 0;
    
    // Dynamically calculate unique branches
    const uniqueBranchesList = Array.from(
      new Set(
        [
          ...(doctorsList || []).map((d) => d.branch),
          ...(mediaImages || []).map((m) => m.branch)
        ]
          .filter((b): b is string => typeof b === 'string' && b.trim() !== '' && b !== 'All Branches' && b !== 'Select Branch')
      )
    );
    const totalBranches = uniqueBranchesList.length > 0 ? uniqueBranchesList.length : 2;

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6" id="admin-dashboard-view">
            {/* Upper Info Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08)]">
              <div>
                <h1 className="text-xl md:text-2xl font-bold font-display text-slate-900" id="admin-tab-title">
                  Dashboard Overview
                </h1>
                <p className="text-slate-500 text-xs md:text-sm mt-1">
                  Welcome back! Monitor systems, content items, and active hospital settings.
                </p>
              </div>
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <div className="text-xs text-[#0D9488] bg-[#F0FDFA] border border-[#CCFBF1] px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-[#0D9488] animate-pulse" />
                  <span className="font-semibold uppercase tracking-wider text-[10px]">Portal: Online</span>
                </div>
              </div>
            </div>

            {/* Summary Cards Grid (Responsive 1 -> 2 -> 4 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="admin-summary-cards">
              {/* Card 1: Doctors */}
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08),0_2px_4px_-1px_rgba(148,163,184,0.04)] hover:shadow-[0_12px_24px_-8px_rgba(148,163,184,0.15)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-teal-500 transition-all duration-300 group-hover:h-full group-hover:w-1.5" />
                <div className="space-y-2 pl-2">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Doctors</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{totalDoctors}</span>
                    <span className="text-xs text-slate-500 font-medium">Specialists</span>
                  </div>
                  <span className="text-[11px] text-teal-600 font-semibold flex items-center gap-1.5 mt-1">
                    <UserCheck className="h-3.5 w-3.5 text-teal-500" />
                    <span>Clinic rosters active</span>
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-teal-50 text-teal-600 transition-all duration-300 group-hover:bg-teal-100 group-hover:scale-110 shrink-0 shadow-3xs">
                  <Stethoscope className="h-6 w-6" />
                </div>
              </div>

              {/* Card 2: Images */}
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08),0_2px_4px_-1px_rgba(148,163,184,0.04)] hover:shadow-[0_12px_24px_-8px_rgba(148,163,184,0.15)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 transition-all duration-300 group-hover:h-full group-hover:w-1.5" />
                <div className="space-y-2 pl-2">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Images</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{totalImages}</span>
                    <span className="text-xs text-slate-500 font-medium">Assets</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1.5 mt-1">
                    <ImageIcon className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Gallery uploads</span>
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-100 group-hover:scale-110 shrink-0 shadow-3xs">
                  <ImageIcon className="h-6 w-6" />
                </div>
              </div>

              {/* Card 3: Videos */}
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08),0_2px_4px_-1px_rgba(148,163,184,0.04)] hover:shadow-[0_12px_24px_-8px_rgba(148,163,184,0.15)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-sky-500 transition-all duration-300 group-hover:h-full group-hover:w-1.5" />
                <div className="space-y-2 pl-2">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Videos</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{totalVideos}</span>
                    <span className="text-xs text-slate-500 font-medium">Features</span>
                  </div>
                  <span className="text-[11px] text-sky-600 font-semibold flex items-center gap-1.5 mt-1">
                    <Video className="h-3.5 w-3.5 text-sky-500" />
                    <span>Patient testimonials</span>
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-sky-50 text-sky-600 transition-all duration-300 group-hover:bg-sky-100 group-hover:scale-110 shrink-0 shadow-3xs">
                  <Video className="h-6 w-6" />
                </div>
              </div>

              {/* Card 4: Branches */}
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08),0_2px_4px_-1px_rgba(148,163,184,0.04)] hover:shadow-[0_12px_24px_-8px_rgba(148,163,184,0.15)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-violet-500 transition-all duration-300 group-hover:h-full group-hover:w-1.5" />
                <div className="space-y-2 pl-2">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Branches</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{totalBranches}</span>
                    <span className="text-xs text-slate-500 font-medium">Branches</span>
                  </div>
                  <span className="text-[11px] text-violet-600 font-semibold flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-violet-500" />
                    <span>Gayatrinagar & Amin Marg HQ</span>
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-violet-50 text-violet-600 transition-all duration-300 group-hover:bg-violet-100 group-hover:scale-110 shrink-0 shadow-3xs">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Premium Full-Width Information Panel */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="space-y-1">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Clinical Entity</span>
                  <h3 className="text-base md:text-lg font-bold font-display text-slate-800 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-teal-600" />
                    <span>Patel Dental Hospital</span>
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100 text-emerald-700 text-xs font-semibold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Website Status: Online</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-100 text-slate-500 text-xs font-medium">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>Last Updated: Today</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 md:pt-8">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Contact & Inquiry</h4>
                  <div className="space-y-3.5 text-sm text-slate-600">
                    <div className="flex items-center gap-2.5">
                      <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="font-medium">{contactInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="font-medium">{contactInfo.email}</span>
                    </div>
                  </div>
                </div>

                {/* Primary Address */}
                <div className="space-y-4 md:col-span-2">
                  <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Hospital Headquarters</h4>
                  <div className="flex items-start gap-2.5 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{contactInfo.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'hero':
        return (
          <div className="space-y-6" id="admin-hero-view">
            {/* Header */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-3xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold font-display text-slate-900" id="admin-tab-title">
                  Hero Section
                </h1>
                <p className="text-slate-500 text-xs md:text-sm mt-1">
                  Connect and customize your dental hospital's main tagline, welcome text, and background banner image.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl flex items-center gap-1.5 transition duration-200 shadow-3xs cursor-pointer"
                >
                  <Eye className="h-4 w-4 text-slate-500" />
                  <span>Preview Layout</span>
                </button>
              </div>
            </div>

            {/* Feedback Message */}
            {saveMessage && (
              <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 border animate-fade-in ${
                saveMessage.includes('successfully') 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                  : 'bg-blue-50 border-blue-200 text-blue-800'
              }`}>
                <Check className="h-4 w-4 shrink-0" />
                <span>{saveMessage}</span>
              </div>
            )}

            {/* Input Forms Card */}
            <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-3xs space-y-6">
              {/* Heading Textarea */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Hero Heading
                </label>
                <textarea
                  value={draftHeading}
                  onChange={(e) => setDraftHeading(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium transition"
                  placeholder="Enter the hero title. Use newlines to break lines elegantly..."
                />
                <p className="text-slate-400 text-[11px]">
                  Supports multi-line linebreaks. Keep it concise, strong, and highly visible.
                </p>
              </div>

              {/* Description Textarea */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Hero Description (Mobile & Tablet)
                </label>
                <textarea
                  value={draftDescription}
                  onChange={(e) => setDraftDescription(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium transition"
                  placeholder="Enter a brief subtext or subtitle message..."
                />
                <p className="text-slate-400 text-[11px]">
                  Displayed below the headline on mobile and tablet views.
                </p>
              </div>

              {/* Desktop Background Image Upload Zone */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Hero Background Image (Desktop)
                </label>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Drag and Drop Zone */}
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                      lg:col-span-7 border-2 border-dashed rounded-2xl p-6 text-center flex flex-col items-center justify-center space-y-3 transition-all duration-200 min-h-[180px]
                      ${isDragging 
                        ? 'border-blue-500 bg-blue-50/50' 
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'}
                    `}
                  >
                    <div className="h-10 w-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
                      <Upload className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-700">
                        Drag and drop your desktop background image here, or{' '}
                        <label htmlFor="hero-bg-file-input" className="text-blue-600 hover:underline cursor-pointer">
                          browse file
                        </label>
                        <input 
                          type="file" 
                          id="hero-bg-file-input"
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleFileInput}
                        />
                      </p>
                      <p className="text-[10px] text-slate-400">
                        PNG, JPG, JPEG or WEBP formats. High resolution recommended.
                      </p>
                    </div>
                  </div>

                  {/* Image Preview Window */}
                  <div className="lg:col-span-5 bg-slate-50 border border-slate-150 rounded-2xl p-4 flex flex-col justify-between min-h-[180px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                      Desktop Image Preview
                    </span>

                    {draftBgImage ? (
                      <div className="space-y-3 flex-grow flex flex-col justify-between">
                        <div className="relative rounded-lg overflow-hidden border border-slate-200 h-[100px] w-full bg-slate-100 shadow-3xs">
                          <img 
                            src={draftBgImage} 
                            alt="Custom Desktop Background Preview" 
                            className="w-full h-full object-cover object-center"
                            referrerPolicy="no-referrer"
                          />
                          <button
                            type="button"
                            onClick={handleResetImage}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition shadow-xs cursor-pointer"
                            title="Remove image"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span className="font-semibold text-emerald-600 flex items-center gap-1">
                            <Check className="h-3.5 w-3.5" /> Desktop image loaded
                          </span>
                          <button 
                            type="button" 
                            onClick={handleResetImage}
                            className="text-rose-600 hover:underline font-semibold cursor-pointer"
                          >
                            Reset to default
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-grow flex flex-col items-center justify-center text-center text-slate-400 py-4">
                        <ImageIcon className="h-8 w-8 text-slate-300 mb-2" />
                        <p className="text-[11px] font-medium">Using hospital standard Desktop template</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">(/parel doctor.png)</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Background Image Upload Zone */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Hero Background Image (Mobile)
                </label>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Drag and Drop Zone */}
                  <div 
                    onDragOver={handleDragOverMobile}
                    onDragLeave={handleDragLeaveMobile}
                    onDrop={handleDropMobile}
                    className={`
                      lg:col-span-7 border-2 border-dashed rounded-2xl p-6 text-center flex flex-col items-center justify-center space-y-3 transition-all duration-200 min-h-[180px]
                      ${isDraggingMobile 
                        ? 'border-blue-500 bg-blue-50/50' 
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'}
                    `}
                  >
                    <div className="h-10 w-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
                      <Upload className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-700">
                        Drag and drop your mobile background image here, or{' '}
                        <label htmlFor="hero-bg-mobile-file-input" className="text-blue-600 hover:underline cursor-pointer">
                          browse file
                        </label>
                        <input 
                          type="file" 
                          id="hero-bg-mobile-file-input"
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleFileInputMobile}
                        />
                      </p>
                      <p className="text-[10px] text-slate-400">
                        PNG, JPG, JPEG or WEBP formats. High resolution recommended.
                      </p>
                    </div>
                  </div>

                  {/* Image Preview Window */}
                  <div className="lg:col-span-5 bg-slate-50 border border-slate-150 rounded-2xl p-4 flex flex-col justify-between min-h-[180px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                      Mobile Image Preview
                    </span>

                    {draftBgImageMobile ? (
                      <div className="space-y-3 flex-grow flex flex-col justify-between">
                        <div className="relative rounded-lg overflow-hidden border border-slate-200 h-[100px] w-full bg-slate-100 shadow-3xs">
                          <img 
                            src={draftBgImageMobile} 
                            alt="Custom Mobile Background Preview" 
                            className="w-full h-full object-cover object-center"
                            referrerPolicy="no-referrer"
                          />
                          <button
                            type="button"
                            onClick={handleResetImageMobile}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition shadow-xs cursor-pointer"
                            title="Remove image"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span className="font-semibold text-emerald-600 flex items-center gap-1">
                            <Check className="h-3.5 w-3.5" /> Mobile image loaded
                          </span>
                          <button 
                            type="button" 
                            onClick={handleResetImageMobile}
                            className="text-rose-600 hover:underline font-semibold cursor-pointer"
                          >
                            Reset to default
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-grow flex flex-col items-center justify-center text-center text-slate-400 py-4">
                        <ImageIcon className="h-8 w-8 text-slate-300 mb-2" />
                        <p className="text-[11px] font-medium">Using fallback Desktop image</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">({draftBgImage ? 'Custom Desktop Image' : '/patel mobile hero.jpeg'})</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Operational Action Buttons Bar */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Cancel Changes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/10 transition duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Check className="h-4 w-4" />
                  <span>Save Updates</span>
                </button>
              </div>
            </div>
          </div>
        );
      case 'doctors': {
        const hasDoctorsChanges = JSON.stringify(draftDoctors) !== JSON.stringify(doctorsList);

        const handleAddDoctorClick = () => {
          setEditingDoctor({
            id: `doc-${Date.now()}`,
            name: '',
            titles: 'BDS',
            designation: '',
            img: '/Dr kinjal patel 2.png',
            briefIntro: '',
            quote: '',
            bdsYear: '2015',
            bdsInstitution: 'Dental College Graduate',
            stats: [],
            expertises: [],
            branch: 'Amin Marg Branch',
            experience: '5'
          });
        };

        const handleEditDoctorClick = (doctor: Doctor) => {
          setEditingDoctor({ ...doctor });
        };

        const handleDeleteDoctor = (id: string) => {
          setDoctorToDelete(id);
        };

        const handleApplyDoctorChanges = () => {
          if (!editingDoctor) return;
          if (!editingDoctor.name.trim()) {
            alert("Please enter the doctor's full name.");
            return;
          }

          // Generate professional credentials/stats automatically
          const expNum = parseInt(editingDoctor.experience || '10') || 10;
          const graduationYear = (2026 - expNum).toString();
          
          const stats = [
            { value: graduationYear, label: 'BDS Degree' },
            { value: `${(expNum * 1.5).toFixed(0)}k+`, label: 'Smiles Transformed' },
            { value: '100%', label: 'Sterilization Standard' },
            { value: `${expNum}+`, label: 'Years Experience' }
          ];

          const expertises = editingDoctor.expertises && editingDoctor.expertises.length > 0 ? editingDoctor.expertises : [
            {
              title: `${editingDoctor.designation || 'General Dentistry'} Specialization`,
              desc: editingDoctor.briefIntro || `Expert in performing advanced procedures in dental restoration, pain management and sterile protocols.`
            },
            {
              title: 'Painless Clinical Treatments',
              desc: 'Highly structured and customized pain-free operations matching biological dental structures and sterile safety protocols.'
            }
          ];

          const quote = editingDoctor.quote || `${editingDoctor.name} is committed to providing patient-focused dental care with modern technology and advanced treatment planning.`;

          const updatedDoctor: Doctor = {
            ...editingDoctor,
            bdsYear: graduationYear,
            bdsInstitution: editingDoctor.bdsInstitution || 'Dental College Graduate',
            stats,
            expertises,
            quote
          };

          const exists = draftDoctors.some(d => d.id === updatedDoctor.id);
          if (exists) {
            setDraftDoctors(draftDoctors.map(d => d.id === updatedDoctor.id ? updatedDoctor : d));
          } else {
            setDraftDoctors([...draftDoctors, updatedDoctor]);
          }

          setEditingDoctor(null);
        };

        const handleSaveDoctors = async () => {
          setSaveMessage('Saving doctors directory to Supabase...');
          const oldDoctorsList = [...doctorsList];
          
          // Optimistically update the primary doctorsList immediately
          setDoctorsList(draftDoctors);

          try {
            const success = await doctorService.saveDoctors(draftDoctors);
            if (success) {
              setSaveMessage('Doctors directory saved to Supabase successfully! Public website updated.');
            } else {
              // Rollback on failure
              setDoctorsList(oldDoctorsList);
              setSaveMessage('Failed to save doctors to Supabase. Check your connection or table setup.');
            }
          } catch (err: any) {
            console.error('Error saving doctors to Supabase:', err);
            setDoctorsList(oldDoctorsList);
            setSaveMessage('Error saving doctors: ' + (err.message || err));
          } finally {
            setTimeout(() => setSaveMessage(null), 4000);
          }
        };

        const handleCancelDoctors = () => {
          setDraftDoctors(doctorsList);
          setSaveMessage('Doctors catalog changes discarded.');
          setTimeout(() => setSaveMessage(null), 2500);
        };

        const handleDocPhotoDrop = (e: React.DragEvent) => {
          e.preventDefault();
          setDocPhotoDragging(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0] && editingDoctor) {
            const file = e.dataTransfer.files[0];
            if (!file.type.startsWith('image/')) {
              alert('Please upload a valid image file.');
              return;
            }
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result === 'string') {
                setEditingDoctor(prev => prev ? { ...prev, img: reader.result as string } : null);
              }
            };
            reader.readAsDataURL(file);
          }
        };

        const handleDocPhotoFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0] && editingDoctor) {
            const file = e.target.files[0];
            if (!file.type.startsWith('image/')) {
              alert('Please upload a valid image file.');
              return;
            }
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result === 'string') {
                setEditingDoctor(prev => prev ? { ...prev, img: reader.result as string } : null);
              }
            };
            reader.readAsDataURL(file);
          }
        };

        return (
          <div className="space-y-6" id="admin-doctors-view">
            {/* 1. Header Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-3xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold font-display text-slate-900" id="admin-tab-title">
                  Doctors Directory
                </h1>
                <p className="text-slate-500 text-xs md:text-sm mt-1">
                  Configure medical staff rosters, branch allocations, qualification tags, and short intros.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddDoctorClick}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/10 transition duration-200 cursor-pointer self-start sm:self-auto"
                id="add-new-doctor-btn"
              >
                <Plus className="h-4 w-4" />
                <span>Add Doctor</span>
              </button>
            </div>

            {/* 2. Unsaved Changes Sticky Alert Banner */}
            {hasDoctorsChanges && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-lg">⚠️</span>
                  <div>
                    <h4 className="font-bold text-amber-900 text-sm">Unsaved Changes in Doctors Directory</h4>
                    <p className="text-amber-700 text-xs mt-0.5">
                      You have made modifications to doctor profiles. Please save changes to push them to the public website.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button
                    type="button"
                    onClick={handleCancelDoctors}
                    className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer w-full sm:w-auto"
                  >
                    Cancel Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveDoctors}
                    className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-1.5 w-full sm:w-auto"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* 3. Doctors Card List */}
            {draftDoctors.length === 0 ? (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-3">
                <div className="text-3xl">👥</div>
                <h3 className="font-bold text-slate-800 text-base">No Doctors Registered</h3>
                <p className="text-slate-500 text-xs max-w-md mx-auto">
                  All medical clinician profiles have been removed. Click the "+ Add Doctor" button above to register your first clinical specialist.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="doctors-draft-grid">
                {draftDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition duration-200"
                  >
                    <div className="flex items-center gap-5">
                      {/* Rounded Doctor Photo (80x80) */}
                      <img
                        src={doc.img || '/Dr kinjal patel 2.png'}
                        alt={doc.name}
                        className="w-20 h-20 rounded-full object-cover shrink-0 border border-slate-100 shadow-xs"
                      />

                      {/* Info Block */}
                      <div className="min-w-0">
                        <h3 className="font-display font-bold text-slate-900 text-base md:text-lg leading-snug truncate">
                          👨‍⚕️ {doc.name || 'Unnamed Doctor'}
                        </h3>
                        <p className="text-xs md:text-sm text-blue-600 font-semibold mt-1">
                          {doc.designation || 'Specialization'}
                        </p>
                        <div className="flex items-center gap-1 text-slate-500 mt-2 font-medium">
                          <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                          <span className="text-[11px] leading-none text-slate-600">{doc.branch}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Panel */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleDeleteDoctor(doc.id)}
                        className="text-xs font-semibold text-slate-400 hover:text-red-600 transition-colors py-1 cursor-pointer"
                        title="Delete Doctor"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEditDoctorClick(doc)}
                        className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition duration-150 cursor-pointer flex items-center gap-1"
                      >
                        <Pencil className="h-3 w-3" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. Edit Right Side Slide Drawer */}
            {editingDoctor && (
              <div className="fixed inset-0 z-100 flex justify-end" id="doctor-drawer-overlay">
                {/* Backdrop overlay with fade */}
                <div
                  className="fixed inset-0 bg-[#0B1B33]/55 backdrop-blur-xs transition-opacity duration-300"
                  onClick={() => setEditingDoctor(null)}
                />

                {/* Right Drawer Box */}
                <div className="relative w-full md:w-[750px] bg-white h-full shadow-2xl flex flex-col z-110 border-l border-slate-100 animate-slide-in">
                  {/* Drawer Header */}
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                    <div className="flex items-center gap-3">
                      {/* ← Back Button */}
                      <button
                        type="button"
                        onClick={() => setEditingDoctor(null)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-xs font-bold shadow-3xs cursor-pointer transition duration-150 shrink-0"
                      >
                        <ArrowLeft className="h-3.5 w-3.5 text-slate-500" />
                        <span>← Back</span>
                      </button>
                      
                      <div className="min-w-0">
                        <h3 className="font-display font-extrabold text-[#081C3A] text-base md:text-lg leading-tight">
                          {draftDoctors.some(d => d.id === editingDoctor.id) ? 'Edit Doctor Profile' : 'Add New Doctor'}
                        </h3>
                        <p className="text-slate-500 text-[11px] font-medium mt-0.5 truncate flex items-center gap-1">
                          <span className="font-bold text-blue-600">Editing:</span>
                          <span className="font-semibold text-slate-700">
                            {editingDoctor.name || 'New Profile'}
                          </span>
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingDoctor(null)}
                      className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Scrollable Form & Live Preview container */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Beautiful Live Doctor Preview Card */}
                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/80 space-y-2.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">Live Doctor Preview</span>
                      
                      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 max-w-[275px] mx-auto flex flex-col items-center text-center transition-all duration-200">
                        <div className="relative mb-3.5">
                          <img
                            src={editingDoctor.img || '/Dr kinjal patel 2.png'}
                            alt={editingDoctor.name || 'Preview'}
                            className="w-[100px] h-[100px] rounded-full object-cover shrink-0 border-2 border-blue-500/10 shadow-sm"
                          />
                          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-blue-50 text-blue-600 border border-blue-200 text-[9px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">
                            👨‍⚕️ Preview
                          </span>
                        </div>
                        <h4 className="font-display font-extrabold text-slate-900 text-base leading-tight truncate w-full">
                          {editingDoctor.name || 'Dr. Professional Name'}
                        </h4>
                        <p className="text-xs text-blue-600 font-bold mt-1.5 uppercase tracking-wide leading-none truncate w-full">
                          {editingDoctor.designation || 'Specialization'}
                        </p>
                        <div className="flex items-center justify-center gap-1.5 text-slate-500 mt-3 font-semibold text-[11px] leading-none bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                          <MapPin className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                          <span className="text-slate-600">{editingDoctor.branch || 'Select Branch'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      {/* Doctor Photo Upload Section */}
                      <div className="bg-slate-50/60 rounded-2xl border border-slate-100 p-4 space-y-3">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Doctor Photo Upload</span>
                        <div className="flex items-center gap-4">
                          {/* Current Photo */}
                          <div className="flex flex-col items-center gap-1 shrink-0">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Current Photo</span>
                            <div className="h-14 w-14 rounded-full overflow-hidden bg-white border border-slate-200 shadow-sm">
                              <img
                                src={editingDoctor.img || '/Dr kinjal patel 2.png'}
                                alt="Current"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Compact Drag & Drop Zone */}
                          <div
                            onDragOver={(e) => { e.preventDefault(); setDocPhotoDragging(true); }}
                            onDragLeave={() => setDocPhotoDragging(false)}
                            onDrop={handleDocPhotoDrop}
                            className={`flex-1 h-16 border border-dashed rounded-xl flex items-center justify-center bg-white transition duration-150 cursor-pointer ${
                              docPhotoDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <input
                              type="file"
                              id="doc-photo-file-input"
                              accept="image/*"
                              onChange={handleDocPhotoFileInput}
                              className="hidden"
                            />
                            <label htmlFor="doc-photo-file-input" className="cursor-pointer flex items-center gap-2 px-3 py-1.5 w-full h-full justify-center">
                              <Upload className="h-4 w-4 text-blue-500 shrink-0" />
                              <div className="text-left leading-tight">
                                <span className="text-xs font-bold text-blue-600 block hover:underline">
                                  Upload New Photo
                                </span>
                                <span className="text-[9px] text-slate-400 block mt-0.5">
                                  or drag & drop here
                                </span>
                              </div>
                            </label>
                          </div>
                        </div>

                        {/* Fallback URL input field */}
                        <div className="space-y-1">
                          <span className="text-[9px] text-slate-400 font-bold block">Or use relative path or photo URL:</span>
                          <input
                            type="text"
                            value={editingDoctor.img}
                            onChange={(e) => setEditingDoctor({ ...editingDoctor, img: e.target.value })}
                            placeholder="e.g. /Dr kinjal patel 2.png"
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-mono text-slate-500 bg-white"
                          />
                        </div>
                      </div>

                      {/* Full Name & Qualification */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Full Name</label>
                          <input
                            type="text"
                            value={editingDoctor.name}
                            onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                            placeholder="e.g. Dr. Vipul Patel"
                            className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold bg-white"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Qualification</label>
                          <input
                            type="text"
                            value={editingDoctor.titles}
                            onChange={(e) => setEditingDoctor({ ...editingDoctor, titles: e.target.value })}
                            placeholder="e.g. BDS, MDS"
                            className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold bg-white"
                          />
                        </div>
                      </div>

                      {/* Specialization & Experience */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Specialization</label>
                          <input
                            type="text"
                            value={editingDoctor.designation}
                            onChange={(e) => setEditingDoctor({ ...editingDoctor, designation: e.target.value })}
                            placeholder="e.g. Implantologist"
                            className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold bg-white"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Experience (Years)</label>
                          <input
                            type="text"
                            value={editingDoctor.experience || ''}
                            onChange={(e) => setEditingDoctor({ ...editingDoctor, experience: e.target.value })}
                            placeholder="e.g. 18"
                            className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold bg-white"
                          />
                        </div>
                      </div>

                      {/* Branch Assignment */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Branch Assignment</label>
                        <select
                          value={editingDoctor.branch}
                          onChange={(e) => setEditingDoctor({ ...editingDoctor, branch: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white font-semibold cursor-pointer"
                        >
                          <option value="Gayatrinagar Branch">Gayatrinagar Branch</option>
                          <option value="Amin Marg Branch">Amin Marg Branch</option>
                        </select>
                      </div>

                      {/* Short Description */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Short Description</label>
                        <textarea
                          value={editingDoctor.briefIntro}
                          onChange={(e) => setEditingDoctor({ ...editingDoctor, briefIntro: e.target.value })}
                          placeholder="Write a brief professional intro..."
                          rows={4}
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium leading-relaxed bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sticky Footer always visible while scrolling */}
                  <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingDoctor(null)}
                      className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition duration-150 cursor-pointer flex items-center gap-1.5 shadow-3xs"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleApplyDoctorChanges}
                      className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/10 transition duration-150 cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Custom Delete Confirmation Dialog Modal */}
            {doctorToDelete && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
                {/* Backdrop click to close */}
                <div className="absolute inset-0" onClick={() => setDoctorToDelete(null)} />
                
                {/* Card container */}
                <div className="relative bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-sm w-full p-6 text-slate-800 z-10 animate-fade-in">
                  <h3 className="text-base font-extrabold text-[#081C3A] mb-2">Delete Doctor</h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                    Are you sure you want to delete this doctor?
                  </p>
                  <div className="flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setDoctorToDelete(null)}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        const updated = draftDoctors.filter(d => d.id !== doctorToDelete);
                        setDraftDoctors(updated);
                        setDoctorsList(updated);
                        setDoctorToDelete(null);
                        setSaveMessage('Deleting doctor and syncing with Supabase...');
                        try {
                          const success = await doctorService.saveDoctors(updated);
                          if (success) {
                            setSaveMessage('Doctor deleted successfully!');
                          } else {
                            setSaveMessage('Failed to delete doctor on Supabase.');
                          }
                        } catch (err: any) {
                          console.error('Error deleting doctor on Supabase:', err);
                          setSaveMessage('Error deleting doctor: ' + (err.message || err));
                        } finally {
                          setTimeout(() => setSaveMessage(null), 3500);
                        }
                      }}
                      className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition cursor-pointer shadow-sm shadow-rose-600/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }
      case 'media': {
        // Derive mediaVideos dynamically from the synchronized videosList prop
        const mediaVideos = (videosList || []).map(v => ({
          id: v.id,
          youtubeUrl: `https://www.youtube.com/watch?v=${v.id}`,
          title: v.title,
          thumbnail: `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`
        }));

        // Local Media helpers
        const getYouTubeId = (url: string): string | null => {
          if (!url) return null;
          const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
          const match = url.match(regExp);
          return (match && match[2].length === 11) ? match[2] : null;
        };

        const getAutoTitle = (url: string): string => {
          const ytId = getYouTubeId(url);
          if (!ytId) return "New Patient Testimony Video";
          const titles = [
            "Full Mouth Dental Implant Rehabilitation - Patient Success Story",
            "Same-Day Smile Transformation & Laser Dentistry Experience",
            "Microscopic Root Canal & Restorative Veneers Clinical Case Study",
            "Advanced Dental Implants & Aesthetic Smile Makeover Testimonial",
            "Same-Day Crown Patient Care & Clinical Results Review"
          ];
          const index = Math.abs(ytId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % titles.length;
          return titles[index];
        };

        const handleReplaceImage = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSaveMessage('Uploading replacement image to Supabase...');
            try {
              const imageUrl = await uploadImage(file);
              const updated = mediaImages.map(img => img.id === id ? { ...img, url: imageUrl } : img);
              
              setMediaImages(updated);
              if (previewImage && previewImage.id === id) {
                setPreviewImage(prev => prev ? { ...prev, url: imageUrl } : null);
              }

              setSaveMessage('Saving gallery changes to Supabase...');
              const success = await galleryService.saveGalleryData(updated, patientMoments);
              if (success) {
                setSaveMessage('Image replaced and saved to Supabase successfully!');
              } else {
                setSaveMessage('Failed to save replacement to Supabase database.');
              }
            } catch (err: any) {
              console.warn('Supabase upload failed, falling back to local Base64:', err);
              try {
                const dataUrl = await new Promise<string>((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onload = () => resolve(reader.result as string);
                  reader.onerror = reject;
                  reader.readAsDataURL(file);
                });
                const updated = mediaImages.map(img => img.id === id ? { ...img, url: dataUrl } : img);
                setMediaImages(updated);
                if (previewImage && previewImage.id === id) {
                  setPreviewImage(prev => prev ? { ...prev, url: dataUrl } : null);
                }
                setSaveMessage('Notice: Saved locally (Supabase offline/restricted).');
                await galleryService.saveGalleryData(updated, patientMoments);
              } catch (fallbackErr) {
                console.error(fallbackErr);
                alert('Failed to read file.');
              }
            } finally {
              setTimeout(() => setSaveMessage(null), 3000);
            }
          }
        };

        const handleDeleteImage = async (id: string) => {
          const updated = mediaImages.filter(img => img.id !== id);
          setMediaImages(updated);
          if (previewImage && previewImage.id === id) {
            setPreviewImage(null);
          }
          setSaveMessage('Deleting image and syncing with Supabase...');
          try {
            const success = await galleryService.saveGalleryData(updated, patientMoments);
            if (success) {
              setSaveMessage('Image deleted from Supabase successfully!');
            } else {
              setSaveMessage('Failed to sync deletion with Supabase.');
            }
          } catch (err: any) {
            console.error('Error saving gallery deletion:', err);
            setSaveMessage('Error syncing deletion: ' + (err.message || err));
          } finally {
            setTimeout(() => setSaveMessage(null), 3000);
          }
        };

        const handleSaveVideo = async () => {
          const ytId = getYouTubeId(videoUrlInput);
          if (!ytId) {
            alert('Please enter a valid YouTube video URL.');
            return;
          }
          const generatedTitle = getAutoTitle(videoUrlInput);

          let updated: DentalVideo[];
          if (editingVideo) {
            // Edit mode: replace the old video with the new ytId and title
            updated = (videosList || []).map(v => v.id === editingVideo.id ? {
              id: ytId,
              title: generatedTitle,
              treatment: 'Patient Testimonial'
            } : v);
          } else {
            // Add mode: append a new video object to videosList
            updated = [
              ...(videosList || []),
              {
                id: ytId,
                title: generatedTitle,
                treatment: 'Patient Testimonial'
              }
            ];
          }

          setVideosList(updated);
          setSaveMessage('Saving video list changes to Supabase...');
          try {
            const success = await videoService.saveVideos(updated);
            if (success) {
              setSaveMessage('Video list saved to Supabase successfully!');
            } else {
              setSaveMessage('Failed to save videos to Supabase database.');
            }
          } catch (err: any) {
            console.error('Error saving video changes:', err);
            setSaveMessage('Error saving: ' + (err.message || err));
          } finally {
            setTimeout(() => setSaveMessage(null), 3000);
          }

          // Reset and close
          setVideoDrawerOpen(false);
          setEditingVideo(null);
          setVideoUrlInput('');
        };

        const handleDeleteVideo = async (id: string) => {
          const updated = (videosList || []).filter(v => v.id !== id);
          setVideosList(updated);

          setSaveMessage('Deleting video and syncing with Supabase...');
          try {
            const success = await videoService.saveVideos(updated);
            if (success) {
              setSaveMessage('Video deleted from Supabase successfully!');
            } else {
              setSaveMessage('Failed to sync deletion with Supabase.');
            }
          } catch (err: any) {
            console.error('Error saving video deletion:', err);
            setSaveMessage('Error syncing deletion: ' + (err.message || err));
          } finally {
            setTimeout(() => setSaveMessage(null), 3000);
          }
        };

        const handleSaveImageDetails = async () => {
          if (!drawerImageUrl) {
            alert('Please select or upload an image file first.');
            return;
          }

          let updated: any[];
          if (editingImage) {
            // Edit existing image
            updated = (mediaImages || []).map(img => (img && img.id === editingImage.id) ? {
              ...img,
              url: drawerImageUrl,
              title: drawerImageTitle || img.title || 'Uploaded Image',
              category: drawerImageCategory || 'Homepage Gallery',
              branch: drawerImageBranch || 'All Branches',
              altText: drawerImageAltText || ''
            } : img);
          } else {
            // Create/add new image
            updated = [
              ...(mediaImages || []),
              {
                id: 'img-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
                url: drawerImageUrl,
                title: drawerImageTitle || 'Uploaded Image',
                category: drawerImageCategory || 'Homepage Gallery',
                branch: drawerImageBranch || 'All Branches',
                altText: drawerImageAltText || ''
              }
            ];
          }

          setMediaImages(updated);
          setSaveMessage('Saving gallery properties to Supabase...');
          try {
            const success = await galleryService.saveGalleryData(updated, patientMoments);
            if (success) {
              setSaveMessage('Gallery properties saved to Supabase successfully!');
            } else {
              setSaveMessage('Failed to save gallery properties to Supabase database.');
            }
          } catch (err: any) {
            console.error('Error saving gallery properties:', err);
            setSaveMessage('Error saving: ' + (err.message || err));
          } finally {
            setTimeout(() => setSaveMessage(null), 3000);
          }

          // Reset drawer states
          setImageDrawerOpen(false);
          setEditingImage(null);
          setDrawerImageUrl('');
          setDrawerImageTitle('');
          setDrawerImageCategory('Homepage Gallery');
          setDrawerImageBranch('All Branches');
          setDrawerImageAltText('');
          setShowAddCategoryForm(false);
          setNewCategoryName('');
        };

        const ytIdPreview = getYouTubeId(videoUrlInput);
        const previewVideoTitle = ytIdPreview ? getAutoTitle(videoUrlInput) : 'Enter YouTube URL above';
        const previewVideoThumbnail = ytIdPreview ? `https://img.youtube.com/vi/${ytIdPreview}/hqdefault.jpg` : '';

        return (
          <div className="space-y-6" id="admin-media-view">
            {/* Upper Tab and Title Header Banner */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-3xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold font-display text-slate-900 flex items-center gap-2" id="admin-tab-title">
                  <span className="p-2 rounded-xl bg-blue-50 text-blue-600"><ImageIcon className="h-5 w-5" /></span>
                  Media Management
                </h1>
                <p className="text-slate-500 text-xs md:text-sm mt-1.5">
                  Organize clinic galleries, surgical outcomes, and high-impact patient video testimonials.
                </p>
              </div>

              {/* Tab Selector */}
              <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 shrink-0 self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveMediaTab('gallery')}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                    activeMediaTab === 'gallery'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className="text-sm">🖼</span> Gallery
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaTab('smiles')}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                    activeMediaTab === 'smiles'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className="text-sm">😊</span> Happy Smiles
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaTab('videos')}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                    activeMediaTab === 'videos'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className="text-sm">🎥</span> Videos
                </button>
              </div>
            </div>

            {/* Gallery View Tab Content */}
            {activeMediaTab === 'gallery' && (
              <div className="space-y-6" id="gallery-tab-content">
                {/* Actions row */}
                <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-slate-100 shadow-3xs">
                  <div className="text-xs text-slate-500 font-medium">
                    Showing <span className="font-bold text-slate-800">{mediaImages.length}</span> gallery assets
                  </div>
                  
                  <div>
                    <label
                      htmlFor="gallery-upload-file-trigger"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition duration-150 cursor-pointer select-none"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Upload Images</span>
                    </label>
                    <input
                      type="file"
                      id="gallery-upload-file-trigger"
                      className="hidden"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          setSaveMessage('Uploading image to Supabase...');
                          try {
                            const imageUrl = await uploadImage(file);
                            setEditingImage(null);
                            setDrawerImageUrl(imageUrl);
                            setDrawerImageTitle(file.name.replace(/\.[^/.]+$/, ""));
                            setDrawerImageCategory('Homepage Gallery');
                            setDrawerImageBranch('All Branches');
                            setDrawerImageAltText('');
                            setImageDrawerOpen(true);
                            setSaveMessage('Uploaded to storage! Set options & save.');
                          } catch (err: any) {
                            console.warn('Upload failed, using local fallback:', err);
                            try {
                              const dataUrl = await new Promise<string>((resolve, reject) => {
                                const reader = new FileReader();
                                reader.onload = () => resolve(reader.result as string);
                                reader.onerror = reject;
                                reader.readAsDataURL(file);
                              });
                              setEditingImage(null);
                              setDrawerImageUrl(dataUrl);
                              setDrawerImageTitle(file.name.replace(/\.[^/.]+$/, ""));
                              setDrawerImageCategory('Homepage Gallery');
                              setDrawerImageBranch('All Branches');
                              setDrawerImageAltText('');
                              setImageDrawerOpen(true);
                              setSaveMessage('Using local image fallback.');
                            } catch (fallbackErr) {
                              console.error(fallbackErr);
                            }
                          } finally {
                            setTimeout(() => setSaveMessage(null), 3500);
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Grid */}
                {mediaImages.length === 0 ? (
                  <div className="bg-white rounded-2xl p-16 border border-slate-100 text-center text-slate-400 text-sm">
                    No images uploaded. Add some smile gallery photos to get started!
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {mediaImages.map((item) => (
                      <div
                        key={item.id}
                        className="group bg-white rounded-2xl border border-slate-150 shadow-3xs overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col relative"
                      >
                        {/* Drag indicator & index placeholder for sorting */}
                        <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition duration-150 bg-slate-900/70 backdrop-blur-xs text-white p-1.5 rounded-lg cursor-grab active:cursor-grabbing" title="Reorder image">
                          <GripVertical className="h-3.5 w-3.5" />
                        </div>

                        {/* Image Preview Container */}
                        <div
                          onClick={() => setPreviewImage(item)}
                          className="relative aspect-square w-full overflow-hidden bg-slate-50 cursor-pointer"
                        >
                          <img
                            src={item.url}
                            alt={item.altText || item.title}
                            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition flex items-center justify-center">
                            <span className="bg-white/90 backdrop-blur-xs shadow-sm text-[10px] text-slate-800 font-extrabold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition duration-200 transform scale-90 group-hover:scale-100">
                              View Preview
                            </span>
                          </div>
                        </div>

                        {/* Replace & Delete Footer Panel */}
                        <div className="p-3 border-t border-slate-100 flex items-center justify-between gap-2 bg-slate-50/50 mt-auto">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingImage(item);
                              setDrawerImageUrl(item.url);
                              setDrawerImageTitle(item.title);
                              setDrawerImageCategory(item.category || 'Homepage Gallery');
                              setDrawerImageBranch(item.branch || 'All Branches');
                              setDrawerImageAltText(item.altText || '');
                              setImageDrawerOpen(true);
                            }}
                            className="font-bold text-xs text-blue-600 hover:text-blue-700 bg-blue-50/80 px-3 py-2 rounded-xl flex items-center justify-center gap-1 hover:bg-blue-100/80 transition select-none flex-1 text-center cursor-pointer"
                          >
                            <Upload className="h-3 w-3 shrink-0" />
                            <span>Replace</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteImage(item.id)}
                            className="text-rose-500 hover:text-rose-600 bg-rose-50/60 hover:bg-rose-100 p-2 rounded-xl border border-rose-100 hover:border-rose-200 transition cursor-pointer shrink-0"
                            title="Delete Image"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Happy Smiles & Patient Moments View Tab Content */}
            {activeMediaTab === 'smiles' && (
              <div className="space-y-6" id="smiles-tab-content">
                {/* Actions row */}
                <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-slate-100 shadow-3xs">
                  <div className="text-xs text-slate-500 font-medium">
                    Showing <span className="font-bold text-slate-800">{(patientMoments || []).length}</span> patient smile moments
                  </div>
                  
                  <div>
                    <label
                      htmlFor="smile-upload-file-trigger"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition duration-150 cursor-pointer select-none"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Upload Smile Moment</span>
                    </label>
                    <input
                      type="file"
                      id="smile-upload-file-trigger"
                      className="hidden"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          setSaveMessage('Uploading smile moment to Supabase...');
                          try {
                            const imageUrl = await uploadImage(file);
                            const updated = [
                              {
                                id: 'smile-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
                                image: imageUrl
                              },
                              ...(patientMoments || [])
                            ];
                            setPatientMoments(updated);
                            setSaveMessage('Saving smile moment to Supabase...');
                            const success = await galleryService.saveGalleryData(mediaImages, updated);
                            if (success) {
                              setSaveMessage('Smile moment uploaded and saved to Supabase successfully!');
                            } else {
                              setSaveMessage('Failed to save smile moment to database.');
                            }
                          } catch (err: any) {
                            console.warn('Upload failed, falling back to local Base64:', err);
                            try {
                              const dataUrl = await new Promise<string>((resolve, reject) => {
                                const reader = new FileReader();
                                reader.onload = () => resolve(reader.result as string);
                                reader.onerror = reject;
                                reader.readAsDataURL(file);
                              });
                              const updated = [
                                {
                                  id: 'smile-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
                                  image: dataUrl
                                },
                                ...(patientMoments || [])
                              ];
                              setPatientMoments(updated);
                              await galleryService.saveGalleryData(mediaImages, updated);
                              setSaveMessage('Smile moment loaded locally and saved.');
                            } catch (fallbackErr) {
                              console.error(fallbackErr);
                            }
                          } finally {
                            setTimeout(() => setSaveMessage(null), 3500);
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Grid */}
                {(!patientMoments || patientMoments.length === 0) ? (
                  <div className="bg-white rounded-2xl p-16 border border-slate-100 text-center text-slate-400 text-sm">
                    No smile moments uploaded yet. Add some happy patient moments!
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {patientMoments.map((item) => (
                      <div 
                        key={item.id}
                        id={`admin-smile-card-${item.id}`}
                        className="bg-white border border-slate-150 rounded-2xl p-4 flex flex-col justify-between gap-3 group relative hover:border-teal-100 transition-all duration-200 shadow-3xs"
                      >
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
                          <img 
                            src={item.image} 
                            alt="Patient Smile Moment" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Replace & Delete Actions */}
                        <div className="flex items-center justify-between gap-2 mt-auto">
                          <label
                            htmlFor={`smile-replace-trigger-${item.id}`}
                            className="font-bold text-xs text-teal-600 hover:text-teal-700 bg-teal-50 px-3 py-2 rounded-xl flex items-center justify-center gap-1 hover:bg-teal-100 transition select-none flex-1 text-center cursor-pointer"
                          >
                            <Upload className="h-3 w-3 shrink-0" />
                            <span>Replace</span>
                          </label>
                          <input
                            type="file"
                            id={`smile-replace-trigger-${item.id}`}
                            className="hidden"
                            accept="image/*"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                setSaveMessage('Replacing smile moment on Supabase...');
                                try {
                                  const imageUrl = await uploadImage(file);
                                  const updated = (patientMoments || []).map(moment => moment.id === item.id ? { ...moment, image: imageUrl } : moment);
                                  setPatientMoments(updated);
                                  setSaveMessage('Saving updated smile moment to Supabase...');
                                  const success = await galleryService.saveGalleryData(mediaImages, updated);
                                  if (success) {
                                    setSaveMessage('Smile moment replaced and saved successfully!');
                                  } else {
                                    setSaveMessage('Failed to save replacement to database.');
                                  }
                                } catch (err: any) {
                                  console.warn('Upload failed, falling back to local Base64:', err);
                                  try {
                                    const dataUrl = await new Promise<string>((resolve, reject) => {
                                      const reader = new FileReader();
                                      reader.onload = () => resolve(reader.result as string);
                                      reader.onerror = reject;
                                      reader.readAsDataURL(file);
                                    });
                                    const updated = (patientMoments || []).map(moment => moment.id === item.id ? { ...moment, image: dataUrl } : moment);
                                    setPatientMoments(updated);
                                    await galleryService.saveGalleryData(mediaImages, updated);
                                    setSaveMessage('Smile moment replaced locally.');
                                  } catch (fallbackErr) {
                                    console.error(fallbackErr);
                                  }
                                } finally {
                                  setTimeout(() => setSaveMessage(null), 3500);
                                }
                              }
                            }}
                          />

                          <button
                            type="button"
                            onClick={() => {
                              setSmileToDelete(item.id);
                            }}
                            className="text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 p-2 rounded-xl border border-rose-100 hover:border-rose-200 transition cursor-pointer shrink-0"
                            aria-label="Delete Patient Moment"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Custom Smile Image Delete Confirmation Dialog Modal */}
                {smileToDelete && (
                  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
                    {/* Backdrop click to close */}
                    <div className="absolute inset-0" onClick={() => setSmileToDelete(null)} />
                    
                    {/* Card container */}
                    <div className="relative bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-sm w-full p-6 text-slate-800 z-10 animate-fade-in">
                      <h3 className="text-base font-extrabold text-[#081C3A] mb-2">Delete Image</h3>
                      <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                        Are you sure you want to delete this image?
                      </p>
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          type="button"
                          onClick={() => setSmileToDelete(null)}
                          className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            const updated = (patientMoments || []).filter(moment => moment.id !== smileToDelete);
                            setPatientMoments(updated);
                            setSmileToDelete(null);
                            setSaveMessage('Deleting smile moment and syncing with Supabase...');
                            try {
                              const success = await galleryService.saveGalleryData(mediaImages, updated);
                              if (success) {
                                setSaveMessage('Smile moment deleted successfully!');
                              } else {
                                setSaveMessage('Failed to delete smile moment on Supabase database.');
                              }
                            } catch (err: any) {
                              console.error('Error deleting smile moment:', err);
                              setSaveMessage('Error: ' + (err.message || err));
                            } finally {
                              setTimeout(() => setSaveMessage(null), 3500);
                            }
                          }}
                          className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition cursor-pointer shadow-sm shadow-rose-600/10"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Videos View Tab Content */}
            {activeMediaTab === 'videos' && (
              <div className="space-y-6" id="videos-tab-content">
                {/* Actions row */}
                <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-slate-100 shadow-3xs">
                  <div className="text-xs text-slate-500 font-medium">
                    Showing <span className="font-bold text-slate-800">{mediaVideos.length}</span> patient videos
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setEditingVideo(null);
                      setVideoUrlInput('');
                      setVideoDrawerOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition duration-150 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add YouTube Video</span>
                  </button>
                </div>

                {/* Video Grid */}
                {mediaVideos.length === 0 ? (
                  <div className="bg-white rounded-2xl p-16 border border-slate-100 text-center text-slate-400 text-sm">
                    No videos registered. Add some YouTube patient testimonials to get started!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mediaVideos.map((item) => (
                      <div
                        key={item.id}
                        className="group bg-white rounded-2xl border border-slate-150 shadow-3xs overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col"
                      >
                        {/* YouTube Thumbnail Card with custom Play button overlay */}
                        <div className="relative aspect-video w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition flex items-center justify-center">
                            <div className="bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-full shadow-lg transform scale-90 group-hover:scale-100 duration-200 transition">
                              <Play className="h-6 w-6 text-white fill-current translate-x-0.5" />
                            </div>
                          </div>
                          
                          <a
                            href={item.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs hover:bg-black/80 text-white p-1.5 rounded-lg text-[10px] font-black tracking-wider uppercase transition flex items-center gap-1.5"
                          >
                            <span>Open on YouTube</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>

                        {/* Title & Actions footer */}
                        <div className="p-4 flex-1 flex flex-col">
                          <h4 className="font-display font-extrabold text-slate-900 text-sm leading-snug line-clamp-2 flex-1">
                            {item.title}
                          </h4>
                          
                          <div className="p-1 border-t border-slate-100 flex items-center justify-end gap-2.5 bg-slate-50/50 -mx-4 -mb-4 mt-4">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingVideo(item);
                                setVideoUrlInput(item.youtubeUrl);
                                setVideoDrawerOpen(true);
                              }}
                              className="text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                            >
                              <Pencil className="h-3 w-3" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteVideo(item.id)}
                              className="text-rose-500 hover:text-rose-600 bg-white hover:bg-rose-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="h-3 w-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Gallery Image Preview Modal overlay */}
            {previewImage && (
              <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                <div className="absolute inset-0" onClick={() => setPreviewImage(null)} />
                
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full flex flex-col z-10 animate-fade-in border border-slate-100">
                  {/* Close button inside image top-right */}
                  <button
                    type="button"
                    onClick={() => setPreviewImage(null)}
                    className="absolute top-4 right-4 z-20 bg-slate-900/60 backdrop-blur-xs hover:bg-slate-900 text-white p-2 rounded-full transition cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Large Image View */}
                  <div className="relative bg-slate-50 flex items-center justify-center p-8 border-b border-slate-100 aspect-video overflow-hidden">
                    <img
                      src={previewImage.url}
                      alt={previewImage.altText || previewImage.title}
                      className="max-h-[350px] w-auto object-contain rounded-2xl shadow-sm"
                    />
                  </div>

                  {/* Metadata and Quick Actions Panel */}
                  <div className="p-6 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Asset Preview</span>
                        {previewImage.category && (
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 font-extrabold text-[9px] rounded-full uppercase">
                            {previewImage.category}
                          </span>
                        )}
                        {previewImage.branch && (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 font-bold text-[9px] rounded-full">
                            {previewImage.branch}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-extrabold text-[#081C3A] text-base leading-snug truncate mt-1">
                        {previewImage.title}
                      </h3>
                      {previewImage.altText && (
                        <p className="text-[11px] text-slate-500 mt-1 font-medium italic">
                          Alt: "{previewImage.altText}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          const item = previewImage;
                          setPreviewImage(null);
                          if (item) {
                            setEditingImage(item as any);
                            setDrawerImageUrl(item.url);
                            setDrawerImageTitle(item.title);
                            setDrawerImageCategory(item.category || 'Homepage Gallery');
                            setDrawerImageBranch(item.branch || 'All Branches');
                            setDrawerImageAltText(item.altText || '');
                            setImageDrawerOpen(true);
                          }
                        }}
                        className="cursor-pointer font-bold text-xs text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100 px-4 py-2 rounded-xl border border-blue-100 transition select-none flex items-center gap-1"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        <span>Replace Image</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteImage(previewImage.id)}
                        className="text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-100 hover:border-rose-600 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete Image</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add / Edit Video Slide Drawer */}
            {videoDrawerOpen && (
              <div className="fixed inset-0 z-100 flex justify-end" id="video-drawer-overlay">
                {/* Drawer Backdrop with transition effect */}
                <div
                  className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
                  onClick={() => {
                    setVideoDrawerOpen(false);
                    setEditingVideo(null);
                    setVideoUrlInput('');
                  }}
                />

                {/* Right Drawer Box */}
                <div className="relative w-full md:w-[650px] bg-white h-full shadow-2xl flex flex-col z-110 border-l border-slate-100 animate-slide-in">
                  
                  {/* Drawer Header */}
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                    <div className="flex items-center gap-3">
                      {/* ← Back Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setVideoDrawerOpen(false);
                          setEditingVideo(null);
                          setVideoUrlInput('');
                        }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-xs font-bold shadow-3xs cursor-pointer transition duration-150 shrink-0"
                      >
                        <ArrowLeft className="h-3.5 w-3.5 text-slate-500" />
                        <span>← Back</span>
                      </button>
                      
                      <div className="min-w-0">
                        <h3 className="font-display font-extrabold text-[#081C3A] text-base md:text-lg leading-tight">
                          {editingVideo ? 'Edit YouTube Video' : 'Add New YouTube Video'}
                        </h3>
                        <p className="text-slate-500 text-[11px] font-medium mt-0.5 truncate flex items-center gap-1">
                          <span className="font-bold text-blue-600">Action:</span>
                          <span className="font-semibold text-slate-700">
                            {editingVideo ? 'Updating video registry' : 'Inserting video record'}
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setVideoDrawerOpen(false);
                        setEditingVideo(null);
                        setVideoUrlInput('');
                      }}
                      className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-lg transition"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Scrollable Form & Live Preview container */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Live Preview Card */}
                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/80 space-y-2.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">Video Live Preview Card</span>
                      
                      {ytIdPreview ? (
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 max-w-[350px] mx-auto flex flex-col items-center transition-all duration-200">
                          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 mb-3.5">
                            <img
                              src={previewVideoThumbnail}
                              alt="Live Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                              <Play className="h-10 w-10 text-white fill-current" />
                            </div>
                          </div>
                          
                          <h4 className="font-display font-extrabold text-slate-900 text-sm leading-snug text-center">
                            {previewVideoTitle}
                          </h4>
                          
                          <div className="text-[10px] text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mt-3 flex items-center gap-1">
                            <span>Ready to save</span>
                            <Check className="h-3 w-3" />
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-3xl border border-slate-100 border-dashed p-10 text-center max-w-[350px] mx-auto">
                          <Video className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                          <span className="text-xs text-slate-400 font-medium block">
                            Live Preview displays automatically once you enter a valid YouTube URL.
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">YouTube Video URL</label>
                        <input
                          type="text"
                          value={videoUrlInput}
                          onChange={(e) => setVideoUrlInput(e.target.value)}
                          placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium bg-white"
                        />
                        <p className="text-[10px] text-slate-400 font-medium">
                          The system extracts the YouTube Video ID and automatically pulls the corresponding HD thumbnail and dynamic clinical title.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sticky Footer */}
                  <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setVideoDrawerOpen(false);
                        setEditingVideo(null);
                        setVideoUrlInput('');
                      }}
                      className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition duration-150 cursor-pointer flex items-center gap-1.5 shadow-3xs"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleSaveVideo}
                      disabled={!ytIdPreview}
                      className={`px-5 py-2.5 text-xs font-bold text-white rounded-xl transition duration-150 flex items-center gap-1.5 ${
                        ytIdPreview 
                          ? 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/10 cursor-pointer' 
                          : 'bg-slate-300 cursor-not-allowed'
                      }`}
                    >
                      <Check className="h-4 w-4" />
                      <span>Save Video</span>
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* Add / Edit Image Slide Drawer */}
            {imageDrawerOpen && (
              <div className="fixed inset-0 z-100 flex justify-end" id="image-drawer-overlay">
                {/* Drawer Backdrop with transition effect */}
                <div
                  className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
                  onClick={() => {
                    setImageDrawerOpen(false);
                    setEditingImage(null);
                    setDrawerImageUrl('');
                    setDrawerImageTitle('');
                    setDrawerImageCategory('Homepage Gallery');
                    setDrawerImageBranch('All Branches');
                    setDrawerImageAltText('');
                    setShowAddCategoryForm(false);
                    setNewCategoryName('');
                  }}
                />

                {/* Right Drawer Box */}
                <div className="relative w-full md:w-[650px] bg-white h-full shadow-2xl flex flex-col z-110 border-l border-slate-100 animate-slide-in">
                  
                  {/* Drawer Header */}
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setImageDrawerOpen(false);
                          setEditingImage(null);
                          setDrawerImageUrl('');
                          setDrawerImageTitle('');
                          setDrawerImageCategory('Homepage Gallery');
                          setDrawerImageBranch('All Branches');
                          setDrawerImageAltText('');
                          setShowAddCategoryForm(false);
                          setNewCategoryName('');
                        }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-xs font-bold shadow-3xs cursor-pointer transition duration-150 shrink-0"
                      >
                        <ArrowLeft className="h-3.5 w-3.5 text-slate-500" />
                        <span>← Back</span>
                      </button>
                      
                      <div className="min-w-0">
                        <h3 className="font-display font-extrabold text-[#081C3A] text-base md:text-lg leading-tight">
                          {editingImage ? 'Edit Image Properties' : 'Upload & Configure Image'}
                        </h3>
                        <p className="text-slate-500 text-[11px] font-medium mt-0.5 truncate flex items-center gap-1">
                          <span className="font-bold text-blue-600">Action:</span>
                          <span className="font-semibold text-slate-700">
                            {editingImage ? 'Updating image metadata' : 'Saving new gallery asset'}
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setImageDrawerOpen(false);
                        setEditingImage(null);
                        setDrawerImageUrl('');
                        setDrawerImageTitle('');
                        setDrawerImageCategory('Homepage Gallery');
                        setDrawerImageBranch('All Branches');
                        setDrawerImageAltText('');
                        setShowAddCategoryForm(false);
                        setNewCategoryName('');
                      }}
                      className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-lg transition"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Scrollable Form & Live Preview container */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Image Preview & Replace */}
                    <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100/80 space-y-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center font-mono">Image Preview</span>
                      
                      {drawerImageUrl ? (
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 max-w-[320px] mx-auto flex flex-col items-center transition-all duration-200">
                          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-50 mb-3.5 border border-slate-100">
                            <img
                              src={drawerImageUrl}
                              alt="Live Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <label
                            htmlFor="drawer-replace-file-input"
                            className="cursor-pointer font-bold text-xs text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100 px-4 py-2 rounded-xl border border-blue-100 transition select-none flex items-center gap-1"
                          >
                            <Upload className="h-3.5 w-3.5" />
                            <span>Replace Image File</span>
                          </label>
                          <input
                            type="file"
                            id="drawer-replace-file-input"
                            className="hidden"
                            accept="image/*"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                setSaveMessage('Uploading image to Supabase storage...');
                                try {
                                  const imageUrl = await uploadImage(file);
                                  setDrawerImageUrl(imageUrl);
                                  if (!drawerImageTitle) {
                                    setDrawerImageTitle(file.name.replace(/\.[^/.]+$/, ""));
                                  }
                                  setSaveMessage('Image uploaded successfully! Press Save below to apply.');
                                } catch (err: any) {
                                  console.warn('Storage upload failed, falling back to local preview:', err);
                                  try {
                                    const dataUrl = await new Promise<string>((resolve, reject) => {
                                      const reader = new FileReader();
                                      reader.onload = () => resolve(reader.result as string);
                                      reader.onerror = reject;
                                      reader.readAsDataURL(file);
                                    });
                                    setDrawerImageUrl(dataUrl);
                                    if (!drawerImageTitle) {
                                      setDrawerImageTitle(file.name.replace(/\.[^/.]+$/, ""));
                                    }
                                    setSaveMessage('Notice: Image loaded locally. Press Save below to apply.');
                                  } catch (fallbackErr) {
                                    console.error(fallbackErr);
                                  }
                                } finally {
                                  setTimeout(() => setSaveMessage(null), 3000);
                                }
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className="bg-white rounded-3xl border border-slate-100 border-dashed p-10 text-center max-w-[320px] mx-auto">
                          <ImageIcon className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                          <span className="text-xs text-slate-400 font-medium block">
                            No image file selected.
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Form Controls */}
                    <div className="space-y-4">
                      {/* Image Title / File Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Image Title / Name</label>
                        <input
                          type="text"
                          value={drawerImageTitle}
                          onChange={(e) => setDrawerImageTitle(e.target.value)}
                          placeholder="e.g. Full Arch Implants Success Case"
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium bg-white"
                        />
                      </div>

                      {/* Category Dropdown & Add Custom Category Widget */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Category</label>
                        <div className="flex gap-2">
                          <select
                            value={drawerImageCategory}
                            onChange={(e) => setDrawerImageCategory(e.target.value)}
                            className="flex-1 px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold bg-white cursor-pointer"
                          >
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Custom Category input inline toggle */}
                        {!showAddCategoryForm ? (
                          <button
                            type="button"
                            onClick={() => setShowAddCategoryForm(true)}
                            className="text-[10px] text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 transition-all mt-1 cursor-pointer"
                          >
                            <span>➕ Add New Category</span>
                          </button>
                        ) : (
                          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 mt-2">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Add Custom Category</span>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="e.g. Orthodontics Gallery"
                                className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const trimmed = newCategoryName.trim();
                                  if (trimmed) {
                                    if (!categories.includes(trimmed)) {
                                      setCategories(prev => [...prev, trimmed]);
                                    }
                                    setDrawerImageCategory(trimmed);
                                    setNewCategoryName('');
                                    setShowAddCategoryForm(false);
                                  }
                                }}
                                className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition cursor-pointer"
                              >
                                Add
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setShowAddCategoryForm(false);
                                  setNewCategoryName('');
                                }}
                                className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-lg transition cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Branch Dropdown */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Branch Assignment</label>
                        <select
                          value={drawerImageBranch}
                          onChange={(e) => setDrawerImageBranch(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold bg-white cursor-pointer"
                        >
                          <option value="All Branches">All Branches</option>
                          <option value="Amin Marg Branch">Amin Marg Branch</option>
                          <option value="Gayatrinagar Branch">Gayatrinagar Branch</option>
                        </select>
                      </div>

                      {/* Optional Alt Text */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Alt Text (Optional)</label>
                          <span className="text-[9px] font-medium text-slate-400">For screen readers & SEO</span>
                        </div>
                        <textarea
                          value={drawerImageAltText}
                          onChange={(e) => setDrawerImageAltText(e.target.value)}
                          placeholder="e.g. Detailed close-up of patient smile after full mouth implant rehabilitation treatment."
                          rows={3}
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium bg-white resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sticky Footer */}
                  <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setImageDrawerOpen(false);
                        setEditingImage(null);
                        setDrawerImageUrl('');
                        setDrawerImageTitle('');
                        setDrawerImageCategory('Homepage Gallery');
                        setDrawerImageBranch('All Branches');
                        setDrawerImageAltText('');
                        setShowAddCategoryForm(false);
                        setNewCategoryName('');
                      }}
                      className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition duration-150 cursor-pointer flex items-center gap-1.5 shadow-3xs"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleSaveImageDetails}
                      className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/10 cursor-pointer rounded-xl transition duration-150 flex items-center gap-1.5"
                    >
                      <Check className="h-4 w-4" />
                      <span>Save Image Properties</span>
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        );
      }
      case 'contact':
        return (
          <div className="space-y-6" id="admin-contact-view">
            {/* Header Banner */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-3xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold font-display text-slate-900 flex items-center gap-2" id="admin-tab-title">
                  <span className="p-2 rounded-xl bg-blue-50 text-blue-600"><Phone className="h-5 w-5" /></span>
                  Contact Information
                </h1>
                <p className="text-slate-500 text-xs md:text-sm mt-1">
                  Update active telephone lines, direct WhatsApp numbers, clinic emails, physical addresses, and Google Maps references.
                </p>
              </div>

              {/* Save Button */}
              <button
                type="button"
                onClick={async () => {
                  const newContact = {
                    phone: draftPhone,
                    phoneRaw: draftPhoneRaw,
                    whatsapp: draftWhatsapp,
                    whatsappRaw: draftWhatsappRaw,
                    email: draftEmail,
                    address: draftAddress,
                    mapsLink: draftMapsLink
                  };
                  setContactInfo(newContact);
                  
                  try {
                    const success = await contactService.saveContactInfo(newContact);
                    if (success) {
                      setContactSaved(true);
                      setTimeout(() => setContactSaved(false), 3500);
                    } else {
                      alert('Failed to save contact changes to Supabase.');
                    }
                  } catch (err) {
                    console.error('Error saving contact info to Supabase:', err);
                    alert('An error occurred while saving contact details.');
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/10 hover:shadow-lg transition duration-150 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>

            {/* Success Toast / Notification */}
            {contactSaved && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 animate-fade-in">
                <div className="p-1 rounded-full bg-emerald-500 text-white">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs">Contact Details Updated Successfully!</h4>
                  <p className="text-[10px] text-emerald-600 font-medium mt-0.5">Changes are synchronized and active on the public website.</p>
                </div>
              </div>
            )}

            {/* Editor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Telephone & Communications */}
              <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-3xs space-y-5">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                  📞 Phone & Communication Lines
                </h3>

                {/* Phone Display */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Clinic Phone (Display Text)</label>
                  <input
                    type="text"
                    value={draftPhone}
                    onChange={(e) => setDraftPhone(e.target.value)}
                    placeholder="e.g. +91 95103 97046"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium bg-white text-slate-800"
                  />
                  <p className="text-[10px] text-slate-400 font-medium">Displayed to patients in the navbar, footer, and contact sections.</p>
                </div>

                {/* Phone Raw */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Clinic Phone (Raw, No spaces)</label>
                  <input
                    type="text"
                    value={draftPhoneRaw}
                    onChange={(e) => setDraftPhoneRaw(e.target.value)}
                    placeholder="e.g. +919510397046"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium bg-white text-slate-800"
                  />
                  <p className="text-[10px] text-slate-400 font-medium">Used for direct click-to-dial links (starts with country code, e.g., +91).</p>
                </div>

                {/* WhatsApp Display */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">WhatsApp Number (Display Text)</label>
                  <input
                    type="text"
                    value={draftWhatsapp}
                    onChange={(e) => setDraftWhatsapp(e.target.value)}
                    placeholder="e.g. +91 95103 97046"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium bg-white text-slate-800"
                  />
                  <p className="text-[10px] text-slate-400 font-medium">Formatted number shown to patients on floating action buttons.</p>
                </div>

                {/* WhatsApp Raw */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">WhatsApp Number (Link Format)</label>
                  <input
                    type="text"
                    value={draftWhatsappRaw}
                    onChange={(e) => setDraftWhatsappRaw(e.target.value)}
                    placeholder="e.g. 919510397046"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium bg-white text-slate-800"
                  />
                  <p className="text-[10px] text-slate-400 font-medium">Numbers only (no + or spaces). Formats the WhatsApp click-to-chat API links.</p>
                </div>
              </div>

              {/* Digital & Locations */}
              <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-3xs space-y-5">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                  📍 Address & digital properties
                </h3>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    value={draftEmail}
                    onChange={(e) => setDraftEmail(e.target.value)}
                    placeholder="e.g. info@pateldentalrajkot.com"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium bg-white text-slate-800"
                  />
                  <p className="text-[10px] text-slate-400 font-medium">Official inbox address for clinical communications and inquiries.</p>
                </div>

                {/* Physical Address */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Physical Address</label>
                  <textarea
                    rows={3}
                    value={draftAddress}
                    onChange={(e) => setDraftAddress(e.target.value)}
                    placeholder="Clinic detailed address..."
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium bg-white text-slate-800 resize-none"
                  />
                  <p className="text-[10px] text-slate-400 font-medium">Complete postal address of the hospital branch, shown in footer and contact maps.</p>
                </div>

                {/* Google Maps Link */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Google Maps Link</label>
                  <input
                    type="text"
                    value={draftMapsLink}
                    onChange={(e) => setDraftMapsLink(e.target.value)}
                    placeholder="e.g. https://maps.google.com/?q=..."
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium bg-white text-slate-800"
                  />
                  <p className="text-[10px] text-slate-400 font-medium">Link triggered when patients click the maps pin or navigation buttons.</p>
                </div>
              </div>

            </div>
          </div>
        );
      case 'appointments':
        return <Appointments />;
      case 'services':
        return (
          <div className="space-y-6" id="admin-services-view">
            {/* Header Banner */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-3xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold font-display text-slate-900 flex items-center gap-2" id="admin-tab-title">
                  <span className="p-2 rounded-xl bg-[#F0FDFA] text-[#0D9488]"><Stethoscope className="h-5 w-5" /></span>
                  Services Management
                </h1>
                <p className="text-slate-500 text-xs md:text-sm mt-1">
                  Manage hospital treatment services, service-specific gallery images, and FAQs.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleAddService}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs md:text-sm font-bold rounded-xl shadow-xs transition cursor-pointer"
                  id="add-service-btn"
                >
                  <Plus className="h-4 w-4" />
                  Add Service
                </button>
              </div>
            </div>

            {loadingServices ? (
              <div className="bg-white border border-slate-100 p-12 rounded-2xl text-center shadow-3xs flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D9488] mb-3"></div>
                <p className="text-slate-500 text-xs font-medium">Loading clinical services...</p>
              </div>
            ) : servicesError ? (
              <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-2xl text-sm">
                <p className="font-bold">Error loading services</p>
                <p className="text-xs mt-1 text-red-600">{servicesError}</p>
                <button
                  onClick={loadServicesList}
                  className="mt-3 px-4 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded-lg transition animate-pulse"
                >
                  Retry Loading
                </button>
              </div>
            ) : servicesList.length === 0 ? (
              <div className="bg-white border border-slate-100 p-12 rounded-2xl text-center shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08)]">
                <div className="max-w-md mx-auto py-12 flex flex-col items-center justify-center">
                  <div className="p-4 rounded-full bg-slate-50 text-slate-400 mb-4">
                    <Stethoscope className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">No services found.</h3>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                    There are currently no active treatment services in the database. Set up your first service to showcase clinical procedures, FAQs, and a photo gallery.
                  </p>
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="mt-6 flex items-center gap-2 px-4 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs md:text-sm font-bold rounded-xl shadow-xs transition cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    Add First Service
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-150 shadow-3xs overflow-hidden" id="services-table-container">
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left border-collapse" id="services-data-table">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-150">
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-24">Display Order</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-28">Hero Image</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Title</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Slug</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-28">Status</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right pr-6 w-72">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {servicesList.map((svc) => (
                        <tr 
                          key={svc.id} 
                          className="hover:bg-slate-50/30 transition-all duration-150"
                          id={`service-row-${svc.id}`}
                        >
                          {/* Display Order */}
                          <td className="px-4 py-4 text-xs font-mono text-slate-600 font-medium">
                            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
                              {svc.display_order}
                            </span>
                          </td>

                          {/* Hero Image Thumbnail */}
                          <td className="px-4 py-4">
                            <img
                              src={svc.hero_image || 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?q=80&w=200'}
                              alt={svc.title}
                              className="w-16 h-10 object-cover rounded-lg border border-slate-100 shadow-3xs"
                              referrerPolicy="no-referrer"
                            />
                          </td>
                          
                          {/* Title */}
                          <td className="px-4 py-4 text-xs">
                            <div className="font-semibold text-slate-800 text-sm">{svc.title}</div>
                            {svc.short_description && (
                              <div className="text-slate-400 mt-0.5 line-clamp-1 max-w-sm">{svc.short_description}</div>
                            )}
                          </td>

                          {/* Slug */}
                          <td className="px-4 py-4 text-xs font-mono text-slate-500">
                            {svc.slug}
                          </td>

                          {/* Active/Inactive Status */}
                          <td className="px-4 py-4 text-xs">
                            {svc.is_active ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                Inactive
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-4 text-xs text-right pr-6 whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Edit Action */}
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveServiceEditorTab('details');
                                  setEditingService(svc);
                                  setIsSlugTouched(true);
                                  setServiceFormError(null);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-[#0D9488] bg-[#F0FDFA] hover:bg-[#CCFBF1] rounded-lg transition cursor-pointer"
                                title="Edit Service details"
                              >
                                <Pencil className="h-3 w-3" />
                                Edit
                              </button>

                              {/* Gallery Action */}
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveServiceEditorTab('gallery');
                                  setEditingService(svc);
                                  setIsSlugTouched(true);
                                  setServiceFormError(null);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition cursor-pointer"
                                title="Manage service gallery images"
                              >
                                <ImageIcon className="h-3 w-3" />
                                Gallery
                              </button>

                              {/* FAQs Action */}
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveServiceEditorTab('faqs');
                                  setEditingService(svc);
                                  setIsSlugTouched(true);
                                  setServiceFormError(null);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition cursor-pointer"
                                title="Manage service FAQs"
                              >
                                <MessageCircle className="h-3 w-3" />
                                FAQs
                              </button>

                              {/* Delete Action */}
                              <button
                                type="button"
                                onClick={() => {
                                  setServiceToDelete(svc.id);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition cursor-pointer"
                                title="Delete service"
                              >
                                <Trash2 className="h-3 w-3" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div id="admin-panel-container" className="min-h-[calc(100vh-72px)] bg-slate-50 font-sans flex flex-col lg:flex-row relative">
      
      {/* MOBILE HEADER FOR SIDEBAR TOGGLE */}
      <div className="lg:hidden w-full bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between relative z-30 shrink-0">
        <div className="flex items-center space-x-2">
          <img 
            src="/LOGO 3D FULL NAME WHITE (3).png" 
            alt="Patel Logo" 
            className="h-9 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="font-display font-black text-xs text-[#081C3A] tracking-wider uppercase bg-[#F0FDFA] border border-[#CCFBF1] px-2 py-0.5 rounded-md">
            Admin Panel
          </span>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100"
          aria-label="Toggle Sidebar Menu"
        >
          {isMobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* SIDEBAR SIDE DECK: Fixed left block (desktop), slide overlay (mobile) */}
      <aside 
        id="admin-sidebar"
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-[260px] bg-white border-r border-slate-200/80 p-5 flex flex-col justify-between shrink-0
          transition-transform duration-300 transform lg:transform-none
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          pt-20 lg:pt-6 h-full min-h-[calc(100vh-72px)]
        `}
      >
        <div className="space-y-6">
          {/* Logo Brand Header (Desktop only) */}
          <div className="hidden lg:flex flex-col items-center pb-4 border-b border-slate-100">
            <img 
              src="/LOGO 3D FULL NAME WHITE (3).png" 
              alt="Patel Dental Hospital Logo" 
              className="h-[52px] w-auto object-contain mb-3"
              referrerPolicy="no-referrer"
            />
            <span className="text-[10px] tracking-widest text-[#0D9488] font-bold uppercase bg-[#F0FDFA] border border-[#CCFBF1] px-3 py-0.5 rounded-full block">
              Clinical Workspace
            </span>
          </div>

          {/* Navigation Links List */}
          <nav className="space-y-1.5">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <IconComponent className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Option: Logout */}
        <div className="pt-5 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition duration-200 cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5 text-rose-500" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MOBILE BACKDROP DRAWER COVER LAYER */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* MAIN RIGHT WORKSPACE: holds the tab panels dynamically */}
      <main id="admin-main-workspace" className="flex-grow p-4 md:p-8 overflow-y-auto max-w-full">
        {renderTabContent()}
      </main>

      {/* PREMIUM LIVE PREVIEW MODAL */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col my-8 border border-slate-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-150 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-3">
                <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Eye className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-slate-800 text-sm">Hero Realtime Preview</h3>
                  <p className="text-[11px] text-slate-400">Review layout presentation before publishing edits.</p>
                </div>
              </div>
              
              {/* Responsive Toggles */}
              <div className="flex items-center gap-2">
                <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
                  <button
                    type="button"
                    onClick={() => setPreviewMode('desktop')}
                    className={`px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition ${
                      previewMode === 'desktop' 
                        ? 'bg-white text-slate-800 shadow-3xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Desktop View
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('mobile')}
                    className={`px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition ${
                      previewMode === 'mobile' 
                        ? 'bg-white text-slate-800 shadow-3xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Mobile View
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Content - Simulation Board */}
            <div className="p-6 bg-slate-100 flex items-center justify-center min-h-[400px] overflow-hidden">
              {previewMode === 'desktop' ? (
                /* Simulated Desktop Hero Frame */
                <div className="w-full h-[520px] bg-[#FAFAFC] rounded-2xl relative border border-slate-200 overflow-hidden shadow-md flex flex-col justify-center">
                  <div className="absolute inset-0 z-0">
                    <img
                      src={draftBgImage || "/parel doctor.png"}
                      alt="Desktop Reception View"
                      className="w-full h-full object-cover object-center lg:object-[right_center]"
                      referrerPolicy="no-referrer"
                    />
                    <div 
                      className="absolute inset-0"
                      style={{ 
                        background: 'linear-gradient(to right, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0) 60%)' 
                      }}
                    />
                  </div>

                  <div className="relative z-10 px-12 max-w-[500px] text-left space-y-6">
                    <div className="shadow-2xs inline-block">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-100 text-[#081C3A] font-bold text-[9px] uppercase tracking-wider">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#11B5D8] mr-1.5" />
                        RAJKOT'S TRUSTED CLINICAL CENTER
                      </span>
                    </div>

                    <h1 className="font-display text-xl md:text-2xl font-extrabold text-[#081C3A] leading-tight whitespace-pre-wrap">
                      {draftHeading}
                    </h1>

                    <p className="text-slate-700 font-sans text-[11px] md:text-xs leading-relaxed max-w-[450px] font-medium whitespace-pre-wrap">
                      {draftDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {["Dental Implants", "Clear Aligners", "Full Mouth Rehab"].map((s, i) => (
                        <span key={i} className="bg-white border border-slate-100 px-2.5 py-1 rounded-full text-[#081C3A] text-[10px] font-bold">
                          ✓ {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="px-4 py-2.5 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white text-[12px] font-bold rounded-lg shadow-sm">
                        Book Appointment
                      </div>
                      <div className="px-4 py-2.5 bg-white border border-[#25D366] text-[#25D366] text-[12px] font-bold rounded-lg shadow-3xs">
                        WhatsApp Us
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Simulated Mobile Hero Frame */
                <div className="w-[340px] h-[520px] bg-white rounded-2xl relative border border-slate-200 overflow-hidden shadow-md flex flex-col justify-start">
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={draftBgImageMobile || draftBgImage || "/patel mobile hero.jpeg"} 
                      alt="Mobile Reception View" 
                      className="w-full h-full object-cover object-[center_60%]"
                      referrerPolicy="no-referrer"
                    />
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 35%, rgba(255,255,255,0) 65%)'
                      }}
                    />
                  </div>

                  <div className="relative z-10 px-4 pt-8 text-center space-y-4">
                    <div className="shadow-3xs inline-block">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white border border-slate-100 text-[#081C3A] font-bold text-[8px] uppercase tracking-wider">
                        <ShieldCheck className="h-3 w-3 text-[#11B5D8] mr-1" />
                        BEST DENTAL HOSPITAL IN RAJKOT
                      </span>
                    </div>

                    <h1 className="font-display text-[15px] leading-snug font-extrabold text-[#081C3A] whitespace-pre-wrap">
                      {draftHeading}
                    </h1>

                    <p className="text-slate-700 font-sans text-[10px] leading-relaxed font-medium px-2 whitespace-pre-wrap">
                      {draftDescription}
                    </p>

                    <div className="flex gap-2 justify-center pt-2">
                      <div className="flex-1 py-1.5 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white text-[9.5px] font-bold rounded-md text-center">
                        Book Appointment
                      </div>
                      <div className="flex-1 py-1.5 bg-white border border-[#128C7E] text-[#128C7E] text-[9.5px] font-bold rounded-md text-center">
                        WhatsApp Us
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-slate-150 flex items-center justify-between bg-slate-50">
              <span className="text-[11px] text-slate-500 italic">
                * Simulated layouts represent responsive browser frameworks.
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                >
                  Close Preview
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleSave();
                    setIsPreviewOpen(false);
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition cursor-pointer"
                >
                  Save & Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Services Delete Confirmation Dialog Modal */}
      {serviceToDelete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setServiceToDelete(null)} />
          
          {/* Card container */}
          <div className="relative bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-sm w-full p-6 text-slate-800 z-10 animate-fade-in">
            <h3 className="text-base font-extrabold text-[#081C3A] mb-2">Delete Treatment Service</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Are you sure you want to delete this service? This action is permanent and will delete all associated gallery images and FAQs.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setServiceToDelete(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteService}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition cursor-pointer shadow-sm shadow-rose-600/10"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add by URL Modal */}
      {isAddByUrlOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setIsAddByUrlOpen(false)} />
          
          {/* Card container */}
          <div className="relative bg-white rounded-2xl border border-slate-150 shadow-2xl max-w-md w-full p-6 text-slate-800 z-10 animate-fade-in">
            <h3 className="text-base font-extrabold text-[#081C3A] mb-1">Add Image by URL</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Paste a direct image URL from Unsplash, Pexels, or other clinical image hosting sites.
            </p>

            {addByUrlError && (
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs font-semibold leading-relaxed mb-4">
                ⚠️ {addByUrlError}
              </div>
            )}

            <form onSubmit={handleAddGalleryByUrl} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Image URL *</label>
                <input
                  type="text"
                  required
                  value={addByUrlInput}
                  onChange={(e) => setAddByUrlInput(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-mono bg-white text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Caption (Optional)</label>
                <input
                  type="text"
                  value={addByUrlCaption}
                  onChange={(e) => setAddByUrlCaption(e.target.value)}
                  placeholder="e.g. Clinical implant outcome"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Alt Text (Optional, SEO)</label>
                <input
                  type="text"
                  value={addByUrlAltText}
                  onChange={(e) => setAddByUrlAltText(e.target.value)}
                  placeholder="e.g. titanium dental implant procedure setup"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setAddByUrlInput('');
                    setAddByUrlCaption('');
                    setAddByUrlAltText('');
                    setAddByUrlError(null);
                    setIsAddByUrlOpen(false);
                  }}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] rounded-xl transition cursor-pointer shadow-sm shadow-teal-600/10"
                >
                  Save Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Replace Gallery Image Modal */}
      {replacingGalleryItemIndex !== null && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => {
            setReplacingGalleryItemIndex(null);
            setReplaceUrlInput('');
            setReplaceError(null);
          }} />
          
          {/* Card container */}
          <div className="relative bg-white rounded-2xl border border-slate-150 shadow-2xl max-w-md w-full p-6 text-slate-800 z-10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-extrabold text-[#081C3A]">Replace Gallery Image</h3>
              <button
                type="button"
                onClick={() => {
                  setReplacingGalleryItemIndex(null);
                  setReplaceUrlInput('');
                  setReplaceError(null);
                }}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Choose one of the two options below to replace the image. The current caption, alt text, and display order will be preserved.
            </p>

            {replaceError && (
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs font-semibold leading-relaxed mb-4 font-medium">
                ⚠️ {replaceError}
              </div>
            )}

            <div className="space-y-6">
              {/* Option 1: Upload File */}
              <div className="space-y-2">
                <span className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Option 1: Upload New Image</span>
                <div 
                  className="border-2 border-dashed border-slate-200 hover:border-teal-500/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-slate-50/30 transition duration-150 relative cursor-pointer"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={async (e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      await handleReplaceUploadedFile(replacingGalleryItemIndex, e.dataTransfer.files[0]);
                    }
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        await handleReplaceUploadedFile(replacingGalleryItemIndex, e.target.files[0]);
                      }
                    }}
                  />
                  <div className="p-2.5 bg-white border border-slate-100 rounded-full shadow-3xs text-slate-400 mb-2">
                    {galleryUploading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600" />
                    ) : (
                      <Upload className="h-4 w-4 text-[#0D9488]" />
                    )}
                  </div>
                  <span className="text-[11px] font-bold text-slate-700">
                    {galleryUploading ? 'Uploading to Supabase...' : 'Drag & Drop or Click to Upload'}
                  </span>
                  <span className="text-[9px] text-slate-400 mt-0.5">PNG, JPG or WEBP up to 5MB</span>
                </div>
              </div>

              {/* Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-150"></div>
                <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">OR</span>
                <div className="flex-grow border-t border-slate-150"></div>
              </div>

              {/* Option 2: Replace by URL */}
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleReplaceByUrl(replacingGalleryItemIndex);
                }} 
                className="space-y-3"
              >
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Option 2: Replace by URL</label>
                  <input
                    type="text"
                    required
                    value={replaceUrlInput}
                    onChange={(e) => setReplaceUrlInput(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-mono bg-white text-slate-800"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={gallerySaving || galleryUploading}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] rounded-xl transition cursor-pointer shadow-sm shadow-teal-600/10 flex items-center gap-1.5"
                  >
                    {gallerySaving ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white" />
                        Replacing...
                      </>
                    ) : (
                      'Replace Image URL'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Gallery Image Confirmation Modal */}
      {galleryImageToDelete !== null && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setGalleryImageToDelete(null)} />
          
          {/* Card container */}
          <div className="relative bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-sm w-full p-6 text-slate-800 z-10">
            <h3 className="text-base font-extrabold text-[#081C3A] mb-2">Delete Gallery Image</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed font-medium">
              Are you sure you want to delete this gallery image from the database? This action is permanent, and the website will immediately stop displaying it. The physical file will not be deleted from storage.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setGalleryImageToDelete(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteGalleryImage}
                disabled={gallerySaving}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition cursor-pointer shadow-sm shadow-rose-600/10 flex items-center gap-1.5 animate-pulse-once"
              >
                {gallerySaving ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Service Edit Right Side Slide Drawer */}
      {editingService && (
        <div className="fixed inset-0 z-[150] flex justify-end" id="service-drawer-overlay">
          {/* Backdrop overlay with fade */}
          <div
            className="fixed inset-0 bg-[#0B1B33]/55 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setEditingService(null)}
          />

          {/* Right Drawer Box */}
          <div className="relative w-full md:w-[750px] bg-white h-full shadow-2xl flex flex-col z-110 border-l border-slate-100 animate-slide-in">
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-3">
                {/* ← Back Button */}
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-xs font-bold shadow-3xs cursor-pointer transition duration-150 shrink-0"
                >
                  <ArrowLeft className="h-3.5 w-3.5 text-slate-500" />
                  <span>← Back</span>
                </button>
                
                <div className="min-w-0">
                  <h3 className="font-display font-extrabold text-[#081C3A] text-base md:text-lg leading-tight">
                    {servicesList.some(s => s.id === editingService.id) 
                      ? `Edit Treatment Service (ID: ${editingService.id})` 
                      : 'Add New Service'}
                  </h3>
                  <p className="text-slate-500 text-[11px] font-medium mt-0.5 truncate flex items-center gap-1">
                    <span className="font-bold text-[#0D9488]">ID:</span>
                    <span className="font-mono text-slate-700">{editingService.id}</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tab Bar */}
            <div className="flex border-b border-slate-100 bg-slate-50/20 px-6 shrink-0">
              <button
                type="button"
                onClick={() => setActiveServiceEditorTab('details')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeServiceEditorTab === 'details'
                    ? 'border-[#0D9488] text-[#0D9488]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Stethoscope className="h-4 w-4" />
                Service Details
              </button>
              <button
                type="button"
                disabled={!editingService || !servicesList.some(s => s.id === editingService.id)}
                onClick={() => editingService && servicesList.some(s => s.id === editingService.id) && setActiveServiceEditorTab('media')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  !(editingService && servicesList.some(s => s.id === editingService.id))
                    ? 'opacity-40 cursor-not-allowed text-slate-400 border-transparent'
                    : activeServiceEditorTab === 'media'
                    ? 'border-[#0D9488] text-[#0D9488] cursor-pointer'
                    : 'border-transparent text-slate-500 hover:text-slate-800 cursor-pointer'
                }`}
                title={!(editingService && servicesList.some(s => s.id === editingService.id)) ? "Please save service details first to enable Media." : "Manage service media files"}
              >
                <Video className="h-4 w-4" />
                Media Management
              </button>
              <button
                type="button"
                disabled={!editingService || !servicesList.some(s => s.id === editingService.id)}
                onClick={() => editingService && servicesList.some(s => s.id === editingService.id) && setActiveServiceEditorTab('gallery')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  !(editingService && servicesList.some(s => s.id === editingService.id))
                    ? 'opacity-40 cursor-not-allowed text-slate-400 border-transparent'
                    : activeServiceEditorTab === 'gallery'
                    ? 'border-[#0D9488] text-[#0D9488] cursor-pointer'
                    : 'border-transparent text-slate-500 hover:text-slate-800 cursor-pointer'
                }`}
                title={!(editingService && servicesList.some(s => s.id === editingService.id)) ? "Please save service details first to enable gallery." : "Manage service gallery images"}
              >
                <ImageIcon className="h-4 w-4" />
                Gallery
              </button>
              <button
                type="button"
                disabled={!editingService || !servicesList.some(s => s.id === editingService.id)}
                onClick={() => editingService && servicesList.some(s => s.id === editingService.id) && setActiveServiceEditorTab('faqs')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  !(editingService && servicesList.some(s => s.id === editingService.id))
                    ? 'opacity-40 cursor-not-allowed text-slate-400 border-transparent'
                    : activeServiceEditorTab === 'faqs'
                    ? 'border-[#0D9488] text-[#0D9488] cursor-pointer'
                    : 'border-transparent text-slate-500 hover:text-slate-800 cursor-pointer'
                }`}
                title={!(editingService && servicesList.some(s => s.id === editingService.id)) ? "Please save service details first to enable FAQs." : "Manage service FAQs"}
              >
                <MessageCircle className="h-4 w-4" />
                FAQs
              </button>
              <button
                type="button"
                disabled={!editingService || !servicesList.some(s => s.id === editingService.id)}
                onClick={() => editingService && servicesList.some(s => s.id === editingService.id) && setActiveServiceEditorTab('marketing')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  !(editingService && servicesList.some(s => s.id === editingService.id))
                    ? 'opacity-40 cursor-not-allowed text-slate-400 border-transparent'
                    : activeServiceEditorTab === 'marketing'
                    ? 'border-[#0D9488] text-[#0D9488] cursor-pointer'
                    : 'border-transparent text-slate-500 hover:text-slate-800 cursor-pointer'
                }`}
                title={!(editingService && servicesList.some(s => s.id === editingService.id)) ? "Please save service details first to enable Marketing." : "Manage service Marketing & CTA configurations"}
              >
                <Sparkles className="h-4 w-4" />
                Marketing & CTA
              </button>
            </div>

            {/* Scrollable Form */}
            {activeServiceEditorTab === 'details' ? (
              <form onSubmit={handleSaveService} className="flex-1 overflow-y-auto p-6 space-y-6">
                {saveMessage && (
                  <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 border animate-fade-in ${
                    saveMessage.includes('successfully') 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                      : 'bg-teal-50 border-teal-200 text-teal-800'
                  }`}>
                    <Check className="h-4 w-4 text-teal-600 shrink-0" />
                    <span>{saveMessage}</span>
                  </div>
                )}
                {serviceFormError && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs font-semibold leading-relaxed">
                    ⚠️ {serviceFormError}
                  </div>
                )}

                {/* Service Title */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      let nextSlug = editingService.slug;
                      if (!isSlugTouched) {
                        nextSlug = newTitle
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, '');
                      }
                      setEditingService({
                        ...editingService,
                        title: newTitle,
                        slug: nextSlug
                      });
                    }}
                    placeholder="e.g. Oral & Maxillofacial Surgery"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Web Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingService.slug}
                    onChange={(e) => {
                      setIsSlugTouched(true);
                      setEditingService({
                        ...editingService,
                        slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                      });
                    }}
                    placeholder="e.g. maxillofacial-surgery"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-mono bg-white text-slate-800"
                  />
                  <p className="text-[10px] text-slate-400 font-medium">
                    The unique path segment for the service URL. Only letters, numbers, and hyphens.
                  </p>
                </div>

                {/* Short Description */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Short Description *</label>
                  <textarea
                    rows={2}
                    required
                    value={editingService.short_description}
                    onChange={(e) => setEditingService({ ...editingService, short_description: e.target.value })}
                    placeholder="A brief summary of the service displayed in search results and card lists..."
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 resize-none"
                  />
                </div>

                {/* Home Page Short Description */}
                <div className="space-y-1.5 p-3.5 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Home Page Short Description</label>
                    <span className="text-[9px] text-[#0D9488] font-bold uppercase tracking-widest bg-[#0D9488]/10 px-1.5 py-0.5 rounded">Home Only</span>
                  </div>
                  <textarea
                    rows={2}
                    value={editingService.homepage_short_description || ''}
                    onChange={(e) => setEditingService({ ...editingService, homepage_short_description: e.target.value })}
                    placeholder="If empty, automatically falls back to the master Short Description..."
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 resize-none"
                  />
                  <p className="text-[9px] text-slate-400 font-medium leading-relaxed">
                    Optional multiline description shown only on the Home Page Service Card.
                  </p>
                </div>

                {/* Full Description */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Full Service Description *</label>
                  <textarea
                    rows={6}
                    required
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    placeholder="Detailed explanation of clinical procedures, medical methodologies, recovery time, etc..."
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  />
                </div>

                {/* Hero Image Box & Upload Zone */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Hero Image *</label>
                  
                  {editingService.hero_image && (
                    <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 h-44 flex items-center justify-center">
                      <img
                        src={editingService.hero_image}
                        alt="Service Hero Preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingService({ ...editingService, hero_image: '' })}
                          className="p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-md cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Remove Hero</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* File Drag and Drop */}
                    <div 
                      className="border-2 border-dashed border-slate-200 hover:border-teal-500/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-slate-50/30 transition duration-150 relative cursor-pointer"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={async (e) => {
                        e.preventDefault();
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          await handleServiceHeroImageUpload(e.dataTransfer.files[0]);
                        }
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        id="service-hero-file-input"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            await handleServiceHeroImageUpload(e.target.files[0]);
                          }
                        }}
                      />
                      <div className="p-3 bg-white border border-slate-100 rounded-full shadow-3xs text-slate-400 mb-2">
                        {serviceImgUploading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-teal-600" />
                        ) : (
                          <Upload className="h-5 w-5 text-[#0D9488]" />
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-slate-700">
                        {serviceImgUploading ? 'Uploading to Supabase...' : 'Drag & Drop to Upload'}
                      </span>
                      <span className="text-[9px] text-slate-400 mt-0.5">PNG, JPG or WEBP up to 5MB</span>
                    </div>

                    {/* Manual URL Input */}
                    <div className="p-4 border border-slate-150 rounded-2xl bg-white space-y-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Or Specify Direct URL</span>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={editingService.hero_image}
                        onChange={(e) => setEditingService({ ...editingService, hero_image: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-mono bg-white text-slate-800"
                      />
                      <p className="text-[9px] text-slate-400 leading-relaxed">
                        You can paste a stock photo link directly from Unsplash, Pexels or other clinical galleries.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Home Page Card Image Box & Upload Zone */}
                <div className="space-y-2 p-3.5 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 font-sans">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Home Page Card Image</label>
                    <span className="text-[9px] text-[#0D9488] font-bold uppercase tracking-widest bg-[#0D9488]/10 px-1.5 py-0.5 rounded">Home Only</span>
                  </div>
                  
                  {editingService.homepage_card_image && (
                    <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 h-44 flex items-center justify-center">
                      <img
                        src={editingService.homepage_card_image}
                        alt="Service Home Card Preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingService({ ...editingService, homepage_card_image: '' })}
                          className="p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-md cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Remove Image</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* File Drag and Drop */}
                    <div 
                      className="border-2 border-dashed border-slate-200 hover:border-teal-500/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-white transition duration-150 relative cursor-pointer"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={async (e) => {
                        e.preventDefault();
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          await handleHomePageCardImageUpload(e.dataTransfer.files[0]);
                        }
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        id="service-homepage-file-input"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            await handleHomePageCardImageUpload(e.target.files[0]);
                          }
                        }}
                      />
                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-full shadow-3xs text-slate-400 mb-2">
                        {homePageImgUploading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-teal-600" />
                        ) : (
                          <Upload className="h-5 w-5 text-[#0D9488]" />
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-slate-700">
                        {homePageImgUploading ? 'Uploading to Supabase...' : 'Drag & Drop to Upload'}
                      </span>
                      <span className="text-[9px] text-slate-400 mt-0.5">PNG, JPG or WEBP up to 5MB</span>
                    </div>

                    {/* Manual URL Input */}
                    <div className="p-4 border border-slate-150 rounded-2xl bg-white space-y-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Or Specify Direct URL</span>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={editingService.homepage_card_image || ''}
                        onChange={(e) => setEditingService({ ...editingService, homepage_card_image: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-mono bg-white text-slate-800"
                      />
                      <p className="text-[9px] text-slate-400 leading-relaxed">
                        Optional direct URL. If empty, automatically falls back to the master Hero Image.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 1. HERO CONTENT ENHANCEMENT */}
                <div className="border-t border-slate-100 pt-6 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-[#0D9488]" />
                    <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">Hero Section Content (Phase 1)</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Custom Hero Title</label>
                      <input
                        type="text"
                        placeholder="Fallback to Service Title"
                        value={editingService.hero_title || ''}
                        onChange={(e) => setEditingService({ ...editingService, hero_title: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Hero Image Caption</label>
                      <input
                        type="text"
                        placeholder="Optional photo caption / equipment credit"
                        value={editingService.hero_image_caption || ''}
                        onChange={(e) => setEditingService({ ...editingService, hero_image_caption: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Custom Hero Description</label>
                    <textarea
                      rows={2}
                      placeholder="Fallback to Short Description"
                      value={editingService.hero_description || ''}
                      onChange={(e) => setEditingService({ ...editingService, hero_description: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 resize-none"
                    />
                  </div>
                </div>

                {/* 2. INTRODUCTION SECTION */}
                <div className="border-t border-slate-100 pt-6 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Stethoscope className="h-4 w-4 text-[#0D9488]" />
                    <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">Introduction Section (Phase 1)</h4>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Introduction Title</label>
                    <input
                      type="text"
                      placeholder="e.g. What is a Dental Implant? (Fallback is About the Treatment)"
                      value={editingService.intro_title || ''}
                      onChange={(e) => setEditingService({ ...editingService, intro_title: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Introduction Description</label>
                    <textarea
                      rows={3}
                      placeholder="Detailed clinical overview of this treatment (Fallback to Full Description)"
                      value={editingService.intro_description || ''}
                      onChange={(e) => setEditingService({ ...editingService, intro_description: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 resize-none"
                    />
                  </div>
                </div>

                {/* 3. PROCESS SECTION */}
                <div className="border-t border-slate-100 pt-6 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-[#0D9488]" />
                      <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">Treatment Process Steps</h4>
                    </div>
                    <span className="text-[9px] bg-teal-50 text-[#0D9488] border border-teal-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {steps.length} Steps
                    </span>
                  </div>

                  {steps.length === 0 ? (
                    <div className="p-6 bg-slate-50/50 border border-slate-150 rounded-2xl text-center space-y-1.5">
                      <p className="text-xs text-slate-500 font-medium">No process steps added yet.</p>
                      <p className="text-[10px] text-slate-400">Add steps below to detail the clinical stages of this treatment.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {steps.map((step, index) => (
                        <div key={index} className="p-4 bg-slate-50/40 border border-slate-150 rounded-2xl space-y-3 relative group">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] bg-white border border-slate-200 px-2.5 py-1 rounded-lg font-black text-[#0D9488]">
                              STEP {(index + 1).toString().padStart(2, '0')}
                            </span>
                            
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={index === 0}
                                onClick={() => moveStep(index, 'up')}
                                className="p-1 px-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg text-slate-500 hover:text-[#0D9488] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-transparent disabled:hover:text-slate-500 transition cursor-pointer text-xs font-bold"
                                title="Move Step Up"
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                disabled={index === steps.length - 1}
                                onClick={() => moveStep(index, 'down')}
                                className="p-1 px-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg text-slate-500 hover:text-[#0D9488] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-transparent disabled:hover:text-slate-500 transition cursor-pointer text-xs font-bold"
                                title="Move Step Down"
                              >
                                ▼
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteStep(index)}
                                className="p-1 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg text-slate-400 hover:text-rose-600 transition cursor-pointer ml-1"
                                title="Delete Step"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                            <div className="sm:col-span-9 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Step Title</span>
                              <input
                                type="text"
                                placeholder="e.g. Clinical Diagnostics"
                                value={step.title || ''}
                                onChange={(e) => updateStep(index, 'title', e.target.value)}
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                                required
                              />
                            </div>
                            <div className="sm:col-span-3 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Order</span>
                              <input
                                type="number"
                                placeholder="Order"
                                value={step.display_order}
                                onChange={(e) => updateStep(index, 'display_order', parseInt(e.target.value) || 0)}
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-mono bg-white text-slate-800"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Step Description</span>
                            <textarea
                              rows={2}
                              placeholder="Describe what occurs during this phase of the treatment..."
                              value={step.description || ''}
                              onChange={(e) => updateStep(index, 'description', e.target.value)}
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 resize-none"
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={addStep}
                    className="w-full py-2.5 border border-dashed border-[#0D9488]/30 hover:border-[#0D9488] bg-teal-50/5 hover:bg-teal-50/20 text-[#0D9488] text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    Add Procedure Step
                  </button>
                </div>

                {/* 4. FEATURE / BENEFITS SECTION */}
                <div className="border-t border-slate-100 pt-6 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#0D9488]" />
                      <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">Features & Benefits Cards</h4>
                    </div>
                    <span className="text-[9px] bg-teal-50 text-[#0D9488] border border-teal-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {feats.length} Cards
                    </span>
                  </div>

                  {feats.length === 0 ? (
                    <div className="p-6 bg-slate-50/50 border border-slate-150 rounded-2xl text-center space-y-1.5">
                      <p className="text-xs text-slate-500 font-medium">No feature cards added yet.</p>
                      <p className="text-[10px] text-slate-400">Add features below to display custom high-trust highlight cards.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {feats.map((feat, index) => (
                        <div key={index} className="p-4 bg-slate-50/40 border border-slate-150 rounded-2xl space-y-3 relative group">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] bg-white border border-slate-200 px-2.5 py-1 rounded-lg font-black text-[#0D9488]">
                              CARD {(index + 1).toString().padStart(2, '0')}
                            </span>
                            
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={index === 0}
                                onClick={() => moveFeat(index, 'up')}
                                className="p-1 px-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg text-slate-500 hover:text-[#0D9488] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-transparent disabled:hover:text-slate-500 transition cursor-pointer text-xs font-bold"
                                title="Move Card Up"
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                disabled={index === feats.length - 1}
                                onClick={() => moveFeat(index, 'down')}
                                className="p-1 px-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg text-slate-500 hover:text-[#0D9488] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-transparent disabled:hover:text-slate-500 transition cursor-pointer text-xs font-bold"
                                title="Move Card Down"
                              >
                                ▼
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteFeat(index)}
                                className="p-1 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg text-slate-400 hover:text-rose-600 transition cursor-pointer ml-1"
                                title="Delete Card"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                            <div className="sm:col-span-9 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Card Title</span>
                              <input
                                type="text"
                                placeholder="e.g. Painless Therapy"
                                value={feat.title || ''}
                                onChange={(e) => updateFeat(index, 'title', e.target.value)}
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                                required
                              />
                            </div>
                            <div className="sm:col-span-3 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Order</span>
                              <input
                                type="number"
                                placeholder="Order"
                                value={feat.display_order}
                                onChange={(e) => updateFeat(index, 'display_order', parseInt(e.target.value) || 0)}
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-mono bg-white text-slate-800"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Card Description</span>
                            <textarea
                              rows={2}
                              placeholder="Enter a brief, compelling description for this benefit card..."
                              value={feat.description || ''}
                              onChange={(e) => updateFeat(index, 'description', e.target.value)}
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 resize-none"
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={addFeat}
                    className="w-full py-2.5 border border-dashed border-[#0D9488]/30 hover:border-[#0D9488] bg-teal-50/5 hover:bg-teal-50/20 text-[#0D9488] text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    Add Feature / Benefit Card
                  </button>
                </div>

                {/* Display Order & Active Toggle Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Display Order */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Display Order *</label>
                    <input
                      type="number"
                      required
                      value={editingService.display_order}
                      onChange={(e) => setEditingService({ ...editingService, display_order: parseInt(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-mono bg-white text-slate-800"
                    />
                    <p className="text-[10px] text-slate-400 font-medium">Used for custom sorting. Lower numbers sort first.</p>
                  </div>

                  {/* Active/Inactive Status Toggle */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Availability Status</label>
                    <div className="flex items-center gap-3 h-10 px-3 border border-slate-200 rounded-xl bg-slate-50/50">
                      <input
                        type="checkbox"
                        id="service-is-active-chk"
                        checked={editingService.is_active}
                        onChange={(e) => setEditingService({ ...editingService, is_active: e.target.checked })}
                        className="w-4 h-4 text-[#0D9488] border-slate-300 rounded-sm focus:ring-[#0D9488] cursor-pointer"
                      />
                      <label htmlFor="service-is-active-chk" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                        Active (Display publicly on website)
                      </label>
                    </div>
                  </div>
                </div>

                {/* SEO Configurations */}
                <div className="border-t border-slate-100 pt-6 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-[#0D9488]" />
                    <h4 className="text-xs font-extrabold text-[#081C3A] uppercase tracking-wider">Search Engine Optimization (SEO)</h4>
                  </div>

                  {/* SEO Title */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">SEO Meta Title</label>
                    <input
                      type="text"
                      value={editingService.seo_title || ''}
                      onChange={(e) => setEditingService({ ...editingService, seo_title: e.target.value })}
                      placeholder="Custom meta title for Google, fallback is Service Title"
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                    />
                  </div>

                  {/* SEO Description */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">SEO Meta Description</label>
                    <textarea
                      rows={2}
                      value={editingService.seo_description || ''}
                      onChange={(e) => setEditingService({ ...editingService, seo_description: e.target.value })}
                      placeholder="Custom meta snippet for search results, fallback is Short Description"
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 resize-none"
                    />
                  </div>
                </div>

                {/* Bottom Sticky Action Buttons */}
                <div className="border-t border-slate-100 pt-6 flex items-center justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="h-4 w-4" />
                    {servicesList.some(s => s.id === editingService.id) ? 'Update Service' : 'Save Service'}
                  </button>
                </div>
              </form>
            ) : activeServiceEditorTab === 'media' ? (
              <form onSubmit={handleSaveService} className="flex-1 overflow-y-auto p-6 space-y-6 font-sans" id="service-media-tab">
                {saveMessage && (
                  <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 border animate-fade-in ${
                    saveMessage.includes('successfully') 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                      : 'bg-teal-50 border-teal-200 text-teal-800'
                  }`}>
                    <Check className="h-4 w-4 text-teal-600 shrink-0" />
                    <span>{saveMessage}</span>
                  </div>
                )}
                {serviceFormError && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs font-semibold leading-relaxed">
                    ⚠️ {serviceFormError}
                  </div>
                )}

                {/* MEDIA GUIDELINES HEADER */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 shrink-0 flex items-start gap-3">
                  <div className="p-2 bg-teal-50 border border-teal-100 rounded-xl text-[#0D9488]">
                    <Video className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">Clinic Media Management</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      Provide high-quality clinical, facility, and patient-centered media for the public service pages. 
                      If any section is left blank, the portal will automatically fallback to default illustrations to maintain visual integrity.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-[9px] font-bold text-slate-400">
                      <span>📸 Hero image: 1600×900 px (16:9)</span>
                      <span>🏥 Clinic photos: 1200×800 px (3:2)</span>
                      <span>👩‍⚕️ Team photos: 600×600 px (1:1)</span>
                      <span>🦷 Equipment: 1200×800 px</span>
                    </div>
                  </div>
                </div>

                {/* 1. HERO MEDIA SECTION */}
                <div className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-white shadow-3xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#0D9488]" />
                      <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">Hero Section Media</h4>
                    </div>
                    <span className="text-[9px] font-black uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      Recommended: 1600 × 900 px (16:9)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-3">
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-black text-slate-500 uppercase block">Hero Background Image URL</span>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingService.hero_image || ''}
                            onChange={(e) => setEditingService({ ...editingService, hero_image: e.target.value })}
                            placeholder="Image URL (e.g., https://images.unsplash.com/...)"
                            className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-mono text-slate-800 bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => triggerUpload('image/*', (url) => setEditingService({ ...editingService, hero_image: url }))}
                            className="px-3.5 py-2 bg-teal-50 hover:bg-teal-100 text-[#0D9488] rounded-xl text-xs font-bold border border-teal-200 transition cursor-pointer"
                          >
                            Upload Image
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-black text-slate-500 uppercase block">Hero Image Caption</span>
                          <input
                            type="text"
                            placeholder="Optional caption or credit line"
                            value={editingService.hero_image_caption || ''}
                            onChange={(e) => setEditingService({ ...editingService, hero_image_caption: e.target.value })}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-800 bg-white font-medium"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-black text-slate-500 uppercase block">Hero Image Alt Text (SEO)</span>
                          <input
                            type="text"
                            placeholder="e.g. clinic surgeon performing laser procedure"
                            value={mConfig.hero_image_alt || ''}
                            onChange={(e) => updateMarketingConfig('hero_image_alt', e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-800 bg-white font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Real-time Hero Preview */}
                    <div className="border border-slate-150 rounded-xl p-3 bg-slate-50/40 flex flex-col items-center justify-center text-center relative group overflow-hidden">
                      {editingService.hero_image ? (
                        <div className="w-full h-full flex flex-col justify-between">
                          <div className="aspect-video w-full rounded-lg bg-slate-100 overflow-hidden relative shadow-3xs">
                            <img
                              src={editingService.hero_image}
                              alt={mConfig.hero_image_alt || 'Hero Preview'}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              type="button"
                              onClick={() => setEditingService({ ...editingService, hero_image: '' })}
                              className="absolute top-1.5 right-1.5 p-1 bg-white/90 hover:bg-rose-50 text-rose-500 rounded-lg shadow-sm transition"
                              title="Clear Image"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="mt-2 text-left space-y-0.5">
                            <span className="text-[9px] font-black text-[#081C3A] block uppercase tracking-wider truncate">
                              Caption: {editingService.hero_image_caption || <span className="italic text-slate-400">None</span>}
                            </span>
                            <span className="text-[8px] font-semibold text-slate-400 block uppercase tracking-wider truncate">
                              Alt: {mConfig.hero_image_alt || <span className="italic text-slate-300">None</span>}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="py-6">
                          <ImageIcon className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">No Hero Image Set</span>
                          <span className="text-[8px] text-slate-300 mt-0.5 block">Fallback to default illustrative media.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. CONTENT SECTION IMAGES */}
                <div className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-white shadow-3xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-[#0D9488]" />
                      <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">Content Section Images</h4>
                    </div>
                    <span className="text-[10px] bg-teal-50 text-[#0D9488] border border-teal-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {Array.isArray(editingService.content_images) ? editingService.content_images.length : 0} Images
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Embed high-resolution images within the full clinical descriptions or procedure process sections. Keep your sections visually engaging.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* File Upload for Content Images */}
                    <div className="border-2 border-dashed border-slate-200 hover:border-teal-500/50 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-slate-50/10 cursor-pointer relative">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            await handleAddContentImage(e.target.files);
                          }
                        }}
                      />
                      <Upload className="h-5 w-5 text-[#0D9488] mb-1.5" />
                      <span className="text-[11px] font-bold text-slate-700">Drag & Drop or Click to Upload</span>
                      <span className="text-[9px] text-slate-400 mt-0.5">JPEG, PNG or WEBP up to 5MB</span>
                    </div>

                    {/* Manual URL Input */}
                    <div className="p-4 border border-slate-150 rounded-xl bg-slate-50/5 space-y-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Add by direct URL</span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="new-content-image-url-input"
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-mono text-slate-800 bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById('new-content-image-url-input') as HTMLInputElement;
                            if (input && input.value.trim()) {
                              handleAddContentImage(null, input.value.trim());
                              input.value = '';
                            }
                          }}
                          className="px-3 py-1.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold rounded-lg transition"
                        >
                          Add URL
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* List of Content Images */}
                  {Array.isArray(editingService.content_images) && editingService.content_images.length > 0 && (
                    <div className="space-y-3 mt-4">
                      {editingService.content_images.map((imgItem: any, index: number) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 border border-slate-150 rounded-xl bg-slate-50/30">
                          <div className="relative group w-24 h-18 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden shrink-0">
                            <img src={imgItem.image_url} alt="Content preview" className="w-full h-full object-cover" />
                          </div>

                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-3">
                            <div className="sm:col-span-5 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Caption</span>
                              <input
                                type="text"
                                value={imgItem.caption || ''}
                                onChange={(e) => {
                                  const list = [...(editingService.content_images || [])];
                                  list[index] = { ...list[index], caption: e.target.value };
                                  setEditingService({ ...editingService, content_images: list });
                                }}
                                placeholder="Caption"
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                              />
                            </div>
                            <div className="sm:col-span-5 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Alt Text (SEO)</span>
                              <input
                                type="text"
                                value={imgItem.alt_text || ''}
                                onChange={(e) => {
                                  const list = [...(editingService.content_images || [])];
                                  list[index] = { ...list[index], alt_text: e.target.value };
                                  setEditingService({ ...editingService, content_images: list });
                                }}
                                placeholder="Alt text"
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                              />
                            </div>
                            <div className="sm:col-span-2 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Sort Order</span>
                              <input
                                type="number"
                                value={imgItem.display_order || 0}
                                onChange={(e) => {
                                  const list = [...(editingService.content_images || [])];
                                  list[index] = { ...list[index], display_order: parseInt(e.target.value) || 0 };
                                  setEditingService({ ...editingService, content_images: list });
                                }}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-mono font-medium"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-end shrink-0 gap-2 sm:border-l sm:border-slate-100 sm:pl-3">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => {
                                const list = [...(editingService.content_images || [])];
                                const temp = list[index];
                                list[index] = list[index - 1];
                                list[index - 1] = temp;
                                setEditingService({ ...editingService, content_images: list });
                              }}
                              className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 disabled:opacity-30 cursor-pointer"
                              title="Move Up"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              disabled={index === (editingService.content_images || []).length - 1}
                              onClick={() => {
                                const list = [...(editingService.content_images || [])];
                                const temp = list[index];
                                list[index] = list[index + 1];
                                list[index + 1] = temp;
                                setEditingService({ ...editingService, content_images: list });
                              }}
                              className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 disabled:opacity-30 cursor-pointer"
                              title="Move Down"
                            >
                              ▼
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const list = (editingService.content_images || []).filter((_, i) => i !== index);
                                setEditingService({ ...editingService, content_images: list });
                              }}
                              className="p-1 hover:bg-rose-50 rounded-lg text-rose-500 cursor-pointer"
                              title="Delete Image"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. PROCEDURE VIDEO SECTION */}
                <div className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-white shadow-3xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-[#0D9488]" />
                      <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">Procedure / Clinical Videos</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...clinicalVideosList, {
                          title: '',
                          video_url: '',
                          thumbnail: '',
                          description: '',
                          display_order: (clinicalVideosList.length + 1) * 10
                        }];
                        saveProcedureVideos(updated);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-black rounded-lg transition cursor-pointer border border-teal-200"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Clinical Video
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Provide detailed virtual consultation videos, procedure simulations, or patient-educational walkthroughs. 
                    The first video in this list will automatically sync as the service's primary clinical video.
                  </p>

                  {clinicalVideosList.length === 0 ? (
                    <div className="p-6 bg-slate-50/50 border border-slate-150 rounded-2xl text-center">
                      <p className="text-xs text-slate-400 font-semibold">No clinical or procedure videos added yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {clinicalVideosList.map((vid: any, index: number) => (
                        <div key={index} className="p-4 bg-slate-50/40 border border-slate-150 rounded-xl space-y-3 relative group">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] bg-white border border-slate-200 px-2.5 py-0.5 rounded-md font-black text-[#0D9488]">
                                VIDEO {(index + 1).toString().padStart(2, '0')}
                              </span>
                              {index === 0 && (
                                <span className="text-[8px] bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded-md font-black uppercase">
                                  ★ Primary
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={index === 0}
                                onClick={() => {
                                  const list = [...clinicalVideosList];
                                  const temp = list[index];
                                  list[index] = list[index - 1];
                                  list[index - 1] = temp;
                                  saveProcedureVideos(list);
                                }}
                                className="p-1 px-1.5 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg text-slate-500 disabled:opacity-30 cursor-pointer text-xs"
                                title="Move Up"
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                disabled={index === clinicalVideosList.length - 1}
                                onClick={() => {
                                  const list = [...clinicalVideosList];
                                  const temp = list[index];
                                  list[index] = list[index + 1];
                                  list[index + 1] = temp;
                                  saveProcedureVideos(list);
                                }}
                                className="p-1 px-1.5 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg text-slate-500 disabled:opacity-30 cursor-pointer text-xs"
                                title="Move Down"
                              >
                                ▼
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const list = clinicalVideosList.filter((_, i) => i !== index);
                                  saveProcedureVideos(list);
                                }}
                                className="p-1 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg text-slate-400 hover:text-rose-600 transition cursor-pointer ml-1"
                                title="Delete Video"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                            <div className="sm:col-span-4 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Video Title</span>
                              <input
                                type="text"
                                placeholder="e.g. Laser Root Canal Walkthrough"
                                value={vid.title || ''}
                                onChange={(e) => {
                                  const list = [...clinicalVideosList];
                                  list[index] = { ...list[index], title: e.target.value };
                                  saveProcedureVideos(list);
                                }}
                                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                              />
                            </div>
                            <div className="sm:col-span-5 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Video URL (YouTube or Direct MP4)</span>
                              <div className="flex gap-1">
                                <input
                                  type="text"
                                  placeholder="https://www.youtube.com/watch?v=..."
                                  value={vid.video_url || ''}
                                  onChange={(e) => {
                                    const list = [...clinicalVideosList];
                                    list[index] = { ...list[index], video_url: e.target.value };
                                    saveProcedureVideos(list);
                                  }}
                                  className="flex-1 px-2.5 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white font-mono text-slate-800"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    triggerUpload('video/*', (url) => {
                                      const list = [...clinicalVideosList];
                                      list[index] = { ...list[index], video_url: url };
                                      saveProcedureVideos(list);
                                    });
                                  }}
                                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-[10px] font-semibold text-slate-600 transition cursor-pointer"
                                >
                                  Upload
                                </button>
                              </div>
                            </div>
                            <div className="sm:col-span-3 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Thumbnail Image URL</span>
                              <div className="flex gap-1">
                                <input
                                  type="text"
                                  placeholder="Thumbnail URL"
                                  value={vid.thumbnail || ''}
                                  onChange={(e) => {
                                    const list = [...clinicalVideosList];
                                    list[index] = { ...list[index], thumbnail: e.target.value };
                                    saveProcedureVideos(list);
                                  }}
                                  className="flex-1 px-2.5 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white font-mono text-slate-800"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    triggerUpload('image/*', (url) => {
                                      const list = [...clinicalVideosList];
                                      list[index] = { ...list[index], thumbnail: url };
                                      saveProcedureVideos(list);
                                    });
                                  }}
                                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-[10px] font-semibold text-slate-600 transition cursor-pointer"
                                >
                                  Upload
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                            <div className="sm:col-span-10 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Video Description</span>
                              <textarea
                                rows={1}
                                placeholder="Describe what happens in this clinical or virtual consultation video..."
                                value={vid.description || ''}
                                onChange={(e) => {
                                  const list = [...clinicalVideosList];
                                  list[index] = { ...list[index], description: e.target.value };
                                  saveProcedureVideos(list);
                                }}
                                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium resize-none"
                              />
                            </div>
                            <div className="sm:col-span-2 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Order</span>
                              <input
                                type="number"
                                value={vid.display_order || 0}
                                onChange={(e) => {
                                  const list = [...clinicalVideosList];
                                  list[index] = { ...list[index], display_order: parseInt(e.target.value) || 0 };
                                  saveProcedureVideos(list);
                                }}
                                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-mono font-medium"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. PATIENT TESTIMONIAL VIDEOS */}
                <div className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-white shadow-3xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-[#0D9488]" />
                      <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">Patient Testimonial Videos</h4>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddTestimonial}
                      className="flex items-center gap-1.5 px-3 py-1 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-black rounded-lg transition cursor-pointer border border-teal-200"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Testimonial
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Share patient stories specifically relevant to this clinical treatment. Provide their review quote alongside a video.
                  </p>

                  {(!Array.isArray(editingService.patient_testimonials) || editingService.patient_testimonials.length === 0) ? (
                    <div className="p-6 bg-slate-50/50 border border-slate-150 rounded-2xl text-center">
                      <p className="text-xs text-slate-400 font-semibold">No patient testimonial videos added yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {editingService.patient_testimonials.map((testi: any, index: number) => (
                        <div key={index} className="p-4 bg-slate-50/40 border border-slate-150 rounded-xl space-y-3 relative group">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] bg-white border border-slate-200 px-2.5 py-0.5 rounded-md font-black text-[#0D9488]">
                              TESTIMONIAL {(index + 1).toString().padStart(2, '0')}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={index === 0}
                                onClick={() => {
                                  const list = [...(editingService.patient_testimonials || [])];
                                  const temp = list[index];
                                  list[index] = list[index - 1];
                                  list[index - 1] = temp;
                                  setEditingService({ ...editingService, patient_testimonials: list });
                                }}
                                className="p-1 px-1.5 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg text-slate-500 disabled:opacity-30 cursor-pointer text-xs"
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                disabled={index === (editingService.patient_testimonials || []).length - 1}
                                onClick={() => {
                                  const list = [...(editingService.patient_testimonials || [])];
                                  const temp = list[index];
                                  list[index] = list[index + 1];
                                  list[index + 1] = temp;
                                  setEditingService({ ...editingService, patient_testimonials: list });
                                }}
                                className="p-1 px-1.5 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg text-slate-500 disabled:opacity-30 cursor-pointer text-xs"
                              >
                                ▼
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const list = (editingService.patient_testimonials || []).filter((_, i) => i !== index);
                                  setEditingService({ ...editingService, patient_testimonials: list });
                                }}
                                className="p-1 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg text-slate-400 hover:text-rose-600 transition cursor-pointer ml-1"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                            <div className="sm:col-span-3 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Patient Name</span>
                              <input
                                type="text"
                                placeholder="e.g. Robert Downy"
                                value={testi.patient_name || ''}
                                onChange={(e) => {
                                  const list = [...(editingService.patient_testimonials || [])];
                                  list[index] = { ...list[index], patient_name: e.target.value };
                                  setEditingService({ ...editingService, patient_testimonials: list });
                                }}
                                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                              />
                            </div>
                            <div className="sm:col-span-3 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Treatment Received</span>
                              <input
                                type="text"
                                placeholder="e.g. All-On-4 Dental Implants"
                                value={testi.treatment_name || ''}
                                onChange={(e) => {
                                  const list = [...(editingService.patient_testimonials || [])];
                                  list[index] = { ...list[index], treatment_name: e.target.value };
                                  setEditingService({ ...editingService, patient_testimonials: list });
                                }}
                                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                              />
                            </div>
                            <div className="sm:col-span-2 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Star Rating</span>
                              <select
                                value={testi.star_rating || 5}
                                onChange={(e) => {
                                  const list = [...(editingService.patient_testimonials || [])];
                                  list[index] = { ...list[index], star_rating: parseInt(e.target.value) || 5 };
                                  setEditingService({ ...editingService, patient_testimonials: list });
                                }}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                              >
                                <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                                <option value="4">⭐⭐⭐⭐ (4/5)</option>
                                <option value="3">⭐⭐⭐ (3/5)</option>
                                <option value="2">⭐⭐ (2/5)</option>
                                <option value="1">⭐ (1/5)</option>
                              </select>
                            </div>
                            <div className="sm:col-span-4 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Video URL (YouTube or Direct)</span>
                              <div className="flex gap-1">
                                <input
                                  type="text"
                                  placeholder="Video URL"
                                  value={testi.video_url || ''}
                                  onChange={(e) => {
                                    const list = [...(editingService.patient_testimonials || [])];
                                    list[index] = { ...list[index], video_url: e.target.value };
                                    setEditingService({ ...editingService, patient_testimonials: list });
                                  }}
                                  className="flex-1 px-2.5 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white font-mono text-slate-800"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const fileInput = document.createElement('input');
                                    fileInput.type = 'file';
                                    fileInput.accept = 'video/*';
                                    fileInput.onchange = async (eEvent: any) => {
                                      if (eEvent.target.files && eEvent.target.files[0]) {
                                        await handleUploadTestimonialVideo(index, eEvent.target.files[0]);
                                      }
                                    };
                                    fileInput.click();
                                  }}
                                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-[10px] font-semibold text-slate-600 transition"
                                >
                                  Upload
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                            <div className="sm:col-span-10 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Short Review Quote</span>
                              <textarea
                                rows={1}
                                placeholder="Write a short summary review or a quote from the patient..."
                                value={testi.short_review || ''}
                                onChange={(e) => {
                                  const list = [...(editingService.patient_testimonials || [])];
                                  list[index] = { ...list[index], short_review: e.target.value };
                                  setEditingService({ ...editingService, patient_testimonials: list });
                                }}
                                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium resize-none"
                              />
                            </div>
                            <div className="sm:col-span-2 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Order</span>
                              <input
                                type="number"
                                value={testi.display_order || 0}
                                onChange={(e) => {
                                  const list = [...(editingService.patient_testimonials || [])];
                                  list[index] = { ...list[index], display_order: parseInt(e.target.value) || 0 };
                                  setEditingService({ ...editingService, patient_testimonials: list });
                                }}
                                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-mono font-medium"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 5A. HOSPITAL / CLINIC PHOTOS */}
                <div className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-white shadow-3xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-[#0D9488]" />
                      <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">Hospital / Clinic Photos</h4>
                    </div>
                    <span className="text-[10px] bg-teal-50 text-[#0D9488] border border-teal-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {(mConfig.hospital_photos || []).length} Photos
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                    Upload high-fidelity photos of the clinical facilities, reception desk, consulting suites, or treatment lounges.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* File Drag and Drop / Browse Upload */}
                    <div className="border-2 border-dashed border-slate-200 hover:border-teal-500/50 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-slate-50/10 cursor-pointer relative min-h-[110px]">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            const newPhotos = [...(mConfig.hospital_photos || [])];
                            for (let i = 0; i < e.target.files.length; i++) {
                              const file = e.target.files[i];
                              const url = await uploadImage(file);
                              if (url) {
                                newPhotos.push({
                                  image_url: url,
                                  title: file.name.split('.')[0].replace(/[-_]+/g, ' '),
                                  caption: '',
                                  display_order: (newPhotos.length + 1) * 10
                                });
                              }
                            }
                            updateMarketingConfig('hospital_photos', newPhotos);
                          }
                        }}
                      />
                      <Upload className="h-5 w-5 text-[#0D9488] mb-1.5" />
                      <span className="text-[11px] font-bold text-slate-700">Drag & Drop or Click to Upload</span>
                      <span className="text-[9px] text-slate-400 mt-0.5">JPEG, PNG or WEBP up to 5MB</span>
                    </div>

                    {/* Manual URL Input */}
                    <div className="p-4 border border-slate-150 rounded-xl bg-slate-50/5 space-y-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Add by direct URL</span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="new-hospital-photo-url-input"
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-mono text-slate-800 bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById('new-hospital-photo-url-input') as HTMLInputElement;
                            if (input && input.value.trim()) {
                              const newPhotos = [...(mConfig.hospital_photos || [])];
                              newPhotos.push({
                                image_url: input.value.trim(),
                                title: 'Hospital Facility',
                                caption: '',
                                display_order: (newPhotos.length + 1) * 10
                              });
                              updateMarketingConfig('hospital_photos', newPhotos);
                              input.value = '';
                            }
                          }}
                          className="px-3 py-1.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold rounded-lg transition cursor-pointer"
                        >
                          Add URL
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* List of Hospital Photos */}
                  {Array.isArray(mConfig.hospital_photos) && mConfig.hospital_photos.length > 0 && (
                    <div className="space-y-3 mt-4">
                      {mConfig.hospital_photos.map((itemObj: any, index: number) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 border border-slate-150 rounded-xl bg-slate-50/30">
                          <div className="relative group w-24 h-18 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden shrink-0">
                            <img src={itemObj.image_url} alt="Hospital preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>

                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-3">
                            <div className="sm:col-span-5 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Title</span>
                              <input
                                type="text"
                                value={itemObj.title || ''}
                                onChange={(e) => {
                                  const list = [...(mConfig.hospital_photos || [])];
                                  list[index] = { ...list[index], title: e.target.value };
                                  updateMarketingConfig('hospital_photos', list);
                                }}
                                placeholder="Title"
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                              />
                            </div>
                            <div className="sm:col-span-5 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Caption</span>
                              <input
                                type="text"
                                value={itemObj.caption || ''}
                                onChange={(e) => {
                                  const list = [...(mConfig.hospital_photos || [])];
                                  list[index] = { ...list[index], caption: e.target.value };
                                  updateMarketingConfig('hospital_photos', list);
                                }}
                                placeholder="Caption"
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                              />
                            </div>
                            <div className="sm:col-span-2 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Sort Order</span>
                              <input
                                type="number"
                                value={itemObj.display_order || 0}
                                onChange={(e) => {
                                  const list = [...(mConfig.hospital_photos || [])];
                                  list[index] = { ...list[index], display_order: parseInt(e.target.value) || 0 };
                                  updateMarketingConfig('hospital_photos', list);
                                }}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-mono font-medium"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-end shrink-0 gap-2 sm:border-l sm:border-slate-100 sm:pl-3">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => {
                                const list = [...(mConfig.hospital_photos || [])];
                                const temp = list[index];
                                list[index] = list[index - 1];
                                list[index - 1] = temp;
                                updateMarketingConfig('hospital_photos', list);
                              }}
                              className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 disabled:opacity-30 cursor-pointer"
                              title="Move Up"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              disabled={index === (mConfig.hospital_photos || []).length - 1}
                              onClick={() => {
                                const list = [...(mConfig.hospital_photos || [])];
                                const temp = list[index];
                                list[index] = list[index + 1];
                                list[index + 1] = temp;
                                updateMarketingConfig('hospital_photos', list);
                              }}
                              className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 disabled:opacity-30 cursor-pointer"
                              title="Move Down"
                            >
                              ▼
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const list = (mConfig.hospital_photos || []).filter((_, i) => i !== index);
                                updateMarketingConfig('hospital_photos', list);
                              }}
                              className="p-1 hover:bg-rose-50 rounded-lg text-rose-500 cursor-pointer"
                              title="Delete Photo"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 5B. CLINIC TEAM PHOTOS */}
                <div className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-white shadow-3xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#0D9488]" />
                      <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">Team / Doctors Photos</h4>
                    </div>
                    <span className="text-[10px] bg-teal-50 text-[#0D9488] border border-teal-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {(mConfig.team_photos || []).length} Photos
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                    Upload photos of surgical experts, treatment doctors, nursing staff, or lab technicians performing procedures.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* File Drag and Drop / Browse Upload */}
                    <div className="border-2 border-dashed border-slate-200 hover:border-teal-500/50 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-slate-50/10 cursor-pointer relative min-h-[110px]">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            const newPhotos = [...(mConfig.team_photos || [])];
                            for (let i = 0; i < e.target.files.length; i++) {
                              const file = e.target.files[i];
                              const url = await uploadImage(file);
                              if (url) {
                                newPhotos.push({
                                  image_url: url,
                                  title: file.name.split('.')[0].replace(/[-_]+/g, ' '),
                                  caption: '',
                                  display_order: (newPhotos.length + 1) * 10
                                });
                              }
                            }
                            updateMarketingConfig('team_photos', newPhotos);
                          }
                        }}
                      />
                      <Upload className="h-5 w-5 text-[#0D9488] mb-1.5" />
                      <span className="text-[11px] font-bold text-slate-700">Drag & Drop or Click to Upload</span>
                      <span className="text-[9px] text-slate-400 mt-0.5">JPEG, PNG or WEBP up to 5MB</span>
                    </div>

                    {/* Manual URL Input */}
                    <div className="p-4 border border-slate-150 rounded-xl bg-slate-50/5 space-y-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Add by direct URL</span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="new-team-photo-url-input-split"
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-mono text-slate-800 bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById('new-team-photo-url-input-split') as HTMLInputElement;
                            if (input && input.value.trim()) {
                              const newPhotos = [...(mConfig.team_photos || [])];
                              newPhotos.push({
                                image_url: input.value.trim(),
                                title: 'Clinical Team Member',
                                caption: '',
                                display_order: (newPhotos.length + 1) * 10
                              });
                              updateMarketingConfig('team_photos', newPhotos);
                              input.value = '';
                            }
                          }}
                          className="px-3 py-1.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold rounded-lg transition cursor-pointer"
                        >
                          Add URL
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* List of Team Photos */}
                  {Array.isArray(mConfig.team_photos) && mConfig.team_photos.length > 0 && (
                    <div className="space-y-3 mt-4">
                      {mConfig.team_photos.map((itemObj: any, index: number) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 border border-slate-150 rounded-xl bg-slate-50/30">
                          <div className="relative group w-24 h-18 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden shrink-0">
                            <img src={itemObj.image_url} alt="Team preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>

                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-3">
                            <div className="sm:col-span-5 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Title</span>
                              <input
                                type="text"
                                value={itemObj.title || itemObj.name || ''}
                                onChange={(e) => {
                                  const list = [...(mConfig.team_photos || [])];
                                  list[index] = { ...list[index], title: e.target.value, name: e.target.value };
                                  updateMarketingConfig('team_photos', list);
                                }}
                                placeholder="Title / Name"
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                              />
                            </div>
                            <div className="sm:col-span-5 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Caption</span>
                              <input
                                type="text"
                                value={itemObj.caption || itemObj.designation || ''}
                                onChange={(e) => {
                                  const list = [...(mConfig.team_photos || [])];
                                  list[index] = { ...list[index], caption: e.target.value, designation: e.target.value };
                                  updateMarketingConfig('team_photos', list);
                                }}
                                placeholder="Caption / Designation"
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                              />
                            </div>
                            <div className="sm:col-span-2 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Sort Order</span>
                              <input
                                type="number"
                                value={itemObj.display_order || 0}
                                onChange={(e) => {
                                  const list = [...(mConfig.team_photos || [])];
                                  list[index] = { ...list[index], display_order: parseInt(e.target.value) || 0 };
                                  updateMarketingConfig('team_photos', list);
                                }}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-mono font-medium"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-end shrink-0 gap-2 sm:border-l sm:border-slate-100 sm:pl-3">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => {
                                const list = [...(mConfig.team_photos || [])];
                                const temp = list[index];
                                list[index] = list[index - 1];
                                list[index - 1] = temp;
                                updateMarketingConfig('team_photos', list);
                              }}
                              className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 disabled:opacity-30 cursor-pointer"
                              title="Move Up"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              disabled={index === (mConfig.team_photos || []).length - 1}
                              onClick={() => {
                                const list = [...(mConfig.team_photos || [])];
                                const temp = list[index];
                                list[index] = list[index + 1];
                                list[index + 1] = temp;
                                updateMarketingConfig('team_photos', list);
                              }}
                              className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 disabled:opacity-30 cursor-pointer"
                              title="Move Down"
                            >
                              ▼
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const list = (mConfig.team_photos || []).filter((_, i) => i !== index);
                                updateMarketingConfig('team_photos', list);
                              }}
                              className="p-1 hover:bg-rose-50 rounded-lg text-rose-500 cursor-pointer"
                              title="Delete Photo"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 5C. EQUIPMENT / TECHNOLOGY PHOTOS */}
                <div className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-white shadow-3xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-[#0D9488]" />
                      <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">Equipment / Technology Photos</h4>
                    </div>
                    <span className="text-[10px] bg-teal-50 text-[#0D9488] border border-teal-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {(mConfig.equipment_photos || []).length} Photos
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                    Upload photos of specialized state-of-the-art machinery, 3D intraoral scanners, dental lasers, or treatment chairs.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* File Drag and Drop / Browse Upload */}
                    <div className="border-2 border-dashed border-slate-200 hover:border-teal-500/50 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-slate-50/10 cursor-pointer relative min-h-[110px]">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            const newPhotos = [...(mConfig.equipment_photos || [])];
                            for (let i = 0; i < e.target.files.length; i++) {
                              const file = e.target.files[i];
                              const url = await uploadImage(file);
                              if (url) {
                                newPhotos.push({
                                  image_url: url,
                                  title: file.name.split('.')[0].replace(/[-_]+/g, ' '),
                                  caption: '',
                                  display_order: (newPhotos.length + 1) * 10
                                });
                              }
                            }
                            updateMarketingConfig('equipment_photos', newPhotos);
                          }
                        }}
                      />
                      <Upload className="h-5 w-5 text-[#0D9488] mb-1.5" />
                      <span className="text-[11px] font-bold text-slate-700">Drag & Drop or Click to Upload</span>
                      <span className="text-[9px] text-slate-400 mt-0.5">JPEG, PNG or WEBP up to 5MB</span>
                    </div>

                    {/* Manual URL Input */}
                    <div className="p-4 border border-slate-150 rounded-xl bg-slate-50/5 space-y-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Add by direct URL</span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="new-equip-photo-url-input"
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-mono text-slate-800 bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById('new-equip-photo-url-input') as HTMLInputElement;
                            if (input && input.value.trim()) {
                              const newPhotos = [...(mConfig.equipment_photos || [])];
                              newPhotos.push({
                                image_url: input.value.trim(),
                                title: 'Clinical Equipment',
                                caption: '',
                                display_order: (newPhotos.length + 1) * 10
                              });
                              updateMarketingConfig('equipment_photos', newPhotos);
                              input.value = '';
                            }
                          }}
                          className="px-3 py-1.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold rounded-lg transition cursor-pointer"
                        >
                          Add URL
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* List of Equipment Photos */}
                  {Array.isArray(mConfig.equipment_photos) && mConfig.equipment_photos.length > 0 && (
                    <div className="space-y-3 mt-4">
                      {mConfig.equipment_photos.map((itemObj: any, index: number) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 border border-slate-150 rounded-xl bg-slate-50/30">
                          <div className="relative group w-24 h-18 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden shrink-0">
                            <img src={itemObj.image_url} alt="Equipment preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>

                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-3">
                            <div className="sm:col-span-5 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Title</span>
                              <input
                                type="text"
                                value={itemObj.title || itemObj.name || ''}
                                onChange={(e) => {
                                  const list = [...(mConfig.equipment_photos || [])];
                                  list[index] = { ...list[index], title: e.target.value, name: e.target.value };
                                  updateMarketingConfig('equipment_photos', list);
                                }}
                                placeholder="Title / Name"
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                              />
                            </div>
                            <div className="sm:col-span-5 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Caption</span>
                              <input
                                type="text"
                                value={itemObj.caption || ''}
                                onChange={(e) => {
                                  const list = [...(mConfig.equipment_photos || [])];
                                  list[index] = { ...list[index], caption: e.target.value };
                                  updateMarketingConfig('equipment_photos', list);
                                }}
                                placeholder="Caption"
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                              />
                            </div>
                            <div className="sm:col-span-2 space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Sort Order</span>
                              <input
                                type="number"
                                value={itemObj.display_order || 0}
                                onChange={(e) => {
                                  const list = [...(mConfig.equipment_photos || [])];
                                  list[index] = { ...list[index], display_order: parseInt(e.target.value) || 0 };
                                  updateMarketingConfig('equipment_photos', list);
                                }}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-mono font-medium"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-end shrink-0 gap-2 sm:border-l sm:border-slate-100 sm:pl-3">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => {
                                const list = [...(mConfig.equipment_photos || [])];
                                const temp = list[index];
                                list[index] = list[index - 1];
                                list[index - 1] = temp;
                                updateMarketingConfig('equipment_photos', list);
                              }}
                              className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 disabled:opacity-30 cursor-pointer"
                              title="Move Up"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              disabled={index === (mConfig.equipment_photos || []).length - 1}
                              onClick={() => {
                                const list = [...(mConfig.equipment_photos || [])];
                                const temp = list[index];
                                list[index] = list[index + 1];
                                list[index + 1] = temp;
                                updateMarketingConfig('equipment_photos', list);
                              }}
                              className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 disabled:opacity-30 cursor-pointer"
                              title="Move Down"
                            >
                              ▼
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const list = (mConfig.equipment_photos || []).filter((_, i) => i !== index);
                                updateMarketingConfig('equipment_photos', list);
                              }}
                              className="p-1 hover:bg-rose-50 rounded-lg text-rose-500 cursor-pointer"
                              title="Delete Photo"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Sticky Action Buttons */}
                <div className="border-t border-slate-100 pt-6 flex items-center justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="h-4 w-4" />
                    {servicesList.some(s => s.id === editingService.id) ? 'Update Service' : 'Save Service'}
                  </button>
                </div>
              </form>
            ) : activeServiceEditorTab === 'gallery' ? (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col space-y-6" id="service-gallery-tab">
                {/* Status / Errors */}
                {galleryError && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs font-semibold leading-relaxed">
                    ⚠️ {galleryError}
                  </div>
                )}

                {/* Progress / Saving indicator */}
                {(galleryUploading || gallerySaving) && (
                  <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl flex items-center justify-between text-teal-800 text-xs font-bold animate-pulse">
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600" />
                      {galleryUploading ? 'Uploading & saving clinical images...' : 'Saving database records...'}
                    </span>
                    <span className="text-[10px] bg-teal-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold animate-bounce">
                      Syncing
                    </span>
                  </div>
                )}

                {/* Top Control Panel */}
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 shrink-0">
                  <div className="min-w-0 pr-4">
                    <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">Service Gallery</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                      Upload clinical before/after results, high-res procedure imagery, or equipment photos. Drag items to custom sort.
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => document.getElementById('service-gallery-multi-input')?.click()}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add Images
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAddByUrlError(null);
                        setIsAddByUrlOpen(true);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#0D9488] hover:bg-teal-50/50 text-[#0D9488] text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                    >
                      <Link className="h-4 w-4" />
                      Add by URL
                    </button>
                    <input
                      type="file"
                      id="service-gallery-multi-input"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          await handleAddGalleryImages(e.target.files);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Gallery List */}
                {loadingGallery ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mb-3" />
                    <span className="text-xs text-slate-500 font-medium">Fetching gallery list from Supabase...</span>
                  </div>
                ) : serviceGalleryList.length === 0 ? (
                  <div 
                    className="flex-1 border-2 border-dashed border-slate-200 hover:border-teal-500/50 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-slate-50/10 cursor-pointer relative"
                    onClick={() => document.getElementById('service-gallery-multi-input')?.click()}
                  >
                    <div className="p-4 bg-white border border-slate-100 rounded-full shadow-3xs text-slate-400 mb-4">
                      <ImageIcon className="h-8 w-8 text-[#0D9488]" />
                    </div>
                    <h5 className="font-bold text-slate-700 text-sm">No clinical images uploaded</h5>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
                      Showcase visual procedures. Drag and drop multiple images here or click to browse.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4" id="gallery-items-list">
                    {serviceGalleryList.map((item, index) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={() => handleGalleryDragStart(index)}
                        onDragOver={(e) => handleGalleryDragOver(e, index)}
                        onDragEnd={handleGalleryDragEnd}
                        className={`flex flex-col sm:flex-row gap-4 p-4 bg-white border rounded-2xl transition-all duration-200 ${
                          draggedIndex === index
                            ? 'border-teal-500 bg-teal-50/20 scale-[0.98] shadow-inner opacity-60'
                            : 'border-slate-150 hover:border-slate-250 shadow-3xs'
                        }`}
                        id={`gallery-item-card-${item.id}`}
                      >
                        {/* Drag Handle & Preview Box */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div 
                            className="cursor-grab active:cursor-grabbing p-1.5 hover:bg-slate-50 rounded-md text-slate-400 hover:text-slate-600 transition shrink-0"
                            title="Drag to reorder"
                          >
                            <GripVertical className="h-4 w-4" />
                          </div>
                          
                          <div className="relative group w-28 h-20 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shrink-0 shadow-3xs">
                            <img
                              src={item.image_url}
                              alt={item.alt_text || 'Gallery item'}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            
                            {/* Replace button overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setReplacingGalleryItemIndex(index);
                                  setReplaceUrlInput(item.image_url || '');
                                  setReplaceError(null);
                                }}
                                className="px-2 py-1 bg-white hover:bg-slate-100 text-[#0D9488] rounded-md text-[10px] font-bold transition shadow-xs cursor-pointer"
                              >
                                Replace
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Metadata Inputs */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-0">
                          {/* Title */}
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Image Title</label>
                            <input
                              type="text"
                              value={item.title || ''}
                              onChange={(e) => {
                                const updated = [...serviceGalleryList];
                                updated[index] = { ...updated[index], title: e.target.value };
                                setServiceGalleryList(updated);
                              }}
                              onBlur={(e) => handleUpdateGalleryItem(index, { title: e.target.value })}
                              placeholder="e.g. Before Treatment"
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white font-medium text-slate-800"
                            />
                          </div>

                          {/* Caption */}
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Caption</label>
                            <input
                              type="text"
                              value={item.caption || ''}
                              onChange={(e) => {
                                const updated = [...serviceGalleryList];
                                updated[index] = { ...updated[index], caption: e.target.value };
                                setServiceGalleryList(updated);
                              }}
                              onBlur={(e) => handleUpdateGalleryItem(index, { caption: e.target.value })}
                              placeholder="e.g. Pre-op panoramic view"
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white font-medium text-slate-800"
                            />
                          </div>

                          {/* Alt Text */}
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Alt Text (SEO)</label>
                            <input
                              type="text"
                              value={item.alt_text || ''}
                              onChange={(e) => {
                                const updated = [...serviceGalleryList];
                                updated[index] = { ...updated[index], alt_text: e.target.value };
                                setServiceGalleryList(updated);
                              }}
                              onBlur={(e) => handleUpdateGalleryItem(index, { alt_text: e.target.value })}
                              placeholder="e.g. dentist performing implant procedure"
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white font-medium text-slate-800"
                            />
                          </div>
                        </div>

                        {/* Delete */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-center gap-3 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0 shrink-0">
                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleDeleteGalleryImage(item.id)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Delete clinical image"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : activeServiceEditorTab === 'faqs' ? (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col space-y-6" id="service-faqs-tab">
                {/* Status / Errors */}
                {faqsError && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs font-semibold leading-relaxed">
                    ⚠️ {faqsError}
                  </div>
                )}

                {/* Progress / Saving indicator */}
                {(loadingFaqs || faqsSaving) && (
                  <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl flex items-center justify-between text-teal-800 text-xs font-bold animate-pulse">
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600" />
                      {loadingFaqs ? 'Fetching FAQs from Supabase...' : 'Saving FAQ records...'}
                    </span>
                    <span className="text-[10px] bg-teal-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">
                      Syncing
                    </span>
                  </div>
                )}

                {/* Top Control Panel */}
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 shrink-0">
                  <div className="min-w-0 pr-4">
                    <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">Service FAQs</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                      Manage frequently asked questions for this service. Drag cards to reorder.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={handleAddFaq}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add FAQ
                    </button>
                  </div>
                </div>

                {/* FAQs List */}
                {loadingFaqs ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mb-3" />
                    <span className="text-xs text-slate-500 font-medium">Fetching FAQs from Supabase...</span>
                  </div>
                ) : serviceFaqsList.length === 0 ? (
                  <div 
                    className="flex-1 border-2 border-dashed border-slate-200 hover:border-teal-500/50 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-slate-50/10 cursor-pointer"
                    onClick={handleAddFaq}
                  >
                    <div className="p-4 bg-white border border-slate-100 rounded-full shadow-3xs text-slate-400 mb-4">
                      <MessageCircle className="h-8 w-8 text-[#0D9488]" />
                    </div>
                    <h5 className="font-bold text-slate-700 text-sm">No FAQs created yet</h5>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
                      Help patients find answers about this treatment. Click here or use the "+ Add FAQ" button to add your first FAQ.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4" id="faqs-items-list">
                    {serviceFaqsList.map((item, index) => {
                      const isEditing = editingFaqId === item.id;
                      return (
                        <div
                          key={item.id}
                          draggable={!isEditing}
                          onDragStart={() => handleFaqDragStart(index)}
                          onDragOver={(e) => handleFaqDragOver(e, index)}
                          onDragEnd={handleFaqDragEnd}
                          className={`p-4 bg-white border rounded-2xl transition-all duration-200 ${
                            draggedFaqIndex === index
                              ? 'border-teal-500 bg-teal-50/20 scale-[0.98] shadow-inner opacity-60'
                              : 'border-slate-150 hover:border-slate-250 shadow-3xs'
                          }`}
                          id={`faq-item-card-${item.id}`}
                        >
                          {isEditing ? (
                            /* EDIT MODE FOR FAQ CARD */
                            <div className="space-y-4">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Question</label>
                                <input
                                  type="text"
                                  value={faqEditQuestion}
                                  onChange={(e) => setFaqEditQuestion(e.target.value)}
                                  placeholder="e.g. Is dental implant surgery painful?"
                                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white font-medium text-slate-800"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Answer</label>
                                <textarea
                                  rows={4}
                                  value={faqEditAnswer}
                                  onChange={(e) => setFaqEditAnswer(e.target.value)}
                                  placeholder="Explain the procedure details, pain management, recovery expectations..."
                                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white font-medium text-slate-800"
                                />
                              </div>
                              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                                <button
                                  type="button"
                                  onClick={() => handleCancelFaqEdit(item.id)}
                                  className="px-4 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSaveFaq(item.id)}
                                  className="px-4 py-1.5 text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] rounded-xl shadow-xs transition cursor-pointer"
                                >
                                  Save FAQ
                                </button>
                              </div>
                            </div>
                          ) : (
                            /* VIEW MODE FOR FAQ CARD */
                            <div className="flex gap-4">
                              {/* Grab Handle */}
                              <div 
                                className="cursor-grab active:cursor-grabbing p-1.5 hover:bg-slate-50 rounded-md text-slate-400 hover:text-slate-600 transition shrink-0 self-start mt-1"
                                title="Drag to reorder"
                              >
                                <GripVertical className="h-4 w-4" />
                              </div>
                              
                              {/* FAQ Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                  <h5 className="text-xs font-bold text-[#081C3A] leading-relaxed">
                                    Q: {item.question || <span className="italic text-slate-400 font-normal">(No question set)</span>}
                                  </h5>
                                  
                                  {/* Actions */}
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => handleEditFaq(item)}
                                      className="p-1.5 text-slate-500 hover:text-[#0D9488] hover:bg-slate-50 rounded-lg transition cursor-pointer"
                                      title="Edit FAQ"
                                    >
                                      <Pencil className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteFaq(item.id)}
                                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                      title="Delete FAQ"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                                <p className="text-xs text-slate-600 mt-2 whitespace-pre-wrap leading-relaxed">
                                  {item.answer || <span className="italic text-slate-400 font-normal">(No answer set)</span>}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* MARKETING TAB */
              <form onSubmit={handleSaveService} className="flex-1 overflow-y-auto p-6 space-y-8 font-sans" id="service-marketing-tab">
                {saveMessage && (
                  <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 border animate-fade-in ${
                    saveMessage.includes('successfully') 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                      : 'bg-teal-50 border-teal-200 text-teal-800'
                  }`}>
                    <Check className="h-4 w-4 text-teal-600 shrink-0" />
                    <span>{saveMessage}</span>
                  </div>
                )}

                {(() => {
                  const mConfig = typeof editingService?.marketing_config === 'string'
                    ? (() => { try { return JSON.parse(editingService.marketing_config) } catch(e) { return {} } })()
                    : (editingService?.marketing_config || {});

                  return (
                    <>
                      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 shrink-0">
                        <div className="min-w-0 pr-4">
                          <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider">Marketing & CTA Management</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                            Configure offer banners, custom action links, social triggers, and floating contact bars for this service.
                          </p>
                        </div>
                        <button
                          type="submit"
                          className="flex items-center gap-1.5 px-4 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                        >
                          <Check className="h-4 w-4" />
                          Save Changes
                        </button>
                      </div>

                      {/* 0. SECTION VISIBILITY & ORDERING */}
                      <div className="bg-white border border-slate-150 rounded-2xl p-5 space-y-4 shadow-3xs">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                          <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                            <Sliders className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">0. Section Visibility & Layout Ordering</h4>
                            <p className="text-[10px] text-slate-400">Show/Hide page sections and arrange their layout sequence on the screen</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {[
                            { key: 'show_hero', label: 'Hero Section' },
                            { key: 'show_introduction', label: 'Introduction' },
                            { key: 'show_process', label: 'Process Steps' },
                            { key: 'show_benefits', label: 'Benefits & Features' },
                            { key: 'show_gallery', label: 'Before/After Gallery' },
                            { key: 'show_procedure_video', label: 'Procedure Video' },
                            { key: 'show_hospital_photos', label: 'Clinic/Hospital Split Photos' },
                            { key: 'show_team_photos', label: 'Team/Doctor Split Photos' },
                            { key: 'show_testimonials', label: 'Patient Video Testimonials' },
                            { key: 'show_faq', label: 'FAQs Section' },
                            { key: 'show_related_services', label: 'Related Services' },
                            { key: 'show_bottom_cta', label: 'Bottom CTA' },
                          ].map((sec) => {
                            const isVisible = mConfig[sec.key as keyof typeof mConfig] !== false;
                            return (
                              <label key={sec.key} className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center justify-between cursor-pointer select-none">
                                <span className="text-xs font-bold text-slate-700">{sec.label}</span>
                                <input
                                  type="checkbox"
                                  checked={isVisible}
                                  onChange={(e) => updateMarketingConfig(sec.key, e.target.checked)}
                                  className="rounded text-teal-600 focus:ring-teal-500 h-4 w-4 shadow-3xs"
                                />
                              </label>
                            );
                          })}
                        </div>

                        {/* Layout Order Manager */}
                        <div className="space-y-2 pt-3 border-t border-slate-100">
                          <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Layout Render Order</h5>
                          <p className="text-[10px] text-slate-400">Rearrange the order of sections appearing on the treatment page</p>
                          
                          {(() => {
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

                            // Clean/merge in case any are missing
                            const cleanOrder = [...currentOrder];
                            defaultOrder.forEach(sec => {
                              if (!cleanOrder.includes(sec)) {
                                cleanOrder.push(sec);
                              }
                            });
                            const finalOrder = cleanOrder.filter(sec => defaultOrder.includes(sec));

                            const handleMoveSection = (index: number, direction: 'up' | 'down') => {
                              const targetIdx = direction === 'up' ? index - 1 : index + 1;
                              if (targetIdx < 0 || targetIdx >= finalOrder.length) return;
                              const updated = [...finalOrder];
                              const temp = updated[index];
                              updated[index] = updated[targetIdx];
                              updated[targetIdx] = temp;
                              updateMarketingConfig('section_order', updated);
                            };

                            const sectionLabels: Record<string, string> = {
                              hero: 'Hero Header Section',
                              intro: 'Introduction Section',
                              process: 'Treatment Process (Steps)',
                              benefits: 'Benefits & Features list',
                              gallery: 'Before / After Gallery',
                              video: 'Procedure / Clinical Video',
                              hospital_photos: 'Clinic & Hospital Split Photos',
                              team_photos: 'Doctor & Panel Expert Split Photos',
                              testimonials: 'Patient Video Testimonials',
                              faq: 'Frequently Asked Questions',
                              related_services: 'Related Treatments/Services',
                              bottom_cta: 'Bottom CTA Promotional block'
                            };

                            return (
                              <div className="space-y-1.5 max-w-xl">
                                {finalOrder.map((sec, idx) => {
                                  const isSecVisible = mConfig[`show_${sec === 'video' ? 'procedure_video' : sec}` as keyof typeof mConfig] !== false;
                                  return (
                                    <div key={sec} className={`flex items-center justify-between p-2.5 border rounded-xl gap-3 ${isSecVisible ? 'bg-slate-50/50 border-slate-100' : 'bg-slate-100/50 border-slate-200/60 opacity-60'}`}>
                                      <div className="flex items-center gap-2 min-w-0">
                                        <GripVertical className="h-3.5 w-3.5 text-slate-400 shrink-0 cursor-grab" />
                                        <span className="text-xs font-bold text-slate-700 truncate">{sectionLabels[sec] || sec}</span>
                                        {!isSecVisible && <span className="text-[9px] bg-slate-200 text-slate-500 font-bold px-1.5 py-0.5 rounded-md">Hidden</span>}
                                      </div>
                                      <div className="flex items-center gap-1 bg-white border border-slate-150 rounded-lg p-0.5 shadow-3xs">
                                        <button
                                          type="button"
                                          disabled={idx === 0}
                                          onClick={() => handleMoveSection(idx, 'up')}
                                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none rounded transition"
                                        >
                                          <ChevronUp className="h-3.5 w-3.5" />
                                        </button>
                                        <button
                                          type="button"
                                          disabled={idx === finalOrder.length - 1}
                                          onClick={() => handleMoveSection(idx, 'down')}
                                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none rounded transition"
                                        >
                                          <ChevronDown className="h-3.5 w-3.5" />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })()}
                        </div>
                      </div>

                      {/* 1. OFFER BANNER */}
                      <div className="bg-white border border-slate-150 rounded-2xl p-5 space-y-4 shadow-3xs">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                              <Sparkles className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900">1. Offer Banner</h4>
                              <p className="text-[10px] text-slate-400">Display a floating top-promotional bar on this page</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!mConfig.show_offer_banner}
                              onChange={(e) => updateMarketingConfig('show_offer_banner', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                            <span className="ml-2 text-xs font-semibold text-slate-700">Enable</span>
                          </label>
                        </div>

                        {mConfig.show_offer_banner && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Offer Title</label>
                              <input
                                type="text"
                                value={mConfig.offer_title || ''}
                                onChange={(e) => updateMarketingConfig('offer_title', e.target.value)}
                                placeholder="e.g. Save Up To 50%"
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Offer Subtitle</label>
                              <input
                                type="text"
                                value={mConfig.offer_subtitle || ''}
                                onChange={(e) => updateMarketingConfig('offer_subtitle', e.target.value)}
                                placeholder="e.g. On Dental Implants"
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800"
                              />
                            </div>
                            <div className="space-y-1.5 md:col-span-2">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Offer Description</label>
                              <textarea
                                rows={2}
                                value={mConfig.offer_description || ''}
                                onChange={(e) => updateMarketingConfig('offer_description', e.target.value)}
                                placeholder="Short description highlighting terms or benefits..."
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Offer Badge Text</label>
                              <input
                                type="text"
                                value={mConfig.offer_badge_text || ''}
                                onChange={(e) => updateMarketingConfig('offer_badge_text', e.target.value)}
                                placeholder="e.g. Special Offer"
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Button Text</label>
                                <input
                                  type="text"
                                  value={mConfig.offer_button_text || ''}
                                  onChange={(e) => updateMarketingConfig('offer_button_text', e.target.value)}
                                  placeholder="e.g. Claim Offer"
                                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Button Link</label>
                                <input
                                  type="text"
                                  value={mConfig.offer_button_link || ''}
                                  onChange={(e) => updateMarketingConfig('offer_button_link', e.target.value)}
                                  placeholder="e.g. #appointment"
                                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 2. CALL TO ACTION */}
                      <div className="bg-white border border-slate-150 rounded-2xl p-5 space-y-4 shadow-3xs">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                          <div className="p-2 bg-teal-50 rounded-lg text-[#0D9488]">
                            <Calendar className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">2. Hero Call To Action</h4>
                            <p className="text-[10px] text-slate-400">Configure primary and secondary CTA actions below the treatment summary</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                          {/* Primary CTA */}
                          <div className="space-y-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                            <h5 className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Primary Button</h5>
                            
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Button Text</label>
                              <input
                                type="text"
                                value={mConfig.primary_cta_btn_text || ''}
                                onChange={(e) => updateMarketingConfig('primary_cta_btn_text', e.target.value)}
                                placeholder="e.g. Book Appointment"
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Button Action</label>
                              <select
                                value={mConfig.primary_cta_action || 'appointment'}
                                onChange={(e) => updateMarketingConfig('primary_cta_action', e.target.value)}
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                              >
                                <option value="appointment">Book Appointment (Modal Trigger)</option>
                                <option value="custom">Custom Redirect URL</option>
                              </select>
                            </div>

                            {mConfig.primary_cta_action === 'custom' && (
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Custom Redirect URL</label>
                                <input
                                  type="text"
                                  value={mConfig.primary_cta_link || ''}
                                  onChange={(e) => updateMarketingConfig('primary_cta_link', e.target.value)}
                                  placeholder="e.g. https://myclinic.com/booking-page"
                                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800"
                                />
                              </div>
                            )}
                          </div>

                          {/* Secondary CTA */}
                          <div className="space-y-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                            <h5 className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Secondary Button</h5>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Button Text</label>
                              <input
                                type="text"
                                value={mConfig.secondary_cta_btn_text || ''}
                                onChange={(e) => updateMarketingConfig('secondary_cta_btn_text', e.target.value)}
                                placeholder="e.g. WhatsApp Us"
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Button Action</label>
                              <select
                                value={mConfig.secondary_cta_action || 'whatsapp'}
                                onChange={(e) => updateMarketingConfig('secondary_cta_action', e.target.value)}
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                              >
                                <option value="whatsapp">WhatsApp Direct Chat</option>
                                <option value="call">Make Telephone Call</option>
                                <option value="custom">Custom Redirect URL</option>
                              </select>
                            </div>

                            {mConfig.secondary_cta_action === 'custom' && (
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Custom Redirect URL</label>
                                <input
                                  type="text"
                                  value={mConfig.secondary_cta_link || ''}
                                  onChange={(e) => updateMarketingConfig('secondary_cta_link', e.target.value)}
                                  placeholder="e.g. https://myclinic.com/contact"
                                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 3. CONTACT INFORMATION */}
                      <div className="bg-white border border-slate-150 rounded-2xl p-5 space-y-4 shadow-3xs">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Phone className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">3. Contact & Location Details</h4>
                            <p className="text-[10px] text-slate-400">Specify treatment-specific clinic contact and Google Maps overrides</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Clinic Contact Number</label>
                            <input
                              type="text"
                              value={mConfig.contact_call_number || ''}
                              onChange={(e) => updateMarketingConfig('contact_call_number', e.target.value)}
                              placeholder="e.g. +91 98765 43210"
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">WhatsApp Number</label>
                            <input
                              type="text"
                              value={mConfig.contact_whatsapp_number || ''}
                              onChange={(e) => updateMarketingConfig('contact_whatsapp_number', e.target.value)}
                              placeholder="e.g. +91 98765 43210 (with country code)"
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email Address</label>
                            <input
                              type="email"
                              value={mConfig.contact_email || ''}
                              onChange={(e) => updateMarketingConfig('contact_email', e.target.value)}
                              placeholder="e.g. clinic@hospital.com"
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-medium"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Clinic Address</label>
                            <input
                              type="text"
                              value={mConfig.contact_address || ''}
                              onChange={(e) => updateMarketingConfig('contact_address', e.target.value)}
                              placeholder="Full address of the branch performing this treatment..."
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Clinic Name</label>
                            <input
                              type="text"
                              value={mConfig.contact_clinic_name || ''}
                              onChange={(e) => updateMarketingConfig('contact_clinic_name', e.target.value)}
                              placeholder="e.g. Patel Dental Hospital, Rajkot"
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Working Hours</label>
                            <input
                              type="text"
                              value={mConfig.contact_working_hours || ''}
                              onChange={(e) => updateMarketingConfig('contact_working_hours', e.target.value)}
                              placeholder="e.g. Mon - Sat: 9:00 AM - 8:00 PM"
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800"
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Google Maps Embed or Link URL</label>
                            <input
                              type="text"
                              value={mConfig.contact_map_url || ''}
                              onChange={(e) => updateMarketingConfig('contact_map_url', e.target.value)}
                              placeholder="Google Maps sharing URL..."
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 4. FOLLOW US */}
                      <div className="bg-white border border-slate-150 rounded-2xl p-5 space-y-4 shadow-3xs">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                            <Users className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">4. Social Media Integration ("Follow Us")</h4>
                            <p className="text-[10px] text-slate-400">Toggle platforms on or off and set custom profiles for this treatment</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                          {/* Facebook */}
                          <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center justify-between gap-4">
                            <div className="flex-1 space-y-1">
                              <label className="text-[10px] font-black text-slate-700 block">Facebook</label>
                              <input
                                type="text"
                                value={mConfig.social_facebook || ''}
                                onChange={(e) => updateMarketingConfig('social_facebook', e.target.value)}
                                placeholder="Page link or profile URL"
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                              />
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer mt-5">
                              <input
                                type="checkbox"
                                checked={!!mConfig.social_facebook_enabled}
                                onChange={(e) => updateMarketingConfig('social_facebook_enabled', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0D9488]"></div>
                            </label>
                          </div>

                          {/* Instagram */}
                          <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center justify-between gap-4">
                            <div className="flex-1 space-y-1">
                              <label className="text-[10px] font-black text-slate-700 block">Instagram</label>
                              <input
                                type="text"
                                value={mConfig.social_instagram || ''}
                                onChange={(e) => updateMarketingConfig('social_instagram', e.target.value)}
                                placeholder="Profile URL"
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                              />
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer mt-5">
                              <input
                                type="checkbox"
                                checked={!!mConfig.social_instagram_enabled}
                                onChange={(e) => updateMarketingConfig('social_instagram_enabled', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0D9488]"></div>
                            </label>
                          </div>

                          {/* YouTube */}
                          <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center justify-between gap-4">
                            <div className="flex-1 space-y-1">
                              <label className="text-[10px] font-black text-slate-700 block">YouTube</label>
                              <input
                                type="text"
                                value={mConfig.social_youtube || ''}
                                onChange={(e) => updateMarketingConfig('social_youtube', e.target.value)}
                                placeholder="Channel/Video link"
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                              />
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer mt-5">
                              <input
                                type="checkbox"
                                checked={!!mConfig.social_youtube_enabled}
                                onChange={(e) => updateMarketingConfig('social_youtube_enabled', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0D9488]"></div>
                            </label>
                          </div>

                          {/* LinkedIn */}
                          <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center justify-between gap-4">
                            <div className="flex-1 space-y-1">
                              <label className="text-[10px] font-black text-slate-700 block">LinkedIn</label>
                              <input
                                type="text"
                                value={mConfig.social_linkedin || ''}
                                onChange={(e) => updateMarketingConfig('social_linkedin', e.target.value)}
                                placeholder="Page or personal URL"
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                              />
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer mt-5">
                              <input
                                type="checkbox"
                                checked={!!mConfig.social_linkedin_enabled}
                                onChange={(e) => updateMarketingConfig('social_linkedin_enabled', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0D9488]"></div>
                            </label>
                          </div>

                          {/* Twitter/X */}
                          <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center justify-between gap-4">
                            <div className="flex-1 space-y-1">
                              <label className="text-[10px] font-black text-slate-700 block">Twitter (X)</label>
                              <input
                                type="text"
                                value={mConfig.social_twitter || ''}
                                onChange={(e) => updateMarketingConfig('social_twitter', e.target.value)}
                                placeholder="Profile/Handle URL"
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                              />
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer mt-5">
                              <input
                                type="checkbox"
                                checked={!!mConfig.social_twitter_enabled}
                                onChange={(e) => updateMarketingConfig('social_twitter_enabled', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0D9488]"></div>
                            </label>
                          </div>

                          {/* WhatsApp */}
                          <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center justify-between gap-4">
                            <div className="flex-1 space-y-1">
                              <label className="text-[10px] font-black text-slate-700 block">WhatsApp Group/Invite</label>
                              <input
                                type="text"
                                value={mConfig.social_whatsapp || ''}
                                onChange={(e) => updateMarketingConfig('social_whatsapp', e.target.value)}
                                placeholder="Direct chat/group invitation link"
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800"
                              />
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer mt-5">
                              <input
                                type="checkbox"
                                checked={!!mConfig.social_whatsapp_enabled}
                                onChange={(e) => updateMarketingConfig('social_whatsapp_enabled', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0D9488]"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* 5. BOTTOM CTA SECTION */}
                      <div className="bg-white border border-slate-150 rounded-2xl p-5 space-y-4 shadow-3xs">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                            <Building2 className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">5. Bottom CTA Section</h4>
                            <p className="text-[10px] text-slate-400">Modify the large promotional card situated above the footer</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">CTA Heading</label>
                            <input
                              type="text"
                              value={mConfig.bottom_cta_heading || ''}
                              onChange={(e) => updateMarketingConfig('bottom_cta_heading', e.target.value)}
                              placeholder="e.g. Ready to Transform Your Smile?"
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-bold"
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">CTA Description</label>
                            <textarea
                              rows={3}
                              value={mConfig.bottom_cta_description || ''}
                              onChange={(e) => updateMarketingConfig('bottom_cta_description', e.target.value)}
                              placeholder="Book a pain-free diagnostic consultation with our specialists in Rajkot..."
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800 leading-relaxed"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Primary Button Text</label>
                            <input
                              type="text"
                              value={mConfig.bottom_cta_primary_btn_text || ''}
                              onChange={(e) => updateMarketingConfig('bottom_cta_primary_btn_text', e.target.value)}
                              placeholder="e.g. Book Appointment"
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-bold"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Primary Button Link</label>
                            <input
                              type="text"
                              value={mConfig.bottom_cta_primary_btn_link || ''}
                              onChange={(e) => updateMarketingConfig('bottom_cta_primary_btn_link', e.target.value)}
                              placeholder="e.g. #appointment"
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Secondary Button Text</label>
                            <input
                              type="text"
                              value={mConfig.bottom_cta_secondary_btn_text || ''}
                              onChange={(e) => updateMarketingConfig('bottom_cta_secondary_btn_text', e.target.value)}
                              placeholder="e.g. WhatsApp Us"
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800 font-bold"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Secondary Button Link</label>
                            <input
                              type="text"
                              value={mConfig.bottom_cta_secondary_btn_link || ''}
                              onChange={(e) => updateMarketingConfig('bottom_cta_secondary_btn_link', e.target.value)}
                              placeholder="e.g. https://wa.me/..."
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-slate-800"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 6. CONTACT BAR */}
                      <div className="bg-white border border-slate-150 rounded-2xl p-5 space-y-4 shadow-3xs">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-pink-50 rounded-lg text-pink-600">
                              <Activity className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900">6. Floating Mobile Contact Bar</h4>
                              <p className="text-[10px] text-slate-400">Configure floating action widgets at the bottom screen margin</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!mConfig.contact_bar_show}
                              onChange={(e) => updateMarketingConfig('contact_bar_show', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                            <span className="ml-2 text-xs font-semibold text-slate-700">Show Bar</span>
                          </label>
                        </div>

                        {mConfig.contact_bar_show && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 animate-fade-in">
                            {/* Call Button */}
                            <label className="p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center justify-between cursor-pointer select-none">
                              <span className="text-xs font-bold text-slate-700">Call Action Button</span>
                              <input
                                type="checkbox"
                                checked={!!mConfig.contact_bar_call_enabled}
                                onChange={(e) => updateMarketingConfig('contact_bar_call_enabled', e.target.checked)}
                                className="rounded text-teal-600 focus:ring-teal-500 h-4 w-4"
                              />
                            </label>

                            {/* WhatsApp Button */}
                            <label className="p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center justify-between cursor-pointer select-none">
                              <span className="text-xs font-bold text-slate-700">WhatsApp Button</span>
                              <input
                                type="checkbox"
                                checked={!!mConfig.contact_bar_whatsapp_enabled}
                                onChange={(e) => updateMarketingConfig('contact_bar_whatsapp_enabled', e.target.checked)}
                                className="rounded text-teal-600 focus:ring-teal-500 h-4 w-4"
                              />
                            </label>

                            {/* Book Appointment Button */}
                            <label className="p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center justify-between cursor-pointer select-none">
                              <span className="text-xs font-bold text-slate-700">Book Appointment Button</span>
                              <input
                                type="checkbox"
                                checked={!!mConfig.contact_bar_appointment_enabled}
                                onChange={(e) => updateMarketingConfig('contact_bar_appointment_enabled', e.target.checked)}
                                className="rounded text-teal-600 focus:ring-teal-500 h-4 w-4"
                              />
                            </label>
                          </div>
                        )}
                      </div>

                      {/* 7. RELATED SERVICES MANAGER */}
                      <div className="bg-white border border-slate-150 rounded-2xl p-5 space-y-4 shadow-3xs">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                              <Layers className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900">7. Related Services Manager</h4>
                              <p className="text-[10px] text-slate-400">Configure which treatments to suggest as related, define order and visibility</p>
                            </div>
                          </div>
                        </div>

                        {(() => {
                          const availableServices = servicesList.filter(s => s.id !== editingService.id);
                          const configuredRelated = mConfig.related_services || [];
                          
                          // Merge configured list with any newly added services that aren't configured yet
                          const merged = [...configuredRelated];
                          availableServices.forEach(s => {
                            if (!merged.some(r => r.id === s.id)) {
                              merged.push({ id: s.id, enabled: false });
                            }
                          });
                          
                          // Filter out any services that are no longer present
                          const cleanRelated = merged.filter(r => availableServices.some(s => s.id === r.id));

                          const handleToggleRelated = (id: string, enabled: boolean) => {
                            const updated = cleanRelated.map(r => r.id === id ? { ...r, enabled } : r);
                            updateMarketingConfig('related_services', updated);
                          };

                          const handleMoveRelated = (index: number, direction: 'up' | 'down') => {
                            const targetIdx = direction === 'up' ? index - 1 : index + 1;
                            if (targetIdx < 0 || targetIdx >= cleanRelated.length) return;
                            
                            const updated = [...cleanRelated];
                            const temp = updated[index];
                            updated[index] = updated[targetIdx];
                            updated[targetIdx] = temp;
                            
                            updateMarketingConfig('related_services', updated);
                          };

                          return (
                            <div className="space-y-3 pt-1">
                              {cleanRelated.length === 0 ? (
                                <p className="text-xs text-slate-400 text-center py-4">No other services available to link.</p>
                              ) : (
                                <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                                  {cleanRelated.map((r, index) => {
                                    const relatedSvc = availableServices.find(s => s.id === r.id);
                                    if (!relatedSvc) return null;
                                    
                                    return (
                                      <div key={r.id} className="flex items-center justify-between p-3 bg-slate-50/50 border border-slate-100 rounded-xl gap-4">
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                          <img 
                                            src={relatedSvc.hero_image || 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=200'} 
                                            alt={relatedSvc.title}
                                            className="w-12 h-8 rounded-lg object-cover bg-slate-100 border border-slate-200"
                                            referrerPolicy="no-referrer"
                                          />
                                          <div className="min-w-0">
                                            <h5 className="text-xs font-bold text-[#081C3A] truncate">{relatedSvc.title}</h5>
                                            <p className="text-[10px] text-slate-400 truncate">{relatedSvc.slug}</p>
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                          {/* Move Buttons */}
                                          <div className="flex items-center gap-1 bg-white border border-slate-150 rounded-lg p-0.5 shadow-3xs">
                                            <button
                                              type="button"
                                              disabled={index === 0}
                                              onClick={() => handleMoveRelated(index, 'up')}
                                              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none rounded transition"
                                            >
                                              <ChevronUp className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                              type="button"
                                              disabled={index === cleanRelated.length - 1}
                                              onClick={() => handleMoveRelated(index, 'down')}
                                              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none rounded transition"
                                            >
                                              <ChevronDown className="h-3.5 w-3.5" />
                                            </button>
                                          </div>

                                          {/* Toggle */}
                                          <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                              type="checkbox"
                                              checked={!!r.enabled}
                                              onChange={(e) => handleToggleRelated(r.id, e.target.checked)}
                                              className="sr-only peer"
                                            />
                                            <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0D9488]"></div>
                                          </label>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>

                      {/* 8. WRITTEN REVIEWS & TRANSFORMATIONS */}
                      <div className="bg-white border border-slate-150 rounded-2xl p-5 space-y-4 shadow-3xs">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
                              <MessageCircle className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900">8. Written Reviews & Transformations</h4>
                              <p className="text-[10px] text-slate-400">Manage patient written reviews, star ratings, and optional Before/After smile transformations</p>
                            </div>
                          </div>
                          {editingReviewId === null && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingReviewId('new');
                                setReviewDraftName('');
                                setReviewDraftTreatment(editingService.title);
                                setReviewDraftText('');
                                setReviewDraftRating(5);
                                setReviewDraftBeforeImage('');
                                setReviewDraftAfterImage('');
                                setReviewDraftDisplayOrder(10);
                              }}
                              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              Add Written Review
                            </button>
                          )}
                        </div>

                        {editingReviewId !== null ? (
                          /* Edit/Add Review Form */
                          <div className="p-4 bg-slate-50/50 border border-slate-150 rounded-xl space-y-4 animate-fade-in">
                            <h5 className="text-xs font-bold text-[#081C3A]">
                              {editingReviewId === 'new' ? 'Add New Written Testimonial' : 'Edit Written Testimonial'}
                            </h5>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Patient Name *</label>
                                <input
                                  type="text"
                                  required
                                  value={reviewDraftName}
                                  onChange={(e) => setReviewDraftName(e.target.value)}
                                  placeholder="e.g. Ramesh Patel"
                                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Treatment / Category *</label>
                                <input
                                  type="text"
                                  required
                                  value={reviewDraftTreatment}
                                  onChange={(e) => setReviewDraftTreatment(e.target.value)}
                                  placeholder="e.g. Full Mouth Dental Implants"
                                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Star Rating *</label>
                                <select
                                  value={reviewDraftRating}
                                  onChange={(e) => setReviewDraftRating(Number(e.target.value))}
                                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none"
                                >
                                  {[5, 4, 3, 2, 1].map(stars => (
                                    <option key={stars} value={stars}>{stars} Stars</option>
                                  ))}
                                </select>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Display Order</label>
                                <input
                                  type="number"
                                  value={reviewDraftDisplayOrder}
                                  onChange={(e) => setReviewDraftDisplayOrder(Number(e.target.value))}
                                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800"
                                />
                              </div>

                              <div className="space-y-1 sm:col-span-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Review Text *</label>
                                <textarea
                                  required
                                  rows={3}
                                  value={reviewDraftText}
                                  onChange={(e) => setReviewDraftText(e.target.value)}
                                  placeholder="Patient review details..."
                                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 leading-relaxed"
                                />
                              </div>

                              {/* Before / After Optional Smile Photos */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase block">Before Treatment Photo (Optional)</label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={reviewDraftBeforeImage}
                                    onChange={(e) => setReviewDraftBeforeImage(e.target.value)}
                                    placeholder="Before image URL"
                                    className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => triggerUpload('image/*', (url) => setReviewDraftBeforeImage(url))}
                                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition shrink-0"
                                  >
                                    Upload
                                  </button>
                                </div>
                                {reviewDraftBeforeImage && (
                                  <img 
                                    src={reviewDraftBeforeImage} 
                                    alt="Before" 
                                    className="h-14 w-24 object-cover rounded border border-slate-200 bg-white" 
                                    referrerPolicy="no-referrer"
                                  />
                                )}
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase block">After Treatment Photo (Optional)</label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={reviewDraftAfterImage}
                                    onChange={(e) => setReviewDraftAfterImage(e.target.value)}
                                    placeholder="After image URL"
                                    className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => triggerUpload('image/*', (url) => setReviewDraftAfterImage(url))}
                                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition shrink-0"
                                  >
                                    Upload
                                  </button>
                                </div>
                                {reviewDraftAfterImage && (
                                  <img 
                                    src={reviewDraftAfterImage} 
                                    alt="After" 
                                    className="h-14 w-24 object-cover rounded border border-slate-200 bg-white" 
                                    referrerPolicy="no-referrer"
                                  />
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-150">
                              <button
                                type="button"
                                onClick={() => setEditingReviewId(null)}
                                className="px-3.5 py-1.5 text-slate-500 hover:text-slate-800 text-xs font-bold rounded-lg transition"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (!reviewDraftName || !reviewDraftTreatment || !reviewDraftText) {
                                    alert('Please fill in Name, Treatment, and Review text fields.');
                                    return;
                                  }
                                  const list = mConfig.written_reviews || [];
                                  let updatedList = [...list];
                                  if (editingReviewId === 'new') {
                                    updatedList.push({
                                      id: 'wr-' + Date.now(),
                                      patient_name: reviewDraftName,
                                      treatment_name: reviewDraftTreatment,
                                      review: reviewDraftText,
                                      rating: reviewDraftRating,
                                      before_image: reviewDraftBeforeImage || undefined,
                                      after_image: reviewDraftAfterImage || undefined,
                                      display_order: reviewDraftDisplayOrder
                                    });
                                  } else {
                                    updatedList = updatedList.map(r => r.id === editingReviewId ? {
                                      ...r,
                                      patient_name: reviewDraftName,
                                      treatment_name: reviewDraftTreatment,
                                      review: reviewDraftText,
                                      rating: reviewDraftRating,
                                      before_image: reviewDraftBeforeImage || undefined,
                                      after_image: reviewDraftAfterImage || undefined,
                                      display_order: reviewDraftDisplayOrder
                                    } : r);
                                  }
                                  
                                  // Sort the list by display order
                                  updatedList.sort((a, b) => a.display_order - b.display_order);
                                  
                                  updateMarketingConfig('written_reviews', updatedList);
                                  setEditingReviewId(null);
                                }}
                                className="px-4 py-1.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold rounded-lg transition animate-pulse-once"
                              >
                                Save Review
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* List of Reviews */
                          <div className="space-y-3 pt-1">
                            {(!mConfig.written_reviews || mConfig.written_reviews.length === 0) ? (
                              <p className="text-xs text-slate-400 text-center py-6 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                                No written testimonials added yet. Click 'Add Written Review' above to display beautiful ratings & smile transformations.
                              </p>
                            ) : (
                              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                                {(mConfig.written_reviews as any[]).map((r, index) => (
                                  <div key={r.id} className="flex items-start justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl gap-4">
                                    <div className="flex-1 space-y-1 min-w-0">
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-bold text-[#081C3A]">{r.patient_name}</span>
                                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-semibold">{r.treatment_name}</span>
                                        <div className="flex items-center text-amber-400 ml-1">
                                          {Array.from({ length: r.rating || 5 }).map((_, i) => (
                                            <Star key={i} className="h-3 w-3 fill-amber-400 shrink-0" />
                                          ))}
                                        </div>
                                      </div>
                                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed italic">"{r.review}"</p>
                                      
                                      {/* Before After Preview Thumbs */}
                                      {(r.before_image || r.after_image) && (
                                        <div className="flex items-center gap-3 pt-1.5">
                                          {r.before_image && (
                                            <div className="space-y-0.5">
                                              <span className="text-[8px] font-black text-rose-500 block">BEFORE</span>
                                              <img src={r.before_image} alt="Before" className="h-8 w-12 object-cover rounded border border-slate-200 font-sans" referrerPolicy="no-referrer" />
                                            </div>
                                          )}
                                          {r.after_image && (
                                            <div className="space-y-0.5">
                                              <span className="text-[8px] font-black text-emerald-500 block">AFTER</span>
                                              <img src={r.after_image} alt="After" className="h-8 w-12 object-cover rounded border border-slate-200 font-sans" referrerPolicy="no-referrer" />
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0 font-sans">
                                      {/* Reordering */}
                                      <div className="flex items-center gap-1 bg-white border border-slate-150 rounded-lg p-0.5 shadow-3xs">
                                        <button
                                          type="button"
                                          disabled={index === 0}
                                          onClick={() => {
                                            const updated = [...mConfig.written_reviews];
                                            const temp = updated[index];
                                            updated[index] = updated[index - 1];
                                            updated[index - 1] = temp;
                                            updateMarketingConfig('written_reviews', updated);
                                          }}
                                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none rounded transition"
                                        >
                                          <ChevronUp className="h-3.5 w-3.5" />
                                        </button>
                                        <button
                                          type="button"
                                          disabled={index === mConfig.written_reviews.length - 1}
                                          onClick={() => {
                                            const updated = [...mConfig.written_reviews];
                                            const temp = updated[index];
                                            updated[index] = updated[index + 1];
                                            updated[index + 1] = temp;
                                            updateMarketingConfig('written_reviews', updated);
                                          }}
                                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none rounded transition"
                                        >
                                          <ChevronDown className="h-3.5 w-3.5" />
                                        </button>
                                      </div>

                                      {/* Action buttons */}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setEditingReviewId(r.id);
                                          setReviewDraftName(r.patient_name || '');
                                          setReviewDraftTreatment(r.treatment_name || '');
                                          setReviewDraftText(r.review || '');
                                          setReviewDraftRating(r.rating || 5);
                                          setReviewDraftBeforeImage(r.before_image || '');
                                          setReviewDraftAfterImage(r.after_image || '');
                                          setReviewDraftDisplayOrder(r.display_order || 10);
                                        }}
                                        className="p-1 text-[#0D9488] hover:text-[#0F766E] hover:bg-teal-50 rounded-lg transition"
                                      >
                                        <Pencil className="h-4 w-4" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (confirm('Are you sure you want to delete this written testimonial?')) {
                                            const filtered = (mConfig.written_reviews as any[]).filter(item => item.id !== r.id);
                                            updateMarketingConfig('written_reviews', filtered);
                                          }
                                        }}
                                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                          type="submit"
                          className="px-6 py-3 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <Check className="h-4 w-4" />
                          Save Service & Configurations
                        </button>
                      </div>
                    </>
                  );
                })()}
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
