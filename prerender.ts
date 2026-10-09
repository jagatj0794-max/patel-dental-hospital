/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Polyfill global environment guards for SSR/SSG prerender script
if (typeof globalThis.window === 'undefined') {
  const dummyStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  };
  (globalThis as any).window = {
    location: {
      pathname: '/',
      search: '',
      hash: '',
      href: 'https://pdhrajkot.com/',
      origin: 'https://pdhrajkot.com',
      hostname: 'pdhrajkot.com',
      host: 'pdhrajkot.com',
      protocol: 'https:',
      port: '',
    },
    localStorage: dummyStorage,
    sessionStorage: dummyStorage,
    scrollTo: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    matchMedia: () => ({ matches: false, addListener: () => {}, removeListener: () => {} }),
  };
  (globalThis as any).document = {
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => ({ setAttribute: () => {}, appendChild: () => {} }),
    head: { appendChild: () => {} },
    body: { appendChild: () => {} },
  };
  (globalThis as any).localStorage = dummyStorage;
  (globalThis as any).sessionStorage = dummyStorage;
}

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import {
  dentalImplantsFaqs,
  fullMouthFaqs,
  invisibleAlignersFaqs,
  rootCanalFaqs,
  smileMakeoverFaqs,
  crownsBridgesFaqs,
  pediatricDentistryFaqs
} from './src/data/serviceFaqs';

import { DEFAULT_SERVICES, serviceService } from './src/utils/serviceData';
import { DEFAULT_DOCTORS } from './src/data/doctors';
import { doctorService } from './src/utils/doctorData';
import { DEFAULT_CONTACT_INFO, contactService } from './src/utils/contactData';
import { heroService } from './src/utils/heroData';
import { DEFAULT_MEDIA_IMAGES, galleryService } from './src/utils/galleryData';
import { PATIENT_MOMENTS } from './src/data/patientMoments';
import { DEFAULT_VIDEOS, videoService } from './src/utils/videoData';
import { supabase } from './src/utils/supabase';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Routes to pre-render
interface RouteDef {
  path: string;
  pageId: string;
  title: string;
  description: string;
  keywords: string;
  language: 'gu' | 'en';
}

