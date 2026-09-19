/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  HelpCircle, 
  Calendar, 
  Cpu, 
  Activity, 
  Layers,
  Award,
  Users
} from 'lucide-react';
import { ServiceGalleryItem, MarketingConfig } from '../../types';
import { BeforeAfterSlider } from '../BeforeAfterSlider';
import { ClinicalCaseGallery } from '../ClinicalCaseGallery';
import { GooglePatientReviews } from '../GooglePatientReviews';
import { SurgicalTeamSection } from './SurgicalTeamSection';

export interface DentalImplantsViewProps {
  heroElement: React.ReactNode;
  featuredVideoElement?: React.ReactNode;
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
  setCurrentPage?: (page: string) => void;
  language?: 'en' | 'gu';
}

export const DentalImplantsView: React.FC<DentalImplantsViewProps> = ({
  heroElement,
  featuredVideoElement,
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
  setCurrentPage,
  language = 'gu'
}) => {
  return (
    <div className="space-y-8 sm:space-y-16 lg:space-y-20">
      {heroElement}
      {featuredVideoElement}

                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="symptom-qualification-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "તમને ડેન્ટલ ઇમ્પ્લાન્ટની જરૂર પડી શકે છે જો…" : "You May Need Dental Implants If..."}
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-8 max-w-7xl mx-auto pt-8">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
                        {/* Left accent line */}
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "એક અથવા વધુ દાંત ખૂટવાના કારણે તમને ચાવવામાં તકલીફ પડે છે" : "You Have Difficulty in Chewing Due to One or More Missing Teeth"}
                        </h3>
                        <p className={`${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-[#475569] font-medium'} text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1`}>
                          {language === 'gu' ? "ખૂટેલા દાંતને કારણે ચાવવામાં તકલીફ પડી શકે છે અને તમારી રોજિંદી ખાવાની પ્રક્રિયા પર અસર થઈ શકે છે." : "Missing teeth can make chewing difficult and affect your everyday eating experience."}
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
                        {/* Left accent line */}
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "તમારા ડેન્ચર ઢીલા અથવા અસુવિધાજનક લાગે છે અને તમને ફિક્સ, સ્થિર ઉકેલ જોઈએ છે" : "Your Denture Feels Loose or Uncomfortable and You Want a Fixed, Stable Solution"}
                        </h3>
                        <p className={`${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-[#475569] font-medium'} text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1`}>
                          {language === 'gu' ? "તમને ઢીલા અથવા અસુવિધાજનક ડેન્ચરના બદલે વધુ સ્થિર અને ફિક્સ વિકલ્પ જોઈએ છે." : "You want a more stable and fixed alternative to a loose or uncomfortable denture."}
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
                        {/* Left accent line */}
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "તમારો દુખાવો કરતો ક્ષતિગ્રસ્ત દાંત બચાવી શકાય તેમ નથી અને તમને કાયમી ઉકેલ જોઈએ છે" : "You Have a Painful Damaged Tooth That Cannot Be Saved and You Want a Permanent Solution"}
                        </h3>
                        <p className={`${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-[#475569] font-medium'} text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1`}>
                          {language === 'gu' ? "દુખાવો કરતો અને ગંભીર રીતે ક્ષતિગ્રસ્ત દાંત જો બચાવી શકાય તેમ ન હોય, તો તેને કાયમી દાંત બદલવાના ઉકેલથી બદલવાની જરૂર પડી શકે છે." : "A painful, severely damaged tooth that cannot be saved may need to be replaced with a permanent tooth replacement solution."}
                        </p>
                      </div>
                    </div>
                  </div>


                {/* NEW TWO-DOCTOR SHORT PROFILE SECTION */}
                <SurgicalTeamSection setCurrentPage={setCurrentPage} language={language} />


                {/* Dental Implants Option Comparison Table Section */}
                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="dental-implants-comparison-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "વિકલ્પોની સરખામણી" : "Option Comparison"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "ડેન્ટલ ઇમ્પ્લાન્ટ્સ વિ. ડેન્ટલ બ્રિજ વિ. કાઢી શકાય તેવા ડેન્ચર્સ" : "Dental Implants vs. Dental Bridge vs. Removable Dentures"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu' 
                          ? "દાંત બદલવાના વિકલ્પોની સરખામણી કરીને સમજો કે ડેન્ટલ ઇમ્પ્લાન્ટ્સ ટકાઉપણું, જડબાના હાડકાના સ્વાસ્થ્ય અને કુદરતી આરામ માટે શ્રેષ્ઠ સ્તર કેવી રીતે પ્રદાન કરે છે."
                          : "Compare tooth replacement options to understand why dental implants provide the highest standard of durability, jawbone health, and natural comfort."
                        }
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-7xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[680px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                {language === 'gu' ? "વિશેષતા / પરિબળ" : "Feature / Factor"}
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4 relative">
                                <div className="flex items-center justify-between gap-2">
                                  <span>{language === 'gu' ? "ડેન્ટલ ઇમ્પ્લાન્ટ્સ" : "Dental Implants"}</span>
                                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                                    {language === 'gu' ? "ભલામણ કરેલ" : "Recommended"}
                                  </span>
                                </div>
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                {language === 'gu' ? "ડેન્ટલ બ્રિજ" : "Dental Bridge"}
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                {language === 'gu' ? "કાઢી શકાય તેવા ડેન્ચર્સ" : "Removable Dentures"}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "આધાર અને દાંત પર અસર" : "Support & Tooth Impact"}
                              </td>
                              <td className={`p-4 sm:p-5 font-semibold bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-[#000000]' : 'text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>
                                    {language === 'gu' 
                                      ? "સ્વતંત્ર આધાર આપતું મૂળ; આસપાસના સ્વસ્થ દાંતને કોઈ નુકસાન નહીં" 
                                      : "Self-supported root; zero damage to adjacent healthy teeth"}
                                  </span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' 
                                  ? "આસપાસના સ્વસ્થ દાંતને કાપવા અને ઘસવાની જરૂર પડે છે" 
                                  : "Requires cutting and grinding down healthy adjacent teeth"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' 
                                  ? "ક્લાસ્પ્સ સાથે પેઢાની રિજ પર આધાર રાખે છે; બાકીના દાંત પર દબાણ લાવી શકે છે" 
                                  : "Rests on gum ridge with clasps; can stress remaining teeth"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "ટકાઉપણું અને આયુષ્ય" : "Durability & Lifespan"}
                              </td>
                              <td className={`p-4 sm:p-5 font-semibold bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-[#000000]' : 'text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>
                                    {language === 'gu' 
                                      ? "નિયમિત ડેન્ટલ હાઇજીન સાથે આજીવન કાયમી ઉકેલ" 
                                      : "Lifetime permanent solution with routine dental hygiene"}
                                  </span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' 
                                  ? "સામાન્ય રીતે બદલવાની જરૂર પડે તે પહેલાં 7–10 વર્ષ સુધી ચાલે છે" 
                                  : "Typically lasts 7-10 years before requiring replacement"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' 
                                  ? "5–7 વર્ષ સુધી ચાલે છે; જડબામાં ફેરફાર થતાં નિયમિત એડજસ્ટમેન્ટની જરૂર પડે છે" 
                                  : "Lasts 5-7 years; requires regular adjustments as jaw changes"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "જડબાના હાડકાનું જતન" : "Jawbone Preservation"}
                              </td>
                              <td className={`p-4 sm:p-5 font-semibold bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-[#000000]' : 'text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>
                                    {language === 'gu' 
                                      ? "કુદરતી જડબાના હાડકાનું જતન કરે છે અને ચહેરાની ઢીલાશ/સંકોચન અટકાવે છે" 
                                      : "Preserves natural jawbone & prevents facial sagging/shrinkage"}
                                  </span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' 
                                  ? "ખૂટતા દાંતના વિસ્તારમાં હાડકાનું શોષણ અટકાવતું નથી" 
                                  : "Does not prevent bone resorption under missing tooth area"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' 
                                  ? "સપાટી પરના દબાણને કારણે સમય જતાં હાડકાનું નુકસાન ઝડપી બનાવે છે" 
                                  : "Accelerates bone loss over time due to surface pressure"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "ચાવવામાં કાર્યક્ષમતા" : "Chewing Efficiency"}
                              </td>
                              <td className={`p-4 sm:p-5 font-semibold bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-[#000000]' : 'text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>
                                    {language === 'gu' 
                                      ? "95%–100% કુદરતી કરડવાની શક્તિ; તમારા મનપસંદ તમામ ખોરાક ખાઈ શકો છો" 
                                      : "95%-100% natural bite force; eat all your favorite foods"}
                                  </span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' 
                                  ? "60%–70% ચાવવાની કાર્યક્ષમતા; સખત ખોરાક સાથે સાવચેતી રાખવી પડે છે" 
                                  : "60%-70% chewing efficiency; cautious with hard foods"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' 
                                  ? "20%–30% ચાવવાની શક્તિ; આહારમાં નોંધપાત્ર મર્યાદાઓ" 
                                  : "20%-30% chewing power; significant restrictions on diet"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "સ્થિરતા અને આરામ" : "Stability & Comfort"}
                              </td>
                              <td className={`p-4 sm:p-5 font-semibold bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-[#000000]' : 'text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>
                                    {language === 'gu' 
                                      ? "100% કાયમી રીતે સ્થિર; સરકતા નથી, ક્લિકિંગ થતું નથી અને એડહેસિવની જરૂર નથી" 
                                      : "100% permanently fixed; no slipping, clicking, or adhesives"}
                                  </span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' 
                                  ? "કાયમી રીતે સ્થિર, પરંતુ બ્રિજના પોન્ટિકની નીચે ખોરાક ફસાઈ શકે છે" 
                                  : "Fixed permanently, but food can lodge under bridge pontic"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' 
                                  ? "કાઢી શકાય તેવા; સરકવાની, દુખાવાવાળા ભાગો થવાની અને ક્લિકિંગ થવાની શક્યતા" 
                                  : "Removable; prone to slipping, sore spots, and clicking"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "જાળવણી અને સફાઈ" : "Maintenance & Cleaning"}
                              </td>
                              <td className={`p-4 sm:p-5 font-semibold bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-[#000000]' : 'text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>
                                    {language === 'gu' 
                                      ? "કુદરતી દાંતની જેમ દરરોજ નિયમિત બ્રશિંગ અને ફ્લોસિંગ" 
                                      : "Regular daily brushing and flossing like natural teeth"}
                                  </span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' 
                                  ? "બ્રિજની નીચે ખાસ ફ્લોસ થ્રેડરની જરૂર પડે છે" 
                                  : "Requires special floss threaders under the bridge"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' 
                                  ? "દરરોજ રાત્રે કાઢીને ક્લીનિંગ સોલ્યુશનમાં પલાળવા જરૂરી છે" 
                                  : "Must be removed nightly and soaked in cleaning solutions"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>


                {/* Section 5: Interactive Before & After Smile Transformations */}
                {mConfig.show_before_after !== false && beforeAfterPairs.length > 0 && (
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="before-after-gallery-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "રૂપાંતરણ" : "Transformations"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "ડેન્ટલ ઇમ્પ્લાન્ટ્સ પહેલાં અને પછીના રૂપાંતરણો" : seoHeadings.transformations}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu' 
                          ? "અમારા દર્દીઓના સ્માઇલમાં થયેલા વાસ્તવિક રૂપાંતરણો જુઓ." 
                          : (mConfig.before_after_description || 'See real smile transformations of our patients.')
                        }
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

                {/* Section 6: Clinical Case Gallery */}
                {mConfig.show_gallery !== false && (
                  <ClinicalCaseGallery
                    heading={language === 'gu' ? "ડેન્ટલ ઇમ્પ્લાન્ટ ક્લિનિકલ કેસ ગેલેરી" : seoHeadings.caseGallery}
                    description={mConfig.gallery_description}
                    items={Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery}
                    singleGallery={false}
                    language={language}
                  />
                )}

                {/* Section 7: Patient Testimonial Reels */}
                {testimonialsElement}

                {/* Section 10: Google Patient Reviews (100% CMS-driven premium slider) */}
                {mConfig.show_google_reviews !== false && (
                  <GooglePatientReviews
                    heading={language === 'gu' ? "ડેન્ટલ ઇમ્પ્લાન્ટ્સ માટે ગૂગલ પેશન્ટ રિવ્યૂઝ" : seoHeadings.reviews}
                    label={language === 'gu' ? "ગૂગલ રિવ્યૂઝ" : "Google Reviews"}
                    reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
                  />
                )}


                {/* Dental Implants Transparent Pricing Section */}
                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="dental-implants-pricing-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "પારદર્શક કિંમત" : "TRANSPARENT PRICING"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "ડેન્ટલ ઇમ્પ્લાન્ટની કિંમત અને પ્રાઇસિંગ" : "Dental Implant Cost & Pricing"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu'
                          ? "ડેન્ટલ ઇમ્પ્લાન્ટની કિંમત ગુમ થયેલા દાંતની સંખ્યા, ઇમ્પ્લાન્ટ સારવારના પ્રકાર, હાડકાની સ્થિતિ અને વધારાની પ્રક્રિયાઓ જરૂરી છે કે નહીં તેના પર આધાર રાખે છે."
                          : "The cost of dental implants depends on the number of missing teeth, type of implant treatment, bone condition, and whether additional procedures are required."
                        }
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

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
                                {language === 'gu' ? "કોના માટે યોગ્ય" : "Best For"}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "એક દાંત માટે ઇમ્પ્લાન્ટ" : "Single Tooth Implant"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "એક ગુમ થયેલા દાંતને બદલવા માટે" : "Replacing one missing tooth"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "એકથી વધુ દાંત માટે ઇમ્પ્લાન્ટ" : "Multiple Teeth Implants"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "એકથી વધુ ગુમ થયેલા દાંતને બદલવા માટે" : "Replacing multiple missing teeth"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "સંપૂર્ણ મોઢા માટે ડેન્ટલ ઇમ્પ્લાન્ટ" : "Full Mouth Dental Implants"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "સંપૂર્ણ આર્ચ અથવા સંપૂર્ણ દાંત બદલવા માટે" : "Full arch or complete teeth replacement"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                        <p className={`text-xs sm:text-sm max-w-xl ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600 font-medium'}`}>
                          {language === 'gu'
                            ? "ક્લિનિકલ તપાસ અને સારવારના આયોજન પછી તમારી અંતિમ સારવાર યોજના અને ખર્ચ નક્કી કરવામાં આવશે."
                            : "Your final treatment plan and cost will be determined after a clinical examination and treatment planning."
                          }
                        </p>
                        <button
                          onClick={() => openAppointmentModal('Dental Implants')}
                          className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                        >
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span>{language === 'gu' ? "તમારી વ્યક્તિગત સારવાર યોજના મેળવો" : "Get a Personalized Treatment Plan"}</span>
                        </button>
                      </div>
                    </div>
                  </div>


                {/* Dental Implants Treatment Timeline Section */}
                
                  <div className="pt-6 sm:pt-14 border-t border-slate-200/60" id="dental-implants-timeline-section">
                    <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[28px] sm:rounded-[36px] p-6 sm:p-12 lg:p-14 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
                      {/* Heading area */}
                      <div className="space-y-3 max-w-2xl mx-auto text-center mb-10 sm:mb-14">
                        <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                          {language === 'gu' ? "તમારી ડેન્ટલ ઇમ્પ્લાન્ટ સારવારની સમયરેખા" : "Your Dental Implant Treatment Timeline"}
                        </h2>
                        <p className={`text-sm sm:text-base leading-relaxed text-center ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600 font-normal'}`}>
                          {language === 'gu'
                            ? "તમારી સારવારની સમયરેખા તમારા મોઢાની સ્થિતિ, સારવારની યોજના અને કોઈ વધારાની પ્રક્રિયાઓ જરૂરી છે કે નહીં તેના પર આધાર રાખે છે."
                            : "Your treatment timeline depends on your oral condition, treatment plan, and whether any additional procedures are required."
                          }
                        </p>
                        <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
                      </div>

                      {/* 4 horizontal numbered timeline steps */}
                      <div className="relative">
                        {/* Horizontal connector line on desktop/tablet */}
                        <div className="hidden md:block absolute top-[36px] left-[12.5%] right-[12.5%] h-[2px] bg-[#5eead4] z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                          {/* Step 1 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              1
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "પરામર્શ અને તપાસ" : "Consultation & Assessment"}
                            </h3>
                            <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600'}`}>
                              {language === 'gu'
                                ? "યોગ્ય ઇમ્પ્લાન્ટ સારવાર યોજના નક્કી કરવા માટે તમારા દાંત, પેઢાં અને જડબાના હાડકાની તપાસ કરવામાં આવે છે."
                                : "Your teeth, gums, and jawbone are examined to determine the right implant treatment plan."
                              }
                            </p>
                          </div>

                          {/* Step 2 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              2
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "ઇમ્પ્લાન્ટ મૂકવાની પ્રક્રિયા" : "Implant Placement"}
                            </h3>
                            <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600'}`}>
                              {language === 'gu'
                                ? "ડેન્ટલ ઇમ્પ્લાન્ટને આયોજન કરેલી જગ્યાએ કાળજીપૂર્વક મૂકવામાં આવે છે."
                                : "The dental implant is carefully placed in the planned position."
                              }
                            </p>
                          </div>

                          {/* Step 3 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              3
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "હીલિંગ અને એકીકરણ" : "Healing & Integration"}
                            </h3>
                            <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600'}`}>
                              {language === 'gu'
                                ? "મજબૂત આધાર માટે ઇમ્પ્લાન્ટને જડબાના હાડકા સાથે એકીકૃત થવા માટે સમય આપવામાં આવે છે."
                                : "The implant is given time to integrate with the jawbone for a stable foundation."
                              }
                            </p>
                          </div>

                          {/* Step 4 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-[#0D9488] border-2 border-[#0D9488] flex items-center justify-center text-white font-bold text-xl mb-5 shadow-md">
                              4
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "અંતિમ ફિક્સ દાંત" : "Final Fixed Teeth"}
                            </h3>
                            <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600'}`}>
                              {language === 'gu'
                                ? "કાર્યક્ષમતા, આરામ અને દેખાવ પુનઃસ્થાપિત કરવા માટે તમારા કસ્ટમ અંતિમ દાંત મૂકવામાં આવે છે."
                                : "Your custom final teeth are placed to restore function, comfort, and appearance."
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                {/* Dental Implants Warranty & Patient Reassurance Section */}
                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="dental-implants-warranty-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "વોરંટી અને પેશન્ટ માટે આશ્વાસન" : "WARRANTY & PATIENT REASSURANCE"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "તમારી ડેન્ટલ ઇમ્પ્લાન્ટ સારવાર, સ્પષ્ટ આશ્વાસન સાથે" : "Your Dental Implant Treatment, Backed by Clear Reassurance"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu'
                          ? "અમે માનીએ છીએ કે સારવાર શરૂ કરતા પહેલાં પેશન્ટે પોતાની સારવાર, અપેક્ષિત કાળજી અને વોરંટી પોલિસીને સારી રીતે સમજવી જોઈએ. તમારા પ્રશ્નોના જવાબ આપવા અને સારવારની વિગતો સ્પષ્ટ રીતે સમજાવવા માટે અમારી ટીમ ઉપલબ્ધ છે."
                          : "We believe patients should understand their treatment, expected care and warranty policy before proceeding. Our team is available to answer your questions and provide treatment details clearly."
                        }
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Point 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "સ્પષ્ટ વોરંટી પોલિસી" : "Clear Warranty Policy"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "વોરંટીની શરતો અને લાગુ પડતી પરિસ્થિતિઓ તમારી સારવારના આયોજનના ભાગરૂપે સ્પષ્ટ રીતે સમજાવવામાં આવે છે."
                            : "Warranty terms and applicable conditions are explained clearly as part of your treatment planning."
                          }
                        </p>
                      </div>

                      {/* Point 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "વ્યક્તિગત સારવારનું આયોજન" : "Personalised Treatment Planning"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "તમારી ઇમ્પ્લાન્ટ સારવાર તમારી ક્લિનિકલ સ્થિતિ, સારવારની જરૂરિયાતો અને લાંબા ગાળાના મોઢાના સ્વાસ્થ્ય અનુસાર આયોજન કરવામાં આવે છે."
                            : "Your implant treatment is planned according to your clinical condition, treatment requirements and long-term oral health."
                          }
                        </p>
                      </div>

                      {/* Point 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "બીજા અભિપ્રાય માટે આશ્વાસન" : "Second-Opinion Reassurance"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "કોઈ પ્રશ્નો છે અથવા બીજો અભિપ્રાય લેવા માંગો છો? અમે તમારી સારવાર યોજના અંગે ચર્ચા કરવામાં અને તમને માહિતીસભર નિર્ણય લેવામાં મદદ કરવામાં ખુશ છીએ."
                            : "Have questions or want another opinion? We are happy to discuss your treatment plan and help you make an informed decision."
                          }
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={() => openAppointmentModal('Dental Implants - Warranty Reassurance')}
                        className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                      >
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span>{language === 'gu' ? "વધુ વિગતો માટે અમારો સંપર્ક કરો" : "Contact Us for Details"}</span>
                      </button>
                    </div>
                  </div>





        {/* Section 6: Procedure Video (Loaded dynamically from CMS Instagram Reel) */}
        {videoElement}


                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="dental-implants-why-patel-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "શા માટે પટેલ ડેન્ટલ" : "WHY PATEL DENTAL"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "તમારી સારવાર પર કેન્દ્રિત અદ્યતન ઇમ્પ્લાન્ટ નિપુણતા" : "Advanced Implant Expertise Focused on Your Treatment"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu'
                          ? "તમારી ડેન્ટલ ઇમ્પ્લાન્ટ સારવાર અદ્યતન ઇમ્પ્લાન્ટોલોજી નિપુણતા, ડિજિટલ પ્લાનિંગ અને ચોક્કસ તેમજ વ્યક્તિગત કાળજી પૂરી પાડવા માટે રચાયેલ પદ્ધતિઓ સાથે આયોજિત કરવામાં આવે છે."
                          : "Your dental implant treatment is planned with advanced implantology expertise, digital planning and techniques designed to provide precise, personalised care."
                        }
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "અદ્યતન ઓરલ ઇમ્પ્લાન્ટોલોજી" : "Advanced Oral Implantology"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "તમારી ક્લિનિકલ જરૂરિયાતો અનુસાર ઇમિડિએટ લોડિંગ અને સંપૂર્ણ ફિક્સ દાંત બદલવાની પદ્ધતિઓનું આયોજન કરવામાં આવે છે."
                            : "Immediate loading and complete fixed-teeth replacement approaches planned according to your clinical needs."
                          }
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "ડિજિટલ અને ગાઇડેડ ઇમ્પ્લાન્ટ પ્લાનિંગ" : "Digital & Guided Implant Planning"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "ડિજિટલ પ્લાનિંગ અને ગાઇડેડ સર્જિકલ પદ્ધતિઓ ટીમને વધુ ચોકસાઈ સાથે ઇમ્પ્લાન્ટ મૂકવાનું આયોજન કરવામાં મદદ કરે છે."
                            : "Digital planning and guided surgical techniques help the team plan implant placement with greater precision."
                          }
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "બોન ગ્રાફ્ટિંગ અને સાઇનસ લિફ્ટ નિપુણતા" : "Bone Grafting & Sinus Lift Expertise"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "જ્યારે વધારાની તૈયારીની જરૂર હોય ત્યારે અદ્યતન બોન-રીજનરેશન અને સાઇનસ-ઓગમેન્ટેશન પદ્ધતિઓ ઉપલબ્ધ છે."
                            : "Advanced bone-regeneration and sinus-augmentation techniques are available when additional preparation is required."
                          }
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "ઇમિડિએટ લોડિંગ અને ફિક્સ દાંત" : "Immediate Loading & Fixed Teeth"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "જ્યાં ક્લિનિકલી યોગ્ય હોય ત્યાં વિશિષ્ટ ઇમ્પ્લાન્ટ પ્રોટોકોલ્સ ફિક્સ દાંતના સારવાર વિકલ્પોને સમર્થન આપે છે."
                            : "Specialised implant protocols support fixed-teeth treatment options where clinically appropriate."
                          }
                        </p>
                      </div>
                    </div>

                    {/* Bottom Reassurance */}
                    <div className="max-w-3xl mx-auto text-center pt-2">
                      <p className={`text-xs sm:text-sm leading-relaxed ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu'
                          ? "ક્લિનિકલ તપાસ અને યોગ્ય નિદાન મૂલ્યાંકન પછી તમારી સારવાર યોજના વ્યક્તિગત રીતે તૈયાર કરવામાં આવે છે."
                          : "Your treatment plan is personalised after clinical examination and appropriate diagnostic assessment."
                        }
                      </p>
                    </div>
                  </div>


                {/* Dental Implants: Technology  -  Patient Benefit Section */}
                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="dental-implants-technology-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "અદ્યતન ઇમ્પ્લાન્ટ ટેકનોલોજી" : "ADVANCED IMPLANT TECHNOLOGY"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "તમારી ઇમ્પ્લાન્ટ સારવાર માટે રચાયેલ અદ્યતન ટેકનોલોજી" : "Advanced Technology Designed Around Your Implant Treatment"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu'
                          ? "ડિજિટલ પ્લાનિંગ અને ગાઇડેડ ઇમ્પ્લાન્ટ પદ્ધતિઓ તમારી સારવાર ટીમને વધુ ચોકસાઈ અને વધુ નિયંત્રિત સર્જિકલ અભિગમ સાથે ઇમ્પ્લાન્ટ મૂકવાનું આયોજન કરવામાં મદદ કરે છે."
                          : "Digital planning and guided implant techniques help your treatment team plan implant placement with greater precision and a more controlled surgical approach."
                        }
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "ડિજિટલ અને ગાઇડેડ સર્જરી" : "Digital & Guided Surgery"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "ડિજિટલ પ્લાનિંગ અને ગાઇડેડ સર્જરી ચોક્કસ ઇમ્પ્લાન્ટ પ્લેસમેન્ટમાં મદદ કરે છે અને વધુ નિયંત્રિત સારવાર અભિગમ બનાવવામાં સહાય કરે છે."
                            : "Digital planning and guided surgery support precise implant placement and help create a more controlled treatment approach."
                          }
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "CBCT-આધારિત ડિજિટલ વર્કફ્લો" : "CBCT-Based Digital Workflow"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "CBCT-આધારિત ડિજિટલ પ્લાનિંગ સારવાર ટીમ માટે સારવાર પહેલાં ઇમ્પ્લાન્ટ સાઇટનું મૂલ્યાંકન કરવામાં અને સર્જિકલ વર્કફ્લોનું આયોજન કરવામાં મદદ કરે છે."
                            : "CBCT-based digital planning helps the treatment team assess the implant site and plan the surgical workflow before treatment."
                          }
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "ઇમિડિએટ લોડિંગ પ્રોટોકોલ્સ" : "Immediate Loading Protocols"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "જ્યારે ક્લિનિકલી યોગ્ય હોય ત્યારે અદ્યતન ઇમિડિએટ-લોડિંગ પ્રોટોકોલ્સ ફિક્સ દાંતના ઉકેલોને સમર્થન આપી શકે છે."
                            : "Advanced immediate-loading protocols can support fixed teeth solutions when clinically appropriate."
                          }
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "બોન અને સોફ્ટ ટિશ્યુ પ્લાનિંગ" : "Bone & Soft Tissue Planning"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-[#000000] font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "જ્યારે વધારાની સારવારની જરૂર હોય ત્યારે અદ્યતન બોન અને સોફ્ટ-ટિશ્યુ પદ્ધતિઓ જટિલ ઇમ્પ્લાન્ટ સાઇટ્સ તૈયાર કરવામાં મદદ કરે છે."
                            : "Advanced bone and soft-tissue techniques help prepare challenging implant sites when additional treatment is required."
                          }
                        </p>
                      </div>
                    </div>
                  </div>




      {/* Section 11: FAQ Accordion */}
      {faqElement}

      {/* Section 12: Bottom CTA */}
      {bottomCtaElement}

      {/* Section 13: Related Services (FINAL CONTENT SECTION, immediately ABOVE Footer) */}
      {relatedServicesElement}
    </div>
  );
};
