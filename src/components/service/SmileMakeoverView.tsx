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
  setCurrentPage
}) => {
  return (
                <div className="space-y-8 sm:space-y-16 lg:space-y-20">
                  {heroElement}

                  {/* Section 2: Symptom Qualification */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="symptom-qualification-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0D9488]" />
                        Symptom Qualification
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        A smile makeover might be for you if:
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto pt-8">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Self-Conscious Smiling
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          You cover your mouth when you laugh or smile, holding back your natural expression.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Teeth Gaps
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          You have noticeable gaps or spacing between your teeth that you want unified.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Chipped or Uneven
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          Your teeth are chipped, worn down, or unevenly shaped from wear or micro-fractures.
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Deep Discolouration
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          Your teeth are badly discoloured, and standard teeth whitening alone is insufficient.
                        </p>
                      </div>

                      {/* Card 5 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Gummy Smile
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          You have a gummy smile or an uneven gumline that makes your teeth look too short.
                        </p>
                      </div>

                      {/* Card 6 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Proportion & Size
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          Your teeth look too small, too short, or mismatched with your overall facial proportions.
                        </p>
                      </div>

                      {/* Card 7 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Crooked Front Teeth
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          You have minor crowding on front teeth but want to avoid long traditional orthodontic treatments.
                        </p>
                      </div>

                      {/* Card 8 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Mismatched Crowns
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          You have old, dark, or mismatched crowns or fillings that disrupt the aesthetic of your natural teeth.
                        </p>
                      </div>

                      {/* Card 9 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Upcoming Life Milestone
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          You have a wedding or major career event coming up and want to feel absolutely confident in photographs.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Surgical Team Section */}
                  <SurgicalTeamSection setCurrentPage={setCurrentPage} />

                  {/* Section 3: The Route Comparison */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="route-comparison-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        Treatment Comparison
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Compare Smile Makeover Routes
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-7xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[680px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Concern
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Likely Treatment
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Treatment Timeline
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Starting Price
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Gaps or chipped/uneven teeth
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Composite bonding
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Treatment Timeline
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Pricing
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Dull, stained or yellow teeth
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Whitening
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Treatment Timeline
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Pricing
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Small, worn or deeply discoloured teeth
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Porcelain veneers
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Treatment Timeline
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Pricing
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Crooked teeth with staining
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Aligners / braces + whitening
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Treatment Timeline
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Pricing
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Heavily damaged or missing teeth
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Crowns / Full Mouth Rehabilitation
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Treatment Timeline
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Pricing
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Gummy smile or uneven gumline
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Laser gum contouring
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Treatment Timeline
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600 font-medium">
                                Contact Us for Pricing
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
                        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                          <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                          Transformations
                        </span>
                        <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                          {seoHeadings.transformations}
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
                      heading={seoHeadings.caseGallery}
                      description={mConfig.gallery_description}
                      items={Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery}
                      singleGallery={true}
                    />
                  )}

                  {testimonialsElement}

                  {/* Section 8: Google Patient Reviews */}
                  {mConfig.show_google_reviews !== false && (
                    <GooglePatientReviews
                      heading={seoHeadings.reviews}
                      reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
                    />
                  )}

                  {/* Section 4: The DSD Offer - Centrepiece */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="dsd-centrepiece-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0 animate-pulse" />
                        Digital Smile Preview
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Your Digital Smile Preview
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-5xl mx-auto bg-[#0B1528] rounded-3xl p-6 sm:p-10 lg:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden">
                      {/* Sub-header background texture */}
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none" />
                      
                      <div className="relative z-10 space-y-8">
                        <div className="text-center max-w-2xl mx-auto space-y-3">
                          <p className="text-[#2DD4BF] text-xs sm:text-sm font-black uppercase tracking-wider">
                            See your final result before you pay
                          </p>
                          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                            Try the shape and length in a physical mock-up before any tooth preparation. You can approve the design, request fine adjustments, or simply walk away.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4">
                          <div className="bg-[#121E36] border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-[#0D9488]/30 text-[#2DD4BF] font-black text-sm flex items-center justify-center">1</div>
                            <h4 className="font-bold text-sm">3D Imaging</h4>
                            <p className="text-xs text-slate-400 font-medium">Precision DSLR photos and intraoral scans of your exact dental structure.</p>
                          </div>

                          <div className="bg-[#121E36] border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-[#0D9488]/30 text-[#2DD4BF] font-black text-sm flex items-center justify-center">2</div>
                            <h4 className="font-bold text-sm">Design Lab</h4>
                            <p className="text-xs text-slate-400 font-medium">Digital design simulation projecting ideal tooth proportions and curves.</p>
                          </div>

                          <div className="bg-[#121E36] border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-[#0D9488]/30 text-[#2DD4BF] font-black text-sm flex items-center justify-center">3</div>
                            <h4 className="font-bold text-sm">Comparison</h4>
                            <p className="text-xs text-slate-400 font-medium">Review a side-by-side current vs. proposed smile digital mock-up.</p>
                          </div>

                          <div className="bg-[#121E36] border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-[#0D9488]/30 text-[#2DD4BF] font-black text-sm flex items-center justify-center">4</div>
                            <h4 className="font-bold text-sm">Fine Tune</h4>
                            <p className="text-xs text-slate-400 font-medium">Collaborative adjustments to shape, color, and alignment coordinates.</p>
                          </div>

                          <div className="bg-[#121E36] border border-slate-800 rounded-2xl p-5 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-[#0D9488]/30 text-[#2DD4BF] font-black text-sm flex items-center justify-center">5</div>
                            <h4 className="font-bold text-sm">Physical Trial</h4>
                            <p className="text-xs text-slate-400 font-medium">Try on a removable physical mock-up in-mouth before clinical prep.</p>
                          </div>
                        </div>

                        <div className="flex justify-center pt-2">
                          <a
                            href={smileMakeoverWhatsAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
                            <span>Preview My Smile on WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Transparent Pricing */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="transparent-pricing-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        TRANSPARENT PRICING
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Transparent Smile Makeover Pricing
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        We believe in complete pricing transparency. Below are the structured options for custom Smile Makeover treatments.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-4xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[540px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Treatment Option
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Starting Price
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Ideal For
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Composite Bonding
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Quick correction of minor chips and small gaps
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Teeth Whitening
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Removing deep stains and brightening teeth
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Porcelain Veneers
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Permanent correction of shape, alignment, and color
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Aligners / Braces + Whitening
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Comprehensive orthodontic alignment and brightening
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Modern Crowns
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Strengthening and restoring heavily damaged teeth
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Full Mouth Rehabilitation
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Comprehensive restoration of chewing function and aesthetics
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Laser Gum Contouring
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Correcting gummy smiles and uneven gum lines
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 space-y-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                          <div className="space-y-1">
                            <p className="text-xs sm:text-sm text-slate-700 font-bold">
                              Included in every plan:
                            </p>
                            <p className="text-xs text-slate-600 font-medium max-w-xl">
                              All standard prep-consultations, 3D intraoral digital mapping, shade optimization matching, and initial digital mock-up preview.
                            </p>
                          </div>
                          <button
                            onClick={() => openAppointmentModal('Smile Makeover Pricing - Consultation')}
                            className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                          >
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>Book Consultation</span>
                          </button>
                        </div>

                        <div className="border-t border-slate-200/60 pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-700">
                          <div>
                             EMI Options: <span className="text-[#0D9488]">EMI available</span>
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
                        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                          <Clock className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                          TREATMENT TIMELINE
                        </span>
                        <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                          Your Smile Makeover Treatment Timeline
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center font-normal">
                          The exact timeline depends on your selected treatment route.
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
                              Digital Assessment
                            </h3>
                            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium px-4">
                              We capture high-resolution DSLR photos and 3D digital impressions to map your facial coordinates.
                            </p>
                          </div>

                          {/* Step 2 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              2
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Planning & Mock-up
                            </h3>
                            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium px-4">
                              Our team designs your new smile and prepares a physical mock-up you can try in before any treatment starts.
                            </p>
                          </div>

                          {/* Step 3 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              3
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Precise Preparation
                            </h3>
                            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium px-4">
                              We carry out conservative tooth preparation or contouring according to your approved preview.
                            </p>
                          </div>

                          {/* Step-4 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              4
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              The Final Reveal
                            </h3>
                            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium px-4">
                              We bond your permanent custom restorations (veneers, crowns, or bonding) for a flawless, long-lasting smile.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* General Treatment Examples note */}
                      <div className="mt-12 pt-6 border-t border-slate-100 flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-bold text-slate-500">
                        <span> Individual timelines vary for:</span>
                        <span>- Teeth Whitening</span>
                        <span>- Composite Bonding</span>
                        <span>- Porcelain Veneers</span>
                        <span>- Aligners / Braces</span>
                        <span>- Crowns</span>
                        <span>- Gum Contouring</span>
                      </div>
                    </div>
                  </div>

                  {/* Section 7: Risk Reversal / Reassurance */}
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="risk-reversal-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0D9488]" />
                        Risk Reversal & Reassurance
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        See your new smile before you commit to it.
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto pt-8">
                      {/* Reassurance 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] overflow-hidden text-left flex flex-col justify-between">
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#0D9488]" />
                        <div className="space-y-3">
                          <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight leading-tight">
                            Digital Preview
                          </h3>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                            The proposed smile is digitally previewed before treatment starts. View 3D simulation overlays so you know exactly how the results will look.
                          </p>
                        </div>
                      </div>

                      {/* Reassurance 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] overflow-hidden text-left flex flex-col justify-between">
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#0D9488]" />
                        <div className="space-y-3">
                          <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight leading-tight">
                            Try the Physical Mock-Up
                          </h3>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                            You can review the proposed design, request any number of fine-tuning adjustments, and try a removable physical mock-up directly in your mouth.
                          </p>
                        </div>
                      </div>

                      {/* Reassurance 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] overflow-hidden text-left flex flex-col justify-between">
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#0D9488]" />
                        <div className="space-y-3">
                          <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight leading-tight">
                            Walk-Away Option
                          </h3>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                            If you are not completely satisfied with the proposed smile direction during the mock-up phase, you can walk away before any tooth preparation begins.
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
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        WHY PATEL DENTAL
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Digital Smile Design & Esthetic Veneer Expertise
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Your new smile is crafted using advanced 3D digital smile design workflows, facial mapping, and meticulous preparation designed to preserve healthy tooth structure.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight pt-2">
                          Digital Smile Design
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          We map your facial coordinates, lips, and smile parameters using advanced 3D planning software to create a highly tailored and proportional design.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight pt-2">
                          Try-In Physical Mock-Up
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Try a physical smile mockup in your mouth to preview the shape, length, and shade. You can request changes and see the flow before any preparation begins.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight pt-2">
                          Micro-Prep Style
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          We prioritize conserving your natural enamel. Veneers are custom-milled to ultra-thin levels, ensuring minimal adjustments are made to your teeth.
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight pt-2">
                          Realistic Translucency
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Porcelain restorations are crafted with micro-translucency, realistic textures, and customized gradients to look identical to natural, healthy enamel.
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
