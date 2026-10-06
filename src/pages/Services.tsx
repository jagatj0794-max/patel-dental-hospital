/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Phone, 
  CheckCircle2, 
  Activity, 
  Star,
  ChevronRight,
  Stethoscope
} from 'lucide-react';
import { PageId, Service } from '../types';
import { DEFAULT_SERVICES } from '../utils/serviceData';

interface ServicesPageProps {
  setCurrentPage: (page: PageId) => void;
  openAppointmentModal: (treatment?: string) => void;
  servicesList?: Service[];
  language?: 'en' | 'gu';
}

interface ServiceCardMeta {
  slug: string;
  enTitle: string;
  guTitle: string;
  enDesc: string;
  guDesc: string;
  badgeEn: string;
  badgeGu: string;
  image: string;
  highlightsEn: string[];
  highlightsGu: string[];
}

const SERVICES_HUB_DATA: ServiceCardMeta[] = [
  {
    slug: 'dental-implants',
    enTitle: 'Dental Implants',
    guTitle: 'ડેન્ટલ ઇમ્પ્લાન્ટ્સ (કાયમી ફિક્સ દાંત)',
    enDesc: 'Permanent titanium tooth replacements designed with computer-guided 3D precision for natural chewing and lifetime stability.',
    guDesc: 'ગુમ થયેલા દાંત માટે આધુનિક 3D કમ્પ્યુટર-ગાઇડેડ ટાઇટેનિયમ ડેન્ટલ ઇમ્પ્લાન્ટ્સ, જે કુદરતી દાંત જેવી મજબૂતી અને આજીવન સ્થિરતા આપે છે.',
    badgeEn: 'Specialized Care',
    badgeGu: 'સ્પેશિયાલિટી સારવાર',
    image: '/Dental%20Implants.webp',
    highlightsEn: ['16,000+ Successful Implants', 'Fixed Teeth in 1 Week', 'Permanent Lifetime Solution'],
    highlightsGu: ['16,000+ સફળ ઇમ્પ્લાન્ટ્સ', '૧ અઠવાડિયામાં ફિક્સ દાંત', 'આજીવન કાયમી સોલ્યુશન']
  },
  {
    slug: 'invisible-aligners',
    enTitle: 'Invisible Aligners',
    guTitle: 'ઇનવિઝિબલ એલાઇનર્સ (અદ્રશ્ય તાર)',
    enDesc: 'Custom clear aligners engineered with US digital orthodontic technology to straighten teeth discreetly without metal wires.',
    guDesc: 'અદ્રશ્ય પારદર્શક એલાઇનર્સ દ્વારા મેટલ તાર વગર તમારા દાંતને સીધા અને સુંદર બનાવો. આરામદાયક અને દૂર કરી શકાય તેવા.',
    badgeEn: 'Digital Orthodontics',
    badgeGu: 'ડિજિટલ ઓર્થોડોન્ટિક્સ',
    image: '/Aligners.webp',
    highlightsEn: ['100% Virtually Invisible', 'Removable & Comfortable', 'Digitally Planned Results'],
    highlightsGu: ['૧૦૦% અદ્રશ્ય અને પારદર્શક', 'સરળતાથી કાઢી શકાય તેવા', 'ડિજિટલ 3D પ્લાનિંગ']
  },
  {
    slug: 'full-mouth-rehabilitation',
    enTitle: 'Full Mouth Rehabilitation',
    guTitle: 'ફુલ માઉથ રિહેબિલિટેશન (સંપૂર્ણ મોંની સારવાર)',
    enDesc: 'Comprehensive restorative treatment rebuilding damaged, worn-out, or missing teeth in both upper and lower jaws for optimal bite and aesthetics.',
    guDesc: 'ઘસાઈ ગયેલા કે ગુમ થયેલા દાંત માટે આખા મોંની પુનઃરચના અને બાઇટ સુધારણા. ચાવવાની શક્તિ અને સ્મિતની પુનઃસ્થાપના.',
    badgeEn: 'Full Mouth Restoration',
    badgeGu: 'સંપૂર્ણ પુનઃનિર્માણ',
    image: '/Full%20Mouth.webp',
    highlightsEn: ['350+ Full Mouth Cases', 'Bite & Jaw Alignment', 'Restores Complete Function'],
    highlightsGu: ['350+ ફુલ માઉથ કેસ', 'જડબા અને બાઇટ સુધારણા', 'સંપૂર્ણ ચાવવાની ક્ષમતા']
  },
  {
    slug: 'root-canal-treatment',
    enTitle: 'Single Sitting Root Canal Treatment',
    guTitle: 'સિંગલ સીટિંગ રૂટ કેનાલ ટ્રીટમેન્ટ (RCT)',
    enDesc: 'Comfortable, single-visit painless root canal therapy using Japanese rotary endomotors, apex locators, and biocompatible sealers.',
    guDesc: 'માત્ર ૧ જ મુલાકાતમાં દુખાવા વગરની આધુનિક સિંગલ-સિટિંગ રૂટ કેનાલ સારવાર. તમારા કુદરતી દાંતને બચાવવાનો શ્રેષ્ઠ ઉપાય.',
    badgeEn: 'Painless RCT',
    badgeGu: 'પીડારહિત રૂટ કેનાલ',
    image: '/Root%20Canal.webp',
    highlightsEn: ['Single Sitting Completion', 'Made in Japan Endo Motor', 'Saves Natural Tooth'],
    highlightsGu: ['૧ જ મુલાકાતમાં પૂર્ણ', 'જાપાનીઝ એન્ડો મોટર ટેકનોલોજી', 'કુદરતી દાંતનું રક્ષણ']
  },
  {
    slug: 'smile-makeover',
    enTitle: 'Smile Makeover & Cosmetic Designing',
    guTitle: 'સ્માઇલ મેકઓવર અને કોસ્મેટિક ડિઝાઇઇનિંગ',
    enDesc: 'Artistic smile enhancement with porcelain veneers, cosmetic contouring, and aesthetic shade matching for an irresistible smile.',
    guDesc: 'પોર્સેલેઈન વિનિયર્સ, ડિજિટલ સ્માઇલ ડિઝાઇન અને કસ્ટમ શેડ દ્વારા આકર્ષક અને આત્મવિશ્વાસપૂર્ણ સ્મિત મેળવો.',
    badgeEn: 'Aesthetic Dentistry',
    badgeGu: 'એસ્થેટિક ડેન્ટિસ્ટ્રી',
    image: '/Smile%20Designing.webp',
    highlightsEn: ['Digital Smile Designing', 'Porcelain Veneers', 'Harmonious Aesthetics'],
    highlightsGu: ['ડિજિટલ સ્માઇલ ડિઝાઇનિંગ', 'પોર્સેલેઈન વિનિયર્સ', 'પરફેક્ટ સ્માઇલ કરેક્શન']
  },
  {
    slug: 'crowns-bridges',
    enTitle: 'Dental Crowns & Bridges',
    guTitle: 'ડેન્ટલ ક્રાઉન્સ અને બ્રિજિસ (દાંતની કેપ)',
    enDesc: 'High-strength, custom-milled monolithic Zirconia and ceramic crowns designed by CAD/CAM for maximum durability and natural translucency.',
    guDesc: 'અત્યાધુનિક CAD/CAM ઝિર્કોનિયા અને સિરામિક કેપ દ્વારા ક્ષતિગ્રસ્ત કે તૂટેલા દાંતને કુદરતી મજબૂતી અને સુંદરતા આપો.',
    badgeEn: 'CAD/CAM Zirconia',
    badgeGu: 'CAD/CAM ઝિર્કોનિયા',
    image: '/Digital%20Dental%20Experts.webp',
    highlightsEn: ['High-Strength Zirconia', 'Custom CAD/CAM Milled', 'Natural Tooth Translucency'],
    highlightsGu: ['ઉચ્ચ મજબૂતી ઝિર્કોનિયા', 'CAD/CAM કસ્ટમ ફિટિંગ', 'કુદરતી દાંત જેવો દેખાવ']
  },
  {
    slug: 'braces-treatment',
    enTitle: 'Orthodontic Braces Treatment',
    guTitle: 'ઓર્થોડોન્ટિક બ્રેસીસ ટ્રીટમેન્ટ (દાંતના તાર)',
    enDesc: 'Ceramic, metal, and self-ligating braces treatment for teens and adults to correct irregular, crowded, or forwardly placed teeth.',
    guDesc: 'વાંકાચૂંકા, આગળ પડતા કે છૂટા દાંત માટે મેટલ, સિરામિક અને સેલ્ફ-લિગેટિંગ બ્રેસીસ દ્વારા વ્યવસ્થિત ગોઠવણ.',
    badgeEn: 'Teeth Alignment',
    badgeGu: 'દાંતનું એલાઈનમેન્ટ',
    image: '/IMG_3610.webp',
    highlightsEn: ['Metal & Ceramic Braces', 'Teens & Adults Solutions', 'Precision Alignment'],
    highlightsGu: ['મેટલ અને સિરામિક બ્રેસીસ', 'બાળકો અને પુખ્ત વયના લોકો માટે', 'ચોક્કસ એલાઇનમેન્ટ']
  },
  {
    slug: 'pediatric-dentistry',
    enTitle: 'Pediatric Dentistry (Kids Dental Care)',
    guTitle: 'પીડિયાટ્રિક ડેન્ટિસ્ટ્રી (બાળકોની સારવાર)',
    enDesc: 'Gentle, child-friendly preventive and restorative dental care led by pediatric specialists in a comfortable, fear-free atmosphere.',
    guDesc: 'બાળકો માટે સ્નેહપૂર્ણ, ભયમુક્ત વાતાવરણમાં કેવિટી પ્રિવેન્શન, ફ્લોરાઈડ એપ્લિકેશન અને દાંતની સલામત કાળજી.',
    badgeEn: 'Gentle Child Care',
    badgeGu: 'બાળકો માટે વિશેષ કેર',
    image: 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1784407803817_fd94jnkr.webp',
    highlightsEn: ['Child-Friendly Setup', 'Preventive Fluoride Care', 'Painless Cavity Repair'],
    highlightsGu: ['બાળ-મિત્ર વાતાવરણ', 'પ્રિવેન્ટિવ ફ્લોરાઈડ કેર', 'પીડારહિત કેવિટી રિપેર']
  },
  {
    slug: 'teeth-whitening',
    enTitle: 'Professional Laser Teeth Whitening',
    guTitle: 'પ્રોફેશનલ લેસર ટીથ વ્હાઇટનિંગ',
    enDesc: 'Advanced in-clinic laser teeth whitening removing stubborn enamel stains safely in under 60 minutes for a dazzling bright smile.',
    guDesc: 'માત્ર ૬૦ મિનિટમાં સુરક્ષિત લેસર ટીથ વ્હાઇટનિંગ. ચા-કોફી અને ડાઘ દૂર કરી દાંતને ચમકદાર સફેદ બનાવો.',
    badgeEn: 'Instant Brightening',
    badgeGu: 'ઇન્સ્ટન્ટ બ્રાઇટનિંગ',
    image: '/white%20teeth%20in%20rajkot.jpg',
    highlightsEn: ['Up to 8 Shades Whiter', 'Enamel-Safe Protocol', '60-Minute Session'],
    highlightsGu: ['૮ શેડ સુધી સફેદ દાંત', 'એનામલ-સુરક્ષિત પદ્ધતિ', 'માત્ર ૬૦ મિનિટમાં પરિણામ']
  },
  {
    slug: 'wisdom-tooth-surgery',
    enTitle: 'Painless Wisdom Tooth Surgery',
    guTitle: 'પેઇનલેસ વિઝડમ ટૂથ સર્જરી (ડાઢ કઢાવવી)',
    enDesc: 'Minimally invasive surgical removal of impacted or painful wisdom teeth using specialized micromotor units for rapid post-op healing.',
    guDesc: 'દુખાવો કરતી કે અંદર ફસાયેલી ડાઢને આધુનિક માઇક્રોમોટર પદ્ધતિથી કોઈપણ પીડા વગર સુરક્ષિત રીતે દૂર કરવી.',
    badgeEn: 'Oral Surgery',
    badgeGu: 'ઓરલ સર્જરી',
    image: 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1784407897064_5jan06j9.webp',
    highlightsEn: ['Painless Local Anesthesia', 'Minimally Invasive', 'Fast Post-Op Recovery'],
    highlightsGu: ['સંપૂર્ણ લોકલ એનેસ્થેસિયા', 'મિનિમલી ઇન્વેસિવ', 'ઝડપી રિકવરી']
  },
  {
    slug: 'tooth-coloured-filling',
    enTitle: 'Tooth Coloured Composite Filling',
    guTitle: 'ટૂથ કલર્ડ ફિલિંગ (કોમ્પોઝિટ ફિલિંગ)',
    enDesc: 'Biocompatible, tooth-matching composite resin restorations that invisibly seal cavities and prevent future tooth decay.',
    guDesc: 'દાંતના રંગ સાથે મેળ ખાતી અમેરિકન કોમ્પોઝિટ રેઝિન ફિલિંગ દ્વારા સડો અટકાવો અને દાંતને કુદરતી સુરક્ષા આપો.',
    badgeEn: 'Biocompatible',
    badgeGu: 'બાયોકોમ્પેટિબલ',
    image: '/MG_3249.webp',
    highlightsEn: ['Natural Shade Matching', 'Mercury-Free Material', 'Reinforces Tooth Structure'],
    highlightsGu: ['દાંત સાથે મેળ ખાતો શેડ', 'મર્ક્યુરી-ફ્રી મટિરિયલ', 'દાંતને મજબૂતી']
  },
  {
    slug: 'oral-submucous-fibrosis-osmf-treatment-rajkot',
    enTitle: 'Oral Submucous Fibrosis (OSMF) Treatment',
    guTitle: 'ઓરલ સબમ્યુકસ ફાઇબ્રોસિસ (OSMF) ટ્રીટમેન્ટ',
    enDesc: 'Specialized medical and surgical therapy for restricted mouth opening, burning sensation, and tissue stiffness caused by chewing areca nut.',
    guDesc: 'સોપારી-ગુટખાના કારણે મોં ઓછું ખુલવું, બળતરા થવી કે ફાઇબ્રોસિસની સમસ્યા માટે અત્યાધુનિક સારવાર અને સર્જરી.',
    badgeEn: 'Specialized Care',
    badgeGu: 'સ્પેશિયલ સારવાર',
    image: '/Oral%20&%20Maxillofacial%20Surgery.png',
    highlightsEn: ['Mouth Opening Restoration', 'Tissue Elasticity Therapy', 'Specialist Surgical Protocols'],
    highlightsGu: ['મોં ખોલવાની ક્ષમતા સુધારણા', 'બળતરામાં તાત્કાલિક રાહત', 'નિષ્ણાત સર્જિકલ કેર']
  }
];

