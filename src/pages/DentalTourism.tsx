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
  Play,
  Upload,
  Calculator,
  ClipboardCheck,
  Microscope,
  Stethoscope,
  Clock,
  HeartHandshake,
  Crown,
  Layers,
  MessageSquare
} from 'lucide-react';
import { useSEO } from '../utils/seo';
import { internationalPatientsService } from '../utils/internationalPatientsData';
import { beforeAfterService } from '../utils/beforeAfterData';
import { InternationalPatientImage, DentalVideo, BeforeAfterEntry } from '../types';
import { GooglePatientReviews } from '../components/GooglePatientReviews';
import { UNIVERSAL_GOOGLE_REVIEWS } from '../utils/serviceData';
import { InstagramEmbed } from '../components/InstagramEmbed';
import { Mp4ReelPlayer } from '../components/Mp4ReelPlayer';
import { videoService } from '../utils/videoData';
import { BeforeAfterSlider as ServiceBeforeAfterSlider } from '../components/BeforeAfterSlider';

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
    question: "Is dental treatment in India safe?",
    answer: "At Patel Dental Hospital, we follow stringent international sterilization protocols, use advanced dental technology, and employ highly experienced, certified clinicians. While no medical procedure is completely without general clinical risks, we prioritize patient safety and adhere to global quality standards to minimize complications."
  },
  {
    id: 2,
    question: "How much can I save compared with my country?",
    answer: "Many international patients find that dental treatments in India are highly cost-effective compared to Western countries due to lower operational and labor costs. However, exact savings vary depending on the specific procedures, materials chosen, and your personalized clinical needs. Please contact our team for a transparent treatment estimate."
  },
  {
    id: 3,
    question: "Can I get a treatment estimate before travelling?",
    answer: "Yes. By sharing your recent digital X-rays, CBCT scans, or clinical photographs via WhatsApp or email, our team can review your case and provide a comprehensive, transparent treatment plan and estimated cost before you travel."
  },
  {
    id: 4,
    question: "Can I have a video consultation?",
    answer: "Yes, we can arrange a virtual or video consultation. This allows you to discuss your dental concerns directly with our specialist team, ask questions, and understand your treatment options prior to making travel plans."
  },
  {
    id: 5,
    question: "How many days do I need to stay?",
    answer: "Your stay depends on the complexity of your procedure. While simple procedures require a few days, full-mouth treatments are planned in detail beforehand. Please contact our team for a custom schedule tailored to your case."
  },
  {
    id: 6,
    question: "Can complex implant treatment be completed during one trip?",
    answer: "While some cases allow for immediate loading implants, complex implant procedures typically require two stages to allow proper bone healing (osseointegration) between visits. Please share your diagnostic reports with our clinical team for a detailed case-specific treatment timeline."
  },
  {
    id: 7,
    question: "Do I need a CBCT scan before travelling?",
    answer: "It is helpful if you have a recent 3D CBCT scan or OPG X-ray, as it allows our team to provide a more accurate initial assessment. If you do not have one, we can arrange for advanced 3D imaging immediately upon your arrival at our hospital."
  },
  {
    id: 8,
    question: "What happens if I need treatment after returning home?",
    answer: "We provide comprehensive follow-up guidance and post-treatment documentation. Should you require hands-on care or an adjustment after returning, please contact our international coordinator, and we will guide you on the next steps or cooperate with a local clinician where clinically appropriate."
  },
  {
    id: 9,
    question: "Can my family member accompany me?",
    answer: "Yes, family members are welcome to accompany you. We can recommend comfortable nearby hotels and local travel arrangements that accommodate both you and your companion during your visit."
  },
  {
    id: 10,
    question: "How do I pay for treatment?",
    answer: "We support various secure payment options for international patients. Please contact our international patient coordinator for specific accepted methods, transfer guidelines, and secure options suited to your country."
  },
  {
    id: 11,
    question: "Do you help international patients with accommodation?",
    answer: "Yes. Our international patient team can recommend nearby partner hotels and guest houses that fit your budget and stay duration. Please contact our team for assistance with local lodging suggestions."
  },
  {
    id: 12,
    question: "What happens if my treatment requires more visits?",
    answer: "While we make every effort to design a precise treatment plan beforehand, clinical requirements can occasionally vary. If additional visits or adjustments are needed, our coordinator will help you adjust your schedule and appointments accordingly."
  }
];

const internationalTreatments = [
  {
    title: "Dental Implants",
    description: "Replace missing teeth with natural-looking, functional teeth.",
    icon: "/1..webp",
    route: "services/dental-implants"
  },
  {
    title: "Smile Makeover",
    description: "Transform the appearance of your smile with personalised cosmetic dentistry.",
    icon: "/2..webp",
    route: "services/smile-makeover"
  },
  {
    title: "Full-Mouth Rehabilitation",
    description: "Comprehensive reconstruction for severely damaged, worn or missing teeth.",
    icon: "/3..webp",
    route: "services/full-mouth-rehabilitation"
  },
  {
    title: "Zirconia Crowns & Bridges",
    description: "Restore damaged or missing teeth with metal-free, premium Zirconia restorations.",
    icon: "/4..webp",
    route: "services/crowns-bridges"
  },
  {
    title: "Root Canal Treatment",
    description: "Save infected teeth and eliminate pain with comfortable, single-visit root canal therapy.",
    icon: "/6..webp",
    route: "services/root-canal-treatment"
  },
  {
    title: "Aligners & Orthodontics",
    description: "Straighten your teeth comfortably and discreetly with custom, virtually invisible aligners.",
    icon: "/5..webp",
    route: "services/invisible-aligners"
  }
];

