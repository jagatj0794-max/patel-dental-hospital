/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, 
  Award, 
  DollarSign, 
  Check, 
  Calendar, 
  ArrowRight, 
  FileText, 
  Globe2, 
  ShieldCheck, 
  Star,
  Activity,
  Heart,
  Sparkles,
  Wallet,
  Shield,
  Video,
  Clipboard,
  Smile,
  Compass,
  X,
  Maximize2,
  MapPin,
  ChevronDown,
  HelpCircle,
  Play
} from 'lucide-react';
import { useSEO } from '../utils/seo';
import { internationalPatientsService } from '../utils/internationalPatientsData';
import { InternationalPatientImage, DentalVideo } from '../types';
import { GooglePatientReviews } from '../components/GooglePatientReviews';
import { UNIVERSAL_GOOGLE_REVIEWS } from '../utils/serviceData';
import { InstagramEmbed } from '../components/InstagramEmbed';
import { Mp4ReelPlayer } from '../components/Mp4ReelPlayer';
import { videoService } from '../utils/videoData';

const gujaratDestinations = [
  {
    name: "Statue of Unity",
    description: "World's tallest statue and India's iconic landmark.",
    image: "/1730717115_Statue_of_Unity.jpg",
    location: "Kevadia"
  },
  {
    name: "Rann of Kutch",
    description: "Experience the famous White Desert of Gujarat.",
    image: "/Great Rann Of Kutch (14).jpg",
    location: "Kutch"
  },
  {
    name: "Gir National Park",
    description: "Home of the rare Asiatic Lions.",
    image: "/Gir-National-Park-and-Santuary.jpg",
    location: "Gir Forest"
  },
  {
    name: "Somnath Temple",
    description: "One of India's most sacred Jyotirlingas.",
    image: "/1888537-somnath-temple-jyotirlinga-sardar-patel-narendra-modi-ghazni-invasion-temple-reconstruction.jpg",
    location: "Somnath"
  },
  {
    name: "Dwarkadhish Temple",
    description: "Ancient Krishna temple on the Arabian Sea.",
    image: "/Gujarat-Dwarkadhish-Temple.jpg",
    location: "Dwarka"
  },
  {
    name: "Mandvi Beach",
    description: "Relax at Gujarat's beautiful coastal beach.",
    image: "/mandvi1.jpg",
    location: "Mandvi"
  }
];

const dentalTourismFaqs = [
  {
    id: 1,
    question: "Can I consult the doctor before travelling?",
    answer: "Yes. We provide free online consultations to evaluate your case before your visit."
  },
  {
    id: 2,
    question: "How long should I stay in India?",
    answer: "Treatment duration depends on your procedure. Our team will guide you before your travel."
  },
  {
    id: 3,
    question: "Do you provide airport pickup?",
    answer: "Yes. We help arrange airport pickup and local travel assistance for international patients."
  },
  {
    id: 4,
    question: "Can you help with hotel accommodation?",
    answer: "Yes. We assist in selecting nearby hotels based on your budget and treatment schedule."
  },
  {
    id: 5,
    question: "Will I receive a treatment estimate before travelling?",
    answer: "Yes. After reviewing your reports, we provide a detailed treatment plan and estimated cost."
  },
  {
    id: 6,
    question: "Are your dentists internationally experienced?",
    answer: "Our experienced dental team follows international treatment protocols using modern technology and premium materials."
  },
  {
    id: 7,
    question: "Do you provide post-treatment support?",
    answer: "Yes. We continue follow-up care through online consultations even after you return home."
  }
];

interface DentalTourismProps {
  openAppointmentModal: (preselectedTreatment?: string) => void;
}

