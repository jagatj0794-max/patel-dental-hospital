/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  Clock 
} from 'lucide-react';
import { ServiceGalleryItem, MarketingConfig } from '../../types';
import { BeforeAfterSlider } from '../BeforeAfterSlider';
import { ClinicalCaseGallery } from '../ClinicalCaseGallery';
import { GooglePatientReviews } from '../GooglePatientReviews';
import { SurgicalTeamSection } from './SurgicalTeamSection';

export interface RootCanalViewProps {
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
  language?: string;
}

export const RootCanalView: React.FC<RootCanalViewProps> = ({
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
  language
}) => {
  return (
    <div className="space-y-8 sm:space-y-16 lg:space-y-20">
      {heroElement}
      {featuredVideoElement}

                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="symptom-qualification-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0D9488]" />
                        {language === 'gu' ? "લક્ષણોની ઓળખ" : "Symptom Qualification"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "જો તમને આ લક્ષણો હોય તો રૂટ કેનલની જરૂર પડી શકે છે..." : "You May Need a Root Canal If..."}
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-8 max-w-7xl mx-auto pt-8">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "તીવ્ર, ધબકારા સાથે થતો દાંતનો દુખાવો" : "Severe, Throbbing Toothache"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' 
                            ? "સતત અને ધબકારા સાથે થતો દુખાવો, જે સૂતી વખતે અથવા ચાવવામાં દબાણ આપવાથી વધુ વધી જાય."
                            : "Persistent, pounding pain that worsens when lying down or applying chewing pressure."
                          }
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "ગરમ અને ઠંડા પ્રત્યે અત્યંત સંવેદનશીલતા" : "Extreme Hot & Cold Sensitivity"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "ગરમ અથવા ઠંડો ખોરાક/પીણું દૂર કર્યા પછી પણ મિનિટો સુધી રહેતો સતત દુખાવો."
                            : "Lingering pain that remains for minutes even after hot or cold food/drink is removed."
                          }
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "પેઢામાં સોજો અને સ્પર્શથી દુખાવો" : "Gum Swelling & Tenderness"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "દુખતા દાંતની આસપાસ પેઢામાં સ્પર્શથી દુખાવો, સોજો અથવા કાળાશ, ક્યારેક ખીલ જેવા ગાંઠ સાથે."
                            : "Tender, swollen, or dark gums near the painful tooth, sometimes with a pimple-like bump."
                          }
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2 md:col-start-2">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "ચાવતી વખતે અથવા કરડતી વખતે દુખાવો" : "Pain When Chewing or Biting"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "ભોજન દરમિયાન કોઈ ચોક્કસ દાંત પર કરડતી વખતે થતો તીવ્ર દુખાવો અથવા તે દાંતથી કરડી ન શકવું."
                            : "Sharp, intense discomfort or inability to bite down on a specific tooth during meals."
                          }
                        </p>
                      </div>

                      {/* Card 5 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left md:col-span-2">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "દાંતનો રંગ બદલાવો અથવા કાળાશ" : "Tooth Discoloration or Darkening"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "દાંતનો રંગ ગ્રે, કાળો અથવા ઘેરો થઈ જવો, જે અંદરની નસ મૃત્યુ પામી ગઈ છે અથવા મૃત્યુ પામી રહી છે તે દર્શાવી શકે છે."
                            : "A tooth that has turned grey, black, or dark, indicating the nerve inside has died or is dying."
                          }
                        </p>
                      </div>
                    </div>
                  </div>


                  {/* Surgical Team Section */}
                  <SurgicalTeamSection setCurrentPage={setCurrentPage} />

                {/* Section 3: Option Comparison for Root Canal */}
                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="option-comparison-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "વિકલ્પોની તુલના" : "Option Comparison"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "સિંગલ સિટિંગ RCT વિરુદ્ધ અન્ય વિકલ્પો" : "Single Sitting RCT vs. Other Options"}
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
                                  <span>{language === 'gu' ? "સિંગલ સિટિંગ RCT" : "Single Sitting RCT"}</span>
                                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest whitespace-nowrap">
                                    {language === 'gu' ? "ભલામણ કરેલ" : "Recommended"}
                                  </span>
                                </div>
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                {language === 'gu' ? "મલ્ટિપલ વિઝિટ RCT" : "Multiple Visit RCT"}
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                {language === 'gu' ? "દાંત કાઢવાની સારવાર" : "Tooth Extraction"}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "જરૂરી મુલાકાતો" : "Visits Required"}
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>
                                    {language === 'gu' ? "1 મુલાકાત - 45-60 મિનિટમાં પૂર્ણ" : "1 visit  -  Completed in 45-60 mins"}
                                  </span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "3-4 મુલાકાતો - અનેક અપોઇન્ટમેન્ટ જરૂરી" : "3-4 visits  -  Requires multiple appointments"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "1 મુલાકાત - ત્યારબાદ રિપ્લેસમેન્ટ હીલિંગ માટે ઘણા મહિનાઓ" : "1 visit  -  Followed by months of replacement healing"}
                              </td>
                            </tr>

                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "સફળતા અને જાળવણી" : "Success & Preservation"}
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>
                                    {language === 'gu' ? "95%-98% - કુદરતી દાંત અને હાડકાને જાળવે છે" : "95%-98%  -  Saves natural tooth & bone"}
                                  </span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "85%-90% - મુલાકાતો વચ્ચે ફરીથી ઇન્ફેક્શન થવાનું વધુ જોખમ" : "85%-90%  -  Higher risk of re-infection between visits"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "0% - કુદરતી દાંતની રચનાનું કાયમી નુકસાન" : "0%  -  Permanent loss of natural tooth structure"}
                              </td>
                            </tr>

                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "એનેસ્થેસિયા અને આરામ" : "Anesthesia & Comfort"}
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>
                                    {language === 'gu' ? "1 ઇન્જેક્શન - અસુવિધા ઓછી" : "1 injection  -  Minimized discomfort"}
                                  </span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "3-4 ઇન્જેક્શન - વારંવાર સોયના કારણે તણાવ અને દુખાવો" : "3-4 injections  -  Recurrent needle stress & soreness"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "1 ઇન્જેક્શન - દાંત કાઢ્યા પછી સોકેટમાં નોંધપાત્ર દુખાવો" : "1 injection  -  Significant post-extraction socket pain"}
                              </td>
                            </tr>

                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "ક્રોસ-ઇન્ફેક્શનનું જોખમ" : "Cross-Infection Risk"}
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>
                                    {language === 'gu' ? "શૂન્ય - કેનલ તરત જ સીલ કરવામાં આવે છે" : "Zero  -  Canal sealed immediately"}
                                  </span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "મધ્યમ - ટેમ્પરરી ફિલિંગમાંથી લાળ/બેક્ટેરિયા પ્રવેશી શકે છે" : "Moderate  -  Temporary fillings can leak saliva/bacteria"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "ઓછું - ડ્રાય સોકેટ અથવા સ્થાનિક હાડકાના ઇન્ફેક્શનનું જોખમ" : "Low  -  Risk of dry socket or localized bone infection"}
                              </td>
                            </tr>

                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "10 વર્ષનો કુલ ખર્ચ" : "Total Cost over 10 Years"}
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>{language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}</span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "સૌથી વધુ - પછીથી મોંઘા બ્રિજ/ઇમ્પ્લાન્ટ્સની જરૂર પડી શકે છે" : "Highest  -  Requires expensive bridges/implants later"}
                              </td>
                            </tr>

                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "બાઇટ અને ચાવવાની ક્ષમતા પુનઃસ્થાપિત" : "Bite & Chewing Restored"}
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>{language === 'gu' ? "100% કુદરતી બાઇટ અને સપોર્ટ પુનઃસ્થાપિત" : "100% natural bite & support restored"}</span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "ફાઇનલ ક્રાઉન મૂક્યા પછી 100% પુનઃસ્થાપિત" : "100% restored after final crown placement"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu' ? "ચાવવાની ક્ષમતાનું કાયમી નુકસાન; આસપાસના દાંત ખસી શકે છે" : "Permanent chewing loss; neighboring teeth shift"}
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
                {language === 'gu' ? "પરિવર્તનો" : "Transformations"}
              </span>
              <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                {language === 'gu' ? "રૂટ કેનલ સારવાર પહેલાં અને પછીના પરિવર્તનો" : seoHeadings.transformations}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-medium font-sans">
                {language === 'gu' ? "અમારા દર્દીઓના વાસ્તવિક સ્માઇલ પરિવર્તનો જુઓ." : (mConfig.before_after_description || "See real smile transformations of our patients.")}
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
            heading={language === 'gu' ? "રૂટ કેનલ સારવાર ક્લિનિકલ કેસ ગેલેરી" : seoHeadings.caseGallery}
            description={mConfig.gallery_description}
            items={Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery}
            singleGallery={true}
            language={language}
          />
        )}

        {testimonialsElement}

        {/* Section 10: Google Patient Reviews (100% CMS-driven premium slider) */}
        {mConfig.show_google_reviews !== false && (
          <GooglePatientReviews
            heading={language === 'gu' ? "રૂટ કેનલ સારવાર માટે Google દર્દી રિવ્યૂઝ" : seoHeadings.reviews}
            reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
            language={language}
          />
        )}


                {/* Section 4: Transparent Pricing for Root Canal */}
                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="transparent-pricing-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "પારદર્શક કિંમત" : "TRANSPARENT PRICING"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "પારદર્શક સિંગલ સિટિંગ RCT કિંમત" : "Transparent Single Sitting RCT Pricing"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu' ? "રૂટ કેનલ સારવારનો ખર્ચ દાંતની રચના, સ્થાન, ઇન્ફેક્શનની ગંભીરતા અને કાયમી ક્રાઉન અથવા રી-ટ્રીટમેન્ટની જરૂરિયાત પર આધાર રાખે છે." : "The cost of root canal treatment depends on tooth anatomy, location, infection severity, and whether permanent crowning or re-treatment is required."}
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
                                {language === 'gu' ? "આગળના દાંતની રૂટ કેનલ સારવાર" : "Front tooth Root Canal Treatment"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "એક જ રૂટ ધરાવતા આગળના દાંત (ઇન્સાઇઝર્સ અને કેનાઇન્સ)" : "Single-rooted anterior teeth (incisors & canines)"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "પ્રીમોલરની રૂટ કેનલ સારવાર" : "Premolar Root Canal Treatment"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "મધ્ય ભાગના પ્રીમોલર દાંત જેમાં 1-2 રૂટ કેનલ હોય" : "Mid-arch premolar teeth with 1-2 root canals"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "મોલરની રૂટ કેનલ સારવાર" : "Molar Root Canal Treatment"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "બહુવિધ રૂટ ધરાવતા પાછળના મોલર દાંત" : "Multi-rooted posterior molar teeth"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "રૂટ કેનલ રી-ટ્રીટમેન્ટ" : "Root Canal Re-treatment"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "અગાઉ સારવાર કરાયેલી કેનલનું રિવિઝન અથવા રી-ટ્રીટમેન્ટ" : "Revision or re-treatment of previously treated canals"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "ક્રાઉન" : "Crown"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "રૂટ કેનલ સારવાર કરાયેલા દાંતનું લાંબા ગાળાનું રક્ષણ અને મજબૂતીકરણ" : "Long-term protection and reinforcement of root-treated teeth"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "રૂટ કેનલ + ક્રાઉન સંયુક્ત સારવાર" : "Root Canal + Crown bundled treatment"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "કાયમી ક્રાઉન રિસ્ટોરેશન સાથે સંપૂર્ણ સિંગલ સિટિંગ RCT" : "Complete single-sitting RCT with permanent crown restoration"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                        <p className={`text-xs sm:text-sm max-w-xl ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                          {language === 'gu' ? "તમારી અંતિમ સારવાર યોજના અને ખર્ચ ક્લિનિકલ તપાસ અને ડાયગ્નોસ્ટિક એસેસમેન્ટ પછી નક્કી કરવામાં આવશે." : "Your final treatment plan and cost will be determined after a clinical examination and diagnostic assessment."}
                        </p>
                        <button
                          onClick={() => openAppointmentModal('Single Sitting Root Canal Treatment')}
                          className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
                        >
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span>{language === 'gu' ? "વ્યક્તિગત સારવાર યોજના મેળવો" : "Get a Personalized Treatment Plan"}</span>
                        </button>
                      </div>
                    </div>
                  </div>


                {/* Section 5: Treatment Timeline for Root Canal */}
                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="timeline-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center mb-10 sm:mb-14">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <Clock className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "સારવારની સમયમર્યાદા" : "TREATMENT TIMELINE"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "તમારી રૂટ કેનલ સારવારની સમયમર્યાદા" : "Your Root Canal Treatment Timeline"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-normal'}`}>
                        {language === 'gu' ? (
                          <>
                            સારવારની સમયમર્યાદા: <span className="font-bold text-[#0D9488]">સારવારની સમયમર્યાદા માટે અમારો સંપર્ક કરો</span>. એક જ કાર્યક્ષમ સિટિંગમાં સુરક્ષિત રીતે પૂર્ણ કરવામાં આવે છે.
                          </>
                        ) : (
                          <>
                            Treatment Timeline: <span className="font-bold text-[#0D9488]">Contact Us for Treatment Timeline</span>. Completed safely in a single efficient sitting.
                          </>
                        )}
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                      <div className="relative">
                        {/* Horizontal connector line on desktop/tablet */}
                        <div className="hidden md:block absolute top-[36px] left-[12.5%] right-[12.5%] h-[2px] bg-[#5eead4] z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                          {/* Step 1 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm font-sans">
                              1
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "નિદાન અને ડિજિટલ X-Ray" : "Diagnosis & Digital X-Ray"}
                            </h3>
                            <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-normal'}`}>
                              {language === 'gu' ? "3D CBCT ઇમેજિંગ અને ડિજિટલ X-Ray કેનલની ઊંડાઈ ચોકસાઈથી માપે છે અને ઇન્ફેક્શનની સીમાની ચકાસણી કરે છે." : "3D CBCT imaging and digital X-rays precisely measure canal depth and verify infection boundaries."}
                            </p>
                          </div>

                          {/* Step 2 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm font-sans">
                              2
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "ચોકસાઇપૂર્વક ડિસઇન્ફેક્શન" : "Precision Disinfection"}
                            </h3>
                            <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-normal'}`}>
                              {language === 'gu' ? "અદ્યતન જાપાનીઝ રોટરી એન્ડો મોટર્સ ઇન્ફેક્ટેડ કેનલને હળવાશથી સાફ, આકારબદ્ધ અને સંપૂર્ણપણે સ્ટેરિલાઇઝ કરે છે." : "Advanced Japanese rotary endo motors gently clean, shape, and fully serialize infected canals instantly."}
                            </p>
                          </div>

                          {/* Step 3 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm font-sans">
                              3
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "બાયોકોમ્પેટિબલ સીલિંગ" : "Biocompatible Sealing"}
                            </h3>
                            <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-normal'}`}>
                              {language === 'gu' ? "ડિસઇન્ફેક્ટ કરાયેલી રૂટ કેનલને ઉચ્ચ ગુણવત્તાવાળા બાયોકોમ્પેટિબલ Gutta Percha અથવા MTA સીલરથી સીલ કરવામાં આવે છે જેથી બેક્ટેરિયા અંદર પ્રવેશી ન શકે." : "The disinfected root canal is sealed with high-grade, bio-compatible Gutta Percha or MTA sealer to seal out bacteria."}
                            </p>
                          </div>

                          {/* Step 4 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-[#0D9488] border-2 border-[#0D9488] flex items-center justify-center text-white font-bold text-xl mb-5 shadow-md font-sans">
                              4
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "કસ્ટમ ક્રાઉન પ્લેસમેન્ટ" : "Custom Crown Placement"}
                            </h3>
                            <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-normal'}`}>
                              {language === 'gu' ? "સારવાર કરાયેલા દાંત પર ટકાઉ, કસ્ટમ-ફેબ્રિકેટેડ સિરામિક ક્રાઉન મૂકવામાં આવે છે જેથી ચાવવાની સંપૂર્ણ ક્ષમતા પુનઃસ્થાપિત થાય." : "A durable, custom-fabricated ceramic crown is placed over the treated tooth to restore full chewing power."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                {/* Section 6: Risk Reversal / Reassurance for Root Canal */}
                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="warranty-reassurance-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "આશ્વાસન અને પારદર્શિતા" : "REASSURANCE & TRANSPARENCY"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "તમારા કુદરતી દાંતને બચાવવા માટે અમારું આશ્વાસન" : "Our Reassurance to Save Your Natural Tooth"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu' ? "ગંભીર દાંતના દુખાવાની સારવાર કરાવવી એ એક મહત્વપૂર્ણ નિર્ણય છે. અમે સંપૂર્ણ ક્લિનિકલ સ્પષ્ટતા, આરામદાયક આધુનિક એનેસ્થેસિયા અને પ્રામાણિક ભલામણો પ્રદાન કરીએ છીએ જેથી તમે 100% નિશ્ચિંત અનુભવો." : "Treating a severe toothache is an important choice. We provide absolute clinical clarity, comfortable modern anesthesia, and honest recommendations so you feel 100% secure."}
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Point 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "પીડારહિત સારવાર પ્રોટોકોલ" : "Painless Treatment Protocol"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "તમારી રૂટ કેનલ સારવાર સંપૂર્ણપણે આરામદાયક અને પીડારહિત રહે તે માટે અમે કમ્પ્યુટરાઇઝ્ડ લોકલ એનેસ્થેસિયા, બારીક સોય અને વિશિષ્ટ એન્ડોડોન્ટિક કૂલિંગ ઇરિગેશનનો ઉપયોગ કરીએ છીએ." : "We utilize computerized local anesthesia, fine needles, and specialized endodontic cooling irrigation to ensure your root canal treatment is completely comfortable and pain-free."}
                        </p>
                      </div>

                      {/* Point 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "ક્લિનિકલ યોગ્યતાની ચકાસણી" : "Clinical Suitability Verification"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "અમે માત્ર એવા દાંતમાં જ સિંગલ સિટિંગ રૂટ કેનલ કરીએ છીએ જે ક્લિનિકલી યોગ્ય હોય. જો ઊંડા ક્રોનિક બોન ઇન્ફેક્શન માટે મલ્ટી-સિટિંગ અભિગમ વધુ સુરક્ષિત હોય, તો અમે તમને પ્રામાણિક સલાહ આપીશું." : "We only perform single-sitting root canals on teeth that are clinically suited. If a multi-sitting approach is safer for deep chronic bone infections, we will advise you honestly."}
                        </p>
                      </div>

                      {/* Point 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "બીજા અભિપ્રાયનું આશ્વાસન" : "Second-Opinion Reassurance"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "તમારા દાંતને બચાવી શકાય કે નહીં તે અંગે પ્રશ્નો છે અથવા બીજો અભિપ્રાય લેવા માંગો છો? અમને તમારા ડિજિટલ X-Raysની સમીક્ષા કરીને તમને સંપૂર્ણ માહિતીના આધારે નિર્ણય લેવામાં મદદ કરવામાં આનંદ થશે." : "Have questions or want another opinion about whether your tooth can be saved? We are happy to review your digital X-rays and help you make a fully informed decision."}
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={() => {
                          window.location.href = `tel:${mConfig.phone_number || "+919510397046"}`;
                        }}
                        className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
                      >
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span>{language === 'gu' ? "તમારી કસ્ટમ સારવાર યોજના અંગે ચર્ચા કરો" : "Discuss Your Custom Treatment Plan"}</span>
                      </button>
                    </div>
                  </div>



        {/* Section 6: Procedure Video (Loaded dynamically from CMS Instagram Reel) */}
        {videoElement}

                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="root-canal-why-patel-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "એન્ડોડોન્ટિક નિષ્ણાત સારવાર" : "ENDODONTIC SPECIALIST CARE"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "તમારી રૂટ કેનલ માટે Patel Dental Hospital શા માટે પસંદ કરો" : "Why Choose Patel Dental Hospital for Your Root Canal"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu' ? "રૂટ કેનલ સારવાર માટે સંપૂર્ણ કેનલ ડિસઇન્ફેક્શન અને લાંબા ગાળે દાંતને જાળવી રાખવા માટે ઉચ્ચ ચોકસાઇ, વિશિષ્ટ રોટરી ઇન્સ્ટ્રુમેન્ટ્સ અને ડિજિટલ ચોકસાઈ જરૂરી છે." : "Root canal treatment requires high precision, specialized rotary instruments, and digital accuracy to ensure complete canal disinfection and long-term tooth preservation."}
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "સિંગલ સિટિંગ કાર્યક્ષમતા" : "Single Sitting Efficiency"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "મોટાભાગના રૂટ કેનલ કેસ અદ્યતન જાપાનીઝ રોટરી એન્ડોડોન્ટિક સિસ્ટમ્સનો ઉપયોગ કરીને એક જ આરામદાયક મુલાકાતમાં પૂર્ણ કરવામાં આવે છે." : "Most root canal cases are completed in a single comfortable visit using advanced Japanese rotary endodontic systems."}
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "હળવી અને પીડારહિત સારવાર" : "Gentle & Painless Care"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "અસરકારક લોકલ એનેસ્થેસિયા અને હળવી સારવાર પદ્ધતિઓથી તમે સમગ્ર સારવાર દરમિયાન સંપૂર્ણપણે આરામદાયક અને પીડારહિત રહો છો." : "Profound local anaesthesia and gentle treatment techniques ensure you remain completely relaxed and pain-free throughout."}
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "ડિજિટલ એપેક્સ ચોકસાઇ" : "Digital Apex Precision"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "ઇલેક્ટ્રોનિક એપેક્સ લોકેટર્સ સબ-મિલીમીટર ચોકસાઇથી રૂટ કેનલની ઊંડાઈ માપે છે, અનુમાનની જરૂરિયાત દૂર કરે છે અને ઓવર-ઇન્સ્ટ્રુમેન્ટેશન અટકાવે છે." : "Electronic apex locators measure root canal depth with sub-millimeter precision, eliminating guesswork and preventing over-instrumentation."}
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "કાયમી ક્રાઉન રિસ્ટોરેશન" : "Permanent Crown Restoration"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "હાઇ-સ્ટ્રેન્થ કસ્ટમ ઝિર્કોનિયા અથવા સિરામિક ક્રાઉન સારવાર કરાયેલા દાંતને ફ્રેક્ચરથી સુરક્ષિત કરે છે અને 100% કુદરતી ચાવવાની શક્તિ પુનઃસ્થાપિત કરે છે." : "High-strength custom zirconia or ceramic crowns protect the treated tooth against fractures and restore 100% natural chewing strength."}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Reassurance */}
                    <div className="max-w-3xl mx-auto text-center pt-2">
                      <p className={`text-xs sm:text-sm leading-relaxed ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu' ? "સૌથી ઉચ્ચ સફળતા દર માટે દરેક રૂટ કેનલ કડક સ્ટેરિલાઇઝેશન અને આઇસોલેટેડ વર્કિંગ ફિલ્ડ સાથે કરવામાં આવે છે." : "Every root canal is performed with strict sterilization and isolated working fields for the highest success rate."}
                      </p>
                    </div>
                  </div>


                {/* Section 9: Advanced Endodontic Technology */}
                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="root-canal-technology-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "અદ્યતન એન્ડોડોન્ટિક ટેક્નોલોજી" : "ADVANCED ENDODONTIC TECHNOLOGY"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "પીડારહિત અને ચોકસાઇભરી રૂટ કેનલ માટે ડિઝાઇન કરાયેલી પ્રિસિઝન ટેક્નોલોજી" : "Precision Technology Designed for Painless, Accurate Root Canals"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu' ? "અમારા આધુનિક એન્ડોડોન્ટિક સાધનો ઝડપી, વધુ સુરક્ષિત અને વધુ સંપૂર્ણ કેનલ ડિસઇન્ફેક્શનને સક્ષમ બનાવે છે, જેથી તમારા કુદરતી દાંતને લાંબા ગાળાના અનુમાનિત પરિણામો સાથે બચાવી શકાય." : "Our modern endodontic equipment enables faster, safer, and more thorough canal disinfection to save your natural tooth with predictable long-term results."}
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "જાપાનીઝ રોટરી એન્ડો મોટર્સ" : "Japanese Rotary Endo Motors"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "અલ્ટ્રા-સ્મૂથ, ટોર્ક-કંટ્રોલ્ડ રોટરી ઇન્સ્ટ્રુમેન્ટેશન એક જ સિટિંગમાં ઝડપી, શાંત અને અત્યંત આરામદાયક કેનલ શેપિંગને શક્ય બનાવે છે." : "Ultra-smooth, torque-controlled rotary instrumentation allows quick, quiet, and highly comfortable canal shaping in a single sitting."}
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "ડિજિટલ એપેક્સ લોકેટર્સ" : "Digital Apex Locators"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "રીઅલ-ટાઇમ ઇલેક્ટ્રોનિક ડેપ્થ મોનિટરિંગ રૂટ એપેક્સનું સ્થાન ચોકસાઈથી નક્કી કરે છે, જેથી ચોક્કસ મિલીમીટર સુધી સંપૂર્ણ સફાઈ કરી શકાય." : "Real-time electronic depth monitoring accurately determines the root apex location for complete cleaning down to the exact millimeter."}
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "લો-રેડિયેશન ડિજિટલ RVG" : "Low-Radiation Digital RVG"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "ઇન્સ્ટન્ટ હાઇ-ડેફિનેશન ડિજિટલ સેન્સર ઇમેજિંગ ઓછામાં ઓછા રેડિયેશન એક્સપોઝર સાથે વળાંકવાળા રૂટ્સ અને હાડકાના હીલિંગનું સ્પષ્ટ વિઝ્યુઅલાઇઝેશન પ્રદાન કરે છે." : "Instant high-definition digital sensor imaging provides clear visualization of curved roots and bone healing with minimal radiation exposure."}
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "સોનિક અને અલ્ટ્રાસોનિક ઇરિગેશન" : "Sonic & Ultrasonic Irrigation"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "એકોસ્ટિક માઇક્રો-સ્ટ્રીમિંગ ડિસઇન્ફેક્ટન્ટને માઇક્રોસ્કોપિક લેટરલ કેનલ્સ સુધી ઊંડે પહોંચાડે છે, બેક્ટેરિયાને દૂર કરે છે અને ફરીથી ઇન્ફેક્શન અટકાવે છે." : "Acoustic micro-streaming activates disinfectants deep into microscopic lateral canals, eliminating bacteria and preventing reinfection."}
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
