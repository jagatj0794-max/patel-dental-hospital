/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, 
  Award, 
  DollarSign, 
  Check, 
  Calendar, 
  ArrowRight, 
  FileText, 
  Globe2, 
  ShieldCheck, 
  Star,
  Activity,
  Heart,
  Sparkles,
  Wallet,
  Shield,
  Video,
  Clipboard,
  Smile,
  Compass,
  X,
  Maximize2,
  MapPin,
  ChevronDown,
  HelpCircle,
  Play,
  Upload,
  Calculator,
  ClipboardCheck,
  Microscope,
  Stethoscope,
  Clock,
  HeartHandshake,
  Crown,
  Layers,
  MessageSquare
} from 'lucide-react';
import { useSEO } from '../utils/seo';
import { internationalPatientsService } from '../utils/internationalPatientsData';
import { beforeAfterService } from '../utils/beforeAfterData';
import { InternationalPatientImage, DentalVideo, BeforeAfterEntry, Service } from '../types';
import { GooglePatientReviews } from '../components/GooglePatientReviews';
import { UNIVERSAL_GOOGLE_REVIEWS, serviceService } from '../utils/serviceData';
import { InstagramEmbed } from '../components/InstagramEmbed';
import { Mp4ReelPlayer } from '../components/Mp4ReelPlayer';
import { videoService } from '../utils/videoData';
import { BeforeAfterSlider as ServiceBeforeAfterSlider } from '../components/BeforeAfterSlider';

const gujaratDestinations = [
  {
    name: "સ્ટેચ્યુ ઓફ યુનિટી",
    description: "વિશ્વની સૌથી ઊંચી પ્રતિમા અને ભારતનું પ્રસિદ્ધ ઐતિહાસિક સ્થળ.",
    image: "/1730717115_Statue_of_Unity.jpg",
    location: "કેવડિયા"
  },
  {
    name: "કચ્છનું રણ",
    description: "ગુજરાતના પ્રસિદ્ધ સફેદ રણનો અનુભવ કરો.",
    image: "/Great Rann Of Kutch (14).jpg",
    location: "કચ્છ"
  },
  {
    name: "ગીર નેશનલ પાર્ક",
    description: "દુર્લભ એશિયાટિક સિંહોનું ઘર.",
    image: "/Gir-National-Park-and-Santuary.jpg",
    location: "ગીર ફોરેસ્ટ"
  },
  {
    name: "સોમનાથ મંદિર",
    description: "ભારતના સૌથી પવિત્ર જ્યોતિર્લિંગોમાંનું એક.",
    image: "/1888537-somnath-temple-jyotirlinga-sardar-patel-narendra-modi-ghazni-invasion-temple-reconstruction.jpg",
    location: "સોમનાથ"
  },
  {
    name: "દ્વારકાધીશ મંદિર",
    description: "અરબી સમુદ્રના કિનારે આવેલું પ્રાચીન કૃષ્ણ મંદિર.",
    image: "/Gujarat-Dwarkadhish-Temple.jpg",
    location: "દ્વારકા"
  },
  {
    name: "માંડવી બીચ",
    description: "ગુજરાતના સુંદર દરિયાકિનારે આરામનો આનંદ માણો.",
    image: "/mandvi1.jpg",
    location: "માંડવી"
  }
];

const dentalTourismFaqs = [
  {
    id: 1,
    question: "શું ભારતમાં દાંતની સારવાર સુરક્ષિત છે?",
    answer: "Patel Dental Hospitalમાં અમે કડક આંતરરાષ્ટ્રીય સ્ટેરિલાઇઝેશન પ્રોટોકોલનું પાલન કરીએ છીએ, અદ્યતન ડેન્ટલ ટેક્નોલોજીનો ઉપયોગ કરીએ છીએ અને અત્યંત અનુભવી તથા પ્રમાણિત ક્લિનિશિયન્સની ટીમ સાથે સારવાર કરીએ છીએ. કોઈપણ તબીબી પ્રક્રિયા સામાન્ય ક્લિનિકલ જોખમોથી સંપૂર્ણપણે મુક્ત હોતી નથી, પરંતુ દર્દીની સુરક્ષાને પ્રાથમિકતા આપીને જટિલતાઓને ઘટાડવા માટે અમે વૈશ્વિક ગુણવત્તા ધોરણોનું પાલન કરીએ છીએ."
  },
  {
    id: 2,
    question: "મારા દેશની સરખામણીમાં હું કેટલો ખર્ચ બચાવી શકું?",
    answer: "ઘણા આંતરરાષ્ટ્રીય દર્દીઓને લાગે છે કે ઓછા ઓપરેશનલ અને મજૂરી ખર્ચને કારણે પશ્ચિમી દેશોની સરખામણીમાં ભારતમાં ડેન્ટલ સારવાર વધુ ખર્ચ-અસરકારક છે. જોકે, ચોક્કસ બચત તમારી ચોક્કસ સારવાર પ્રક્રિયા, પસંદ કરેલી સામગ્રી અને વ્યક્તિગત ક્લિનિકલ જરૂરિયાતો પર આધારિત હોય છે. પારદર્શક સારવાર ખર્ચના અંદાજ માટે કૃપા કરીને અમારી ટીમનો સંપર્ક કરો."
  },
  {
    id: 3,
    question: "શું હું મુસાફરી પહેલાં સારવારના ખર્ચનો અંદાજ મેળવી શકું?",
    answer: "હા. WhatsApp અથવા ઈમેલ દ્વારા તમારા તાજેતરના ડિજિટલ X-rays, CBCT સ્કેન અથવા ક્લિનિકલ ફોટોગ્રાફ્સ શેર કરીને અમારી ટીમ તમારા કેસની સમીક્ષા કરી શકે છે અને તમારી મુસાફરી પહેલાં વ્યાપક, પારદર્શક સારવાર યોજના તથા અંદાજિત ખર્ચ આપી શકે છે."
  },
  {
    id: 4,
    question: "શું હું વિડિયો કન્સલ્ટેશન મેળવી શકું?",
    answer: "હા, અમે વર્ચ્યુઅલ અથવા વિડિયો કન્સલ્ટેશનની વ્યવસ્થા કરી શકીએ છીએ. તેનાથી તમે અમારી નિષ્ણાત ટીમ સાથે તમારી દાંતની સમસ્યાઓ વિશે સીધી ચર્ચા કરી શકો છો, પ્રશ્નો પૂછી શકો છો અને મુસાફરીની યોજના બનાવતા પહેલાં તમારી સારવારના વિકલ્પોને સમજી શકો છો."
  },
  {
    id: 5,
    question: "મારે કેટલા દિવસ રોકાવું પડશે?",
    answer: "તમારો રોકાણનો સમય તમારી સારવાર પ્રક્રિયાની જટિલતા પર આધારિત છે. સામાન્ય સારવાર પ્રક્રિયાઓ માટે થોડા દિવસો જરૂરી હોય છે, જ્યારે સંપૂર્ણ મોઢાની સારવારનું આયોજન અગાઉથી વિગતવાર કરવામાં આવે છે. તમારા કેસને અનુરૂપ કસ્ટમ શેડ્યૂલ માટે કૃપા કરીને અમારી ટીમનો સંપર્ક કરો."
  },
  {
    id: 6,
    question: "શું જટિલ ઇમ્પ્લાન્ટ સારવાર એક જ મુસાફરી દરમિયાન પૂર્ણ થઈ શકે છે?",
    answer: "કેટલાક કેસમાં ઇમિડિયેટ લોડિંગ ઇમ્પ્લાન્ટ શક્ય હોય છે, પરંતુ જટિલ ઇમ્પ્લાન્ટ પ્રક્રિયાઓમાં સામાન્ય રીતે બે તબક્કાની જરૂર પડે છે, જેથી મુલાકાતો વચ્ચે હાડકાંને યોગ્ય રીતે સાજા થવા માટે (osseointegration) સમય મળી શકે. તમારા કેસ માટે વિગતવાર સારવાર સમયરેખા મેળવવા માટે કૃપા કરીને તમારા ડાયગ્નોસ્ટિક રિપોર્ટ્સ અમારી ક્લિનિકલ ટીમ સાથે શેર કરો."
  },
  {
    id: 7,
    question: "શું મુસાફરી પહેલાં મારે CBCT સ્કેન કરાવવું જરૂરી છે?",
    answer: "જો તમારી પાસે તાજેતરનું 3D CBCT સ્કેન અથવા OPG X-ray હોય તો તે ઉપયોગી રહેશે, કારણ કે તે અમારી ટીમને વધુ સચોટ પ્રારંભિક મૂલ્યાંકન કરવામાં મદદ કરે છે. જો તમારી પાસે તે ન હોય, તો અમારી હોસ્પિટલમાં તમારા આગમન બાદ તરત જ અદ્યતન 3D ઇમેજિંગની વ્યવસ્થા કરી શકાય છે."
  },
  {
    id: 8,
    question: "જો ઘરે પરત ફર્યા પછી મને સારવારની જરૂર પડે તો શું થશે?",
    answer: "અમે વ્યાપક ફોલો-અપ માર્ગદર્શન અને સારવાર પછીના દસ્તાવેજો પ્રદાન કરીએ છીએ. ઘરે પરત ફર્યા પછી જો તમને રૂબરૂ સારવાર અથવા કોઈ એડજસ્ટમેન્ટની જરૂર પડે, તો કૃપા કરીને અમારા આંતરરાષ્ટ્રીય કોઓર્ડિનેટરનો સંપર્ક કરો. ત્યારબાદ અમે તમને આગળના પગલાં માટે માર્ગદર્શન આપીશું અથવા ક્લિનિકલ રીતે યોગ્ય હોય ત્યાં સ્થાનિક ક્લિનિશિયન સાથે સહકાર કરીશું."
  },
  {
    id: 9,
    question: "શું મારા પરિવારનો કોઈ સભ્ય મારી સાથે આવી શકે છે?",
    answer: "હા, પરિવારના સભ્યો તમારી સાથે આવી શકે છે. તમારી મુલાકાત દરમિયાન તમારા અને તમારા સાથી બંને માટે અનુકૂળ હોય તેવી નજીકની હોટેલ્સ અને સ્થાનિક મુસાફરીની વ્યવસ્થાની ભલામણ અમે કરી શકીએ છીએ."
  },
  {
    id: 10,
    question: "હું સારવાર માટે ચુકવણી કેવી રીતે કરી શકું?",
    answer: "આંતરરાષ્ટ્રીય દર્દીઓ માટે અમે વિવિધ સુરક્ષિત ચુકવણી વિકલ્પો ઉપલબ્ધ કરીએ છીએ. તમારા દેશ માટે યોગ્ય સ્વીકાર્ય પદ્ધતિઓ, ટ્રાન્સફર માર્ગદર્શિકા અને સુરક્ષિત વિકલ્પો વિશે જાણવા માટે કૃપા કરીને અમારા આંતરરાષ્ટ્રીય પેશન્ટ કોઓર્ડિનેટરનો સંપર્ક કરો."
  },
  {
    id: 11,
    question: "શું તમે આંતરરાષ્ટ્રીય દર્દીઓને રહેવાની વ્યવસ્થા માટે મદદ કરો છો?",
    answer: "હા. અમારી આંતરરાષ્ટ્રીય પેશન્ટ ટીમ તમારા બજેટ અને રોકાણના સમયગાળાને અનુરૂપ નજીકની પાર્ટનર હોટેલ્સ અને ગેસ્ટ હાઉસની ભલામણ કરી શકે છે. સ્થાનિક રહેવાની વ્યવસ્થા અંગે સૂચનો અને મદદ માટે કૃપા કરીને અમારી ટીમનો સંપર્ક કરો."
  },
  {
    id: 12,
    question: "જો મારી સારવાર માટે વધુ મુલાકાતોની જરૂર પડે તો શું થશે?",
    answer: "અમે અગાઉથી ચોક્કસ સારવાર યોજના તૈયાર કરવા માટે સંપૂર્ણ પ્રયત્ન કરીએ છીએ, પરંતુ કેટલીકવાર ક્લિનિકલ જરૂરિયાતોમાં ફેરફાર થઈ શકે છે. જો વધારાની મુલાકાતો અથવા એડજસ્ટમેન્ટની જરૂર પડે, તો અમારા કોઓર્ડિનેટર તમારા શેડ્યૂલ અને એપોઇન્ટમેન્ટમાં તે મુજબ ફેરફાર કરવામાં તમારી મદદ કરશે."
  }
];

