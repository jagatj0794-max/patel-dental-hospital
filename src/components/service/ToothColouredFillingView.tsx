/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  Clock,
  ArrowRight,
  Phone,
  MessageCircle,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Cpu,
  FileText,
  HelpCircle,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MarketingConfig } from '../../types';
import { BeforeAfterSlider } from '../BeforeAfterSlider';
import { ClinicalCaseGallery } from '../ClinicalCaseGallery';
import { GooglePatientReviews } from '../GooglePatientReviews';
import { SurgicalTeamSection } from './SurgicalTeamSection';

export interface ToothColouredFillingViewProps {
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
}

export const ToothColouredFillingView: React.FC<ToothColouredFillingViewProps> = ({
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
  language
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleNavigateToService = (targetSlug: string) => {
    window.location.hash = `#services/${targetSlug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const whatsappNum = '919510397046';
  const whatsappText = language === 'gu'
    ? "નમસ્તે પટેલ ડેન્ટલ હોસ્પિટલ, મને દાંતમાં કેવિટી/તૂટેલા દાંતની સમસ્યા છે. હું દાંતના રંગની Composite Filling વિશે માહિતી મેળવવા માંગુ છું."
    : "Hello, I have a cavity/broken tooth. I want to know about tooth-coloured filling.";
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(whatsappText)}`;

  const symptoms = language === 'gu' ? [
    {
      id: 'sym-1',
      title: 'દેખાતા કાળા અથવા ભૂરા ડાઘ',
      description: 'દાંતની સપાટી પર દેખાતો કાળો અથવા ભૂરા રંગનો ડાઘ, જે ઘણીવાર શરૂઆતના સક્રિય સડા અથવા ચોક્કસ જગ્યાએ Enamel તૂટવાનું સૂચન કરે છે.'
    },
    {
      id: 'sym-2',
      title: 'ખોરાક અને તાપમાન પ્રત્યે હળવી સંવેદનશીલતા',
      description: 'મીઠી વસ્તુઓ, ગરમ પીણાં અથવા ખૂબ ઠંડો ખોરાક લેતી વખતે થોડા સમય માટે થતી હળવી સંવેદનશીલતા અથવા તીવ્ર પ્રતિક્રિયા.'
    },
    {
      id: 'sym-3',
      title: 'વારંવાર ખોરાક ફસાઈ જવો',
      description: 'ચોક્કસ દાંતના ગેપ અથવા જગ્યામાં વારંવાર ખોરાક ફસાઈ જવો, જે દાંતના કુદરતી Enamelના આકારમાં સંભવિત નુકસાન દર્શાવે છે.'
    },
    {
      id: 'sym-4',
      title: 'દેખાતો તૂટેલો ભાગ અથવા કેવિટીનો કિનારો',
      description: 'દાંતમાં નાનું તૂટવું, ખરબચડું કિનારું અથવા નાનું ખાડા જેવું છિદ્ર, જેને તમે જીભથી સીધું અનુભવી શકો.'
    }
  ] : [
    {
      id: 'sym-1',
      title: 'Visible Black or Brown Spots',
      description: 'A black or brown spot you can see on a tooth surface, which often indicates early active decay or localized enamel breakdown.'
    },
    {
      id: 'sym-2',
      title: 'Mild Food & Temperature Sensitivity',
      description: 'Brief, minor sensitivity or sharp reaction when eating sweet treats, hot beverages, or very cold foods.'
    },
    {
      id: 'sym-3',
      title: 'Persistent Food Trapping',
      description: 'Food consistently getting wedged or stuck in a specific tooth gap or spot, indicating a potential loss of natural enamel contours.'
    },
    {
      id: 'sym-4',
      title: 'A Visible Chip or Cavity Edge',
      description: 'A minor fracture, rough edge, or a small crater-like hole that you can feel directly with your tongue.'
    }
  ];

  const pricingItems = language === 'gu' ? [
    {
      title: 'સિંગલ સરફેસ Composite Filling',
      description: 'એક જ દાંતની સપાટી પરની નાની અને સપાટી પરની કેવિટી માટે સામાન્ય દાંતના રંગની રેસ્ટોરેશન.',
      price: 'કિંમત માટે સંપર્ક કરો'
    },
    {
      title: 'મલ્ટી-સરફેસ Composite Filling',
      description: 'બે અથવા વધુ સડેલી સપાટીઓને આવરી લેતી રેસ્ટોરેશન, જે દાંતના કાર્યાત્મક Bite Contoursને પુનઃસ્થાપિત કરે છે.',
      price: 'કિંમત માટે સંપર્ક કરો'
    },
    {
      title: 'આગળના દાંતની Cosmetic Filling',
      description: 'આગળના દાંતના તૂટેલા ભાગ, ગેપ અથવા દેખાતા સડા માટે ચોક્કસ રંગ સાથે મેળ ખાતું Composite Bonding.',
      price: 'કિંમત માટે સંપર્ક કરો'
    },
    {
      title: 'Composite Core Buildup',
      description: 'વધારે સડી ગયેલા અથવા તૂટેલા દાંત માટે દાંતની રચનાને મજબૂત કરવા માટેની Composite Foundation Restoration.',
      price: 'વધુ વિગતો માટે સંપર્ક કરો'
    }
  ] : [
    {
      title: 'Single Surface Composite Filling',
      description: 'Standard tooth-coloured restoration for small superficial cavities on a single tooth surface.',
      price: 'Contact Us for Pricing'
    },
    {
      title: 'Multi-Surface Composite Filling',
      description: 'Restoration covering two or more decayed surfaces, restoring functional bite contours.',
      price: 'Contact Us for Pricing'
    },
    {
      title: 'Anterior Cosmetic Filling',
      description: 'Precision shade-matched composite bonding for front teeth chips, gaps, or visible decay.',
      price: 'Contact Us for Pricing'
    },
    {
      title: 'Composite Core Buildup',
      description: 'Structural composite foundation restoration for extensively decayed or fractured teeth.',
      price: 'Contact Us for Details'
    }
  ];

  const faqs = language === 'gu' ? [
    {
      q: "દાંતના રંગની Filling કેટલો સમય ચાલે છે?",
      a: "Composite Fillingનું આયુષ્ય સામાન્ય રીતે કેટલાક વર્ષોથી લઈને એક દાયકા (૧૦ વર્ષ) સુધીનું હોઈ શકે છે. આ કેવિટીના કદ અને સ્થાન, ચાવવાના દબાણ, ખાવા-પીવાની ટેવો અને રોજિંદી મૌખિક સ્વચ્છતા પર આધારિત છે."
    },
    {
      q: "શું આ Filling મારા કુદરતી દાંતના રંગ સાથે મેળ ખાશે?",
      a: "હા, Composite Resin કુદરતી દાંતના વિવિધ રંગોમાં ઉપલબ્ધ હોય છે. અમે તમારા કુદરતી Enamel સાથે સામગ્રીનો ચોક્કસ શેડ મેચ કરીએ છીએ જેથી તે બિલકુલ કુદરતી અને અદ્રશ્ય લાગે."
    },
    {
      q: "શું દાંતના રંગની Filling એક જ મુલાકાતમાં પૂર્ણ થઈ જાય છે?",
      a: "હા, મોટાભાગના તબીબી રીતે યોગ્ય કેસોમાં, સામાન્ય Composite Filling માત્ર એક જ મુલાકાતમાં સંપૂર્ણપણે પૂર્ણ થઈ જાય છે."
    },
    {
      q: "શું Composite Filling કરાવતી વખતે દુખાવો થાય છે?",
      a: "આ પ્રક્રિયા ખૂબ જ આરામદાયક છે. તમને કોઈ પણ જાતનો દુખાવો ન થાય અને તમે આરામથી સારવાર કરાવી શકો તે માટે જરૂર પડે ત્યાં યોગ્ય લોકલ એનેસ્થેસિયાનો ઉપયોગ કરવામાં આવે છે."
    },
    {
      q: "શું તૂટેલા કે ચિપ થયેલા દાંત માટે આ Fillingનો ઉપયોગ થઈ શકે?",
      a: "હા, આગળના કે પાછળના તૂટેલા અથવા સહેજ ચિપ થયેલા દાંતને પુનઃસ્થાપિત કરવા માટે Composite Bonding એ એક ઉત્તમ અને સુરક્ષિત વિકલ્પ છે."
    },
    {
      q: "શું Composite સારવારથી દાંત વચ્ચેની નાની જગ્યા (ગેપ) બંધ કરી શકાય?",
      a: "હા, તબીબી રીતે યોગ્ય હોય ત્યારે, દાંતને સહેજ પણ ઘસ્યા વિના, આગળના દાંત વચ્ચેની નાની જગ્યા (ગેપ) પૂરી કરવા અને સ્માઇલ સુંદર બનાવવા માટે Composite Resin સીધું જ લગાવી શકાય છે."
    },
    {
      q: "જો હું કેવિટીની સારવારમાં વિલંબ કરું તો શું થાય?",
      a: "સારવારમાં વિલંબ કરવાથી સડો દાંતના અંદરના સ્તરો (Dentin અને Pulp) સુધી વધી શકે છે, જેના કારણે આગળ જતાં Root Canal અથવા Crown જેવી વધુ જટિલ અને ખર્ચાળ સારવાર કરાવવી પડી શકે છે."
    },
    {
      q: "દાંતના રંગની Filling કરાવવાનો ખર્ચ કેટલો થાય છે?",
      a: "તેનો ખર્ચ કયા દાંતમાં કેવિટી છે, કેવિટીનું કદ કેટલું છે અને કેટલી સપાટી પર રેસ્ટોરેશનની જરૂર છે તેના પર આધાર રાખે છે. વિગતવાર ક્લિનિકલ તપાસ પછી અમે તમને સ્પષ્ટ કિંમત જણાવીશું."
    }
  ] : [
    {
      q: "How long does a tooth-coloured filling last?",
      a: "The lifespan of a composite filling typically ranges from several years to a decade. This depends on factors such as cavity size and location, individual bite forces, dietary habits, and daily oral hygiene care."
    },
    {
      q: "Will the filling match my natural tooth colour?",
      a: "Yes, composite resins are available in a wide spectrum of natural tooth shades. We carefully shade-match the material to your natural enamel to ensure a virtually invisible, seamless restoration."
    },
    {
      q: "Is a tooth-coloured filling completed in one visit?",
      a: "Yes, in most clinically suitable cases, a standard composite filling is completed entirely in a single comfortable visit."
    },
    {
      q: "Does getting a composite filling hurt?",
      a: "The procedure is highly comfortable. We use appropriate local anaesthesia where needed to keep you relaxed and ensure a completely pain-free treatment experience."
    },
    {
      q: "Can a tooth-coloured filling be used for a chipped tooth?",
      a: "Yes, composite bonding is an excellent, conservative option to restore chipped or minor fractures on anterior or posterior teeth, when clinically suitable."
    },
    {
      q: "Can composite treatment close a small gap between teeth?",
      a: "Yes, when clinically appropriate, composite resin can be layered directly to close minor gaps (diastemas) and improve aesthetics without any tooth reduction."
    },
    {
      q: "What happens if I delay treatment for a cavity?",
      a: "Delaying treatment allows active decay to progress deeper into the inner tooth layers (dentin and pulp), potentially requiring more extensive and costly treatments like root canals or crowns."
    },
    {
      q: "How much does a tooth-coloured filling cost?",
      a: "The cost depends on the tooth involved, the size of the cavity, and the number of surfaces requiring restoration. We provide clear, itemized pricing after a detailed clinical assessment."
    }
  ];

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Hero Section */}
      <div id="service-hero-section">
        {heroElement}
      </div>

      {/* Symptom Qualification Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6" id="symptom-qualification-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#0D9488]" />
            {language === 'gu' ? "લક્ષણોની ઓળખ" : "Symptom Qualification"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "જો તમને આ લક્ષણો હોય તો તમને Fillingની જરૂર પડી શકે છે:" : "You probably need a filling if:"}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed text-center font-sans max-w-2xl mx-auto ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "દાંતમાં સક્રિય સડો અથવા દાંતની રચનાને થયેલા નુકસાનના આ સામાન્ય સંકેતો તપાસો અને જાણો કે શરૂઆતમાં સરળ Composite Fillingથી તમારી સમસ્યા દૂર થઈ શકે છે કે નહીં."
              : "Review these common signs of active tooth decay or structure loss to see if a simple composite filling can resolve your concern early."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto pt-4">
          {symptoms.map((sym) => (
            <div
              key={sym.id}
              onClick={() => openAppointmentModal(`Filling Check - Symptom: ${sym.title}`)}
              className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 hover:scale-[1.01] cursor-pointer overflow-hidden flex flex-col h-full text-left"
            >
              <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <div className="space-y-3">
                <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight leading-tight group-hover:text-[#0D9488] transition-colors">
                  {sym.title}
                </h3>
                <p className={`text-sm leading-relaxed font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                  {sym.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Surgical Team Section */}
      <SurgicalTeamSection setCurrentPage={setCurrentPage} />

      {/* Option Comparison Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6" id="option-comparison-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "વિકલ્પોની સરખામણી" : "Option Comparison"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "વહેલી Filling વિરુદ્ધ મોડું સારવાર કરાવવું" : "Early Filling vs. Delayed Treatment"}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed text-center font-sans max-w-2xl mx-auto ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "સમયસર સારવાર કેવી રીતે તમારા કુદરતી દાંતની રચનાને બચાવે છે અને પછી વધુ જટિલ સારવારની જરૂરિયાતને ટાળી શકે છે તેની સરખામણી કરો."
              : "Compare how timely intervention saves your natural tooth structure and prevents the need for more complex treatment later."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="max-w-7xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {language === 'gu' ? "પરિબળ / ક્લિનિકલ સ્થિતિ" : "Factor / Clinical Condition"}
                  </th>
                  <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3 relative">
                    <div className="flex items-center justify-between gap-2">
                      <span>{language === 'gu' ? "શરૂઆતની કેવિટી / હળવો સડો" : "Early Cavity / Minor Decay"}</span>
                      <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest whitespace-nowrap">
                        {language === 'gu' ? "યોગ્ય સમય" : "Optimal Time"}
                      </span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {language === 'gu' ? "ઊંડી કેવિટી / નસની સંડોવણી" : "Deep Cavity / Nerve Involvement"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "ભલામણ કરેલ સારવાર" : "Recommended Care"}
                  </td>
                  <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-900 font-semibold'}`}>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>{language === 'gu' ? "દાંતના રંગની Composite Filling" : "Tooth-Coloured Composite Filling"}</span>
                    </div>
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "Root Canal Treatment અને Crown (તપાસ પર આધારિત)" : "Root Canal Treatment & Crown (assessment dependent)"}
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "સારવારનો સમયગાળો" : "Procedure Duration"}
                  </td>
                  <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-900 font-semibold'}`}>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>{language === 'gu' ? "યોગ્ય કેસમાં એક જ મુલાકાત" : "Single visit for suitable cases"}</span>
                    </div>
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "Root Canal અને Crown માટે સામાન્ય રીતે 1 થી 2 મુલાકાત" : "Typically 1 to 2 visits for root canal and crowning"}
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "કુદરતી દાંત પર અસર" : "Impact on Natural Tooth"}
                  </td>
                  <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-900 font-semibold'}`}>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>{language === 'gu' ? "કુદરતી દાંતની રચના અને Enamelને મહત્તમ પ્રમાણમાં જાળવી રાખે છે" : "Preserves maximum natural structure & enamel"}</span>
                    </div>
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "દાંતને બચાવવા માટે સંક્રમિત નસના ટિશ્યુને દૂર કરવામાં આવે છે" : "Infected nerve tissue is removed to save the tooth shell"}
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "સારવારની જટિલતા" : "Procedure Complexity"}
                  </td>
                  <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-900 font-semibold'}`}>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>{language === 'gu' ? "ઓછામાં ઓછી હસ્તક્ષેપવાળી સપાટી પરની રેસ્ટોરેશન" : "Minimally invasive superficial restoration"}</span>
                    </div>
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "Micro-endodontic કેનાલની સફાઈ અને દાંતની રચનાને સીલ કરવી" : "Micro-endodontic canal cleaning and structural seal"}
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "ખર્ચ સંબંધિત બાબતો" : "Cost Implications"}
                  </td>
                  <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-900 font-semibold'}`}>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>{language === 'gu' ? "કિંમત માટે સંપર્ક કરો (ખર્ચની દૃષ્ટિએ ખૂબ જ અસરકારક)" : "Contact Us for Pricing (Highly cost-effective)"}</span>
                    </div>
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "Root Canal અને Full Crown માટે વધુ બજેટની જરૂર પડી શકે છે" : "Requires higher budget for root canal and full crown"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. TREATMENT-MATCHED PROOF */}
      {/* 1. Before & After Gallery */}
      {mConfig?.show_before_after !== false && beforeAfterPairs && beforeAfterPairs.length > 0 && (
        <section id="filling-before-after-gallery" className="space-y-6 sm:space-y-10 pt-5 sm:pt-10 border-t border-slate-200/60 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-3 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
              <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              {language === 'gu' ? "પરિણામના પુરાવા • સારવાર પહેલાં અને પછીના ફોટા" : "TREATMENT-MATCHED PROOF \u2022 Before & After Gallery"}
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              {language === 'gu' ? "Composite Filling પહેલાં અને પછીના પરિણામો" : (seoHeadings?.transformations || "Tooth Coloured Filling Transformations")}
            </h2>
            <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
              {language === 'gu' ? "દાંતના રંગની Filling કરાવેલા અમારા દર્દીઓના વાસ્તવિક સ્માઇલ ટ્રાન્સફોર્મેશન જુઓ." : (mConfig?.before_after_description || "See real smile transformations of our tooth-coloured filling patients.")}
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
                  caption={pair.caption || pair.title}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. Clinical Case Gallery */}
      {mConfig?.show_gallery !== false && displayGallery && displayGallery.length > 0 && (
        <div className="border-t border-slate-200/60 pt-5 sm:pt-10 max-w-7xl mx-auto px-4 sm:px-6" id="filling-clinical-gallery">
          <ClinicalCaseGallery
            heading={language === 'gu' ? "કોમ્પોઝિટ ફિલિંગના ક્લિનિકલ કેસની ગેલેરી" : (seoHeadings?.caseGallery || "Clinical Case Gallery")}
            description={language === 'gu' ? "અમારા સફળ કોમ્પોઝિટ ફિલિંગ ટ્રીટમેન્ટના વાસ્તવિક ક્લિનિકલ કેસ અને પરિણામો જુઓ." : mConfig?.gallery_description}
            items={Array.isArray(mConfig?.gallery_items) ? mConfig?.gallery_items : displayGallery}
            singleGallery={true}
          />
        </div>
      )}

      {mConfig?.show_testimonials !== false && testimonialsElement && (
        <div className="border-t border-slate-200/60 max-w-7xl mx-auto px-4 sm:px-6" id="filling-testimonial-reels">
          {testimonialsElement}
        </div>
      )}

      {/* 5. Google Patient Reviews */}
      {mConfig?.show_google_reviews !== false && (
        <div className="border-t border-slate-200/60 pt-5 sm:pt-10 max-w-7xl mx-auto px-4 sm:px-6" id="filling-google-reviews">
          <GooglePatientReviews
            heading={language === 'gu' ? "કોમ્પોઝિટ ફિલિંગ માટે દર્દીઓની Google Reviews" : (seoHeadings?.reviews || "Google Patient Reviews")}
            reviews={Array.isArray(mConfig?.google_reviews) ? mConfig?.google_reviews : []}
          />
        </div>
      )}

      {/* Transparent Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6" id="transparent-pricing-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "પારદર્શક કિંમતો" : "TRANSPARENT PRICING"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "દાંતના રંગની Fillingની કિંમતો" : "Tooth Coloured Filling Pricing"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "અમારી કિંમતો સીધી અને પારદર્શક છે, જે દાંતના સડાની ગંભીરતા અને Composite Restorationની જરૂરિયાત ધરાવતી સપાટીઓ પર આધારિત છે."
              : "Our pricing is direct and structured based on the extent of tooth decay and the surfaces requiring composite restoration."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="max-w-4xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {language === 'gu' ? "સારવાર" : "Treatment"}
                  </th>
                  <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {language === 'gu' ? "કિંમત" : "Price"}
                  </th>
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {language === 'gu' ? "સારવારમાં શું સામેલ છે" : "What It Includes"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                {pricingItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                      {item.title}
                    </td>
                    <td className={`p-4 sm:p-5 font-bold bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#0D9488]'}`}>
                      {item.price}
                    </td>
                    <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className={`text-xs sm:text-sm max-w-xl font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
              {language === 'gu'
                ? "તમારી અંતિમ સારવારની યોગ્યતા, વિકલ્પો અને ખર્ચ વિશે તમારી ક્લિનિકલ તપાસ દરમિયાન ક્લિનિકમાં સ્પષ્ટ ચર્ચા કરવામાં આવશે."
                : "Your final treatment suitability, choices, and costs will be discussed clearly with the clinic during your clinical examination."}
            </p>
            <button
              onClick={() => openAppointmentModal('Tooth Coloured Filling Pricing')}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans animate-none"
            >
              <Calendar className="h-4 w-4 shrink-0" />
              <span>{language === 'gu' ? "સારવારની યોગ્યતા અને કિંમત વિશે ચર્ચા કરો" : "Discuss Suitability & Pricing"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6" id="timeline-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Clock className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "સારવારનો સમયગાળો" : "TREATMENT TIMELINE"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "Composite Fillingની પ્રક્રિયાનો સમયગાળો" : "Composite Filling Timeline"}
          </h2>
          <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "યોગ્ય કેસમાં Composite Fillingની સારવાર એક જ મુલાકાતમાં પૂર્ણ થઈ શકે છે. અહીં દર્દીની સામાન્ય સારવાર પ્રક્રિયા દર્શાવવામાં આવી છે."
              : "Composite filling treatment can be completed in a single visit for suitable cases. Here is the direct patient journey."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative">
            {/* Horizontal connector line on desktop/tablet */}
            <div className="hidden md:block absolute top-[36px] left-[16.6%] right-[16.6%] h-[2px] bg-[#5eead4] z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                  1
                </div>
                <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                  {language === 'gu' ? "સડો દૂર કરવો અને તૈયારી" : "Decay Removal & Prep"}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed max-w-[240px] font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                  {language === 'gu'
                    ? "હાઇ-ઇલ્યુમિનેશન (લાઇટ) હેઠળ, સડેલા Enamelને ચોક્કસાઈથી સાફ કરવામાં આવે છે જેથી સારવાર માટે યોગ્ય પાયો તૈયાર કરી શકાય."
                    : "Under high illumination, the decayed enamel is precisely cleaned away to prepare a clean foundation."}
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                  2
                </div>
                <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                  {language === 'gu' ? "કેમિકલ લેયરિંગ અને શેડ મેચ" : "Chemical Layering & Shade Match"}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed max-w-[240px] font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                  {language === 'gu'
                    ? "તમારા દાંતના ચોક્કસ રંગ સાથે મેળ ખાતી USમાં બનેલી Composite સામગ્રીને કસ્ટમ-લેયર કરવામાં આવે છે, જે દાંત સાથે રાસાયણિક રીતે જોડાઈ જાય છે."
                    : "US-made composite matching your precise tooth shade is custom-layered, bonding chemically to the tooth."}
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[72px] h-[72px] rounded-full bg-[#0D9488] border-2 border-[#0D9488] flex items-center justify-center text-white font-bold text-xl mb-5 shadow-md">
                  3
                </div>
                <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                  {language === 'gu' ? "આકાર આપવો અને મજબૂત કરવું" : "Sculpting & Curing"}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed max-w-[240px] font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                  {language === 'gu'
                    ? "Fillingને તમારા Bite સાથે મેળ ખાતો યોગ્ય આકાર આપવામાં આવે છે, બ્લુ લાઇટની મદદથી તેને તરત જ મજબૂત કરવામાં આવે છે અને પછી પોલિશ કરવામાં આવે છે."
                    : "The filling is shaped perfectly to match your bite, cured instantly with blue light-activation, and polished."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Reversal / Honest Risk Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 sm:pt-10 border-t border-slate-200/60" id="warranty-reassurance-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "ભરોસો અને પારદર્શિતા" : "REASSURANCE & TRANSPARENCY"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "પ્રામાણિક માર્ગદર્શન અને દર્દીની સુરક્ષા" : "Honest Guidance & Patient Safety"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "અમે સંપૂર્ણ તબીબી પ્રામાણિકતા સાથે કામ કરીએ છીએ. Composite Filling એ એક ઉત્તમ અને દાંતને બચાવતી પ્રક્રિયા છે, પરંતુ તેની સફળતા ચોક્કસ નિદાન પર આધારિત છે."
              : "We operate with complete clinical honesty. A composite filling is an exceptional, conservative procedure, but its success depends on careful diagnosis."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
          {/* Point 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "આયુષ્ય સંબંધિત બાબતો" : "Lifespan Considerations"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "Fillingનું આયુષ્ય તેના કદ અને સ્થાન, બાઇટ ફોર્સ (ચાવવાનું દબાણ), ખાવા-પીવાની ટેવો અને રોજિંદી મૌખિક સ્વચ્છતા જેવા પરિબળો પર આધાર રાખે છે. તે ટકાઉ છે પરંતુ તેને નિયમિત સ્વચ્છતાની જરૂર રહે છે."
                : "The lifespan of a filling depends on factors such as the size and location of the filling, bite forces, dietary habits, and daily oral care. They are durable but require routine hygiene."}
            </p>
          </div>

          {/* Point 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "તપાસ આધારિત યોગ્યતા" : "Assessment-Driven Suitability"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "દરેક દાંત માટે Filling આપમેળે યોગ્ય હોતી નથી. ક્લિનિકલ તપાસ દ્વારા યોગ્ય સારવાર નક્કી કરવામાં આવે છે. જો સડો ખૂબ ઊંડો હોય, તો Root Canal કરાવવાની સલાહ આપવામાં આવશે."
                : "A filling is not automatically appropriate for every tooth. Clinical assessment determines the appropriate treatment. If decay is too deep, a root canal will be advised."}
            </p>
          </div>

          {/* Point 3 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "સારવાર દરમિયાન આરામ અને વિલંબના જોખમો" : "Procedure Comfort & Delay Risks"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "સારવારને આરામદાયક બનાવવા માટે જ્યાં જરૂર હોય ત્યાં લોકલ એનેસ્થેસિયાનો ઉપયોગ કરી શકાય છે. જો સારવાર ન કરવામાં આવે તો સડો વધુ ઊંડે સુધી વધી શકે છે, તેથી સમયસર તપાસ કરાવવાથી સમસ્યા ગંભીર બને તે પહેલાં યોગ્ય સારવાર નક્કી કરવામાં મદદ મળે છે."
                : "Local anaesthesia may be used where needed to keep the procedure comfortable. Decay can progress deeper if left untreated, so early assessment helps identify the right treatment before severity increases."}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Procedure Video */}
      {mConfig?.show_procedure_video !== false && videoElement && (
        <div className="border-t border-slate-200/60 max-w-7xl mx-auto px-4 sm:px-6" id="filling-procedure-video">
          {videoElement}
        </div>
      )}

      {/* ================================================== */}
      {/* SECTION 8: Why Patel Dental / Why This Doctor      */}
      {/* ================================================== */}
      <section id="filling-why-patel-dental" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-20 pt-5 sm:pt-10 border-t border-slate-200/60">
        <div className="space-y-6 sm:space-y-10">
          <div className="space-y-3 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 mx-auto font-sans">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              {language === 'gu' ? "તબીબી ઉત્કૃષ્ટતા" : "CLINICAL EXCELLENCE"}
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              {language === 'gu' ? "તમારા દાંતની Filling માટે શા માટે પટેલ ડેન્ટલ હોસ્પિટલ પસંદ કરવી" : "Why Choose Patel Dental Hospital for Your Filling"}
            </h2>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            {/* Card 1 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                {language === 'gu' ? "કુદરતી દેખાતી રેસ્ટોરેશન" : "Natural-Looking Restoration"}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                {language === 'gu'
                  ? "અમારી Composite Fillings તમારા દાંતના ચોક્કસ રંગ અને પારદર્શકતા સાથે મેળ ખાય તે રીતે કાળજીપૂર્વક પસંદ કરીને લેયર કરવામાં આવે છે, જે તમને કુદરતી અને મેટલ-મુક્ત ફિનિશ આપે છે."
                  : "Our composite fillings are carefully selected and layered to match the exact shade and translucency of your tooth, offering a seamless, metal-free finish."}
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                {language === 'gu' ? "દાંત બચાવવાનો અભિગમ" : "Tooth-Saving Approach"}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                {language === 'gu'
                  ? "અમારો મુખ્ય હેતુ તમારા કુદરતી Enamelને બચાવવાનો છે. પરંપરાગત સિલ્વર (ચાંદીની) Fillingની સરખામણીમાં Composite Resin માટે દાંતને ઓછો ઘસવો પડે છે, જેથી તમારો અસલી દાંત વધુ સુરક્ષિત રહે છે."
                  : "We focus on preserving your natural enamel. Composite resin requires less tooth preparation than traditional silver fillings, keeping more of your tooth intact."}
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                {language === 'gu' ? "સ્પષ્ટ સારવાર અને કિંમતો" : "Clear Treatment & Pricing"}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                {language === 'gu'
                  ? "અમે સંપૂર્ણ પારદર્શિતામાં વિશ્વાસ રાખીએ છીએ. સારવાર શરૂ કરતા પહેલાં જ તમને કેવિટીના કદના આધારે પ્રમાણભૂત અને સ્પષ્ટ કિંમતો સાથેનો સારવાર પ્લાન આપવામાં આવશે."
                  : "We believe in complete transparency. You will receive a clear treatment plan with standard, upfront pricing based on the cavity size before we begin."}
              </p>
            </div>

            {/* Card 4 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                {language === 'gu' ? "ચોક્કસ તબીબી નિદાન" : "Tailored Clinical Diagnosis"}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                {language === 'gu'
                  ? "અમારી ટીમ દરેક કેવિટીનું વ્યક્તિગત રીતે મૂલ્યાંકન કરે છે જેથી સામાન્ય અંદાજ લગાવવાને બદલે માત્ર તબીબી રીતે યોગ્ય હોય ત્યારે જ Composite Fillingની ભલામણ કરવામાં આવે."
                  : "Our team evaluates each cavity individually to recommend a composite filling only when it is clinically appropriate, rather than making broad assumptions."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 9: Technology — Patient Benefit            */}
      {/* ================================================== */}
      <section id="filling-tech-benefit" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-20 pt-5 sm:pt-10 border-t border-slate-200/60">
        <div className="space-y-6 sm:space-y-10">
          <div className="space-y-3 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 mx-auto font-sans">
              <Cpu className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              {language === 'gu' ? "અદ્યતન ડેન્ટલ ટેકનોલોજી" : "DENTAL TECHNOLOGY"}
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              {language === 'gu' ? "ટકાઉ અને આકર્ષક અદ્યતન સામગ્રી" : "Durable & Aesthetic Advanced Materials"}
            </h2>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
            {/* Tech Card 1 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                {language === 'gu' ? "USમાં બનેલી Composite સામગ્રી" : "US-Made Composite Material"}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                {language === 'gu'
                  ? "અમે મજબૂત રેસ્ટોરેશન માટે ઉચ્ચ ગુણવત્તાની, USમાં બનેલી Composite Resin સામગ્રીનો ઉપયોગ કરીએ છીએ. આ સામગ્રીમાં બિલકુલ મેટલ હોતું નથી, જે પેઢાની નજીક કાળા ડાઘ અથવા કાળી લાઇન થવાનું જોખમ દૂર કરે છે."
                  : "We use high-grade, US-made composite resin materials for robust restoration density. These materials contain zero metals, eliminating the risk of dark margins or black lines near the gums."}
              </p>
            </div>

            {/* Tech Card 2 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                {language === 'gu' ? "કેમિકલ બોન્ડિંગ ઇન્ટિગ્રેશન" : "Chemical Bonding Integration"}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                {language === 'gu'
                  ? "પરંપરાગત સામગ્રીથી વિપરીત, Composite તમારા દાંતની રચના સાથે રાસાયણિક રીતે જોડાય છે. આ બાકીના દાંતને મજબૂત અને સુરક્ષિત બનાવે છે, જેના કારણે કેવિટી સાફ કરતી વખતે દાંતનો અસલી ભાગ ઓછો ઘસવો પડે છે."
                  : "Unlike traditional materials, composite bonds chemically to your tooth structure. This secures and reinforces the remaining tooth, allowing for highly conservative, tooth-preserving cavity prep."}
              </p>
            </div>

            {/* Tech Card 3 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                {language === 'gu' ? "ચોક્કસ શેડ મેચિંગ" : "Precision Shade Matching"}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                {language === 'gu'
                  ? "અમે Composite Resinને તમારા દાંતના વિશિષ્ટ શેડ સાથે બરાબર મેળવીએ છીએ. મજબૂત થયા પછી આ Filling તમારા દાંતના કુદરતી રંગ અને ચમક સાથે એકરૂપ થઈ જાય છે, જેથી તે કોઈને પણ દેખાતી નથી."
                  : "We match the composite resin precisely to your unique tooth shade. The cured filling matches the natural color and shine of your teeth, rendering it completely invisible to others."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 10: FAQ + FAQPage Schema                   */}
      {/* ================================================== */}
      <section id="filling-faq-section" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-20 pt-5 sm:pt-10 border-t border-slate-200/60">
        <div className="space-y-6 sm:space-y-10" id="filling-faq-list">
          {/* Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="flex justify-center">
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60">
                {language === 'gu' ? "COMPOSITE FILLING FAQ" : "COMPOSITE FILLING FAQ"}
              </span>
            </div>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight">
              {language === 'gu' ? "દાંતના રંગની Filling વિશે વારંવાર પૂછાતા પ્રશ્નો" : "Frequently Asked Questions About Tooth Coloured Fillings"}
            </h2>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
          </div>

          {/* Accordion List */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => {
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
                        <div className={`px-5 sm:px-6 pb-6 pt-0 border-t border-slate-100 text-sm sm:text-[15px] font-normal leading-relaxed whitespace-pre-wrap font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
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
            "mainEntity": [
              {
                "q": "How long does a tooth-coloured filling last?",
                "a": "The lifespan of a composite filling typically ranges from several years to a decade. This depends on factors such as cavity size and location, individual bite forces, dietary habits, and daily oral hygiene care."
              },
              {
                "q": "Will the filling match my natural tooth colour?",
                "a": "Yes, composite resins are available in a wide spectrum of natural tooth shades. We carefully shade-match the material to your natural enamel to ensure a virtually invisible, seamless restoration."
              },
              {
                "q": "Is a tooth-coloured filling completed in one visit?",
                "a": "Yes, in most clinically suitable cases, a standard composite filling is completed entirely in a single comfortable visit."
              },
              {
                "q": "Does getting a composite filling hurt?",
                "a": "The procedure is highly comfortable. We use appropriate local anaesthesia where needed to keep you relaxed and ensure a completely pain-free treatment experience."
              },
              {
                "q": "Can a tooth-coloured filling be used for a chipped tooth?",
                "a": "Yes, composite bonding is an excellent, conservative option to restore chipped or minor fractures on anterior or posterior teeth, when clinically suitable."
              },
              {
                "q": "Can composite treatment close a small gap between teeth?",
                "a": "Yes, when clinically appropriate, composite resin can be layered directly to close minor gaps (diastemas) and improve aesthetics without any tooth reduction."
              },
              {
                "q": "What happens if I delay treatment for a cavity?",
                "a": "Delaying treatment allows active decay to progress deeper into the inner tooth layers (dentin and pulp), potentially requiring more extensive and costly treatments like root canals or crowns."
              },
              {
                "q": "How much does a tooth-coloured filling cost?",
                "a": "The cost depends on the tooth involved, the size of the cavity, and the number of surfaces requiring restoration. We provide clear, itemized pricing after a detailed clinical assessment."
              }
            ].map((item) => ({
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
      {/* SECTION 11: Closing CTA                            */}
      {/* ================================================== */}
      <section id="filling-closing-cta" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-20 pt-5 sm:pt-10">
        <div className="bg-[#081C3A] text-white border border-[#1E293B] rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 md:p-16 relative overflow-hidden text-center space-y-6 shadow-xl">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#0D9488]/10 blur-[80px] pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D9488]/20 border border-[#0D9488]/40 text-[#2DD4BF] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="h-3.5 w-3.5 text-[#2DD4BF] shrink-0" />
              {language === 'gu' ? "દાંતના સડાને વધતો અટકાવો" : "PREVENT DEEPER DENTAL DECAY"}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.1] max-w-2xl mx-auto">
              {language === 'gu' ? "દાંતમાં કેવિટીની સમસ્યા છે?" : "Got an Unresolved Cavity?"}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium font-sans">
              {language === 'gu'
                ? "સક્રિય સડો આપમેળે ક્યારેય ઠીક થતો નથી. સમયસર સુરક્ષિત અને દાંત બચાવતી Composite Filling કરાવવાથી કુદરતી Enamel બચે છે અને ભવિષ્યમાં મોટી સારવારની જરૂરિયાત ટળે છે."
                : "Active decay does not heal on its own. Addressing it early with a safe, conservative tooth-coloured filling preserves maximum natural enamel and helps avoid more extensive treatments down the road."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 relative z-10 pt-4">
            <a
              href="tel:+919510397046"
              className="w-full sm:w-auto px-8 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group text-decoration-none"
            >
              <Phone className="h-4.5 w-4.5 group-hover:rotate-12 transition-transform" />
              <span>{language === 'gu' ? "કોલ કરો +91 9510397046" : "Call +91 9510397046"}</span>
              <ArrowRight className="h-4 w-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              onClick={() => openAppointmentModal('Tooth Coloured Filling Closing CTA')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="h-4.5 w-4.5" />
              <span>{language === 'gu' ? "તપાસ માટે એપોઇન્ટમેન્ટ બુક કરો" : "Book Assessment"}</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 text-decoration-none"
            >
              <MessageCircle className="h-4.5 w-4.5 fill-white text-[#25D366]" />
              <span>{language === 'gu' ? "WhatsApp કરો" : "WhatsApp Us"}</span>
            </a>
          </div>

          <div className="pt-2">
            <p className="text-xs text-slate-400 font-medium font-sans">
              {language === 'gu' ? (
                <>
                  તમારા દાંતની સારવાર આરામદાયક રીતે કરાવો. અમારા ડેન્ટલ કોઓર્ડિનેટર સાથે સીધી વાત કરો: <a href="tel:+919510397046" className="text-white hover:text-[#2DD4BF] underline transition-colors font-bold">+91 9510397046</a>.
                </>
              ) : (
                <>
                  Restore your tooth comfortably. Speak directly to our dental coordinators at <a href="tel:+919510397046" className="text-white hover:text-[#2DD4BF] underline transition-colors font-bold">+91 9510397046</a>.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 12: Related Treatments                     */}
      {/* ================================================== */}
      <section id="filling-related-treatments" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-20 pt-5 sm:pt-10 pb-8">
        <div className="space-y-8 sm:space-y-10" id="cms-section-related-services">
          {/* Centered Badge, Heading & Teal Underline */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="flex justify-center">
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60">
                {language === 'gu' ? "સંબંધિત સારવારો" : "RELATED TREATMENTS"}
              </span>
            </div>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight">
              {language === 'gu' ? "અન્ય સંબંધિત સારવારો" : "Related Treatments"}
            </h2>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
          </div>

          {/* Related Treatment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">
            {/* Card 1: Single Sitting Root Canal */}
            <div
              onClick={() => handleNavigateToService('root-canal-treatment')}
              className="bg-white border border-slate-200/80 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_16px_36px_rgba(8,28,58,0.1)] hover:border-[#14B8A6]/50 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
            >
              <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                <img 
                   src={getServiceHeroImage ? getServiceHeroImage('root-canal-treatment') : "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=600"} 
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
                  <p className={`text-xs sm:text-sm leading-relaxed font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                    {language === 'gu'
                      ? "દાંતનો અસહ્ય દુખાવો? માત્ર એક જ આરામદાયક સેસનમાં પૂર્ણ થતી Single Sitting Root Canal થેરાપીથી ત્વરિત રાહત મેળવો."
                      : "Unbearable tooth pain? Get instant relief with single-sitting root canal therapy completed in just one comfortable session."}
                  </p>
                </div>
                <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                  <span>{language === 'gu' ? "વિગતો જાણો" : "Learn Details"}</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </div>
              </div>
            </div>

            {/* Card 2: Dental Implants */}
            <div
              onClick={() => handleNavigateToService('dental-implants')}
              className="bg-white border border-slate-200/80 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_16px_36px_rgba(8,28,58,0.1)] hover:border-[#14B8A6]/50 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
            >
              <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                <img 
                  src={getServiceHeroImage ? getServiceHeroImage('dental-implants') : "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=600"} 
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
                  <p className={`text-xs sm:text-sm leading-relaxed font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                    {language === 'gu'
                      ? "મજબૂત, સ્થિર અને કુદરતી દેખાતા કાયમી દાંત માટે પ્રીમિયમ ટાઇટેનિયમ રૂટ ઇમ્પ્લાન્ટ્સ સાથે દાંતનું કાયમી રિપ્લેસમેન્ટ."
                      : "Permanent tooth replacement utilizing premium titanium root implants for secure, stable, and natural-looking fixed teeth."}
                  </p>
                </div>
                <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                  <span>{language === 'gu' ? "વિગતો જાણો" : "Learn Details"}</span>
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
