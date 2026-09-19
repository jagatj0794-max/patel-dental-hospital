/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Heart, 
  Briefcase, 
  Award, 
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Scale,
  Timer,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  ArrowRight,
  Shield
} from 'lucide-react';
import { BeforeAfterSlider } from '../BeforeAfterSlider';
import { ClinicalCaseGallery } from '../ClinicalCaseGallery';
import { GooglePatientReviews } from '../GooglePatientReviews';
import { SurgicalTeamSection } from './SurgicalTeamSection';

export interface TeethWhiteningViewProps {
  heroElement: React.ReactNode;
  openAppointmentModal: (preselectedTreatment?: string) => void;
  videoElement: React.ReactNode;
  testimonialsElement: React.ReactNode;
  mConfig: any;
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
  smileMakeoverHeroImage?: string;
  invisibleAlignersHeroImage?: string;
  toothColouredFillingHeroImage?: string;
  setCurrentPage?: (page: string) => void;
  language?: string;
}

export const TeethWhiteningView: React.FC<TeethWhiteningViewProps> = ({
  heroElement,
  openAppointmentModal,
  videoElement,
  testimonialsElement,
  mConfig,
  beforeAfterPairs,
  displayGallery,
  seoHeadings,
  smileMakeoverHeroImage,
  invisibleAlignersHeroImage,
  toothColouredFillingHeroImage,
  setCurrentPage,
  language = 'en'
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const occasions = [
    {
      id: 'wedding',
      title: language === 'gu' ? 'તમારા લગ્નનો દિવસ' : 'Your Wedding Day',
      badge: 'Wedding Milestone',
      description: language === 'gu'
        ? 'લગ્નનના દરેક ફોટોગ્રાફમાં તમારી સ્માઇલ સુંદર રીતે ઉજળી અને નિખાલસ દેખાય તેની ખાતરી કરો. દુલ્હન, વરરાજા અને લગ્નમાં સુંદર દેખાવા ઇચ્છતા સમગ્ર પરિવાર અથવા પાર્ટી માટે યોગ્ય.'
        : 'Ensure your smile is beautifully bright and flawless in every wedding photograph. Perfect for brides, grooms, and the entire wedding party wishing to look their best.',
      icon: Heart,
      color: 'from-pink-500/10 to-rose-500/10',
      iconColor: 'text-rose-500',
    },
    {
      id: 'interview',
      title: language === 'gu' ? 'જોબ ઇન્ટરવ્યૂ' : 'Job Interviews',
      badge: 'Career Success',
      description: language === 'gu'
        ? 'પહેલી મુલાકાતથી જ આત્મવિશ્વાસ, ક્ષમતા અને પ્રોફેશનલ અભિગમ દર્શાવો. તેજસ્વી સ્માઇલ સ્પર્ધાત્મક જોબ ઇન્ટરવ્યૂ દરમિયાન લાંબા સમય સુધી સકારાત્મક અસર છોડી શકે છે.'
        : 'Project confidence, competence, and a warm professionalism from the very first greeting. A bright smile leaves a lasting positive impression during competitive hiring rounds.',
      icon: Briefcase,
      color: 'from-blue-500/10 to-indigo-500/10',
      iconColor: 'text-indigo-600',
    },
    {
      id: 'events',
      title: language === 'gu' ? 'ખાસ સામાજિક પ્રસંગો' : 'Special Social Events',
      badge: 'Social Milestone',
      description: language === 'gu'
        ? 'રીયુનિયન, ગાલા, જાહેર કાર્યક્રમો અને જીવનના મહત્વપૂર્ણ ઉજવણીના પ્રસંગોમાં સુંદર, ઉજળી અને આકર્ષક દેખાવ સાથે શ્રેષ્ઠ દેખાઓ.'
        : 'Look your absolute best for reunions, galas, public speaking engagements, and major life celebrations with a polished, beautifully radiant appearance.',
      icon: Award,
      color: 'from-amber-500/10 to-orange-500/10',
      iconColor: 'text-amber-500',
    },
    {
      id: 'daily',
      title: language === 'gu' ? 'દૈનિક સ્વ-સંભાળ માટેનો આત્મવિશ્વાસ' : 'Daily Self-Care Boost',
      badge: 'Personal Wellness',
      description: language === 'gu'
        ? 'તમારા દૈનિક સ્વ-છબી અને આત્મવિશ્વાસમાં તરત જ સકારાત્મક વધારો અનુભવો. ઝડપી, સુરક્ષિત અને સુંદર રીતે ઉજળી સ્માઇલ સાથે તમારા રોજિંદા વ્યક્તિત્વને વધુ નિખારો.'
        : 'Experience an immediate lift in your daily self-image and lifestyle confidence. Elevate your everyday style with a fast, safe, and beautifully bright aesthetic enhancement.',
      icon: Clock,
      color: 'from-emerald-500/10 to-teal-500/10',
      iconColor: 'text-emerald-500',
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <div id="service-hero-section">
        {heroElement}
      </div>

      {/* Occasions / Milestones Section */}
      <section id="teeth-whitening-occasions" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            {language === 'gu' ? "યોગ્ય સમય અને ખાસ પ્રસંગો" : "OPTIMAL TIMING & MOMENTS"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "દાંત સફેદ કરવાની સારવાર માટેના ખાસ પ્રસંગો" : "Perfect Occasions for Teeth Whitening"}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed text-center font-sans max-w-2xl mx-auto ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "દેખીતી રીતે વધુ ઉજળી સ્માઇલ મહત્વપૂર્ણ વ્યક્તિગત અને વ્યવસાયિક પ્રસંગો પહેલાં તમારો આત્મવિશ્વાસ વધારવાનો એક સરળ અને અસરકારક માર્ગ છે."
              : "A visibly brighter smile is a simple, highly effective way to elevate your confidence before key personal and professional milestones."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        {/* 4-Column Responsive Grid with exactly matching card design */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto pt-8 px-4 sm:px-6">
          {occasions.map((occ) => {
            return (
              <div
                key={occ.id}
                onClick={() => openAppointmentModal(`Teeth Whitening - Occasion: ${occ.title}`)}
                className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left"
              >
                {/* Left accent line */}
                <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                
                <div className="space-y-4 flex flex-col flex-1">
                  <div className="space-y-2 flex-1 flex flex-col">
                    <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[23px] tracking-tight leading-tight group-hover:text-[#0D9488] transition-colors">
                      {occ.title}
                    </h3>
                    <p className={`text-[14px] sm:text-[15px] leading-[1.6] flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                      {occ.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Surgical Team Section */}
      <SurgicalTeamSection setCurrentPage={setCurrentPage} />

      {/* SECTION 3: Treatment / Option Comparison */}
      <section id="teeth-whitening-comparison-section" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Scale className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "સારવારની સરખામણી" : "TREATMENT COMPARISON"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "દાંત સફેદ કરવાના વિકલ્પોની સરખામણી કરો" : "Compare Your Teeth Whitening Options"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "અમારા સુરક્ષિત અને ઝડપી ઇન-ક્લિનિક વ્હાઇટનિંગ અને અનુકૂળ હોમ વ્હાઇટનિંગ કિટ્સ વચ્ચેના તબીબી અને વ્યવહારિક તફાવતોને સમજો."
              : "Understand the clinical and practical differences between our safe, rapid in-clinic treatment and convenient take-home whitening kits."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="max-w-7xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {language === 'gu' ? "ખાસિયત / પરિબળ" : "Feature / Factor"}
                  </th>
                  <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3 relative">
                    <div className="flex items-center justify-between gap-2">
                      <span>{language === 'gu' ? "ઇન-ક્લિનિક પ્રોફેશનલ વ્હાઇટનિંગ" : "In-Clinic Professional Whitening"}</span>
                      <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                        {language === 'gu' ? "ભલામણ કરેલ" : "Recommended"}
                      </span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {language === 'gu' ? "હોમ વ્હાઇટનિંગ કિટ" : "Take-Home Whitening Kit"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "સારવારનું સ્થાન" : "Treatment Location"}
                  </td>
                  <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-900 font-semibold'}`}>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>
                        {language === 'gu'
                          ? "દંત ચિકિત્સકની સીધી દેખરેખ હેઠળ ક્લિનિકમાં કરવામાં આવે છે"
                          : "Performed in-clinic under direct dental supervision"}
                      </span>
                    </div>
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu'
                      ? "પ્રોફેશનલ ડેન્ટિસ્ટના માર્ગદર્શન હેઠળ ઘરે જાતે ઉપયોગ કરી શકાય છે"
                      : "Self-applied at home following professional clinician guidance"}
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "જરૂરી એપોઇન્ટમેન્ટ" : "Required Appointments"}
                  </td>
                  <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-900 font-semibold'}`}>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>
                        {language === 'gu'
                          ? "માત્ર એક જ આરામદાયક ક્લિનિકલ એપોઇન્ટમેન્ટ"
                          : "One single comfortable clinical appointment"}
                      </span>
                    </div>
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu'
                      ? "કસ્ટમાઇઝ્ડ હોમ વ્હાઇટનિંગ કિટ પ્રિસ્ક્રાઇબ કરવા માટે કન્સલ્ટેશન"
                      : "Consultation to supply/prescribe the customized home whitening kit"}
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "સારવારનો સમયગાળો" : "Procedure Duration"}
                  </td>
                  <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-900 font-semibold'}`}>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>
                        {language === 'gu'
                          ? "માત્ર 30 મિનિટનું ઝડપી અને પ્રોફેશનલ સારવાર સત્ર"
                          : "Rapid 30-minute professional treatment session"}
                      </span>
                    </div>
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu'
                      ? "દંત ચિકિત્સકના માર્ગદર્શન મુજબ ઘરે નિયમિત સત્રોમાં ઉપયોગ"
                      : "Applied in home sessions as directed by your dentist"}
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "પરિણામ ક્યારે દેખાય?" : "Results Visibility"}
                  </td>
                  <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-900 font-semibold'}`}>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>
                        {language === 'gu'
                          ? "સારવાર પછી તરત જ દેખીતું પરિણામ"
                          : "Immediate visible result right after the treatment"}
                      </span>
                    </div>
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu'
                      ? "સારવારના સમયગાળા દરમિયાન ધીમે-ધીમે શેડમાં સુધારો"
                      : "Gradual shade improvement over the course of treatment"}
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "સુરક્ષા અને પ્રમાણપત્રો" : "Safety & Certifications"}
                  </td>
                  <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-900 font-semibold'}`}>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>
                        {language === 'gu'
                          ? "CE અને FDA-મંજૂર સિસ્ટમ્સ; દંતવલ્ક (એનામેલ) માટે સંપૂર્ણ સુરક્ષિત"
                          : "CE & FDA-approved systems; fully enamel-safe"}
                      </span>
                    </div>
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu'
                      ? "દંતવલ્ક માટે સુરક્ષિત, પ્રોફેશનલ-ગ્રેડ સિસ્ટમ્સ જે ઘરેલુ ઉપયોગ માટે મંજૂર છે"
                      : "Enamel-safe, professional-grade systems approved for gentle home use"}
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "દર્દીને સંવેદનશીલતા (ઝણઝણાટી)" : "Patient Sensitivity"}
                  </td>
                  <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-900 font-semibold'}`}>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>
                        {language === 'gu'
                          ? "મોટાભાગના દર્દીઓમાં સંવેદનશીલતા થતી નથી; ક્લિનિકલ દેખરેખ હેઠળ સારવાર"
                          : "No sensitivity for most patients; monitored clinically"}
                      </span>
                    </div>
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu'
                      ? "ઘરેલુ ઉપયોગ દરમિયાન નહિવત અને અસ્થાયી સંવેદનશીલતા રહે તે રીતે નિર્મિત"
                      : "Formulated to ensure minimal, temporary sensitivity during home use"}
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
        <section id="teeth-whitening-before-after-gallery" className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-3 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
              <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              {language === 'gu' ? "પરિણામના પુરાવા • સારવાર પહેલાં અને પછીના ફોટા" : "TREATMENT-MATCHED PROOF \u2022 Before & After Gallery"}
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              {language === 'gu' ? "દાંત સફેદ કરવાની સારવારના અદભુત પરિણામો" : (seoHeadings?.transformations || "Teeth Whitening Transformations")}
            </h2>
            <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
              {language === 'gu' ? "અમારા દર્દીઓની સ્માઇલના વાસ્તવિક પરિણામો અહીં જુઓ." : (mConfig?.before_after_description || "See real smile transformations of our teeth whitening patients.")}
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
                  caption={language === 'gu' ? "પરિણામ પહેલા અને પછી" : (pair.caption || pair.title)}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. Clinical Case Gallery */}
      {mConfig?.show_gallery !== false && displayGallery && displayGallery.length > 0 && (
        <div className="border-t border-slate-200/60 pt-6 sm:pt-14 max-w-7xl mx-auto px-4 sm:px-6" id="teeth-whitening-clinical-gallery">
          <ClinicalCaseGallery
            heading={language === 'gu' ? "તબીબી સારવાર ગેલેરી" : (seoHeadings?.caseGallery || "Clinical Case Gallery")}
            description={language === 'gu' ? "અહીં અમારા નિષ્ણાત તબીબો દ્વારા કરવામાં આવેલી વાસ્તવિક સારવારના પરિણામો જુઓ." : mConfig?.gallery_description}
            items={Array.isArray(mConfig?.gallery_items) ? mConfig?.gallery_items : displayGallery}
            singleGallery={true}
          />
        </div>
      )}

      {mConfig?.show_testimonials !== false && testimonialsElement && (
        <div className="border-t border-slate-200/60 max-w-7xl mx-auto px-4 sm:px-6" id="teeth-whitening-testimonial-reels">
          {testimonialsElement}
        </div>
      )}

      {/* 5. Google Patient Reviews */}
      {mConfig?.show_google_reviews !== false && (
        <div className="border-t border-slate-200/60 pt-6 sm:pt-14 max-w-7xl mx-auto px-4 sm:px-6" id="teeth-whitening-google-reviews">
          <GooglePatientReviews
            heading={language === 'gu' ? "દર્દીઓના ગુગલ રિવ્યુઝ" : (seoHeadings?.reviews || "Google Patient Reviews")}
            reviews={Array.isArray(mConfig?.google_reviews) ? mConfig?.google_reviews : []}
          />
        </div>
      )}

      {/* SECTION 4: Transparent Pricing */}
      <section id="teeth-whitening-pricing-section" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "પારદર્શક કિંમતો" : "TRANSPARENT PRICING"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "દાંત સફેદ કરવાની સારવારનો ખર્ચ" : "Teeth Whitening Cost & Pricing"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "અમે સારવારના વિકલ્પો વિશે સંપૂર્ણ સ્પષ્ટતા પ્રદાન કરીએ છીએ. યોગ્ય સારવારની પસંદગી કરવા અને વધુ માહિતી માટે અમારી મેડિકલ ટીમ સાથે વાત કરો."
              : "We provide absolute clarity on treatment options. Speak with our clinical team to discuss suitability and get full details."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="max-w-4xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[540px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {language === 'gu' ? "સારવારનો વિકલ્પ" : "Treatment Option"}
                  </th>
                  <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {language === 'gu' ? "કિંમત" : "Price"}
                  </th>
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {language === 'gu' ? "મુખ્ય ફાયદો" : "Key Benefit"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "ઇન-ક્લિનિક પ્રોફેશનલ વ્હાઇટનિંગ" : "In-Clinic Professional Whitening"}
                  </td>
                  <td className={`p-4 sm:p-5 font-bold bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#0D9488]'}`}>
                    {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                  </td>
                  <td className={`p-4 sm:p-5 font-medium ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700'}`}>
                    {language === 'gu' ? "માત્ર 30 મિનિટના સત્રમાં તરત જ દેખીતું પરિણામ" : "Immediate visible results in a 30-minute session"}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "હોમ વ્હાઇટનિંગ કિટ" : "Take-Home Whitening Kit"}
                  </td>
                  <td className={`p-4 sm:p-5 font-bold bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#0D9488]'}`}>
                    {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                  </td>
                  <td className={`p-4 sm:p-5 font-medium ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700'}`}>
                    {language === 'gu' ? "ઘરે સરળતાથી ઉપયોગ કરવા માટે ડેન્ટિસ્ટ દ્વારા સૂચવવામાં આવેલી સિસ્ટમ્સ" : "Professional systems prescribed for convenient home use"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className={`text-xs sm:text-sm font-sans max-w-xl ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
              {language === 'gu'
                ? "તમારી અંતિમ સારવારની યોગ્યતા, વિકલ્પો અને ખર્ચની ચર્ચા ક્લિનિકલ તપાસ દરમિયાન ક્લિનિકમાં વિગતવાર અને સ્પષ્ટ રીતે કરવામાં આવશે."
                : "Your final treatment suitability, choices, and costs will be discussed clearly with the clinic during your clinical examination."}
            </p>
            <button
              onClick={() => openAppointmentModal('Teeth Whitening')}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
            >
              <Calendar className="h-4 w-4 shrink-0" />
              <span>{language === 'gu' ? "યોગ્યતા અને કિંમતની ચર્ચા કરો" : "Discuss Suitability & Pricing"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: Treatment Timeline */}
      <section id="teeth-whitening-timeline-section" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[28px] sm:rounded-[36px] p-6 sm:p-12 lg:p-14 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
          <div className="space-y-3 max-w-2xl mx-auto text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 mx-auto font-sans">
              <Timer className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              {language === 'gu' ? "સારવારનો સમયગાળો" : "TREATMENT TIMELINE"}
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              {language === 'gu' ? "દાંત સફેદ કરવાની સારવારનો સમયગાળો" : "Your Teeth Whitening Timeline"}
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-normal'}`}>
              {language === 'gu'
                ? "તમારા સ્માઇલને સુંદર અને તેજસ્વી બનાવવાની પ્રક્રિયા ખૂબ જ સરળ, ઝડપી અને તમારા મુખના સ્વાસ્થ્યની સુરક્ષાને ધ્યાનમાં રાખીને બનાવવામાં આવી છે."
                : "Achieving a brighter smile is simple, fast, and structured carefully to protect your safety and oral health."}
            </p>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
          </div>

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
                  {language === 'gu' ? "કન્સલ્ટેશન અને યોગ્યતા" : "Consultation & Suitability"}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                  {language === 'gu'
                    ? "તમારા લક્ષ્યોની ચર્ચા, શેડનું મૂલ્યાંકન અને દાંત સફેદ કરવાની યોગ્યતા ચકાસવા માટે ડેન્ટલ તપાસ."
                    : "Discussion of your goals, shade assessment, and dental checkup to confirm whitening suitability."}
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                  2
                </div>
                <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                  {language === 'gu' ? "ઇન-ક્લિનિક પ્રોફેશનલ વ્હાઇટનિંગ" : "In-Clinic Professional Whitening"}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                  {language === 'gu'
                    ? "માત્ર એક જ મુલાકાતમાં આશરે ૩૦ મિનિટની અત્યંત સુરક્ષિત અને પ્રોફેશનલ ઇન-ક્લિનિક સારવાર."
                    : "Safe in-clinic procedure taking approximately 30 minutes in a single appointment."}
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[72px] h-[72px] rounded-full bg-[#0D9488] border-2 border-[#0D9488] flex items-center justify-center text-white font-bold text-xl mb-5 shadow-md">
                  3
                </div>
                <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                  {language === 'gu' ? "તરત જ દેખીતું પરિણામ" : "Immediate Visible Result"}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                  {language === 'gu'
                    ? "સારવાર પૂરી થતાં જ તરત જ મેળવો સુંદર અને તેજસ્વી દાંત અને સારવાર પછીની સંપૂર્ણ કાળજી માટેનું માર્ગદર્શન."
                    : "Walk out with immediately visible brighter teeth and complete post-treatment guidance."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Risk Reversal / Patient Reassurance */}
      <section id="teeth-whitening-reassurance-section" className="space-y-6 sm:space-y-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "દર્દીની સુરક્ષા અને ખાતરી" : "PATIENT REASSURANCE & SAFETY"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "તમારા દાંતને તેજસ્વી બનાવવાનો સુરક્ષિત માર્ગ" : "Your Comfortable Path to a Brighter Smile"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "અમારી દરેક સારવાર દર્દીની સુરક્ષા અને આરામને ધ્યાનમાં રાખીને પસંદ કરવામાં આવે છે. અમે પ્રમાણિત અને શ્રેષ્ઠ પરિણામ આપતી સિસ્ટમ્સનો ઉપયોગ કરીએ છીએ."
              : "Our treatments are selected with patient safety and comfort in mind. We use recognized, certified systems designed for reliable care."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
          {/* Point 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "CE અને FDA-મંજૂર સિસ્ટમ્સ" : "CE & FDA-Approved Systems"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "અમે સારવાર દરમિયાન ક્લિનિકલ સુરક્ષા જાળવવા માટે ફક્ત વિશ્વાસપાત્ર, CE અને FDA-મંજૂર વ્હાઇટનિંગ સિસ્ટમ્સનો જ ઉપયોગ કરીએ છીએ."
                : "We exclusively utilize professionally trusted, CE and FDA-approved whitening systems to guarantee standard clinical safety during application."}
            </p>
          </div>

          {/* Point 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "દંતવલ્ક (એનામેલ) માટે સુરક્ષિત સારવાર" : "Enamel-Safe Treatments"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "દાંત સફેદ કરવાની આ સિસ્ટમ્સ કુદરતી દંતવલ્કને સુરક્ષિત રાખવા માટે અને ઘસારો કે નુકસાન ન થાય તે રીતે કાળજીપૂર્વક નિર્મિત છે."
                : "Whitening systems are carefully structured to protect and keep natural tooth enamel completely safe, avoiding dental abrasion or structural damage."}
            </p>
          </div>

          {/* Point 3 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "મોટાભાગના દર્દીઓને કોઈ ઝણઝણાટી થતી નથી" : "No Sensitivity for Most Patients"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "મોટાભાગના દર્દીઓને કોઈ પણ પ્રકારની સંવેદનશીલતા વગર સુંદર પરિણામ મળે છે. ખૂબ જ સંવેદનશીલ દાંત ધરાવતા લોકો માટે વૈકલ્પિક હોમ-કિટ્સ ઉપલબ્ધ છે."
                : "Most patients achieve beautiful shade enhancement with no sensitivity. For those with pre-existing conditions, take-home kits are available as a gentle alternative option."}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Procedure Video */}
      {mConfig?.show_procedure_video !== false && videoElement && (
        <div className="border-t border-slate-200/60 max-w-7xl mx-auto px-4 sm:px-6" id="teeth-whitening-procedure-video">
          {videoElement}
        </div>
      )}

      {/* 8. Why Patel Dental / Why This Doctor */}
      <section id="teeth-whitening-why-patel-section" className="space-y-6 sm:space-y-10 pt-10 sm:pt-16 border-t border-slate-200/60 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Shield className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "ક્લિનિકલ ફાયદા" : "CLINICAL ADVANTAGE"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "દાંત સફેદ કરવા માટે પટેલ ડેન્ટલ હોસ્પિટલ શા માટે પસંદ કરવી?" : "Why Choose Patel Dental Hospital For Teeth Whitening?"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "અમે તમારા વ્યસ્ત સમયપત્રકને અનુરૂપ અને દંતવલ્ક સુરક્ષિત રાખતી સારવાર દ્વારા સુંદર, ચમકદાર અને આત્મવિશ્વાસસભર પરિણામો આપવા પર ધ્યાન કેન્દ્રિત કરીએ છીએ."
              : "We focus on providing safe, enamel-protective whitening treatments that fit your schedule and produce reliable, bright, and confident results."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pt-4">
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "નિષ્ણાત તબીબોની દેખરેખ હેઠળ વ્હાઇટનિંગ" : "Clinically Supervised Whitening"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "દાંત સફેદ કરવાની સારવાર સીધી ક્લિનિકમાં અનુભવી દંત ચિકિત્સકોની દેખરેખ હેઠળ થાય છે, જેથી પેઢામાં બળતરા કે અસમાન પરિણામોનો ભય રહેતો નથી."
                : "Your whitening is directly monitored and applied in-clinic by trained dental professionals, preventing the uneven results or gum irritation common with commercial kits."}
            </p>
          </div>

          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "દંતવલ્ક-સુરક્ષિત પ્રમાણિત સિસ્ટમ્સ" : "Enamel-Safe Certified Systems"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "અમે ફક્ત CE અને FDA-મંજૂર વ્હાઇટનિંગ સિસ્ટમ્સનો ઉપયોગ કરીને તમારા દાંતના કુદરતી બંધારણ અને દંતવલ્કની સુરક્ષા સુનિશ્ચિત કરીએ છીએ."
                : "We protect your natural tooth structure by utilizing exclusively CE & FDA-approved whitening systems designed to guard enamel safety completely."}
            </p>
          </div>

          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "વિશેષ પ્રસંગો માટે એક જ મુલાકાતમાં ઝડપી સારવાર" : "Rapid One-Visit Occasion Setup"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "લગ્ન પ્રસંગ કે કારકિર્દીના મહત્વના પ્રસંગો માટે, માત્ર ૩૦ મિનિટનું ઇન-ક્લિનિક વ્હાઇટનિંગ એક જ મુલાકાતમાં આકર્ષક સ્માઇલ પ્રદાન કરે છે."
                : "Perfect for patients preparing for marriages or career events, our rapid 30-minute in-clinic option achieves immediately visible shade enhancement in one appointment."}
            </p>
          </div>

          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "સરળ હોમ-કેર વિકલ્પો" : "Flexible Home-Care Alternatives"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "અમે તમારા આરામ અને જરૂરિયાત મુજબ ઘરે રહીને સરળતાથી વાપરી શકાય તેવી પ્રોફેશનલ હોમ વ્હાઇટનિંગ કિટ્સ પણ પ્રદાન કરીએ છીએ."
                : "We support your individual comfort preferences by providing professional-grade take-home whitening kits as a gentle and highly flexible treatment alternative."}
            </p>
          </div>

          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "મોટાભાગના દર્દીઓ માટે સંવેદનશીલતા રહિત" : "No Sensitivity For Most Patients"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "અમારી અદ્યતન તબીબી પદ્ધતિઓ અને ફોર્મ્યુલેશન્સ દર્દીઓ માટે દાંતની ઝણઝણાટી કે સંવેદનશીલતા વિના સુંદર ચમક લાવે છે."
                : "Our advanced clinical formulations are carefully chosen to ensure that most patients achieve a beautifully radiant smile with absolutely no sensitivity."}
            </p>
          </div>
        </div>
      </section>

      {/* 9. FAQ + FAQPage Schema */}
      <section id="teeth-whitening-faq-section" className="space-y-6 sm:space-y-10 pt-10 sm:pt-16 border-t border-slate-200/60 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <HelpCircle className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "દર્દીઓના પ્રશ્નો અને શંકાઓ" : "PATIENT OBJECTIONS & QUESTIONS"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "વારંવાર પૂછાતા પ્રશ્નો (FAQ)" : "Frequently Asked Questions"}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "દાંત સફેદ કરવાની સારવાર સંબંધિત દરેક પ્રશ્ન માટે અહીં મેળવો સચોટ, પ્રમાણિક અને તબીબી રીતે સ્પષ્ટ જવાબો."
              : "Got questions? We have clear, honest, and clinically accurate answers about our teeth whitening treatments."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="space-y-4 max-w-3xl mx-auto pt-4">
          {[
            {
              question: language === 'gu' ? "પ્રોફેશનલ ટીથ વ્હાઇટનિંગ (દાંત સફેદ કરવા) શું છે?" : "What is professional teeth whitening?",
              answer: language === 'gu'
                ? "પ્રોફેશનલ ટીથ વ્હાઇટનિંગ એ નિષ્ણાત દંત ચિકિત્સકની દેખરેખ હેઠળ CE અને FDA-મંજૂર વ્હાઇટનિંગ સિસ્ટમ્સનો ઉપયોગ કરીને દાંતના ડાઘ દૂર કરવા અને તેને ચમકદાર બનાવવાની સુરક્ષિત અને અસરકારક પ્રક્રિયા છે."
                : "Professional teeth whitening is a highly safe, effective dental treatment designed to lift stains and brighten your teeth using CE & FDA-approved whitening systems under professional supervision."
            },
            {
              question: language === 'gu' ? "દાંત સફેદ કરવાની પ્રક્રિયામાં કેટલો સમય લાગે છે?" : "How long does Teeth Whitening take?",
              answer: language === 'gu'
                ? "અમારું પ્રોફેશનલ ઇન-ક્લિનિક વ્હાઇટનિંગ સત્ર અત્યંત ઝડપી અને અસરકારક છે, જેને પૂર્ણ થવામાં આશરે ૩૦ મિનિટ જેટલો સમય લાગે છે."
                : "Our professional in-clinic whitening session is designed to be highly efficient, taking approximately 30 minutes to complete."
            },
            {
              question: language === 'gu' ? "શું ટીથ વ્હાઇટનિંગ માત્ર એક જ મુલાકાતમાં થઈ જાય છે?" : "Is professional Teeth Whitening done in one appointment?",
              answer: language === 'gu'
                ? "હા, અમારી ઇન-ક્લિનિક ટીથ વ્હાઇટનિંગ સારવાર માત્ર એક જ સરળ અને અનુકૂળ એપોઇન્ટમેન્ટમાં સંપૂર્ણ રીતે પૂર્ણ કરવા માટે બનાવવામાં આવી છે."
                : "Yes, our in-clinic teeth whitening is designed to be fully completed within a single, convenient clinical appointment."
            },
            {
              question: language === 'gu' ? "મને ક્યારે પરિણામ જોવા મળશે?" : "When will I see the result?",
              answer: language === 'gu'
                ? "તમારા ૩૦ મિનિટના ઇન-ક્લિનિક સારવાર સત્ર પછી તરત જ તમને દેખીતું અને સુંદર પરિણામ જોવા મળશે."
                : "You will experience immediate visible results right after your 30-minute in-clinic treatment session."
            },
            {
              question: language === 'gu' ? "શું ટીથ વ્હાઇટનિંગ દંતવલ્ક (એનામેલ) માટે સુરક્ષિત છે?" : "Is Teeth Whitening enamel-safe?",
              answer: language === 'gu'
                ? "હા, અનુભવી દંત ચિકિત્સકોની દેખરેખ હેઠળ કરવામાં આવતી આ સારવારમાં દંતવલ્ક માટે સુરક્ષિત પદ્ધતિઓનો ઉપયોગ થાય છે, જે દાંતના કુદરતી બંધારણને સુરક્ષિત રાખે છે."
                : "Yes, our professionally supervised whitening treatments utilize enamel-safe systems specifically formulated to protect your natural tooth structure."
            },
            {
              question: language === 'gu' ? "શું મને દાંતમાં ઝણઝણાટી (સંવેદનશીલતા) થશે?" : "Will I experience sensitivity?",
              answer: language === 'gu'
                ? "મોટાભાગના દર્દીઓને સારવાર દરમિયાન કે પછી કોઈ પણ પ્રકારની ઝણઝણાટી થતી નથી. અમારી સિસ્ટમ્સ દરેક દર્દી માટે આ પ્રક્રિયાને અત્યંત આરામદાયક બનાવવા માટે ખાસ પસંદ કરવામાં આવી છે."
                : "Most patients experience no sensitivity during or after the treatment. Our systems are chosen to keep the procedure highly comfortable for most patients."
            },
            {
              question: language === 'gu' ? "શું તમે ઘરે ઉપયોગ કરવા માટે વ્હાઇટનિંગ કિટ્સ આપો છો?" : "Do you offer take-home whitening kits?",
              answer: language === 'gu'
                ? "હા, જો તમારા ડેન્ટિસ્ટ દ્વારા ભલામણ કરવામાં આવે તો વૈકલ્પિક રીતે ઘરે વાપરી શકાય તેવી પ્રોફેશનલ-ગ્રેડ ટીથ વ્હાઇટનિંગ કિટ્સ ઉપલબ્ધ કરાવવામાં આવે છે."
                : "Yes, professional-grade take-home whitening kits are available as an alternative option when recommended by your dentist."
            },
            {
              question: language === 'gu' ? "શું ટીથ વ્હાઇટનિંગ દરેક વ્યક્તિ માટે યોગ્ય છે?" : "Is Teeth Whitening suitable for everyone?",
              answer: language === 'gu'
                ? "તમારી યોગ્યતા કન્સલ્ટેશન દરમિયાન નક્કી કરવામાં આવે છે. તમારા ડેન્ટિસ્ટ તમારા દાંત અને પેઢાની તપાસ કરીને જણાવશે કે આ સારવાર તમારા માટે યોગ્ય છે કે નહીં."
                : "Suitability is determined during your clinical consultation. Your dentist will perform an examination to advise if whitening is appropriate for you."
            },
            {
              question: language === 'gu' ? "દાંત સફેદ કરવાની સારવારનો ખર્ચ કેટલો થાય છે?" : "How much does Teeth Whitening cost?",
              answer: language === 'gu'
                ? "કૃપા કરીને કિંમતો જાણવા અમારો સંપર્ક કરો. સારવારની યોગ્યતા, જુદા જુદા વિકલ્પો અને ચોક્કસ ખર્ચની ચર્ચા મુલાકાત દરમિયાન સ્પષ્ટ રીતે કરવામાં આવશે."
                : "Please contact us for pricing. Your final treatment suitability, options, and costs will be discussed clearly with the clinic during your visit."
            },
            {
              question: language === 'gu' ? "શું હું કોઈ મહત્વના પ્રસંગ પહેલા આ સારવાર બુક કરાવી શકું?" : "Can I book whitening before an important event?",
              answer: language === 'gu'
                ? "હા, લગ્ન પ્રસંગ, ઇન્ટરવ્યુ કે અન્ય મહત્વના મેળાવડાઓ માટે ટીથ વ્હાઇટનિંગ એક ઉત્તમ વિકલ્પ છે કારણ કે માત્ર એક જ ૩૦ મિનિટની એપોઇન્ટમેન્ટમાં તરત જ તેજસ્વી સ્માઇલ મળે છે."
                : "Yes, teeth whitening is an ideal choice before weddings, interviews, or other key events due to the immediate visible results achieved in one 30-minute appointment."
            }
          ].map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="border border-[#E8EEF5] rounded-[16px] bg-white overflow-hidden shadow-[0_4px_15px_rgba(8,28,58,0.03)] transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-sans font-bold text-[#081C3A] text-sm sm:text-base hover:text-[#0D9488] transition-colors gap-4"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-[#0D9488] shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className={`p-4 sm:p-5 pt-0 border-t border-slate-100 bg-slate-50/50 text-[#475569] text-xs sm:text-sm leading-relaxed font-sans ${language === 'gu' ? 'font-semibold text-slate-700' : 'font-medium'}`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "question": language === 'gu' ? "પ્રોફેશનલ ટીથ વ્હાઇટનિંગ (દાંત સફેદ કરવા) શું છે?" : "What is professional teeth whitening?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": language === 'gu'
                    ? "પ્રોફેશનલ ટીથ વ્હાઇટનિંગ એ નિષ્ણાત દંત ચિકિત્સકની દેખરેખ હેઠળ CE અને FDA-મંજૂર વ્હાઇટનિંગ સિસ્ટમ્સનો ઉપયોગ કરીને દાંતના ડાઘ દૂર કરવા અને તેને ચમકદાર બનાવવાની સુરક્ષિત અને અસરકારક પ્રક્રિયા છે."
                    : "Professional teeth whitening is a highly safe, effective dental treatment designed to lift stains and brighten your teeth using CE & FDA-approved whitening systems under professional supervision."
                }
              },
              {
                "question": language === 'gu' ? "દાંત સફેદ કરવાની પ્રક્રિયામાં કેટલો સમય લાગે છે?" : "How long does Teeth Whitening take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": language === 'gu'
                    ? "અમારું પ્રોફેશનલ ઇન-ક્લિનિક વ્હાઇટનિંગ સત્ર અત્યંત ઝડપી અને અસરકારક છે, જેને પૂર્ણ થવામાં આશરે ૩૦ મિનિટ જેટલો સમય લાગે છે."
                    : "Our professional in-clinic whitening session is designed to be highly efficient, taking approximately 30 minutes to complete."
                }
              },
              {
                "question": language === 'gu' ? "શું ટીથ વ્હાઇટનિંગ માત્ર એક જ મુલાકાતમાં થઈ જાય છે?" : "Is professional Teeth Whitening done in one appointment?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": language === 'gu'
                    ? "હા, અમારી ઇન-ક્લિનિક ટીથ વ્હાઇટનિંગ સારવાર માત્ર એક જ સરળ અને અનુકૂળ એપોઇન્ટમેન્ટમાં સંપૂર્ણ રીતે પૂર્ણ કરવા માટે બનાવવામાં આવી છે."
                    : "Yes, our in-clinic teeth whitening is designed to be fully completed within a single, convenient clinical appointment."
                }
              },
              {
                "question": language === 'gu' ? "મને ક્યારે પરિણામ જોવા મળશે?" : "When will I see the result?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": language === 'gu'
                    ? "તમારા ૩૦ મિનિટના ઇન-ક્લિનિક સારવાર સત્ર પછી તરત જ તમને દેખીતું અને સુંદર પરિણામ જોવા મળશે."
                    : "You will experience immediate visible results right after your 30-minute in-clinic treatment session."
                }
              },
              {
                "question": language === 'gu' ? "શું ટીથ વ્હાઇટનિંગ દંતવલ્ક (એનામેલ) માટે સુરક્ષિત છે?" : "Is Teeth Whitening enamel-safe?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": language === 'gu'
                    ? "હા, અનુભવી દંત ચિકિત્સકોની દેખરેખ હેઠળ કરવામાં આવતી આ સારવારમાં દંતવલ્ક માટે સુરક્ષિત પદ્ધતિઓનો ઉપયોગ થાય છે, જે દાંતના કુદરતી બંધારણને સુરક્ષિત રાખે છે."
                    : "Yes, our professionally supervised whitening treatments utilize enamel-safe systems specifically formulated to protect your natural tooth structure."
                }
              },
              {
                "question": language === 'gu' ? "શું મને દાંતમાં ઝણઝણાટી (સંવેદનશીલતા) થશે?" : "Will I experience sensitivity?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": language === 'gu'
                    ? "મોટાભાગના દર્દીઓને સારવાર દરમિયાન કે પછી કોઈ પણ પ્રકારની ઝણઝણાટી થતી નથી. અમારી સિસ્ટમ્સ દરેક દર્દી માટે આ પ્રક્રિયાને અત્યંત આરામદાયક બનાવવા માટે ખાસ પસંદ કરવામાં આવી છે."
                    : "Most patients experience no sensitivity during or after the treatment. Our systems are chosen to keep the procedure highly comfortable for most patients."
                }
              },
              {
                "question": language === 'gu' ? "શું તમે ઘરે ઉપયોગ કરવા માટે વ્હાઇટનિંગ કિટ્સ આપો છો?" : "Do you offer take-home whitening kits?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": language === 'gu'
                    ? "હા, જો તમારા ડેન્ટિસ્ટ દ્વારા ભલામણ કરવામાં આવે તો વૈકલ્પિક રીતે ઘરે વાપરી શકાય તેવી પ્રોફેશનલ-ગ્રેડ ટીથ વ્હાઇટનિંગ કિટ્સ ઉપલબ્ધ કરાવવામાં આવે છે."
                    : "Yes, professional-grade take-home whitening kits are available as an alternative option when recommended by your dentist."
                }
              },
              {
                "question": language === 'gu' ? "શું ટીથ વ્હાઇટનિંગ દરેક વ્યક્તિ માટે યોગ્ય છે?" : "Is Teeth Whitening suitable for everyone?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": language === 'gu'
                    ? "તમારી યોગ્યતા કન્સલ્ટેશન દરમિયાન નક્કી કરવામાં આવે છે. તમારા ડેન્ટિસ્ટ તમારા દાંત અને પેઢાની તપાસ કરીને જણાવશે કે આ સારવાર તમારા માટે યોગ્ય છે કે નહીં."
                    : "Suitability is determined during your clinical consultation. Your dentist will perform an examination to advise if whitening is appropriate for you."
                }
              },
              {
                "question": language === 'gu' ? "દાંત સફેદ કરવાની સારવારનો ખર્ચ કેટલો થાય છે?" : "How much does Teeth Whitening cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": language === 'gu'
                    ? "કૃપા કરીને કિંમતો જાણવા અમારો સંપર્ક કરો. સારવારની યોગ્યતા, જુદા જુદા વિકલ્પો અને ચોક્કસ ખર્ચની ચર્ચા મુલાકાત દરમિયાન સ્પષ્ટ રીતે કરવામાં આવશે."
                    : "Please contact us for pricing. Your final treatment suitability, options, and costs will be discussed clearly with the clinic during your visit."
                }
              },
              {
                "question": language === 'gu' ? "શું હું કોઈ મહત્વના પ્રસંગ પહેલા આ સારવાર બુક કરાવી સ્કું?" : "Can I book whitening before an important event?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": language === 'gu'
                    ? "હા, લગ્ન પ્રસંગ, ઇન્ટરવ્યુ કે અન્ય મહત્વના મેળાવડાઓ માટે ટીથ વ્હાઇટનિંગ એક ઉત્તમ વિકલ્પ છે કારણ કે માત્ર એક જ ૩૦ મિનિટની એપોઇન્ટમેન્ટમાં તરત જ તેજસ્વી સ્માઇલ મળે છે."
                    : "Yes, teeth whitening is an ideal choice before weddings, interviews, or other key events due to the immediate visible results achieved in one 30-minute appointment."
                }
              }
            ]
          })}
        </script>
      </section>

      {/* 10. Closing CTA */}
      <section id="teeth-whitening-closing-cta-section" className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#081C3A] p-8 sm:p-14 lg:p-16 text-center shadow-[0_12px_40px_rgba(8,28,58,0.15)]">
          {/* Subtle decorative background circles */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6 sm:space-y-8">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black text-teal-400 uppercase tracking-widest px-3 py-1 bg-teal-500/10 rounded-full border border-teal-500/20 mx-auto">
              {language === 'gu' ? "આજે જ શરૂઆત કરો" : "GET STARTED TODAY"}
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              {language === 'gu' ? "શું તમે તમારા આગામી પ્રસંગ પહેલાં આકર્ષક સ્માઇલ માટે તૈયાર છો?" : "Ready for a Whiter Smile Before Your Next Occasion?"}
            </h2>
            <p className={`text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans ${language === 'gu' ? 'font-semibold text-teal-100' : 'font-medium'}`}>
              {language === 'gu'
                ? "માત્ર એક જ મુલાકાતમાં પ્રોફેશનલ ટીથ વ્હાઇટનિંગ બુક કરો અને તમારા સુંદર સ્માઇલ માટે યોગ્ય વિકલ્પની ચર્ચા કરો."
                : "Book professional Teeth Whitening in one appointment and discuss the right whitening option for your smile."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => openAppointmentModal('Teeth Whitening - Closing CTA')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-sm sm:text-base font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer font-sans"
              >
                <Calendar className="h-5 w-5" />
                <span>{language === 'gu' ? "ટીથ વ્હાઇટનિંગ બુક કરો" : "Book Teeth Whitening"}</span>
              </button>

              <a
                href={`https://wa.me/919510397046?text=${encodeURIComponent(
                  language === 'gu'
                    ? "નમસ્તે પટેલ ડેન્ટલ હોસ્પિટલ, હું દાંત સફેદ કરવા (ટીથ વ્હાઇટનિંગ) વિશે વધુ જાણવા માંગુ છું અને કન્સલ્ટેશન બુક કરાવવા માંગુ છું."
                    : "Hello Patel Dental Hospital, I would like to know more about Teeth Whitening and would like to book a consultation."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm sm:text-base font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer font-sans"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{language === 'gu' ? "અમને વ્હોટ્સએપ કરો" : "WhatsApp Us"}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Related Treatments */}
      <section id="teeth-whitening-related-treatments-section" className="space-y-6 sm:space-y-10 pt-10 sm:pt-16 border-t border-slate-200/60 max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "સંબંધિત સારવારો અને ઉકેલો" : "RELATED TREATMENTS & SOLUTIONS"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "અન્ય સુંદર સારવારના વિકલ્પો" : "Other Treatment Solutions"}
          </h2>
          <p className={`text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "તમારા આત્મવિશ્વાસ અને કુદરતી સ્માઇલને વધુ આકર્ષક બનાવવા માટે અન્ય પ્રીમિયમ કોસ્મેટિક અને અલાઈનમેન્ટ સારવારો વિશે જાણો."
              : "Explore other premium cosmetic and alignment procedures designed to enhance your confidence and natural smile aesthetics."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto pt-4">
          {/* Card 1: Smile Makeover */}
          <div className="bg-white border border-[#E8EEF5] rounded-[22px] overflow-hidden shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 flex flex-col group hover:-translate-y-2">
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
              <img
                src={smileMakeoverHeroImage || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800"}
                alt="Smile Makeover Hero"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow text-left">
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 group-hover:text-[#0D9488] transition-colors leading-tight">
                {language === 'gu' ? "સ્માઇલ મેકઓવર" : "Smile Makeover"}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 flex-grow font-sans ${language === 'gu' ? 'font-semibold text-slate-700' : 'text-[#475569] font-medium'}`}>
                {language === 'gu'
                  ? "એક સપ્રમાણ આકર્ષક સ્માઇલ આપવા માટે વિનિયર્સ, પ્રોફેશનલ અલાઈનમેન્ટ અને ટીથ વ્હાઇટનિંગનું સુંદર સંગમ."
                  : "Complete dynamic smile transformation blending veneers, alignment, and bleaching to create a symmetrical artistic masterpiece."}
              </p>
              <a
                href="/services/smile-makeover"
                className="inline-flex items-center justify-between py-2.5 px-4 rounded-xl border border-[#E8EEF5] hover:border-[#14B8A6] hover:bg-teal-50/35 text-xs sm:text-sm font-bold text-[#0D9488] transition-all duration-200 mt-auto"
              >
                <span>{language === 'gu' ? "વિગતો જાણો" : "Learn Details"}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Card 2: Invisible Aligners */}
          <div className="bg-white border border-[#E8EEF5] rounded-[22px] overflow-hidden shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 flex flex-col group hover:-translate-y-2">
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
              <img
                src={invisibleAlignersHeroImage || "https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=800"}
                alt="Invisible Aligners Hero"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow text-left">
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 group-hover:text-[#0D9488] transition-colors leading-tight">
                {language === 'gu' ? "અદ્રશ્ય અલાઈનર્સ" : "Invisible Aligners"}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 flex-grow font-sans ${language === 'gu' ? 'font-semibold text-slate-700' : 'text-[#475569] font-medium'}`}>
                {language === 'gu'
                  ? "અદ્રશ્ય અને સહેલાઈથી કાઢી શકાય તેવા કસ્ટમ ક્લિયર અલાઈનર્સ જે તમારી જીવનશૈલીને અસર કર્યા વિના સ્માઇલને સીધું કરે છે."
                  : "Invisible, removable custom clear aligner series that subtly straighten your smile with maximum daily lifestyle freedom."}
              </p>
              <a
                href="/services/invisible-aligners"
                className="inline-flex items-center justify-between py-2.5 px-4 rounded-xl border border-[#E8EEF5] hover:border-[#14B8A6] hover:bg-teal-50/35 text-xs sm:text-sm font-bold text-[#0D9488] transition-all duration-200 mt-auto"
              >
                <span>{language === 'gu' ? "વિગતો જાણો" : "Learn Details"}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Card 3: Tooth Coloured Filling */}
          <div className="bg-white border border-[#E8EEF5] rounded-[22px] overflow-hidden shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 flex flex-col group hover:-translate-y-2">
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
              <img
                src={toothColouredFillingHeroImage || "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800"}
                alt="Tooth Coloured Filling Hero"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow text-left">
              <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 group-hover:text-[#0D9488] transition-colors leading-tight">
                {language === 'gu' ? "દાંતના રંગનું ફિલિંગ" : "Tooth Coloured Filling"}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 flex-grow font-sans ${language === 'gu' ? 'font-semibold text-slate-700' : 'text-[#475569] font-medium'}`}>
                {language === 'gu'
                  ? "કોમ્પોઝિટ રેઝિન ફિલિંગ, જેને દાંતના રંગના ફિલિંગ તરીકે પણ ઓળખવામાં આવે છે, તે લાંબા સમય સુધી ટકી રહે અને કુદરતી દેખાય છે."
                  : "Composite resin filling, also known as a tooth-coloured filling, is a cavity filling intended to be durable and natural-looking."}
              </p>
              <a
                href="/services/tooth-coloured-filling"
                className="inline-flex items-center justify-between py-2.5 px-4 rounded-xl border border-[#E8EEF5] hover:border-[#14B8A6] hover:bg-teal-50/35 text-xs sm:text-sm font-bold text-[#0D9488] transition-all duration-200 mt-auto"
              >
                <span>{language === 'gu' ? "વિગતો જાણો" : "Learn Details"}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
