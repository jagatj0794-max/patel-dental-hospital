/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Calendar, 
  MessageCircle 
} from 'lucide-react';
import { ServiceGalleryItem, MarketingConfig } from '../../types';
import { BeforeAfterSlider } from '../BeforeAfterSlider';
import { ClinicalCaseGallery } from '../ClinicalCaseGallery';
import { GooglePatientReviews } from '../GooglePatientReviews';
import { SurgicalTeamSection } from './SurgicalTeamSection';

export interface SmileMakeoverViewProps {
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
  smileMakeoverWhatsAppUrl: string;
  setCurrentPage?: (page: string) => void;
  language?: 'en' | 'gu';
}

export const SmileMakeoverView: React.FC<SmileMakeoverViewProps> = ({
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
  smileMakeoverWhatsAppUrl,
  setCurrentPage,
  language = 'en'
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
                        {language === 'gu' ? "સ્માઇલ મેકઓવર તમારા માટે યોગ્ય હોઈ શકે જો:" : "A smile makeover might be for you if:"}
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto pt-8">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "સ્માઇલ કરતી વખતે સંકોચ અનુભવાય" : "Self-Conscious Smiling"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "હસતી વખતે અથવા સ્માઇલ કરતી વખતે તમે મોં ઢાંકી દો છો અને તમારી સ્વાભાવિક અભિવ્યક્તિને રોકી રાખો છો." : "You cover your mouth when you laugh or smile, holding back your natural expression."}
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "દાંત વચ્ચે ગેપ" : "Teeth Gaps"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "તમારા દાંત વચ્ચે દેખાતા ગેપ અથવા જગ્યા છે જેને તમે એકસરખી અને સુંદર બનાવવા માંગો છો." : "You have noticeable gaps or spacing between your teeth that you want unified."}
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "તૂટેલા અથવા અસમાન દાંત" : "Chipped or Uneven"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "તમારા દાંત તૂટેલા, ઘસાઈ ગયેલા અથવા ઘસારા કે માઇક્રો-ફ્રેક્ચર્સને કારણે અસમાન આકારના છે." : "Your teeth are chipped, worn down, or unevenly shaped from wear or micro-fractures."}
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "ઘેરો દાંતનો રંગ" : "Deep Discolouration"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "તમારા દાંતનો રંગ ખૂબ જ ઘેરો થઈ ગયો છે અને માત્ર સામાન્ય દાંત સફેદ કરવાની સારવાર પૂરતી નથી." : "Your teeth are badly discoloured, and standard teeth whitening alone is insufficient."}
                        </p>
                      </div>

                      {/* Card 5 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "ગમ્મી સ્માઇલ" : "Gummy Smile"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "તમારી સ્માઇલમાં પેઢાં વધારે દેખાય છે અથવા પેઢાંની લાઇન અસમાન છે, જેના કારણે તમારા દાંત ખૂબ ટૂંકા દેખાય છે." : "You have a gummy smile or an uneven gumline that makes your teeth look too short."}
                        </p>
                      </div>

                      {/* Card 6 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "પ્રમાણ અને કદ" : "Proportion & Size"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "તમારા દાંત ખૂબ નાના, ખૂબ ટૂંકા અથવા તમારા ચહેરાના એકંદર પ્રમાણ સાથે મેળ ખાતા નથી." : "Your teeth look too small, too short, or mismatched with your overall facial proportions."}
                        </p>
                      </div>

                      {/* Card 7 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "આગળના વાંકાચૂકા દાંત" : "Crooked Front Teeth"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "તમારા આગળના દાંતમાં થોડું ક્રાઉડિંગ છે, પરંતુ તમે લાંબી પરંપરાગત ઓર્થોડોન્ટિક સારવાર ટાળવા માંગો છો." : "You have minor crowding on front teeth but want to avoid long traditional orthodontic treatments."}
                        </p>
                      </div>

                      {/* Card 8 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "મેળ ન ખાતા ક્રાઉન્સ" : "Mismatched Crowns"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "તમારા જૂના, ઘેરા અથવા મેળ ન ખાતા ક્રાઉન્સ અથવા ફિલિંગ્સ તમારા કુદરતી દાંતની સુંદરતામાં ખલેલ પહોંચાડે છે." : "You have old, dark, or mismatched crowns or fillings that disrupt the aesthetic of your natural teeth."}
                        </p>
                      </div>

                      {/* Card 9 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          {language === 'gu' ? "આવનારું જીવનનું મહત્વપૂર્ણ પ્રસંગ" : "Upcoming Life Milestone"}
                        </h3>
                        <p className={`text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                          {language === 'gu' ? "તમારા લગ્ન અથવા કોઈ મહત્વપૂર્ણ કારકિર્દી સંબંધિત પ્રસંગ નજીક આવી રહ્યો છે અને તમે ફોટોગ્રાફ્સમાં સંપૂર્ણ આત્મવિશ્વાસ અનુભવવા માંગો છો." : "You have a wedding or major career event coming up and want to feel absolutely confident in photographs."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Surgical Team Section */}
                  <SurgicalTeamSection setCurrentPage={setCurrentPage} />

                  {/* Section 3: The Route Comparison */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="route-comparison-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "સારવારની સરખામણી" : "Treatment Comparison"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "સ્માઇલ મેકઓવર માટેના સારવાર વિકલ્પોની સરખામણી" : "Compare Smile Makeover Routes"}
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-7xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[680px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                {language === 'gu' ? "સમસ્યા" : "Concern"}
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                {language === 'gu' ? "સંભવિત સારવાર" : "Likely Treatment"}
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                {language === 'gu' ? "સારવારનો સમયગાળો" : "Treatment Timeline"}
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                {language === 'gu' ? "શરૂઆતની કિંમત" : "Starting Price"}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "દાંત વચ્ચે ગેપ અથવા તૂટેલા/અસમાન દાંત" : "Gaps or chipped/uneven teeth"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કમ્પોઝિટ બોન્ડિંગ" : "Composite bonding"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                                {language === 'gu' ? "સારવારના સમયગાળા માટે અમારો સંપર્ક કરો" : "Contact Us for Treatment Timeline"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "ફિક્કા, ડાઘવાળા અથવા પીળા દાંત" : "Dull, stained or yellow teeth"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "દાંત સફેદ કરવાની સારવાર" : "Whitening"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                                {language === 'gu' ? "સારવારના સમયગાળા માટે અમારો સંપર્ક કરો" : "Contact Us for Treatment Timeline"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "નાના, ઘસાઈ ગયેલા અથવા ખૂબ જ રંગહીન દાંત" : "Small, worn or deeply discoloured teeth"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "પોર્સેલિન વીનર્સ" : "Porcelain veneers"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                                {language === 'gu' ? "સારવારના સમયગાળા માટે અમારો સંપર્ક કરો" : "Contact Us for Treatment Timeline"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "ડાઘવાળા વાંકાચૂકા દાંત" : "Crooked teeth with staining"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "એલાઈનર્સ / બ્રેસિસ + દાંત સફેદ કરવાની સારવાર" : "Aligners / braces + whitening"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                                {language === 'gu' ? "સારવારના સમયગાળા માટે અમારો સંપર્ક કરો" : "Contact Us for Treatment Timeline"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "ગંભીર રીતે ક્ષતિગ્રસ્ત અથવા ખૂટતા દાંત" : "Heavily damaged or missing teeth"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "ક્રાઉન્સ / ફુલ માઉથ રિહેબિલિટેશન" : "Crowns / Full Mouth Rehabilitation"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                                {language === 'gu' ? "સારવારના સમયગાળા માટે અમારો સંપર્ક કરો" : "Contact Us for Treatment Timeline"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "ગમ્મી સ્માઇલ અથવા અસમાન પેઢાંની લાઇન" : "Gummy smile or uneven gumline"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "લેસર ગમ કોન્ટુરિંગ" : "Laser gum contouring"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                                {language === 'gu' ? "સારવારના સમયગાળા માટે અમારો સંપર્ક કરો" : "Contact Us for Treatment Timeline"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Section 8: Interactive Before & After Smile Transformations */}
                  {mConfig.show_before_after !== false && beforeAfterPairs.length > 0 && (
                    <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="before-after-gallery-section">
                      <div className="space-y-3 max-w-3xl mx-auto text-center">
                        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                          <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                          {language === 'gu' ? "પરિવર્તનો" : "Transformations"}
                        </span>
                        <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                          {language === 'gu' ? "સ્માઇલ મેકઓવર પહેલાં અને પછીના પરિવર્તનો" : seoHeadings.transformations}
                        </h2>
                        <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-start max-w-7xl mx-auto pt-4 px-4 sm:px-0">
                        {beforeAfterPairs.map((pair, idx) => (
                          <div 
                            key={idx} 
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
                    </div>
                  )}

                  {/* Section 8: Clinical Case Gallery */}
                  {mConfig.show_gallery !== false && (
                    <ClinicalCaseGallery
                      heading={language === 'gu' ? "સ્માઇલ મેકઓવર ક્લિનિકલ કેસ ગેલેરી" : seoHeadings.caseGallery}
                      description={language === 'gu' ? "સ્માઇલ મેકઓવર કરાવનાર દર્દીઓના ક્લિનિકલ કેસમાં થયેલા પરિવર્તનો." : mConfig.gallery_description}
                      items={Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery}
                      singleGallery={true}
                      language={language}
                    />
                  )}

                  {testimonialsElement}

                  {/* Section 8: Google Patient Reviews */}
                  {mConfig.show_google_reviews !== false && (
                    <GooglePatientReviews
                      heading={language === 'gu' ? "સ્માઇલ મેકઓવર માટેના Google દર્દી રિવ્યૂઝ" : seoHeadings.reviews}
                      label={language === 'gu' ? "Google રિવ્યૂઝ" : "Google Reviews"}
                      reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
                      language={language}
                    />
                  )}

                  {/* Section 4: The DSD Offer - Centrepiece */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="dsd-centrepiece-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0 animate-pulse" />
                        {language === 'gu' ? "ડિજિટલ સ્માઇલ પ્રિવ્યૂ" : "Digital Smile Preview"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "તમારી ડિજિટલ સ્માઇલનું પરિણામ પહેલાંથી જુઓ" : "Your Digital Smile Preview"}
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-5xl mx-auto bg-[#0B1528] rounded-3xl p-6 sm:p-10 lg:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden">
                      {/* Sub-header background texture */}
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none" />
                      
                      <div className="relative z-10 space-y-8">
                        <div className="text-center max-w-2xl mx-auto space-y-3">
                          <p className="text-[#2DD4BF] text-xs sm:text-sm font-black uppercase tracking-wider font-sans">
                            {language === 'gu' ? "પેમેન્ટ કરતાં પહેલાં તમારું અંતિમ પરિણામ જુઓ" : "See your final result before you pay"}
                          </p>
                          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                            {language === 'gu'
                              ? "દાંતની કોઈપણ તૈયારી પહેલાં ફિઝિકલ મોક-અપમાં આકાર અને લંબાઈ અજમાવી જુઓ. તમે ડિઝાઇનને મંજૂર કરી શકો છો, જરૂરી ફેરફારો કહી શકો છો અથવા કોઈ દબાણ વિના આગળ ન વધવાનો નિર્ણય લઈ શકો છો."
                              : "Try the shape and length in a physical mock-up before any tooth preparation. You can approve the design, request fine adjustments, or simply walk away."
                            }
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4">
                          <div className="bg-[#121E36] border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-[#0D9488]/30 text-[#2DD4BF] font-black text-sm flex items-center justify-center font-sans">1</div>
                            <h4 className="font-bold text-sm font-sans">{language === 'gu' ? "3D ઇમેજિંગ" : "3D Imaging"}</h4>
                            <p className="text-xs text-slate-400 font-medium font-sans">
                              {language === 'gu' ? "તમારા દાંતની ચોક્કસ રચનાના પ્રિસાઇઝર DSLR ફોટા અને ઇન્ટ્રાઓરલ સ્કેન લેવામાં આવે છે." : "Precision DSLR photos and intraoral scans of your exact dental structure."}
                            </p>
                          </div>

                          <div className="bg-[#121E36] border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-[#0D9488]/30 text-[#2DD4BF] font-black text-sm flex items-center justify-center font-sans">2</div>
                            <h4 className="font-bold text-sm font-sans">{language === 'gu' ? "ડિઝાઇન લેબ" : "Design Lab"}</h4>
                            <p className="text-xs text-slate-400 font-medium font-sans">
                              {language === 'gu' ? "ડિજિટલ ડિઝાઇન સિમ્યુલેશન દ્વારા દાંતના આદર્શ પ્રમાણ અને વળાંક દર્શાવવામાં આવે છે." : "Digital design simulation projecting ideal tooth proportions and curves."}
                            </p>
                          </div>

                          <div className="bg-[#121E36] border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-[#0D9488]/30 text-[#2DD4BF] font-black text-sm flex items-center justify-center font-sans">3</div>
                            <h4 className="font-bold text-sm font-sans">{language === 'gu' ? "સરખામણી" : "Comparison"}</h4>
                            <p className="text-xs text-slate-400 font-medium font-sans">
                              {language === 'gu' ? "હાલની અને પ્રસ્તાવિત સ્માઇલના ડિજિટલ મોક-અપની સાઇડ-બાય-સાઇડ સમીક્ષા કરો." : "Review a side-by-side current vs. proposed smile digital mock-up."}
                            </p>
                          </div>

                          <div className="bg-[#121E36] border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-[#0D9488]/30 text-[#2DD4BF] font-black text-sm flex items-center justify-center font-sans">4</div>
                            <h4 className="font-bold text-sm font-sans">{language === 'gu' ? "ફાઇન ટ્યુન" : "Fine Tune"}</h4>
                            <p className="text-xs text-slate-400 font-medium font-sans">
                              {language === 'gu' ? "આકાર, રંગ અને દાંતની ગોઠવણીમાં જરૂરી ફેરફારો માટે સહયોગથી ફાઇન ટ્યુનિંગ કરવામાં આવે છે." : "Collaborative adjustments to shape, color, and alignment coordinates."}
                            </p>
                          </div>

                          <div className="bg-[#121E36] border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-[#0D9488]/30 text-[#2DD4BF] font-black text-sm flex items-center justify-center font-sans">5</div>
                            <h4 className="font-bold text-sm font-sans">{language === 'gu' ? "ફિઝિકલ ટ્રાયલ" : "Physical Trial"}</h4>
                            <p className="text-xs text-slate-400 font-medium font-sans">
                              {language === 'gu' ? "ક્લિનિકલ તૈયારી પહેલાં મોઢામાં પહેરી શકાય તેવા ફિઝિકલ મોક-અપને અજમાવી જુઓ." : "Try on a removable physical mock-up in-mouth before clinical prep."}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-center pt-2">
                          <a
                            href={smileMakeoverWhatsAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all duration-200 font-sans"
                          >
                            <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
                            <span>{language === 'gu' ? "WhatsApp પર મારી સ્માઇલનું પ્રિવ્યૂ જુઓ" : "Preview My Smile on WhatsApp"}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Transparent Pricing */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="transparent-pricing-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "પારદર્શક કિંમત" : "TRANSPARENT PRICING"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "પારદર્શક સ્માઇલ મેકઓવર કિંમત" : "Transparent Smile Makeover Pricing"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu'
                          ? "અમે સંપૂર્ણ કિંમતમાં પારદર્શિતામાં માનીએ છીએ. નીચે કસ્ટમ સ્માઇલ મેકઓવર સારવાર માટેના વિવિધ વિકલ્પો આપેલા છે."
                          : "We believe in complete pricing transparency. Below are the structured options for custom Smile Makeover treatments."
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
                                {language === 'gu' ? "સારવારનો વિકલ્પ" : "Treatment Option"}
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                {language === 'gu' ? "શરૂઆતની કિંમત" : "Starting Price"}
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                {language === 'gu' ? "કયા માટે યોગ્ય" : "Ideal For"}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "કમ્પોઝિટ બોન્ડિંગ" : "Composite Bonding"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "નાના તૂટેલા ભાગો અને નાના ગેપને ઝડપથી સુધારવા માટે" : "Quick correction of minor chips and small gaps"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "દાંત સફેદ કરવાની સારવાર" : "Teeth Whitening"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "ઊંડા ડાઘ દૂર કરવા અને દાંતને વધુ તેજસ્વી બનાવવા માટે" : "Removing deep stains and brightening teeth"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "પોર્સેલિન વીનર્સ" : "Porcelain Veneers"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "આકાર, ગોઠવણી અને રંગમાં કાયમી સુધારા માટે" : "Permanent correction of shape, alignment, and color"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "એલાઈનર્સ / બ્રેસિસ + દાંત સફેદ કરવાની સારવાર" : "Aligners / Braces + Whitening"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "સંપૂર્ણ ઓર્થોડોન્ટિક ગોઠવણી અને દાંતને વધુ તેજસ્વી બનાવવા માટે" : "Comprehensive orthodontic alignment and brightening"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "મોડર્ન ક્રાઉન્સ" : "Modern Crowns"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "ગંભીર રીતે ક્ષતિગ્રસ્ત દાંતને મજબૂત બનાવવા અને પુનઃસ્થાપિત કરવા માટે" : "Strengthening and restoring heavily damaged teeth"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "ફુલ માઉથ રિહેબિલિટેશન" : "Full Mouth Rehabilitation"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "ચાવવાની કાર્યક્ષમતા અને દાંતના દેખાવના સંપૂર્ણ પુનઃસ્થાપન માટે" : "Comprehensive restoration of chewing function and aesthetics"}
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                {language === 'gu' ? "લેસર ગમ કોન્ટુરિંગ" : "Laser Gum Contouring"}
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                {language === 'gu' ? "કિંમત માટે અમારો સંપર્ક કરો" : "Contact Us for Pricing"}
                              </td>
                              <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700 font-medium'}`}>
                                {language === 'gu' ? "ગમ્મી સ્માઇલ અને અસમાન પેઢાંની લાઇન સુધારવા માટે" : "Correcting gummy smiles and uneven gum lines"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 space-y-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                          <div className="space-y-1">
                            <p className="text-xs sm:text-sm text-slate-700 font-bold font-sans">
                              {language === 'gu' ? "દરેક પ્લાનમાં સામેલ:" : "Included in every plan:"}
                            </p>
                            <p className={`text-xs max-w-xl font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                              {language === 'gu'
                                ? "તમામ સ્ટાન્ડર્ડ પ્રી-કન્સલ્ટેશન, 3D ઇન્ટ્રાઓરલ ડિજિટલ મેપિંગ, શેડ ઓપ્ટિમાઇઝેશન મેચિંગ અને પ્રારંભિક ડિજિટલ મોક-અપ પ્રિવ્યૂ."
                                : "All standard prep-consultations, 3D intraoral digital mapping, shade optimization matching, and initial digital mock-up preview."
                              }
                            </p>
                          </div>
                          <button
                            onClick={() => openAppointmentModal('Smile Makeover Pricing - Consultation')}
                            className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
                          >
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>{language === 'gu' ? "કન્સલ્ટેશન બુક કરો" : "Book Consultation"}</span>
                          </button>
                        </div>

                        <div className="border-t border-slate-200/60 pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-700 font-sans">
                          <div>
                            {language === 'gu' ? (
                              <>EMI વિકલ્પો: <span className="text-[#0D9488]">EMI ઉપલબ્ધ છે</span></>
                            ) : (
                              <>EMI Options: <span className="text-[#0D9488]">EMI available</span></>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 6: Treatment Timeline */}
                  <div className="pt-6 sm:pt-14 border-t border-slate-200/60" id="timeline-section">
                    <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[28px] sm:rounded-[36px] p-6 sm:p-12 lg:p-14 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
                      {/* Heading area */}
                      <div className="space-y-3 max-w-2xl mx-auto text-center mb-10 sm:mb-14">
                        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                          <Clock className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                          {language === 'gu' ? "સારવારનો સમયગાળો" : "TREATMENT TIMELINE"}
                        </span>
                        <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                          {language === 'gu' ? "તમારી સ્માઇલ મેકઓવર સારવારનો સમયગાળો" : "Your Smile Makeover Treatment Timeline"}
                        </h2>
                        <p className={`text-sm sm:text-base leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-normal'}`}>
                          {language === 'gu' ? "ચોક્કસ સમયગાળો તમે પસંદ કરેલી સારવારના વિકલ્પ પર આધારિત રહેશે." : "The exact timeline depends on your selected treatment route."}
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
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm font-sans">
                              1
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "ડિજિટલ મૂલ્યાંકન" : "Digital Assessment"}
                            </h3>
                            <p className={`${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'} text-xs sm:text-sm leading-relaxed px-4 font-sans`}>
                              {language === 'gu'
                                ? "તમારા ચહેરાના પ્રમાણને મેપ કરવા માટે હાઇ-રિઝોલ્યુશન DSLR ફોટા અને 3D ડિજિટલ ઇમ્પ્રેશન લેવામાં આવે છે."
                                : "We capture high-resolution DSLR photos and 3D digital impressions to map your facial coordinates."
                              }
                            </p>
                          </div>

                          {/* Step 2 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm font-sans">
                              2
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "પ્લાનિંગ અને મોક-અપ" : "Planning & Mock-up"}
                            </h3>
                            <p className={`${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'} text-xs sm:text-sm leading-relaxed px-4 font-sans`}>
                              {language === 'gu'
                                ? "અમારી ટીમ તમારી નવી સ્માઇલ ડિઝાઇન કરે છે અને ફિઝિકલ મોક-અપ તૈયાર કરે છે, જેને તમે સારવાર શરૂ થાય તે પહેલાં અજમાવી શકો છો."
                                : "Our team designs your new smile and prepares a physical mock-up you can try in before any treatment starts."
                              }
                            </p>
                          </div>

                          {/* Step 3 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm font-sans">
                              3
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "ચોક્કસ તૈયારી" : "Precise Preparation"}
                            </h3>
                            <p className={`${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'} text-xs sm:text-sm leading-relaxed px-4 font-sans`}>
                              {language === 'gu'
                                ? "તમારી મંજૂર કરેલી ડિઝાઇન અનુસાર જરૂરી દાંતની કન્ઝર્વેટિવ તૈયારી અથવા કોન્ટુરિંગ કરવામાં આવે છે."
                                : "We carry out conservative tooth preparation or contouring according to your approved preview."
                              }
                            </p>
                          </div>

                          {/* Step-4 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm font-sans">
                              4
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              {language === 'gu' ? "અંતિમ પરિણામ" : "The Final Reveal"}
                            </h3>
                            <p className={`${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'} text-xs sm:text-sm leading-relaxed px-4 font-sans`}>
                              {language === 'gu'
                                ? "ફ્લોલેસ અને લાંબા સમય સુધી ટકી રહે તેવી સ્માઇલ માટે તમારી મંજૂર કરેલી કસ્ટમ રેસ્ટોરેશન (વીનર્સ, ક્રાઉન્સ અથવા બોન્ડિંગ) લગાવવામાં આવે છે."
                                : "We bond your permanent custom restorations (veneers, crowns, or bonding) for a flawless, long-lasting smile."
                              }
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* General Treatment Examples note */}
                      <div className="mt-12 pt-6 border-t border-slate-100 flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-bold text-slate-500 font-sans">
                        <span>{language === 'gu' ? "વ્યક્તિગત સમયગાળો આ માટે અલગ હોઈ શકે છે:" : " Individual timelines vary for:"}</span>
                        <span>{language === 'gu' ? "- દાંત સફેદ કરવાની સારવાર" : "- Teeth Whitening"}</span>
                        <span>{language === 'gu' ? "- કમ્પોઝિટ બોન્ડિંગ" : "- Composite Bonding"}</span>
                        <span>{language === 'gu' ? "- પોર્સેલિન વીનર્સ" : "- Porcelain Veneers"}</span>
                        <span>{language === 'gu' ? "- એલાઈનર્સ / બ્રેસિસ" : "- Aligners / Braces"}</span>
                        <span>{language === 'gu' ? "- ક્રાઉન્સ" : "- Crowns"}</span>
                        <span>{language === 'gu' ? "- ગમ કોન્ટુરિંગ" : "- Gum Contouring"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Section 7: Risk Reversal / Reassurance */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="risk-reversal-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0D9488]" />
                        {language === 'gu' ? "જોખમમાં ઘટાડો અને આશ્વાસન" : "Risk Reversal & Reassurance"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "કમિટ કરતાં પહેલાં તમારી નવી સ્માઇલ જુઓ." : "See your new smile before you commit to it."}
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto pt-8">
                      {/* Reassurance 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] overflow-hidden text-left flex flex-col justify-between">
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#0D9488]" />
                        <div className="space-y-3">
                          <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight leading-tight">
                            {language === 'gu' ? "ડિજિટલ પ્રિવ્યૂ" : "Digital Preview"}
                          </h3>
                          <p className={`${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'} text-xs sm:text-sm leading-relaxed font-sans`}>
                            {language === 'gu'
                              ? "સારવાર શરૂ થાય તે પહેલાં તમારી પ્રસ્તાવિત સ્માઇલનું ડિજિટલ પ્રિવ્યૂ કરવામાં આવે છે. 3D સિમ્યુલેશન ઓવરલે જુઓ જેથી તમને ચોક્કસ રીતે ખબર પડે કે પરિણામ કેવું દેખાશે."
                              : "The proposed smile is digitally previewed before treatment starts. View 3D simulation overlays so you know exactly how the results will look."
                            }
                          </p>
                        </div>
                      </div>

                      {/* Reassurance 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] overflow-hidden text-left flex flex-col justify-between">
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#0D9488]" />
                        <div className="space-y-3">
                          <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight leading-tight">
                            {language === 'gu' ? "ફિઝિકલ મોક-અપ અજમાવી જુઓ" : "Try the Physical Mock-Up"}
                          </h3>
                          <p className={`${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'} text-xs sm:text-sm leading-relaxed font-sans`}>
                            {language === 'gu'
                              ? "તમે પ્રસ્તાવિત ડિઝાઇનની સમીક્ષા કરી શકો છો, જરૂરી ફાઇન-ટ્યુનિંગ ફેરફારો કહી શકો છો અને તમારા મોઢામાં સીધું રિમૂવેબલ ફિઝિકલ મોક-અપ અજમાવી શકો છો."
                              : "You can review the proposed design, request any number of fine-tuning adjustments, and try a removable physical mock-up directly in your mouth."
                            }
                          </p>
                        </div>
                      </div>

                      {/* Reassurance 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] overflow-hidden text-left flex flex-col justify-between">
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#0D9488]" />
                        <div className="space-y-3">
                          <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight leading-tight">
                            {language === 'gu' ? "આગળ ન વધવાનો વિકલ્પ" : "Walk-Away Option"}
                          </h3>
                          <p className={`${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'} text-xs sm:text-sm leading-relaxed font-sans`}>
                            {language === 'gu'
                              ? "જો મોક-અપના તબક્કા દરમિયાન પ્રસ્તાવિત સ્માઇલથી તમે સંપૂર્ણપણે સંતુષ્ટ ન હો, તો દાંતની તૈયારી શરૂ થાય તે પહેલાં તમે આગળ ન વધવાનો નિર્ણય લઈ શકો છો."
                              : "If you are not completely satisfied with the proposed smile direction during the mock-up phase, you can walk away before any tooth preparation begins."
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 8: Procedure Video */}
                  {videoElement}

                  {/* Section 9: Why Patel Dental / Why This Doctor */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="smile-makeover-why-patel-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        {language === 'gu' ? "Patel Dental કેમ?" : "WHY PATEL DENTAL"}
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        {language === 'gu' ? "ડિજિટલ સ્માઇલ ડિઝાઇન અને એસ્થેટિક વીનિયર નિષ્ણાતતા" : "Digital Smile Design & Esthetic Veneer Expertise"}
                      </h2>
                      <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                        {language === 'gu'
                          ? "તમારી નવી સ્માઇલને અદ્યતન 3D ડિજિટલ સ્માઇલ ડિઝાઇન વર્કફ્લો, ફેશિયલ મેપિંગ અને સ્વસ્થ દાંતની રચનાને જાળવવા માટેની સચોટ તૈયારી દ્વારા તૈયાર કરવામાં આવે છે."
                          : "Your new smile is crafted using advanced 3D digital smile design workflows, facial mapping, and meticulous preparation designed to preserve healthy tooth structure."
                        }
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight pt-2">
                          {language === 'gu' ? "ડિજિટલ સ્માઇલ ડિઝાઇન" : "Digital Smile Design"}
                        </h3>
                        <p className={`${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'} text-xs sm:text-sm leading-relaxed flex-1 font-sans`}>
                          {language === 'gu'
                            ? "અદ્યતન 3D પ્લાનિંગ સોફ્ટવેરનો ઉપયોગ કરીને તમારા ચહેરાના પ્રમાણ, હોઠ અને સ્માઇલ પેરામીટર્સને મેપ કરવામાં આવે છે, જેથી અત્યંત કસ્ટમાઇઝ્ડ અને પ્રમાણસર ડિઝાઇન તૈયાર કરી શકાય."
                            : "We map your facial coordinates, lips, and smile parameters using advanced 3D planning software to create a highly tailored and proportional design."
                          }
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight pt-2">
                          {language === 'gu' ? "ફિઝિકલ મોક-અપ ટ્રાય-ઇન" : "Try-In Physical Mock-Up"}
                        </h3>
                        <p className={`${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'} text-xs sm:text-sm leading-relaxed flex-1 font-sans`}>
                          {language === 'gu'
                            ? "આકાર, લંબાઈ અને શેડનું પ્રિવ્યૂ જોવા માટે તમારા મોઢામાં ફિઝિકલ સ્માઇલ મોક-અપ અજમાવી જુઓ. કોઈપણ તૈયારી શરૂ થાય તે પહેલાં તમે ફેરફારો કહી શકો છો અને આખી પ્રક્રિયા જોઈ શકો છો."
                            : "Try a physical smile mockup in your mouth to preview the shape, length, and shade. You can request changes and see the flow before any preparation begins."
                          }
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight pt-2">
                          {language === 'gu' ? "માઇક્રો-પ્રેપ સ્ટાઇલ" : "Micro-Prep Style"}
                        </h3>
                        <p className={`${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'} text-xs sm:text-sm leading-relaxed flex-1 font-sans`}>
                          {language === 'gu'
                            ? "અમે તમારા કુદરતી એનામેલને જાળવવાને પ્રાથમિકતા આપીએ છીએ. વીનર્સને અલ્ટ્રા-થિન લેવલ સુધી કસ્ટમ-મિલ કરવામાં આવે છે, જેથી તમારા દાંતમાં ન્યૂનતમ ફેરફાર કરવાની જરૂર પડે."
                            : "We prioritize conserving your natural enamel. Veneers are custom-milled to ultra-thin levels, ensuring minimal adjustments are made to your teeth."
                          }
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight pt-2">
                          {language === 'gu' ? "રીયાલિસ્ટિક ટ્રાન્સલ્યુસન્સી" : "Realistic Translucency"}
                        </h3>
                        <p className={`${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'} text-xs sm:text-sm leading-relaxed flex-1 font-sans`}>
                          {language === 'gu'
                            ? "પોર્સેલિન રેસ્ટોરેશનને માઇક્રો-ટ્રાન્સલ્યુસન્સી, રીયાલિસ્ટિક ટેક્સચર અને કસ્ટમાઇઝ્ડ ગ્રેડિયન્ટ્સ સાથે તૈયાર કરવામાં આવે છે, જેથી તે કુદરતી અને સ્વસ્થ એનામેલ જેવા દેખાય."
                            : "Porcelain restorations are crafted with micro-translucency, realistic textures, and customized gradients to look identical to natural, healthy enamel."
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 11: FAQ Accordion */}
                  {faqElement}

                  {/* Section 12: Bottom CTA */}
                  {bottomCtaElement}

                  {/* Section 13: Related Services */}
                  {relatedServicesElement}
                </div>

  );
};
