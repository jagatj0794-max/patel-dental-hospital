/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  Calendar,
  Scale,
  Timer,
  Users,
  Award,
  ArrowRight,
  MessageCircle,
  TrendingUp,
  Heart,
  ChevronUp,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { ServiceGalleryItem, MarketingConfig } from '../../types';
import { BeforeAfterSlider } from '../BeforeAfterSlider';
import { ClinicalCaseGallery } from '../ClinicalCaseGallery';
import { GooglePatientReviews } from '../GooglePatientReviews';
import { SurgicalTeamSection } from './SurgicalTeamSection';

export interface BracesTreatmentViewProps {
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
}

export const BracesTreatmentView: React.FC<BracesTreatmentViewProps> = ({
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
  setCurrentPage
}) => {
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('braces-faq-1');

  const handleNavigateToService = (targetSlug: string) => {
    window.location.hash = `#services/${targetSlug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bracesFaqs = [
    {
      id: 'braces-faq-1',
      question: 'How long will I wear braces?',
      answer: 'The duration of orthodontic treatment varies by case, depending on your alignment complexity. A standard program is thoroughly discussed and personalized during your initial consultation.'
    },
    {
      id: 'braces-faq-2',
      question: 'Will braces hurt?',
      answer: 'You can expect some mild, temporary pressure or soreness for a few days after brackets are first placed or periodically adjusted. This is normal and typically resolves quickly.'
    },
    {
      id: 'braces-faq-3',
      question: 'What can’t I eat with braces?',
      answer: 'To prevent damage or loose brackets, avoid extremely hard, sticky, or chewy foods (such as hard nuts, sticky caramel, chewing gum, or biting directly into whole raw apples).'
    },
    {
      id: 'braces-faq-4',
      question: 'How often do I need to visit?',
      answer: 'Visit frequency varies by case. Adjustment and progress check appointments are scheduled periodically depending on your custom orthodontic plan.'
    },
    {
      id: 'braces-faq-5',
      question: 'Can I get braces if I have crowns or missing teeth?',
      answer: 'Yes. Braces can be placed if you have dental crowns, fillings, or missing teeth. We customize your orthodontic force directions to work safely around existing dental restorations.'
    },
    {
      id: 'braces-faq-6',
      question: 'What is the youngest age for braces / orthodontic assessment?',
      answer: 'Children can receive an early orthodontic assessment around age 8–9. Early assessment helps evaluate facial bone growth, even if active braces treatment starts later.'
    },
    {
      id: 'braces-faq-7',
      question: 'What is the oldest age for braces?',
      answer: 'There is no upper age limit for braces. Adults of any age can safely undergo orthodontic alignment as long as their teeth, gums, and supporting bones are healthy.'
    },
    {
      id: 'braces-faq-8',
      question: 'What happens if I don’t wear my retainer?',
      answer: 'Without a retainer, teeth will slowly migrate back toward their original misaligned positions. Consistent retainer wear is essential to support and lock in your alignment results.'
    },
    {
      id: 'braces-faq-9',
      question: 'Will braces affect my speech?',
      answer: 'You may notice a minor, temporary adjustment period of a few days as your lips and tongue adapt to the braces, but your normal speech will quickly recover.'
    },
    {
      id: 'braces-faq-10',
      question: 'Can I play sports or a wind instrument with braces?',
      answer: 'Yes. You can continue playing wind instruments and sports. For physical contact sports, we highly recommend wearing a protective orthodontic mouthguard to prevent lip injury.'
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": bracesFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const whatsappNum = '919510397046';
  const whatsappText = "Hello Patel Dental Hospital, I would like to know more about Braces Treatment and would like to book a consultation.";
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(whatsappText)}`;

  const toggleFaq = (id: string) => {
    setExpandedFaqId(prev => prev === id ? null : id);
  };

  const getServiceHeroImage = (targetSlug: string) => {
    let defaultImg = '';
    const lookupSlugs: string[] = [targetSlug];
    
    if (targetSlug === 'invisible-aligners') {
      defaultImg = 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1784407659917_xj46d3vp.webp';
      lookupSlugs.push('clear-aligners');
    } else if (targetSlug === 'smile-makeover') {
      defaultImg = 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1784407738608_3vac10yu.webp';
    } else if (targetSlug === 'pediatric-dentistry') {
      defaultImg = 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1784407803817_fd94jnkr.webp';
      lookupSlugs.push('kids-dentistry');
    }

    try {
      const stored = localStorage.getItem('hospital_services');
      if (stored) {
        const services = JSON.parse(stored);
        if (Array.isArray(services)) {
          const fromLoaded = services.find((s: any) => 
            lookupSlugs.includes(s.slug) || 
            (targetSlug === 'smile-makeover' && s.id === 'smile-srv') ||
            (targetSlug === 'invisible-aligners' && s.id === 'aligners-srv') ||
            (targetSlug === 'pediatric-dentistry' && s.id === 'kids')
          );
          if (fromLoaded?.hero_image && fromLoaded.hero_image.trim() !== '') {
            return fromLoaded.hero_image;
          }
        }
      }
    } catch (e) {
      console.warn('Failed to parse hospital_services in BracesTreatmentView:', e);
    }
    
    return defaultImg;
  };
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* SECTION 1: Hero */}
      <div id="service-hero-section">
        {heroElement}
      </div>

      {/* SECTION 2: Split the Audience */}
      <section id="braces-split-audience" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            <Users className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            Tailored Orthodontic Care
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Braces Designed for Every Stage of Life
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center font-medium font-sans max-w-2xl mx-auto">
            Orthodontic needs change with age. We split our treatment approaches to deliver targeted, comfortable, and age-appropriate care.
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto pt-4">
          {/* Card 1: Children & Teens */}
          <div
            onClick={() => openAppointmentModal('Braces - Children & Teens')}
            className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left"
          >
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#0D9488] uppercase tracking-widest px-2.5 py-0.5 bg-teal-50 rounded-full border border-teal-100/50">
                Ages 7 to 18
              </span>
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[24px] tracking-tight leading-tight group-hover:text-[#0D9488] transition-colors">
                Children & Teens
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold tracking-wide uppercase">
                Early Intervention & Growth Guidance
              </p>
              <div className="space-y-3 pt-2 text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                  <span><strong>Growth Modification:</strong> Treats jaw discrepancies while bones are still actively growing.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                  <span><strong>Preventive Interception:</strong> Prevents crowding or severe bite issues before they fully develop.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                  <span><strong>Fun Customization:</strong> Colorful bands and personalized bracket combinations build excitement.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                  <span><strong>School-Friendly Plan:</strong> Minimum disruption to classroom, speaking, and sports activities.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Adults */}
          <div
            onClick={() => openAppointmentModal('Braces - Adults')}
            className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left"
          >
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#0D9488] uppercase tracking-widest px-2.5 py-0.5 bg-teal-50 rounded-full border border-teal-100/50">
                Ages 18+
              </span>
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[24px] tracking-tight leading-tight group-hover:text-[#0D9488] transition-colors">
                Adult Orthodontics
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold tracking-wide uppercase">
                Aesthetic & Professional Alignment
              </p>
              <div className="space-y-3 pt-2 text-[#475569] text-[14px] sm:text-[15px] leading-[1.6] font-medium">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                  <span><strong>Discrete Systems:</strong> Tooth-colored ceramic and self-ligating brackets blend with office life.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                  <span><strong>Comfortable Efficiency:</strong> Advanced low-friction brackets move teeth with reduced discomfort.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                  <span><strong>Relapse & Complex Cases:</strong> Successfully corrects shifting teeth, spacing, or deep bite issues.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                  <span><strong>Long-Term Health:</strong> Properly aligned bites reduce uneven tooth wear and optimize hygiene.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Surgical Team Section */}
      <SurgicalTeamSection setCurrentPage={setCurrentPage} />

      {/* SECTION 3: Treatment / Option Comparison */}
      <section id="braces-option-comparison-section" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            <Scale className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            TREATMENT COMPARISON
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Compare Our Braces Systems
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
            Different systems offer unique balances of aesthetics, comfort, speed, and cost. Use our side-by-side breakdown to choose honestly.
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="max-w-7xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[780px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/5">
                    Feature
                  </th>
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/5">
                    Metal Braces
                  </th>
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/5">
                    Ceramic Braces
                  </th>
                  <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/5 relative">
                    <div className="flex items-center justify-between gap-1">
                      <span>Self-Ligating</span>
                      <span className="text-[9px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest whitespace-nowrap">
                        Recommended
                      </span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/5">
                    Lingual Braces
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                {/* Row 1: Aesthetics */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Aesthetics / Visibility
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Highly visible metallic brackets and wire
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Semi-invisible; tooth-colored blend
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>Available in discrete clear ceramic options</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    100% hidden behind your teeth
                  </td>
                </tr>

                {/* Row 2: Comfort */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Comfort Level
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Standard; elastic bands cause initial tension
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Good; slightly larger brackets
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>High; low-friction, no tight elastic ties</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Standard; requires tongue adjustment
                  </td>
                </tr>

                {/* Row 3: Maintenance */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Hygiene & Cleaning
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Requires careful brushing; food catches on bands
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Same; clear ties can stain without care
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>Much easier; clip mechanism lacks rubber bands</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Requires specialized flossing behind brackets
                  </td>
                </tr>

                {/* Row 4: Adjustment Frequency */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Clinic Visits
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Every 4 weeks (tightening and band change)
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Every 4 weeks (tightening)
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>Every 6 to 8 weeks (fewer clinic visits)</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Every 4 to 5 weeks
                  </td>
                </tr>

                {/* Row 5: Treatment Duration */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Treatment Speed
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Standard orthodontic speed
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Standard orthodontic speed
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>Up to 4-6 months faster due to low friction</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Standard orthodontic speed
                  </td>
                </tr>

                {/* Row 6: Severe Bite Cases */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Severe Corrections
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Excellent for all complex cases
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Excellent for most cases
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>Superior; advanced force control</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    Excellent; highly customized
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 7: Interactive Before & After Smile Transformations */}
      {mConfig.show_before_after !== false && beforeAfterPairs.length > 0 && (
        <section className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60 max-w-7xl mx-auto px-4 sm:px-6" id="before-after-gallery-section">
          <div className="space-y-3 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
              <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              Transformations
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              {seoHeadings.transformations}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-medium font-sans">
              {mConfig.before_after_description || 'See real smile transformations of our patients.'}
            </p>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-7xl mx-auto">
            {beforeAfterPairs.map((pair, pIdx) => (
              <div 
                key={pair.id || pIdx} 
                className="bg-white border border-[#E5EEF5] rounded-[20px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_12px_24px_rgba(8,28,58,0.08)] hover:border-[#B9D1E6] transition-all duration-300 flex flex-col h-full"
              >
                <BeforeAfterSlider
                  beforeImage={pair.before_image}
                  afterImage={pair.after_image}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 8: Clinical Case Gallery */}
      {mConfig.show_gallery !== false && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <ClinicalCaseGallery
            heading={seoHeadings.caseGallery}
            description={mConfig.gallery_description}
            items={Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery}
            singleGallery={true}
          />
        </section>
      )}

      {testimonialsElement}

      {/* SECTION 11: Google Patient Reviews */}
      {mConfig.show_google_reviews !== false && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <GooglePatientReviews
            heading={seoHeadings.reviews}
            reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
          />
        </section>
      )}

      {/* SECTION 4: Transparent Pricing */}
      <section id="braces-transparent-pricing" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            HONEST COST ESTIMATES
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Transparent Pricing Structure
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
            We believe in honest, upfront pricing. Suitability, severity, and exact plans are finalized after your clinical scan and examination.
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="max-w-4xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[540px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    Braces System
                  </th>
                  <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    Price
                  </th>
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    Key Benefit / Best For
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Metal Braces
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-medium">
                    Reliable and highly cost-effective alignment for all ages
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Ceramic Braces
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-medium">
                    Discrete appearance with tooth-colored brackets
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Self-Ligating Braces
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-medium">
                    Fewer clinic visits and faster treatment with low friction
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    Lingual Braces
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    Contact Us for Pricing
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 font-medium">
                    Complete invisibility as brackets are bonded behind teeth
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl font-sans">
              No hidden fees. Your final customized pricing, including EMI plans and retainer inclusions, will be laid out in writing before we begin.
            </p>
            <button
              onClick={() => openAppointmentModal('Braces Suitability & Pricing')}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
            >
              <Calendar className="h-4 w-4 shrink-0" />
              <span>Request Personal Quote</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: Treatment Timeline */}
      <section id="braces-timeline-section" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[28px] sm:rounded-[36px] p-6 sm:p-12 lg:p-14 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
          <div className="space-y-3 max-w-2xl mx-auto text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 mx-auto">
              <Timer className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              TREATMENT PROCESS
            </span>
            <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              The 4-Stage Braces Journey
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center font-normal font-sans">
              Your orthodontic transformation is carried out in four structured phases, ensuring clinical excellence and stable results.
            </p>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
          </div>

          <div className="relative">
            {/* Horizontal connector lines on desktop/tablet */}
            <div className="hidden lg:block absolute top-[36px] left-[12.5%] right-[12.5%] h-[2px] bg-[#5eead4] z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-4 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                  1
                </div>
                <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                  1. Consultation
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                  Our expert examines your bite and guides you on which type of braces is most suitable. Transparent pricing is provided upfront for every system.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                  2
                </div>
                <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                  2. Record Collection
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                  We take precise teeth impressions, photographs, and a state-of-the-art CBCT facial scan to construct your three-dimensional orthodontic study models.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                  3
                </div>
                <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                  3. Planning & Preparation
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                  We map out your progression, remove decay, clean teeth thoroughly, and finalize coordinates before precisely bonding brackets.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[72px] h-[72px] rounded-full bg-[#0D9488] border-2 border-[#0D9488] flex items-center justify-center text-white font-bold text-xl mb-5 shadow-md">
                  4
                </div>
                <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                  4. Retention Phase
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                  After braces removal, custom clear or fixed retainers are provided to support stability, preventing teeth from migrating back.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Risk Reversal / Patient Reassurance */}
      <section id="braces-reassurance-section" className="space-y-6 sm:space-y-10 max-w-7xl mx-auto px-4 sm:px-6 pb-4">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            PATIENT REASSURANCE & SAFETY
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Our Orthodontic Promise to You
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
            Orthodontic treatment is a major life milestone. We remove the risk, doubt, and surprises so you can smile with full clinical confidence.
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch pt-4">
          {/* Point 1: Free Assessment */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2.5 leading-tight">
              Free Initial Assessment
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
              Receive a comprehensive initial checkup, options discussion, and facial profiling analysis entirely for free, with zero financial pressure.
            </p>
          </div>

          {/* Point 2: 18-Month No-Surprise Pricing */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2.5 leading-tight">
              18-Month No-Surprise Charge
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
              Your treatment quotes are locked and valid for the entire 18-month average program. No emergency fees, broken bracket charges, or surprise bills.
            </p>
          </div>

          {/* Point 3: Honest Recommendations */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2.5 leading-tight">
              Honest Recommendations
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
              We never recommend expensive or complex brackets if a simpler system is clinically superior for your lifestyle and case.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9: Procedure Video */}
      {videoElement}

      {/* SECTION 8: Why Patel Dental / Why This Doctor */}
      <section className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60 max-w-7xl mx-auto px-4 sm:px-6" id="braces-why-patel-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            WHY PATEL DENTAL
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Honest, Patient-First Orthodontic Care
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
            We prioritize honesty, transparent pricing, and clinical suitability to help you choose the ideal orthodontic path for your smile.
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
          {/* Card 1: Comprehensive Systems */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              Comprehensive Systems
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
              Multiple orthodontic systems are available, including metal, self-ligating metal, ceramic, self-ligating ceramic, lingual, and clear aligners. Compare systems easily according to visibility and your practical needs.
            </p>
          </div>

          {/* Card 2: Transparent Pricing */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              Transparent Pricing
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
              Our clinic provides fully transparent, straightforward pricing for every available system upfront. Know your complete investment from day one without any hidden fees or surprise adjustments.
            </p>
          </div>

          {/* Card 3: Multi-Age Expertise */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              All-Age Assessments
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
              Children can receive an early orthodontic assessment around age 8–9 to guide jaw development. For adults, there is absolutely no upper age limit—healthy teeth can be aligned at any age.
            </p>
          </div>

          {/* Card 4: Honest Advice */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              Honest Advice
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
              We operate with absolute honesty. We will discuss your treatment plan based entirely on your clinical needs, and we will tell you explicitly if braces are not actually needed for your smile.
            </p>
          </div>
        </div>

        {/* Bottom Reassurance */}
        <div className="max-w-3xl mx-auto text-center pt-2">
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Your treatment plan is personalized after thorough clinical examination and appropriate diagnostic assessment.
          </p>
        </div>
      </section>

      {/* SECTION 9: Advanced Orthodontic Technology */}
      <section className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60 max-w-7xl mx-auto px-4 sm:px-6" id="braces-technology-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            ORTHODONTIC TECHNOLOGY
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            Advanced Technology Designed Around Your Braces Treatment
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
            Modern diagnostics and custom planning help us guide your teeth alignment with greater precision, protection, and comfort.
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch justify-center">
          {/* Card 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              High-Definition CBCT Diagnostics
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
              Allows precise, three-dimensional visualization of your bone levels, jaw structure, and root orientation, ensuring tooth movements are mapped out safely and biologically.
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              Pre-Bonding Case Planning
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-medium flex-1">
              Every treatment is thoroughly calculated and structured before braces bonding. We analyze alignment paths and coordinates to establish a highly reliable, stage-by-stage progression.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10: FAQ Accordion */}
      <section className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60 max-w-7xl mx-auto px-4 sm:px-6" id="braces-faq-section">
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        
        <div className="bg-white border border-slate-200/80 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-14 shadow-sm space-y-8 sm:space-y-10">
          {/* Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="flex justify-center">
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60">
                BRACES TREATMENT FAQ
              </span>
            </div>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight">
              Frequently Asked Questions About Braces
            </h2>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
          </div>

          {/* Accordion List */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {bracesFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className={`rounded-[18px] sm:rounded-[20px] transition-all duration-200 border ${
                    isExpanded 
                      ? 'border-[#0D9488] bg-white shadow-xs' 
                      : 'border-slate-200/80 hover:border-slate-300 bg-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className={`text-base sm:text-lg font-bold tracking-tight leading-snug transition-colors ${
                      isExpanded ? 'text-[#0D9488]' : 'text-[#081C3A]'
                    }`}>
                      {faq.question}
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
                  
                  {isExpanded && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 11: Closing CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10" id="braces-closing-cta-section">
        <div className="relative bg-[#0B1528] border border-slate-800 rounded-[26px] sm:rounded-[32px] p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden text-center space-y-6 sm:space-y-8">
          {/* Background Clinic Interior Ambient Layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none" 
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1528]/80 via-[#0B1528]/95 to-[#0B1528] pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5 relative z-10">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0D9488]/20 border border-[#0D9488]/40 text-[#2DD4BF] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 text-[#2DD4BF] shrink-0" />
                FREE FIRST ORTHODONTIC ASSESSMENT
              </span>
            </div>
            <h2 className="font-sans font-black text-2xl sm:text-4xl lg:text-[42px] text-white tracking-tight leading-[1.2] max-w-2xl mx-auto">
              Not Sure Which Braces System Is Right for You?
            </h2>
            <p className="text-slate-300/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium font-sans">
              Start with a free first orthodontic assessment. We’ll help you compare the available systems, explain the differences and tell you honestly if braces are actually needed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 relative z-10 pt-2">
            <button
              onClick={() => openAppointmentModal('braces-treatment')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white font-bold text-sm sm:text-base hover:shadow-[0_8px_20px_rgba(20,184,166,0.3)] transition-all duration-300 cursor-pointer"
            >
              Book Free Orthodontic Assessment
            </button>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#1E293B] border border-slate-700/60 text-white font-bold text-sm sm:text-base hover:bg-slate-800 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 12: Related Treatments */}
      <section className="space-y-8 sm:space-y-10 pt-6 sm:pt-10 max-w-7xl mx-auto px-4 sm:px-6" id="braces-related-services-section">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="flex justify-center">
            <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60">
              RELATED TREATMENTS
            </span>
          </div>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[38px] text-[#081C3A] tracking-tight leading-tight">
            Related Treatments
          </h2>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto items-stretch">
          {/* 1. Invisible Aligners */}
          <div 
            onClick={() => handleNavigateToService('invisible-aligners')}
            className="bg-white border border-slate-200/80 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_16px_36px_rgba(8,28,58,0.1)] hover:border-[#14B8A6]/50 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
          >
            <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
              <img 
                src={getServiceHeroImage('invisible-aligners')}
                alt="Invisible Aligners"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
              <div className="space-y-2.5">
                <h3 className="font-sans font-bold text-lg sm:text-xl text-[#081C3A] group-hover:text-[#0D9488] transition-colors leading-snug tracking-tight">
                  Invisible Aligners
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Straighten your teeth discreetly with nearly invisible clear aligners, completely customized for your comfort and lifestyle.
                </p>
              </div>
              <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                <span>Learn Details</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </div>
            </div>
          </div>

          {/* 2. Smile Makeover */}
          <div 
            onClick={() => handleNavigateToService('smile-makeover')}
            className="bg-white border border-slate-200/80 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_16px_36px_rgba(8,28,58,0.1)] hover:border-[#14B8A6]/50 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
          >
            <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
              <img 
                src={getServiceHeroImage('smile-makeover')}
                alt="Smile Makeover"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
              <div className="space-y-2.5">
                <h3 className="font-sans font-bold text-lg sm:text-xl text-[#081C3A] group-hover:text-[#0D9488] transition-colors leading-snug tracking-tight">
                  Smile Makeover
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Transform your smile with a tailored combination of cosmetic procedures designed to restore function and aesthetic harmony.
                </p>
              </div>
              <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                <span>Learn Details</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </div>
            </div>
          </div>

          {/* 3. Pediatric Dentistry */}
          <div 
            onClick={() => handleNavigateToService('pediatric-dentistry')}
            className="bg-white border border-slate-200/80 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_4px_20px_rgba(8,28,58,0.05)] hover:shadow-[0_16px_36px_rgba(8,28,58,0.1)] hover:border-[#14B8A6]/50 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
          >
            <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
              <img 
                src={getServiceHeroImage('pediatric-dentistry')}
                alt="Pediatric Dentistry"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
              <div className="space-y-2.5">
                <h3 className="font-sans font-bold text-lg sm:text-xl text-[#081C3A] group-hover:text-[#0D9488] transition-colors leading-snug tracking-tight">
                  Pediatric Dentistry
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Compassionate, friendly dental care specialized for infants, children, and teens in a playful, fear-free environment.
                </p>
              </div>
              <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                <span>Learn Details</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
