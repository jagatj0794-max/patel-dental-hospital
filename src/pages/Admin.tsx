/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  EyeOff,
  Heart,
  Bell,
  BellRing,
  Plane,
  Info,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { PageId, Doctor, PatientMoment, ContactInfo, DentalVideo, Service, ServiceGalleryItem, ServiceFaq, SocialServiceItem, TechnologyItem, AwardItem, InternationalPatientImage, BeforeAfterEntry } from '../types';
import { Plus, Pencil, Save, X as CloseIcon, ArrowLeft, CalendarDays, Link, ArrowUpDown, Trophy, ChevronLeft, ChevronRight, Edit2 } from 'lucide-react';
import { safeStorage } from '../utils/storage';
import { supabase } from '../utils/supabase';
import { dbNotificationService } from '../utils/dbNotificationService';
import { uploadImage, uploadVideo } from '../utils/supabaseStorage';
import { heroService } from '../utils/heroData';
import { doctorService } from '../utils/doctorData';
import { galleryService } from '../utils/galleryData';
import { videoService } from '../utils/videoData';
import { Mp4ReelPlayer } from '../components/Mp4ReelPlayer';
import { contactService } from '../utils/contactData';
import { socialServiceService, generateUUID } from '../utils/socialServiceData';
import { technologyService } from '../utils/technologyData';
import { awardsService } from '../utils/awardsData';
import { internationalPatientsService } from '../utils/internationalPatientsData';
import { beforeAfterService } from '../utils/beforeAfterData';
import { serviceService, DEFAULT_GREEN_HIGHLIGHT_LINE } from '../utils/serviceData';
import Appointments from './Appointments';
import ServiceDetail from './ServiceDetail';
import DentalImplantsCms from '../components/DentalImplantsCms';
import RootCanalCms from '../components/RootCanalCms';
import FullMouthRehabCms from '../components/FullMouthRehabCms';
import InvisibleAlignersCms from '../components/InvisibleAlignersCms';
import SmileMakeoverCms from '../components/SmileMakeoverCms';
import CrownAndBridgesCms from '../components/CrownAndBridgesCms';
import TeethWhiteningCms from '../components/TeethWhiteningCms';
import PediatricDentistryCms from '../components/PediatricDentistryCms';
import BracesTreatmentCms from '../components/BracesTreatmentCms';
import WisdomToothSurgeryCms from '../components/WisdomToothSurgeryCms';
import UnifiedServiceCms from "../components/UnifiedServiceCms";
import CmsSectionToggle from '../components/CmsSectionToggle';
import TestimonialThumbnailUpload from '../components/TestimonialThumbnailUpload';
import BeforeAfterCms from '../components/BeforeAfterCms';

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

type SidebarTab = 'dashboard' | 'hero' | 'doctors' | 'media' | 'appointments' | 'contact' | 'services' | 'implants-cms' | 'dental-tourism';

