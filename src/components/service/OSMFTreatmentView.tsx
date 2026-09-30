/**
 * @license
 * Copyright © 2026 Patel Dental Hospital (રાજકોટ / Rajkot).
 * All Rights Reserved.
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  Clock,
  Phone,
  MessageCircle,
  HelpCircle,
  Award,
  Users,
  Activity,
  FileText,
  ChevronUp,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MarketingConfig } from '../../types';
import { BeforeAfterSlider } from '../BeforeAfterSlider';
import { ClinicalCaseGallery } from '../ClinicalCaseGallery';
import { GooglePatientReviews } from '../GooglePatientReviews';

export interface OSMFTreatmentViewProps {
  heroElement: React.ReactNode;
  mConfig: MarketingConfig;
  openAppointmentModal: (preselectedTreatment?: string) => void;
  videoElement: React.ReactNode;
  testimonialsElement: React.ReactNode;
  beforeAfterPairs: Array<{
    id?: string;
    before_image: string;
    after_image: string;
    caption?: string;
    title?: string;
  }>;
  displayGallery: any[];
  seoHeadings: {
    transformations?: string;
    caseGallery?: string;
    reviews?: string;
    [key: string]: any;
  };
  getServiceHeroImage?: (slug: string) => string;
  setCurrentPage?: (page: string) => void;
  language?: string;
  relatedServicesElement?: React.ReactNode;
}

export const OSMFTreatmentView: React.FC<OSMFTreatmentViewProps> = ({
  heroElement,
  mConfig,
  openAppointmentModal,
  videoElement,
  testimonialsElement,
  beforeAfterPairs,
  displayGallery,
  seoHeadings,
  getServiceHeroImage,
  setCurrentPage,
  language,
  relatedServicesElement
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const isGujarati = language === 'gu';

  const handleNavigateToService = (targetSlug: string) => {
    window.location.hash = `#services/${targetSlug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappNum = '919510397046';
  const whatsappText = isGujarati
    ? "નમસ્તે પટેલ ડેન્ટલ હોસ્પિટલ, મને મોં ખોલવામાં તકલીફ છે (OSMF) અને મારા મોં ખોલવાની મર્યાદા વિશે ચર્ચા કરવા માંગુ છું."
    : "Hello Patel Dental Hospital, I would like to discuss OSMF treatment and my reduced mouth opening.";
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(whatsappText)}`;

  // --- SECTION #2: Symptom Qualification ---
  // EXACTLY matching the source document. No added invented explanations.
  const symptoms = isGujarati ? [
    { id: 'osmf-sym-1', title: 'મોં ઓછું ખુલવું' },
    { id: 'osmf-sym-2', title: 'મોં ખોલવામાં સતત વધતી જતી તકલીફ' },
    { id: 'osmf-sym-3', title: 'ગાલની અંદર જકડન અથવા કડકપણું લાગવું' },
    { id: 'osmf-sym-4', title: 'ખાતી વખતે મોઢામાં બળતરા થવી' },
    { id: 'osmf-sym-5', title: 'તીખો ખોરાક ન ખાઈ શકવો' },
    { id: 'osmf-sym-6', title: 'ખોરાક ચાવવામાં તકલીફ પડવી' },
    { id: 'osmf-sym-7', title: 'પાછળના દાંત બ્રશ કરવામાં તકલીફ પડવી' },
    { id: 'osmf-sym-8', title: 'બોલવામાં અથવા ગળવામાં તકલીફ પડવી' },
    { id: 'osmf-sym-9', title: 'મોઢાની અંદરની ચામડી ફીકી અથવા કડક થવી' },
    { id: 'osmf-sym-10', title: 'ગાલની અંદરના ભાગમાં કડક તાંતણા (ફાઇબ્રોટિક બેન્ડ્સ) બનવા' },
    { id: 'osmf-sym-11', title: 'વારંવાર મોઢામાં ચાંદા પડવા અથવા શંકાસ્પદ ફેરફારો થવા' }
  ] : [
    { id: 'osmf-sym-1', title: 'Reduced mouth opening' },
    { id: 'osmf-sym-2', title: 'Progressive difficulty opening the mouth' },
    { id: 'osmf-sym-3', title: 'Tightness or stiffness inside the cheeks' },
    { id: 'osmf-sym-4', title: 'Burning sensation while eating' },
    { id: 'osmf-sym-5', title: 'Intolerance to spicy food' },
    { id: 'osmf-sym-6', title: 'Difficulty chewing food' },
    { id: 'osmf-sym-7', title: 'Difficulty brushing the back teeth' },
    { id: 'osmf-sym-8', title: 'Difficulty speaking or swallowing' },
    { id: 'osmf-sym-9', title: 'Pale or stiff oral mucosa' },
    { id: 'osmf-sym-10', title: 'Fibrous bands inside the cheeks' },
    { id: 'osmf-sym-11', title: 'Recurrent oral ulcers or suspicious changes' }
  ];

  // --- SECTION #5: Transparent Pricing Fallback ---
  const pricingItems = isGujarati ? [
    {
      title: 'OSMF ક્લિનિકલ કન્સલ્ટેશન અને નિદાન',
      description: 'મોં ખુલવાની સ્થિતિનું સચોટ માપન, બાયોપ્સી મૂલ્યાંકન (જરૂરિયાત મુજબ) અને સ્ટેજિંગ.',
      price: 'કિંમત માટે સંપર્ક કરો'
    },
    {
      title: 'નોન-સર્જિકલ થેરાપી (કન્ઝર્વેટિવ મેનેજમેન્ટ)',
      description: 'સ્થાનિક ઇન્જેક્શન સારવાર, વિટામિન્સ/ન્યુટ્રિશનલ સપોર્ટ અને ફિઝિયોથેરાપી પ્લાન.',
      price: 'કિંમત માટે સંપર્ક કરો'
    },
    {
      title: 'OSMF ફાઇબ્રોટિક બેન્ડ રિલીઝ સર્જરી',
      description: 'મેક્સિલોફેશિયલ સર્જન દ્વારા ગંભીર કેસોમાં કડક તાંતણાઓ દૂર કરી મોં ખુલવાની ક્ષમતા વધારવી.',
      price: 'કિંમત માટે સંપર્ક કરો'
    }
  ] : [
    {
      title: 'OSMF Clinical Consultation & Staging',
      description: 'Detailed jaw mobility measurement, mucosal health assessment, and biopsy review (if indicated).',
      price: 'Contact Us for Pricing'
    },
    {
      title: 'Non-Surgical / Conservative Therapy',
      description: 'Localized injection sessions, nutritional therapeutic support, and structured jaw physical therapy.',
      price: 'Contact Us for Pricing'
    },
    {
      title: 'Surgical Release of Fibrotic Bands',
      description: 'Specialist surgical intervention by a senior maxillofacial surgeon to cut dense restrictive bands.',
      price: 'Contact Us for Pricing'
    }
  ];

  // --- SECTION #11: FAQ Content ---
  const faqs = isGujarati ? [
    {
      q: "ઓરલ સબમ્યુકસ ફાઇબ્રોસિસ (OSMF) શું છે?",
      a: "ઓરલ સબમ્યુકસ ફાઇબ્રોસિસ, જેને સામાન્ય રીતે OSMF કહેવામાં આવે છે, તે મોઢાની અંદરની એક ક્રોનિક (લાંબા ગાળાની) સ્થિતિ છે જેમાં ગાલ અને મોઢાની પેશીઓ ધીમે ધીમે જાડી અને કડક થતી જાય છે. જેમ જેમ આ કડકતા વધે છે તેમ મોં ખુલવાનું ઓછું થાય છે. આ રોગ સોપારી (supari), ગુટખા, માવા કે સોપારીયુક્ત પદાર્થોના સેવન સાથે મજબૂત રીતે સંકળાયેલો છે. OSMF ને પ્રી-કેન્સરસ કન્ડિશન પણ ગણવામાં આવે છે, જેના કારણે લાંબા ગાળાની દેખરેખ જરૂરી છે."
    },
    {
      q: "OSMF શા માટે થાય છે?",
      a: "OSMF થવા પાછળનું સૌથી મહત્વનું કારણ સોપારી કે સુપારીના સંપર્કમાં આવવું છે. સોપારીમાં રહેલા સક્રિય રસાયણો મોઢાની કોમળ પેશીઓમાં ક્રોનિક સોજો લાવે છે અને કડક રેસાવાળા તાંતણા (fibrosis) બનાવે છે. તેનાથી ચામડીની સ્થિતિસ્થાપકતા ઘટી મોં બંધ થવા લાગે છે. તેથી, સોપારી કે માવાની ટેવ સંપૂર્ણ છોડવી એ સારવાર શરૂ કરવા માટેનું અત્યંત મહત્વનું પગલું છે."
    },
    {
      q: "શું OSMF માંથી મોઢાનું કેન્સર થઈ શકે?",
      a: "OSMF એ ઓરલ પ્રી-કેન્સરસ સ્થિતિ (potentially malignant disorder) તરીકે વર્ગીકૃત થયેલ છે. આનો અર્થ એ નથી કે OSMF ધરાવતા દરેક દર્દીને કેન્સર થશે. જો કે, સંશોધન દર્શાવે છે કે આમાં કેન્સર થવાનું જોખમ રહેલું છે, તેથી જ દર્દીઓ માટે યોગ્ય તપાસ અને લાંબા ગાળાનું નિરીક્ષણ અત્યંત જરૂરી છે. જો તપાસ દરમિયાન શંકાસ્પદ વિસ્તાર જણાય, તો બાયોપ્સી જેવી વધુ તપાસની સલાહ આપવામાં આવી શકે છે.\n\nચેતવણીના લક્ષણો જેની તાત્કાલિક તપાસ જરૂરી છે: રૂઝ ન આવતું ચાંદું, અસામાન્ય લાલ અથવા સફેદ વિસ્તાર, અસ્પષ્ટ રક્તસ્રાવ, સતત દુખાવો, નવો ગઠ્ઠો કે ગાંઠ, અથવા બદલાતી કોઈ ક્ષતિ. આનું વ્યાવસાયિક મૂલ્યાંકન થવું જોઈએ."
    },
    {
      q: "શું OSMF સારવારથી મટી શકે?",
      a: "OSMF એ ક્રોનિક ફાઇબ્રોટિક (લાંબા ગાળાની કડકતાની) સ્થિતિ છે. સારવારનો હેતુ સોપારી/માવાની ટેવ છોડાવવી, લક્ષણો કાબૂમાં લેવા, મોં ખોલવાની ક્ષમતા તેમજ મોઢાના હલનચલનમાં સુધારો કરવો અને પેશીઓની નિયમિત દેખરેખ રાખવાનો છે. રિકવરી ગંભીરતા પર આધાર રાખે છે."
    },
    {
      q: "શું OSMF પછી મોં ખુલવાની સ્થિતિ સુધરી શકે?",
      a: "હા, મોં ખુલવાની સ્થિતિમાં સુધારો શક્ય છે, પરંતુ સુધારાનું પ્રમાણ રોગની ગંભીરતા, પસંદ કરેલ સારવાર અને દર્દી નિયમિત કસરત કરે છે કે નહીં તેના પર ખૂબ આધાર રાખે છે."
    },
    {
      q: "શું દરેક OSMF દર્દીને ઓપરેશનની જરૂર પડે છે?",
      a: "ના. ઓપરેશન (સર્જરી) માત્ર ગંભીર કેસોમાં જ ધ્યાનમાં લેવામાં આવે છે જ્યાં મોં ખૂબ જ ઓછું ખુલતું હોય અને દવાઓથી કોઈ સુધારો ન થયો હોય."
    },
    {
      q: "શું સર્જરી પછી ફિઝિયોથેરાપી જરૂરી છે?",
      a: "હા, સર્જરી પછીની ફિઝિયોથેરાપી અને ઘરે મોં ખોલવા માટેની ખાસ કસરતો એ સારવારનો સૌથી અગત્યનો ભાગ છે. તેના વગર મોં ફરી બંધ થઈ શકે છે."
    },
    {
      q: "શું સર્જરી પછી મોં ફરીથી બંધ થઈ શકે?",
      a: "હા, જો સોપારીની ટેવ ચાલુ રાખવામાં આવે અથવા સર્જરી પછી નિયમિત કસરત ન કરવામાં આવે, તો મોં ખુલવાનું ફરીથી ઓછું થઈ શકે છે. તેથી કસરત અને પરેજી ખૂબ જરૂરી છે."
    },
    {
      q: "શું મારે સોપારી / સુપારી ખાવાનું બંધ કરવું જ પડશે?",
      a: "હા. આ સારવારનો પાયો છે. સોપારી કે તમાકુની આદત સંપૂર્ણ બંધ કરવી એ સૌથી પહેલું અને અનિવાર્ય પગલું છે."
    },
    {
      q: "પહેલા કન્સલ્ટેશનમાં શું કરવામાં આવે છે?",
      a: "પ્રથમ કન્સલ્ટેશનમાં તમારા લક્ષણો, વ્યુસનની ટેવ અને ભૂતકાળની વિગતવાર માહિતી લેવામાં આવે છે. મોં ખુલવાની ચોક્કસ ક્ષમતા માપી પેશીઓની ઝીણવટભરી તપાસ કરવામાં આવે છે."
    },
    {
      q: "મેં દવાઓ લીધી છે પણ મોં હજુ પણ બહુ ઓછું ખૂલે છે. મારે શું કરવું જોઈએ?",
      a: "જો લાંબા સમય સુધી દવાઓ લેવા છતાં કોઈ સુધારો ન થાય, તો મેક્સિલોફેશિયલ સર્જન પાસે વિગતવાર ક્લિનિકલ તપાસ કરાવી સર્જિકલ થેરાપીના વિકલ્પો વિશે ચર્ચા કરવી હિતાવહ છે."
    }
  ] : [
    {
      q: "What is OSMF?",
      a: "Oral Submucous Fibrosis, commonly called OSMF, is a chronic condition in which tissues inside the mouth progressively become fibrotic and stiff. As fibrosis progresses, the cheeks and other oral tissues can lose flexibility, causing the mouth opening to become increasingly restricted. OSMF is strongly associated with habits involving areca nut/supari and related products. OSMF is also considered an oral potentially malignant disorder, which is why long-term monitoring is important even after symptoms improve."
    },
    {
      q: "Why Does OSMF Develop?",
      a: "One of the most important factors associated with OSMF is areca nut/supari exposure. Repeated exposure can contribute to chronic inflammation and progressive fibrosis within the oral tissues. The tissues gradually become less elastic and the mouth opening may reduce. Stopping the causative habit is therefore an essential part of OSMF management."
    },
    {
      q: "Can OSMF Cause Oral Cancer?",
      a: "OSMF is classified as an oral potentially malignant disorder. This does not mean that every patient with OSMF will develop cancer. However, published research has demonstrated a risk of malignant transformation, which is why patients require proper examination and long-term surveillance. If a clinically suspicious area is identified during examination, further investigation such as biopsy may be advised.\n\nWarning signs requiring prompt evaluation include a non-healing ulcer, unusual red or white area, unexplained bleeding, persistent pain, new lump or growth, or a changing lesion. These should be professionally evaluated."
    },
    {
      q: "Can OSMF be treated?",
      a: "OSMF is a chronic fibrotic condition. Management focuses on stopping causative habits, controlling symptoms, improving function and mouth opening where possible, and monitoring the oral tissues. Treatment depends on disease severity."
    },
    {
      q: "Can OSMF mouth opening improve?",
      a: "Improvement may be possible, but the amount of improvement varies between patients and depends on disease severity, treatment and compliance with physiotherapy."
    },
    {
      q: "Does every OSMF patient require surgery?",
      a: "No. Surgery is generally considered for selected patients with significant functional restriction after proper clinical assessment."
    },
    {
      q: "Is physiotherapy necessary after OSMF surgery?",
      a: "Postoperative physiotherapy and prescribed mouth-opening exercises are an important part of maintaining functional improvement."
    },
    {
      q: "Can mouth opening reduce again after surgery?",
      a: "Recurrence or loss of mouth opening can occur. Habit cessation, physiotherapy and regular follow-up are therefore important."
    },
    {
      q: "Should I stop supari / areca nut?",
      a: "Yes. Eliminating the causative habit is a fundamental part of OSMF management."
    },
    {
      q: "What happens during my first consultation?",
      a: "Your history, habits, symptoms and current mouth opening are evaluated. A complete oral examination is performed and further investigation may be recommended when indicated."
    },
    {
      q: "I have already taken medicines but my mouth opening is still very limited. What should I do?",
      a: "Persistent restriction should be clinically assessed. Depending on disease severity and functional limitation, further conservative treatment or surgical management may be discussed."
    }
  ];

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* SECTION #1: Hero Section */}
      <div id="service-hero-section">
        {heroElement}
      </div>

      {/* SECTION #2: You May Need This If... */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6" id="symptom-qualification-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#0D9488]" />
            {isGujarati ? "ચિહ્નો અને લક્ષણો" : "Symptom Qualification"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {isGujarati ? "મોં ખોલવામાં તકલીફ થાય છે?" : "Difficulty Opening Your Mouth?"}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed text-center font-sans max-w-2xl mx-auto ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {isGujarati 
              ? "જો તમે નીચેનામાંથી કોઈ લક્ષણ અનુભવો છો, તો તમારે OSMF તપાસની જરૂર હોઈ શકે છે:"
              : "You may need an OSMF evaluation if you experience:"}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        {/* Unified, standardized layout for symptom cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto pt-4">
          {symptoms.map((sym) => (
            <div
              key={sym.id}
              onClick={() => openAppointmentModal(`OSMF Check - Symptom: ${sym.title}`)}
              className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 hover:scale-[1.01] cursor-pointer overflow-hidden flex flex-col justify-center h-full text-left"
            >
              <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <div className="space-y-3">
                <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight leading-tight group-hover:text-[#0D9488] transition-colors">
                  {sym.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className={`text-sm sm:text-base font-sans font-black mb-4 ${isGujarati ? 'text-red-700' : 'text-slate-800'}`}>
            {isGujarati 
              ? "મોં ઓછું ખુલવાની સમસ્યાને ક્યારેય સામાન્ય ગણીને અવગણવી જોઈએ નહીં."
              : "Reduced mouth opening should not simply be ignored."}
          </p>
          <button
            onClick={() => openAppointmentModal('OSMF Mouth Check')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
          >
            <Calendar className="h-4 w-4 shrink-0" />
            <span>{isGujarati ? "તમારા મોં ખુલવાની સ્થિતિ તપાસો" : "GET YOUR MOUTH OPENING CHECKED"}</span>
          </button>
        </div>
      </section>

      {/* SECTION #3: Doctor Profile */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-14 border-t border-slate-200/60" id="doctor-profile-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50/90 border border-teal-100/60 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Users className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {isGujarati ? "નિષ્ણાત સર્જન પ્રોફાઇલ" : "SPECIALIST CONSULTANT"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {isGujarati ? "OSMF અને મેક્સિલોફેશિયલ સર્જરી નિષ્ણાત" : "Your OSMF Treatment Surgeon"}
          </h2>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="max-w-5xl mx-auto bg-white border border-[#E8EEF5] rounded-[28px] p-6 sm:p-8 md:p-10 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] hover:border-[#14B8A6] transition-all duration-300 flex flex-col md:flex-row gap-6 sm:gap-8 relative overflow-hidden text-left">
          <div className="absolute left-0 top-10 bottom-10 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
          
          <div className="w-full md:w-2/5 shrink-0">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative shadow-sm">
              <img 
                src="/Dr. Vipul Patel.jpg" 
                alt="Dr. Vipul Patel"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-4 text-left flex-1">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider block">
                MDS – Oral & Maxillofacial Surgery
              </span>
              <h3 className="font-sans font-black text-[#081C3A] text-2xl tracking-tight leading-tight">
                {isGujarati ? "ડૉ. વિપુલ પટેલ" : "Dr. Vipul Patel"}
              </h3>
              <div className="h-[1px] bg-slate-100 w-full pt-1" />
            </div>

            <div className="space-y-4 flex-1 text-sm leading-relaxed text-slate-600 font-sans font-medium">
              <p className={isGujarati ? 'text-[#0F172A] font-semibold' : ''}>
                {isGujarati 
                  ? "પટેલ ડેન્ટલ હોસ્પિટલ ખાતે, OSMF ના દર્દીઓની સારવાર અને રોગના નિરીક્ષણ બંને દૃષ્ટિકોણથી કાળજીપૂર્વક મૂલ્યાંકન કરવામાં આવે છે."
                  : "At Patel Dental Hospital, OSMF patients are evaluated from both a functional and disease-monitoring perspective."}
              </p>
              
              <div className="space-y-2">
                <p className="font-bold text-[#081C3A] text-sm">
                  {isGujarati ? "અમારો મુખ્ય ધ્યેય માત્ર એ નથી કે 'આજે મોં કેટલું ખુલે છે?', પરંતુ સૌથી મહત્વના પ્રશ્નો આ છે:" : "The goal is not simply 'How much can we open the mouth today?'. The more important questions are:"}
                </p>
                <ul className={`space-y-1.5 pl-4 list-disc text-xs sm:text-sm ${isGujarati ? 'text-slate-700 font-semibold' : ''}`}>
                  <li>{isGujarati ? "મોં ઓછું ખુલવાનું કારણ શું છે?" : "Why is the mouth opening restricted?"}</li>
                  <li>{isGujarati ? "રોગ કયા સ્ટેજ પર છે?" : "What stage is the disease?"}</li>
                  <li>{isGujarati ? "શું મોઢાની ચામડીમાં કોઈ શંકાસ્પદ ફેરફારો છે?" : "Is there any suspicious mucosal change?"}</li>
                  <li>{isGujarati ? "શું આ દર્દીને સર્જરીની જરૂર છે?" : "Does this patient require surgery?"}</li>
                  <li>{isGujarati ? "જે મોં ખુલ્યું છે તેને ભવિષ્યમાં કેવી રીતે જાળવી રાખવું?" : "How can the achieved mouth opening be maintained?"}</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#0D9488] font-bold tracking-wide">
                <Award className="h-4 w-4 shrink-0" />
                {isGujarati ? "સ્પેશિયાલિસ્ટ મેક્સિલોફેશિયલ સર્જન" : "Oral & Maxillofacial Surgeon"}
              </span>
              <button
                type="button"
                onClick={() => openAppointmentModal('Consultation with Dr. Vipul Patel')}
                className="px-5 py-3 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {isGujarati ? "ડૉ. વિપુલ પટેલ સાથે એપોઇન્ટમેન્ટ લો" : "BOOK CONSULTATION WITH DR. VIPUL PATEL"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CMS SECTION #1: BEFORE & AFTER GALLERY */}
      {mConfig.show_before_after !== false && beforeAfterPairs && beforeAfterPairs.length > 0 && (
        <section className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60 max-w-7xl mx-auto px-4 sm:px-6" id="before-after-gallery-section">
          <div className="space-y-3 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
              <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              {isGujarati ? "પરિવર્તનો" : "Transformations"}
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              {isGujarati ? "સારવાર પહેલાં અને પછીના પરિવર્તનો" : (seoHeadings.transformations || "Before & After Smile Transformations")}
            </h2>
            <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-sans ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
              {mConfig.before_after_description || (isGujarati ? "અમારા દર્દીઓના મોં ખુલવાની સ્થિતિમાં થયેલા સુધારાના વાસ્તવિક પરિણામો જુઓ." : "See real mouth opening and jaw mobility improvements of our OSMF patients.")}
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
                  beforeAltText={pair.before_alt_text || (isGujarati ? "સારવાર પહેલાં" : "Before treatment")}
                  afterAltText={pair.after_alt_text || (isGujarati ? "સારવાર પછી" : "After treatment")}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CMS SECTION #2: CLINICAL CASE GALLERY */}
      {mConfig.show_gallery !== false && (
        <section className="pt-6 sm:pt-14 border-t border-slate-200/60 max-w-7xl mx-auto px-4 sm:px-6" id="clinical-case-gallery-section">
          <ClinicalCaseGallery
            heading={isGujarati ? "ક્લિનિકલ કેસ ગેલેરી" : (seoHeadings.caseGallery || "Clinical Case Gallery")}
            description={mConfig.gallery_description || (isGujarati ? "મોં ખુલવાની ક્ષમતા વધારવા માટેની વિવિધ સારવાર પદ્ધતિઓના કેસ અભ્યાસ." : "Clinical case study restorations and improvements of our patients.")}
            items={Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery}
            singleGallery={true}
            language={language}
          />
        </section>
      )}

      {/* CMS SECTION #3: PATIENT TESTIMONIAL REELS & SUCCESS STORIES (INCLUDING PROCEDURE VIDEO) */}
      {videoElement}
      {testimonialsElement}

      {/* CMS SECTION #4: GOOGLE PATIENT REVIEWS */}
      {mConfig.show_google_reviews !== false && (
        <section className="pt-6 sm:pt-14 border-t border-slate-200/60 max-w-7xl mx-auto px-4 sm:px-6" id="google-reviews-section">
          <GooglePatientReviews
            heading={isGujarati ? "ગૂગલ પેશન્ટ રીવ્યુઝ" : (seoHeadings.reviews || "Google Patient Reviews")}
            reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
          />
        </section>
      )}

      {/* SECTION #4: Treatment / Option Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-14 border-t border-slate-200/60" id="option-comparison-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {isGujarati ? "વિકલ્પો અને માર્ગદર્શન" : "Treatment Comparison"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {isGujarati ? "શું દરેક OSMF ના દર્દીને સર્જરીની જરૂર હોય છે?" : "Does Every OSMF Patient Need Surgery?"}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed text-center font-sans max-w-2xl mx-auto ${isGujarati ? 'text-[#081C3A] font-black' : 'text-slate-800 font-bold'}`}>
            {isGujarati ? "ના." : "No."}
          </p>
          <p className={`text-sm sm:text-base leading-relaxed text-center font-sans max-w-2xl mx-auto ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
            {isGujarati 
              ? "સારવાર દર્દીની સ્થિતિની ગંભીરતા, મોં ખુલવાની ક્ષમતા, કાર્યાત્મક મર્યાદાઓ, ક્લિનિકલ તપાસ અને ભૂતકાળની સારવારના પ્રતિભાવ પર આધારિત છે."
              : "Treatment depends on the severity of the disease, mouth opening, functional limitation, clinical findings and response to previous treatment."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-4">
          {/* Option 1 - Standardized Card Shell */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 hover:scale-[1.01] overflow-hidden flex flex-col justify-between text-left">
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider block bg-teal-50 px-3 py-1 rounded-full w-max">
                {isGujarati ? "સ્થિતિ: ઓછી ગંભીર / શરૂઆતી" : "Option 1: Early / Less Severe OSMF"}
              </span>
              <h3 className="font-sans font-bold text-[#081C3A] text-xl tracking-tight leading-tight group-hover:text-[#0D9488] transition-colors">
                {isGujarati ? "કન્ઝર્વેટિવ થેરાપી" : "Conservative & Medical Care"}
              </h3>
              <p className={`text-sm leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                {isGujarati 
                  ? "રોગના શરૂઆતી સ્ટેજમાં શસ્ત્રક્રિયા વગર સારવાર કરવામાં આવે છે. દર્દીની સ્થિતિ મુજબ નીચેની સારવાર આપી શકાય છે:"
                  : "Depending on the individual patient, management may include:"}
              </p>
              <ul className={`space-y-2 text-xs sm:text-sm list-disc pl-5 font-sans ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                <li>{isGujarati ? "વ્યસન (સોપારી/માવા) સંપૂર્ણપણે બંધ કરવા" : "Complete habit cessation"}</li>
                <li>{isGujarati ? "જરૂરિયાત મુજબ દવાઓ દ્વારા સારવાર" : "Medical management where indicated"}</li>
                <li>{isGujarati ? "યોગ્ય પોષણ અને મલ્ટીવિટામિન સારવાર" : "Nutritional support where appropriate"}</li>
                <li>{isGujarati ? "મોં ખોલવા માટેની ખાસ કસરતો" : "Mouth-opening exercises"}</li>
                <li>{isGujarati ? "ફિઝિયોથેરાપી અને ફ્લેક્સિબિલિટી કસરતો" : "Physiotherapy"}</li>
                <li>{isGujarati ? "નિયમિત ક્લિનિકલ ચેક-અપ અને મોનિટરિંગ" : "Regular monitoring"}</li>
              </ul>
            </div>
          </div>

          {/* Option 2 - Standardized Card Shell */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 hover:scale-[1.01] overflow-hidden flex flex-col justify-between text-left">
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider block bg-teal-50 px-3 py-1 rounded-full w-max">
                {isGujarati ? "સ્થિતિ: ગંભીર / એડવાન્સ" : "Option 2: Advanced OSMF"}
              </span>
              <h3 className="font-sans font-bold text-[#081C3A] text-xl tracking-tight leading-tight group-hover:text-[#0D9488] transition-colors">
                {isGujarati ? "સર્જિકલ મેનેજમેન્ટ" : "Surgical Intervention"}
              </h3>
              <p className={`text-sm leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                {isGujarati 
                  ? "જ્યારે ફાઇબ્રોસિસ ખૂબ વધારે હોય અને મોં ખુલવાની ક્ષમતા અત્યંત મર્યાદિત હોય, ત્યારે માત્ર દવાઓથી પૂરતો ફાયદો થતો નથી."
                  : "When fibrosis is severe and mouth opening is significantly restricted, conservative management alone may not provide adequate functional improvement."}
              </p>
              <p className={`text-sm leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                {isGujarati 
                  ? "સંપૂર્ણ ક્લિનિકલ તપાસ અને મેક્સિલોફેશિયલ સર્જનના મૂલ્યાંકન પછી, યોગ્ય દર્દીઓ માટે સર્જિકલ સારવાર (fibrotic bands surgical release) નો વિચાર કરવામાં આવે છે."
                  : "After complete clinical assessment, surgical management may be considered in selected patients."}
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => openAppointmentModal('OSMF Treatment Options Discuss')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-bold uppercase tracking-wider shadow"
              >
                <span>{isGujarati ? "તમારા માટે કઈ સારવાર યોગ્ય છે તે જાણો" : "FIND OUT WHICH TREATMENT YOU MAY NEED"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION #5: Transparent Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-14 border-t border-slate-200/60" id="transparent-pricing-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {isGujarati ? "પારદર્શક કિંમતો" : "TRANSPARENT PRICING"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {isGujarati ? "OSMF ની સારવાર માટે કિંમત" : "OSMF Treatment Pricing"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
            {isGujarati
              ? "અમારી કિંમતો તમારા કેસની ગંભીરતા અને ક્લિનિકલ તપાસ પર આધારિત છે."
              : "Our pricing is honest and transparent based on staging, severity, and selected conservative or surgical approach."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="max-w-4xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {isGujarati ? "સારવાર વિકલ્પ" : "Treatment Category"}
                  </th>
                  <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {isGujarati ? "કિંમત" : "Price"}
                  </th>
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {isGujarati ? "શું સામેલ છે" : "What It Includes"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                {pricingItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                      {item.title}
                    </td>
                    <td className={`p-4 sm:p-5 font-bold bg-teal-50/30 border-x border-teal-100 ${isGujarati ? 'text-slate-700 font-semibold' : 'text-[#0D9488]'}`}>
                      {item.price}
                    </td>
                    <td className={`p-4 sm:p-5 ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className={`text-xs sm:text-sm max-w-xl font-sans ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
              {isGujarati
                ? "તમારી અંતિમ સારવારની જરૂરિયાત, વિકલ્પો અને અંદાજિત ખર્ચ વિશે ક્લિનિકલ તપાસ પછી સીધી અને પ્રામાણિક ચર્ચા કરવામાં આવશે."
                : "Your precise OSMF stage, clinical suitability, and actual treatment expenses will be discussed directly with you after checking mouth opening."}
            </p>
            <button
              onClick={() => openAppointmentModal('OSMF Pricing Info')}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
            >
              <Calendar className="h-4 w-4 shrink-0" />
              <span>{isGujarati ? "યોગ્યતા અને કિંમતોની ચર્ચા કરો" : "Discuss Suitability & Pricing"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION #6: Treatment Timeline / Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-14 border-t border-slate-200/60" id="timeline-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Clock className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {isGujarati ? "સારવારનો માર્ગ" : "TREATMENT TIMELINE"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {isGujarati ? "OSMF સારવાર પ્રક્રિયા" : "Your OSMF Treatment Journey at PDH"}
          </h2>
          <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-sans ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
            {isGujarati
              ? "પટેલ ડેન્ટલ હોસ્પિટલ ખાતે દરેક સ્તરના OSMF દર્દીની સારવાર આયોજિત તબક્કાવાર રીતે થાય છે:"
              : "We follow a carefully detailed process flow for every OSMF candidate:"}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
        </div>

        <div className="max-w-4xl mx-auto pt-4 relative animate-none">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-teal-100" />
          
          <div className="space-y-8 relative z-10">
            {/* Step 1 - Standardized Card Shell */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-[#0D9488] text-white font-bold text-sm ml-0 md:mx-auto relative z-20 shadow">
                1
              </div>
              <div className="relative overflow-hidden bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 hover:scale-[1.01] text-left max-w-md ml-8 md:ml-0 flex-1">
                <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                <h4 className="font-sans font-bold text-[#081C3A] text-lg mb-1 group-hover:text-[#0D9488] transition-colors">
                  {isGujarati ? "વિગતવાર કન્સલ્ટેશન" : "Detailed Consultation"}
                </h4>
                <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                  {isGujarati 
                    ? "અમે તમારા લક્ષણો, વ્યુસનની ટેવ, અગાઉની સારવાર અને ખાવા-પીવામાં કે મોં ખોલવામાં થતી તકલીફ વિશે વિગતવાર ચર્ચા કરીએ છીએ."
                    : "We discuss your symptoms, habits, previous treatment and difficulty with eating or mouth opening."}
                </p>
              </div>
              <div className="flex-1 hidden md:block" />
            </div>

            {/* Step 2 - Standardized Card Shell */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1 hidden md:block" />
              <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-[#0D9488] text-white font-bold text-sm ml-0 md:mx-auto relative z-20 shadow">
                2
              </div>
              <div className="relative overflow-hidden bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 hover:scale-[1.01] text-left max-w-md ml-8 flex-1">
                <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                <h4 className="font-sans font-bold text-[#081C3A] text-lg mb-1 group-hover:text-[#0D9488] transition-colors">
                  {isGujarati ? "મોં ખુલવાની ક્ષમતાનું માપન" : "Mouth-Opening Measurement"}
                </h4>
                <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                  {isGujarati 
                    ? "તમારી હાલની મોં ખુલવાની સ્થિતિ (ઇન્ટરઇન્સાઇસલ અંતર - mm) માપવામાં આવે છે અને ભવિષ્યની પ્રગતિ નોંધવા માટે દસ્તાવેજીકરણ થાય છે."
                    : "Your existing interincisal mouth opening is measured and documented."}
                </p>
              </div>
            </div>

            {/* Step 3 - Standardized Card Shell */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-[#0D9488] text-white font-bold text-sm ml-0 md:mx-auto relative z-20 shadow">
                3
              </div>
              <div className="relative overflow-hidden bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 hover:scale-[1.01] text-left max-w-md ml-8 md:ml-0 flex-1">
                <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                <h4 className="font-sans font-bold text-[#081C3A] text-lg mb-1 group-hover:text-[#0D9488] transition-colors">
                  {isGujarati ? "મોઢાની સંપૂર્ણ તપાસ" : "Complete Oral Examination"}
                </h4>
                <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                  {isGujarati 
                    ? "અમે તમારા મોઢાની અંદરની ચામડી (oral mucosa), કડક બનેલા તાંતણા (fibrotic bands) અને શંકાસ્પદ ચાંદાનું ઝીણવટભર્યું ક્લિનિકલ મૂલ્યાંકન કરીએ છીએ."
                    : "We evaluate the oral mucosa, fibrotic areas and any suspicious lesions."}
                </p>
              </div>
              <div className="flex-1 hidden md:block" />
            </div>

            {/* Step 4 - Standardized Card Shell */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1 hidden md:block" />
              <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-[#0D9488] text-white font-bold text-sm ml-0 md:mx-auto relative z-20 shadow">
                4
              </div>
              <div className="relative overflow-hidden bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 hover:scale-[1.01] text-left max-w-md ml-8 flex-1">
                <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                <h4 className="font-sans font-bold text-[#081C3A] text-lg mb-1 group-hover:text-[#0D9488] transition-colors">
                  {isGujarati ? "જરૂરિયાત મુજબ ટેસ્ટ" : "Investigation When Required"}
                </h4>
                <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                  {isGujarati 
                    ? "તબીબી રૂપે જરૂર જણાતા ચોક્કસ કેસોમાં વધુ પરીક્ષણો અથવા બાયોપ્સી (biopsy) કરાવવાની ભલામણ કરવામાં આવે છે."
                    : "Additional investigations or biopsy may be recommended when clinically indicated."}
                </p>
              </div>
            </div>

            {/* Step 5 - Standardized Card Shell */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-[#0D9488] text-white font-bold text-sm ml-0 md:mx-auto relative z-20 shadow">
                5
              </div>
              <div className="relative overflow-hidden bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 hover:scale-[1.01] text-left max-w-md ml-8 md:ml-0 flex-1">
                <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                <h4 className="font-sans font-bold text-[#081C3A] text-lg mb-1 group-hover:text-[#0D9488] transition-colors">
                  {isGujarati ? "વ્યક્તિગત સારવાર પ્લાન" : "Personalized Treatment Plan"}
                </h4>
                <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                  {isGujarati 
                    ? "રોગના સ્ટેજ અને મોં ખુલવાની મર્યાદાના આધારે, તમારા માટે યોગ્ય દવા અથવા સર્જીકલ સારવારની સ્પષ્ટ ચર્ચા કરવામાં આવે છે."
                    : "Depending on the stage and functional limitation, conservative or surgical treatment is discussed."}
                </p>
              </div>
              <div className="flex-1 hidden md:block" />
            </div>

            {/* Step 6 - Standardized Card Shell */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1 hidden md:block" />
              <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-[#0D9488] text-white font-bold text-sm ml-0 md:mx-auto relative z-20 shadow">
                6
              </div>
              <div className="relative overflow-hidden bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 hover:scale-[1.01] text-left max-w-md ml-8 flex-1">
                <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                <h4 className="font-sans font-bold text-[#081C3A] text-lg mb-1 group-hover:text-[#0D9488] transition-colors">
                  {isGujarati ? "યોગ્ય દર્દીઓમાં સર્જરી" : "Surgery for Selected Advanced Cases"}
                </h4>
                <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                  {isGujarati 
                    ? "શારીરિક અક્ષમતાવાળા અત્યંત એડવાન્સ કેસોમાં, દર્દીની શારીરિક સુસંગતતા ચકાસીને મેક્સિલોફેશિયલ સર્જરીનું ચોકસાઈથી આયોજન થાય છે."
                    : "When indicated, surgery is planned according to the individual clinical condition."}
                </p>
              </div>
            </div>

            {/* Step 7 - Standardized Card Shell */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-[#0D9488] text-white font-bold text-sm ml-0 md:mx-auto relative z-20 shadow">
                7
              </div>
              <div className="relative overflow-hidden bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 hover:scale-[1.01] text-left max-w-md ml-8 md:ml-0 flex-1">
                <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                <h4 className="font-sans font-bold text-[#081C3A] text-lg mb-1 group-hover:text-[#0D9488] transition-colors">
                  {isGujarati ? "ફિઝિયોથેરાપી અને રિકવરી" : "Physiotherapy & Recovery"}
                </h4>
                <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                  {isGujarati 
                    ? "મોં ખોલવાની હલનચલન સુધારવા માટે સર્જરી પછી ફિઝિયોથેરાપી અને મોં ખુલવાની કસરતનો ખાસ હોમ પ્રોગ્રામ સમજાવવામાં આવે છે."
                    : "A structured postoperative mouth-opening program is explained."}
                </p>
              </div>
              <div className="flex-1 hidden md:block" />
            </div>

            {/* Step 8 - Standardized Card Shell */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1 hidden md:block" />
              <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-[#0D9488] text-white font-bold text-sm ml-0 md:mx-auto relative z-20 shadow">
                8
              </div>
              <div className="relative overflow-hidden bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 hover:scale-[1.01] text-left max-w-md ml-8 flex-1">
                <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                <h4 className="font-sans font-bold text-[#081C3A] text-lg mb-1 group-hover:text-[#0D9488] transition-colors">
                  {isGujarati ? "લાંબા ગાળાનું ફોલો-અપ" : "Long-Term Follow-Up"}
                </h4>
                <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                  {isGujarati 
                    ? "OSMF એ મોઢાની પ્રી-કેન્સરસ સ્થિતિ હોવાથી, રિકવરી પછી પણ મોઢાની લાંબા ગાળાની સુરક્ષા અને અકુદરતી બદલાવ પર નિયમિત નિરીક્ષણ અત્યંત મહત્વપૂર્ણ છે."
                    : "Because OSMF is a potentially malignant disorder, ongoing oral examination and surveillance remain important."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION #7: Risk / Expectations / Recovery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-14 border-t border-slate-200/60" id="expectations-recovery-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {isGujarati ? "સારવાર પછીની કાળજી" : "Honest expectations & recovery"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {isGujarati ? "સર્જરી એ OSMF સારવારનો માત્ર એક ભાગ છે" : "Surgery Is Only Part of OSMF Treatment"}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed text-center font-sans max-w-2xl mx-auto ${isGujarati ? 'text-[#0D9488] font-black' : 'text-[#0D9488] font-bold'}`}>
            {isGujarati ? "સર્જરી પછીની ફિઝિયોથેરાપી અત્યંત મહત્વપૂર્ણ છે" : "Postoperative Physiotherapy Is Extremely Important"}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        {/* Standardized Card Shell */}
        <div className="relative overflow-hidden max-w-4xl mx-auto bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 md:p-10 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 text-left space-y-6">
          <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
          <div className="space-y-3">
            <h3 className="font-sans font-bold text-[#081C3A] text-lg">
              {isGujarati ? "કસરત વગર મોં ફરી બંધ થઈ શકે છે" : "Importance of Exercise & Compliance"}
            </h3>
            <p className={`text-sm leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
              {isGujarati 
                ? "સારવારનો સૌથી મહત્વનો ભાગ સર્જરી પછી શરૂ થાય છે. દર્દીઓએ મોં ખોલવાની કસરતો અને ફિઝિયોથેરાપી પ્રોગ્રામનું ચુસ્તપણે પાલન કરવું જ પડશે. જો યોગ્ય પરેજી અને કસરતમાં બેદરકારી રાખવામાં આવે તો મોં ફરીથી બંધ થઈ શકે છે."
                : "One of the most important parts of treatment begins after surgery. Patients must follow the prescribed mouth-opening exercise and physiotherapy program. Without appropriate postoperative compliance, restriction can recur."}
            </p>
          </div>

          <div className="p-5 bg-[#081C3A] text-white rounded-xl text-center">
            <span className="text-xs uppercase tracking-widest font-bold opacity-80 block mb-2">
              {isGujarati ? "તેથી સફળ સારવાર માટે જરૂરી છે:" : "Successful management therefore requires:"}
            </span>
            <p className="text-sm sm:text-lg font-black tracking-tight">
              {isGujarati 
                ? "સર્જરી + વ્યસન મુક્તિ + ફિઝિયોથેરાપી + નિયમિત ચેક-અપ"
                : "Surgery + Habit Cessation + Physiotherapy + Follow-up"}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-sans font-bold text-[#081C3A] text-lg">
              {isGujarati ? "અમે માત્ર સર્જરી નથી કરતા. અમે રિકવરી સુધી માર્ગદર્શન આપીએ છીએ." : "We Don't Just Perform the Surgery. We Guide You Through the Recovery."}
            </h3>
            <p className={`text-sm leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
              {isGujarati
                ? "સારવારનો મૂળ ઉદ્દેશ્ય સર્જરી દરમિયાન મોં ખોલવાનો જ નથી, પરંતુ તમારી રિકવરી પછી કુદરતી રીતે તે ખુલવું જાળવી રાખવાનો છે. શસ્ત્રક્રિયા પહેલાં જ તમને રિકવરી, બળતરા, રિસ્ક અને પરિણામ વિશે સંપૂર્ણ પારદર્શક માહિતી આપવામાં આવે છે જેથી દર્દી માનસિક રીતે તૈયાર થઈ શકે."
                : "The objective of surgery is not simply to create a bigger mouth opening during the operation. The treatment aims to improve functional mouth opening and help the patient maintain that improvement through appropriate postoperative care and physiotherapy."}
            </p>
            <p className={`text-sm leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
              {isGujarati
                ? "દરેક દર્દીના કેસને આધારે શસ્ત્રક્રિયાનો યોગ્ય અભિગમ પસંદ કરવામાં આવે છે. શસ્ત્રક્રિયા દ્વારા કડક તાંતણા રિલીઝ કરી ખામી સુધારવા યોગ્ય ટેકનીક વાપરવામાં આવે છે, જેની પૂરી માહિતી તમારા સર્જન તમને ઓપરેશન પહેલા આપશે."
                : "The exact surgical procedure is selected according to the individual case. Treatment may involve surgical release of restrictive fibrous tissue and appropriate management of the resulting defect according to the clinical situation. Your surgeon will explain the planned procedure, expected benefits, limitations and possible complications before treatment."}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION #9: Why This Clinic / Doctor */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-14 border-t border-slate-200/60" id="why-clinic-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {isGujarati ? "અમારી હોસ્પિટલ શા માટે?" : "WHY PATEL DENTAL HOSPITAL"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {isGujarati ? "OSMF ના દર્દીઓ પટેલ ડેન્ટલ હોસ્પિટલ શા માટે પસંદ કરે છે?" : "Why Choose Patel Dental Hospital for OSMF?"}
          </h2>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
          {/* Box 1 - Standardized Card Shell */}
          <div className="relative overflow-hidden bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 hover:scale-[1.01] flex flex-col justify-start text-left">
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg mb-3 group-hover:text-[#0D9488] transition-colors">
              {isGujarati ? "ઝીણવટભર્યું ક્લિનિકલ મૂલ્યાંકન" : "Comprehensive Clinical Assessment"}
            </h3>
            <p className={`text-sm leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
              {isGujarati 
                ? "પટેલ ડેન્ટલ હોસ્પિટલ ખાતે, OSMF ના દર્દીઓની સારવાર અને રોગના નિરીક્ષણ બંને દૃષ્ટિકોણથી કાળજીપૂર્વક મૂલ્યાંકન કરવામાં આવે છે."
                : "At Patel Dental Hospital, OSMF patients are evaluated from both a functional and disease-monitoring perspective."}
            </p>
            <p className={`text-sm leading-relaxed mt-3 ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
              {isGujarati
                ? "જડબાની જકડન શા માટે છે, રોગ કયા સ્ટેજ પર છે, મોઢાની અંદર કોઈ શંકાસ્પદ બદલાવ છે કે કેમ અને દર્દીને સર્જરીની ચોક્કસ જરૂર છે કે કેમ તે બધી બાબતોની નિષ્ણાત મેક્સિલોફેશિયલ સર્જન દ્વારા તપાસ થાય છે."
                : "The vital questions we address: Why is the mouth opening restricted? What stage is the disease? Is there any suspicious mucosal change? Does this patient require surgery? How can the achieved mouth opening be maintained?"}
            </p>
          </div>

          {/* Box 2 - Standardized Card Shell */}
          <div className="relative overflow-hidden bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 hover:scale-[1.01] flex flex-col justify-start text-left">
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg mb-3 group-hover:text-[#0D9488] transition-colors">
              {isGujarati ? "યોગ્ય સારવારની પદ્ધતિ" : "Staged & Safe Treatment Planning"}
            </h3>
            <p className={`text-sm leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
              {isGujarati 
                ? "દર્દીઓનું કાળજીપૂર્વક પરીક્ષણ કરી ફાઇબ્રોસિસના આધારે નક્કી કરવામાં આવે છે કે કન્ઝર્વેટિવ દવાઓ કે સ્થાનિક ઇન્જેક્શન થેરાપી યોગ્ય રહેશે કે કોઈ ખાસ સર્જિકલ પદ્ધતિ."
                : "Patients are carefully evaluated to determine the severity of fibrosis, current mouth opening and whether non-surgical treatment or surgical management is appropriate."}
            </p>
            <p className={`text-sm leading-relaxed mt-3 ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
              {isGujarati
                ? "અમે કોઈ અપ્રમાણિત દાવાઓ કે ખાતરીઓ નથી આપતા, પણ સંપૂર્ણ આધુનિક ગાઈડલાઈન્સ મુજબ સ્ટાન્ડર્ડ સર્જીકલ અથવા નોન-સર્જીકલ રસ્તો બતાવીએ છીએ."
                : "We do not offer unsubstantiated or guaranteed outcomes; we apply standard clinical criteria to deliver highly predictable functional improvement."}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION #10: Technology / Investigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-14 border-t border-slate-200/60" id="technology-investigation-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Activity className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {isGujarati ? "તકનીકી સચોટતા" : "Diagnostic Technology"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {isGujarati ? "OSMF ના ડાયગ્નોસિસ માટે કઈ પદ્ધતિઓ વપરાય છે?" : "Diagnostic Protocols & Investigations"}
          </h2>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto pt-4">
          {/* Card 1 - Standardized Card Shell */}
          <div className="relative overflow-hidden bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 hover:scale-[1.01] cursor-pointer text-left">
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-[#0D9488] mb-4">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="font-sans font-bold text-[#081C3A] text-lg mb-2 group-hover:text-[#0D9488] transition-colors">
              {isGujarati ? "મોઢાની સંપૂર્ણ તપાસ" : "Complete Oral Examination"}
            </h3>
            <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
              {isGujarati 
                ? "અમે તમારા મોઢાની ચામડી (oral mucosa), ફાઇબ્રોટિક બેન્ડ અને કોઈપણ અકુદરતી ક્ષતિની સચોટ અને વિગતવાર તપાસ કરીએ છીએ."
                : "We evaluate the oral mucosa, fibrotic areas and any suspicious lesions."}
            </p>
          </div>

          {/* Card 2 - Standardized Card Shell */}
          <div className="relative overflow-hidden bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 hover:scale-[1.01] cursor-pointer text-left">
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-[#0D9488] mb-4">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="font-sans font-bold text-[#081C3A] text-lg mb-2 group-hover:text-[#0D9488] transition-colors">
              {isGujarati ? "જરૂરિયાત મુજબ ટેસ્ટ / બાયોપ્સી" : "Investigation When Required"}
            </h3>
            <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
              {isGujarati 
                ? "તબીબી રૂપે જો કોઈ પેશી અકુદરતી બદલાવ દર્શાવતી હોય, તો સુરક્ષા ખાતર બાયોપ્સી (biopsy) કરવાની ભલામણ થાય છે."
                : "Additional investigations or biopsy may be recommended when clinically indicated."}
            </p>
          </div>

          {/* Card 3 - Standardized Card Shell */}
          <div className="relative overflow-hidden bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 hover:scale-[1.01] cursor-pointer text-left">
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-[#0D9488] mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-sans font-bold text-[#081C3A] text-lg mb-2 group-hover:text-[#0D9488] transition-colors">
              {isGujarati ? "લાંબા ગાળાનું ફોલો-અપ" : "Long-Term Follow-Up"}
            </h3>
            <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
              {isGujarati 
                ? "OSMF એ મોઢાની પ્રી-કેન્સરસ (potentially malignant) મર્યાદા હોવાથી, નિયમિત ક્લિનિકલ સ્ક્રીનિંગ અને લાંબા ગાળાનું ફોલો-અપ અનિવાર્ય છે."
                : "Because OSMF is a potentially malignant disorder, ongoing oral examination and surveillance remain important."}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION #11: FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-14 border-t border-slate-200/60" id="faq-section">
        <div className="space-y-3 text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <HelpCircle className="h-3.5 w-3.5 text-[#0D9488]" />
            {isGujarati ? "વારંવાર પૂછાતા પ્રશ્નો" : "Frequently Asked Questions"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {isGujarati ? "OSMF અને મોં ખુલવાની મર્યાદા વિશે પ્રશ્નો" : "Frequently Asked Questions about OSMF"}
          </h2>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isExpanded = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white border border-[#E5EEF5] rounded-xl overflow-hidden shadow-sm hover:border-[#14B8A6] transition-all duration-200 text-left"
              >
                <button
                  onClick={() => setOpenFaqIndex(isExpanded ? null : idx)}
                  className="w-full flex items-center justify-between p-4 font-sans font-bold text-[#081C3A] text-sm sm:text-base leading-tight hover:bg-slate-50/50 transition-colors cursor-pointer text-left"
                >
                  <span>{faq.q}</span>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-[#0D9488] shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#081C3A]/60 shrink-0" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className={`px-4 pb-4 pt-1 border-t border-slate-100/50 text-xs sm:text-sm leading-relaxed font-sans whitespace-pre-wrap pl-11 ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* JSON-LD FAQPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })}
        </script>
      </section>

      {/* SECTION #12: Closing CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-14 border-t border-slate-200/60" id="closing-cta-section">
        <div className="bg-[#081C3A] text-white rounded-[32px] p-6 sm:p-10 md:p-16 relative overflow-hidden text-center max-w-5xl mx-auto shadow-xl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-teal-500/5 blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[60px]" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight">
              {isGujarati 
                ? "મોં ખુલવાની સતત વધતી જતી મર્યાદાને અવગણશો નહીં"
                : "Don't Let Progressive Mouth Restriction Control Your Daily Life"}
            </h2>
            <p className={`text-sm sm:text-base text-slate-300 font-sans leading-relaxed ${isGujarati ? 'font-semibold' : 'font-medium'}`}>
              {isGujarati 
                ? "જો મોં ખોલવામાં, ખાવા-પીવામાં, બ્રશ કરવામાં અથવા ડેન્ટલ સારવાર કરાવવામાં તકલીફ પડતી હોય, તો યોગ્ય ક્લિનિકલ મૂલ્યાંકન મેળવો."
                : "If opening your mouth, eating, brushing or receiving dental treatment has become difficult, get properly evaluated."}
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 text-slate-300 text-xs sm:text-sm font-sans space-y-2 text-left max-w-xl mx-auto">
              <span className="text-teal-400 font-black tracking-widest text-[10px] uppercase block">
                {isGujarati ? "સ્પેશિયાલિટી સારવાર" : "OSMF Treatment & Surgery in Rajkot"}
              </span>
              <p className="font-bold text-white text-base">
                Patel Dental Hospital
              </p>
              <p className="text-slate-300">
                Dr. Vipul Patel <span className="text-teal-300 font-semibold">(MDS – Oral & Maxillofacial Surgery)</span>
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <h4 className="font-sans font-bold text-teal-400 text-sm sm:text-base text-center">
                {isGujarati ? "તમારી જકડાઈ ગયેલી મોં ખુલવાની સ્થિતિ શા માટે છે તે જાણવું એ રિકવરીનું પહેલું પગલું છે." : "Your Mouth Opening Has Reduced. Your Next Step Is Finding Out Why—and What Can Be Done About It."}
              </h4>
              <p className={`text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-xl mx-auto text-center ${isGujarati ? 'font-semibold' : 'font-medium'}`}>
                {isGujarati 
                  ? "સોપારીની ખરાબ અસર સમજો, ફાઇબ્રોસિસના રોગનું સાચું સ્ટેજ જાણો અને મોં ખોલવાના યોગ્ય અને સ્ટાન્ડર્ડ ક્લિનિકલ રસ્તાઓની ચર્ચા કરો."
                  : "See your current mouth opening, understand the severity of OSMF and discuss the available treatment options with our team. Book your OSMF evaluation at Patel Dental Hospital, Rajkot."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <button
                onClick={() => openAppointmentModal('Book OSMF Consultation')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow transition-all duration-200 cursor-pointer"
              >
                <Calendar className="h-4.5 w-4.5" />
                <span>{isGujarati ? "OSMF કન્સલ્ટેશન બુક કરો" : "BOOK OSMF CONSULTATION"}</span>
              </button>
              
              <a
                href="tel:+919510397046"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs sm:text-sm font-bold transition-all duration-200"
              >
                <Phone className="h-4.5 w-4.5" />
                <span>{isGujarati ? "હમણાં કૉલ કરો" : "CALL NOW"}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold shadow transition-all duration-200"
              >
                <MessageCircle className="h-4.5 w-4.5" />
                <span>{isGujarati ? "WHATSAPP સંપર્ક" : "WHATSAPP US"}</span>
              </a>
            </div>

            <p className="text-[10px] text-slate-400 pt-6 italic max-w-2xl mx-auto leading-normal text-center">
              {isGujarati 
                ? "સારવારની સલાહ અને પરિણામ દર્દીની વાસ્તવિક તબીબી સ્થિતિ મુજબ બદલાય છે. ક્લિનિકલ ફોટા અથવા કેસો દર્દીઓના વ્યક્તિગત ક્લિનિકલ અનુભવો રજૂ કરે છે અને કોઈ એકસરખા સમાન પરિણામની ગેરંટી આપતા નથી."
                : "Treatment recommendations and outcomes vary according to the individual clinical condition. Before-and-after photographs and videos shown on this page represent actual individual patient experiences and do not guarantee identical results."}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION #13: Related Treatments */}
      {relatedServicesElement ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-14 border-t border-slate-200/60" id="related-treatments-section">
          {relatedServicesElement}
        </section>
      ) : (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-14 border-t border-slate-200/60" id="related-treatments-section">
          <div className="space-y-8 sm:space-y-10" id="cms-section-related-services">
            {/* Centered Badge, Heading & Teal Underline */}
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="flex justify-center">
                <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60 font-sans">
                  {isGujarati ? "સંબંધિત સારવાર" : "RELATED TREATMENTS"}
                </span>
              </div>
              <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight text-center">
                {isGujarati ? "સંબંધિત સારવાર" : "Related Treatments"}
              </h2>
              <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
            </div>

            {/* 3 Equal Treatment Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto items-stretch">
              {/* Card 1: Dental Implants */}
              <div
                onClick={() => handleNavigateToService('dental-implants')}
                className="bg-white border border-slate-200/80 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_16px_36px_rgba(8,28,58,0.1)] hover:border-[#14B8A6]/50 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
              >
                <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                  <img 
                    src={getServiceHeroImage ? getServiceHeroImage('dental-implants') : 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1786450851786_qnipnf0s.webp'} 
                    alt={isGujarati ? "ડેન્ટલ ઇમ્પ્લાન્ટ્સ" : "Dental Implants"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="font-sans font-bold text-lg sm:text-xl text-[#081C3A] group-hover:text-[#0D9488] transition-colors leading-snug tracking-tight">
                      {isGujarati ? "ડેન્ટલ ઇમ્પ્લાન્ટ્સ" : "Dental Implants"}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                      {isGujarati 
                        ? "સુરક્ષિત, સ્થિર અને કુદરતી દેખાતા ફિક્સ્ડ દાંત માટે પ્રીમિયમ ટાઇટેનિયમ રૂટ ઇમ્પ્લાન્ટ્સ દ્વારા કાયમી દાંતનું પુનઃસ્થાપન." 
                        : "Permanent tooth replacement utilizing premium titanium root implants for secure, stable, and natural-looking fixed teeth in one week."}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                    <span>{isGujarati ? "વિગતો જાણો" : "Learn Details"}</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </div>
                </div>
              </div>

              {/* Card 2: Full Mouth Rehabilitation */}
              <div
                onClick={() => handleNavigateToService('full-mouth-rehabilitation')}
                className="bg-white border border-slate-200/80 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_16px_36px_rgba(8,28,58,0.1)] hover:border-[#14B8A6]/50 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
              >
                <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                  <img 
                    src={getServiceHeroImage ? getServiceHeroImage('full-mouth-rehabilitation') : 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1784407618701_pcftuvyu.webp'} 
                    alt={isGujarati ? "ફુલ માઉથ રિહેબિલિટેશન" : "Full Mouth Rehabilitation"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="font-sans font-bold text-lg sm:text-xl text-[#081C3A] group-hover:text-[#0D9488] transition-colors leading-snug tracking-tight">
                      {isGujarati ? "ફુલ માઉથ રિહેબિલિટેશન" : "Full Mouth Rehabilitation"}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                      {isGujarati
                        ? "ઉપરના અને નીચેના બંને જડબામાં અનેક ખૂટતા, ક્ષતિગ્રસ્ત અથવા ગંભીર રીતે ઘસાઈ ગયેલા દાંત ધરાવતા દર્દીઓ માટે વ્યાપક સારવાર."
                        : "Comprehensive treatment for patients with multiple missing, damaged, or severely worn teeth across both upper and lower jaws."}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                    <span>{isGujarati ? "વિગતો જાણો" : "Learn Details"}</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </div>
                </div>
              </div>

              {/* Card 3: Wisdom Tooth Surgery */}
              <div
                onClick={() => handleNavigateToService('wisdom-tooth-surgery')}
                className="bg-white border border-slate-200/80 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_16px_36px_rgba(8,28,58,0.1)] hover:border-[#14B8A6]/50 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
              >
                <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                  <img 
                    src={getServiceHeroImage ? getServiceHeroImage('wisdom-tooth-surgery') : 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1784407897064_5jan06j9.webp'} 
                    alt={isGujarati ? "વિઝડમ ટૂથ સર્જરી" : "Wisdom Tooth Surgery"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="font-sans font-bold text-lg sm:text-xl text-[#081C3A] group-hover:text-[#0D9488] transition-colors leading-snug tracking-tight">
                      {isGujarati ? "વિઝડમ ટૂથ સર્જરી" : "Wisdom Tooth Surgery"}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isGujarati ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                      {isGujarati
                        ? "મેક્સિલોફેશિયલ સર્જન દ્વારા દર્દ વગર ઝડપી અને સુરક્ષિત રીતે ડહાપણની દાઢ કાઢવાની આધુનિક સારવાર."
                        : "Comfortable, painless, and precise wisdom tooth removal surgery performed by specialized maxillofacial surgeons."}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                    <span>{isGujarati ? "વિગતો જાણો" : "Learn Details"}</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
