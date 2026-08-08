/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Sparkles, Award, Star, ArrowRight, Video, Calendar, PhoneCall, 
  HelpCircle, HardDrive, CheckCircle, MessageCircle, Phone, Smile, Users, Activity,
  Stethoscope, Cpu, X, Maximize2, Eye, Heart, ChevronLeft, ChevronRight, Phone as PhoneIcon,
  ChevronDown, MapPin, Clock, Mail, ExternalLink, Trophy, Instagram
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, PatientMoment, ContactInfo, Service, AwardItem } from '../types';
import { serviceService, DEFAULT_GREEN_HIGHLIGHT_LINE, DEFAULT_RCT_GREEN_HIGHLIGHT_LINE } from '../utils/serviceData';
import { awardsService } from '../utils/awardsData';
import { supabase, isSupabaseConfigured } from '../utils/supabase';
import { InstagramEmbed } from '../components/InstagramEmbed';
import { Mp4ReelPlayer } from '../components/Mp4ReelPlayer';

// Custom SVG Premium Dental-Specific Representation Icons
const DentalImplantIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 3c-1.2 0-2.4.8-2.4 2.2 0 2.2 1.2 3.2 1.6 5.3C5.6 12 5 13 5 14h14c0-1-.6-2-.2-3.5.4-2.1 1.6-3.1 1.6-5.3 0-1.4-1.2-2.2-2.4-2.2-1.6 0-2.4 1-4 1s-2.4-1-4-1z" />
    <path d="M12 14v4M10 18h4" />
    <path d="M10 20l4-1" strokeWidth="1.5" />
    <path d="M10 22l4-1" strokeWidth="1.5" />
  </svg>
);

const FullMouthIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 14a7 7 0 0 1 14 0" />
    <path d="M7 14c0-2.8 2.2-5 5-5s5 2.2 5 5" />
    <path d="M12 9V5" />
    <path d="M9.5 10.5L7.5 8" />
    <path d="M14.5 10.5l2-2.5" />
    <circle cx="12" cy="4" r="1.5" />
    <circle cx="7" cy="7" r="1.5" />
    <circle cx="17" cy="7" r="1.5" />
    <path d="M22 22v-2a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v2" />
  </svg>
);

const RootCanalIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 3c-1 0-1.8.4-2.4 1-.6-.6-1.4-1-2.4-1s-1.8.4-2.4 1c-.6-.6-1.4-1-2.4-1S6.6 3.4 6 4C6 6 7 8 7 11c0 3-3 4.5-3 7s3 4 5 4c3 0 2-4.5 3-4.5s0 4.5 3 4.5c2 0 5-1.5 5-4s-3-4-3-7c0-3 1-5 1-7 0-.6-.4-1.2-1-1.2z" />
    <path d="M12 7v5" strokeWidth="1.5" />
    <path d="M12 12c-0.8 1.2-1.5 2.2-1.5 4.5" strokeWidth="1.5" />
    <path d="M12 12c0.8 1.2 1.5 2.2 1.5 4.5" strokeWidth="1.5" />
  </svg>
);

const ClearAlignerIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3a8 8 0 0 0-8 8c0 3 1.5 4.5 2 7.5.2 1.2-.5 2.5-.2 3.5.2.8.8 1 1.6 1 .8 0 2.2-1.5 2.6-3.5C10.5 17 11.2 16 12 16s1.5 1 2 3.5c.4 2 1.8 3.5 2.6 3.5.8 0 1.4-.2 1.6-1 .3-1-.4-2.3-.2-3.5.5-3 2-4.5 2-7.5a8 8 0 0 0-8-8z" />
    <path d="M7 11s2-1 5-1 5 1 5 1" strokeDasharray="2 2" />
    <path d="M8 15h8" strokeWidth="1.5" />
    <path d="M12 6V4" />
    <path d="M12 14v2" />
  </svg>
);

const SmileMakeoverIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 11c0 3.87 3.13 7 7 7s7-3.13 7-7" />
    <path d="M7 11h10" />
    <path d="M12 11V7" strokeWidth="1.5" />
    <path d="M15 11l1-2.5" strokeWidth="1.5" />
    <path d="M9 11L8 8.5" strokeWidth="1.5" />
    <path d="M19 4a.5.5 0 0 1 .5.5c0 .33-.3.5-.5.5h-.5a.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5h.5z" fill="currentColor" />
    <path d="M18 2l.5 1.5L20 4l-1.5.5L18 6l-.5-1.5L16 4l1.5-.5z" fill="currentColor" stroke="none" />
    <path d="M4 6l.5 1.5L6 8l-1.5.5L4 10l-.5-1.5L2 8l1.5-.5z" fill="currentColor" stroke="none" />
  </svg>
);

const CrownsBridgesIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 6l3 9h12l3-9-4 3-4-4-4 4-4-3z" />
    <path d="M6 15v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4" />
    <path d="M10 15v4" strokeWidth="1.5" />
    <path d="M14 15v4" strokeWidth="1.5" />
  </svg>
);

const TeethWhiteningIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5c-1.5 0-3 .5-3 3 0 2.5 1 4 1 6.5 0 2.5-2.5 3.5-2.5 5 0 .8.7 1.5 1.5 1.5 1.5 0 1-2 3-2s1.5 2 3 2c.8 0 1.5-.7 1.5-1.5 0-1.5-2.5-2.5-2.5-5 0-2.5 1-4 1-6.5 0-2.5-1.5-3-3-3z" />
    <path d="M18 4l.5 1.5L20 6l-1.5.5L18 8l-.5-1.5L16 6l1.5-.5z" fill="currentColor" stroke="none" />
    <path d="M6 7l.25 1L7 8.25l-.75.25L6 9.25l-.25-1L5 8.25l.75-.25z" fill="currentColor" stroke="none" />
  </svg>
);

const PediatricDentistryIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5c-1.5 0-3 .5-3 3 0 2.5 1 4 1 6.5 0 2.5-2.5 3.5-2.5 5 0 .8.7 1.5 1.5 1.5 1.5 0 1-2 3-2s1-2 3-2c1.5 0 1 2 3 2c.8 0 1.5-.7 1.5-1.5 0-1.5-2.5-2.5-2.5-5 0-2.5 1-4 1-6.5 0-2.5-1.5-3-3-3z" />
    <path d="M10 9a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" fill="currentColor" stroke="none" />
    <path d="M15 9a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" fill="currentColor" stroke="none" />
    <path d="M10.5 11.5c.5.5 1 .8 1.5.8s1-.3 1.5-.8" />
    <path d="M6 5l.5 1L8 6.5 7 7l-.5 1-.5-1-1-.5 1-.5z" fill="currentColor" stroke="none" />
    <path d="M18 6l.25.75.75.25-.75.25-.25.75-.25-.75-.75-.25.75-.25z" fill="currentColor" stroke="none" />
  </svg>
);

const BracesTreatmentIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 11c0 3.87 3.13 7 7 7s7-3.13 7-7" />
    <path d="M4 11h16" />
    <path d="M7 9v4" />
    <path d="M12 9v4" />
    <path d="M17 9v4" />
    <rect x="6" y="10" width="2" height="2" fill="currentColor" />
    <rect x="11" y="10" width="2" height="2" fill="currentColor" />
    <rect x="16" y="10" width="2" height="2" fill="currentColor" />
  </svg>
);

const WisdomToothSurgeryIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5c-1.5 0-3 .5-3 3 0 2.5 1 4 1 6.5 0 2.5-2.5 3.5-2.5 5 0 .8.7 1.5 1.5 1.5 1.5 0 1-2 3-2s1-2 3-2c1.5 0 1 2 3 2c.8 0 1.5-.7 1.5-1.5 0-1.5-2.5-2.5-2.5-5 0-2.5 1-4 1-6.5 0-2.5-1.5-3-3-3z" />
    <path d="M19 5h-4v4h4V5z" strokeWidth="1" />
    <path d="M17 3v8" />
    <path d="M13 7h8" />
  </svg>
);

const ToothColouredFillingIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5c-1.5 0-3 .5-3 3 0 2.5 1 4 1 6.5 0 2.5-2.5 3.5-2.5 5 0 .8.7 1.5 1.5 1.5 1.5 0 1-2 3-2s1-2 3-2c1.5 0 1 2 3 2c.8 0 1.5-.7 1.5-1.5 0-1.5-2.5-2.5-2.5-5 0-2.5 1-4 1-6.5 0-2.5-1.5-3-3-3z" />
    <path d="M12 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" fill="currentColor" stroke="none" />
    <path d="M18 5l1.5 1.5L21 5l-1.5-1.5z" fill="currentColor" stroke="none" />
  </svg>
);
const clinicInterior = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800';
const heroBannerBg = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200';
const doctorsImg = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800';
import AnimatedCounter from '../components/AnimatedCounter';
const sameDayTeethImg = 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800';
const dentalImplantsImg = 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800';
const fullMouthRehabImg = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800';
const clearAlignersImg = 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=800';
const rootCanalImg = 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800';
const smileMakeoverImg = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800';
const crownsBridgesImg = 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800';
const teethCleaningImg = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800';
const kidsDentistryImg = 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800';
const bracesImg = 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=800';
const wisdomToothImg = 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800';
const compositeFillingImg = 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800';
const fdaApprovedImplantImg = 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800';

const patelDentistPatient1 = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800';
const patelReceptionLounge = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800';
import { GALLERY_ITEMS } from '../data/gallery';
import { PATIENT_MOMENTS } from '../data/patientMoments';
import PatientMomentsGallery from '../components/PatientMomentsGallery';



