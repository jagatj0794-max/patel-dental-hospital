/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Calendar, Shield, Sparkles, HeartHandshake, CheckCircle2, 
  Phone, MessageSquare, BadgePercent, Star, Eye, ShieldCheck,
  HelpCircle, ArrowRight, ChevronDown, ChevronUp, Heart,
  Award, MapPin, Mail, Clock, MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { serviceService } from '../utils/serviceData';

// Images
import teethCleaningImg from '../assets/images/teeth_cleaning_1780610893042.png';
import imgCase1Before from '../assets/images/gallery_case1_before_1780611450331.png';
import imgCase1After from '../assets/images/gallery_case1_after_1780611466649.png';
import imgSmileBefore from '../assets/images/smile_before_1780608028713.png';
import imgSmileAfter from '../assets/images/smile_after_1780608044346.png';
import clinicInterior from '../assets/images/patel_clinic_interior_1781166076431.png';
import patelDentalDoctors from '../assets/images/patel_doctors_hero_1781166043226.png';

interface TeethWhiteningProps {
  setCurrentPage: (page: PageId) => void;
  openAppointmentModal: (preselectedTreatment?: string) => void;
}

export default function TeethWhitening({ setCurrentPage, openAppointmentModal }: TeethWhiteningProps) {
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(0);
  const [relatedServices, setRelatedServices] = useState<any[]>([]);
  const [activeMapBranch, setActiveMapBranch] = useState<'gayatrinagar' | 'mavdi'>('gayatrinagar');

  const phoneRaw = "+919510397046";
  const displayPhone = "+91 95103 97046";
  const whatsappRaw = "919510397046";

  // Fetch active services dynamically for the Related Services section
  useEffect(() => {
    let active = true;
    const fetchRelated = async () => {
      try {
        const allServices = await serviceService.getServices();
        if (active) {
          const filtered = allServices
            .filter(item => item.slug !== 'teeth-whitening' && item.is_active)
            .slice(0, 3);
          setRelatedServices(filtered);
        }
      } catch (err) {
        console.error('Failed to load related services in Teeth Whitening page:', err);
      }
    };
    fetchRelated();
    return () => {
      active = false;
    };
  }, []);

  const handleBookClick = () => {
    openAppointmentModal('Teeth Whitening');
  };

  const getWhatsAppUrl = (messageText?: string) => {
    const text = messageText || `Hi Patel Dental Hospital, I'm interested in booking a consultation for Teeth Whitening. Please let me know the next available slot!`;
    return `https://wa.me/919510397046?text=${encodeURIComponent(text)}`;
  };

  const handleNavigateToService = (targetSlug: string) => {
    window.location.hash = `#services/${targetSlug}`;
    setCurrentPage(`services/${targetSlug}` as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', color: 'hover:bg-blue-600' },
    { name: 'Instagram', url: 'https://instagram.com', color: 'hover:bg-pink-600' },
    { name: 'Twitter', url: 'https://twitter.com', color: 'hover:bg-sky-500' },
    { name: 'YouTube', url: 'https://youtube.com', color: 'hover:bg-red-600' },
    { name: 'WhatsApp', url: getWhatsAppUrl(), color: 'hover:bg-green-500' },
    { name: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:bg-blue-700' }
  ];

  const whiteningFaqs = [
    {
      id: 1,
      question: "What is professional Teeth Whitening and how does it work?",
      answer: "Professional teeth whitening at Patel Dental Hospital is a cosmetic dental treatment that uses high-performance, safe whitening agents combined with professional scaling, polishing, and specialized ultraviolet light therapy. This advanced process breaks down organic stain molecules deep within the tooth enamel to restore your natural, bright white tooth shade safely and comfortably."
    },
    {
      id: 2,
      question: "What is the difference between Hospital-Based and Home-Based whitening?",
      answer: "Hospital-Based Whitening is an in-office treatment utilizing professional-strength whitening agents and ultraviolet light activation for instant, dramatic results in about 30 minutes. Home-Based Whitening involves custom-fit trays and a milder gel applied at home, offering a safe, convenient, and gradual whitening option under complete clinical guidance."
    },
    {
      id: 3,
      question: "Will teeth whitening cause tooth sensitivity?",
      answer: "Our ultra-modern professional whitening procedures are designed to be completely sensitivity-free. While some individuals may experience minor, temporary cooling sensations or mild sensitivity for a few hours after the procedure, it is completely reversible and subsides quickly, with zero risk of enamel damage."
    },
    {
      id: 4,
      question: "How long do the teeth whitening results typically last?",
      answer: "With proper oral hygiene and routine maintenance, professional whitening results can easily last from 1 to 3 years. To maximize longevity, we recommend minimizing the consumption of heavily staining substances like coffee, tea, red wine, turmeric, or tobacco products."
    },
    {
      id: 5,
      question: "Can teeth whitening remove deep fluorosis or tetracycline stains?",
      answer: "Yes, teeth whitening is highly effective for severe stains. For deep fluorosis or severe intrinsic tetracycline discoloration, Dr. Vipul Patel may recommend a combination of multiple hospital sittings or coordinate a custom plan linking our professional in-office bleaching sessions with a specialized home-based whitening regimen."
    }
  ];

  return (
    <div id="teeth-whitening-page-view" className="relative pt-[72px] bg-[#FAFAFC]">
      
      {/* SECTION 1: Hero Section */}
      <section className="py-16 sm:py-24 bg-white relative z-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              PREMIUM CARE COSMETIC TREATMENT
            </span>
            <h1 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-3">
              Teeth Whitening
            </h1>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            
            {/* Left Side: Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2.5">
                <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-wider uppercase block">
                  PATEL DENTAL HOSPITAL – ADVANCED COSMETIC & ESTHETIC CENTER
                </span>
                <h2 className="font-display font-[900] text-[#081C3A] text-[24px] sm:text-[30px] md:text-[34px] leading-tight tracking-tight">
                  Professional Teeth Whitening
                </h2>
              </div>

              <div className="text-slate-600 text-[14.5px] sm:text-[15.5px] font-medium leading-relaxed space-y-4">
                <p>
                  Teeth Whitening is a cosmetic dental treatment that uses a variety of professional procedures to whiten your natural teeth.
                </p>
                <p>
                  At Patel Dental Hospital, we provide safe, effective and affordable Teeth Whitening using scaling, polishing, bleaching and ultraviolet light therapy to help you achieve a brighter and healthier smile.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleBookClick}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <Calendar className="h-4 w-4" />
                  Book Appointment
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
                
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Right Side: Image with Caption below */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full space-y-4"
            >
              <div className="rounded-[20px] overflow-hidden aspect-video relative shadow-[0_15px_45px_rgba(8,28,58,0.1)] border border-slate-150 bg-slate-50">
                <img
                  src={teethCleaningImg}
                  alt="Teeth Whitening"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-center text-slate-500 text-xs sm:text-sm font-semibold font-sans leading-relaxed italic bg-teal-50/40 py-2.5 px-4 rounded-xl border border-teal-500/10">
                Get a Brighter, Whiter Smile with Advanced Professional Teeth Whitening.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* SECTION 2: What is Teeth Whitening? (Premium Introduction) */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center px-3 py-1 bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-xs font-bold uppercase tracking-widest rounded-full">
                Premium Introduction
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
                What is Teeth Whitening?
              </h2>
              <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed">
                Over time, food pigments, lifestyle habits, and natural aging can make your teeth dull or yellow. Our advanced, clinic-approved Teeth Whitening solution is a scientifically proven, premium procedure designed to restore a dazzling shine and vibrant health to your smile.
              </p>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                By choosing Patel Dental Hospital, you receive safe, simple, and highly affordable treatments utilizing international standards to eliminate stubborn extrinsic stains and build strong aesthetic confidence.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_15px_40px_rgba(8,28,58,0.03)] space-y-4">
                <h3 className="font-display font-black text-slate-800 text-lg border-b border-slate-100 pb-3">
                  Comprehensive Procedures Included
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Professional Whitening</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Doctor-supervised deep enamel brightening</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Scaling Treatment</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Advanced ultrasonic removal of tough plaque</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Air Polishing</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Erases fine superficial tea, coffee, and tobacco stains</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Bleaching Therapy</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Active stain-breaking oxygen compounds</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Ultraviolet Light</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Accelerates whitening action safely</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Safe & Simple Kit</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Sensitivity-free, budget-friendly cosmetic care</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Teeth Whitening Treatment Planning (Process Cards) */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">TREATMENT PLANNING</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Teeth Whitening Protocols
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Hospital-Based Whitening */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#FAFAFC] p-8 rounded-3xl border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black text-[#0D9488]/30 font-mono">
                    01
                  </span>
                  <span className="text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-3 py-1.5 rounded-full">
                    In-Office Express
                  </span>
                </div>
                
                <h3 className="font-display font-extrabold text-[#081C3A] text-lg tracking-tight mb-4">
                  Hospital-Based Teeth Whitening
                </h3>
                
                <p className="text-slate-500 text-xs sm:text-sm font-medium font-sans mb-6">
                  Experience instantaneous transformation under complete doctor supervision. This professional procedure uses high-performance equipment for unmatched speed and safety.
                </p>

                <ul className="space-y-3">
                  {[
                    'Professional whitening procedure',
                    'High concentration whitening agents',
                    'Ultraviolet light activation',
                    'CE Approved Whitening Kit',
                    'FDA Approved Whitening Kit',
                    'Instant whitening in approximately 30 minutes',
                    'Sensitivity-free treatment',
                    'Multiple sittings for severe fluorosis stains if required'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-slate-700">
                      <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold font-sans">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-200/50 uppercase">
                Patel Dental Clinic Whitening Code: PD-HW
              </div>
            </motion.div>

            {/* Home-Based Whitening */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#FAFAFC] p-8 rounded-3xl border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black text-[#0D9488]/30 font-mono">
                    02
                  </span>
                  <span className="text-[10px] uppercase font-black tracking-wider text-[#11B5D8] bg-[#11B5D8]/5 px-3 py-1.5 rounded-full">
                    Take-Home Kit
                  </span>
                </div>
                
                <h3 className="font-display font-extrabold text-[#081C3A] text-lg tracking-tight mb-4">
                  Home-Based Teeth Whitening
                </h3>
                
                <p className="text-slate-500 text-xs sm:text-sm font-medium font-sans mb-6">
                  Whiten your teeth at your own convenience with a custom-engineered clinical kit designed to fit perfectly and deliver professional results gradually.
                </p>

                <ul className="space-y-3">
                  {[
                    'Customized whitening trays',
                    'Mild whitening gel',
                    'Home application',
                    'Safe and easy-to-use kit',
                    'Complete guide manual'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-slate-700">
                      <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold font-sans">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-200/50 uppercase">
                Patel Dental Home Kit Code: PD-HK
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 4: Clinical Gallery */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">SMILE TRANSFORMATION</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Clinical Gallery
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Slide each handle left and right to witness the exact clinical outcomes of our professional teeth whitening treatments.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case 1: Teeth Whitening Case */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCase1Before}
                afterImg={imgCase1After}
                beforeLabel="Severe Extrinsic Stains (Before)"
                afterLabel="Professional Bleaching (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Teeth Whitening Cases
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Stubborn Extrinsic Stain Removal
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Eliminating deep-set yellowing and tobacco/coffee stains through ultrasonic scaling, polishing, and dual-sitting hydrogen bleaching.
                </p>
              </div>
            </div>

            {/* Case 2: Before & After Cases */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgSmileBefore}
                afterImg={imgSmileAfter}
                beforeLabel="Enamel Yellowing (Before)"
                afterLabel="Advanced Bleaching (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Before & After Cases
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Aesthetic Enamel Brightening
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Restoring a radiant smile with advanced, sensitivity-free hospital-based bleaching combined with targeted ultraviolet light.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: Procedure Video */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0EA5C6]/5 to-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Procedure Video Suite</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Teeth Whitening Treatment Video
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Watch this educational dental guide explaining the advanced, safe scientific bleaching process used in modern dental clinics.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-6 shadow-xl max-w-3xl mx-auto">
            <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
              {activeVideos['whitening-proc-vid'] ? (
                <iframe
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  src="https://www.youtube.com/embed/t_p6L6q-C-8?autoplay=1&rel=0"
                  title="Teeth Whitening Procedure Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              ) : (
                <button
                  onClick={() => setActiveVideos(prev => ({ ...prev, 'whitening-proc-vid': true }))}
                  className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                  aria-label="Play Teeth Whitening Procedure Video"
                >
                  <img
                    src="https://img.youtube.com/vi/t_p6L6q-C-8/hqdefault.jpg"
                    alt="Teeth Whitening Procedure Overview"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300 pointer-events-none" />
                  {/* Play Button Icon */}
                  <div className="absolute z-20 flex items-center justify-center w-16 h-16 rounded-full bg-white/95 text-[#0D9488] shadow-md group-hover:scale-110 group-hover:bg-[#0D9488] group-hover:text-white transition-all duration-300 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-7 h-7 translate-x-0.5"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Cost Banner (Premium CTA) */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#081C3A] text-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl relative overflow-hidden space-y-6 max-w-5xl mx-auto">
            {/* Subtle background glows */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0D9488]/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

            <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10">
              <span className="inline-flex items-center gap-1 bg-[#0D9488] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full leading-none">
                Save Up To 50%
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Teeth Whitening
              </h2>
              <p className="text-slate-350 text-xs sm:text-sm leading-relaxed">
                Unlock world-class premium cosmetic smile design. Save up to 50% on professional teeth whitening compared to standard global dentistry costs, utilizing exclusively clinical-certified US FDA and CE approved materials.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-4">
              <a
                href={`tel:${phoneRaw}`}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-[#081C3A] text-xs font-black rounded-xl shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <Phone className="h-4.5 w-4.5 text-[#0D9488]" />
                Call Now: {displayPhone}
              </a>
              
              <a
                href={getWhatsAppUrl(`Hi Patel Dental Hospital, I'm interested in the special offer on Teeth Whitening packages.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black rounded-xl shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4.5 w-4.5" />
                WhatsApp Us: {displayPhone}
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: Hospital / Clinic */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center px-3 py-1 bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-xs font-bold uppercase tracking-widest rounded-full">
                Hospital / Clinic
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
                Our State-of-the-Art Aesthetic Clinic
              </h2>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                Patel Dental Hospital provides world-class dental esthetics led by master cosmetic dentist Dr. Vipul Patel. We combine advanced German-engineered dental chairs, ultra-precise clinical LED whitening arcs, and strict Class 100 sterilization methodologies to deliver the most comfortable and safe treatment experience.
              </p>
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Full In-house Digital Diagnostics and OPG Suite</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Ultra-Modern Specialized Ultraviolet Whitening Systems</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Clinically Tested, Sensitivity-Free Premium Gels Only</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-50">
                <img
                  src={clinicInterior}
                  alt="Patel Dental Hospital State of the Art Operatory"
                  className="w-full aspect-[4/3] object-cover hover:scale-101 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#081C3A]/90 backdrop-blur-xs p-4 rounded-xl text-white text-center">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#0D9488]">PATEL DENTAL CLINIC OPERATORY</p>
                  <p className="text-xs font-sans text-gray-300 mt-1">Providing safe, premium clinical standards for generations</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8: Patient Reviews */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Patient Reviews</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              What Our Patients Say
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Listen to the real life-changing smile experiences shared directly by our happy teeth whitening patients.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-6 shadow-xl max-w-3xl mx-auto">
            <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
              {activeVideos['patient-review-vid'] ? (
                <iframe
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  src="https://www.youtube.com/embed/cyai6CjMD0s?autoplay=1&rel=0"
                  title="Patient Review Testimonial Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              ) : (
                <button
                  onClick={() => setActiveVideos(prev => ({ ...prev, 'patient-review-vid': true }))}
                  className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                  aria-label="Play Patient Review Testimonial Video"
                >
                  <img
                    src="https://img.youtube.com/vi/cyai6CjMD0s/hqdefault.jpg"
                    alt="Patient Testimonial Review"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300 pointer-events-none" />
                  {/* Play Button Icon */}
                  <div className="absolute z-20 flex items-center justify-center w-16 h-16 rounded-full bg-white/95 text-[#0D9488] shadow-md group-hover:scale-110 group-hover:bg-[#0D9488] group-hover:text-white transition-all duration-300 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-7 h-7 translate-x-0.5"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Follow Us */}
      <section className="py-12 md:py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-1.5">
            <span className="text-[10px] text-[#0D9488] font-black uppercase tracking-widest block">Stay Connected</span>
            <h2 className="font-display font-extrabold text-xl text-[#081C3A]">Follow Us</h2>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-2.5 bg-[#FAFAFC] border border-slate-150 text-slate-700 hover:text-white ${link.color} text-xs font-black rounded-full transition-all duration-300 shadow-3xs hover:shadow-md cursor-pointer`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: Hospital Information */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#0D9488]/10 text-[#0D9488] shadow-inner mb-2">
            <Award className="h-8 w-8 stroke-[1.5]" />
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <h3 className="font-display font-black text-2xl text-[#081C3A] tracking-tight">
              Patel Dental Hospital
            </h3>
            <span className="inline-flex items-center gap-1.5 bg-[#0D9488] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              Gujarat's Restorative Healthcare Leader
            </span>
            <p className="text-slate-600 font-sans text-xs sm:text-sm font-semibold leading-relaxed">
              Patel Dental Hospital is one of the top dental hospitals in Gujarat, India. We offer flexible timings, individualized attention, affordability, accurate explanation of treatment, quality assurance, excellent patient care and strict hygiene control.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 11: Related Services (Our Services) */}
      {relatedServices.length > 0 && (
        <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[9px] text-[#0D9488] font-black uppercase tracking-widest block">
                Explore More Solutions
              </span>
              <h2 className="font-display font-black text-2xl text-[#081C3A] tracking-tight">
                Our Services
              </h2>
              <p className="text-slate-500 text-xs">
                Learn about other specialized cosmetic, restorative, and general dental care treatments we offer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedServices.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -3 }}
                  className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-3xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                      <img 
                        src={item.hero_image || 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600'} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="font-display font-bold text-sm text-[#081C3A] line-clamp-1 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {item.short_description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handleNavigateToService(item.slug)}
                      className="w-full py-2 bg-slate-50 hover:bg-[#0D9488]/5 border border-slate-150 text-[#081C3A] hover:text-[#0D9488] text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Learn Details
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 12: Location & Contact */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[9px] text-[#0D9488] font-black uppercase tracking-widest block">
              Directions & Map
            </span>
            <h2 className="font-display font-black text-2xl text-[#081C3A] tracking-tight">
              Location & Contact
            </h2>
            <p className="text-slate-500 text-xs font-sans">
              Visit either of our state-of-the-art branch centers in Rajkot, Gujarat. Click below to load direct navigation routes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Left Side: Address Details and Tabs */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Branch Quick Selector Tabs */}
                <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-100 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveMapBranch('gayatrinagar')}
                    className={`flex-1 py-3 px-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                      activeMapBranch === 'gayatrinagar'
                        ? 'bg-white shadow-[0_4px_12px_rgba(8,28,58,0.04)] text-[#0D9488] border border-slate-100'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Gayatrinagar HQ
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMapBranch('mavdi')}
                    className={`flex-1 py-3 px-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                      activeMapBranch === 'mavdi'
                        ? 'bg-white shadow-[0_4px_12px_rgba(8,28,58,0.04)] text-[#0D9488] border border-slate-100'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Amin Marg Branch
                  </button>
                </div>

                {/* Multi-Branch card information */}
                <div className="bg-slate-50/50 border border-slate-100/70 rounded-[20px] p-6 sm:p-8 space-y-6 hover:shadow-[0_8px_30px_rgba(8,28,58,0.02)] transition-all duration-300">
                  <div className="space-y-4">
                    {/* Hospital Name */}
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#0D9488] block mb-0.5">
                        HOSPITAL NAME
                      </span>
                      <h3 className="font-display font-[900] text-[#081C3A] text-lg">
                        Patel Dental Hospital {activeMapBranch === 'gayatrinagar' ? '(Gayatrinagar Main Branch)' : '(Amin Marg Branch)'}
                      </h3>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-3 pt-4 border-t border-slate-100">
                      <MapPin className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
                          ADDRESS
                        </span>
                        <p className="text-slate-600 font-semibold text-[13px] leading-relaxed">
                          {activeMapBranch === 'gayatrinagar' 
                            ? 'Rameshwar Complex, 1st Floor, Opp SBI Bank, Gayatrinagar Main Road, Jalaram Chowk, Bhaktinagar Circle, Rajkot, Gujarat 360002' 
                            : 'Business Centrum Complex, 1st Floor, Near Golden Super Market, Opp Fitness Hospital, Mavdi Main Road, Rajkot, Gujarat 360004'}
                        </p>
                      </div>
                    </div>

                    {/* Contact Phone & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                      <div className="flex items-start gap-3">
                        <Phone className="w-4.5 h-4.5 text-[#11B5D8] shrink-0 mt-0.5" />
                        <div>
                          <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
                            PHONE NUMBER
                          </span>
                          <a 
                            href={`tel:${phoneRaw}`} 
                            className="block text-[#081C3A] font-black text-[13px] hover:text-[#0D9488] transition-colors"
                          >
                            {displayPhone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="w-4.5 h-4.5 text-[#11B5D8] shrink-0 mt-0.5" />
                        <div>
                          <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
                            EMAIL ADDRESS
                          </span>
                          <a 
                            href="mailto:info@pateldentalrajkot.com" 
                            className="block text-[#081C3A] font-extrabold text-[12px] hover:text-[#0D9488] transition-colors break-all"
                          >
                            info@pateldentalrajkot.com
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-start gap-3 pt-4 border-t border-slate-100">
                      <Clock className="w-4.5 h-4.5 text-[#0ea5e9] shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
                          WORKING HOURS
                        </span>
                        <div className="text-slate-600 font-semibold text-[12px] space-y-0.5 mt-1">
                          <p><strong className="text-slate-700 font-bold">Mon &ndash; Sat Morning:</strong> 09:00 AM &ndash; 01:00 PM</p>
                          <p><strong className="text-slate-700 font-bold">Mon &ndash; Sat Evening:</strong> 04:00 PM &ndash; 08:00 PM</p>
                          <p><strong className="text-amber-600 font-bold">Sunday Schedules:</strong> Prior Appointments Only</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower Buttons row */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                <a
                  href={activeMapBranch === 'gayatrinagar' 
                    ? 'https://maps.google.com/?q=Patel+Dental+Hospital+Gayatrinagar+Rajkot' 
                    : 'https://maps.google.com/?q=Patel+Dental+Hospital+Mavdi+Rajkot'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center text-[13px] font-bold text-white bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] hover:from-[#0284c7] hover:to-[#0369a1] px-5 py-3.5 rounded-xl shadow-[0_4px_14px_rgba(14,165,233,0.25)] hover:shadow-md cursor-pointer transition-all duration-300 text-center"
                >
                  <MapPin className="h-4 w-4 mr-1.5 shrink-0" />
                  Get Directions
                </a>
                
                <a
                  href={`tel:${phoneRaw}`}
                  className="inline-flex items-center justify-center text-[13px] font-bold text-[#081C3A] bg-white hover:bg-slate-50 px-5 py-3.5 rounded-xl border border-slate-200 shadow-sm cursor-pointer transition-all duration-300 text-center shrink-0"
                >
                  <Phone className="h-4 w-4 mr-1.5 shrink-0 text-[#0ea5e9]" />
                  Call Now
                </a>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-[13px] font-bold text-[#0D9488] bg-[#EBFDFB] hover:bg-[#CCFBF1] px-5 py-3.5 rounded-xl border border-[#CCFBF1] cursor-pointer transition-all duration-300 text-center shrink-0"
                >
                  <MessageSquare className="h-4 w-4 mr-1.5 shrink-0 text-[#0D9488]" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Right Side: Embedded Map Container */}
            <div className="lg:col-span-6 h-full min-h-[440px] lg:min-h-[520px]">
              <div className="rounded-[24px] overflow-hidden bg-slate-100 border border-slate-150 h-full w-full shadow-[0_15px_45px_rgba(8,28,58,0.03)] relative group flex flex-col">
                {/* Custom active heading bar on the map block */}
                <div className="bg-slate-50 border-b border-slate-150 py-3.5 px-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0D9488]"></div>
                    <span className="text-[#081C3A] text-xs font-bold uppercase tracking-wider">
                      Interactive Location Map
                    </span>
                  </div>
                  <span className="text-[10px] bg-slate-200/70 text-slate-600 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    {activeMapBranch === 'gayatrinagar' ? 'Gayatrinagar Main HQ' : 'Mavdi Center'}
                  </span>
                </div>

                {/* Map iframe wrapper */}
                <div className="relative flex-1 min-h-[350px]">
                  {activeMapBranch === 'gayatrinagar' ? (
                    <iframe
                      id="google-map-iframe-gayatrinagar"
                      className="w-full h-full border-0 absolute inset-0 z-10 animate-fade-in"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.8217300346394!2d70.8037307!3d22.2847055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca163959c02d%3A0xe5eb6c4c5cf4ab2c!2sPatel%20Dental%20Hospital%20-%20Best%20Dental%20Hospital%20in%20Rajkot!5e0!3m2!1sen!2sin!4v1718060000000!5m2!1sen!2sin"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Patel Dental Hospital Gayatrinagar HQ Branch"
                    ></iframe>
                  ) : (
                    <iframe
                      id="google-map-iframe-mavdi"
                      className="w-full h-full border-0 absolute inset-0 z-10 animate-fade-in"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.7483428104!2d70.7712347!3d22.2534567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca223cfb8bdb%3A0xc6cb1c7caef1eb15!2sPatel%20Dental%20Hospital%20-%20Mavdi%20Branch!5e0!3m2!1sen!2sin!4v1718060000000!5m2!1sen!2sin"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Patel Dental Hospital Mavdi/Amin Marg Branch"
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 13: FAQs Accordion */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] text-[#0D9488] font-black uppercase tracking-widest block">
              Patient Support Hub
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#081C3A] tracking-tight">
              FAQs
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Find professional answers to common questions about our advanced teeth whitening treatments.
            </p>
          </div>

          <div className="space-y-3">
            {whiteningFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className={`border rounded-2xl transition-all duration-300 ${
                    isExpanded 
                      ? 'border-[#0D9488] bg-teal-50/10' 
                      : 'border-slate-150 hover:border-slate-200 bg-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex gap-2.5 items-start">
                      <span className="text-xs font-black text-[#0D9488] bg-teal-50 h-5 w-5 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                        Q
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#081C3A] leading-relaxed">
                        {faq.question}
                      </span>
                    </div>
                    <span className="shrink-0 p-1 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-[#0D9488]" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-5 pt-1 border-t border-slate-100/50 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-wrap pl-11">
                          {faq.answer}
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

      {/* SECTION 14: BOTTOM CTA */}
      <section className="py-16 md:py-20 bg-[#081C3A] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#081C3A] via-[#0F2F5E] to-[#081C3A] opacity-90" />
        <div className="max-w-2xl mx-auto px-4 relative z-10 space-y-6">
          <HeartHandshake className="h-10 w-10 text-[#0D9488] mx-auto animate-pulse" />
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
            Book Appointment
          </h2>
          <p className="text-gray-350 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
            Experience world-class, premium teeth whitening treatments customized to your unique profile. Reach out directly via phone or WhatsApp.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <button
              onClick={handleBookClick}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-2 shadow-md cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </button>

            <a
              href={`tel:${phoneRaw}`}
              className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#081C3A] hover:bg-slate-100 text-xs font-bold rounded-xl transition flex items-center justify-center space-x-2 shadow-md cursor-pointer"
            >
              <Phone className="h-4 w-4" />
              <span>Call: {displayPhone}</span>
            </a>
            
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] text-white hover:bg-[#1ebd59] text-xs font-bold rounded-xl transition flex items-center justify-center space-x-2 shadow-md cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Now</span>
            </a>
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                setCurrentPage('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-gray-300 hover:text-[#0D9488] text-xs font-bold underline transition cursor-pointer"
            >
              Or View All Smile Gallery Cases First
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
