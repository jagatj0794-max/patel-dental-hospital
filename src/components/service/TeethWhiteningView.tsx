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
  setCurrentPage
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const occasions = [
    {
      id: 'wedding',
      title: 'Your Wedding Day',
      badge: 'Wedding Milestone',
      description: 'Ensure your smile is beautifully bright and flawless in every wedding photograph. Perfect for brides, grooms, and the entire wedding party wishing to look their best.',
      icon: Heart,
      color: 'from-pink-500/10 to-rose-500/10',
      iconColor: 'text-rose-500',
    },
    {
      id: 'interview',
      title: 'Job Interviews',
      badge: 'Career Success',
      description: 'Project confidence, competence, and a warm professionalism from the very first greeting. A bright smile leaves a lasting positive impression during competitive hiring rounds.',
      icon: Briefcase,
      color: 'from-blue-500/10 to-indigo-500/10',
      iconColor: 'text-indigo-600',
    },
    {
      id: 'events',
      title: 'Special Social Events',
      badge: 'Social Milestone',
      description: 'Look your absolute best for reunions, galas, public speaking engagements, and major life celebrations with a polished, beautifully radiant appearance.',
      icon: Award,
      color: 'from-amber-500/10 to-orange-500/10',
      iconColor: 'text-amber-500',
    },
    {
      id: 'daily',
      title: 'Daily Self-Care Boost',
      badge: 'Personal Wellness',
      description: 'Experience an immediate lift in your daily self-image and lifestyle confidence. Elevate your everyday style with a fast, safe, and beautifully bright aesthetic enhancement.',
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
            OPTIMAL TIMING & MOMENTS
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Perfect Occasions for Teeth Whitening
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center font-medium font-sans max-w-2xl mx-auto">
            A visibly brighter smile is a simple, highly effective way to elevate your confidence before key personal and professional milestones.
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
                    <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium flex-1">
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
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            <Scale className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            TREATMENT COMPARISON
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Compare Your Teeth Whitening Options
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
            Understand the clinical and practical differences between our safe, rapid in-clinic treatment and convenient take-home whitening kits.
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="max-w-7xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    Feature / Factor
                  </th>
                  <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3 relative">
                    <div className="flex items-center justify-between gap-2">
                      <span>In-Clinic Professional Whitening</span>
                      <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                        Recommended
                      </span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    Take-Home Whitening Kit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Treatment Location
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>Performed in-clinic under direct dental supervision</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Self-applied at home following professional clinician guidance
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Required Appointments
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>One single comfortable clinical appointment</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Consultation to supply/prescribe the customized home whitening kit
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Procedure Duration
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>Rapid 30-minute professional treatment session</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Applied in home sessions as directed by your dentist
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Results Visibility
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>Immediate visible result right after the treatment</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Gradual shade improvement over the course of treatment
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Safety & Certifications
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>CE & FDA-approved systems; fully enamel-safe</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Enamel-safe, professional-grade systems approved for gentle home use
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Patient Sensitivity
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>No sensitivity for most patients; monitored clinically</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Formulated to ensure minimal, temporary sensitivity during home use
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
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
              <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              7. TREATMENT-MATCHED PROOF &bull; Before & After Gallery
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight text-center">
              {seoHeadings?.transformations || "Teeth Whitening Transformations"}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-medium font-sans">
              {mConfig?.before_after_description || "See real smile transformations of our teeth whitening patients."}
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
        <div className="border-t border-slate-200/60 pt-6 sm:pt-14 max-w-7xl mx-auto px-4 sm:px-6" id="teeth-whitening-clinical-gallery">
          <ClinicalCaseGallery
            heading={seoHeadings?.caseGallery || "Clinical Case Gallery"}
            description={mConfig?.gallery_description}
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
            heading={seoHeadings?.reviews || "Google Patient Reviews"}
            reviews={Array.isArray(mConfig?.google_reviews) ? mConfig?.google_reviews : []}
          />
        </div>
      )}

      {/* SECTION 4: Transparent Pricing */}
      <section id="teeth-whitening-pricing-section" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            TRANSPARENT PRICING
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Teeth Whitening Cost & Pricing
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
            We provide absolute clarity on treatment options. Speak with our clinical team to discuss suitability and get full details.
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
                    Price
                  </th>
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    Key Benefit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    In-Clinic Professional Whitening
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-medium">
                    Immediate visible results in a 30-minute session
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Take-Home Whitening Kit
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-medium">
                    Professional systems prescribed for convenient home use
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl font-sans">
              Your final treatment suitability, choices, and costs will be discussed clearly with the clinic during your clinical examination.
            </p>
            <button
              onClick={() => openAppointmentModal('Teeth Whitening')}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
            >
              <Calendar className="h-4 w-4 shrink-0" />
              <span>Discuss Suitability & Pricing</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: Treatment Timeline */}
      <section id="teeth-whitening-timeline-section" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[28px] sm:rounded-[36px] p-6 sm:p-12 lg:p-14 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
          <div className="space-y-3 max-w-2xl mx-auto text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 mx-auto">
              <Timer className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              TREATMENT TIMELINE
            </span>
            <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              Your Teeth Whitening Timeline
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center font-normal font-sans">
              Achieving a brighter smile is simple, fast, and structured carefully to protect your safety and oral health.
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
                  Consultation & Suitability
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                  Discussion of your goals, shade assessment, and dental checkup to confirm whitening suitability.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                  2
                </div>
                <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                  In-Clinic Professional Whitening
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                  Safe in-clinic procedure taking approximately 30 minutes in a single appointment.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[72px] h-[72px] rounded-full bg-[#0D9488] border-2 border-[#0D9488] flex items-center justify-center text-white font-bold text-xl mb-5 shadow-md">
                  3
                </div>
                <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                  Immediate Visible Result
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                  Walk out with immediately visible brighter teeth and complete post-treatment guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Risk Reversal / Patient Reassurance */}
      <section id="teeth-whitening-reassurance-section" className="space-y-6 sm:space-y-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            PATIENT REASSURANCE & SAFETY
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Your Comfortable Path to a Brighter Smile
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
            Our treatments are selected with patient safety and comfort in mind. We use recognized, certified systems designed for reliable care.
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
              CE & FDA-Approved Systems
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium">
              We exclusively utilize professionally trusted, CE and FDA-approved whitening systems to guarantee standard clinical safety during application.
            </p>
          </div>

          {/* Point 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              Enamel-Safe Treatments
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium">
              Whitening systems are carefully structured to protect and keep natural tooth enamel completely safe, avoiding dental abrasion or structural damage.
            </p>
          </div>

          {/* Point 3 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-5 border border-teal-100/60 shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              No Sensitivity for Most Patients
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium">
              Most patients achieve beautiful shade enhancement with no sensitivity. For those with pre-existing conditions, take-home kits are available as a gentle alternative option.
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
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            <Shield className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            CLINICAL ADVANTAGE
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Why Choose Patel Dental Hospital For Teeth Whitening?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
            We focus on providing safe, enamel-protective whitening treatments that fit your schedule and produce reliable, bright, and confident results.
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pt-4">
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              Clinically Supervised Whitening
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium">
              Your whitening is directly monitored and applied in-clinic by trained dental professionals, preventing the uneven results or gum irritation common with commercial kits.
            </p>
          </div>

          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              Enamel-Safe Certified Systems
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium">
              We protect your natural tooth structure by utilizing exclusively CE & FDA-approved whitening systems designed to guard enamel safety completely.
            </p>
          </div>

          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              Rapid One-Visit Occasion Setup
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium">
              Perfect for patients preparing for marriages or career events, our rapid 30-minute in-clinic option achieves immediately visible shade enhancement in one appointment.
            </p>
          </div>

          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              Flexible Home-Care Alternatives
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium">
              We support your individual comfort preferences by providing professional-grade take-home whitening kits as a gentle and highly flexible treatment alternative.
            </p>
          </div>

          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[32px] sm:bottom-[32px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              No Sensitivity For Most Patients
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium">
              Our advanced clinical formulations are carefully chosen to ensure that most patients achieve a beautifully radiant smile with absolutely no sensitivity.
            </p>
          </div>
        </div>
      </section>

      {/* 9. FAQ + FAQPage Schema */}
      <section id="teeth-whitening-faq-section" className="space-y-6 sm:space-y-10 pt-10 sm:pt-16 border-t border-slate-200/60 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            <HelpCircle className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            PATIENT OBJECTIONS & QUESTIONS
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center font-medium font-sans">
            Got questions? We have clear, honest, and clinically accurate answers about our teeth whitening treatments.
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="space-y-4 max-w-3xl mx-auto pt-4">
          {[
            {
              question: "What is professional teeth whitening?",
              answer: "Professional teeth whitening is a highly safe, effective dental treatment designed to lift stains and brighten your teeth using CE & FDA-approved whitening systems under professional supervision."
            },
            {
              question: "How long does Teeth Whitening take?",
              answer: "Our professional in-clinic whitening session is designed to be highly efficient, taking approximately 30 minutes to complete."
            },
            {
              question: "Is professional Teeth Whitening done in one appointment?",
              answer: "Yes, our in-clinic teeth whitening is designed to be fully completed within a single, convenient clinical appointment."
            },
            {
              question: "When will I see the result?",
              answer: "You will experience immediate visible results right after your 30-minute in-clinic treatment session."
            },
            {
              question: "Is Teeth Whitening enamel-safe?",
              answer: "Yes, our professionally supervised whitening treatments utilize enamel-safe systems specifically formulated to protect your natural tooth structure."
            },
            {
              question: "Will I experience sensitivity?",
              answer: "Most patients experience no sensitivity during or after the treatment. Our systems are chosen to keep the procedure highly comfortable for most patients."
            },
            {
              question: "Do you offer take-home whitening kits?",
              answer: "Yes, professional-grade take-home whitening kits are available as an alternative option when recommended by your dentist."
            },
            {
              question: "Is Teeth Whitening suitable for everyone?",
              answer: "Suitability is determined during your clinical consultation. Your dentist will perform an examination to advise if whitening is appropriate for you."
            },
            {
              question: "How much does Teeth Whitening cost?",
              answer: "Please contact us for pricing. Your final treatment suitability, options, and costs will be discussed clearly with the clinic during your visit."
            },
            {
              question: "Can I book whitening before an important event?",
              answer: "Yes, teeth whitening is an ideal choice before weddings, interviews, or other key events due to the immediate visible results achieved in one 30-minute appointment."
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
                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 bg-slate-50/50 text-[#475569] text-xs sm:text-sm font-medium leading-relaxed">
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
                "question": "What is professional teeth whitening?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Professional teeth whitening is a highly safe, effective dental treatment designed to lift stains and brighten your teeth using CE & FDA-approved whitening systems under professional supervision."
                }
              },
              {
                "question": "How long does Teeth Whitening take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our professional in-clinic whitening session is designed to be highly efficient, taking approximately 30 minutes to complete."
                }
              },
              {
                "question": "Is professional Teeth Whitening done in one appointment?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, our in-clinic teeth whitening is designed to be fully completed within a single, convenient clinical appointment."
                }
              },
              {
                "question": "When will I see the result?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You will experience immediate visible results right after your 30-minute in-clinic treatment session."
                }
              },
              {
                "question": "Is Teeth Whitening enamel-safe?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, our professionally supervised whitening treatments utilize enamel-safe systems specifically formulated to protect your natural tooth structure."
                }
              },
              {
                "question": "Will I experience sensitivity?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most patients experience no sensitivity during or after the treatment. Our systems are chosen to keep the procedure highly comfortable for most patients."
                }
              },
              {
                "question": "Do you offer take-home whitening kits?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, professional-grade take-home whitening kits are available as an alternative option when recommended by your dentist."
                }
              },
              {
                "question": "Is Teeth Whitening suitable for everyone?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Suitability is determined during your clinical consultation. Your dentist will perform an examination to advise if whitening is appropriate for you."
                }
              },
              {
                "question": "How much does Teeth Whitening cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Please contact us for pricing. Your final treatment suitability, options, and costs will be discussed clearly with the clinic during your visit."
                }
              },
              {
                "question": "Can I book whitening before an important event?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, teeth whitening is an ideal choice before weddings, interviews, or other key events due to the immediate visible results achieved in one 30-minute appointment."
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
              GET STARTED TODAY
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Ready for a Whiter Smile Before Your Next Occasion?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium font-sans">
              Book professional Teeth Whitening in one appointment and discuss the right whitening option for your smile.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => openAppointmentModal('Teeth Whitening - Closing CTA')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-sm sm:text-base font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer font-sans"
              >
                <Calendar className="h-5 w-5" />
                <span>Book Teeth Whitening</span>
              </button>

              <a
                href={`https://wa.me/919510397046?text=${encodeURIComponent("Hello Patel Dental Hospital, I would like to know more about Teeth Whitening and would like to book a consultation.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm sm:text-base font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer font-sans"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp Us</span>
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
            RELATED TREATMENTS & SOLUTIONS
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Other Treatment Solutions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
            Explore other premium cosmetic and alignment procedures designed to enhance your confidence and natural smile aesthetics.
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
                Smile Makeover
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm font-medium leading-relaxed mb-6 flex-grow">
                Complete dynamic smile transformation blending veneers, alignment, and bleaching to create a symmetrical artistic masterpiece.
              </p>
              <a
                href="/services/smile-makeover"
                className="inline-flex items-center justify-between py-2.5 px-4 rounded-xl border border-[#E8EEF5] hover:border-[#14B8A6] hover:bg-teal-50/35 text-xs sm:text-sm font-bold text-[#0D9488] transition-all duration-200 mt-auto"
              >
                <span>Learn Details</span>
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
                Invisible Aligners
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm font-medium leading-relaxed mb-6 flex-grow">
                Invisible, removable custom clear aligner series that subtly straighten your smile with maximum daily lifestyle freedom.
              </p>
              <a
                href="/services/invisible-aligners"
                className="inline-flex items-center justify-between py-2.5 px-4 rounded-xl border border-[#E8EEF5] hover:border-[#14B8A6] hover:bg-teal-50/35 text-xs sm:text-sm font-bold text-[#0D9488] transition-all duration-200 mt-auto"
              >
                <span>Learn Details</span>
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
                Tooth Coloured Filling
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm font-medium leading-relaxed mb-6 flex-grow">
                Composite resin filling, also known as a tooth-coloured filling, is a cavity filling intended to be durable and natural-looking.
              </p>
              <a
                href="/services/tooth-coloured-filling"
                className="inline-flex items-center justify-between py-2.5 px-4 rounded-xl border border-[#E8EEF5] hover:border-[#14B8A6] hover:bg-teal-50/35 text-xs sm:text-sm font-bold text-[#0D9488] transition-all duration-200 mt-auto"
              >
                <span>Learn Details</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