const beforeAfterCases = [
  {
    title: "Dental Implants",
    beforeImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Smile Makeover",
    beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Full-Mouth Rehabilitation",
    beforeImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Crowns & Bridges",
    beforeImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Root Canal Treatment",
    beforeImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Aligners & Orthodontics",
    beforeImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800"
  }
];

function BeforeAfterSlider({ beforeImage, afterImage, title, idx }: { beforeImage: string; afterImage: string; title: string; idx: number; key?: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      className="w-full bg-transparent flex flex-col items-center justify-center group"
    >
      <div className="w-full max-w-[480px] mx-auto">
        {/* Treatment Name clearly centered above the slider */}
        <h3 className="font-sans font-extrabold text-[#0B1D3A] text-[20px] sm:text-[22px] leading-tight text-center mb-5 tracking-tight">
          {title}
        </h3>

        {/* Reusing the exact Service Detail BeforeAfterSlider component with strict 16:9 aspect ratio */}
        <ServiceBeforeAfterSlider
          beforeImage={beforeImage}
          afterImage={afterImage}
          aspectRatio="aspect-[16/9]"
        />
      </div>
    </motion.div>
  );
}

interface DentalTourismProps {
  openAppointmentModal: (preselectedTreatment?: string) => void;
  setCurrentPage?: (page: any) => void;
}

