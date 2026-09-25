/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Search, 
  Tag, 
  ChevronRight, 
  Star, 
  CheckCircle, 
  MessageSquare, 
  Phone, 
  Shield, 
  Activity,
  Heart,
  BookOpen,
  Award,
  Users,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { useSEO } from '../utils/seo';
import { getWhatsAppUrl } from '../utils/contactData';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  image: string;
  imageAlt: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'dental-implants-rajkot',
    title: 'રાજકોટમાં ડેન્ટલ ઈમ્પ્લાન્ટ: ટ્રીટમેન્ટ, ફાયદા અને ખર્ચની સંપૂર્ણ માર્ગદર્શિકા',
    excerpt: 'પટેલ ડેન્ટલ હોસ્પિટલ, રાજકોટની શ્રેષ્ઠ ડેન્ટલ ક્લિનિક ખાતે ડેન્ટલ ઈમ્પ્લાન્ટ ટ્રીટમેન્ટની સંપૂર્ણ માર્ગદર્શિકા વાંચો: ખર્ચ, પ્રક્રિયા અને ફાયદા.',
    date: '8 ઓગસ્ટ 2026',
    readingTime: '6 મિનિટનો સમય',
    category: 'ડેન્ટલ ઈમ્પ્લાન્ટ',
    image: '/dental implant in rajkot.jpg',
    imageAlt: 'પટેલ ડેન્ટલ હોસ્પિટલ, રાજકોટ ખાતે ડેન્ટલ ઈમ્પ્લાન્ટ ટ્રીટમેન્ટ પહેલા અને પછી',
    seoTitle: 'રાજકોટમાં ડેન્ટલ ઈમ્પ્લાન્ટ: ખર્ચ, પ્રક્રિયા અને શ્રેષ્ઠ ક્લિનિક',
    metaDescription: 'શું તમે દાંતના ઈમ્પ્લાન્ટ માટે રાજકોટમાં શ્રેષ્ઠ ડેન્ટલ ક્લિનિક શોધી રહ્યા છો? પટેલ ડેન્ટલ હોસ્પિટલ ખાતે ડેન્ટલ ઈમ્પ્લાન્ટ ટ્રીટમેન્ટની સંપૂર્ણ માર્ગદર્શિકા વાંચો.',
    primaryKeyword: 'Dental Implants in Rajkot',
    secondaryKeywords: ['best dental clinic in Rajkot', 'dental implant treatment', 'dental implant cost in Rajkot', 'implant specialist dentist Rajkot']
  },
  {
    id: 'braces-vs-clear-aligners',
    title: 'પરફેક્ટ સ્માઈલનો માર્ગ: બ્રેસીસ વિરુદ્ધ ક્લિયર એલાઈનર્સ',
    excerpt: 'પરંપરાગત બ્રેસીસ અને ક્લિયર એલાઈનર્સની તુલના કરો, જેમાં ફાયદા, ટ્રીટમેન્ટમાં તફાવત, આરામ, દેખાવ અને રાજકોટમાં ઓર્થોડોન્ટિક ખર્ચનો સમાવેશ થાય છે.',
    date: '1 ઓગસ્ટ 2026',
    readingTime: '5 મિનિટનો સમય',
    category: 'ઓર્થોડોન્ટિક્સ',
    image: '/cline aliner in rajkot.jpg',
    imageAlt: 'પટેલ ડેન્ટલ હોસ્પિટલ, રાજકોટ ખાતે અદ્રશ્ય ક્લિયર એલાઈનર્સ વિરુદ્ધ પરંપરાગત મેટલ બ્રેસીસ ટ્રીટમેન્ટ',
    seoTitle: 'બ્રેસીસ વિરુદ્ધ ક્લિયર એલાઈનર્સ: રાજકોટમાં ખર્ચ અને પરિણામો',
    metaDescription: 'બ્રેસીસ કે ક્લિયર એલાઈનર્સ? ઓર્થોડોન્ટિક ટ્રીટમેન્ટ ખર્ચ, ફાયદા અને રાજકોટમાં અદ્રશ્ય એલાઈનર્સ વિશેની અમારી સંપૂર્ણ સરખામણી માર્ગદર્શિકા વાંચો.',
    primaryKeyword: 'Braces vs Clear Aligners',
    secondaryKeywords: ['braces treatment in Rajkot', 'clear aligners Rajkot', 'invisible aligners Rajkot', 'best dentist in Rajkot']
  },
  {
    id: 'maintain-white-teeth-after-whitening',
    title: 'દાંત સફેદ કરાવ્યા પછી ચમકતા રાખવા માટેની ૫ મહત્વપૂર્ણ આદતો',
    excerpt: 'પટેલ ડેન્ટલ હોસ્પિટલ રાજકોટ ખાતે પ્રોફેશનલ ટીથ વ્હાઇટનિંગ ટ્રીટમેન્ટ પછી વધુ સફેદ અને સ્વસ્થ દાંત જાળવી રાખવા માટે ડેન્ટિસ્ટ દ્વારા મંજૂર કરાયેલી ૫ દૈનિક આદતો જાણો.',
    date: '25 જુલાઈ 2026',
    readingTime: '4 મિનિટનો સમય',
    category: 'કોસ્મેટિક ડેન્ટિસ્ટ્રી',
    image: '/white teeth in rajkot.jpg',
    imageAlt: 'પટેલ ડેન્ટલ હોસ્પિટલ, કોસ્મેટિક ડેન્ટિસ્ટ રાજકોટ દ્વારા ટીથ સ્કેલિંગ અને વ્હાઇટનિંગ પછીની સંભાળ માર્ગદર્શિકા',
    seoTitle: 'રાજકોટમાં ટીથ વ્હાઇટનિંગ પછી સફેદ દાંત કેવી રીતે જાળવી રાખવા',
    metaDescription: 'પટેલ ડેન્ટલ હોસ્પિટલ રાજકોટ ખાતે પ્રોફેશનલ ટીથ વ્હાઇટનિંગ ટ્રીટમેન્ટ પછી વધુ સફેદ અને સ્વસ્થ દાંત જાળવી રાખવા માટે ડેન્ટિસ્ટ દ્વારા મંજૂર કરાયેલી ૫ દૈનિક આદતો જાણો.',
    primaryKeyword: 'maintain white teeth after whitening',
    secondaryKeywords: ['teeth whitening in Rajkot', 'teeth whitening aftercare', 'professional teeth whitening', 'dental treatment in Rajkot']
  }
];

interface BlogsProps {
  openAppointmentModal: (preselectedTreatment?: string) => void;
  setCurrentPage: (page: any) => void;
  currentPage?: string;
}