export default function DentalTourism({ openAppointmentModal }: DentalTourismProps) {
  useSEO({
    title: 'Dental Tourism in India | Save 70% | Patel Dental Hospital',
    description: 'Experience world-class dental care at Patel Dental Hospital, Rajkot. Save significantly on treatments while receiving advanced technology, experienced dentists, and complete assistance for your dental journey in India.',
    keywords: 'Dental Tourism India, International Patients Dental, Cheap Dental Implants India, Patel Dental Hospital Rajkot, Affordable Dentistry, Travel Dental'
  });

  const [galleryPatients, setGalleryPatients] = React.useState<InternationalPatientImage[]>([]);
  const [selectedPatient, setSelectedPatient] = React.useState<InternationalPatientImage | null>(null);
  const [expandedFaqId, setExpandedFaqId] = React.useState<number | null>(null);
  const [tourismVideos, setTourismVideos] = React.useState<DentalVideo[]>([]);
  const [activeVideos, setActiveVideos] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    let active = true;
    const fetchVideos = async () => {
      try {
        const dbVideos = await videoService.getVideos();
        if (active) {
          const filtered = (dbVideos || []).filter(
            (v) => v.treatment === 'Dental Tourism' || v.treatment?.toLowerCase() === 'dental tourism'
          );
          setTourismVideos(filtered);
        }
      } catch (err) {
        console.error('Error fetching dental tourism videos:', err);
      }
    };
    fetchVideos();
    return () => {
      active = false;
    };
  }, []);

  React.useEffect(() => {
    let active = true;
    const fetchPatients = async () => {
      try {
        const data = await internationalPatientsService.getInternationalPatients();
        if (active) {
          // Filter only active ones for frontend and sort them by display_order
          const sorted = (data || [])
            .filter(p => p.is_active !== false)
            .sort((a, b) => {
              const orderA = a.display_order !== undefined ? a.display_order : 99999;
              const orderB = b.display_order !== undefined ? b.display_order : 99999;
              return orderA - orderB;
            });
          setGalleryPatients(sorted);
        }
      } catch (err) {
        console.error('Error fetching international patients gallery:', err);
      }
    };
    fetchPatients();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div id="dental-tourism-page-view" className="bg-[#FAFAFC] min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-[110px] sm:pt-[130px] lg:pt-[160px] pb-16 lg:pb-24 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
              <div className="space-y-4">
                {/* Brand Eyebrow */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E6F6F4] border border-[#00897B]/20 rounded-full text-xs font-bold text-[#00897B] uppercase tracking-wider">
                  <Globe2 className="h-3.5 w-3.5" />
                  Premium Dental Tourism India
                </span>

                {/* Hero Heading */}
                <h1 className="font-display tracking-tight leading-tight text-slate-900" style={{ fontWeight: 900 }}>
                  <span className="block text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-navy mb-1">
                    Smile Brighter, Travel Smarter with
                  </span>
                  <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-brand-teal uppercase font-black tracking-wide" style={{ fontWeight: 900 }}>
                    DENTAL TOURISM IN INDIA
                  </span>
                </h1>

                {/* Short Description */}
                <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-sans max-w-2xl">
                  Experience world-class dental care at Patel Dental Hospital, Rajkot.
                  Save on treatment costs with complete travel assistance.
                </p>
              </div>

              {/* 3 Premium Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                
                {/* Card 1 */}
                <div className="bg-white p-6 rounded-[24px] shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex flex-col items-center text-center justify-center h-full min-h-[145px]">
                  <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mb-3.5 text-slate-600">
                    <Wallet className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#1E3A5F] leading-snug">
                    Save up to 70%
                  </h3>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-6 rounded-[24px] shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex flex-col items-center text-center justify-center h-full min-h-[145px]">
                  <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mb-3.5 text-slate-600">
                    <Shield className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#1E3A5F] leading-snug">
                    International Standards
                  </h3>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-6 rounded-[24px] shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex flex-col items-center text-center justify-center h-full min-h-[145px]">
                  <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mb-3.5 text-slate-600">
                    <Plane className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#1E3A5F] leading-snug">
                    Travel Assistance
                  </h3>
                </div>

              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => openAppointmentModal('International Consultation')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#00897B] text-white hover:bg-[#00796B] transition-all duration-300 shadow-[0_4px_14px_rgba(0,137,123,0.3)] hover:shadow-[0_6px_20px_rgba(0,137,123,0.4)] cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  Book Free Online Consultation
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => openAppointmentModal('Treatment Estimate')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-white text-[#1E3A5F] border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-2xs"
                >
                  <FileText className="h-4 w-4" />
                  Get Treatment Estimate
                </button>
              </div>



            </div>

            {/* Right Column: Hero Image with Floating Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[480px] lg:max-w-none">
                
                {/* Main Hero Image */}
                <div className="aspect-[4/3] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 relative">
                  <img
                    src="/NRI.webp"
                    alt="Patel Dental Hospital International Care"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Premium overlay to enhance text readability if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
                </div>



              </div>
            </div>

          </div>
        </div>
      </section>



      {/* Why Choose Section with 6 Feature Cards */}
      <section className="py-16 md:py-24 bg-[#FAFAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Title and Description */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              Why International Patients Choose Patel Dental Hospital for Dental Tourism in India
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Patel Dental Hospital, Rajkot offers world-class dental care, advanced technology, affordable treatment, and complete travel assistance for international patients.
            </p>
          </div>

          {/* 6 Feature Cards - 3x2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-[36px] bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[30px] h-[30px] flex items-center justify-start shrink-0 text-3xl">
                🏆
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[24px] sm:text-[30px] tracking-tight mt-6 mb-4 leading-tight">
                15+ Years of Excellence
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[17px] leading-[1.8] font-medium flex-1">
                Trusted dental care with years of experience and thousands of successful smiles.
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-[36px] bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[30px] h-[30px] flex items-center justify-start shrink-0 text-3xl">
                🌍
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[24px] sm:text-[30px] tracking-tight mt-6 mb-4 leading-tight">
                Global Patient Trust
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[17px] leading-[1.8] font-medium flex-1">
                Patients from USA, UK, Canada, Australia, Africa and many other countries trust Patel Dental Hospital.
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-[36px] bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[30px] h-[30px] flex items-center justify-start shrink-0 text-3xl">
                🦷
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[24px] sm:text-[30px] tracking-tight mt-6 mb-4 leading-tight">
                Advanced Dental Technology
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[17px] leading-[1.8] font-medium flex-1">
                Modern digital dentistry with internationally accepted treatment protocols.
              </p>
            </div>

            {/* Card 4 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-[36px] bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[30px] h-[30px] flex items-center justify-start shrink-0 text-3xl">
                🛡️
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[24px] sm:text-[30px] tracking-tight mt-6 mb-4 leading-tight">
                Safe & Hygienic Clinic
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[17px] leading-[1.8] font-medium flex-1">
                International sterilization standards and patient safety at every step.
              </p>
            </div>

            {/* Card 5 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-[36px] bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[30px] h-[30px] flex items-center justify-start shrink-0 text-3xl">
                ✈️
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[24px] sm:text-[30px] tracking-tight mt-6 mb-4 leading-tight">
                Complete Travel Assistance
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[17px] leading-[1.8] font-medium flex-1">
                Travel planning, accommodation guidance, airport assistance, and treatment coordination.
              </p>
            </div>

            {/* Card 6 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-[36px] bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[30px] h-[30px] flex items-center justify-start shrink-0 text-3xl">
                🤝
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[24px] sm:text-[30px] tracking-tight mt-6 mb-4 leading-tight">
                Dedicated Patient Coordinator
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[17px] leading-[1.8] font-medium flex-1">
                Personal support from consultation until treatment completion.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Patients from Across the Globe Section */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Title and Subtitle */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              Patients from Across the Globe
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Trusted by international patients who travel to Patel Dental Hospital, Rajkot for world-class dental care.
            </p>
          </div>

          {/* Large White Rounded Container */}
          <div className="max-w-5xl mx-auto bg-white border border-[#E5E7EB] rounded-[24px] shadow-sm overflow-hidden">
            
            {/* 4x2 responsive grid (2 columns on mobile, 4 on desktop) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-[#E5E7EB]">
              
              {/* USA */}
              <div className="bg-white p-8 sm:p-12 flex flex-col items-center justify-center transition-colors duration-300 hover:bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md overflow-hidden shrink-0 mb-4">
                  <img 
                    src="https://hatscripts.github.io/circle-flags/flags/us.svg" 
                    alt="USA Flag" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-sans font-bold text-[#081C3A] text-base sm:text-lg tracking-tight">
                  USA
                </span>
              </div>

              {/* United Kingdom */}
              <div className="bg-white p-8 sm:p-12 flex flex-col items-center justify-center transition-colors duration-300 hover:bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md overflow-hidden shrink-0 mb-4">
                  <img 
                    src="https://hatscripts.github.io/circle-flags/flags/gb.svg" 
                    alt="United Kingdom Flag" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-sans font-bold text-[#081C3A] text-base sm:text-lg tracking-tight">
                  United Kingdom
                </span>
              </div>

              {/* Canada */}
              <div className="bg-white p-8 sm:p-12 flex flex-col items-center justify-center transition-colors duration-300 hover:bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md overflow-hidden shrink-0 mb-4">
                  <img 
                    src="https://hatscripts.github.io/circle-flags/flags/ca.svg" 
                    alt="Canada Flag" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-sans font-bold text-[#081C3A] text-base sm:text-lg tracking-tight">
                  Canada
                </span>
              </div>

              {/* Australia */}
              <div className="bg-white p-8 sm:p-12 flex flex-col items-center justify-center transition-colors duration-300 hover:bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md overflow-hidden shrink-0 mb-4">
                  <img 
                    src="https://hatscripts.github.io/circle-flags/flags/au.svg" 
                    alt="Australia Flag" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-sans font-bold text-[#081C3A] text-base sm:text-lg tracking-tight">
                  Australia
                </span>
              </div>

              {/* United Arab Emirates */}
              <div className="bg-white p-8 sm:p-12 flex flex-col items-center justify-center transition-colors duration-300 hover:bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md overflow-hidden shrink-0 mb-4">
                  <img 
                    src="https://hatscripts.github.io/circle-flags/flags/ae.svg" 
                    alt="United Arab Emirates Flag" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-sans font-bold text-[#081C3A] text-base sm:text-lg tracking-tight">
                  United Arab Emirates
                </span>
              </div>

              {/* New Zealand */}
              <div className="bg-white p-8 sm:p-12 flex flex-col items-center justify-center transition-colors duration-300 hover:bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md overflow-hidden shrink-0 mb-4">
                  <img 
                    src="https://hatscripts.github.io/circle-flags/flags/nz.svg" 
                    alt="New Zealand Flag" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-sans font-bold text-[#081C3A] text-base sm:text-lg tracking-tight">
                  New Zealand
                </span>
              </div>

              {/* South Africa */}
              <div className="bg-white p-8 sm:p-12 flex flex-col items-center justify-center transition-colors duration-300 hover:bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md overflow-hidden shrink-0 mb-4">
                  <img 
                    src="https://hatscripts.github.io/circle-flags/flags/za.svg" 
                    alt="South Africa Flag" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-sans font-bold text-[#081C3A] text-base sm:text-lg tracking-tight">
                  South Africa
                </span>
              </div>

              {/* Germany */}
              <div className="bg-white p-8 sm:p-12 flex flex-col items-center justify-center transition-colors duration-300 hover:bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md overflow-hidden shrink-0 mb-4">
                  <img 
                    src="https://hatscripts.github.io/circle-flags/flags/de.svg" 
                    alt="Germany Flag" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-sans font-bold text-[#081C3A] text-base sm:text-lg tracking-tight">
                  Germany
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Treatment Cost Comparison Section */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Title, Subtitle and Description */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              Treatment Cost Comparison
            </h2>
            <p className="text-[#0D9488] font-bold text-sm sm:text-base tracking-wider uppercase">
              Patel Dental Hospital vs International Treatment Costs
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              Save up to 80% on world-class dental treatments by choosing Patel Dental Hospital, India, without compromising on quality or safety.
            </p>
          </div>

          {/* Large rounded white container */}
          <div className="max-w-5xl mx-auto bg-white border border-[#E5E7EB] rounded-[24px] shadow-md overflow-hidden text-left">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-[#0B1D3A] text-white">
                    <th className="px-6 py-5 text-left font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-[#1E293B]">
                      Treatment
                    </th>
                    <th className="px-6 py-5 text-center font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-[#1E293B]">
                      USA/UK Cost
                    </th>
                    <th className="px-6 py-5 text-center font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-[#1E293B]">
                      Patel Cost (INR)
                    </th>
                    <th className="px-6 py-5 text-center font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-[#1E293B]">
                      USD Cost
                    </th>
                    <th className="px-6 py-5 text-center font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-[#1E293B]">
                      Savings
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  
                  {/* Row 1 */}
                  <tr className="bg-white hover:bg-slate-50/60 transition-colors duration-200">
                    <td className="px-6 py-4 sm:py-5 text-left font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                      Dental Implants
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-medium text-slate-500 text-sm sm:text-base">
                      $3,500
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#0D9488] text-sm sm:text-base">
                      ₹30,000 - ₹45,000
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#081C3A] text-sm sm:text-base">
                      $360 - $540
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full font-bold text-xs sm:text-sm border border-teal-100">
                        Save ~87%
                      </span>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="bg-slate-50/30 hover:bg-slate-50/60 transition-colors duration-200">
                    <td className="px-6 py-4 sm:py-5 text-left font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                      Root Canal
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-medium text-slate-500 text-sm sm:text-base">
                      $1,200
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#0D9488] text-sm sm:text-base">
                      ₹4,000 - ₹6,000
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#081C3A] text-sm sm:text-base">
                      $50 - $72
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full font-bold text-xs sm:text-sm border border-teal-100">
                        Save ~95%
                      </span>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="bg-white hover:bg-slate-50/60 transition-colors duration-200">
                    <td className="px-6 py-4 sm:py-5 text-left font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                      Full Mouth Rehab
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-medium text-slate-500 text-sm sm:text-base">
                      $35,000
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#0D9488] text-sm sm:text-base">
                      ₹2,50,000 - ₹4,50,000
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#081C3A] text-sm sm:text-base">
                      $3,000 - $5,400
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full font-bold text-xs sm:text-sm border border-teal-100">
                        Save ~88%
                      </span>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="bg-slate-50/30 hover:bg-slate-50/60 transition-colors duration-200">
                    <td className="px-6 py-4 sm:py-5 text-left font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                      Smile Makeover
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-medium text-slate-500 text-sm sm:text-base">
                      $15,000
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#0D9488] text-sm sm:text-base">
                      ₹1,20,000 - ₹2,00,000
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#081C3A] text-sm sm:text-base">
                      $1,440 - $2,400
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full font-bold text-xs sm:text-sm border border-teal-100">
                        Save ~87%
                      </span>
                    </td>
                  </tr>

                  {/* Row 5 */}
                  <tr className="bg-white hover:bg-slate-50/60 transition-colors duration-200">
                    <td className="px-6 py-4 sm:py-5 text-left font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                      Aligners
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-medium text-slate-500 text-sm sm:text-base">
                      $6,000
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#0D9488] text-sm sm:text-base">
                      ₹60,000 - ₹1,50,000
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#081C3A] text-sm sm:text-base">
                      $720 - $1,800
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full font-bold text-xs sm:text-sm border border-teal-100">
                        Save ~80%
                      </span>
                    </td>
                  </tr>

                  {/* Row 6 */}
                  <tr className="bg-slate-50/30 hover:bg-slate-50/60 transition-colors duration-200">
                    <td className="px-6 py-4 sm:py-5 text-left font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                      Crowns & Bridges
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-medium text-slate-500 text-sm sm:text-base">
                      $1,500
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#0D9488] text-sm sm:text-base">
                      ₹8,000 - ₹15,000
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#081C3A] text-sm sm:text-base">
                      $96 - $180
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full font-bold text-xs sm:text-sm border border-teal-100">
                        Save ~91%
                      </span>
                    </td>
                  </tr>

                  {/* Row 7 */}
                  <tr className="bg-white hover:bg-slate-50/60 transition-colors duration-200">
                    <td className="px-6 py-4 sm:py-5 text-left font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                      Teeth Whitening
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-medium text-slate-500 text-sm sm:text-base">
                      $800
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#0D9488] text-sm sm:text-base">
                      ₹7,000 - ₹10,000
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#081C3A] text-sm sm:text-base">
                      $84 - $120
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full font-bold text-xs sm:text-sm border border-teal-100">
                        Save ~87%
                      </span>
                    </td>
                  </tr>

                  {/* Row 8 */}
                  <tr className="bg-slate-50/30 hover:bg-slate-50/60 transition-colors duration-200">
                    <td className="px-6 py-4 sm:py-5 text-left font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                      Kids Dentistry
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-medium text-slate-500 text-sm sm:text-base">
                      $600
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#0D9488] text-sm sm:text-base">
                      ₹3,000 - ₹5,000
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#081C3A] text-sm sm:text-base">
                      $36 - $60
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full font-bold text-xs sm:text-sm border border-teal-100">
                        Save ~92%
                      </span>
                    </td>
                  </tr>

                  {/* Row 9 */}
                  <tr className="bg-white hover:bg-slate-50/60 transition-colors duration-200">
                    <td className="px-6 py-4 sm:py-5 text-left font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                      Wisdom Tooth
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-medium text-slate-500 text-sm sm:text-base">
                      $800
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#0D9488] text-sm sm:text-base">
                      ₹4,500 - ₹8,000
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#081C3A] text-sm sm:text-base">
                      $54 - $96
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full font-bold text-xs sm:text-sm border border-teal-100">
                        Save ~90%
                      </span>
                    </td>
                  </tr>

                  {/* Row 10 */}
                  <tr className="bg-slate-50/30 hover:bg-slate-50/60 transition-colors duration-200">
                    <td className="px-6 py-4 sm:py-5 text-left font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                      Composite Filling
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-medium text-slate-500 text-sm sm:text-base">
                      $250
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#0D9488] text-sm sm:text-base">
                      ₹1,500 - ₹2,500
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#081C3A] text-sm sm:text-base">
                      $18 - $30
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full font-bold text-xs sm:text-sm border border-teal-100">
                        Save ~90%
                      </span>
                    </td>
                  </tr>

                  {/* Row 11 */}
                  <tr className="bg-white hover:bg-slate-50/60 transition-colors duration-200">
                    <td className="px-6 py-4 sm:py-5 text-left font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                      Veneers
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-medium text-slate-500 text-sm sm:text-base">
                      $1,800
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#0D9488] text-sm sm:text-base">
                      ₹12,000 - ₹18,000
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#081C3A] text-sm sm:text-base">
                      $144 - $216
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full font-bold text-xs sm:text-sm border border-teal-100">
                        Save ~90%
                      </span>
                    </td>
                  </tr>

                  {/* Row 12 */}
                  <tr className="bg-slate-50/30 hover:bg-slate-50/60 transition-colors duration-200">
                    <td className="px-6 py-4 sm:py-5 text-left font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                      Dentures
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-medium text-slate-500 text-sm sm:text-base">
                      $2,500
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#0D9488] text-sm sm:text-base">
                      ₹20,000 - ₹35,000
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center font-sans font-semibold text-[#081C3A] text-sm sm:text-base">
                      $240 - $420
                    </td>
                    <td className="px-6 py-4 sm:py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full font-bold text-xs sm:text-sm border border-teal-100">
                        Save ~87%
                      </span>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* Your Dental Tourism Journey Section */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Title, Subtitle and Description */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              Your Dental Tourism Journey
            </h2>
            <p className="text-[#0D9488] font-bold text-sm sm:text-base tracking-wider uppercase">
              Simple. Safe. Hassle-Free.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              From your first online consultation to your return home, Patel Dental Hospital provides complete assistance at every step of your dental tourism journey.
            </p>
          </div>

          {/* Cards Flex Container with Center Justification */}
          <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
            
            {/* Step 1 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-[36px] bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <Video className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
                  Step 1
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[24px] tracking-tight mt-6 mb-4 leading-tight">
                Free Online Consultation
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] leading-[1.7] font-medium flex-1">
                Connect with our specialists through WhatsApp or video consultation and share your dental concerns.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-[36px] bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <Clipboard className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
                  Step 2
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[24px] tracking-tight mt-6 mb-4 leading-tight">
                Treatment Plan & Estimate
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] leading-[1.7] font-medium flex-1">
                Receive a personalized treatment plan with transparent pricing before you travel.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-[36px] bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <Plane className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
                  Step 3
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[24px] tracking-tight mt-6 mb-4 leading-tight">
                Travel Assistance
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] leading-[1.7] font-medium flex-1">
                Our team helps with visa guidance, accommodation recommendations, airport pickup, and travel planning.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-[36px] bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <Activity className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
                  Step 4
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[24px] tracking-tight mt-6 mb-4 leading-tight">
                Arrival & Diagnosis
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] leading-[1.7] font-medium flex-1">
                Visit Patel Dental Hospital for a complete examination and confirmation of your treatment plan.
              </p>
            </div>

            {/* Step 5 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-[36px] bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <Smile className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
                  Step 5
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[24px] tracking-tight mt-6 mb-4 leading-tight">
                Dental Treatment
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] leading-[1.7] font-medium flex-1">
                Receive advanced dental treatment using modern technology and international protocols.
              </p>
            </div>

            {/* Step 6 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-[36px] bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <Heart className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
                  Step 6
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[24px] tracking-tight mt-6 mb-4 leading-tight">
                Recovery & Follow-up
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] leading-[1.7] font-medium flex-1">
                Get complete post-treatment care instructions and online follow-up support after returning home.
              </p>
            </div>

            {/* Step 7 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-[36px] bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <Compass className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
                  Step 7
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[24px] tracking-tight mt-6 mb-4 leading-tight">
                Explore Gujarat (Optional)
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] leading-[1.7] font-medium flex-1">
                After treatment, enjoy local attractions and make your dental trip a memorable experience.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Explore Gujarat Section */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Title, Subtitle and Description */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-[#0D9488] font-bold text-sm sm:text-base tracking-wider uppercase">
              EXPLORE GUJARAT
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              Discover Gujarat During Your Dental Journey
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              While receiving world-class dental treatment at Patel Dental Hospital, explore some of Gujarat's most famous tourist destinations.
            </p>
          </div>

          {/* Destination Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {gujaratDestinations.map((dest, idx) => (
              <div
                key={idx}
                id={`gujarat-destination-card-${idx}`}
                onClick={() => openAppointmentModal(`Explore Gujarat Tour - ${dest.name}`)}
                className="group bg-white border border-slate-100/90 rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col text-left"
              >
                {/* 16:9 Image container with Zoom effect */}
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-50 relative">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Location Info & Destination Name */}
                  <div className="flex items-center gap-1.5 text-[#00897B] font-semibold text-xs tracking-wider uppercase mb-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span>{dest.location}</span>
                  </div>
                  
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 leading-tight">
                    {dest.name}
                  </h3>

                  {/* One short description (maximum one line) */}
                  <p className="text-[#475569] text-sm sm:text-base font-medium truncate mt-1">
                    {dest.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Happy Patients from Across the Globe Section */}
      {galleryPatients && galleryPatients.length > 0 && (
        <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-slate-100" id="happy-patients-gallery-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Section Heading */}
            <div className="max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
                Happy Patients from Across the Globe
              </h2>
              <div className="flex items-center justify-center gap-1.5 text-[#00897B] font-bold text-xs sm:text-sm tracking-wider uppercase">
                <Globe2 className="h-4 w-4" />
                <span>International Patient Gallery</span>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
                International patients from different countries trust Patel Dental Hospital for world-class dental treatment.
              </p>
            </div>

            {/* Dynamic Masonry Gallery - Pinterest style with complete image display and zero cropping */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 [column-fill:_balance] mx-auto max-w-7xl text-left">
              {galleryPatients.map((patient, index) => (
                <div
                  key={patient.id || index}
                  id={`patient-gallery-card-${patient.id}`}
                  className="break-inside-avoid bg-white rounded-[20px] overflow-hidden border border-slate-100/80 shadow-[0_4px_20px_rgba(8,28,58,0.015)] hover:shadow-[0_12px_30px_rgba(8,28,58,0.06)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col mb-6"
                  onClick={() => setSelectedPatient(patient)}
                >
                  <img
                    src={patient.image_url}
                    alt="Happy Patient"
                    className="w-full h-auto object-contain rounded-[inherit] block bg-slate-50/50"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NRI Patient Testimonial Videos Section */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100" id="nri-patient-testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Heading */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight uppercase">
              NRI PATIENT TESTIMONIAL VIDEOS
            </h2>
            <div className="flex items-center justify-center gap-1.5 text-[#00897B] font-bold text-xs sm:text-sm tracking-wider uppercase">
              <Video className="h-4 w-4" />
              <span>NRI Patient Testimonials</span>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              Hear directly from our NRI and international patients about their seamless dental journeys and world-class care at Patel Dental Hospital.
            </p>
          </div>

          {/* Video Cards Grid / Empty State */}
          {tourismVideos && tourismVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 justify-center items-stretch text-left max-w-7xl mx-auto">
              {tourismVideos.map((video, index) => (
                <div
                  key={video.id || index}
                  className={video.videoPlatform === 'instagram' || video.videoPlatform === 'mp4' ? "w-full max-w-[240px] mx-auto flex flex-col items-center justify-center" : "bg-white rounded-[20px] overflow-hidden border border-slate-100 shadow-[0_6px_18px_rgba(0,0,0,0.22)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full"}
                >
                  {video.videoPlatform === 'instagram' ? (
                    <InstagramEmbed
                      url={video.url || `https://www.instagram.com/p/${video.id}/`}
                      title={video.title}
                      thumbnail={video.thumbnail}
                    />
                  ) : video.videoPlatform === 'mp4' ? (
                    <div className="w-full max-w-[240px] mx-auto flex justify-center">
                      <Mp4ReelPlayer src={video.url || video.id} />
                    </div>
                  ) : (
                    <>
                      <div className="aspect-video w-full bg-slate-950 relative overflow-hidden shrink-0">
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
                            type="button"
                            onClick={() => setActiveVideos(prev => ({ ...prev, [video.id]: true }))}
                            className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group/video focus:outline-none"
                            aria-label={`Play ${video.title}`}
                          >
                            <img
                              src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                              alt={video.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-[1.03]"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                            {/* Centered Play Trigger Icon */}
                            <div className="absolute z-20 flex items-center justify-center w-14 h-14 rounded-full bg-white/95 text-[#00897B] shadow-md group-hover/video:scale-110 group-hover/video:bg-[#00897B] group-hover/video:text-white transition-all duration-300 pointer-events-none">
                              <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                            </div>
                          </button>
                        )}
                      </div>

                      {/* Video metadata */}
                      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <span className="inline-block text-[10px] font-black text-[#00897B] bg-[#E6F6F4] border border-[#00897B]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {video.treatment}
                          </span>
                          <h4 className="font-sans font-extrabold text-[#0B1D3A] text-sm sm:text-base leading-snug group-hover:text-[#00897B] transition-colors duration-300">
                            {video.title}
                          </h4>
                        </div>
                        
                        <div className="text-slate-400 text-[11px] font-bold uppercase tracking-wider pt-3 border-t border-slate-50 flex items-center justify-between">
                          <span>Verified NRI Testimonial</span>
                          <span className="text-[#0ea5e9] flex items-center gap-0.5">
                            <Star className="h-3 w-3 fill-current text-amber-400" /> Featured
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-md mx-auto p-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center space-y-3">
              <Video className="h-8 w-8 text-slate-300" />
              <p className="text-slate-500 text-sm font-semibold">
                No patient testimonial videos available yet.
              </p>
              <p className="text-slate-400 text-xs font-normal">
                Testimonial videos added in the Admin CMS under 'Dental Tourism' treatment will automatically appear here.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* Patient Reviews Section */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100" id="dental-tourism-reviews-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GooglePatientReviews
            label="PATIENT TESTIMONIALS"
            heading="What Our International Patients Say"
            description="Real experiences from patients who travelled to Patel Dental Hospital, Rajkot for world-class dental treatment."
            reviews={UNIVERSAL_GOOGLE_REVIEWS}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-slate-100" id="dental-tourism-faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-[#0D9488]/10 rounded-full border border-[#0D9488]/20">
              <HelpCircle className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              FAQ
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight">
              Frequently Asked Questions About Dental Tourism
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              Everything international patients usually ask before visiting Patel Dental Hospital.
            </p>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
          </div>

          <div className="space-y-3.5 mt-8">
            {dentalTourismFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isExpanded 
                      ? 'border-[#0D9488] shadow-xs' 
                      : 'border-slate-200/80 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    aria-expanded={isExpanded}
                    className="w-full px-6 py-4.5 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-slate-50/60 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
                  >
                    <span className={`font-sans font-bold text-sm sm:text-base leading-snug pr-4 transition-colors duration-200 ${
                      isExpanded ? 'text-[#0D9488]' : 'text-[#081C3A]'
                    }`}>
                      {faq.question}
                    </span>
                    <span className={`p-1.5 rounded-lg shrink-0 transition-all duration-300 ${
                      isExpanded ? 'bg-teal-50 text-[#0D9488] rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-5 pt-2 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100/80 bg-slate-50/40">
                          <p className="whitespace-pre-line font-medium font-sans">
                            {faq.answer}
                          </p>
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

      {/* Lightbox Modal */}
      {selectedPatient && (
        <div 
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-[150] flex items-center justify-center p-4 sm:p-6 animate-fade-in animate-duration-200"
          onClick={() => setSelectedPatient(null)}
        >
          {/* Close button at top corner of window */}
          <button
            type="button"
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer z-10"
            onClick={() => setSelectedPatient(null)}
            aria-label="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Lightbox content container */}
          <div 
            className="relative bg-white p-2 sm:p-3 rounded-3xl overflow-hidden max-w-4xl max-h-[90vh] flex flex-col items-center justify-center shadow-2xl border border-slate-100/10 z-10 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPatient.image_url}
              alt="Patient Gallery Full"
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl block"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

    </div>
  );
}