const faqData = [
  {
    question: "Why is Patel Dental Hospital considered the best dental hospital in Rajkot?",
    answer: "Patel Dental Hospital is recognized as the best dental hospital in Rajkot and Gujarat due to its advanced 3D CBCT imaging, experienced specialists (including chief implantologists and root canal specialists), international sterilization standards, and over 45,000 satisfied patients."
  },
  {
    question: "How long does a dental implant treatment take at a dental implant hospital in Rajkot?",
    answer: "The complete dental implant process can take a few weeks to a few months depending on healing time and individual cases. At Patel Dental Hospital, a premier dental implant hospital in Rajkot, we also offer immediate loading fixed teeth options where applicable."
  },
  {
    question: "Are dental implant procedures painful?",
    answer: "Dental implant procedures at our dental clinic in Rajkot are performed under advanced local anesthesia and micro-surgical protocols, ensuring a virtually painless and comfortable treatment experience."
  },
  {
    question: "How long do dental implants last?",
    answer: "With proper oral care and regular checkups at our advanced dental clinic in Rajkot, dental implants can last for many decades and often a lifetime."
  },
  {
    question: "What is Full Mouth Rehabilitation and Smile Makeover in Rajkot?",
    answer: "Full Mouth Rehabilitation and Smile Makeover in Rajkot involve comprehensive restorative and cosmetic dentistry treatments that rebuild damaged teeth, restore joint function, and create a aesthetic, confident smile."
  },
  {
    question: "Are Invisible Aligners better than traditional braces for aligner treatment in Rajkot?",
    answer: "Invisible aligners are transparent, removable, and comfortable, making them a popular modern orthodontic alternative to traditional metal braces for teenagers and adults seeking discrete teeth alignment."
  },
  {
    question: "Do you have a root canal specialist and in-house 3D CBCT scanning in Rajkot?",
    answer: "Yes, Patel Dental Hospital features an experienced root canal specialist in Rajkot and state-of-the-art in-house 3D CBCT scanning technology for precise single-sitting root canal treatment and implant surgery."
  },
  {
    question: "How can I book an appointment at the best dental clinic in Rajkot?",
    answer: "You can book an appointment by calling our Rajkot hotline directly at +91 9510397046, reaching out via WhatsApp, or filling out the online consultation form on our website."
  }
];

interface HomeProps {
  setCurrentPage: (page: PageId) => void;
  openAppointmentModal: () => void;
  heroHeading?: string;
  heroDescription?: string;
  heroBgImage?: string;
  heroBgImageMobile?: string;
  mediaImages?: Array<{ id: string; url: string; title: string; category: string; branch: string; altText?: string }>;
  patientMoments?: PatientMoment[];
  videosList?: Array<{ id: string; title: string; treatment: string; videoPlatform?: 'youtube' | 'instagram' | 'mp4' }>;
  contactInfo?: ContactInfo;
}