const baseRoutes = [
  {
    path: '/',
    pageId: 'home',
    title: 'પટેલ ડેન્ટલ હોસ્પિટલ | રાજકોટમાં દાંતની આધુનિક સારવાર',
    description: 'રાજકોટની પટેલ ડેન્ટલ હોસ્પિટલ દ્વારા ડેન્ટલ ઇમ્પ્લાન્ટ, રૂટ કેનાલ, સ્માઇલ મેકઓવર, દાંતના તાર અને પેઢાની તકલીફો સહિતની આધુનિક સારવાર પૂરી પાડવામાં આવે છે.',
    keywords: ''
  },
  {
    path: '/services',
    pageId: 'services',
    title: 'દાંતની સારવાર રાજકોટ | પટેલ ડેન્ટલ હોસ્પિટલ',
    description: 'રાજકોટની પટેલ ડેન્ટલ હોસ્પિટલમાં ઇમ્પ્લાન્ટ, રૂટ કેનાલ, બ્રેસીસ, સ્માઇલ મેકઓવર સહિત દાંતની તમામ સારવાર એક જ જગ્યાએ ઉપલબ્ધ છે.',
    keywords: 'Dental Services Rajkot, Dental Treatments Rajkot, Dentist in Rajkot, Patel Dental Hospital Services'
  },
  {
    path: '/services/dental-implants',
    pageId: 'services/dental-implants',
    title: 'ડેન્ટલ ઇમ્પ્લાન્ટ સારવાર રાજકોટ | પટેલ ડેન્ટલ હોસ્પિટલ',
    description: 'રાજકોટની પટેલ ડેન્ટલ હોસ્પિટલ ખાતે આધુનિક ટેકનોલોજી અને થ્રીડી સ્કેનિંગની મદદથી આખા મોંની તેમજ સિંગલ ટૂથ ડેન્ટલ ઇમ્પ્લાન્ટ સારવાર પૂરી પાડવામાં આવે છે.',
    keywords: 'Dental Implants Rajkot, Best Implant Dentist Rajkot, Full Mouth Implants Rajkot, Teeth Implants Cost Rajkot'
  },
  {
    path: '/services/invisible-aligners',
    pageId: 'services/invisible-aligners',
    title: 'ઇન્વિઝિબલ એલાઇનર્સ રાજકોટ | પટેલ ડેન્ટલ હોસ્પિટલ',
    description: 'રાજકોટમાં ડિજિટલ સ્કેનિંગ આધારિત ક્લિયર એલાઇનર્સ દ્વારા વાંકાચૂંકા દાંત સીધા કરવાની સારવાર. પ્લાનિંગ અને ફોલો-અપ નિષ્ણાત ડૉક્ટરો કરે છે.',
    keywords: 'Invisible Aligners Rajkot, Clear Aligners Rajkot, Orthodontist Rajkot, Teeth Straightening Rajkot'
  },
  {
    path: '/services/pediatric-dentistry',
    pageId: 'services/pediatric-dentistry',
    title: 'બાળકોના દાંતની સારવાર રાજકોટ | પટેલ ડેન્ટલ',
    description: 'રાજકોટમાં બાળકો માટે ફ્રેન્ડલી વાતાવરણમાં દાંતની તપાસ, ફ્લોરાઇડ, ફિશર સીલન્ટ, કેવિટી અને નિયમિત ડેન્ટલ સંભાળની સુવિધા ઉપલબ્ધ છે.',
    keywords: 'Pediatric Dentist Rajkot, Kids Dental Clinic Rajkot, Childrens Dentist Rajkot, Kids Tooth Cavity Treatment'
  },
  {
    path: '/services/braces-treatment',
    pageId: 'services/braces-treatment',
    title: 'બ્રેસીસ સારવાર રાજકોટ | પટેલ ડેન્ટલ હોસ્પિટલ',
    description: 'રાજકોટમાં મેટલ, સિરામિક અને ક્લિયર બ્રેસીસ દ્વારા દાંતની ગોઠવણી અને બાઇટ સુધારવાની સારવાર. તમારા કેસ મુજબ યોગ્ય વિકલ્પની સલાહ મળે છે.',
    keywords: 'Braces Treatment Rajkot, Best Orthodontist Rajkot, Ceramic Braces Rajkot, Metal Braces Rajkot'
  },
  {
    path: '/gallery',
    pageId: 'gallery',
    title: 'હોસ્પિટલ ગેલેરી રાજકોટ | પટેલ ડેન્ટલ હોસ્પિટલ',
    description: 'રાજકોટની પટેલ ડેન્ટલ હોસ્પિટલની ગેલેરી: અમારું ક્લિનિક, સાધનો અને દર્દીઓના સ્મિત સારવાર પહેલાં અને પછીની તસવીરો જુઓ. પરિણામ દરેક દર્દીમાં અલગ હોઈ શકે.',
    keywords: 'Dental Before After Rajkot, Smile Makeover Cases Rajkot, Dental Hospital Success Stories, Clinical Gallery Rajkot'
  },
  {
    path: '/social-service',
    pageId: 'social-service',
    title: 'સામાજિક સેવા રાજકોટ | પટેલ ડેન્ટલ હોસ્પિટલ',
    description: 'પટેલ ડેન્ટલ હોસ્પિટલ રાજકોટમાં દાંતની તપાસ કેમ્પ અને શાળા મુલાકાતો દ્વારા સમાજ માટે સેવા આપે છે. અમારી સામાજિક પહેલ વિશે વધુ જાણો.',
    keywords: 'Social Dental Service Rajkot, Free Dental Camps Gujarat, Community Dental Care, Patel Dental Hospital Outreach'
  },
  {
    path: '/technology',
    pageId: 'technology',
    title: 'આધુનિક ડેન્ટલ ટેક્નોલોજી રાજકોટ | પટેલ ડેન્ટલ',
    description: 'રાજકોટની પટેલ ડેન્ટલ હોસ્પિટલમાં થ્રીડી સ્કેનિંગ અને ડિજிட்டલ પ્લાનિંગ જેવી આધુનિક ટેક્નોલોજીથી દાંતની સારવારનું સચોટ આયોજન કરવામાં આવે છે.',
    keywords: 'Dental Technology Rajkot, 3D CBCT Scan Rajkot, Dental Autoclave Sterilization, Guided Dental Surgery'
  },
  {
    path: '/why-choose-us',
    pageId: 'why-choose-us',
    title: 'પટેલ ડેન્ટલ હોસ્પિટલ શા માટે પસંદ કરવી? | રાજકોટ',
    description: 'રાજકોટમાં પટેલ ડેન્ટલ હોસ્પિટલ પસંદ કરવાના કારણો: અનુભવી ડૉક્ટરો, આધુનિક સાધનો, સ્વચ્છતા અને દરેક દર્દીને સારવાર પહેલાં સ્પષ્ટ સમજૂતી.',
    keywords: 'Best Dentist in Rajkot, Why Patel Dental Hospital, Advanced Dental Clinic Gujarat, Painless Dentistry Rajkot'
  },
  {
    path: '/international',
    pageId: 'international',
    title: 'વિદેશી દર્દીઓ માટે ડેન્ટલ સારવાર ભારત | પટેલ ડેન્ટલ',
    description: 'ભારત આવતા વિદેશી દર્દીઓ માટે રાજકોટની પટેલ ડેન્ટલ હોસ્પિટલમાં સારવાર આયોજન, રહેવા-મુસાફરીની માહિતી અને ડેન્ટલ ટૂરિઝમ અંગે માર્ગદર્શન.',
    keywords: 'Dental Tourism India, Dental Tourism Rajkot, Cheap Implants India, International Dental Patient Gujarat'
  },
  {
    path: '/blogs',
    pageId: 'blogs',
    title: 'ડેન્ટલ આરોગ્ય બ્લોગ અને લેખો | પટેલ ડેન્ટલ હોસ્પિટલ',
    description: 'રાજકોટની પટેલ ડેન્ટલ હોસ્પિટલના સત્તાવાર બ્લોગમાં દાંતની સંભાળ, ડેન્ટલ ઇમ્પ્લાન્ટ, મોઢાની સ્વચ્છતા અને અદ્રશ્ય તાર સંબંધિત માહિતીપ્રદ લેખો વિગતે વાંચો.',
    keywords: 'Dental Blog Rajkot, Teeth Care Tips, Dentist Articles Gujarat, Oral Health Blog India'
  },
  {
    path: '/doctors',
    pageId: 'doctors',
    title: 'અમારા ડૉક્ટરો રાજકોટ | પટેલ ડેન્ટલ હોસ્પિટલ',
    description: 'રાજકોટની પટેલ ડેન્ટલ હોસ્પિટલના નિષ્ણાત ડૉક્ટરોને મળો. તેમની લાયકાત, અનુભવ અને સારવાર ક્ષેત્રો વિશે માહિતી મેળવો અને એપોઇન્ટમેન્ટ બુક કરો.',
    keywords: 'Best Dentists in Rajkot, Dental Surgeon Rajkot, Orthodontist Rajkot, Dr Vipul Patel Rajkot'
  },
  {
    path: '/contact',
    pageId: 'contact',
    title: 'સંપર્ક અને એપોઇન્ટમેન્ટ રાજકોટ | પટેલ ડેન્ટલ',
    description: 'પટેલ ડેન્ટલ હોસ્પિટલ, રાજકોટનું સરનામું, ફોન નંબર અને સમય જુઓ. દાંતની તપાસ કે સારવાર માટે અમારો સંપર્ક કરો અને એપોઇન્ટમેન્ટ બુક કરો.',
    keywords: 'Contact Patel Dental Hospital, Patel Dental Hospital Address, Dentist Phone Number Rajkot, Book Dentist Appointment Rajkot'
  },
  {
    path: '/services/smile-makeover',
    pageId: 'services/smile-makeover',
    title: 'સ્માઇલ મેકઓવર રાજકોટ | પટેલ ડેન્ટલ હોસ્પિટલ',
    description: 'રાજકોટમાં વેનિયર, વ્હાઇટનિંગ, ક્રાઉન અને દાંતના આકારમાં સુધારા દ્વારા સ્મિત સુંદર બનાવવાની સારવાર. સારવાર પહેલાં ડિજિટલ પ્રિવ્યૂ જોઈ શકાય.',
    keywords: 'Smile Makeover, Smile Designing, Cosmetic Dentistry, Smile Correction, Aesthetic Dentistry, Cosmetic Dentist Rajkot, Porcelain Veneers, Digital Smile Design, Patel Dental Hospital'
  },
  {
    path: '/services/full-mouth-rehabilitation',
    pageId: 'services/full-mouth-rehabilitation',
    title: 'ફુલ માઉથ રિહેબિલિટેશન રાજકોટ | પટેલ ડેન્ટલ',
    description: 'ચાવવામાં, બોલવામાં કે સ્મિતમાં તકલીફ હોય તો રાજકોટમાં આખા મોંના દાંત અને બાઇટ ફરી ગોઠવતી ફુલ માઉથ રિહેબિલિટેશન સારવાર ઉપલબ્ધ છે.',
    keywords: 'Full Mouth Rehabilitation, Full Mouth Restoration, Complete Dental Rehabilitation, Full Mouth Reconstruction, Restorative Dentistry, Advanced Dental Care in Rajkot, Dentist in Rajkot'
  },
  {
    path: '/services/oral-submucous-fibrosis-osmf-treatment-rajkot',
    pageId: 'services/oral-submucous-fibrosis-osmf-treatment-rajkot',
    title: 'OSMF સારવાર રાજકોટ | પટેલ ડેન્ટલ હોસ્પિટલ',
    description: 'મોઢું ઓછું ખૂલતું હોય કે બળતરા રહેતી હોય તો રાજકોટમાં ઓરલ સબમ્યુકસ ફાઇબ્રોસિસ (OSMF) ની તપાસ, સારવાર અને ફિઝિયોથેરાપી માર્ગદર્શન મળે છે.',
    keywords: 'Oral Submucous Fibrosis Treatment Rajkot, OSMF Surgery Rajkot, OSMF Treatment Clinic Rajkot, Patel Dental Hospital'
  },
  {
    path: '/services/crowns-bridges',
    pageId: 'services/crowns-bridges',
    title: 'ક્રોન અને બ્રિજ સારવાર રાજકોટ | પટેલ ડેન્ટલ',
    description: 'રાજકોટમાં તૂટેલા કે ખવાયેલા દાંત માટે અને ગુમ થયેલા દાંતની જગ્યા ભરવા માટે ક્રાઉન અને બ્રિજની સારવાર, કુદરતી દેખાવ સાથે.',
    keywords: 'Crowns and Bridges, Dental Crown, Zirconia Crown, Ceramic Crown, Dental Bridge, Tooth Cap, Best Dentist in Rajkot, Dental Clinic Rajkot, Restorative Dentistry, Patel Dental Hospital'
  },
  {
    path: '/services/root-canal-treatment',
    pageId: 'services/root-canal-treatment',
    title: 'રૂટ કેનાલ સારવાર રાજકોટ | પટેલ ડેન્ટલ હોસ્પિટલ',
    description: 'દાંતના દુખાવા કે ઇન્ફેક્શન માટે રાજકોટમાં આધુમિક સાધનો સાથે રૂટ કેનાલ સારવાર. તપાસ બાદ જરૂર મુજબ સારવારનું આયોજન કરવામાં આવે છે.',
    keywords: 'Root Canal Treatment, RCT, Single Sitting RCT, Root Canal Specialist, Tooth Pain Treatment, Endodontic Treatment, Best Dentist in Rajkot, Dental Clinic in Rajkot, Patel Dental Hospital'
  },
  {
    path: '/services/teeth-whitening',
    pageId: 'services/teeth-whitening',
    title: 'ટીથ વ્હાઇટનિંગ રાજકોટ | પટેલ ડેન્ટલ હોસ્પિટલ',
    description: 'રાજકોટમાં ક્લિનિકમાં કરવામાં આવતી ટીથ વ્હાઇટનિંગ સારવાર દ્વારા દાંતના પીળાશ અને ડાઘ ઘટાડી દાંતને વધુ સફેદ બનાવી શકાય છે.',
    keywords: 'Teeth Whitening, Laser Teeth Whitening, Professional Teeth Whitening, Tooth Whitening, Cosmetic Dentist Rajkot, Best Dental Hospital in Rajkot, Instant Teeth Brightening, Patel Dental Hospital'
  },
  {
    path: '/services/wisdom-tooth-surgery',
    pageId: 'services/wisdom-tooth-surgery',
    title: 'અક્કલ દાઢ કાઢવાની સારવાર રાજકોટ | પટેલ ડેન્ટલ',
    description: 'અક્કલ દાઢમાં દુખાવો કે સોજો હોય તો રાજકોટમાં એક્સ-રે તપાસ બાદ સુરક્ષિત સર્જરી દ્વારા દાઢ કાઢવાની સારવાર ઉપલબ્ધ છે.',
    keywords: 'Wisdom Tooth Removal, Wisdom Tooth Surgery, Impacted Tooth Surgery, Tooth Extraction, Best Dentist in Rajkot, Oral Surgeon Rajkot, Painless Extraction Rajkot, Patel Dental Hospital'
  },
  {
    path: '/services/tooth-coloured-filling',
    pageId: 'services/tooth-coloured-filling',
    title: 'દાંતના રંગની ફિલિંગ રાજકોટ | પટેલ ડેન્ટલ',
    description: 'રાજકોટમાં કેવિટી માટે દાંતના રંગ સાથે મેળ ખાતી ફિલિંગ. સમયસર સારવારથી દાંત બચાવી શકાય અને રૂટ કેનાલની જરૂર ટાળી શકાય.',
    keywords: 'Tooth Filling, Composite Filling, Tooth Coloured Filling, Dental Filling, Cavity Restoration, Best Dentist in Rajkot, Dental Clinic Rajkot, Preventive Dentistry, Patel Dental Hospital'
  },
  {
    path: '/blog/dental-implants-rajkot',
    pageId: 'blog/dental-implants-rajkot',
    title: 'રાજકોટમાં ડેન્ટલ ઇમ્પ્લાન્ટ: સારવાર, ફાયદા અને ખર્ચ',
    description: 'રાજકોટમાં ડેન્ટલ ઇમ્પ્લાન્ટ શું છે, સારવારના તબક્કા, ફાયદા અને ખર્ચને અસર કરતી બાબતો વિશે પટેલ ડેન્ટલ હોસ્પિટલની સરળ માર્ગદર્શિકા વાંચો.',
    keywords: 'Dental Implants in Rajkot, best dental clinic in Rajkot, dental implant treatment, dental implant cost in Rajkot, implant specialist dentist Rajkot'
  },
  {
    path: '/blog/braces-vs-clear-aligners',
    pageId: 'blog/braces-vs-clear-aligners',
    title: 'બ્રેસીસ કે ક્લિયર એલાઇનર્સ: કયું પસંદ કરવું? | રાજકોટ',
    description: 'રાજકોટમાં બ્રેસીસ અને ક્લિયર એલાઇનર્સ વચ્ચેનો તફાવત, ફાયદા-ગેરફાયદા અને તમારા કેસ માટે યોગ્ય વિકલ્પ કેવી રીતે પસંદ કરવો તે જાણો.',
    keywords: 'Braces vs Clear Aligners, braces treatment in Rajkot, clear aligners Rajkot, invisible aligners Rajkot, best dentist in Rajkot'
  },
  {
    path: '/blog/maintain-white-teeth-after-whitening',
    pageId: 'blog/maintain-white-teeth-after-whitening',
    title: 'વ્હાઇટનિંગ પછી દાંત ચમકતા રાખવાની આદતો | પટેલ ડેન્ટલ',
    description: 'ટીથ વ્હાઇટનિંગ કરાવ્યા પછી દાંતનો રંગ લાંબો સમય જળવાઈ રહે તે માટે ખાવા-પીવાની ટેવો, બ્રશિંગ અને સંભાળની સરળ ટિપ્સ પટેલ ડેન્ટલ હોસ્પિટલ પાસેથી.',
    keywords: 'maintain white teeth after whitening, teeth whitening in Rajkot, teeth whitening aftercare, professional teeth whitening, dental treatment in Rajkot'
  }
];