const detectImageOrientation = (file: File): Promise<'horizontal' | 'vertical'> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        if (width >= height) {
          resolve('horizontal');
        } else {
          resolve('vertical');
        }
      };
      img.onerror = () => {
        resolve('horizontal'); // fallback
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      resolve('horizontal'); // fallback
    };
    reader.readAsDataURL(file);
  });
};

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
  const [isTourismVideoEnabled, setIsTourismVideoEnabled] = useState<boolean>(true);

  useEffect(() => {
    const fetchTourismVideoSetting = async () => {
      try {
        const enabled = await videoService.getDentalTourismVideoEnabled();
        setIsTourismVideoEnabled(enabled);
      } catch (err) {
        console.error('Error fetching dental tourism video enabled setting in Admin:', err);
      }
    };
    fetchTourismVideoSetting();
  }, []);

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

  // Social Services local draft states
  const [draftSocialServices, setDraftSocialServices] = useState<SocialServiceItem[]>([]);
  const [editingSocialService, setEditingSocialService] = useState<SocialServiceItem | null>(null);
  const [socialServiceToDelete, setSocialServiceToDelete] = useState<string | null>(null);
  const [isSocialServiceUploading, setIsSocialServiceUploading] = useState(false);
  const [isLoadingSocialServices, setIsLoadingSocialServices] = useState(false);

  const loadSocialServicesList = async () => {
    setIsLoadingSocialServices(true);
    try {
      const freshItems = await socialServiceService.getSocialServices();
      setDraftSocialServices(freshItems);
    } catch (err) {
      console.error('Error loading social services from public.social_service:', err);
    } finally {
      setIsLoadingSocialServices(false);
    }
  };

  // Technology local draft states
  const [draftTechnology, setDraftTechnology] = useState<TechnologyItem[]>([]);
  const [editingTechnology, setEditingTechnology] = useState<TechnologyItem | null>(null);
  const [technologyToDelete, setTechnologyToDelete] = useState<string | null>(null);
  const [isTechnologyUploading, setIsTechnologyUploading] = useState(false);
  const [isLoadingTechnology, setIsLoadingTechnology] = useState(false);

  const loadTechnologyList = async () => {
    setIsLoadingTechnology(true);
    try {
      const freshItems = await technologyService.getTechnology();
      setDraftTechnology(freshItems);
    } catch (err) {
      console.error('Error loading technology from public.technology:', err);
    } finally {
      setIsLoadingTechnology(false);
    }
  };

  // Awards local draft states
  const [draftAwards, setDraftAwards] = useState<AwardItem[]>([]);
  const [detectedAdminOrientations, setDetectedAdminOrientations] = useState<Record<string, 'horizontal' | 'vertical'>>({});

  useEffect(() => {
    if (!draftAwards || draftAwards.length === 0) return;
    
    draftAwards.forEach(item => {
      if (!item.image_url) return;
      if (detectedAdminOrientations[item.id]) return;

      const img = new window.Image();
      img.referrerPolicy = "no-referrer";
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const orientation = height > width ? 'vertical' : 'horizontal';
        setDetectedAdminOrientations(prev => ({
          ...prev,
          [item.id]: orientation
        }));
      };
      img.onerror = () => {
        setDetectedAdminOrientations(prev => ({
          ...prev,
          [item.id]: item.orientation || 'horizontal'
        }));
      };
      img.src = item.image_url;
    });
  }, [draftAwards]);

  const getItemOrientation = (item: AwardItem): 'horizontal' | 'vertical' => {
    return detectedAdminOrientations[item.id] || item.orientation || 'horizontal';
  };

  const [awardsOrientationTab, setAwardsOrientationTab] = useState<'horizontal' | 'vertical'>('horizontal');
  const [awardToDelete, setAwardToDelete] = useState<string | null>(null);
  const [previewAwardUrl, setPreviewAwardUrl] = useState<string | null>(null);
  const [isLoadingAwards, setIsLoadingAwards] = useState(false);

  const handleMoveAward = async (id: string, direction: 'up' | 'down') => {
    // Find the current filtered items (by orientation tab)
    const currentTabItems = (draftAwards || []).filter(item => {
      const orientation = getItemOrientation(item);
      if (awardsOrientationTab === 'horizontal') {
        return orientation === 'horizontal';
      } else {
        return orientation === 'vertical';
      }
    });

    const indexInTab = currentTabItems.findIndex(item => item.id === id);
    if (indexInTab === -1) return;

    let targetIndexInTab = indexInTab + (direction === 'down' ? 1 : -1);
    if (targetIndexInTab < 0 || targetIndexInTab >= currentTabItems.length) return;

    // We swap the elements in the overall list
    const originalItem = currentTabItems[indexInTab];
    const targetItem = currentTabItems[targetIndexInTab];

    const idxInOverall = draftAwards.findIndex(item => item.id === originalItem.id);
    const targetIdxInOverall = draftAwards.findIndex(item => item.id === targetItem.id);

    if (idxInOverall === -1 || targetIdxInOverall === -1) return;

    const newAwards = [...draftAwards];
    // Swap
    newAwards[idxInOverall] = targetItem;
    newAwards[targetIdxInOverall] = originalItem;

    // Re-index display_order for all to be safe
    newAwards.forEach((item, index) => {
      item.display_order = index;
    });

    setDraftAwards(newAwards);
    setSaveMessage('Saving reordered awards...');
    const success = await awardsService.saveAwardsList(newAwards);
    if (success) {
      setSaveMessage('Awards reordered successfully!');
    } else {
      setSaveMessage('Failed to save reordered awards.');
    }
    setTimeout(() => setSaveMessage(null), 2500);
  };

  const loadAwardsList = async () => {
    setIsLoadingAwards(true);
    try {
      const freshItems = await awardsService.getAwards();
      setDraftAwards(freshItems);
    } catch (err) {
      console.error('Error loading awards from public.awards:', err);
    } finally {
      setIsLoadingAwards(false);
    }
  };

  // International Patients Gallery draft states
  const [draftInternationalPatients, setDraftInternationalPatients] = useState<InternationalPatientImage[]>([]);
  const [patientToDelete, setPatientToDelete] = useState<string | null>(null);
  const [isLoadingInternationalPatients, setIsLoadingInternationalPatients] = useState(false);
  const [editingInternationalPatient, setEditingInternationalPatient] = useState<InternationalPatientImage | null>(null);
  const [tourismSubTab, setTourismSubTab] = useState<'image' | 'video' | 'before_after'>('image');

  const loadInternationalPatientsList = async () => {
    setIsLoadingInternationalPatients(true);
    try {
      const freshItems = await internationalPatientsService.getInternationalPatients();
      setDraftInternationalPatients(freshItems);
    } catch (err) {
      console.error('Error loading international patients from public.international_patients_gallery:', err);
    } finally {
      setIsLoadingInternationalPatients(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'media' || activeTab === 'dental-tourism') {
      loadSocialServicesList();
      loadTechnologyList();
      loadAwardsList();
      loadInternationalPatientsList();
    }
  }, [activeTab]);

  // Services Tab states
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const sortedServicesList = React.useMemo(() => {
    return [...servicesList].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }, [servicesList]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [expandedAddServiceSections, setExpandedAddServiceSections] = useState<Record<string, boolean>>({
    core: true, // Keep the first one open by default
  });

  const toggleAddServiceSection = (sec: string) => {
    setExpandedAddServiceSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };
  const [serviceImgUploading, setServiceImgUploading] = useState(false);
  const [homePageImgUploading, setHomePageImgUploading] = useState(false);
  const [serviceFormError, setServiceFormError] = useState<string | null>(null);
  const [isSlugTouched, setIsSlugTouched] = useState(false);
  const [relatedSearchQuery, setRelatedSearchQuery] = useState('');
  const [relatedDragIndex, setRelatedDragIndex] = useState<number | null>(null);

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
      hero_image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1200',
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
      marketing_config: {
        show_hero: true,
        show_introduction: true,
        show_process: true,
        show_benefits: true,
        show_gallery: true,
        show_procedure_video: true,
        show_hospital_photos: true,
        show_team_photos: true,
        show_testimonials: true,
        show_faq: true,
        show_related_services: true,
        show_bottom_cta: true,
        
        cta_appointment_enabled: true,
        cta_appointment_text: 'Book Appointment',
        cta_appointment_dest: 'appointment',
        
        cta_call_enabled: true,
        cta_call_text: 'Call Now',
        cta_call_dest: 'clinic',
        
        cta_whatsapp_enabled: true,
        cta_whatsapp_text: 'WhatsApp Us',
        cta_whatsapp_dest: 'clinic',
        
        show_offer_banner: true,
        offer_show: true,
        offer_title: 'Special Promotional Offer',
        offer_subtitle: 'Limited Time Only',
        offer_description: 'Claim your exclusive discount on our premium treatment packages today.',
        offer_badge: 'Exclusive Offer',
        offer_badge_text: 'Exclusive Offer',
        offer_button_text: 'Claim Offer Now',
        
        bottom_cta_heading: 'Ready to Transform Your Smile?',
        bottom_cta_description: 'Book your consultation today and experience world-class, personalized dental care.',
        bottom_cta_primary_btn_text: 'Book Clinic Slot',
        bottom_cta_secondary_btn_text: 'WhatsApp Us'
      }
    });
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    if (isSavingService) return; // Prevent duplicate requests

    setServiceFormError(null);
    setServiceValidationErrors({});

    // Robust validation
    const errors: Record<string, string> = {};

    if (!editingService.title || !editingService.title.trim()) {
      errors.title = 'Service title is required.';
    }
    if (!editingService.slug || !editingService.slug.trim()) {
      errors.slug = 'Service slug is required.';
    } else {
      const sanitizedSlug = editingService.slug.trim().toLowerCase().replace(/\s+/g, '-');
      if (!isSlugUnique(sanitizedSlug, editingService.id)) {
        errors.slug = 'Service slug must be unique. This slug is already in use.';
      }
    }
    if (!editingService.short_description || !editingService.short_description.trim()) {
      errors.short_description = 'Short description is required.';
    }
    if (!editingService.description || !editingService.description.trim()) {
      errors.description = 'Full description is required.';
    }
    if (!editingService.hero_image || !editingService.hero_image.trim()) {
      errors.hero_image = 'Hero image is required.';
    }

    const orderNum = Number(editingService.display_order);
    if (isNaN(orderNum)) {
      errors.display_order = 'Display order must be a valid numeric value.';
    }

    // Optional URL validation
    if (editingService.procedure_video_url && editingService.procedure_video_url.trim()) {
      const vidUrl = editingService.procedure_video_url.trim();
      if (!vidUrl.startsWith('http://') && !vidUrl.startsWith('https://')) {
        errors.procedure_video_url = 'Video URL must be a valid link starting with http:// or https://';
      }
    }

    if (Object.keys(errors).length > 0) {
      setServiceValidationErrors(errors);
      setServiceFormError('Please resolve the validation errors highlighted in this section.');
      // Auto-switch to the details tab where the required invalid fields are located so they are visible
      if (errors.title || errors.slug || errors.short_description || errors.description || errors.hero_image) {
        setActiveServiceEditorTab('details');
      }
      return;
    }

    setIsSavingService(true);
    setSaveMessage('Saving service configurations securely...');

    try {
      const isNew = !servicesList.some(s => s.id === editingService.id);
      const original = servicesList.find(s => s.id === editingService.id);

      // Secure helper to never overwrite existing non-empty values with empty drafts
      const preserveIfBlank = (field: keyof Service, val: any) => {
        if (val === undefined || val === null || (typeof val === 'string' && val.trim() === '')) {
          if (original && original[field] !== undefined && original[field] !== null && original[field] !== '') {
            return original[field];
          }
        }
        return val;
      };

      const serviceToSave: Service = {
        ...editingService,
        title: editingService.title.trim(),
        slug: editingService.slug.trim().toLowerCase().replace(/\s+/g, '-'),
        short_description: editingService.short_description.trim(),
        description: editingService.description.trim(),
        display_order: Number(editingService.display_order),
        seo_title: preserveIfBlank('seo_title', editingService.seo_title?.trim() || null),
        seo_description: preserveIfBlank('seo_description', editingService.seo_description?.trim() || null),
        homepage_card_image: preserveIfBlank('homepage_card_image', editingService.homepage_card_image?.trim() || null),
        homepage_short_description: preserveIfBlank('homepage_short_description', editingService.homepage_short_description?.trim() || null),
        hero_title: preserveIfBlank('hero_title', editingService.hero_title?.trim() || null),
        hero_description: preserveIfBlank('hero_description', editingService.hero_description?.trim() || null),
        hero_image_caption: preserveIfBlank('hero_image_caption', editingService.hero_image_caption?.trim() || null),
        intro_title: preserveIfBlank('intro_title', editingService.intro_title?.trim() || null),
        intro_description: preserveIfBlank('intro_description', editingService.intro_description?.trim() || null),
        process_steps: editingService.process_steps || [],
        features: editingService.features || [],
        content_images: editingService.content_images || [],
        procedure_video_url: preserveIfBlank('procedure_video_url', editingService.procedure_video_url?.trim() || null),
        procedure_video_title: preserveIfBlank('procedure_video_title', editingService.procedure_video_title?.trim() || null),
        procedure_video_description: preserveIfBlank('procedure_video_description', editingService.procedure_video_description?.trim() || null),
        procedure_video_thumbnail: preserveIfBlank('procedure_video_thumbnail', editingService.procedure_video_thumbnail?.trim() || null),
        patient_testimonials: editingService.patient_testimonials || [],
        hospital_team_photos: editingService.hospital_team_photos || [],
        marketing_config: computedPreviewService ? computedPreviewService.marketing_config : editingService.marketing_config,
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

      // Perform background database synchronization with retry capability
      serviceService.saveService(serviceToSave).then((result) => {
        setIsSavingService(false);
        if (result.success) {
          if (isNew) {
            setSaveMessage('Service created successfully. You can now add Gallery images and FAQs.');
          } else {
            setSaveMessage('Service saved successfully!');
          }
        } else {
          // Revert local state if save fails
          setServicesList(oldServicesList);
          setServiceFormError(result.error || 'Failed to save service on database server. Please try again.');
          setSaveMessage(null);
        }
      }).catch((err: any) => {
        setIsSavingService(false);
        setServicesList(oldServicesList);
        setServiceFormError('Error saving service: ' + (err.message || err));
        setSaveMessage(null);
      });

    } catch (err: any) {
      setIsSavingService(false);
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
  const [activeServiceEditorTab, setActiveServiceEditorTab] = useState<'details' | 'media' | 'gallery' | 'faqs' | 'marketing' | 'ordering'>('details');

  const [serviceGalleryList, setServiceGalleryList] = useState<ServiceGalleryItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [gallerySaving, setGallerySaving] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Display Order Manager states
  const [orderStepsDraft, setOrderStepsDraft] = useState<any[]>([]);
  const [orderBenefitsDraft, setOrderBenefitsDraft] = useState<any[]>([]);
  const [orderGalleryDraft, setOrderGalleryDraft] = useState<any[]>([]);
  const [orderTestimonialsDraft, setOrderTestimonialsDraft] = useState<any[]>([]);
  const [orderRelatedDraft, setOrderRelatedDraft] = useState<any[]>([]);
  const [orderSuccessMsg, setOrderSuccessMsg] = useState<Record<string, string | null>>({});
  const [orderErrorMsg, setOrderErrorMsg] = useState<Record<string, string | null>>({});
  const [draggedOrderInfo, setDraggedOrderInfo] = useState<{ category: string; index: number } | null>(null);

  const initDisplayOrderDrafts = React.useCallback(() => {
    if (!editingService) return;

    // 1. Steps
    const rawSteps = Array.isArray(editingService.process_steps)
      ? editingService.process_steps
      : (typeof editingService.process_steps === 'string'
          ? (() => { try { return JSON.parse(editingService.process_steps || '[]') } catch(e) { return [] } })()
          : []);
    const sortedSteps = [...rawSteps].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    setOrderStepsDraft(sortedSteps);

    // 2. Benefits
    const rawFeats = Array.isArray(editingService.features)
      ? editingService.features
      : (typeof editingService.features === 'string'
          ? (() => { try { return JSON.parse(editingService.features || '[]') } catch(e) { return [] } })()
          : []);
    const sortedFeats = [...rawFeats].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    setOrderBenefitsDraft(sortedFeats);

    // 3. Gallery
    const sortedGallery = [...serviceGalleryList].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    setOrderGalleryDraft(sortedGallery);

    // 4. Testimonials
    const rawTestimonials = Array.isArray(editingService.patient_testimonials)
      ? editingService.patient_testimonials
      : (typeof editingService.patient_testimonials === 'string'
          ? (() => { try { return JSON.parse(editingService.patient_testimonials || '[]') } catch(e) { return [] } })()
          : []);
    const sortedTestimonials = [...rawTestimonials].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    setOrderTestimonialsDraft(sortedTestimonials);

    // 5. Related Services
    const mConfigObj = typeof editingService.marketing_config === 'string'
      ? (() => { try { return JSON.parse(editingService.marketing_config) } catch(e) { return {} } })()
      : (editingService.marketing_config || {});
    const rawRelated = mConfigObj.related_services || [];
    const cleanRelated = rawRelated.filter((r: any) => 
      r && r.id && servicesList.some(s => s.id === r.id)
    );
    setOrderRelatedDraft(cleanRelated);

    setOrderSuccessMsg({});
    setOrderErrorMsg({});
  }, [editingService, serviceGalleryList, servicesList]);

  React.useEffect(() => {
    if (activeServiceEditorTab === 'ordering') {
      initDisplayOrderDrafts();
    }
  }, [activeServiceEditorTab, editingService?.id, initDisplayOrderDrafts]);

  const moveOrderItem = (
    draft: any[],
    setDraft: React.Dispatch<React.SetStateAction<any[]>>,
    index: number,
    direction: 'up' | 'down'
  ) => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= draft.length) return;
    const updated = [...draft];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setDraft(updated);
  };

  const handleOrderDragStart = (e: React.DragEvent, category: string, index: number) => {
    setDraggedOrderInfo({ category, index });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleOrderDragOver = (e: React.DragEvent, category: string, index: number, draft: any[], setDraft: React.Dispatch<React.SetStateAction<any[]>>) => {
    e.preventDefault();
    if (!draggedOrderInfo || draggedOrderInfo.category !== category || draggedOrderInfo.index === index) return;

    const updated = [...draft];
    const draggedItem = updated[draggedOrderInfo.index];
    updated.splice(draggedOrderInfo.index, 1);
    updated.splice(index, 0, draggedItem);

    setDraft(updated);
    setDraggedOrderInfo({ category, index });
  };

  const handleOrderDragEnd = () => {
    setDraggedOrderInfo(null);
  };

  const handleResetStepsOrder = () => {
    if (!editingService) return;
    const rawSteps = Array.isArray(editingService.process_steps)
      ? editingService.process_steps
      : (typeof editingService.process_steps === 'string'
          ? (() => { try { return JSON.parse(editingService.process_steps || '[]') } catch(e) { return [] } })()
          : []);
    const sortedSteps = [...rawSteps].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    setOrderStepsDraft(sortedSteps);
    setOrderErrorMsg(prev => ({ ...prev, steps: null }));
    setOrderSuccessMsg(prev => ({ ...prev, steps: null }));
  };

  const handleResetBenefitsOrder = () => {
    if (!editingService) return;
    const rawFeats = Array.isArray(editingService.features)
      ? editingService.features
      : (typeof editingService.features === 'string'
          ? (() => { try { return JSON.parse(editingService.features || '[]') } catch(e) { return [] } })()
          : []);
    const sortedFeats = [...rawFeats].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    setOrderBenefitsDraft(sortedFeats);
    setOrderErrorMsg(prev => ({ ...prev, benefits: null }));
    setOrderSuccessMsg(prev => ({ ...prev, benefits: null }));
  };

  const handleResetGalleryOrder = () => {
    if (!editingService) return;
    const sortedGallery = [...serviceGalleryList].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    setOrderGalleryDraft(sortedGallery);
    setOrderErrorMsg(prev => ({ ...prev, gallery: null }));
    setOrderSuccessMsg(prev => ({ ...prev, gallery: null }));
  };

  const handleResetTestimonialsOrder = () => {
    if (!editingService) return;
    const rawTestimonials = Array.isArray(editingService.patient_testimonials)
      ? editingService.patient_testimonials
      : (typeof editingService.patient_testimonials === 'string'
          ? (() => { try { return JSON.parse(editingService.patient_testimonials || '[]') } catch(e) { return [] } })()
          : []);
    const sortedTestimonials = [...rawTestimonials].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    setOrderTestimonialsDraft(sortedTestimonials);
    setOrderErrorMsg(prev => ({ ...prev, testimonials: null }));
    setOrderSuccessMsg(prev => ({ ...prev, testimonials: null }));
  };

  const handleResetRelatedOrder = () => {
    if (!editingService) return;
    const mConfigObj = typeof editingService.marketing_config === 'string'
      ? (() => { try { return JSON.parse(editingService.marketing_config) } catch(e) { return {} } })()
      : (editingService.marketing_config || {});
    const rawRelated = mConfigObj.related_services || [];
    const cleanRelated = rawRelated.filter((r: any) => 
      r && r.id && servicesList.some(s => s.id === r.id)
    );
    setOrderRelatedDraft(cleanRelated);
    setOrderErrorMsg(prev => ({ ...prev, related: null }));
    setOrderSuccessMsg(prev => ({ ...prev, related: null }));
  };

  const handleSaveStepsOrder = async () => {
    if (!editingService) return;
    setOrderErrorMsg(prev => ({ ...prev, steps: null }));
    setOrderSuccessMsg(prev => ({ ...prev, steps: null }));

    try {
      const updatedSteps = orderStepsDraft.map((step, idx) => ({
        ...step,
        display_order: (idx + 1) * 10
      }));

      const updatedService = {
        ...editingService,
        process_steps: updatedSteps
      };
      setEditingService(updatedService);

      const result = await serviceService.saveService(updatedService);
      if (result.success) {
        setServicesList(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
        setOrderSuccessMsg(prev => ({ ...prev, steps: 'Steps display order saved successfully!' }));
        setTimeout(() => setOrderSuccessMsg(prev => ({ ...prev, steps: null })), 4000);
      } else {
        setOrderErrorMsg(prev => ({ ...prev, steps: result.error || 'Failed to save steps order.' }));
      }
    } catch (err: any) {
      console.error('Error saving steps order:', err);
      setOrderErrorMsg(prev => ({ ...prev, steps: err.message || 'An error occurred.' }));
    }
  };

  const handleSaveBenefitsOrder = async () => {
    if (!editingService) return;
    setOrderErrorMsg(prev => ({ ...prev, benefits: null }));
    setOrderSuccessMsg(prev => ({ ...prev, benefits: null }));

    try {
      const updatedBenefits = orderBenefitsDraft.map((feat, idx) => ({
        ...feat,
        display_order: (idx + 1) * 10
      }));

      const updatedService = {
        ...editingService,
        features: updatedBenefits
      };
      setEditingService(updatedService);

      const result = await serviceService.saveService(updatedService);
      if (result.success) {
        setServicesList(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
        setOrderSuccessMsg(prev => ({ ...prev, benefits: 'Benefits display order saved successfully!' }));
        setTimeout(() => setOrderSuccessMsg(prev => ({ ...prev, benefits: null })), 4000);
      } else {
        setOrderErrorMsg(prev => ({ ...prev, benefits: result.error || 'Failed to save benefits order.' }));
      }
    } catch (err: any) {
      console.error('Error saving benefits order:', err);
      setOrderErrorMsg(prev => ({ ...prev, benefits: err.message || 'An error occurred.' }));
    }
  };

  const handleSaveGalleryOrder = async () => {
    if (!editingService) return;
    setOrderErrorMsg(prev => ({ ...prev, gallery: null }));
    setOrderSuccessMsg(prev => ({ ...prev, gallery: null }));

    try {
      const updatedGallery = orderGalleryDraft.map((item, idx) => ({
        ...item,
        display_order: (idx + 1) * 10
      }));

      const result = await serviceService.saveGallery(editingService.id, updatedGallery);
      if (result.success) {
        setServiceGalleryList(updatedGallery);
        setOrderSuccessMsg(prev => ({ ...prev, gallery: 'Gallery images display order saved successfully!' }));
        setTimeout(() => setOrderSuccessMsg(prev => ({ ...prev, gallery: null })), 4000);
      } else {
        setOrderErrorMsg(prev => ({ ...prev, gallery: result.error || 'Failed to save gallery order.' }));
      }
    } catch (err: any) {
      console.error('Error saving gallery order:', err);
      setOrderErrorMsg(prev => ({ ...prev, gallery: err.message || 'An error occurred.' }));
    }
  };

  const handleSaveTestimonialsOrder = async () => {
    if (!editingService) return;
    setOrderErrorMsg(prev => ({ ...prev, testimonials: null }));
    setOrderSuccessMsg(prev => ({ ...prev, testimonials: null }));

    try {
      const updatedTestimonials = orderTestimonialsDraft.map((testi, idx) => ({
        ...testi,
        display_order: (idx + 1) * 10
      }));

      const updatedService = {
        ...editingService,
        patient_testimonials: updatedTestimonials
      };
      setEditingService(updatedService);

      const result = await serviceService.saveService(updatedService);
      if (result.success) {
        setServicesList(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
        setOrderSuccessMsg(prev => ({ ...prev, testimonials: 'Testimonials display order saved successfully!' }));
        setTimeout(() => setOrderSuccessMsg(prev => ({ ...prev, testimonials: null })), 4000);
      } else {
        setOrderErrorMsg(prev => ({ ...prev, testimonials: result.error || 'Failed to save testimonials order.' }));
      }
    } catch (err: any) {
      console.error('Error saving testimonials order:', err);
      setOrderErrorMsg(prev => ({ ...prev, testimonials: err.message || 'An error occurred.' }));
    }
  };

  const handleSaveRelatedOrder = async () => {
    if (!editingService) return;
    setOrderErrorMsg(prev => ({ ...prev, related: null }));
    setOrderSuccessMsg(prev => ({ ...prev, related: null }));

    try {
      const cfg = typeof editingService.marketing_config === 'string'
        ? (() => { try { return JSON.parse(editingService.marketing_config) } catch(e) { return {} } })()
        : (editingService.marketing_config || {});

      const existingRelated = cfg.related_services || [];
      const remainingRelated = existingRelated.filter((item: any) => 
        !orderRelatedDraft.some(d => d.id === (typeof item === 'string' ? item : item.id))
      );

      const updatedRelated = [...orderRelatedDraft, ...remainingRelated];

      const updatedConfig = {
        ...cfg,
        related_services: updatedRelated
      };

      const updatedService = {
        ...editingService,
        marketing_config: updatedConfig
      };
      setEditingService(updatedService);

      const result = await serviceService.saveService(updatedService);
      if (result.success) {
        setServicesList(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
        setOrderSuccessMsg(prev => ({ ...prev, related: 'Related services display order saved successfully!' }));
        setTimeout(() => setOrderSuccessMsg(prev => ({ ...prev, related: null })), 4000);
      } else {
        setOrderErrorMsg(prev => ({ ...prev, related: result.error || 'Failed to save related services order.' }));
      }
    } catch (err: any) {
      console.error('Error saving related services order:', err);
      setOrderErrorMsg(prev => ({ ...prev, related: err.message || 'An error occurred.' }));
    }
  };



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
  const [reviewDraftEnabled, setReviewDraftEnabled] = useState<boolean>(true);
  const [reviewDragIndex, setReviewDragIndex] = useState<number | null>(null);

  // Bottom Contact Section draft states
  const [contactClinicNameDraft, setContactClinicNameDraft] = useState('');
  const [contactAddressDraft, setContactAddressDraft] = useState('');
  const [contactCallNumberDraft, setContactCallNumberDraft] = useState('');
  const [contactWhatsappNumberDraft, setContactWhatsappNumberDraft] = useState('');
  const [contactEmailDraft, setContactEmailDraft] = useState('');
  const [contactWorkingHoursDraft, setContactWorkingHoursDraft] = useState('');
  const [contactMapUrlDraft, setContactMapUrlDraft] = useState('');
  const [contactFormError, setContactFormError] = useState<string | null>(null);
  const [contactFormSuccess, setContactFormSuccess] = useState<string | null>(null);

  // Social Links draft states
  const [socialFbLinkDraft, setSocialFbLinkDraft] = useState('');
  const [socialFbEnabledDraft, setSocialFbEnabledDraft] = useState(true);
  const [socialIgLinkDraft, setSocialIgLinkDraft] = useState('');
  const [socialIgEnabledDraft, setSocialIgEnabledDraft] = useState(true);
  const [socialYtLinkDraft, setSocialYtLinkDraft] = useState('');
  const [socialYtEnabledDraft, setSocialYtEnabledDraft] = useState(false);
  const [socialLiLinkDraft, setSocialLiLinkDraft] = useState('');
  const [socialLiEnabledDraft, setSocialLiEnabledDraft] = useState(false);
  const [socialTwLinkDraft, setSocialTwLinkDraft] = useState('');
  const [socialTwEnabledDraft, setSocialTwEnabledDraft] = useState(false);
  const [socialWaLinkDraft, setSocialWaLinkDraft] = useState('');
  const [socialWaEnabledDraft, setSocialWaEnabledDraft] = useState(false);
  const [socialFormError, setSocialFormError] = useState<string | null>(null);
  const [socialFormSuccess, setSocialFormSuccess] = useState<string | null>(null);

  // CTA Settings draft states
  const [ctaAppointmentEnabledDraft, setCtaAppointmentEnabledDraft] = useState(true);
  const [ctaAppointmentTextDraft, setCtaAppointmentTextDraft] = useState('');
  const [ctaAppointmentDestDraft, setCtaAppointmentDestDraft] = useState<'appointment' | 'internal' | 'external'>('appointment');
  const [ctaAppointmentDestValueDraft, setCtaAppointmentDestValueDraft] = useState('');

  const [ctaCallEnabledDraft, setCtaCallEnabledDraft] = useState(false);
  const [ctaCallTextDraft, setCtaCallTextDraft] = useState('');
  const [ctaCallDestDraft, setCtaCallDestDraft] = useState<'clinic' | 'custom'>('clinic');
  const [ctaCallDestValueDraft, setCtaCallDestValueDraft] = useState('');

  const [ctaWhatsappEnabledDraft, setCtaWhatsappEnabledDraft] = useState(true);
  const [ctaWhatsappTextDraft, setCtaWhatsappTextDraft] = useState('');
  const [ctaWhatsappDestDraft, setCtaWhatsappDestDraft] = useState<'clinic' | 'custom'>('clinic');
  const [ctaWhatsappDestValueDraft, setCtaWhatsappDestValueDraft] = useState('');

  const [ctaCustomEnabledDraft, setCtaCustomEnabledDraft] = useState(false);
  const [ctaCustomTextDraft, setCtaCustomTextDraft] = useState('');
  const [ctaCustomDestValueDraft, setCtaCustomDestValueDraft] = useState('');

  const [ctaFormError, setCtaFormError] = useState<string | null>(null);
  const [ctaFormSuccess, setCtaFormSuccess] = useState<string | null>(null);

  // Section Visibility Manager draft states
  const [visHeroDraft, setVisHeroDraft] = useState(true);
  const [visIntroDraft, setVisIntroDraft] = useState(true);
  const [visProcessDraft, setVisProcessDraft] = useState(true);
  const [visBenefitsDraft, setVisBenefitsDraft] = useState(true);
  const [visGalleryDraft, setVisGalleryDraft] = useState(true);
  const [visVideoDraft, setVisVideoDraft] = useState(true);
  const [visHospitalDraft, setVisHospitalDraft] = useState(true);
  const [visTeamDraft, setVisTeamDraft] = useState(true);
  const [visTestimonialsDraft, setVisTestimonialsDraft] = useState(true);
  const [visOfferBannerDraft, setVisOfferBannerDraft] = useState(true);
  const [visFaqDraft, setVisFaqDraft] = useState(true);
  const [visRelatedServicesDraft, setVisRelatedServicesDraft] = useState(true);
  const [visBottomCtaDraft, setVisBottomCtaDraft] = useState(true);

  const [visFormError, setVisFormError] = useState<string | null>(null);
  const [visFormSuccess, setVisFormSuccess] = useState<string | null>(null);

  // Live Preview configuration
  const [showLivePreview, setShowLivePreview] = useState(false);

  const computedPreviewService = React.useMemo(() => {
    if (!editingService) return null;
    
    const baseConfig = typeof editingService.marketing_config === 'string'
      ? (() => { try { return JSON.parse(editingService.marketing_config) } catch(e) { return {} } })()
      : (editingService.marketing_config || {});

    const mergedConfig = {
      ...baseConfig,
      // Section Visibility
      show_hero: visHeroDraft,
      show_introduction: visIntroDraft,
      show_process: visProcessDraft,
      show_benefits: visBenefitsDraft,
      show_gallery: visGalleryDraft,
      show_procedure_video: visVideoDraft,
      show_hospital_photos: visHospitalDraft,
      show_team_photos: visTeamDraft,
      show_testimonials: visTestimonialsDraft,
      show_offer_banner: visOfferBannerDraft,
      offer_show: visOfferBannerDraft,
      show_faq: visFaqDraft,
      show_related_services: visRelatedServicesDraft,
      show_bottom_cta: visBottomCtaDraft,
      
      // Contact Section
      contact_clinic_name: contactClinicNameDraft,
      contact_address: contactAddressDraft,
      contact_call_number: contactCallNumberDraft,
      contact_whatsapp_number: contactWhatsappNumberDraft,
      contact_email: contactEmailDraft,
      contact_working_hours: contactWorkingHoursDraft,
      contact_map_url: contactMapUrlDraft,

      // Social Links
      social_facebook: socialFbLinkDraft,
      social_fb_link: socialFbLinkDraft,
      social_facebook_enabled: socialFbEnabledDraft,
      social_fb_enabled: socialFbEnabledDraft,
      social_instagram: socialIgLinkDraft,
      social_ig_link: socialIgLinkDraft,
      social_instagram_enabled: socialIgEnabledDraft,
      social_ig_enabled: socialIgEnabledDraft,
      social_youtube: socialYtLinkDraft,
      social_yt_link: socialYtLinkDraft,
      social_youtube_enabled: socialYtEnabledDraft,
      social_yt_enabled: socialYtEnabledDraft,
      social_linkedin: socialLiLinkDraft,
      social_li_link: socialLiLinkDraft,
      social_linkedin_enabled: socialLiEnabledDraft,
      social_li_enabled: socialLiEnabledDraft,
      social_twitter: socialTwLinkDraft,
      social_tw_link: socialTwLinkDraft,
      social_twitter_enabled: socialTwEnabledDraft,
      social_tw_enabled: socialTwEnabledDraft,
      social_whatsapp: socialWaLinkDraft,
      social_wa_link: socialWaLinkDraft,
      social_whatsapp_enabled: socialWaEnabledDraft,
      social_wa_enabled: socialWaEnabledDraft,

      // CTA buttons
      cta_appointment_enabled: ctaAppointmentEnabledDraft,
      cta_appointment_text: ctaAppointmentTextDraft,
      cta_appointment_dest: ctaAppointmentDestDraft,
      cta_appointment_dest_value: ctaAppointmentDestValueDraft,
      cta_call_enabled: ctaCallEnabledDraft,
      cta_call_text: ctaCallTextDraft,
      cta_call_dest: ctaCallDestDraft,
      cta_call_dest_value: ctaCallDestValueDraft,
      cta_whatsapp_enabled: ctaWhatsappEnabledDraft,
      cta_whatsapp_text: ctaWhatsappTextDraft,
      cta_whatsapp_dest: ctaWhatsappDestDraft,
      cta_whatsapp_dest_value: ctaWhatsappDestValueDraft,
      cta_custom_enabled: ctaCustomEnabledDraft,
      cta_custom_text: ctaCustomTextDraft,
      cta_custom_dest_value: ctaCustomDestValueDraft,
    };

    return {
      ...editingService,
      marketing_config: mergedConfig
    };
  }, [
    editingService,
    visHeroDraft,
    visIntroDraft,
    visProcessDraft,
    visBenefitsDraft,
    visGalleryDraft,
    visVideoDraft,
    visHospitalDraft,
    visTeamDraft,
    visTestimonialsDraft,
    visOfferBannerDraft,
    visFaqDraft,
    visRelatedServicesDraft,
    visBottomCtaDraft,
    contactClinicNameDraft,
    contactAddressDraft,
    contactCallNumberDraft,
    contactWhatsappNumberDraft,
    contactEmailDraft,
    contactWorkingHoursDraft,
    contactMapUrlDraft,
    socialFbLinkDraft,
    socialFbEnabledDraft,
    socialIgLinkDraft,
    socialIgEnabledDraft,
    socialYtLinkDraft,
    socialYtEnabledDraft,
    socialLiLinkDraft,
    socialLiEnabledDraft,
    socialTwLinkDraft,
    socialTwEnabledDraft,
    socialWaLinkDraft,
    socialWaEnabledDraft,
    ctaAppointmentEnabledDraft,
    ctaAppointmentTextDraft,
    ctaAppointmentDestDraft,
    ctaAppointmentDestValueDraft,
    ctaCallEnabledDraft,
    ctaCallTextDraft,
    ctaCallDestDraft,
    ctaCallDestValueDraft,
    ctaWhatsappEnabledDraft,
    ctaWhatsappTextDraft,
    ctaWhatsappDestDraft,
    ctaWhatsappDestValueDraft,
    ctaCustomEnabledDraft,
    ctaCustomTextDraft,
    ctaCustomDestValueDraft
  ]);

  // Synchronize drafts when editingService changes
  useEffect(() => {
    if (editingService) {
      const cfg = typeof editingService.marketing_config === 'string'
        ? (() => { try { return JSON.parse(editingService.marketing_config) } catch(e) { return {} } })()
        : (editingService.marketing_config || {});
      setContactClinicNameDraft(cfg.contact_clinic_name || '');
      setContactAddressDraft(cfg.contact_address || '');
      setContactCallNumberDraft(cfg.contact_call_number || '');
      setContactWhatsappNumberDraft(cfg.contact_whatsapp_number || '');
      setContactEmailDraft(cfg.contact_email || '');
      setContactWorkingHoursDraft(cfg.contact_working_hours || '');
      setContactMapUrlDraft(cfg.contact_map_url || '');
      setContactFormError(null);
      setContactFormSuccess(null);

      // Social links synchronization
      const fbEnabled = cfg.social_fb_enabled !== undefined 
        ? !!cfg.social_fb_enabled 
        : (cfg.social_facebook_enabled !== undefined ? !!cfg.social_facebook_enabled : true);
      const fbLink = cfg.social_fb_link || cfg.social_facebook || '';

      const igEnabled = cfg.social_ig_enabled !== undefined 
        ? !!cfg.social_ig_enabled 
        : (cfg.social_instagram_enabled !== undefined ? !!cfg.social_instagram_enabled : true);
      const igLink = cfg.social_ig_link || cfg.social_instagram || '';

      const ytEnabled = cfg.social_yt_enabled !== undefined 
        ? !!cfg.social_yt_enabled 
        : (cfg.social_youtube_enabled !== undefined ? !!cfg.social_youtube_enabled : false);
      const ytLink = cfg.social_yt_link || cfg.social_youtube || '';

      const liEnabled = cfg.social_li_enabled !== undefined 
        ? !!cfg.social_li_enabled 
        : (cfg.social_linkedin_enabled !== undefined ? !!cfg.social_linkedin_enabled : false);
      const liLink = cfg.social_li_link || cfg.social_linkedin || '';

      const twEnabled = cfg.social_tw_enabled !== undefined 
        ? !!cfg.social_tw_enabled 
        : (cfg.social_twitter_enabled !== undefined ? !!cfg.social_twitter_enabled : false);
      const twLink = cfg.social_tw_link || cfg.social_twitter || '';

      const waEnabled = cfg.social_wa_enabled !== undefined 
        ? !!cfg.social_wa_enabled 
        : (cfg.social_whatsapp_enabled !== undefined ? !!cfg.social_whatsapp_enabled : false);
      const waLink = cfg.social_wa_link || cfg.social_whatsapp || '';

      setSocialFbLinkDraft(fbLink);
      setSocialFbEnabledDraft(fbEnabled);
      setSocialIgLinkDraft(igLink);
      setSocialIgEnabledDraft(igEnabled);
      setSocialYtLinkDraft(ytLink);
      setSocialYtEnabledDraft(ytEnabled);
      setSocialLiLinkDraft(liLink);
      setSocialLiEnabledDraft(liEnabled);
      setSocialTwLinkDraft(twLink);
      setSocialTwEnabledDraft(twEnabled);
      setSocialWaLinkDraft(waLink);
      setSocialWaEnabledDraft(waEnabled);
      setSocialFormError(null);
      setSocialFormSuccess(null);

      // CTA Settings initialization
      setCtaAppointmentEnabledDraft(cfg.cta_appointment_enabled !== undefined ? !!cfg.cta_appointment_enabled : true);
      setCtaAppointmentTextDraft(cfg.cta_appointment_text || '');
      setCtaAppointmentDestDraft(cfg.cta_appointment_dest || 'appointment');
      setCtaAppointmentDestValueDraft(cfg.cta_appointment_dest_value || '');

      setCtaCallEnabledDraft(cfg.cta_call_enabled !== undefined ? !!cfg.cta_call_enabled : false);
      setCtaCallTextDraft(cfg.cta_call_text || '');
      setCtaCallDestDraft(cfg.cta_call_dest || 'clinic');
      setCtaCallDestValueDraft(cfg.cta_call_dest_value || '');

      setCtaWhatsappEnabledDraft(cfg.cta_whatsapp_enabled !== undefined ? !!cfg.cta_whatsapp_enabled : true);
      setCtaWhatsappTextDraft(cfg.cta_whatsapp_text || '');
      setCtaWhatsappDestDraft(cfg.cta_whatsapp_dest || 'clinic');
      setCtaWhatsappDestValueDraft(cfg.cta_whatsapp_dest_value || '');

      setCtaCustomEnabledDraft(cfg.cta_custom_enabled !== undefined ? !!cfg.cta_custom_enabled : false);
      setCtaCustomTextDraft(cfg.cta_custom_text || '');
      setCtaCustomDestValueDraft(cfg.cta_custom_dest_value || '');

      setCtaFormError(null);
      setCtaFormSuccess(null);

      // Section Visibility initialization
      setVisHeroDraft(cfg.show_hero !== false);
      setVisIntroDraft(cfg.show_introduction !== false);
      setVisProcessDraft(cfg.show_process !== false);
      setVisBenefitsDraft(cfg.show_benefits !== false);
      setVisGalleryDraft(cfg.show_gallery !== false);
      setVisVideoDraft(cfg.show_procedure_video !== false);
      setVisHospitalDraft(cfg.show_hospital_photos !== false);
      setVisTeamDraft(cfg.show_team_photos !== false);
      setVisTestimonialsDraft(cfg.show_testimonials !== false);
      setVisOfferBannerDraft(cfg.show_offer_banner !== false && cfg.offer_show !== false);
      setVisFaqDraft(cfg.show_faq !== false);
      setVisRelatedServicesDraft(cfg.show_related_services !== false);
      setVisBottomCtaDraft(cfg.show_bottom_cta !== false);

      setVisFormError(null);
      setVisFormSuccess(null);
    }
  }, [editingService?.id]);

  const handleResetSocialDrafts = () => {
    if (!editingService) return;
    const cfg = typeof editingService.marketing_config === 'string'
      ? (() => { try { return JSON.parse(editingService.marketing_config) } catch(e) { return {} } })()
      : (editingService.marketing_config || {});

    const fbEnabled = cfg.social_fb_enabled !== undefined 
      ? !!cfg.social_fb_enabled 
      : (cfg.social_facebook_enabled !== undefined ? !!cfg.social_facebook_enabled : true);
    const fbLink = cfg.social_fb_link || cfg.social_facebook || '';

    const igEnabled = cfg.social_ig_enabled !== undefined 
      ? !!cfg.social_ig_enabled 
      : (cfg.social_instagram_enabled !== undefined ? !!cfg.social_instagram_enabled : true);
    const igLink = cfg.social_ig_link || cfg.social_instagram || '';

    const ytEnabled = cfg.social_yt_enabled !== undefined 
      ? !!cfg.social_yt_enabled 
      : (cfg.social_youtube_enabled !== undefined ? !!cfg.social_youtube_enabled : false);
    const ytLink = cfg.social_yt_link || cfg.social_youtube || '';

    const liEnabled = cfg.social_li_enabled !== undefined 
      ? !!cfg.social_li_enabled 
      : (cfg.social_linkedin_enabled !== undefined ? !!cfg.social_linkedin_enabled : false);
    const liLink = cfg.social_li_link || cfg.social_linkedin || '';

    const twEnabled = cfg.social_tw_enabled !== undefined 
      ? !!cfg.social_tw_enabled 
      : (cfg.social_twitter_enabled !== undefined ? !!cfg.social_twitter_enabled : false);
    const twLink = cfg.social_tw_link || cfg.social_twitter || '';

    const waEnabled = cfg.social_wa_enabled !== undefined 
      ? !!cfg.social_wa_enabled 
      : (cfg.social_whatsapp_enabled !== undefined ? !!cfg.social_whatsapp_enabled : false);
    const waLink = cfg.social_wa_link || cfg.social_whatsapp || '';

    setSocialFbLinkDraft(fbLink);
    setSocialFbEnabledDraft(fbEnabled);
    setSocialIgLinkDraft(igLink);
    setSocialIgEnabledDraft(igEnabled);
    setSocialYtLinkDraft(ytLink);
    setSocialYtEnabledDraft(ytEnabled);
    setSocialLiLinkDraft(liLink);
    setSocialLiEnabledDraft(liEnabled);
    setSocialTwLinkDraft(twLink);
    setSocialTwEnabledDraft(twEnabled);
    setSocialWaLinkDraft(waLink);
    setSocialWaEnabledDraft(waEnabled);
    setSocialFormError(null);
    setSocialFormSuccess(null);
  };

  const handleSaveSocialDrafts = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!editingService) return;
    setSocialFormError(null);
    setSocialFormSuccess(null);

    const cfg = typeof editingService.marketing_config === 'string'
      ? (() => { try { return JSON.parse(editingService.marketing_config) } catch(e) { return {} } })()
      : (editingService.marketing_config || {});

    const currentFbLink = cfg.social_fb_link || cfg.social_facebook || '';
    const currentIgLink = cfg.social_ig_link || cfg.social_instagram || '';
    const currentYtLink = cfg.social_yt_link || cfg.social_youtube || '';
    const currentLiLink = cfg.social_li_link || cfg.social_linkedin || '';
    const currentTwLink = cfg.social_tw_link || cfg.social_twitter || '';
    const currentWaLink = cfg.social_wa_link || cfg.social_whatsapp || '';

    const validationErrors: string[] = [];

    // Helper URL format validator and normalizer
    const normalizeUrl = (val: string) => {
      let temp = val.trim();
      if (!temp) return '';
      if (!/^https?:\/\//i.test(temp)) {
        temp = 'https://' + temp;
      }
      return temp;
    };

    const isValidUrl = (val: string) => {
      try {
        const u = new URL(val);
        return u.hostname.includes('.') && u.hostname.length > 3;
      } catch {
        return false;
      }
    };

    // Facebook
    let fbUrlToSave = socialFbLinkDraft.trim();
    if (fbUrlToSave) {
      fbUrlToSave = normalizeUrl(fbUrlToSave);
    }

    if (socialFbEnabledDraft) {
      if (!fbUrlToSave) {
        fbUrlToSave = currentFbLink;
        if (!fbUrlToSave) {
          validationErrors.push('Facebook URL cannot be empty when enabled.');
        }
      } else if (!isValidUrl(fbUrlToSave)) {
        validationErrors.push('Facebook URL format is invalid.');
      }
    } else {
      if (!fbUrlToSave && currentFbLink) {
        fbUrlToSave = currentFbLink;
      }
    }

    // Instagram
    let igUrlToSave = socialIgLinkDraft.trim();
    if (igUrlToSave) {
      igUrlToSave = normalizeUrl(igUrlToSave);
    }

    if (socialIgEnabledDraft) {
      if (!igUrlToSave) {
        igUrlToSave = currentIgLink;
        if (!igUrlToSave) {
          validationErrors.push('Instagram URL cannot be empty when enabled.');
        }
      } else if (!isValidUrl(igUrlToSave)) {
        validationErrors.push('Instagram URL format is invalid.');
      }
    } else {
      if (!igUrlToSave && currentIgLink) {
        igUrlToSave = currentIgLink;
      }
    }

    // YouTube
    let ytUrlToSave = socialYtLinkDraft.trim();
    if (ytUrlToSave) {
      ytUrlToSave = normalizeUrl(ytUrlToSave);
    }

    if (socialYtEnabledDraft) {
      if (!ytUrlToSave) {
        ytUrlToSave = currentYtLink;
        if (!ytUrlToSave) {
          validationErrors.push('YouTube URL cannot be empty when enabled.');
        }
      } else if (!isValidUrl(ytUrlToSave)) {
        validationErrors.push('YouTube URL format is invalid.');
      }
    } else {
      if (!ytUrlToSave && currentYtLink) {
        ytUrlToSave = currentYtLink;
      }
    }

    // LinkedIn
    let liUrlToSave = socialLiLinkDraft.trim();
    if (liUrlToSave) {
      liUrlToSave = normalizeUrl(liUrlToSave);
    }

    if (socialLiEnabledDraft) {
      if (!liUrlToSave) {
        liUrlToSave = currentLiLink;
        if (!liUrlToSave) {
          validationErrors.push('LinkedIn URL cannot be empty when enabled.');
        }
      } else if (!isValidUrl(liUrlToSave)) {
        validationErrors.push('LinkedIn URL format is invalid.');
      }
    } else {
      if (!liUrlToSave && currentLiLink) {
        liUrlToSave = currentLiLink;
      }
    }

    // Twitter
    let twUrlToSave = socialTwLinkDraft.trim();
    if (twUrlToSave) {
      twUrlToSave = normalizeUrl(twUrlToSave);
    }

    if (socialTwEnabledDraft) {
      if (!twUrlToSave) {
        twUrlToSave = currentTwLink;
        if (!twUrlToSave) {
          validationErrors.push('Twitter URL cannot be empty when enabled.');
        }
      } else if (!isValidUrl(twUrlToSave)) {
        validationErrors.push('Twitter URL format is invalid.');
      }
    } else {
      if (!twUrlToSave && currentTwLink) {
        twUrlToSave = currentTwLink;
      }
    }

    // WhatsApp
    let waUrlToSave = socialWaLinkDraft.trim();
    if (waUrlToSave) {
      waUrlToSave = normalizeUrl(waUrlToSave);
    }

    if (socialWaEnabledDraft) {
      if (!waUrlToSave) {
        waUrlToSave = currentWaLink;
        if (!waUrlToSave) {
          validationErrors.push('WhatsApp URL cannot be empty when enabled.');
        }
      } else {
        const isValidWa = waUrlToSave.startsWith('https://wa.me/') || waUrlToSave.startsWith('https://api.whatsapp.com/');
        if (!isValidWa) {
          validationErrors.push('WhatsApp URL must start with https://wa.me/ or https://api.whatsapp.com/');
        }
      }
    } else {
      if (!waUrlToSave && currentWaLink) {
        waUrlToSave = currentWaLink;
      }
    }

    if (validationErrors.length > 0) {
      setSocialFormError(validationErrors.join(' '));
      return;
    }

    const updatedConfig = {
      ...cfg,
      social_facebook: fbUrlToSave || undefined,
      social_fb_link: fbUrlToSave || undefined,
      social_facebook_enabled: socialFbEnabledDraft,
      social_fb_enabled: socialFbEnabledDraft,

      social_instagram: igUrlToSave || undefined,
      social_ig_link: igUrlToSave || undefined,
      social_instagram_enabled: socialIgEnabledDraft,
      social_ig_enabled: socialIgEnabledDraft,

      social_youtube: ytUrlToSave || undefined,
      social_yt_link: ytUrlToSave || undefined,
      social_youtube_enabled: socialYtEnabledDraft,
      social_yt_enabled: socialYtEnabledDraft,

      social_linkedin: liUrlToSave || undefined,
      social_li_link: liUrlToSave || undefined,
      social_linkedin_enabled: socialLiEnabledDraft,
      social_li_enabled: socialLiEnabledDraft,

      social_twitter: twUrlToSave || undefined,
      social_tw_link: twUrlToSave || undefined,
      social_twitter_enabled: socialTwEnabledDraft,
      social_tw_enabled: socialTwEnabledDraft,

      social_whatsapp: waUrlToSave || undefined,
      social_wa_link: waUrlToSave || undefined,
      social_whatsapp_enabled: socialWaEnabledDraft,
      social_wa_enabled: socialWaEnabledDraft,
    };

    setEditingService({
      ...editingService,
      marketing_config: updatedConfig
    });

    setSocialFormSuccess('Social links details updated locally. Click "Save Service & Configurations" at the bottom of the page to save permanently.');
    setTimeout(() => setSocialFormSuccess(null), 5000);
  };

  const handleResetCtaDrafts = () => {
    if (!editingService) return;
    const cfg = typeof editingService.marketing_config === 'string'
      ? (() => { try { return JSON.parse(editingService.marketing_config) } catch(e) { return {} } })()
      : (editingService.marketing_config || {});

    setCtaAppointmentEnabledDraft(cfg.cta_appointment_enabled !== undefined ? !!cfg.cta_appointment_enabled : true);
    setCtaAppointmentTextDraft(cfg.cta_appointment_text || '');
    setCtaAppointmentDestDraft(cfg.cta_appointment_dest || 'appointment');
    setCtaAppointmentDestValueDraft(cfg.cta_appointment_dest_value || '');

    setCtaCallEnabledDraft(cfg.cta_call_enabled !== undefined ? !!cfg.cta_call_enabled : false);
    setCtaCallTextDraft(cfg.cta_call_text || '');
    setCtaCallDestDraft(cfg.cta_call_dest || 'clinic');
    setCtaCallDestValueDraft(cfg.cta_call_dest_value || '');

    setCtaWhatsappEnabledDraft(cfg.cta_whatsapp_enabled !== undefined ? !!cfg.cta_whatsapp_enabled : true);
    setCtaWhatsappTextDraft(cfg.cta_whatsapp_text || '');
    setCtaWhatsappDestDraft(cfg.cta_whatsapp_dest || 'clinic');
    setCtaWhatsappDestValueDraft(cfg.cta_whatsapp_dest_value || '');

    setCtaCustomEnabledDraft(cfg.cta_custom_enabled !== undefined ? !!cfg.cta_custom_enabled : false);
    setCtaCustomTextDraft(cfg.cta_custom_text || '');
    setCtaCustomDestValueDraft(cfg.cta_custom_dest_value || '');

    setCtaFormError(null);
    setCtaFormSuccess(null);
  };

  const handleSaveCtaDrafts = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!editingService) return;
    setCtaFormError(null);
    setCtaFormSuccess(null);

    const cfg = typeof editingService.marketing_config === 'string'
      ? (() => { try { return JSON.parse(editingService.marketing_config) } catch(e) { return {} } })()
      : (editingService.marketing_config || {});

    const validationErrors: string[] = [];

    // Helper URL format validator
    const isValidUrl = (val: string) => {
      let temp = val.trim();
      if (!temp) return false;
      if (!/^https?:\/\//i.test(temp)) {
        temp = 'https://' + temp;
      }
      try {
        const u = new URL(temp);
        return u.hostname.includes('.') && u.hostname.length > 3;
      } catch {
        return false;
      }
    };

    // 1. Book Appointment Button validation
    let appointmentText = ctaAppointmentTextDraft.trim();
    let appointmentDest = ctaAppointmentDestDraft;
    let appointmentValue = ctaAppointmentDestValueDraft.trim();

    if (ctaAppointmentEnabledDraft) {
      if (!appointmentText) {
        validationErrors.push('Book Appointment button text cannot be empty when enabled.');
      }
      if (appointmentDest !== 'appointment') {
        if (!appointmentValue) {
          validationErrors.push('Destination URL/Route cannot be empty for Book Appointment custom destination.');
        } else if (appointmentDest === 'external' && !isValidUrl(appointmentValue)) {
          validationErrors.push('Book Appointment external destination must be a valid URL (e.g., https://example.com).');
        }
      }
    }

    // 2. Call Now Button validation
    let callText = ctaCallTextDraft.trim();
    let callDest = ctaCallDestDraft;
    let callValue = ctaCallDestValueDraft.trim();

    if (ctaCallEnabledDraft) {
      if (!callText) {
        validationErrors.push('Call Now button text cannot be empty when enabled.');
      }
      if (callDest === 'custom') {
        if (!callValue) {
          validationErrors.push('Custom phone number cannot be empty when custom destination is selected.');
        }
      }
    }

    // 3. WhatsApp Button validation
    let whatsappText = ctaWhatsappTextDraft.trim();
    let whatsappDest = ctaWhatsappDestDraft;
    let whatsappValue = ctaWhatsappDestValueDraft.trim();

    if (ctaWhatsappEnabledDraft) {
      if (!whatsappText) {
        validationErrors.push('WhatsApp button text cannot be empty when enabled.');
      }
      if (whatsappDest === 'custom') {
        if (!whatsappValue) {
          validationErrors.push('Custom WhatsApp destination cannot be empty.');
        } else {
          const isValidWa = whatsappValue.startsWith('https://wa.me/') || whatsappValue.startsWith('https://api.whatsapp.com/');
          if (!isValidWa) {
            validationErrors.push('WhatsApp custom destination must start with https://wa.me/ or https://api.whatsapp.com/');
          }
        }
      }
    }

    // 4. Custom Button validation
    let customText = ctaCustomTextDraft.trim();
    let customValue = ctaCustomDestValueDraft.trim();

    if (ctaCustomEnabledDraft) {
      if (!customText) {
        validationErrors.push('Custom button text cannot be empty when enabled.');
      }
      if (!customValue) {
        validationErrors.push('Custom button destination URL/route cannot be empty when enabled.');
      }
    }

    if (validationErrors.length > 0) {
      setCtaFormError(validationErrors.join(' '));
      return;
    }

    const updatedConfig = {
      ...cfg,
      cta_appointment_enabled: ctaAppointmentEnabledDraft,
      cta_appointment_text: appointmentText || cfg.cta_appointment_text || 'Book Appointment',
      cta_appointment_dest: appointmentDest,
      cta_appointment_dest_value: appointmentValue || cfg.cta_appointment_dest_value,

      cta_call_enabled: ctaCallEnabledDraft,
      cta_call_text: callText || cfg.cta_call_text || 'Call Now',
      cta_call_dest: callDest,
      cta_call_dest_value: callValue || cfg.cta_call_dest_value,

      cta_whatsapp_enabled: ctaWhatsappEnabledDraft,
      cta_whatsapp_text: whatsappText || cfg.cta_whatsapp_text || 'WhatsApp Us',
      cta_whatsapp_dest: whatsappDest,
      cta_whatsapp_dest_value: whatsappValue || cfg.cta_whatsapp_dest_value,

      cta_custom_enabled: ctaCustomEnabledDraft,
      cta_custom_text: customText || cfg.cta_custom_text || 'More Info',
      cta_custom_dest_value: customValue || cfg.cta_custom_dest_value,
    };

    setEditingService({
      ...editingService,
      marketing_config: updatedConfig
    });

    setCtaFormSuccess('CTA configuration updated locally. Click "Save Service & Configurations" at the bottom of the page to save permanently.');
    setTimeout(() => setCtaFormSuccess(null), 5000);
  };

  const handleResetVisibilityDrafts = () => {
    if (!editingService) return;
    const cfg = typeof editingService.marketing_config === 'string'
      ? (() => { try { return JSON.parse(editingService.marketing_config) } catch(e) { return {} } })()
      : (editingService.marketing_config || {});

    setVisHeroDraft(cfg.show_hero !== false);
    setVisIntroDraft(cfg.show_introduction !== false);
    setVisProcessDraft(cfg.show_process !== false);
    setVisBenefitsDraft(cfg.show_benefits !== false);
    setVisGalleryDraft(cfg.show_gallery !== false);
    setVisVideoDraft(cfg.show_procedure_video !== false);
    setVisHospitalDraft(cfg.show_hospital_photos !== false);
    setVisTeamDraft(cfg.show_team_photos !== false);
    setVisTestimonialsDraft(cfg.show_testimonials !== false);
    setVisOfferBannerDraft(cfg.show_offer_banner !== false && cfg.offer_show !== false);
    setVisFaqDraft(cfg.show_faq !== false);
    setVisRelatedServicesDraft(cfg.show_related_services !== false);
    setVisBottomCtaDraft(cfg.show_bottom_cta !== false);

    setVisFormError(null);
    setVisFormSuccess(null);
  };

  const handleSaveVisibilityDrafts = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!editingService) return;
    setVisFormError(null);
    setVisFormSuccess(null);

    const cfg = typeof editingService.marketing_config === 'string'
      ? (() => { try { return JSON.parse(editingService.marketing_config) } catch(e) { return {} } })()
      : (editingService.marketing_config || {});

    const updatedConfig = {
      ...cfg,
      show_hero: visHeroDraft,
      show_introduction: visIntroDraft,
      show_process: visProcessDraft,
      show_benefits: visBenefitsDraft,
      show_gallery: visGalleryDraft,
      show_procedure_video: visVideoDraft,
      show_hospital_photos: visHospitalDraft,
      show_team_photos: visTeamDraft,
      show_testimonials: visTestimonialsDraft,
      show_offer_banner: visOfferBannerDraft,
      offer_show: visOfferBannerDraft,
      show_faq: visFaqDraft,
      show_related_services: visRelatedServicesDraft,
      show_bottom_cta: visBottomCtaDraft,
    };

    setEditingService({
      ...editingService,
      marketing_config: updatedConfig
    });

    setVisFormSuccess('Section visibility configuration updated locally. Click "Save Service & Configurations" at the bottom of the page to save permanently.');
    setTimeout(() => setVisFormSuccess(null), 5000);
  };

  const handleResetContactDrafts = () => {
    if (!editingService) return;
    setContactClinicNameDraft(mConfig.contact_clinic_name || '');
    setContactAddressDraft(mConfig.contact_address || '');
    setContactCallNumberDraft(mConfig.contact_call_number || '');
    setContactWhatsappNumberDraft(mConfig.contact_whatsapp_number || '');
    setContactEmailDraft(mConfig.contact_email || '');
    setContactWorkingHoursDraft(mConfig.contact_working_hours || '');
    setContactMapUrlDraft(mConfig.contact_map_url || '');
    setContactFormError(null);
    setContactFormSuccess(null);
  };

  const handleSaveContactDrafts = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!editingService) return;
    setContactFormError(null);
    setContactFormSuccess(null);

    const clinicNameVal = contactClinicNameDraft.trim();
    const addressVal = contactAddressDraft.trim();
    const callNumberVal = contactCallNumberDraft.trim();
    const whatsappNumberVal = contactWhatsappNumberDraft.trim();
    const emailVal = contactEmailDraft.trim();
    const workingHoursVal = contactWorkingHoursDraft.trim();
    const mapUrlVal = contactMapUrlDraft.trim();

    // VALIDATION
    if (!clinicNameVal) {
      setContactFormError('Clinic Name cannot be empty.');
      return;
    }
    if (!addressVal) {
      setContactFormError('Address cannot be empty.');
      return;
    }
    if (!callNumberVal) {
      setContactFormError('Phone Number cannot be empty.');
      return;
    }

    if (emailVal) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        setContactFormError('Email must be valid.');
        return;
      }
    }

    if (mapUrlVal) {
      try {
        const urlToTest = mapUrlVal.startsWith('http') ? mapUrlVal : 'http://' + mapUrlVal;
        new URL(urlToTest);
      } catch (e) {
        setContactFormError('Google Map Link must be a valid URL if provided.');
        return;
      }
    }

    // Save changes
    const currentConfig = typeof editingService.marketing_config === 'string'
      ? (() => { try { return JSON.parse(editingService.marketing_config) } catch(e) { return {} } })()
      : (editingService.marketing_config || {});

    const updatedConfig = {
      ...currentConfig,
      contact_clinic_name: clinicNameVal,
      contact_address: addressVal,
      contact_call_number: callNumberVal,
      contact_whatsapp_number: whatsappNumberVal || undefined,
      contact_email: emailVal || undefined,
      contact_working_hours: workingHoursVal || undefined,
      contact_map_url: mapUrlVal || undefined,
    };

    setEditingService({
      ...editingService,
      marketing_config: updatedConfig
    });

    setContactFormSuccess('Contact section details updated locally. Click "Save Service & Configurations" at the bottom of the page to save permanently.');
    setTimeout(() => setContactFormSuccess(null), 5000);
  };

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
  const [activeMediaTab, setActiveMediaTab] = useState<'gallery' | 'smiles' | 'videos' | 'social-service' | 'technology' | 'awards' | 'international-patients'>('gallery');
  const [categories, setCategories] = useState<string[]>([
    'Homepage Slider',
    'Homepage Gallery',
    'Dental Implants',
    'Full Mouth Rehabilitation',
    'Invisible Aligners',
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
    { id: 'Db5A-K0MOoU', youtubeUrl: 'https://www.instagram.com/p/Db5A-K0MOoU/', title: 'Full Mouth Dental Implant Treatment Testimonial', thumbnail: 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1786709786418_bibw3gks.webp' },
    { id: 'Db44bY6MpcZ', youtubeUrl: 'https://www.instagram.com/p/Db44bY6MpcZ/', title: 'Same Day Smile Restoration Experience', thumbnail: 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1786711494301_bymdaaht.webp' },
    { id: 'Db3TlVjskbU', youtubeUrl: 'https://www.instagram.com/p/Db3TlVjskbU/', title: 'Aesthetic Veneers Case Study - Patel Dental', thumbnail: 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1786711529687_9qy3kcqq.webp' },
  ]);

  const [previewImage, setPreviewImage] = useState<{ id: string; url: string; title: string; category?: string; branch?: string; altText?: string } | null>(null);
  const [videoDrawerOpen, setVideoDrawerOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<{ id: string; youtubeUrl: string; title: string; thumbnail: string; videoPlatform?: 'instagram' | 'mp4' } | null>(null);
  const [contactSaved, setContactSaved] = useState(false);
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [videoPlatformInput, setVideoPlatformInput] = useState<'instagram' | 'mp4'>('instagram');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [videoUploadError, setVideoUploadError] = useState<string | null>(null);
  const [customVideoTitle, setCustomVideoTitle] = useState('');
  const [videoThumbnailInput, setVideoThumbnailInput] = useState('');
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [thumbnailUploadError, setThumbnailUploadError] = useState<string | null>(null);

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

  // Real-time appointment notification states
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [activeToast, setActiveToast] = useState<any | null>(null);
  const [notificationError, setNotificationError] = useState<string | null>(null);

  // Load all notifications from Supabase
  const fetchNotifications = async () => {
    try {
      const list = await dbNotificationService.getNotifications();
      // Map properties to match UI keys
      const mapped = list.map(item => ({
        id: item.id,
        patientName: item.patient_name,
        mobileNumber: item.mobile_number,
        appointmentDate: item.appointment_date,
        appointmentTime: item.appointment_time,
        doctor: item.doctor,
        isRead: item.is_read,
        timestamp: item.created_at
      }));
      setNotifications(mapped);
      setNotificationError(null);
    } catch (err: any) {
      console.error('[Admin] Error loading notifications from Supabase:', err);
      setNotificationError('Unable to sync notifications with the database. Please ensure the "notifications" table is created.');
    }
  };

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload audio and instantiate once
    const audio = new Audio('/sounds/notification.wav');
    audio.volume = 0.55;
    audio.preload = 'auto';
    audioRef.current = audio;

    // Interaction listener to unlock audio playback using a tiny silent audio stream
    const unlockAudio = () => {
      // 1. Play a tiny base64 silent audio to unlock the browser's AudioContext completely
      const silentAudio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAAA');
      silentAudio.play()
        .then(() => {
          console.log('[Audio] Browser AudioContext successfully unlocked via silent base64 playback.');
          
          // 2. Pre-warm our actual notification sound
          if (audioRef.current) {
            audioRef.current.play()
              .then(() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current.currentTime = 0;
                }
              })
              .catch(() => {});
          }
          cleanupListeners();
        })
        .catch(err => {
          console.warn('[Audio] Silent playback failed to unlock context, trying primary pre-warm directly:', err);
          if (audioRef.current) {
            audioRef.current.play()
              .then(() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current.currentTime = 0;
                }
                cleanupListeners();
              })
              .catch(e => console.warn('[Audio] Pre-warm failed:', e));
          }
        });
    };

    const cleanupListeners = () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('mousedown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    window.addEventListener('mousedown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);

    return () => {
      cleanupListeners();
    };
  }, []);

  // Sound Player Function with multiple format fallbacks
  const playNotificationSound = () => {
    try {
      if (!audioRef.current) {
        const audio = new Audio('/sounds/notification.wav');
        audio.volume = 0.55;
        audio.preload = 'auto';
        audioRef.current = audio;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play()
        .then(() => console.log('[Audio] Wav Chime played successfully.'))
        .catch(e => {
          console.warn('[Audio] Wav playback prevented or failed, trying mp3 fallback:', e);
          const audioFallback = new Audio('/sounds/notification.wav.mp3');
          audioFallback.volume = 0.55;
          audioFallback.play()
            .then(() => console.log('[Audio] Fallback MP3 chime played successfully.'))
            .catch(err => console.warn('[Audio] Both audio formats prevented or failed:', err));
        });
    } catch (err) {
      console.error('Could not play notification sound:', err);
    }
  };

  // Safe incoming notification handler with deduplication
  const handleIncomingAppointmentNotification = (apptData: any) => {
    const id = apptData.id || `notif-${Date.now()}`;
    
    setActiveToast(prevToast => {
      // Deduplicate toast alerts
      const isDuplicate = prevToast && (
        prevToast.id === id ||
        (prevToast.patientName === (apptData.patient_name || apptData.patientName) &&
         prevToast.appointmentDate === (apptData.appointment_date || apptData.appointmentDate) &&
         prevToast.appointmentTime === (apptData.appointment_time || apptData.appointmentTime))
      );

      if (isDuplicate) return prevToast;

      // Play chime
      playNotificationSound();

      // Refresh full list from Supabase
      setTimeout(() => {
        fetchNotifications();
      }, 700);

      return {
        id,
        patientName: apptData.patient_name || apptData.patientName || 'Anonymous',
        mobileNumber: apptData.mobile_number || apptData.mobileNumber || 'N/A',
        appointmentDate: apptData.appointment_date || apptData.appointmentDate || 'N/A',
        appointmentTime: apptData.appointment_time || apptData.appointmentTime || 'N/A',
        doctor: apptData.doctor || 'To Be Assigned',
        isRead: false,
        timestamp: new Date().toISOString()
      };
    });
  };

  // Subscribe to real-time events
  useEffect(() => {
    console.log('[Realtime] Subscribing to public:appointments insert and broadcast events...');
    
    const channel = supabase.client
      .channel('appointments-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'appointments'
        },
        (payload: any) => {
          console.log('[Realtime] postgres_changes INSERT payload:', payload);
          if (payload.new) {
            handleIncomingAppointmentNotification(payload.new);
          }
        }
      )
      .on(
        'broadcast',
        { event: 'new-appointment' },
        (response: any) => {
          console.log('[Realtime] broadcast new-appointment payload:', response);
          if (response.payload) {
            handleIncomingAppointmentNotification(response.payload);
          }
        }
      )
      .subscribe((status: string) => {
        console.log(`[Realtime] Admin channel status: ${status}`);
      });

    return () => {
      console.log('[Realtime] Removing admin listener channel.');
      supabase.client.removeChannel(channel);
    };
  }, []);

  const handleMarkAsRead = async (notifId: string) => {
    // Optimistic update
    setNotifications(prev => prev.map(notif => 
      notif.id === notifId ? { ...notif, isRead: true } : notif
    ));
    await dbNotificationService.markAsRead(notifId);
    fetchNotifications();
  };

  const handleMarkAllAsRead = async () => {
    // Optimistic update
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
    await dbNotificationService.markAllAsRead();
    fetchNotifications();
  };

  const handleClearAllNotifications = async () => {
    // Optimistic update
    setNotifications([]);
    await dbNotificationService.clearAll();
    fetchNotifications();
  };

  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingMobile, setIsDraggingMobile] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isSavingService, setIsSavingService] = useState(false);
  const [serviceValidationErrors, setServiceValidationErrors] = useState<Record<string, string>>({});
  const [reviewFormError, setReviewFormError] = useState<string | null>(null);
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
    { id: 'dental-tourism', label: 'Dental Tourism', icon: Plane },
  ] as const;

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem('mock_admin_session');
      localStorage.removeItem('mock_admin_session');
      window.dispatchEvent(new Event('admin-auth-change'));
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
        const mediaVideos = (videosList || []).map(v => {
          const isMp4 = v.videoPlatform === 'mp4' || v.platform === 'mp4' || v.id.endsWith('.mp4') || v.id.includes('supabase.co');
          const platform = isMp4 ? 'mp4' : 'instagram';
          
          let youtubeUrl = '';
          if (platform === 'mp4') {
            youtubeUrl = v.id;
          } else {
            youtubeUrl = `https://www.instagram.com/p/${v.id}/`;
          }

          let thumbnail = v.thumbnail;
          if (!thumbnail) {
            if (platform === 'mp4') {
              thumbnail = `https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=60`;
            } else {
              thumbnail = `https://www.instagram.com/p/${v.id}/media/?size=l`;
            }
          }

          return {
            id: v.id,
            youtubeUrl: youtubeUrl,
            title: v.title,
            thumbnail: thumbnail,
            videoPlatform: platform
          };
        });

        // Local Media helpers
        const getInstagramId = (url: string): string | null => {
          if (!url) return null;
          const match = url.match(/(?:instagram\.com\/(?:p|reel)\/)([A-Za-z0-9_-]+)/);
          return match ? match[1] : null;
        };

        const getInstagramAutoTitle = (url: string): string => {
          return "Patient Instagram Testimony Reel";
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
          let currentPlatform = videoPlatformInput;
          if (videoUrlInput.includes('instagram.com') || videoUrlInput.includes('instagr.am')) {
            currentPlatform = 'instagram';
          } else if (videoUrlInput.startsWith('http') && (videoUrlInput.endsWith('.mp4') || videoUrlInput.includes('supabase.co'))) {
            currentPlatform = 'mp4';
          } else if (editingVideo && (editingVideo.videoPlatform === 'instagram' || editingVideo.platform === 'instagram')) {
            currentPlatform = 'instagram';
          } else if (editingVideo && (editingVideo.videoPlatform === 'mp4' || editingVideo.platform === 'mp4')) {
            currentPlatform = 'mp4';
          }

          let extractedId = '';
          let generatedTitle = '';
          let thumbnail = '';
          let videoUrl = '';

          if (currentPlatform === 'mp4') {
            extractedId = videoUrlInput;
            if (!extractedId) {
              alert('Please upload an MP4 video or enter a valid video URL.');
              return;
            }
            generatedTitle = customVideoTitle || 'Patient Testimonial';
            thumbnail = `https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=60`;
            videoUrl = videoUrlInput;
          } else {
            const id = getInstagramId(videoUrlInput);
            
            if (!id) {
              alert('Please enter a valid Instagram video URL.');
              return;
            }
            extractedId = id;
            
            generatedTitle = getInstagramAutoTitle(videoUrlInput);

            thumbnail = videoThumbnailInput || `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&auto=format&fit=crop&q=60`;

            videoUrl = `https://www.instagram.com/p/${extractedId}/`;
          }

          let updated: DentalVideo[];
          if (editingVideo) {
            // Edit mode: replace the old video with the new id, title, treatment, and platform
            updated = (videosList || []).map(v => v.id === editingVideo.id ? {
              id: extractedId,
              title: generatedTitle,
              treatment: 'Patient Testimonial',
              category: 'Patient Testimonial',
              videoPlatform: currentPlatform,
              platform: currentPlatform,
              url: videoUrl,
              youtubeUrl: videoUrl,
              thumbnail: videoThumbnailInput || thumbnail,
              createdAt: v.createdAt || new Date().toISOString()
            } : v);
          } else {
            // Add mode: append a new video object to videosList
            updated = [
              ...(videosList || []),
              {
                id: extractedId,
                title: generatedTitle,
                treatment: 'Patient Testimonial',
                category: 'Patient Testimonial',
                videoPlatform: currentPlatform,
                platform: currentPlatform,
                url: videoUrl,
                youtubeUrl: videoUrl,
                thumbnail: videoThumbnailInput || thumbnail,
                createdAt: new Date().toISOString()
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
          setCustomVideoTitle('');
          setVideoThumbnailInput('');
          setIsUploadingThumbnail(false);
          setThumbnailUploadError(null);
          setVideoFile(null);
          setVideoUploadError(null);
          setIsUploadingVideo(false);
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

        const isInstagram = videoPlatformInput === 'instagram';
        const isMp4 = videoPlatformInput === 'mp4';
        
        let videoIdPreview = null;
        if (isInstagram) {
          videoIdPreview = getInstagramId(videoUrlInput);
        } else if (isMp4) {
          videoIdPreview = videoUrlInput || null;
        }

        let previewVideoTitle = '';
        if (isInstagram) {
          previewVideoTitle = videoIdPreview ? getInstagramAutoTitle(videoUrlInput) : 'Enter Instagram URL above';
        } else if (isMp4) {
          previewVideoTitle = customVideoTitle || 'Patient Testimonial';
        }

        let previewVideoThumbnail = '';
        if (isInstagram) {
          previewVideoThumbnail = videoThumbnailInput || (videoIdPreview ? `https://www.instagram.com/p/${videoIdPreview}/media/?size=l` : '');
        } else if (isMp4) {
          previewVideoThumbnail = videoThumbnailInput || `https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=60`;
        }

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
              <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 shrink-0 self-start md:self-auto flex-wrap gap-1">
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
                  <span className="text-sm">😊</span> Smile Gallery
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
                <button
                  type="button"
                  onClick={() => setActiveMediaTab('social-service')}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                    activeMediaTab === 'social-service'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className="text-sm">❤️</span> Social Service
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaTab('technology')}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                    activeMediaTab === 'technology'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className="text-sm">🔬</span> Technology
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaTab('awards')}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                    activeMediaTab === 'awards'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className="text-sm">🏆</span> Awards
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaTab('international-patients')}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                    activeMediaTab === 'international-patients'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className="text-sm">🌍</span> International Patients
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
                      setVideoPlatformInput('instagram');
                      setCustomVideoTitle('');
                      setVideoThumbnailInput('');
                      setIsUploadingThumbnail(false);
                      setThumbnailUploadError(null);
                      setVideoFile(null);
                      setVideoUploadError(null);
                      setIsUploadingVideo(false);
                      setVideoDrawerOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition duration-150 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Patient Video</span>
                  </button>
                </div>

                {/* Video Grid */}
                {mediaVideos.length === 0 ? (
                  <div className="bg-white rounded-2xl p-16 border border-slate-100 text-center text-slate-400 text-sm">
                    No videos registered. Add some patient testimonials to get started!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mediaVideos.map((item) => (
                      <div
                        key={item.id}
                        className="group bg-white rounded-2xl border border-slate-150 shadow-3xs overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col"
                      >
                        {/* Thumbnail Card with custom Play button overlay or MP4 Reel Player */}
                        {item.videoPlatform === 'mp4' || (item as any).platform === 'mp4' || item.id.endsWith('.mp4') || item.id.includes('supabase.co') ? (
                          <div className="w-full max-w-[430px] mx-auto flex justify-center py-2">
                            <Mp4ReelPlayer
                              src={item.youtubeUrl || item.id}
                              containerClassName="aspect-[9/16] h-[440px] sm:h-[460px] rounded-xl overflow-hidden bg-black border border-slate-100/80 shadow-[0_4px_20px_rgba(8,28,58,0.03)]"
                            />
                          </div>
                        ) : (
                          <div className="relative aspect-video w-full overflow-hidden bg-transparent flex items-center justify-center">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                              onError={(e) => {
                                e.currentTarget.src = `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&auto=format&fit=crop&q=60`;
                              }}
                            />
                            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition flex items-center justify-center z-10">
                              <div className="bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-full shadow-lg transform scale-90 group-hover:scale-100 duration-200 transition">
                                <Play className="h-6 w-6 text-white fill-current translate-x-0.5" />
                              </div>
                            </div>
                            
                            <a
                              href={item.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs hover:bg-black/80 text-white p-1.5 rounded-lg text-[10px] font-black tracking-wider uppercase transition flex items-center gap-1.5 z-20"
                            >
                              <span>Open on Instagram</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        )}

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
                                setVideoPlatformInput(item.videoPlatform || 'instagram');
                                setCustomVideoTitle(item.title || '');
                                setVideoThumbnailInput(item.thumbnail || '');
                                setIsUploadingThumbnail(false);
                                setThumbnailUploadError(null);
                                setVideoFile(null);
                                setVideoUploadError(null);
                                setIsUploadingVideo(false);
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

            {activeMediaTab === 'social-service' && (
              <div className="space-y-6" id="social-service-tab-content">
                {/* Actions row */}
                <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-slate-100 shadow-3xs">
                  <div className="text-xs text-slate-500 font-medium">
                    Showing <span className="font-bold text-slate-800">{(draftSocialServices || []).length}</span> social service photos
                  </div>
                  
                  <div>
                    <label
                      htmlFor="social-service-upload-file-trigger"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition duration-150 cursor-pointer select-none"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Upload Social Service Image</span>
                    </label>
                    <input
                      type="file"
                      id="social-service-upload-file-trigger"
                      className="hidden"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          console.log('[SocialService] Upload Started:', file.name);
                          setSaveMessage('Uploading social service image to Supabase...');
                          try {
                            const imageUrl = await uploadImage(file);
                            console.log('[SocialService] Upload Success:', imageUrl);
                            const updated = [
                              {
                                id: generateUUID(),
                                image_url: imageUrl,
                                title: '',
                                display_order: draftSocialServices.length,
                                is_active: true
                              },
                              ...(draftSocialServices || [])
                            ];
                            setDraftSocialServices(updated);
                            setSaveMessage('Saving social service image to Supabase...');
                            const success = await socialServiceService.saveSocialServices(updated);
                            if (success) {
                              setSaveMessage('Social service image uploaded and saved to Supabase successfully!');
                            } else {
                              setSaveMessage('Failed to save social service image to database.');
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
                                  id: generateUUID(),
                                  image_url: dataUrl,
                                  title: '',
                                  display_order: draftSocialServices.length,
                                  is_active: true
                                },
                                ...(draftSocialServices || [])
                              ];
                              setDraftSocialServices(updated);
                              await socialServiceService.saveSocialServices(updated);
                              setSaveMessage('Social service image loaded locally and saved.');
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
                {(!draftSocialServices || draftSocialServices.length === 0) ? (
                  <div className="bg-white rounded-2xl p-16 border border-slate-100 text-center text-slate-400 text-sm">
                    No social service photos uploaded yet. Add some community moments!
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {draftSocialServices.map((item) => (
                      <div 
                        key={item.id}
                        id={`admin-social-service-card-${item.id}`}
                        className="bg-white border border-slate-150 rounded-2xl p-4 flex flex-col justify-between gap-3 group relative hover:border-teal-100 transition-all duration-200 shadow-3xs"
                      >
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
                          <img 
                            src={item.image_url} 
                            alt="Social Service Moment" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Replace & Delete Actions */}
                        <div className="flex items-center justify-between gap-2 mt-auto">
                          <label
                            htmlFor={`social-service-replace-trigger-${item.id}`}
                            className="font-bold text-xs text-teal-600 hover:text-teal-700 bg-teal-50 px-3 py-2 rounded-xl flex items-center justify-center gap-1 hover:bg-teal-100 transition select-none flex-1 text-center cursor-pointer"
                          >
                            <Upload className="h-3 w-3 shrink-0" />
                            <span>Replace</span>
                          </label>
                          <input
                            type="file"
                            id={`social-service-replace-trigger-${item.id}`}
                            className="hidden"
                            accept="image/*"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                console.log('[SocialService] Upload Started:', file.name);
                                setSaveMessage('Replacing social service photo on Supabase...');
                                try {
                                  const imageUrl = await uploadImage(file);
                                  console.log('[SocialService] Upload Success:', imageUrl);
                                  const updated = (draftSocialServices || []).map(moment => moment.id === item.id ? { ...moment, image_url: imageUrl } : moment);
                                  setDraftSocialServices(updated);
                                  setSaveMessage('Saving updated social service photo to Supabase...');
                                  const success = await socialServiceService.saveSocialServices(updated);
                                  if (success) {
                                    setSaveMessage('Social service photo replaced and saved successfully!');
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
                                    const updated = (draftSocialServices || []).map(moment => moment.id === item.id ? { ...moment, image_url: dataUrl } : moment);
                                    setDraftSocialServices(updated);
                                    await socialServiceService.saveSocialServices(updated);
                                    setSaveMessage('Social service photo replaced locally.');
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
                              setSocialServiceToDelete(item.id);
                            }}
                            className="text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 p-2 rounded-xl border border-rose-100 hover:border-rose-200 transition cursor-pointer shrink-0"
                            aria-label="Delete Social Service Photo"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Custom Social Service Image Delete Confirmation Dialog Modal */}
                {socialServiceToDelete && (
                  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
                    {/* Backdrop click to close */}
                    <div className="absolute inset-0" onClick={() => setSocialServiceToDelete(null)} />
                    
                    {/* Card container */}
                    <div className="relative bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-sm w-full p-6 text-slate-800 z-10 animate-fade-in">
                      <h3 className="text-base font-extrabold text-[#081C3A] mb-2">Delete Image</h3>
                      <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                        Are you sure you want to delete this image?
                      </p>
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          type="button"
                          onClick={() => setSocialServiceToDelete(null)}
                          className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            const updated = (draftSocialServices || []).filter(moment => moment.id !== socialServiceToDelete);
                            setDraftSocialServices(updated);
                            setSocialServiceToDelete(null);
                            setSaveMessage('Deleting social service photo and syncing with Supabase...');
                            try {
                              const success = await socialServiceService.saveSocialServices(updated);
                              if (success) {
                                setSaveMessage('Social service photo deleted successfully!');
                              } else {
                                setSaveMessage('Failed to delete social service photo on Supabase database.');
                              }
                            } catch (err: any) {
                              console.error('Error deleting social service photo:', err);
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

            {activeMediaTab === 'technology' && (
              <div className="space-y-6" id="technology-tab-content">
                {/* Actions row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white px-6 py-4 rounded-xl border border-slate-100 shadow-3xs">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#081C3A]">Our Technology CMS</h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Managing <span className="font-bold text-slate-800">{(draftTechnology || []).length}</span> technology showcase items
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    {/* Add Technology Item Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTechnology({
                          id: generateUUID(),
                          title: '',
                          short_description: '',
                          description: '',
                          image_url: '',
                          display_order: (draftTechnology || []).length,
                          is_active: true
                        });
                      }}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition duration-150 cursor-pointer select-none"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Technology Item</span>
                    </button>

                    {/* Direct Quick Upload Button */}
                    <label
                      htmlFor="technology-upload-file-trigger"
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold shadow-2xs transition duration-150 cursor-pointer select-none"
                    >
                      <Upload className="h-4 w-4 text-slate-500" />
                      <span>Upload Image</span>
                    </label>
                    <input
                      type="file"
                      id="technology-upload-file-trigger"
                      className="hidden"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          console.log('[Technology] Upload Started:', file.name);
                          setSaveMessage('Uploading technology image to Supabase...');
                          try {
                            const imageUrl = await uploadImage(file);
                            console.log('[Technology] Upload Success:', imageUrl);
                            const newItem: TechnologyItem = {
                              id: generateUUID(),
                              image_url: imageUrl,
                              title: '',
                              short_description: '',
                              description: '',
                              display_order: (draftTechnology || []).length,
                              is_active: true
                            };
                            const updated = [...(draftTechnology || []), newItem];
                            setDraftTechnology(updated);
                            setEditingTechnology(newItem);
                            setSaveMessage('Image uploaded! Enter title & description.');
                            await technologyService.saveTechnologyList(updated);
                          } catch (err: any) {
                            console.warn('Upload failed, falling back to local Base64:', err);
                            try {
                              const dataUrl = await new Promise<string>((resolve, reject) => {
                                const reader = new FileReader();
                                reader.onload = () => resolve(reader.result as string);
                                reader.onerror = reject;
                                reader.readAsDataURL(file);
                              });
                              const newItem: TechnologyItem = {
                                id: generateUUID(),
                                image_url: dataUrl,
                                title: '',
                                short_description: '',
                                description: '',
                                display_order: (draftTechnology || []).length,
                                is_active: true
                              };
                              const updated = [...(draftTechnology || []), newItem];
                              setDraftTechnology(updated);
                              setEditingTechnology(newItem);
                              await technologyService.saveTechnologyList(updated);
                              setSaveMessage('Image loaded locally! Enter title & description.');
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
                {(!draftTechnology || draftTechnology.length === 0) ? (
                  <div className="bg-white rounded-2xl p-16 border border-slate-100 text-center text-slate-400 text-sm">
                    No technology items available. Click <strong className="text-indigo-600">Add Technology Item</strong> to create one!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {draftTechnology.map((item, idx) => {
                      const shortText = item.short_description || item.shortDesc || item.description || '';
                      
                      return (
                        <div 
                          key={item.id || idx}
                          id={`admin-technology-card-${item.id}`}
                          className="bg-white border border-slate-150 rounded-2xl p-4 flex flex-col justify-between gap-4 group relative hover:border-indigo-200 transition-all duration-200 shadow-3xs"
                        >
                          <div className="space-y-3">
                            {/* Image Frame with object-contain */}
                            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-3">
                              {item.image_url ? (
                                <img 
                                  src={item.image_url} 
                                  alt={item.title || 'Technology Equipment'} 
                                  className="max-w-full max-h-full object-contain mx-auto block"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="text-slate-300 text-xs text-center font-medium">No Image Provided</div>
                              )}

                              {item.is_active === false && (
                                <span className="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  Hidden
                                </span>
                              )}
                            </div>

                            {/* Info */}
                            <div className="space-y-1">
                              <h4 className="font-bold text-slate-800 text-sm sm:text-base line-clamp-1">
                                {item.title || <span className="text-slate-400 italic">Untitled Equipment</span>}
                              </h4>
                              {shortText ? (
                                <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                                  {shortText}
                                </p>
                              ) : (
                                <p className="text-slate-300 text-xs italic">No description added yet</p>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                            {/* Edit Text & Details */}
                            <button
                              type="button"
                              onClick={() => setEditingTechnology(item)}
                              className="px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer flex-1"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              <span>Edit</span>
                            </button>

                            {/* Replace Image */}
                            <label
                              htmlFor={`technology-replace-trigger-${item.id}`}
                              className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                              title="Replace Image"
                            >
                              <Upload className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Replace</span>
                            </label>
                            <input
                              type="file"
                              id={`technology-replace-trigger-${item.id}`}
                              className="hidden"
                              accept="image/*"
                              onChange={async (e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const file = e.target.files[0];
                                  console.log('[Technology] Upload Started:', file.name);
                                  setSaveMessage('Replacing technology photo on Supabase...');
                                  try {
                                    const imageUrl = await uploadImage(file);
                                    const updated = (draftTechnology || []).map(moment => moment.id === item.id ? { ...moment, image_url: imageUrl } : moment);
                                    setDraftTechnology(updated);
                                    setSaveMessage('Saving updated technology photo to Supabase...');
                                    const success = await technologyService.saveTechnologyList(updated);
                                    if (success) {
                                      setSaveMessage('Technology photo replaced and saved successfully!');
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
                                      const updated = (draftTechnology || []).map(moment => moment.id === item.id ? { ...moment, image_url: dataUrl } : moment);
                                      setDraftTechnology(updated);
                                      await technologyService.saveTechnologyList(updated);
                                      setSaveMessage('Technology photo replaced locally.');
                                    } catch (fallbackErr) {
                                      console.error(fallbackErr);
                                    }
                                  } finally {
                                    setTimeout(() => setSaveMessage(null), 3500);
                                  }
                                }
                              }}
                            />

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => setTechnologyToDelete(item.id)}
                              className="text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 p-2 rounded-xl transition cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* EDIT / ADD TECHNOLOGY ITEM MODAL */}
                {editingTechnology && (
                  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                    <div className="absolute inset-0" onClick={() => setEditingTechnology(null)} />
                    
                    <div className="relative bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-xl w-full p-6 text-slate-800 z-10 animate-fade-in max-h-[90vh] overflow-y-auto">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                        <h3 className="text-lg font-black text-[#081C3A]">
                          {draftTechnology.some(t => t.id === editingTechnology.id) ? 'Edit Technology Item' : 'Add New Technology'}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setEditingTechnology(null)}
                          className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
                        >
                          <CloseIcon className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        {/* Image Preview & Upload */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Technology Image
                          </label>
                          <div className="flex items-center gap-4">
                            <div className="w-28 h-24 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden p-2 shrink-0">
                              {editingTechnology.image_url ? (
                                <img
                                  src={editingTechnology.image_url}
                                  alt="Preview"
                                  className="max-w-full max-h-full object-contain"
                                />
                              ) : (
                                <span className="text-[10px] text-slate-400 font-bold text-center">No Image</span>
                              )}
                            </div>
                            <div className="flex-1 space-y-2">
                              <label
                                htmlFor="modal-technology-upload-input"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold cursor-pointer transition"
                              >
                                <Upload className="h-4 w-4" />
                                <span>{editingTechnology.image_url ? 'Replace Image' : 'Upload Image'}</span>
                              </label>
                              <input
                                type="file"
                                id="modal-technology-upload-input"
                                className="hidden"
                                accept="image/*"
                                onChange={async (e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];
                                    setSaveMessage('Uploading image...');
                                    try {
                                      const imageUrl = await uploadImage(file);
                                      setEditingTechnology(prev => prev ? { ...prev, image_url: imageUrl } : null);
                                      setSaveMessage('Image uploaded successfully!');
                                    } catch (err) {
                                      const reader = new FileReader();
                                      reader.onload = () => {
                                        setEditingTechnology(prev => prev ? { ...prev, image_url: reader.result as string } : null);
                                      };
                                      reader.readAsDataURL(file);
                                    } finally {
                                      setTimeout(() => setSaveMessage(null), 2500);
                                    }
                                  }
                                }}
                              />
                              <p className="text-[11px] text-slate-400">
                                Recommended: Clear, high-resolution equipment photo. Aspect ratio preserved (`object-contain`).
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Title Input */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Technology Name / Title <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 3D CBCT Scanner or Dental Microscope"
                            value={editingTechnology.title || ''}
                            onChange={(e) => setEditingTechnology({ ...editingTechnology, title: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-800 font-medium"
                          />
                        </div>

                        {/* Short Description */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Short Description <span className="text-rose-500">*</span>
                          </label>
                          <textarea
                            rows={3}
                            placeholder="e.g. For precised single-sitting Root Canal Treatment and micro-restorative dentistry."
                            value={editingTechnology.short_description || editingTechnology.shortDesc || editingTechnology.description || ''}
                            onChange={(e) => setEditingTechnology({ 
                              ...editingTechnology, 
                              short_description: e.target.value,
                              shortDesc: e.target.value,
                              description: e.target.value
                            })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-800 font-medium"
                          />
                        </div>

                        {/* Active Checkbox */}
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="checkbox"
                            id="technology-active-toggle"
                            checked={editingTechnology.is_active !== false}
                            onChange={(e) => setEditingTechnology({ ...editingTechnology, is_active: e.target.checked })}
                            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label htmlFor="technology-active-toggle" className="text-xs font-bold text-slate-700 cursor-pointer">
                            Active (Show on public Technology page)
                          </label>
                        </div>
                      </div>

                      {/* Modal Footer Buttons */}
                      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
                        <button
                          type="button"
                          onClick={() => setEditingTechnology(null)}
                          className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            if (!editingTechnology.image_url && !editingTechnology.title) {
                              alert('Please provide at least a title or image.');
                              return;
                            }
                            
                            const exists = (draftTechnology || []).some(t => t.id === editingTechnology.id);
                            let updated: TechnologyItem[];
                            
                            if (exists) {
                              updated = draftTechnology.map(t => t.id === editingTechnology.id ? editingTechnology : t);
                            } else {
                              updated = [...(draftTechnology || []), editingTechnology];
                            }

                            setDraftTechnology(updated);
                            setEditingTechnology(null);
                            setSaveMessage('Saving technology item to database...');
                            try {
                              const success = await technologyService.saveTechnologyList(updated);
                              if (success) {
                                setSaveMessage('Technology item saved successfully!');
                              } else {
                                setSaveMessage('Saved locally, DB sync error: ' + (technologyService.lastError || ''));
                              }
                            } catch (err: any) {
                              console.error('Error saving technology item:', err);
                              setSaveMessage('Error saving item.');
                            } finally {
                              setTimeout(() => setSaveMessage(null), 3500);
                            }
                          }}
                          className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition cursor-pointer shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
                        >
                          <Save className="h-4 w-4" />
                          <span>Save Technology Item</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Custom Technology Item Delete Confirmation Dialog Modal */}
                {technologyToDelete && (
                  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
                    <div className="absolute inset-0" onClick={() => setTechnologyToDelete(null)} />
                    
                    <div className="relative bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-sm w-full p-6 text-slate-800 z-10 animate-fade-in">
                      <h3 className="text-base font-extrabold text-[#081C3A] mb-2">Delete Technology Item</h3>
                      <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                        Are you sure you want to delete this technology item? It will be removed from the public website.
                      </p>
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          type="button"
                          onClick={() => setTechnologyToDelete(null)}
                          className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            const updated = (draftTechnology || []).filter(item => item.id !== technologyToDelete);
                            setDraftTechnology(updated);
                            setTechnologyToDelete(null);
                            setSaveMessage('Deleting technology item from database...');
                            try {
                              const success = await technologyService.saveTechnologyList(updated);
                              if (success) {
                                setSaveMessage('Technology item deleted successfully!');
                              } else {
                                setSaveMessage('Failed to delete technology item on database.');
                              }
                            } catch (err: any) {
                              console.error('Error deleting technology item:', err);
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

            {/* Awards Tab Content */}
            {activeMediaTab === 'awards' && (
              <div className="space-y-6" id="awards-tab-content">
                {/* Actions row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white px-6 py-4 rounded-xl border border-slate-100 shadow-3xs">
                  <div className="text-xs text-slate-500 font-medium">
                    Showing <span className="font-bold text-slate-800">
                      {(draftAwards || []).filter(item => {
                        const orientation = getItemOrientation(item);
                        if (awardsOrientationTab === 'horizontal') {
                          return orientation === 'horizontal';
                        } else {
                          return orientation === 'vertical';
                        }
                      }).length}
                    </span> {awardsOrientationTab === 'horizontal' ? 'horizontal (landscape)' : 'vertical (portrait)'} awards
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Vertical (Portrait) Upload Option */}
                    <div>
                      <label
                        htmlFor="awards-upload-file-trigger-vertical"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition duration-150 cursor-pointer select-none"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Upload Vertical Image</span>
                      </label>
                      <input
                        type="file"
                        id="awards-upload-file-trigger-vertical"
                        className="hidden"
                        accept="image/*"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            console.log('[Awards] Vertical Upload Started:', file.name);
                            setSaveMessage('Detecting orientation and uploading...');
                            try {
                              const orientation = await detectImageOrientation(file);
                              console.log('[Awards] Auto-classified orientation:', orientation);

                              let feedbackMsg = `Award uploaded successfully!`;
                              if (orientation !== 'vertical') {
                                feedbackMsg = `Image was detected as landscape. Saved as Horizontal Award.`;
                              } else {
                                feedbackMsg = `Award uploaded & classified as VERTICAL!`;
                              }

                              const imageUrl = await uploadImage(file);
                              const updated = [
                                {
                                  id: generateUUID(),
                                  image_url: imageUrl,
                                  display_order: draftAwards.length,
                                  orientation: orientation,
                                  is_active: true
                                },
                                ...(draftAwards || [])
                              ];
                              setDraftAwards(updated);
                              const success = await awardsService.saveAwardsList(updated);
                              if (success) {
                                setSaveMessage(feedbackMsg);
                                setAwardsOrientationTab(orientation);
                              } else {
                                setSaveMessage('Failed to save award image to database.');
                              }
                            } catch (err: any) {
                              console.warn('Upload failed, falling back to local Base64:', err);
                              try {
                                const orientation = await detectImageOrientation(file);
                                const dataUrl = await new Promise<string>((resolve, reject) => {
                                  const reader = new FileReader();
                                  reader.onload = () => resolve(reader.result as string);
                                  reader.onerror = reject;
                                  reader.readAsDataURL(file);
                                });
                                let feedbackMsg = `Award loaded locally!`;
                                if (orientation !== 'vertical') {
                                  feedbackMsg = `Image detected as landscape. Loaded as Horizontal Award.`;
                                }
                                const updated = [
                                  {
                                    id: generateUUID(),
                                    image_url: dataUrl,
                                    display_order: draftAwards.length,
                                    orientation: orientation,
                                    is_active: true
                                  },
                                  ...(draftAwards || [])
                                ];
                                setDraftAwards(updated);
                                await awardsService.saveAwardsList(updated);
                                setSaveMessage(feedbackMsg);
                                setAwardsOrientationTab(orientation);
                              } catch (fallbackErr) {
                                console.error(fallbackErr);
                              }
                            } finally {
                              setTimeout(() => setSaveMessage(null), 4000);
                            }
                          }
                        }}
                      />
                    </div>

                    {/* Horizontal (Landscape) Upload Option */}
                    <div>
                      <label
                        htmlFor="awards-upload-file-trigger-horizontal"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition duration-150 cursor-pointer select-none"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Upload Horizontal Image</span>
                      </label>
                      <input
                        type="file"
                        id="awards-upload-file-trigger-horizontal"
                        className="hidden"
                        accept="image/*"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            console.log('[Awards] Horizontal Upload Started:', file.name);
                            setSaveMessage('Detecting orientation and uploading...');
                            try {
                              const orientation = await detectImageOrientation(file);
                              console.log('[Awards] Auto-classified orientation:', orientation);

                              let feedbackMsg = `Award uploaded successfully!`;
                              if (orientation !== 'horizontal') {
                                feedbackMsg = `Image was detected as portrait. Saved as Vertical Award.`;
                              } else {
                                feedbackMsg = `Award uploaded & classified as HORIZONTAL!`;
                              }

                              const imageUrl = await uploadImage(file);
                              const updated = [
                                {
                                  id: generateUUID(),
                                  image_url: imageUrl,
                                  display_order: draftAwards.length,
                                  orientation: orientation,
                                  is_active: true
                                },
                                ...(draftAwards || [])
                              ];
                              setDraftAwards(updated);
                              const success = await awardsService.saveAwardsList(updated);
                              if (success) {
                                setSaveMessage(feedbackMsg);
                                setAwardsOrientationTab(orientation);
                              } else {
                                setSaveMessage('Failed to save award image to database.');
                              }
                            } catch (err: any) {
                              console.warn('Upload failed, falling back to local Base64:', err);
                              try {
                                const orientation = await detectImageOrientation(file);
                                const dataUrl = await new Promise<string>((resolve, reject) => {
                                  const reader = new FileReader();
                                  reader.onload = () => resolve(reader.result as string);
                                  reader.onerror = reject;
                                  reader.readAsDataURL(file);
                                });
                                let feedbackMsg = `Award loaded locally!`;
                                if (orientation !== 'horizontal') {
                                  feedbackMsg = `Image detected as portrait. Loaded as Vertical Award.`;
                                }
                                const updated = [
                                  {
                                    id: generateUUID(),
                                    image_url: dataUrl,
                                    display_order: draftAwards.length,
                                    orientation: orientation,
                                    is_active: true
                                  },
                                  ...(draftAwards || [])
                                ];
                                setDraftAwards(updated);
                                await awardsService.saveAwardsList(updated);
                                setSaveMessage(feedbackMsg);
                                setAwardsOrientationTab(orientation);
                              } catch (fallbackErr) {
                                console.error(fallbackErr);
                              }
                            } finally {
                              setTimeout(() => setSaveMessage(null), 4000);
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Sub-tabs Row */}
                <div className="flex border-b border-slate-100 bg-white px-6 py-2 rounded-xl border shadow-3xs gap-6">
                  <button
                    type="button"
                    onClick={() => setAwardsOrientationTab('horizontal')}
                    className={`pb-3 pt-2 text-xs font-bold border-b-2 transition-all relative ${
                      awardsOrientationTab === 'horizontal'
                        ? 'border-amber-600 text-amber-600'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Horizontal Images ({(draftAwards || []).filter(a => getItemOrientation(a) === 'horizontal').length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setAwardsOrientationTab('vertical')}
                    className={`pb-3 pt-2 text-xs font-bold border-b-2 transition-all relative ${
                      awardsOrientationTab === 'vertical'
                        ? 'border-amber-600 text-amber-600'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Vertical Images ({(draftAwards || []).filter(a => getItemOrientation(a) === 'vertical').length})
                  </button>
                </div>

                {/* Grid */}
                {(!draftAwards || draftAwards.filter(item => {
                  const orientation = getItemOrientation(item);
                  if (awardsOrientationTab === 'horizontal') {
                    return orientation === 'horizontal';
                  } else {
                    return orientation === 'vertical';
                  }
                }).length === 0) ? (
                  <div className="bg-white rounded-2xl p-16 border border-slate-100 text-center text-slate-400 text-sm">
                    No {awardsOrientationTab === 'horizontal' ? 'horizontal' : 'vertical'} award photos uploaded yet.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {draftAwards
                      .filter(item => {
                        const orientation = getItemOrientation(item);
                        if (awardsOrientationTab === 'horizontal') {
                          return orientation === 'horizontal';
                        } else {
                          return orientation === 'vertical';
                        }
                      })
                      .map((item) => (
                        <div 
                          key={item.id}
                          id={`admin-award-card-${item.id}`}
                          className="bg-white border border-slate-150 rounded-2xl p-4 flex flex-col justify-between gap-3 group relative hover:border-amber-100 transition-all duration-200 shadow-3xs"
                        >
                          {/* Order & Preview Controls */}
                          <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleMoveAward(item.id, 'up')}
                                className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                                title="Move Left / Backwards"
                              >
                                <ChevronUp className="h-3.5 w-3.5 -rotate-90" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveAward(item.id, 'down')}
                                className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                                title="Move Right / Forwards"
                              >
                                <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
                              </button>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => setPreviewAwardUrl(item.image_url)}
                              className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition flex items-center gap-1 text-[11px] font-bold"
                              title="Preview Full Image"
                            >
                              <Eye className="h-3.5 w-3.5 text-slate-400 group-hover:text-amber-600" />
                              <span>Preview</span>
                            </button>
                          </div>

                          <div className={`relative w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0 ${
                            awardsOrientationTab === 'horizontal' ? 'aspect-[16/10]' : 'aspect-[3/4]'
                          }`}>
                            <img 
                              src={item.image_url} 
                              alt="Award Recognition" 
                              className="w-full h-full object-contain bg-slate-50/50 cursor-zoom-in"
                              onClick={() => setPreviewAwardUrl(item.image_url)}
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Replace & Delete Actions */}
                          <div className="flex items-center justify-between gap-2 mt-auto">
                            <label
                              htmlFor={`awards-replace-trigger-${item.id}`}
                              className="font-bold text-xs text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-2 rounded-xl flex items-center justify-center gap-1 hover:bg-amber-100 transition select-none flex-1 text-center cursor-pointer"
                            >
                              <Upload className="h-3 w-3 shrink-0" />
                              <span>Replace</span>
                            </label>
                            <input
                              type="file"
                              id={`awards-replace-trigger-${item.id}`}
                              className="hidden"
                              accept="image/*"
                              onChange={async (e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const file = e.target.files[0];
                                  console.log('[Awards] Upload Started:', file.name);
                                  setSaveMessage('Detecting orientation and replacing on Supabase...');
                                  try {
                                    const orientation = await detectImageOrientation(file);
                                    console.log('[Awards] Auto-classified replacement orientation:', orientation);

                                    const imageUrl = await uploadImage(file);
                                    console.log('[Awards] Upload Success:', imageUrl);
                                    const updated = (draftAwards || []).map(award => award.id === item.id ? { ...award, image_url: imageUrl, orientation: orientation } : award);
                                    setDraftAwards(updated);
                                    setSaveMessage('Saving updated award photo to Supabase...');
                                    const success = await awardsService.saveAwardsList(updated);
                                    if (success) {
                                      setSaveMessage(`Award photo replaced and classified as ${orientation.toUpperCase()}!`);
                                      setAwardsOrientationTab(orientation);
                                    } else {
                                      setSaveMessage('Failed to save replacement to database.');
                                    }
                                  } catch (err: any) {
                                    console.warn('Upload failed, falling back to local Base64:', err);
                                    try {
                                      const orientation = await detectImageOrientation(file);
                                      const dataUrl = await new Promise<string>((resolve, reject) => {
                                        const reader = new FileReader();
                                        reader.onload = () => resolve(reader.result as string);
                                        reader.onerror = reject;
                                        reader.readAsDataURL(file);
                                      });
                                      const updated = (draftAwards || []).map(award => award.id === item.id ? { ...award, image_url: dataUrl, orientation: orientation } : award);
                                      setDraftAwards(updated);
                                      await awardsService.saveAwardsList(updated);
                                      setSaveMessage(`Award photo replaced locally and classified as ${orientation.toUpperCase()}.`);
                                      setAwardsOrientationTab(orientation);
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
                                setAwardToDelete(item.id);
                              }}
                              className="text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 p-2 rounded-xl border border-rose-100 hover:border-rose-200 transition cursor-pointer shrink-0"
                              aria-label="Delete Award Photo"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {/* Custom Award Image Delete Confirmation Dialog Modal */}
                {awardToDelete && (
                  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
                    {/* Backdrop click to close */}
                    <div className="absolute inset-0" onClick={() => setAwardToDelete(null)} />
                    
                    {/* Card container */}
                    <div className="relative bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-sm w-full p-6 text-slate-800 z-10 animate-fade-in">
                      <h3 className="text-base font-extrabold text-[#081C3A] mb-2">Delete Image</h3>
                      <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                        Are you sure you want to delete this image?
                      </p>
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          type="button"
                          onClick={() => setAwardToDelete(null)}
                          className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            const updated = (draftAwards || []).filter(award => award.id !== awardToDelete);
                            setDraftAwards(updated);
                            setAwardToDelete(null);
                            setSaveMessage('Deleting award photo and syncing with Supabase...');
                            try {
                              const success = await awardsService.saveAwardsList(updated);
                              if (success) {
                                setSaveMessage('Award photo deleted successfully!');
                              } else {
                                setSaveMessage('Failed to delete award photo on Supabase database.');
                              }
                            } catch (err: any) {
                              console.error('Error deleting award photo:', err);
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

                {/* Custom Award Image Preview Modal */}
                {previewAwardUrl && (
                  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
                    {/* Backdrop click to close */}
                    <div className="absolute inset-0 cursor-zoom-out" onClick={() => setPreviewAwardUrl(null)} />
                    
                    {/* Image container */}
                    <div className="relative bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-3xl w-full p-6 text-slate-800 z-10 animate-fade-in flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => setPreviewAwardUrl(null)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition"
                        aria-label="Close Preview"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <h3 className="text-sm font-extrabold text-[#081C3A] mb-4 self-start">Award Image Preview</h3>
                      <div className="w-full max-h-[70vh] overflow-hidden flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100">
                        <img
                          src={previewAwardUrl}
                          alt="Award Full View"
                          className="max-h-[65vh] max-w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* International Patients Gallery Tab Content */}
            {activeMediaTab === 'international-patients' && (
              <div className="space-y-6" id="international-patients-tab-content">
                {/* Actions row */}
                <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-slate-100 shadow-3xs animate-fade-in">
                  <div className="text-xs text-slate-500 font-medium">
                    Showing <span className="font-bold text-slate-800">{(draftInternationalPatients || []).length}</span> international patient photos
                  </div>
                  
                  <div>
                    <label
                      htmlFor="international-patient-upload-file-trigger"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition duration-150 cursor-pointer select-none"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Upload International Patient Image</span>
                    </label>
                    <input
                      type="file"
                      id="international-patient-upload-file-trigger"
                      className="hidden"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          console.log('[InternationalPatient] Upload Started:', file.name);
                          setSaveMessage('Uploading international patient image to Supabase...');
                          try {
                            const imageUrl = await uploadImage(file);
                            console.log('[InternationalPatient] Upload Success:', imageUrl);
                            const updated = [
                              {
                                id: generateUUID(),
                                image_url: imageUrl,
                                display_order: draftInternationalPatients.length,
                                is_active: true
                              },
                              ...(draftInternationalPatients || [])
                            ];
                            setDraftInternationalPatients(updated);
                            setSaveMessage('Saving international patient image to Supabase...');
                            const success = await internationalPatientsService.saveInternationalPatientsList(updated);
                            if (success) {
                              setSaveMessage('International patient image uploaded and saved successfully!');
                              await loadInternationalPatientsList();
                            } else {
                              setSaveMessage('Failed to save international patient image to database.');
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
                                  id: generateUUID(),
                                  image_url: dataUrl,
                                  display_order: draftInternationalPatients.length,
                                  is_active: true
                                },
                                ...(draftInternationalPatients || [])
                              ];
                              setDraftInternationalPatients(updated);
                              await internationalPatientsService.saveInternationalPatientsList(updated);
                              setSaveMessage('International patient image loaded locally and saved.');
                              await loadInternationalPatientsList();
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
                {(!draftInternationalPatients || draftInternationalPatients.length === 0) ? (
                  <div className="bg-white rounded-2xl p-16 border border-slate-100 text-center text-slate-400 text-sm animate-fade-in">
                    No international patient photos uploaded yet. Add some moments!
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
                    {draftInternationalPatients.map((item) => (
                      <div 
                        key={item.id}
                        id={`admin-intl-patient-card-${item.id}`}
                        className="bg-white border border-slate-150 rounded-2xl p-4 flex flex-col justify-between gap-3 group relative hover:border-teal-100 transition-all duration-200 shadow-3xs"
                      >
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
                          <img 
                            src={item.image_url} 
                            alt="International Patient Moment" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Replace & Delete Actions */}
                        <div className="flex items-center justify-between gap-2 mt-auto">
                          <label
                            htmlFor={`intl-patient-replace-trigger-${item.id}`}
                            className="font-bold text-xs text-teal-600 hover:text-teal-700 bg-teal-50 px-3 py-2 rounded-xl flex items-center justify-center gap-1 hover:bg-teal-100 transition select-none flex-1 text-center cursor-pointer"
                          >
                            <Upload className="h-3 w-3 shrink-0" />
                            <span>Replace</span>
                          </label>
                          <input
                            type="file"
                            id={`intl-patient-replace-trigger-${item.id}`}
                            className="hidden"
                            accept="image/*"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                console.log('[InternationalPatient] Replace Started:', file.name);
                                setSaveMessage('Replacing international patient photo on Supabase...');
                                try {
                                  const imageUrl = await uploadImage(file);
                                  console.log('[InternationalPatient] Replace Success:', imageUrl);
                                  const updated = (draftInternationalPatients || []).map(moment => moment.id === item.id ? { ...moment, image_url: imageUrl } : moment);
                                  setDraftInternationalPatients(updated);
                                  setSaveMessage('Saving updated international patient photo to Supabase...');
                                  const success = await internationalPatientsService.saveInternationalPatientsList(updated);
                                  if (success) {
                                    setSaveMessage('International patient photo replaced and saved successfully!');
                                    await loadInternationalPatientsList();
                                  } else {
                                    setSaveMessage('Failed to save replacement to database.');
                                  }
                                } catch (err: any) {
                                  console.warn('Replace failed, falling back to local Base64:', err);
                                  try {
                                    const dataUrl = await new Promise<string>((resolve, reject) => {
                                      const reader = new FileReader();
                                      reader.onload = () => resolve(reader.result as string);
                                      reader.onerror = reject;
                                      reader.readAsDataURL(file);
                                    });
                                    const updated = (draftInternationalPatients || []).map(moment => moment.id === item.id ? { ...moment, image_url: dataUrl } : moment);
                                    setDraftInternationalPatients(updated);
                                    await internationalPatientsService.saveInternationalPatientsList(updated);
                                    setSaveMessage('International patient photo replaced locally.');
                                    await loadInternationalPatientsList();
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
                              setPatientToDelete(item.id);
                            }}
                            className="text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 p-2 rounded-xl border border-rose-100 hover:border-rose-200 transition cursor-pointer shrink-0"
                            aria-label="Delete International Patient Photo"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Patient Delete Confirmation Dialog Modal */}
                {patientToDelete && (
                  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
                    {/* Backdrop click to close */}
                    <div className="absolute inset-0" onClick={() => setPatientToDelete(null)} />
                    
                    {/* Card container */}
                    <div className="relative bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-sm w-full p-6 text-slate-800 z-10 animate-fade-in">
                      <h3 className="text-base font-extrabold text-[#081C3A] mb-2">Delete Image</h3>
                      <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                        Are you sure you want to delete this image?
                      </p>
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          type="button"
                          onClick={() => setPatientToDelete(null)}
                          className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            const updated = (draftInternationalPatients || []).filter(p => p.id !== patientToDelete);
                            setDraftInternationalPatients(updated);
                            setPatientToDelete(null);
                            setSaveMessage('Deleting photo and syncing with Supabase...');
                            const success = await internationalPatientsService.saveInternationalPatientsList(updated);
                            if (success) {
                              setSaveMessage('Photo deleted successfully!');
                              await loadInternationalPatientsList();
                            } else {
                              setSaveMessage('Failed to delete photo on Supabase.');
                            }
                            setTimeout(() => setSaveMessage(null), 3000);
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
                    setCustomVideoTitle('');
                    setVideoThumbnailInput('');
                    setIsUploadingThumbnail(false);
                    setThumbnailUploadError(null);
                    setVideoFile(null);
                    setVideoUploadError(null);
                    setIsUploadingVideo(false);
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
                          setCustomVideoTitle('');
                          setVideoThumbnailInput('');
                          setIsUploadingThumbnail(false);
                          setThumbnailUploadError(null);
                          setVideoFile(null);
                          setVideoUploadError(null);
                          setIsUploadingVideo(false);
                        }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-xs font-bold shadow-3xs cursor-pointer transition duration-150 shrink-0"
                      >
                        <ArrowLeft className="h-3.5 w-3.5 text-slate-500" />
                        <span>← Back</span>
                      </button>
                      
                      <div className="min-w-0">
                        <h3 className="font-display font-extrabold text-[#081C3A] text-base md:text-lg leading-tight">
                          {editingVideo ? 'Edit Video' : 'Add New Video'}
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
                        setCustomVideoTitle('');
                        setVideoThumbnailInput('');
                        setIsUploadingThumbnail(false);
                        setThumbnailUploadError(null);
                        setVideoFile(null);
                        setVideoUploadError(null);
                        setIsUploadingVideo(false);
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
                      
                      {videoIdPreview ? (
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 max-w-[350px] mx-auto flex flex-col items-center transition-all duration-200">
                          {videoPlatformInput === 'mp4' ? (
                            <div className="w-full max-w-[320px] mx-auto flex justify-center mb-3.5">
                              <Mp4ReelPlayer
                                src={videoUrlInput}
                                containerClassName="aspect-[9/16] h-[420px] sm:h-[440px] rounded-xl overflow-hidden bg-black border border-slate-100/80 shadow-[0_4px_20px_rgba(8,28,58,0.03)]"
                              />
                            </div>
                          ) : (
                            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-transparent mb-3.5 flex items-center justify-center">
                              <img
                                src={previewVideoThumbnail}
                                alt="Live Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&auto=format&fit=crop&q=60`;
                                }}
                              />
                              <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center pointer-events-none">
                                <Play className="h-10 w-10 text-white fill-current" />
                              </div>
                            </div>
                          )}
                          
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
                            {videoPlatformInput === 'mp4'
                              ? "Live Preview displays automatically once you upload a valid .mp4 video."
                              : "Live Preview displays automatically once you enter a valid Instagram URL."}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                      {/* Video Platform Dropdown */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Video Platform</label>
                        <select
                          value={videoPlatformInput}
                          onChange={(e) => {
                            const val = e.target.value as 'instagram' | 'mp4';
                            setVideoPlatformInput(val);
                            setVideoUrlInput('');
                            setVideoFile(null);
                            setVideoUploadError(null);
                            if (val !== 'mp4') {
                              setCustomVideoTitle('');
                            }
                          }}
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium bg-white"
                        >
                          <option value="instagram">Instagram</option>
                          <option value="mp4">MP4 Video</option>
                        </select>
                      </div>

                      {videoPlatformInput === 'mp4' ? (
                        <>
                          {/* Custom Title Input */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Video Title</label>
                            <input
                              type="text"
                              value={customVideoTitle}
                              onChange={(e) => setCustomVideoTitle(e.target.value)}
                              placeholder="e.g. Patient Testimonial on Digital Dental Care"
                              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium bg-white"
                            />
                          </div>

                          {/* MP4 File Upload */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Upload MP4 Video File</label>
                            
                            {videoUrlInput ? (
                              <div className="p-4 border border-slate-200 rounded-xl bg-[#F0FDFA] border-[#CCFBF1] space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2.5">
                                    <div className="h-9 w-9 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                                      <Video className="h-5 w-5 shrink-0" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-xs font-bold text-teal-900">MP4 Video Ready</p>
                                      <p className="text-[10px] text-teal-600 truncate max-w-[220px]">{videoUrlInput}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    {/* Replace input */}
                                    <label className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition cursor-pointer" title="Replace uploaded video">
                                      <Pencil className="h-4 w-4" />
                                      <input
                                        type="file"
                                        accept=".mp4"
                                        onChange={(e) => {
                                          if (e.target.files && e.target.files[0]) {
                                            const file = e.target.files[0];
                                            if (file.type !== 'video/mp4' && !file.name.endsWith('.mp4')) {
                                              setVideoUploadError('Unsupported file type. Only .mp4 files are accepted.');
                                              return;
                                            }
                                            const maxBytes = 100 * 1024 * 1024; // 100 MB
                                            if (file.size > maxBytes) {
                                              setVideoUploadError('File is too large. Maximum size allowed is 100 MB.');
                                              return;
                                            }
                                            setVideoUploadError(null);
                                            setVideoFile(file);
                                            setIsUploadingVideo(true);
                                            uploadVideo(file).then((publicUrl) => {
                                              setVideoUrlInput(publicUrl);
                                            }).catch((err: any) => {
                                              console.error('Error uploading video:', err);
                                              setVideoUploadError(err.message || 'Failed to upload video.');
                                              setVideoFile(null);
                                            }).finally(() => {
                                              setIsUploadingVideo(false);
                                            });
                                          }
                                        }}
                                        className="hidden"
                                      />
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setVideoUrlInput('');
                                        setVideoFile(null);
                                      }}
                                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                                      title="Delete uploaded video"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                    const file = e.dataTransfer.files[0];
                                    if (file.type !== 'video/mp4' && !file.name.endsWith('.mp4')) {
                                      setVideoUploadError('Unsupported file type. Only .mp4 files are accepted.');
                                      return;
                                    }
                                    const maxBytes = 100 * 1024 * 1024; // 100 MB
                                    if (file.size > maxBytes) {
                                      setVideoUploadError('File is too large. Maximum size allowed is 100 MB.');
                                      return;
                                    }
                                    setVideoUploadError(null);
                                    setVideoFile(file);
                                    setIsUploadingVideo(true);
                                    uploadVideo(file).then((publicUrl) => {
                                      setVideoUrlInput(publicUrl);
                                      if (!customVideoTitle) {
                                        const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                                        setCustomVideoTitle(nameWithoutExt);
                                      }
                                    }).catch((err: any) => {
                                      console.error('Error uploading video:', err);
                                      setVideoUploadError(err.message || 'Failed to upload video.');
                                      setVideoFile(null);
                                    }).finally(() => {
                                      setIsUploadingVideo(false);
                                    });
                                  }
                                }}
                                className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/10 transition relative group"
                              >
                                <input
                                  type="file"
                                  accept=".mp4"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      const file = e.target.files[0];
                                      if (file.type !== 'video/mp4' && !file.name.endsWith('.mp4')) {
                                        setVideoUploadError('Unsupported file type. Only .mp4 files are accepted.');
                                        return;
                                      }
                                      const maxBytes = 100 * 1024 * 1024; // 100 MB
                                      if (file.size > maxBytes) {
                                        setVideoUploadError('File is too large. Maximum size allowed is 100 MB.');
                                        return;
                                      }
                                      setVideoUploadError(null);
                                      setVideoFile(file);
                                      setIsUploadingVideo(true);
                                      uploadVideo(file).then((publicUrl) => {
                                        setVideoUrlInput(publicUrl);
                                        if (!customVideoTitle) {
                                          const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                                          setCustomVideoTitle(nameWithoutExt);
                                        }
                                      }).catch((err: any) => {
                                        console.error('Error uploading video:', err);
                                        setVideoUploadError(err.message || 'Failed to upload video.');
                                        setVideoFile(null);
                                      }).finally(() => {
                                        setIsUploadingVideo(false);
                                      });
                                    }
                                  }}
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                  disabled={isUploadingVideo}
                                />
                                
                                {isUploadingVideo ? (
                                  <div className="space-y-2 py-2">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto" />
                                    <p className="text-xs font-bold text-slate-600">Uploading video to Supabase Storage...</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Please do not close this drawer.</p>
                                  </div>
                                ) : (
                                  <div className="space-y-2 py-1">
                                    <Upload className="h-8 w-8 text-slate-400 mx-auto group-hover:scale-110 duration-200 transition" />
                                    <div className="space-y-0.5">
                                      <p className="text-xs font-bold text-slate-700">Drag & drop your .mp4 file here, or click to browse</p>
                                      <p className="text-[10px] text-slate-400 font-medium">Accepts only .mp4 files. Max size 100 MB.</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {videoUploadError && (
                              <p className="text-[10px] text-rose-500 font-bold mt-1.5 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                                <span>⚠ {videoUploadError}</span>
                              </p>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Video URL Input */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Video URL</label>
                            <input
                              type="text"
                              value={videoUrlInput}
                              onChange={(e) => {
                                const val = e.target.value;
                                setVideoUrlInput(val);
                                if (val.includes('instagram.com') || val.includes('instagr.am')) {
                                  setVideoPlatformInput('instagram');
                                }
                              }}
                              placeholder="e.g. https://www.instagram.com/reel/C8_X6N-vY2a/"
                              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium bg-white"
                            />
                            <p className="text-[10px] text-slate-400 font-medium">
                              The system extracts the Instagram post or reel ID and integrates the media directly.
                            </p>
                          </div>

                          {/* Reel Thumbnail Field (Optional, for Instagram) */}
                          {videoPlatformInput === 'instagram' && (
                            <div className="space-y-2 mt-4">
                              <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Reel Thumbnail (Optional)</label>
                              
                              {videoThumbnailInput ? (
                                <div className="border border-slate-150 rounded-2xl p-4 bg-slate-50/50">
                                  <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                      <div className="h-16 w-12 rounded-lg overflow-hidden border border-slate-100 bg-slate-200 shrink-0">
                                        <img 
                                          src={videoThumbnailInput} 
                                          alt="Reel Thumbnail" 
                                          className="h-full w-full object-cover"
                                          referrerPolicy="no-referrer"
                                        />
                                      </div>
                                      <div className="min-w-0">
                                        <p className="text-xs font-bold text-teal-900">Thumbnail Ready</p>
                                        <p className="text-[10px] text-teal-600 truncate max-w-[220px]">{videoThumbnailInput}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <label className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition cursor-pointer" title="Replace thumbnail">
                                        <Pencil className="h-4 w-4" />
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={async (e) => {
                                            if (e.target.files && e.target.files[0]) {
                                              const file = e.target.files[0];
                                              if (!file.type.startsWith('image/')) {
                                                setThumbnailUploadError('Unsupported file type. Only image files are accepted.');
                                                return;
                                              }
                                              const maxBytes = 10 * 1024 * 1024; // 10 MB
                                              if (file.size > maxBytes) {
                                                setThumbnailUploadError('File is too large. Maximum size allowed is 10 MB.');
                                                return;
                                              }
                                              setThumbnailUploadError(null);
                                              setIsUploadingThumbnail(true);
                                              try {
                                                const publicUrl = await uploadImage(file);
                                                setVideoThumbnailInput(publicUrl);
                                              } catch (err: any) {
                                                console.error('Error uploading thumbnail:', err);
                                                setThumbnailUploadError(err.message || 'Failed to upload thumbnail.');
                                              } finally {
                                                setIsUploadingThumbnail(false);
                                              }
                                            }
                                          }}
                                          className="hidden"
                                        />
                                      </label>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setVideoThumbnailInput('');
                                        }}
                                        className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                                        title="Remove thumbnail"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  onDragOver={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                  onDrop={async (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                      const file = e.dataTransfer.files[0];
                                      if (!file.type.startsWith('image/')) {
                                        setThumbnailUploadError('Unsupported file type. Only image files are accepted.');
                                        return;
                                      }
                                      const maxBytes = 10 * 1024 * 1024; // 10 MB
                                      if (file.size > maxBytes) {
                                        setThumbnailUploadError('File is too large. Maximum size allowed is 10 MB.');
                                        return;
                                      }
                                      setThumbnailUploadError(null);
                                      setIsUploadingThumbnail(true);
                                      try {
                                        const publicUrl = await uploadImage(file);
                                        setVideoThumbnailInput(publicUrl);
                                      } catch (err: any) {
                                        console.error('Error uploading thumbnail:', err);
                                        setThumbnailUploadError(err.message || 'Failed to upload thumbnail.');
                                      } finally {
                                        setIsUploadingThumbnail(false);
                                      }
                                    }
                                  }}
                                  className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/10 transition relative group"
                                >
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        const file = e.target.files[0];
                                        if (!file.type.startsWith('image/')) {
                                          setThumbnailUploadError('Unsupported file type. Only image files are accepted.');
                                          return;
                                        }
                                        const maxBytes = 10 * 1024 * 1024; // 10 MB
                                        if (file.size > maxBytes) {
                                          setThumbnailUploadError('File is too large. Maximum size allowed is 10 MB.');
                                          return;
                                        }
                                        setThumbnailUploadError(null);
                                        setIsUploadingThumbnail(true);
                                        try {
                                          const publicUrl = await uploadImage(file);
                                          setVideoThumbnailInput(publicUrl);
                                        } catch (err: any) {
                                          console.error('Error uploading thumbnail:', err);
                                          setThumbnailUploadError(err.message || 'Failed to upload thumbnail.');
                                        } finally {
                                          setIsUploadingThumbnail(false);
                                        }
                                      }
                                    }}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    disabled={isUploadingThumbnail}
                                  />
                                  {isUploadingThumbnail ? (
                                    <div className="space-y-2 py-2">
                                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto" />
                                      <p className="text-xs font-bold text-slate-600">Uploading thumbnail...</p>
                                    </div>
                                  ) : (
                                    <div className="space-y-2 py-1">
                                      <Upload className="h-8 w-8 text-slate-400 mx-auto group-hover:scale-110 duration-200 transition" />
                                      <div className="space-y-0.5">
                                        <p className="text-xs font-bold text-slate-700">Drag & drop your thumbnail image, or click to browse</p>
                                        <p className="text-[10px] text-slate-400 font-medium">PNG, JPG, or WEBP up to 10 MB. Recommended size: 9:16 vertical ratio.</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {thumbnailUploadError && (
                                <p className="text-[10px] text-rose-500 font-bold mt-1.5 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                                  <span>⚠ {thumbnailUploadError}</span>
                                </p>
                              )}
                            </div>
                          )}
                        </>
                      )}
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
                        setCustomVideoTitle('');
                        setVideoThumbnailInput('');
                        setIsUploadingThumbnail(false);
                        setThumbnailUploadError(null);
                        setVideoFile(null);
                        setVideoUploadError(null);
                        setIsUploadingVideo(false);
                      }}
                      className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition duration-150 cursor-pointer flex items-center gap-1.5 shadow-3xs"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleSaveVideo}
                      disabled={!videoIdPreview}
                      className={`px-5 py-2.5 text-xs font-bold text-white rounded-xl transition duration-150 flex items-center gap-1.5 ${
                        videoIdPreview 
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
                    placeholder="e.g. Pateldentalhospital1@gmail.com"
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
      case 'dental-tourism': {
        // Derive tourismVideos dynamically
        const tourismVideos = (videosList || []).filter(v => v.treatment === 'Dental Tourism').map(v => {
          const isMp4 = v.videoPlatform === 'mp4' || v.platform === 'mp4' || v.id.endsWith('.mp4') || v.id.includes('supabase.co');
          const platform = isMp4 ? 'mp4' : 'instagram';
          
          let youtubeUrl = '';
          if (platform === 'mp4') {
            youtubeUrl = v.id;
          } else {
            youtubeUrl = `https://www.instagram.com/p/${v.id}/`;
          }

          let thumbnail = v.thumbnail;
          if (!thumbnail) {
            if (platform === 'mp4') {
              thumbnail = `https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=60`;
            } else {
              thumbnail = `https://www.instagram.com/p/${v.id}/media/?size=l`;
            }
          }

          return {
            id: v.id,
            youtubeUrl: youtubeUrl,
            title: v.title,
            thumbnail: thumbnail,
            videoPlatform: platform,
            treatment: v.treatment,
            category: v.category
          };
        });

        // Local Media helpers
        const getInstagramId = (url: string): string | null => {
          if (!url) return null;
          const match = url.match(/(?:instagram\.com\/(?:p|reel)\/)([A-Za-z0-9_-]+)/);
          return match ? match[1] : null;
        };

        const getInstagramAutoTitle = (url: string): string => {
          return "Dental Tourism Patient Instagram Reel";
        };

        const handleSaveVideo = async () => {
          let currentPlatform = videoPlatformInput;
          if (videoUrlInput.includes('instagram.com') || videoUrlInput.includes('instagr.am')) {
            currentPlatform = 'instagram';
          } else if (videoUrlInput.startsWith('http') && (videoUrlInput.endsWith('.mp4') || videoUrlInput.includes('supabase.co'))) {
            currentPlatform = 'mp4';
          } else if (editingVideo && (editingVideo.videoPlatform === 'instagram' || editingVideo.platform === 'instagram')) {
            currentPlatform = 'instagram';
          } else if (editingVideo && (editingVideo.videoPlatform === 'mp4' || editingVideo.platform === 'mp4')) {
            currentPlatform = 'mp4';
          }

          let extractedId = '';
          let generatedTitle = '';
          let thumbnail = '';
          let videoUrl = '';

          if (currentPlatform === 'mp4') {
            extractedId = videoUrlInput;
            if (!extractedId) {
              alert('Please upload an MP4 video or enter a valid video URL.');
              return;
            }
            generatedTitle = customVideoTitle || 'Dental Tourism Video';
            thumbnail = `https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=60`;
            videoUrl = videoUrlInput;
          } else {
            const id = getInstagramId(videoUrlInput);
            
            if (!id) {
              alert('Please enter a valid Instagram video URL.');
              return;
            }
            extractedId = id;
            
            generatedTitle = customVideoTitle || getInstagramAutoTitle(videoUrlInput);

            thumbnail = videoThumbnailInput || `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&auto=format&fit=crop&q=60`;

            videoUrl = `https://www.instagram.com/p/${extractedId}/`;
          }

          let updated: DentalVideo[];
          if (editingVideo) {
            updated = (videosList || []).map(v => v.id === editingVideo.id ? {
              id: extractedId,
              title: generatedTitle,
              treatment: 'Dental Tourism',
              category: 'Dental Tourism',
              videoPlatform: currentPlatform,
              platform: currentPlatform,
              url: videoUrl,
              youtubeUrl: videoUrl,
              thumbnail: videoThumbnailInput || thumbnail,
              createdAt: v.createdAt || new Date().toISOString()
            } : v);
          } else {
            updated = [
              ...(videosList || []),
              {
                id: extractedId,
                title: generatedTitle,
                treatment: 'Dental Tourism',
                category: 'Dental Tourism',
                videoPlatform: currentPlatform,
                platform: currentPlatform,
                url: videoUrl,
                youtubeUrl: videoUrl,
                thumbnail: videoThumbnailInput || thumbnail,
                createdAt: new Date().toISOString()
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
          setCustomVideoTitle('');
          setVideoThumbnailInput('');
          setIsUploadingThumbnail(false);
          setThumbnailUploadError(null);
          setVideoFile(null);
          setVideoUploadError(null);
          setIsUploadingVideo(false);
        };

        const handleDeleteVideo = async (id: string) => {
          if (!window.confirm('Are you sure you want to delete this video?')) return;
          const updated = (videosList || []).filter(v => v.id !== id);
          setVideosList(updated);
          setSaveMessage('Deleting video and syncing with Supabase...');
          try {
            const success = await videoService.saveVideos(updated);
            if (success) {
              setSaveMessage('Video deleted successfully!');
            } else {
              setSaveMessage('Failed to sync video deletion with Supabase.');
            }
          } catch (err: any) {
            console.error('Error deleting video:', err);
            setSaveMessage('Error deleting: ' + (err.message || err));
          } finally {
            setTimeout(() => setSaveMessage(null), 3000);
          }
        };

        const isInstagram = videoPlatformInput === 'instagram';
        const isMp4 = videoPlatformInput === 'mp4';
        
        let videoIdPreview = null;
        if (isInstagram) {
          videoIdPreview = getInstagramId(videoUrlInput);
        } else if (isMp4) {
          videoIdPreview = videoUrlInput || null;
        }

        let previewVideoTitle = '';
        if (isInstagram) {
          previewVideoTitle = videoIdPreview ? getInstagramAutoTitle(videoUrlInput) : 'Enter Instagram URL above';
        } else if (isMp4) {
          previewVideoTitle = customVideoTitle || 'Dental Tourism Video';
        }

        let previewVideoThumbnail = '';
        if (isInstagram) {
          previewVideoThumbnail = videoThumbnailInput || (videoIdPreview ? `https://www.instagram.com/p/${videoIdPreview}/media/?size=l` : '');
        } else if (isMp4) {
          previewVideoThumbnail = videoThumbnailInput || `https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=60`;
        }

        return (
          <div className="space-y-6" id="admin-dental-tourism-view">
            {/* Header Banner */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-3xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold font-display text-slate-900 flex items-center gap-2" id="tourism-admin-title">
                  <span className="p-2 rounded-xl bg-teal-50 text-teal-600"><Plane className="h-5 w-5 animate-pulse" /></span>
                  Dental Tourism CMS
                </h1>
                <p className="text-slate-500 text-xs md:text-sm mt-1">
                  Manage standard patient galleries and high-impact travel testimonies on the Dental Tourism page.
                </p>
              </div>
            </div>

            {/* Selection Options - IMAGE, VIDEO and BEFORE & AFTER */}
            <div className="flex border-b border-slate-200">
              <button
                type="button"
                onClick={() => setTourismSubTab('image')}
                className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all duration-200 cursor-pointer ${
                  tourismSubTab === 'image'
                    ? 'border-teal-600 text-teal-600 font-extrabold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                📸 Image Management
              </button>
              <button
                type="button"
                onClick={() => setTourismSubTab('video')}
                className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all duration-200 cursor-pointer ${
                  tourismSubTab === 'video'
                    ? 'border-teal-600 text-teal-600 font-extrabold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                🎥 Video Management
              </button>
              <button
                type="button"
                onClick={() => setTourismSubTab('before_after')}
                className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all duration-200 cursor-pointer ${
                  tourismSubTab === 'before_after'
                    ? 'border-teal-600 text-teal-600 font-extrabold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                ✨ Before & After
              </button>
            </div>

            {/* IMAGE MANAGEMENT TAB */}
            {tourismSubTab === 'image' && (
              <div className="space-y-6" id="tourism-images-tab">
                {/* Actions row */}
                <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-slate-150 shadow-3xs">
                  <div className="text-xs text-slate-500 font-medium">
                    Showing <span className="font-bold text-slate-800">{(draftInternationalPatients || []).length}</span> Dental Tourism gallery photos
                  </div>
                  
                  <div>
                    <label
                      htmlFor="tourism-patient-upload-file-trigger"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition duration-150 cursor-pointer select-none"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Upload New Image</span>
                    </label>
                    <input
                      type="file"
                      id="tourism-patient-upload-file-trigger"
                      className="hidden"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          setSaveMessage('Uploading Dental Tourism image to Supabase...');
                          try {
                            const imageUrl = await uploadImage(file);
                            const updated = [
                              {
                                id: generateUUID(),
                                image_url: imageUrl,
                                display_order: draftInternationalPatients.length,
                                is_active: true
                              },
                              ...(draftInternationalPatients || [])
                            ];
                            setDraftInternationalPatients(updated);
                            setSaveMessage('Saving Dental Tourism image...');
                            const success = await internationalPatientsService.saveInternationalPatientsList(updated);
                            if (success) {
                              setSaveMessage('Dental Tourism image uploaded and saved successfully!');
                              await loadInternationalPatientsList();
                            } else {
                              setSaveMessage('Failed to save Dental Tourism image.');
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
                                  id: generateUUID(),
                                  image_url: dataUrl,
                                  display_order: draftInternationalPatients.length,
                                  is_active: true
                                },
                                ...(draftInternationalPatients || [])
                              ];
                              setDraftInternationalPatients(updated);
                              await internationalPatientsService.saveInternationalPatientsList(updated);
                              setSaveMessage('Dental Tourism image loaded locally.');
                              await loadInternationalPatientsList();
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

                {/* Image Grid */}
                {(!draftInternationalPatients || draftInternationalPatients.length === 0) ? (
                  <div className="bg-white rounded-2xl p-16 border border-slate-100 text-center text-slate-400 text-sm">
                    No Dental Tourism gallery images uploaded yet. Add some patient moments!
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {draftInternationalPatients.map((item) => (
                      <div 
                        key={item.id}
                        id={`tourism-image-card-${item.id}`}
                        className="bg-white border border-slate-150 rounded-2xl p-4 flex flex-col justify-between gap-3 group relative hover:border-teal-100 transition-all duration-200 shadow-3xs"
                      >
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
                          <img 
                            src={item.image_url} 
                            alt="Dental Tourism Moment" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Replace & Delete Actions */}
                        <div className="flex items-center justify-between gap-2 mt-auto">
                          <label
                            htmlFor={`tourism-image-replace-trigger-${item.id}`}
                            className="font-bold text-xs text-teal-600 hover:text-teal-700 bg-teal-50 px-3 py-2 rounded-xl flex items-center justify-center gap-1 hover:bg-teal-100 transition select-none flex-1 text-center cursor-pointer"
                          >
                            <Upload className="h-3 w-3 shrink-0" />
                            <span>Replace</span>
                          </label>
                          <input
                            type="file"
                            id={`tourism-image-replace-trigger-${item.id}`}
                            className="hidden"
                            accept="image/*"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                setSaveMessage('Replacing Dental Tourism image...');
                                try {
                                  const imageUrl = await uploadImage(file);
                                  const updated = (draftInternationalPatients || []).map(moment => moment.id === item.id ? { ...moment, image_url: imageUrl } : moment);
                                  setDraftInternationalPatients(updated);
                                  setSaveMessage('Saving updated image...');
                                  const success = await internationalPatientsService.saveInternationalPatientsList(updated);
                                  if (success) {
                                    setSaveMessage('Image replaced successfully!');
                                    await loadInternationalPatientsList();
                                  } else {
                                    setSaveMessage('Failed to save replacement.');
                                  }
                                } catch (err: any) {
                                  console.warn('Replace failed, falling back to Base64:', err);
                                  try {
                                    const dataUrl = await new Promise<string>((resolve, reject) => {
                                      const reader = new FileReader();
                                      reader.onload = () => resolve(reader.result as string);
                                      reader.onerror = reject;
                                      reader.readAsDataURL(file);
                                    });
                                    const updated = (draftInternationalPatients || []).map(moment => moment.id === item.id ? { ...moment, image_url: dataUrl } : moment);
                                    setDraftInternationalPatients(updated);
                                    await internationalPatientsService.saveInternationalPatientsList(updated);
                                    setSaveMessage('Image replaced locally.');
                                    await loadInternationalPatientsList();
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
                              setPatientToDelete(item.id);
                            }}
                            className="text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 p-2 rounded-xl border border-rose-100 hover:border-rose-200 transition cursor-pointer shrink-0"
                            aria-label="Delete Dental Tourism Image"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Patient Delete Confirmation Dialog Modal */}
                {patientToDelete && (
                  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
                    <div className="absolute inset-0" onClick={() => setPatientToDelete(null)} />
                    <div className="relative bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-sm w-full p-6 text-slate-800 z-10 animate-fade-in">
                      <h3 className="text-base font-extrabold text-[#081C3A] mb-2">Delete Image</h3>
                      <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                        Are you sure you want to delete this image?
                      </p>
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          type="button"
                          onClick={() => setPatientToDelete(null)}
                          className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            const updated = (draftInternationalPatients || []).filter(p => p.id !== patientToDelete);
                            setDraftInternationalPatients(updated);
                            setPatientToDelete(null);
                            setSaveMessage('Deleting photo and syncing with Supabase...');
                            const success = await internationalPatientsService.saveInternationalPatientsList(updated);
                            if (success) {
                              setSaveMessage('Photo deleted successfully!');
                              await loadInternationalPatientsList();
                            } else {
                              setSaveMessage('Failed to delete photo.');
                            }
                            setTimeout(() => setSaveMessage(null), 3000);
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

            {/* VIDEO MANAGEMENT TAB */}
            {tourismSubTab === 'video' && (
              <div className="space-y-6" id="tourism-videos-tab">
                <CmsSectionToggle
                  checked={isTourismVideoEnabled}
                  onChange={async (checked) => {
                    setIsTourismVideoEnabled(checked);
                    setSaveMessage('Updating video section status...');
                    try {
                      const success = await videoService.setDentalTourismVideoEnabled(checked);
                      if (success) {
                        setSaveMessage(`Video section ${checked ? 'Enabled' : 'Disabled'} successfully!`);
                      } else {
                        setSaveMessage('Failed to save section status.');
                      }
                    } catch (err) {
                      console.error('Error saving video enabled setting:', err);
                      setSaveMessage('Error saving section status.');
                    } finally {
                      setTimeout(() => setSaveMessage(null), 3000);
                    }
                  }}
                />

                {/* Actions row */}
                <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-slate-150 shadow-3xs">
                  <div className="text-xs text-slate-500 font-medium">
                    Showing <span className="font-bold text-slate-800">{tourismVideos.length}</span> Dental Tourism videos
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setEditingVideo(null);
                      setVideoUrlInput('');
                      setVideoPlatformInput('instagram');
                      setCustomVideoTitle('');
                      setVideoThumbnailInput('');
                      setIsUploadingThumbnail(false);
                      setThumbnailUploadError(null);
                      setVideoFile(null);
                      setVideoUploadError(null);
                      setIsUploadingVideo(false);
                      setVideoDrawerOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition duration-150 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Video</span>
                  </button>
                </div>

                {/* Video Grid */}
                {tourismVideos.length === 0 ? (
                  <div className="bg-white rounded-2xl p-16 border border-slate-100 text-center text-slate-400 text-sm">
                    No Dental Tourism videos registered yet. Add some testimonials!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tourismVideos.map((item) => (
                      <div
                        key={item.id}
                        className="group bg-white rounded-2xl border border-slate-150 shadow-3xs overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col"
                      >
                        {/* Video Player or Thumbnail Overlay */}
                        {item.videoPlatform === 'mp4' || item.id.endsWith('.mp4') || item.id.includes('supabase.co') ? (
                          <div className="w-full max-w-[430px] mx-auto flex justify-center py-2">
                            <Mp4ReelPlayer
                              src={item.youtubeUrl || item.id}
                              containerClassName="aspect-[9/16] h-[440px] sm:h-[460px] rounded-xl overflow-hidden bg-black border border-slate-100/80 shadow-[0_4px_20px_rgba(8,28,58,0.03)]"
                            />
                          </div>
                        ) : (
                          <div className="relative aspect-video w-full overflow-hidden bg-transparent flex items-center justify-center">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                              onError={(e) => {
                                e.currentTarget.src = `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&auto=format&fit=crop&q=60`;
                              }}
                            />
                            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition flex items-center justify-center z-10">
                              <div className="bg-teal-600 hover:bg-teal-700 text-white p-3.5 rounded-full shadow-lg transform scale-90 group-hover:scale-100 duration-200 transition">
                                <Play className="h-6 w-6 text-white fill-current translate-x-0.5" />
                              </div>
                            </div>
                            
                            <a
                              href={item.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs hover:bg-black/80 text-white p-1.5 rounded-lg text-[10px] font-black tracking-wider uppercase transition flex items-center gap-1.5 z-20"
                            >
                              <span>Open on Instagram</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        )}

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
                                setVideoPlatformInput(item.videoPlatform || 'instagram');
                                setCustomVideoTitle(item.title || '');
                                setVideoThumbnailInput(item.thumbnail || '');
                                setIsUploadingThumbnail(false);
                                setThumbnailUploadError(null);
                                setVideoFile(null);
                                setVideoUploadError(null);
                                setIsUploadingVideo(false);
                                setVideoDrawerOpen(true);
                              }}
                              className="px-3.5 py-1.5 rounded-lg text-teal-600 hover:text-white hover:bg-teal-600 font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteVideo(item.id)}
                              className="px-3.5 py-1.5 rounded-lg text-rose-600 hover:text-white hover:bg-rose-600 font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
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

            {/* BEFORE & AFTER MANAGEMENT TAB */}
            {tourismSubTab === 'before_after' && (
              <BeforeAfterCms />
            )}

            {/* Slide-out Drawer for Adding / Editing Videos (Dental Tourism localized drawer) */}
            {videoDrawerOpen && (
              <div className="fixed inset-0 z-100 flex justify-end" id="tourism-video-drawer-overlay">
                <div
                  className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
                  onClick={() => {
                    setVideoDrawerOpen(false);
                    setEditingVideo(null);
                    setVideoUrlInput('');
                    setCustomVideoTitle('');
                    setVideoThumbnailInput('');
                    setIsUploadingThumbnail(false);
                    setThumbnailUploadError(null);
                    setVideoFile(null);
                    setVideoUploadError(null);
                    setIsUploadingVideo(false);
                  }}
                />

                <div className="relative w-full md:w-[650px] bg-white h-full shadow-2xl flex flex-col z-110 border-l border-slate-100 animate-slide-in">
                  {/* Drawer Header */}
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setVideoDrawerOpen(false);
                          setEditingVideo(null);
                          setVideoUrlInput('');
                          setCustomVideoTitle('');
                          setVideoThumbnailInput('');
                          setIsUploadingThumbnail(false);
                          setThumbnailUploadError(null);
                          setVideoFile(null);
                          setVideoUploadError(null);
                          setIsUploadingVideo(false);
                        }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-xs font-bold shadow-3xs cursor-pointer transition duration-150 shrink-0"
                      >
                        <ArrowLeft className="h-3.5 w-3.5 text-slate-500" />
                        <span>← Back</span>
                      </button>
                      
                      <div className="min-w-0">
                        <h3 className="font-display font-extrabold text-[#081C3A] text-base md:text-lg leading-tight">
                          {editingVideo ? 'Edit Dental Tourism Video' : 'Add New Dental Tourism Video'}
                        </h3>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setVideoDrawerOpen(false);
                        setEditingVideo(null);
                        setVideoUrlInput('');
                        setCustomVideoTitle('');
                        setVideoThumbnailInput('');
                        setIsUploadingThumbnail(false);
                        setThumbnailUploadError(null);
                        setVideoFile(null);
                        setVideoUploadError(null);
                        setIsUploadingVideo(false);
                      }}
                      className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-lg transition"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Scrollable Drawer Content */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Live Preview Card */}
                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/80 space-y-2.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">Video Live Preview Card</span>
                      
                      {videoIdPreview ? (
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 max-w-[350px] mx-auto flex flex-col items-center transition-all duration-200">
                          {videoPlatformInput === 'mp4' ? (
                            <div className="w-full max-w-[320px] mx-auto flex justify-center mb-3.5">
                              <Mp4ReelPlayer
                                src={videoUrlInput}
                                containerClassName="aspect-[9/16] h-[420px] sm:h-[440px] rounded-xl overflow-hidden bg-black border border-slate-100/80 shadow-[0_4px_20px_rgba(8,28,58,0.03)]"
                              />
                            </div>
                          ) : (
                            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-transparent mb-3.5 flex items-center justify-center">
                              <img
                                src={previewVideoThumbnail}
                                alt="Live Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&auto=format&fit=crop&q=60`;
                                }}
                              />
                              <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center pointer-events-none">
                                <Play className="h-10 w-10 text-white fill-current" />
                              </div>
                            </div>
                          )}
                          
                          <h4 className="font-display font-extrabold text-slate-900 text-sm leading-snug text-center">
                            {previewVideoTitle}
                          </h4>
                          
                          <div className="text-[10px] text-teal-600 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-100 mt-3 flex items-center gap-1">
                            <span>Ready to save</span>
                            <Check className="h-3 w-3" />
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-3xl border border-slate-100 border-dashed p-10 text-center max-w-[350px] mx-auto">
                          <Video className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                          <span className="text-xs text-slate-400 font-medium block">
                            {videoPlatformInput === 'mp4'
                              ? "Live Preview displays automatically once you upload a valid .mp4 video."
                              : "Live Preview displays automatically once you enter a valid Instagram URL."}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                      {/* Video Platform */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Video Platform</label>
                        <select
                          value={videoPlatformInput}
                          onChange={(e) => {
                            const val = e.target.value as 'instagram' | 'mp4';
                            setVideoPlatformInput(val);
                            setVideoUrlInput('');
                            setVideoFile(null);
                            setVideoUploadError(null);
                            if (val !== 'mp4') {
                              setCustomVideoTitle('');
                            }
                          }}
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white"
                        >
                          <option value="instagram">Instagram</option>
                          <option value="mp4">MP4 Video File</option>
                        </select>
                      </div>

                      {videoPlatformInput === 'mp4' ? (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Video Title</label>
                            <input
                              type="text"
                              value={customVideoTitle}
                              onChange={(e) => setCustomVideoTitle(e.target.value)}
                              placeholder="e.g. International Patient Testimonial"
                              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Upload MP4 Video File</label>
                            {videoUrlInput ? (
                              <div className="p-4 border border-slate-200 rounded-xl bg-[#F0FDFA] border-[#CCFBF1] space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2.5">
                                    <div className="h-9 w-9 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                                      <Video className="h-5 w-5 shrink-0" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-xs font-bold text-teal-900">MP4 Video Ready</p>
                                      <p className="text-[10px] text-teal-600 truncate max-w-[220px]">{videoUrlInput}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <label className="p-1.5 text-teal-600 hover:text-teal-850 hover:bg-teal-50 rounded-lg transition cursor-pointer" title="Replace video">
                                      <Pencil className="h-4 w-4" />
                                      <input
                                        type="file"
                                        accept=".mp4"
                                        onChange={(e) => {
                                          if (e.target.files && e.target.files[0]) {
                                            const file = e.target.files[0];
                                            if (file.type !== 'video/mp4' && !file.name.endsWith('.mp4')) {
                                              setVideoUploadError('Unsupported file type. Only .mp4 files are accepted.');
                                              return;
                                            }
                                            const maxBytes = 100 * 1024 * 1024; // 100 MB
                                            if (file.size > maxBytes) {
                                              setVideoUploadError('File is too large. Maximum size allowed is 100 MB.');
                                              return;
                                            }
                                            setVideoUploadError(null);
                                            setVideoFile(file);
                                            setIsUploadingVideo(true);
                                            uploadVideo(file).then((publicUrl) => {
                                              setVideoUrlInput(publicUrl);
                                            }).catch((err: any) => {
                                              console.error('Error uploading video:', err);
                                              setVideoUploadError(err.message || 'Failed to upload video.');
                                              setVideoFile(null);
                                            }).finally(() => {
                                              setIsUploadingVideo(false);
                                            });
                                          }
                                        }}
                                        className="hidden"
                                      />
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setVideoUrlInput('');
                                        setVideoFile(null);
                                      }}
                                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                                      title="Delete video"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                    const file = e.dataTransfer.files[0];
                                    if (file.type !== 'video/mp4' && !file.name.endsWith('.mp4')) {
                                      setVideoUploadError('Unsupported file type. Only .mp4 files are accepted.');
                                      return;
                                    }
                                    const maxBytes = 100 * 1024 * 1024; // 100 MB
                                    if (file.size > maxBytes) {
                                      setVideoUploadError('File is too large. Maximum size allowed is 100 MB.');
                                      return;
                                    }
                                    setVideoUploadError(null);
                                    setVideoFile(file);
                                    setIsUploadingVideo(true);
                                    uploadVideo(file).then((publicUrl) => {
                                      setVideoUrlInput(publicUrl);
                                      if (!customVideoTitle) {
                                        const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                                        setCustomVideoTitle(nameWithoutExt);
                                      }
                                    }).catch((err: any) => {
                                      console.error('Error uploading video:', err);
                                      setVideoUploadError(err.message || 'Failed to upload video.');
                                      setVideoFile(null);
                                    }).finally(() => {
                                      setIsUploadingVideo(false);
                                    });
                                  }
                                }}
                                className="border-2 border-dashed border-slate-200 hover:border-teal-400 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50 hover:bg-teal-50/10 transition relative group"
                              >
                                <input
                                  type="file"
                                  accept=".mp4"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      const file = e.target.files[0];
                                      if (file.type !== 'video/mp4' && !file.name.endsWith('.mp4')) {
                                        setVideoUploadError('Unsupported file type. Only .mp4 files are accepted.');
                                        return;
                                      }
                                      const maxBytes = 100 * 1024 * 1024; // 100 MB
                                      if (file.size > maxBytes) {
                                        setVideoUploadError('File is too large. Maximum size allowed is 100 MB.');
                                        return;
                                      }
                                      setVideoUploadError(null);
                                      setVideoFile(file);
                                      setIsUploadingVideo(true);
                                      uploadVideo(file).then((publicUrl) => {
                                        setVideoUrlInput(publicUrl);
                                        if (!customVideoTitle) {
                                          const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                                          setCustomVideoTitle(nameWithoutExt);
                                        }
                                      }).catch((err: any) => {
                                        console.error('Error uploading video:', err);
                                        setVideoUploadError(err.message || 'Failed to upload video.');
                                        setVideoFile(null);
                                      }).finally(() => {
                                        setIsUploadingVideo(false);
                                      });
                                    }
                                  }}
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                  disabled={isUploadingVideo}
                                />
                                
                                {isUploadingVideo ? (
                                  <div className="space-y-2 py-2">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto" />
                                    <p className="text-xs font-bold text-slate-600">Uploading video to Supabase Storage...</p>
                                  </div>
                                ) : (
                                  <div className="space-y-2 py-1">
                                    <Upload className="h-8 w-8 text-slate-400 mx-auto group-hover:scale-110 duration-200 transition" />
                                    <p className="text-xs font-bold text-slate-700">Drag & drop your .mp4 file here, or click to browse</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Only .mp4 files. Max 100 MB.</p>
                                  </div>
                                )}
                              </div>
                            )}

                            {videoUploadError && (
                              <p className="text-[10px] text-rose-500 font-bold mt-1.5 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                                <span>⚠ {videoUploadError}</span>
                              </p>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Video URL Input */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Video URL</label>
                            <input
                              type="text"
                              value={videoUrlInput}
                              onChange={(e) => {
                                const val = e.target.value;
                                setVideoUrlInput(val);
                                if (val.includes('instagram.com') || val.includes('instagr.am')) {
                                  setVideoPlatformInput('instagram');
                                }
                              }}
                              placeholder="e.g. https://www.instagram.com/reel/C8_X6N-vY2a/"
                              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white"
                            />
                            <p className="text-[10px] text-slate-400 font-medium">
                              Enter an Instagram reel or video URL.
                            </p>
                          </div>

                          {/* Thumbnail uploading for Instagram */}
                          {videoPlatformInput === 'instagram' && (
                            <div className="space-y-2 mt-4">
                              <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">Reel Thumbnail (Optional)</label>
                              {videoThumbnailInput ? (
                                <div className="border border-slate-150 rounded-2xl p-4 bg-slate-50/50">
                                  <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                      <div className="h-16 w-12 rounded-lg overflow-hidden border border-slate-100 bg-slate-200 shrink-0">
                                        <img 
                                          src={videoThumbnailInput} 
                                          alt="Reel Thumbnail" 
                                          className="h-full w-full object-cover"
                                          referrerPolicy="no-referrer"
                                        />
                                      </div>
                                      <div className="min-w-0">
                                        <p className="text-xs font-bold text-teal-900">Thumbnail Ready</p>
                                        <p className="text-[10px] text-teal-600 truncate max-w-[220px]">{videoThumbnailInput}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <label className="p-2 text-teal-600 hover:text-teal-850 hover:bg-teal-50 rounded-lg transition cursor-pointer" title="Replace thumbnail">
                                        <Pencil className="h-4 w-4" />
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={async (e) => {
                                            if (e.target.files && e.target.files[0]) {
                                              const file = e.target.files[0];
                                              if (!file.type.startsWith('image/')) {
                                                setThumbnailUploadError('Unsupported file type. Only images are accepted.');
                                                return;
                                              }
                                              const maxBytes = 10 * 1024 * 1024; // 10 MB
                                              if (file.size > maxBytes) {
                                                setThumbnailUploadError('File too large (Max 10 MB).');
                                                return;
                                              }
                                              setThumbnailUploadError(null);
                                              setIsUploadingThumbnail(true);
                                              try {
                                                const publicUrl = await uploadImage(file);
                                                setVideoThumbnailInput(publicUrl);
                                              } catch (err: any) {
                                                console.error('Thumbnail upload failed:', err);
                                                setThumbnailUploadError(err.message || 'Failed to upload thumbnail.');
                                              } finally {
                                                setIsUploadingThumbnail(false);
                                              }
                                            }
                                          }}
                                          className="hidden"
                                        />
                                      </label>
                                      <button
                                        type="button"
                                        onClick={() => setVideoThumbnailInput('')}
                                        className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                                        title="Remove thumbnail"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  onDragOver={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                  onDrop={async (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                      const file = e.dataTransfer.files[0];
                                      if (!file.type.startsWith('image/')) {
                                        setThumbnailUploadError('Unsupported file type.');
                                        return;
                                      }
                                      setThumbnailUploadError(null);
                                      setIsUploadingThumbnail(true);
                                      try {
                                        const publicUrl = await uploadImage(file);
                                        setVideoThumbnailInput(publicUrl);
                                      } catch (err: any) {
                                        setThumbnailUploadError(err.message);
                                      } finally {
                                        setIsUploadingThumbnail(false);
                                      }
                                    }
                                  }}
                                  className="border-2 border-dashed border-slate-200 hover:border-teal-400 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50 hover:bg-teal-50/10 transition relative group"
                                >
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        const file = e.target.files[0];
                                        setIsUploadingThumbnail(true);
                                        try {
                                          const publicUrl = await uploadImage(file);
                                          setVideoThumbnailInput(publicUrl);
                                        } catch (err: any) {
                                          setThumbnailUploadError(err.message);
                                        } finally {
                                          setIsUploadingThumbnail(false);
                                        }
                                      }
                                    }}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                  />
                                  {isUploadingThumbnail ? (
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto" />
                                  ) : (
                                    <p className="text-xs font-bold text-slate-700">Browse thumbnail image</p>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Drawer Footer */}
                  <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setVideoDrawerOpen(false);
                        setEditingVideo(null);
                        setVideoUrlInput('');
                        setCustomVideoTitle('');
                        setVideoThumbnailInput('');
                        setIsUploadingThumbnail(false);
                        setThumbnailUploadError(null);
                        setVideoFile(null);
                        setVideoUploadError(null);
                        setIsUploadingVideo(false);
                      }}
                      className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition duration-150 cursor-pointer flex items-center gap-1.5 shadow-3xs"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleSaveVideo}
                      disabled={!videoIdPreview}
                      className={`px-5 py-2.5 text-xs font-bold text-white rounded-xl transition duration-150 flex items-center gap-1.5 ${
                        videoIdPreview 
                          ? 'bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-500/10 cursor-pointer' 
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
          </div>
        );
      }
      case 'appointments':
        return <Appointments />;
      case 'implants-cms':
        return <DentalImplantsCms onSaveSuccess={loadServicesList} />;
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
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right pr-6 w-80">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sortedServicesList.map((svc) => (
                        <tr 
                          key={svc.id} 
                          className="hover:bg-slate-50/30 transition-all duration-150"
                          id={`service-row-${svc.id}`}
                        >
                          {/* Display Order with Inline Editing */}
                          <td className="px-4 py-4 text-xs font-mono">
                            <input
                              type="number"
                              value={svc.display_order ?? 0}
                              onChange={async (e) => {
                                const newOrder = parseInt(e.target.value) || 0;
                                const updatedSvc = { ...svc, display_order: newOrder };
                                setServicesList(prev => prev.map(s => s.id === svc.id ? updatedSvc : s));
                                await serviceService.saveService(updatedSvc);
                              }}
                              className="w-16 px-2.5 py-1.5 text-xs text-center border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D9488] font-bold bg-white text-slate-800 shadow-3xs transition duration-150"
                              title="Modify Display Order"
                              min="0"
                            />
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

                          {/* Actions */}
                          <td className="px-4 py-4 text-xs text-right pr-6 whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Edit Action with Future-Proof CMS Architecture */}
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveServiceEditorTab('details');
                                  setEditingService(svc);
                                  setIsSlugTouched(true);
                                  setServiceFormError(null);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-[#0D9488] bg-[#F0FDFA] hover:bg-[#CCFBF1] rounded-lg transition cursor-pointer font-display"
                                title={svc.slug === 'dental-implants' || svc.id === 'implants-srv' ? "Open Dental Implants CMS Editor" : "Edit Service details"}
                              >
                                <Pencil className="h-3 w-3" />
                                Edit
                              </button>

                              {/* Second Action: Same Dental Implants Status Action/Function */}
                              <button
                                type="button"
                                onClick={async () => {
                                  const updatedSvc = { ...svc, is_active: !svc.is_active };
                                  setServicesList(prev => prev.map(s => s.id === svc.id ? updatedSvc : s));
                                  await serviceService.saveService(updatedSvc);
                                }}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                                  svc.is_active 
                                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200' 
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200'
                                }`}
                                title={svc.is_active ? "Click to Disable Service" : "Click to Enable Service"}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${svc.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                                {svc.is_active ? 'Enabled' : 'Disabled'}
                              </button>

                              {/* Delete Action (Consistently rendered for all services, including Dental Implants) */}
                              <button
                                type="button"
                                onClick={() => {
                                  setServiceToDelete(svc.id);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition cursor-pointer font-display"
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
            src="/Best Dntal Hospital Rajkot.PNG" 
            alt="Patel Logo" 
            className="h-9 w-auto object-contain rounded-md"
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
              src="/Best Dntal Hospital Rajkot.PNG" 
              alt="Patel Dental Hospital Logo" 
              className="h-[52px] w-auto object-contain mb-3 rounded-lg"
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
      <main id="admin-main-workspace" className="flex-grow p-4 md:p-8 overflow-y-auto max-w-full relative">
        {/* TOP STATUS & NOTIFICATION BAR */}
        <div className="w-full flex items-center justify-between bg-white border border-slate-200/80 rounded-2xl px-6 py-4 mb-6 shadow-3xs" id="admin-top-bar">
          <div>
            <h2 className="font-display font-black text-[#081C3A] text-sm md:text-base capitalize tracking-wide">
              {activeTab === 'dashboard' ? 'Overview Dashboard' : activeTab === 'dental-tourism' ? 'Dental Tourism CMS' : `${activeTab} Management`}
            </h2>
            <p className="text-[10px] md:text-xs text-slate-400 font-medium">
              Real-time synchronization active • {notifications.filter(n => !n.isRead).length} unread alerts
            </p>
          </div>

          <div className="flex items-center gap-4 relative">
            {/* Notification Bell Trigger */}
            <button
              onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100 flex items-center justify-center border-none"
              id="admin-notification-bell-btn"
            >
              {notifications.some(n => !n.isRead) ? (
                <BellRing className="h-5 w-5 text-blue-600 animate-bounce" />
              ) : (
                <Bell className="h-5 w-5" />
              )}
              {notifications.filter(n => !n.isRead).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-extrabold text-[9px] h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm" id="admin-notification-badge">
                  {notifications.filter(n => !n.isRead).length}
                </span>
              )}
            </button>

            {/* Notification Dropdown Board */}
            {isNotificationDropdownOpen && (
              <div className="absolute right-0 top-12 w-[320px] md:w-[380px] bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden" id="admin-notification-dropdown">
                <div className="px-5 py-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-slate-800 text-xs">Real-time Notifications</h4>
                    <p className="text-[9px] text-slate-400 mt-0.5">Real-time logs for new appointments</p>
                  </div>
                  <div className="flex gap-2.5">
                    {notifications.some(n => !n.isRead) && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-[10px] font-black text-blue-600 hover:text-blue-700 hover:underline bg-transparent border-none cursor-pointer p-0"
                        id="btn-mark-all-read"
                      >
                        Mark all read
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button
                        onClick={handleClearAllNotifications}
                        className="text-[10px] font-black text-rose-600 hover:text-rose-700 hover:underline bg-transparent border-none cursor-pointer p-0"
                        id="btn-clear-all-notifs"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-[350px] overflow-y-auto divide-y divide-slate-100" id="admin-notifications-list">
                  {notificationError ? (
                    <div className="p-6 text-center text-rose-600 font-semibold text-xs" id="admin-notifications-error">
                      {notificationError}
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="p-8 text-center" id="admin-notifications-empty">
                      <Bell className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs text-slate-400 font-semibold">No notifications received yet.</p>
                      <p className="text-[10px] text-slate-300 mt-1">Book an appointment on the website to see this work in real-time.</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 transition hover:bg-slate-50/50 flex flex-col gap-2 ${
                          notif.isRead ? 'opacity-70' : 'bg-blue-50/20 border-l-2 border-blue-600'
                        }`}
                        id={`notif-item-${notif.id}`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-black text-[#081C3A] uppercase tracking-wide">
                            {notif.patientName}
                          </span>
                          <span className="text-[8px] text-slate-400 font-mono">
                            {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-slate-600">
                          <div>
                            <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Phone</span>
                            <span className="font-semibold">{notif.mobileNumber}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Doctor</span>
                            <span className="font-semibold text-teal-700">{notif.doctor}</span>
                          </div>
                          <div className="mt-1">
                            <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Date</span>
                            <span className="font-semibold">{notif.appointmentDate}</span>
                          </div>
                          <div className="mt-1">
                            <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Time</span>
                            <span className="font-semibold">{notif.appointmentTime}</span>
                          </div>
                        </div>

                        {!notif.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notif.id)}
                            className="mt-1 self-start py-1 px-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 text-[9px] font-black uppercase tracking-wider rounded-md border-none transition cursor-pointer"
                            id={`btn-mark-read-${notif.id}`}
                          >
                            Mark Read
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Real-time Sliding Toast Popup Alert */}
        <AnimatePresence>
          {activeToast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 overflow-hidden font-sans"
              id="realtime-toast-alert"
            >
              <div className="p-5 space-y-3.5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider font-mono">
                      New Realtime Booking
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveToast(null)}
                    className="p-1 text-slate-400 hover:text-white rounded-lg transition cursor-pointer bg-transparent border-none"
                    id="btn-close-toast"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-black text-white uppercase tracking-wide">
                    {activeToast.patientName}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    A new appointment slot has been requested and successfully inserted!
                  </p>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[8px] text-slate-500 block font-bold uppercase tracking-widest">Doctor</span>
                    <span className="font-bold text-slate-200">{activeToast.doctor}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 block font-bold uppercase tracking-widest">Mobile</span>
                    <span className="font-bold text-slate-200">{activeToast.mobileNumber}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 block font-bold uppercase tracking-widest">Date</span>
                    <span className="font-bold text-slate-200">{activeToast.appointmentDate}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 block font-bold uppercase tracking-widest">Time</span>
                    <span className="font-bold text-slate-200">{activeToast.appointmentTime}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handleMarkAsRead(activeToast.id);
                      setActiveToast(null);
                    }}
                    className="flex-1 py-2 bg-[#0D9488] hover:bg-[#0b7e74] text-white text-[10px] font-extrabold uppercase tracking-widest rounded-lg transition-all text-center cursor-pointer border-none shadow-3xs"
                    id="toast-btn-acknowledge"
                  >
                    Acknowledge
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                      {["Dental Implants", "Invisible Aligners", "Full Mouth Rehab"].map((s, i) => (
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

      {/* 5. Dedicated Service Editor Page */}
      {editingService && (
        <div className="fixed inset-0 z-[140] bg-slate-50 flex flex-col overflow-hidden animate-fade-in" id="service-editor-page">
          <div className="relative bg-white flex-grow flex flex-col w-full h-full">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-xs font-bold shadow-3xs cursor-pointer transition duration-150 shrink-0"
                >
                  <ArrowLeft className="h-3.5 w-3.5 text-slate-500" />
                  <span>← Back to Services</span>
                </button>
                <div className="min-w-0 hidden sm:block">
                  <h3 className="font-display font-extrabold text-[#081C3A] text-xs leading-tight">
                    Edit {editingService.title || "Service"} CMS
                  </h3>
                  <p className="text-slate-500 text-[10px] font-medium mt-0.5 truncate flex items-center gap-1">
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
            {/* Content area */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6">
              <div className="max-w-6xl mx-auto pb-12">
                <UnifiedServiceCms serviceSlug={editingService.slug} onSaveSuccess={loadServicesList} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
