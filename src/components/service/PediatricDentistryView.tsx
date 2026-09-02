/**
 * @license
 * Copyright © 2026 Patel Dental Hospital (રાજકોટ / Rajkot).
 * All Rights Reserved.
 */

import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Heart, 
  Smile, 
  Calendar, 
  MessageCircle, 
  ArrowRight, 
  X, 
  Check, 
  Clock, 
  ShieldCheck, 
  ToyBrick, 
  Baby, 
  Sparkle,
  Paintbrush,
  Stethoscope,
  Info,
  Activity,
  AlertCircle,
  Cpu
} from 'lucide-react';
import { motion } from 'motion/react';
import { ServiceGalleryItem, ContactInfo, MarketingConfig } from '../../types';
import { BeforeAfterSlider } from '../BeforeAfterSlider';
import { ClinicalCaseGallery } from '../ClinicalCaseGallery';
import { GooglePatientReviews } from '../GooglePatientReviews';

export interface PediatricDentistryViewProps {
  heroElement?: React.ReactNode;
  featuredVideoElement?: React.ReactNode;
  videoElement?: React.ReactNode;
  testimonialsElement?: React.ReactNode;
  faqElement?: React.ReactNode;
  bottomCtaElement?: React.ReactNode;
  relatedServicesElement?: React.ReactNode;
  mConfig: MarketingConfig;
  contactInfo: ContactInfo;
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
}

