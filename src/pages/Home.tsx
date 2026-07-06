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
import { PageId, PatientMoment, ContactInfo } from '../types';

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
import clinicInterior from '../assets/images/patel_clinic_interior_1781166076431.png';
import heroBannerBg from '../assets/images/premium_hero_implant_dental_1780660944760.png';
import doctorsImg from '../assets/images/patel_dental_doctors_1780949395339.png';
import AnimatedCounter from '../components/AnimatedCounter';
import sameDayTeethImg from '../assets/images/same_day_teeth_1780659066674.png';
import dentalImplantsImg from '../assets/images/dental_implants_card_1780659083888.png';
import fullMouthRehabImg from '../assets/images/full_mouth_rehab_1780659100244.png';
import clearAlignersImg from '../assets/images/clear_aligners_1780659117253.png';
import rootCanalImg from '../assets/images/root_canal_rct_1780659131735.png';
import kidsDentistryImg from '../assets/images/kids_dentistry_1780659150873.png';
import fdaApprovedImplantImg from '../assets/images/fda_approved_implant_1781124163464.png';
import cbctScanTechImg from '../assets/images/cbct_scan_tech_1781124177680.png';
import patelDentistPatient1 from '../assets/images/patel_dentist_patient_treatment_1781166161823.png';
import patelReceptionLounge from '../assets/images/patel_reception_lounge_1781166095656.png';
import { GALLERY_ITEMS } from '../data/gallery';
import { PATIENT_MOMENTS } from '../data/patientMoments';

