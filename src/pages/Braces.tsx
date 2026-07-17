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
import bracesImg from '../assets/images/metal_braces_1780610824433.png';
import imgCase1Before from '../assets/images/gallery_case1_before_1780611450331.png';
import imgCase1After from '../assets/images/gallery_case1_after_1780611466649.png';
import imgCase2Before from '../assets/images/gallery_case2_before_1780611481933.png';
import imgCase2After from '../assets/images/gallery_case2_after_1780611494535.png';
import imgSmileBefore from '../assets/images/smile_before_1780608028713.png';
import imgCase3After from '../assets/images/gallery_case3_after_1780611510070.png';
import imgCase4After from '../assets/images/gallery_case4_after_1780611531209.png';
import imgAlignersBefore from '../assets/images/aligners_teeth_before_1780687415680.png';
import imgAlignersAfter from '../assets/images/aligners_teeth_after_1780687432806.png';
import patelDentalDoctors from '../assets/images/patel_doctors_hero_1781166043226.png';

interface BracesProps {
  setCurrentPage: (page: PageId) => void;
  openAppointmentModal: (preselectedTreatment?: string) => void;
}

export default function Braces({ setCurrentPage, openAppointmentModal }: BracesProps) {
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
            .filter(item => item.slug !== 'braces-treatment' && item.slug !== 'braces' && item.is_active)
            .slice(0, 3);
          setRelatedServices(filtered);
        }
      } catch (err) {
        console.error('Failed to load related services in Braces page:', err);
      }
    };
    fetchRelated();
    return () => {
      active = false;
    };
  }, []);

  const handleBookClick = () => {
    openAppointmentModal('Braces Treatment');
  };

  const getWhatsAppUrl = (messageText?: string) => {
    const text = messageText || `Hi Patel Dental Hospital, I'm interested in booking a consultation for Braces Treatment. Please let me know the next available slot!`;
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

  const bracesFaqs = [
    {
      id: 1,
      question: "How do braces straighten crooked teeth?",
      answer: "Braces apply continuous, gentle, controlled pressure over time to slowly shift teeth into their correct positions. This guides bone remodeling and establishes a healthy, balanced bite."
    },
    {
      id: 2,
      question: "What is the difference between traditional metal braces and self-ligating braces?",
      answer: "Traditional metal braces use small elastic bands to hold the wire in place, which can cause more friction and require frequent adjustments. Modern self-ligating braces use a built-in sliding mechanism to secure the archwire, resulting in lighter forces, less discomfort, faster treatment, and fewer hospital visits."
    },
    {
      id: 3,
      question: "How long does Braces Treatment typically take?",
      answer: "The duration varies depending on case complexity, but most treatments last between 12 to 24 months. At Patel Dental Hospital, Dr. Vipul Patel provides precise digital treatment planning to map out the most efficient, shortest path to your ideal alignment."
    },
    {
      id: 4,
      question: "Will wearing braces cause pain or discomfort?",
      answer: "It is normal to feel some mild soreness or pressure for a few days after braces are first fitted or adjusted. This is a sign that your teeth are moving. Any discomfort is temporary and can be easily managed with warm salt-water rinses or mild over-the-counter pain relievers."
    },
    {
      id: 5,
      question: "Why is the retention phase so critical after removing braces?",
      answer: "Once braces are removed, teeth have a natural tendency to shift back to their original misaligned positions (relapse). Retainers hold teeth securely in their new, beautiful alignment while the surrounding bone and gum fibers fully stabilize. Wearing your retainer as prescribed is vital to maintain your smile forever."
    }
  ];

  return (
    <div id="braces-page-view" className="relative pt-[72px] bg-[#FAFAFC]">
      
      {/* SECTION 1: Hero Section */}
      <section className="py-16 sm:py-24 bg-white relative z-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              PREMIUM CARE TREATMENT
            </span>
            <h1 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-3">
              Braces Treatment
            </h1>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            
            {/* Left Side: Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2.5">
                <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-wider uppercase block">
                  PATEL DENTAL HOSPITAL – ADVANCED ORTHODONTIC CENTER
                </span>
                <h2 className="font-display font-[900] text-[#081C3A] text-[24px] sm:text-[30px] md:text-[34px] leading-tight tracking-tight">
                  Braces Treatment
                </h2>
              </div>

              <div className="text-slate-600 text-[14.5px] sm:text-[15.5px] font-medium leading-relaxed space-y-4">
                <p>
                  Braces Treatment is used to correct malaligned and crooked teeth. At Patel Dental Hospital, our advanced orthodontic treatment follows a structured four-stage approach using modern techniques to help patients achieve a healthy bite and a confident smile.
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
                  src={bracesImg}
                  alt="Braces Treatment Hero"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-center text-slate-500 text-xs sm:text-sm font-semibold font-sans leading-relaxed italic bg-teal-50/40 py-2.5 px-4 rounded-xl border border-teal-500/10">
                Straighten Crooked Teeth with Advanced Orthodontic Care.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* SECTION 2: What is Braces Treatment? (Premium Introduction) */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center px-3 py-1 bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-xs font-bold uppercase tracking-widest rounded-full">
                Premium Introduction
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
                What is Braces Treatment?
              </h2>
              <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed">
                Crooked, crowded, or malpositioned teeth can affect more than just your self-confidence—they can impair your chewing efficiency, make oral hygiene maintenance difficult, and cause uneven wear on your teeth. Braces treatment is a specialized orthodontic solution engineered to correct these dental alignment issues safely and effectively.
              </p>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                At Patel Dental Hospital, we utilize modern bracket systems and high-precision digital planning to shift your teeth into their ideal locations. Whether dealing with complex bite issues or seeking general cosmetic straightening, our expert orthodontists provide customized orthodontic treatment to build a balanced, beautiful, and highly functional smile.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_15px_40px_rgba(8,28,58,0.03)] space-y-4">
                <h3 className="font-display font-black text-slate-800 text-lg border-b border-slate-100 pb-3">
                  Core Orthodontic Objectives
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Correction of Crooked Teeth</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Re-aligning crowded and overlapping teeth safely</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Alignment of Malpositioned Teeth</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Correcting wide gaps and rotated tooth positions</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Improved Bite & Function</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Establishing healthy, efficient chewing coordinates</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Better Smile Aesthetics</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Enhancing facial symmetry and visual confidence</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Modern Orthodontics</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Utilizing low-friction ceramic and self-ligating brackets</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Comprehensive Health</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Improving joint comfort and tooth cleanliness</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Four Stage Braces Treatment */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Our Process Workflow</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Four Stage Braces Treatment
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            
            {/* Stage 1 */}
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
                  Stage 1 – Consultation
                </h3>
                <ul className="space-y-2 text-slate-600 text-[13px] sm:text-[14px] font-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Clinical examination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Selection of suitable braces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Self-ligating and non-self-ligating options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Metal and ceramic bracket systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Transparent treatment pricing</span>
                  </li>
                </ul>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-200/50">
                PATEL ORTHODONTIC INTAKE
              </div>
            </motion.div>

            {/* Stage 2 */}
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
                  Stage 2 – Record Collection
                </h3>
                <ul className="space-y-2 text-slate-600 text-[13px] sm:text-[14px] font-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Dental impressions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Study models</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Face and smile photographs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>CT Scan for treatment planning</span>
                  </li>
                </ul>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-200/50">
                HIGH-PRECISION DIGITAL ARCHIVES
              </div>
            </motion.div>

            {/* Stage 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-[#FAFAFC] p-6 sm:p-8 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-300 col-span-1 md:col-span-1"
            >
              <div>
                <span className="block text-3xl font-black text-[#0D9488]/30 font-mono mb-5">
                  03
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base tracking-tight mb-4 border-b border-slate-200/50 pb-2">
                  Stage 3 – Treatment Planning
                </h3>
                <ul className="space-y-2 text-slate-600 text-[13px] sm:text-[14px] font-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Diagnosis & options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Possible treatment outcomes & duration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Payment plan discussion</span>
                  </li>
                  <li className="font-bold text-[#0D9488] pt-1.5 border-t border-slate-200/40 mt-1">
                    Prior to bonding braces:
                  </li>
                  <li className="flex items-start gap-2 pl-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>Removal of dental decay</span>
                  </li>
                  <li className="flex items-start gap-2 pl-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>Tooth-coloured restorations</span>
                  </li>
                  <li className="flex items-start gap-2 pl-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>Professional teeth cleaning</span>
                  </li>
                </ul>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-200/50">
                PRE-ACTIVE ORTHODONTIC STERILITY
              </div>
            </motion.div>

            {/* Stage 4 */}
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
                  Stage 4 – Retention Phase
                </h3>
                <ul className="space-y-2 text-slate-600 text-[13px] sm:text-[14px] font-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Braces removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Retainer placement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Prevent relapse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Maintain long-term alignment</span>
                  </li>
                </ul>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-200/50">
                PERMANENT SMILE STABILIZATION
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
                title: 'Advanced Orthodontic Planning',
                body: 'Highly customized digital pre-evaluation of tooth movement vectors to minimize treatment times and guarantee bite balance.'
              },
              {
                num: '02',
                title: 'Clear Aligners',
                body: 'Advanced, nearly invisible polymer aligner sets designed to correct tooth malpositioning without traditional wire systems.'
              },
              {
                num: '03',
                title: 'Metal Braces',
                body: 'Premium surgical stainless steel bracket systems providing continuous forces for predictable corrective results.'
              },
              {
                num: '04',
                title: 'Ceramic Braces',
                body: 'High-comfort, medical-grade ceramic systems designed to match natural enamel shades for low-visibility treatment.'
              },
              {
                num: '05',
                title: 'Experienced Orthodontic Team',
                body: 'Under the guidance of Dr. Vipul Patel, our in-house specialists apply gentle, international orthodontic techniques.'
              },
              {
                num: '06',
                title: 'Personalized Treatment',
                body: 'Individually constructed orthodontic paths mapped out specifically to match your facial symmetry and daily comfort requirements.'
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
                  Patel Dental Orthodontic Code: OR-0{pt.num}
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
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Smile Gallery</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Clinical Gallery
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Drag each slider left or right to inspect the exact real clinical before and after orthodontic alignment.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case 1: Braces Cases */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCase1Before}
                afterImg={imgCase1After}
                beforeLabel="Severely Crowded Arch (Before)"
                afterLabel="Perfect Braces Correction (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Braces Cases
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Traditional Metal Braces Treatment
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Excellent tooth correction for severe biological crowding, restoring perfect spacing and smile alignment in 14 months.
                </p>
              </div>
            </div>

            {/* Case 2: Before & After Cases */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCase2Before}
                afterImg={imgCase2After}
                beforeLabel="Misaligned Spacing Gaps (Before)"
                afterLabel="Aligned Aesthetic Arch (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Before & After Cases
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Bilateral Gap Closure & Orthodontic Care
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Resolving structural spacing concerns and high canine placements to construct beautiful, cohesive oral contours.
                </p>
              </div>
            </div>

            {/* Case 3: Clear Aligner Cases */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgAlignersBefore}
                afterImg={imgAlignersAfter}
                beforeLabel="Rotated Front Teeth (Before)"
                afterLabel="Straight Aligner Finish (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Clear Aligner Cases
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Invisible Aligner Alignment
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Straightening front chewing teeth comfortably using clear plastic active trays without traditional bracket visibility.
                </p>
              </div>
            </div>

            {/* Case 4: Smile Transformation Cases */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgSmileBefore}
                afterImg={imgCase4After}
                beforeLabel="Deep Bite & Uneven Alignment (Before)"
                afterLabel="Balanced Smile Transformation (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Smile Transformation Cases
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Complete Orthodontic Smile Transformation
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Comprehensive aesthetic and functional bite reconstruction using high-tech ceramic braces to build premium lifelong smiles.
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
              Watch this educational guide video to learn more about advanced bracket systems, self-ligating technology and alignment.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-6 shadow-xl max-w-3xl mx-auto">
            <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
              {activeVideos['braces-proc-vid'] ? (
                <iframe
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  src="https://www.youtube.com/embed/cbVcmy53KBs?autoplay=1&rel=0"
                  title="Braces Treatment Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              ) : (
                <button
                  onClick={() => setActiveVideos(prev => ({ ...prev, 'braces-proc-vid': true }))}
                  className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                  aria-label="Play Braces Treatment Procedure Video"
                >
                  <img
                    src="https://img.youtube.com/vi/cbVcmy53KBs/hqdefault.jpg"
                    alt="Braces Treatment"
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
                Our Specialist Orthodontic Panel
              </h2>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                Led by chief restorative dental surgeon Dr. Vipul Patel and supported by our highly experienced clinical orthodontic team, our hospital is fully equipped to treat complex jaw alignment irregularities, pediatric growth issues, and aesthetic spacing gaps. We leverage state-of-the-art diagnostic imaging to craft the safest, most comfortable tooth-straightening solutions.
              </p>
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Full In-house Digital CBCT Orthodontic Diagnostics</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Ultra-Hygienic Modern Treatment Operatory Rooms</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">FDA-Approved Safe Ceramic & Metal Bracket Systems</span>
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
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#0D9488]">DR. VIPUL PATEL & EXPERT ORTHODONTIC TEAM</p>
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
              Listen to actual life-changing alignment stories shared directly by our happy orthodontic patients.
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
                  "I was highly self-conscious about my severely crowded front teeth. Dr. Vipul Patel recommended ceramic braces for low visibility. The entire process was painless, incredibly hygienic, and now my teeth are beautifully straight! Best orthodontist in Rajkot!"
                </p>
                <div className="border-t border-slate-50 pt-3">
                  <span className="block text-xs font-bold text-[#081C3A]">Aarav Sanghavi</span>
                  <span className="text-[10px] text-slate-400">Patient (Ceramic Braces)</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs">
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed italic mb-4">
                  "We got our 12-year-old son's braces treatment completed at Patel Dental Hospital. The self-ligating braces meant very few hospital visits and absolute comfort for him. The doctors are incredibly gentle, patient and explain everything beforehand."
                </p>
                <div className="border-t border-slate-50 pt-3">
                  <span className="block text-xs font-bold text-[#081C3A]">Meera Patel</span>
                  <span className="text-[10px] text-slate-400">Mother of Rishi (12 years)</span>
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
                    title="Braces Treatment Patient Testimonial"
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
                    className={`flex-1 py-3 text-xs font-black rounded-lg transition-all duration-300 cursor-pointer ${
                      activeMapBranch === 'gayatrinagar'
                        ? 'bg-[#0D9488] text-white shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    Gayatri Nagar (Main Branch)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMapBranch('mavdi')}
                    className={`flex-1 py-3 text-xs font-black rounded-lg transition-all duration-300 cursor-pointer ${
                      activeMapBranch === 'mavdi'
                        ? 'bg-[#0D9488] text-white shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    Mavdi Main Road Branch
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {activeMapBranch === 'gayatrinagar' ? (
                    <motion.div
                      key="gayatrinagar"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="bg-[#FAFAFC] p-6 rounded-2xl border border-slate-150 space-y-4"
                    >
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-display font-bold text-slate-800 text-sm">Gayatri Nagar Address</h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">
                            Patel Dental Hospital, Opposite Gayatri Nagar Society Gates, Near Geeta Mandir Road, Rajkot, Gujarat - 360002
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-display font-bold text-slate-800 text-sm">Consultation Hours</h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">
                            Mon - Sat: 9:00 AM - 1:00 PM | 4:00 PM - 8:00 PM <br />
                            Sunday: Closed (Emergency Cases Only)
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-display font-bold text-slate-800 text-sm">Direct Phone Call</h4>
                          <p className="text-xs text-[#0D9488] font-bold mt-1">
                            <a href={`tel:${phoneRaw}`} className="hover:underline">{displayPhone}</a>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="mavdi"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="bg-[#FAFAFC] p-6 rounded-2xl border border-slate-150 space-y-4"
                    >
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-display font-bold text-slate-800 text-sm">Mavdi Road Address</h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">
                            Patel Dental Hospital, 1st Floor Prime Avenue, Opposite Mavdi Plot Main Gate, Mavdi Main Road, Rajkot, Gujarat - 360004
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-display font-bold text-slate-800 text-sm">Consultation Hours</h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">
                            Mon - Sat: 9:30 AM - 1:30 PM | 4:30 PM - 8:30 PM <br />
                            Sunday: Closed
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-display font-bold text-slate-800 text-sm">Direct Phone Call</h4>
                          <p className="text-xs text-[#0D9488] font-bold mt-1">
                            <a href={`tel:${phoneRaw}`} className="hover:underline">{displayPhone}</a>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 lg:pt-0">
                <a
                  href={`tel:${phoneRaw}`}
                  className="flex-1 py-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#081C3A] text-xs font-black rounded-xl text-center transition shadow-3xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <Phone className="h-4.5 w-4.5 text-[#0D9488]" />
                  Call Gayatri Nagar
                </a>
                <a
                  href={getWhatsAppUrl(`Hi Patel Dental Hospital, I'd like to ask a question regarding orthodontic braces treatment at your Mavdi Branch.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black rounded-xl text-center transition shadow-3xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-4.5 w-4.5" />
                  WhatsApp Mavdi
                </a>
              </div>
            </div>

            {/* Right Side: Google Map iframe */}
            <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-slate-150 shadow-md min-h-[350px] bg-slate-50 relative">
              <iframe
                className="absolute inset-0 w-full h-full border-0"
                src={
                  activeMapBranch === 'gayatrinagar'
                    ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.9790600676916!2d70.795893!3d22.2788321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca223a2a9e33%3A0xc3fa316d25287f3!2sPatel%20Dental%20Hospital!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                    : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.100234123456!2d70.785002!3d22.268001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca223a2a9e33%3A0xc3fa316d25287f3!2sPatel%20Dental%20Hospital!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                }
                title="Patel Dental Hospital Map Location"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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
              Find professional answers to common questions about our orthodontic braces treatments.
            </p>
          </div>

          <div className="space-y-3">
            {bracesFaqs.map((faq) => {
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

      {/* SECTION 13: BOTTOM CTA */}
      <section className="py-16 md:py-20 bg-[#081C3A] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#081C3A] via-[#0F2F5E] to-[#081C3A] opacity-90" />
        <div className="max-w-2xl mx-auto px-4 relative z-10 space-y-6">
          <HeartHandshake className="h-10 w-10 text-[#0D9488] mx-auto animate-pulse" />
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
            Book Appointment
          </h2>
          <p className="text-gray-350 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
            Experience world-class, premium braces treatment customized to your unique facial profile by our expert orthodontic team. Reach out directly via phone or WhatsApp.
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