const internationalTreatments = [
  {
    id: "implants-srv",
    slug: "dental-implants",
    title: "ડેન્ટલ ઇમ્પ્લાન્ટ",
    description: "ખોવાયેલા દાંતને કુદરતી દેખાવ અને કાર્યક્ષમતા ધરાવતા દાંતથી બદલો.",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    route: "services/dental-implants"
  },
  {
    id: "smile-srv",
    slug: "smile-makeover",
    title: "સ્માઇલ મેકઓવર",
    description: "વ્યક્તિગત કોસ્મેટિક ડેન્ટિસ્ટ્રી દ્વારા તમારા સ્માઇલના દેખાવમાં પરિવર્તન લાવો.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
    route: "services/smile-makeover"
  },
  {
    id: "fmr-srv",
    slug: "full-mouth-rehabilitation",
    title: "ફુલ માઉથ રિહેબિલિટેશન",
    description: "ગંભીર રીતે નુકસાન પામેલા, ઘસાઈ ગયેલા અથવા ખોવાયેલા દાંત માટે સંપૂર્ણ પુનઃનિર્માણ સારવાર.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    route: "services/full-mouth-rehabilitation"
  },
  {
    id: "crowns",
    slug: "crowns-and-bridges",
    title: "ક્રાઉન્સ અને બ્રિજિસ",
    description: "મેટલ-ફ્રી, પ્રીમિયમ ઝિર્કોનિયા રિસ્ટોરેશન દ્વારા નુકસાન પામેલા અથવા ખોવાયેલા દાંતને પુનઃસ્થાપિત કરો.",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800",
    route: "services/crowns-and-bridges"
  },
  {
    id: "rct",
    slug: "root-canal-treatment",
    title: "સિંગલ સિટિંગ રૂટ કેનાલ સારવાર",
    description: "આરામદાયક અને એક જ મુલાકાતમાં થતી રૂટ કેનાલ સારવાર દ્વારા ચેપગ્રસ્ત દાંતને બચાવો અને દુખાવો દૂર કરો.",
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800",
    route: "services/root-canal-treatment"
  },
  {
    id: "aligners-srv",
    slug: "invisible-aligners",
    title: "ઇનવિઝિબલ એલાઇનર્સ",
    description: "કસ્ટમ, લગભગ અદૃશ્ય એલાઇનર્સ દ્વારા આરામદાયક અને સરળતાથી દૃશ્યમાન ન થાય તે રીતે તમારા દાંતને સીધા કરો.",
    image: "https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=800",
    route: "services/invisible-aligners"
  },
  {
    id: "kids",
    slug: "pediatric-dentistry",
    title: "બાળકો માટેની ડેન્ટિસ્ટ્રી",
    description: "આજીવન સ્વસ્થ સ્માઇલ માટે પ્રેમાળ, હૂંફાળું અને અત્યંત કાળજીભર્યું બાળકોનું ડેન્ટલ કેર.",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    route: "services/pediatric-dentistry"
  },
  {
    id: "whitening-srv",
    slug: "teeth-whitening",
    title: "દાંત સફેદ કરવાની સારવાર",
    description: "અમારી સલામત, ઝડપી અને અત્યંત અસરકારક દાંત સફેદ કરવાની પ્રક્રિયાઓ દ્વારા તમારા સ્માઇલને વધુ ચમકદાર બનાવો.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    route: "services/teeth-whitening"
  },
  {
    id: "braces-srv",
    slug: "braces-treatment",
    title: "બ્રેસિસ સારવાર",
    description: "ટકાઉ સિરામિક, મેટલ અથવા સેલ્ફ-લિગેટિંગ બ્રેકેટ સિસ્ટમનો ઉપયોગ કરીને પરંપરાગત ઓર્થોડોન્ટિક સારવાર.",
    image: "https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=800",
    route: "services/braces-treatment"
  },
  {
    id: "wisdom-srv",
    slug: "wisdom-tooth-surgery",
    title: "અક્કલ દાંતની સર્જરી",
    description: "અટવાયેલા અથવા દુખાવાવાળા અક્કલ દાંતને સુરક્ષિત અને દુખાવા વગર સર્જરી દ્વારા દૂર કરવાની સારવાર.",
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800",
    route: "services/wisdom-tooth-surgery"
  },
  {
    id: "filling-srv",
    slug: "tooth-coloured-filling",
    title: "દાંતના રંગનું ફિલિંગ (કમ્પોઝિટ ફિલિંગ)",
    description: "કુદરતી દેખાવ ધરાવતા, મેટલ-ફ્રી કમ્પોઝિટ ફિલિંગ દ્વારા સડી ગયેલા અથવા નુકસાન પામેલા દાંતને સુંદર રીતે પુનઃસ્થાપિત કરો.",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800",
    route: "services/tooth-coloured-filling"
  }
];

const beforeAfterCases = [
  {
    title: "ડેન્ટલ ઇમ્પ્લાન્ટ્સ",
    beforeImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "સ્માઇલ મેકઓવર",
    beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "ફુલ-માઉથ રિહેબિલિટેશન",
    beforeImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "ક્રાઉન્સ અને બ્રિજિસ",
    beforeImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "રૂટ કેનાલ સારવાર",
    beforeImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "એલાઇનર્સ અને ઓર્થોડોન્ટિક્સ",
    beforeImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800"
  }
];

function BeforeAfterSlider({ beforeImage, afterImage, title, idx }: { beforeImage: string; afterImage: string; title: string; idx: number; key?: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      className="w-full bg-transparent flex flex-col items-center justify-center group"
    >
      <div className="w-full max-w-[480px] mx-auto">
        {/* Treatment Name clearly centered above the slider */}
        <h3 className="font-sans font-extrabold text-[#0B1D3A] text-[20px] sm:text-[22px] leading-tight text-center mb-5 tracking-tight">
          {title}
        </h3>

        {/* Reusing the exact Service Detail BeforeAfterSlider component with strict 16:9 aspect ratio */}
        <ServiceBeforeAfterSlider
          beforeImage={beforeImage}
          afterImage={afterImage}
          aspectRatio="aspect-[16/9]"
          beforeLabel="પહેલાં"
          afterLabel="પછી"
        />
      </div>
    </motion.div>
  );
}

interface DentalTourismProps {
  openAppointmentModal: (preselectedTreatment?: string) => void;
  setCurrentPage?: (page: any) => void;
}

