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
    title: 'Dental Implants in Rajkot: Complete Guide to Treatment, Benefits & Cost',
    excerpt: 'Learn about dental implants in Rajkot, including treatment process, benefits, expected results, cost and important factors to consider before treatment.',
    date: '8 August 2026',
    readingTime: '6 min read',
    category: 'Dental Implants',
    image: '/dental implant in rajkot.jpg',
    imageAlt: 'Dental implants treatment guide at Patel Dental Hospital Rajkot',
    seoTitle: 'Dental Implants in Rajkot: Treatment, Benefits & Cost',
    metaDescription: 'Learn about dental implants in Rajkot, including treatment process, benefits, expected results, cost and important factors to consider before treatment.',
    primaryKeyword: 'Dental Implants in Rajkot',
    secondaryKeywords: ['dental implants Rajkot', 'dental implant treatment', 'dental implant cost Rajkot', 'best dental implants Rajkot']
  },
  {
    id: 'braces-vs-clear-aligners',
    title: 'The Path to a Perfect Smile: Braces vs Clear Aligners',
    excerpt: 'Compare braces and clear aligners, including benefits, treatment differences, comfort, appearance and which orthodontic option may suit your smile goals.',
    date: '1 August 2026',
    readingTime: '5 min read',
    category: 'Orthodontics',
    image: '/cline aliner in rajkot.jpg',
    imageAlt: 'Braces vs clear aligners comparison at Patel Dental Hospital Rajkot',
    seoTitle: 'Braces vs Clear Aligners: Which Is Right for You?',
    metaDescription: 'Compare braces and clear aligners, including benefits, treatment differences, comfort, appearance and which orthodontic option may suit your smile goals.',
    primaryKeyword: 'Braces vs Clear Aligners',
    secondaryKeywords: ['braces treatment Rajkot', 'clear aligners Rajkot', 'invisible aligners', 'braces vs aligners']
  },
  {
    id: 'maintain-white-teeth-after-whitening',
    title: '5 Vital Habits for Maintaining Pearly White Teeth Post-Whitening',
    excerpt: 'Discover 5 simple habits to maintain whiter, healthier teeth after professional whitening, including oral care, food choices, hydration and dental check-ups.',
    date: '25 July 2026',
    readingTime: '4 min read',
    category: 'Cosmetic Dentistry',
    image: '/white teeth in rajkot.jpg',
    imageAlt: 'Teeth whitening aftercare tips at Patel Dental Hospital Rajkot',
    seoTitle: '5 Habits for Maintaining Pearly White Teeth After Whitening',
    metaDescription: 'Discover 5 simple habits to maintain whiter, healthier teeth after professional whitening, including oral care, food choices, hydration and dental check-ups.',
    primaryKeyword: 'maintain white teeth after whitening',
    secondaryKeywords: ['teeth whitening Rajkot', 'white teeth after whitening', 'teeth whitening aftercare', 'professional teeth whitening']
  }
];

interface BlogsProps {
  openAppointmentModal: (preselectedTreatment?: string) => void;
  setCurrentPage: (page: any) => void;
}