const englishTitles: Record<string, string> = {
  'home': 'Patel Dental Hospital | Dental Care in Rajkot',
  'services': 'Dental Treatments in Rajkot | Patel Dental Hospital',
  'services/dental-implants': 'Dental Implants in Rajkot | Patel Dental Hospital',
  'services/invisible-aligners': 'Invisible Aligners in Rajkot | Patel Dental Hospital',
  'services/pediatric-dentistry': 'Pediatric Dentist in Rajkot | Patel Dental Hospital',
  'services/braces-treatment': 'Braces Treatment in Rajkot | Patel Dental Hospital',
  'services/smile-makeover': 'Smile Makeover in Rajkot | Patel Dental Hospital',
  'services/full-mouth-rehabilitation': 'Full Mouth Rehabilitation in Rajkot | Patel Dental',
  'services/oral-submucous-fibrosis-osmf-treatment-rajkot': 'OSMF Treatment in Rajkot | Patel Dental Hospital',
  'services/crowns-bridges': 'Dental Crowns and Bridges in Rajkot | Patel Dental',
  'services/root-canal-treatment': 'Root Canal Treatment in Rajkot | Patel Dental Hospital',
  'services/teeth-whitening': 'Teeth Whitening in Rajkot | Patel Dental Hospital',
  'services/wisdom-tooth-surgery': 'Wisdom Tooth Removal in Rajkot | Patel Dental Hospital',
  'services/tooth-coloured-filling': 'Tooth-Coloured Fillings in Rajkot | Patel Dental',
  'gallery': 'Hospital Gallery Rajkot | Patel Dental Hospital',
  'social-service': 'Social Service | Patel Dental Hospital, Rajkot',
  'technology': 'Advanced Dental Technology | Patel Dental Hospital',
  'why-choose-us': 'Why Choose Patel Dental Hospital | Rajkot',
  'international': 'Dental Tourism India | Patel Dental Hospital, Rajkot',
  'blogs': 'Dental Health Blog & Articles | Patel Dental Hospital',
  'doctors': 'Our Doctors in Rajkot | Patel Dental Hospital',
  'contact': 'Contact & Appointments | Patel Dental Hospital Rajkot',
  'blog/dental-implants-rajkot': 'Dental Implants in Rajkot: Treatment, Benefits & Cost',
  'blog/braces-vs-clear-aligners': 'Braces vs Clear Aligners: Which Should You Choose?',
  'blog/maintain-white-teeth-after-whitening': 'Keep Teeth White After Whitening | Patel Dental'
};