export default function Home({ 
  setCurrentPage, 
  openAppointmentModal,
  heroHeading = "Dental Implant, Aligner &\nFMR Specialists\nin Rajkot",
  heroDescription = "Trusted smiles. Advanced care. Exceptional results.",
  heroBgImage = "",
  heroBgImageMobile = "",
  mediaImages = [],
  patientMoments,
  videosList = [],
  contactInfo
}: HomeProps) {
  const momentsToRender = patientMoments !== undefined ? patientMoments : PATIENT_MOMENTS;
  const phoneRaw = contactInfo?.phoneRaw || '+919510397046';
  const whatsappRaw = contactInfo?.whatsappRaw || '919510397046';
  const displayPhone = contactInfo?.phone || '+91 9510397046';
  const displayWhatsapp = contactInfo?.whatsapp || '+91 9510397046';

  const rawVideos = videosList && videosList.length > 0 ? videosList : [
    { id: 'cyai6CjMD0s', title: 'Dental Implants Treatment Experience', treatment: 'Dental Implants', videoPlatform: 'youtube' },
    { id: 'SnOxxv_S2ew', title: 'Full Mouth Rehabilitation Success Story', treatment: 'Full Mouth Rehab', videoPlatform: 'youtube' },
    { id: '2okui6RFf_k', title: 'Life-changing Invisible Aligners Transformation', treatment: 'Invisible Aligners', videoPlatform: 'youtube' },
    { id: '-eoVpGDqCRs', title: 'Patient Testimonial on Digital Dental Care', treatment: 'Advanced Dental Care', videoPlatform: 'youtube' },
    { id: 'VZyPnTzlR9U', title: 'Complete Smile Makeover & Dental Implants', treatment: 'Smile Makeover', videoPlatform: 'youtube' },
    { id: 'DBejq69FOGI', title: 'Painless Treatment and Care Experience', treatment: 'General Dentistry', videoPlatform: 'youtube' }
  ];

  const videosToRender = rawVideos.map(v => {
    const isMp4 = v.videoPlatform === 'mp4' || v.platform === 'mp4' || v.id.endsWith('.mp4') || v.id.includes('supabase.co');
    const isInstagram = !isMp4 && (v.videoPlatform === 'instagram' || v.platform === 'instagram' || v.id === 'DbS7_fJMTYC' || (v.title && v.title.toLowerCase().includes('instagram')));
    const platform = isMp4 ? ('mp4' as const) : (isInstagram ? ('instagram' as const) : ('youtube' as const));
    const url = platform === 'mp4' ? v.id : (platform === 'instagram' ? `https://www.instagram.com/p/${v.id}/` : `https://www.youtube.com/watch?v=${v.id}`);
    return {
      ...v,
      videoPlatform: platform,
      platform: platform,
      url: url
    };
  });
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedMomentIndex, setSelectedMomentIndex] = useState<number | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [activeMapBranch, setActiveMapBranch] = useState<'amin_marg' | 'gayatrinagar'>('amin_marg');

  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});

  const [dbServices, setDbServices] = useState<Service[]>([]);
  const [awardsList, setAwardsList] = useState<AwardItem[]>([]);
  const [detectedOrientations, setDetectedOrientations] = useState<Record<string, 'horizontal' | 'vertical'>>({});

  useEffect(() => {
    if (!awardsList || awardsList.length === 0) return;
    
    awardsList.forEach(item => {
      if (!item.image_url) return;
      if (detectedOrientations[item.id]) return;

      const img = new window.Image();
      img.referrerPolicy = "no-referrer";
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const orientation = height > width ? 'vertical' : 'horizontal';
        setDetectedOrientations(prev => ({
          ...prev,
          [item.id]: orientation
        }));
      };
      img.onerror = () => {
        setDetectedOrientations(prev => ({
          ...prev,
          [item.id]: item.orientation || 'horizontal'
        }));
      };
      img.src = item.image_url;
    });
  }, [awardsList]);

  const horizontalAwards = awardsList.filter(item => {
    const detected = detectedOrientations[item.id];
    if (detected) {
      return detected === 'horizontal';
    }
    return item.orientation === 'horizontal' || !item.orientation;
  });

  const verticalAwards = awardsList.filter(item => {
    const detected = detectedOrientations[item.id];
    if (detected) {
      return detected === 'vertical';
    }
    return item.orientation === 'vertical';
  });

  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedAward(null);
      }
    };
    if (selectedAward) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedAward]);

  useEffect(() => {
    if (selectedAward) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedAward]);

  React.useEffect(() => {
    serviceService.getServices().then(res => {
      if (res) {
        setDbServices(res);
      }
    }).catch(err => {
      console.error("Error loading services for home page:", err);
    });

    awardsService.getAwards().then(res => {
      setAwardsList(res || []);
    }).catch(err => {
      console.error("Error loading awards for home page:", err);
    });
  }, []);

  const getCardData = (defaultSlug: string, defaultTitle: string, defaultImage: string, id?: string) => {
    const lookupSlugs = [
      defaultSlug,
      defaultSlug.replace(/-and-/g, '-'),
      defaultSlug.replace(/-bridges/g, '-bridges'),
      defaultSlug === 'invisible-aligners' ? 'clear-aligners' : null,
      defaultSlug === 'pediatric-dentistry' ? 'kids-dentistry' : null,
      defaultSlug === 'tooth-coloured-filling' ? 'tooth-coloured-filling' : null,
      defaultSlug === 'wisdom-tooth-surgery' ? 'wisdom-tooth-surgery' : null,
    ].filter(Boolean) as string[];

    const dbSvc = dbServices.find(s => 
      (id && s.id === id) ||
      lookupSlugs.includes(s.slug) || 
      s.title.toLowerCase() === defaultTitle.toLowerCase()
    );

    const mConfig = dbSvc ? (typeof dbSvc.marketing_config === 'string'
      ? (() => { try { return JSON.parse(dbSvc.marketing_config) } catch(e) { return {} } })()
      : (dbSvc.marketing_config || {})
    ) : {};

    // Helper to extract first 2-3 sentences safely
    const getSentenceFallback = (text: string | null | undefined): string | null => {
      if (!text) return null;
      // Strip common markdown elements
      const cleanText = text
        .replace(/[*#`_\-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (!cleanText) return null;
      
      const sentences = cleanText
        .split(/(?<=[.!?])\s+/)
        .map(s => s.trim())
        .filter(s => s.length > 0);
        
      if (sentences.length === 0) return null;
      return sentences.slice(0, 3).join(' ');
    };

    const isDentalImplants = defaultSlug === 'dental-implants' || dbSvc?.slug === 'dental-implants';
    const isRootCanal = defaultSlug === 'root-canal-treatment' || dbSvc?.slug === 'root-canal-treatment';

    const homepageDesc = dbSvc?.homepage_short_description?.trim()
      ? dbSvc.homepage_short_description.trim()
      : (isDentalImplants
          ? "Dental implant is an artificial tooth placed in your mouth for better chewing efficiency and enhance patient's smile and life.\n\nIt is ideal for replacement of missing and loose teeth due to pyorrhea.\n\nPatel Dental Hospital provides fixed teeth in just one week with best dental implant."
          : getSentenceFallback(dbSvc?.description || dbSvc?.short_description));

    const greenHighlightLine = mConfig.green_highlight_line !== undefined 
      ? mConfig.green_highlight_line 
      : (isDentalImplants 
          ? DEFAULT_GREEN_HIGHLIGHT_LINE 
          : (isRootCanal ? DEFAULT_RCT_GREEN_HIGHLIGHT_LINE : ""));

    return {
      title: dbSvc?.title || defaultTitle,
      image: dbSvc?.homepage_card_image || dbSvc?.hero_image || defaultImage,
      shortDesc: homepageDesc,
      slug: dbSvc?.slug || defaultSlug,
      isActive: dbSvc ? dbSvc.is_active : true,
      mConfig,
      greenHighlightLine
    };
  };

  return (
    <div id="home-page-view" className="relative pt-0 bg-gradient-to-b from-sky-100/40 via-sky-50/20 to-transparent">

      {/* 1 & 2. Hero Section & BOTTOM TRUST BAR */}
      <section className="relative z-30 w-full bg-[#FAFAFC] pb-0 lg:pb-0" id="immersive-clinical-hero">
        
        {/* DESKTOP HERO VIEW (ONLY visible on desktop/large tablet screens) */}
        <div className="hidden lg:flex relative w-full h-[900px] min-h-[810px] flex-col justify-between pt-[140px] pb-0">
          {/* Background Image & Wide Gradient Overlay */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
            {/* 
              TODO:
              Replace hero collage with doctor's original photo / hospital photo / staff photo once assets are provided.
            */}
            <img
              src={heroBgImage || "/parel doctor.png"}
              alt="Dr. Jaimin Patel and Dr. Kinjal Patel at Patel Dental Hospital reception"
              className="w-full h-full object-cover object-top lg:object-[right_top]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-20 flex flex-col justify-between flex-grow h-full">
            {/* Left Content Area - 31.5% width, shifted 90px to the right */}
            <div className="w-full lg:w-[31.5%] flex flex-col justify-center flex-grow pt-4 pb-12 pr-4 z-20 lg:ml-[90px] relative">
              
              {/* 1. Small trust badge */}
              <span className="inline-flex items-center px-7 py-[11px] rounded-full bg-white border border-[#C9A96E] text-[#1E3A5F] font-extrabold text-[13px] md:text-[14.5px] leading-relaxed uppercase tracking-widest shadow-md mb-4 lg:mb-8 animate-fade-in">
                <span className="text-[29px] leading-none shrink-0 mr-[14px] select-none">🏆</span> Awarded as Best Dental Hospital in India by FAMDENT
              </span>

              {/* 2. Headline */}
              <div className="flex flex-col text-left space-y-2 lg:space-y-3 max-w-[550px]">
                {/* Main Heading */}
                <h1 className="font-display text-[19px] sm:text-[24px] md:text-[28px] lg:text-[31px] xl:text-[35px] leading-[1.15] font-black text-[#1E3A5F] tracking-tight uppercase whitespace-nowrap">
                  WORLD CLASS{" "}
                  <span className="relative inline-block text-[#00897B]">
                    DENTAL CARE
                    {/* Subtle underline accent */}
                    <div className="absolute -bottom-1 lg:-bottom-1.5 left-0 w-full h-[3px] md:h-[4px] bg-[#C9A96E] rounded-full" />
                  </span>
                </h1>
                {/* Secondary Heading */}
                <div className="font-display text-sm sm:text-base lg:text-[17px] font-bold text-[#1E3A5F] leading-snug pt-1">
                  Best Dental Hospital In India <br className="hidden sm:inline" />
                  <span className="text-[#00897B] font-extrabold">Fix Teeth In Just One Week With Dental Implant</span>
                </div>
              </div>

              {/* Desktop-only Quick Information Cards section */}
              <div className="hidden lg:grid grid-cols-2 gap-3.5 w-[430px] xl:w-[460px] max-w-none mt-5 mb-6 relative z-30">
                {/* CARD 1 */}
                <div className="flex flex-col justify-center bg-[#1E3A5F] text-white px-4 py-3 xl:px-4.5 xl:py-3.5 rounded-[16px] shadow-md border border-[#1E3A5F] h-[135px] xl:h-[140px]">
                  <div>
                    <h3 className="font-display text-[15px] xl:text-[16px] font-extrabold tracking-wide uppercase text-white mb-1.5 leading-tight">
                      Need Dental Consultation?
                    </h3>
                    <p className="font-sans text-[12.5px] xl:text-[13.5px] text-white/80 font-medium">
                      Please Call Us
                    </p>
                    <p className="font-display text-[18px] xl:text-[20px] font-extrabold text-[#C9A96E] mt-1.5">
                      +91 9510397046
                    </p>
                  </div>
                </div>

                {/* CARD 2 */}
                <div className="flex flex-col justify-center bg-[#E6F6F4] px-4 py-3 xl:px-4.5 xl:py-3.5 rounded-[16px] shadow-md border border-[#E6F6F4]/50 h-[135px] xl:h-[140px]">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Clock className="h-4 w-4 text-[#00897B] shrink-0" />
                      <h3 className="font-display text-[15px] xl:text-[16px] font-extrabold tracking-wide uppercase text-[#1E3A5F] leading-tight">
                        Working Hours
                      </h3>
                    </div>
                    <div className="space-y-1">
                      <div>
                        <div className="text-[#1E3A5F] font-extrabold text-[12px] xl:text-[13px]">Monday – Saturday</div>
                        <div className="text-[#4B5563] text-[11px] xl:text-[12px] font-semibold leading-snug">
                          09:00 AM – 01:00 PM<br />
                          04:00 PM – 08:00 PM
                        </div>
                      </div>
                      <div>
                        <div className="text-[#1E3A5F] font-extrabold text-[12px] xl:text-[13px]">
                          Sunday: <span className="text-[#00897B] font-black">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two CTA buttons positioned exactly below description/trust statement */}
              <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row items-center justify-start gap-4 w-full max-w-[450px]">
                <button
                  id="hero-primary-cta"
                  onClick={openAppointmentModal}
                  className="h-[56px] px-8 w-full sm:flex-1 bg-[#00897B] hover:bg-[#00796B] text-white text-[16.5px] font-extrabold rounded-[16px] shadow-[0_12px_30px_rgba(0,137,123,0.22)] hover:shadow-[0_15px_35px_rgba(0,137,123,0.32)] cursor-pointer transform hover:-translate-y-[3px] active:scale-98 transition-all duration-300 flex items-center justify-center space-x-2.5 border border-white/10 relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[50%] before:bg-gradient-to-b before:from-white/15 before:to-transparent before:pointer-events-none"
                >
                  <Calendar className="h-5 w-5 shrink-0" />
                  <span className="whitespace-nowrap">Free Consultation</span>
                </button>

                <a
                  href={`https://wa.me/${whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-[56px] w-full sm:flex-1 bg-white hover:bg-[#00897B]/5 text-[#00897B] text-[16.5px] font-extrabold rounded-[16px] border-2 border-[#00897B] hover:border-[#00796B] shadow-[0_10px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] cursor-pointer flex items-center justify-center space-x-2.5 transform hover:-translate-y-[3px] active:scale-98 transition-all duration-300"
                >
                  <MessageCircle className="h-5 w-5 fill-[#00897B]/10 shrink-0 text-[#00897B]" strokeWidth={2.5} />
                  <span className="whitespace-nowrap">WhatsApp Us</span>
                </a>
              </div>

              {/* 5. 60-80px vertical spacing after CTA buttons before the floating trust bar */}
              <div className="h-6 lg:h-[70px] pointer-events-none" />

            </div>
          </div>
        </div>

        {/* DEDICATED MOBILE & TABLET HERO VIEW (ONLY visible on mobile/tablet screens lg:hidden) */}
        <div className="block lg:hidden relative w-full h-[660px] sm:h-[740px] md:h-[800px] overflow-hidden bg-white pt-[108px] sm:pt-[124px]">
          {/* Main Background Image - Containing doctors, reception desk on left, logo wall on right */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
            {/* 
              TODO:
              Replace hero collage with doctor's original photo / hospital photo / staff photo once assets are provided.
            */}
            {/* Mobile background (< 768px/md) */}
            <img 
              src={heroBgImageMobile || heroBgImage || "/patel mobile hero.jpeg"} 
              alt="Dr. Vipul Patel and Dr. Kinjal Patel" 
              className="block md:hidden w-full h-full object-cover object-[center_top]"
              referrerPolicy="no-referrer"
            />
            {/* Tablet background (>= 768px/md up to lg) */}
            <img 
              src={heroBgImage || "/parel doctor.png"} 
              alt="Dr. Vipul Patel and Dr. Kinjal Patel at Patel Dental Hospital reception" 
              className="hidden md:block w-full h-full object-cover object-[center_top]"
              referrerPolicy="no-referrer"
            />

          </div>

          <div className="max-w-xl mx-auto flex flex-col items-center text-center space-y-3.5 px-4 sm:px-6 relative z-10 pt-3 sm:pt-4 pb-4">
            
            {/* 2. Headline */}
            <div className="flex flex-col text-center space-y-1 max-w-[450px]">
              {/* Main Heading */}
              <h1 className="font-display text-[16px] sm:text-[19px] leading-[1.2] font-black text-[#1E3A5F] tracking-tight uppercase whitespace-nowrap">
                WORLD CLASS <span className="text-[#00897B]">DENTAL CARE</span>
              </h1>
              {/* Secondary Heading */}
              <div className="font-display text-[11px] sm:text-[12.5px] font-extrabold text-[#1E3A5F] leading-snug">
                Best Dental Hospital In India <br />
                <span className="text-[#00897B] font-extrabold">Fix Teeth In Just One Week With Dental Implant</span>
              </div>
            </div>

            {/* 4 & 5. Buttons below description, horizontal row of two equal buttons with improved styling */}
            <div className="w-full flex flex-row items-center justify-center gap-2 max-w-[340px] sm:max-w-[380px] mx-auto">
              <button
                onClick={openAppointmentModal}
                className="h-[46px] sm:h-[50px] flex-1 bg-[#00897B] hover:bg-[#00796B] text-white text-[11px] sm:text-[12.5px] font-extrabold rounded-[14px] sm:rounded-[16px] shadow-[0_6px_15px_rgba(0,137,123,0.15)] hover:shadow-[0_10px_20px_rgba(0,137,123,0.25)] cursor-pointer flex items-center justify-center space-x-1.5 border border-white/10 relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[50%] before:bg-gradient-to-b before:from-white/15 before:to-transparent before:pointer-events-none transform hover:-translate-y-[2px] active:scale-98 transition-all duration-300"
              >
                <Calendar className="h-[14px] w-[14px] shrink-0" />
                <span className="whitespace-nowrap">Free Consultation</span>
              </button>

              <a
                href={`https://wa.me/${whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[46px] sm:h-[50px] flex-1 bg-white text-[#00897B] text-[11px] sm:text-[12.5px] font-extrabold rounded-[14px] sm:rounded-[16px] border-2 border-[#00897B] hover:border-[#00796B] hover:bg-[#00897B]/5 shadow-[0_5px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)] cursor-pointer flex items-center justify-center space-x-1.5 transform hover:-translate-y-[2px] active:scale-98 transition-all duration-300"
              >
                <MessageCircle className="h-[14px] w-[14px] shrink-0 fill-[#00897B]/10 text-[#00897B]" strokeWidth={2.5} />
                <span className="whitespace-nowrap">WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Compact Premium Visit Info Card for Mobile/Tablet (Visible on lg:hidden) - Floats over the hero image bottom border */}
        <div className="block lg:hidden px-4 relative z-20 -mt-10 sm:-mt-14 pb-6">
          <div 
            className="w-full max-w-md mx-auto rounded-[20px] overflow-hidden bg-white border border-[#E5E7EB] shadow-md flex flex-col"
          >
            {/* SECTION 1 (Emergency Call) */}
            <div className="bg-[#1E3A5F] p-6 text-center text-white flex flex-col items-center">
              <h3 className="font-display font-bold text-[18px] sm:text-[20px] leading-tight text-[#FFFFFF] mb-3 max-w-[280px]">
                Call us for Emergency Dental Treatment
              </h3>
              <span className="text-[11px] font-bold text-[#E6F6F4] tracking-widest uppercase mb-1">
                Please Call Us At
              </span>
              <a 
                href={`tel:${phoneRaw}`} 
                className="text-[#FFFFFF] font-black text-[24px] sm:text-[28px] tracking-tight hover:text-white/90 transition-all duration-300 leading-none"
              >
                {displayPhone}
              </a>
            </div>

            {/* SECTION 2 (Opening Hours) */}
            <div className="bg-[#00897B] p-6 text-center text-white flex flex-col items-center">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Clock className="h-5 w-5 shrink-0 text-[#FFFFFF]" />
                <h4 className="font-display font-bold text-[18px] text-[#FFFFFF]">
                  Opening Hours
                </h4>
              </div>
              
              <p className="font-bold text-[14px] text-[#E6F6F4] mb-4">
                Monday – Saturday
              </p>

              <div className="w-full grid grid-cols-2 gap-4 max-w-xs">
                <div className="text-center">
                  <span className="text-[11px] font-bold text-[#E6F6F4] tracking-wider uppercase block">Morning</span>
                  <span className="font-black text-[14px] block mt-1 text-[#FFFFFF]">09:00 AM – 01:00 PM</span>
                </div>
                <div className="text-center">
                  <span className="text-[11px] font-bold text-[#E6F6F4] tracking-wider uppercase block">Evening</span>
                  <span className="font-black text-[14px] block mt-1 text-[#FFFFFF]">04:00 PM – 08:00 PM</span>
                </div>
              </div>
            </div>

            {/* SECTION 3 (Book Appointment) */}
            <div className="bg-[#E6F6F4] p-6 text-center flex flex-col items-center">
              <h4 className="font-display font-bold text-[18px] text-[#1E3A5F] mb-2">
                Free Consultation
              </h4>
              <p className="font-display font-extrabold text-[12px] tracking-wider uppercase leading-none text-[#00897B]">
                Patel Dental Hospital
              </p>
              <p className="text-[11px] font-bold text-[#4B5563] mt-1 max-w-[280px]">
                Awarded as Best Dental Hospital by FAMDENT
              </p>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 w-full mt-5 max-w-xs">
                <button
                  onClick={openAppointmentModal}
                  className="h-[44px] bg-[#00897B] hover:bg-[#00796B] text-[#FFFFFF] text-[13px] font-bold rounded-lg flex items-center justify-center active:scale-98 transition-all duration-300 shadow-sm text-center cursor-pointer"
                >
                  Free Consultation
                </button>

                <a
                  href={`https://wa.me/${whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-[44px] bg-[#FFFFFF] hover:bg-[#00897B] text-[#00897B] hover:text-[#FFFFFF] text-[13px] font-bold rounded-lg border-2 border-[#00897B] flex items-center justify-center active:scale-98 transition-all duration-300 text-center cursor-pointer"
                >
                  <span className="whitespace-nowrap">WhatsApp Us</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM TRUST BAR - Luxury white floating card centered horizontally */}
        <div className="hidden lg:flex absolute left-0 right-0 bottom-0 translate-y-1/2 z-40 px-4 sm:px-6 justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-[1340px] bg-white border border-slate-100/90 rounded-2xl md:rounded-[28px] py-5 px-5 lg:px-6 shadow-[0_20px_40px_rgba(8,28,58,0.12)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-2 items-center relative hover:shadow-[0_25px_45px_rgba(8,28,58,0.16)] transition-all duration-500 pointer-events-auto"
          >
            {/* Card 1: Digital Dental Experts */}
            <div className="flex items-center space-x-3 sm:space-x-3.5">
              <div className="h-11 w-11 lg:h-12 lg:w-12 xl:h-13 xl:w-13 bg-sky-50 border border-sky-100/50 rounded-full flex items-center justify-center text-[#0EA5E9] shrink-0 shadow-sm">
                <Cpu className="h-5 w-5 lg:h-6 lg:w-6" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="font-bold text-[#081C3A] text-[13px] xl:text-[14px] leading-tight mb-0.5">
                  Digital Dental Experts
                </span>
                <span className="text-[11px] xl:text-[12px] text-slate-500 font-medium tracking-normal leading-tight">
                  Advanced Digital Diagnosis &amp; Treatment
                </span>
              </div>
            </div>

            {/* Card 2: Dental Implant Specialists */}
            <div className="flex items-center space-x-3 sm:space-x-3.5 lg:border-l lg:border-slate-200/50 lg:pl-3 xl:pl-4">
              <div className="h-11 w-11 lg:h-12 lg:w-12 xl:h-13 xl:w-13 bg-[#F0FDFA] border border-[#CCFBF1] rounded-full flex items-center justify-center text-[#14B8A6] shrink-0 shadow-sm">
                <DentalImplantIcon className="h-5 w-5 lg:h-6 lg:w-6" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="font-bold text-[#081C3A] text-[13px] xl:text-[14px] leading-tight mb-0.5">
                  Dental Implant Specialists
                </span>
                <span className="text-[11px] xl:text-[12px] text-slate-500 font-medium tracking-normal leading-tight">
                  Advanced Implant Solutions
                </span>
              </div>
            </div>

            {/* Card 3: Braces & Invisible Aligner Experts */}
            <div className="flex items-center space-x-3 sm:space-x-3.5 lg:border-l lg:border-slate-200/50 lg:pl-3 xl:pl-4">
              <div className="h-11 w-11 lg:h-12 lg:w-12 xl:h-13 xl:w-13 bg-blue-50/70 border border-blue-100/50 rounded-full flex items-center justify-center text-[#0284c7] shrink-0 shadow-sm">
                <ClearAlignerIcon className="h-5 w-5 lg:h-6 lg:w-6" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="font-bold text-[#081C3A] text-[13px] xl:text-[14px] leading-tight mb-0.5">
                  Braces &amp; Invisible Aligner Experts
                </span>
                <span className="text-[11px] xl:text-[12px] text-slate-500 font-medium tracking-normal leading-tight">
                  Modern Invisible Orthodontics
                </span>
              </div>
            </div>

            {/* Card 4: FMR & Root Canal Specialists */}
            <div className="flex items-center space-x-3 sm:space-x-3.5 lg:border-l lg:border-slate-200/50 lg:pl-3 xl:pl-4">
              <div className="h-11 w-11 lg:h-12 lg:w-12 xl:h-13 xl:w-13 bg-emerald-50/50 border border-emerald-100/40 rounded-full flex items-center justify-center text-[#10B981] shrink-0 shadow-sm">
                <RootCanalIcon className="h-5 w-5 lg:h-6 lg:w-6" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="font-bold text-[#081C3A] text-[13px] xl:text-[14px] leading-tight mb-0.5">
                  FMR &amp; Root Canal Specialists
                </span>
                <span className="text-[11px] xl:text-[12px] text-slate-500 font-medium tracking-normal leading-tight">
                  Comprehensive Smile Designing &amp; Full Mouth Rehabilitation
                </span>
              </div>
            </div>

            {/* Card 5: Oral & Maxillofacial Surgery */}
            <div className="flex items-center space-x-3 sm:space-x-3.5 lg:border-l lg:border-slate-200/50 lg:pl-3 xl:pl-4">
              <div className="h-11 w-11 lg:h-12 lg:w-12 xl:h-13 xl:w-13 bg-indigo-50/70 border border-indigo-100/50 rounded-full flex items-center justify-center text-[#6366F1] shrink-0 shadow-sm">
                <Stethoscope className="h-5 w-5 lg:h-6 lg:w-6" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="font-bold text-[#081C3A] text-[13px] xl:text-[14px] leading-tight mb-0.5">
                  Oral &amp; Maxillofacial Surgery
                </span>
                <span className="text-[11px] xl:text-[12px] text-slate-500 font-medium tracking-normal leading-tight">
                  Advanced Oral Surgery &amp; Facial Reconstruction
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
      {/* 3. Patel Dental Hospital Milestones */}
      <section className="pt-12 sm:pt-16 lg:pt-[160px] pb-8 sm:pb-12 md:pb-16 bg-[#F8FAFC] relative z-10 border-t border-sky-100/30 overflow-hidden" id="achievements-and-trust">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12">
            <h2 className="stat-heading-premium text-[#081C3A] text-[15px] sm:text-[18px] md:text-[24px] lg:text-[26px] tracking-wider leading-snug uppercase mb-2">
              PATEL DENTAL HOSPITAL AT A GLANCE
            </h2>
            <p className="stat-subtitle-premium text-[#4A5D78] text-[12px] sm:text-[14px] md:text-[15px] font-medium tracking-wide leading-relaxed">
              Trusted Numbers Behind Thousands of Successful Smiles at the Best Dental Hospital in Rajkot, Gujarat
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mt-2 sm:mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-5 lg:gap-6">
            {[
              {
                value: 14,
                suffix: "+",
                title: "Years Experience",
                subtitle: "Serving Since 2012",
                icon: "/calendar-filled-svgrepo-com.svg",
                color: "text-purple-500",
                bgColor: "bg-purple-50/50",
                borderColor: "border-purple-100/40",
              },
              {
                value: 2000,
                suffix: "+",
                title: "Families",
                subtitle: "Trusted Community",
                icon: "/family-silhouette-svgrepo-com.svg",
                color: "text-[#11B5D8]",
                bgColor: "bg-sky-50",
                borderColor: "border-sky-100",
              },
              {
                value: 3000,
                suffix: "+",
                title: "NRI Patients",
                subtitle: "Global Smile Standards",
                icon: "/worldwide-world-svgrepo-com.svg",
                color: "text-[#14B8A6]",
                bgColor: "bg-[#F0FDFA]",
                borderColor: "border-[#CCFBF1]",
              },
              {
                value: 16000,
                suffix: "+",
                title: "Dental Implants",
                subtitle: "Fixed Teeth Solutions",
                icon: "/tooth-svgrepo-com (1).svg",
                color: "text-rose-500",
                bgColor: "bg-rose-50/50",
                borderColor: "border-rose-100/40",
              },
              {
                value: 800,
                suffix: "+",
                title: "Full Mouth Rehabilitation",
                subtitle: "Comprehensive Rehabilitation",
                icon: "/face-with-open-mouth-svgrepo-com.svg",
                color: "text-amber-500",
                bgColor: "bg-amber-50/50",
                borderColor: "border-amber-100/40",
              },
              {
                value: 30000,
                suffix: "+",
                title: "Root Canal Treatments",
                subtitle: "Single Sitting Specialization",
                icon: "/teeth-silhouette-svgrepo-com.svg",
                color: "text-[#10B981]",
                bgColor: "bg-emerald-50/50",
                borderColor: "border-emerald-100/40",
              },
              {
                value: 6000,
                suffix: "+",
                title: "Braces",
                subtitle: "Orthodontic Solutions",
                icon: "/braces-teeth-svgrepo-com.svg",
                color: "text-blue-500",
                bgColor: "bg-blue-50/50",
                borderColor: "border-blue-100/40",
              },
              {
                value: 1500,
                suffix: "+",
                title: "Aligners",
                subtitle: "Clear Smile Alignment",
                icon: "/teeth-svgrepo-com.svg",
                color: "text-[#0ea5e9]",
                bgColor: "bg-blue-50/70",
                borderColor: "border-blue-100/50",
              },
              {
                value: 1000,
                suffix: "+",
                title: "DSD (Digital Smile Designing)",
                subtitle: "Aesthetic Smile Customization",
                icon: "/face-smile-big-svgrepo-com.svg",
                color: "text-teal-500",
                bgColor: "bg-teal-50/50",
                borderColor: "border-teal-100/40",
              },
              {
                value: 10000,
                suffix: "+",
                title: "Oral & Maxillofacial Surgeries",
                subtitle: "Expert Surgical Solutions",
                icon: "/tooth-svgrepo-com (1).svg",
                color: "text-indigo-500",
                bgColor: "bg-indigo-50/50",
                borderColor: "border-indigo-100/40",
              },
              {
                value: 10,
                suffix: "+",
                title: "Awards Won",
                subtitle: "National & Regional Excellence",
                icon: "/awards-svgrepo-com.svg",
                color: "text-[#0284c7]",
                bgColor: "bg-cyan-50/60",
                borderColor: "border-cyan-100/50",
              },
              {
                value: 5,
                suffix: "★ Rating",
                title: "on Justdial & Google",
                subtitle: "Top Rated Hospital",
                icon: "/star-svgrepo-com.svg",
                color: "text-amber-500",
                bgColor: "bg-amber-50/60",
                borderColor: "border-[#CCFBF1]",
              },
            ].map((item: any, index) => {
              const isStringIcon = typeof item.icon === 'string';
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white/98 backdrop-blur-[1px] border border-slate-100 shadow-[0_5px_15px_rgba(8,28,58,0.02)] hover:shadow-[0_15px_45px_rgba(8,28,58,0.06)] transition-all duration-300 rounded-[12px] md:rounded-[20px] p-5 md:p-6 flex flex-col justify-center min-h-[190px] md:min-h-[220px] h-full group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Single unified premium layout for both mobile & desktop */}
                  <div className="flex flex-col items-center justify-center text-center relative z-10 w-full h-full">
                    {/* Icon on top */}
                    <div className="p-3.5 md:p-4 shrink-0 mb-4 md:mb-5 transition-transform duration-300 group-hover:scale-105">
                      {isStringIcon ? (
                        <img 
                          src={item.icon} 
                          alt={item.title} 
                          className="h-[38px] w-[38px] md:h-[50px] md:w-[50px] object-contain"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <IconComponent className={`h-[38px] w-[38px] md:h-[50px] md:w-[50px] ${item.color}`} />
                      )}
                    </div>
                    {/* Large number in the center (Elegant: 600 semi-bold weight) */}
                   <div
  className="stat-number-premium text-[#081C3A] text-[26px] sm:text-[30px] md:text-[36px] lg:text-[40px] leading-none mb-4"
  style={{ fontFamily: "Heebo, sans-serif", fontWeight: 600 }}
>
  <AnimatedCounter value={item.value} suffix={item.suffix} />
</div>
                    {/* Service label/Title below the number */}
                    <span className="stat-label-premium text-[#4A5D78] text-[10.5px] min-[360px]:text-[11.5px] md:text-[13px] lg:text-[14px] tracking-wide leading-normal w-full block px-0.5">
                      {item.title}
                    </span>
                  </div>
 
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Patient Video Testimonials */}
      <section className="py-16 sm:py-20 bg-white relative z-10 border-t border-sky-100/30" id="patient-success-stories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              PATIENT SUCCESS STORIES
            </span>
            <h2 className="stat-heading-premium text-[#081C3A] text-[15px] sm:text-[18px] md:text-[24px] lg:text-[26px] tracking-wider leading-snug uppercase mb-3">
              Real Experiences from Patients at the Best Dental Hospital in Rajkot
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {videosToRender.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={video.videoPlatform === 'instagram' || video.videoPlatform === 'mp4' ? "w-full max-w-[430px] mx-auto flex flex-col items-center" : "bg-white rounded-[16px] overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(8,28,58,0.03)] hover:shadow-[0_20px_40px_rgba(8,28,58,0.08)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col"}
              >
                {video.videoPlatform === 'instagram' ? (
                  <InstagramEmbed
                    url={video.url || `https://www.instagram.com/p/${video.id}/`}
                    title={video.title}
                  />
                ) : video.videoPlatform === 'mp4' ? (
                  <div className="w-full max-w-[430px] mx-auto flex justify-center">
                    <Mp4ReelPlayer src={video.url || video.id} />
                  </div>
                ) : (
                  <>
                    <div className="aspect-video w-full bg-slate-900 relative overflow-hidden shrink-0">
                      {activeVideos[video.id] ? (
                        <iframe
                          className="w-full h-full border-0 absolute inset-0 z-10"
                          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                        ></iframe>
                      ) : (
                        <button
                          onClick={() => setActiveVideos(prev => ({ ...prev, [video.id]: true }))}
                          className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group/video focus:outline-none"
                          aria-label={`Play ${video.title}`}
                        >
                          <img
                            src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-105"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/25 group-hover/video:bg-black/35 transition-colors duration-300 pointer-events-none" />
                          {/* Play Button Icon */}
                          <div className="absolute z-20 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/95 text-[#0D9488] shadow-md group-hover/video:scale-110 group-hover/video:bg-[#0D9488] group-hover/video:text-white transition-all duration-300 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6 md:w-7 md:h-7 translate-x-0.5"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </button>
                      )}
                    </div>
                    <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between hidden md:flex">
                      <div>
                        <span className="inline-block text-[11px] font-bold text-[#0D9488] bg-[#F0FDFA] border border-[#CCFBF1] px-2.5 py-1 rounded-full mb-2">
                          {video.treatment}
                        </span>
                        <h4 className="font-display font-bold text-[#081C3A] text-[15px] sm:text-[16px] leading-snug group-hover:text-[#0D9488] transition-colors duration-300">
                          {video.title}
                        </h4>
                      </div>
                      <div className="text-slate-450 text-[12px] sm:text-[13px] font-medium mt-3 flex items-center justify-between border-t border-slate-50 pt-3">
                        <span>Verified Testimonial</span>
                        <span className="text-[#11B5D8]">★ Featured</span>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>



        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 sm:py-20 bg-slate-50/50 relative z-10 border-t border-sky-100/30" id="awards-and-recognitions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              ACCOLADES & RECOGNITION
            </span>
            <h2 className="stat-heading-premium text-[#081C3A] text-[15px] sm:text-[18px] md:text-[24px] lg:text-[26px] tracking-wider leading-snug uppercase mb-3">
              Awards & Achievements
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full" />
          </div>

          {awardsList && awardsList.length > 0 ? (
            <div className="flex flex-col gap-4 sm:gap-6 max-w-7xl mx-auto" id="awards-rows-container">
              {/* Row 1: Portrait/Vertical Awards */}
              <div className="w-full" id="awards-row-vertical">
                <div className="flex gap-6 sm:gap-8 overflow-x-auto pb-4 pt-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                  {verticalAwards.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      onClick={() => setSelectedAward(item)}
                      className="flex-shrink-0 cursor-pointer h-44 sm:h-56 md:h-64 lg:h-72 w-auto bg-white rounded-xl border border-slate-100 shadow-[0_4px_14px_rgba(0,0,0,0.12)] p-2 sm:p-2.5 flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
                      id={`home-award-vertical-${item.id}`}
                    >
                      <img
                        src={item.image_url}
                        alt="Award & Recognition Vertical"
                        className="h-full w-auto object-contain object-center rounded-lg"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  ))}
                  {verticalAwards.length === 0 && (
                    <div className="text-center py-6 text-slate-400 text-xs w-full">
                      No portrait awards available.
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2: Landscape/Horizontal Awards */}
              <div className="w-full overflow-hidden" id="awards-row-horizontal">
                {horizontalAwards.length > 0 ? (
                  <div className="relative w-full">
                    {/* Style block for continuous smooth scrolling */}
                    <style dangerouslySetInnerHTML={{__html: `
                      @keyframes marquee-horizontal {
                        0% {
                          transform: translate3d(0, 0, 0);
                        }
                        100% {
                          transform: translate3d(-50%, 0, 0);
                        }
                      }
                      .animate-marquee-horizontal {
                        animation: marquee-horizontal 38s linear infinite;
                      }
                      @media (prefers-reduced-motion: reduce) {
                        .animate-marquee-horizontal {
                          animation: none !important;
                          overflow-x: auto !important;
                          display: flex !important;
                          width: 100% !important;
                        }
                      }
                    `}} />
                    
                    {/* The marquee wrapper with hidden overflow */}
                    <div className="flex overflow-hidden w-full select-none pb-4 pt-2">
                      <div className="flex flex-nowrap w-max animate-marquee-horizontal hover:[animation-play-state:paused]">
                        {/* Track 1 */}
                        <div className="flex gap-6 sm:gap-8 flex-shrink-0 pr-6 sm:pr-8">
                          {(() => {
                            // Replicate the list if it has too few items to span the screen seamlessly
                            const items = horizontalAwards.length < 5
                              ? [...horizontalAwards, ...horizontalAwards, ...horizontalAwards, ...horizontalAwards]
                              : horizontalAwards;
                            return items.map((item, idx) => (
                              <motion.div
                                key={`track1-${item.id}-${idx}`}
                                onClick={() => setSelectedAward(item)}
                                className="flex-shrink-0 cursor-pointer h-28 sm:h-36 md:h-40 lg:h-48 w-auto bg-white rounded-xl border border-slate-100 shadow-[0_4px_14px_rgba(0,0,0,0.12)] p-2 sm:p-2.5 flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
                                id={`home-award-horizontal-t1-${item.id}-${idx}`}
                              >
                                <img
                                  src={item.image_url}
                                  alt="Award & Recognition Horizontal"
                                  className="h-full w-auto object-contain object-center rounded-lg"
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                />
                              </motion.div>
                            ));
                          })()}
                        </div>
                        {/* Track 2 - Identical clone for seamless loop */}
                        <div className="flex gap-6 sm:gap-8 flex-shrink-0 pr-6 sm:pr-8" aria-hidden="true">
                          {(() => {
                            const items = horizontalAwards.length < 5
                              ? [...horizontalAwards, ...horizontalAwards, ...horizontalAwards, ...horizontalAwards]
                              : horizontalAwards;
                            return items.map((item, idx) => (
                              <motion.div
                                key={`track2-${item.id}-${idx}`}
                                onClick={() => setSelectedAward(item)}
                                className="flex-shrink-0 cursor-pointer h-28 sm:h-36 md:h-40 lg:h-48 w-auto bg-white rounded-xl border border-slate-100 shadow-[0_4px_14px_rgba(0,0,0,0.12)] p-2 sm:p-2.5 flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
                                id={`home-award-horizontal-t2-${item.id}-${idx}`}
                              >
                                <img
                                  src={item.image_url}
                                  alt="Award & Recognition Horizontal"
                                  className="h-full w-auto object-contain object-center rounded-lg"
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                />
                              </motion.div>
                            ));
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-slate-400 text-xs w-full">
                    No landscape awards available.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-3xs max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-[#0D9488] flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                🏆
              </div>
              <p className="text-slate-500 text-sm font-medium">
                Awards & Recognitions will be displayed here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedAward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedAward(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 md:p-10 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedAward(null);
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-200 z-[10000] cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center rounded-2xl overflow-hidden cursor-default"
            >
              <img
                src={selectedAward.image_url}
                alt="Award Full View"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Happy Smiles & Patient Moments Gallery */}
      <PatientMomentsGallery 
        patientMoments={momentsToRender} 
        onNavigate={(page) => setCurrentPage(page as PageId)} 
      />

      {/* Services Section */}
      <section className="pt-12 sm:pt-16 lg:pt-32 pb-24 lg:pb-32 bg-[#FAFAFC] relative z-10 border-t border-slate-100" id="services">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <h2 className="stat-heading-premium text-[#081C3A] text-[15px] sm:text-[18px] md:text-[24px] lg:text-[26px] tracking-wider leading-snug uppercase mb-2">
              SERVICES
            </h2>
            <p className="stat-subtitle-premium text-[#4A5D78] text-[12px] sm:text-[14px] md:text-[15px] font-medium tracking-wide leading-relaxed">
              Advanced Dental Care in Rajkot Under One Roof at the Best Dental Clinic in Rajkot
            </p>
            <div className="h-[3px] w-16 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-12 max-w-full mx-auto items-stretch">
            {/* Dynamic Services Cards from CMS */}
            {(() => {
              const SERVICES_CARDS_CONFIG = [
                { id: 'implants-srv', slug: 'dental-implants', title: 'Dental Implants', defaultImg: fdaApprovedImplantImg, delay: 0 },
                { id: 'rct', slug: 'root-canal-treatment', title: 'Single Sitting Root Canal Treatment', defaultImg: rootCanalImg, delay: 0.05 },
                { id: 'fmr-srv', slug: 'full-mouth-rehabilitation', title: 'Full Mouth Rehabilitation', defaultImg: fullMouthRehabImg, delay: 0.1 },
                { id: 'aligners-srv', slug: 'invisible-aligners', title: 'Invisible Aligners', defaultImg: clearAlignersImg, delay: 0.15 },
                { id: 'smile-srv', slug: 'smile-makeover', title: 'Smile Makeover', defaultImg: smileMakeoverImg, delay: 0.2 },
                { id: 'crowns', slug: 'crowns-and-bridges', title: 'Crowns & Bridges', defaultImg: crownsBridgesImg, delay: 0.25 },
                { id: 'whitening-srv', slug: 'teeth-whitening', title: 'Teeth Whitening', defaultImg: teethCleaningImg, delay: 0.3 },
                { id: 'kids', slug: 'pediatric-dentistry', title: 'Pediatric Dentistry', defaultImg: kidsDentistryImg, delay: 0.35 },
                { id: 'braces-srv', slug: 'braces-treatment', title: 'Braces Treatment', defaultImg: bracesImg, delay: 0.4 },
                { id: 'wisdom-srv', slug: 'wisdom-tooth-surgery', title: 'Wisdom Tooth Surgery', defaultImg: wisdomToothImg, delay: 0.45 },
                { id: 'filling-srv', slug: 'tooth-coloured-filling', title: 'Tooth Coloured Filling (Composite Filling)', defaultImg: compositeFillingImg, delay: 0.5 },
              ];

              return SERVICES_CARDS_CONFIG.map((cfg) => {
                const cardData = getCardData(cfg.slug, cfg.title, cfg.defaultImg, cfg.id);
                if (!cardData.isActive) return null;

                const mConfig = cardData.mConfig;
                const appointmentText = mConfig.cta_appointment_text || 'Free Consultation';
                const appointmentDest = mConfig.cta_appointment_dest || 'appointment';
                const appointmentDestValue = mConfig.cta_appointment_dest_value || '';

                const handleAppointmentClick = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  if (appointmentDest === 'appointment') {
                    openAppointmentModal();
                  } else if (appointmentDest === 'internal') {
                    setCurrentPage(appointmentDestValue);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (appointmentDest === 'external') {
                    const url = appointmentDestValue.startsWith('http') ? appointmentDestValue : 'https://' + appointmentDestValue;
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }
                };

                return (
                  <motion.div
                    key={cfg.slug}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: cfg.delay }}
                    className="w-full h-full bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgba(8,28,58,0.04)] hover:shadow-[0_24px_50px_rgba(8,28,58,0.08)] hover:-translate-y-1.5 transition-all duration-350 group flex flex-col cursor-pointer"
                    onClick={() => {
                      setCurrentPage(`services/${cardData.slug}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-50">
                      <img
                        src={cardData.image}
                        alt={cardData.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Green Highlight Line directly below the image */}
                    {cardData.greenHighlightLine && (
                      <div className="bg-[#14B8A6] text-white py-3 px-6 text-center text-xs sm:text-sm font-bold tracking-wide leading-relaxed border-b border-teal-600/10">
                        {cardData.greenHighlightLine}
                      </div>
                    )}

                    {/* Content Block */}
                    <div className="p-8 sm:p-10 xl:p-12 flex flex-col justify-between flex-grow">
                      <div className="space-y-5 text-left">
                        <h3 className="font-display font-[900] text-[#081C3A] text-[24px] sm:text-[28px] leading-tight">
                          {cardData.title}
                        </h3>
                        
                        <div className="text-slate-600 text-[14.5px] sm:text-[15.5px] font-medium leading-relaxed space-y-4 font-sans">
                          {cardData.shortDesc ? cardData.shortDesc.split(/\r?\n/).map((p) => p.trim()).filter(Boolean).map((para, idx) => (
                            <p key={idx}>{para}</p>
                          )) : null}
                        </div>
                      </div>

                      {/* Buttons block */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-slate-100">
                        {mConfig.cta_appointment_enabled !== false && (
                          <button
                            onClick={handleAppointmentClick}
                            className="flex-1 px-6 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition duration-200 shadow-md hover:shadow-lg cursor-pointer text-center"
                          >
                            {appointmentText}
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentPage(`services/${cardData.slug}`);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="flex-1 px-6 py-4 bg-transparent hover:bg-slate-50 border border-slate-300 text-[#081C3A] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition duration-200 cursor-pointer text-center"
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              });
            })()}          </div>

        </div>
      </section>




      {/* 9. Book Your Consultation Today */}
      <section className="py-16 sm:py-24 bg-white relative z-10 border-t border-slate-100" id="book-consultation-cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#081C3A]/[0.02] via-[#0D9488]/[0.01] to-white rounded-[32px] border border-slate-100 p-8 sm:p-12 lg:p-16 shadow-[0_10px_45px_rgba(8,28,58,0.03)] hover:shadow-[0_20px_55px_rgba(8,28,58,0.06)] transition-all duration-500 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#0D9488]/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#11B5D8]/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left Side Content - lg:col-span-5 */}
              <div className="lg:col-span-5 flex flex-col justify-center text-left">
                <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-wider uppercase mb-3 block">
                  PATEL DENTAL HOSPITAL – ADVANCED IMPLANT & FMR CENTER
                </span>
                
                <h2 className="stat-heading-premium text-[#081C3A] text-[15px] sm:text-[18px] md:text-[24px] lg:text-[26px] tracking-wider leading-snug uppercase mb-4">
                  Book Your Consultation Today
                </h2>

                <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mb-6 rounded-full" />

                <p className="text-slate-550 text-[14px] sm:text-[15px] font-medium leading-relaxed mb-8">
                  Take the first step towards a confident smile with advanced dental care in Rajkot at Patel Dental Hospital. Consult with our experienced dental implant specialist and root canal specialist in Rajkot today.
                </p>

                {/* Key Highlights list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { title: "Digital Dental Experts", desc: "Advanced Digital Diagnosis & Treatment" },
                    { title: "Dental Implant Specialists", desc: "Advanced Implant Solutions" },
                    { title: "Braces & Invisible Aligner Experts", desc: "Modern Invisible Orthodontics" },
                    { title: "FMR & Root Canal Specialists", desc: "Comprehensive Smile Designing & Full Mouth Rehabilitation" },
                    { title: "Oral & Maxillofacial Surgery", desc: "Advanced Oral Surgery & Facial Reconstruction" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="h-3 w-3 text-[#0ea5e9] stroke-[3]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-700 text-[13px] sm:text-[13.5px] font-bold leading-tight">
                          {item.title}
                        </span>
                        <span className="text-slate-500 text-[11px] sm:text-[12px] font-medium leading-tight mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact Phone & Actions Block */}
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#F0FDFA] border border-[#CCFBF1] flex items-center justify-center text-[#0D9488]">
                      <PhoneCall className="h-4.5 w-4.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-[11px] font-bold tracking-wider uppercase leading-none">Emergency Call & Booking</p>
                      <a href={`tel:${phoneRaw}`} className="text-[#081C3A] text-lg font-black hover:text-[#0D9488] transition-colors duration-200">
                        {displayPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Primary Button */}
                    <button
                      onClick={openAppointmentModal}
                      className="flex-1 flex items-center justify-center text-[13px] sm:text-[14px] font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] px-6 py-4 rounded-xl shadow-[0_4px_14px_0_rgba(13,148,136,0.25)] hover:shadow-lg cursor-pointer transition-all duration-300 transform active:scale-95 text-center"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Free Consultation
                    </button>
                    
                    {/* Secondary Button */}
                    <a
                      href={`https://wa.me/${whatsappRaw}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20consultation%20at%20Patel%20Dental%20Hospital.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center text-[13px] sm:text-[14px] font-bold text-[#0D9488] bg-slate-50 border border-slate-100 hover:bg-[#F0FDFA] hover:border-[#CCFBF1] px-6 py-4 rounded-xl cursor-pointer transition-all duration-350 text-center"
                    >
                      <MessageCircle className="h-4 w-4 mr-2 text-[#25D366] fill-[#25D366]/10" />
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side Image - lg:col-span-7 */}
              <div className="lg:col-span-7 w-full flex flex-col justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98, x: 30 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="aspect-video w-full bg-slate-50 rounded-[24px] overflow-hidden shadow-[0_15px_40px_rgba(8,28,58,0.12)] border border-white/60 relative"
                >
                  <img
                    className="w-full h-full object-cover absolute inset-0"
                    src="/IMG_20190225_120201.jpg"
                    alt="Patel Dental Hospital Premium Modern Treatment Center"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* 12. Advanced Dental Care With A Personal Touch */}
      <section className="py-16 sm:py-24 bg-white relative z-10 border-t border-slate-100" id="advanced-care-personal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              ADVANCED DENTAL CARE WITH A PERSONAL TOUCH
            </span>
            <h2 className="stat-heading-premium text-[#081C3A] text-[15px] sm:text-[18px] md:text-[24px] lg:text-[26px] tracking-wider leading-snug uppercase mb-3">
              Advanced Dental Care With A Personal Touch
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            
            {/* Left Side: Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2.5">
                <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-wider uppercase block">
                  PATEL DENTAL HOSPITAL – ADVANCED IMPLANT & FMR CENTER
                </span>
                <h3 className="font-display font-[900] text-[#081C3A] text-[24px] sm:text-[30px] md:text-[34px] leading-tight tracking-tight">
                  Creating Healthy & Confident Smiles
                </h3>
              </div>

              <div className="text-slate-600 text-[14.5px] sm:text-[15.5px] font-medium leading-relaxed space-y-4">
                <p>
                  At Patel Dental Hospital, recognized as the best dental hospital in Rajkot, Gujarat, we combine state-of-the-art technology with personalized care to deliver outstanding clinical results. Our specialization includes Dental Implants, Full Mouth Rehabilitation, Invisible Aligners, Root Canal Treatments, and Cosmetic Dentistry in Rajkot.
                </p>
                <p>
                  Whether you need a dental implant specialist in Rajkot, a root canal specialist in Rajkot, or a complete smile makeover in Rajkot, our focus is on restoring confidence, comfort, and long-term oral health through patient-centered care.
                </p>
                <p>
                  With over 45,000 satisfied patients and 11+ years of clinical excellence, Patel Dental Hospital is trusted as a top dental implant hospital in Rajkot and one of the best dental hospitals in India.
                </p>
              </div>


            </div>

            {/* Right Side: Responsive Premium Dental Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className="rounded-[20px] overflow-hidden aspect-video bg-slate-100 relative shadow-[0_15px_45px_rgba(8,28,58,0.1)] border border-slate-100 group">
                <img
                   className="w-full h-full object-cover absolute inset-0 z-10"
                   src="/_MG_3249.JPG"
                   alt="Patel Dental Hospital Advanced Clinical Care"
                   referrerPolicy="no-referrer"
                   loading="lazy"
                />
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 13. What Our Patients Say */}
      <section className="py-16 sm:py-24 bg-slate-50/50 relative z-10 border-t border-slate-100" id="patient-reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              PATIENT TESTIMONIALS
            </span>
            <h2 className="stat-heading-premium text-[#081C3A] text-[15px] sm:text-[18px] md:text-[24px] lg:text-[26px] tracking-wider leading-snug uppercase mb-2">
              What Our Patients Say
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
            <p className="stat-subtitle-premium text-[#4A5D78] text-[12px] sm:text-[14px] md:text-[15px] font-medium tracking-wide leading-relaxed">
              Real Google Reviews From Patients at the Best Dental Hospital in Rajkot, Gujarat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                name: 'Ranjanben Gothi',
                review: 'I have taken treatment of dental implant teeth today. 4.5 years completed after fixing my teeth. I am very happy and can chew each and every fruit. Dr Vipul and Dr Kinjal have provided excellent treatment. Best dental hospital in Rajkot.'
              },
              {
                name: 'Sahina Savan',
                review: 'I had a great experience at Patel Dental Hospital. They give the utmost time, care and attention to every patient. My implant treatment was easy, painless and comfortable. Dr Vipul Patel and the team were extremely supportive.'
              },
              {
                name: 'Uma Shah',
                review: 'I was diagnosed with a rare jawbone and dental condition and consulted Dr Vipul Patel for treatment. From the first interaction, the approach was professional, transparent and reassuring. The treatment quality was excellent and I highly recommend Patel Dental Hospital.'
              },
              {
                name: 'Rahul Makvana',
                review: 'Patel Dental Hospital is very clean and hygienic. The staff and doctors are caring and supportive. Excellent patient experience and professional treatment.'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-slate-100 rounded-[20px] p-6 sm:p-7 shadow-[0_4px_25px_rgba(8,28,58,0.02)] hover:shadow-[0_20px_45px_rgba(8,28,58,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Stars and Google G Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                        ))}
                      </div>
                      <div className="shrink-0 bg-slate-50 p-1.5 rounded-lg border border-slate-100 group-hover:bg-slate-100/70 transition-colors">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                      </div>
                    </div>

                    {/* Review text */}
                    <p className="text-slate-600 text-[13.5px] sm:text-[14px] leading-relaxed mb-6 font-medium italic group-hover:text-slate-700 transition-colors">
                      "{item.review}"
                    </p>
                  </div>

                  {/* Reviewer and badge */}
                  <div className="border-t border-slate-100/80 pt-4 mt-auto">
                    <p className="font-display font-[900] text-[#081C3A] text-[15px] sm:text-[15.5px] leading-tight mb-1">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-1.5 text-[#0D9488] text-[10.5px] font-bold tracking-wider uppercase">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#0D9488]" />
                      <span>Verified Google Review</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 14. Need Help With Your Smile? */}
      <section className="py-16 sm:py-24 bg-white relative z-10 border-t border-slate-100" id="need-help-cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              PATEL DENTAL HOSPITAL – ADVANCED IMPLANT & FMR CENTER
            </span>
            <h2 className="stat-heading-premium text-[#081C3A] text-[15px] sm:text-[18px] md:text-[24px] lg:text-[26px] tracking-wider leading-snug uppercase mb-3">
              Need Help With Your Smile?
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            
            {/* Left Side: Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <h3 className="font-display font-[900] text-[#081C3A] text-[28px] sm:text-[34px] md:text-[40px] leading-tight tracking-tight">
                  Need Help?
                </h3>
                <p className="text-slate-600 text-[14.5px] sm:text-[16px] font-medium leading-relaxed">
                  Take the first step towards a healthier and more confident smile. Schedule your consultation at the best dental clinic in Rajkot today.
                </p>
              </div>

              {/* Contact Info card */}
              <div className="p-6 bg-slate-50/70 border border-slate-100 rounded-2xl flex items-center gap-4 hover:shadow-[0_8px_30px_rgba(8,28,58,0.03)] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] shrink-0 border border-teal-100/50">
                  <Phone className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
                    Direct Contact Hotline
                  </span>
                  <a 
                    href={`tel:${phoneRaw}`} 
                    className="block font-display font-black text-[#081C3A] text-[18px] sm:text-[22px] hover:text-[#0D9488] transition-colors"
                  >
                    {displayPhone}
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={openAppointmentModal}
                  className="inline-flex items-center justify-center text-[14px] font-bold text-white bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] hover:from-[#0284c7] hover:to-[#0369a1] px-8 py-4 rounded-xl shadow-[0_4px_14px_0_rgba(14,165,233,0.3)] hover:shadow-lg cursor-pointer transition-all duration-300 transform active:scale-95 text-center"
                >
                  <Calendar className="h-4.5 w-4.5 mr-2" />
                  Free Consultation
                </button>
                
                <a
                  href={`https://wa.me/${whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-[14px] font-bold text-[#0D9488] bg-[#EBFDFB] hover:bg-[#CCFBF1] px-8 py-4 rounded-xl border border-[#CCFBF1] hover:shadow-md cursor-pointer transition-all duration-300 transform active:scale-95 text-center"
                >
                  <svg className="w-4.5 h-4.5 mr-2 fill-current" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.46 3.473 1.332 4.978l-1.354 4.947 5.074-1.329c1.455.795 3.09 1.215 4.751 1.217h.004c5.503 0 10.015-4.482 10.015-9.988 0-2.668-1.039-5.176-2.927-7.065C17.142 2.927 14.654 2 12.012 2zm6.918 13.916c-.302.851-1.481 1.564-2.03 1.614-.543.05-1.085.253-3.486-.698-2.887-1.144-4.708-4.088-4.851-4.28-.142-.191-1.151-1.536-1.151-2.929 0-1.392.711-2.078.966-2.355.255-.276.553-.346.737-.346.184 0 .368.002.528.01.169.008.397-.064.622.482.23.559.78 1.901.848 2.039.068.139.113.301.021.485-.092.184-.139.299-.276.46-.139.162-.291.36-.416.483-.139.138-.284.288-.121.567.162.279.722 1.189 1.549 1.921.1.088.194.175.289.261 1.071.954 1.884 1.222 2.184 1.373.3.151.474.126.651-.077.177-.203.76-.884.966-1.186.205-.302.41-.252.691-.151.282.101 1.782.84 2.091.995.31.156.516.233.593.364.077.132.077.76-.225 1.611z" />
                  </svg>
                  WhatsApp Now
                </a>
              </div>
            </div>

            {/* Right Side: Image with beautiful wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className="rounded-[20px] overflow-hidden aspect-[16/10] bg-slate-100 relative shadow-[0_15px_45px_rgba(8,28,58,0.06)] border border-slate-150 group">
                <img
                  src="/IMG_3610.JPG"
                  alt="Patel Dental Hospital and Clinic Reception Lounge in Rajkot"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Accent Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-slate-200/50 py-1.5 px-3 rounded-xl shadow-sm flex items-center gap-1.5 z-20">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0D9488] animate-pulse"></div>
                  <span className="text-[#081C3A] text-[11px] font-bold tracking-wider uppercase">
                    Welcome to our Rajkot Clinic
                  </span>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 15. Frequently Asked Questions (Moved above Footer) */}
      <section className="py-16 sm:py-24 bg-slate-50/40 relative z-10 border-t border-slate-100" id="frequently-asked-questions">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              PATEL DENTAL HOSPITAL FAQ
            </span>
            <h2 className="stat-heading-premium text-[#081C3A] text-[15px] sm:text-[18px] md:text-[24px] lg:text-[26px] tracking-wider leading-snug uppercase mb-2">
              Frequently Asked Questions
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
            <p className="stat-subtitle-premium text-[#4A5D78] text-[12px] sm:text-[14px] md:text-[15px] font-medium tracking-wide leading-relaxed">
              Common questions about treatments at Patel Dental Hospital
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => {
              const isOpen = expandedFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 rounded-[20px] shadow-[0_4px_25px_rgba(8,28,58,0.015)] overflow-hidden hover:shadow-[0_12px_35px_rgba(8,28,58,0.035)] hover:border-slate-200/60 transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none group select-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-extrabold text-[#081C3A] text-[15px] sm:text-[16.5px] leading-snug group-hover:text-[#0D9488] transition-colors duration-200">
                      {faq.question}
                    </span>
                    <div className={`p-1.5 rounded-lg border border-slate-100/70 flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#EBFDFB] border-[#CCFBF1] text-[#0D9488] rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100/70 group-hover:text-[#081C3A]'}`}>
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 sm:px-8 sm:pb-7 pt-0 border-t border-slate-50 text-slate-500 text-[13.5px] sm:text-[14px] leading-relaxed font-semibold">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 16. Visit Patel Dental Hospital */}
      <section className="py-16 sm:py-24 bg-white relative z-10 border-t border-slate-100" id="visit-hospital">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase block mb-1">
              FIND OUR CLINICS
            </span>
            <h2 className="stat-heading-premium text-[#081C3A] text-[15px] sm:text-[18px] md:text-[24px] lg:text-[26px] tracking-wider leading-snug uppercase">
              Visit Patel Dental Hospital
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mt-4 rounded-full" />
            <p className="stat-subtitle-premium text-[#4A5D78] text-[12px] sm:text-[14px] md:text-[15px] font-medium tracking-wide leading-relaxed mt-3">
              Visit the best dental hospital in Rajkot at our Main Amin Marg or Gayatrinagar branch locations.
            </p>
          </div>

          {/* Two Equal Width Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            
            {/* Card 1: Main Branch (Amin Marg) */}
            <div 
              id="branch-card-amin-marg"
              className="bg-white rounded-[18px] border border-[#E6F6F4] p-[28px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Heading */}
                <div>
                  <h3 className="font-display font-[900] text-[#1E3A5F] text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                    <span className="shrink-0">🏥</span> Patel Dental Hospital
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#00897B] tracking-wider uppercase mt-1">
                    AMIN MARG BRANCH
                  </p>
                </div>

                {/* Address */}
                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
                    <span className="shrink-0 text-sm">📍</span> Address
                  </span>
                  <p className="text-[#4B5563] font-semibold text-[13.5px] sm:text-[14px] leading-relaxed whitespace-pre-line">
                    Patel Dental Hospital
                    Business Centrum Complex
                    1st Floor
                    Opp. Kings Heights
                    Beside Golden Super Market
                    Pandit Deendayal Upadhyay Road
                    From Rajnagar Chowk towards Amin Marg
                    Rajkot – 360001
                  </p>
                </div>

                {/* Phone */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <span className="shrink-0 text-sm">☎</span>
                  <a 
                    href="tel:+919510397046" 
                    className="text-[#00897B] font-extrabold text-[14.5px] hover:underline"
                  >
                    +91 9510397046
                  </a>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-5 mt-auto">
                <a
                  href="https://maps.app.goo.gl/AmSRutz2HjsBh6CX9?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center text-xs sm:text-sm font-bold text-white bg-[#00897B] hover:bg-[#1E3A5F] px-4 py-3.5 rounded-xl transition-all duration-300 text-center shadow-sm cursor-pointer"
                >
                  <span className="mr-1.5 shrink-0">📍</span> Get Directions
                </a>
                <a
                  href="tel:+919510397046"
                  className="flex-1 inline-flex items-center justify-center text-xs sm:text-sm font-bold text-white bg-[#1E3A5F] hover:bg-[#00897B] px-4 py-3.5 rounded-xl transition-all duration-300 text-center shadow-sm cursor-pointer"
                >
                  <span className="mr-1.5 shrink-0">📞</span> Call Now
                </a>
              </div>
            </div>

            {/* Card 2: Gayatrinagar Branch */}
            <div 
              id="branch-card-gayatrinagar"
              className="bg-white rounded-[18px] border border-[#E6F6F4] p-[28px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Heading */}
                <div>
                  <h3 className="font-display font-[900] text-[#1E3A5F] text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                    <span className="shrink-0">🏥</span> Patel Dental Hospital
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#00897B] tracking-wider uppercase mt-1">
                    GAYATRINAGAR BRANCH
                  </p>
                </div>

                {/* Address */}
                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
                    <span className="shrink-0 text-sm">📍</span> Address
                  </span>
                  <p className="text-[#4B5563] font-semibold text-[13.5px] sm:text-[14px] leading-relaxed whitespace-pre-line">
                    Patel Dental Hospital
                    1st Floor, Rameshwar Complex
                    Opp. SBI Bank
                    Gayatrinagar Road
                    Jalaram Chowk
                    Bhaktinagar Circle
                    Rajkot
                  </p>
                </div>

                {/* Phone */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <span className="shrink-0 text-sm">☎</span>
                  <a 
                    href="tel:+919510397046" 
                    className="text-[#00897B] font-extrabold text-[14.5px] hover:underline"
                  >
                    +91 9510397046
                  </a>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-5 mt-auto">
                <a
                  href="https://maps.app.goo.gl/5L8euDj9U4AiedgCA?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center text-xs sm:text-sm font-bold text-white bg-[#00897B] hover:bg-[#1E3A5F] px-4 py-3.5 rounded-xl transition-all duration-300 text-center shadow-sm cursor-pointer"
                >
                  <span className="mr-1.5 shrink-0">📍</span> Get Directions
                </a>
                <a
                  href="tel:+919510397046"
                  className="flex-1 inline-flex items-center justify-center text-xs sm:text-sm font-bold text-white bg-[#1E3A5F] hover:bg-[#00897B] px-4 py-3.5 rounded-xl transition-all duration-300 text-center shadow-sm cursor-pointer"
                >
                  <span className="mr-1.5 shrink-0">📞</span> Call Now
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
