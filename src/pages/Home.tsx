/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, Sparkles, Award, Star, ArrowRight, Video, Calendar, PhoneCall, 
  HelpCircle, HardDrive, CheckCircle, MessageCircle, Phone, Smile, Users, Activity,
  Stethoscope, Cpu, X, Maximize2, Eye, Heart, ChevronLeft, ChevronRight, Phone as PhoneIcon,
  ChevronDown, MapPin, Clock, Mail, ExternalLink, Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, PatientMoment, ContactInfo, Service } from '../types';
import { serviceService, DEFAULT_GREEN_HIGHLIGHT_LINE, DEFAULT_RCT_GREEN_HIGHLIGHT_LINE } from '../utils/serviceData';

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
import cbctScanTechImg from '../assets/images/cbct_scan_tech_1781124177680.png';
const patelDentistPatient1 = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800';
const patelReceptionLounge = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800';
import { GALLERY_ITEMS } from '../data/gallery';
import { PATIENT_MOMENTS } from '../data/patientMoments';



const faqData = [
  {
    question: "How long does a dental implant treatment take?",
    answer: "The complete dental implant process can take a few weeks to a few months depending on healing time and individual cases."
  },
  {
    question: "Are dental implants painful?",
    answer: "Dental implant procedures are performed under local anesthesia and are generally comfortable with minimal discomfort."
  },
  {
    question: "How long do dental implants last?",
    answer: "With proper care and regular dental checkups, dental implants can last for many years and often a lifetime."
  },
  {
    question: "What is Full Mouth Rehabilitation?",
    answer: "Full Mouth Rehabilitation is a comprehensive treatment that restores function, appearance and health of the entire mouth."
  },
  {
    question: "Are Invisible Aligners better than traditional braces?",
    answer: "Invisible aligners are nearly invisible, removable and comfortable, making them a popular alternative for many patients."
  },
  {
    question: "Do you provide CBCT scanning?",
    answer: "Yes, Patel Dental Hospital offers advanced in-house CBCT technology for precise diagnosis and treatment planning."
  },
  {
    question: "How can I book an appointment?",
    answer: "You can call us directly, contact us through WhatsApp or use the appointment form on our website."
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
  videosList?: Array<{ id: string; title: string; treatment: string }>;
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

  const videosToRender = videosList && videosList.length > 0 ? videosList : [
    { id: 'cyai6CjMD0s', title: 'Dental Implants Treatment Experience', treatment: 'Dental Implants' },
    { id: 'SnOxxv_S2ew', title: 'Full Mouth Rehabilitation Success Story', treatment: 'Full Mouth Rehab' },
    { id: '2okui6RFf_k', title: 'Life-changing Invisible Aligners Transformation', treatment: 'Invisible Aligners' },
    { id: '-eoVpGDqCRs', title: 'Patient Testimonial on Digital Dental Care', treatment: 'Advanced Dental Care' },
    { id: 'VZyPnTzlR9U', title: 'Complete Smile Makeover & Dental Implants', treatment: 'Smile Makeover' },
    { id: 'DBejq69FOGI', title: 'Painless Treatment and Care Experience', treatment: 'General Dentistry' }
  ];
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedMomentIndex, setSelectedMomentIndex] = useState<number | null>(null);
  const [selectedOurClinicImgIndex, setSelectedOurClinicImgIndex] = useState<number | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [activeMapBranch, setActiveMapBranch] = useState<'amin_marg' | 'gayatrinagar'>('amin_marg');

  // Architectural readiness for future filtering using Category & Branch metadata
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterBranch, setFilterBranch] = useState<string>('all');

  const filteredClinicImages = mediaImages.filter(img => {
    const matchCategory = filterCategory === 'all' || img.category === filterCategory;
    const matchBranch = filterBranch === 'all' || img.branch === filterBranch;
    return matchCategory && matchBranch;
  });
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});

  const [dbServices, setDbServices] = useState<Service[]>([]);

  React.useEffect(() => {
    serviceService.getServices().then(res => {
      if (res) {
        setDbServices(res);
      }
    }).catch(err => {
      console.error("Error loading services for home page:", err);
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
    <div id="home-page-view" className="relative pt-[72px] bg-gradient-to-b from-sky-100/40 via-sky-50/20 to-transparent">

      {/* 1 & 2. Hero Section & BOTTOM TRUST BAR */}
      <section className="relative z-30 w-full bg-[#FAFAFC] pb-0 lg:pb-0" id="immersive-clinical-hero">
        
        {/* DESKTOP HERO VIEW (ONLY visible on desktop/large tablet screens) */}
        <div className="hidden lg:flex relative w-full h-[900px] min-h-[810px] flex-col justify-between pt-6 lg:pt-20 pb-0">
          {/* Background Image & Wide Gradient Overlay */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            {/* 
              TODO:
              Replace hero collage with doctor's original photo / hospital photo / staff photo once assets are provided.
            */}
            <img
              src={heroBgImage || "/parel doctor.png"}
              alt="Dr. Jaimin Patel and Dr. Kinjal Patel at Patel Dental Hospital reception"
              className="w-full h-full object-cover object-center lg:object-[right_center]"
              referrerPolicy="no-referrer"
            />

          </div>

          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-20 flex flex-col justify-between flex-grow h-full">
            {/* Left Content Area - 31.5% width, shifted 90px to the right */}
            <div className="w-full lg:w-[31.5%] flex flex-col justify-center flex-grow pt-4 pb-12 pr-4 z-20 lg:ml-[90px] relative">
              
              {/* 1. Small trust badge */}
              <div className="mb-4 lg:mb-8 animate-fade-in shadow-sm">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-[#C9A96E] text-[#1E3A5F] font-bold text-[10px] md:text-[11px] uppercase tracking-widest backdrop-blur-md shadow-sm">
                  <span className="mr-1.5">🏆</span> Awarded as Best Dental Hospital in India by FAMDENT
                </span>
              </div>

              {/* 2. Headline */}
              <div className="flex flex-col text-left space-y-2 lg:space-y-3 max-w-[550px]">
                {/* Small Heading */}
                <div className="font-display text-xs lg:text-[13px] font-black tracking-widest uppercase">
                  <span className="text-[#1E3A5F]">Patel Dental Hospital</span> <span className="text-[#1E3A5F]">| Rajkot</span>
                </div>
                {/* Main Heading */}
                <h1 className="font-display text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[46px] leading-[1.15] font-black text-[#1E3A5F] tracking-tight">
                  Give You One More<br />
                  <span className="relative inline-block text-[#00897B]">
                    Reason To Smile
                    {/* Subtle underline accent */}
                    <div className="absolute -bottom-1 lg:-bottom-1.5 left-0 w-full h-[4px] bg-[#C9A96E] rounded-full" />
                  </span>
                </h1>
                {/* Secondary Heading */}
                <div className="font-display text-sm sm:text-base lg:text-[17px] font-bold text-[#1E3A5F] leading-snug pt-1">
                  Advanced Implant Hospital <br className="hidden sm:inline" />
                  <span className="text-[#00897B] font-extrabold">with Fix Teeth in Just One Week</span>
                </div>
              </div>

              {/* Subtitle / Description & Trust Statement */}
              <div className="mt-4 flex flex-col space-y-2.5 text-left max-w-[480px]">
                <p className="font-sans text-sm md:text-base leading-relaxed font-medium text-[#4B5563]">
                  With Patel Dental Hospital, take the first step towards a beautiful smile and better dental health.
                </p>
                <p className="font-sans text-xs md:text-sm font-semibold italic text-[#4B5563]">
                  Experience Modern Dentistry With Gentle Touch.
                </p>
                {/* Trust Statement */}
                <div className="flex items-center space-x-1.5 text-xs md:text-[13px] font-bold text-[#00897B] pt-0.5">
                  <Sparkles className="h-4 w-4 text-[#00897B] animate-pulse" />
                  <span>We Give You A Perfect Smile, Guaranteed.</span>
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
                  <span className="whitespace-nowrap">Book Appointment</span>
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
        <div className="block lg:hidden relative w-full h-[580px] sm:h-[660px] md:h-[720px] overflow-hidden bg-white">
          {/* Main Background Image - Containing doctors, reception desk on left, logo wall on right */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            {/* 
              TODO:
              Replace hero collage with doctor's original photo / hospital photo / staff photo once assets are provided.
            */}
            {/* Mobile background (< 768px/md) */}
            <img 
              src={heroBgImageMobile || heroBgImage || "/patel mobile hero.jpeg"} 
              alt="Dr. Vipul Patel and Dr. Kinjal Patel" 
              className="block md:hidden w-full h-full object-cover object-[center_68%]"
              referrerPolicy="no-referrer"
            />
            {/* Tablet background (>= 768px/md up to lg) */}
            <img 
              src={heroBgImage || "/parel doctor.png"} 
              alt="Dr. Vipul Patel and Dr. Kinjal Patel at Patel Dental Hospital reception" 
              className="hidden md:block w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />

          </div>

          <div className="max-w-xl mx-auto flex flex-col items-center text-center space-y-3.5 px-4 sm:px-6 relative z-10 pt-8 sm:pt-10 pb-4">
            
            {/* 1. Label */}
            <div className="animate-fade-in font-display text-[9px] sm:text-[10.5px] font-black tracking-wider uppercase">
              <span className="text-[#1E3A5F]">Patel Dental Hospital</span> <span className="text-[#1E3A5F]">| Rajkot</span>
            </div>

            {/* 2. Headline */}
            <div className="flex flex-col text-center space-y-1 max-w-[450px]">
              {/* Main Heading */}
              <h1 className="font-display text-[21px] sm:text-[25px] leading-[1.2] font-black text-[#1E3A5F] tracking-tight">
                Give You One More<br />
                <span className="text-[#00897B]">
                  Reason To Smile
                </span>
              </h1>
              {/* Secondary Heading */}
              <div className="font-display text-[11px] sm:text-[12.5px] font-extrabold text-[#1E3A5F] leading-snug">
                Advanced Implant Hospital <span className="text-[#00897B] font-extrabold">with Fix Teeth in Just One Week</span>
              </div>
            </div>

            {/* 3. Short description & Supporting Line & Trust Statement */}
            <div className="flex flex-col space-y-1 text-center max-w-[450px]">
              <p className="font-sans text-[9.5px] min-[360px]:text-[10.5px] min-[400px]:text-[12px] sm:text-[14px] leading-relaxed font-semibold text-[#4B5563]">
                With Patel Dental Hospital, take the first step towards a beautiful smile and better dental health.
              </p>
              <p className="font-sans text-[8.5px] min-[360px]:text-[9.5px] min-[400px]:text-[10.5px] sm:text-[12.5px] font-bold italic text-[#4B5563]">
                Experience Modern Dentistry With Gentle Touch.
              </p>
              {/* Trust Statement */}
              <p className="text-[#00897B] font-sans text-[8.5px] min-[360px]:text-[9.5px] min-[400px]:text-[10.5px] sm:text-[12.5px] font-extrabold flex items-center justify-center space-x-1 mt-0.5">
                <Sparkles className="h-3.5 w-3.5 text-[#00897B] shrink-0 animate-pulse" />
                <span>We Give You A Perfect Smile, Guaranteed.</span>
              </p>
            </div>

            {/* 4 & 5. Buttons below description, horizontal row of two equal buttons with improved styling */}
            <div className="w-full flex flex-row items-center justify-center gap-2 max-w-[340px] sm:max-w-[380px] mx-auto">
              <button
                onClick={openAppointmentModal}
                className="h-[46px] sm:h-[50px] flex-1 bg-[#00897B] hover:bg-[#00796B] text-white text-[11px] sm:text-[12.5px] font-extrabold rounded-[14px] sm:rounded-[16px] shadow-[0_6px_15px_rgba(0,137,123,0.15)] hover:shadow-[0_10px_20px_rgba(0,137,123,0.25)] cursor-pointer flex items-center justify-center space-x-1.5 border border-white/10 relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[50%] before:bg-gradient-to-b before:from-white/15 before:to-transparent before:pointer-events-none transform hover:-translate-y-[2px] active:scale-98 transition-all duration-300"
              >
                <Calendar className="h-[14px] w-[14px] shrink-0" />
                <span className="whitespace-nowrap">Book Appointment</span>
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
                Book an Appointment
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
                  Book Appointment
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

        {/* BOTTOM TRUST BAR - Luxury white floating card centered horizontally with reduced width */}
        <div className="hidden lg:flex absolute left-0 right-0 bottom-0 translate-y-1/2 z-40 px-4 sm:px-6 justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-[78%] max-w-[1180px] bg-white border border-slate-100/90 rounded-2xl md:rounded-[28px] py-6 px-6 lg:px-8 shadow-[0_20px_40px_rgba(8,28,58,0.12)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center relative hover:shadow-[0_25px_45px_rgba(8,28,58,0.16)] transition-all duration-500 pointer-events-auto"
          >
            {/* Specialist Strength 1 */}
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 md:h-14 md:w-14 bg-sky-50 border border-sky-100/50 rounded-full flex items-center justify-center text-[#0EA5E9] shrink-0 shadow-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-bold text-[#081C3A] text-[14px] lg:text-[15px] xl:text-[16px] leading-tight mb-1">
                  Dental Implant Specialists
                </span>
                <span className="text-[12px] sm:text-[13px] text-slate-500 font-medium tracking-wide leading-normal">
                  Advanced Implant Solutions
                </span>
              </div>
            </div>

            {/* Specialist Strength 2 */}
            <div className="flex items-center space-x-4 lg:border-l lg:border-slate-200/40 lg:pl-8">
              <div className="h-12 w-12 md:h-14 md:w-14 bg-[#F0FDFA] border border-[#CCFBF1] rounded-full flex items-center justify-center text-[#14B8A6] shrink-0 shadow-sm">
                <Smile className="h-6 w-6 text-[#14B8A6]" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-bold text-[#081C3A] text-[14px] lg:text-[15px] xl:text-[16px] leading-tight mb-1">
                  Invisible Aligner Experts
                </span>
                <span className="text-[12px] sm:text-[13px] text-slate-500 font-medium tracking-wide leading-normal">
                  Modern Invisible Orthodontics
                </span>
              </div>
            </div>

            {/* Specialist Strength 3 */}
            <div className="flex items-center space-x-4 lg:border-l lg:border-slate-200/40 lg:pl-8">
              <div className="h-12 w-12 md:h-14 md:w-14 bg-blue-50/70 border border-blue-100/50 rounded-full flex items-center justify-center text-[#0284c7] shrink-0 shadow-sm">
                <Activity className="h-6 w-6" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-bold text-[#081C3A] text-[14px] lg:text-[15px] xl:text-[16px] leading-tight mb-1">
                  FMR & Root Canal Specialists
                </span>
                <span className="text-[12px] sm:text-[13px] text-slate-500 font-medium tracking-wide leading-normal">
                  Comprehensive Smile Rehabilitation
                </span>
              </div>
            </div>

            {/* Specialist Strength 4 */}
            <div className="flex items-center space-x-4 lg:border-l lg:border-slate-200/40 lg:pl-8">
              <div className="h-12 w-12 md:h-14 md:w-14 bg-emerald-50/50 border border-emerald-100/40 rounded-full flex items-center justify-center text-[#10B981] shrink-0 shadow-sm">
                <Cpu className="h-6 w-6" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-bold text-[#081C3A] text-[14px] lg:text-[15px] xl:text-[16px] leading-tight mb-1">
                  In-house CBCT Technology
                </span>
                <span className="text-[12px] sm:text-[13px] text-slate-500 font-medium tracking-wide leading-normal">
                  Advanced Digital Diagnosis
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
              Trusted Numbers Behind Thousands of Successful Smiles
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mt-2 sm:mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-5 lg:gap-6">
            {[
              {
                value: 20000,
                suffix: "+",
                title: "Happy Families",
                subtitle: "Trusted Patient Community",
                icon: "/family-silhouette-svgrepo-com.svg",
                color: "text-[#11B5D8]",
                bgColor: "bg-sky-50",
                borderColor: "border-sky-100",
              },
              {
                value: 45000,
                suffix: "+",
                title: "Satisfied Patients",
                subtitle: "Exceptional Success Rate",
                icon: "/happy-face-2-svgrepo-com.svg",
                color: "text-[#0ea5e9]",
                bgColor: "bg-blue-50/70",
                borderColor: "border-blue-100/50",
              },
              {
                value: 4000,
                suffix: "+",
                title: "NRI Patients",
                subtitle: "Global Smile Standards",
                icon: "/worldwide-world-svgrepo-com.svg",
                color: "text-[#14B8A6]",
                bgColor: "bg-[#F0FDFA]",
                borderColor: "border-[#CCFBF1]",
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
                value: 15000,
                suffix: "+",
                title: "Dental Implants",
                subtitle: "Fixed Teeth Solutions",
                icon: "/tooth-svgrepo-com (1).svg",
                color: "text-rose-500",
                bgColor: "bg-rose-50/50",
                borderColor: "border-rose-100/40",
              },
              {
                value: 11,
                suffix: "+",
                title: "Years of Establishment",
                subtitle: "Serving Since 2015",
                icon: "/calendar-filled-svgrepo-com.svg",
                color: "text-purple-500",
                bgColor: "bg-purple-50/50",
                borderColor: "border-purple-100/40",
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

      {/* Services Section */}
      <section className="pt-12 sm:pt-16 lg:pt-32 pb-24 lg:pb-32 bg-[#FAFAFC] relative z-10 border-t border-slate-100" id="services">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <h2 className="font-display font-[900] text-[#081C3A] text-[36px] sm:text-[44px] md:text-[52px] tracking-tight leading-none mb-3 uppercase">
              SERVICES
            </h2>
            <p className="text-slate-550 text-[15px] sm:text-[17px] md:text-[19px] font-medium tracking-wide">
              Complete Dentistry Under One Roof
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
                const appointmentText = mConfig.cta_appointment_text || 'Book Appointment';
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

      {/* 4. Patient Video Testimonials */}
      <section className="py-16 sm:py-20 bg-white relative z-10 border-t border-sky-100/30" id="patient-success-stories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              PATIENT SUCCESS STORIES
            </span>
            <h2 className="font-display font-[800] text-[#081C3A] text-[20px] sm:text-[23px] md:text-[26px] lg:text-[28px] tracking-tight leading-tight mb-3">
              Real Experiences from Patel Dental Hospital Patients
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
                className="bg-white rounded-[16px] overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(8,28,58,0.03)] hover:shadow-[0_20px_40px_rgba(8,28,58,0.08)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col"
              >
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
              </motion.div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 flex justify-center">
            <button
              onClick={openAppointmentModal}
              className="flex items-center text-[13px] sm:text-[14px] font-bold text-white bg-gradient-to-r from-[#0D9488] to-[#0ea5e9] hover:from-[#0F766E] hover:to-[#0284c7] px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(13,148,136,0.25)] hover:shadow-lg cursor-pointer transition-all duration-300 transform active:scale-95"
            >
              <Calendar className="h-4 w-4 mr-2" />
              View More Patient Stories
            </button>
          </div>

        </div>
      </section>

      {/* 5. Take a Virtual Tour of Patel Dental Hospital */}
      <section className="py-16 sm:py-20 bg-white relative z-10 border-t border-slate-100" id="clinic-virtual-tour">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#081C3A]/[0.03] to-[#0D9488]/[0.03] rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgba(8,28,58,0.02)] p-6 sm:p-8 lg:p-10 max-w-6xl mx-auto overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0D9488]/10 to-transparent rounded-full blur-2xl -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#11B5D8]/10 to-transparent rounded-full blur-2xl -z-10 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 w-full animate-fadeIn">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="aspect-video w-full bg-slate-900 rounded-[16px] overflow-hidden shadow-[0_12px_24px_rgba(8,28,58,0.06)] border border-white/40 relative"
                >
                  <iframe
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    src="https://www.youtube.com/embed/cbVcmy53KBs?rel=0"
                    title="Take a Virtual Tour of Patel Dental Hospital"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </motion.div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
                    CLINIC VIRTUAL TOUR
                  </span>
                  <h2 className="font-display font-[800] text-[#081C3A] text-[20px] sm:text-[23px] md:text-[26px] lg:text-[28px] tracking-tight leading-tight mb-4">
                    Take a Virtual Tour of Patel Dental Hospital
                  </h2>
                  <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mb-5 rounded-full" />
                  <p className="text-slate-550 text-[14px] sm:text-[15px] font-medium tracking-wide leading-relaxed mb-6">
                    Explore our advanced dental infrastructure, sterilization standards, CBCT technology and patient-friendly treatment environment.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {[
                      "Advanced Implant Center",
                      "In-house CBCT Technology",
                      "Digital Dentistry",
                      "International Sterilization Standards"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <span className="text-[#0D9488] font-bold text-[15px] leading-none mt-0.5">•</span>
                        <span className="text-slate-650 text-[13.5px] sm:text-[14px] font-semibold leading-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <button
                      onClick={openAppointmentModal}
                      className="inline-flex items-center text-[13px] sm:text-[14px] font-bold text-white bg-gradient-to-r from-[#0D9488] to-[#0ea5e9] hover:from-[#0F766E] hover:to-[#0284c7] px-6 sm:px-8 py-3 rounded-xl shadow-[0_4px_14px_0_rgba(13,148,136,0.25)] hover:shadow-lg cursor-pointer transition-all duration-300 transform active:scale-95"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Advanced Technology & Excellence Section */}
      <section className="py-16 sm:py-20 bg-white relative z-10 border-t border-slate-100" id="advanced-tech-standards">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              Advanced Technology & International Standards
            </span>
            <h2 className="font-display font-[800] text-[#081C3A] text-[20px] sm:text-[23px] md:text-[26px] lg:text-[28px] tracking-tight leading-tight mb-3">
              Delivering World-Class Dental Care with Advanced Technology and Global Quality Standards
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
            <p className="text-slate-550 text-[14px] sm:text-[15px] font-medium tracking-wide leading-relaxed">
              We leverage state-of-the-art diagnostic equipment and safety-certified materials to guarantee outstanding clinical accuracy, safety, and long-term success of your treatments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {/* Card 1: USA FDA Approved Implant Materials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_4px_25px_rgba(8,28,58,0.03)] hover:shadow-[0_20px_45px_rgba(8,28,58,0.09)] hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="aspect-[16/10] w-full bg-slate-50 relative overflow-hidden shrink-0 border-b border-slate-100">
                <img
                  src={fdaApprovedImplantImg}
                  alt="USA FDA Approved Implant Materials"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#F0FDFA] border border-[#CCFBF1] text-[#0D9488] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                  ★ Safety Standard Certified
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-[#081C3A] text-[18px] sm:text-[20px] leading-tight mb-3 group-hover:text-[#0D9488] transition-colors duration-300">
                    USA FDA Approved Implant Materials
                  </h3>
                  <p className="text-slate-550 text-[14px] sm:text-[14.5px] font-medium leading-relaxed mb-6">
                    Every implant treatment uses internationally recognized USA FDA Approved implant materials to ensure safety, durability and long-term success.
                  </p>
                  
                  <div className="space-y-2.5">
                    {[
                      "100% Biocompatible Titanium for flawless bone integration",
                      "Certified international brands with global lifetime warranties",
                      "Rigorous sterilization protocols customized for implant site prep"
                    ].map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2.5">
                        <span className="text-[#0D9488] font-bold text-[16px] leading-none mt-0.5">•</span>
                        <span className="text-slate-650 text-[13px] sm:text-[13.5px] font-semibold leading-relaxed">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 pt-5 border-t border-slate-50 flex items-center justify-between text-[#0D9488] text-[12.5px] sm:text-[13px] font-bold">
                  <span>Premium Medical Grade</span>
                  <span className="flex items-center text-[#11B5D8]">
                    Learn more <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: In-house CBCT Technology */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_4px_25px_rgba(8,28,58,0.03)] hover:shadow-[0_20px_45px_rgba(8,28,58,0.09)] hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="aspect-[16/10] w-full bg-slate-50 relative overflow-hidden shrink-0 border-b border-slate-100">
                <img
                  src={cbctScanTechImg}
                  alt="In-house CBCT Technology"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-sky-50 border border-sky-100 text-[#0ea5e9] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                  ★ Advanced 3D Diagnostics
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-[#081C3A] text-[18px] sm:text-[20px] leading-tight mb-3 group-hover:text-[#0D9488] transition-colors duration-300">
                    In-house CBCT Technology
                  </h3>
                  <p className="text-slate-550 text-[14px] sm:text-[14.5px] font-medium leading-relaxed mb-6">
                    Advanced 3D CBCT scanning technology for accurate diagnosis, treatment planning and predictable implant outcomes.
                  </p>

                  <div className="space-y-2.5">
                    {[
                      "High-resolution 3D bone densitometry and anatomical mapping",
                      "Ultra-low radiation dose diagnostic scanning protocol",
                      "Enables computer-assisted minimally invasive safe surgery"
                    ].map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2.5">
                        <span className="text-[#0D9488] font-bold text-[16px] leading-none mt-0.5">•</span>
                        <span className="text-slate-650 text-[13px] sm:text-[13.5px] font-semibold leading-relaxed">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-50 flex items-center justify-between text-[#0D9488] text-[12.5px] sm:text-[13px] font-bold">
                  <span>Digital Dentistry Suite</span>
                  <span className="flex items-center text-[#11B5D8]">
                    Learn more <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 7. Happy Smiles & Patient Moments Gallery */}
      <section className="py-16 sm:py-20 bg-white relative z-10 border-t border-slate-100" id="happy-smiles-gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              HAPPY SMILES & PATIENT MOMENTS
            </span>
            <h2 className="font-display font-[800] text-[#081C3A] text-[20px] sm:text-[23px] md:text-[26px] lg:text-[28px] tracking-tight leading-tight mb-3">
              Happy Smiles & Patient Moments
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
            <p className="text-[#0D9488] font-[700] text-[14px] sm:text-[15px] tracking-wide leading-relaxed">
              Real smiles and memorable moments from Patel Dental Hospital.
            </p>
          </div>

          {/* Masonry pure-image layout columns */}
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-5 space-y-5 [column-fill:_balance]">
            {momentsToRender.slice(0, visibleCount).map((moment, index) => (
              <motion.div
                key={moment.id}
                id={`patient-moment-card-${moment.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (index % 4) * 0.05 }}
                onClick={() => setSelectedMomentIndex(index)}
                className="break-inside-avoid bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(8,28,58,0.015)] hover:shadow-[0_16px_35px_rgba(8,28,58,0.08)] transition-all duration-300 group cursor-pointer relative"
              >
                <div className="overflow-hidden relative bg-slate-50">
                  <img
                    src={moment.image}
                    alt="Patel Dental Hospital Patient Moment"
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/95 backdrop-blur-xs p-3.5 rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                      <Maximize2 className="h-5 w-5 text-[#0D9488]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Photos toggle controls */}
          {visibleCount < momentsToRender.length && (
            <div className="mt-12 sm:mt-16 flex justify-center">
              <button
                id="btn-view-more-photos"
                onClick={() => setVisibleCount(momentsToRender.length)}
                className="flex items-center text-[13px] sm:text-[14px] font-bold text-white bg-gradient-to-r from-[#0D9488] to-[#0ea5e9] hover:from-[#0F766E] hover:to-[#0284c7] px-8 py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(13,148,136,0.25)] hover:shadow-lg cursor-pointer transition-all duration-300 transform active:scale-95"
              >
                <Eye className="h-4 w-4 mr-2" />
                View More Photos
              </button>
            </div>
          )}

        </div>

        {/* Lightbox Modal overlay specifically designed for smiling patient moments */}
        <AnimatePresence>
          {selectedMomentIndex !== null && (() => {
            const currentItem = momentsToRender[selectedMomentIndex];
            
            const handlePrev = (e?: React.MouseEvent) => {
              e?.stopPropagation();
              setSelectedMomentIndex((prev) => 
                prev !== null ? (prev === 0 ? momentsToRender.length - 1 : prev - 1) : null
              );
            };

            const handleNext = (e?: React.MouseEvent) => {
              e?.stopPropagation();
              setSelectedMomentIndex((prev) => 
                prev !== null ? (prev === momentsToRender.length - 1 ? 0 : prev + 1) : null
              );
            };

            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-[200] flex items-center justify-center p-3 sm:p-6 md:p-10 select-none cursor-default"
                onClick={() => setSelectedMomentIndex(null)}
              >
                <button
                  id="lightbox-close-button"
                  onClick={() => setSelectedMomentIndex(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-all duration-200 cursor-pointer z-[210] shadow-md hover:scale-105 flex items-center justify-center"
                  title="Close Gallery"
                >
                  <X className="h-5 w-5" />
                </button>

                <button
                  id="lightbox-prev-button"
                  onClick={handlePrev}
                  className="absolute left-3 sm:left-6 bg-white/10 hover:bg-white/20 text-white p-3 sm:p-4 rounded-full transition-all duration-200 cursor-pointer z-[210] shadow-md hover:scale-105 flex items-center justify-center"
                  title="Previous Photo"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>

                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  transition={{ type: "spring", damping: 25, stiffness: 180 }}
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-4xl max-h-[85vh] z-[205] overflow-hidden rounded-3xl relative flex flex-col justify-center items-center"
                >
                  <img
                    src={currentItem.image}
                    alt="Patient Moment Zoomed"
                    className="max-w-full max-h-[85vh] object-contain rounded-3xl shadow-2xl pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 bg-[#081C3A]/70 backdrop-blur-md px-4 py-1.5 rounded-full text-white/90 font-mono text-[11px] tracking-wider uppercase select-none">
                    Photo {selectedMomentIndex + 1} of {momentsToRender.length}
                  </div>
                </motion.div>

                <button
                  id="lightbox-next-button"
                  onClick={handleNext}
                  className="absolute right-3 sm:right-6 bg-white/10 hover:bg-white/20 text-white p-3 sm:p-4 rounded-full transition-all duration-200 cursor-pointer z-[210] shadow-md hover:scale-105 flex items-center justify-center"
                  title="Next Photo"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </section>

      {/* Brand New Section: Our Clinic Gallery */}
      <section className="py-16 sm:py-24 bg-white relative z-10 border-t border-slate-100" id="our-clinic-gallery-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-sky-600 font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              CLINIC ENVIRONMENT & SPACES
            </span>
            <h2 className="font-display font-[800] text-[#081C3A] text-[20px] sm:text-[23px] md:text-[26px] lg:text-[28px] tracking-tight leading-tight mb-3">
              Our Clinic Gallery
            </h2>
            <div className="h-[2.5px] w-12 bg-gradient-to-r from-sky-400 to-sky-600 mx-auto mb-4 rounded-full" />
            <p className="text-slate-500 font-medium text-[14px] sm:text-[15px] tracking-wide leading-relaxed">
              Explore our modern dental clinic, advanced equipment, treatment rooms and patient care environment.
            </p>

            {/* Architectural readiness for future filtering using Category & Branch metadata */}
            {/* 
              Future Filtering UI can be placed here.
              Category options: "Homepage Slider", "Homepage Gallery", "Before / After", "Clinic Interior", etc.
              Branch options: "All Branches", "Mavdi Branch", "Gayatrinagar Branch", etc.
            */}
          </div>

          {/* Gallery Grid or Empty State */}
          {filteredClinicImages.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 max-w-md mx-auto">
              <p className="text-slate-400 text-[14px] font-medium">No gallery images available.</p>
            </div>
          ) : (
            <div 
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              id="clinic-gallery-grid"
            >
              {filteredClinicImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  id={`clinic-gallery-card-${image.id}`}
                  data-id={image.id} /* Prepared for future drag-and-drop sorting */
                  className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md border border-slate-100/80 transition-all duration-300"
                  onClick={() => setSelectedOurClinicImgIndex(index)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                  /* Future drag-and-drop attributes:
                     draggable
                     onDragStart={(e) => handleDragStart(e, image.id)}
                     onDragOver={(e) => handleDragOver(e)}
                     onDrop={(e) => handleDrop(e, image.id)}
                  */
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-50 relative">
                    <img
                      src={image.url}
                      alt={image.altText || image.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark overlay & Zoom/Maximize Icon */}
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/95 text-sky-600 p-3 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <Maximize2 className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Architectural metadata badge for Category & Branch (Future-ready architecture) */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.category && (
                        <span className="bg-slate-900/75 backdrop-blur-xs text-[10px] text-white font-semibold px-2 py-0.5 rounded-md">
                          {image.category}
                        </span>
                      )}
                      {image.branch && (
                        <span className="bg-sky-600/90 backdrop-blur-xs text-[10px] text-white font-semibold px-2 py-0.5 rounded-md">
                          {image.branch}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-4 border-t border-slate-50">
                    <h3 className="text-slate-800 text-[13.5px] sm:text-[14px] font-bold truncate group-hover:text-sky-600 transition-colors duration-200">
                      {image.title || 'Clinic Space'}
                    </h3>
                    <p className="text-slate-400 text-[11px] sm:text-[12px] truncate mt-0.5 font-medium">
                      {image.altText || 'Patel Dental Hospital Space'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>

        {/* Lightbox Modal overlay for Clinic Gallery */}
        <AnimatePresence>
          {selectedOurClinicImgIndex !== null && (() => {
            const currentItem = filteredClinicImages[selectedOurClinicImgIndex];
            if (!currentItem) return null;

            const handlePrev = (e?: React.MouseEvent) => {
              e?.stopPropagation();
              setSelectedOurClinicImgIndex((prev) => 
                prev !== null ? (prev === 0 ? filteredClinicImages.length - 1 : prev - 1) : null
              );
            };

            const handleNext = (e?: React.MouseEvent) => {
              e?.stopPropagation();
              setSelectedOurClinicImgIndex((prev) => 
                prev !== null ? (prev === filteredClinicImages.length - 1 ? 0 : prev + 1) : null
              );
            };

            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-[200] flex items-center justify-center p-3 sm:p-6 md:p-10 select-none cursor-default"
                onClick={() => setSelectedOurClinicImgIndex(null)}
              >
                {/* Close Button */}
                <button
                  id="clinic-lightbox-close-btn"
                  onClick={() => setSelectedOurClinicImgIndex(null)}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-all duration-200 cursor-pointer z-[210] shadow-md hover:scale-105 flex items-center justify-center"
                  title="Close Gallery"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Prev Button */}
                <button
                  id="clinic-lightbox-prev-btn"
                  onClick={handlePrev}
                  className="absolute left-3 sm:left-6 bg-white/10 hover:bg-white/20 text-white p-3 sm:p-4 rounded-full transition-all duration-200 cursor-pointer z-[210] shadow-md hover:scale-105 flex items-center justify-center"
                  title="Previous Image"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>

                {/* Main Content Card */}
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  transition={{ type: "spring", damping: 25, stiffness: 180 }}
                  className="max-w-4xl w-full max-h-[85vh] bg-[#0B1528] rounded-[24px] overflow-hidden border border-white/10 shadow-2xl flex flex-col relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Image container */}
                  <div className="relative flex-grow bg-black/40 flex items-center justify-center overflow-hidden min-h-0">
                    <img
                      src={currentItem.url}
                      alt={currentItem.title}
                      className="max-w-full max-h-[60vh] object-contain select-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Metadata banner panel at base */}
                  <div className="p-5 sm:p-6 bg-slate-900 border-t border-white/5 relative z-10 shrink-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-sky-400 font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block">
                          {currentItem.category || "Clinic Space"}
                        </span>
                        <h3 className="text-white font-extrabold text-[15px] sm:text-[17px] tracking-tight leading-tight">
                          {currentItem.title}
                        </h3>
                        {currentItem.altText && (
                          <p className="text-slate-400 text-[12px] font-medium leading-relaxed">
                            {currentItem.altText}
                          </p>
                        )}
                      </div>

                      {/* Display Branch */}
                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">Branch:</span>
                        <span className="bg-sky-500/10 text-sky-400 text-[11px] font-bold px-2.5 py-1 rounded-md border border-sky-500/20">
                          {currentItem.branch || "All Branches"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Next Button */}
                <button
                  id="clinic-lightbox-next-btn"
                  onClick={handleNext}
                  className="absolute right-3 sm:right-6 bg-white/10 hover:bg-white/20 text-white p-3 sm:p-4 rounded-full transition-all duration-200 cursor-pointer z-[210] shadow-md hover:scale-105 flex items-center justify-center"
                  title="Next Image"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </motion.div>
            );
          })()}
        </AnimatePresence>
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
                
                <h2 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-4">
                  Book Your Consultation Today
                </h2>

                <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mb-6 rounded-full" />

                <p className="text-slate-550 text-[14px] sm:text-[15px] font-medium leading-relaxed mb-8">
                  Take the first step towards a confident smile with Patel Dental Hospital's advanced Implant, Full Mouth Rehabilitation and Invisible Aligner treatments.
                </p>

                {/* Key Highlights list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    "Implant Specialists",
                    "Full Mouth Rehabilitation Experts",
                    "Invisible Aligner Solutions",
                    "In-house CBCT Technology"
                  ].map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center shrink-0">
                        <CheckCircle className="h-3 w-3 text-[#0ea5e9] stroke-[3]" />
                      </div>
                      <span className="text-slate-700 text-[13px] sm:text-[13.5px] font-bold">
                        {highlight}
                      </span>
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
                      Book Appointment
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

              {/* Right Side Video - lg:col-span-7 */}
              <div className="lg:col-span-7 w-full flex flex-col justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98, x: 30 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="aspect-video w-full bg-slate-900 rounded-[24px] overflow-hidden shadow-[0_15px_40px_rgba(8,28,58,0.12)] border border-white/60 relative"
                >
                  <iframe
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    src="https://www.youtube.com/embed/cbVcmy53KBs?rel=0"
                    title="Patel Dental Hospital Promotional Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </motion.div>
                <p className="text-slate-400 text-center font-bold text-[11px] tracking-wider uppercase mt-4">
                  ★ Tour our premium state-of-the-art treatment spaces
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 10. Take A Virtual Tour Of Patel Dental Hospital */}
      <section className="py-16 sm:py-24 bg-slate-50/50 relative z-10 border-t border-slate-100" id="virtual-tour-duo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              CLINIC VIRTUAL TOUR
            </span>
            <h2 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-3">
              Take A Virtual Tour Of Patel Dental Hospital
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
            <p className="text-slate-550 text-[14px] sm:text-[15px] font-medium tracking-wide leading-relaxed">
              Step inside our medical center and meet our specialized expert team committed to delivering world-class dental care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {/* Video 1: Virtual Tour */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="bg-white rounded-[20px] overflow-hidden border border-slate-100 shadow-[0_4px_25px_rgba(8,28,58,0.03)] hover:shadow-[0_20px_45px_rgba(8,28,58,0.09)] hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="aspect-video w-full bg-slate-900 relative overflow-hidden shrink-0 border-b border-slate-100">
                <iframe
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  src="https://www.youtube.com/embed/cbVcmy53KBs?rel=0"
                  title="Virtual Tour of Patel Dental Hospital"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-[#081C3A] text-[16px] sm:text-[18px] leading-tight mb-2 group-hover:text-[#0D9488] transition-colors duration-300">
                    Virtual Tour of Patel Dental Hospital
                  </h3>
                  <p className="text-slate-500 text-[13px] sm:text-[13.5px] font-medium leading-relaxed">
                    Explore our premium treatment operatories, in-house CBCT 3D diagnostic suite, sterilization facility, and fully digital patient care environments.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Video 2: Meet the Team */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-[20px] overflow-hidden border border-slate-100 shadow-[0_4px_25px_rgba(8,28,58,0.03)] hover:shadow-[0_20px_45px_rgba(8,28,58,0.09)] hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="aspect-video w-full bg-slate-900 relative overflow-hidden shrink-0 border-b border-slate-100">
                <iframe
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  src="https://www.youtube.com/embed/cbVcmy53KBs?rel=0&start=15"
                  title="Meet Our Dental Specialists & Team"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-[#081C3A] text-[16px] sm:text-[18px] leading-tight mb-2 group-hover:text-[#0D9488] transition-colors duration-300">
                    Meet Our Dental Specialists & Team
                  </h3>
                  <p className="text-slate-500 text-[13px] sm:text-[13.5px] font-medium leading-relaxed">
                    Meet Dr. Jaimin Patel, Dr. Kinjal Patel, and our dedicated nursing team delivering empathetic consultations and high-success clinical care.
                  </p>
                </div>
              </div>
            </motion.div>
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
            <h2 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-3">
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
                  At Patel Dental Hospital, we combine advanced dental technology with personalized care to deliver long-lasting treatment results. Our expertise includes Dental Implants, Full Mouth Rehabilitation, Invisible Aligners, Root Canal Treatments and Cosmetic Dentistry.
                </p>
                <p>
                  Our focus is not only on treating dental problems but also on improving confidence, comfort and overall oral health through modern, patient-centered care.
                </p>
                <p>
                  With thousands of successful treatments and years of clinical experience, Patel Dental Hospital continues to be a trusted destination for advanced dental solutions in Rajkot.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 sm:mt-8">
                <p className="font-display font-black text-[#081C3A] text-[18px] sm:text-[20px] mb-0.5">
                  Dr. Vipul Patel
                </p>
                <p className="text-[#0D9488] text-[12.5px] sm:text-[13px] font-bold tracking-wider uppercase">
                  Chief Dental Surgeon & Implantologist
                </p>
              </div>
            </div>

            {/* Right Side: Responsive Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className="rounded-[20px] overflow-hidden aspect-video bg-slate-900 relative shadow-[0_15px_45px_rgba(8,28,58,0.1)] border border-slate-100 group">
                <iframe
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  src="https://www.youtube.com/embed/cbVcmy53KBs?rel=0"
                  title="Patel Dental Hospital Promotional Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
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
            <h2 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-3">
              What Our Patients Say
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
            <p className="text-slate-550 text-[14px] sm:text-[15px] font-medium tracking-wide leading-relaxed">
              Real Google Reviews From Patel Dental Hospital Patients
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
            <h2 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-3">
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
                  Take the first step towards a healthier and more confident smile. Schedule your consultation with Patel Dental Hospital today.
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
                  Book Appointment
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
                  src={patelReceptionLounge}
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
            <h2 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-3">
              Frequently Asked Questions
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
            <p className="text-slate-550 text-[14px] sm:text-[15px] font-medium tracking-wide leading-relaxed">
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
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Side: Contact details */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase block mb-1">
                  FIND OUR CLINICS
                </span>
                <h2 className="font-display font-[900] text-[#081C3A] text-[28px] sm:text-[36px] md:text-[40px] leading-tight tracking-tight">
                  Visit Patel Dental Hospital
                </h2>
                <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mb-4 rounded-full" />
                <p className="text-slate-500 text-[14.5px] sm:text-[16px] font-medium leading-relaxed">
                  We look forward to welcoming you at our state-of-the-art clinics in Rajkot. Enjoy advanced, computerized dental care in a comfortable, sterile-certified environment. Choose a branch to view specific location maps.
                </p>
              </div>

              {/* Branch Quick Selector Tabs */}
              <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-100 gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveMapBranch('amin_marg')}
                  className={`flex-1 py-3 px-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                    activeMapBranch === 'amin_marg'
                      ? 'bg-white shadow-[0_4px_12px_rgba(8,28,58,0.04)] text-[#0D9488] border border-slate-100'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Amin Marg Branch (Main)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMapBranch('gayatrinagar')}
                  className={`flex-1 py-3 px-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                    activeMapBranch === 'gayatrinagar'
                      ? 'bg-white shadow-[0_4px_12px_rgba(8,28,58,0.04)] text-[#0D9488] border border-slate-100'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Gayatrinagar Branch
                </button>
              </div>

              {/* Multi-Branch card information */}
              <div className="bg-slate-50/50 border border-slate-100/70 rounded-[20px] p-6 sm:p-8 space-y-6 hover:shadow-[0_8px_30px_rgba(8,28,58,0.02)] transition-all duration-300">
                <div className="space-y-4">
                  {/* Hospital Name */}
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#0D9488] block mb-0.5">
                      HOSPITAL NAME
                    </span>
                    <h3 className="font-display font-[900] text-[#081C3A] text-lg sm:text-xl">
                      Patel Dental Hospital {activeMapBranch === 'amin_marg' ? '(Amin Marg Main Branch)' : '(Gayatrinagar Branch)'}
                    </h3>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3 pt-4 border-t border-slate-100">
                    <MapPin className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
                        ADDRESS
                      </span>
                      <p className="text-slate-600 font-semibold text-[13.5px] leading-relaxed">
                        {activeMapBranch === 'amin_marg' 
                          ? '1st Floor, Business Centrum Complex, Opp. Kings Heights, Beside Golden Super Market, Pandit Deendayal Upadhyay Road, Rajnagar Chowk to Amin Marg Road, Rajkot – 360001' 
                          : '1st Floor, Rameshwar Complex, Opp. SBI Bank, Gayatrinagar Road, Jalaram Chowk, Bhaktinagar Circle, Rajkot'}
                      </p>
                    </div>
                  </div>

                  {/* Contact Phone & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div className="flex items-start gap-3">
                      <Phone className="w-4.5 h-4.5 text-[#11B5D8] shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
                          PHONE NUMBER
                        </span>
                        <a 
                          href={`tel:${phoneRaw}`} 
                          className="block text-[#081C3A] font-black text-[14px] hover:text-[#0D9488] transition-colors"
                        >
                          {displayPhone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-4.5 h-4.5 text-[#11B5D8] shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
                          EMAIL ADDRESS
                        </span>
                        <a 
                          href="mailto:info@pateldentalrajkot.com" 
                          className="block text-[#081C3A] font-extrabold text-[13px] hover:text-[#0D9488] transition-colors break-all"
                        >
                          info@pateldentalrajkot.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-3 pt-4 border-t border-slate-100">
                    <Clock className="w-4.5 h-4.5 text-[#0ea5e9] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
                        WORKING HOURS
                      </span>
                      <div className="text-slate-600 font-semibold text-[13px] space-y-0.5 mt-1">
                        <p><strong className="text-slate-700">Mon &ndash; Sat Morning:</strong> 09:00 AM &ndash; 01:00 PM</p>
                        <p><strong className="text-slate-700">Mon &ndash; Sat Evening:</strong> 04:00 PM &ndash; 08:00 PM</p>
                        <p><strong className="text-amber-600">Sunday Schedules:</strong> Prior Appointments Only</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lower Buttons row */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                  <a
                    href={activeMapBranch === 'amin_marg' 
                      ? 'https://share.google/JKMC3jmTqdylcXUJn' 
                      : 'https://share.google/Gsdeg6MvRtha7sREX'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center text-[13px] font-bold text-white bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] hover:from-[#0284c7] hover:to-[#0369a1] px-5 py-3.5 rounded-xl shadow-[0_4px_14px_rgba(14,165,233,0.25)] hover:shadow-md cursor-pointer transition-all duration-300 text-center"
                  >
                    <MapPin className="h-4 w-4 mr-1.5 shrink-0" />
                    Get Directions
                  </a>
                  
                  <a
                    href={`tel:${phoneRaw}`}
                    className="inline-flex items-center justify-center text-[13px] font-bold text-[#081C3A] bg-white hover:bg-slate-50 px-5 py-3.5 rounded-xl border border-slate-200 shadow-sm cursor-pointer transition-all duration-300 text-center shrink-0"
                  >
                    <Phone className="h-4 w-4 mr-1.5 shrink-0 text-[#0ea5e9]" />
                    Call Now
                  </a>

                  <a
                    href={`https://wa.me/${whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-[13px] font-bold text-[#0D9488] bg-[#EBFDFB] hover:bg-[#CCFBF1] px-5 py-3.5 rounded-xl border border-[#CCFBF1] cursor-pointer transition-all duration-300 text-center shrink-0"
                  >
                    <svg className="w-4 h-4 mr-1.5 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.46 3.473 1.332 4.978l-1.354 4.947 5.074-1.329c1.455.795 3.09 1.215 4.751 1.217h.004c5.503 0 10.015-4.482 10.015-9.988 0-2.668-1.039-5.176-2.927-7.065C17.142 2.927 14.654 2 12.012 2zm6.918 13.916c-.302.851-1.481 1.564-2.03 1.614-.543.05-1.085.253-3.486-.698-2.887-1.144-4.708-4.088-4.851-4.28-.142-.191-1.151-1.536-1.151-2.929 0-1.392.711-2.078.966-2.355.255-.276.553-.346.737-.346.184 0 .368.002.528.01.169.008.397-.064.622.482.23.559.78 1.901.848 2.039.068.139.113.301.021.485-.092.184-.139.299-.276.46-.139.162-.291.36-.416.483-.139.138-.284.288-.121.567.162.279.722 1.189 1.549 1.921.1.088.194.175.289.261 1.071.954 1.884 1.222 2.184 1.373.3.151.474.126.651-.077.177-.203.76-.884.966-1.186.205-.302.41-.252.691-.151.282.101 1.782.84 2.091.995.31.156.516.233.593.364.077.132.077.76-.225 1.611z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Embedded Map container */}
            <div className="lg:col-span-6 h-full min-h-[440px] lg:min-h-[520px]">
              <div className="rounded-[24px] overflow-hidden bg-slate-100 border border-slate-150 h-full w-full shadow-[0_15px_45px_rgba(8,28,58,0.03)] relative group flex flex-col">
                
                {/* Custom active heading bar on the map block */}
                <div className="bg-slate-50 border-b border-slate-150 py-3.5 px-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0D9488]"></div>
                    <span className="text-[#081C3A] text-xs font-bold uppercase tracking-wider">
                      Interactive Location Map
                    </span>
                  </div>
                  <span className="text-[10px] bg-slate-200/70 text-slate-600 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    {activeMapBranch === 'amin_marg' ? 'Amin Marg Main Branch' : 'Gayatrinagar Branch'}
                  </span>
                </div>

                {/* Map iframe wrapper */}
                <div className="relative flex-1 min-h-[350px]">
                  {activeMapBranch === 'amin_marg' ? (
                    <iframe
                      id="google-map-iframe-amin-marg"
                      className="w-full h-full border-0 absolute inset-0 z-10"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.7483428104!2d70.7712347!3d22.2534567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca223cfb8bdb%3A0xc6cb1c7caef1eb15!2sPatel%20Dental%20Hospital%20-%20Mavdi%20Branch!5e0!3m2!1sen!2sin!4v1718060000000!5m2!1sen!2sin"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Patel Dental Hospital Amin Marg Main Branch"
                    ></iframe>
                  ) : (
                    <iframe
                      id="google-map-iframe-gayatrinagar"
                      className="w-full h-full border-0 absolute inset-0 z-10"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.8217300346394!2d70.8037307!3d22.2847055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca163959c02d%3A0xe5eb6c4c5cf4ab2c!2sPatel%20Dental%20Hospital%20-%20Best%20Dental%20Hospital%20in%20Rajkot!5e0!3m2!1sen!2sin!4v1718060000000!5m2!1sen!2sin"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Patel Dental Hospital Gayatrinagar Branch"
                    ></iframe>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