const specializationsList = [
  {
    id: 'implants',
    title: 'Dental Implants',
    summary: 'Permanent, lifelike biocompatible titanium implants that seamlessly replace missing roots, restore natural chewing, and protect long-term youthful jaw bone structure.',
    icon: Award,
    pageId: 'implants' as PageId,
    accent: '#0D9488'
  },
  {
    id: 'fmr',
    title: 'Full Mouth Rehabilitation (FMR)',
    summary: 'Complete jaw restorative systems customized to align, rebuild, and re-establish your complete oral function, beautiful symmetry, and muscular articulation.',
    icon: Stethoscope,
    pageId: 'sameday' as PageId,
    accent: '#0ea5e9'
  },
  {
    id: 'aligners',
    title: 'Clear Aligners',
    summary: 'Sleek, transparent orthodontic clear trays custom engineered to straighten crowded teeth comfortably and systematically without metal brackets.',
    icon: Smile,
    pageId: 'treatments' as PageId,
    accent: '#0D9488'
  },
  {
    id: 'rootcanal',
    title: 'Root Canal Treatment',
    summary: 'Sensation-free computerized endodontic treatments utilizing rotary instruments to clear severe inner tooth infections and preserve natural tooth stability.',
    icon: Activity,
    pageId: 'treatments' as PageId,
    accent: '#0ea5e9'
  },
  {
    id: 'smilemakeover',
    title: 'Smile Makeover',
    summary: 'Personalized premium cosmetic smile alignment combining porcelain veneers, lasers, and custom biological shaping for breathtaking dental symmetry.',
    icon: Sparkles,
    pageId: 'treatments' as PageId,
    accent: '#0D9488'
  },
  {
    id: 'crowns',
    title: 'Crowns & Bridges',
    summary: 'Masterfully crafted zirconia or metal-free ceramic dental crowns to guard weak structures and secure bridges for full bite power.',
    icon: ShieldCheck,
    pageId: 'treatments' as PageId,
    accent: '#0ea5e9'
  },
  {
    id: 'kids',
    title: 'Kids Dentistry',
    summary: 'Compassionate pediatric care focusing on preventative sealants, pain-free cavity control, and pleasant initial visits for positive, lifetime dental habits.',
    icon: Users,
    pageId: 'treatments' as PageId,
    accent: '#0D9488'
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    summary: 'High-end cosmetic touch-ups utilizing advanced cosmetic filling composites and deep laser stain bleaching to create radiant dental brightness.',
    icon: Star,
    pageId: 'treatments' as PageId,
    accent: '#0ea5e9'
  },
  {
    id: 'cbct',
    title: 'CBCT & Digital Dentistry',
    summary: 'Aesthetic, ultra-low dose 3D radiological diagnostic scans charting highly accurate jaw pathways for guided, computer-assisted implant micro-surgical easy.',
    icon: Cpu,
    pageId: 'treatments' as PageId,
    accent: '#0D9488'
  }
];

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
    question: "Are Clear Aligners better than traditional braces?",
    answer: "Clear aligners are nearly invisible, removable and comfortable, making them a popular alternative for many patients."
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
  mediaImages = [],
  patientMoments,
  videosList = [],
  contactInfo
}: HomeProps) {
  const momentsToRender = patientMoments !== undefined ? patientMoments : PATIENT_MOMENTS;
  const phoneRaw = contactInfo?.phoneRaw || '+917990062009';
  const whatsappRaw = contactInfo?.whatsappRaw || '917990062009';
  const displayPhone = contactInfo?.phone || '+91 79900 62009';
  const displayWhatsapp = contactInfo?.whatsapp || '+91 79900 62009';

  const videosToRender = videosList && videosList.length > 0 ? videosList : [
    { id: 'cyai6CjMD0s', title: 'Dental Implants Treatment Experience', treatment: 'Dental Implants' },
    { id: 'SnOxxv_S2ew', title: 'Full Mouth Rehabilitation Success Story', treatment: 'Full Mouth Rehab' },
    { id: '2okui6RFf_k', title: 'Life-changing Clear Aligners Transformation', treatment: 'Clear Aligners' },
    { id: '-eoVpGDqCRs', title: 'Patient Testimonial on Digital Dental Care', treatment: 'Advanced Dental Care' },
    { id: 'VZyPnTzlR9U', title: 'Complete Smile Makeover & Dental Implants', treatment: 'Smile Makeover' },
    { id: 'DBejq69FOGI', title: 'Painless Treatment and Care Experience', treatment: 'General Dentistry' }
  ];
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedMomentIndex, setSelectedMomentIndex] = useState<number | null>(null);
  const [selectedOurClinicImgIndex, setSelectedOurClinicImgIndex] = useState<number | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [activeMapBranch, setActiveMapBranch] = useState<'gayatrinagar' | 'mavdi'>('gayatrinagar');

  // Architectural readiness for future filtering using Category & Branch metadata
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterBranch, setFilterBranch] = useState<string>('all');

  const filteredClinicImages = mediaImages.filter(img => {
    const matchCategory = filterCategory === 'all' || img.category === filterCategory;
    const matchBranch = filterBranch === 'all' || img.branch === filterBranch;
    return matchCategory && matchBranch;
  });
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});

  return (
    <div id="home-page-view" className="relative pt-[72px] bg-gradient-to-b from-sky-100/40 via-sky-50/20 to-transparent">

      {/* 1 & 2. Hero Section & BOTTOM TRUST BAR */}
      <section className="relative z-30 w-full bg-[#FAFAFC] pb-0 lg:pb-0" id="immersive-clinical-hero">
        
        {/* DESKTOP HERO VIEW (ONLY visible on desktop/large tablet screens) */}
        <div className="hidden lg:flex relative w-full h-[900px] min-h-[810px] flex-col justify-between pt-6 lg:pt-20 pb-0">
          {/* Background Image & Wide Gradient Overlay */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <img
              src={heroBgImage || "/parel doctor.png"}
              alt="Dr. Jaimin Patel and Dr. Kinjal Patel at Patel Dental Hospital reception"
              className="w-full h-full object-cover object-center lg:object-[right_center]"
              referrerPolicy="no-referrer"
            />
            {/* Desktop-oriented seamless left-to-right gradient, ending completely before the plant & doctors */}
            <div 
              className="absolute inset-0"
              style={{ 
                background: 'linear-gradient(to right, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.65) 38%, rgba(255,255,255,0) 45%)' 
              }}
            />
          </div>

          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-20 flex flex-col justify-between flex-grow h-full">
            {/* Left Content Area - 31.5% width, shifted 90px to the right */}
            <div className="w-full lg:w-[31.5%] flex flex-col justify-center flex-grow pt-4 pb-12 pr-4 z-20 lg:ml-[90px] relative">
              
              {/* 1. Small trust badge */}
              <div className="mb-4 lg:mb-8 animate-fade-in shadow-sm">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-100/50 text-[#081C3A] font-bold text-[10px] md:text-[11px] uppercase tracking-widest backdrop-blur-md shadow-sm">
                  <ShieldCheck className="h-4.5 w-4.5 text-[#11B5D8] mr-2" />
                  RAJKOT'S TRUSTED IMPLANT, ALIGNER & FMR CENTER
                </span>
              </div>

              {/* 2. Headline */}
              {heroHeading === "Dental Implant, Aligner &\nFMR Specialists\nin Rajkot" ? (
                <h1 className="font-display text-[20px] sm:text-[23px] md:text-[25px] lg:text-[27px] xl:text-[30px] leading-[1.3] font-[800] text-[#081C3A] tracking-tight text-left drop-shadow-[0_2px_10px_rgba(255,255,255,0.7)] max-w-[500px]">
                  Dental Implant, Aligner &<br />
                  FMR Specialists<br />
                  <span className="relative mt-2 inline-block text-[1.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6]">
                    in Rajkot
                    {/* Subtle underline accent */}
                    <div className="absolute -bottom-1 lg:-bottom-2 left-0 w-[95%] h-[4px] bg-gradient-to-r from-[#11B5D8]/80 to-[#0EA5C6]/80 rounded-full" />
                  </span>
                </h1>
              ) : (
                <h1 className="font-display text-[20px] sm:text-[23px] md:text-[25px] lg:text-[27px] xl:text-[30px] leading-[1.3] font-[800] text-[#081C3A] tracking-tight text-left drop-shadow-[0_2px_10px_rgba(255,255,255,0.7)] max-w-[500px] whitespace-pre-line">
                  {heroHeading}
                </h1>
              )}

              {/* Subtitle / Description */}
              <p className="mt-4 text-slate-700 font-sans text-sm md:text-base leading-relaxed max-w-[480px] font-medium whitespace-pre-wrap">
                {heroDescription}
              </p>

              {/* 3. Small Premium Pill Tags */}
              <div className="mt-6 lg:mt-12 flex flex-wrap gap-2 max-w-[550px]">
                {["Dental Implants", "Clear Aligners", "Full Mouth Rehabilitation", "Root Canal Treatment", "Smile Makeover"].map((service, index) => (
                  <span 
                    key={index}
                    className="bg-white px-3.5 py-2 rounded-full text-[#081C3A] text-[12px] md:text-[13px] font-semibold flex items-center shadow-sm"
                  >
                    <CheckCircle className="h-3.5 w-3.5 text-[#11B5D8] mr-1.5" />
                    {service}
                  </span>
                ))}
              </div>

              {/* 4. Two CTA buttons positioned exactly below services */}
              <div className="mt-6 lg:mt-10 flex flex-col sm:flex-row items-center justify-start gap-4 w-full max-w-[450px]">
                <button
                  id="hero-primary-cta"
                  onClick={openAppointmentModal}
                  className="h-[52px] w-full sm:flex-1 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] hover:from-[#0284c7] hover:to-[#0369a1] text-white text-[16px] font-[600] rounded-[12px] shadow-[0_4px_14px_0_rgba(14,165,233,0.30)] cursor-pointer transform active:scale-98 transition-all duration-300 flex items-center justify-center space-x-2 border border-transparent"
                >
                  <Calendar className="h-[18px] w-[18px] shrink-0" />
                  <span className="whitespace-nowrap">Book Appointment</span>
                </button>

                <a
                  href={`https://wa.me/${whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-[52px] w-full sm:flex-1 bg-white hover:bg-emerald-50/40 text-[#25D366] text-[16px] font-[600] rounded-[12px] border border-[#25D366] shadow-sm cursor-pointer flex items-center justify-center space-x-2 transform active:scale-98 transition-all duration-300"
                >
                  <MessageCircle className="h-[18px] w-[18px] fill-none shrink-0 text-[#25D366]" strokeWidth={2.5} />
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
            {/* Mobile background (< 768px/md) */}
            <img 
              src={heroBgImage || "/patel mobile hero.jpeg"} 
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
            {/* Soft subtle white-to-transparent gradient only behind the top text area to ensure readability. */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.60) 25%, rgba(255,255,255,0) 45%)'
              }}
            />
          </div>

          <div className="max-w-xl mx-auto flex flex-col items-center text-center space-y-3.5 px-4 sm:px-6 relative z-10 pt-8 sm:pt-10 pb-4">
            
            {/* 1. Badge */}
            <div className="animate-fade-in shadow-xs">
              <span className="inline-flex items-center px-1.5 py-0.5 sm:px-4 sm:py-1.5 rounded-full bg-white border border-slate-100 text-[#081C3A] font-bold text-[8px] min-[360px]:text-[9px] min-[400px]:text-[10px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest shadow-xs whitespace-nowrap">
                <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 text-[#11B5D8] mr-1 sm:mr-2 shrink-0 animate-pulse" />
                BEST DENTAL HOSPITAL IN RAJKOT
              </span>
            </div>

            {/* 2. Headline */}
            {heroHeading === "Dental Implant, Aligner &\nFMR Specialists\nin Rajkot" ? (
              <h1 className="font-display text-[23px] sm:text-[28px] leading-[1.25] font-[800] text-[#081C3A] tracking-tight">
                Dental Implant, Aligner &<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#0D9488]">
                  FMR Specialists
                </span> in Rajkot
              </h1>
            ) : (
              <h1 className="font-display text-[23px] sm:text-[28px] leading-[1.25] font-[800] text-[#081C3A] tracking-tight whitespace-pre-line">
                {heroHeading}
              </h1>
            )}

            {/* 3. Short description - Single line */}
            <p className="text-slate-700 font-sans text-[9px] min-[360px]:text-[10px] min-[400px]:text-[11.5px] sm:text-[14px] leading-relaxed max-w-[480px] font-medium tracking-wide whitespace-pre-wrap">
              {heroDescription}
            </p>

            {/* 4 & 5. Buttons below description, horizontal row of two equal buttons with reduced heights */}
            <div className="w-full flex flex-row items-center justify-center gap-2 max-w-[340px] sm:max-w-[380px] mx-auto">
              <button
                onClick={openAppointmentModal}
                className="h-[32px] flex-1 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] hover:from-[#0284c7] hover:to-[#0369a1] text-white text-[11.5px] font-[700] rounded-lg shadow-xs cursor-pointer flex items-center justify-center space-x-1 border border-transparent transform active:scale-98 transition-all duration-300"
              >
                <Calendar className="h-[13px] w-[13px] shrink-0" />
                <span className="whitespace-nowrap">Book Appointment</span>
              </button>

              <a
                href={`https://wa.me/${whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[32px] flex-1 bg-white text-[#128C7E] text-[11.5px] font-[700] rounded-lg border-[1.5px] border-[#128C7E] shadow-3xs cursor-pointer flex items-center justify-center space-x-1 transform active:scale-98 transition-all duration-300"
              >
                <MessageCircle className="h-[13px] w-[13px] shrink-0 fill-none text-[#128C7E]" strokeWidth={2.5} />
                <span className="whitespace-nowrap">WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Compact Premium Visit Info Card for Mobile/Tablet (Visible on lg:hidden) - Floats over the hero image bottom border */}
        <div className="block lg:hidden px-4 relative z-20 -mt-10 sm:-mt-14 pb-6">
          <div className="w-full max-w-md mx-auto bg-[#F4F8FC] border border-sky-100 rounded-2xl p-5 shadow-[0_10px_25px_rgba(8,28,58,0.06)] flex flex-col space-y-4">
            
            {/* Header */}
            <div className="flex items-center space-x-2 pb-3 border-b border-[#0EA5E9]/10">
              <span className="p-1 rounded-lg bg-sky-100/75 text-[#0ea5e9]">
                <ShieldCheck className="h-4.5 w-4.5" />
              </span>
              <h3 className="font-display font-[800] text-[#081C3A] text-[13px] uppercase tracking-wide">
                Visit Patel Dental Hospital
              </h3>
            </div>

            {/* Content Details */}
            <div className="space-y-3.5 text-left">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <MapPin className="h-4.5 w-4.5 text-[#0ea5e9] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[9.5px] font-[800] text-sky-700 tracking-wider uppercase mb-0.5">
                    Hospital Address
                  </span>
                  <p className="text-[#081C3A] font-semibold text-[11.5px] leading-relaxed">
                    Rameshwar Complex, 1st Floor, Opp SBI Bank, Gayatrinagar Main Road, Jalaram Chowk, Bhaktinagar Circle, Rajkot, Gujarat 360002
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-3">
                <Clock className="h-4.5 w-4.5 text-[#0ea5e9] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[9.5px] font-[800] text-sky-700 tracking-wider uppercase mb-0.5">
                    Operational Hours
                  </span>
                  <div className="text-[#081C3A] font-semibold text-[11px] space-y-0.5 leading-snug">
                    <p>Mon – Sat: 09:00 AM – 01:00 PM & 04:00 PM – 08:00 PM</p>
                    <p className="text-emerald-700 font-bold">Sunday: Prior Appointment Only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-[#0EA5E9]/10">
              <a
                href={`tel:${phoneRaw}`}
                className="h-[38px] bg-white hover:bg-slate-50 text-[#081C3A] hover:text-[#0ea5e9] text-[12px] font-[700] rounded-xl border border-sky-100/80 shrink-0 flex items-center justify-center space-x-1.5 active:scale-98 transition-all duration-300 shadow-3xs text-center"
              >
                <Phone className="h-[13px] w-[13px] text-[#0ea5e9] shrink-0" />
                <span>Call Now</span>
              </a>

              <a
                href="https://maps.google.com/?q=Patel+Dental+Hospital+Gayatrinagar+Rajkot"
                target="_blank"
                rel="noopener noreferrer"
                className="h-[38px] bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] hover:from-[#0284c7] hover:to-[#0369a1] text-white text-[12px] font-[700] rounded-xl flex items-center justify-center space-x-1.5 active:scale-98 transition-all duration-300 shadow-xs text-center"
              >
                <MapPin className="h-[13px] w-[13px] shrink-0" />
                <span className="whitespace-nowrap">Get Directions</span>
              </a>
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
                  Clear Aligner Experts
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
      <section className="pt-12 sm:pt-16 lg:pt-[160px] pb-16 bg-[#F8FAFC] relative z-10 border-t border-sky-100/30 overflow-hidden" id="achievements-and-trust">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6 md:mb-10">
            <h2 className="font-display font-black text-[#081C3A] text-[15px] sm:text-[18px] md:text-[24px] lg:text-[26px] tracking-tight leading-tight uppercase mb-0.5">
              PATEL DENTAL HOSPITAL AT A GLANCE
            </h2>
            <p className="text-slate-550 text-[12px] sm:text-[14px] md:text-[15px] font-medium tracking-wide">
              Trusted Numbers Behind Thousands of Successful Smiles
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mt-1.5 md:mt-2.5 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-5 lg:gap-6">
            {[
              {
                value: 15,
                suffix: "+",
                title: "Years Experience",
                subtitle: "Trusted Dental Excellence",
                icon: Trophy,
                color: "text-[#11B5D8]",
                bgColor: "bg-sky-50",
                borderColor: "border-sky-100",
              },
              {
                value: 20000,
                suffix: "+",
                title: "Successful Treatments",
                subtitle: "Advanced Dental Care",
                icon: CheckCircle,
                color: "text-[#0ea5e9]",
                bgColor: "bg-blue-50/70",
                borderColor: "border-blue-100/50",
              },
              {
                value: 15000,
                suffix: "+",
                title: "Fixed Teeth Cases",
                subtitle: "Implant Expertise",
                icon: DentalImplantIcon,
                color: "text-[#14B8A6]",
                bgColor: "bg-[#F0FDFA]",
                borderColor: "border-[#CCFBF1]",
              },
              {
                value: 7000,
                suffix: "+",
                title: "Full Fixed Cases",
                subtitle: "Full Mouth Rehabilitation Specialists",
                icon: FullMouthIcon,
                color: "text-[#0284c7]",
                bgColor: "bg-cyan-50/60",
                borderColor: "border-cyan-100/50",
              },
              {
                value: 30000,
                suffix: "+",
                title: "Root Canal Treatments",
                subtitle: "Advanced Root Canal Care",
                icon: RootCanalIcon,
                color: "text-rose-500",
                bgColor: "bg-rose-50/50",
                borderColor: "border-rose-100/40",
              },
              {
                value: 6000,
                suffix: "+",
                title: "Clear Aligner Cases",
                subtitle: "Clear Aligner & Orthodontic Expertise",
                icon: ClearAlignerIcon,
                color: "text-purple-500",
                bgColor: "bg-purple-50/50",
                borderColor: "border-purple-100/40",
              },
            ].map((item, index) => {
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
                    <div className={`p-3.5 md:p-4 rounded-2xl ${item.bgColor} border ${item.borderColor} shrink-0 shadow-3xs mb-4 md:mb-5 transition-transform duration-300 group-hover:scale-105`}>
                      <IconComponent className={`h-[38px] w-[38px] md:h-[50px] md:w-[50px] ${item.color}`} />
                    </div>
                    {/* Large number in the center (Strongest: 700 bold weight) */}
                    <div className="font-display font-bold text-[#081C3A] text-[23px] sm:text-[25px] md:text-[30px] lg:text-[34px] leading-none tracking-tight mb-2 md:mb-3">
                      <AnimatedCounter value={item.value} suffix={item.suffix} />
                    </div>
                    {/* Service label/Title below the number */}
                    <span className="font-display font-medium text-[#4A5D78] text-[11.5px] min-[360px]:text-[12.5px] md:text-[14.5px] lg:text-[15.5px] tracking-tight leading-tight w-full block px-0.5">
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

      {/* 8. Our Dental Specializations */}
      <section className="py-16 sm:py-20 bg-slate-50/50 relative z-10 border-t border-slate-100" id="our-dental-specializations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              OUR DENTAL SPECIALIZATIONS
            </span>
            <h2 className="font-display font-[800] text-[#081C3A] text-[20px] sm:text-[23px] md:text-[26px] lg:text-[28px] tracking-tight leading-tight mb-3">
              Our Dental Specializations
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
            <p className="text-slate-550 text-[14px] sm:text-[15px] font-medium tracking-wide leading-relaxed">
              Advanced dental solutions designed to restore, enhance and protect your smile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {specializationsList.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  className="bg-white rounded-[20px] p-6 sm:p-8 border border-slate-100 shadow-[0_4px_25px_rgba(8,28,58,0.02)] hover:shadow-[0_20px_45px_rgba(8,28,58,0.08)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between h-full"
                >
                  <div className="space-y-4">
                    <div 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ 
                        backgroundColor: `${service.accent}12`, 
                        color: service.accent 
                      }}
                    >
                      <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 stroke-[2]" />
                    </div>

                    <h3 className="font-display font-extrabold text-[#081C3A] text-[16px] sm:text-[18px] leading-tight group-hover:text-[#0D9488] transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-slate-500 text-[13px] sm:text-[13.5px] font-medium leading-relaxed">
                      {service.summary}
                    </p>
                  </div>

                  <div className="pt-5 mt-6 border-t border-slate-50">
                    <button
                      onClick={() => {
                        setCurrentPage(service.pageId);
                        window.location.hash = service.pageId;
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-[12.5px] sm:text-[13px] font-bold text-[#0D9488] hover:text-[#0ea5e9] inline-flex items-center space-x-1.5 transition-all duration-200 cursor-pointer group/btn"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

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
                
                <h2 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-4">
                  Book Your Consultation Today
                </h2>

                <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mb-6 rounded-full" />

                <p className="text-slate-550 text-[14px] sm:text-[15px] font-medium leading-relaxed mb-8">
                  Take the first step towards a confident smile with Patel Dental Hospital's advanced Implant, Full Mouth Rehabilitation and Clear Aligner treatments.
                </p>

                {/* Key Highlights list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    "Implant Specialists",
                    "Full Mouth Rehabilitation Experts",
                    "Clear Aligner Solutions",
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

      {/* 11. Why Choose Patel Dental Hospital */}
      <section className="py-16 sm:py-24 bg-white relative z-10 border-t border-slate-100" id="why-choose-patel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              WHY CHOOSE US
            </span>
            <h2 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-3">
              Why Choose Patel Dental Hospital?
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
            <p className="text-slate-550 text-[14px] sm:text-[15px] font-medium tracking-wide leading-relaxed">
              Trusted Implant, Full Mouth Rehabilitation & Clear Aligner Center in Rajkot
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <h3 className="font-display font-[900] text-[#081C3A] text-[22px] sm:text-[28px] md:text-[32px] leading-tight tracking-tight">
                  Caring For Your Smile With Advanced Dental Excellence
                </h3>
                <p className="text-slate-600 text-[14px] sm:text-[15.5px] font-medium leading-relaxed">
                  Patel Dental Hospital provides advanced Implant, Full Mouth Rehabilitation, Root Canal and Clear Aligner treatments with a focus on precision, patient comfort and long-term results. Our team combines modern technology with personalized care to deliver exceptional dental outcomes.
                </p>
              </div>

              <div>
                <button
                  onClick={openAppointmentModal}
                  className="inline-flex items-center text-[14px] font-bold text-white bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] hover:from-[#0284c7] hover:to-[#0369a1] px-8 py-4 rounded-xl shadow-[0_4px_14px_0_rgba(14,165,233,0.30)] hover:shadow-lg cursor-pointer transition-all duration-300 transform active:scale-95"
                >
                  <Calendar className="h-4.5 w-4.5 mr-2" />
                  Book Appointment
                </button>
              </div>

              <div className="aspect-[16/10] w-full bg-slate-50 rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(8,28,58,0.04)] border border-slate-100 mt-8 relative group">
                <img
                  src={patelDentistPatient1}
                  alt="Professional dentist treating a patient in a modern dental clinic"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Right Column - 2x2 Grid of premium feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Card 1: 20,000+ Successful Treatments */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="bg-white border border-slate-100 rounded-[20px] p-6 sm:p-8 shadow-[0_4px_25px_rgba(8,28,58,0.02)] hover:shadow-[0_20px_45px_rgba(8,28,58,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full min-h-[160px] group"
              >
                <div className="space-y-4">
                  <div className="p-3 w-12 h-12 bg-sky-50 rounded-[14px] flex items-center justify-center text-[#0EA5E9] border border-sky-100/50 transition-colors group-hover:bg-sky-100/40">
                    <Award className="h-6 w-6 stroke-[2]" />
                  </div>
                  <div>
                    <span className="block font-display font-black text-[#081C3A] text-[24px] sm:text-[30px] leading-none mb-1.5 group-hover:text-[#0EA5E9] transition-colors duration-300">
                      20,000+
                    </span>
                    <span className="block text-slate-500 text-[13.5px] font-semibold leading-normal">
                      Successful Treatments
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: 15,000+ Fixed Teeth Cases */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white border border-slate-100 rounded-[20px] p-6 sm:p-8 shadow-[0_4px_25px_rgba(8,28,58,0.02)] hover:shadow-[0_20px_45px_rgba(8,28,58,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full min-h-[160px] group"
              >
                <div className="space-y-4">
                  <div className="p-3 w-12 h-12 bg-[#F0FDFA] rounded-[14px] flex items-center justify-center text-[#14B8A6] border border-[#CCFBF1] transition-colors group-hover:bg-[#CCFBF1]/40">
                    <Smile className="h-6 w-6 stroke-[2]" />
                  </div>
                  <div>
                    <span className="block font-display font-black text-[#0D9488] text-[24px] sm:text-[30px] leading-none mb-1.5 group-hover:text-[#0D9488] transition-colors duration-300">
                      15,000+
                    </span>
                    <span className="block text-slate-500 text-[13.5px] font-semibold leading-normal">
                      Fixed Teeth Cases
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: USA FDA Approved Implant Materials */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-white border border-slate-100 rounded-[20px] p-6 sm:p-8 shadow-[0_4px_25px_rgba(8,28,58,0.02)] hover:shadow-[0_20px_45px_rgba(8,28,58,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full min-h-[160px] group"
              >
                <div className="space-y-4">
                  <div className="p-3 w-12 h-12 bg-blue-50/70 rounded-[14px] flex items-center justify-center text-[#0284c7] border border-blue-100/50 transition-colors group-hover:bg-blue-100/40">
                    <ShieldCheck className="h-6 w-6 stroke-[2]" />
                  </div>
                  <div>
                    <span className="block font-display font-black text-[#081C3A] text-[22px] sm:text-[24px] leading-tight mb-1.5 group-hover:text-[#0284c7] transition-colors duration-300">
                      USA FDA Approved
                    </span>
                    <span className="block text-slate-500 text-[13.5px] font-semibold leading-normal">
                      Implant Materials
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Card 4: In-house CBCT Digital Diagnosis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white border border-slate-100 rounded-[20px] p-6 sm:p-8 shadow-[0_4px_25px_rgba(8,28,58,0.02)] hover:shadow-[0_20px_45px_rgba(8,28,58,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full min-h-[160px] group"
              >
                <div className="space-y-4">
                  <div className="p-3 w-12 h-12 bg-purple-50/50 rounded-[14px] flex items-center justify-center text-purple-600 border border-purple-100/40 transition-colors group-hover:bg-purple-100/40">
                    <Cpu className="h-6 w-6 stroke-[2]" />
                  </div>
                  <div>
                    <span className="block font-display font-black text-purple-600 text-[22px] sm:text-[24px] leading-tight mb-1.5 group-hover:text-purple-600 transition-colors duration-300">
                      In-house CBCT
                    </span>
                    <span className="block text-slate-500 text-[13.5px] font-semibold leading-normal">
                      Digital Diagnosis
                    </span>
                  </div>
                </div>
              </motion.div>

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
                  At Patel Dental Hospital, we combine advanced dental technology with personalized care to deliver long-lasting treatment results. Our expertise includes Dental Implants, Full Mouth Rehabilitation, Clear Aligners, Root Canal Treatments and Cosmetic Dentistry.
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
                  onClick={() => setActiveMapBranch('gayatrinagar')}
                  className={`flex-1 py-3 px-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                    activeMapBranch === 'gayatrinagar'
                      ? 'bg-white shadow-[0_4px_12px_rgba(8,28,58,0.04)] text-[#0D9488] border border-slate-100'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Gayatrinagar Branch
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMapBranch('mavdi')}
                  className={`flex-1 py-3 px-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                    activeMapBranch === 'mavdi'
                      ? 'bg-white shadow-[0_4px_12px_rgba(8,28,58,0.04)] text-[#0D9488] border border-slate-100'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Mavdi Branch
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
                      Patel Dental Hospital {activeMapBranch === 'gayatrinagar' ? '(Gayatrinagar Main Branch)' : '(Mavdi Branch)'}
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
                        {activeMapBranch === 'gayatrinagar' 
                          ? 'Rameshwar Complex, 1st Floor, Opp SBI Bank, Gayatrinagar Main Road, Jalaram Chowk, Bhaktinagar Circle, Rajkot, Gujarat 360002' 
                          : 'Business Centrum Complex, 1st Floor, Near Golden Super Market, Opp Fitness Hospital, Mavdi Main Road, Rajkot, Gujarat 360004'}
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
                    href={activeMapBranch === 'gayatrinagar' 
                      ? 'https://maps.google.com/?q=Patel+Dental+Hospital+Gayatrinagar+Rajkot' 
                      : 'https://maps.google.com/?q=Patel+Dental+Hospital+Mavdi+Rajkot'}
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
                    {activeMapBranch === 'gayatrinagar' ? 'Gayatrinagar Main HQ' : 'Mavdi Center'}
                  </span>
                </div>

                {/* Map iframe wrapper */}
                <div className="relative flex-1 min-h-[350px]">
                  {activeMapBranch === 'gayatrinagar' ? (
                    <iframe
                      id="google-map-iframe-gayatrinagar"
                      className="w-full h-full border-0 absolute inset-0 z-10"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.8217300346394!2d70.8037307!3d22.2847055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca163959c02d%3A0xe5eb6c4c5cf4ab2c!2sPatel%20Dental%20Hospital%20-%20Best%20Dental%20Hospital%20in%20Rajkot!5e0!3m2!1sen!2sin!4v1718060000000!5m2!1sen!2sin"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Patel Dental Hospital Gayatrinagar Branch Loop Road"
                    ></iframe>
                  ) : (
                    <iframe
                      id="google-map-iframe-mavdi"
                      className="w-full h-full border-0 absolute inset-0 z-10"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.7483428104!2d70.7712347!3d22.2534567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca223cfb8bdb%3A0xc6cb1c7caef1eb15!2sPatel%20Dental%20Hospital%20-%20Mavdi%20Branch!5e0!3m2!1sen!2sin!4v1718060000000!5m2!1sen!2sin"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Patel Dental Hospital Mavdi Main Road"
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