export default function BlogsGujarati({ openAppointmentModal, setCurrentPage, currentPage }: BlogsProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(() => {
    if (currentPage && currentPage.startsWith('blog/')) {
      const postId = currentPage.substring('blog/'.length);
      if (BLOG_POSTS.some(p => p.id === postId)) {
        return postId;
      }
    }
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('/blog/')) {
        const parts = path.split('/blog/');
        if (parts[1]) {
          const postId = parts[1].replace('/', '');
          if (BLOG_POSTS.some(p => p.id === postId)) {
            return postId;
          }
        }
      }
    }
    return null;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('બધા');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const selectedPost = BLOG_POSTS.find(p => p.id === selectedPostId);
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://pdhrajkot.com';

  useSEO({
    title: selectedPost 
      ? `${selectedPost.seoTitle} | પટેલ ડેન્ટલ હોસ્પિટલ`
      : 'ડેન્ટલ બ્લોગ અને પેશન્ટ ગાઇડ્સ | પટેલ ડેન્ટલ હોસ્પિટલ રાજકોટ',
    description: selectedPost
      ? selectedPost.metaDescription
      : 'પટેલ ડેન્ટલ હોસ્પિટલ બ્લોગ સાથે માહિતગાર રહો. વ્યાવસાયિક ડેન્ટલ સલાહ, ઇમ્પ્લાન્ટ માર્ગદર્શિકા, ક્લિયર એલાઇનર સરખામણીઓ અને મૌખિક સ્વચ્છતા ટિપ્સ વાંચો.',
    keywords: selectedPost
      ? `${selectedPost.primaryKeyword}, ${selectedPost.secondaryKeywords.join(', ')}`
      : 'Dental Implants Rajkot, Dental Blog Rajkot, Patel Dental Hospital Blog, Best Implant Dentist Rajkot, Dentist Blog Gujarat',
    canonicalUrl: selectedPost
      ? `${origin}/#blog/${selectedPost.id}`
      : `${origin}/#academy`,
    ogTitle: selectedPost ? selectedPost.seoTitle : undefined,
    ogDescription: selectedPost ? selectedPost.metaDescription : undefined,
    ogImage: selectedPost ? selectedPost.image : undefined,
    ogType: selectedPost ? 'article' : 'website',
    schema: selectedPost ? {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${origin}/#blog/${selectedPost.id}`
      },
      "headline": selectedPost.title,
      "description": selectedPost.metaDescription,
      "image": `${origin}${selectedPost.image}`,
      "datePublished": selectedPost.id === 'dental-implants-rajkot' ? '2026-08-08' : selectedPost.id === 'braces-vs-clear-aligners' ? '2026-08-01' : '2026-07-25',
      "dateModified": selectedPost.id === 'dental-implants-rajkot' ? '2026-08-08' : selectedPost.id === 'braces-vs-clear-aligners' ? '2026-08-01' : '2026-07-25',
      "author": {
        "@type": "Organization",
        "name": "Patel Dental Hospital",
        "url": "https://pdhrajkot.com/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Patel Dental Hospital",
        "logo": {
          "@type": "ImageObject",
          "url": `${origin}/LOGO 3D FULL NAME WHITE (3)-1.png`
        }
      }
    } : undefined
  });

  // Handle URL hash sync on load and back button
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('blog/')) {
        const postId = hash.substring('blog/'.length);
        if (BLOG_POSTS.some(p => p.id === postId)) {
          setSelectedPostId(postId);
          return;
        }
      }
      setSelectedPostId(null);
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();

    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    window.location.hash = `blog/${postId}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToList = () => {
    setSelectedPostId(null);
    window.location.hash = 'academy';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const categories = ['બધા', 'ડેન્ટલ ઈમ્પ્લાન્ટ', 'ઓર્થોડોન્ટિક્સ', 'કોસ્મેટિક ડેન્ટિસ્ટ્રી'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'બધા' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Render Single Blog Post Detail
  const renderDetailView = () => {
    if (selectedPostId === 'dental-implants-rajkot') {
      return (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Back button */}
          <button 
            onClick={handleBackToList}
            className="inline-flex items-center gap-2 text-xs font-black text-[#0D9488] uppercase tracking-wider hover:text-[#081C3A] transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> બ્લોગ લિસ્ટ પર પાછા જાઓ
          </button>

          {/* Article Header */}
          <header className="space-y-4 mb-8 text-left">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
              <Tag className="h-3 w-3" /> ડેન્ટલ ઈમ્પ્લાન્ટ
            </span>
            <h1 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] leading-tight tracking-tight text-left">
              રાજકોટમાં ડેન્ટલ ઈમ્પ્લાન્ટ: ટ્રીટમેન્ટ, ફાયદા અને ખર્ચની સંપૂર્ણ માર્ગદર્શિકા
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#0D9488]" /> 8 ઓગસ્ટ 2026
              </span>
              <span className="h-1 w-1 bg-slate-300 rounded-full" />
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#0D9488]" /> 6 મિનિટનો સમય
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-10 border border-slate-100 shadow-2xs">
            <img 
              src="/dental implant in rajkot.jpg" 
              alt="Before after dental implants treatment at Patel Dental Hospital, the best dental clinic in Rajkot" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Table of Contents & Quick Navigation */}
          <div className="bg-[#FAFAFC] border border-slate-200/60 rounded-2xl p-5 mb-10 text-left">
            <h3 className="font-sans font-bold text-[#081C3A] text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#0D9488]" /> વિષયસૂચિ
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-[#0D9488]">
              <li><a href="#intro" className="hover:underline flex items-center gap-1">૧. પ્રસ્તાવના <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#what-are" className="hover:underline flex items-center gap-1">૨. ડેન્ટલ ઈમ્પ્લાન્ટ શું છે? <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#who-can" className="hover:underline flex items-center gap-1">૩. ડેન્ટલ ઈમ્પ્લાન્ટ કોણ કરાવી શકે? <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#benefits" className="hover:underline flex items-center gap-1">૪. ડેન્ટલ ઈમ્પ્લાન્ટના ફાયદા <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#process" className="hover:underline flex items-center gap-1">૫. ડેન્ટલ ઈમ્પ્લાન્ટ ટ્રીટમેન્ટ પ્રક્રિયા <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#how-long" className="hover:underline flex items-center gap-1">૬. તેમાં કેટલો સમય લાગે છે? <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#cost" className="hover:underline flex items-center gap-1">૭. રાજકોટમાં ડેન્ટલ ઈમ્પ્લાન્ટનો ખર્ચ <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#aftercare" className="hover:underline flex items-center gap-1">૮. ઈમ્પ્લાન્ટ પછીની સંભાળ <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#why-choose" className="hover:underline flex items-center gap-1">૯. શા માટે પટેલ ડેન્ટલ હોસ્પિટલ પસંદ કરવી <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#faq" className="hover:underline flex items-center gap-1">૧૦. વારંવાર પૂછાતા પ્રશ્નો <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
            </ul>
          </div>

          {/* Article Sections */}
          <div className="prose prose-teal max-w-none text-slate-700 space-y-8 font-sans font-semibold text-sm sm:text-base leading-relaxed text-left">
            
            {/* Section 1: Introduction */}
            <section id="intro" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૧. પ્રસ્તાવના
              </h2>
              <p>
                ગુમ થયેલા દાંત માત્ર તમારા સ્મિતના દેખાવને જ નહીં, પરંતુ તમારી ચાવવાની ક્ષમતા, વાણી અને લાંબા ગાળાના મૌખિક સ્વાસ્થ્યના માળખાને પણ અસર કરી શકે છે. દાયકાઓથી ચોકઠાં (dentures) કે પરંપરાગત બ્રિજ જેવા ઉપાયો સામાન્ય રહ્યા છે, પરંતુ આધુનિક દંત ચિકિત્સા એક અત્યંત ટકાઉ અને કાયમી વિકલ્પ પ્રદાન કરે છે: <strong>ડેન્ટલ ઈમ્પ્લાન્ટ</strong>.
              </p>
              <p>
                ડેન્ટલ ઈમ્પ્લાન્ટે રિસ્ટોરેટિવ ડેન્ટિસ્ટ્રીમાં ક્રાંતિ લાવી છે. તેઓ તમારા કુદરતી દાંત જેવા જ દેખાય છે, કાર્ય કરે છે અને અનુભવાય છે, જે મૌખિક સ્વાસ્થ્ય અને દર્દીના આત્મવિશ્વાસ બંનેને પુનઃસ્થાપિત કરે છે. જો તમે એક કે તેથી વધુ ગુમ થયેલા દાંત બદલવાનું વિચારી રહ્યા છો, તો અમારી અદ્યતન ડેન્ટલ ઈમ્પ્લાન્ટ સારવાર એ સંપૂર્ણ અને સ્વસ્થ સ્મિત પાછું મેળવવાનું પ્રથમ પગલું છે.
              </p>
            </section>

            {/* Section 2: What Are Dental Implants? */}
            <section id="what-are" className="scroll-mt-24 space-y-4">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૨. ડેન્ટલ ઈમ્પ્લાન્ટ શું છે?
              </h2>
              <p>
                ડેન્ટલ ઈમ્પ્લાન્ટ એ મૂળભૂત રીતે બાયો-કમ્પેટિબલ (જૈવ-અનુકૂળ) કૃત્રિમ મૂળ છે જે જડબાના હાડકામાં સુરક્ષિત રીતે ફિટ કરવામાં આવે છે. તે કૃત્રિમ દાંત બેસાડવા માટે મજબૂત અને કાયમી પાયો પૂરો પાડે છે. અન્ય દાંત બદલવાના વિકલ્પોથી વિપરીત, ડેન્ટલ ઈમ્પ્લાન્ટમાં ત્રણ મુખ્ય ઘટકો હોય છે:
              </p>
              <ul className="space-y-3 pl-4 list-disc text-slate-700">
                <li>
                  <strong className="text-[#081C3A]">ડેન્ટલ ઈમ્પ્લાન્ટ (ધ પોસ્ટ):</strong> મેડિકલ-ગ્રેડ ટાઇટેનિયમથી બનેલો એક નાનો સ્ક્રૂ જેવો ભાગ. તેને સર્જિકલ પ્રક્રિયા દ્વારા જડબાના હાડકામાં બેસાડવામાં આવે છે, જે રૂઝ આવવાના સમયગાળા દરમિયાન કુદરતી હાડકા સાથે મજબૂતીથી જોડાઈ (integrate) જાય છે.
                </li>
                <li>
                  <strong className="text-[#081C3A]">એબ્યુટમેન્ટ (Abutment):</strong> ટાઇટેનિયમ પોસ્ટની ઉપર ફીટ કરવામાં આવતો કનેક્ટર ભાગ છે. તેનું મુખ્ય કામ કાયમી કૃત્રિમ દાંતના ક્રાઉનને તેની જગ્યાએ મજબૂતીથી પકડી રાખવાનું છે.
                </li>
                <li>
                  <strong className="text-[#081C3A]">ડેન્ટલ ક્રાઉન (Dental Crown):</strong> બહાર દેખાતો, ખાસ ડિઝાઇન કરેલો કૃત્રિમ દાંત જે તમારા આજુબાજુના કુદરતી દાંતના રંગ સાથે સુસંગત હોય છે, જે સંપૂર્ણ દેખાવ અને ચાવવાની ક્ષમતા પુનઃસ્થાપિત કરે છે.
                </li>
              </ul>
            </section>

            {/* Section 3: Who Can Consider Dental Implants? */}
            <section id="who-can" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૩. ડેન્ટલ ઈમ્પ્લાન્ટ કોણ કરાવી શકે?
              </h2>
              <p>
                સડો, પેઢાના રોગ અથવા ઇજાને કારણે એક કે તેથી વધુ દાંત ગુમાવનાર ગુજરાતના ઘણા પુખ્ત દર્દીઓ માટે ડેન્ટલ ઈમ્પ્લાન્ટ યોગ્ય છે. અમારી અત્યાધુનિક હોસ્પિટલ ખાતે, રાજકોટના નિષ્ણાત ડેન્ટિસ્ટ તમારા સ્વાસ્થ્યનું મૂલ્યાંકન કરશે. તેની યોગ્યતા કેટલાક મુખ્ય તબીબી અને શારીરિક પરિબળો પર આધારિત છે:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                  <h3 className="font-sans font-bold text-[#081C3A] text-sm">મૌખિક અને જડબાના હાડકાનું સ્વાસ્થ્ય</h3>
                  <p className="text-xs text-slate-500 leading-normal">
                    ટાઇટેનિયમ પોસ્ટને સપોર્ટ આપવા માટે દર્દીના પેઢા સ્વસ્થ હોવા જોઈએ અને જડબાના હાડકાની ઘનતા પૂરતી હોવી જોઈએ. જો હાડકાનો ઘસારો થયો હોય, તો રાજકોટના અમારા ડેન્ટલ સ્પેશિયાલિસ્ટ બોન ગ્રાફ્ટ (હાડકાનું કલમ બનાવવું) ની ભલામણ કરી શકે છે.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                  <h3 className="font-sans font-bold text-[#081C3A] text-sm">सामान्य શારીરિક સ્વાસ્થ્ય</h3>
                  <p className="text-xs text-slate-500 leading-normal">
                    ડાયાબિટીસ જેવી લાંબી બીમારીઓ નિયંત્રણમાં હોવી જોઈએ. પટેલ ડેન્ટલ હોસ્પિટલ ખાતે વ્યાવસાયિક ક્લિનિકલ મૂલ્યાંકન રાજકોટમાં આ અદ્યતન ડેન્ટલ ટ્રીટમેન્ટ માટે તમારી પાત્રતા નક્કી કરે છે.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Benefits of Dental Implants */}
            <section id="benefits" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૪. ડેન્ટલ ઈમ્પ્લાન્ટના ફાયદા
              </h2>
              <p>
                વૈકલ્પિક રિસ્ટોરેટિવ ડેન્ટલ પ્રક્રિયાઓની સરખામણીમાં ડેન્ટલ ઈમ્પ્લાન્ટ પસંદ કરવાથી ઘણા લાંબા ગાળાના સ્વાસ્થ્ય અને ક્લિનિકલ ફાયદા મળે છે:
              </p>
              <div className="space-y-2.5 my-3">
                {[
                  { title: "કુદરતી દેખાવ અને સ્મિત", desc: "આજુબાજુના દાંતના આકાર, રંગ અને ચમક સાથે સંપૂર્ણ રીતે મેળ ખાય તે રીતે તૈયાર કરાય છે." },
                  { title: "ચાવવાની અને બટકું ભરવાની ક્ષમતામાં સુધારો", desc: "હાડકામાં મજબૂતીથી જકડાયેલા હોવાથી, તમે સખત અને કડક ખોરાક પણ આરામથી ખાઈ શકો છો." },
                  { title: "વાણીમાં સ્પષ્ટતા", desc: "ઢીલા ચોકઠાની જેમ લપસી જવાને બદલે, ઈમ્પ્લાન્ટ એકદમ સ્થિર રહે છે, જેનાથી બોલવામાં કોઈ તકલીફ પડતી નથી." },
                  { title: "લાંબા ગાળાનો કાયમી ઉકેલ", desc: "યોગ્ય નિયમિત કાળજી સાથે અત્યંત ટકાઉ અને કાયમી રિસ્ટોરેટિવ સોલ્યુશન તરીકે ડિઝાઇન કરાયેલ છે." },
                  { title: "આત્મવિશ્વાસ પુનઃસ્થાપિત કરવામાં મદદરૂપ", desc: "દર્દીઓને દાંત ગુમ થવાની ચિંતા કર્યા વિના મુક્તપણે હસવા, રમવા અને વાતચીત કરવાની મંજૂરી આપે છે." },
                  { title: "આજુબાજુના સ્વસ્થ દાંતનું રક્ષણ", desc: "પરંપરાગત બ્રિજની જેમ આજુબાજુના સ્વસ્થ દાંતને ઘસવાની કે તેને નાની કરવાની જરૂર પડતી નથી." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#081C3A] block text-sm sm:text-base">{item.title}</strong>
                      <span className="text-xs sm:text-sm text-slate-500 font-medium">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Dental Implant Treatment Process */}
            <section id="process" className="scroll-mt-24 space-y-4">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૫. ડેન્ટલ ઈમ્પ્લાન્ટ ટ્રીટમેન્ટ પ્રક્રિયા
              </h2>
              <p>
                ડેન્ટલ ઈમ્પ્લાન્ટ ટ્રીટમેન્ટ એ એક ચોક્કસ અને મલ્ટી-સ્ટેપ ક્લિનિકલ પ્રક્રિયા છે જે માળખાકીય સુરક્ષા અને શ્રેષ્ઠ દેખાવની સફળતા સુનિશ્ચિત કરવા માટે બનાવવામાં આવી છે:
              </p>
              <div className="relative border-l-2 border-teal-100 pl-6 ml-3 space-y-6">
                {[
                  { step: "પગલું ૧", title: "પરામર્શ અને તપાસ", desc: "તમારા દાંત, જડબાના હાડકાના સ્વાસ્થ્ય અને તબીબી ઇતિહાસનું વ્યાપક પ્રારંભિક ક્લિનિકલ મૂલ્યાંકન." },
                  { step: "પગલું ૨", title: "ડિજિટલ સ્કેન અને 3D એક્સ-રે", desc: "હાડકાના બંધારણનું સચોટ મૂલ્યાંકન કરવા અને એનાટોમિકલ નર્વ પાથને સુરક્ષિત રીતે નકશા બનાવવા માટે હાઇ-રિઝોલ્યુશન 3D CBCT ઇમેજિંગ." },
                  { step: "પગલું ૩", title: "ટ્રીટમેન્ટ પ્લાનિંગ", desc: "તમારી ચોક્કસ જડબાની શરીરરચનાને અનુરૂપ કસ્ટમાઇઝ્ડ કમ્પ્યુટર-ગાઇડેડ સર્જિકલ ટેમ્પલેટ ડિઝાઇન કરવું." },
                  { step: "પગલું ૪", title: "ઈમ્પ્લાન્ટ બેસાડવું", desc: "હાડકામાં ટાઇટેનિયમ પોસ્ટને ચોક્કસ રીતે ગોઠવવા માટે સ્થાનિક એનેસ્થેસિયા (local anesthesia) હેઠળ કરવામાં આવતી નાની સર્જિકલ પ્રક્રિયા." },
                  { step: "પગલું ૫", title: "રૂઝ અને જોડાણ", desc: "ઓસીઓઈન્ટીગ્રેશન (osseointegration) નામની પ્રક્રિયા, જેમાં કેટલાક અઠવાડિયાથી મહિનાઓનો સમય લાગે છે, જ્યાં હાડકું કુદરતી રીતે ટાઇટેનિયમ પોસ્ટ સાથે જોડાઈ જાય છે." },
                  { step: "પગલું ૬", title: "ક્રાઉન બેસાડવું", desc: "એકવાર જોડાણ પૂર્ણ થઈ જાય પછી, એક કસ્ટમ ડેન્ટલ ક્રાઉન બનાવવામાં આવે છે અને ઈમ્પ્લાન્ટ એબ્યુટમેન્ટ પર સુરક્ષિત રીતે માઉન્ટ કરવામાં આવે છે." },
                  { step: "પગલું ૭", title: "ફોલો-અપ અને કાળજી", desc: "ક્લિનિકલ રૂઝ, પેઢાના જોડાણ અને લાંબા ગાળાની સુરક્ષા જાળવવા માટે નિયમિત પોસ્ટ-ટ્રીટમેન્ટ મૂલ્યાંકન." }
                ].map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 bg-white border-2 border-[#0D9488] rounded-full flex items-center justify-center">
                      <div className="h-1.5 w-1.5 bg-[#0D9488] rounded-full" />
                    </div>
                    <span className="text-[10px] font-black text-[#0D9488] uppercase tracking-widest">{step.step}</span>
                    <h3 className="font-bold text-sm sm:text-base text-[#081C3A] leading-tight mb-1">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: How Long Does Dental Implant Treatment Take? */}
            <section id="how-long" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૬. તેમાં કેટલો સમય લાગે છે?
              </h2>
              <p>
                ટ્રીટમેન્ટનો સમયગાળો દર્દીની વ્યક્તિગત સ્થિતિ, ઈમ્પ્લાન્ટની સંખ્યા, જડબાના હાડકાની ઘનતા, રૂઝ આવવાનો દર અને સારવાર યોજનાની જટિલતાને આધારે નોંધપાત્ર રીતે બદલાય છે.
              </p>
              <p>
                સામાન્ય રીતે, આખી પ્રક્રિયામાં ૩ થી ૬ મહિનાનો સમય લાગી શકે છે. જે કિસ્સાઓમાં હાડકાની ઘનતા ઓછી હોય અને પ્લેસમેન્ટ પહેલાં બોન ગ્રાફ્ટિંગ જરૂરી હોય, ત્યાં સંપૂર્ણ સુરક્ષા અને માળખાકીય અખંડિતતા સુનિશ્ચિત કરવા માટે પ્રક્રિયામાં વધુ સમય લાગી શકે છે. આનાથી વિપરીત, અમુક ચોક્કસ કિસ્સાઓમાં તાત્કાલિક લોડિંગ (immediate-loading) ના ઉકેલો પણ ઉપલબ્ધ હોઈ શકે છે. તમારા ડેન્ટલ સર્જન તમારા ક્લિનિકલ સ્કેનના આધારે એક વાસ્તવિક અને સચોટ સમયરેખા આપશે.
              </p>
            </section>

            {/* Section 7: Dental Implant Cost in Rajkot */}
            <section id="cost" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૭. રાજકોટમાં ડેન્ટલ ઈમ્પ્લાન્ટનો ખર્ચ
              </h2>
              <div className="p-4 sm:p-5 bg-teal-50/50 border border-teal-100/70 rounded-2xl flex gap-3.5 items-start">
                <AlertCircle className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <h3 className="font-bold text-[#081C3A] text-sm sm:text-base">પરામર્શ પછી વ્યક્તિગત કિંમત નક્કી કરવી</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    ઇમ્પ્લાન્ટ સિસ્ટમ, ઇમ્પ્લાન્ટની સંખ્યા, ક્રાઉનનો પ્રકાર, હાડકાની સ્થિતિ અને વ્યક્તિગત સારવારની જરૂરિયાતોને આધારે સારવારનો ખર્ચ બદલાય છે. વિગતવાર ક્લિનિકલ એપોઇન્ટમેન્ટ અને પરામર્શ પછી વ્યક્તિગત અંદાજ પ્રદાન કરવામાં આવે છે.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8: Dental Implant Aftercare */}
            <section id="aftercare" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૮. ઈમ્પ્લાન્ટ પછીની સંભાળ
              </h2>
              <p>
                તમારા ડેન્ટલ ઈમ્પ્લાન્ટની લાંબા ગાળાની સફળતા અને ટકાઉપણું સુનિશ્ચિત કરવા માટે યોગ્ય જાળવણી જરૂરી છે. દર્દીઓએ નીચે મુજબની કાળજી લેવી જોઈએ:
              </p>
              <ul className="space-y-2.5 pl-4 list-disc text-slate-700 text-xs sm:text-sm">
                <li>
                  <strong className="text-[#081C3A]">મૌખિક સ્વચ્છતા જાળવો:</strong> દિવસમાં બે વાર સોફ્ટ બ્રિસ્ટલવાળા ટૂથબ્રશથી બ્રશ કરો, નિયમિત ફ્લોસ કરો અને આસપાસના પેઢાને સ્વચ્છ રાખવા માટે નોન-એબ્રેસિવ (ઘસારો ન કરનારી) ટૂથપેસ્ટનો ઉપયોગ કરો.
                </li>
                <li>
                  <strong className="text-[#081C3A]">ડેન્ટિસ્ટની સૂચનાઓનું પાલન કરો:</strong> સર્જિકલ પ્લેસમેન્ટ પછી તરત જ ભલામણ કરેલ કોઈપણ આહાર માર્ગદર્શિકા અથવા અસ્થાયી નરમ ખોરાક (soft-food) ખાવાના નિયમોનું ચુસ્તપણે પાલન કરો.
                </li>
                <li>
                  <strong className="text-[#081C3A]">ફોલો-અપ એપોઇન્ટમેન્ટ્સમાં હાજર રહો:</strong> તમામ નિર્ધારિત પોસ્ટ-ઓપ ચેકઅપ્સ ચાલુ રાખો જેથી અમારી ક્લિનિકલ ટીમ જોડાણની પ્રગતિ અને પેઢાના સ્વાસ્થ્યનું મૂલ્યાંકન કરી શકે.
                </li>
                <li>
                  <strong className="text-[#081C3A]">ધૂમ્રપાન ટાળો:</strong> તમાકુનો ઉપયોગ હાડકાના રૂઝ આવવાને નોંધપાત્ર રીતે અવરોધે છે અને ડેન્ટલ ઈમ્પ્લાન્ટના લાંબા ગાળાના સફળતાના દરને ઘટાડે છે.
                </li>
                <li>
                  <strong className="text-[#081C3A]">કોઈપણ સમસ્યા વિશે જણાવો:</strong> જો તમને અસામાન્ય દુખાવો થાય, અચાનક સોજો આવી જાય, અથવા ઈમ્પ્લાન્ટ હલતું હોય તેવું લાગે, તો તરત જ ડેન્ટલ ટીમનો સંપર્ક કરો.
                </li>
              </ul>
            </section>

            {/* Section 9: Why Choose Patel Dental Hospital for Dental Implants? */}
            <section id="why-choose" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૯. શા માટે પટેલ ડેન્ટલ હોસ્પિટલ પસંદ કરવી
              </h2>
              <p>
                પટેલ ડેન્ટલ હોસ્પિટલ, રાજકોટ ખાતે, અમે આરામદાયક અને અત્યંત સચોટ ડેન્ટલ ઈમ્પ્લાન્ટ સારવાર આપવા માટે કડક ક્લિનિકલ ધોરણો અને અત્યાધુનિક ડાયગ્નોસ્ટિક પ્રોટોકોલનું પાલન કરીએ છીએ:
              </p>
              <ul className="space-y-2.5 pl-4 list-disc text-slate-700 text-xs sm:text-sm">
                <li>
                  <strong className="text-[#081C3A]">૧૮+ વર્ષની ક્લિનિકલ કુશળતા:</strong> ડૉ. વિપુલ પટેલના નેતૃત્વ હેઠળ, અમારી અનુભવી સર્જિકલ ટીમે આંતરરાષ્ટ્રીય માર્ગદર્શિકાનું પાલન કરીને હજારો ઈમ્પ્લાન્ટ સફળતાપૂર્વક બેસાડ્યા છે.
                </li>
                <li>
                  <strong className="text-[#081C3A]">ઇન-હાઉસ 3D CBCT ઇમેજિંગ:</strong> અમે અમારા ક્લિનિકમાં જ અત્યંત અદ્યતન, ઓછી રેડિયેશનવાળી કોન બીમ કમ્પ્યુટેડ ટોમોગ્રાફી (CBCT) નો ઉપયોગ કરીએ છીએ, જે થર્ડ-પાર્ટી લેબના વિલંબ વિના ચોક્કસ બોન મેપિંગ અને ટ્રીટમેન્ટ પ્લાનિંગ કરવાની મંજૂરી આપે છે.
                </li>
                <li>
                  <strong className="text-[#081C3A]">યુએસએ-સ્ટાન્ડર્ડ વંધ્યીકરણ (Sterilization):</strong> દર્દીની સુરક્ષા મેડિકલ-ગ્રેડ ક્લાસ B વેક્યુમ ઓટોક્લેવ્સ, UV-C આઇસોલેશન કેબિનેટ્સ અને કડક ક્લિનિકલ હાઇજીન પ્રોટોકોલ દ્વારા સુનિશ્ચિત કરવામાં આવે છે.
                </li>
                <li>
                  <strong className="text-[#081C3A]">પ્રીમિયમ બાયો-કમ્પેટિબલ સિસ્ટમ્સ:</strong> અમે પ્રીમિયમ બાયો-કમ્પેટિબલ ટાઇટેનિયમ અને ઝિર્કોનિયા મટિરિયલ્સમાંથી બનેલી આંતરરાષ્ટ્રીય સ્તરે સ્વીકૃત અને સંશોધન કરેલી ઈમ્પ્લાન્ટ સિસ્ટમ્સનો જ ઉપયોગ કરીએ છીએ.
                </li>
              </ul>
            </section>

            {/* Section 10: Frequently Asked Questions */}
            <section id="faq" className="scroll-mt-24 space-y-4">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૧૦. વારંવાર પૂછાતા પ્રશ્નો
              </h2>
              <div className="space-y-3">
                {[
                  {
                    q: "શું ડેન્ટલ ઈમ્પ્લાન્ટ દરમિયાન દુખાવો થાય છે?",
                    a: "ઈમ્પ્લાન્ટ બેસાડવાની પ્રક્રિયા સ્થાનિક એનેસ્થેસિયા (local anesthesia) હેઠળ કરવામાં આવે છે, જેનો અર્થ છે કે સર્જરી દરમિયાન તમને નહિવત અથવા બિલકુલ દુખાવો થતો નથી. સારવાર પછીના થોડા દિવસો સુધી સામાન્ય દુખાવો અથવા સોજો હોઈ શકે છે, જેને નિયમિત પેઇન કિલર દવાઓ દ્વારા સરળતાથી નિયંત્રિત કરી શકાય છે."
                  },
                  {
                    q: "ડેન્ટલ ઈમ્પ્લાન્ટ કેટલો સમય ચાલે છે?",
                    a: "ઘરે યોગ્ય સફાઈ, નિયમિત ફ્લોસિંગ, ડેન્ટલ ચેકઅપ અને ક્લિનિંગ સાથે, ડેન્ટલ ઈમ્પ્લાન્ટ જીવનભર સાથ આપતું કાયમી સોલ્યુશન બની શકે છે."
                  },
                  {
                    q: "શું કોઈ પણ વ્યક્તિ ડેન્ટલ ઈમ્પ્લાન્ટ કરાવી શકે છે?",
                    a: "હાડકાની યોગ્ય ઘનતા ધરાવતા મોટાભાગના સ્વસ્થ પુખ્ત દર્દીઓ આ સારવાર કરાવી શકે છે. સંપૂર્ણ સલામતી નક્કી કરવા માટે ક્લિનિકલ ચેકઅપ, 3D CBCT સ્કેન અને સામાન્ય સ્વાસ્થ્યની તપાસ જરૂરી છે."
                  },
                  {
                    q: "સારવારમાં કેટલો સમય લાગે છે?",
                    a: "સમયગાળો ૩ થી ૬ મહિનાનો હોય છે. આ સમયગાળો કાયમી ક્રાઉન બેસાડતા પહેલાં ઈમ્પ્લાન્ટ પોસ્ટને હાડકા સાથે મજબૂતીથી જોડાવા (osseointegration) માટે જરૂરી છે."
                  },
                  {
                    q: "શું ડેન્ટલ ઈમ્પ્લાન્ટ કુદરતી દેખાય છે?",
                    a: "હા. દરેક ક્રાઉન અમારી લેબમાં તમારા કુદરતી દાંતના ચોક્કસ આકાર, કલર શેડ અને ચમક સાથે મેળ ખાય તે રીતે કસ્ટમાઇઝ કરવામાં આવે છે, જેથી તે બિલકુલ કુદરતી લાગે છે."
                  },
                  {
                    q: "ડેન્ટલ ઈમ્પ્લાન્ટ મારા માટે યોગ્ય છે કે નહીં તે કેવી રીતે જાણી શકાય?",
                    a: "સૌથી શ્રેષ્ઠ રસ્તો એ છે કે તમે પરામર્શ (consultation) માટે એપોઇન્ટમેન્ટ બુક કરો. અમારી ક્લિનિકલ ટીમ તપાસ કરી તમારા જડબાના સ્વાસ્થ્યનું મૂલ્યાંકન કરશે અને યોગ્ય સારવારનો પ્લાન આપશે."
                  }
                ].map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div 
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-all duration-200"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-sm sm:text-base text-[#081C3A] hover:bg-slate-50 cursor-pointer focus:outline-none"
                      >
                        <span>{faq.q}</span>
                        <ChevronRight className={`h-4 w-4 text-[#0D9488] shrink-0 transition-transform duration-250 ${isOpen ? 'rotate-90' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-slate-100 bg-slate-50/40"
                          >
                            <div className="px-5 py-4 text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed font-sans">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>

          {/* Final CTA Box */}
          <footer className="mt-12 p-6 sm:p-8 bg-[#081C3A] text-white rounded-2xl sm:rounded-3xl text-center space-y-4">
            <h3 className="font-sans font-black text-xl sm:text-2xl tracking-tight">
              તમારું સ્મિત પુનઃસ્થાપિત કરવા તૈયાર છો?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-semibold">
              તમારા ડેન્ટલ ઈમ્પ્લાન્ટ સારવારના વિકલ્પોની ચર્ચા કરવા માટે પટેલ ડેન્ટલ હોસ્પિટલ સાથે પરામર્શ બુક કરો.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => openAppointmentModal('Dental Implants')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
              >
                ફ્રી પરામર્શ બુક કરો
              </button>
              <a
                href={getWhatsAppUrl("Hello Patel Dental Hospital, I would like to book a free consultation for Dental Implants. Please share the available appointment slots.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
              >
                <Phone className="h-4 w-4" /> અમને વ્હોટ્સએપ કરો
              </a>
            </div>
          </footer>
        </article>
      );
    }

    if (selectedPostId === 'braces-vs-clear-aligners') {
      return (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Back button */}
          <button 
            onClick={handleBackToList}
            className="inline-flex items-center gap-2 text-xs font-black text-[#0D9488] uppercase tracking-wider hover:text-[#081C3A] transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> બ્લોગ લિસ્ટ પર પાછા જાઓ
          </button>

          {/* Article Header */}
          <header className="space-y-4 mb-8 text-left">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
              <Tag className="h-3 w-3" /> ઓર્થોડોન્ટિક્સ
            </span>
            <h1 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] leading-tight tracking-tight text-left">
              બ્રેસીસ વિરુદ્ધ ક્લિયર એલાઈનર્સ: રાજકોટમાં ખર્ચ અને પરિણામો
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#0D9488]" /> 1 ઓગસ્ટ 2026
              </span>
              <span className="h-1 w-1 bg-slate-300 rounded-full" />
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#0D9488]" /> 5 મિનિટનો સમય
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-10 border border-slate-100 shadow-2xs">
            <img 
              src="/cline aliner in rajkot.jpg" 
              alt="Invisible clear aligners vs traditional metal braces treatment at Patel Dental Hospital, the best dental hospital in Rajkot" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Table of Contents & Quick Navigation */}
          <div className="bg-[#FAFAFC] border border-slate-200/60 rounded-2xl p-5 mb-10 text-left">
            <h3 className="font-sans font-bold text-[#081C3A] text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#0D9488]" /> વિષયસૂચિ
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-[#0D9488]">
              <li><a href="#braces-intro" className="hover:underline flex items-center gap-1">૧. પ્રસ્તાવના <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#traditional-braces" className="hover:underline flex items-center gap-1">૨. પરંપરાગત બ્રેસીસને સમજીએ <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#clear-aligners" className="hover:underline flex items-center gap-1">૩. ક્લિયર એલાઈનર્સ શું છે? <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#comparison-factors" className="hover:underline flex items-center gap-1">૪. સરખામણી માટેના મુખ્ય પરિબળો <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#decision-guide" className="hover:underline flex items-center gap-1">૫. તમારા માટે કયો વિકલ્પ શ્રેષ્ઠ છે? <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#ortho-care" className="hover:underline flex items-center gap-1">૬. ઓર્થોડોન્ટિક સારવાર <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#braces-faq" className="hover:underline flex items-center gap-1">૭. વારંવાર પૂછાતા પ્રશ્નો <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
            </ul>
          </div>

          {/* Article Sections */}
          <div className="prose prose-teal max-w-none text-slate-700 space-y-8 font-sans font-semibold text-sm sm:text-base leading-relaxed text-left">
            
            {/* Section 1: Introduction */}
            <section id="braces-intro" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૧. પ્રસ્તાવના
              </h2>
              <p>
                સીધા અને સ્વસ્થ દાંત તમારા આત્મવિશ્વાસ અને ઓર્થોડોન્ટિક સ્વાસ્થ્ય માટે અદભૂત કામ કરે છે. વર્ષોથી ઓર્થોડોન્ટિક સારવાર નોંધપાત્ર રીતે અદ્યતન બની છે, જે દર્દીઓને પહેલાં કરતાં વધુ વિકલ્પો આપે છે. જો તમે વાંકાચૂંકા, ગીચ અથવા ખાલી જગ્યાવાળા દાંતને સીધા કરવા માંગો છો, તો સામાન્ય રીતે બે મુખ્ય ઉકેલો આવે છે: <strong>પરંપરાગત બ્રેસીસ</strong> અને <strong>ક્લિયર એલાઈનર્સ</strong>.
              </p>
              <p>
                આ બંને પદ્ધતિઓ તમારા દાંતને સુરક્ષિત અને ધીમે-ધીમે યોગ્ય સ્થાને ખસેડવા માટે બનાવવામાં આવી છે. જો તમે રાજકોટમાં ઓર્થોડોન્ટિક બ્રેસીસ સારવાર અથવા આધુનિક ક્લિયર એલાઈનર્સ શોધી રહ્યા છો, તો તમારા માટે યોગ્ય પસંદગી કરવા માટે દરેક પદ્ધતિ કેવી રીતે કાર્ય કરે છે તે સમજવું જરૂરી છે.
              </p>
            </section>

            {/* Section 2: Understanding Traditional Braces */}
            <section id="traditional-braces" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૨. પરંપરાગત બ્રેસીસને સમજીએ
              </h2>
              <p>
                પરંપરાગત બ્રેસીસ એ દાંતની ગોઠવણી સુધારવા માટેની સમય-સાબિત અને અત્યંત ભરોસાપાત્ર પદ્ધતિ છે. તેમાં મેડિકલ-ગ્રેડ મેટલ અથવા સિરામિક બ્રેકેટ્સ હોય છે જે દરેક દાંતની આગળની સપાટી પર ચોંટાડવામાં આવે છે અને એક પાતળા મેટલ વાયર (archwire) વડે જોડાયેલા હોય છે.
              </p>
              <p>
                સમયાંતરે મુલાકાતો દરમિયાન, તમારા ઓર્થોડોન્ટિસ્ટ આ વાયરને કાળજીપૂર્વક ગોઠવે છે જેથી દાંત પર હળવું દબાણ આવે અને તેઓ ધીમે-ધીમે તેમની યોગ્ય અને સ્વસ્થ જગ્યાએ ગોઠવાય. બ્રેસીસ જટિલ બાઇટ સમસ્યાઓ, તીવ્ર વાંકાચૂંકા દાંત અને ગંભીર ગીચતાની સારવારમાં અત્યંત અસરકારક છે.
              </p>
            </section>

            {/* Section 3: What Are Clear Aligners? */}
            <section id="clear-aligners" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૩. ક્લિયર એલાઈનર્સ શું છે?
              </h2>
              <p>
                ક્લિયર એલાઈનર્સ એક અત્યંત સૌંદર્યલક્ષી અને લગભગ અદ્રશ્ય આધુનિક ઓર્થોડોન્ટિક સોલ્યુશન છે. ફિક્સ મેટલ બ્રેકેટ્સના સ્થાને, તેમાં કસ્ટમ-મેડ, પારદર્શક થર્મોપ્લાસ્ટિક ટ્રેનો ઉપયોગ કરવામાં આવે છે જે તમારા દાંત પર આરામદાયક રીતે ફિટ થઈ જાય છે.
              </p>
              <p>
                દરેક ટ્રે ચોક્કસ દાંત પર સચોટ દબાણ લાવવા માટે ડિઝાઇન કરાયેલી હોય છે. તમારે દરેક ટ્રે સેટને અંદાજે ૧ થી ૨ અઠવાડિયા (દિવસમાં ૨૦ થી ૨૨ કલાક) માટે પહેરવો પડે છે અને ત્યારબાદ ક્રમિક રીતે બીજા સેટ પર જવાનું હોય છે, જે તમારા દાંતને પરફેક્ટ સ્માઈલ તરફ દોરી જાય છે.
              </p>
            </section>

            {/* Section 4: Key Comparison Factors */}
            <section id="comparison-factors" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૪. સરખામણી માટેના મુખ્ય પરિબળો
              </h2>
              <div className="space-y-4 my-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                  <h3 className="font-sans font-bold text-[#081C3A] text-sm">દેખાવ અને સૌંદર્યશાસ્ત્ર</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                    <strong>ક્લિયર એલાઈનર્સ:</strong> સામાન્ય અંતરથી લગભગ અદ્રશ્ય લાગે છે, જે નોકરી કરતા લોકો, યુવાનો અને વ્યાવસાયિકો માટે લોકપ્રિય પસંદગી બનાવે છે.<br/>
                    <strong>પરંપરાગત બ્રેસીસ:</strong> દાંત પર દેખાય છે, જોકે આધુનિક સિરામિક બ્રેસીસ દાંતના રંગના બ્રેકેટ્સ ઓફર કરે છે જેથી તે ઓછા દેખાય.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                  <h3 className="font-sans font-bold text-[#081C3A] text-sm">કાઢવા-પહેરી શકવાની સુવિધા અને સ્વચ્છતા</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                    <strong>ક્લિયર એલાઈનર્સ:</strong> સંપૂર્ણપણે કાઢી શકાય તેવા છે, જેનાથી તમે કોઈપણ પ્રતિબંધ વિના ખોરાક ખાઈ શકો છો અને બ્રશ તથા ફ્લોસ સરળતાથી કરી શકો છો.<br/>
                    <strong>પરંપરાગત બ્રેસીસ:</strong> દાંત પર ફિક્સ હોય છે. દર્દીઓએ વાયરની આસપાસ સફાઈ કરવાની વિશેષ પદ્ધતિઓ શીખવી પડે છે અને સખત કે ચીકણો ખોરાક ટાળવો પડે છે.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                  <h3 className="font-sans font-bold text-[#081C3A] text-sm">આરામ અને દૈનિક ઉપયોગ</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                    <strong>ક્લિયર એલાઈનર્સ:</strong> સોફ્ટ, મેડિકલ-ગ્રેડ પ્લાસ્ટિક ટ્રે અત્યંત આરામદાયક છે અને તેનાથી હોઠ અથવા ગાલની અંદર કોઈ સ્ક્રેચ કે બળતરા થતી નથી.<br/>
                    <strong>પરંપરાગત બ્રેસીસ:</strong> બ્રેકેટ્સ અને વાયર શરૂઆતમાં થોડી સંવેદનશીલતા અથવા હળવી બળતરા પેદા કરી શકે છે, જેને ડેન્ટલ વેક્સ (મીણ) ની મદદથી આરામથી સંભાળી શકાય છે.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Which Orthodontic Option Fits You Best? */}
            <section id="decision-guide" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૫. તમારા માટે કયો વિકલ્પ શ્રેષ્ઠ છે?
              </h2>
              <p>
                તમારા માટે આદર્શ પસંદગી સંપૂર્ણપણે તમારી ક્લિનિકલ જરૂરિયાતો, દૈનિક જીવનશૈલી, શિસ્ત અને બજેટ પર આધારિત છે:
              </p>
              <ul className="space-y-2.5 pl-4 list-disc text-slate-700 text-xs sm:text-sm">
                <li>
                  જો તમને જટિલ જડબાની સમસ્યાઓ હોય, તીવ્ર વાંકાચૂંકા દાંત હોય, અથવા તમે રોજ કેટલા કલાક એલાઈનર્સ પહેર્યા તેનું ધ્યાન રાખવાની જવાબદારી વિના 'ફિક્સ' ટ્રીટમેન્ટ ઈચ્છો છો, તો <strong>પરંપરાગત બ્રેસીસ</strong> પસંદ કરો.
                </li>
                <li>
                  જો સારો દેખાવ, અદ્રશ્યતા, સફાઈની સુવિધા અને ખાવા-પીવાની સ્વતંત્રતા તમારી સર્વોચ્ચ પ્રાથમિકતા હોય અને તમે રોજ ૨૨ કલાક માટે ટ્રે પહેરવાની શિસ્ત જાળવી શકો તેમ હોવ, તો <strong>ક્લિયર એલાઈનર્સ</strong> પસંદ કરો.
                </li>
              </ul>
            </section>

            {/* Section 6: Orthodontic Care */}
            <section id="ortho-care" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૬. ઓર્થોડોન્ટિક સારવાર
              </h2>
              <p>
                પટેલ ડેન્ટલ હોસ્પિટલ, રાજકોટ ખાતે, અમે અમારા નિષ્ણાત ઓર્થોડોન્ટિસ્ટની દેખરેખ હેઠળ આ બંને અદ્યતન સારવારો પ્રદાન કરીએ છીએ. 3D ડિજિટલ ઇન્ટ્રાઓરલ સ્કેનર્સની મદદથી અમે સારવાર શરૂ થાય તે પહેલાં જ તમારી સ્માઈલ કેવી દેખાશે તેનો પ્રીવ્યૂ બતાવી શકીએ છીએ.
              </p>
            </section>

            {/* Section 7: Braces FAQ */}
            <section id="braces-faq" className="scroll-mt-24 space-y-4">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૭. વારંવાર પૂછાતા પ્રશ્નો
              </h2>
              <div className="space-y-3">
                {[
                  {
                    q: "શું ક્લિયર એલાઈનર્સ પણ પરંપરાગત બ્રેસીસ જેટલા જ અસરકારક છે?",
                    a: "હા, મોટાભાગના દર્દીઓ માટે દાંત સીધા કરવામાં ક્લિયર એલાઈનર્સ અત્યંત અસરકારક છે. જો કે, અત્યંત જટિલ બાઇટ અથવા જડબાના હાડકાના ગંભીર કેસો માટે હજી પણ પરંપરાગત બ્રેસીસને શ્રેષ્ઠ માનવામાં આવે છે."
                  },
                  {
                    q: "મારે દિવસમાં કેટલા કલાક ક્લિયર એલાઈનર્સ પહેરવા જોઈએ?",
                    a: "તમારે તમારા એલાઈનર્સ દિવસમાં ૨૦ થી ૨૨ કલાક પહેરવા જ જોઈએ. માત્ર ખાવા-પીવા, બ્રશ અને ફ્લોસ કરવા માટે જ તેને બહાર કાઢવાના હોય છે."
                  },
                  {
                    q: "રાજકોટમાં બ્રેસીસ અને ક્લિયર એલાઈનર્સનો ખર્ચ કેટલો થાય છે?",
                    a: "બ્રેસીસના પ્રકાર (મેટલ, સિરામિક, સેલ્ફ-લાઈગેટિંગ) અથવા પસંદ કરેલ એલાઈનર બ્રાન્ડના આધારે ખર્ચ બદલાય છે. અમે શરૂઆતના ચેકઅપ પછી પારદર્શક અને અનુકૂળ ચૂકવણીના વિકલ્પો આપીએ છીએ."
                  },
                  {
                    q: "શું ઓર્થોડોન્ટિક ટ્રીટમેન્ટ માત્ર બાળકો અથવા કિશોરો માટે જ છે?",
                    a: "બિલકુલ નહીં. કોઈપણ ઉંમરે દાંતને સુરક્ષિત રીતે સીધા કરી શકાય છે. હકીકતમાં, અમારી પાસે સારવાર કરાવતા ઘણા દર્દીઓ પુખ્ત વયના છે જેઓ અદ્રશ્ય એલાઈનર્સ પસંદ કરે છે."
                  }
                ].map((faq, idx) => {
                  const isOpen = activeFaq === idx + 10;
                  return (
                    <div 
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-all duration-200"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx + 10)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-sm sm:text-base text-[#081C3A] hover:bg-slate-50 cursor-pointer focus:outline-none"
                      >
                        <span>{faq.q}</span>
                        <ChevronRight className={`h-4 w-4 text-[#0D9488] shrink-0 transition-transform duration-250 ${isOpen ? 'rotate-90' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-slate-100 bg-slate-50/40"
                          >
                            <div className="px-5 py-4 text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed font-sans">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>

          {/* Final CTA Box */}
          <footer className="mt-12 p-6 sm:p-8 bg-[#081C3A] text-white rounded-2xl sm:rounded-3xl text-center space-y-4">
            <h3 className="font-sans font-black text-xl sm:text-2xl tracking-tight">
              તમારા દાંત સીધા કરવા તૈયાર છો?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-semibold">
              આજે જ પટેલ ડેન્ટલ હોસ્પિટલ સાથે વ્યક્તિગત ઓર્થોડોન્ટિક અથવા ક્લિયર એલાઈનર્સ પરામર્શનું આયોજન કરો.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => openAppointmentModal('Orthodontics')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
              >
                ઓર્થોડોન્ટિક એપોઇન્ટમેન્ટ બુક કરો
              </button>
              <a
                href={getWhatsAppUrl("Hello Patel Dental Hospital, I would like to book an appointment for Orthodontics. Please share the available slots.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
              >
                <Phone className="h-4 w-4" /> અમને વ્હોટ્સએપ કરો
              </a>
            </div>
          </footer>
        </article>
      );
    }

    if (selectedPostId === 'maintain-white-teeth-after-whitening') {
      return (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Back button */}
          <button 
            onClick={handleBackToList}
            className="inline-flex items-center gap-2 text-xs font-black text-[#0D9488] uppercase tracking-wider hover:text-[#081C3A] transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> બ્લોગ લિસ્ટ પર પાછા જાઓ
          </button>

          {/* Article Header */}
          <header className="space-y-4 mb-8 text-left">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
              <Tag className="h-3 w-3" /> કોસ્મેટિક ડેન્ટિસ્ટ્રી
            </span>
            <h1 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] leading-tight tracking-tight text-left">
              દાંત સફેદ કરાવ્યા પછી ચમકતા રાખવા માટેની ૫ મહત્વપૂર્ણ આદતો
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#0D9488]" /> 25 જુલાઈ 2026
              </span>
              <span className="h-1 w-1 bg-slate-300 rounded-full" />
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#0D9488]" /> 4 મિનિટનો સમય
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-10 border border-slate-100 shadow-2xs">
            <img 
              src="/white teeth in rajkot.jpg" 
              alt="White teeth scaling and teeth whitening aftercare guide by cosmetic dentist in Rajkot, Patel Dental Hospital" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Table of Contents & Quick Navigation */}
          <div className="bg-[#FAFAFC] border border-slate-200/60 rounded-2xl p-5 mb-10 text-left">
            <h3 className="font-sans font-bold text-[#081C3A] text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#0D9488]" /> વિષયસૂચિ
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-[#0D9488]">
              <li><a href="#whitening-intro" className="hover:underline flex items-center gap-1">૧. પ્રસ્તાવના <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#habit-1" className="hover:underline flex items-center gap-1">૨. આદત ૧: શરૂઆતના ૪૮ કલાક સફેદ આહાર (White Diet) લો <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#habit-2" className="hover:underline flex items-center gap-1">૩. આદત ૨: મૌખિક સ્વચ્છતાનું પાલન કરો <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#habit-3" className="hover:underline flex items-center gap-1">૪. આદત ૩: રંગીન પીણાં માટે સ્ટ્રોનો ઉપયોગ કરો <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#habit-4" className="hover:underline flex items-center gap-1">૫. આદત ૪: પાણી પીને હાઇડ્રેટેડ રહો <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#habit-5" className="hover:underline flex items-center gap-1">૬. આદત ૫: સમયાંતરે પ્રોફેશનલ ક્લિનિંગ કરાવો <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#whitening-care" className="hover:underline flex items-center gap-1">૭. પટેલ ડેન્ટલ હોસ્પિટલ ખાતે કોસ્મેટિક સારવાર <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#whitening-faq" className="hover:underline flex items-center gap-1">૮. વારંવાર પૂછાતા પ્રશ્નો <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
            </ul>
          </div>

          {/* Article Sections */}
          <div className="prose prose-teal max-w-none text-slate-700 space-y-8 font-sans font-semibold text-sm sm:text-base leading-relaxed text-left">
            
            {/* Section 1: Introduction */}
            <section id="whitening-intro" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૧. પ્રસ્તાવના
              </h2>
              <p>
                પ્રોફેશનલ ટીથ વ્હાઇટનિંગ એ તમારા સ્મિતને સુંદર બનાવવા અને આત્મવિશ્વાસ વધારવાની સૌથી ઝડપી અને અસરકારક રીતોમાંની એક છે. જો કે, સફેદ અને તેજસ્વી સ્મિત મેળવવું એ માત્ર પ્રથમ પગલું છે. સાચો પડકાર તે સુંદર પરિણામોને લાંબા ગાળા સુધી જાળવી રાખવામાં છે.
              </p>
              <p>
                પટેલ ડેન્ટલ હોસ્પિટલ ખાતે વ્હાઇટનિંગ સારવાર કરાવ્યા પછી, તમારા દાંતનું ઇનેમલ (enamel) અસ્થાયી રૂપે વધુ નાજુક અને છિદ્રાળુ હોય છે, જેથી તેના પર ડાઘ પડવાની શક્યતા વધુ રહે છે. તેથી, વ્હાઇટનિંગની અસર લાંબા સમય સુધી ટકાવવા માટે યોગ્ય આદતો અપનાવવી જરૂરી છે.
              </p>
            </section>

            {/* Section 2: Habit 1 */}
            <section id="habit-1" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૨. આદત ૧: શરૂઆતના ૪૮ કલાક સફેદ આહાર (White Diet) લો
              </h2>
              <p>
                સારવાર પછી તરત જ, દાંતના ઇનેમલના છિદ્રો ખુલ્લા હોય છે, જેથી તેઓ શ્યામ રંગના ખોરાકના કણોને ઝડપથી શોષી શકે છે. તેથી અમે પ્રથમ ૪૮ કલાક માટે કડક રીતે 'વ્હાઇટ ડાયેટ' અનુસરવાની ભલામણ કરીએ છીએ:
              </p>
              <ul className="space-y-2 pl-4 list-disc text-slate-700 font-semibold font-sans text-left">
                <li><strong className="text-[#081C3A]">ટાળો:</strong> ચા, કોફી, સોડા, રેડ વાઇન, હળદરવાળી વાનગીઓ/શાકભાજી, સોયા સોસ, બીટ અને ચેરી/બેરી.</li>
                <li><strong className="text-[#081C3A]">લો:</strong> દૂધ, સાદું દહીં, સફેદ ચોખા, વ્હાઇટ સોસ પાસ્તા, પનીર, માછલી, ઈંડાની સફેદી અને બટાકા.</li>
              </ul>
            </section>

            {/* Section 3: Habit 2 */}
            <section id="habit-2" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૩. આદત ૨: મૌખિક સ્વચ્છતાનું ચુસ્તપણે પાલન કરો
              </h2>
              <p>
                દાંત પર પ્લાક (જારી) જામતી રોકવી મહત્વપૂર્ણ છે, કારણ કે પ્લાક ખોરાકના રંગોને આકર્ષે છે અને પકડી રાખે છે, જેનાથી દાંત પીળા અને નિસ્તેજ દેખાય છે.
              </p>
              <p>
                નરમ બ્રશ વડે દિવસમાં બે વાર બ્રશ કરો અને રોજ ફ્લોસ કરો. વ્હાઇટનિંગ પછીની સંભાળ માટે, અમે અઠવાડિયામાં એક કે બે વાર હળવા ડાઘ હટાવનારી નોન-એબ્રેસિવ ટૂથપેસ્ટ વાપરવાની ભલામણ કરીએ છીએ.
              </p>
            </section>

            {/* Section 4: Habit 3 */}
            <section id="habit-3" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૪. આદત ૩: રંગીન પીણાં માટે સ્ટ્રોનો ઉપયોગ કરો
              </h2>
              <p>
                ચા, કોફી કે જ્યુસ સંપૂર્ણપણે છોડી દેવું મુશ્કેલ હોય છે. આ માટે સૌથી સરળ રસ્તો એ છે કે તમે તેને પીવા માટે ઇકો-ફ્રેન્ડલી સ્ટ્રોનો ઉપયોગ કરો.
              </p>
              <p>
                સ્ટ્રોનો ઉપયોગ પીણાંને તમારા આગળના દાંતના સંપર્કમાં આવ્યા વિના સીધા મોંની પાછળ મોકલે છે. આનાથી તમારા આગળના દાંત પર ડાઘ પડવાનું જોખમ ઘણું ઘટી જાય છે.
              </p>
            </section>

            {/* Section 5: Habit 4 */}
            <section id="habit-4" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૫. આદત ૪: પાણી પીને હાઇડ્રેટેડ રહો
              </h2>
              <p>
                આખો દિવસ પૂરતું પાણી પીવું એ દાંત પરના ડાઘ અને સડો રોકવાનો સૌથી સરળ અને અસરકારક ઉપાય છે.
              </p>
              <p>
                કોઈપણ રંગીન ખોરાક કે નાસ્તો લીધા પછી તરત જ સાદા પાણીથી કોગળા કરવાથી રંગીન કણો, શર્કરા અને એસિડ તમારા દાંત પર જામતા પહેલાં ધોવાઈ જાય છે.
              </p>
            </section>

            {/* Section 6: Habit 5 */}
            <section id="habit-5" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૬. આદત ૫: સમયાંતરે પ્રોફેશનલ ક્લિનિંગ કરાવો
              </h2>
              <p>
                તમે ઘરે ગમે તેટલી કાળજી લો, છતાં પણ કેટલાક મહિનાઓ પછી દાંતની આસપાસ કડક કચરો (tartar) અને ડાઘ જમા થઈ જ જાય છે.
              </p>
              <p>
                વર્ષમાં બે વાર નિયમિત સ્કેલિંગ અને પોલિશિંગ માટે ડેન્ટિસ્ટની મુલાકાત લો. અમારા હાઇજિનિસ્ટ કોફી કે ચાના જિદ્દી ડાઘ આરામથી દૂર કરી શકે છે, જેથી તમારું સ્મિત ચમકતું રહે છે. જો તમે ફરીથી દાંત ચમકાવવા માંગતા હોવ, તો અમારી વ્હાઇટનિંગ સારવાર અત્યંત સલામત અને આરામદાયક છે.
              </p>
            </section>

            {/* Section 7: Aesthetic Solutions */}
            <section id="whitening-care" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૭. પટેલ ડેન્ટલ હોસ્પિટલ ખાતે કોસ્મેટિક સારવાર
              </h2>
              <p>
                પટેલ ડેન્ટલ હોસ્પિટલ, રાજકોટ ખાતે, અમે અનુભવી તબીબોની સીધી દેખરેખ હેઠળ પ્રીમિયમ વ્હાઇટનિંગ ટ્રીટમેન્ટ ઓફર કરીએ છીએ જે શાનદાર પરિણામ આપે છે.
              </p>
              <p>
                અમે પેઢા અને મોંને નુકસાન ન કરે તેવી કૂલ-લાઇટ બ્લીચિંગ સિસ્ટમ અને સંવેદનશીલતા ઘટાડતી જેલનો ઉપયોગ કરીએ છીએ જેથી કોઈ પણ પ્રકારના દુખાવા વિના આરામદાયક ટ્રીટમેન્ટ પૂરી થાય.
              </p>
            </section>

            {/* Section 8: Whitening FAQ */}
            <section id="whitening-faq" className="scroll-mt-24 space-y-4">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                ૮. વારંવાર પૂછાતા પ્રશ્નો
              </h2>
              <div className="space-y-3">
                {[
                  {
                    q: "પ્રોફેશનલ ટીથ વ્હાઇટનિંગ કેટલો સમય ચાલે છે?",
                    a: "સરેરાશ, પ્રોફેશનલ વ્હાઇટનિંગનું પરિણામ ૧ થી ૨ વર્ષ સુધી ચાલે છે. આ સંપૂર્ણપણે તમારી ખાવાની આદતો અને મૌખિક સ્વચ્છતા પર આધારિત છે."
                  },
                  {
                    q: "શું દાંત સફેદ કરાવવાથી કાયમી સેન્સિટિવિટી થાય છે?",
                    a: "ના. સારવાર પછી તરત જ જણાતી સહેજ સેન્સિટિવિટી કામચલાઉ હોય છે જે ૨૪ થી ૪૮ કલાકમાં આપોઆપ દૂર થઈ જાય છે. અમે દર્દીના આરામ માટે ખાસ ડિસેન્સિટાઇઝિંગ જેલનો ઉપયોગ કરીએ છીએ."
                  },
                  {
                    q: "શું ચારકોલ (કોલસાવાળી) ટૂથપેસ્ટ દાંત સફેદ રાખવામાં મદદ કરી શકે?",
                    a: "અમે ચારકોલ ટૂથપેસ્ટ વાપરવાની સલાહ આપતા નથી. ચારકોલ ઘણો ખરબચડો હોવાથી તે દાંતના રક્ષણાત્મક પડ (enamel) ને નુકસાન પહોંચાડે છે અને દાંતની સંવેદનશીલતા વધારે છે."
                  },
                  {
                    q: "પ્રોફેશનલ ટીથ વ્હાઇટનિંગ કેટલી વાર કરાવી શકાય?",
                    a: "દાંતના કુદરતી બંધારણની સુરક્ષા માટે અમે વર્ષમાં માત્ર એક જ વાર વ્હાઇટનિંગ કરાવવાની ભલામણ કરીએ છીએ."
                  }
                ].map((faq, idx) => {
                  const isOpen = activeFaq === idx + 20;
                  return (
                    <div 
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-all duration-200"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx + 20)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-sm sm:text-base text-[#081C3A] hover:bg-slate-50 cursor-pointer focus:outline-none"
                      >
                        <span>{faq.q}</span>
                        <ChevronRight className={`h-4 w-4 text-[#0D9488] shrink-0 transition-transform duration-250 ${isOpen ? 'rotate-90' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-slate-100 bg-slate-50/40"
                          >
                            <div className="px-5 py-4 text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed font-sans">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>

          {/* Final CTA Box */}
          <footer className="mt-12 p-6 sm:p-8 bg-[#081C3A] text-white rounded-2xl sm:rounded-3xl text-center space-y-4">
            <h3 className="font-sans font-black text-xl sm:text-2xl tracking-tight">
              તમારું સ્મિત તેજસ્વી બનાવવા તૈયાર છો?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-semibold">
              આજે જ પટેલ ડેન્ટલ હોસ્પિટલ સાથે પ્રોફેશનલ ટીથ વ્હાઇટનિંગ પરામર્શનું આયોજન કરો.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => openAppointmentModal('Teeth Whitening')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
              >
                વ્હાઇટનિંગ એપોઇન્ટમેન્ટ બુક કરો
              </button>
              <a
                href={getWhatsAppUrl("Hello Patel Dental Hospital, I would like to book a Teeth Whitening appointment. Please share the available appointment slots.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
              >
                <Phone className="h-4 w-4" /> અમને વ્હોટ્સએપ કરો
              </a>
            </div>
          </footer>
        </article>
      );
    }

    // Default Fallback details for other mock posts
    const activePost = BLOG_POSTS.find(p => p.id === selectedPostId);
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-left">
        <button 
          onClick={handleBackToList}
          className="inline-flex items-center gap-2 text-xs font-black text-[#0D9488] uppercase tracking-wider hover:text-[#081C3A] transition mb-6 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> બ્લોગ લિસ્ટ પર પાછા જાઓ
        </button>

        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans mb-4">
          {activePost?.category}
        </span>
        <h1 className="font-sans font-black text-2xl sm:text-3xl text-[#081C3A] leading-tight mb-4 text-left">{activePost?.title}</h1>
        <div className="flex gap-4 text-xs font-semibold text-slate-400 mb-8">
          <span>{activePost?.date}</span>
          <span>·</span>
          <span>{activePost?.readingTime}</span>
        </div>

        <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8 border">
          <img src={activePost?.image} alt={activePost?.imageAlt} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>

        <div className="prose max-w-none text-slate-700 space-y-6 font-sans font-semibold text-sm sm:text-base leading-relaxed text-left">
          <p>{activePost?.excerpt}</p>
          <p>
            અમારા તબીબી નિષ્ણાતો હાલમાં આ માર્ગદર્શિકા માટે સંપૂર્ણ માહિતી અને તબીબી ચિત્રોનું સંકલન કરી રહ્યા છે. કૃપા કરીને ટૂંક સમયમાં ફરી મુલાકાત લો અથવા કોઈપણ પ્રશ્નો માટે અમારા ડોક્ટરોનો સીધો સંપર્ક કરો.
          </p>
        </div>

        <div className="mt-10 p-6 bg-slate-50 border border-slate-100 rounded-2xl text-center space-y-4">
          <h3 className="font-sans font-bold text-[#081C3A] text-base">શું તમે વધુ જાણવા માંગો છો?</h3>
          <button
            onClick={() => openAppointmentModal(activePost?.category)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-sans"
          >
            અમારા ડોક્ટરોનો સંપર્ક કરો
          </button>
        </div>
      </div>
    );
  };

  return (
    <div id="blog-page-root" className="bg-[#FAFAFC] min-h-screen">
      
      {/* Page Title Header Banner */}
      <section className="pt-[108px] sm:pt-[124px] lg:pt-[140px] pb-10 bg-white border-b border-slate-100 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[#0D9488] font-extrabold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5 mb-1 font-sans">
              <BookOpen className="h-4 w-4 text-[#0D9488]" /> ડેન્ટલ લાઇબ્રેરી અને પેશન્ટ ગાઇડ્સ
            </span>
            <h1 className="text-[#081C3A] text-2xl sm:text-3xl lg:text-4xl font-sans font-black tracking-tight leading-tight text-center">
              {selectedPostId ? "લેખ વાંચો" : "પટેલ ડેન્ટલ બ્લોગ"}
            </h1>
            <p className="text-slate-700 text-xs sm:text-sm md:text-base font-sans font-semibold leading-relaxed max-w-2xl mx-auto text-center">
              {selectedPostId 
                ? "વૈજ્ઞાનિક પાયા, ક્લિનિકલ પ્રક્રિયાઓ અને ઘરેલું સંભાળની પદ્ધતિઓ સમજો." 
                : "રાજકોટની પટેલ ડેન્ટલ હોસ્પિટલની અનુભવી ડેન્ટલ ટીમ દ્વારા પ્રકાશિત વ્યાવસાયિક માર્ગદર્શિકા, સારવારની વિગતો અને ઓર્થોડોન્ટિક સલાહ."}
            </p>
            <div className="h-[3.5px] w-12 bg-[#0D9488] mx-auto rounded-full mt-3" />
          </div>
        </div>
      </section>

      {/* Main Blog Contents */}
      <section className="py-12 bg-white/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {selectedPostId ? (
              <motion.div
                key="detail-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {renderDetailView()}
              </motion.div>
            ) : (
              <motion.div
                key="list-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-10"
              >
                {/* Search and Category Filters */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-150/80 shadow-3xs">
                  {/* Search Input */}
                  <div className="relative w-full md:max-w-xs">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="ડેન્ટલ ગાઇડ્સ શોધો..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] font-sans font-semibold"
                    />
                  </div>

                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          selectedCategory === cat 
                            ? 'bg-[#0D9488] text-white border border-[#0D9488] shadow-xs' 
                            : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid layout using original premium blog cards */}
                {filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                      <article 
                        key={post.id}
                        className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs transition-all duration-300 flex flex-col group text-left"
                      >
                        {/* Card Image */}
                        <div 
                          onClick={() => handlePostClick(post.id)}
                          className="aspect-[16/10] overflow-hidden bg-white border-b border-slate-100 cursor-pointer relative"
                        >
                          <img 
                            src={post.image} 
                            alt={post.imageAlt || post.title} 
                            className="w-full h-full object-contain transition-all duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Card Content */}
                        <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> {post.date}
                              </span>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {post.readingTime}
                              </span>
                            </div>
                            <h3 
                              onClick={() => handlePostClick(post.id)}
                              className="font-sans font-bold text-[#081C3A] text-base leading-snug group-hover:text-[#0D9488] transition-colors cursor-pointer text-left"
                            >
                              {post.title}
                            </h3>
                            <p className="text-slate-500 text-xs sm:text-sm font-sans font-medium leading-relaxed line-clamp-3 text-left">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-100">
                            <button
                              onClick={() => handlePostClick(post.id)}
                              className="inline-flex items-center gap-1 text-xs font-black text-[#0D9488] uppercase tracking-wider group-hover:gap-1.5 transition-all cursor-pointer"
                            >
                              વધુ વાંચો <span className="font-sans font-black">→</span>
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white border rounded-2xl max-w-md mx-auto p-8 space-y-3">
                    <Search className="h-10 w-10 text-slate-300 mx-auto" />
                    <h3 className="font-sans font-bold text-[#081C3A] text-base">કોઈ ડેન્ટલ માર્ગદર્શિકા મળી નથી</h3>
                    <p className="text-slate-400 text-xs font-medium">
                      કૃપા કરીને તમારા કીવર્ડ બદલો અથવા અન્ય કેટેગરી પસંદ કરો.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
}