export default function Blogs({ openAppointmentModal, setCurrentPage }: BlogsProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const selectedPost = BLOG_POSTS.find(p => p.id === selectedPostId);

  useSEO({
    title: selectedPost 
      ? `${selectedPost.seoTitle} | Patel Dental Hospital`
      : 'Dental Blog & Patient Education | Patel Dental Hospital Rajkot',
    description: selectedPost
      ? selectedPost.metaDescription
      : 'Stay informed with the Patel Dental Hospital Blog. Read professional dental advice, implant guides, clear aligner comparisons, and oral hygiene tips.',
    keywords: selectedPost
      ? `${selectedPost.primaryKeyword}, ${selectedPost.secondaryKeywords.join(', ')}`
      : 'Dental Implants Rajkot, Dental Blog Rajkot, Patel Dental Hospital Blog, Best Implant Dentist Rajkot, Dentist Blog Gujarat',
    canonicalUrl: selectedPost
      ? `${window.location.origin}/#blog/${selectedPost.id}`
      : `${window.location.origin}/#academy`,
    ogTitle: selectedPost ? selectedPost.seoTitle : undefined,
    ogDescription: selectedPost ? selectedPost.metaDescription : undefined,
    ogImage: selectedPost ? selectedPost.image : undefined,
    ogType: selectedPost ? 'article' : 'website',
    schema: selectedPost ? {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${window.location.origin}/#blog/${selectedPost.id}`
      },
      "headline": selectedPost.title,
      "description": selectedPost.metaDescription,
      "image": `${window.location.origin}${selectedPost.image}`,
      "datePublished": selectedPost.id === 'dental-implants-rajkot' ? '2026-08-08' : selectedPost.id === 'braces-vs-clear-aligners' ? '2026-08-01' : '2026-07-25',
      "dateModified": selectedPost.id === 'dental-implants-rajkot' ? '2026-08-08' : selectedPost.id === 'braces-vs-clear-aligners' ? '2026-08-01' : '2026-07-25',
      "author": {
        "@type": "Organization",
        "name": "Patel Dental Hospital",
        "url": "https://www.pateldentalhospital.com/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Patel Dental Hospital",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/LOGO 3D FULL NAME WHITE (3)-1.png`
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

  const categories = ['All', 'Dental Implants', 'Orthodontics', 'Cosmetic Dentistry'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Render Single Blog Post Detail: Dental Implants Guide
  const renderDetailView = () => {
    if (selectedPostId === 'dental-implants-rajkot') {
      return (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Back button */}
          <button 
            onClick={handleBackToList}
            className="inline-flex items-center gap-2 text-xs font-black text-[#0D9488] uppercase tracking-wider hover:text-[#081C3A] transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog List
          </button>

          {/* Article Header */}
          <header className="space-y-4 mb-8">
            <span className="inline-flex items-center gap-1 bg-teal-50 text-[#0D9488] border border-teal-100 text-[10px] sm:text-xs font-extrabold uppercase px-3 py-1 rounded-full">
              <Tag className="h-3 w-3" /> Dental Implants
            </span>
            <h1 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] leading-tight tracking-tight">
              Dental Implants in Rajkot: Complete Guide to Treatment, Benefits & Cost
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#0D9488]" /> 8 August 2026
              </span>
              <span className="h-1 w-1 bg-slate-300 rounded-full" />
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#0D9488]" /> 6 min read
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-10 border border-slate-100 shadow-2xs">
            <img 
              src="/dental implant in rajkot.jpg" 
              alt="Dental implants treatment guide at Patel Dental Hospital Rajkot" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Table of Contents & Quick Navigation */}
          <div className="bg-[#FAFAFC] border border-slate-200/60 rounded-2xl p-5 mb-10">
            <h3 className="font-sans font-bold text-[#081C3A] text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#0D9488]" /> Table of Contents
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-[#0D9488]">
              <li><a href="#intro" className="hover:underline flex items-center gap-1">1. Introduction <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#what-are" className="hover:underline flex items-center gap-1">2. What Are Dental Implants? <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#who-can" className="hover:underline flex items-center gap-1">3. Who Can Consider Dental Implants? <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#benefits" className="hover:underline flex items-center gap-1">4. Benefits of Dental Implants <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#process" className="hover:underline flex items-center gap-1">5. Dental Implant Treatment Process <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#how-long" className="hover:underline flex items-center gap-1">6. How Long Does It Take? <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#cost" className="hover:underline flex items-center gap-1">7. Dental Implant Cost in Rajkot <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#aftercare" className="hover:underline flex items-center gap-1">8. Dental Implant Aftercare <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#why-choose" className="hover:underline flex items-center gap-1">9. Why Choose Patel Dental Hospital <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#faq" className="hover:underline flex items-center gap-1">10. Frequently Asked Questions <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
            </ul>
          </div>

          {/* Article Sections */}
          <div className="prose prose-teal max-w-none text-slate-600 space-y-8 font-sans font-medium text-sm sm:text-base leading-relaxed">
            
            {/* Section 1: Introduction */}
            <section id="intro" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                1. Introduction
              </h2>
              <p>
                Missing teeth can impact more than just the appearance of your smile; they can affect your chewing ability, speech, and long-term oral health structure. While traditional tooth replacement solutions like dentures or conventional bridges have been common for decades, modern dental medicine offers a highly durable, permanent option: <strong>dental implants</strong>.
              </p>
              <p>
                Dental implants have revolutionized restorative dentistry. They look, function, and feel like your natural teeth, restoring both oral health and patient confidence. If you are considering replacing a missing tooth or multiple teeth, our advanced <a href="#services/dental-implants" className="text-[#0D9488] font-bold hover:underline">dental implants treatment</a> is the first step toward reclaiming a complete, healthy smile.
              </p>
            </section>

            {/* Section 2: What Are Dental Implants? */}
            <section id="what-are" className="scroll-mt-24 space-y-4">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                2. What Are Dental Implants?
              </h2>
              <p>
                A dental implant is essentially a bio-compatible root replacement that is safely anchored directly into the jawbone. It serves as a strong, permanent foundation for mounting artificial replacement teeth. Unlike other tooth-replacement options, a dental implant consists of three key components:
              </p>
              <ul className="space-y-3 pl-4 list-disc text-slate-600">
                <li>
                  <strong className="text-[#081C3A]">Dental Implant (The Post):</strong> A small screw-like post made of medical-grade titanium. It is surgically positioned into the jawbone, where it eventually integrates with the natural bone over a period of healing.
                </li>
                <li>
                  <strong className="text-[#081C3A]">The Abutment:</strong> A connector piece fitted over the top of the titanium post. Its primary job is to hold and secure the final artificial tooth crown in place.
                </li>
                <li>
                  <strong className="text-[#081C3A]">The Dental Crown:</strong> The visible, custom-designed artificial tooth that is color-matched to your surrounding natural teeth, restoring seamless visual aesthetics and full chewing function.
                </li>
              </ul>
            </section>

            {/* Section 3: Who Can Consider Dental Implants? */}
            <section id="who-can" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                3. Who Can Consider Dental Implants?
              </h2>
              <p>
                Dental implants are suitable for many adult patients who have lost one or more teeth due to decay, gum disease, or trauma. However, suitability is not universal and depends on several key medical and anatomical factors:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                  <h4 className="font-bold text-[#081C3A] text-sm">Oral & Jawbone Health</h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    Patients must have healthy gums and sufficient jawbone density to support the titanium post. If bone loss has occurred, a bone graft may be recommended beforehand.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                  <h4 className="font-bold text-[#081C3A] text-sm">Overall General Health</h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    Chronic conditions like diabetes or active cardiovascular issues must be managed and discussed. A professional clinical evaluation determines your exact eligibility.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Benefits of Dental Implants */}
            <section id="benefits" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                4. Benefits of Dental Implants
              </h2>
              <p>
                Choosing dental implants provides numerous long-term health and clinical advantages over alternative restorative dental procedures:
              </p>
              <div className="space-y-2.5 my-3">
                {[
                  { title: "Natural-looking appearance", desc: "Crafted to closely replicate the contour, color, and translucency of surrounding teeth." },
                  { title: "Improved chewing & biting capacity", desc: "Firmly anchored in the bone, permitting you to eat hard, crunchy, and tough foods comfortably." },
                  { title: "Better speech & phonetic clarity", desc: "Unlike slipping dentures, implants stay absolutely stationary, preventing slurring or mumbling." },
                  { title: "Long-term tooth replacement", desc: "Designed as a highly durable, permanent restorative solution with proper regular upkeep." },
                  { title: "Helps restore smile confidence", desc: "Allows patients to smile, laugh, and converse openly without worrying about missing teeth." },
                  { title: "Preserves adjacent teeth", desc: "Does not require altering or reducing adjacent healthy teeth in the same way as a conventional bridge." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#081C3A] block text-sm sm:text-base">{item.title}</strong>
                      <span className="text-xs sm:text-sm text-slate-500">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Dental Implant Treatment Process */}
            <section id="process" className="scroll-mt-24 space-y-4">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                5. Dental Implant Treatment Process
              </h2>
              <p>
                A dental implant treatment is a meticulous multi-step clinical process designed to ensure structural safety and optimal aesthetic success:
              </p>
              <div className="relative border-l-2 border-teal-100 pl-6 ml-3 space-y-6">
                {[
                  { step: "Step 1", title: "Consultation & Examination", desc: "A comprehensive initial clinical assessment of your teeth, jawbone health, and medical history." },
                  { step: "Step 2", title: "Digital Scans & 3D X-rays", desc: "High-resolution 3D CBCT imaging to accurately evaluate bone structure and safely map anatomical nerve paths." },
                  { step: "Step 3", title: "Treatment Planning", desc: "Designing a customized computer-guided surgical template tailored to your specific jaw anatomy." },
                  { step: "Step 4", title: "Implant Placement", desc: "A minor surgical procedure performed under local anesthesia to precisely position the titanium post in the bone." },
                  { step: "Step 5", title: "Healing & Integration", desc: "A process called osseointegration, taking several weeks to months, where the bone naturally fuses with the titanium post." },
                  { step: "Step 6", title: "Crown Placement", desc: "Once integration is complete, a custom dental crown is fabricated and safely mounted on the implant abutment." },
                  { step: "Step 7", title: "Follow-up & Care", desc: "Regular post-treatment evaluations to monitor clinical healing, gum integration, and maintain long-term safety." }
                ].map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 bg-white border-2 border-[#0D9488] rounded-full flex items-center justify-center">
                      <div className="h-1.5 w-1.5 bg-[#0D9488] rounded-full" />
                    </div>
                    <span className="text-[10px] font-black text-[#0D9488] uppercase tracking-widest">{step.step}</span>
                    <h4 className="font-bold text-sm sm:text-base text-[#081C3A] leading-tight mb-1">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: How Long Does Dental Implant Treatment Take? */}
            <section id="how-long" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                6. How Long Does Dental Implant Treatment Take?
              </h2>
              <p>
                Treatment duration varies significantly depending on the patient's individual condition, the number of implants, jawbone density, healing rates, and the complexity of the treatment plan. 
              </p>
              <p>
                Typically, the entire process can range from 3 to 6 months. In cases where bone density is low and bone grafting is required before placement, the process can take longer to ensure absolute safety and structural integrity. Conversely, specific cases might be eligible for modern immediate-loading solutions. Your dental surgeon will outline a realistic, safe timeline based on your clinical scans.
              </p>
            </section>

            {/* Section 7: Dental Implant Cost in Rajkot */}
            <section id="cost" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                7. Dental Implant Cost in Rajkot
              </h2>
              <div className="p-4 sm:p-5 bg-teal-50/50 border border-teal-100/70 rounded-2xl flex gap-3.5 items-start">
                <AlertCircle className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <h4 className="font-bold text-[#081C3A] text-sm sm:text-base">Personalized Pricing After Consultation</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Treatment cost varies depending on the implant system, number of implants, crown type, bone condition, and individual treatment requirements. A personalized estimate is provided after consultation.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8: Dental Implant Aftercare */}
            <section id="aftercare" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                8. Dental Implant Aftercare
              </h2>
              <p>
                Proper maintenance is essential to ensure the long-term success and durability of your dental implants. Patients should practice diligent post-care:
              </p>
              <ul className="space-y-2.5 pl-4 list-disc text-slate-600 text-xs sm:text-sm">
                <li>
                  <strong className="text-[#081C3A]">Maintain Excellent Oral Hygiene:</strong> Brush twice a day with a soft-bristled toothbrush, floss regularly, and use non-abrasive toothpastes to keep surrounding gums clean.
                </li>
                <li>
                  <strong className="text-[#081C3A]">Follow Dentist's Instructions:</strong> Adhere strictly to any dietary guidelines or temporary soft-food phases recommended immediately following the surgical placement.
                </li>
                <li>
                  <strong className="text-[#081C3A]">Attend Follow-up Appointments:</strong> Keep all scheduled post-op checkups so our clinical team can evaluate integration progress and soft-tissue health.
                </li>
                <li>
                  <strong className="text-[#081C3A]">Avoid Smoking:</strong> Tobacco use significantly impairs bone healing and decreases the long-term success rate of dental implants.
                </li>
                <li>
                  <strong className="text-[#081C3A]">Report Any Concerns:</strong> Immediately contact the dental team if you experience unusual throbbing pain, sudden excessive swelling, or feel any movement in the implant.
                </li>
              </ul>
            </section>

            {/* Section 9: Why Choose Patel Dental Hospital for Dental Implants? */}
            <section id="why-choose" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                9. Why Choose Patel Dental Hospital for Dental Implants?
              </h2>
              <p>
                At Patel Dental Hospital, Rajkot, we follow strict clinical standards and state-of-the-art diagnostic protocols to deliver comfortable, highly precise dental implant treatments:
              </p>
              <ul className="space-y-2.5 pl-4 list-disc text-slate-600 text-xs sm:text-sm">
                <li>
                  <strong className="text-[#081C3A]">18+ Years of Clinical Expertise:</strong> Led by Dr. Vipul Patel, our experienced surgical team has safely placed thousands of implants, adhering to international guidelines.
                </li>
                <li>
                  <strong className="text-[#081C3A]">In-House 3D CBCT Imaging:</strong> We utilize advanced, low-radiation Cone Beam Computed Tomography inside our facility, allowing us to perform precise bone mapping and treatment planning without third-party lab delays.
                </li>
                <li>
                  <strong className="text-[#081C3A]">USA-Standard Sterilization:</strong> Patient safety is safeguarded by medical-grade Grade B vacuum autoclaves, UV-C isolation cabinets, and strict clinical hygiene protocols.
                </li>
                <li>
                  <strong className="text-[#081C3A]">Premium Bio-Compatible Systems:</strong> We source only internationally trusted, extensively researched implant systems made from premium biocompatible titanium and zirconia materials.
                </li>
              </ul>
            </section>

            {/* Section 10: Frequently Asked Questions */}
            <section id="faq" className="scroll-mt-24 space-y-4">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                10. Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {[
                  {
                    q: "Are dental implants painful?",
                    a: "The implant placement procedure is performed under local anesthesia, meaning you should feel minimal to no discomfort during surgery. Mild soreness or swelling may be present for a few days after, which is manageable with standard prescribed pain medication."
                  },
                  {
                    q: "How long do dental implants last?",
                    a: "With correct home hygiene, daily flossing, regular professional dental checkups, and cleanings, a dental implant can serve as a lifelong permanent tooth replacement solution."
                  },
                  {
                    q: "Can anyone get dental implants?",
                    a: "Most healthy adult patients with suitable bone density are excellent candidates. A thorough clinical assessment, 3D CBCT scan, and general health review are required to determine safety."
                  },
                  {
                    q: "How long does the treatment take?",
                    a: "The timeline ranges from 3 to 6 months. This allows the implant post to securely fuse with the bone (osseointegration) before the permanent, custom-designed crown is placed."
                  },
                  {
                    q: "Can dental implants look natural?",
                    a: "Yes. Every crown is meticulously customized in our dental lab to match the exact translucent properties, contours, and color shade of your natural teeth, creating a completely seamless look."
                  },
                  {
                    q: "How do I know if dental implants are right for me?",
                    a: "The absolute best way is to schedule a professional consultation. Our clinical team will perform diagnostic scans, evaluate your jaw health, and outline your suitable treatment paths."
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
                            <div className="px-5 py-4 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed font-sans">
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
              Ready to Restore Your Smile?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-medium">
              Book a consultation with Patel Dental Hospital to discuss your dental implant treatment options.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => openAppointmentModal('Dental Implants')}
                className="px-6 py-3 bg-[#0D9488] hover:bg-teal-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
              >
                Book Free Consultation
              </button>
              <a
                href="https://wa.me/919510397046"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Phone className="h-4 w-4" /> WhatsApp Us
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
            <ArrowLeft className="h-4 w-4" /> Back to Blog List
          </button>

          {/* Article Header */}
          <header className="space-y-4 mb-8">
            <span className="inline-flex items-center gap-1 bg-teal-50 text-[#0D9488] border border-teal-100 text-[10px] sm:text-xs font-extrabold uppercase px-3 py-1 rounded-full">
              <Tag className="h-3 w-3" /> Orthodontics
            </span>
            <h1 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] leading-tight tracking-tight">
              Braces vs Clear Aligners: Which Is Right for You?
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#0D9488]" /> 1 August 2026
              </span>
              <span className="h-1 w-1 bg-slate-300 rounded-full" />
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#0D9488]" /> 5 min read
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-10 border border-slate-100 shadow-2xs">
            <img 
              src="/cline aliner in rajkot.jpg" 
              alt="Braces vs clear aligners comparison at Patel Dental Hospital Rajkot" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Table of Contents & Quick Navigation */}
          <div className="bg-[#FAFAFC] border border-slate-200/60 rounded-2xl p-5 mb-10">
            <h3 className="font-sans font-bold text-[#081C3A] text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#0D9488]" /> Table of Contents
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-[#0D9488]">
              <li><a href="#braces-intro" className="hover:underline flex items-center gap-1">1. Introduction <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#traditional-braces" className="hover:underline flex items-center gap-1">2. Understanding Traditional Braces <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#clear-aligners" className="hover:underline flex items-center gap-1">3. What Are Clear Aligners? <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#comparison-factors" className="hover:underline flex items-center gap-1">4. Key Comparison Factors <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#decision-guide" className="hover:underline flex items-center gap-1">5. Which Option Is Best For You? <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#ortho-care" className="hover:underline flex items-center gap-1">6. Orthodontic Care at PDH <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#braces-faq" className="hover:underline flex items-center gap-1">7. Frequently Asked Questions <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
            </ul>
          </div>

          {/* Article Sections */}
          <div className="prose prose-teal max-w-none text-slate-600 space-y-8 font-sans font-medium text-sm sm:text-base leading-relaxed">
            
            {/* Section 1: Introduction */}
            <section id="braces-intro" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                1. Introduction
              </h2>
              <p>
                A straight, healthy smile does wonders for your confidence and oral health. Orthodontic treatment has advanced significantly over the years, giving patients more treatment choices than ever before. If you are looking to correct misaligned, crowded, or spaced teeth, the decision typically comes down to two major modern solutions: <strong>Traditional Braces</strong> and <strong>Clear Aligners</strong>.
              </p>
              <p>
                Both systems are designed to safely and gradually move your teeth into optimal cosmetic and functional alignment. However, they differ in terms of aesthetics, comfort, cost, care, and daily lifestyle. Choosing the right one requires a solid understanding of how each works and how they align with your smile goals.
              </p>
            </section>

            {/* Section 2: Understanding Traditional Braces */}
            <section id="traditional-braces" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                2. Understanding Traditional Braces
              </h2>
              <p>
                Traditional braces are a time-tested, highly dependable system for correcting orthodontic misalignment. They consist of medical-grade metal or ceramic brackets securely bonded to the front of each tooth, connected by a specialized thin metal archwire.
              </p>
              <p>
                During periodic visits, your orthodontist carefully adjusts the archwire to apply constant, gentle pressure, encouraging your teeth to migrate to their correct, healthy positions. Braces are highly effective at treating complex bite issues, severe rotations, and deep vertical misalignments.
              </p>
            </section>

            {/* Section 3: What Are Clear Aligners? */}
            <section id="clear-aligners" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                3. What Are Clear Aligners?
              </h2>
              <p>
                Clear aligners represent a highly aesthetic, virtually invisible modern orthodontic solution. Instead of fixed metal brackets, they utilize a sequential series of custom-made, clear thermoplastic trays that fit snugly and comfortably over your teeth.
              </p>
              <p>
                Each tray is designed to apply precise, strategic force to specific teeth. You wear each set of trays for about 1 to 2 weeks (for 20 to 22 hours per day) before progressing to the next set in the sequence, gradually and comfortably guiding your teeth to a perfect smile alignment.
              </p>
            </section>

            {/* Section 4: Key Comparison Factors */}
            <section id="comparison-factors" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                4. Key Comparison Factors
              </h2>
              <div className="space-y-4 my-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                  <h4 className="font-bold text-[#081C3A] text-sm">Visual Appearance & Aesthetics</h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    <strong>Clear Aligners:</strong> Virtually invisible from a normal distance, making them a popular choice for working adults, teens, and professionals seeking a discreet treatment.<br/>
                    <strong>Traditional Braces:</strong> Visible, though modern ceramic braces offer clear or tooth-colored brackets to reduce visual impact.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                  <h4 className="font-bold text-[#081C3A] text-sm">Removability & Oral Hygiene</h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    <strong>Clear Aligners:</strong> Completely removable, allowing you to eat, brush, and floss normally without any food restrictions or cleaning difficulties.<br/>
                    <strong>Traditional Braces:</strong> Fixed in place. Patients must learn careful cleaning techniques to brush around wires and avoid hard or sticky foods.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                  <h4 className="font-bold text-[#081C3A] text-sm">Comfort & Daily Wear</h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    <strong>Clear Aligners:</strong> Smooth, medical-grade plastic trays are highly comfortable and won't scratch or irritate your lips or inner cheeks.<br/>
                    <strong>Traditional Braces:</strong> Brackets and wires may occasionally cause initial sensitivity or mild soft-tissue irritation, which is easily managed with dental wax.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Which Orthodontic Option Fits You Best? */}
            <section id="decision-guide" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                5. Which Orthodontic Option Fits You Best?
              </h2>
              <p>
                The ideal orthodontic choice depends entirely on your specific clinical requirements, daily lifestyle habits, self-discipline, and budget:
              </p>
              <ul className="space-y-2.5 pl-4 list-disc text-slate-600 text-xs sm:text-sm">
                <li>
                  Choose <strong className="text-[#081C3A]">Traditional Braces</strong> if you have severe skeletal alignment issues, complex bite discrepancies, or if you prefer a "set-and-forget" treatment without the responsibility of managing daily tray removal.
                </li>
                <li>
                  Choose <strong className="text-[#081C3A]">Clear Aligners</strong> if you value premium visual aesthetics, desire completely unrestricted dietary freedom, and are highly committed to wearing your plastic trays for at least 22 hours every single day.
                </li>
              </ul>
            </section>

            {/* Section 6: Orthodontic Care at Patel Dental Hospital */}
            <section id="ortho-care" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                6. Orthodontic Care at Patel Dental Hospital
              </h2>
              <p>
                At Patel Dental Hospital, Rajkot, we provide advanced, fully digitalized orthodontic assessments. We offer both standard <a href="#services/braces-treatment" className="text-[#0D9488] font-bold hover:underline">Braces Treatment</a> and premium, custom-designed <a href="#services/invisible-aligners" className="text-[#0D9488] font-bold hover:underline">Invisible Aligners</a> to deliver the highest clinical precision and maximum patient comfort.
              </p>
              <p>
                Our specialized team utilizes cutting-edge intraoral digital scanners and advanced computerized planning software to simulate your beautiful, straight smile even before starting treatment, helping you proceed with absolute confidence.
              </p>
            </section>

            {/* Section 7: Frequently Asked Questions */}
            <section id="braces-faq" className="scroll-mt-24 space-y-4">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                7. Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {[
                  {
                    q: "Are clear aligners as effective as traditional braces?",
                    a: "Yes. For a vast majority of mild, moderate, and common orthodontic alignment cases, clear aligners are exceptionally effective and offer identical clinical results to traditional braces, with much better comfort."
                  },
                  {
                    q: "How many hours a day do I need to wear aligners?",
                    a: "You must wear your clear aligner trays for at least 20 to 22 hours per day. They should only be removed during meals, when drinking hot liquids, and while brushing your teeth."
                  },
                  {
                    q: "Does braces treatment hurt?",
                    a: "The placement of braces or new aligner trays is painless. You may feel mild tightness or soreness for a few days after adjustments as your teeth adapt and begin moving, which is entirely normal."
                  },
                  {
                    q: "What is the average treatment duration?",
                    a: "The average orthodontic treatment timeline ranges from 12 to 24 months, depending on the complexity of your alignment goals and overall compliance."
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
                            <div className="px-5 py-4 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed font-sans">
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
              Ready to Achieve a Straighter Smile?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-medium">
              Book a comprehensive orthodontic assessment at Patel Dental Hospital to find your perfect treatment path.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => openAppointmentModal('Invisible Aligners')}
                className="px-6 py-3 bg-[#0D9488] hover:bg-teal-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
              >
                Book Orthodontic Consultation
              </button>
              <a
                href="https://wa.me/919510397046"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Phone className="h-4 w-4" /> WhatsApp Us
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
            <ArrowLeft className="h-4 w-4" /> Back to Blog List
          </button>

          {/* Article Header */}
          <header className="space-y-4 mb-8">
            <span className="inline-flex items-center gap-1 bg-teal-50 text-[#0D9488] border border-teal-100 text-[10px] sm:text-xs font-extrabold uppercase px-3 py-1 rounded-full">
              <Tag className="h-3 w-3" /> Cosmetic Dentistry
            </span>
            <h1 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] leading-tight tracking-tight">
              5 Habits for Maintaining Pearly White Teeth After Whitening
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#0D9488]" /> 25 July 2026
              </span>
              <span className="h-1 w-1 bg-slate-300 rounded-full" />
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#0D9488]" /> 4 min read
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-10 border border-slate-100 shadow-2xs">
            <img 
              src="/white teeth in rajkot.jpg" 
              alt="Teeth whitening aftercare tips at Patel Dental Hospital Rajkot" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Table of Contents & Quick Navigation */}
          <div className="bg-[#FAFAFC] border border-slate-200/60 rounded-2xl p-5 mb-10">
            <h3 className="font-sans font-bold text-[#081C3A] text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#0D9488]" /> Table of Contents
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-[#0D9488]">
              <li><a href="#whitening-intro" className="hover:underline flex items-center gap-1">1. Introduction <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#habit-1" className="hover:underline flex items-center gap-1">2. Habit 1: Stick to the "White Diet" <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#habit-2" className="hover:underline flex items-center gap-1">3. Habit 2: Diligent Daily Hygiene <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#habit-3" className="hover:underline flex items-center gap-1">4. Habit 3: Use a Straw for Drinks <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#habit-4" className="hover:underline flex items-center gap-1">5. Habit 4: Stay Well Hydrated <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#habit-5" className="hover:underline flex items-center gap-1">6. Habit 5: Schedule Regular Cleanings <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#whitening-care" className="hover:underline flex items-center gap-1">7. Aesthetic Solutions at PDH <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
              <li><a href="#whitening-faq" className="hover:underline flex items-center gap-1">8. Frequently Asked Questions <ChevronRight className="h-3 w-3 opacity-60" /></a></li>
            </ul>
          </div>

          {/* Article Sections */}
          <div className="prose prose-teal max-w-none text-slate-600 space-y-8 font-sans font-medium text-sm sm:text-base leading-relaxed">
            
            {/* Section 1: Introduction */}
            <section id="whitening-intro" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                1. Introduction
              </h2>
              <p>
                A professional teeth whitening treatment can instantly remove years of yellowing and deeply embedded stains, leaving you with an incredibly bright, dazzling smile. However, teeth whitening is not a permanent shield against staining; your teeth remain naturally porous and susceptible to new stains over time.
              </p>
              <p>
                To safeguard your beautiful whitening investment and prolong that sparkling brilliance, establishing consistent daily care and dietary habits is essential. Here are 5 vital, dentist-recommended habits to keep your pearly whites looking brighter for much longer.
              </p>
            </section>

            {/* Section 2: Habit 1: Stick to the "White Diet" for the First 48 Hours */}
            <section id="habit-1" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                2. Habit 1: Stick to the "White Diet" for the First 48 Hours
              </h2>
              <p>
                Immediately after professional teeth whitening, the microscopic pores (dentinal tubules) in your tooth enamel are slightly expanded and highly receptive to absorbing dark pigments. 
              </p>
              <p>
                For the first 48 hours, adhere strictly to a clear-colored or white diet:
              </p>
              <ul className="space-y-2 pl-4 list-disc text-slate-600">
                <li><strong className="text-[#081C3A]">Avoid:</strong> Tea, coffee, dark sodas, red wine, turmeric-rich curries, soy sauce, beets, and berries.</li>
                <li><strong className="text-[#081C3A]">Choose:</strong> Milk, plain yogurt, white rice, pasta with white sauces, chicken breast, fish, egg whites, and potatoes.</li>
              </ul>
            </section>

            {/* Section 3: Habit 2: Practice Diligent Daily Oral Hygiene */}
            <section id="habit-2" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                3. Habit 2: Practice Diligent Daily Oral Hygiene
              </h2>
              <p>
                Preventing plaque buildup is crucial, as plaque attracts and holds food pigments, making your teeth appear dull and yellow.
              </p>
              <p>
                Brush twice a day with a soft-bristled toothbrush and daily flossing. For post-whitening care, we recommend using a non-abrasive whitening toothpaste containing mild stain-lifting polishing agents once or twice a week to gently maintain your surface luster.
              </p>
            </section>

            {/* Section 4: Habit 3: Use a Straw for Colored Beverages */}
            <section id="habit-3" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                4. Habit 3: Use a Straw for Colored Beverages
              </h2>
              <p>
                Giving up coffee, iced tea, or juice completely is difficult for many. The easiest compromise is to drink them through a clean, eco-friendly straw.
              </p>
              <p>
                A straw bypasses your front teeth, directing the liquid straight to the back of your mouth. This significantly minimizes direct staining contact with your prominent, visible "smile-zone" teeth.
              </p>
            </section>

            {/* Section 5: Habit 4: Stay Well Hydrated with Water */}
            <section id="habit-4" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                5. Habit 4: Stay Well Hydrated with Water
              </h2>
              <p>
                Drinking water throughout the day is one of the simplest yet most effective ways to combat staining and tooth decay.
              </p>
              <p>
                Rinsing your mouth with plain water immediately after consuming colored foods or snacks washes away loose pigments, sugars, and dental acids before they can settle on your enamel, keeping your smile naturally clean.
              </p>
            </section>

            {/* Section 6: Habit 5: Schedule Regular Professional Dental Cleanings */}
            <section id="habit-5" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                6. Habit 5: Schedule Regular Professional Dental Cleanings
              </h2>
              <p>
                No matter how diligent you are at home, tough mineralized tartar and deep extrinsic stains will eventually build up over several months.
              </p>
              <p>
                Visiting your dentist twice a year for routine scaling and polishing is key. Your hygienist can comfortably polish away stubborn outer coffee or tea stains, keeping your underlying white smile intact. If you want to brighten your teeth again, our professional <a href="#services/teeth-whitening" className="text-[#0D9488] font-bold hover:underline">Teeth Whitening</a> treatment is highly safe, reliable, and comfortable.
              </p>
            </section>

            {/* Section 7: Aesthetic Solutions at Patel Dental Hospital */}
            <section id="whitening-care" className="scroll-mt-24 space-y-3">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                7. Aesthetic Solutions at Patel Dental Hospital
              </h2>
              <p>
                At Patel Dental Hospital, Rajkot, we offer premium, medical-grade tooth whitening treatments that deliver outstanding results under strict clinical supervision.
              </p>
              <p>
                We use advanced, tissue-safe cool light bleaching systems and medical-grade desensitizing agents to ensure you enjoy a completely pain-free, highly comfortable treatment that is customized to your exact baseline shade.
              </p>
            </section>

            {/* Section 8: Frequently Asked Questions */}
            <section id="whitening-faq" className="scroll-mt-24 space-y-4">
              <h2 className="font-sans font-black text-lg sm:text-xl text-[#081C3A] border-b border-slate-100 pb-2">
                8. Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {[
                  {
                    q: "How long does professional teeth whitening last?",
                    a: "On average, professional whitening results last between 1 to 2 years. This depends heavily on your diet, smoking habits, and home hygiene diligence."
                  },
                  {
                    q: "Will teeth whitening cause permanent tooth sensitivity?",
                    a: "No. Any sensitivity felt immediately after a whitening session is temporary and completely resolves within 24 to 48 hours. Our clinic uses special desensitizing gel to ensure comfort."
                  },
                  {
                    q: "Can charcoal toothpaste maintain my white teeth?",
                    a: "We do not recommend charcoal toothpaste. Charcoal is highly abrasive and can wear down your protective enamel over time, exposing the yellow dentin layer beneath."
                  },
                  {
                    q: "How often can I get professional teeth whitening?",
                    a: "We recommend professional whitening no more than once a year to preserve your natural enamel structure and prevent pulp sensitivity."
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
                            <div className="px-5 py-4 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed font-sans">
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
              Ready to Brighten Your Smile?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-medium">
              Schedule a professional teeth whitening consultation with Patel Dental Hospital today.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => openAppointmentModal('Teeth Whitening')}
                className="px-6 py-3 bg-[#0D9488] hover:bg-teal-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
              >
                Book Whitening Appointment
              </button>
              <a
                href="https://wa.me/919510397046"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Phone className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
          </footer>
        </article>
      );
    }

    // Default Fallback details for other mock posts
    const activePost = BLOG_POSTS.find(p => p.id === selectedPostId);
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <button 
          onClick={handleBackToList}
          className="inline-flex items-center gap-2 text-xs font-black text-[#0D9488] uppercase tracking-wider hover:text-[#081C3A] transition mb-6 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog List
        </button>

        <span className="inline-flex items-center gap-1 bg-teal-50 text-[#0D9488] border border-teal-100 text-[10px] uppercase px-3 py-1 rounded-full font-extrabold mb-4">
          {activePost?.category}
        </span>
        <h1 className="font-sans font-black text-2xl sm:text-3xl text-[#081C3A] leading-tight mb-4">{activePost?.title}</h1>
        <div className="flex gap-4 text-xs font-semibold text-slate-400 mb-8">
          <span>{activePost?.date}</span>
          <span>·</span>
          <span>{activePost?.readingTime}</span>
        </div>

        <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8 border">
          <img src={activePost?.image} alt={activePost?.imageAlt} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>

        <div className="prose max-w-none text-slate-600 space-y-6 font-sans font-medium text-sm sm:text-base leading-relaxed">
          <p>{activePost?.excerpt}</p>
          <p>
            Our medical specialists are currently compiling the full text, clinical studies, and medical illustrations for this guide. Please visit again soon or schedule a direct consultation with our clinic doctors for immediate questions.
          </p>
        </div>

        <div className="mt-10 p-6 bg-slate-50 border border-slate-100 rounded-2xl text-center space-y-4">
          <h3 className="font-sans font-bold text-[#081C3A] text-base">Want to learn more?</h3>
          <button
            onClick={() => openAppointmentModal(activePost?.category)}
            className="px-6 py-2.5 bg-[#0D9488] hover:bg-teal-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
          >
            Consult Our Doctors
          </button>
        </div>
      </div>
    );
  };

  return (
    <div id="blog-page-root" className="bg-[#FAFAFC] min-h-screen">
      
      {/* Page Title Header Banner (Always rendered cleanly) */}
      <section className="pt-[108px] sm:pt-[124px] lg:pt-[140px] pb-10 bg-white border-b border-slate-100 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[#0D9488] font-extrabold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5 mb-1">
              <BookOpen className="h-4 w-4 text-[#0D9488]" /> Dental Library & Patient Guides
            </span>
            <h1 className="text-[#081C3A] text-2xl sm:text-3xl lg:text-4xl font-sans font-black tracking-tight leading-tight">
              {selectedPostId ? "Read Article" : "Patel Dental Blog"}
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm md:text-base font-sans font-medium leading-relaxed max-w-2xl mx-auto">
              {selectedPostId 
                ? "Understand the scientific foundations, clinical procedures, and home care practices." 
                : "Professional guidelines, treatment walkthroughs, and orthodontic advice published by the experienced dental team at Patel Dental Hospital, Rajkot."}
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
                      placeholder="Search dental guides..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] font-sans font-medium"
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
                        className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs transition-all duration-300 flex flex-col group"
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
                              className="font-sans font-bold text-[#081C3A] text-base leading-snug group-hover:text-[#0D9488] transition-colors cursor-pointer"
                            >
                              {post.title}
                            </h3>
                            <p className="text-slate-500 text-xs sm:text-sm font-sans leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-100">
                            <button
                              onClick={() => handlePostClick(post.id)}
                              className="inline-flex items-center gap-1 text-xs font-black text-[#0D9488] uppercase tracking-wider group-hover:gap-1.5 transition-all cursor-pointer"
                            >
                              READ MORE <span className="font-sans font-black">→</span>
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white border rounded-2xl max-w-md mx-auto p-8 space-y-3">
                    <Search className="h-10 w-10 text-slate-300 mx-auto" />
                    <h3 className="font-sans font-bold text-[#081C3A] text-base">No dental guides found</h3>
                    <p className="text-slate-400 text-xs">
                      Try adjusting your keywords or selecting a different category.
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