export default function DentalTourismGujarati({ openAppointmentModal, setCurrentPage }: DentalTourismProps) {
  useSEO({
    title: 'Dental Tourism in India | Save 70% | Patel Dental Hospital',
    description: 'Experience world-class dental care at Patel Dental Hospital, Rajkot. Save significantly on treatments while receiving advanced technology, experienced dentists, and complete assistance for your dental journey in India.',
    keywords: 'Dental Tourism India, International Patients Dental, Cheap Dental Implants India, Patel Dental Hospital Rajkot, Affordable Dentistry, Travel Dental'
  });

  const [galleryPatients, setGalleryPatients] = React.useState<InternationalPatientImage[]>([]);
  const [beforeAfterList, setBeforeAfterList] = React.useState<BeforeAfterEntry[]>([]);
  const [selectedPatient, setSelectedPatient] = React.useState<InternationalPatientImage | null>(null);
  const [expandedFaqId, setExpandedFaqId] = React.useState<number | null>(null);
  const [tourismVideos, setTourismVideos] = React.useState<DentalVideo[]>([]);
  const [activeVideos, setActiveVideos] = React.useState<Record<string, boolean>>({});
  const [isVideoSectionEnabled, setIsVideoSectionEnabled] = React.useState<boolean>(true);
  const [dbServices, setDbServices] = React.useState<Service[]>([]);

  React.useEffect(() => {
    let active = true;
    serviceService.getServices().then(res => {
      if (res && active) {
        setDbServices(res);
      }
    }).catch(err => {
      console.error("Error loading services for dental tourism page:", err);
    });
    return () => {
      active = false;
    };
  }, []);

  const getCardData = (defaultSlug: string, defaultTitle: string, defaultImage: string, id?: string) => {
    const lookupSlugs = [
      defaultSlug,
      defaultSlug.replace(/-and-/g, '-'),
      defaultSlug.replace(/-bridges/g, '-bridges'),
      defaultSlug === 'invisible-aligners' ? 'clear-aligners' : null,
      defaultSlug === 'pediatric-dentistry' ? 'kids-dentistry' : null,
      defaultSlug === 'tooth-coloured-filling' ? 'tooth-coloured-filling' : null,
      defaultSlug === 'wisdom-tooth-surgery' ? 'wisdom-tooth-surgery' : null,
    ].filter(Boolean) as string[];

    const dbSvc = dbServices.find(s => 
      (id && s.id === id) ||
      lookupSlugs.includes(s.slug) || 
      s.title.toLowerCase() === defaultTitle.toLowerCase()
    );

    return {
      title: defaultTitle,
      image: dbSvc?.homepage_card_image || dbSvc?.hero_image || defaultImage,
    };
  };

  React.useEffect(() => {
    let active = true;
    const fetchBeforeAfter = async () => {
      try {
        const data = await beforeAfterService.getBeforeAfterEntries();
        if (active) {
          // Filter only active ones for frontend and sort them by display_order
          const sorted = (data || [])
            .filter(item => item.is_active !== false)
            .sort((a, b) => {
              const orderA = a.display_order !== undefined ? a.display_order : 99999;
              const orderB = b.display_order !== undefined ? b.display_order : 99999;
              return orderA - orderB;
            });
          setBeforeAfterList(sorted);
        }
      } catch (err) {
        console.error('Error fetching before/after entries:', err);
      }
    };
    fetchBeforeAfter();
    return () => {
      active = false;
    };
  }, []);

  React.useEffect(() => {
    let active = true;
    const fetchVideos = async () => {
      try {
        const enabled = await videoService.getDentalTourismVideoEnabled();
        const dbVideos = await videoService.getVideos();
        if (active) {
          setIsVideoSectionEnabled(enabled);
          const filtered = (dbVideos || []).filter(
            (v) => v.treatment === 'Dental Tourism' || v.treatment?.toLowerCase() === 'dental tourism'
          );
          setTourismVideos(filtered);
        }
      } catch (err) {
        console.error('Error fetching dental tourism videos:', err);
      }
    };
    fetchVideos();
    return () => {
      active = false;
    };
  }, []);

  React.useEffect(() => {
    let active = true;
    const fetchPatients = async () => {
      try {
        const data = await internationalPatientsService.getInternationalPatients();
        if (active) {
          // Filter only active ones for frontend and sort them by display_order
          const sorted = (data || [])
            .filter(p => p.is_active !== false)
            .sort((a, b) => {
              const orderA = a.display_order !== undefined ? a.display_order : 99999;
              const orderB = b.display_order !== undefined ? b.display_order : 99999;
              return orderA - orderB;
            });
          setGalleryPatients(sorted);
        }
      } catch (err) {
        console.error('Error fetching international patients gallery:', err);
      }
    };
    fetchPatients();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div id="dental-tourism-page-view" className="bg-[#FAFAFC] min-h-screen gujarati-text">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-[110px] sm:pt-[130px] lg:pt-[160px] pb-10 lg:pb-16 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Desktop Hero Layout: Visible only on screens lg and up */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-7 flex flex-col space-y-7 text-left">
              <div className="space-y-4">
                {/* Brand Eyebrow */}
                <div className="text-xs sm:text-sm font-extrabold text-[#1E3A5F] tracking-wide font-sans lg:whitespace-nowrap">
                  પ્રીમિયમ ડેન્ટલ કેર. વ્યક્તિગત સારવાર. શ્રેષ્ઠ મૂલ્ય.
                </div>

                {/* Hero Main Heading */}
                <h1 className="font-display tracking-tight text-[#0CC2DA] leading-tight">
                  <span 
                    style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.12)' }}
                    className="block text-3xl sm:text-4xl lg:text-[32px] xl:text-[40px] 2xl:text-[46px] font-black tracking-tight lg:whitespace-nowrap"
                  >
                    ભારતમાં તમારા સ્મિતમાં પરિવર્તન લાવો.
                  </span>
                </h1>

                {/* Supporting Description */}
                <p className="text-slate-600 text-sm sm:text-base md:text-lg font-semibold leading-relaxed font-sans max-w-2xl">
                  ભારતની મુસાફરી કરતા પહેલાં તમારી ડેન્ટલ સારવારનું આયોજન કરાવો.
                </p>
              </div>

              {/* 4-step Cards Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-1">
                {/* Card 1 */}
                <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col items-center text-center justify-start hover:shadow-md transition-all duration-300 h-full min-h-[170px]">
                  {/* Fixed-height Icon Area */}
                  <div className="h-16 flex items-center justify-center mb-1.5 w-full">
                    <Upload className="h-[32px] w-[32px] text-slate-600 shrink-0" strokeWidth={1.75} />
                  </div>
                  {/* Text Area */}
                  <div className="flex-1 flex items-start justify-center">
                    <h3 className="text-xs sm:text-sm font-bold text-[#1E3A5F] leading-snug">
                      તમારા X-rays, સ્કેન અથવા દાંતના ફોટા મોકલો
                    </h3>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col items-center text-center justify-start hover:shadow-md transition-all duration-300 h-full min-h-[170px]">
                  {/* Fixed-height Icon Area */}
                  <div className="h-16 flex items-center justify-center mb-1.5 w-full">
                    <ClipboardCheck className="h-[32px] w-[32px] text-slate-600 shrink-0" strokeWidth={1.75} />
                  </div>
                  {/* Text Area */}
                  <div className="flex-1 flex items-start justify-center">
                    <h3 className="text-xs sm:text-sm font-bold text-[#1E3A5F] leading-snug">
                      તમારી પ્રાથમિક સારવાર યોજના મેળવો
                    </h3>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col items-center text-center justify-start hover:shadow-md transition-all duration-300 h-full min-h-[170px]">
                  {/* Fixed-height Icon Area */}
                  <div className="h-16 flex items-center justify-center mb-1.5 w-full">
                    <Calculator className="h-[32px] w-[32px] text-slate-600 shrink-0" strokeWidth={1.75} />
                  </div>
                  {/* Text Area */}
                  <div className="flex-1 flex items-start justify-center">
                    <h3 className="text-xs sm:text-sm font-bold text-[#1E3A5F] leading-snug">
                      અંદાજિત ખર્ચ અને સારવારનો સમયગાળો સમજો
                    </h3>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col items-center text-center justify-start hover:shadow-md transition-all duration-300 h-full min-h-[170px]">
                  {/* Fixed-height Icon Area */}
                  <div className="h-16 flex items-center justify-center mb-1.5 w-full">
                    <Plane className="h-[32px] w-[32px] text-slate-600 shrink-0" strokeWidth={1.75} />
                  </div>
                  {/* Text Area */}
                  <div className="flex-1 flex items-start justify-center">
                    <h3 className="text-xs sm:text-sm font-bold text-[#1E3A5F] leading-snug">
                      વિશ્વાસ સાથે તમારી મુસાફરીનું આયોજન કરો
                    </h3>
                  </div>
                </div>
              </div>

              {/* CTA and Reassurance Section */}
              <div className="pt-1">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => openAppointmentModal('Get My Free Treatment Plan')}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#00897B] text-white hover:bg-[#00796B] transition-all duration-300 shadow-[0_4px_14px_rgba(0,137,123,0.3)] hover:shadow-[0_6px_20px_rgba(0,137,123,0.4)] cursor-pointer w-full sm:w-auto"
                  >
                    <Calendar className="h-4.5 w-4.5" />
                    મારો મફત સારવાર પ્લાન મેળવો
                    <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                  <a
                    href="https://wa.me/919510397046"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#25D366] text-white hover:bg-[#128C7E] transition-all duration-300 shadow-[0_4px_14px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] cursor-pointer w-full sm:w-auto"
                  >
                    <svg className="h-4.5 w-4.5 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.062 5.248 5.303 0 11.771 0c3.14 0 6.082 1.22 8.293 3.438 2.212 2.219 3.432 5.175 3.43 8.323-.005 6.525-5.245 11.773-11.711 11.773-1.996 0-3.951-.512-5.69-1.492L0 24zm6.47-4.43c1.615.96 3.2 1.47 5.24 1.472 5.37 0 9.73-4.363 9.734-9.739.002-2.585-1.002-5.01-2.83-6.84C16.837 2.617 14.41 1.61 11.82 1.61c-5.38 0-9.75 4.362-9.754 9.735-.001 2.06.541 4.07 1.57 5.82l-.99 3.6 3.69-.97a9.66 9.66 0 004.72 1.235zm9.89-6.89c-.27-.13-1.61-.79-1.86-.88-.25-.09-.43-.13-.61.13-.18.27-.69.88-.85 1.05-.15.18-.31.2-.58.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.15-.27-.02-.42.11-.55.12-.12.27-.31.4-.47.13-.15.18-.27.27-.45.09-.18.04-.33-.02-.47-.07-.13-.61-1.47-.83-2.01-.22-.53-.45-.45-.61-.46h-.52c-.18 0-.47.07-.72.34-.25.27-.96.94-.96 2.3s.99 2.68 1.13 2.87c.14.19 1.95 2.97 4.72 4.17.66.29 1.17.46 1.57.59.66.21 1.26.18 1.73.11.53-.08 1.61-.66 1.84-1.29.23-.63.23-1.18.16-1.29-.07-.11-.25-.18-.52-.31z"/>
                    </svg>
                    WhatsApp કરો
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Image with Floating Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[480px] lg:max-w-none">
                
                {/* Main Hero Image */}
                <div className="aspect-[4/3] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 relative">
                  <img
                    src="/NRI.webp"
                    alt="Patel Dental Hospital International Care"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Premium overlay to enhance text readability if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
                </div>

              </div>
            </div>

          </div>

          {/* Tablet Hero Layout: Visible only on md to lg (768px to 1024px) */}
          <div className="hidden md:grid lg:hidden grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Content */}
            <div className="col-span-7 flex flex-col space-y-5 text-left">
              <div className="space-y-3">
                {/* Brand Eyebrow */}
                <div className="text-xs font-extrabold text-[#1E3A5F] tracking-wide font-sans">
                  પ્રીમિયમ ડેન્ટલ કેર. વ્યક્તિગત સારવાર. શ્રેષ્ઠ મૂલ્ય.
                </div>

                {/* Hero Main Heading */}
                <h1 className="font-display tracking-tight text-[#0CC2DA] leading-tight">
                  <span 
                    style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.12)' }}
                    className="block text-2xl font-black tracking-tight"
                  >
                    ભારતમાં તમારા સ્મિતમાં પરિવર્તન લાવો.
                  </span>
                </h1>

                {/* Supporting Description */}
                <p className="text-slate-600 text-xs font-semibold leading-relaxed font-sans max-w-lg">
                  ભારતની મુસાફરી કરતા પહેલાં તમારી ડેન્ટલ સારવારનું આયોજન કરાવો.
                </p>
              </div>

              {/* 4-step Cards Layout - clean row/grid layout for tablet */}
              <div className="grid grid-cols-2 gap-3 w-full pt-1">
                {/* Card 1 */}
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center text-left gap-3.5 hover:shadow-md transition-all duration-300">
                  <Upload className="h-6 w-6 text-[#00897B] shrink-0" strokeWidth={1.75} />
                  <h3 className="text-[10.5px] font-bold text-[#1E3A5F] leading-snug">
                    તમારા X-rays, સ્કેન અથવા દાંતના ફોટા મોકલો
                  </h3>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center text-left gap-3.5 hover:shadow-md transition-all duration-300">
                  <ClipboardCheck className="h-6 w-6 text-[#00897B] shrink-0" strokeWidth={1.75} />
                  <h3 className="text-[10.5px] font-bold text-[#1E3A5F] leading-snug">
                    તમારી પ્રાથમિક સારવાર યોજના મેળવો
                  </h3>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center text-left gap-3.5 hover:shadow-md transition-all duration-300">
                  <Calculator className="h-6 w-6 text-[#00897B] shrink-0" strokeWidth={1.75} />
                  <h3 className="text-[10.5px] font-bold text-[#1E3A5F] leading-snug">
                    અંદાજિત ખર્ચ અને સારવારનો સમયગાળો સમજો
                  </h3>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center text-left gap-3.5 hover:shadow-md transition-all duration-300">
                  <Plane className="h-6 w-6 text-[#00897B] shrink-0" strokeWidth={1.75} />
                  <h3 className="text-[10.5px] font-bold text-[#1E3A5F] leading-snug">
                    વિશ્વાસ સાથે તમારી મુસાફરીનું આયોજન કરો
                  </h3>
                </div>
              </div>

              {/* CTA and Reassurance Section */}
              <div className="pt-1">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => openAppointmentModal('Get My Free Treatment Plan')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#00897B] text-white hover:bg-[#00796B] transition-all duration-300 shadow-[0_4px_14px_rgba(0,137,123,0.3)] hover:shadow-[0_6px_20px_rgba(0,137,123,0.4)] cursor-pointer w-full sm:w-auto"
                  >
                    <Calendar className="h-4 w-4 shrink-0" />
                    મારો મફત સારવાર પ્લાન મેળવો
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </button>
                  <a
                    href="https://wa.me/919510397046"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#25D366] text-white hover:bg-[#128C7E] transition-all duration-300 shadow-[0_4px_14px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] cursor-pointer w-full sm:w-auto"
                  >
                    <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.062 5.248 5.303 0 11.771 0c3.14 0 6.082 1.22 8.293 3.438 2.212 2.219 3.432 5.175 3.43 8.323-.005 6.525-5.245 11.773-11.711 11.773-1.996 0-3.951-.512-5.69-1.492L0 24zm6.47-4.43c1.615.96 3.2 1.47 5.24 1.472 5.37 0 9.73-4.363 9.734-9.739.002-2.585-1.002-5.01-2.83-6.84C16.837 2.617 14.41 1.61 11.82 1.61c-5.38 0-9.75 4.362-9.754 9.735-.001 2.06.541 4.07 1.57 5.82l-.99 3.6 3.69-.97a9.66 9.66 0 004.72 1.235zm9.89-6.89c-.27-.13-1.61-.79-1.86-.88-.25-.09-.43-.13-.61.13-.18.27-.69.88-.85 1.05-.15.18-.31.2-.58.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.15-.27-.02-.42.11-.55.12-.12.27-.31.4-.47.13-.15.18-.27.27-.45.09-.18.04-.33-.02-.47-.07-.13-.61-1.47-.83-2.01-.22-.53-.45-.45-.61-.46h-.52c-.18 0-.47.07-.72.34-.25.27-.96.94-.96 2.3s.99 2.68 1.13 2.87c.14.19 1.95 2.97 4.72 4.17.66.29 1.17.46 1.57.59.66.21 1.26.18 1.73.11.53-.08 1.61-.66 1.84-1.29.23-.63.23-1.18.16-1.29-.07-.11-.25-.18-.52-.31z"/>
                    </svg>
                    WhatsApp કરો
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Image */}
            <div className="col-span-5 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 relative">
                <img
                  src="/NRI.webp"
                  alt="Patel Dental Hospital International Care"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  id="dental-tourism-tablet-hero-img"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Mobile Hero Layout: Only visible on screens smaller than md */}
          <div className="block md:hidden space-y-6 text-center">
            {/* 1. HERO HEADING */}
            <div className="space-y-3">
              <div className="text-[11px] font-black text-[#1E3A5F] tracking-wider font-sans uppercase">
                પ્રીમિયમ ડેન્ટલ કેર. વ્યક્તિગત સારવાર. શ્રેષ્ઠ મૂલ્ય.
              </div>
              <h1 className="font-display tracking-tight text-[#0CC2DA] leading-tight">
                <span 
                  style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.12)' }}
                  className="block text-3xl font-black tracking-tight"
                >
                  ભારતમાં તમારા સ્મિતમાં પરિવર્તન લાવો.
                </span>
              </h1>
            </div>

            {/* 2. HERO IMAGE */}
            <div className="mx-auto max-w-sm px-2">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-md border-4 border-white bg-slate-50 relative">
                <img
                  src="/NRI.webp"
                  alt="Patel Dental Hospital International Care"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* 2b. Hero Description moved below image */}
            <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed font-sans max-w-md mx-auto px-4">
              ભારતની મુસાફરી કરતા પહેલાં તમારી ડેન્ટલ સારવારનું આયોજન કરાવો.
            </p>

            {/* 3. HERO INFORMATION CARD */}
            <div className="bg-white rounded-2xl border border-slate-150 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.03)] max-w-sm mx-auto space-y-4">
              {/* Compact Step Highlights */}
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFAFC] border border-slate-100">
                  <Upload className="h-4.5 w-4.5 text-slate-500 shrink-0" strokeWidth={1.75} />
                  <span className="text-[10px] font-bold text-[#1E3A5F] leading-snug">
                    તમારા X-rays, સ્કેન અથવા દાંતના ફોટા મોકલો
                  </span>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFAFC] border border-slate-100">
                  <ClipboardCheck className="h-4.5 w-4.5 text-slate-500 shrink-0" strokeWidth={1.75} />
                  <span className="text-[10px] font-bold text-[#1E3A5F] leading-snug">
                    તમારી પ્રાથમિક સારવાર યોજના મેળવો
                  </span>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFAFC] border border-slate-100">
                  <Calculator className="h-4.5 w-4.5 text-slate-500 shrink-0" strokeWidth={1.75} />
                  <span className="text-[10px] font-bold text-[#1E3A5F] leading-snug">
                    અંદાજિત ખર્ચ અને સારવારનો સમયગાળો સમજો
                  </span>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFAFC] border border-slate-100">
                  <Plane className="h-4.5 w-4.5 text-slate-500 shrink-0" strokeWidth={1.75} />
                  <span className="text-[10px] font-bold text-[#1E3A5F] leading-snug">
                    વિશ્વાસ સાથે તમારી મુસાફરીનું આયોજન કરો
                  </span>
                </div>
              </div>

              {/* Compact CTA Button */}
              <div className="flex flex-col gap-2.5 w-full">
                <button
                  type="button"
                  onClick={() => openAppointmentModal('Get My Free Treatment Plan')}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-[#00897B] text-white hover:bg-[#00796B] transition-all duration-300 shadow-md cursor-pointer"
                >
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>મારો મફત સારવાર પ્લાન મેળવો</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>
                <a
                  href="https://wa.me/919510397046"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-[#25D366] text-white hover:bg-[#128C7E] transition-all duration-300 shadow-md cursor-pointer"
                >
                  <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.062 5.248 5.303 0 11.771 0c3.14 0 6.082 1.22 8.293 3.438 2.212 2.219 3.432 5.175 3.43 8.323-.005 6.525-5.245 11.773-11.711 11.773-1.996 0-3.951-.512-5.69-1.492L0 24zm6.47-4.43c1.615.96 3.2 1.47 5.24 1.472 5.37 0 9.73-4.363 9.734-9.739.002-2.585-1.002-5.01-2.83-6.84C16.837 2.617 14.41 1.61 11.82 1.61c-5.38 0-9.75 4.362-9.754 9.735-.001 2.06.541 4.07 1.57 5.82l-.99 3.6 3.69-.97a9.66 9.66 0 004.72 1.235zm9.89-6.89c-.27-.13-1.61-.79-1.86-.88-.25-.09-.43-.13-.61.13-.18.27-.69.88-.85 1.05-.15.18-.31.2-.58.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.15-.27-.02-.42.11-.55.12-.12.27-.31.4-.47.13-.15.18-.27.27-.45.09-.18.04-.33-.02-.47-.07-.13-.61-1.47-.83-2.01-.22-.53-.45-.45-.61-.46h-.52c-.18 0-.47.07-.72.34-.25.27-.96.94-.96 2.3s.99 2.68 1.13 2.87c.14.19 1.95 2.97 4.72 4.17.66.29 1.17.46 1.57.59.66.21 1.26.18 1.73.11.53-.08 1.61-.66 1.84-1.29.23-.63.23-1.18.16-1.29-.07-.11-.25-.18-.52-.31z"/>
                  </svg>
                  <span>WhatsApp કરો</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Travel to India Section */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[#00897B] uppercase tracking-widest block">
              આંતરરાષ્ટ્રીય દર્દીઓ ભારતની પસંદગી શા માટે કરે છે?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              ડેન્ટલ સારવાર માટે ભારતની મુસાફરી શા માટે કરવી?
            </h2>
          </div>

          {/* 5 Benefit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto mb-12">
            
            {/* Card 1 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-slate-600">
                <Microscope className="h-[24px] w-[24px] sm:h-[30px] sm:w-[30px]" strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                અદ્યતન ડેન્ટિસ્ટ્રી
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                આધુનિક ડિજિટલ 3D નિદાન, સારવાર આયોજન અને આધુનિક ડેન્ટલ તકનીકો.
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-slate-600">
                <Wallet className="h-[24px] w-[24px] sm:h-[30px] sm:w-[30px]" strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                નોંધપાત્ર ખર્ચનો લાભ
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                ઘણા પશ્ચિમી દેશોની તુલનામાં નોંધપાત્ર રીતે ઓછા ખર્ચે ઉચ્ચ ગુણવત્તાની ડેન્ટલ સારવાર મેળવો.
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-slate-600">
                <Stethoscope className="h-[24px] w-[24px] sm:h-[30px] sm:w-[30px]" strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                અનુભવી ડેન્ટલ નિષ્ણાતો
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                ડેન્ટિસ્ટ્રીના વિવિધ ક્ષેત્રોમાં ડેન્ટિસ્ટ અને નિષ્ણાત ડૉક્ટરોની સેવાઓનો લાભ મેળવો.
              </p>
            </div>

            {/* Card 4 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-slate-600">
                <Clock className="h-[24px] w-[24px] sm:h-[30px] sm:w-[30px]" strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                સારવાર માટે ઝડપી સુલભતા
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                લાંબા સમય સુધી રાહ જોવાનો સમય ઘટાડો અને તમારી મુસાફરીના સમયપત્રક અનુસાર સારવારનું આયોજન કરો.
              </p>
            </div>

            {/* Card 5 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-slate-600">
                <HeartHandshake className="h-[24px] w-[24px] sm:h-[30px] sm:w-[30px]" strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                વ્યક્તિગત સારવાર
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                એક સારવાર સંયોજક તમારી સમગ્ર ડેન્ટલ સારવારની મુસાફરી દરમિયાન તમારી મદદ કરે છે.
              </p>
            </div>

          </div>

          {/* Supporting statement */}
          <div className="max-w-4xl mx-auto mt-12 p-5 bg-[#FAFAFC] border border-slate-200/80 rounded-2xl">
            <p className="text-[#0B1D3A] text-xs sm:text-sm md:text-base font-semibold leading-relaxed font-sans">
              ભારતના મેડિકલ-ટૂરિઝમ ક્ષેત્રને વધતી જતી રીતે પરવડે તેવી સારવાર, અદ્યતન ઇન્ફ્રાસ્ટ્રક્ચર, ઓછો રાહ જોવાનો સમય અને આંતરરાષ્ટ્રીય દર્દીઓ માટે સંકલિત સહાય માટે પ્રોત્સાહિત કરવામાં આવે છે.
            </p>
          </div>

        </div>
      </section>


      {/* Why Choose Section with 6 Feature Cards */}
      <section className="py-12 md:py-16 bg-[#FAFAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Title and Description */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              આંતરરાષ્ટ્રીય દર્દીઓ ડેન્ટલ ટૂરિઝમ માટે ભારતમાં Patel Dental Hospital શા માટે પસંદ કરે છે?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-semibold">
              Patel Dental Hospital, Rajkot આંતરરાષ્ટ્રીય દર્દીઓ માટે વિશ્વસ્તરીય ડેન્ટલ કેર, અદ્યતન ટેકનોલોજી, પરવડે તેવી સારવાર અને સંપૂર્ણ મુસાફરી સહાય પ્રદાન કરે છે.
            </p>
          </div>

          {/* 6 Feature Cards - 3x2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            
            {/* Card 1 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-2xl sm:text-3xl">
                🏆
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                14+ વર્ષની શ્રેષ્ઠતા
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                વર્ષોના અનુભવ અને હજારો સફળ સ્મિત સાથે વિશ્વસનીય ડેન્ટલ કેર.
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-2xl sm:text-3xl">
                🌍
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                વિશ્વભરના દર્દીઓનો વિશ્વાસ
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                USA, UK, Canada, Australia, Africa અને અન્ય ઘણા દેશોના દર્દીઓ Patel Dental Hospital પર વિશ્વાસ રાખે છે.
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-2xl sm:text-3xl">
                🦷
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                અદ્યતન ડેન્ટલ ટેકનોલોજી
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                આંતરરાષ્ટ્રીય સ્તરે સ્વીકૃત સારવાર પ્રોટોકોલ સાથેની આધુનિક ડિજિટલ ડેન્ટિસ્ટ્રી.
              </p>
            </div>

            {/* Card 4 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-2xl sm:text-3xl">
                🛡️
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                સુરક્ષિત અને હાઇજેનિક ક્લિનિક
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                આંતરરાષ્ટ્રીય સ્ટેરિલાઇઝેશન ધોરણો અને દરેક તબક્કે દર્દીની સુરક્ષા.
              </p>
            </div>

            {/* Card 5 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-2xl sm:text-3xl">
                ✈️
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                સંપૂર્ણ મુસાફરી સહાય
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                મુસાફરીનું આયોજન, રહેઠાણ અંગે માર્ગદર્શન, એરપોર્ટ સહાય અને સારવારનું સંકલન.
              </p>
            </div>

            {/* Card 6 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Icon Container */}
              <div className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] flex items-center justify-start shrink-0 text-2xl sm:text-3xl">
                🤝
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[20px] sm:text-[30px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                સમર્પિત દર્દી સંયોજક
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.8] font-medium flex-1">
                કન્સલ્ટેશનથી લઈને સારવાર પૂર્ણ થાય ત્યાં સુધી વ્યક્તિગત સહાય.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Patients from Across the Globe Section */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Title and Subtitle */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              વિશ્વભરના દર્દીઓ
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-semibold">
              વિશ્વસ્તરીય ડેન્ટલ કેર માટે Patel Dental Hospital, Rajkot ખાતે સારવાર માટે આવતા આંતરરાષ્ટ્રીય દર્દીઓનો વિશ્વાસ.
            </p>
          </div>

          {/* Large White Rounded Container */}
          <div className="max-w-5xl mx-auto bg-white border border-[#E5E7EB] rounded-[24px] shadow-sm overflow-hidden">
            
            {/* 4x2 responsive grid (2 columns on mobile, 4 on desktop) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-[#E5E7EB]">
              
              {/* USA */}
              <div className="bg-white p-8 sm:p-12 flex flex-col items-center justify-center transition-colors duration-300 hover:bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md overflow-hidden shrink-0 mb-4">
                  <img 
                    src="https://hatscripts.github.io/circle-flags/flags/us.svg" 
                    alt="USA Flag" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-sans font-bold text-[#081C3A] text-base sm:text-lg tracking-tight">
                  યુએસએ
                </span>
              </div>

              {/* United Kingdom */}
              <div className="bg-white p-8 sm:p-12 flex flex-col items-center justify-center transition-colors duration-300 hover:bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md overflow-hidden shrink-0 mb-4">
                  <img 
                    src="https://hatscripts.github.io/circle-flags/flags/gb.svg" 
                    alt="United Kingdom Flag" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-sans font-bold text-[#081C3A] text-base sm:text-lg tracking-tight">
                  યુનાઇટેડ કિંગડમ
                </span>
              </div>

              {/* Canada */}
              <div className="bg-white p-8 sm:p-12 flex flex-col items-center justify-center transition-colors duration-300 hover:bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md overflow-hidden shrink-0 mb-4">
                  <img 
                    src="https://hatscripts.github.io/circle-flags/flags/ca.svg" 
                    alt="Canada Flag" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-sans font-bold text-[#081C3A] text-base sm:text-lg tracking-tight">
                  કેનેડા
                </span>
              </div>

              {/* Australia */}
              <div className="bg-white p-8 sm:p-12 flex flex-col items-center justify-center transition-colors duration-300 hover:bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md overflow-hidden shrink-0 mb-4">
                  <img 
                    src="https://hatscripts.github.io/circle-flags/flags/au.svg" 
                    alt="Australia Flag" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-sans font-bold text-[#081C3A] text-base sm:text-lg tracking-tight">
                  ઓસ્ટ્રેલિયા
                </span>
              </div>

              {/* United Arab Emirates */}
              <div className="bg-white p-8 sm:p-12 flex flex-col items-center justify-center transition-colors duration-300 hover:bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md overflow-hidden shrink-0 mb-4">
                  <img 
                    src="https://hatscripts.github.io/circle-flags/flags/ae.svg" 
                    alt="United Arab Emirates Flag" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-sans font-bold text-[#081C3A] text-base sm:text-lg tracking-tight">
                  યુનાઇટેડ આરબ અમીરાત
                </span>
              </div>

              {/* New Zealand */}
              <div className="bg-white p-8 sm:p-12 flex flex-col items-center justify-center transition-colors duration-300 hover:bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md overflow-hidden shrink-0 mb-4">
                  <img 
                    src="https://hatscripts.github.io/circle-flags/flags/nz.svg" 
                    alt="New Zealand Flag" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-sans font-bold text-[#081C3A] text-base sm:text-lg tracking-tight">
                  ન્યૂઝીલેન્ડ
                </span>
              </div>

              {/* South Africa */}
              <div className="bg-white p-8 sm:p-12 flex flex-col items-center justify-center transition-colors duration-300 hover:bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md overflow-hidden shrink-0 mb-4">
                  <img 
                    src="https://hatscripts.github.io/circle-flags/flags/za.svg" 
                    alt="South Africa Flag" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-sans font-bold text-[#081C3A] text-base sm:text-lg tracking-tight">
                  સાઉથ આફ્રિકા
                </span>
              </div>

              {/* Germany */}
              <div className="bg-white p-8 sm:p-12 flex flex-col items-center justify-center transition-colors duration-300 hover:bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md overflow-hidden shrink-0 mb-4">
                  <img 
                    src="https://hatscripts.github.io/circle-flags/flags/de.svg" 
                    alt="Germany Flag" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-sans font-bold text-[#081C3A] text-base sm:text-lg tracking-tight">
                  જર્મની
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Treatment Cost Comparison Section */}
      <section className="py-12 md:py-16 bg-[#FAFAFC] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Title, Subtitle and Description */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              સારવારના ખર્ચની સરખામણી
            </h2>
            <p className="text-[#0D9488] font-bold text-sm sm:text-base tracking-wider uppercase">
              PATEL DENTAL HOSPITAL વિરુદ્ધ આંતરરાષ્ટ્રીય સારવારના ખર્ચ
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-semibold">
              ગુણવત્તા અથવા સલામતી સાથે કોઈ સમાધાન કર્યા વિના Patel Dental Hospital, India પસંદ કરીને વિશ્વસ્તરીય ડેન્ટલ સારવાર પર 80% સુધીની બચત કરો.
            </p>
          </div>

          {/* Large rounded white container */}
          <div className="max-w-6xl mx-auto bg-white border border-[#E2E8F0] rounded-[24px] shadow-sm overflow-hidden text-left">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-[#312E81] text-white">
                    <th className="px-6 py-5 text-left font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-indigo-950">
                      સારવાર
                    </th>
                    <th className="px-6 py-5 text-center font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-indigo-950">
                      USA
                    </th>
                    <th className="px-6 py-5 text-center font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-indigo-950">
                      UK
                    </th>
                    <th className="px-6 py-5 text-center font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-indigo-950">
                      Australia
                    </th>
                    <th className="px-6 py-5 text-center font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-indigo-950">
                      Canada
                    </th>
                    <th className="px-6 py-5 text-center font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-indigo-950">
                      India
                    </th>
                    <th className="px-6 py-5 text-center font-sans font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-indigo-950">
                      બચત %
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {[
                    { treatment: "સિંગલ ડેન્ટલ ઇમ્પ્લાન્ટ", usa: "$3,000–$5,000", uk: "£2,500–£4,000", aus: "AUD 4,200–6,500", can: "CAD 3,800–5,500", india: "₹25,000–₹45,000", savings: "84–93%" },
                    { treatment: "રૂટ કેનાલ સારવાર", usa: "$1,000–$1,500", uk: "£800–£1,200", aus: "AUD 1,500–2,500", can: "CAD 1,300–2,000", india: "₹4,000–₹6,000", savings: "94–97%" },
                    { treatment: "ફુલ માઉથ રિહેબિલિટેશન", usa: "$25,000–$40,000", uk: "£20,000–£32,000", aus: "AUD 35,000–55,000", can: "CAD 32,000–48,000", india: "₹2,50,000–₹4,50,000", savings: "81–93%" },
                    { treatment: "સ્માઇલ મેકઓવર", usa: "$12,000–$20,000", uk: "£10,000–£16,000", aus: "AUD 18,000–30,000", can: "CAD 16,000–25,000", india: "₹60,000–₹1,50,000", savings: "83–94%" },
                    { treatment: "ક્લિયર એલાઇનર્સ", usa: "$4,000–$7,000", uk: "£3,500–£5,500", aus: "AUD 6,000–9,000", can: "CAD 5,500–8,000", india: "₹60,000–₹1,50,000", savings: "63–91%" },
                    { treatment: "ક્રાઉન્સ અને બ્રિજિસ", usa: "$1,200–$2,000", uk: "£900–£1,500", aus: "AUD 1,800–3,000", can: "CAD 1,600–2,500", india: "₹8,000–₹15,000", savings: "87–96%" },
                    { treatment: "દાંતને સફેદ કરવાની સારવાર", usa: "$600–$800", uk: "£500–£800", aus: "AUD 900–1,500", can: "CAD 800–1,300", india: "₹7,000–₹10,000", savings: "83–92%" },
                    { treatment: "બાળકો માટેની ડેન્ટિસ્ટ્રી", usa: "$400–$800", uk: "£300–£600", aus: "AUD 900–1,500", can: "CAD 800–1,300", india: "₹4,500–₹8,000", savings: "83–95%" },
                    { treatment: "અક્કલ દાંતની સારવાર", usa: "$600–$1,000", uk: "£500–£800", aus: "AUD 250–500", can: "CAD 250–450", india: "₹5,000–₹10,000", savings: "94–98%" },
                    { treatment: "કમ્પોઝિટ ફિલિંગ", usa: "$200–$400", uk: "£150–£300", aus: "AUD 2,000–3,500", can: "CAD 1,800–3,000", india: "₹5,000–₹10,000", savings: "76–91%" },
                    { treatment: "ડેન્ટલ વિનિયર્સ", usa: "$1,500–$2,500", uk: "£1,200–£2,000", aus: "AUD 2,000–4,000", can: "CAD 2,000–3,500", india: "₹10,000–₹20,000", savings: "76–92%" },
                    { treatment: "ડેન્ટર્સ", usa: "$1,500–$3,000", uk: "£1,200–£2,500", aus: "AUD 2,000–4,000", can: "CAD 2,000–3,500", india: "₹20,000–₹50,000", savings: "76–93%" }
                  ].map((row, idx) => (
                    <tr 
                      key={idx} 
                      className={`${idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"} hover:bg-slate-50 transition-colors duration-200`}
                    >
                      <td className="px-6 py-5 text-left font-sans font-bold text-[#081C3A] text-sm sm:text-base">
                        {row.treatment}
                      </td>
                      <td className="px-6 py-5 text-center font-sans font-medium text-[#475569] text-sm sm:text-base">
                        {row.usa}
                      </td>
                      <td className="px-6 py-5 text-center font-sans font-medium text-[#475569] text-sm sm:text-base">
                        {row.uk}
                      </td>
                      <td className="px-6 py-5 text-center font-sans font-medium text-[#475569] text-sm sm:text-base">
                        {row.aus}
                      </td>
                      <td className="px-6 py-5 text-center font-sans font-medium text-[#475569] text-sm sm:text-base">
                        {row.can}
                      </td>
                      <td className="px-6 py-5 text-center font-sans font-semibold text-[#0D9488] text-sm sm:text-base">
                        {row.india}
                      </td>
                      <td className="px-6 py-5 text-center font-sans font-bold text-indigo-700 text-sm sm:text-base">
                        {row.savings}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* NEW — What Can We Treat? Section */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-[#0D9488] font-bold text-xs sm:text-sm tracking-wider uppercase">
              આંતરરાષ્ટ્રીય દર્દીઓ માટે ડેન્ટલ સારવાર
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              અમે કઈ સારવાર કરી શકીએ છીએ?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-semibold">
              અમારી સૌથી વધુ માંગ ધરાવતી ડેન્ટલ સારવાર વિશે જાણો અને તમારા સ્માઇલ માટે યોગ્ય ઉકેલ શોધો.
            </p>
          </div>

          {/* Centered Line-Art Treatment Cards Grid (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 max-w-sm md:max-w-none mx-auto">
            {internationalTreatments.map((treatment, idx) => {
              const cardData = getCardData(treatment.slug, treatment.title, treatment.image, treatment.id);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="w-full bg-[#E6F6F4] rounded-[24px] border border-slate-200/60 shadow-[0_8px_30px_rgba(8,28,58,0.03)] hover:shadow-[0_24px_50px_rgba(8,28,58,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-between h-full text-center group overflow-hidden"
                >
                  {/* Service Image spanning full width */}
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-50 shrink-0">
                    <img 
                      src={cardData.image} 
                      alt={cardData.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="p-6 sm:p-12 pt-4 sm:pt-8 flex flex-col items-center flex-grow w-full">
                    {/* Centered Title */}
                    <h3 className="font-sans font-bold text-[#0B1D3A] text-[18px] sm:text-[22px] leading-snug text-center mb-2 sm:mb-4">
                      {cardData.title}
                    </h3>

                    {/* Centered Description */}
                    {treatment.description ? (
                      <p className="text-slate-600 text-xs sm:text-[14.5px] leading-relaxed text-center font-medium max-w-sm mx-auto flex-grow mb-4 sm:mb-8">
                        {treatment.description}
                      </p>
                    ) : null}

                    {/* Centered Learn More CTA */}
                    <div className="pt-4 sm:pt-6 border-t border-slate-150/60 w-full flex justify-center mt-auto">
                      <button
                        onClick={() => {
                          if (setCurrentPage && treatment.route) {
                            setCurrentPage(treatment.route);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          } else {
                            openAppointmentModal(cardData.title);
                          }
                        }}
                        className="text-[#0D9488] hover:text-[#0F766E] font-bold text-xs sm:text-base tracking-wide flex items-center justify-center gap-1.5 transition-colors duration-200 cursor-pointer group/btn"
                      >
                        વધુ જાણો <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Risk-Free First Step Section */}
      <section className="py-8 md:py-10 bg-[#F0FDFB] border-t border-b border-teal-100/50 relative overflow-hidden">
        {/* Decorative subtle ambient soft lights */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#2DD4BF]/10 rounded-full blur-3xl pointer-events-none -mr-48 -mt-24" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#E6F6F4]/60 rounded-full blur-3xl pointer-events-none -ml-48 -mb-24" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Information & Form CTA */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              <div className="space-y-3 sm:space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F6F4] text-[#0D9488] font-bold text-xs tracking-wider uppercase font-sans">
                  ડેન્ટલ ટૂરિઝમ કન્સલ્ટેશન
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0B1D3A] tracking-tight leading-[1.15]">
                  તમારા માટે કઈ સારવાર યોગ્ય છે તે અંગે ખાતરી નથી?
                </h2>
                <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-semibold">
                  ભારત પ્રવાસ કરતા પહેલાં અમારા ડેન્ટલ નિષ્ણાતોને તમારો કેસ તપાસવા દો અને તમારા માટે યોગ્ય સારવાર યોજના પસંદ કરવામાં માર્ગદર્શન મેળવશો.
                </p>
              </div>

              {/* Contact Line */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#0D9488] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="text-[#0B1D3A] text-lg sm:text-xl font-bold font-sans tracking-tight">
                  કૉલ કરો: <a href="tel:+919510397046" className="hover:text-[#0D9488] transition-colors duration-300">+91 9510397046</a>
                </p>
              </div>

              {/* Primary CTA Area */}
              <div className="space-y-4 pt-2">
                <div>
                  <button
                    type="button"
                    onClick={() => openAppointmentModal('Get My Free Treatment Plan')}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl text-sm sm:text-base font-extrabold uppercase tracking-wider bg-[#0D9488] text-white hover:bg-[#0F766E] transition-all duration-300 shadow-[0_8px_25px_rgba(13,148,136,0.25)] hover:shadow-[0_12px_35px_rgba(13,148,136,0.4)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full sm:w-auto text-center font-sans"
                  >
                    <Calendar className="h-5 w-5" />
                    મારી મફત સારવાર યોજના મેળવો
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Doctor Portrait Presentation */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              
              {/* Clean, sized image wrapper directly on the mint background */}
              <div className="relative w-full max-w-[310px] sm:max-w-[360px] lg:max-w-[380px] aspect-[4/5] rounded-[24px] overflow-hidden transition-transform duration-500 hover:-translate-y-1">
                <img
                  src="/dr. vipul patel.webp"
                  alt="Dr. Vipul Patel - Best Dentist in Rajkot"
                  className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                {/* Gentle vignette shade at the bottom of the portrait */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Patient-reassurance details underneath, sitting directly on the mint background */}
              <div className="mt-4 text-center">
                <p className="font-extrabold text-[#0B1D3A] text-base sm:text-lg font-sans tracking-tight">
                  ડૉ. વિપુલ પટેલ
                </p>
                <p className="text-[#0D9488] font-bold text-xs uppercase tracking-wider mt-1 font-sans space-y-1">
                  <span className="block">ઓરલ અને મેક્સિલોફેશિયલ સર્જરીમાં MDS</span>
                  <span className="block">ઓરલ મેડિસિન અને રેડિયોલોજીમાં MDS</span>
                  <span className="block">ઇમ્પ્લાન્ટ પ્રોસ્ટોડોન્ટિક્સમાં માસ્ટરશિપ (USA)</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEW — "Real Patients. Real Transformations." Before & After Section */}
      <section className="py-12 md:py-16 bg-[#FAFAFC] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <p className="text-[#0D9488] font-bold text-xs sm:text-sm tracking-wider uppercase">
              વાસ્તવિક પેશન્ટ્સના પરિવર્તનો
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              વાસ્તવિક પેશન્ટ્સ. વાસ્તવિક પરિવર્તનો.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-semibold">
              Patel Dental Hospital ખાતે વ્યક્તિગત ડેન્ટલ કેર દ્વારા પ્રાપ્ત થયેલા ચોક્કસ ક્લિનિકલ પરિણામો જોવા માટે અમારા પહેલાં અને પછીના સ્લાઇડર્સનો ઉપયોગ કરો.
            </p>
          </div>

          {/* Interactive Slider Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
            {beforeAfterList.map((caseItem, idx) => {
              const translateTitle = (englishTitle: string) => {
                const norm = (englishTitle || "").trim().toLowerCase();
                if (norm.includes("implant")) return "ડેન્ટલ ઇમ્પ્લાન્ટ્સ";
                if (norm.includes("full-mouth") || norm.includes("full mouth")) return "ફુલ-માઉથ રિહેબિલિટેશન";
                if (norm.includes("smile")) return "સ્માઇલ મેકઓવર";
                if (norm.includes("crown") || norm.includes("bridge")) return "ક્રાઉન્સ અને બ્રિજિસ";
                if (norm.includes("root canal")) return "રૂટ કેનાલ સારવાર";
                if (norm.includes("aligner") || norm.includes("orthodontic")) return "એલાઇનર્સ અને ઓર્થોડોન્ટિક્સ";
                return englishTitle;
              };
              return (
                <BeforeAfterSlider
                  key={caseItem.id || idx}
                  title={translateTitle(caseItem.treatment_name)}
                  beforeImage={caseItem.before_image_url}
                  afterImage={caseItem.after_image_url}
                  idx={idx}
                />
              );
            })}
          </div>

        </div>
      </section>

      {/* NRI Patient Testimonial Videos Section */}
      {isVideoSectionEnabled && (
        <section className="py-12 md:py-16 bg-white border-t border-slate-100" id="nri-patient-testimonials-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Section Heading */}
            <div className="max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight uppercase">
                NRI પેશન્ટ્સના અનુભવના વિડિયો
              </h2>
              <div className="flex items-center justify-center gap-1.5 text-[#00897B] font-bold text-xs sm:text-sm tracking-wider uppercase">
                <Video className="h-4 w-4" />
                <span>NRI પેશન્ટ્સના અનુભવો</span>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-semibold">
                અમારા NRI અને આંતરરાષ્ટ્રીય પેશન્ટ્સ પાસેથી Patel Dental Hospital ખાતેની તેમની સરળ ડેન્ટલ સારવારની સફર અને વિશ્વસ્તરીય ડેન્ટલ કેર વિશે સીધું જાણો.
              </p>
            </div>

            {/* Video Cards Grid / Empty State */}
            {tourismVideos && tourismVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 justify-center items-stretch text-left max-w-7xl mx-auto">
                {tourismVideos.map((video, index) => {
                  const isMp4 = video.videoPlatform === 'mp4' || video.platform === 'mp4' || video.id?.endsWith('.mp4') || video.id?.includes('supabase.co');
                  const isInstagram = !isMp4;
                  return (
                    <div
                      key={video.id || index}
                      className="w-full max-w-[240px] mx-auto flex flex-col items-center justify-center"
                    >
                      {isInstagram ? (
                        <InstagramEmbed
                          url={video.url || `https://www.instagram.com/p/${video.id}/`}
                          title={video.title}
                          thumbnail={video.thumbnail}
                        />
                      ) : (
                        <div className="w-full max-w-[240px] mx-auto flex justify-center">
                          <Mp4ReelPlayer src={video.url || video.id} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="max-w-md mx-auto p-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center space-y-3">
                <Video className="h-8 w-8 text-slate-300" />
                <p className="text-slate-500 text-sm font-semibold">
                  No patient testimonial videos available yet.
                </p>
                <p className="text-slate-400 text-xs font-normal">
                  Testimonial videos added in the Admin CMS under 'Dental Tourism' treatment will automatically appear here.
                </p>
              </div>
            )}

          </div>
        </section>
      )}

      {/* Happy Patients from Across the Globe Section */}
      {galleryPatients && galleryPatients.length > 0 && (
        <section className="py-12 md:py-16 bg-[#FAFAFC] border-t border-slate-100" id="happy-patients-gallery-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Section Heading */}
            <div className="max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
                વિશ્વભરના ખુશ પેશન્ટ્સ
              </h2>
              <div className="flex items-center justify-center gap-1.5 text-[#00897B] font-bold text-xs sm:text-sm tracking-wider uppercase">
                <Globe2 className="h-4 w-4" />
                <span>આંતરરાષ્ટ્રીય પેશન્ટ ગેલેરી</span>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-semibold">
                વિવિધ દેશોના આંતરરાષ્ટ્રીય પેશન્ટ્સ વિશ્વસ્તરીય ડેન્ટલ સારવાર માટે Patel Dental Hospital પર વિશ્વાસ રાખે છે.
              </p>
            </div>

            {/* Dynamic Masonry Gallery - Pinterest style with complete image display and zero cropping */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 [column-fill:_balance] mx-auto max-w-7xl text-left">
              {galleryPatients.map((patient, index) => (
                <div
                  key={patient.id || index}
                  id={`patient-gallery-card-${patient.id}`}
                  className="break-inside-avoid bg-white rounded-[20px] overflow-hidden border border-slate-100/80 shadow-[0_4px_20px_rgba(8,28,58,0.015)] hover:shadow-[0_12px_30px_rgba(8,28,58,0.06)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col mb-6"
                  onClick={() => setSelectedPatient(patient)}
                >
                  <img
                    src={patient.image_url || null}
                    alt="Happy Patient"
                    className="w-full h-auto object-contain rounded-[inherit] block bg-slate-50/50"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Patient Reviews Section */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100" id="dental-tourism-reviews-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GooglePatientReviews
            label="પેશન્ટ્સના અનુભવો"
            heading="અમારા આંતરરાષ્ટ્રીય પેશન્ટ્સ શું કહે છે"
            description="વિશ્વસ્તરીય ડેન્ટલ સારવાર માટે Patel Dental Hospital, Rajkot ખાતે આવેલા પેશન્ટ્સના વાસ્તવિક અનુભવો."
            reviews={UNIVERSAL_GOOGLE_REVIEWS}
          />
        </div>
      </section>

      {/* Your Dental Tourism Journey Section */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Title, Subtitle and Description */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              તમારી ડેન્ટલ ટૂરિઝમ સફર
            </h2>
            <p className="text-[#0D9488] font-bold text-sm sm:text-base tracking-wider uppercase">
              સરળ. સુરક્ષિત. મુશ્કેલીમુક્ત.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-semibold">
              તમારી પ્રથમ ઓનલાઈન કન્સલ્ટેશનથી લઈને ઘરે પરત ફરવા સુધી, Patel Dental Hospital તમારી ડેન્ટલ ટૂરિઝમ સફરના દરેક તબક્કે સંપૂર્ણ સહાય પૂરી પાડે છે.
            </p>
          </div>

          {/* Cards Flex Container with Center Justification */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-7xl mx-auto">
            
            {/* Step 1 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider font-sans">
                  પગલું 1
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[24px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                તમારી ડેન્ટલ સમસ્યા વિશે અમને જણાવો
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.5] sm:leading-[1.7] font-medium flex-1">
                તમારા ફોટોગ્રાફ્સ, X-rays અને રિપોર્ટ્સ WhatsApp પર મોકલો.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <Video className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider font-sans">
                  પગલું 2
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[24px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                વર્ચ્યુઅલ કન્સલ્ટેશન
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.5] sm:leading-[1.7] font-medium flex-1">
                અમારી ડેન્ટલ ટીમ સાથે તમારી સમસ્યાઓ વિશે ચર્ચા કરો.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <ClipboardCheck className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider font-sans">
                  પગલું 3
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[24px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                તમારો સારવાર પ્લાન મેળવો
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.5] sm:leading-[1.7] font-medium flex-1">
                ભલામણ કરેલી સારવાર, અંદાજિત ખર્ચ અને અપેક્ષિત સમયગાળો સમજો.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider font-sans">
                  પગલું 4
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[24px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                તમારી મુસાફરીનું આયોજન કરો
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.5] sm:leading-[1.7] font-medium flex-1">
                અમારા આંતરરાષ્ટ્રીય પેશન્ટ કોઓર્ડિનેટર તમારી મુસાફરીની તારીખો અનુસાર તમારી એપોઇન્ટમેન્ટ્સ ગોઠવવામાં મદદ કરે છે.
              </p>
            </div>

            {/* Step 5 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider font-sans">
                  પગલું 5
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[24px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                ભારત આવો
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.5] sm:leading-[1.7] font-medium flex-1">
                તમે પહોંચો તે પહેલાં તમારી સારવારનું શેડ્યૂલ તૈયાર કરવામાં આવે છે.
              </p>
            </div>

            {/* Step 6 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <Activity className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider font-sans">
                  પગલું 6
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[24px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                તમારી સારવાર શરૂ કરો
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.5] sm:leading-[1.7] font-medium flex-1">
                તમારા વ્યક્તિગત સારવાર પ્લાન અનુસાર સારવાર કરવામાં આવે છે.
              </p>
            </div>

            {/* Step 7 */}
            <div className="relative bg-white border border-[#E8EEF5] rounded-[22px] p-5 sm:p-[36px] shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] cursor-pointer overflow-hidden flex flex-col h-full text-left w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              {/* Left accent line */}
              <div className="absolute left-0 top-5 bottom-5 sm:top-[36px] sm:bottom-[36px] w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
              
              {/* Step Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#00897B] shrink-0">
                  <HeartHandshake className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-[#00897B] bg-[#E6F6F4] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider font-sans">
                  પગલું 7
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-bold text-[#081C3A] text-[18px] sm:text-[24px] tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight">
                સતત સહાય સાથે ઘરે પરત ફરો
              </h3>
              
              {/* Description */}
              <p className="text-[#475569] text-[14px] sm:text-[15px] leading-[1.5] sm:leading-[1.7] font-medium flex-1">
                તમે ઘરે પરત ફર્યા પછી પણ, જ્યાં ક્લિનિકલી યોગ્ય હોય ત્યાં ફોલો-અપ માર્ગદર્શન ચાલુ રહી શકે છે.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* How Long Will I Need to Stay in India Section */}
      <section className="py-12 md:py-16 bg-[#FAFAFC] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Title, Subtitle and Description */}
          <div className="max-w-3xl mx-auto mb-12 space-y-4">
            <p className="text-[#0D9488] font-bold text-xs sm:text-sm tracking-wider uppercase">
              સરળ. સુરક્ષિત. મુશ્કેલીમુક્ત.
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              મારે ભારતમાં કેટલા સમય સુધી રહેવું પડશે?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-semibold">
              તમારી મુલાકાતનું આયોજન સરળ છે. નીચે મુખ્ય ડેન્ટલ પ્રક્રિયાઓ માટે સામાન્ય રીતે જરૂરી રહેવાના સમયની માહિતી આપવામાં આવી છે.
            </p>
          </div>

          {/* Treatment Duration Table Container */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgba(8,28,58,0.03)] overflow-hidden text-left">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#E6F6F4]/50 border-b border-slate-100">
                    <th className="py-4.5 px-6 font-sans font-extrabold text-[#0B1D3A] text-sm sm:text-base tracking-tight">
                      સારવાર
                    </th>
                    <th className="py-4.5 px-6 font-sans font-extrabold text-[#0D9488] text-sm sm:text-base tracking-tight text-right">
                      સામાન્ય મુલાકાતનો સમયગાળો*
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  {[
                    { name: "ડેન્ટલ ઇમ્પ્લાન્ટ", duration: "7–15 days" },
                    { name: "મલ્ટિપલ ઇમ્પ્લાન્ટ્સ", duration: "7–15 days" },
                    { name: "સ્માઇલ મેકઓવર", duration: "7–15 days" },
                    { name: "ફુલ-માઉથ રિહેબિલિટેશન", duration: "7–15 days" },
                    { name: "ઝિરકોનિયા ક્રાઉન્સ", duration: "7–15 days" },
                    { name: "રૂટ કેનાલ + ક્રાઉન", duration: "7–15 days" }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-sans font-semibold text-[#0B1D3A] text-sm sm:text-base">
                        {row.name}
                      </td>
                      <td className="py-4 px-6 font-sans font-bold text-[#0D9488] text-sm sm:text-base text-right whitespace-nowrap">
                        {row.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Disclaimer Note */}
          <p className="text-slate-500 text-xs sm:text-sm mt-6 font-semibold max-w-2xl mx-auto leading-relaxed">
            *સારવારનો સમયગાળો ક્લિનિકલ જરૂરિયાતો અનુસાર બદલાઈ શકે છે. તમારા કેસની સમીક્ષા કર્યા પછી તમારું વ્યક્તિગત શેડ્યૂલ તૈયાર કરવામાં આવશે.
          </p>

        </div>
      </section>

      {/* International Patient Concierge Section */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Heading & Label */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-[#0D9488] font-bold text-xs sm:text-sm tracking-wider uppercase">
              આંતરરાષ્ટ્રીય પેશન્ટ કન્સિયર્જ
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              તમારી વ્યક્તિગત ડેન્ટલ જર્ની કોઓર્ડિનેટર
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-semibold">
              તમારા પ્રથમ WhatsApp મેસેજથી લઈને તમારી અંતિમ એપોઇન્ટમેન્ટ સુધી, અમારી ટીમ તમારી ડેન્ટલ જર્નીનું સંકલન કરવામાં મદદ કરે છે.
            </p>
          </div>

          {/* Assistance Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left">
            {[
              {
                title: "એપોઇન્ટમેન્ટ શેડ્યૂલિંગ",
                description: "તમારી ટ્રાવેલ તારીખો અનુસાર સરળ અને મુશ્કેલીમુક્ત બુકિંગ.",
                icon: Calendar,
              },
              {
                title: "સારવારનું સંકલન",
                description: "અમારી નિષ્ણાતોની ટીમ સાથે સંપૂર્ણ ક્લિનિકલ સંકલન.",
                icon: Stethoscope,
              },
              {
                title: "સારવારની સમયરેખા",
                description: "તમારી મુલાકાત પહેલાં સારવારના સમયગાળા અને ક્લિનિકલ રોડમેપની વિગતવાર માહિતી.",
                icon: Clock,
              },
              {
                title: "એરપોર્ટ/ટ્રાન્સપોર્ટ સહાય",
                description: "એરપોર્ટ પિકઅપ અને સ્થાનિક મુસાફરી માટેની સહાયની વ્યવસ્થા.",
                icon: Plane,
              },
              {
                title: "હોટેલની ભલામણો",
                description: "તમારા બજેટ અનુસાર ચકાસાયેલ અને આરામદાયક નજીકની હોટેલોની પસંદગી.",
                icon: MapPin,
              },
              {
                title: "સ્થાનિક માર્ગદર્શન",
                description: "ગુજરાતમાં સ્થાનિક ભોજન, જોવાલાયક સ્થળો અને સુરક્ષિત મુસાફરી અંગે વ્યક્તિગત માર્ગદર્શન.",
                icon: Compass,
              },
              {
                title: "ચુકવણી અંગે માર્ગદર્શન",
                description: "સુરક્ષિત આંતરરાષ્ટ્રીય ટ્રાન્સફર, કાર્ડ અને પારદર્શક ઇન્વોઇસિંગના વિકલ્પો.",
                icon: Wallet,
              },
              {
                title: "ફોલો-અપનું સંકલન",
                description: "સારવાર પછી રિમોટ કન્સલ્ટેશન અને સતત સારવારની સુવિધા.",
                icon: HeartHandshake,
              },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-[#E5EEF5] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(8,28,58,0.03)] hover:shadow-[0_12px_24px_rgba(8,28,58,0.06)] hover:border-[#B9D1E6] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Icon & Checkmark Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#0D9488]">
                        <IconComponent className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E6F6F4] text-[#0D9488]">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </div>
                    </div>
                    {/* Content */}
                    <h4 className="font-sans font-bold text-[#0B1D3A] text-base sm:text-[17px] mb-2 tracking-tight leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Explore Gujarat Section */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Title, Subtitle and Description */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-[#0D9488] font-bold text-sm sm:text-base tracking-wider uppercase">
              ગુજરાતની મુલાકાત લો
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              તમારી ડેન્ટલ જર્ની દરમિયાન ગુજરાતને જાણો
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-semibold">
              Patel Dental Hospital ખાતે વિશ્વસ્તરીય ડેન્ટલ સારવાર લેવાની સાથે ગુજરાતના કેટલાક પ્રસિદ્ધ પ્રવાસન સ્થળોની મુલાકાત લો.
            </p>
          </div>

          {/* Destination Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {gujaratDestinations.map((dest, idx) => (
              <div
                key={idx}
                id={`gujarat-destination-card-${idx}`}
                onClick={() => openAppointmentModal(`Explore Gujarat Tour - ${dest.name}`)}
                className="group bg-white border border-slate-100/90 rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col text-left"
              >
                {/* 16:9 Image container with Zoom effect */}
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-50 relative">
                  <img
                    src={dest.image || null}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Location Info & Destination Name */}
                  <div className="flex items-center gap-1.5 text-[#00897B] font-semibold text-xs tracking-wider uppercase mb-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span>{dest.location}</span>
                  </div>
                  
                  <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mb-2 leading-tight">
                    {dest.name}
                  </h3>

                  {/* One short description (maximum one line) */}
                  <p className="text-[#475569] text-sm sm:text-base font-medium truncate mt-1">
                    {dest.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* What Is Included Section */}
      <section className="py-12 md:py-16 bg-[#FAFAFC] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Heading & Label */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-[#0D9488] font-bold text-xs sm:text-sm tracking-wider uppercase">
              શું સામેલ છે?
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight leading-tight">
              તમારી સારવાર યોજના સ્પષ્ટ રીતે સમજાવશે
            </h2>
          </div>

          {/* 3-Column Grid for Clinical, Financial, Travel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left mb-12">
            
            {/* Card 1: Clinical */}
            <div className="bg-white border border-[#E5EEF5] rounded-[20px] p-6 sm:p-8 shadow-[0_4px_20px_rgba(8,28,58,0.03)] hover:shadow-[0_12px_24px_rgba(8,28,58,0.06)] hover:border-[#B9D1E6] transition-all duration-300 relative flex flex-col">
              {/* Top Accent Icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#0D9488] shrink-0">
                  <Stethoscope className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans font-extrabold text-[#0B1D3A] text-xl tracking-tight">
                  ક્લિનિકલ
                </h3>
              </div>
              
              {/* List items */}
              <ul className="space-y-4 flex-grow">
                {[
                  "નિદાન",
                  "ભલામણ કરેલ સારવાર",
                  "વૈકલ્પિક વિકલ્પો",
                  "દાંત/ઇમ્પ્લાન્ટની સંખ્યા",
                  "સામગ્રી",
                  "સારવારના તબક્કાઓ"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#0D9488] shrink-0 mt-0.5">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </div>
                    <span className="text-[#475569] text-[15px] font-semibold leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Financial */}
            <div className="bg-white border border-[#E5EEF5] rounded-[20px] p-6 sm:p-8 shadow-[0_4px_20px_rgba(8,28,58,0.03)] hover:shadow-[0_12px_24px_rgba(8,28,58,0.06)] hover:border-[#B9D1E6] transition-all duration-300 relative flex flex-col">
              {/* Top Accent Icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#0D9488] shrink-0">
                  <Wallet className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans font-extrabold text-[#0B1D3A] text-xl tracking-tight">
                  નાણાકીય
                </h3>
              </div>
              
              {/* List items */}
              <ul className="space-y-4 flex-grow">
                {[
                  "સારવારનો ખર્ચ",
                  "નિદાન માટેના ચાર્જ",
                  "જ્યાં લાગુ પડે ત્યાં લેબોરેટરી ચાર્જ",
                  "જ્યાં લાગુ પડે ત્યાં દવાઓનો ખર્ચ",
                  "જરૂરિયાત મુજબ વધારાની પ્રક્રિયાઓ"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#0D9488] shrink-0 mt-0.5">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </div>
                    <span className="text-[#475569] text-[15px] font-semibold leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3: Travel */}
            <div className="bg-white border border-[#E5EEF5] rounded-[20px] p-6 sm:p-8 shadow-[0_4px_20px_rgba(8,28,58,0.03)] hover:shadow-[0_12px_24px_rgba(8,28,58,0.06)] hover:border-[#B9D1E6] transition-all duration-300 relative flex flex-col">
              {/* Top Accent Icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#0D9488] shrink-0">
                  <Plane className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans font-extrabold text-[#0B1D3A] text-xl tracking-tight">
                  મુસાફરી
                </h3>
              </div>
              
              {/* List items */}
              <ul className="space-y-4 flex-grow">
                {[
                  "અપેક્ષિત મુલાકાતોની સંખ્યા",
                  "સારવારનો અંદાજિત સમયગાળો",
                  "ભલામણ કરેલ આગમન/પ્રસ્થાન સમયપત્રક"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E6F6F4] flex items-center justify-center text-[#0D9488] shrink-0 mt-0.5">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </div>
                    <span className="text-[#475569] text-[15px] font-semibold leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Statement & Supporting Text */}
          <div className="max-w-2xl mx-auto space-y-3 mt-12">
            <h4 className="text-xl sm:text-2xl font-extrabold text-[#0D9488] tracking-tight">
              “સ્પષ્ટ માહિતી. કોઈ આશ્ચર્ય નહીં.”
            </h4>
            <p className="text-slate-600 text-sm sm:text-base font-semibold leading-relaxed">
              તમારી વ્યક્તિગત સારવાર યોજના મુસાફરી પહેલાં અપેક્ષિત સારવાર, ખર્ચ અને સમયરેખા સ્પષ્ટ રીતે સમજાવવા માટે તૈયાર કરવામાં આવે છે.
            </p>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-[#FAFAFC] border-t border-slate-100" id="dental-tourism-faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-[#0D9488]/10 rounded-full border border-[#0D9488]/20">
              <HelpCircle className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
              વારંવાર પૂછાતા પ્રશ્નો
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight">
              ડેન્ટલ ટૂરિઝમ વિશે વારંવાર પૂછાતા પ્રશ્નો
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-semibold">
              Patel Dental Hospitalની મુલાકાત લેતા પહેલાં આંતરરાષ્ટ્રીય દર્દીઓ સામાન્ય રીતે પૂછતા તમામ પ્રશ્નોના જવાબો.
            </p>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
          </div>

          <div className="space-y-3.5 mt-8">
            {dentalTourismFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isExpanded 
                      ? 'border-[#0D9488] shadow-xs' 
                      : 'border-slate-200/80 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    aria-expanded={isExpanded}
                    className="w-full px-6 py-4.5 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-slate-50/60 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
                  >
                    <span className={`font-sans font-bold text-sm sm:text-base leading-snug pr-4 transition-colors duration-200 ${
                      isExpanded ? 'text-[#0D9488]' : 'text-[#081C3A]'
                    }`}>
                      {faq.question}
                    </span>
                    <span className={`p-1.5 rounded-lg shrink-0 transition-all duration-300 ${
                      isExpanded ? 'bg-teal-50 text-[#0D9488] rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-5 pt-2 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100/80 bg-slate-50/40">
                          <p className="whitespace-pre-line font-medium font-sans">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Final Conversion CTA Section */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100" id="dental-tourism-final-cta-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="relative overflow-hidden rounded-[32px] py-12 px-6 sm:py-16 sm:px-12 bg-gradient-to-br from-[#081C3A] via-[#0D305A] to-[#0B1D3A] text-white border border-slate-800/80 shadow-2xl">
            {/* Decorative background radial gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(13,148,136,0.18),transparent_45%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,148,136,0.18),transparent_45%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              {/* Heading */}
              <h2 className="font-sans font-black text-3xl sm:text-4xl lg:text-[44px] text-white tracking-tight leading-tight">
                તમારી નવી સ્માઇલ એક મેસેજથી <br className="hidden sm:inline" />
                શરૂ થઈ શકે છે.
              </h2>

              {/* Subheading */}
              <p className="text-[#94A3B8] text-base sm:text-lg md:text-xl font-semibold leading-relaxed max-w-2xl mx-auto">
                તમને કઈ સારવારની જરૂર છે તે ચોક્કસ રીતે જાણવાની જરૂર નથી.
              </p>

              {/* Supporting text */}
              <p className="text-white text-sm sm:text-base font-semibold leading-relaxed max-w-2xl mx-auto">
                તમારી સમસ્યા અમને જણાવો. તમારા X-ray અથવા ફોટોગ્રાફ્સ અમને મોકલો. અમે તમને <br className="hidden sm:inline" />
                તમારા સારવારના વિકલ્પો સમજવામાં મદદ કરીશું.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center pt-4">
                <button
                  type="button"
                  onClick={() => openAppointmentModal('Get My Free Treatment Plan')}
                  className="w-full sm:w-auto px-8 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer active:scale-98 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50"
                >
                  <Calendar className="h-4.5 w-4.5 shrink-0" />
                  <span>મારો ફ્રી ટ્રીટમેન્ટ પ્લાન મેળવો</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPatient && (
        <div 
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-[150] flex items-center justify-center p-4 sm:p-6 animate-fade-in animate-duration-200"
          onClick={() => setSelectedPatient(null)}
        >
          {/* Close button at top corner of window */}
          <button
            type="button"
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer z-10"
            onClick={() => setSelectedPatient(null)}
            aria-label="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Lightbox content container */}
          <div 
            className="relative bg-white p-2 sm:p-3 rounded-3xl overflow-hidden max-w-4xl max-h-[90vh] flex flex-col items-center justify-center shadow-2xl border border-slate-100/10 z-10 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPatient?.image_url || null}
              alt="Patient Gallery Full"
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl block"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

    </div>
  );
}