export const PediatricDentistryView: React.FC<PediatricDentistryViewProps> = ({
  heroElement,
  featuredVideoElement,
  videoElement,
  testimonialsElement,
  faqElement,
  bottomCtaElement,
  relatedServicesElement,
  mConfig,
  contactInfo,
  beforeAfterPairs,
  displayGallery,
  seoHeadings,
  openAppointmentModal
}) => {
  const whatsappNum = '919510397046';

  const heroCtaText = "Book your child's first visit — free";
  const heroWhatsAppText = "Hello, I want to book a dental check-up for my child. My child's age is:";
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(heroWhatsAppText)}`;

  return (
    <div className="space-y-8 sm:space-y-16 lg:space-y-20 pb-12">
      
      {/* SECTION 1: HERO */}
      {heroElement}


      {/* SECTION 2: PARENT BELIEF (MYTH VS REALITY) */}
      <section className="space-y-6 sm:space-y-10 border-t border-slate-200/60 pt-6 sm:pt-14" id="pediatric-parent-belief">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full border border-teal-100/50">
            <Heart className="h-3.5 w-3.5 text-[#0D9488]" />
            Parent Belief
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            "It's Only a Milk Tooth — It Will Fall Out Anyway."
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-semibold max-w-2xl mx-auto text-center">
            Why overlooking primary teeth can permanently damage your child’s permanent smile and health.
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-8 max-w-7xl mx-auto pt-8">
          
          {/* Card 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Early Care Matters
            </h3>
            <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
              Treating a milk tooth is not wasted money. Milk teeth help maintain the space needed for permanent teeth, and losing them too early can affect how the adult tooth develops and erupts.
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Space & Alignment
            </h3>
            <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
              Milk teeth hold critical space for the adult teeth underneath. Losing a milk tooth early can cause the adult tooth underneath to erupt crooked.
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Protect Developing Teeth
            </h3>
            <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
              Decay in a milk tooth can travel deep and infect the developing permanent adult tooth sitting in the bone beneath it.
            </p>
          </div>

          {/* Card 4 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2 md:col-start-2">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Long-Term Pain Risk
            </h3>
            <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
              The last milk teeth do not fall out until age 11–12. A cavity at age 6 can mean years of pain and infection risk for your child.
            </p>
          </div>

          {/* Card 5 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Daily School & Sleep
            </h3>
            <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
              Dental pain is a key contributor to school absence. A child in discomfort may chew on one side, eat less, and sleep badly.
            </p>
          </div>

        </div>
      </section>


      {/* SECTION 3: WHEN TO BRING YOUR CHILD */}
      <section className="space-y-6 sm:space-y-10 border-t border-slate-200/60 pt-6 sm:pt-14" id="pediatric-when-to-bring">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full border border-teal-100/50">
            <Clock className="h-3.5 w-3.5 text-[#0D9488]" />
            Timing Your Visit
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight">
            When to Bring Your Child
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-bold max-w-2xl mx-auto leading-relaxed">
            First visit: by their first birthday, or within 6 months of the first tooth appearing.
          </p>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold max-w-xl mx-auto">
            Earlier than most parents expect — the goal of the first visit is familiarity, not treatment.
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pt-8">
          
          {/* Point 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              White or Brown Spots
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              White or brown spots on any tooth
            </p>
          </div>

          {/* Point 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Pain / Chewing Change
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              Complaints of pain, or avoiding chewing on one side
            </p>
          </div>

          {/* Point 3 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Oral Habits
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              Thumb sucking, tongue thrusting, nail biting or a prolonged pacifier habit past age [__]
            </p>
          </div>

          {/* Point 4 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Shark Teeth
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              Adult teeth coming in behind the milk teeth (“shark teeth”)
            </p>
          </div>

          {/* Point 5 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Dental Emergency
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              Any knocked-out, chipped or displaced tooth — this is an emergency; call immediately
            </p>
          </div>

          {/* Point 6 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Orthodontic Assessment
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              First orthodontic assessment at age 8–9, even if no treatment is needed yet
            </p>
          </div>

        </div>
      </section>


      {/* SECTION 4: FIRST VISIT */}
      <section className="space-y-6 sm:space-y-10 border-t border-slate-200/60 pt-6 sm:pt-14" id="pediatric-first-visit">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full border border-teal-100/50">
            <ToyBrick className="h-3.5 w-3.5 text-[#0D9488]" />
            First Visit
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Your child’s first visit — no treatment, no pressure
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-semibold max-w-2xl mx-auto text-center">
            You stay with your child throughout.
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto pt-8">
          
          {/* Step 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <span className="px-2.5 py-1 bg-teal-50 text-[#0D9488] text-[10px] sm:text-[11px] font-black uppercase tracking-widest rounded-full border border-teal-100/50 self-start mb-2 sm:mb-4">
              Minutes 1–5
            </span>
            <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
              Your child explores the room, sits in the chair, plays with our dental toys. Nothing goes in their mouth.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <span className="px-2.5 py-1 bg-teal-50 text-[#0D9488] text-[10px] sm:text-[11px] font-black uppercase tracking-widest rounded-full border border-teal-100/50 self-start mb-2 sm:mb-4">
              Minutes 5–10
            </span>
            <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
              We count their teeth — as a game. Most children enjoy this.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <span className="px-2.5 py-1 bg-teal-50 text-[#0D9488] text-[10px] sm:text-[11px] font-black uppercase tracking-widest rounded-full border border-teal-100/50 self-start mb-2 sm:mb-4">
              Minutes 10–15
            </span>
            <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
              A gentle look for any problems. If your child says stop, we stop.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <span className="px-2.5 py-1 bg-teal-50 text-[#0D9488] text-[10px] sm:text-[11px] font-black uppercase tracking-widest rounded-full border border-teal-100/50 self-start mb-2 sm:mb-4">
              Minutes 15–20
            </span>
            <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
              Drawing and colouring while we explain what we found to you, and show your child how to brush.
            </p>
          </div>

        </div>

        {/* Reassurance Panel */}
        <div className="max-w-4xl mx-auto bg-teal-50/40 border border-teal-100/50 rounded-[22px] p-6 sm:p-8 text-center space-y-3.5 mt-8">
          <p className="text-slate-800 text-[14px] sm:text-[16px] leading-relaxed font-semibold">
            If your child is frightened, we don’t force anything. We may see them two or three times just to build familiarity before attempting treatment. That is normal and it is not a failure.
          </p>
        </div>
      </section>


      {/* SECTION 5: SERVICES & PRICING */}
      <section className="space-y-6 sm:space-y-10 border-t border-slate-200/60 pt-6 sm:pt-14" id="pediatric-services-pricing">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full border border-teal-100/60">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            Services & Pricing
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Complete Pediatric Services & Fees
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
            Transparent pricing for our specialized dental treatments, delivered with world-class pediatric skill.
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        {/* The list of 10 Pediatric Services & Pricing Cards */}
        <div className="max-w-4xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[540px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    Treatment
                  </th>
                  <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    Starting Price
                  </th>
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                
                {/* 1 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    First visit & check-up
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    Free
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-medium">
                    Infants, toddlers & first-time visits
                  </td>
                </tr>

                {/* 2 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Cleaning & fluoride application
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-medium">
                    Bi-annual cavity prevention
                  </td>
                </tr>

                {/* 3 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Dental sealants — per tooth
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-medium">
                    Newly erupted permanent molars
                  </td>
                </tr>

                {/* 4 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Filling — milk tooth
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-medium">
                    Mild to moderate dental decay
                  </td>
                </tr>

                {/* 5 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Pulpectomy + stainless steel crown
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-medium">
                    Deep decay or infected primary teeth
                  </td>
                </tr>

                {/* 6 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Habit-breaking appliance
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-medium">
                    Correcting thumb sucking or tongue thrusting
                  </td>
                </tr>

                {/* 7 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Space maintainer
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-medium">
                    Preventing shifting when teeth are lost early
                  </td>
                </tr>

                {/* 8 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Early orthodontic assessment
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    Free
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-medium">
                    Jaw development & bite alignment evaluation (Ages 8-9)
                  </td>
                </tr>

                {/* 9 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Treatment under general anaesthesia
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-medium">
                    Extremely anxious or special needs pediatric care
                  </td>
                </tr>

                {/* 10 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Emergency — knocked out / broken tooth
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-medium">
                    Urgent trauma care for playground and fall injuries
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center text-xs text-slate-500 font-medium">
          * First visit & check-up and Early orthodontic assessment are free as part of our commitment to early childhood dental wellness. For specific questions, please contact our hospital desk.
        </div>
      </section>


      {/* SECTION 6: SPECIAL NEEDS & GENERAL ANAESTHESIA */}
      <section className="space-y-6 sm:space-y-10 border-t border-slate-200/60 pt-6 sm:pt-14" id="pediatric-special-needs">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full border border-teal-100/50">
            <Baby className="h-3.5 w-3.5 text-[#0D9488]" />
            Special Needs & Anesthesia
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Dentistry for children who cannot be treated conventionally
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
            For very young, extremely anxious, or specially-abled children, we provide complete treatment under general anaesthesia — all work completed safely in one session.
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto pt-8">
          
          {/* Card 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Very Young Children
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              Providing a secure, comfortable way to deliver critical dental care when early childhood decay is present and conventional cooperation is not yet possible.
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Extremely Anxious Children
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              Ensuring children with high dental anxiety or fear can receive thorough care without physical restraint, protecting their emotional well-being.
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Specially-Abled Children
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              Customized care environments for children with developmental, physical, or sensory challenges, prioritizing safety, efficiency, and comfort.
            </p>
          </div>

        </div>

        {/* Philosophy Panel */}
        <div className="max-w-4xl mx-auto bg-teal-50/40 border border-teal-100/50 rounded-[22px] p-6 sm:p-8 text-center space-y-3 mt-8">
          <p className="text-[#081C3A] text-[15px] sm:text-[17px] leading-relaxed font-bold">
            We’ll always attempt gentle conventional treatment first.
          </p>
          <p className="text-slate-600 text-[13px] sm:text-[15px] leading-relaxed font-semibold">
            GA is offered when it’s genuinely the kinder option, not as a shortcut.
          </p>
        </div>
      </section>


      {/* SECTION 7: PARENT GUARANTEE */}
      <section className="space-y-6 sm:space-y-10 border-t border-slate-200/60 pt-6 sm:pt-14" id="pediatric-parent-guarantee">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full border border-teal-100/50">
            <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488]" />
            Our Guarantees
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            The Parent Guarantee
          </h2>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto pt-8">
          
          {/* Point 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              First Visit Free
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              First visit free — no obligation, no treatment on day one unless it’s urgent
            </p>
          </div>

          {/* Point 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Stay With Your Child
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              You stay with your child throughout every appointment
            </p>
          </div>

          {/* Point 3 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Zero Force
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              We will never restrain or force a frightened child. If they aren’t ready, we build up over multiple visits
            </p>
          </div>

          {/* Point 4 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Watchful Care
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              We’ll tell you when something can safely be watched rather than treated
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 5: BEFORE & AFTER GALLERY */}
      {mConfig.show_before_after !== false && beforeAfterPairs.length > 0 && (
        <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="before-after-gallery-section">
          <div className="space-y-3 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
              <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              Transformations
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              {seoHeadings.transformations}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-medium font-sans">
              {mConfig.before_after_description || "See real smile transformations of our patients."}
            </p>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-start max-w-7xl mx-auto">
            {beforeAfterPairs.map((pair, pIdx) => (
              <div 
                key={pair.id || pIdx} 
                className="bg-white border border-[#E5EEF5] rounded-[20px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_12px_24px_rgba(8,28,58,0.08)] hover:border-[#B9D1E6] transition-all duration-300"
              >
                <BeforeAfterSlider
                  beforeImage={pair.before_image}
                  afterImage={pair.after_image}
                  caption={pair.caption}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: CLINICAL CASE GALLERY */}
      {mConfig.show_gallery !== false && (
        <ClinicalCaseGallery
          heading={seoHeadings.caseGallery}
          description={mConfig.gallery_description}
          items={Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery}
          singleGallery={true}
        />
      )}

      {/* SECTION 3: PROCEDURE VIDEO */}
      {videoElement}

      {/* SECTION 4: PATIENT TESTIMONIAL REELS */}
      {testimonialsElement}

      {/* SECTION 6: GOOGLE PATIENT REVIEWS */}
      {mConfig.show_google_reviews !== false && (
        <GooglePatientReviews
          heading={seoHeadings.reviews}
          reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
        />
      )}

      {/* SECTION 8: WHY PEDIATRIC CARE */}
      <section className="space-y-6 sm:space-y-10 border-t border-slate-200/60 pt-6 sm:pt-14" id="pediatric-why-choose">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full border border-teal-100/50">
            <Baby className="h-3.5 w-3.5 text-[#0D9488]" />
            Why Choose Us
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Why Parents Choose Pediatric Care at Patel Dental Hospital
          </h2>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pt-8">
          
          {/* Card 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Child-Friendly Environment
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              Features a dedicated children’s chair and a child-friendly environment with dental toys and drawing or colouring activities to help children become familiar with the dental setting.
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Never Rushes a Frightened Child
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              Our clinical team never rushes a frightened child. Dr. Kinjal Patel has a particular focus on children and anxious patients to build trust at their own comfortable pace.
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Parent Stays With the Child
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              Parents can stay with their child throughout the entire appointment, providing constant emotional support, reassurance, and full visibility.
            </p>
          </div>

          {/* Card 4 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              No Force or Restraint
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              Frightened children are never restrained or forced. If a child is not ready, familiarity is built gently over multiple visits to ensure a positive long-term attitude.
            </p>
          </div>

          {/* Card 5 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Care for Anxious & Special-Needs
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              Providing customized, high-safety care for special-needs children. General anaesthesia is available when conventional treatment is not possible and is genuinely appropriate.
            </p>
          </div>

          {/* Card 6 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[22px] tracking-tight mb-2 sm:mb-4 leading-tight">
              Gentle Treatment First
            </h3>
            <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
              We always attempt gentle conventional treatment first. General anaesthesia is offered only when it is genuinely the kinder option, never as a shortcut.
            </p>
          </div>

        </div>

        {/* Free First Visit Bar */}
        <div className="max-w-4xl mx-auto bg-teal-50/40 border border-teal-100/50 rounded-[22px] p-6 sm:p-8 text-center space-y-3 mt-8">
          <p className="text-[#081C3A] text-[15px] sm:text-[17px] leading-relaxed font-bold">
            First visit is free, removing the parent's initial financial risk.
          </p>
        </div>
      </section>

      {/* SECTION 9: TECHNOLOGY & PATIENT BENEFIT */}
      <section className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="pediatric-technology-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full border border-teal-100/50">
            <Cpu className="h-3.5 w-3.5 text-[#0D9488]" />
            Pediatric Technology
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Appropriate Diagnostic & Care Technology
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
            Using low-impact, specialized tools and processes designed purely around child comfort and gentle clinical assessment.
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch pt-6">
          
          {/* Technology 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0 w-max p-2.5">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              Dedicated Pediatric Dental Chair
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
              Our custom-designed children's dental chair turns treatments into a comfortable game, keeping children relaxed and happily accommodated throughout.
            </p>
          </div>

          {/* Technology 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0 w-max p-2.5">
              <ToyBrick className="h-5 w-5" />
            </div>
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              Child-Focused Dental Activities
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
              Incorporating interactive toys, and creative colouring or drawing materials to safely distract and familiarize children with the clinical environment.
            </p>
          </div>

        </div>
      </section>

      {/* Section 11: FAQ Accordion */}
      {faqElement}

      {/* Section 12: Bottom CTA */}
      {bottomCtaElement}

      {/* Section 13: Related Services (FINAL CONTENT SECTION, immediately ABOVE Footer) */}
      {relatedServicesElement}

    </div>
  );
};