export default function Services({ 
  setCurrentPage, 
  openAppointmentModal, 
  language = 'gu' 
}: ServicesPageProps) {

  const handleNavigate = (slug: string) => {
    const targetPage = `services/${slug}` as PageId;
    setCurrentPage(targetPage);
    window.location.hash = targetPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] pt-24 sm:pt-28 pb-16 font-sans">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <ol className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 font-medium">
          <li>
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('home');
                window.location.hash = 'home';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#0D9488] transition-colors"
            >
              {language === 'gu' ? 'હોમ' : 'Home'}
            </a>
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 mx-1" />
            <span className="text-[#081C3A] font-bold">
              {language === 'gu' ? 'અમારી સેવાઓ' : 'Services'}
            </span>
          </li>
        </ol>
      </nav>

      {/* Hero Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#0D9488] text-xs font-black tracking-wider uppercase">
          <Sparkles className="h-3.5 w-3.5 text-[#0D9488]" />
          <span>{language === 'gu' ? 'સ્પેશિયાલાઇઝ્ડ ડેન્ટલ કેર' : 'ADVANCED CLINICAL SERVICES'}</span>
        </div>

        <h1 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-[#081C3A] tracking-tight leading-tight max-w-4xl mx-auto">
          {language === 'gu' 
            ? 'રાજકોટમાં અદ્યતન ડેન્ટલ સારવાર અને સ્પેશિયાલાઇઝ્ડ કેર' 
            : 'Comprehensive Dental Treatments & Care in Rajkot'}
        </h1>

        <p className="text-slate-600 font-medium text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          {language === 'gu'
            ? 'પટેલ ડેન્ટલ હોસ્પિટલમાં આધુનિક 3D CBCT ટેકનોલોજી, અમેરિકન ઇમ્પ્લાન્ટ્સ અને પીડારહિત પ્રોટોકોલ સાથે સર્વોચ્ચ ગુણવત્તાવાળી સારવાર ઉપલબ્ધ છે.'
            : 'Explore world-class dental care at Patel Dental Hospital. From computer-guided dental implants to clear aligners and painless root canals, our specialists deliver lasting smiles.'}
        </p>

        {/* Feature Badges Strip */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 pt-4 text-xs sm:text-sm font-semibold text-[#081C3A]">
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs">
            <CheckCircle2 className="h-4 w-4 text-[#0D9488]" />
            <span>{language === 'gu' ? '18+ વર્ષનો અનુભવ' : '18+ Years Experience'}</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs">
            <CheckCircle2 className="h-4 w-4 text-[#0D9488]" />
            <span>{language === 'gu' ? 'ઇન-હાઉસ 3D CBCT સ્કેન' : 'In-House 3D CBCT Imaging'}</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs">
            <CheckCircle2 className="h-4 w-4 text-[#0D9488]" />
            <span>{language === 'gu' ? '45,000+ સંતુષ્ટ દર્દીઓ' : '45,000+ Satisfied Patients'}</span>
          </div>
        </div>
      </section>

      {/* Services Grid (All 12 Treatments as Real Links) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {SERVICES_HUB_DATA.map((item) => {
            const title = language === 'gu' ? item.guTitle : item.enTitle;
            const desc = language === 'gu' ? item.guDesc : item.enDesc;
            const badge = language === 'gu' ? item.badgeGu : item.badgeEn;
            const highlights = language === 'gu' ? item.highlightsGu : item.highlightsEn;

            return (
              <a
                key={item.slug}
                href={`/services/${item.slug}/`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(item.slug);
                }}
                className="bg-white border border-[#E5EEF5] hover:border-[#0D9488]/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
              >
                {/* Image Container */}
                <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="inline-block px-3 py-1 bg-white/95 backdrop-blur-xs text-[#0D9488] text-[11px] font-black uppercase tracking-wider rounded-lg shadow-xs border border-white/60">
                      {badge}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-5">
                  <div className="space-y-3">
                    <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#081C3A] group-hover:text-[#0D9488] transition-colors leading-snug tracking-tight">
                      {title}
                    </h2>
                    <p className={`text-xs sm:text-sm leading-relaxed ${language === 'gu' ? 'text-black font-semibold' : 'text-slate-600 font-medium'}`}>
                      {desc}
                    </p>

                    {/* Highlights bullet checklist */}
                    <ul className="space-y-1.5 pt-2">
                      {highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[#0D9488] text-xs sm:text-sm font-bold tracking-wide">
                    <span>{language === 'gu' ? 'સારવારની સંપૂર્ણ વિગતો જુઓ' : 'Explore Treatment Details'}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Booking Consultation Bottom CTA Strip */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="bg-gradient-to-br from-[#081C3A] to-[#0D3868] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#0D9488] block">
              {language === 'gu' ? 'નિઃશુલ્ક પરામર્શ' : 'FREE EXPERT CONSULTATION'}
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight">
              {language === 'gu' ? 'તમારા દાંત માટે શ્રેષ્ઠ સારવાર જાણવા માંગો છો?' : 'Not Sure Which Treatment You Need?'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              {language === 'gu'
                ? 'અમારા મુખ્ય ડેન્ટલ સર્જન ડૉ. વિપુલ પટેલ અને નિષ્ણાત ટીમ સાથે વાત કરો અને તમારા સ્મિત માટે યોગ્ય સારવાર પ્લાન મેળવો.'
                : 'Consult with Dr. Vipul Patel and our specialist dental team in Rajkot for personalized diagnosis and clear pricing.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => openAppointmentModal("General Consultation - Services Hub")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>{language === 'gu' ? 'ફ્રી એપોઇન્ટમેન્ટ બુક કરો' : 'Book Free Appointment'}</span>
            </button>
            <a
              href="tel:+919510397046"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider rounded-xl border border-white/20 transition-all"
            >
              <Phone className="h-4 w-4" />
              <span>+91 9510397046</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