const englishDescriptions: Record<string, string> = {
  'home': 'Patel Dental Hospital in Rajkot offers dental implants, root canal treatment, smile makeovers, braces, aligners and other dental care. Book a consultation today.',
  'services': 'Explore dental services at Patel Dental Hospital, Rajkot: implants, root canal, braces, aligners, smile makeover, whitening, wisdom tooth surgery and more.',
  'services/dental-implants': 'Dental implant treatment in Rajkot for single teeth or full-mouth replacement, planned with 3D scanning. Get advice on the right option for your case.',
  'services/invisible-aligners': 'Straighten crooked teeth with clear aligners in Rajkot. Digital scan-based planning and regular follow-ups by experienced dentists at Patel Dental Hospital.',
  'services/pediatric-dentistry': 'Child-friendly dental care in Rajkot: check-ups, fluoride, fissure sealants, cavity treatment and regular dental care for kids at Patel Dental Hospital.',
  'services/braces-treatment': 'Metal, ceramic and clear braces in Rajkot to align teeth and correct your bite. Get advice on the right option for your case at Patel Dental Hospital.',
  'services/smile-makeover': 'Improve your smile in Rajkot with veneers, whitening, crowns and tooth reshaping. See a digital preview of your planned smile before treatment begins.',
  'services/full-mouth-rehabilitation': 'Trouble chewing, speaking or smiling? Full mouth rehabilitation in Rajkot restores your teeth and bite with a complete treatment plan.',
  'services/oral-submucous-fibrosis-osmf-treatment-rajkot': 'Difficulty opening your mouth or a burning sensation? Get OSMF (oral submucous fibrosis) evaluation, treatment and physiotherapy guidance in Rajkot.',
  'services/crowns-bridges': 'Crowns for broken or decayed teeth and bridges to replace missing teeth in Rajkot, designed to look natural. Visit Patel Dental Hospital for advice.',
  'services/root-canal-treatment': 'Tooth pain or infection? Root canal treatment in Rajkot with modern equipment. Treatment is planned after examination at Patel Dental Hospital.',
  'services/teeth-whitening': 'Professional in-clinic teeth whitening in Rajkot to reduce yellowing and stains and brighten your teeth. Book a consultation at Patel Dental Hospital.',
  'services/wisdom-tooth-surgery': 'Pain or swelling from a wisdom tooth? Safe wisdom tooth surgery in Rajkot after X-ray evaluation at Patel Dental Hospital.',
  'services/tooth-coloured-filling': 'Tooth-coloured fillings for cavities in Rajkot that blend with your natural teeth. Timely treatment can save the tooth and help avoid a root canal.',
  'gallery': 'See our clinic, equipment and patient smiles before and after treatment at Patel Dental Hospital, Rajkot. Results vary from patient to patient.',
  'social-service': 'Patel Dental Hospital serves the community in Rajkot through dental check-up camps and school visits. Learn more about our social initiatives.',
  'technology': 'Patel Dental Hospital in Rajkot uses 3D scanning and digital planning to plan dental treatments with precision. Learn about our technology.',
  'why-choose-us': 'Reasons to choose Patel Dental Hospital in Rajkot: experienced doctors, modern equipment, strict hygiene and a clear explanation before every treatment.',
  'international': 'Planning dental treatment in India? Patel Dental Hospital in Rajkot offers treatment planning, stay and travel information, and guidance for international patients.',
  'blogs': 'Read dental care tips and articles on implants, braces, aligners, whitening and oral hygiene from Patel Dental Hospital, Rajkot.',
  'doctors': 'Meet the dentists at Patel Dental Hospital, Rajkot. Learn about their qualifications, experience and areas of treatment, and book an appointment.',
  'contact': 'Find the address, phone number and timings of Patel Dental Hospital, Rajkot. Contact us for a check-up or treatment and book an appointment.',
  'blog/dental-implants-rajkot': 'Learn what dental implants are, the treatment stages, benefits and factors that affect cost in Rajkot, in a simple guide from Patel Dental Hospital.',
  'blog/braces-vs-clear-aligners': 'Compare braces and clear aligners in Rajkot: differences, pros and cons, and how to choose the right option for your case.',
  'blog/maintain-white-teeth-after-whitening': 'Simple tips on food habits, brushing and care to help your teeth stay bright for longer after teeth whitening, from Patel Dental Hospital.'
};

const guRoutes: RouteDef[] = baseRoutes.map(r => ({ ...r, language: 'gu' as const }));
const enRoutes: RouteDef[] = baseRoutes.map(r => {
  const pageId = r.pageId;
  const path = r.path === '/' ? '/en' : `/en${r.path}`;
  const title = englishTitles[pageId];
  if (!title) {
    throw new Error(`Missing English title for pageId: "${pageId}"`);
  }
  const description = englishDescriptions[pageId];
  if (!description) {
    throw new Error(`Missing English description for pageId: "${pageId}"`);
  }
  return {
    path,
    pageId,
    title,
    description,
    keywords: '',
    language: 'en' as const
  };
});

const routes: RouteDef[] = [...guRoutes, ...enRoutes];

const ROUTE_LASTMOD: Record<string, string> = {
  'home': '2026-10-09',
  'services': '2026-10-09',
  'services/dental-implants': '2026-10-09',
  'services/invisible-aligners': '2026-10-09',
  'services/pediatric-dentistry': '2026-10-09',
  'services/braces-treatment': '2026-10-09',
  'gallery': '2026-10-09',
  'social-service': '2026-10-09',
  'technology': '2026-10-09',
  'why-choose-us': '2026-10-09',
  'international': '2026-10-09',
  'blogs': '2026-10-09',
  'doctors': '2026-10-09',
  'contact': '2026-10-09',
  'services/smile-makeover': '2026-10-09',
  'services/full-mouth-rehabilitation': '2026-10-09',
  'services/oral-submucous-fibrosis-osmf-treatment-rajkot': '2026-10-09',
  'services/crowns-bridges': '2026-10-09',
  'services/root-canal-treatment': '2026-10-09',
  'services/teeth-whitening': '2026-10-09',
  'services/wisdom-tooth-surgery': '2026-10-09',
  'services/tooth-coloured-filling': '2026-10-09',
  'blog/dental-implants-rajkot': '2026-08-08',
  'blog/braces-vs-clear-aligners': '2026-08-01',
  'blog/maintain-white-teeth-after-whitening': '2026-07-25'
};

const ROUTE_METADATA: Record<string, { changefreq: string; priority: number }> = {
  'home': { changefreq: 'weekly', priority: 1.0 },
  'services': { changefreq: 'weekly', priority: 0.9 },
  'services/dental-implants': { changefreq: 'monthly', priority: 0.9 },
  'services/invisible-aligners': { changefreq: 'monthly', priority: 0.8 },
  'services/pediatric-dentistry': { changefreq: 'monthly', priority: 0.8 },
  'services/braces-treatment': { changefreq: 'monthly', priority: 0.8 },
  'gallery': { changefreq: 'monthly', priority: 0.8 },
  'social-service': { changefreq: 'monthly', priority: 0.7 },
  'technology': { changefreq: 'monthly', priority: 0.8 },
  'why-choose-us': { changefreq: 'monthly', priority: 0.8 },
  'international': { changefreq: 'monthly', priority: 0.8 },
  'blogs': { changefreq: 'weekly', priority: 0.8 },
  'doctors': { changefreq: 'monthly', priority: 0.9 },
  'contact': { changefreq: 'monthly', priority: 0.9 },
  'services/smile-makeover': { changefreq: 'monthly', priority: 0.8 },
  'services/full-mouth-rehabilitation': { changefreq: 'monthly', priority: 0.8 },
  'services/oral-submucous-fibrosis-osmf-treatment-rajkot': { changefreq: 'monthly', priority: 0.8 },
  'services/crowns-bridges': { changefreq: 'monthly', priority: 0.8 },
  'services/root-canal-treatment': { changefreq: 'monthly', priority: 0.8 },
  'services/teeth-whitening': { changefreq: 'monthly', priority: 0.8 },
  'services/wisdom-tooth-surgery': { changefreq: 'monthly', priority: 0.8 },
  'services/tooth-coloured-filling': { changefreq: 'monthly', priority: 0.8 },
  'blog/dental-implants-rajkot': { changefreq: 'monthly', priority: 0.9 },
  'blog/braces-vs-clear-aligners': { changefreq: 'monthly', priority: 0.9 },
  'blog/maintain-white-teeth-after-whitening': { changefreq: 'monthly', priority: 0.9 }
};

