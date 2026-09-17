/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Calendar,
  Scale,
  Timer,
  Users,
  Award,
  ArrowRight,
  MessageCircle,
  TrendingUp,
  Heart,
  ChevronUp,
  ChevronDown,
  HelpCircle,
  AlertCircle,
  Info,
  FileText,
  Phone,
  Activity,
  Cpu,
  X,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceGalleryItem, MarketingConfig } from '../../types';
import { BeforeAfterSlider } from '../BeforeAfterSlider';
import { ClinicalCaseGallery } from '../ClinicalCaseGallery';
import { GooglePatientReviews } from '../GooglePatientReviews';
import { SurgicalTeamSection } from './SurgicalTeamSection';
import { TREATMENTS } from '../../data/treatments';
import { DEFAULT_SERVICES } from '../../utils/serviceData';

export interface WisdomToothSurgeryViewProps {
  heroElement: React.ReactNode;
  videoElement: React.ReactNode;
  testimonialsElement: React.ReactNode;
  faqElement: React.ReactNode;
  bottomCtaElement: React.ReactNode;
  relatedServicesElement: React.ReactNode;
  mConfig: MarketingConfig;
  beforeAfterPairs: Array<{
    id?: string;
    before_image: string;
    after_image: string;
    caption?: string;
  }>;
  displayGallery: ServiceGalleryItem[];
  seoHeadings: {
    transformations?: string;
    caseGallery?: string;
    reviews?: string;
    [key: string]: any;
  };
  openAppointmentModal: (preselectedTreatment?: string) => void;
  getServiceHeroImage?: (slug: string) => string;
  setCurrentPage?: (page: string) => void;
}

