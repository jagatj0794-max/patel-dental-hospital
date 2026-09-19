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
import { SurgicalTeamSection } from './SurgicalTeamSection';

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
  setCurrentPage?: (page: string) => void;
  language?: 'en' | 'gu';
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
  openAppointmentModal,
  setCurrentPage,
  language
}) => {
  const whatsappNum = '919510397046';

  const heroCtaText = language === 'gu' ? "તમારા બાળકની પ્રથમ મુલાકાત બુક કરો — મફત" : "Book your child's first visit — free";
  const heroWhatsAppText = language === 'gu'
    ? "નમસ્તે, હું મારા બાળક માટે ડેન્ટલ ચેક-અપ બુક કરવા માંગુ છું. મારા બાળકની ઉંમર છે:"
    : "Hello, I want to book a dental check-up for my child. My child's age is:";
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(heroWhatsAppText)}`;

  return (
    <div className="space-y-8 sm:space-y-16 lg:space-y-20 pb-12">
      
      {/* SECTION 1: HERO */}
      {heroElement}


      {/* SECTION 2: PARENT BELIEF (MYTH VS REALITY) */}
      <section className="space-y-6 sm:space-y-10 border-t border-slate-200/60 pt-6 sm:pt-14" id="pediatric-parent-belief">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Heart className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "માતા-પિતાનો સ્વીકાર" : "Parent Belief"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "“તે તો માત્ર દૂધનો દાંત છે — તે આખરે પડી જ જવાનો છે.”" : "\"It's Only a Milk Tooth — It Will Fall Out Anyway.\""}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-500 font-semibold'}`}>
            {language === 'gu'
              ? "દૂધના દાંતને અવગણવાથી તમારા બાળકના કાયમી સ્માઇલ અને સ્વાસ્થ્યને શા માટે કાયમી નુકસાન થઈ શકે છે."
              : "Why overlooking primary teeth can permanently damage your child’s permanent smile and health."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-8 max-w-7xl mx-auto pt-8">
          
          {/* Card 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "પ્રારંભિક સંભાળ મહત્વની છે" : "Early Care Matters"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "દૂધના દાંતની સારવાર કરવી એ પૈસાનો બગાડ નથી. દૂધના દાંત કાયમી દાંત માટે જરૂરી જગ્યા જાળવી રાખવામાં મદદ કરે છે, અને તેમને ખૂબ વહેલા ગુમાવવાથી કાયમી દાંતના વિકાસ અને બહાર આવવા પર અસર પડી શકે છે."
                : "Treating a milk tooth is not wasted money. Milk teeth help maintain the space needed for permanent teeth, and losing them too early can affect how the adult tooth develops and erupts."}
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "જગ્યા અને ગોઠવણી" : "Space & Alignment"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "દૂધના દાંત નીચે રહેલા કાયમી દાંત માટે મહત્વપૂર્ણ જગ્યા જાળવી રાખે છે. દૂધનો દાંત વહેલો પડી જવાથી નીચે રહેલો કાયમી દાંત આડો-અવળો બહાર આવી શકે છે."
                : "Milk teeth hold critical space for the adult teeth underneath. Losing a milk tooth early can cause the adult tooth underneath to erupt crooked."}
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "વિકસતા દાંતનું રક્ષણ" : "Protect Developing Teeth"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "દૂધના દાંતનો સડો ઊંડે સુધી જઈ શકે છે અને તેની નીચે હાડકામાં બેઠેલા વિકસતા કાયમી પુખ્ત દાંતને ચેપ લગાડી શકે છે."
                : "Decay in a milk tooth can travel deep and infect the developing permanent adult tooth sitting in the bone beneath it."}
            </p>
          </div>

          {/* Card 4 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2 md:col-start-2">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "લાંબા ગાળાના દુખાવાનું જોખમ" : "Long-Term Pain Risk"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "છેલ્લા દૂધના દાંત ૧૧-૧૨ વર્ષની ઉંમર સુધી પડતા નથી. ૬ વર્ષની ઉંમરે થયેલી કેવિટી (સડો) તમારા બાળક માટે વર્ષો સુધી દુખાવો અને ચેપનું જોખમ બની શકે છે."
                : "The last milk teeth do not fall out until age 11–12. A cavity at age 6 can mean years of pain and infection risk for your child."}
            </p>
          </div>

          {/* Card 5 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "રોજિંદી શાળા અને ઊંઘ" : "Daily School & Sleep"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "દાંતનો દુખાવો એ શાળામાં ગેરહાજર રહેવાનું એક મુખ્ય કારણ છે. તકલીફમાં રહેલું બાળક એક તરફથી ચાવી શકે છે, ઓછું ખાય છે અને સરખી રીતે ઊંઘી શકતું નથી."
                : "Dental pain is a key contributor to school absence. A child in discomfort may chew on one side, eat less, and sleep badly."}
            </p>
          </div>

        </div>
      </section>


      {/* SECTION 3: WHEN TO BRING YOUR CHILD */}
      <section className="space-y-6 sm:space-y-10 border-t border-slate-200/60 pt-6 sm:pt-14" id="pediatric-when-to-bring">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Clock className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "મુલાકાતનો સમય" : "Timing Your Visit"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "તમારા બાળકને ક્યારે લાવવું" : "When to Bring Your Child"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-bold'}`}>
            {language === 'gu'
              ? "પ્રથમ મુલાકાત: તેમના પ્રથમ જન્મદિવસ સુધીમાં, અથવા પ્રથમ દાંત દેખાયાના ૬ મહિનાની અંદર."
              : "First visit: by their first birthday, or within 6 months of the first tooth appearing."}
          </p>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-500 font-semibold'}`}>
            {language === 'gu'
              ? "મોટાભાગના માતા-પિતા વિચારે છે તેના કરતાં વહેલા — પ્રથમ મુલાકાતનો હેતુ પરિચિતતા કેળવવાનો છે, સારવારનો નહીં."
              : "Earlier than most parents expect — the goal of the first visit is familiarity, not treatment."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pt-8">
          
          {/* Point 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "સફેદ કે કથ્થઈ ડાઘ" : "White or Brown Spots"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu' ? "કોઈપણ દાંત પર સફેદ કે કથ્થઈ રંગના ડાઘ" : "White or brown spots on any tooth"}
            </p>
          </div>

          {/* Point 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "દુખાવો / ચાવવામાં ફેરફાર" : "Pain / Chewing Change"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu' ? "દુખાવાની ફરિયાદ, અથવા એક તરફ ચાવવાનું ટાળવું" : "Complaints of pain, or avoiding chewing on one side"}
            </p>
          </div>

          {/* Point 3 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "મોંની આદતો" : "Oral Habits"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "અંગૂઠો ચૂસવો, જીભ બહાર કાઢવી, નખ કરડવા અથવા લાંબા સમય સુધી પેસિફાયર (ચૂસણી) વાપરવાની આદત"
                : "Thumb sucking, tongue thrusting, nail biting or a prolonged pacifier habit"}
            </p>
          </div>

          {/* Point 4 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "શાર્ક ટીથ" : "Shark Teeth"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu' ? "દૂધના દાંતની પાછળ કાયમી દાંત આવવા (“શાર્ક ટીથ”)" : "Adult teeth coming in behind the milk teeth (“shark teeth”)"}
            </p>
          </div>

          {/* Point 5 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "ડેન્ટલ ઇમરજન્સી" : "Dental Emergency"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu' ? "પડી ગયેલો, તૂટેલો અથવા ખસી ગયેલો દાંત — આ એક ઇમરજન્સી છે; તરત જ કૉલ કરો" : "Any knocked-out, chipped or displaced tooth — this is an emergency; call immediately"}
            </p>
          </div>

          {/* Point 6 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "ઓર્થોડોન્ટિક મૂલ્યાંકન" : "Orthodontic Assessment"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu' ? "૮-૯ વર્ષની ઉંમરે પ્રથમ ઓર્થોડોન્ટિક તપાસ, ભલે અત્યારે કોઈ સારવારની જરૂર ન હોય" : "First orthodontic assessment at age 8–9, even if no treatment is needed yet"}
            </p>
          </div>

        </div>
      </section>

      {/* Surgical Team Section */}
      <SurgicalTeamSection setCurrentPage={setCurrentPage} />

      {/* SECTION 5: BEFORE & AFTER GALLERY */}
      {mConfig.show_before_after !== false && beforeAfterPairs.length > 0 && (
        <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="before-after-gallery-section">
          <div className="space-y-3 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
              <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              {language === 'gu' ? "રૂપાંતરણ" : "Transformations"}
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              {language === 'gu' ? "પીડિયાટ્રિક ડેન્ટિસ્ટ્રી ટ્રાન્સફોર્મેશન્સ પહેલાં અને પછી" : seoHeadings.transformations}
            </h2>
            <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
              {language === 'gu'
                ? "દૂધના દાંતના પુનઃસ્થાપનથી લઈને આત્મવિશ્વાસપૂર્ણ અને સ્વસ્થ બાળકોના સ્મિત સુધીના અસલી પરિણામો જુઓ."
                : (mConfig.before_after_description || "See real smile transformations of our patients.")}
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
          heading={language === 'gu' ? "પીડિયાટ્રિક ડેન્ટિસ્ટ્રી કેસ ગેલેરી" : seoHeadings.caseGallery}
          description={language === 'gu' ? "બાળકોના દૂધના દાંતને ખાસ કાળજી અને શ્રેષ્ઠ પદ્ધતિઓથી કેવી રીતે સારવાર આપવામાં આવે છે તેના અસલી ડેન્ટલ કેસ રેકોર્ડ્સ જુઓ." : mConfig.gallery_description}
          items={Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery}
          singleGallery={true}
          language={language}
        />
      )}

      {testimonialsElement}

      {/* SECTION 6: GOOGLE PATIENT REVIEWS */}
      {mConfig.show_google_reviews !== false && (
        <GooglePatientReviews
          heading={language === 'gu' ? "વાલીઓ અમારા વિશે શું કહે છે" : seoHeadings.reviews}
          reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
          label={language === 'gu' ? "ગૂગલ રીવ્યુઝ" : undefined}
          language={language}
        />
      )}


      {/* SECTION 4: FIRST VISIT */}
      <section className="space-y-6 sm:space-y-10 border-t border-slate-200/60 pt-6 sm:pt-14" id="pediatric-first-visit">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <ToyBrick className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "પ્રથમ મુલાકાત" : "First Visit"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "તમારા બાળકની પ્રથમ મુલાકાત — કોઈ સારવાર નહીં, કોઈ દબાણ નહીં" : "Your child’s first visit — no treatment, no pressure"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-500 font-semibold'}`}>
            {language === 'gu' ? "તમે આખી પ્રક્રિયા દરમિયાન તમારા બાળક સાથે જ રહો છો." : "You stay with your child throughout."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto pt-8">
          
          {/* Step 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <span className="px-2.5 py-1 bg-teal-50 text-[#0D9488] text-[10px] sm:text-[11px] font-black uppercase tracking-widest rounded-full border border-teal-100/50 self-start mb-2 sm:mb-4">
              {language === 'gu' ? "મિનિટ ૧–૫" : "Minutes 1–5"}
            </span>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "તમારું બાળક રૂમનું નિરીક્ષણ કરે છે, ચેર પર બેસે છે, અને અમારા ડેન્ટલ રમકડાં સાથે રમે છે. મોંમાં કશું જ નાખવામાં આવતું નથી."
                : "Your child explores the room, sits in the chair, plays with our dental toys. Nothing goes in their mouth."}
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <span className="px-2.5 py-1 bg-teal-50 text-[#0D9488] text-[10px] sm:text-[11px] font-black uppercase tracking-widest rounded-full border border-teal-100/50 self-start mb-2 sm:mb-4">
              {language === 'gu' ? "મિનિટ ૫–૧૦" : "Minutes 5–10"}
            </span>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "અમે રમત-રમતમાં તેમના દાંત ગણીએ છીએ. મોટાભાગના બાળકોને આ ખૂબ ગમે છે."
                : "We count their teeth — as a game. Most children enjoy this."}
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <span className="px-2.5 py-1 bg-teal-50 text-[#0D9488] text-[10px] sm:text-[11px] font-black uppercase tracking-widest rounded-full border border-teal-100/50 self-start mb-2 sm:mb-4">
              {language === 'gu' ? "મિનિટ ૧૦–૧૫" : "Minutes 10–15"}
            </span>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "કોઈપણ સમસ્યા માટે હળવી તપાસ. જો તમારું બાળક ના પાડે, તો અમે અટકી જઈએ છીએ."
                : "A gentle look for any problems. If your child says stop, we stop."}
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <span className="px-2.5 py-1 bg-teal-50 text-[#0D9488] text-[10px] sm:text-[11px] font-black uppercase tracking-widest rounded-full border border-teal-100/50 self-start mb-2 sm:mb-4">
              {language === 'gu' ? "મિનિટ ૧૫–૨૦" : "Minutes 15–20"}
            </span>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "ડ્રોઇંગ અને કલરિંગ પ્રવૃત્તિઓ, જ્યારે અમે તમને તપાસ વિશે સમજાવીએ છીએ અને બાળકને બ્રશ કરવાની સાચી રીત બતાવીએ છીએ."
                : "Drawing and colouring while we explain what we found to you, and show your child how to brush."}
            </p>
          </div>

        </div>

        {/* Reassurance Panel */}
        <div className="max-w-4xl mx-auto bg-teal-50/40 border border-teal-100/50 rounded-[22px] p-6 sm:p-8 text-center space-y-3.5 mt-8">
          <p className={`text-[14px] sm:text-[16px] leading-relaxed font-semibold ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-800'}`}>
            {language === 'gu'
              ? "જો તમારું બાળક ડરેલું હોય, તો અમે કોઈપણ બળજબરી કરતા નથી. સારવાર શરૂ કરતા પહેલા માત્ર ક્લિનિકના વાતાવરણથી પરિચિત થવા માટે અમે તેમને બે કે ત્રણ વખત બોલાવી શકીએ છીએ. આ સામાન્ય છે અને તે કોઈ નિષ્ફળતા નથી."
              : "If your child is frightened, we don’t force anything. We may see them two or three times just to build familiarity before attempting treatment. That is normal and it is not a failure."}
          </p>
        </div>
      </section>


      {/* SECTION 5: SERVICES & PRICING */}
      <section className="space-y-6 sm:space-y-10 border-t border-slate-200/60 pt-6 sm:pt-14" id="pediatric-services-pricing">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "સેવાઓ અને કિંમત" : "Services & Pricing"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "સંપૂર્ણ પીડિયાટ્રિક સેવાઓ અને ફી" : "Complete Pediatric Services & Fees"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "વિશ્વસ્તરીય પીડિયાટ્રિક કૌશલ્ય સાથે પૂરી પાડવામાં આવતી અમારી વિશેષ ડેન્ટલ સારવાર માટે પારદર્શક કિંમતો."
              : "Transparent pricing for our specialized dental treatments, delivered with world-class pediatric skill."}
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
                    {language === 'gu' ? "સારવાર" : "Treatment"}
                  </th>
                  <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {language === 'gu' ? "શરૂઆતની કિંમત" : "Starting Price"}
                  </th>
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {language === 'gu' ? "કોના માટે શ્રેષ્ઠ" : "Best For"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                
                {/* 1 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "પ્રથમ મુલાકાત અને તપાસ" : "First visit & check-up"}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    {language === 'gu' ? "મફત" : "Free"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                    {language === 'gu' ? "શિશુઓ, નાના બાળકો અને પ્રથમ વખતની મુલાકાત માટે" : "Infants, toddlers & first-time visits"}
                  </td>
                </tr>

                {/* 2 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "ક્લીનિંગ અને ફ્લોરાઇડ એપ્લિકેશન" : "Cleaning & fluoride application"}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                    {language === 'gu' ? "વર્ષમાં બે વાર સડો અટકાવવા માટે" : "Bi-annual cavity prevention"}
                  </td>
                </tr>

                {/* 3 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "ડેન્ટલ સીલન્ટ્સ — દાંત દીઠ" : "Dental sealants — per tooth"}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                    {language === 'gu' ? "નવા આવેલા કાયમી દાઢના દાંત માટે" : "Newly erupted permanent molars"}
                  </td>
                </tr>

                {/* 4 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "ફિલિંગ — દૂધના દાંતનું" : "Filling — milk tooth"}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                    {language === 'gu' ? "હળવોથી મધ્યમ સડો" : "Mild to moderate dental decay"}
                  </td>
                </tr>

                {/* 5 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "પલ્પપેક્ટોમી (રૂટ કેનાલ) + સ્ટેનલેસ સ્ટીલ ક્રાઉન" : "Pulpectomy + stainless steel crown"}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                    {language === 'gu' ? "ઊંડો સડો અથવા ચેપગ્રસ્ત દૂધના દાંત" : "Deep decay or infected primary teeth"}
                  </td>
                </tr>

                {/* 6 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "આદત છોડાવવા માટેનું એપ્લાયન્સ (સાધન)" : "Habit-breaking appliance"}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                    {language === 'gu' ? "અંગૂઠો ચૂસવો કે જીભ બહાર કાઢવાની આદત સુધારવા" : "Correcting thumb sucking or tongue thrusting"}
                  </td>
                </tr>

                {/* 7 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "સ્પેસ મેન્ટેનર" : "Space maintainer"}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                    {language === 'gu' ? "દાંત વહેલા પડી જાય ત્યારે આજુબાજુના દાંતને ખસતા રોકવા" : "Preventing shifting when teeth are lost early"}
                  </td>
                </tr>

                {/* 8 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "પ્રારંભિક ઓર્થોડોન્ટિક મૂલ્યાંકન" : "Early orthodontic assessment"}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    {language === 'gu' ? "મફત" : "Free"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                    {language === 'gu' ? "જડબાનો વિકાસ અને બાઈટ સંરેખણ મૂલ્યાંકન (ઉંમર ૮-૯)" : "Jaw development & bite alignment evaluation (Ages 8-9)"}
                  </td>
                </tr>

                {/* 9 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "જનરલ એનેસ્થેશિયા હેઠળ સારવાર" : "Treatment under general anaesthesia"}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                    {language === 'gu' ? "અત્યંત ડરેલા અથવા ખાસ જરૂરિયાતવાળા બાળકો" : "Extremely anxious or special needs pediatric care"}
                  </td>
                </tr>

                {/* 10 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "ઇમરજન્સી — પડી ગયેલો / તૂટેલો દાંત" : "Emergency — knocked out / broken tooth"}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                    {language === 'gu' ? "રમતના મેદાનમાં અથવા પડી જવાથી થતી ઇજાઓ માટે તાત્કાલિક સારવાર" : "Urgent trauma care for playground and fall injuries"}
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        <div className={`max-w-4xl mx-auto text-center text-xs font-medium font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-500'}`}>
          {language === 'gu'
            ? "* પ્રારંભિક બાળપણના દાંતના સ્વાસ્થ્ય પ્રત્યેની અમારી પ્રતિબદ્ધતાના ભાગરૂપે પ્રથમ મુલાકાત અને તપાસ તેમજ પ્રારંભિક ઓર્થોડોન્ટિક મૂલ્યાંકન સંપૂર્ણપણે મફત છે. ચોક્કસ પ્રશ્નો માટે, કૃપા કરીને અમારા હોસ્પિટલ ડેસ્કનો સંપર્ક કરો."
            : "* First visit & check-up and Early orthodontic assessment are free as part of our commitment to early childhood dental wellness. For specific questions, please contact our hospital desk."}
        </div>
      </section>


      {/* SECTION 6: SPECIAL NEEDS & GENERAL ANAESTHESIA */}
      <section className="space-y-6 sm:space-y-10 border-t border-slate-200/60 pt-6 sm:pt-14" id="pediatric-special-needs">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Baby className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "ખાસ જરૂરિયાતો અને એનેસ્થેશિયા" : "Special Needs & Anesthesia"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "જે બાળકોની સામાન્ય રીતે સારવાર શક્ય નથી તેમના માટે વિશિષ્ટ ડેન્ટિસ્ટ્રી" : "Dentistry for children who cannot be treated conventionally"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "ખૂબ જ નાની ઉંમરના, અત્યંત ડરેલા અથવા વિશેષ જરૂરિયાતોવાળા બાળકો માટે અમે જનરલ એનેસ્થેશિયા હેઠળ સંપૂર્ણ સારવાર પૂરી પાડીએ છીએ — બધી જ પ્રક્રિયા એક જ મુલાકાતમાં સુરક્ષિત રીતે પૂરી થાય છે."
              : "For very young, extremely anxious, or specially-abled children, we provide complete treatment under general anaesthesia — all work completed safely in one session."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto pt-8">
          
          {/* Card 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "ખૂબ જ નાના બાળકો" : "Very Young Children"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "જ્યારે નાની ઉંમરે દાંતમાં ગંભીર સડો હોય અને સામાન્ય રીતે સહકાર આપવો હજુ શક્ય ન હોય, ત્યારે ગુણવત્તાયુક્ત ડેન્ટલ કેર પૂરી પાડવા માટેનો એક સુરક્ષિત અને આરામદાયક રસ્તો."
                : "Providing a secure, comfortable way to deliver critical dental care when early childhood decay is present and conventional cooperation is not yet possible."}
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "અત્યંત ગભરાયેલા બાળકો" : "Extremely Anxious Children"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "તેમના ભાવનાત્મક સ્વાસ્થ્યનું રક્ષણ કરીને, અત્યંત ડર અથવા ગભરાટ ધરાવતા બાળકોને કોઈપણ શારીરિક બળજબરી વગર સંપૂર્ણ કાળજી મળે તેની ખાતરી કરવી."
                : "Ensuring children with high dental anxiety or fear can receive thorough care without physical restraint, protecting their emotional well-being."}
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "ખાસ દિવ્યાંગ બાળકો" : "Specially-abled Children"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "વિકાસાત્મક, શારીરિક કે સંવેદનાત્મક પડકારો ધરાવતા બાળકો માટે સુરક્ષા, કાર્યક્ષમતા અને આરામને પ્રાધાન્ય આપતી કસ્ટમાઇઝ્ડ સારવાર પદ્ધતિઓ."
                : "Customized care environments for children with developmental, physical, or sensory challenges, prioritizing safety, efficiency, and comfort."}
            </p>
          </div>

        </div>

        {/* Philosophy Panel */}
        <div className="max-w-4xl mx-auto bg-teal-50/40 border border-teal-100/50 rounded-[22px] p-6 sm:p-8 text-center space-y-3 mt-8">
          <p className="text-[#081C3A] text-[15px] sm:text-[17px] leading-relaxed font-bold font-sans">
            {language === 'gu' ? "અમે હંમેશા પહેલા હળવી અને પરંપરાગત સારવારનો પ્રયાસ કરીશું." : "We’ll always attempt gentle conventional treatment first."}
          </p>
          <p className={`text-[13px] sm:text-[15px] leading-relaxed font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "જનરલ એનેસ્થેશિયા (GA) માત્ર ત્યારે જ ઓફર કરવામાં આવે છે જ્યારે તે બાળક માટે ખરેખર વધુ અનુકૂળ અને દયાળુ વિકલ્પ હોય, ટૂંકા રસ્તા તરીકે નહીં."
              : "GA is offered when it’s genuinely the kinder option, not as a shortcut."}
          </p>
        </div>
      </section>


      {/* SECTION 7: PARENT GUARANTEE */}
      <section className="space-y-6 sm:space-y-10 border-t border-slate-200/60 pt-6 sm:pt-14" id="pediatric-parent-guarantee">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "અમારી ગેરંટી" : "Our Guarantees"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "વાલીઓ માટે ખાતરી (ધ પેરેન્ટ ગેરંટી)" : "The Parent Guarantee"}
          </h2>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto pt-8">
          
          {/* Point 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "પ્રથમ મુલાકાત મફત" : "First Visit Free"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "પ્રથમ મુલાકાત બિલકુલ મફત — કોઈ બંધન નહીં, જ્યાં સુધી તાત્કાલિક જરૂર ન હોય ત્યાં સુધી પ્રથમ દિવસે કોઈ સારવાર નહીં"
                : "First visit free — no obligation, no treatment on day one unless it’s urgent"}
            </p>
          </div>

          {/* Point 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "બાળક સાથે જ રહો" : "Stay With Your Child"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "દરેક એપોઇન્ટમેન્ટ દરમિયાન આખી પ્રક્રિયામાં તમે તમારા બાળક સાથે જ રહો છો"
                : "You stay with your child throughout every appointment"}
            </p>
          </div>

          {/* Point 3 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "ઝીરો ફોર્સ (કોઈ બળજબરી નહીં)" : "Zero Force"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "અમે ડરેલા બાળક સાથે ક્યારેય કોઈ બળજબરી કે નિયંત્રણ પદ્ધતિઓ અપનાવતા નથી. જો તેઓ તૈયાર ન હોય, તો અમે અનેક મુલાકાતોમાં તેમનો વિશ્વાસ જીતીએ છીએ"
                : "We will never restrain or force a frightened child. If they aren’t ready, we build up over multiple visits"}
            </p>
          </div>

          {/* Point 4 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "સજાગ દેખરેખ" : "Watchful Care"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "જ્યારે પણ કોઈ ડેન્ટલ સમસ્યા માત્ર સામાન્ય દેખરેખથી હલ થઈ શકે તેમ હોય અને તાત્કાલિક સારવારની જરૂર ન હોય, ત્યારે અમે તમને સ્પષ્ટ માર્ગદર્શન આપીશું"
                : "We’ll tell you when something can safely be watched rather than treated"}
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 3: PROCEDURE VIDEO */}
      {videoElement}

      {/* SECTION 8: WHY PEDIATRIC CARE */}
      <section className="space-y-6 sm:space-y-10 border-t border-slate-200/60 pt-6 sm:pt-14" id="pediatric-why-choose">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Baby className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "શા માટે અમને પસંદ કરો" : "Why Choose Us"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "શા માટે વાલીઓ પટેલ ડેન્ટલ હોસ્પિટલ ખાતે પીડિયાટ્રિક કેર પસંદ કરે છે" : "Why Parents Choose Pediatric Care at Patel Dental Hospital"}
          </h2>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pt-8">
          
          {/* Card 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "બાળકો માટે અનુકૂળ વાતાવરણ" : "Child-Friendly Environment"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "બાળકો માટે ખાસ ડિઝાઈન કરેલી ચેર, ડેન્ટલ રમકડાં, અને ડ્રોઇંગ કે કલરિંગ પ્રવૃત્તિઓથી સજ્જ વાતાવરણ, જે બાળકોને ડેન્ટલ ક્લિનિકથી પરિચિત થવામાં અને હળવાશ અનુભવવામાં મદદ કરે છે."
                : "Features a dedicated children’s chair and a child-friendly environment with dental toys and drawing or colouring activities to help children become familiar with the dental setting."}
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "ગભરાયેલા બાળક સાથે ક્યારેય ઉતાવળ નહીં" : "Never Rushes a Frightened Child"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "અમારી ક્લિનિકલ ટીમ ક્યારેય ગભરાયેલા બાળક સાથે ઉતાવળ કરતી નથી. ડૉ. કિંજલ પટેલ ખાસ કરીને બાળકો અને ચિંતિત દર્દીઓ સાથે તેમની પોતાની અનુકૂળ ગતિએ વિશ્વાસ કેળવવા પર ધ્યાન કેન્દ્રિત કરે છે."
                : "Our clinical team never rushes a frightened child. Dr. Kinjal Patel has a particular focus on children and anxious patients to build trust at their own comfortable pace."}
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "વાલી બાળક સાથે જ રહે છે" : "Parent Stays With the Child"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "વાલીઓ દરેક મુલાકાત અને તપાસ દરમિયાન તેમના બાળક સાથે રહી શકે છે, જે સતત ભાવનાત્મક ટેકો, ખાતરી અને સંપૂર્ણ પારદર્શિતા પ્રદાન કરે છે."
                : "Parents can stay with their child throughout the entire appointment, providing constant emotional support, reassurance, and full visibility."}
            </p>
          </div>

          {/* Card 4 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "કોઈ બળજબરી કે નિયંત્રણ નહીં" : "No Force or Restraint"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "ગભરાયેલા બાળકો પર ક્યારેય બળજબરી કરવામાં આવતી નથી. જો કોઈ બાળક તૈયાર ન હોય, તો લાંબા ગાળે હકારાત્મક વલણ સુનિશ્ચિત કરવા માટે અનેક મુલાકાતો દ્વારા ધીમે-ધીમે પરિચિતતા વધારવામાં આવે છે."
                : "Frightened children are never restrained or forced. If a child is not ready, familiarity is built gently over multiple visits to ensure a positive long-term attitude."}
            </p>
          </div>

          {/* Card 5 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "ચિંતિત અને ખાસ જરૂરિયાતવાળા બાળકો માટે કાળજી" : "Care for Anxious & Special-Needs"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "વિશેષ જરૂરિયાતો ધરાવતા બાળકો માટે કસ્ટમાઇઝ્ડ અને અત્યંત સુરક્ષિત સંભાળ પૂરી પાડવી. જ્યારે પરંપરાગત સારવાર શક્ય ન હોય અને ખરેખર જરૂરી હોય ત્યારે જનરલ એનેસ્થેશિયા ઉપલબ્ધ છે."
                : "Providing customized, high-safety care for special-needs children. General anaesthesia is available when conventional treatment is not possible and is genuinely appropriate."}
            </p>
          </div>

          {/* Card 6 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
            <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "પહેલા હળવી સારવારનો પ્રયાસ" : "Gentle Treatment First"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "અમે હંમેશા પહેલા હળવી પરંપરાગત સારવારનો પ્રયત્ન કરીએ છીએ. જનરલ એનેસ્થેશિયા ત્યારે જ ઓફર કરવામાં આવે છે જ્યારે તે બાળકના હિતમાં ખરેખર વધુ અનુકૂળ વિકલ્પ હોય, ક્યારેય ટૂંકા રસ્તા તરીકે નહીં."
                : "We always attempt gentle conventional treatment first. General anaesthesia is offered only when it is genuinely the kinder option, never as a shortcut."}
            </p>
          </div>

        </div>

        {/* Free First Visit Bar */}
        <div className="max-w-4xl mx-auto bg-teal-50/40 border border-teal-100/50 rounded-[22px] p-6 sm:p-8 text-center space-y-3 mt-8">
          <p className="text-[#081C3A] text-[15px] sm:text-[17px] leading-relaxed font-bold font-sans">
            {language === 'gu'
              ? "પ્રથમ મુલાકાત મફત છે, જે વાલીઓ માટે શરૂઆતની કોઈપણ આર્થિક ચિંતાને દૂર કરે છે."
              : "First visit is free, removing the parent's initial financial risk."}
          </p>
        </div>
      </section>

      {/* SECTION 9: TECHNOLOGY & PATIENT BENEFIT */}
      <section className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="pediatric-technology-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Cpu className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "પીડિયાટ્રિક ટેકનોલોજી" : "Pediatric Technology"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "બાળકો માટે યોગ્ય ડાયગ્નોસ્ટિક અને સારવાર ટેકનોલોજી" : "Appropriate Diagnostic & Care Technology"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "બાળકોની સુવિધા અને હળવી ક્લિનિકલ તપાસને ધ્યાનમાં રાખીને ખાસ તૈયાર કરાયેલા અદ્યતન સાધનો અને પ્રક્રિયાઓનો ઉપયોગ."
              : "Using low-impact, specialized tools and processes designed purely around child comfort and gentle clinical assessment."}
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
              {language === 'gu' ? "બાળકો માટે ખાસ ડેન્ટલ ચેર" : "Dedicated Pediatric Dental Chair"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "બાળકો માટે ખાસ ડિઝાઇન કરેલી અમારી ડેન્ટલ ચેર સારવારને એક રમત જેવી બનાવે છે, જેથી બાળકો આખી સારવાર દરમિયાન આરામદાયક અને ખુશ રહે છે."
                : "Our custom-designed children's dental chair turns treatments into a comfortable game, keeping children relaxed and happily accommodated throughout."}
            </p>
          </div>

          {/* Technology 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0 w-max p-2.5">
              <ToyBrick className="h-5 w-5" />
            </div>
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "બાળ-કેન્દ્રિત રમત પ્રવૃત્તિઓ" : "Child-Focused Dental Activities"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "સારવારથી ધ્યાન હટાવવા અને બાળકોને તબીબી વાતાવરણથી પરિચિત કરવા માટે ઇન્ટરેક્ટિવ રમકડાં અને કલરિંગ પ્રવૃત્તિઓનો સમાવેશ."
                : "Incorporating interactive toys, and creative colouring or drawing materials to safely distract and familiarize children with the clinical environment."}
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