function generateSitemapXml(allRoutes: RouteDef[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const r of allRoutes) {
    const lastmod = ROUTE_LASTMOD[r.pageId];
    if (!lastmod) {
      throw new Error(`Missing ROUTE_LASTMOD for pageId: "${r.pageId}"`);
    }

    const meta = ROUTE_METADATA[r.pageId] || { changefreq: 'monthly', priority: 0.7 };
    const priorityVal = r.language === 'en'
      ? Math.max(0.1, Math.round((meta.priority - 0.1) * 10) / 10)
      : meta.priority;
    const priority = priorityVal.toFixed(1);
    const changefreq = meta.changefreq;

    const basePath = r.language === 'en'
      ? (r.path.replace(/^\/en/, '') || '/')
      : r.path;
    const guUrl = `https://pdhrajkot.com${basePath === '/' ? '/' : basePath.endsWith('/') ? basePath : basePath + '/'}`;
    const enUrl = `https://pdhrajkot.com/en${basePath === '/' ? '/' : basePath.endsWith('/') ? basePath : basePath + '/'}`;
    const locUrl = r.language === 'en' ? enUrl : guUrl;

    xml += `  <url>\n`;
    xml += `    <loc>${locUrl}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="gu" href="${guUrl}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${guUrl}" />\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

function generateSchemasForRoute(route: typeof routes[number]) {
  const prefix = route.language === 'en' ? '/en' : '';
  const canonicalUrl = `https://pdhrajkot.com${route.path === '/' ? '/' : route.path === '/en' ? '/en/' : route.path.endsWith('/') ? route.path : route.path + '/'}`;
  const dentistSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "Patel Dental Hospital",
    "image": "https://pdhrajkot.com/Best%20Dntal%20Hospital%20Rajkot.PNG",
    "@id": `https://pdhrajkot.com${prefix}/#dentist`,
    "url": `https://pdhrajkot.com${prefix}/`,
    "telephone": "+919510397046",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Business Centrum Complex, 1st Floor, Opp. Kings Heights, Beside Golden Super Market, Pandit Deendayal Upadhyay Road, From Rajnagar Chowk towards Amin Marg",
      "addressLocality": "Rajkot",
      "addressRegion": "Gujarat",
      "postalCode": "360001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "22.2856",
      "longitude": "70.7912"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "13:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "16:00",
        "closes": "20:00"
      }
    ]
  };

  const schemas: any[] = [];

  // Home Page
  if (route.path === '/' || route.path === '/en') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Patel Dental Hospital",
      "url": `https://pdhrajkot.com${prefix}/`
    });
    schemas.push(dentistSchema);
  } else {
    // Breadcrumb schema
    const pathParts = route.path.split('/').filter(p => p && p !== 'en');
    const breadcrumbListElement = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://pdhrajkot.com${prefix}/`
      }
    ];

    if (pathParts.length === 1) {
      const crumbName = pathParts[0] === 'services' ? 'Services' : route.title.split('|')[0].trim();
      breadcrumbListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": crumbName,
        "item": canonicalUrl
      });
    } else if (pathParts.length === 2) {
      const parentName = pathParts[0] === 'services' ? 'Services' : pathParts[0] === 'blog' ? 'Blog' : pathParts[0];
      const parentUrl = `https://pdhrajkot.com${prefix}/${pathParts[0] === 'blog' ? 'blogs' : pathParts[0]}/`;
      breadcrumbListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": parentName,
        "item": parentUrl
      });
      breadcrumbListElement.push({
        "@type": "ListItem",
        "position": 3,
        "name": route.title.split('|')[0].trim(),
        "item": canonicalUrl
      });
    }

    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbListElement
    });

    // Page Specific Schema
    if (route.path === '/services' || route.path === '/en/services') {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        "name": "Patel Dental Hospital Services",
        "url": `https://pdhrajkot.com${prefix}/services/`,
        "@id": `https://pdhrajkot.com${prefix}/#dentist`,
        "telephone": "+919510397046",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Business Centrum Complex, 1st Floor, Opp. Kings Heights, Beside Golden Super Market, Pandit Deendayal Upadhyay Road, From Rajnagar Chowk towards Amin Marg",
          "addressLocality": "Rajkot",
          "addressRegion": "Gujarat",
          "postalCode": "360001",
          "addressCountry": "IN"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "All Dental Services & Treatments",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "MedicalSpecialty", "name": "Dental Implants", "url": `https://pdhrajkot.com${prefix}/services/dental-implants/` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalSpecialty", "name": "Invisible Aligners", "url": `https://pdhrajkot.com${prefix}/services/invisible-aligners/` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalSpecialty", "name": "Full Mouth Rehabilitation", "url": `https://pdhrajkot.com${prefix}/services/full-mouth-rehabilitation/` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalSpecialty", "name": "Single Sitting Root Canal Treatment", "url": `https://pdhrajkot.com${prefix}/services/root-canal-treatment/` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalSpecialty", "name": "Smile Makeover", "url": `https://pdhrajkot.com${prefix}/services/smile-makeover/` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalSpecialty", "name": "Dental Crowns & Bridges", "url": `https://pdhrajkot.com${prefix}/services/crowns-bridges/` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalSpecialty", "name": "Orthodontic Braces Treatment", "url": `https://pdhrajkot.com${prefix}/services/braces-treatment/` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalSpecialty", "name": "Pediatric Dentistry", "url": `https://pdhrajkot.com${prefix}/services/pediatric-dentistry/` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalSpecialty", "name": "Professional Teeth Whitening", "url": `https://pdhrajkot.com${prefix}/services/teeth-whitening/` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalSpecialty", "name": "Painless Wisdom Tooth Surgery", "url": `https://pdhrajkot.com${prefix}/services/wisdom-tooth-surgery/` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalSpecialty", "name": "Tooth Coloured Filling", "url": `https://pdhrajkot.com${prefix}/services/tooth-coloured-filling/` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalSpecialty", "name": "Oral Submucous Fibrosis (OSMF) Treatment", "url": `https://pdhrajkot.com${prefix}/services/oral-submucous-fibrosis-osmf-treatment-rajkot/` } }
          ]
        }
      });
      schemas.push(dentistSchema);
    } else if (route.path.startsWith('/services/') || route.path.startsWith('/en/services/')) {
      // Dentist with clinical service catalog offer
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Dentist",
        "@id": `https://pdhrajkot.com${prefix}/#dentist`,
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Dental Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalSpecialty",
                "name": route.title.split('|')[0].trim(),
                "description": route.description
              }
            }
          ]
        }
      });

      // FAQ Page Schema
      let faqs: any[] = [];
      if (route.path.endsWith('/dental-implants')) {
        faqs = dentalImplantsFaqs;
      } else if (route.path.endsWith('/full-mouth-rehabilitation')) {
        faqs = fullMouthFaqs;
      } else if (route.path.endsWith('/invisible-aligners')) {
        faqs = invisibleAlignersFaqs;
      } else if (route.path.endsWith('/root-canal-treatment')) {
        faqs = rootCanalFaqs;
      } else if (route.path.endsWith('/smile-makeover')) {
        faqs = smileMakeoverFaqs;
      } else if (route.path.endsWith('/crowns-bridges')) {
        faqs = crownsBridgesFaqs;
      } else if (route.path.endsWith('/pediatric-dentistry')) {
        faqs = pediatricDentistryFaqs;
      }

      if (faqs.length > 0) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        });
      }
    } else if (route.path.startsWith('/blog/') || route.path.startsWith('/en/blog/')) {
      // Blog Article Schema
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": route.title,
        "description": route.description,
        "image": "https://pdhrajkot.com/Best%20Dntal%20Hospital%20Rajkot.PNG",
        "author": {
          "@type": "Person",
          "name": "Dr. Vipul Patel",
          "jobTitle": "Director & Chief Implantologist",
          "worksFor": {
            "@type": "Dentist",
            "name": "Patel Dental Hospital"
          }
        },
        "publisher": {
          "@type": "Organization",
          "name": "Patel Dental Hospital",
          "logo": {
            "@type": "ImageObject",
            "url": "https://pdhrajkot.com/Best%20Dntal%20Hospital%20Rajkot.PNG"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        }
      });
    } else if (route.path === '/doctors' || route.path === '/en/doctors') {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Dr. Vipul Patel",
        "jobTitle": "Chief Dental Implant Surgeon & Restorative Specialist",
        "worksFor": {
          "@type": "Dentist",
          "name": "Patel Dental Hospital"
        },
        "description": "Dr. Vipul Patel is the Director of Patel Dental Hospital, with 18+ years of clinical experience in advanced dental implants, computer guided surgeries, and full mouth rehabilitation."
      });
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Dr. Kinjal Patel",
        "jobTitle": "Pediatric Dentist & Aesthetic Consultant",
        "worksFor": {
          "@type": "Dentist",
          "name": "Patel Dental Hospital"
        },
        "description": "Dr. Kinjal Patel specializes in pediatric dentistry, child preventive care, and aesthetic smile correction procedures."
      });
    } else if (route.path === '/contact' || route.path === '/en/contact') {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Patel Dental Hospital",
        "description": "Contact information, maps, phone numbers, and appointment details for Patel Dental Hospital Rajkot."
      });
      schemas.push(dentistSchema);
    }
  }

  return schemas;
}

interface AllFetchedData {
  services: any[];
  faqs: Record<string, any[]>;
  galleries: Record<string, any[]>;
  doctors: any[];
  contactInfo: any;
  hero: any;
  mediaImages: any[];
  patientMoments: any[];
  videos: any[];
  blogs: any[];
}

/**
 * Strips all base64 data:image strings recursively so no bloated image payloads enter JSON.
 */