export const WisdomToothSurgeryView: React.FC<WisdomToothSurgeryViewProps> = ({
  heroElement,
  videoElement,
  testimonialsElement,
  faqElement,
  bottomCtaElement,
  relatedServicesElement,
  mConfig,
  beforeAfterPairs,
  displayGallery,
  seoHeadings,
  openAppointmentModal,
  getServiceHeroImage: getServiceHeroImageFromProps,
  setCurrentPage
}) => {
  const handleNavigateToService = (targetSlug: string) => {
    window.location.hash = `#services/${targetSlug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [customLightboxIndex, setCustomLightboxIndex] = useState<number | null>(null);

  const faqData = [
    {
      q: "Does wisdom tooth extraction hurt during the procedure?",
      a: "With modern local anesthesia block techniques, the surgery itself is comfortable and pain-free. You will only feel some pressure, but no sharp sensations."
    },
    {
      q: "How long does a wisdom tooth removal take?",
      a: "An uncomplicated removal usually takes 15 to 30 minutes, while complex impacted teeth can take 45 to 60 minutes."
    },
    {
      q: "When can I resume normal eating after wisdom tooth surgery?",
      a: "You should eat soft, cool foods on the day of surgery. Avoid hot, spicy, or crunchy foods for the first 3 to 5 days, and do not use a straw to prevent dry socket."
    },
    {
      q: "What is a dry socket and how can I prevent it?",
      a: "A dry socket occurs when the blood clot in the extraction site is dislodged, exposing the underlying bone. To prevent it, do not spit, rinse vigorously, smoke, or use a straw for 48 hours."
    },
    {
      q: "Is it normal to have swelling and bruising after the surgery?",
      a: "Yes, mild swelling and occasional light bruising are a normal part of the body's natural healing response, peaking around Day 2 to Day 3 before subsiding."
    },
    {
      q: "When can I return to work or exercise?",
      a: "Most patients return to school or light desk work within 1 to 2 days. However, avoid heavy physical exercise or weight lifting for at least 3 to 5 days to prevent bleeding."
    },
    {
      q: "How are the sutures (stitches) managed?",
      a: "We typically use high-grade dissolvable sutures that disintegrate on their own within 7 to 14 days, or non-resorbable sutures that we painlessly remove at your follow-up visit."
    }
  ];

  const whatsappNum = '919510397046';
  const whatsappText = "Hello, I want to book an appointment for Wisdom Tooth consultation.";
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(whatsappText)}`;

  const getServiceHeroImage = (targetSlug: string) => {
    if (getServiceHeroImageFromProps) {
      const img = getServiceHeroImageFromProps(targetSlug);
      if (img && img.trim() !== '') {
        return img;
      }
    }

    try {
      const stored = localStorage.getItem('hospital_services');
      if (stored) {
        const services = JSON.parse(stored);
        if (Array.isArray(services)) {
          const fromLoaded = services.find((s: any) => 
            s.slug === targetSlug ||
            (targetSlug === 'root-canal-treatment' && s.slug === 'root-canal') ||
            (targetSlug === 'root-canal' && s.slug === 'root-canal-treatment')
          );
          if (fromLoaded?.hero_image && fromLoaded.hero_image.trim() !== '') {
            return fromLoaded.hero_image;
          }
        }
      }
    } catch (e) {
      console.warn('Failed to parse hospital_services in WisdomToothSurgeryView:', e);
    }

    const fromDefault = DEFAULT_SERVICES.find(s => 
      s.slug === targetSlug ||
      (targetSlug === 'root-canal-treatment' && s.slug === 'root-canal') ||
      (targetSlug === 'root-canal' && s.slug === 'root-canal-treatment')
    );
    if (fromDefault?.hero_image && fromDefault.hero_image.trim() !== '') {
      return fromDefault.hero_image;
    }

    const treatmentId = 
      targetSlug === 'full-mouth-rehabilitation' ? 'fullmouth' : 
      targetSlug === 'crowns-bridges' ? 'crowns' : 
      targetSlug === 'smile-makeover' ? 'smile' : 
      targetSlug === 'braces-treatment' || targetSlug === 'braces' ? 'braces' : 
      targetSlug === 'dental-implants' || targetSlug === 'implants' ? 'implants' : 
      targetSlug === 'invisible-aligners' ? 'aligners' : 
      targetSlug === 'pediatric-dentistry' ? 'kids' : 
      targetSlug === 'wisdom-tooth-surgery' ? 'wisdom' : 
      targetSlug === 'tooth-coloured-filling' ? 'filling' : 
      targetSlug === 'root-canal-treatment' || targetSlug === 'root-canal' || targetSlug === 'rct' ? 'rct' : 
      targetSlug;
    const fromTreatment = TREATMENTS.find(t => t.id === treatmentId);
    if (fromTreatment?.image && fromTreatment.image.trim() !== '') {
      return fromTreatment.image;
    }

    if (targetSlug === 'dental-implants' || targetSlug === 'implants') {
      return 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800';
    } else if (targetSlug === 'root-canal-treatment' || targetSlug === 'root-canal' || targetSlug === 'rct') {
      return 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800';
    } else if (targetSlug === 'braces-treatment' || targetSlug === 'braces') {
      return 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=800';
    }

    return '';
  };

  return (
    <div className="space-y-8 sm:space-y-16 lg:space-y-20">
      {/* SECTION 1: Hero */}
      <div id="service-hero-section">
        {heroElement}
      </div>

      {/* SECTION 2: Symptom Qualification */}
      <section id="wisdom-symptom-qualification" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-20">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            Symptom Qualification
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Your wisdom tooth probably needs removing if:
          </h2>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-8 max-w-7xl mx-auto pt-8">
          {/* Card 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
            {/* Left accent line */}
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Jaw Pain or Pressure
            </h3>
            <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
              Pain or pressure at the very back of the jaw
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
            {/* Left accent line */}
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Recurrent Gum Swelling
            </h3>
            <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
              Swelling of the gum flap over a partly erupted tooth, which comes and goes
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
            {/* Left accent line */}
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Limited Jaw Opening
            </h3>
            <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
              Difficulty opening your mouth fully
            </p>
          </div>

          {/* Card 4 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
            {/* Left accent line */}
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Unpleasant Odor or Taste
            </h3>
            <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
              Bad taste or smell from the back of the mouth
            </p>
          </div>

          {/* Card 5 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
            {/* Left accent line */}
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Chronic Food Trap
            </h3>
            <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
              Food trapping behind the last molar that you cannot clean
            </p>
          </div>

          {/* Card 6 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
            {/* Left accent line */}
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Referred Face or Ear Pain
            </h3>
            <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
              Pain that radiates to the ear or jaw on one side
            </p>
          </div>

          {/* Card 7 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2 md:col-start-2">
            {/* Left accent line */}
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Adjacent Tooth Decay
            </h3>
            <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
              Your dentist has seen decay in the tooth in front of the wisdom tooth — a very common and often overlooked reason for removal
            </p>
          </div>
        </div>

        {/* Urgent Warning element */}
        <div className="max-w-4xl mx-auto mt-8 relative bg-rose-50 border border-rose-100/70 rounded-[20px] p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-sm">
          <div className="p-2 bg-rose-100 rounded-xl text-rose-600 shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-black uppercase text-rose-700 tracking-wider">Urgent Clinical Notice</span>
            <p className="text-rose-950 text-sm sm:text-base font-bold leading-relaxed">
              See us urgently if you have: facial swelling, fever, or difficulty swallowing.
            </p>
          </div>
        </div>
      </section>

      {/* Surgical Team Section */}
      <SurgicalTeamSection setCurrentPage={setCurrentPage} />

      {/* SECTION 3: Comparison */}
      <section id="wisdom-option-comparison-section" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-20">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            <Scale className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            Decision Guide
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Do I have to remove it?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
            Not all wisdom teeth require extraction. Here is our conservative, medically honest decision framework.
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="max-w-4xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[540px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/2">
                    Clinical Situation
                  </th>
                  <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/2">
                    Medical Recommendation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Fully erupted, cleanable, no symptoms
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-semibold">
                    Usually keep it. Monitor at check-ups
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Partly erupted, repeated gum infections
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-semibold bg-teal-50/20">
                    Remove. Infections will keep recurring
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Impacted, causing decay in the tooth in front
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-semibold bg-teal-50/20">
                    Remove. Otherwise you lose two teeth instead of one
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Impacted, no symptoms, sitting close to the nerve
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-semibold">
                    Discuss. Risk of removal may exceed risk of leaving it
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Cyst or bone changes visible on X-ray
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-semibold bg-teal-50/20">
                    Remove
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-[#081C3A] font-black font-sans max-w-xl">
              "We do not remove wisdom teeth that don’t need removing. Bring your OPG for a free opinion."
            </p>
            <button
              onClick={() => openAppointmentModal('Wisdom Tooth Free Opinion')}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
            >
              <Calendar className="h-4 w-4 shrink-0" />
              <span>Request Appointment</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 7: Treatment-Matched Proof in specified order */}
      {/* 1. Before & After */}
      {mConfig.show_before_after !== false && beforeAfterPairs.length > 0 && (
        <div className="space-y-6 sm:space-y-10 pt-4 sm:pt-10 border-t border-slate-200/60" id="before-after-gallery-section">
          <div className="space-y-3 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
              <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              Transformations
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              {seoHeadings.transformations || 'Wisdom Tooth Transformations'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-medium font-sans">
              {mConfig.before_after_description || 'See real smile transformations of our patients.'}
            </p>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-stretch max-w-7xl mx-auto">
            {beforeAfterPairs.map((pair, pIdx) => (
              <div 
                key={pair.id || pIdx} 
                className="bg-white border border-[#E5EEF5] rounded-[20px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_12px_24px_rgba(8,28,58,0.08)] hover:border-[#B9D1E6] transition-all duration-300 flex flex-col h-full justify-between"
              >
                <BeforeAfterSlider
                  beforeImage={pair.before_image}
                  afterImage={pair.after_image}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Clinical Case Gallery */}
      {mConfig.show_gallery !== false && (
        <div className="space-y-6 sm:space-y-8 pt-4 sm:pt-10 border-t border-slate-200/60" id="wisdom-clinical-case-gallery">
          {/* Header Title Section */}
          <div className="space-y-3 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
              <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              Clinical Cases
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              {seoHeadings.caseGallery || 'Clinical Case Gallery'}
            </h2>
            {mConfig.gallery_description && (
              <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-medium">
                {mConfig.gallery_description}
              </p>
            )}
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
          </div>

          {/* Direct, clean layout displaying the images close together with a minimal gap */}
          {(() => {
            const galleryItems = (Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery)
              .filter(item => item && item.image_url && item.image_url.trim() !== '');

            if (galleryItems.length === 0) return null;

            return (
              <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 justify-center items-center">
                  {galleryItems.map((item, idx) => (
                    <div 
                      key={item.id || idx}
                      className="relative rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center bg-white group cursor-zoom-in transition-all duration-300 p-2"
                      onClick={() => setCustomLightboxIndex(idx)}
                    >
                      <img
                        src={item.image_url}
                        alt={item.caption || item.title || `Clinical View ${idx + 1}`}
                        className="max-h-[220px] sm:max-h-[260px] md:max-h-[300px] w-auto max-w-full object-contain mx-auto rounded-lg select-none transition-transform duration-300 group-hover:scale-[1.015]"
                        referrerPolicy="no-referrer"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCustomLightboxIndex(idx);
                        }}
                        className="absolute top-4 right-4 bg-white/90 hover:bg-[#0D9488] text-slate-700 hover:text-white p-2 rounded-full border border-slate-200/80 shadow-xs transition-all opacity-0 group-hover:opacity-100"
                        title="Expand Image"
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Premium Lightbox Overlay for clinical gallery zoom */}
      <AnimatePresence>
        {customLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setCustomLightboxIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setCustomLightboxIndex(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 p-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0D9488] z-50"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Main Image Container */}
            <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center">
              {(() => {
                const galleryItems = (Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery)
                  .filter(item => item && item.image_url && item.image_url.trim() !== '');
                const currentItem = galleryItems[customLightboxIndex];
                if (!currentItem) return null;

                return (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="relative max-h-[85vh] max-w-full flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={currentItem.image_url}
                      alt={currentItem.caption || currentItem.title || "Clinical view"}
                      className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {testimonialsElement}

      {/* 5. Google Patient Review */}
      {mConfig.show_google_reviews !== false && (
        <GooglePatientReviews
          heading={seoHeadings.reviews || 'Google Patient Reviews'}
          reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
        />
      )}

      {/* SECTION 4: Transparent Pricing */}
      <section id="wisdom-transparent-pricing" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-20">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            Transparent Pricing
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Starting from
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
            We provide clear, upfront cost guidelines. Pricing variations depend strictly on cases' unique clinical complexities.
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="max-w-4xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[540px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/2">
                    Treatment Category
                  </th>
                  <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/2">
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Simple wisdom tooth extraction
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/10 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Surgical extraction (impacted)
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/10 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Complex impaction / piezo-assisted
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/10 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    All four, single sitting
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/10 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Under general anaesthesia
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/10 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    OPG X-ray
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/10 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl font-sans">
              No hidden clinical overheads. All details, from OPG requirements to customized multi-molar packages, will be clearly explained in writing.
            </p>
            <button
              onClick={() => openAppointmentModal('Wisdom Tooth Cost Enquiry')}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
            >
              <Calendar className="h-4 w-4 shrink-0" />
              <span>Request Personal Quote</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: Recovery Timeline */}
      <section id="wisdom-timeline-section" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-20">
        <div className="space-y-6 sm:space-y-10">
          <div className="space-y-3 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 mx-auto">
              <Timer className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              RECOVERY PROCESS
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              What the next week looks like
            </h2>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
          </div>

          {/* 6 horizontal/grid numbered timeline steps styled as proper cards matching the established system */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
            {/* Step 1 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <div className="w-[44px] h-[44px] rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] font-bold text-lg mb-5 border border-teal-100/60 shrink-0">
                1
              </div>
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                DAY OF SURGERY
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                Procedure time varies with the complexity of the case. Bite on gauze for an hour. Soft, cool food. Do not spit, rinse or use a straw. Ice pack, 15 minutes on/off.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <div className="w-[44px] h-[44px] rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] font-bold text-lg mb-5 border border-teal-100/60 shrink-0">
                2
              </div>
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                DAY 1
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                Swelling peaks. Most desk-job patients return to work. Continue soft food.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <div className="w-[44px] h-[44px] rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] font-bold text-lg mb-5 border border-teal-100/60 shrink-0">
                3
              </div>
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                DAY 2–3
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                Swelling begins to settle. Start warm salt-water rinses.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <div className="w-[44px] h-[44px] rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] font-bold text-lg mb-5 border border-teal-100/60 shrink-0">
                4
              </div>
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                DAY 4–7
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                Near normal. Most patients are eating normally by now.
              </p>
            </div>

            {/* Step 5 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <div className="w-[44px] h-[44px] rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] font-bold text-lg mb-5 border border-teal-100/60 shrink-0">
                5
              </div>
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                STITCHES
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                Stitches removed — or dissolve on their own.
              </p>
            </div>

            {/* Step 6 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <div className="w-[44px] h-[44px] rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] font-bold text-lg mb-5 border border-teal-100/60 shrink-0">
                6
              </div>
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                WEEK 2
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                Fully healed in the majority of cases.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-3.5 shadow-sm">
              <Info className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-600 font-medium font-sans">
                Recovery varies with the difficulty of the impaction. Deeply impacted lower wisdom teeth take longer than upper ones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Risk Reversal & Honest Risk Disclosure */}
      <section id="wisdom-risk-reassurance-section" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-20 pt-4 sm:pt-10 border-t border-slate-200/60">
        <div className="space-y-6 sm:space-y-10">
          <div className="space-y-3 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 mx-auto">
              <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              SURGICAL SAFETY
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              What we do to protect the nerve
            </h2>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
            {/* Card 1 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                Diagnostic Mapping
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                Every case is assessed on OPG and CBCT where the roots sit close to the nerve canal.
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                Piezoelectric Technology
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                Where the tooth is close to the inferior alveolar nerve, we use a piezoelectric device, which cuts bone without cutting nerve tissue.
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                Individualized Assessment
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                Dr. Patel will tell you before surgery whether your specific case carries elevated risk — based on your X-ray, not on averages.
              </p>
            </div>
          </div>

          {/* Honest Risk Statement Block */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50/80 border border-amber-100/60 rounded-[18px] p-5 sm:p-6 flex items-start gap-3.5 shadow-sm">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-black uppercase text-amber-700 tracking-wider">Clinical Honesty Statement</span>
                <p className="text-amber-900 text-sm sm:text-base font-bold leading-relaxed">
                  Temporary numbness of the lip or tongue occurs in a small proportion of lower wisdom tooth removals. Permanent numbness is rare.
                </p>
              </div>
            </div>
          </div>

          {/* Included Post-Op Support */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-start gap-3">
                <div className="p-1.5 bg-teal-50 rounded-lg text-[#0D9488] shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-sans font-bold text-xs sm:text-sm text-[#081C3A]">Post-operative review</h5>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium">Post-operative review as advised by the surgeon</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-start gap-3">
                <div className="p-1.5 bg-teal-50 rounded-lg text-[#0D9488] shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-sans font-bold text-xs sm:text-sm text-[#081C3A]">After-hours contact if you have concerns</h5>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium">After-hours contact available if you have concerns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Procedure Video */}
      {videoElement}

      {/* ================================================== */}
      {/* SECTION 8: Why This Clinic / Surgeon */}
      {/* ================================================== */}
      <section id="wisdom-why-clinic" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-20 pt-4 sm:pt-10 border-t border-slate-200/60">
        <div className="space-y-6 sm:space-y-10">
          <div className="space-y-3 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 mx-auto">
              <Award className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              WHY CHOOSE PATEL DENTAL
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              Expert Wisdom Tooth Care, Planned For Your Safety
            </h2>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
            {/* Card 1 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                Maxillofacial Surgical Capability
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                Your procedure is planned and performed under the care of a specialist maxillofacial surgeon, ensuring advanced training for surgical extractions.
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                Surgeon-Led Treatment
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                Every step, from diagnostic mapping to surgical removal and post-operative review, is led entirely by our experienced surgery team.
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                Nerve-Risk Assessment
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                We perform individual nerve-risk mapping using advanced diagnostic imaging before any surgery to safeguard vital structures.
              </p>
            </div>

            {/* Card 4 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                Piezoelectric Surgical Capability
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                We use soft-tissue sparing piezoelectric technology when teeth are close to delicate nerve channels, preserving adjacent tissues.
              </p>
            </div>

            {/* Card 5 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                Written Cost Prior to Treatment
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                You receive a fully transparent, itemized written cost proposal prior to your procedure with zero hidden fees.
              </p>
            </div>

            {/* Card 6 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                Second-Opinion Reassurance
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                We never push for unnecessary extractions. If your wisdom teeth are erupted, healthy, and cleanable, we recommend monitoring rather than surgery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 9: Technology — Patient Benefit */}
      {/* ================================================== */}
      <section id="wisdom-tech-benefit" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-20 pt-4 sm:pt-10 border-t border-slate-200/60">
        <div className="space-y-6 sm:space-y-10">
          <div className="space-y-3 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 mx-auto">
              <Cpu className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              CLINICAL TECHNOLOGY
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              Modern Tech for a Safer, More Comfortable Experience
            </h2>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
            {/* Tech Card 1 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                Piezoelectric Surgical Unit
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                Utilizes high-frequency ultrasonic vibrations to cleanly and selectively dissect bone tissue without affecting adjacent soft nerves, vessels, or membranes.
              </p>
            </div>

            {/* Tech Card 2 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                OPG / Panoramic X-Ray
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                Provides a comprehensive, ultra-clear panoramic scan of your upper and lower jaws, tracking nerve proximity and root curvature for safe clinical execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 10: FAQ + FAQPage Schema */}
      {/* ================================================== */}
      <section id="wisdom-faq-section" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-20 pt-4 sm:pt-10 border-t border-slate-200/60">
        <div className="space-y-6 sm:space-y-10" id="wisdom-faq-list">
          {/* Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="flex justify-center">
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60">
                WISDOM TOOTH FAQ
              </span>
            </div>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight">
              Frequently Asked Questions About Wisdom Tooth Surgery
            </h2>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
          </div>

          {/* Accordion List */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {faqData.map((faq, index) => {
              const isExpanded = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className={`rounded-[18px] sm:rounded-[20px] transition-all duration-200 border ${
                    isExpanded 
                      ? 'border-[#0D9488] bg-white shadow-xs' 
                      : 'border-slate-200/80 hover:border-slate-300 bg-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isExpanded ? null : index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className={`text-base sm:text-lg font-bold tracking-tight leading-snug transition-colors ${
                      isExpanded ? 'text-[#0D9488]' : 'text-[#081C3A]'
                    }`}>
                      {faq.q}
                    </span>
                    <span className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isExpanded ? 'bg-teal-50 text-[#0D9488]' : 'bg-slate-50 text-slate-400'
                    }`}>
                      {isExpanded ? (
                        <ChevronUp className="h-4.5 w-4.5" />
                      ) : (
                        <ChevronDown className="h-4.5 w-4.5" />
                      )}
                    </span>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-slate-100 text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed whitespace-pre-wrap">
                          <div className="pt-4">
                            {faq.a}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* JSON-LD FAQPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map((item) => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
              }
            }))
          })}
        </script>
      </section>

      {/* ================================================== */}
      {/* SECTION 11: Closing CTA */}
      {/* ================================================== */}
      <section id="wisdom-closing-cta" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-20 pt-4 sm:pt-10">
        <div className="bg-[#081C3A] text-white border border-[#1E293B] rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 md:p-16 relative overflow-hidden text-center space-y-6 shadow-xl">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#0D9488]/10 blur-[80px] pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D9488]/20 border border-[#0D9488]/40 text-[#2DD4BF] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="h-3.5 w-3.5 text-[#2DD4BF] shrink-0" />
              EMERGENCY APPOINTMENT AVAILABLE
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.1] max-w-2xl mx-auto">
              Wisdom tooth hurting today?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium font-sans">
              Don't wait in pain. We reserve emergency slots daily for immediate examinations and wisdom tooth relief.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 relative z-10 pt-4">
            <a
              href="tel:+919510397046"
              className="w-full sm:w-auto px-8 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group text-decoration-none"
            >
              <Phone className="h-4.5 w-4.5 group-hover:rotate-12 transition-transform" />
              <span>Call now — same-day appointment</span>
              <ArrowRight className="h-4 w-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              onClick={() => openAppointmentModal('Wisdom Tooth Closing CTA')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="h-4.5 w-4.5" />
              <span>Book Consultation</span>
            </button>
          </div>

          <div className="pt-2">
            <p className="text-xs text-slate-400 font-medium">
              Or call us directly at <a href="tel:+919510397046" className="text-white hover:text-[#2DD4BF] underline transition-colors font-bold">+91 9510397046</a> for immediate priority assistance.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 12: Related Treatments */}
      {/* ================================================== */}
      <section id="wisdom-related-treatments" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-20 pt-4 sm:pt-10 pb-12">
        <div className="space-y-8 sm:space-y-10" id="cms-section-related-services">
          {/* Centered Badge, Heading & Teal Underline */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="flex justify-center">
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60">
                RELATED TREATMENTS
              </span>
            </div>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight">
              Related Treatments
            </h2>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
          </div>

          {/* 3 Equal Treatment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto items-stretch">
            {/* Card 1: Single Sitting Root Canal */}
            <div
              onClick={() => handleNavigateToService('root-canal-treatment')}
              className="bg-white border border-slate-200/80 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_16px_36px_rgba(8,28,58,0.1)] hover:border-[#14B8A6]/50 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
            >
              <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                <img 
                  src={getServiceHeroImage('root-canal-treatment')} 
                  alt="Single Sitting Root Canal"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3 className="font-sans font-bold text-lg sm:text-xl text-[#081C3A] group-hover:text-[#0D9488] transition-colors leading-snug tracking-tight">
                    Single Sitting Root Canal
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    Unbearable tooth pain? Get instant relief with single-sitting root canal therapy completed in just one comfortable session.
                  </p>
                </div>
                <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                  <span>Learn Details</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </div>
              </div>
            </div>

            {/* Card 2: Braces Treatment */}
            <div
              onClick={() => handleNavigateToService('braces-treatment')}
              className="bg-white border border-slate-200/80 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_16px_36px_rgba(8,28,58,0.1)] hover:border-[#14B8A6]/50 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
            >
              <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                <img 
                  src={getServiceHeroImage('braces-treatment')} 
                  alt="Braces Treatment"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3 className="font-sans font-bold text-lg sm:text-xl text-[#081C3A] group-hover:text-[#0D9488] transition-colors leading-snug tracking-tight">
                    Braces Treatment
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    Classic orthodontic corrections using durable ceramic or metal bracket systems to align teeth and correct bite issues.
                  </p>
                </div>
                <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                  <span>Learn Details</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </div>
              </div>
            </div>

            {/* Card 3: Dental Implants */}
            <div
              onClick={() => handleNavigateToService('dental-implants')}
              className="bg-white border border-slate-200/80 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_16px_36px_rgba(8,28,58,0.1)] hover:border-[#14B8A6]/50 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
            >
              <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                <img 
                  src={getServiceHeroImage('dental-implants')} 
                  alt="Dental Implants"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3 className="font-sans font-bold text-lg sm:text-xl text-[#081C3A] group-hover:text-[#0D9488] transition-colors leading-snug tracking-tight">
                    Dental Implants
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    Permanent tooth replacement utilizing premium titanium root implants for secure, stable, and natural-looking fixed teeth in one week.
                  </p>
                </div>
                <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                  <span>Learn Details</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
