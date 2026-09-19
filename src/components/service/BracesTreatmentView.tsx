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
  language?: string;
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
  setCurrentPage,
  language = 'en'
}) => {
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('braces-faq-1');

  const handleNavigateToService = (targetSlug: string) => {
    window.location.hash = `#services/${targetSlug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bracesFaqs = language === 'gu' ? [
    {
      id: 'braces-faq-1',
      question: 'મારે કેટલા સમય સુધી Braces પહેરવા પડશે?',
      answer: 'Orthodontic સારવારનો સમયગાળો દરેક કેસ અનુસાર અલગ-અલગ હોય છે, જે તમારા દાંતની ગોઠવણીની જટિલતા પર આધાર રાખે છે. તમારી પ્રારંભિક મુલાકાત (Consultation) દરમિયાન આ અંગે વિગતવાર ચર્ચા કરીને વ્યક્તિગત યોજના નક્કી કરવામાં આવે છે.'
    },
    {
      id: 'braces-faq-2',
      question: 'શું Bracesથી દુખાવો થશે?',
      answer: 'જ્યારે Brackets પહેલીવાર લગાવવામાં આવે અથવા સમયાંતરે તેને Adjust કરવામાં આવે, ત્યારે શરૂઆતના થોડા દિવસો સુધી સામાન્ય દબાણ અથવા દુખાવો અનુભવાઈ શકે છે. આ સામાન્ય છે અને સામાન્ય રીતે ઝડપથી ઓછો થઈ જાય છે.'
    },
    {
      id: 'braces-faq-3',
      question: 'Braces સાથે હું શું ખાઈ શકતો નથી?',
      answer: 'Brackets તૂટતા અથવા ઢીલા થતા અટકાવવા માટે, વધુ પડતો કડક, ચીકણો અથવા ચાવવો પડે તેવો ખોરાક (જેમ કે અખરોટ/બદામ જેવા કડક સૂકામેવા, ચીકણી ચોકલેટ/કેરામલ, ચ્યુઇંગમ અથવા આખા સફરજનને સીધા દાંતથી બાઇટ કરવા) ખાવાનું ટાળો.'
    },
    {
      id: 'braces-faq-4',
      question: 'મારે કેટલી વાર ક્લિનિકની મુલાકાત લેવી પડશે?',
      answer: 'મુલાકાતનો સમયગાળો દરેક કેસ અનુસાર બદલાય છે. તમારા કસ્ટમ ઓર્થોડોન્ટિક પ્લાન મુજબ સમયાંતરે એડજસ્ટમેન્ટ અને પ્રોગ્રેસ ચેક-અપ માટે મુલાકાતો ગોઠવવામાં આવે છે.'
    },
    {
      id: 'braces-faq-5',
      question: 'શું મારા દાંત પર ક્રાઉન લગાવેલ હોય કે કોઈ દાંત ન હોય, તો પણ Braces લગાવી શકાય?',
      answer: 'હા. જો તમારા દાંત પર ક્રાઉન હોય, ફિલિંગ હોય કે કોઈ દાંત ન હોય, તો પણ Braces લગાવી શકાય છે. અમે તમારા હાલના ડેન્ટલ રિસ્ટોરેશનને કોઈ નુકસાન ન થાય તે રીતે સુરક્ષિત ઓર્થોડોન્ટિક ટ્રીટમેન્ટ પ્લાન તૈયાર કરીએ છીએ.'
    },
    {
      id: 'braces-faq-6',
      question: 'ઓર્થોડોન્ટિક તપાસ અને Braces માટેની લઘુત્તમ ઉંમર કેટલી છે?',
      answer: 'બાળકોના જડબા અને દાંતના વિકાસનું મૂલ્યાંકન કરવા માટે આશરે 8 થી 9 વર્ષની ઉંમરે પ્રારંભિક ઓર્થોડોન્ટિક તપાસ કરાવી શકાય છે. આ વહેલી તપાસથી જડબાના હાડકાંના વિકાસને યોગ્ય દિશા આપી શકાય છે, ભલે Braces પછીથી લગાવવામાં આવે.'
    },
    {
      id: 'braces-faq-7',
      question: 'Braces પહેરવા માટે મહત્તમ ઉંમર કેટલી છે?',
      answer: 'Braces પહેરવા માટે ઉપરની કોઈ વયમર્યાદા નથી. કોઈપણ ઉંમરની વ્યક્તિ ઓર્થોડોન્ટિક સારવાર કરાવી શકે છે, બસ તેમના દાંત, પેઢા અને સહાયક હાડકાં સ્વસ્થ હોવા જોઈએ.'
    },
    {
      id: 'braces-faq-8',
      question: 'જો હું રીટેઇનર (Retainer) ન પહેરું તો શું થાય?',
      answer: 'રીટેઇનર ન પહેરવાથી, દાંત ધીમે-ધીમે તેમની મૂળ અસ્તવ્યસ્ત સ્થિતિમાં પાછા ખસવા લાગે છે. સારવારના અંતે મેળવેલા પરિણામને કાયમી ધોરણે જાળવી રાખવા માટે નિયમિતપણે રીટેઇનર પહેરવું અત્યંત જરૂરી છે.'
    },
    {
      id: 'braces-faq-9',
      question: 'શું Bracesથી બોલવામાં કોઈ તકલીફ થશે?',
      answer: 'શરૂઆતમાં હોઠ અને જીભને Braces સાથે અનુકૂળ થવામાં થોડા દિવસોનો સામાન્ય સમય લાગી શકે છે, પરંતુ ટૂંક સમયમાં જ તમે સામાન્ય રીતે બોલી શકશો.'
    },
    {
      id: 'braces-faq-10',
      question: 'શું હું Braces સાથે સ્પોર્ટ્સ રમી શકું અથવા વિન્ડ ઇન્સ્ટ્રુમેન્ટ વગાડી શકું?',
      answer: 'હા. તમે બિલકુલ સ્પોર્ટ્સ રમી શકો છો અને મ્યુઝિકલ ઇન્સ્ટ્રુમેન્ટ વગાડી શકો છો. જો કે, કોન્ટેક્ટ સ્પોર્ટ્સ (ખેલકુદ) દરમિયાન હોઠ અથવા પેઢાને ઈજાથી બચાવવા માટે અમે ખાસ ઓર્થોડોન્ટિક માઉથગાર્ડ પહેરવાની સલાહ આપીએ છીએ.'
    }
  ] : [
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
  const whatsappText = language === 'gu'
    ? "નમસ્તે પટેલ ડેન્ટલ હોસ્પિટલ, હું Braces સારવાર વિશે વધુ જાણવા માંગુ છું અને કન્સલ્ટેશન બુક કરવા માંગુ છું."
    : "Hello Patel Dental Hospital, I would like to know more about Braces Treatment and would like to book a consultation.";
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
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Users className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "વ્યક્તિગત ઓર્થોડોન્ટિક સારવાર" : "Tailored Orthodontic Care"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "જીવનના દરેક તબક્કા માટે ડિઝાઇન કરાયેલ Braces" : "Braces Designed for Every Stage of Life"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu' 
              ? "ઉંમર સાથે ઓર્થોડોન્ટિક જરૂરિયાતો બદલાય છે. તેથી અમે ઉંમર અને જરૂરિયાત અનુસાર યોગ્ય, આરામદાયક અને લક્ષિત સારવાર પ્રદાન કરીએ છીએ."
              : "Orthodontic needs change with age. We split our treatment approaches to deliver targeted, comfortable, and age-appropriate care."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto pt-4">
          {/* Card 1: Children & Teens */}
          <div
            onClick={() => openAppointmentModal(language === 'gu' ? 'Braces - બાળકો અને કિશોરો' : 'Braces - Children & Teens')}
            className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left"
          >
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#0D9488] uppercase tracking-widest px-2.5 py-0.5 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                {language === 'gu' ? "ઉંમર 7 થી 18" : "Ages 7 to 18"}
              </span>
              <h3 className="font-sans font-bold text-[#081C3A] text-xl sm:text-2xl tracking-tight leading-tight group-hover:text-[#0D9488] transition-colors">
                {language === 'gu' ? "બાળકો અને કિશોરો" : "Children & Teens"}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold tracking-wide uppercase font-sans">
                {language === 'gu' ? "વહેલી સારવાર અને વિકાસ માટે માર્ગદર્શન" : "Early Intervention & Growth Guidance"}
              </p>
              <div className={`space-y-3 pt-2 text-[14px] sm:text-[15px] leading-[1.6] font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                  {language === 'gu' ? (
                    <span><strong>Growth Modification:</strong> હાડકાંનો વિકાસ ચાલુ હોય ત્યારે જડબાની અસમાનતાની સારવાર કરવામાં મદદ કરે છે.</span>
                  ) : (
                    <span><strong>Growth Modification:</strong> Treats jaw discrepancies while bones are still actively growing.</span>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                  {language === 'gu' ? (
                    <span><strong>Preventive Interception:</strong> દાંતમાં ભીડ અથવા ગંભીર Bite સમસ્યાઓ સંપૂર્ણપણે વિકસે તે પહેલાં તેને અટકાવવામાં મદદ કરે છે.</span>
                  ) : (
                    <span><strong>Preventive Interception:</strong> Prevents crowding or severe bite issues before they fully develop.</span>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                  {language === 'gu' ? (
                    <span><strong>Fun Customization:</strong> રંગીન Bands અને વ્યક્તિગત Bracket combinations દ્વારા સારવારને વધુ રસપ્રદ બનાવવામાં આવે છે.</span>
                  ) : (
                    <span><strong>Fun Customization:</strong> Colorful bands and personalized bracket combinations build excitement.</span>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                  {language === 'gu' ? (
                    <span><strong>School-Friendly Plan:</strong> અભ્યાસ, બોલવામાં અને Sports activitiesમાં ઓછામાં ઓછો વિક્ષેપ રહે તે રીતે સારવારનું આયોજન.</span>
                  ) : (
                    <span><strong>School-Friendly Plan:</strong> Minimum disruption to classroom, speaking, and sports activities.</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Adults */}
          <div
            onClick={() => openAppointmentModal(language === 'gu' ? 'Braces - વયસ્કો માટે સારવાર' : 'Braces - Adults')}
            className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left"
          >
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#0D9488] uppercase tracking-widest px-2.5 py-0.5 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
                {language === 'gu' ? "ઉંમર 18+" : "Ages 18+"}
              </span>
              <h3 className="font-sans font-bold text-[#081C3A] text-xl sm:text-2xl tracking-tight leading-tight group-hover:text-[#0D9488] transition-colors">
                {language === 'gu' ? "વયસ્કો માટે ઓર્થોડોન્ટિક સારવાર" : "Adult Orthodontics"}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold tracking-wide uppercase font-sans">
                {language === 'gu' ? "સૌંદર્યલક્ષી અને વ્યવસાયિક દાંતની ગોઠવણી" : "Aesthetic & Professional Alignment"}
              </p>
              <div className={`space-y-3 pt-2 text-[14px] sm:text-[15px] leading-[1.6] font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                  {language === 'gu' ? (
                    <span><strong>Discrete Systems:</strong> Tooth-colored Ceramic અને Self-Ligating Brackets તમારા દૈનિક અને Office જીવન સાથે સરળતાથી અનુકૂળ થાય છે.</span>
                  ) : (
                    <span><strong>Discrete Systems:</strong> Tooth-colored ceramic and self-ligating brackets blend with office life.</span>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                  {language === 'gu' ? (
                    <span><strong>Comfortable Efficiency:</strong> Advanced low-friction Brackets દાંતને ઓછા અસ્વસ્થતા સાથે ખસેડવામાં મદદ કરે છે.</span>
                  ) : (
                    <span><strong>Comfortable Efficiency:</strong> Advanced low-friction brackets move teeth with reduced discomfort.</span>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                  {language === 'gu' ? (
                    <span><strong>Relapse & Complex Cases:</strong> દાંત ફરી ખસવા, દાંત વચ્ચેનું અંતર અથવા Deep Bite જેવી જટિલ સમસ્યાઓને સુધારવામાં મદદ કરે છે.</span>
                  ) : (
                    <span><strong>Relapse & Complex Cases:</strong> Successfully corrects shifting teeth, spacing, or deep bite issues.</span>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                  {language === 'gu' ? (
                    <span><strong>Long-Term Health:</strong> યોગ્ય રીતે ગોઠવાયેલ Bite દાંતના અસમાન ઘસારા ઘટાડે છે અને Oral Hygiene જાળવવામાં મદદ કરે છે.</span>
                  ) : (
                    <span><strong>Long-Term Health:</strong> Properly aligned bites reduce uneven tooth wear and optimize hygiene.</span>
                  )}
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
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Scale className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "સારવારની સરખામણી" : "TREATMENT COMPARISON"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "અમારી Braces સિસ્ટમ્સની સરખામણી કરો" : "Compare Our Braces Systems"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "અલગ અલગ સિસ્ટમમાં સૌંદર્ય, આરામ, સારવારની ઝડપ અને ખર્ચના અલગ અલગ ફાયદા હોય છે. પ્રામાણિક રીતે સરખામણી કરવા માટે અમારી Side-by-Side વિગતો જુઓ."
              : "Different systems offer unique balances of aesthetics, comfort, speed, and cost. Use our side-by-side breakdown to choose honestly."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="max-w-7xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[780px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/5">
                    {language === 'gu' ? "વિશેષતા" : "Feature"}
                  </th>
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/5">
                    {language === 'gu' ? "METAL BRACES" : "Metal Braces"}
                  </th>
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/5">
                    {language === 'gu' ? "CERAMIC BRACES" : "Ceramic Braces"}
                  </th>
                  <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/5 relative">
                    <div className="flex items-center justify-between gap-1">
                      <span>{language === 'gu' ? "SELF-LIGATING" : "Self-Ligating"}</span>
                      <span className="text-[9px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest whitespace-nowrap">
                        {language === 'gu' ? "ભલામણ કરેલ" : "Recommended"}
                      </span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/5">
                    {language === 'gu' ? "LINGUAL BRACES" : "Lingual Braces"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                {/* Row 1: Aesthetics */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "સૌંદર્ય / દેખાવ" : "Aesthetics / Visibility"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "સ્પષ્ટ દેખાતા Metallic Brackets અને Wire" : "Highly visible metallic brackets and wire"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "અંશતઃ અદૃશ્ય; દાંતના રંગ સાથે મેળ ખાતા" : "Semi-invisible; tooth-colored blend"}
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span className={language === 'gu' ? 'text-slate-900 font-bold' : ''}>{language === 'gu' ? "Clear Ceramic વિકલ્પોમાં પણ ઉપલબ્ધ" : "Available in discrete clear ceramic options"}</span>
                    </div>
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "તમારા દાંતની પાછળ સંપૂર્ણપણે છુપાયેલા" : "100% hidden behind your teeth"}
                  </td>
                </tr>

                {/* Row 2: Comfort */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "આરામનું સ્તર" : "Comfort Level"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "સામાન્ય; Elastic Bands શરૂઆતમાં થોડું તાણ પેદા કરે છે" : "Standard; elastic bands cause initial tension"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "સારો; Brackets થોડા મોટા હોય છે" : "Good; slightly larger brackets"}
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span className={language === 'gu' ? 'text-slate-900 font-bold' : ''}>{language === 'gu' ? "વધુ આરામદાયક; Low-friction અને Tight Elastic Ties વગર" : "High; low-friction, no tight elastic ties"}</span>
                    </div>
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "સામાન્ય; જીભને અનુકૂળ થવામાં થોડો સમય લાગી શકે" : "Standard; requires tongue adjustment"}
                  </td>
                </tr>

                {/* Row 3: Maintenance */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "સ્વચ્છતા અને સફાઈ" : "Hygiene & Cleaning"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "સાવચેતીપૂર્વક Brushing જરૂરી; Bandsમાં ખોરાક ફસાઈ શકે છે" : "Requires careful brushing; food catches on bands"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "સમાન; યોગ્ય કાળજી ન રાખવામાં આવે તો Clear Ties પર ડાઘ પડી શકે છે" : "Same; clear ties can stain without care"}
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span className={language === 'gu' ? 'text-slate-900 font-bold' : ''}>{language === 'gu' ? "વધુ સરળ; Clip Mechanismમાં Rubber Bands હોતા નથી" : "Much easier; clip mechanism lacks rubber bands"}</span>
                    </div>
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "Bracketsની પાછળ ખાસ પ્રકારની Flossing જરૂરી" : "Requires specialized flossing behind brackets"}
                  </td>
                </tr>

                {/* Row 4: Adjustment Frequency */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "ક્લિનિક મુલાકાતો" : "Clinic Visits"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "દર 4 અઠવાડિયે (Tightening અને Band Change)" : "Every 4 weeks (tightening and band change)"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "દર 4 અઠવાડિયે (Tightening)" : "Every 4 weeks (tightening)"}
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span className={language === 'gu' ? 'text-slate-900 font-bold' : ''}>{language === 'gu' ? "દર 6 થી 8 અઠવાડિયે (ઓછી ક્લિનિક મુલાકાતો)" : "Every 6 to 8 weeks (fewer clinic visits)"}</span>
                    </div>
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "દર 4 થી 5 અઠવાડિયે" : "Every 4 to 5 weeks"}
                  </td>
                </tr>

                {/* Row 5: Treatment Duration */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "સારવારની ઝડપ" : "Treatment Speed"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "સામાન્ય ઓર્થોડોન્ટિક સારવારની ઝડપ" : "Standard orthodontic speed"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "સામાન્ય ઓર્થોડોન્ટિક સારવારની ઝડપ" : "Standard orthodontic speed"}
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span className={language === 'gu' ? 'text-slate-900 font-bold' : ''}>{language === 'gu' ? "Low-frictionને કારણે 4–6 મહિના સુધી ઝડપી સારવાર" : "Up to 4-6 months faster due to low friction"}</span>
                    </div>
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "સામાન્ય ઓર્થોડોન્ટિક સારવારની ઝડપ" : "Standard orthodontic speed"}
                  </td>
                </tr>

                {/* Row 6: Severe Bite Cases */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "ગંભીર સુધારાઓ" : "Severe Corrections"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "તમામ જટિલ કેસ માટે ઉત્તમ" : "Excellent for all complex cases"}
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "મોટાભાગના કેસ માટે ઉત્તમ" : "Excellent for most cases"}
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 bg-teal-50/30 border-x border-teal-100">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span className={language === 'gu' ? 'text-slate-900 font-bold' : ''}>{language === 'gu' ? "Advanced Force Control સાથે ઉત્તમ" : "Superior; advanced force control"}</span>
                    </div>
                  </td>
                  <td className={`p-4 sm:p-5 ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600'}`}>
                    {language === 'gu' ? "ઉત્તમ; ખૂબ જ વ્યક્તિગત રીતે Customized" : "Excellent; highly customized"}
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
              {language === 'gu' ? "પરિવર્તનો" : "Transformations"}
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              {language === 'gu' ? "Braces સારવાર પહેલાં અને પછીના પરિવર્તનો" : (seoHeadings.transformations || "Before & After Braces Treatment Transformations")}
            </h2>
            <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
              {language === 'gu'
                ? "અમારા Braces સારવારના દર્દીઓના વાસ્તવિક Smile Transformations જુઓ."
                : (mConfig.before_after_description || 'See real smile transformations of our patients.')}
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
            heading={language === 'gu' ? "Braces સારવારના ક્લિનિકલ કેસની ગેલેરી" : (seoHeadings.caseGallery || "Braces Treatment Clinical Case Gallery")}
            description={language === 'gu' ? "Braces સારવારના ક્લિનિકલ કેસ સ્ટડીના પરિવર્તનો." : (mConfig.gallery_description || "Clinical case study transformations of Braces treatments.")}
            items={Array.isArray(mConfig.gallery_items) ? mConfig.gallery_items : displayGallery}
            singleGallery={true}
            language={language}
          />
        </section>
      )}

      {testimonialsElement}

      {/* SECTION 11: Google Patient Reviews */}
      {mConfig.show_google_reviews !== false && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <GooglePatientReviews
            heading={language === 'gu' ? "Braces સારવાર માટેના Google Patient Reviews" : (seoHeadings.reviews || "Google Patient Reviews for Braces Treatment")}
            label={language === 'gu' ? "Google Reviews" : "Google Reviews"}
            reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
            language={language}
          />
        </section>
      )}

      {/* SECTION 4: Transparent Pricing */}
      <section id="braces-transparent-pricing" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "પ્રામાણિક અંદાજિત ખર્ચ" : "HONEST COST ESTIMATES"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "સારવારની પારદર્શક કિંમતો" : "Transparent Pricing Structure"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "અમે પારદર્શક અને પ્રામાણિક કિંમતોમાં માનીએ છીએ. તમારા દાંતના સ્કેન અને ક્લિનિકલ પરીક્ષણ પછી જ અંતિમ સારવાર યોજના અને યોગ્યતા નક્કી થાય છે."
              : "We believe in honest, upfront pricing. Suitability, severity, and exact plans are finalized after your clinical scan and examination."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="max-w-4xl mx-auto overflow-hidden rounded-[22px] bg-white border border-[#E8EEF5] shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[540px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {language === 'gu' ? "Braces સિસ્ટમ" : "Braces System"}
                  </th>
                  <th className="p-4 sm:p-5 bg-[#0D9488] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {language === 'gu' ? "અંદાજિત કિંમત" : "Price"}
                  </th>
                  <th className="p-4 sm:p-5 bg-[#081C3A] text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider w-1/3">
                    {language === 'gu' ? "મુખ્ય ફાયદો / કોના માટે શ્રેષ્ઠ" : "Key Benefit / Best For"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-sm">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "Metal Braces" : "Metal Braces"}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    {language === 'gu' ? "કિંમત જાણવા સંપર્ક કરો" : "Contact Us for Pricing"}
                  </td>
                  <td className={`p-4 sm:p-5 font-medium ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700'}`}>
                    {language === 'gu' ? "દરેક ઉંમર માટે અત્યંત વિશ્વસનીય અને પરવડે તેવી આર્થિક સારવાર" : "Reliable and highly cost-effective alignment for all ages"}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "Ceramic Braces" : "Ceramic Braces"}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    {language === 'gu' ? "કિંમત જાણવા સંપર્ક કરો" : "Contact Us for Pricing"}
                  </td>
                  <td className={`p-4 sm:p-5 font-medium ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700'}`}>
                    {language === 'gu' ? "દાંતના રંગ સાથે મેળ ખાતા Brackets સાથે ઓછો દેખાતો દેખાવ" : "Discrete appearance with tooth-colored brackets"}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "Self-Ligating Braces" : "Self-Ligating Braces"}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    {language === 'gu' ? "કિંમત જાણવા સંપર્ક કરો" : "Contact Us for Pricing"}
                  </td>
                  <td className={`p-4 sm:p-5 font-medium ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700'}`}>
                    {language === 'gu' ? "ઓછા ઘર્ષણ સાથે ઝડપી સારવાર અને ઓછી ક્લિનિક મુલાકાતો" : "Fewer clinic visits and faster treatment with low friction"}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#081C3A] bg-slate-50/60">
                    {language === 'gu' ? "Lingual Braces" : "Lingual Braces"}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0D9488] bg-teal-50/30 border-x border-teal-100">
                    {language === 'gu' ? "કિંમત જાણવા સંપર્ક કરો" : "Contact Us for Pricing"}
                  </td>
                  <td className={`p-4 sm:p-5 font-medium ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-700'}`}>
                    {language === 'gu' ? "દાંતની પાછળ બોર્ડ થવાને કારણે સંપૂર્ણ અદૃશ્યતા" : "Complete invisibility as brackets are bonded behind teeth"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className={`text-xs sm:text-sm max-w-xl font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
              {language === 'gu'
                ? "કોઈ પણ છુપો ચાર્જ નથી. EMI યોજનાઓ અને Retainers સહિતની તમારી અંતિમ કસ્ટમાઇઝ્ડ પ્રાઇસીંગ સારવાર શરૂ કરતા પહેલાં લેખિતમાં આપવામાં આવશે."
                : "No hidden fees. Your final customized pricing, including EMI plans and retainer inclusions, will be laid out in writing before we begin."}
            </p>
            <button
              onClick={() => openAppointmentModal(language === 'gu' ? 'Braces યોગ્યતા અને કિંમત' : 'Braces Suitability & Pricing')}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
            >
              <Calendar className="h-4 w-4 shrink-0" />
              <span>{language === 'gu' ? "વ્યક્તિગત ક્વોટ મેળવો" : "Request Personal Quote"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: Treatment Timeline */}
      <section id="braces-timeline-section" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto bg-white border border-[#E8EEF5] rounded-[28px] sm:rounded-[36px] p-6 sm:p-12 lg:p-14 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
          <div className="space-y-3 max-w-2xl mx-auto text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 mx-auto font-sans">
              <Timer className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              {language === 'gu' ? "સારવારની પ્રક્રિયા" : "TREATMENT PROCESS"}
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              {language === 'gu' ? "Braces સારવારની 4-તબક્કાની સફર" : "The 4-Stage Braces Journey"}
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
              {language === 'gu'
                ? "તમારી ઓર્થોડોન્ટિક સારવાર ચાર વ્યવસ્થિત તબક્કામાં હાથ ધરવામાં આવે છે, જે ઉત્કૃષ્ટ પરિણામ અને સ્થિરતા સુનિશ્ચિત કરે છે."
                : "Your orthodontic transformation is carried out in four structured phases, ensuring clinical excellence and stable results."}
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
                  {language === 'gu' ? "1. પરામર્શ (Consultation)" : "1. Consultation"}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                  {language === 'gu'
                    ? "અમારા નિષ્ણાત તમારા Biteનું પરીક્ષણ કરે છે અને કઈ બ્રેસ સિસ્ટમ યોગ્ય રહેશે તેનું માર્ગદર્શન આપે છે. દરેક સિસ્ટમ માટે અગાઉથી પારદર્શક પ્રાઇસીંગ પ્રદાન કરવામાં આવે છે."
                    : "Our expert examines your bite and guides you on which type of braces is most suitable. Transparent pricing is provided upfront for every system."}
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                  2
                </div>
                <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                  {language === 'gu' ? "2. ડાયગ્નોસ્ટિક રેકોર્ડ્સ" : "2. Record Collection"}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                  {language === 'gu'
                    ? "અમે તમારા દાંતના માપ, ફોટોગ્રાફ્સ અને અત્યાધુનિક CBCT સ્કેન લઈએ છીએ જેથી તમારા મુખનું સચોટ થ્રી-ડાયમેન્શનલ ઓર્થોડોન્ટિક મોડેલ તૈયાર કરી શકાય."
                    : "We take precise teeth impressions, photographs, and a state-of-the-art CBCT facial scan to construct your three-dimensional orthodontic study models."}
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-[#14B8A6] flex items-center justify-center text-[#0D9488] font-bold text-xl mb-5 shadow-sm">
                  3
                </div>
                <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                  {language === 'gu' ? "3. આયોજન અને બોર્ડિંગ" : "3. Planning & Preparation"}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                  {language === 'gu'
                    ? "અમે તમારી બ્રેસીસ પ્રગતિનું આયોજન કરીએ છીએ, દાંતનો સડો દૂર કરીએ છીએ, દાંતની સંપૂર્ણ સફાઈ કરીએ છીએ અને બ્રેસીસ બોર્ડ કરતા પહેલા બધી બાબતોની ખાતરી કરીએ છીએ."
                    : "We map out your progression, remove decay, clean teeth thoroughly, and finalize coordinates before precisely bonding brackets."}
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[72px] h-[72px] rounded-full bg-[#0D9488] border-2 border-[#0D9488] flex items-center justify-center text-white font-bold text-xl mb-5 shadow-md">
                  4
                </div>
                <h3 className="font-sans font-bold text-[#081C3A] text-base sm:text-lg mb-2">
                  {language === 'gu' ? "4. રીટેન્શન ફેઝ (Retention)" : "4. Retention Phase"}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed max-w-[220px] font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                  {language === 'gu'
                    ? "બ્રેસીસ દૂર કર્યા પછી, દાંતને ફરીથી મૂળ સ્થિતિમાં ખસતા અટકાવવા અને તેની સ્થિરતા જાળવી રાખવા માટે કસ્ટમ ક્લિયર અથવા ફિક્સ રીટેનર આપવામાં આવે છે."
                    : "After braces removal, custom clear or fixed retainers are provided to support stability, preventing teeth from migrating back."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Risk Reversal / Patient Reassurance */}
      <section id="braces-reassurance-section" className="space-y-6 sm:space-y-10 max-w-7xl mx-auto px-4 sm:px-6 pb-4">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "દર્દીની ખાતરી અને સલામતી" : "PATIENT REASSURANCE & SAFETY"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "તમારા માટે અમારું ઓર્થોડોન્ટિક વચન" : "Our Orthodontic Promise to You"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "ઓર્થોડોન્ટિક સારવાર એ જીવનનો એક મહત્વપૂર્ણ તબક્કો છે. અમે તમામ પ્રકારના જોખમ અને આશ્ચર્યોને દૂર કરીએ છીએ જેથી તમે સંપૂર્ણ આત્મવિશ્વાસ સાથે હસી શકો."
              : "Orthodontic treatment is a major life milestone. We remove the risk, doubt, and surprises so you can smile with full clinical confidence."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch pt-4">
          {/* Point 1: Free Assessment */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2.5 leading-tight">
              {language === 'gu' ? "મફત પ્રારંભિક મૂલ્યાંકન" : "Free Initial Assessment"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "કોઈ પણ આર્થિક દબાણ વગર, તદ્દન મફતમાં દાંતની તપાસ, ઉપલબ્ધ વિકલ્પોની ચર્ચા અને Facial profiling વિશ્લેષણ મેળવો."
                : "Receive a comprehensive initial checkup, options discussion, and facial profiling analysis entirely for free, with zero financial pressure."}
            </p>
          </div>

          {/* Point 2: 18-Month No-Surprise Pricing */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2.5 leading-tight">
              {language === 'gu' ? "18 મહિના સુધી કોઈ વધારાનો ચાર્જ નહીં" : "18-Month No-Surprise Charge"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "તમારી સારવારના ક્વોટ્સ લોક કરવામાં આવે છે અને તે સરેરાશ 18 મહિનાના કાર્યક્રમ માટે માન્ય રહે છે. કોઈ ઇમરજન્સી ફી, તૂટેલા બ્રેકેટના શુલ્ક અથવા આશ્ચર્યજનક બિલ નહીં."
                : "Your treatment quotes are locked and valid for the entire 18-month average program. No emergency fees, broken bracket charges, or surprise bills."}
            </p>
          </div>

          {/* Point 3: Honest Recommendations */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2.5 leading-tight">
              {language === 'gu' ? "પ્રામાણિક ભલામણો" : "Honest Recommendations"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "જો તમારા કેસ માટે કોઈ સાદી બ્રેસ સિસ્ટમ શ્રેષ્ઠ હોય, તો અમે ક્યારેય મોંઘી કે જટિલ સિસ્ટમ્સની ખોટી ભલામણ કરતા નથી."
                : "We never recommend expensive or complex brackets if a simpler system is clinically superior for your lifestyle and case."}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9: Procedure Video */}
      {videoElement}

      {/* SECTION 8: Why Patel Dental / Why This Doctor */}
      <section className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60 max-w-7xl mx-auto px-4 sm:px-6" id="braces-why-patel-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "પટેલ ડેન્ટલ શા માટે" : "WHY PATEL DENTAL"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "પ્રામાણિક અને દર્દી-કેન્દ્રિત ઓર્થોડોન્ટિક સારવાર" : "Honest, Patient-First Orthodontic Care"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "તમારા સ્મિત માટે આદર્શ ઓર્થોડોન્ટિક માર્ગ પસંદ કરવામાં મદદ કરવા માટે અમે પ્રામાણિકતા, પારદર્શક પ્રાઇસીંગ અને ક્લિનિકલ યોગ્યતાને પ્રાથમિકતા આપીએ છીએ."
              : "We prioritize honesty, transparent pricing, and clinical suitability to help you choose the ideal orthodontic path for your smile."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
          {/* Card 1: Comprehensive Systems */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "વિવિધ સારવાર સિસ્ટમ્સ" : "Comprehensive Systems"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "અહીં Metal, Self-Ligating Metal, Ceramic, Self-Ligating Ceramic, Lingual Braces અને Clear Aligners સહિતની અદ્યતન સિસ્ટમ્સ ઉપલબ્ધ છે જેથી તમે સરળતાથી યોગ્ય પસંદગી કરી શકો."
                : "Multiple orthodontic systems are available, including metal, self-ligating metal, ceramic, self-ligating ceramic, lingual, and clear aligners. Compare systems easily according to visibility and your practical needs."}
            </p>
          </div>

          {/* Card 2: Transparent Pricing */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "પારદર્શક પ્રાઇસીંગ" : "Transparent Pricing"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "અમારું ક્લિનિક દરેક બ્રેસીસ સિસ્ટમ માટે અગાઉથી સંપૂર્ણ પારદર્શક કિંમતો પ્રદાન કરે છે. કોઈ પણ છુપા ચાર્જ વગર પ્રથમ દિવસથી જ તમારા આયોજન વિશે સંપૂર્ણ માહિતી મેળવો."
                : "Our clinic provides fully transparent, straightforward pricing for every available system upfront. Know your complete investment from day one without any hidden fees or surprise adjustments."}
            </p>
          </div>

          {/* Card 3: Multi-Age Expertise */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "દરેક ઉંમર માટે યોગ્ય તપાસ" : "All-Age Assessments"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "બાળકો માટે જડબાના વિકાસના માર્ગદર્શન માટે 8-9 વર્ષની ઉંમરે તપાસ મેળવો. વયસ્કો માટે ઉંમરની કોઈ મર્યાદા નથી - કોઈ પણ ઉંમરે સ્વસ્થ દાંતને ગોઠવી શકાય છે."
                : "Children can receive an early orthodontic assessment around age 8–9 to guide jaw development. For adults, there is absolutely no upper age limit—healthy teeth can be aligned at any age."}
            </p>
          </div>

          {/* Card 4: Honest Advice */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "પ્રામાણિક સલાહ" : "Honest Advice"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "અમે સંપૂર્ણ પ્રમાણિકતા સાથે કામ કરીએ છીએ. અમે તમારી જરૂરિયાતો અનુસાર સારવાર વિશે ચર્ચા કરીશું, અને જો ખરેખર બ્રેસીસની જરૂર ન હોય તો તે સ્પષ્ટ જણાવીશું."
                : "We operate with absolute honesty. We will discuss your treatment plan based entirely on your clinical needs, and we will tell you explicitly if braces are not actually needed for your smile."}
            </p>
          </div>
        </div>

        {/* Bottom Reassurance */}
        <div className="max-w-3xl mx-auto text-center pt-2">
          <p className={`text-xs sm:text-sm leading-relaxed font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "તમારી સંપૂર્ણ ક્લિનિકલ તપાસ અને સચોટ ડાયગ્નોસ્ટિક મૂલ્યાંકન પછી જ વ્યક્તિગત સારવાર યોજના તૈયાર કરવામાં આવે છે."
              : "Your treatment plan is personalized after thorough clinical examination and appropriate diagnostic assessment."}
          </p>
        </div>
      </section>

      {/* SECTION 9: Advanced Orthodontic Technology */}
      <section className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60 max-w-7xl mx-auto px-4 sm:px-6" id="braces-technology-section">
        <div className="space-y-3 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
            {language === 'gu' ? "ઓર્થોડોન્ટિક ટેકનોલોજી" : "ORTHODONTIC TECHNOLOGY"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "તમારી Braces સારવાર માટે અદ્યતન ટેકનોલોજી" : "Advanced Technology Designed Around Your Braces Treatment"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
            {language === 'gu'
              ? "આધુનિક ડાયગ્નોસ્ટિક્સ અને કસ્ટમ પ્લાનિંગ દ્વારા અમે વધુ ચોકસાઈ, સુરક્ષા અને આરામદાયક રીતે દાંતને ગોઠવવામાં મદદ કરીએ છીએ."
              : "Modern diagnostics and custom planning help us guide your teeth alignment with greater precision, protection, and comfort."}
          </p>
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch justify-center">
          {/* Card 1 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "High-Definition CBCT ડાયગ્નોસ્ટિક્સ" : "High-Definition CBCT Diagnostics"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "તમારા હાડકાના સ્તર, જડબાની રચના અને મૂળના જોડાણને સચોટ, ત્રિ-પરિમાણીય (3D) રીતે જોવાની મંજૂરી આપે છે, જેથી દાંતની હિલચાલ સુરક્ષિત રીતે થઈ શકે."
                : "Allows precise, three-dimensional visualization of your bone levels, jaw structure, and root orientation, ensuring tooth movements are mapped out safely and biologically."}
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-6 sm:p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col h-full text-left overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 sm:top-[28px] sm:bottom-[28px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 sm:mb-3 leading-tight">
              {language === 'gu' ? "સારવાર પૂર્વેનું સચોટ આયોજન" : "Pre-Bonding Case Planning"}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed flex-1 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-[#475569] font-medium'}`}>
              {language === 'gu'
                ? "બ્રેસીસ બોર્ડ કરતા પહેલા દરેક સારવારની સંપૂર્ણ ગણતરી અને માળખું તૈયાર કરવામાં આવે છે. અમે તબક્કાવાર પ્રોગ્રેસ માટે અલાઈનમેન્ટ પાથનું વિશ્લેષણ કરીએ છીએ."
                : "Every treatment is thoroughly calculated and structured before braces bonding. We analyze alignment paths and coordinates to establish a highly reliable, stage-by-stage progression."}
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
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60 font-sans">
                {language === 'gu' ? "વારંવાર પૂછાતા પ્રશ્નો" : "BRACES TREATMENT FAQ"}
              </span>
            </div>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
              {language === 'gu' ? "બ્રેસીસ સારવાર વિશે વારંવાર પૂછાતા પ્રશ્નો" : "Frequently Asked Questions About Braces"}
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
                    <div className={`px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4 font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
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
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0D9488]/20 border border-[#0D9488]/40 text-[#2DD4BF] text-[11px] sm:text-xs font-bold uppercase tracking-wider font-sans">
                <Sparkles className="h-3.5 w-3.5 text-[#2DD4BF] shrink-0" />
                {language === 'gu' ? "મફત પ્રથમ ઓર્થોડોન્ટિક મૂલ્યાંકન" : "FREE FIRST ORTHODONTIC ASSESSMENT"}
              </span>
            </div>
            <h2 className="font-sans font-black text-2xl sm:text-4xl lg:text-[42px] text-white tracking-tight leading-[1.2] max-w-2xl mx-auto">
              {language === 'gu' ? "તમારા માટે કઈ Braces સિસ્ટમ યોગ્ય છે તે ચોક્કસ સમજાતું નથી?" : "Not Sure Which Braces System Is Right for You?"}
            </h2>
            <p className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto font-sans ${language === 'gu' ? 'text-slate-100 font-semibold' : 'text-slate-300/90 font-medium'}`}>
              {language === 'gu'
                ? "મફત પ્રથમ ઓર્થોડોન્ટિક મૂલ્યાંકનથી શરૂઆત કરો. અમે તમને ઉપલબ્ધ બ્રેસીસ સિસ્ટમ્સની સરખામણી કરવામાં મદદ કરીશું, તફાવતો સમજાવીશું અને જો ખરેખર બ્રેસીસની જરૂર હોય તો પ્રામાણિકપણે જણાવીશું."
                : "Start with a free first orthodontic assessment. We’ll help you compare the available systems, explain the differences and tell you honestly if braces are actually needed."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 relative z-10 pt-2">
            <button
              onClick={() => openAppointmentModal('braces-treatment')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white font-bold text-sm sm:text-base hover:shadow-[0_8px_20px_rgba(20,184,166,0.3)] transition-all duration-300 cursor-pointer font-sans"
            >
              {language === 'gu' ? "મફત ઓર્થોડોન્ટિક મૂલ્યાંકન બુક કરો" : "Book Free Orthodontic Assessment"}
            </button>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#1E293B] border border-slate-700/60 text-white font-bold text-sm sm:text-base hover:bg-slate-800 transition-all duration-300 flex items-center justify-center gap-2 font-sans"
            >
              <MessageCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
              {language === 'gu' ? "અમને WhatsApp કરો" : "WhatsApp Us"}
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 12: Related Treatments */}
      <section className="space-y-8 sm:space-y-10 pt-6 sm:pt-10 max-w-7xl mx-auto px-4 sm:px-6" id="braces-related-services-section">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="flex justify-center">
            <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50/90 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100/60 font-sans">
              {language === 'gu' ? "સંબંધિત સારવાર" : "RELATED TREATMENTS"}
            </span>
          </div>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
            {language === 'gu' ? "સંબંધિત સારવાર" : "Related Treatments"}
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
                  {language === 'gu' ? "Invisible Aligners" : "Invisible Aligners"}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                  {language === 'gu'
                    ? "અદૃશ્ય ક્લિયર અલાઇનર્સ વડે તમારા દાંતને સીધા કરો, જે તમારા આરામ અને જીવનશૈલી માટે સંપૂર્ણપણે કસ્ટમાઇઝ્ડ છે."
                    : "Straighten your teeth discreetly with nearly invisible clear aligners, completely customized for your comfort and lifestyle."}
                </p>
              </div>
              <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                <span>{language === 'gu' ? "વિગતવાર જાણો" : "Learn Details"}</span>
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
                  {language === 'gu' ? "Smile Makeover" : "Smile Makeover"}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                  {language === 'gu'
                    ? "દાંતના કાર્યો અને સ્મિતની સુંદરતા પુનઃસ્થાપિત કરવા માટે ખાસ તૈયાર કરેલી સારવારના સંયોજનથી તમારા સ્મિતને બદલો."
                    : "Transform your smile with a tailored combination of cosmetic procedures designed to restore function and aesthetic harmony."}
                </p>
              </div>
              <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                <span>{language === 'gu' ? "વિગતવાર જાણો" : "Learn Details"}</span>
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
                  {language === 'gu' ? "Pediatric Dentistry" : "Pediatric Dentistry"}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed font-sans ${language === 'gu' ? 'text-slate-700 font-semibold' : 'text-slate-600 font-medium'}`}>
                  {language === 'gu'
                    ? "રમૂજી અને ડર-મુક્ત વાતાવરણમાં શિશુઓ, બાળકો અને કિશોરો માટે ખાસ ડેન્ટલ કેર પ્રદાન કરવામાં આવે છે."
                    : "Compassionate, friendly dental care specialized for infants, children, and teens in a playful, fear-free environment."}
                </p>
              </div>
              <div className="pt-2 flex items-center text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                <span>{language === 'gu' ? "વિગતવાર જાણો" : "Learn Details"}</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