function sanitizeNoBase64(val: any): any {
  if (typeof val === 'string') {
    if (val.startsWith('data:image/')) {
      return '';
    }
    if (val.includes('data:image/')) {
      return val.replace(/data:image\/[^;'"\)\s]+;base64,[^'"\)\s]+/g, '/placeholder.webp');
    }
    return val;
  }
  if (Array.isArray(val)) {
    return val.map(sanitizeNoBase64);
  }
  if (val && typeof val === 'object') {
    const cleanObj: any = {};
    for (const [k, v] of Object.entries(val)) {
      cleanObj[k] = sanitizeNoBase64(v);
    }
    return cleanObj;
  }
  return val;
}

/**
 * Pre-fetches all CMS and static data from Supabase.
 * FAILS the build (exit 1) if Supabase errors out or returns empty data.
 */
async function fetchAllData(): Promise<AllFetchedData> {
  console.log('📦 Pre-fetching CMS data from Supabase (Strict Validation Mode)...');

  // Strict check: if Supabase connection errors out or fails during build, fail immediately (non-zero exit)
  try {
    const { error } = await supabase.client.from('services').select('id').limit(1);
    if (error) {
      console.error('❌ FATAL BUILD ERROR: Supabase connection query returned an error! Aborting build.', error);
      process.exit(1);
    }
  } catch (err) {
    console.error('❌ FATAL BUILD ERROR: Supabase connection query failed/timed out! Aborting build.', err);
    process.exit(1);
  }

  let services: any[] = [];
  try {
    const fetchedServices = await serviceService.getServices();
    if (!fetchedServices || !Array.isArray(fetchedServices) || fetchedServices.length === 0) {
      console.error('❌ FATAL BUILD ERROR: Supabase serviceService.getServices() returned empty data! Aborting build.');
      process.exit(1);
    }
    services = sanitizeNoBase64(fetchedServices);
    console.log(`  ✓ Loaded ${services.length} services from Supabase`);
  } catch (err) {
    console.error('❌ FATAL BUILD ERROR: Failed to fetch services from Supabase:', err);
    process.exit(1);
  }

  let doctors: any[] = [];
  try {
    doctors = await doctorService.getDoctors();
    if (!doctors || !Array.isArray(doctors) || doctors.length === 0) {
      console.error('❌ FATAL BUILD ERROR: Supabase doctorService.getDoctors() returned empty data! Aborting build.');
      process.exit(1);
    }
    // Strictly sanitize doctor images to static paths (eliminate base64)
    doctors = doctors.map(d => ({
      ...d,
      img: d.id === 'vipul' ? '/Dr. Vipul Patel.jpg' : '/Dr. Kinjal Patel.JPG'
    }));
    console.log(`  ✓ Loaded ${doctors.length} doctors from Supabase (clean static images)`);
  } catch (err) {
    console.error('❌ FATAL BUILD ERROR: Failed to fetch doctors from Supabase:', err);
    process.exit(1);
  }

  let contactInfo: any = null;
  try {
    contactInfo = await contactService.getContactInfo();
    if (!contactInfo || !contactInfo.phone) {
      console.error('❌ FATAL BUILD ERROR: Supabase contactService.getContactInfo() returned empty data! Aborting build.');
      process.exit(1);
    }
    console.log('  ✓ Loaded contact info from Supabase');
  } catch (err) {
    console.error('❌ FATAL BUILD ERROR: Failed to fetch contact info from Supabase:', err);
    process.exit(1);
  }

  let hero: any = {
    heading: "Dental Implant, Aligner &\nFMR Specialists\nin Rajkot",
    description: "Trusted smiles. Advanced care. Exceptional results.",
    bg_image: ""
  };
  try {
    const fetchedHero = await heroService.getHeroContent();
    if (fetchedHero) {
      hero = sanitizeNoBase64(fetchedHero);
      console.log('  ✓ Loaded hero content from Supabase');
    }
  } catch (err) {
    console.warn('  ⚠️ Hero content fetch warning, using default:', err);
  }

  let mediaImages: any[] = DEFAULT_MEDIA_IMAGES;
  let patientMoments: any[] = PATIENT_MOMENTS;
  try {
    const fetchedGallery = await galleryService.getGalleryData();
    if (fetchedGallery) {
      mediaImages = sanitizeNoBase64(fetchedGallery.mediaImages || DEFAULT_MEDIA_IMAGES);
      patientMoments = sanitizeNoBase64(fetchedGallery.patientMoments || PATIENT_MOMENTS);
      console.log(`  ✓ Loaded ${mediaImages.length} gallery images & ${patientMoments.length} patient moments`);
    }
  } catch (err) {
    console.warn('  ⚠️ Gallery fetch warning, using defaults:', err);
  }

  let videos: any[] = DEFAULT_VIDEOS;
  try {
    const fetchedVideos = await videoService.getVideos();
    if (fetchedVideos && fetchedVideos.length > 0) {
      videos = sanitizeNoBase64(fetchedVideos);
      console.log(`  ✓ Loaded ${videos.length} videos`);
    }
  } catch (err) {
    console.warn('  ⚠️ Video fetch warning, using defaults:', err);
  }

  const faqs: Record<string, any[]> = {};
  const galleries: Record<string, any[]> = {};
  for (const s of services) {
    try {
      const sFaqs = await serviceService.getFaqs(s.id);
      if (sFaqs && sFaqs.length > 0) {
        faqs[s.id] = sanitizeNoBase64(sFaqs);
      }
    } catch {}
    try {
      const sGallery = await serviceService.getGallery(s.id);
      if (sGallery && sGallery.length > 0) {
        galleries[s.id] = sanitizeNoBase64(sGallery);
      }
    } catch {}
  }

  let blogs: any[] = [];
  try {
    const { data: blogData } = await supabase.client
      .from('blogs')
      .select('*')
      .eq('is_published', true);
    if (blogData && Array.isArray(blogData) && blogData.length > 0) {
      blogs = sanitizeNoBase64(blogData);
      console.log(`  ✓ Loaded ${blogs.length} published blogs from Supabase`);
    }
  } catch (e) {
    // blogs table optional
  }

  return {
    services,
    faqs,
    galleries,
    doctors,
    contactInfo,
    hero,
    mediaImages,
    patientMoments,
    videos,
    blogs
  };
}

/**
 * Produces a minimal, tailored preloaded data payload for each route.
 * Includes only what that route actually renders, plus the shared set (navbar, contact).
 * Eliminates unused JSON payload bloat while maintaining 100% hydration fidelity.
 */
function getRouteSpecificPreloadedData(route: typeof routes[number], allData: AllFetchedData): any {
  // Shared data needed across all pages for Header/Navbar, Contact modal, and Footer:
  const sharedContact = {
    phone: allData.contactInfo.phone,
    phoneRaw: allData.contactInfo.phoneRaw,
    email: allData.contactInfo.email,
    address: allData.contactInfo.address,
    timing: allData.contactInfo.timing,
  };

  // Minimal lightweight services list for navbar dropdown (only ~1.2 KB)
  const navServicesList = allData.services.map(s => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    is_active: s.is_active,
    hero_image: s.hero_image,
  }));

  // Route-specific payloads, normalized by removing starting '/en' (if present) for matching:
  let cleanPath = route.path;
  if (cleanPath.startsWith('/en')) {
    cleanPath = cleanPath.substring(3);
    if (cleanPath === '') {
      cleanPath = '/';
    }
  }

  if (cleanPath === '/') {
    return {
      contactInfo: sharedContact,
      services: navServicesList,
      hero: {
        heading: allData.hero.heading,
        description: allData.hero.description,
        bg_image: allData.hero.bg_image,
      },
      doctors: allData.doctors.map(d => ({
        id: d.id,
        name: d.name,
        role: d.role,
        title: d.title,
        experience: d.experience,
        casesCount: d.casesCount,
        rating: d.rating,
        stats: d.stats,
        img: d.img,
      })),
      patientMoments: allData.patientMoments.map(m => ({
        id: m.id,
        title: m.title,
        image: m.image,
        quote: m.quote,
      })),
      videos: allData.videos.map(v => ({
        id: v.id,
        title: v.title,
        video_url: v.video_url,
        thumbnail_url: v.thumbnail_url,
      }))
    };
  }

  if (cleanPath === '/doctors') {
    return {
      contactInfo: sharedContact,
      services: navServicesList,
      doctors: allData.doctors,
    };
  }

  if (cleanPath === '/gallery') {
    return {
      contactInfo: sharedContact,
      services: navServicesList,
      mediaImages: allData.mediaImages,
      patientMoments: allData.patientMoments,
    };
  }

  if (cleanPath.startsWith('/services/')) {
    const slug = cleanPath.replace('/services/', '');
    const currentService = allData.services.find(s => s.slug === slug || s.id === slug);

    if (!currentService) {
      console.error(`❌ FATAL BUILD ERROR: Service data for "${route.path}" (clean: "${cleanPath}") is missing from Supabase! Aborting build.`);
      process.exit(1);
    }

    // Include the current service in full, plus minimal nav services for the dropdown
    const routeServices = [
      currentService,
      ...navServicesList.filter(s => s.slug !== slug && s.id !== slug)
    ];

    const payload: any = {
      contactInfo: sharedContact,
      services: routeServices,
    };

    if (allData.faqs[currentService.id]) {
      payload.faqs = { [currentService.id]: allData.faqs[currentService.id] };
    }
    if (allData.galleries[currentService.id]) {
      payload.galleries = { [currentService.id]: allData.galleries[currentService.id] };
    }

    return payload;
  }

  if (cleanPath === '/services') {
    return {
      contactInfo: sharedContact,
      services: navServicesList,
    };
  }

  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    const blog = allData.blogs.find(b => b.slug === slug);
    return {
      contactInfo: sharedContact,
      services: navServicesList,
      blog: blog || null,
    };
  }

  if (cleanPath === '/blogs') {
    return {
      contactInfo: sharedContact,
      services: navServicesList,
      blogs: allData.blogs,
    };
  }

  if (cleanPath === '/why-choose-us') {
    return {
      contactInfo: sharedContact,
      services: navServicesList,
      doctors: allData.doctors,
      patientMoments: allData.patientMoments,
    };
  }

  // All other pages (contact, sameday, technology, social-service, international)
  return {
    contactInfo: sharedContact,
    services: navServicesList,
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function prerender() {
  console.log('🏁 Starting static pre-rendering...');

  const templatePath = path.resolve(__dirname, './dist/index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('❌ FATAL BUILD ERROR: Client build (dist/index.html) was not found. Please run "vite build" first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');

  // Load the server-side render function
  const ssrBundlePath = path.resolve(__dirname, './dist-ssr/entry-server.js');
  if (!fs.existsSync(ssrBundlePath)) {
    console.error('❌ FATAL BUILD ERROR: SSR bundle (dist-ssr/entry-server.js) was not found.');
    process.exit(1);
  }

  const { render } = await import(pathToFileURL(ssrBundlePath).href);

  // 1. Fetch CMS data from Supabase with strict failure on error
  const allData = await fetchAllData();

  // 2. Dynamic route discovery for any new active services or published blogs in Supabase
  for (const s of allData.services) {
    if (s.is_active && s.slug) {
      const sPath = `/services/${s.slug}`;
      if (!routes.some(r => r.path === sPath)) {
        console.log(`  ✨ Discovered new active service from CMS (gu): ${sPath}`);
        routes.push({
          path: sPath,
          pageId: `services/${s.slug}`,
          title: `${s.title} in Rajkot | Patel Dental Hospital`,
          description: s.short_description || `Advanced ${s.title} treatment in Rajkot at Patel Dental Hospital.`,
          keywords: `${s.title} Rajkot, Patel Dental Hospital`,
          language: 'gu'
        });
      }
    }
  }

  for (const b of allData.blogs) {
    if (b.slug) {
      const bPath = `/blog/${b.slug}`;
      if (!routes.some(r => r.path === bPath)) {
        console.log(`  ✨ Discovered new published blog from CMS (gu): ${bPath}`);
        routes.push({
          path: bPath,
          pageId: `blog/${b.slug}`,
          title: `${b.title} | Patel Dental Hospital Rajkot`,
          description: b.excerpt || b.meta_description || 'Dental health article by Patel Dental Hospital specialists.',
          keywords: b.keywords || 'Dental Blog Rajkot',
          language: 'gu'
        });
      }
    }
  }

  // 3. Render each route with route-tailored preloadedData
  for (const route of routes) {
    console.log(`Rendering route: ${route.path} (pageId: ${route.pageId}, language: ${route.language})`);

    const routePreloadedData = getRouteSpecificPreloadedData(route, allData);

    // Verify no base64 images exist in the preloaded JSON
    const jsonStr = JSON.stringify(routePreloadedData);
    if (jsonStr.includes('data:image/')) {
      console.error(`❌ FATAL BUILD ERROR: Base64 image detected in preloaded JSON for route ${route.path}!`);
      process.exit(1);
    }

    try {
      // Render component to string with tailored data
      const appHtml = render(route.pageId, routePreloadedData, route.language);

      if (!appHtml || appHtml.trim() === '') {
        console.error(`❌ FATAL BUILD ERROR: Rendered HTML for route ${route.path} was completely empty!`);
        process.exit(1);
      }

      // Inject server-rendered HTML into the root div
      let html = template.replace(
        /<div id="root">[\s\S]*?<\/div>/,
        `<div id="root">${appHtml}</div>`
      );

      // Replace html lang attribute
      html = html.replace('<html lang="en">', `<html lang="${route.language}">`);

      // Inject route-specific meta tags and title
      html = html.replace(
        /<title>[\s\S]*?<\/title>/,
        `<title>${route.title}</title>`
      );

      if (html.includes('name="description"')) {
        html = html.replace(
          /<meta name="description" content="[\s\S]*?"\s*\/?>/,
          `<meta name="description" content="${escapeHtml(route.description)}" />`
        );
      } else {
        html = html.replace(
          '</head>',
          `  <meta name="description" content="${escapeHtml(route.description)}" />\n</head>`
        );
      }

      if (route.keywords) {
        if (html.includes('name="keywords"')) {
          html = html.replace(
            /<meta name="keywords" content="[\s\S]*?"\s*\/?>/,
            `<meta name="keywords" content="${escapeHtml(route.keywords)}" />`
          );
        } else {
          html = html.replace(
            '</head>',
            `  <meta name="keywords" content="${escapeHtml(route.keywords)}" />\n</head>`
          );
        }
      } else {
        if (html.includes('name="keywords"')) {
          html = html.replace(
            /<meta name="keywords" content="[\s\S]*?"\s*\/?>\n?/,
            ''
          );
        }
      }

      html = html.replace(
        /<meta property="og:title" content="[\s\S]*?"\s*\/?>/,
        `<meta property="og:title" content="${escapeHtml(route.title)}" />`
      );
      html = html.replace(
        /<meta property="og:description" content="[\s\S]*?"\s*\/?>/,
        `<meta property="og:description" content="${escapeHtml(route.description)}" />`
      );

      // Canonical Tag, Hreflang Tags, Locale Tag and Schema JSON-LD blocks
      const canonicalUrl = `https://pdhrajkot.com${route.path === '/' ? '/' : route.path === '/en' ? '/en/' : route.path.endsWith('/') ? route.path : route.path + '/'}`;
      const localeVal = route.language === 'en' ? 'en_US' : 'gu_IN';

      const basePath = route.language === 'en'
        ? (route.path.replace(/^\/en/, '') || '/')
        : route.path;
      const guUrl = `https://pdhrajkot.com${basePath === '/' ? '/' : basePath.endsWith('/') ? basePath : basePath + '/'}`;
      const enUrl = `https://pdhrajkot.com/en${basePath === '/' ? '/' : basePath.endsWith('/') ? basePath : basePath + '/'}`;

      let headInjections = `\n  <link rel="canonical" href="${canonicalUrl}" />\n  <link rel="alternate" hreflang="gu" href="${guUrl}" />\n  <link rel="alternate" hreflang="en" href="${enUrl}" />\n  <link rel="alternate" hreflang="x-default" href="${guUrl}" />\n  <meta property="og:locale" content="${localeVal}" />\n`;

      const schemas = generateSchemasForRoute(route);
      for (const s of schemas) {
        headInjections += `  <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n  </script>\n`;
      }

      html = html.replace('</head>', `${headInjections}</head>`);

      // Inject minimal, route-specific __PRELOADED_DATA__ JSON script before </body>
      const preloadedScriptTag = `<script id="__PRELOADED_DATA__" type="application/json">${jsonStr.replace(/</g, '\\u003c')}</script>`;
      html = html.replace('</body>', `  ${preloadedScriptTag}\n</body>`);

      // STRICT VALIDATION 1: Ensure exactly ONE <h1> tag exists and has text content
      const allH1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m =>
        m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
      );

      if (allH1Matches.length !== 1) {
        console.error(`❌ FATAL BUILD ERROR: Route "${route.path}" rendered with ${allH1Matches.length} <h1> tags (expected exactly 1)! H1 tags found:`, allH1Matches);
        process.exit(1);
      }

      const h1Text = allH1Matches[0];
      if (!h1Text) {
        console.error(`❌ FATAL BUILD ERROR: Route "${route.path}" rendered with empty <h1>! Build aborted.`);
        process.exit(1);
      }

      // STRICT VALIDATION 2: Ensure <h1> is not a generic label
      const genericH1Patterns = [
        /^read article\.?$/i,
        /^લેખ વાંચો\.?$/i,
        /^read more\.?$/i,
        /^વધુ વાંચો\.?$/i,
        /^article\.?$/i,
        /^blog post\.?$/i
      ];
      if (genericH1Patterns.some(pattern => pattern.test(h1Text))) {
        console.error(`❌ FATAL BUILD ERROR: Route "${route.path}" has a generic <h1> label ("${h1Text}")! Must be specific content/article title. Build aborted.`);
        process.exit(1);
      }

      // STRICT VALIDATION 3: For blog articles, ensure full body text is >= 1000 characters and date/meta are present
      if (route.path.startsWith('/blog/') || route.path.startsWith('/en/blog/')) {
        const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
        const articleHtml = articleMatch ? articleMatch[1] : '';
        const articleText = articleHtml.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        
        if (articleText.length < 1000) {
          console.error(`❌ FATAL BUILD ERROR: Blog post "${route.path}" body text is only ${articleText.length} characters (must be >= 1000 characters)! Build aborted.`);
          process.exit(1);
        }

        // Verify date exists in HTML (any year starting with 20xx)
        if (!/\b20\d{2}\b/.test(html)) {
          console.error(`❌ FATAL BUILD ERROR: Blog post "${route.path}" is missing publication date in HTML! Build aborted.`);
          process.exit(1);
        }

        // Verify meta description
        const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
        if (!metaDescMatch || !metaDescMatch[1] || metaDescMatch[1].trim().length < 20) {
          console.error(`❌ FATAL BUILD ERROR: Blog post "${route.path}" missing valid meta description! Build aborted.`);
          process.exit(1);
        }
      }

      // STRICT VALIDATION 4: Ensure dental-implants contains "16000" text
      if (route.path === '/services/dental-implants' || route.path === '/en/services/dental-implants') {
        if (!html.includes('16000') && !html.includes('16,000')) {
          console.error(`❌ FATAL BUILD ERROR: Route "${route.path}" does not contain "16000" text! Build aborted.`);
          process.exit(1);
        }
      }

      // STRICT VALIDATION 5: Minimum HTML size check
      if (html.length < 5000) {
        console.error(`❌ FATAL BUILD ERROR: Route "${route.path}" HTML is suspiciously small (${html.length} bytes)! Build aborted.`);
        process.exit(1);
      }

      // Output file path
      let outputDir = path.resolve(__dirname, './dist');
      let outputPath = '';

      if (route.path === '/') {
        outputPath = path.join(outputDir, 'index.html');
      } else {
        outputDir = path.join(outputDir, route.path.substring(1));
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        outputPath = path.join(outputDir, 'index.html');
      }

      // Indentation & whitespace optimization to drastically reduce uncompressed HTML size under 150 KB
      const optimizedHtml = html
        .replace(/>\r?\n\s*</g, '><') // Collapse tags on newlines
        .replace(/^[ \t]+/gm, '')      // Strip leading whitespace
        .replace(/[ \t]+$/gm, '')      // Strip trailing whitespace
        .replace(/\r?\n+/g, '\n');     // Collapse extra empty lines

      fs.writeFileSync(outputPath, optimizedHtml, 'utf-8');
      const sizeKb = Math.round(optimizedHtml.length / 1024);
      console.log(`✅ Pre-rendered: ${outputPath} (${sizeKb} KB, embedded data: ${Math.round(jsonStr.length / 1024)} KB, h1: "${h1Text.slice(0, 40)}...")`);
    } catch (routeErr) {
      console.error(`❌ FATAL BUILD ERROR: Failed rendering route ${route.path}:`, routeErr);
      process.exit(1);
    }
  }

function generate404Html(): string {
  return `<!doctype html>
<html lang="gu">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>404 - પેજ મળ્યું નથી | Page Not Found | Patel Dental Hospital</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Noto+Sans+Gujarati:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      background: #F8FAFC;
      color: #0F172A;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      text-align: center;
    }
    .card {
      background: #FFFFFF;
      max-width: 580px;
      width: 100%;
      border-radius: 24px;
      padding: 2.5rem 2rem;
      box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.8);
    }
    .badge {
      display: inline-block;
      background: #EFF6FF;
      color: #0284C7;
      font-size: 0.875rem;
      font-weight: 700;
      padding: 0.35rem 1rem;
      border-radius: 9999px;
      margin-bottom: 1.25rem;
      letter-spacing: 0.05em;
    }
    .code {
      font-size: 4rem;
      line-height: 1;
      font-weight: 800;
      color: #0284C7;
      margin-bottom: 0.75rem;
      letter-spacing: -0.03em;
    }
    h1 {
      font-family: 'Noto Sans Gujarati', 'Plus Jakarta Sans', sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      color: #0F172A;
      margin-bottom: 0.5rem;
    }
    h2 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #475569;
      margin-bottom: 1.25rem;
    }
    p {
      color: #64748B;
      font-size: 0.9375rem;
      line-height: 1.6;
      margin-bottom: 0.75rem;
    }
    p.gujarati {
      font-family: 'Noto Sans Gujarati', sans-serif;
    }
    .buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: center;
      margin: 2rem 0 1.75rem 0;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.5rem;
      font-size: 0.9375rem;
      font-weight: 600;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .btn-primary {
      background: #0284C7;
      color: #FFFFFF;
      box-shadow: 0 4px 14px rgba(2, 132, 199, 0.25);
    }
    .btn-primary:hover {
      background: #0369A1;
    }
    .btn-secondary {
      background: #F1F5F9;
      color: #334155;
    }
    .btn-secondary:hover {
      background: #E2E8F0;
    }
    .contact-box {
      border-top: 1px solid #E2E8F0;
      padding-top: 1.5rem;
      margin-top: 1rem;
      font-size: 0.875rem;
      color: #64748B;
    }
    .contact-link {
      color: #0284C7;
      font-weight: 700;
      text-decoration: none;
    }
    .contact-link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">PATEL DENTAL HOSPITAL</div>
    <div class="code">404</div>
    <h1>પેજ મળ્યું નથી</h1>
    <h2>Page Not Found</h2>
    <p class="gujarati">તમે જે પેજ શોધી રહ્યા છો તે અસ્તિત્વમાં નથી અથવા તેનું સરનામું બદલાઈ ગયું છે.</p>
    <p>The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.</p>
    <div class="buttons">
      <a href="/" class="btn btn-primary">મુખ્ય પૃષ્ઠ (Gujarati Home)</a>
      <a href="/en/" class="btn btn-secondary">Home (English)</a>
    </div>
    <div class="contact-box">
      કોઈ સહાયતા માટે ફોન કરો / For assistance call:<br />
      <a href="tel:+919510397046" class="contact-link">+91 95103 97046</a>
    </div>
  </div>
</body>
</html>`;
}

  // Generate and write complete sitemap.xml with 50 URLs and hreflang pairs
  const sitemapXml = generateSitemapXml(routes);
  const sitemapDistPath = path.resolve(__dirname, './dist/sitemap.xml');
  fs.writeFileSync(sitemapDistPath, sitemapXml, 'utf-8');
  console.log(`✅ Generated sitemap: ${sitemapDistPath} (${routes.length} URLs with hreflang pairs)`);

  // Generate and write standalone dist/404.html (without JS bundle, with noindex)
  const notFoundHtml = generate404Html();
  const notFoundDistPath = path.resolve(__dirname, './dist/404.html');
  fs.writeFileSync(notFoundDistPath, notFoundHtml, 'utf-8');
  console.log(`✅ Generated standalone 404 page: ${notFoundDistPath} (${Math.round(notFoundHtml.length / 1024)} KB)`);

  console.log('🎉 Static pre-rendering completed successfully!');
  process.exit(0);
}

prerender().catch((err) => {
  console.error('❌ Prerender script crashed:', err);
  process.exit(1);
});
