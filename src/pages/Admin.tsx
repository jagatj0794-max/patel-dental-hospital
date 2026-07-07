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
  Mail
} from 'lucide-react';
import { PageId, Doctor, PatientMoment, ContactInfo, DentalVideo } from '../types';
import { Plus, Pencil, Save, X as CloseIcon, ArrowLeft, CalendarDays } from 'lucide-react';
import { safeStorage } from '../utils/storage';
import { supabase } from '../utils/supabase';
import { uploadImage } from '../utils/supabaseStorage';
import { heroService } from '../utils/heroData';
import { doctorService } from '../utils/doctorData';
import { galleryService } from '../utils/galleryData';
import { videoService } from '../utils/videoData';
import { contactService } from '../utils/contactData';
import Appointments from './Appointments';

interface AdminProps {
  setCurrentPage: (page: PageId) => void;
  heroHeading: string;
  setHeroHeading: (val: string) => void;
  heroDescription: string;
  setHeroDescription: (val: string) => void;
  heroBgImage: string;
  setHeroBgImage: (val: string) => void;
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

type SidebarTab = 'dashboard' | 'hero' | 'doctors' | 'media' | 'appointments' | 'contact';

export default function Admin({ 
  setCurrentPage, 
  heroHeading, 
  setHeroHeading, 
  heroDescription, 
  setHeroDescription, 
  heroBgImage, 
  setHeroBgImage,
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

  // Synchronize draft states when parent props change (e.g. once loaded from Supabase)
  useEffect(() => {
    setDraftHeading(heroHeading);
    setDraftDescription(heroDescription);
    setDraftBgImage(heroBgImage);
  }, [heroHeading, heroDescription, heroBgImage]);

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

  // Tabs config
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'hero', label: 'Hero', icon: Sparkles },
    { id: 'doctors', label: 'Doctors', icon: Users },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'appointments', label: 'Appointments', icon: CalendarDays },
    { id: 'contact', label: 'Contact', icon: Phone },
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
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
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

  const handleFile = async (file: File) => {
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
      setDraftBgImage(imageUrl);
      setSaveMessage('Hero background image uploaded successfully!');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err: any) {
      console.warn('Supabase storage upload failed, falling back to local Base64 storage:', err);
      try {
        const localDataUrl = await readFileAsDataURL(file);
        setDraftBgImage(localDataUrl);
        setSaveMessage('Notice: The image was loaded locally because the Supabase storage connection is restricted or offline. Your background will still render and persist correctly on this device.');
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

  // Save changes
  const handleSave = async () => {
    setSaveMessage('Saving Hero content to Supabase...');
    try {
      const success = await heroService.saveHeroContent({
        heading: draftHeading,
        description: draftDescription,
        bg_image: draftBgImage
      });

      if (success) {
        setHeroHeading(draftHeading);
        setHeroDescription(draftDescription);
        setHeroBgImage(draftBgImage);
        setSaveMessage('Hero section saved to Supabase successfully! Your website is updated.');
      } else {
        setSaveMessage('Failed to save Hero content to Supabase. Check your connection or table setup.');
      }
    } catch (err: any) {
      console.error('Error saving Hero content to Supabase:', err);
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
                    <span>Gayatrinagar & Mavdi HQ</span>
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

              {/* Background Image Upload Zone */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Hero Background Image
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
                        Drag and drop your background image here, or{' '}
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
                      Active Image Preview
                    </span>

                    {draftBgImage ? (
                      <div className="space-y-3 flex-grow flex flex-col justify-between">
                        <div className="relative rounded-lg overflow-hidden border border-slate-200 h-[100px] w-full bg-slate-100 shadow-3xs">
                          <img 
                            src={draftBgImage} 
                            alt="Custom Background Preview" 
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
                            <Check className="h-3.5 w-3.5" /> Custom image loaded
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
                        <p className="text-[11px] font-medium">Using hospital standard template images</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">(/parel doctor.png and /patel mobile hero.jpeg)</p>
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
            branch: 'Mavdi Branch',
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
          try {
            const success = await doctorService.saveDoctors(draftDoctors);
            if (success) {
              setDoctorsList(draftDoctors);
              setSaveMessage('Doctors directory saved to Supabase successfully! Public website updated.');
            } else {
              setSaveMessage('Failed to save doctors to Supabase. Check your connection or table setup.');
            }
          } catch (err: any) {
            console.error('Error saving doctors to Supabase:', err);
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
                          <option value="Mavdi Branch">Mavdi Branch</option>
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
                          <option value="Mavdi Branch">Mavdi Branch</option>
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
                    placeholder="e.g. +91 79900 62009"
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
                    placeholder="e.g. +917990062009"
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
                    placeholder="e.g. +91 79900 62009"
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
                    placeholder="e.g. 917990062009"
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
    }
  };

  return (
    <div id="admin-panel-container" className="min-h-[calc(100vh-72px)] bg-slate-50 font-sans flex flex-col lg:flex-row relative">
      
      {/* MOBILE HEADER FOR SIDEBAR TOGGLE */}
      <div className="lg:hidden w-full bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between relative z-30 shrink-0">
        <div className="flex items-center space-x-2">
          <img 
            src="/patel-logo-vector.svg" 
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
              src="/patel-logo-vector.svg" 
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
                      src={draftBgImage || "/patel mobile hero.jpeg"} 
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

    </div>
  );
}
