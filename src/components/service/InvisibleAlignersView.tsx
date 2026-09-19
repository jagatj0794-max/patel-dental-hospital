/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  Calendar 
} from 'lucide-react';
import { ServiceGalleryItem, MarketingConfig } from '../../types';
import { BeforeAfterSlider } from '../BeforeAfterSlider';
import { ClinicalCaseGallery } from '../ClinicalCaseGallery';
import { GooglePatientReviews } from '../GooglePatientReviews';
import { SurgicalTeamSection } from './SurgicalTeamSection';

export interface InvisibleAlignersViewProps {
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
  setCurrentPage?: (page: string) => void;
  language?: 'en' | 'gu';
}

export const InvisibleAlignersView: React.FC<InvisibleAlignersViewProps> = ({
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
  setCurrentPage,
  language
}) => {
  return (
                <div className="space-y-8 sm:space-y-16 lg:space-y-20">
                  {heroElement}

                  {/* Section 2: Symptom Qualification */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="symptom-qualification-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0D9488]" />
                        {language === 'gu' ? "લક્ષણોની યોગ્યતા" : "Symptom Qualification"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "તમારે Invisible Alignersની જરૂર પડી શકે છે જો…" : "You May Need Invisible Aligners If..."}
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto pt-8">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "હળવાથી મધ્યમ દાંતની ભીડ અથવા દાંત વચ્ચે ગેપ" : "Mild to Moderate Teeth Crowding or Spacing"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "તમે દાંત વચ્ચેના ગેપ અથવા હળવી ભીડને સુધારવા માટે વિશ્વસનીય અને અનુમાનિત ઉકેલ શોધી રહ્યા છો。"
                            : "You are looking for a reliable, predictable solution to align gaps or mild crowding."}
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "દાંત સીધા કરવા માટે ઓછું દેખાય તેવો વિકલ્પ" : "Desire for a Discrete Alignment Option"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "તમે કોઈને ખબર ન પડે તેમ દાંત સીધા કરવા માંગો છો અને દેખાતા મેટલ અથવા સિરામિક બ્રેસિસ ટાળવા માંગો છો。"
                            : "You want to straighten your teeth without anyone noticing, avoiding visible metal or ceramic braces."}
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "કાઢી શકાય તેવી ટ્રેની પસંદગી" : "Preference for Removable Trays"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "તમારી જીવનશૈલીને અનુકૂળ એવી સારવાર જોઈએ છે, જેમાં ખાવા, મીટિંગ અને ફોટોગ્રાફ્સ માટે ટ્રે સરળતાથી કાઢી શકાય。"
                            : "You want a treatment that fits your lifestyle, allowing you to remove trays easily for eating, meetings, and photographs."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Surgical Team Section */}
                  <SurgicalTeamSection setCurrentPage={setCurrentPage} />

                  {/* Section 3: Option Comparison */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="option-comparison-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "વિકલ્પોની સરખામણી" : "Option Comparison"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "બ્રેસિસ વિરુદ્ધ ક્લિયર એલાઇનર્સની સરખામણી" : "Braces vs. Clear Aligners Comparison"}
                      </h2>
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
                                  <span>{language === 'gu' ? "ઇનવિઝિબલ એલાઇનર્સ" : "Invisible Aligners"}</span>
                                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest whitespace-nowrap">
                                    {language === 'gu' ? "ભલામણ કરેલ" : "Recommended"}
                                  </span>
                                </div>
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                {language === 'gu' ? "મેટલ બ્રેસિસ" : "Metal Braces"}
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                {language === 'gu' ? "સિરામિક બ્રેસિસ" : "Ceramic Braces"}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            {/* Row 1: Visibility */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "દેખાવ" : "Visibility"}
                              </td>
                              <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'font-bold text-slate-900' : 'font-semibold text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>{language === 'gu' ? "લગભગ અદૃશ્ય" : "Nearly invisible"}</span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "સ્પષ્ટપણે દેખાય છે" : "Clearly visible"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "ઓછા દેખાય છે" : "Less visible"}
                              </td>
                            </tr>

                            {/* Row 2: Removable */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "કાઢી શકાય તેવા" : "Removable"}
                              </td>
                              <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'font-bold text-slate-900' : 'font-semibold text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>{language === 'gu' ? "હા" : "Yes"}</span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "ના" : "No"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "ના" : "No"}
                              </td>
                            </tr>

                            {/* Row 3: Food restrictions */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "ખોરાક સંબંધિત મર્યાદાઓ" : "Food restrictions"}
                              </td>
                              <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'font-bold text-slate-900' : 'font-semibold text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>{language === 'gu' ? "કોઈ નહીં - ખાવા માટે કાઢી શકાય" : "None  -  remove to eat"}</span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "ઘણી" : "Many"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "ઘણી" : "Many"}
                              </td>
                            </tr>

                            {/* Row 4: Cleaning your teeth */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "દાંતની સફાઈ" : "Cleaning your teeth"}
                              </td>
                              <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'font-bold text-slate-900' : 'font-semibold text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>{language === 'gu' ? "સામાન્ય" : "Normal"}</span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "મુશ્કેલ" : "Difficult"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "મુશ્કેલ" : "Difficult"}
                              </td>
                            </tr>

                            {/* Row 5: Clinic visits */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "ક્લિનિકની મુલાકાતો" : "Clinic visits"}
                              </td>
                              <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'font-bold text-slate-900' : 'font-semibold text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>{language === 'gu' ? "સારવારની સમયમર્યાદા માટે અમારો સંપર્ક કરો" : "Contact Us for Treatment Timeline"}</span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "સારવારની સમયમર્યાદા માટે અમારો સંપર્ક કરો" : "Contact Us for Treatment Timeline"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "સારવારની સમયમર્યાદા માટે અમારો સંપર્ક કરો" : "Contact Us for Treatment Timeline"}
                              </td>
                            </tr>

                            {/* Row 6: Discomfort */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "અસુવિધા" : "Discomfort"}
                              </td>
                              <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'font-bold text-slate-900' : 'font-semibold text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>{language === 'gu' ? "દરેક નવી ટ્રે સાથે હળવું દબાણ" : "Mild pressure with each new tray"}</span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "વાયર કસાવવો; અલ્સર થવાની શક્યતા" : "Wire tightening; possible ulcers"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "સમાન" : "Same"}
                              </td>
                            </tr>

                            {/* Row 7: Handles complex cases */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "જટિલ કેસ માટે યોગ્ય" : "Handles complex cases"}
                              </td>
                              <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'font-bold text-slate-900' : 'font-semibold text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>{language === 'gu' ? "હળવાથી મધ્યમ" : "Mild to moderate"}</span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "ગંભીર કેસ સહિત તમામ કેસ" : "All cases, including severe"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "તમામ કેસ" : "All cases"}
                              </td>
                            </tr>

                            {/* Row 8: Requires discipline */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "નિયમિત પાલનની જરૂર" : "Requires discipline"}
                              </td>
                              <td className={`p-4 sm:p-5 bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'font-bold text-slate-900' : 'font-semibold text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>{language === 'gu' ? "હા - દરરોજ 20-22 કલાક" : "Yes  -  20-22 hrs/day"}</span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "ના - સ્થિર રીતે લગાવેલા" : "No  -  fixed on"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "ના" : "No"}
                              </td>
                            </tr>

                            {/* Row 9: Cost */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "ખર્ચ" : "Cost"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Trust-Building Paragraph */}
                    <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left space-y-3 mt-4">
                      <div className="flex items-center gap-2 text-[#0D9488]">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <h4 className="font-sans font-bold text-sm sm:text-base text-[#081C3A]">
                          {language === 'gu' ? "સારવારની યોગ્યતા અંગે એક પ્રામાણિક નોંધ" : "An Honest Note on Treatment Suitability"}
                        </h4>
                      </div>
                      <p className={`text-xs sm:text-sm leading-relaxed ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                        {language === 'gu'
                          ? "પ્રામાણિક વાત એ છે કે એલાઇનર્સ ત્યારે જ અસરકારક રીતે કામ કરે છે જ્યારે તમે તેને નિયમિત રીતે પહેરો. જો તમને લાગે છે કે તમે તેને દરરોજ 22 કલાક પહેરી નહીં શકો, તો બ્રેસિસ ઓછા ખર્ચે વધુ યોગ્ય પરિણામ આપી શકે છે. ગંભીર દાંતની ભીડ અથવા જટિલ બાઇટ સુધારણા માટે બ્રેસિસ વધુ અનુમાનિત વિકલ્પ રહી શકે છે. તમારી કન્સલ્ટેશન દરમિયાન તમારા કેસ માટે કયો વિકલ્પ યોગ્ય છે તે અમે સ્પષ્ટ રીતે સમજાવીશું - અમે બંને વિકલ્પોની સારવાર કરીએ છીએ."
                          : "Honestly: aligners only work if you wear them. If you know you won't keep them in for 22 hours a day, braces will give you a better result for less money. And for severe crowding or complex bite correction, braces remain the more predictable option. We'll tell you at your consultation which one actually suits your case  -  we fit both."
                        }
                      </p>
                    </div>
                  </div>

                  {/* Section 5: Interactive Before & After Smile Transformations */}
                  {mConfig.show_before_after !== false && beforeAfterPairs.length > 0 && (
                    <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="before-after-gallery-section">
                      <div className="space-y-3 max-w-3xl mx-auto text-center">
                        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                          <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                          {language === 'gu' ? "ટ્રાન્સફોર્મેશન્સ" : "Transformations"}
                        </span>
                        <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                          {language === 'gu' ? "ઇનવિઝિબલ એલાઇનર્સ પહેલાં અને પછીના પરિવર્તનો" : seoHeadings.transformations}
                        </h2>
                        <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                          {language === 'gu' ? "અમારા ઇનવિઝિબલ એલાઇનર્સના દર્દીઓના સ્માઇલમાં થયેલા વાસ્તવિક પરિવર્તનો જુઓ。" : (mConfig.before_after_description || 'See real smile transformations of our invisible aligners patients.')}
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
                      heading={language === 'gu' ? "ઇનવિઝિબલ એલાઇનર્સ ક્લિનિકલ કેસ ગેલેરી" : seoHeadings.caseGallery}
                      description={language === 'gu' ? "ઇનવિઝિબલ એલાઇનર્સના ક્લિનિકલ કેસમાં થયેલા પરિવર્તનો।" : mConfig.gallery_description}
                      items={Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery}
                      singleGallery={true}
                      language={language}
                    />
                  )}

                  {testimonialsElement}

                  {/* Section 10: Google Patient Reviews (100% CMS-driven premium slider) */}
                  {mConfig.show_google_reviews !== false && (
                    <GooglePatientReviews
                      label={language === 'gu' ? "ગૂગલ રિવ્યૂઝ" : "Google Reviews"}
                      heading={language === 'gu' ? "ઇનવિઝિબલ એલાઇનર્સ માટે દર્દીઓના ગૂગલ રિવ્યૂઝ" : seoHeadings.reviews}
                      reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
                    />
                  )}

                  {/* Section 4: Transparent Pricing */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="transparent-pricing-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "પારદર્શક કિંમત" : "TRANSPARENT PRICING"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "ઇનવિઝિબલ એલાઇનર્સની પારદર્શક કિંમત" : "Transparent Invisible Aligners Pricing"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu' 
                          ? "અમે સંપૂર્ણ કિંમત પારદર્શિતામાં માનીએ છીએ. નીચે કસ્ટમ એલાઇનર સારવાર માટેના વિવિધ વિકલ્પો આપેલા છે."
                          : "We believe in complete pricing transparency. Below are the structured options for custom aligner treatments."}
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-4xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[540px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                {language === 'gu' ? "એલાઇનર પ્લાન" : "Aligner Plan"}
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                {language === 'gu' ? "શરૂઆતની કિંમત" : "Starting Price"}
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                {language === 'gu' ? "સારવારનો વ્યાપ" : "Scope of Treatment"}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "નાનો સુધારો" : "Minor correction"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "નાના ફેરફારો અને હળવા એલાઇનમેન્ટ માટે" : "Minor adjustments and slight alignments"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "મધ્યમ સુધારો" : "Moderate correction"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "એક અથવા બંને આર્ચમાં મધ્યમ દાંતની ભીડનો સંપૂર્ણ સુધારો" : "Full single or dual arch moderate crowding correction"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "વ્યાપક સારવાર" : "Comprehensive"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "બહુવિધ આર્ચમાં વ્યાપક બાઇટ અને એલાઇનમેન્ટ સુધારણા" : "Multi-arch comprehensive bite and alignment correction"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "સારવાર પછી રિટેનર્સ" : "Retainers after treatment"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "તમારા નવા સ્માઇલને જાળવી રાખવા માટે જરૂરી સારવાર પછીનું રિટેન્શન" : "Crucial post-treatment retention to hold your new smile"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "જરૂર પડે તો રિફાઇનમેન્ટ એલાઇનર્સ" : "Refinement aligners if needed"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "અંતિમ શ્રેષ્ઠ એલાઇનમેન્ટ મેળવવા માટે ફાઇન-ટ્યુનિંગ ટ્રે" : "Fine-tuning trays to achieve optimal final alignment"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 space-y-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                          <div className="space-y-1">
                            <p className="text-xs sm:text-sm text-slate-700 font-bold">
                              {language === 'gu' ? "દરેક પ્લાનમાં સામેલ:" : "Included in every plan:"}
                            </p>
                            <p className={`text-xs max-w-xl ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                              {language === 'gu' 
                                ? "CBCT અને ઇન્ટ્રાઓરલ સ્કેન, ડિજિટલ સારવાર સિમ્યુલેશન, તમામ એલાઇનર સેટ્સ અને તમામ રિવ્યૂ એપોઇન્ટમેન્ટ્સ।"
                                : "CBCT and intraoral scan, digital treatment simulation, all aligner sets, and all review appointments."}
                            </p>
                          </div>
                          <button
                            onClick={() => openAppointmentModal('Invisible Aligners Pricing - Consultation')}
                            className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
                          >
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>{language === 'gu' ? "એલાઇનર કન્સલ્ટેશન બુક કરો" : "Book Aligner Consultation"}</span>
                          </button>
                        </div>

                        <div className="border-t border-slate-200/60 pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-700">
                          <div>
                             {language === 'gu' ? "EMI વિકલ્પો:" : "EMI Options:"} <span className="text-[#0D9488]">{language === 'gu' ? "EMI ઉપલબ્ધ છે" : "EMI available"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Timeline */}
                  <div className="pt-6 sm:pt-14 border-t border-slate-200/60" id="timeline-section">
                    <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[28px] sm:rounded-[36px] p-6 sm:p-12 lg:p-14 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
                      {/* Heading area */}
                      <div className="space-y-3 max-w-2xl mx-auto text-center mb-10 sm:mb-14">
                        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                          <Clock className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                          {language === 'gu' ? "સારવારની સમયમર્યાદા" : "TREATMENT TIMELINE"}
                        </span>
                        <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                          {language === 'gu' ? "તમારી ઇનવિઝિબલ એલાઇનર સારવારની સમયમર્યાદા" : "Your Invisible Aligner Treatment Timeline"}
                        </h2>
                        <p className={`text-sm sm:text-base leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-normal'}`}>
                          {language === 'gu' ? (
                            "સારવારની સમયમર્યાદા: સારવારની સમયમર્યાદા માટે અમારો સંપર્ક કરો. ડિજિટલ સિમ્યુલેશન તમારા દાંત અંતિમ સ્થિતિ સુધી અઠવાડિયા પ્રમાણે કેવી રીતે ખસશે તે દર્શાવે છે."
                          ) : (
                            <>
                              Treatment Timeline: <span className="font-bold text-[#0D9488]">Contact Us for Treatment Timeline</span>. Digital simulation shows your teeth moving week by week to the final position.
                            </>
                          )}
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
                              {language === 'gu' ? "ડિજિટલ સિમ્યુલેશન" : "Digital Simulation"}
                            </h3>
                            <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                              {language === 'gu' 
                                ? "તમારા દાંત અઠવાડિયા પ્રમાણે કેવી રીતે ખસશે તેનું ડિજિટલ સિમ્યુલેશન તૈયાર કરવા માટે CBCT અને ઇન્ટ્રાઓરલ સ્કેનિંગ।"
                                : "CBCT and intraoral scanning to generate a digital simulation of your teeth moving week by week."}
                            </p>
                          </div>

                          {/* Step 2 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              2
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "કસ્ટમ મેન્યુફેક્ચરિંગ" : "Custom Manufacture"}
                            </h3>
                            <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                              {language === 'gu' 
                                ? "તમારા માટે યોગ્ય કદની સંપૂર્ણ શ્રેણીની પારદર્શક અને કાઢી શકાય તેવી એલાઇનર ટ્રેનું નિર્માણ।"
                                : "Fabrication of your complete series of custom-fit clear, removable aligner trays."}
                            </p>
                          </div>

                          {/* Step 3 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              3
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "એલાઇનર પ્રોગ્રેશન" : "Aligner Progression"}
                            </h3>
                            <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                              {language === 'gu' 
                                ? "દરરોજ 20-22 કલાક ટ્રે પહેરો અને દાંત એલાઇન થતાં ક્રમ પ્રમાણે આગળની ટ્રે તરફ આગળ વધો।"
                                : "Wear trays for 20-22 hours daily, progressing to the next tray in sequence as teeth align."}
                            </p>
                          </div>

                          {/* Step 4 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              4
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "ક્લિનિક પ્રોગ્રેસ રિવ્યૂઝ" : "Clinic Progress Reviews"}
                            </h3>
                            <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                              {language === 'gu' 
                                ? "Patel Dental Hospital ખાતે નિયમિત પ્રોગ્રેસ ચેક-અપ્સ। સારવારની સમયમર્યાદા અને મુલાકાતોના અંતર માટે અમારો સંપર્ક કરો।"
                                : "Regular progress check-ups at Patel Dental Hospital. Contact us for treatment timeline and visit intervals."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 6: Risk Reversal */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="warranty-reassurance-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "જોખમ નિવારણ અને ખાતરી" : "RISK REVERSAL & REASSURANCE"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "એલાઇનર્સ માટે અમારું તમને વચન" : "Our Aligner Commitment to You"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu' 
                          ? "તમે ચૂકવણી કરો તે પહેલાં તમારું અંતિમ અંદાજિત પરિણામ જુઓ. રિફાઇનમેન્ટ, રિટેનર્સ અને ક્લિનિકલ અનુકૂળતા વિશે સંપૂર્ણ પારદર્શિતા."
                          : "See your final predicted result before you pay, with total transparency around refinement, retainers, and clinical suitability."}
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Point 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "ચૂકવણી કરતા પહેલાં તમારું અંતિમ પરિણામ જુઓ" : "See your final result before you pay"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' 
                            ? "સ્કેનિંગ પછી, સારવાર શરૂ કરતા પહેલાં તમારા દાંત અઠવાડિયા પ્રમાણે કેવી રીતે ખસશે તેનું ડિજિટલ સિમ્યુલેશન જુઓ. જો તમને અંદાજિત પરિણામ પસંદ ન આવે, તો તમે આગળ વધશો નહીં."
                            : "After the scan, see a digital simulation of your teeth moving week by week to the final position before committing to treatment. If you don't like the predicted result, you don't proceed."}
                        </p>
                      </div>

                      {/* Point 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "રિફાઇનમેન્ટ અને રિટેનર પોલિસી" : "Refinement & Retainer Policies"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' 
                            ? "ગુમ થયેલા એલાઇનરના રિપ્લેસમેન્ટ, રિટેનરનો ખર્ચ/સમાવેશ અને ફાઇન-ટ્યુનિંગ રિફાઇનમેન્ટ ટ્રે વિશેની સંપૂર્ણ વિગતો તમારી પ્રારંભિક સારવાર સમજૂતીમાં આપેલી છે."
                            : "Transparency around lost aligner replacement, retainer cost/inclusion, and fine-tuning refinement trays is fully detailed inside your initial treatment agreement."}
                        </p>
                      </div>

                      {/* Point 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "ક્લિનિકલ અનુકૂળતાની તપાસ" : "Clinical Suitability Check"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' 
                            ? "જો તમારો કેસ ક્લિનિકલ રીતે અનુકૂળ હોય તો જ અમે ક્લિયર એલાઇનર્સની ભલામણ કરીએ છીએ. જો પરંપરાગત બ્રેસિસ વધુ સુરક્ષિત અથવા વધુ સચોટ પરિણામ આપનારા હોય, તો અમે તમને પ્રમાણિક સલાહ આપીશું."
                            : "We only recommend clear aligners if your specific case is clinically suitable. If traditional braces remain a safer or more predictable choice, we will advise you honestly."}
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={() => openAppointmentModal('Invisible Aligners - Reassurance CTA')}
                        className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
                      >
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span>{language === 'gu' ? "તમારા એલાઇનર વિકલ્પોની ચર્ચા કરો" : "Discuss Your Aligner Options"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Section 6: Procedure Video (Loaded dynamically from CMS Instagram Reel) */}
                  {videoElement}

                  {/* Section 8: Why This Clinic / Doctor (Why Patel Dental) */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="aligner-expertise-why-patel-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "શા માટે પટેલ ડેન્ટલ" : "WHY PATEL DENTAL"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "તમારી સારવાર પર કેન્દ્રિત એડવાન્સ એલાઇનર નિપુણતા" : "Advanced Aligner Expertise Focused on Your Treatment"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu'
                          ? "તમારી ઇનવિઝિબલ એલાઇનર સારવારનું પ્લાનિંગ ચોક્કસ અને વ્યક્તિગત સારવાર પૂરી પાડવા માટે એડવાન્સ ઓર્થોડોન્ટિક્સ નિપુણતા, ડિજિટલ પ્લાનિંગ અને ટેકનિક સાથે કરવામાં આવે છે."
                          : "Your invisible aligner treatment is planned with advanced orthodontics expertise, digital planning and techniques designed to provide precise, personalised care."}
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "CBCT પ્લાનિંગ" : "CBCT Planning"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "સુરક્ષિત અને ચોક્કસ દાંતના હલનચલનને સુનિશ્ચિત કરવા માટે અમે તમારા હાડકાની રચના અને મૂળની એનાટોમીનું વિશ્લેષણ કરવા માટે હાઇ-ડેફિનેશન CBCT સ્કેનનો ઉપયોગ કરીએ છીએ."
                            : "We use high-definition CBCT scans to analyze your bone structure and root anatomy, ensuring safe and predictable tooth movement."}
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "ઇન્ટ્રાઓરલ સ્કેનિંગ" : "Intraoral Scanning"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "પરંપરાગત માટીના બીબામાંથી મુક્તિ મેળવો. અમારું 3D ઇન્ટ્રાઓરલ સ્કેનર મિનિટોમાં તમારા દાંતની અત્યંત સચોટ ડિજિટલ છાપ (impressions) લે છે."
                            : "Say goodbye to messy traditional clay molds. Our 3D intraoral scanner captures highly accurate digital impressions of your teeth in minutes."}
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "ડિજિટલ સિમ્યુલેશન" : "Digital Simulation"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "તમારી વ્યક્તિગત સારવારનું અનુમાન પહેલાંથી જ જુઓ. અમારો ડિજિટલ વર્કફ્લો ટ્રે બનાવતા પહેલાં દાંતના હલનચલનના દરેક તબક્કાનો નકશો તૈયાર કરે છે."
                            : "See your personalized treatment projection beforehand. Our digital workflow maps out each stage of tooth movement before tray fabrication."}
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "અનુકૂળતાનું મૂલ્યાંકન" : "Suitability Assessment"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "અમે તમારા સ્વાસ્થ્યને પ્રાથમિકતા આપીએ છીએ. જો તમારો કેસ ક્લિનિકલ રીતે અનુકૂળ હોય તો જ અમે એલાઇનર્સની ભલામણ કરીએ છીએ, અન્યથા પરંપરાગત બ્રેસિસનો વિકલ્પ સૂચવીએ છીએ."
                            : "We prioritize your health. We only recommend aligners if your specific case is clinically suitable, otherwise recommending predictable traditional alternatives."}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Reassurance */}
                    <div className="max-w-3xl mx-auto text-center pt-2">
                      <p className={`text-xs sm:text-sm font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'} leading-relaxed`}>
                        {language === 'gu'
                          ? "ક્લિનિકલ પરીક્ષણ અને યોગ્ય નિદાન મૂલ્યાંકન પછી તમારી સારવાર યોજના વ્યક્તિગત રીતે તૈયાર કરવામાં આવે છે।"
                          : "Your treatment plan is personalised after clinical examination and appropriate diagnostic assessment."}
                      </p>
                    </div>
                  </div>

                  {/* Section 9: Advanced Aligner Technology */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="aligner-technology-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "એડવાન્સ એલાઇનર ટેકનોલોજી" : "ADVANCED ALIGNER TECHNOLOGY"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "તમારી એલાઇનર સારવાર માટે તૈયાર કરાયેલી અદ્યતન ટેકનોલોજી" : "Advanced Technology Designed Around Your Aligner Treatment"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu'
                          ? "ડિજિટલ પ્લાનિંગ અને ગાઇડેડ એલાઇનર ટેકનિક અમારા સારવાર જૂથને વધુ ચોકસાઇ અને નિયંત્રિત ઓર્થોડોન્ટિક અભિગમ સાથે દાંત ગોઠવવામાં મદદ કરે છે."
                          : "Digital planning and guided aligner techniques help your treatment team plan teeth alignment with greater precision and a more controlled orthodontic approach."}
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch justify-center">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "હાઇ-ડેફિનેશન CBCT ડાયગ્નોસ્ટિક્સ" : "High-Definition CBCT Diagnostics"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "દાંતના મૂળના ખૂણા અને આસપાસના હાડકાનું ચોક્કસ વિઝ્યુલાઇઝેશન પૂરું પાડે છે, જેથી દાંતનું હલનચલન જૈવિક મર્યાદામાં સુરક્ષિત રીતે થાય।"
                            : "Allows precise visualization of root angles and surrounding bone, ensuring tooth movement occurs safely within healthy biological boundaries."}
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "3D ઇન્ટ્રાઓરલ સ્કેનિંગ" : "3D Intraoral Scanning"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "મિનિટોમાં તમારા દાંતનું હાઇ-રિઝોલ્યુશન ડિજિટલ મોડેલ તૈયાર કરે છે, જેનાથી પરંપરાગત બીબાંની ઝંઝટ ટળે છે અને એલાઇનર ટ્રે બરાબર ફિટ બેસે છે।"
                            : "Generates a perfect, high-resolution digital model of your teeth in minutes, avoiding messy traditional impressions and maximizing aligner tray fit."}
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "ડિજિટલ સ્માઇલ સિમ્યુલેશન" : "Digital Smile Simulation"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "તમારા દાંતના ક્રમિક હલનચલનનો અઠવાડિયા પ્રમાણે નકશો તૈયાર કરે છે જેથી એલાઇનર બનતા પહેલાં જ તમે તમારું અંતિમ આકર્ષક સ્માઇલ જોઈ શકો।"
                            : "Maps out the sequential movement of your teeth week-by-week so you can preview your final straight smile before your aligners are manufactured."}
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
