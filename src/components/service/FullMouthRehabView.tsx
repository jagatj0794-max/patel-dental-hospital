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
  setCurrentPage
}) => {
  return (
    <div className="space-y-8 sm:space-y-16 lg:space-y-20">
      {heroElement}

                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-symptom-qualification-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Is full mouth rehabilitation right for you?
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto pt-8">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        {/* Left accent line */}
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Multiple Broken, Decayed or Loose Teeth
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          When simple fillings or individual crowns are no longer enough to save your bite.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        {/* Left accent line */}
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Severe Wear & Flattened Bite
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          Teeth that are heavily worn down, causing jaw pain, chewing difficulty, or a collapsed facial appearance.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
                        {/* Left accent line */}
                        <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[26px] tracking-tight mb-2 sm:mb-4 leading-tight">
                          Missing Most or All of Your Teeth
                        </h3>
                        <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                          Struggling with loose dentures and wanting a permanent, secure, and life-changing fixed-teeth solution.
                        </p>
                      </div>
                    </div>
                  </div>


                {/* Section 3: Comparison Table for Full Mouth Rehabilitation */}
                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-comparison-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        Option Comparison
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        What doing nothing costs
                      </h2>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-7xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[680px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Feature / Factor
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4 relative">
                                <div className="flex items-center justify-between gap-2">
                                  <span>Full Mouth Rehabilitation</span>
                                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest whitespace-nowrap">
                                    Recommended
                                  </span>
                                </div>
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Continuing to patch tooth by tooth
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/4">
                                Full Dentures
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Chewing restored
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Reconstructed to restore 100% full chewing power.</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Chewing ability continues to decline as more teeth fail.
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Limited chewing power (20%-30%); restricts diet significantly.
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Bite and jaw joint corrected
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Yes; fully aligns and balances dental arches to correct TMJ pain.</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                No; uneven tooth wear and tooth movement worsen TMJ stress.
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                No; slipping appliances cannot support natural joint alignment.
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Facial support restored
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Yes; supports cheeks and lips naturally, reversing collapsed look.</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                No; progressive tooth wear causes facial height collapse.
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Temporary; jawbone shrinkage over time leads to a sunken facial appearance.
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Bone loss
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Prevented; implants stimulate bone and preserve natural jaw structure.</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Continues to accelerate in missing tooth areas.
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Accelerated bone loss due to constant surface pressure on gum ridges.
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Total cost over 10 years
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Contact Us for Pricing</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                High; multiple emergency procedures and crowns accumulate a high lifetime cost.
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Ongoing expenses for adjustments, relining, adhesives, and replacements.
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Result
                              </td>
                              <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                                  <span>Permanent, highly functional, and fully stable natural-looking teeth.</span>
                                </div>
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Chronic toothaches, unstable bite, and progressive tooth loss.
                              </td>
                              <td className="p-4 sm:p-5 text-slate-600">
                                Loose, uncomfortable removable appliance that can slip while speaking or eating.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>


                {/* Section 4: Pricing & Financing for Full Mouth Rehabilitation */}
                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-pricing-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        Pricing & Financing
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Full Mouth Reconstruction Costs
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        We provide completely transparent costs with structured financial options to help make full mouth reconstruction accessible and stress-free.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="max-w-4xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[540px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Treatment
                              </th>
                              <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Starting Price
                              </th>
                              <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                                Best For
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Single-arch rehabilitation
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Rebuilding one entire arch of teeth
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Full-mouth (both arches)
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Comprehensive restoration of both upper and lower arches
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                All-on-4  -  per arch, fixed teeth
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Fixed teeth on 4 dental implants per arch
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                All-on-6  -  per arch, fixed teeth
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Fixed teeth on 6 dental implants per arch for maximum stability
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                                Full-mouth crowns (no implants needed)
                              </td>
                              <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                                Contact Us for Pricing
                              </td>
                              <td className="p-4 sm:p-5 text-slate-700 font-medium">
                                Complete natural teeth restoration using high-quality crowns
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
                                Zero-Interest EMI
                              </h4>
                              <p className="text-slate-500 text-xs sm:text-sm mt-0.5 font-medium leading-relaxed">
                                Convenient monthly installment plans are available at zero interest to ease the treatment cost.
                              </p>
                            </div>
                          </div>

                          <div className="bg-white border border-slate-100 rounded-2xl p-5 text-left flex items-start gap-3 shadow-sm">
                            <div className="h-9 w-9 rounded-lg bg-teal-50 flex items-center justify-center text-[#0D9488] border border-teal-100 shrink-0 mt-0.5">
                              <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                                Multi-Bank Support
                              </h4>
                              <p className="text-slate-500 text-xs sm:text-sm mt-0.5 font-medium leading-relaxed">
                                We partner with leading financial providers to offer instant approvals and flexible tenures.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                          <a
                            href={`https://wa.me/${(mConfig.contact_whatsapp_number && mConfig.contact_whatsapp_number.trim() !== '') ? mConfig.contact_whatsapp_number.replace(/\s+/g, '') : contactInfo.whatsappRaw || '919924225500'}?text=${encodeURIComponent("Hello, most of my teeth are damaged or missing. I want to know about full mouth treatment.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer"
                          >
                            <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
                            <span>Check EMI Eligibility on WhatsApp</span>
                          </a>

                          <button
                            onClick={() => openAppointmentModal('Full Mouth Rehabilitation - Pricing')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                          >
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>Request Treatment Estimate</span>
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
                        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                          <Clock className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                          Treatment Timeline
                        </span>
                        <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                          Your Full Mouth Reconstruction Roadmap
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center font-normal">
                          We divide complex full mouth rehabilitation into structured phases to ensure maximum precision, patient comfort, and long-term treatment success.
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
                              Comprehensive Planning
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              Complete planning including diagnostic records, 3D CBCT scans, and diagnostic mockups before starting treatment.
                            </p>
                          </div>

                          {/* Step 2 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              2
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Foundation Work & Preparation
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              Address root canal therapy, tooth extractions, and gum treatment as required.
                            </p>
                          </div>

                          {/* Step 3 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                              3
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Implant Placement & Temporary Teeth
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              Secure implant placement and custom temporary restorations to preserve function and comfort.
                            </p>
                          </div>

                          {/* Step 4 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="w-[72px] h-[72px] rounded-full bg-[#0D9488] border-2 border-[#0D9488] flex items-center justify-center text-white font-bold text-xl mb-5 shadow-md">
                              4
                            </div>
                            <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                              Final Custom Reconstruction
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                              Custom final crown and bridge work to restore permanent natural appearance and chewing power.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                {/* Section 6: Risk Reversal / Patient Reassurance for Full Mouth Rehabilitation */}
                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-reassurance-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        REASSURANCE & TRANSPARENCY
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Our Reassurance for Your Full Mouth Reconstruction
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Rebuilding your smile is a major decision. We provide full clinical transparency, coordinated care, and ongoing support so you can feel completely secure at every step.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Point 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Full Clinical Transparency
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Full mouth rehabilitation combines multiple clinical treatments, each planned thoroughly with written documentation and transparent cost breakdowns before any work begins.
                        </p>
                      </div>

                      {/* Point 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Multi-disciplinary Care Coordination
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Your treatment plan is fully coordinated in-house under one clinic roof by our expert team. This ensures perfect synchronization and eliminates fragmented external referrals.
                        </p>
                      </div>

                      {/* Point 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Proactive Support & Follow-up
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          We outline a structured regimen of follow-ups and maintenance checks to monitor proper healing, bite accuracy, and ensure long-term functional stability.
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={() => openAppointmentModal('Full Mouth Rehabilitation - Reassurance')}
                        className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                      >
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span>Discuss Your Custom Treatment Plan</span>
                      </button>
                    </div>
                  </div>



        {/* Section 5: Interactive Before & After Smile Transformations */}
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
              <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-medium font-sans">
                {mConfig.before_after_description || "See real smile transformations of our full mouth rehabilitation patients."}
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
            heading={seoHeadings.caseGallery}
            description={mConfig.gallery_description}
            items={Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery}
            singleGallery={true}
          />
        )}

        {/* Section 6: Procedure Video (Loaded dynamically from CMS Instagram Reel) */}
        {videoElement}

        {/* Section 7: Patient Testimonial Reels */}
        {testimonialsElement}

        {/* Section 10: Google Patient Reviews (100% CMS-driven premium slider) */}
        {mConfig.show_google_reviews !== false && (
          <GooglePatientReviews
            heading={seoHeadings.reviews}
            reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
          />
        )}

                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-team-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50/90 border border-teal-100/60 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                        <Users className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        THE RECONSTRUCTION TEAM
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Led by Dr. Vipul Patel & Clinical Team
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Full mouth rehabilitation is highly complex and requires expert planning. Dr. Vipul Patel personally plans your entire reconstruction to ensure correct bite function, joint harmony, and muscular symmetry.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto items-stretch pt-4">
                      {/* Left: Dr. Vipul Patel Main Card */}
                      <div className="lg:col-span-7 bg-white border border-[#E8EEF5] rounded-[28px] p-6 sm:p-8 md:p-10 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] hover:border-[#14B8A6] transition-all duration-300 flex flex-col md:flex-row gap-6 sm:gap-8 relative overflow-hidden">
                        <div className="absolute left-0 top-10 bottom-10 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        
                        {/* Profile Image Column */}
                        <div className="w-full md:w-2/5 shrink-0">
                          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative">
                            <img 
                              src={drVipulImg} 
                              alt="Dr. Vipul Patel"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>

                        {/* Details Column */}
                        <div className="flex flex-col justify-between space-y-4 text-left">
                          <div className="space-y-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-teal-50 text-[#0D9488] text-xs font-semibold uppercase tracking-wider border border-teal-100/40">
                              Chief Implantologist
                            </span>
                            <h3 className="font-sans font-black text-[#081C3A] text-2xl tracking-tight">
                              Dr. Vipul Patel
                            </h3>
                            <p className="text-slate-500 text-xs sm:text-sm font-semibold uppercase tracking-wider leading-snug">
                              MDS, Masters in Implantology (USA)
                            </p>
                            <div className="h-[1px] bg-slate-100 w-full pt-1" />
                          </div>

                          <div className="space-y-3 flex-1">
                            <div className="flex items-start gap-2 text-slate-600 text-xs sm:text-sm">
                              <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                              <span>Completed Masters in Implantology (USA) with extensive advanced surgery training.</span>
                            </div>
                            <div className="flex items-start gap-2 text-slate-600 text-xs sm:text-sm">
                              <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                              <span>Over 14 years of implant surgery and complex full mouth rehabilitation experience.</span>
                            </div>
                            <div className="flex items-start gap-2 text-slate-600 text-xs sm:text-sm">
                              <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                              <span>Active Life Member of Indian Society of Oral Implantology (ISOI).</span>
                            </div>
                          </div>

                          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <span className="inline-flex items-center gap-1.5 text-xs text-[#0D9488] font-bold tracking-wide">
                              <Award className="h-4 w-4 shrink-0" />
                              Certified USA Diplomate & Fellow
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if (setCurrentPage) {
                                  setCurrentPage('doctors');
                                }
                                window.location.hash = 'doctors';
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="px-4 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-[11px] font-black uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition-all duration-300 cursor-pointer text-center"
                            >
                              LEARN MORE
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right: FMR-specific supporting cards */}
                      <div className="lg:col-span-5 flex flex-col justify-between gap-6">
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
                    </div>
                  </div>


                {/* Section 9: Advanced Rehabilitation Technology for Full Mouth Rehabilitation */}
                
                  <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="fmr-technology-section">
                    <div className="space-y-3 max-w-3xl mx-auto text-center">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50/90 border border-teal-100/60 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                        ADVANCED REHABILITATION TECHNOLOGY
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
                        Precision Digital Technology Designed Around Your Treatment
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
                        Digital diagnostic mapping and CAD/CAM fabrication help your treatment team execute your full mouth rehabilitation with greater safety, comfort, and perfect bite alignment.
                      </p>
                      <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                      {/* Card 1 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          3D CBCT Scan & Mapping
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Full 3D mapping of jawbone depth, density, and nerve pathways to plan optimal implant anchors and avoid critical anatomical structures.
                        </p>
                      </div>

                      {/* Card 2 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Digital Intraoral Scanners
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Replaces messy physical mouth molds with a seamless, highly precise 3D digital scanner to capture comfortable, ultra-accurate models of your mouth.
                        </p>
                      </div>

                      {/* Card 3 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          In-House CAD/CAM Milling
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Our clinical lab designs and mills premium, highly biological zirconia arches with computer-aided manufacturing for seamless, heavy-duty durability.
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
                        <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
                        <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
                          Bite Height & TMJ Diagnostics
                        </h3>
                        <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
                          Advanced diagnostics to measure jaw joint orientation, ensuring your new teeth restore your optimal biological bite height and relieve TMJ stress.
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
