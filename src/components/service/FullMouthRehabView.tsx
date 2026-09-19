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
  Calendar, 
  Clock, 
  Users, 
  Layers, 
  Award, 
  MessageCircle,
  Stethoscope
} from 'lucide-react';
import { ServiceGalleryItem, MarketingConfig, ContactInfo } from '../../types';
import { BeforeAfterSlider } from '../BeforeAfterSlider';
import { ClinicalCaseGallery } from '../ClinicalCaseGallery';
import { GooglePatientReviews } from '../GooglePatientReviews';
import { SurgicalTeamSection } from './SurgicalTeamSection';

export interface FullMouthRehabViewProps {
  heroElement: React.ReactNode;
  videoElement: React.ReactNode;
  testimonialsElement: React.ReactNode;
  faqElement: React.ReactNode;
  bottomCtaElement: React.ReactNode;
  relatedServicesElement: React.ReactNode;
  mConfig: MarketingConfig;
  contactInfo?: ContactInfo;
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
  drVipulImg?: string;
  setCurrentPage?: (page: string) => void;
  language?: 'en' | 'gu';
}

export const FullMouthRehabView: React.FC<FullMouthRehabViewProps> = ({
  heroElement,
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
  drVipulImg = '/dr. patel.png',
  setCurrentPage,
  language = 'en'
}) => {
  const whatsappNum = '919510397046';
  const whatsappText = "Hello, most of my teeth are damaged or missing. I want to know about full mouth treatment.";
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="space-y-8 sm:space-y-16 lg:space-y-20">
      {heroElement}

                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-symptom-qualification-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "શું તમારા માટે સંપૂર્ણ મોઢાનું પુનઃનિર્માણ યોગ્ય છે?" : "Is full mouth rehabilitation right for you?"}
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto pt-8">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        {/* Left accent line */}
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "એકથી વધુ તૂટેલા, સડેલા અથવા હલતા દાંત" : "Multiple Broken, Decayed or Loose Teeth"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "જ્યારે સામાન્ય ફિલિંગ અથવા વ્યક્તિગત ક્રાઉન તમારા દાંતની સ્થિતિ બચાવવા માટે પૂરતા ન રહે."
                            : "When simple fillings or individual crowns are no longer enough to save your bite."
                          }
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        {/* Left accent line */}
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "દાંતનું ગંભીર ઘસાવું અને સપાટ થયેલ બાઇટ" : "Severe Wear & Flattened Bite"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "ખૂબ જ ઘસાઈ ગયેલા દાંત, જેના કારણે જડબામાં દુખાવો, ચાવવામાં તકલીફ અથવા ચહેરાના દેખાવમાં ફેરફાર થઈ ગયો હોય."
                            : "Teeth that are heavily worn down, causing jaw pain, chewing difficulty, or a collapsed facial appearance."
                          }
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        {/* Left accent line */}
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "તમારા મોટાભાગના અથવા બધા દાંત ખોવાઈ ગયા હોય" : "Missing Most or All of Your Teeth"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "ઢીલા ડેન્ચર્સને કારણે મુશ્કેલી અનુભવતા હો અને કાયમી, મજબૂત તથા સુરક્ષિત ફિક્સ્ડ-ટીથ સોલ્યુશન ઇચ્છતા હો."
                            : "Struggling with loose dentures and wanting a permanent, secure, and life-changing fixed-teeth solution."
                          }
                        </p>
                      </div>
                    </div>
                  </div>


                  {/* Surgical Team Section */}
                  <SurgicalTeamSection setCurrentPage={setCurrentPage} language={language} />

                {/* Section 3: Comparison Table for Full Mouth Rehabilitation */}
                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-comparison-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "વિકલ્પોની તુલના" : "Option Comparison"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "કંઈ ન કરવાથી શું ખર્ચ થાય છે" : "What doing nothing costs"}
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
                                  <span>{language === 'gu' ? "સંપૂર્ણ મોઢાનું પુનઃનિર્માણ" : "Full Mouth Rehabilitation"}</span>
                                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest whitespace-nowrap">
                                    {language === 'gu' ? "ભલામણ કરેલ" : "Recommended"}
                                  </span>
                                </div>
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                {language === 'gu' ? "દાંતને એક પછી એક પેચ કરતા રહેવું" : "Continuing to patch tooth by tooth"}
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                {language === 'gu' ? "સંપૂર્ણ ડેન્ચર્સ" : "Full Dentures"}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "ચાવવાની ક્ષમતા પુનઃસ્થાપિત" : "Chewing restored"}
                              </td>
                              <td className={`p-4 sm:p-5 font-semibold bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700' : 'text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>
                                    {language === 'gu'
                                      ? "100% સંપૂર્ણ ચાવવાની ક્ષમતા પુનઃસ્થાપિત કરવા માટે પુનઃનિર્માણ કરવામાં આવે છે."
                                      : "Reconstructed to restore 100% full chewing power."
                                    }
                                  </span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu'
                                  ? "વધુ દાંત ખરાબ થતા જાય તેમ ચાવવાની ક્ષમતા સતત ઘટતી જાય છે."
                                  : "Chewing ability continues to decline as more teeth fail."
                                }
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu'
                                  ? "ચાવવાની મર્યાદિત ક્ષમતા (20%-30%); ખોરાકમાં નોંધપાત્ર નિયંત્રણ રહે છે."
                                  : "Limited chewing power (20%-30%); restricts diet significantly."
                                }
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "બાઇટ અને જડબાના સાંધાનું સુધારણું" : "Bite and jaw joint corrected"}
                              </td>
                              <td className={`p-4 sm:p-5 font-semibold bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700' : 'text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>
                                    {language === 'gu'
                                      ? "હા; TMJના દુખાવાને સુધારવા માટે દાંતની કમાનને યોગ્ય રીતે ગોઠવે અને સંતુલિત કરે છે."
                                      : "Yes; fully aligns and balances dental arches to correct TMJ pain."
                                    }
                                  </span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu'
                                  ? "ના; અસમાન દાંતનો ઘસારો અને દાંતની હિલચાલ TMJ પરનો તણાવ વધારે છે."
                                  : "No; uneven tooth wear and tooth movement worsen TMJ stress."
                                }
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu'
                                  ? "ના; સરકતા ડેન્ચર્સ જડબાના સાંધાનું કુદરતી ગોઠવણ જાળવી શકતા નથી."
                                  : "No; slipping appliances cannot support natural joint alignment."
                                }
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "ચહેરાને મળતું આધાર પુનઃસ્થાપિત" : "Facial support restored"}
                              </td>
                              <td className={`p-4 sm:p-5 font-semibold bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700' : 'text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>
                                    {language === 'gu'
                                      ? "હા; ગાલ અને હોઠને કુદરતી આધાર આપે છે અને ચહેરાના ઢળી ગયેલા દેખાવને સુધારવામાં મદદ કરે છે."
                                      : "Yes; supports cheeks and lips naturally, reversing collapsed look."
                                    }
                                  </span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu'
                                  ? "ના; દાંતનો વધતો ઘસારો ચહેરાની ઊંચાઈમાં ઘટાડો કરે છે."
                                  : "No; progressive tooth wear causes facial height collapse."
                                }
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu'
                                  ? "કાયમી નથી; સમય જતાં જડબાનું હાડકું ઘટવાથી ચહેરો અંદર ધસાયેલો દેખાઈ શકે છે."
                                  : "Temporary; jawbone shrinkage over time leads to a sunken facial appearance."
                                }
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "હાડકાનું નુકસાન" : "Bone loss"}
                              </td>
                              <td className={`p-4 sm:p-5 font-semibold bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700' : 'text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>
                                    {language === 'gu'
                                      ? "અટકાવવામાં મદદ કરે છે; ઇમ્પ્લાન્ટ હાડકાને ઉત્તેજિત કરે છે અને જડબાની કુદરતી રચના જાળવવામાં મદદ કરે છે."
                                      : "Prevented; implants stimulate bone and preserve natural jaw structure."
                                    }
                                  </span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu'
                                  ? "દાંત ન હોય તેવા વિસ્તારોમાં હાડકાનું નુકસાન સતત વધતું રહે છે."
                                  : "Continues to accelerate in missing tooth areas."
                                }
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu'
                                  ? "ગમ રિજ પર સતત દબાણને કારણે હાડકાનું નુકસાન ઝડપથી વધી શકે છે."
                                  : "Accelerated bone loss due to constant surface pressure on gum ridges."
                                }
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "10 વર્ષમાં કુલ ખર્ચ" : "Total cost over 10 years"}
                              </td>
                              <td className={`p-4 sm:p-5 font-semibold bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700' : 'text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>
                                    {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                                  </span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu'
                                  ? "વધુ; અનેક ઇમરજન્સી પ્રક્રિયાઓ અને ક્રાઉનને કારણે જીવનકાળ દરમિયાન ખર્ચ વધી શકે છે."
                                  : "High; multiple emergency procedures and crowns accumulate a high lifetime cost."
                                }
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu'
                                  ? "એડજસ્ટમેન્ટ, રીલાઇનિંગ, એડહેસિવ્સ અને બદલવાના સતત ખર્ચ."
                                  : "Ongoing expenses for adjustments, relining, adhesives, and replacements."
                                }
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "પરિણામ" : "Result"}
                              </td>
                              <td className={`p-4 sm:p-5 font-semibold bg-teal-50/30 border-x border-teal-100 ${language === 'gu' ? 'text-slate-700' : 'text-slate-900'}`}>
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>
                                    {language === 'gu'
                                      ? "કાયમી, ઉચ્ચ કાર્યક્ષમતા ધરાવતા અને કુદરતી દેખાતા સ્થિર દાંત."
                                      : "Permanent, highly functional, and fully stable natural-looking teeth."
                                    }
                                  </span>
                                </div>
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu'
                                  ? "સતત દાંતના દુખાવા, અસ્થિર બાઇટ અને દાંતના વધતા નુકસાનની સમસ્યા."
                                  : "Chronic toothaches, unstable bite, and progressive tooth loss."
                                }
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                                {language === 'gu'
                                  ? "ઢીલા અને અસુવિધાજનક રિમૂવેબલ ડેન્ચર્સ, જે બોલતી વખતે અથવા ખાતી વખતે સરકી શકે છે."
                                  : "Loose, uncomfortable removable appliance that can slip while speaking or eating."
                                }
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
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                {language === 'gu' ? "પરિવર્તનો" : "Transformations"}
              </span>
              <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                {language === 'gu' ? "સંપૂર્ણ મોઢાના પુનઃનિર્માણ પહેલાં અને પછીના પરિવર્તનો" : seoHeadings.transformations}
              </h2>
              <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                {language === 'gu'
                  ? "અમારા સંપૂર્ણ મોઢાના પુનઃનિર્માણના દર્દીઓના સ્માઇલમાં થયેલા વાસ્તવિક પરિવર્તનો જુઓ."
                  : (mConfig.before_after_description || "See real smile transformations of our full mouth rehabilitation patients.")
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
            heading={language === 'gu' ? "સંપૂર્ણ મોઢાના પુનઃનિર્માણના ક્લિનિકલ કેસની ગેલેરી" : seoHeadings.caseGallery}
            description={language === 'gu' ? "સંપૂર્ણ મોઢાના પુનઃનિર્માણના કેસમાં સારવાર પહેલાં અને પછી થયેલા પરિવર્તનો." : mConfig.gallery_description}
            items={Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery}
            singleGallery={true}
            language={language}
          />
        )}

        {testimonialsElement}

        {/* Section 10: Google Patient Reviews (100% CMS-driven premium slider) */}
        {mConfig.show_google_reviews !== false && (
          <GooglePatientReviews
            heading={language === 'gu' ? "સંપૂર્ણ મોઢાના પુનઃનિર્માણ માટે દર્દીઓના ગૂગલ રિવ્યૂઝ" : seoHeadings.reviews}
            reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
            label={language === 'gu' ? "ગૂગલ રિવ્યૂઝ" : undefined}
          />
        )}


                {/* Section 4: Pricing & Financing for Full Mouth Rehabilitation */}
                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-pricing-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "કિંમત અને ફાઇનાન્સિંગ" : "Pricing & Financing"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "સંપૂર્ણ મોઢાના પુનઃનિર્માણની કિંમત" : "Full Mouth Reconstruction Costs"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu'
                          ? "અમે સંપૂર્ણ પારદર્શક ખર્ચ સાથે સુવ્યવસ્થિત નાણાકીય વિકલ્પો પ્રદાન કરીએ છીએ, જેથી સંપૂર્ણ મોઢાનું પુનઃનિર્માણ સરળ અને તણાવમુક્ત બની શકે."
                          : "We provide completely transparent costs with structured financial options to help make full mouth reconstruction accessible and stress-free."
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
                                {language === 'gu' ? "એક આર્ચનું પુનઃનિર્માણ" : "Single-arch rehabilitation"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 font-medium ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700'}`}>
                                {language === 'gu' ? "દાંતની એક સંપૂર્ણ આર્ચનું પુનઃનિર્માણ" : "Rebuilding one entire arch of teeth"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "સંપૂર્ણ મોઢું (બંને આર્ચ)" : "Full-mouth (both arches)"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 font-medium ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700'}`}>
                                {language === 'gu' ? "ઉપરની અને નીચેની બંને આર્ચનું સંપૂર્ણ પુનઃનિર્માણ" : "Comprehensive restoration of both upper and lower arches"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "ઓલ-ઓન-4 - પ્રતિ આર્ચ, ફિક્સ્ડ દાંત" : "All-on-4  -  per arch, fixed teeth"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 font-medium ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700'}`}>
                                {language === 'gu' ? "દરેક આર્ચમાં 4 ડેન્ટલ ઇમ્પ્લાન્ટ પર ફિક્સ્ડ દાંત" : "Fixed teeth on 4 dental implants per arch"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "ઓલ-ઓન-6 - પ્રતિ આર્ચ, ફિક્સ્ડ દાંત" : "All-on-6  -  per arch, fixed teeth"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 font-medium ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700'}`}>
                                {language === 'gu' ? "વધુમાં વધુ સ્થિરતા માટે દરેક આર્ચમાં 6 ડેન્ટલ ઇમ્પ્લાન્ટ પર ફિક્સ્ડ દાંત" : "Fixed teeth on 6 dental implants per arch for maximum stability"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "સંપૂર્ણ મોઢાના ક્રાઉન (ઇમ્પ્લાન્ટની જરૂર નથી)" : "Full-mouth crowns (no implants needed)"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 font-medium ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700'}`}>
                                {language === 'gu' ? "ઉચ્ચ ગુણવત્તાવાળા ક્રાઉન દ્વારા કુદરતી દાંતનું સંપૂર્ણ પુનઃનિર્માણ" : "Complete natural teeth restoration using high-quality crowns"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Financing information inside table footer container, perfectly matching spacing, typography, and buttons */}
                      <div className="p-6 sm:p-8 bg-slate-50/80 border-t border-slate-100 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                          <div className="bg-white border border-slate-100 rounded-2xl p-5 text-left flex items-start gap-3 shadow-sm">
                            <div className="h-9 w-9 rounded-lg bg-teal-50 flex items-center justify-center text-[#0D9488] border border-teal-100 shrink-0 mt-0.5">
                              <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                                {language === 'gu' ? "ઝીરો-ઇન્ટરેસ્ટ EMI" : "Zero-Interest EMI"}
                              </h4>
                              <p className={`text-xs sm:text-sm mt-0.5 leading-relaxed ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-500 font-medium'}`}>
                                {language === 'gu'
                                  ? "સારવારનો ખર્ચ સરળ બનાવવા માટે શૂન્ય વ્યાજ સાથે અનુકૂળ માસિક હપ્તાની યોજનાઓ ઉપલબ્ધ છે."
                                  : "Convenient monthly installment plans are available at zero interest to ease the treatment cost."
                                }
                              </p>
                            </div>
                          </div>

                          <div className="bg-white border border-slate-100 rounded-2xl p-5 text-left flex items-start gap-3 shadow-sm">
                            <div className="h-9 w-9 rounded-lg bg-teal-50 flex items-center justify-center text-[#0D9488] border border-teal-100 shrink-0 mt-0.5">
                              <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                                {language === 'gu' ? "મલ્ટી-બેંક સપોર્ટ" : "Multi-Bank Support"}
                              </h4>
                              <p className={`text-xs sm:text-sm mt-0.5 leading-relaxed ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-500 font-medium'}`}>
                                {language === 'gu'
                                  ? "અમે અગ્રણી નાણાકીય સેવા પ્રદાતાઓ સાથે ભાગીદારી કરીને તાત્કાલિક મંજૂરી અને લવચીક ચુકવણી અવધિ પ્રદાન કરીએ છીએ."
                                  : "We partner with leading financial providers to offer instant approvals and flexible tenures."
                                }
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer"
                          >
                            <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
                            <span>
                              {language === 'gu' ? "વોટ્સએપ પર EMI પાત્રતા તપાસો" : "Check EMI Eligibility on WhatsApp"}
                            </span>
                          </a>

                          <button
                            onClick={() => openAppointmentModal('Full Mouth Rehabilitation - Pricing')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
                          >
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>
                              {language === 'gu' ? "સારવારના ખર્ચનો અંદાજ મેળવો" : "Request Treatment Estimate"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>


                {/* Section 5: Phased Roadmap for Full Mouth Rehabilitation */}
                
                  <div className="pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-timeline-section">
                    <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[28px] sm:rounded-[36px] p-6 sm:p-12 lg:p-14 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
                      {/* Heading area */}
                      <div className="space-y-3 max-w-2xl mx-auto text-center mb-10 sm:mb-14">
                        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                          <Clock className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                          {language === 'gu' ? "સારવારની સમયરેખા" : "Treatment Timeline"}
                        </span>
                        <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                          {language === 'gu' ? "તમારી સંપૂર્ણ મોઢાના પુનઃનિર્માણની સમયરેખા" : "Your Full Mouth Reconstruction Roadmap"}
                        </h2>
                        <p className={`text-sm sm:text-base leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-normal'}`}>
                          {language === 'gu'
                            ? "અમે સંપૂર્ણ મોઢાના પુનઃનિર્માણને મહત્તમ ચોકસાઈ, દર્દીની સુવિધા અને લાંબા ગાળાની સારવારની સફળતા સુનિશ્ચિત કરવા માટે સુવ્યવસ્થિત તબક્કાઓમાં વહેંચીએ છીએ."
                            : "We divide complex full mouth rehabilitation into structured phases to ensure maximum precision, patient comfort, and long-term treatment success."
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
                              {language === 'gu' ? "વ્યાપક આયોજન" : "Comprehensive Planning"}
                            </h3>
                            <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                              {language === 'gu'
                                ? "સારવાર શરૂ કરતા પહેલાં ડાયગ્નોસ્ટિક રેકોર્ડ્સ, 3D CBCT સ્કેન અને ડાયગ્નોસ્ટિક મોકઅપ્સ સહિતનું સંપૂર્ણ આયોજન કરવામાં આવે છે."
                                : "Complete planning including diagnostic records, 3D CBCT scans, and diagnostic mockups before starting treatment."
                              }
                            </p>
                          </div>

                          {/* Step 2 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              2
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "પાયાનું કામ અને તૈયારી" : "Foundation Work & Preparation"}
                            </h3>
                            <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                              {language === 'gu'
                                ? "જરૂરિયાત મુજબ રૂટ કેનાલ સારવાર, દાંત કાઢવાની પ્રક્રિયા અને પેઢાંની સારવાર કરવામાં આવે છે."
                                : "Address root canal therapy, tooth extractions, and gum treatment as required."
                              }
                            </p>
                          </div>

                          {/* Step 3 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              3
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "ઇમ્પ્લાન્ટ પ્લેસમેન્ટ અને કામચલાઉ દાંત" : "Implant Placement & Temporary Teeth"}
                            </h3>
                            <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                              {language === 'gu'
                                ? "કાર્યક્ષમતા અને આરામ જાળવવા માટે ઇમ્પ્લાન્ટને સુરક્ષિત રીતે મૂકવામાં આવે છે અને કસ્ટમ કામચલાઉ દાંત તૈયાર કરવામાં આવે છે."
                                : "Secure implant placement and custom temporary restorations to preserve function and comfort."
                              }
                            </p>
                          </div>

                          {/* Step 4 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-[#0D9488] border-2 border-[#0D9488] flex items-center justify-center text-white font-bold text-xl mb-5 shadow-md">
                              4
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "અંતિમ કસ્ટમ પુનઃનિર્માણ" : "Final Custom Reconstruction"}
                            </h3>
                            <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                              {language === 'gu'
                                ? "કાયમી કુદરતી દેખાવ અને ચાવવાની શક્તિ પુનઃસ્થાપિત કરવા માટે કસ્ટમ અંતિમ ક્રાઉન અને બ્રિજનું કામ કરવામાં આવે છે."
                                : "Custom final crown and bridge work to restore permanent natural appearance and chewing power."
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                {/* Section 6: Risk Reversal / Patient Reassurance for Full Mouth Rehabilitation */}
                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-reassurance-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "આશ્વાસન અને પારદર્શિતા" : "REASSURANCE & TRANSPARENCY"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "તમારા સંપૂર્ણ મોઢાના પુનઃનિર્માણ માટે અમારું આશ્વાસન" : "Our Reassurance for Your Full Mouth Reconstruction"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu'
                          ? "તમારી સ્માઇલનું પુનઃનિર્માણ એક મહત્વપૂર્ણ નિર્ણય છે. અમે સંપૂર્ણ ક્લિનિકલ પારદર્શિતા, સંકલિત સારવાર અને સતત સહાય પ્રદાન કરીએ છીએ, જેથી તમે દરેક તબક્કે સંપૂર્ણપણે નિશ્ચિંત રહી શકો."
                          : "Rebuilding your smile is a major decision. We provide full clinical transparency, coordinated care, and ongoing support so you can feel completely secure at every step."
                        }
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Point 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "સંપૂર્ણ ક્લિનિકલ પારદર્શિતા" : "Full Clinical Transparency"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "સંપૂર્ણ મોઢાના પુનઃનિર્માણમાં અનેક ક્લિનિકલ સારવારનો સમાવેશ થાય છે. દરેક સારવારનું સંપૂર્ણ આયોજન લેખિત દસ્તાવેજીકરણ અને પારદર્શક ખર્ચની વિગતો સાથે કરવામાં આવે છે, જેથી કોઈપણ સારવાર શરૂ થાય તે પહેલાં બધું સ્પષ્ટ હોય."
                            : "Full mouth rehabilitation combines multiple clinical treatments, each planned thoroughly with written documentation and transparent cost breakdowns before any work begins."
                          }
                        </p>
                      </div>

                      {/* Point 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "બહુ-વિશિષ્ટ સારવારનું સંકલન" : "Multi-disciplinary Care Coordination"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "તમારી સારવાર યોજના અમારી નિષ્ણાત ટીમ દ્વારા એક જ ક્લિનિકમાં સંપૂર્ણ રીતે સંકલિત કરવામાં આવે છે. આ સુમેળભર્યું આયોજન સુનિશ્ચિત કરે છે અને અલગ-અલગ સ્થળોએ રેફરલની જરૂરિયાત ઘટાડે છે."
                            : "Your treatment plan is fully coordinated in-house under one clinic roof by our expert team. This ensures perfect synchronization and eliminates fragmented external referrals."
                          }
                        </p>
                      </div>

                      {/* Point 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "સક્રિય સહાય અને ફોલો-અપ" : "Proactive Support & Follow-up"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "યોગ્ય હીલિંગ, બાઇટની ચોકસાઈ અને લાંબા ગાળાની કાર્યક્ષમ સ્થિરતા પર નજર રાખવા માટે અમે સુવ્યવસ્થિત ફોલો-અપ અને મેન્ટેનન્સ ચેકની યોજના આપીએ છીએ."
                            : "We outline a structured regimen of follow-ups and maintenance checks to monitor proper healing, bite accuracy, and ensure long-term functional stability."
                          }
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={() => openAppointmentModal('Full Mouth Rehabilitation - Reassurance')}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
                      >
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span>
                          {language === 'gu' ? "તમારી કસ્ટમ સારવાર યોજના વિશે ચર્ચા કરો" : "Discuss Your Custom Treatment Plan"}
                        </span>
                      </button>
                    </div>
                  </div>



        {/* Section 6: Procedure Video (Loaded dynamically from CMS Instagram Reel) */}
        {videoElement}

                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-team-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <Users className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "પુનઃનિર્માણ ટીમ" : "THE RECONSTRUCTION TEAM"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "ડૉ. વિપુલ પટેલ અને ક્લિનિકલ ટીમના નેતૃત્વ હેઠળ" : "Led by Dr. Vipul Patel & Clinical Team"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu'
                          ? "સંપૂર્ણ મોઢાનું પુનઃનિર્માણ અત્યંત જટિલ છે અને નિષ્ણાત આયોજનની જરૂર પડે છે. ડૉ. વિપુલ પટેલ યોગ્ય બાઇટ ફંક્શન, જડબાનું સંરેખણ અને ચહેરાના સ્નાયુઓની સમપ્રમાણતા સુનિશ્ચિત કરવા માટે તમારા સમગ્ર પુનઃનિર્માણનું વ્યક્તિગત રીતે આયોજન કરે છે."
                          : "Full mouth rehabilitation is highly complex and requires expert planning. Dr. Vipul Patel personally plans your entire reconstruction to ensure correct bite function, joint harmony, and muscular symmetry."
                        }
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    {language === 'gu' ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch pt-4">
                        {/* Bullet 1: Both surgeons, every case */}
                        <div className="bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-6 shadow-[0_12px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] hover:border-[#14B8A6]/60 transition-all duration-300 flex items-start gap-4 text-left relative overflow-hidden">
                          <div className="absolute left-0 top-4 bottom-4 w-[4px] rounded-r-[4px] bg-[#14B8A6]" />
                          <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] border border-teal-100/60 shrink-0 mt-0.5">
                            <Stethoscope className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-sans font-bold text-[#081C3A] text-base leading-snug">
                              બંને સર્જન, દરેક કેસ
                            </h4>
                            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-semibold">
                              તમારી સારવારની યોજના અને પ્રક્રિયા અમારા ક્લિનિકલ નેતૃત્વ દ્વારા સંયુક્ત રીતે કરવામાં આવે છે: ડૉ. વિપુલ પટેલ (MDS) અને ડૉ. કિંજલ પટેલ (BDS).
                            </p>
                          </div>
                        </div>

                        {/* Bullet 2: One coordinated plan */}
                        <div className="bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-6 shadow-[0_12px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] hover:border-[#14B8A6]/60 transition-all duration-300 flex items-start gap-4 text-left relative overflow-hidden">
                          <div className="absolute left-0 top-4 bottom-4 w-[4px] rounded-r-[4px] bg-[#14B8A6]" />
                          <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] border border-teal-100/60 shrink-0 mt-0.5">
                            <Layers className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-sans font-bold text-[#081C3A] text-base leading-snug">
                              એક સંકલિત સારવાર યોજના
                            </h4>
                            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-semibold">
                              તમારા સંપૂર્ણ મોઢાના પુનઃનિર્માણને યોગ્ય બાઇટ ફંક્શન, જડબાના સંરેખણ અને સતત સ્માઇલ સમપ્રમાણતા સુનિશ્ચિત કરવા માટે એક સંકલિત વર્કફ્લો તરીકે તૈયાર કરવામાં આવે છે.
                            </p>
                          </div>
                        </div>

                        {/* Bullet 3: Written cost, honoured */}
                        <div className="bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-6 shadow-[0_12px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] hover:border-[#14B8A6]/60 transition-all duration-300 flex items-start gap-4 text-left relative overflow-hidden">
                          <div className="absolute left-0 top-4 bottom-4 w-[4px] rounded-r-[4px] bg-[#14B8A6]" />
                          <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] border border-teal-100/60 shrink-0 mt-0.5">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-sans font-bold text-[#081C3A] text-base leading-snug">
                              લેખિત ખર્ચ, સંપૂર્ણ પારદર્શકતા
                            </h4>
                            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-semibold">
                              સારવાર શરૂ કરતા પહેલાં તમને સંપૂર્ણ વિગતો સાથેનો પારદર્શક લેખિત સારવાર અંદાજ આપવામાં આવે છે. કોઈ છુપાયેલા ચાર્જ નહીં, જેથી તમારા સારવાર ખર્ચની સંપૂર્ણ સ્પષ્ટતા રહે.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch pt-4">
                        {/* Bullet 1: Both surgeons, every case */}
                        <div className="bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-6 shadow-[0_12px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] hover:border-[#14B8A6]/60 transition-all duration-300 flex items-start gap-4 text-left relative overflow-hidden">
                          <div className="absolute left-0 top-4 bottom-4 w-[4px] rounded-r-[4px] bg-[#14B8A6]" />
                          <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] border border-teal-100/60 shrink-0 mt-0.5">
                            <Stethoscope className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-sans font-bold text-[#081C3A] text-base leading-snug">
                              Both Surgeons, Every Case
                            </h4>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                              Your treatment is planned and performed collaboratively by our clinical leadership: Dr. Vipul Patel (MDS) and Dr. Kinjal Patel (BDS).
                            </p>
                          </div>
                        </div>

                        {/* Bullet 2: One coordinated plan */}
                        <div className="bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-6 shadow-[0_12px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] hover:border-[#14B8A6]/60 transition-all duration-300 flex items-start gap-4 text-left relative overflow-hidden">
                          <div className="absolute left-0 top-4 bottom-4 w-[4px] rounded-r-[4px] bg-[#14B8A6]" />
                          <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] border border-teal-100/60 shrink-0 mt-0.5">
                            <Layers className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-sans font-bold text-[#081C3A] text-base leading-snug">
                              One Coordinated Plan
                            </h4>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                              Your full-mouth reconstruction is designed as a single coordinated workflow to ensure correct bite function, joint alignment, and consistent smile symmetry.
                            </p>
                          </div>
                        </div>

                        {/* Bullet 3: Written cost, honoured */}
                        <div className="bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-6 shadow-[0_12px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] hover:border-[#14B8A6]/60 transition-all duration-300 flex items-start gap-4 text-left relative overflow-hidden">
                          <div className="absolute left-0 top-4 bottom-4 w-[4px] rounded-r-[4px] bg-[#14B8A6]" />
                          <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] border border-teal-100/60 shrink-0 mt-0.5">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-sans font-bold text-[#081C3A] text-base leading-snug">
                              Written Cost, Honoured
                            </h4>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                              Receive an itemised, completely transparent written treatment estimate before we begin. No hidden charges, completely predictable investment.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>


                {/* Section 9: Advanced Rehabilitation Technology for Full Mouth Rehabilitation */}
                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-technology-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "અદ્યતન પુનઃનિર્માણ ટેકનોલોજી" : "ADVANCED REHABILITATION TECHNOLOGY"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "તમારી સારવાર માટે તૈયાર કરવામાં આવેલી ચોકસાઈપૂર્ણ ડિજિટલ ટેકનોલોજી" : "Precision Digital Technology Designed Around Your Treatment"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu'
                          ? "ડિજિટલ ડાયગ્નોસ્ટિક મેપિંગ અને CAD/CAM ફેબ્રિકેશન તમારી સારવાર ટીમને વધુ સુરક્ષિતતા, આરામ અને યોગ્ય બાઇટ સંરેખણ સાથે તમારા સંપૂર્ણ મોઢાના પુનઃનિર્માણની સારવાર કરવામાં મદદ કરે છે."
                          : "Digital diagnostic mapping and CAD/CAM fabrication help your treatment team execute your full mouth rehabilitation with greater safety, comfort, and perfect bite alignment."
                        }
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>
 
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "3D CBCT સ્કેન અને મેપિંગ" : "3D CBCT Scan & Mapping"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "જડબાના હાડકાની ઊંડાઈ, ઘનતા અને નસોના માર્ગોનું સંપૂર્ણ 3D મેપિંગ કરીને શ્રેષ્ઠ ઇમ્પ્લાન્ટ એન્કરનું આયોજન કરવામાં અને મહત્વપૂર્ણ એનાટોમિકલ સ્ટ્રક્ચર્સથી બચવામાં મદદ કરે છે."
                            : "Full 3D mapping of jawbone depth, density, and nerve pathways to plan optimal implant anchors and avoid critical anatomical structures."
                          }
                        </p>
                      </div>
 
                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "ડિજિટલ ઇન્ટ્રાઓરલ સ્કેનર્સ" : "Digital Intraoral Scanners"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "અવ્યવસ્થિત ફિઝિકલ મોઢાના મોલ્ડને બદલે સરળ અને અત્યંત ચોકસાઈપૂર્ણ 3D ડિજિટલ સ્કેનરનો ઉપયોગ કરીને તમારા મોઢાના આરામદાયક અને અત્યંત ચોકસાઈપૂર્ણ મોડેલ તૈયાર કરવામાં આવે છે."
                            : "Replaces messy physical mouth molds with a seamless, highly precise 3D digital scanner to capture comfortable, ultra-accurate models of your mouth."
                          }
                        </p>
                      </div>
 
                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "ઇન-હાઉસ CAD/CAM મિલિંગ" : "In-House CAD/CAM Milling"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "અમારી ક્લિનિકલ લેબ પ્રીમિયમ, ઉચ્ચ ગુણવત્તાવાળા બાયોલોજિકલ ઝિર્કોનિયા આર્ચને કમ્પ્યુટર-સહાયિત મેન્યુફેક્ચરિંગ દ્વારા તૈયાર કરે છે, જેથી તે મજબૂત અને લાંબા સમય સુધી ટકી શકે."
                            : "Our clinical lab designs and mills premium, highly biological zirconia arches with computer-aided manufacturing for seamless, heavy-duty durability."
                          }
                        </p>
                      </div>
 
                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          {language === 'gu' ? "બાઇટની ઊંચાઈ અને TMJ ડાયગ્નોસ્ટિક્સ" : "Bite Height & TMJ Diagnostics"}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu'
                            ? "જડબાના સાંધાના ઓરિએન્ટેશનને માપવા માટે અદ્યતન ડાયગ્નોસ્ટિક્સનો ઉપયોગ કરવામાં આવે છે, જેથી તમારા નવા દાંત યોગ્ય બાયોલોજિકલ બાઇટ ઊંચાઈ પુનઃસ્થાપિત કરે અને TMJ પરનો તણાવ ઓછો થાય."
                            : "Advanced diagnostics to measure jaw joint orientation, ensuring your new teeth restore your optimal biological bite height and relieve TMJ stress."
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