export default function DentalTourism({ openAppointmentModal, setCurrentPage }: DentalTourismProps) {
  useSEO({
    title: 'Dental Tourism in India | Save 70% | Patel Dental Hospital',
    description: 'Experience world-class dental care at Patel Dental Hospital, Rajkot. Save significantly on treatments while receiving advanced technology, experienced dentists, and complete assistance for your dental journey in India.',
    keywords: 'Dental Tourism India, International Patients Dental, Cheap Dental Implants India, Patel Dental Hospital Rajkot, Affordable Dentistry, Travel Dental'
  });

  const [galleryPatients, setGalleryPatients] = React.useState<InternationalPatientImage[]>([]);
  const [beforeAfterList, setBeforeAfterList] = React.useState<BeforeAfterEntry[]>([]);
  const [selectedPatient, setSelectedPatient] = React.useState<InternationalPatientImage | null>(null);
  const [expandedFaqId, setExpandedFaqId] = React.useState<number | null>(null);
  const [tourismVideos, setTourismVideos] = React.useState<DentalVideo[]>([]);
  const [activeVideos, setActiveVideos] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    let active = true;
    const fetchBeforeAfter = async () => {
      try {
        const data = await beforeAfterService.getBeforeAfterEntries();
        if (active) {
          // Filter only active ones for frontend and sort them by display_order
          const sorted = (data || [])
            .filter(item => item.is_active !== false)
            .sort((a, b) => {
              const orderA = a.display_order !== undefined ? a.display_order : 99999;
              const orderB = b.display_order !== undefined ? b.display_order : 99999;
              return orderA - orderB;
            });
          setBeforeAfterList(sorted);
        }
      } catch (err) {
        console.error('Error fetching before/after entries:', err);
      }
    };
    fetchBeforeAfter();
    return () => {
      active = false;
    };
  }, []);

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
      <section className="relative overflow-hidden pt-[110px] sm:pt-[130px] lg:pt-[160px] pb-10 lg:pb-16 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Desktop Hero Layout: Visible only on screens lg and up */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-7 flex flex-col space-y-7 text-left">
              <div className="space-y-4">
                {/* Brand Eyebrow */}
                <div className="text-xs sm:text-sm font-extrabold text-[#1E3A5F] tracking-wide font-sans lg:whitespace-nowrap">
                  Premium Dental Care. Personalised Treatment. Exceptional Value.
                </div>

                {/* Hero Main Heading */}
                <h1 className="font-display tracking-tight text-[#0CC2DA] leading-tight">
                  <span 
                    style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.12)' }}
                    className="block text-3xl sm:text-4xl lg:text-[32px] xl:text-[40px] 2xl:text-[46px] font-black tracking-tight lg:whitespace-nowrap"
                  >
                    Transform Your Smile in India.
                  </span>
                </h1>

                {/* Supporting Description */}
                <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed font-sans max-w-2xl">
                  Get your dental treatment planned before you travel to India.
                </p>
              </div>

              {/* 4-step Cards Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-1">
                {/* Card 1 */}
                <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col items-center text-center justify-start hover:shadow-md transition-all duration-300 h-full min-h-[170px]">
                  {/* Fixed-height Icon Area */}
                  <div className="h-16 flex items-center justify-center mb-1.5 w-full">
                    <Upload className="h-[32px] w-[32px] text-slate-600 shrink-0" strokeWidth={1.75} />
                  </div>
                  {/* Text Area */}
                  <div className="flex-1 flex items-start justify-center">
                    <h3 className="text-xs sm:text-sm font-bold text-[#1E3A5F] leading-snug">
                      Send your X-rays, scans or dental photos
                    </h3>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col items-center text-center justify-start hover:shadow-md transition-all duration-300 h-full min-h-[170px]">
                  {/* Fixed-height Icon Area */}
                  <div className="h-16 flex items-center justify-center mb-1.5 w-full">
                    <ClipboardCheck className="h-[32px] w-[32px] text-slate-600 shrink-0" strokeWidth={1.75} />
                  </div>
                  {/* Text Area */}
                  <div className="flex-1 flex items-start justify-center">
                    <h3 className="text-xs sm:text-sm font-bold text-[#1E3A5F] leading-snug">
                      Receive your preliminary treatment plan
                    </h3>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col items-center text-center justify-start hover:shadow-md transition-all duration-300 h-full min-h-[170px]">
                  {/* Fixed-height Icon Area */}
                  <div className="h-16 flex items-center justify-center mb-1.5 w-full">
                    <Calculator className="h-[32px] w-[32px] text-slate-600 shrink-0" strokeWidth={1.75} />
                  </div>
                  {/* Text Area */}
                  <div className="flex-1 flex items-start justify-center">
                    <h3 className="text-xs sm:text-sm font-bold text-[#1E3A5F] leading-snug">
                      Understand estimated cost & treatment duration
                    </h3>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col items-center text-center justify-start hover:shadow-md transition-all duration-300 h-full min-h-[170px]">
                  {/* Fixed-height Icon Area */}
                  <div className="h-16 flex items-center justify-center mb-1.5 w-full">
                    <Plane className="h-[32px] w-[32px] text-slate-600 shrink-0" strokeWidth={1.75} />
                  </div>
                  {/* Text Area */}
                  <div className="flex-1 flex items-start justify-center">
                    <h3 className="text-xs sm:text-sm font-bold text-[#1E3A5F] leading-snug">
                      Plan your trip with confidence
                    </h3>
                  </div>
                </div>
              </div>

              {/* CTA and Reassurance Section */}
              <div className="pt-1">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => openAppointmentModal('Get My Free Treatment Plan')}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#00897B] text-white hover:bg-[#00796B] transition-all duration-300 shadow-[0_4px_14px_rgba(0,137,123,0.3)] hover:shadow-[0_6px_20px_rgba(0,137,123,0.4)] cursor-pointer w-full sm:w-auto"
                  >
                    <Calendar className="h-4.5 w-4.5" />
                    GET MY FREE TREATMENT PLAN
                    <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                </div>
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

          {/* Tablet Hero Layout: Visible only on md to lg (768px to 1024px) */}
          <div className="hidden md:grid lg:hidden grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Content */}
            <div className="col-span-7 flex flex-col space-y-5 text-left">
              <div className="space-y-3">
                {/* Brand Eyebrow */}
                <div className="text-xs font-extrabold text-[#1E3A5F] tracking-wide font-sans">
                  Premium Dental Care. Personalised Treatment. Exceptional Value.
                </div>

                {/* Hero Main Heading */}
                <h1 className="font-display tracking-tight text-[#0CC2DA] leading-tight">
                  <span 
                    style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.12)' }}
                    className="block text-2xl font-black tracking-tight"
                  >
                    Transform Your Smile in India.
                  </span>
                </h1>

                {/* Supporting Description */}
                <p className="text-slate-600 text-xs font-medium leading-relaxed font-sans max-w-lg">
                  Get your dental treatment planned before you travel to India.
                </p>
              </div>

              {/* 4-step Cards Layout - clean row/grid layout for tablet */}
              <div className="grid grid-cols-2 gap-3 w-full pt-1">
                {/* Card 1 */}
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center text-left gap-3.5 hover:shadow-md transition-all duration-300">
                  <Upload className="h-6 w-6 text-[#00897B] shrink-0" strokeWidth={1.75} />
                  <h3 className="text-[10.5px] font-bold text-[#1E3A5F] leading-snug">
                    Send X-rays, scans or dental photos
                  </h3>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center text-left gap-3.5 hover:shadow-md transition-all duration-300">
                  <ClipboardCheck className="h-6 w-6 text-[#00897B] shrink-0" strokeWidth={1.75} />
                  <h3 className="text-[10.5px] font-bold text-[#1E3A5F] leading-snug">
                    Receive preliminary treatment plan
                  </h3>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center text-left gap-3.5 hover:shadow-md transition-all duration-300">
                  <Calculator className="h-6 w-6 text-[#00897B] shrink-0" strokeWidth={1.75} />
                  <h3 className="text-[10.5px] font-bold text-[#1E3A5F] leading-snug">
                    Understand cost & duration estimate
                  </h3>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center text-left gap-3.5 hover:shadow-md transition-all duration-300">
                  <Plane className="h-6 w-6 text-[#00897B] shrink-0" strokeWidth={1.75} />
                  <h3 className="text-[10.5px] font-bold text-[#1E3A5F] leading-snug">
                    Plan your trip with confidence
                  </h3>
                </div>
              </div>

              {/* CTA and Reassurance Section */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => openAppointmentModal('Get My Free Treatment Plan')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#00897B] text-white hover:bg-[#00796B] transition-all duration-300 shadow-[0_4px_14px_rgba(0,137,123,0.3)] hover:shadow-[0_6px_20px_rgba(0,137,123,0.4)] cursor-pointer w-full sm:w-auto"
                >
                  <Calendar className="h-4 w-4 shrink-0" />
                  GET MY FREE TREATMENT PLAN
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>
              </div>

            </div>

            {/* Right Column: Hero Image */}
            <div className="col-span-5 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 relative">
                <img
                  src="/NRI.webp"
                  alt="Patel Dental Hospital International Care"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  id="dental-tourism-tablet-hero-img"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Mobile Hero Layout: Only visible on screens smaller than md */}
          <div className="block md:hidden space-y-6 text-center">
            {/* 1. HERO HEADING */}
            <div className="space-y-3">
              <div className="text-[11px] font-black text-[#1E3A5F] tracking-wider font-sans uppercase">
                Premium Dental Care • Personalised • Exceptional Value
              </div>
              <h1 className="font-display tracking-tight text-[#0CC2DA] leading-tight">
                <span 
                  style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.12)' }}
                  className="block text-3xl font-black tracking-tight"
                >
                  Transform Your Smile in India.
                </span>
              </h1>
            </div>

            {/* 2. HERO IMAGE */}
            <div className="mx-auto max-w-sm px-2">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-md border-4 border-white bg-slate-50 relative">
                <img
                  src="/NRI.webp"
                  alt="Patel Dental Hospital International Care"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* 2b. Hero Description moved below image */}
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed font-sans max-w-md mx-auto px-4">
              Get your dental treatment planned before you travel to India.
            </p>

            {/* 3. HERO INFORMATION CARD */}
            <div className="bg-white rounded-2xl border border-slate-150 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.03)] max-w-sm mx-auto space-y-4">
              {/* Compact Step Highlights */}
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFAFC] border border-slate-100">
                  <Upload className="h-4.5 w-4.5 text-slate-500 shrink-0" strokeWidth={1.75} />
                  <span className="text-[10px] font-extrabold text-[#1E3A5F] leading-snug">
                    Send X-rays / dental photos
                  </span>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFAFC] border border-slate-100">
                  <ClipboardCheck className="h-4.5 w-4.5 text-slate-500 shrink-0" strokeWidth={1.75} />
                  <span className="text-[10px] font-extrabold text-[#1E3A5F] leading-snug">
                    Receive treatment plan
                  </span>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFAFC] border border-slate-100">
                  <Calculator className="h-4.5 w-4.5 text-slate-500 shrink-0" strokeWidth={1.75} />
                  <span className="text-[10px] font-extrabold text-[#1E3A5F] leading-snug">
                    Understand plan & cost
                  </span>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFAFC] border border-slate-100">
                  <Plane className="h-4.5 w-4.5 text-slate-500 shrink-0" strokeWidth={1.75} />
                  <span className="text-[10px] font-extrabold text-[#1E3A5F] leading-snug">
                    Plan trip with confidence
                  </span>
                </div>
              </div>

              {/* Compact CTA Button */}
              <button
                type="button"
                onClick={() => openAppointmentModal('Get My Free Treatment Plan')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-[#00897B] text-white hover:bg-[#00796B] transition-all duration-300 shadow-md cursor-pointer"
              >
                <Calendar className="h-4 w-4 shrink-0" />
                <span>GET FREE PLAN</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Why Travel to India Section */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[#00897B] uppercase tracking-widest block">
              WHY ARE INTERNATIONAL PATIENTS CHOOSING INDIA?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              Why Travel to India for Dental Treatment?
            </h2>
          </div>

          {/* 5 Benefit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto mb-12">
            
            {/* Card 1 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-slate-600">
                <Microscope className="h-[24px] w-[24px] sm:h-[30px] sm:w-[30px]" strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                Advanced Dentistry
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                Modern digital diagnostics, treatment planning and contemporary dental techniques.
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-slate-600">
                <Wallet className="h-[24px] w-[24px] sm:h-[30px] sm:w-[30px]" strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                Significant Cost Advantage
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                Receive high-quality dental treatment at a substantially lower cost than many Western countries.
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-slate-600">
                <Stethoscope className="h-[24px] w-[24px] sm:h-[30px] sm:w-[30px]" strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                Experienced Dental Professionals
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                Access to dentists and specialists across multiple areas of dentistry.
              </p>
            </div>

            {/* Card 4 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-slate-600">
                <Clock className="h-[24px] w-[24px] sm:h-[30px] sm:w-[30px]" strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                Faster Access to Treatment
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                Reduce long waiting periods and plan treatment around your travel schedule.
              </p>
            </div>

            {/* Card 5 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-slate-600">
                <HeartHandshake className="h-[24px] w-[24px] sm:h-[30px] sm:w-[30px]" strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                Personalised Care
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                One treatment coordinator helps you throughout your dental journey.
              </p>
            </div>

          </div>

          {/* Supporting statement */}
          <div className="max-w-4xl mx-auto mt-12 p-5 bg-[#FAFAFC] border border-slate-200/80 rounded-2xl">
            <p className="text-[#0B1D3A] text-xs sm:text-sm md:text-base font-semibold leading-relaxed font-sans">
              India's medical-tourism sector is increasingly promoted around affordability, advanced infrastructure, reduced waiting times and coordinated international-patient support.
            </p>
          </div>

        </div>
      </section>


      {/* Why Choose Section with 6 Feature Cards */}
      <section className="py-12 md:py-16 bg-[#FAFAFC]">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            
            {/* Card 1 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-2xl sm:text-3xl">
                🏆
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                15+ Years of Excellence
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                Trusted dental care with years of experience and thousands of successful smiles.
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-2xl sm:text-3xl">
                🌍
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                Global Patient Trust
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                Patients from USA, UK, Canada, Australia, Africa and many other countries trust Patel Dental Hospital.
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-2xl sm:text-3xl">
                🦷
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                Advanced Dental Technology
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                Modern digital dentistry with internationally accepted treatment protocols.
              </p>
            </div>

            {/* Card 4 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-2xl sm:text-3xl">
                🛡️
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                Safe & Hygienic Clinic
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                International sterilization standards and patient safety at every step.
              </p>
            </div>

            {/* Card 5 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-2xl sm:text-3xl">
                ✈️
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                Complete Travel Assistance
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                Travel planning, accommodation guidance, airport assistance, and treatment coordination.
              </p>
            </div>

            {/* Card 6 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-2xl sm:text-3xl">
                🤝
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                Dedicated Patient Coordinator
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                Personal support from consultation until treatment completion.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Patients from Across the Globe Section */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100">
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
      <section className="py-12 md:py-16 bg-[#FAFAFC] border-t border-slate-100">
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
          <div className="max-w-6xl mx-auto bg-white border border-[#E2E8F0] rounded-[24px] shadow-sm overflow-hidden text-left">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-[#312E81] text-white">
                    <th className="px-6 py-5 text-left font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-indigo-950">
                      Treatment
                    </th>
                    <th className="px-6 py-5 text-center font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-indigo-950">
                      USA
                    </th>
                    <th className="px-6 py-5 text-center font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-indigo-950">
                      UK
                    </th>
                    <th className="px-6 py-5 text-center font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-indigo-950">
                      Australia
                    </th>
                    <th className="px-6 py-5 text-center font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-indigo-950">
                      Canada
                    </th>
                    <th className="px-6 py-5 text-center font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-indigo-950">
                      India
                    </th>
                    <th className="px-6 py-5 text-center font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-indigo-950">
                      Savings %
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {[
                    { treatment: "Single Dental Implant", usa: "$3,000–$5,000", uk: "£2,500–£4,000", aus: "AUD 4,200–6,500", can: "CAD 3,800–5,500", india: "₹30,000–₹45,000", savings: "84–93%" },
                    { treatment: "Root Canal Treatment", usa: "$1,000–$1,500", uk: "£800–£1,200", aus: "AUD 1,500–2,500", can: "CAD 1,300–2,000", india: "₹4,000–₹6,000", savings: "94–97%" },
                    { treatment: "Full Mouth Rehabilitation", usa: "$25,000–$40,000", uk: "£20,000–£32,000", aus: "AUD 35,000–55,000", can: "CAD 32,000–48,000", india: "₹2,50,000–₹4,50,000", savings: "81–93%" },
                    { treatment: "Smile Makeover", usa: "$12,000–$20,000", uk: "£10,000–£16,000", aus: "AUD 18,000–30,000", can: "CAD 16,000–25,000", india: "₹1,20,000–₹2,00,000", savings: "83–94%" },
                    { treatment: "Clear Aligners", usa: "$4,000–$7,000", uk: "£3,500–£5,500", aus: "AUD 6,000–9,000", can: "CAD 5,500–8,000", india: "₹60,000–₹1,50,000", savings: "63–91%" },
                    { treatment: "Crowns & Bridges", usa: "$1,200–$2,000", uk: "£900–£1,500", aus: "AUD 1,800–3,000", can: "CAD 1,600–2,500", india: "₹8,000–₹15,000", savings: "87–96%" },
                    { treatment: "Teeth Whitening", usa: "$600–$800", uk: "£500–£800", aus: "AUD 900–1,500", can: "CAD 800–1,300", india: "₹7,000–₹10,000", savings: "83–92%" },
                    { treatment: "Kids Dentistry", usa: "$400–$800", uk: "£300–£600", aus: "AUD 900–1,500", can: "CAD 800–1,300", india: "₹4,500–₹8,000", savings: "83–95%" },
                    { treatment: "Wisdom Tooth Treatment", usa: "$600–$1,000", uk: "£500–£800", aus: "AUD 250–500", can: "CAD 250–450", india: "₹1,500–₹2,500", savings: "94–98%" },
                    { treatment: "Composite Filling", usa: "$200–$400", uk: "£150–£300", aus: "AUD 2,000–3,500", can: "CAD 1,800–3,000", india: "₹12,000–₹18,000", savings: "76–91%" },
                    { treatment: "Dental Veneers", usa: "$1,500–$2,500", uk: "£1,200–£2,000", aus: "AUD 2,000–4,000", can: "CAD 2,000–3,500", india: "₹20,000–₹35,000", savings: "76–92%" },
                    { treatment: "Dentures", usa: "$1,500–$3,000", uk: "£1,200–£2,500", aus: "AUD 2,000–4,000", can: "CAD 2,000–3,500", india: "₹20,000–₹35,000", savings: "76–93%" }
                  ].map((row, idx) => (
                    <tr 
                      key={idx} 
                      className={`${idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"} hover:bg-slate-50 transition-colors duration-200`}
                    >
                      <td className="px-6 py-5 text-left font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                        {row.treatment}
                      </td>
                      <td className="px-6 py-5 text-center font-sans font-medium text-[#475569] text-sm sm:text-base">
                        {row.usa}
                      </td>
                      <td className="px-6 py-5 text-center font-sans font-medium text-[#475569] text-sm sm:text-base">
                        {row.uk}
                      </td>
                      <td className="px-6 py-5 text-center font-sans font-medium text-[#475569] text-sm sm:text-base">
                        {row.aus}
                      </td>
                      <td className="px-6 py-5 text-center font-sans font-medium text-[#475569] text-sm sm:text-base">
                        {row.can}
                      </td>
                      <td className="px-6 py-5 text-center font-sans font-semibold text-[#0D9488] text-sm sm:text-base">
                        {row.india}
                      </td>
                      <td className="px-6 py-5 text-center font-sans font-bold text-indigo-700 text-sm sm:text-base">
                        {row.savings}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* NEW — What Can We Treat? Section */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-[#0D9488] font-bold text-xs sm:text-sm tracking-wider uppercase">
              DENTAL TREATMENTS FOR INTERNATIONAL PATIENTS
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              What Can We Treat?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              Explore our most requested dental treatments and find the right solution for your smile.
            </p>
          </div>

          {/* Centered Line-Art Treatment Cards Grid (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 max-w-sm md:max-w-none mx-auto">
            {internationalTreatments.map((treatment, idx) => {
              const IconComponent = treatment.icon as any;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="w-full bg-[#E6F6F4] rounded-[24px] border border-slate-200/60 shadow-[0_8px_30px_rgba(8,28,58,0.03)] hover:shadow-[0_24px_50px_rgba(8,28,58,0.08)] hover:-translate-y-1.5 transition-all duration-300 p-6 sm:p-12 flex flex-col items-center justify-between h-full text-center group"
                >
                  {/* Thin, Centered Line-Style Dental Icon */}
                  <div className="flex justify-center mb-4 sm:mb-8 text-[#0B1D3A] group-hover:text-[#0D9488] transition-colors duration-300">
                    {typeof IconComponent === 'string' ? (
                      <img 
                        src={IconComponent} 
                        alt={treatment.title} 
                        className="h-16 w-16 sm:h-24 sm:w-24 object-contain" 
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <IconComponent className="h-16 w-16 sm:h-24 sm:w-24" strokeWidth={1.2} />
                    )}
                  </div>

                  {/* Centered Title */}
                  <h3 className="font-sans font-bold text-[#0B1D3A] text-[18px] sm:text-[22px] leading-snug text-center mb-2 sm:mb-4">
                    {treatment.title}
                  </h3>

                  {/* Centered Description */}
                  {treatment.description ? (
                    <p className="text-slate-600 text-xs sm:text-[14.5px] leading-relaxed text-center font-medium max-w-sm mx-auto flex-grow mb-4 sm:mb-8">
                      {treatment.description}
                    </p>
                  ) : null}

                  {/* Centered Learn More CTA */}
                  <div className="pt-4 sm:pt-6 border-t border-slate-150/60 w-full flex justify-center mt-auto">
                    <button
                      onClick={() => {
                        if (setCurrentPage && treatment.route) {
                          setCurrentPage(treatment.route);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          openAppointmentModal(treatment.title);
                        }
                      }}
                      className="text-[#0D9488] hover:text-[#0F766E] font-bold text-xs sm:text-base tracking-wide flex items-center justify-center gap-1.5 transition-colors duration-200 cursor-pointer group/btn"
                    >
                      Learn More <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Risk-Free First Step Section */}
      <section className="py-8 md:py-10 bg-[#F0FDFB] border-t border-b border-teal-100/50 relative overflow-hidden">
        {/* Decorative subtle ambient soft lights */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#2DD4BF]/10 rounded-full blur-3xl pointer-events-none -mr-48 -mt-24" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#E6F6F4]/60 rounded-full blur-3xl pointer-events-none -ml-48 -mb-24" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Information & Form CTA */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              <div className="space-y-3 sm:space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F6F4] text-[#0D9488] font-bold text-xs tracking-wider uppercase font-sans">
                  DENTAL TOURISM CONSULTATION
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0B1D3A] tracking-tight leading-[1.15]">
                  Not Sure Which Treatment Is<br className="hidden sm:inline" />
                  Right for You?
                </h2>
                <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                  Let our dental experts review your case and guide you toward the right treatment plan before you travel to India.
                </p>
              </div>

              {/* Contact Line */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#0D9488] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="text-[#0B1D3A] text-lg sm:text-xl font-bold font-sans tracking-tight">
                  Call: <a href="tel:+919510397046" className="hover:text-[#0D9488] transition-colors duration-300">+91 9510397046</a>
                </p>
              </div>

              {/* Primary CTA Area */}
              <div className="space-y-4 pt-2">
                <div>
                  <button
                    type="button"
                    onClick={() => openAppointmentModal('Get My Free Treatment Plan')}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl text-sm sm:text-base font-extrabold uppercase tracking-wider bg-[#0D9488] text-white hover:bg-[#0F766E] transition-all duration-300 shadow-[0_8px_25px_rgba(13,148,136,0.25)] hover:shadow-[0_12px_35px_rgba(13,148,136,0.4)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full sm:w-auto text-center font-sans"
                  >
                    <Calendar className="h-5 w-5" />
                    GET MY FREE TREATMENT PLAN
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Doctor Portrait Presentation */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              
              {/* Clean, sized image wrapper directly on the mint background */}
              <div className="relative w-full max-w-[310px] sm:max-w-[360px] lg:max-w-[380px] aspect-[4/5] rounded-[24px] overflow-hidden transition-transform duration-500 hover:-translate-y-1">
                <img
                  src="/dr. vipul patel.webp"
                  alt="Dr. Vipul Patel - Best Dentist in Rajkot"
                  className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                {/* Gentle vignette shade at the bottom of the portrait */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Patient-reassurance details underneath, sitting directly on the mint background */}
              <div className="mt-4 text-center">
                <p className="font-extrabold text-[#0B1D3A] text-base sm:text-lg font-sans tracking-tight">
                  Dr. Vipul Patel
                </p>
                <p className="text-[#0D9488] font-bold text-xs uppercase tracking-wider mt-0.5 font-sans">
                  Chief Dental Implantologist
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEW — "Real Patients. Real Transformations." Before & After Section */}
      <section className="py-12 md:py-16 bg-[#FAFAFC] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <p className="text-[#0D9488] font-bold text-xs sm:text-sm tracking-wider uppercase">
              REAL PATIENT TRANSFORMATIONS
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              Real Patients. Real Transformations.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              Interact with our before and after sliders to see the precise clinical results achieved through personalized dental care at Patel Dental Hospital.
            </p>
          </div>

          {/* Interactive Slider Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
            {beforeAfterList.map((caseItem, idx) => (
              <BeforeAfterSlider
                key={caseItem.id || idx}
                title={caseItem.treatment_name}
                beforeImage={caseItem.before_image_url}
                afterImage={caseItem.after_image_url}
                idx={idx}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Your Dental Tourism Journey Section */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100">
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
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-7xl mx-auto">
            
            {/* Step 1 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider font-sans">
                  Step 1
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[24px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                Tell Us About Your Dental Problem
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.5] sm:leading-[1.7] font-medium flex-1">
                WhatsApp your photographs, X-rays and reports.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <Video className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider font-sans">
                  Step 2
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[24px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                Virtual Consultation
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.5] sm:leading-[1.7] font-medium flex-1">
                Discuss your concerns with our dental team.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <ClipboardCheck className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider font-sans">
                  Step 3
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[24px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                Receive Your Treatment Plan
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.5] sm:leading-[1.7] font-medium flex-1">
                Understand recommended treatment, estimated cost and expected duration.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider font-sans">
                  Step 4
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[24px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                Plan Your Trip
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.5] sm:leading-[1.7] font-medium flex-1">
                Our international-patient coordinator helps you organise your appointments around your travel dates.
              </p>
            </div>

            {/* Step 5 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider font-sans">
                  Step 5
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[24px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                Arrive in India
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.5] sm:leading-[1.7] font-medium flex-1">
                Your treatment schedule is prepared before you arrive.
              </p>
            </div>

            {/* Step 6 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <Activity className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider font-sans">
                  Step 6
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[24px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                Begin Your Treatment
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.5] sm:leading-[1.7] font-medium flex-1">
                Treatment is carried out according to your personalised plan.
              </p>
            </div>

            {/* Step 7 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <HeartHandshake className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider font-sans">
                  Step 7
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[24px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                Return Home With Continued Support
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.5] sm:leading-[1.7] font-medium flex-1">
                Follow-up guidance can continue after you return home, where clinically appropriate.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* How Long Will I Need to Stay in India Section */}
      <section className="py-12 md:py-16 bg-[#FAFAFC] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Title, Subtitle and Description */}
          <div className="max-w-3xl mx-auto mb-12 space-y-4">
            <p className="text-[#0D9488] font-bold text-xs sm:text-sm tracking-wider uppercase">
              SIMPLE. SAFE. HASSLE-FREE.
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              How Long Will I Need to Stay in India?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              Planning your visit is simple. Below is an overview of the typical stay required for each key dental procedure.
            </p>
          </div>

          {/* Treatment Duration Table Container */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgba(8,28,58,0.03)] overflow-hidden text-left">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#E6F6F4]/50 border-b border-slate-100">
                    <th className="py-4.5 px-6 font-sans font-extrabold text-[#0B1D3A] text-sm sm:text-base tracking-tight">
                      Treatment
                    </th>
                    <th className="py-4.5 px-6 font-sans font-extrabold text-[#0D9488] text-sm sm:text-base tracking-tight text-right">
                      Typical Visit Duration*
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  {[
                    { name: "Dental Implant", duration: "X–X days" },
                    { name: "Multiple Implants", duration: "X–X days" },
                    { name: "Smile Makeover", duration: "X–X days" },
                    { name: "Full-Mouth Rehabilitation", duration: "X–X days" },
                    { name: "Zirconia Crowns", duration: "X–X days" },
                    { name: "Root Canal + Crown", duration: "X–X days" }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-sans font-semibold text-[#0B1D3A] text-sm sm:text-base">
                        {row.name}
                      </td>
                      <td className="py-4 px-6 font-sans font-bold text-[#0D9488] text-sm sm:text-base text-right whitespace-nowrap">
                        {row.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Disclaimer Note */}
          <p className="text-slate-500 text-xs sm:text-sm mt-6 font-medium max-w-2xl mx-auto leading-relaxed">
            *Treatment duration varies according to clinical requirements. Your personalised schedule will be prepared after reviewing your case.
          </p>

        </div>
      </section>

      {/* International Patient Concierge Section */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Heading & Label */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-[#0D9488] font-bold text-xs sm:text-sm tracking-wider uppercase">
              INTERNATIONAL PATIENT CONCIERGE
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              Your Personal Dental Journey Coordinator
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              From your first WhatsApp message to your final appointment, our team helps coordinate your dental journey.
            </p>
          </div>

          {/* Assistance Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left">
            {[
              {
                title: "Appointment scheduling",
                description: "Hassle-free booking aligned with your travel dates.",
                icon: Calendar,
              },
              {
                title: "Treatment coordination",
                description: "Complete clinical alignment with our team of specialists.",
                icon: Stethoscope,
              },
              {
                title: "Treatment timeline",
                description: "Detailed duration and clinical roadmap before your visit.",
                icon: Clock,
              },
              {
                title: "Airport/transport assistance",
                description: "Arranging airport pickup and local travel assistance.",
                icon: Plane,
              },
              {
                title: "Hotel recommendations",
                description: "Selection of vetted, comfortable nearby hotels based on your budget.",
                icon: MapPin,
              },
              {
                title: "Local guidance",
                description: "Personal tips on local dining, sights, and safe travel in Gujarat.",
                icon: Compass,
              },
              {
                title: "Payment guidance",
                description: "Safe international transfer, cards, and transparent invoicing options.",
                icon: Wallet,
              },
              {
                title: "Follow-up coordination",
                description: "Remote consultations and continued care post-treatment.",
                icon: HeartHandshake,
              },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-[#E5EEF5] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(8,28,58,0.03)] hover:shadow-[0_12px_24px_rgba(8,28,58,0.06)] hover:border-[#B9D1E6] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Icon & Checkmark Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#0D9488]">
                        <IconComponent className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E6F6F4] text-[#0D9488]">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </div>
                    </div>
                    {/* Content */}
                    <h4 className="font-sans font-bold text-[#0B1D3A] text-base sm:text-[17px] mb-2 tracking-tight leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Explore Gujarat Section */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100">
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

      {/* What Is Included Section */}
      <section className="py-12 md:py-16 bg-[#FAFAFC] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Heading & Label */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-[#0D9488] font-bold text-xs sm:text-sm tracking-wider uppercase">
              WHAT IS INCLUDED?
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              Your Treatment Plan Will Clearly Explain
            </h2>
          </div>

          {/* 3-Column Grid for Clinical, Financial, Travel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left mb-12">
            
            {/* Card 1: Clinical */}
            <div className="bg-white border border-[#E5EEF5] rounded-[20px] p-6 sm:p-8 shadow-[0_4px_20px_rgba(8,28,58,0.03)] hover:shadow-[0_12px_24px_rgba(8,28,58,0.06)] hover:border-[#B9D1E6] transition-all duration-300 relative flex flex-col">
              {/* Top Accent Icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#0D9488] shrink-0">
                  <Stethoscope className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans font-extrabold text-[#0B1D3A] text-xl tracking-tight">
                  Clinical
                </h3>
              </div>
              
              {/* List items */}
              <ul className="space-y-4 flex-grow">
                {[
                  "Diagnosis",
                  "Recommended treatment",
                  "Alternative options",
                  "Number of teeth/implants",
                  "Materials",
                  "Treatment stages"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#0D9488] shrink-0 mt-0.5">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </div>
                    <span className="text-[#475569] text-[15px] font-medium leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Financial */}
            <div className="bg-white border border-[#E5EEF5] rounded-[20px] p-6 sm:p-8 shadow-[0_4px_20px_rgba(8,28,58,0.03)] hover:shadow-[0_12px_24px_rgba(8,28,58,0.06)] hover:border-[#B9D1E6] transition-all duration-300 relative flex flex-col">
              {/* Top Accent Icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#0D9488] shrink-0">
                  <Wallet className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans font-extrabold text-[#0B1D3A] text-xl tracking-tight">
                  Financial
                </h3>
              </div>
              
              {/* List items */}
              <ul className="space-y-4 flex-grow">
                {[
                  "Treatment cost",
                  "Diagnostic charges",
                  "Laboratory charges where applicable",
                  "Medication where applicable",
                  "Additional procedures if required"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#0D9488] shrink-0 mt-0.5">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </div>
                    <span className="text-[#475569] text-[15px] font-medium leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3: Travel */}
            <div className="bg-white border border-[#E5EEF5] rounded-[20px] p-6 sm:p-8 shadow-[0_4px_20px_rgba(8,28,58,0.03)] hover:shadow-[0_12px_24px_rgba(8,28,58,0.06)] hover:border-[#B9D1E6] transition-all duration-300 relative flex flex-col">
              {/* Top Accent Icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#0D9488] shrink-0">
                  <Plane className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans font-extrabold text-[#0B1D3A] text-xl tracking-tight">
                  Travel
                </h3>
              </div>
              
              {/* List items */}
              <ul className="space-y-4 flex-grow">
                {[
                  "Expected number of visits",
                  "Approximate treatment duration",
                  "Recommended arrival/departure schedule"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#0D9488] shrink-0 mt-0.5">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </div>
                    <span className="text-[#475569] text-[15px] font-medium leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Statement & Supporting Text */}
          <div className="max-w-2xl mx-auto space-y-3 mt-12">
            <h4 className="text-xl sm:text-2xl font-extrabold text-[#0D9488] tracking-tight">
              “Clear information. No surprises.”
            </h4>
            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
              Your personalised treatment plan is designed to clearly explain the expected treatment, costs and timeline before you travel.
            </p>
          </div>

        </div>
      </section>

      {/* Happy Patients from Across the Globe Section */}
      {galleryPatients && galleryPatients.length > 0 && (
        <section className="py-12 md:py-16 bg-[#FAFAFC] border-t border-slate-100" id="happy-patients-gallery-section">
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
      <section className="py-12 md:py-16 bg-white border-t border-slate-100" id="nri-patient-testimonials-section">
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
      <section className="py-12 md:py-16 bg-white border-t border-slate-100" id="dental-tourism-reviews-section">
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
      <section className="py-12 md:py-16 bg-[#FAFAFC] border-t border-slate-100" id="dental-tourism-faq-section">
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


      {/* Final Conversion CTA Section */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100" id="dental-tourism-final-cta-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="relative overflow-hidden rounded-[32px] py-12 px-6 sm:py-16 sm:px-12 bg-gradient-to-br from-[#081C3A] via-[#0D305A] to-[#0B1D3A] text-white border border-slate-800/80 shadow-2xl">
            {/* Decorative background radial gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(13,148,136,0.18),transparent_45%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,148,136,0.18),transparent_45%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              {/* Heading */}
              <h2 className="font-sans font-black text-3xl sm:text-4xl lg:text-[44px] text-white tracking-tight leading-tight">
                Your New Smile Could Begin <br className="hidden sm:inline" />
                With One Message.
              </h2>

              {/* Subheading */}
              <p className="text-[#94A3B8] text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                You don't need to know exactly what treatment you need.
              </p>

              {/* Supporting text */}
              <p className="text-white text-sm sm:text-base font-bold leading-relaxed max-w-2xl mx-auto">
                Tell us your concern. Send us your X-ray or photographs. We'll help <br className="hidden sm:inline" />
                you understand your options.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center pt-4">
                <button
                  type="button"
                  onClick={() => openAppointmentModal('Get My Free Treatment Plan')}
                  className="w-full sm:w-auto px-8 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer active:scale-98 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50"
                >
                  <Calendar className="h-4.5 w-4.5 shrink-0" />
                  <span>GET MY FREE TREATMENT PLAN</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>
              </div>
            </div>
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
