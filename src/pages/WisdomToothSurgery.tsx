/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Calendar, Shield, Sparkles, HeartHandshake, CheckCircle2, 
  Phone, MessageSquare, Star, ArrowRight, ChevronDown, ChevronUp,
  MapPin, Clock, Mail, MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { serviceService } from '../utils/serviceData';

// Images
import imgWisdom from '../assets/images/wisdom_tooth_1780610905625.png';
import imgCbct from '../assets/images/patel_cbct_imaging_1781166123983.png';
import imgCase1Before from '../assets/images/gallery_case1_before_1780611450331.png';
import imgCase1After from '../assets/images/gallery_case1_after_1780611466649.png';
import imgCase2Before from '../assets/images/gallery_case2_before_1780611481933.png';
import imgCase2After from '../assets/images/gallery_case2_after_1780611494535.png';
import patelDentalDoctors from '../assets/images/patel_doctors_hero_1781166043226.png';

interface WisdomToothSurgeryProps {
  setCurrentPage: (page: PageId) => void;
  openAppointmentModal: (preselectedTreatment?: string) => void;
}

export default function WisdomToothSurgery({ setCurrentPage, openAppointmentModal }: WisdomToothSurgeryProps) {
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(0);
  const [relatedServices, setRelatedServices] = useState<any[]>([]);

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
            .filter(item => item.slug !== 'wisdom-tooth-surgery' && item.slug !== 'wisdom' && item.is_active)
            .slice(0, 3);
          setRelatedServices(filtered);
        }
      } catch (err) {
        console.error('Failed to load related services in Wisdom Tooth Surgery page:', err);
      }
    };
    fetchRelated();
    return () => {
      active = false;
    };
  }, []);

  const handleBookClick = () => {
    openAppointmentModal('Wisdom Tooth Surgery');
  };

  const getWhatsAppUrl = (messageText?: string) => {
    const text = messageText || `Hi Patel Dental Hospital, I'm interested in booking a consultation for Wisdom Tooth Surgery. Please let me know the next available slot!`;
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

  const wisdomFaqs = [
    {
      id: 1,
      question: "Why do wisdom teeth need to be surgically removed?",
      answer: "When there is insufficient jaw space, wisdom teeth often erupt at angles (impacted), pushing against other healthy teeth. This can trap food debris, causing chronic pain, decay, gum infections, cyst formation, or even jawbone damage, making surgical removal essential."
    },
    {
      id: 2,
      question: "Is Wisdom Tooth Surgery painful?",
      answer: "Not at all. The entire procedure is performed under deep local anesthesia or conscious sedation. This ensures you do not feel any pain during the surgery. Post-procedure soreness is normal and is easily managed with prescribed medications."
    },
    {
      id: 3,
      question: "What is Advanced Piezoelectric Surgery?",
      answer: "Piezoelectric surgery is an advanced micro-surgical technology available at Patel Dental Hospital. It uses high-frequency ultrasonic vibrations to cut bone precisely without damaging adjacent delicate soft tissues, nerves, or blood vessels, resulting in faster recovery and minimal swelling."
    },
    {
      id: 4,
      question: "What is the typical recovery time after Wisdom Tooth Removal?",
      answer: "Most patients return to their normal routines within 2 to 4 days. Complete healing of the gum and bone tissue at the extraction site takes a few weeks, during which you should follow a soft-food diet and maintain proper oral hygiene."
    },
    {
      id: 5,
      question: "What are the important post-operative care instructions?",
      answer: "You should keep the gauze pad in place for 45 minutes, avoid spitting or drinking through a straw to prevent dry socket, eat cool and soft foods, apply an ice pack to reduce swelling, and take prescribed medications exactly as directed."
    }
  ];

  return (
    <div id="wisdom-tooth-page-view" className="relative pt-[72px] bg-[#FAFAFC]">
      
      {/* SECTION 1: Hero Section */}
      <section className="py-16 sm:py-24 bg-white relative z-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              PREMIUM CARE TREATMENT
            </span>
            <h1 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-3">
              Wisdom Tooth Surgery
            </h1>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            
            {/* Left Side: Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2.5">
                <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-wider uppercase block">
                  PATEL DENTAL HOSPITAL – ADVANCED SURGICAL CENTER
                </span>
                <h2 className="font-display font-[900] text-[#081C3A] text-[24px] sm:text-[30px] md:text-[34px] leading-tight tracking-tight">
                  Wisdom Tooth Surgery
                </h2>
              </div>

              <div className="text-slate-600 text-[14.5px] sm:text-[15.5px] font-medium leading-relaxed space-y-4">
                <p>
                  Wisdom teeth are the four permanent adult molars located at the back corners of the upper and lower jaws. When there is not enough space for them to erupt properly, they may cause pain, infection, swelling, pus formation and difficulty in opening the mouth.
                </p>
                <p>
                  At Patel Dental Hospital, we provide painless and advanced Wisdom Tooth Surgery performed by internationally trained specialists using modern surgical techniques.
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
                  src={imgWisdom}
                  alt="Wisdom Tooth Surgery Hero"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-center text-slate-500 text-xs sm:text-sm font-semibold font-sans leading-relaxed italic bg-teal-50/40 py-2.5 px-4 rounded-xl border border-teal-500/10">
                Safe & Painless Wisdom Tooth Removal with Advanced Surgical Care.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* SECTION 2: What is a Wisdom Tooth? (Premium Introduction) */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center px-3 py-1 bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-xs font-bold uppercase tracking-widest rounded-full">
                Premium Introduction
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
                What is a Wisdom Tooth?
              </h2>
              <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed">
                A wisdom tooth, or third molar, is one of the four permanent adult molars located at the very back corners of the mouth. These teeth are the last to erupt, typically appearing between the ages of 17 and 25.
              </p>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                Because they are the last teeth to emerge, there is often insufficient room in the dental arch to accommodate them. This lack of space causes wisdom teeth to become impacted—trapped beneath the gums or bone at abnormal angles. If left untreated, impacted wisdom teeth can trigger severe pain, infection, facial swelling, damage to neighboring teeth, and difficulty chewing or opening the mouth. Timely surgical removal is highly recommended to protect your overall oral health.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_15px_40px_rgba(8,28,58,0.03)] space-y-4">
                <h3 className="font-display font-black text-slate-800 text-lg border-b border-slate-100 pb-3">
                  Core Clinical Characteristics
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Four Permanent Adult Molars</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">The final set of grinding molars emerging at the back corners of the jaws.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Located at the Back of the Mouth</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Positioned deep within the dental arch, making hygiene difficult to maintain.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Can Cause Pain, Infection & Swelling</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Impacted teeth create pockets for bacteria, triggering acute dental flare-ups.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Surgical Removal When Required</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Gentle, safe, and proactive extraction prevents extensive long-term jawbone damage.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Wisdom Tooth Surgery Treatment Planning */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Our Process Workflow</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Wisdom Tooth Surgery Treatment Planning
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-[#FAFAFC] p-6 sm:p-8 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <span className="block text-3xl font-black text-[#0D9488]/30 font-mono mb-5">
                  01
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base tracking-tight mb-4 border-b border-slate-200/50 pb-2">
                  Step 1: Diagnosis
                </h3>
                <ul className="space-y-2 text-slate-600 text-[13px] sm:text-[14px] font-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>OPG X-ray examination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Assessment of tooth position</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Evaluation of nearby nerves</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Surrounding structures study</span>
                  </li>
                </ul>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-200/50">
                PATEL SURGICAL PRE-OP
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-[#FAFAFC] p-6 sm:p-8 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <span className="block text-3xl font-black text-[#0D9488]/30 font-mono mb-5">
                  02
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base tracking-tight mb-4 border-b border-slate-200/50 pb-2">
                  Step 2: Local Anesthesia
                </h3>
                <ul className="space-y-2 text-slate-600 text-[13px] sm:text-[14px] font-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Administration of localized anesthesia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Computer-controlled gentle dosing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Proper complete numbing before surgery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Anxiety management protocols</span>
                  </li>
                </ul>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-200/50">
                STRESS-FREE GENTLE NUMBING
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-[#FAFAFC] p-6 sm:p-8 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <span className="block text-3xl font-black text-[#0D9488]/30 font-mono mb-5">
                  03
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base tracking-tight mb-4 border-b border-slate-200/50 pb-2">
                  Step 3: Removal
                </h3>
                <ul className="space-y-2 text-slate-600 text-[13px] sm:text-[14px] font-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Specialized surgical instruments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Gentle and painless procedure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Biocompatible sutures for proper healing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Clean structural extraction socket</span>
                  </li>
                </ul>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-200/50">
                SUTURE-LESS EXTRACTION ABILITY
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-[#FAFAFC] p-6 sm:p-8 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <span className="block text-3xl font-black text-[#0D9488]/30 font-mono mb-5">
                  04
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base tracking-tight mb-4 border-b border-slate-200/50 pb-2">
                  Step 4: Piezoelectric Surgery
                </h3>
                <ul className="space-y-2 text-slate-600 text-[13px] sm:text-[14px] font-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Piezoelectric ultrasonic technology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Protection of delicate nearby nerves</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Advanced micrometric precision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Available at Patel Dental Hospital</span>
                  </li>
                </ul>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-200/50">
                MICRO-ULTRASONIC BONE CUTTING
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 4: Why Choose Patel Dental Hospital? */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#0EA5C6]/5 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Scientific Edge</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Why Choose Patel Dental Hospital?
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'Painless Surgical Extraction Techniques',
                body: 'Using modern specialized micro-instruments and localized digital anesthesia to provide a completely quiet, comfortable, and painless procedure.'
              },
              {
                num: '02',
                title: 'Piezoelectric Bone Surgery Technology',
                body: 'Our state-of-the-art ultrasound piezoelectric system allows for clean bone reshaping while preserving soft tissue and protecting sensitive nerves.'
              },
              {
                num: '03',
                title: 'In-House High-Resolution Diagnostics',
                body: 'Equipped with in-house CBCT and high-definition OPG X-ray systems to map dental root morphology and proximity to adjacent mandibular nerve canals.'
              },
              {
                num: '04',
                title: 'Strict Hospital-Grade Sterilization Protocols',
                body: 'We practice strict sterilization and disinfection standards using advanced vacuum autoclaves to keep our operatory zero-infection zones.'
              },
              {
                num: '05',
                title: 'Expert Oral & Maxillofacial Panel',
                body: 'Surgeries are planned and conducted under the strict guidance of Dr. Vipul Patel and internationally trained oral surgery specialists.'
              },
              {
                num: '06',
                title: 'Attentive Post-Operative Follow-Up Care',
                body: 'Individual recovery charts, soft-diet meal plans, and detailed professional follow-ups to ensure rapid, swelling-free healing.'
              }
            ].map((pt, idx) => (
              <motion.div
                key={pt.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.05 }}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs hover:shadow-lg transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4.5">
                    <span className="text-2xl font-black text-[#0D9488]/30 font-mono">
                      {pt.num}
                    </span>
                    <span className="text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                      Specialist Standard
                    </span>
                  </div>
                  
                  <h3 className="font-display font-extrabold text-[#081C3A] text-base tracking-tight mb-3">
                    {pt.title}
                  </h3>

                  <p className="text-slate-600 text-[13px] sm:text-[14px] leading-relaxed font-sans font-medium">
                    {pt.body}
                  </p>
                </div>
                
                <div className="text-[9px] font-mono text-gray-400 mt-6 pt-2 border-t border-gray-50 uppercase tracking-widest">
                  Patel Dental Surgery Code: SG-0{pt.num}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Clinical Gallery Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Surgical Gallery</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Clinical Gallery
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Drag each slider left or right to inspect the exact real clinical before and after surgical alignments.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case 1: Wisdom Tooth Cases */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCase2Before}
                afterImg={imgCase2After}
                beforeLabel="Impacted Molar Angle (Before)"
                afterLabel="Clean Tooth Extraction (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Wisdom Tooth Cases
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Impacted Third Molar extraction
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Removing a deeply angled bone-impacted lower molar safely to release pressure on the surrounding teeth.
                </p>
              </div>
            </div>

            {/* Case 2: Surgical Cases */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCase1Before}
                afterImg={imgCase1After}
                beforeLabel="Tooth decay near nerve (Before)"
                afterLabel="Surgical extraction completed (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Surgical Cases
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Piezoelectric precision extraction
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Utilizing high-frequency ultrasonic vibrations to gently separate the tooth roots without any collateral gum tearing.
                </p>
              </div>
            </div>

            {/* Case 3: OPG X-ray Images */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCbct}
                afterImg={imgCbct}
                beforeLabel="Pre-operative nerve mapping"
                afterLabel="Surgical extraction path verified"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  OPG X-ray Images
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  High-Resolution Nerve Proximity Mapping
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Verifying the exact location of the inferior alveolar nerve canal to prevent damage during mandibular third molar surgery.
                </p>
              </div>
            </div>

            {/* Case 4: Post-operative Results */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCase2Before}
                afterImg={imgCase2After}
                beforeLabel="Impacted Wisdom Tooth Gums"
                afterLabel="Healthy Suture-less Recovery"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Post-operative Results
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Clean Suture-less Healing Sites
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Inspecting the extraction site at 10 days post-op showing outstanding, seamless soft-tissue closure with zero complications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Procedure Video Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0EA5C6]/5 to-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Procedure Video</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Procedure Video
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Watch this educational guide video to learn more about third molar impactions, micro-surgical extractions and recovery.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-6 shadow-xl max-w-3xl mx-auto">
            <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
              {activeVideos['wisdom-proc-vid'] ? (
                <iframe
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  src="https://www.youtube.com/embed/cbVcmy53KBs?autoplay=1&rel=0"
                  title="Wisdom Tooth Surgery Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              ) : (
                <button
                  onClick={() => setActiveVideos(prev => ({ ...prev, 'wisdom-proc-vid': true }))}
                  className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                  aria-label="Play Wisdom Tooth Surgery Procedure Video"
                >
                  <img
                    src="https://img.youtube.com/vi/cbVcmy53KBs/hqdefault.jpg"
                    alt="Wisdom Tooth Surgery"
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

      {/* SECTION 7: Hospital/Team Photograph Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center px-3 py-1 bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-xs font-bold uppercase tracking-widest rounded-full">
                Hospital / Team
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
                Our Specialist Maxillofacial Panel
              </h2>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                Led by chief dental surgeon Dr. Vipul Patel and supported by our highly experienced clinical surgical team, our hospital is fully equipped to treat complex mandibular impactions, piezoelectric jaw bone modifications, and wisdom tooth roots situated in close proximity to critical neural fibers. We practice strict operating room hygiene to ensure safe, rapid healing.
              </p>
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Full In-house Digital CBCT Maxillofacial Diagnostics</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Ultra-Sterile Modern Treatment Operatory Rooms</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">US FDA-Approved Safe Piezoelectric Ultrasound Scalpel Systems</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-50">
                <img
                  src={patelDentalDoctors}
                  alt="Patel Dental Hospital Medical Faculty"
                  className="w-full aspect-[4/3] object-cover hover:scale-101 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#081C3A]/90 backdrop-blur-xs p-4 rounded-xl text-white text-center">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#0D9488]">DR. VIPUL PATEL & EXPERT SURGICAL TEAM</p>
                  <p className="text-xs font-sans text-gray-300 mt-1">Providing state-of-the-art dental care since generations</p>
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
              Patient Reviews
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Listen to actual life-changing surgical stories shared directly by our happy wisdom tooth patients.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="space-y-8 max-w-3xl mx-auto">
            {/* Written Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs">
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed italic mb-4">
                  "I was extremely terrified of getting my impacted wisdom tooth removed, but Dr. Vipul Patel made it absolutely painless! The local anesthesia was perfect, and the piezoelectric technology meant no post-operative swelling or pain. Highly recommend Patel Dental Hospital!"
                </p>
                <div className="border-t border-slate-50 pt-3">
                  <span className="block text-xs font-bold text-[#081C3A]">Rajesh Varma</span>
                  <span className="text-[10px] text-slate-400">Patient (Wisdom Tooth Surgery)</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs">
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed italic mb-4">
                  "Amazing experience! Very clean clinic with state-of-the-art X-ray facilities. The extraction took less than 20 minutes and they followed up the next day to ensure I was healing properly."
                </p>
                <div className="border-t border-slate-50 pt-3">
                  <span className="block text-xs font-bold text-[#081C3A]">Pooja Trivedi</span>
                  <span className="text-[10px] text-slate-400">Patient (Maxillary Impaction)</span>
                </div>
              </div>
            </div>

            {/* Video Review */}
            <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-6 shadow-xl max-w-3xl mx-auto mt-8">
              <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
                {activeVideos['patient-review-vid'] ? (
                  <iframe
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    src="https://www.youtube.com/embed/cyai6CjMD0s?autoplay=1&rel=0"
                    title="Wisdom Tooth Surgery Patient Testimonial"
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
                className={`inline-flex items-center gap-1.5 px-4 py-2 border border-slate-150 rounded-xl text-xs font-semibold text-slate-700 transition duration-300 hover:text-white ${link.color}`}
              >
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: Hospital Information (Logo and stats) */}
      <section className="py-16 md:py-20 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-3xs max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-xl bg-[#0D9488] text-white flex items-center justify-center font-display font-black text-lg">
                    PD
                  </div>
                  <div>
                    <h3 className="font-display font-black text-[#081C3A] text-sm leading-none">PATEL DENTAL</h3>
                    <p className="text-[9px] font-semibold text-slate-400 mt-1 uppercase tracking-widest">HOSPITAL & IMPLANT CENTER</p>
                  </div>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed text-center lg:text-left">
                  Serving three generations of smiles with absolute digital transparency, strict medical sterilization, and certified patient care protocols.
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div className="space-y-1">
                  <span className="block text-2xl font-black text-[#081C3A]">35+</span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Years of Experience</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-black text-[#081C3A]">15k+</span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Happy Patients</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-black text-[#081C3A]">5-Star</span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Google Rated</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-black text-[#081C3A]">100%</span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Certified Safe</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: FAQs Accordion */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] text-[#0D9488] font-black uppercase tracking-widest block">
              Patient Support Hub
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#081C3A] tracking-tight">
              FAQs
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Find professional answers to common questions about our Wisdom Tooth Surgery.
            </p>
          </div>

          <div className="space-y-3">
            {wisdomFaqs.map((faq) => {
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

      {/* SECTION 12: Our Services (Related Services) */}
      {relatedServices.length > 0 && (
        <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[9px] text-[#0D9488] font-black uppercase tracking-widest block">
                Explore More Solutions
              </span>
              <h2 className="font-display font-black text-2xl text-[#081C3A] tracking-tight">
                Related Services
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

      {/* SECTION 13: Location & Contact Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[9px] text-[#0D9488] font-black uppercase tracking-widest block">
              Visit Our Clinics
            </span>
            <h2 className="font-display font-black text-2xl text-[#081C3A] tracking-tight">
              Location & Contact
            </h2>
            <p className="text-slate-500 text-xs">
              We operate two ultra-modern dental clinics in Rajkot equipped with complete digital CBCT suites and modern operation theatres.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Gayatri Nagar Branch */}
            <div className="bg-[#FAFAFC] border border-slate-150 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[#0D9488]">
                  <MapPin className="h-5 w-5 shrink-0" />
                  <span className="font-display font-black text-xs uppercase tracking-wider">Gayatri Nagar Branch (Main)</span>
                </div>
                <h3 className="font-display font-black text-lg text-[#081C3A]">Patel Dental Hospital</h3>
                <p className="text-slate-600 text-xs leading-relaxed font-semibold">
                  Opp. Shastri Maidan, Limda Chowk, Gayatri Nagar, Rajkot, Gujarat - 360001
                </p>
                <div className="space-y-2 pt-2 text-xs font-semibold text-slate-500">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-[#0D9488] shrink-0" />
                    <span>Mon - Sat: 9:00 AM - 1:00 PM | 4:00 PM - 8:00 PM</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-[#0D9488] shrink-0" />
                    <span>+91 9510397046</span>
                  </div>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Patel+Dental+Hospital+Limda+Chowk+Rajkot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 text-center text-[#081C3A] text-xs font-bold rounded-xl transition shadow-3xs cursor-pointer block"
              >
                Get Directions on Google Maps
              </a>
            </div>

            {/* Mavdi Branch */}
            <div className="bg-[#FAFAFC] border border-slate-150 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[#0D9488]">
                  <MapPin className="h-5 w-5 shrink-0" />
                  <span className="font-display font-black text-xs uppercase tracking-wider">Mavdi Branch</span>
                </div>
                <h3 className="font-display font-black text-lg text-[#081C3A]">Patel Dental Clinic</h3>
                <p className="text-slate-600 text-xs leading-relaxed font-semibold">
                  Mavdi Main Road, Opp. Police Headquarters, Mavdi, Rajkot, Gujarat - 360004
                </p>
                <div className="space-y-2 pt-2 text-xs font-semibold text-slate-500">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-[#0D9488] shrink-0" />
                    <span>Mon - Sat: 9:00 AM - 1:00 PM | 4:00 PM - 8:00 PM</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-[#0D9488] shrink-0" />
                    <span>+91 9510397046</span>
                  </div>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Patel+Dental+Clinic+Mavdi+Rajkot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 text-center text-[#081C3A] text-xs font-bold rounded-xl transition shadow-3xs cursor-pointer block"
              >
                Get Directions on Google Maps
              </a>
            </div>
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
            Experience world-class, painless Wisdom Tooth Surgery customized to your dental structure by our expert maxillofacial surgeons. Reach out directly via phone or WhatsApp.
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
              href="tel:+919510397046"
              className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#081C3A] hover:bg-slate-100 text-xs font-bold rounded-xl transition flex items-center justify-center space-x-2 shadow-md cursor-pointer"
            >
              <Phone className="h-4 w-4" />
              <span>Call: +91 9510397046</span>
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
