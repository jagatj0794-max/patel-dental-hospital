/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Calendar, Shield, Sparkles, HeartHandshake, CheckCircle2, 
  Phone, MessageSquare, BadgePercent, Star, Eye, ShieldCheck,
  HelpCircle, ArrowRight, ChevronDown, ChevronUp, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { serviceService } from '../utils/serviceData';

// Images
import imgImplants from '../assets/images/dental_implants_1780610766218.png';
import imgCase2Before from '../assets/images/gallery_case2_before_1780611481933.png';
import imgCase2After from '../assets/images/gallery_case2_after_1780611494535.png';
import imgSmileBefore from '../assets/images/smile_before_1780608028713.png';
import imgCase3After from '../assets/images/gallery_case3_after_1780611510070.png';
import imgCase4After from '../assets/images/gallery_case4_after_1780611531209.png';
import imgRehabBefore from '../assets/images/rehab_teeth_before_1780687516367.png';
import imgRehabAfter from '../assets/images/rehab_teeth_after_1780687532302.png';
import patelDentalDoctors from '../assets/images/patel_doctors_hero_1781166043226.png';

interface ImplantsProps {
  setCurrentPage: (page: PageId) => void;
  openAppointmentModal: (preselectedTreatment?: string) => void;
}

export default function Implants({ setCurrentPage, openAppointmentModal }: ImplantsProps) {
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(0);
  const [relatedServices, setRelatedServices] = useState<any[]>([]);

  // Fetch active services dynamically for the Related Services section
  useEffect(() => {
    let active = true;
    const fetchRelated = async () => {
      try {
        const allServices = await serviceService.getServices();
        if (active) {
          const filtered = allServices
            .filter(item => item.slug !== 'dental-implants' && item.is_active)
            .slice(0, 3);
          setRelatedServices(filtered);
        }
      } catch (err) {
        console.error('Failed to load related services in Implants page:', err);
      }
    };
    fetchRelated();
    return () => {
      active = false;
    };
  }, []);

  const handleBookClick = () => {
    openAppointmentModal('Dental Implants');
  };

  const getWhatsAppUrl = () => {
    const text = `Hi Patel Dental Hospital, I'm interested in booking a consultation for Dental Implants. Please let me know the next available slot!`;
    return `https://wa.me/919510397046?text=${encodeURIComponent(text)}`;
  };

  const handleNavigateToService = (targetSlug: string) => {
    window.location.hash = `#services/${targetSlug}`;
    setCurrentPage(`services/${targetSlug}` as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 12 superior points mapping exactly doctor's content
  const superiorityPoints = [
    {
      num: '01',
      title: 'Permanent Bone Integration',
      body: 'Permanent bone integration for lifelong chewing efficiency.'
    },
    {
      num: '02',
      title: 'Lower Failure Risk',
      body: 'Lower failure risk compared to basal implants.'
    },
    {
      num: '03',
      title: 'Screw-Retained Prosthesis',
      body: 'Screw-retained prosthesis for easy maintenance.'
    },
    {
      num: '04',
      title: 'Professional Cleansability',
      body: 'Teeth can be professionally removed and cleaned within minutes.'
    },
    {
      num: '05',
      title: 'Pan Masala Solution',
      body: 'Excellent solution for pan masala chewing patients.'
    },
    {
      num: '06',
      title: 'Implant Longevity',
      body: 'Screw-retained system increases implant longevity.'
    },
    {
      num: '07',
      title: '7,000+ Placements',
      body: 'More than 7000 implant placements.'
    },
    {
      num: '08',
      title: '350+ FMR Cases',
      body: 'More than 350 Full Mouth Rehabilitation cases completed by Dr. Vipul Patel.'
    },
    {
      num: '09',
      title: 'In-House CBCT Verification',
      body: 'In-house CBCT verification after treatment.'
    },
    {
      num: '10',
      title: 'Advanced Bone Grafting',
      body: 'Advanced bone grafting techniques for poor bone cases.'
    },
    {
      num: '11',
      title: 'Successful Patient Cases',
      body: 'Long-term successful patient cases available.'
    },
    {
      num: '12',
      title: 'International Protocols',
      body: 'International quality standard implant protocols.'
    }
  ];

  const implantFaqs = [
    {
      id: 1,
      question: "What is a dental implant and how does it work?",
      answer: "A dental implant is a premium bio-compatible titanium post surgically inserted into the jawbone. Over time, it fuses permanently with your natural bone (osseointegration) to act as an artificial root, providing a stable, lifetime foundation for fixed prosthetic teeth."
    },
    {
      id: 2,
      question: "How long does the dental implant procedure take?",
      answer: "Using our advanced immediate loading implant technology, Dr. Vipul Patel provides fixed, implant-supported teeth in just one week. This includes a complete digital planning phase and precise clinical execution."
    },
    {
      id: 3,
      question: "Is the dental implant procedure painful?",
      answer: "No, the procedure is performed under modern computerized localized anesthesia. We also offer active anxiety protection and painless sedation protocols to ensure a completely stress-free, pain-free experience."
    },
    {
      id: 4,
      question: "Can dental implants replace teeth lost due to pyorrhea?",
      answer: "Yes, dental implants are an excellent, ideal solution for replacing loose or missing teeth caused by pyorrhea (periodontitis). After addressing the underlying gum gum infection, implants can safely restore full chewing efficiency and smile aesthetics."
    },
    {
      id: 5,
      question: "How are the prosthetic teeth cleaned or maintained?",
      answer: "Our ultra-modern screw-retained prosthesis system uses a titanium-retaining screw, making maintenance seamless. The prosthetic teeth can be professionally removed, thoroughly cleaned by our doctors, and re-secured within minutes."
    }
  ];

  return (
    <div id="implants-page-view" className="relative pt-[72px] bg-[#FAFAFC]">
      
      {/* SECTION 1 & SECTION 2: Hero Intro Section */}
      <section className="py-16 sm:py-24 bg-white relative z-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              PREMIUM CARE TREATMENT
            </span>
            <h2 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-3">
              Dental Implants
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            
            {/* Left Side: Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2.5">
                <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-wider uppercase block">
                  PATEL DENTAL HOSPITAL – ADVANCED IMPLANT & FMR CENTER
                </span>
                <h3 className="font-display font-[900] text-[#081C3A] text-[24px] sm:text-[30px] md:text-[34px] leading-tight tracking-tight">
                  Dental Implants
                </h3>
              </div>

              <div className="text-slate-600 text-[14.5px] sm:text-[15.5px] font-medium leading-relaxed space-y-4">
                <p>
                  Dental implant is an artificial tooth placed in your mouth for better chewing efficiency and to enhance the patient's smile and quality of life.
                </p>
                <p>
                  It is ideal for the replacement of missing and loose teeth due to pyorrhea.
                </p>
                <p>
                  Patel Dental Hospital provides fixed teeth in just one week using advanced dental implant technology.
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

            {/* Right Side: Responsive Image with Caption below */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full space-y-4"
            >
              <div className="rounded-[20px] overflow-hidden aspect-video relative shadow-[0_15px_45px_rgba(8,28,58,0.1)] border border-slate-150 bg-slate-50">
                <img
                  src={imgImplants}
                  alt="Dental Implants"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-center text-slate-500 text-xs sm:text-sm font-semibold font-sans leading-relaxed italic bg-teal-50/40 py-2.5 px-4 rounded-xl border border-teal-500/10">
                Replace missing teeth with dental implants in just one week with advanced technology.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* SECTION 3: Numbered Steps Procedure */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Our Workflow</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              How We Perform Dental Implants
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-[#FAFAFC] p-8 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <span className="block text-3xl font-black text-[#0D9488]/30 font-mono mb-5">
                  01
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base tracking-tight mb-3">
                  Step 1
                </h3>
                <p className="text-slate-600 text-[13px] sm:text-[14px] font-medium leading-relaxed font-sans">
                  CBCT Scan using our in-house X-ray machine.
                </p>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-200/50">
                PATEL DENTAL TECHNOLOGY
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-[#FAFAFC] p-8 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <span className="block text-3xl font-black text-[#0D9488]/30 font-mono mb-5">
                  02
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base tracking-tight mb-3">
                  Step 2
                </h3>
                <p className="text-slate-600 text-[13px] sm:text-[14px] font-medium leading-relaxed font-sans">
                  Dr. Vipul Patel performs complete CBCT analysis and virtual implant planning to determine the most accurate implant position for better chewing efficiency, smile aesthetics and long-term success.
                </p>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-200/50">
                DR. VIPUL PATEL CLINICAL PROTOCOL
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-[#FAFAFC] p-8 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <span className="block text-3xl font-black text-[#0D9488]/30 font-mono mb-5">
                  03
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base tracking-tight mb-3">
                  Step 3
                </h3>
                <p className="text-slate-600 text-[13px] sm:text-[14px] font-medium leading-relaxed font-sans">
                  After digital planning, Dr. Vipul Patel performs the same treatment clinically and delivers implant-supported fixed teeth in just one week.
                </p>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-200/50">
                IMMEDIATE LOADING SUCCESS
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: How Our Ultra Modern Method is Superior */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#0EA5C6]/5 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Scientific Edge</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Why Our Ultra Modern Implant Method is Superior
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {superiorityPoints.map((pt, idx) => (
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
                      Superior Standard
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
                  Patel Dental Implant Code: BP-0{pt.num}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Professional Gallery Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Smile Gallery</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Clinical Gallery
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Drag each slider left or right to inspect the exact real clinical before and after outcome.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case 1: Single Implant */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCase2Before}
                afterImg={imgCase2After}
                beforeLabel="Missing Front Tooth (Before)"
                afterLabel="Single Implant Crown (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Single Implant
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Single Tooth Replacement
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Replacing a missing front tooth with a premium biological titanium implant and a computerized CAD/CAM zirconia crown.
                </p>
              </div>
            </div>

            {/* Case 2: Double Implant */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgSmileBefore}
                afterImg={imgCase4After}
                beforeLabel="Adjacent Missing Gaps (Before)"
                afterLabel="Double Implant Bridges (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Double Implant
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Double Implant Rehabilitation
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Addressing bilateral adjacent missing chewing teeth to fully restore natural chewing forces and bite symmetry.
                </p>
              </div>
            </div>

            {/* Case 3: Quadrant Implant */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgSmileBefore}
                afterImg={imgCase3After}
                beforeLabel="Severely Broken Quadrant (Before)"
                afterLabel="Strategic Implant Crowns (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Quadrant Implant Cases
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Segmental Quadrant Reconstruction
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Restoring an entire posterior chewing quadrant using computer-guided strategic implant posts.
                </p>
              </div>
            </div>

            {/* Case 4: Full Mouth Rehabilitation */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgRehabBefore}
                afterImg={imgRehabAfter}
                beforeLabel="Terminal Tooth Mobility (Before)"
                afterLabel="Full Arch Fixed Prosthesis (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Full Mouth Rehabilitation Cases
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Full Mouth Rehabilitation
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Comprehensive immediate loading full arch rehabilitation with customized prosthetics inside a single week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Screw Retained Prosthesis Video Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0EA5C6]/5 to-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Procedure Video</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Procedure Video
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Watch this treatment explanation video to see the advanced mechanical screw-retained teeth systems that we place.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-6 shadow-xl max-w-3xl mx-auto">
            <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
              {activeVideos['screw-retained-vid'] ? (
                <iframe
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  src="https://www.youtube.com/embed/SnOxxv_S2ew?autoplay=1&rel=0"
                  title="Screw Retained Prosthesis"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              ) : (
                <button
                  onClick={() => setActiveVideos(prev => ({ ...prev, 'screw-retained-vid': true }))}
                  className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                  aria-label="Play Screw Retained Prosthesis Video"
                >
                  <img
                    src="https://img.youtube.com/vi/SnOxxv_S2ew/hqdefault.jpg"
                    alt="Screw Retained Prosthesis"
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

      {/* SECTION 8: Cost of Dental Implants - Premium CTA Banner */}
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
                Cost of Dental Implants
              </h2>
              <p className="text-slate-350 text-xs sm:text-sm leading-relaxed">
                We provide world-class implantology using US FDA approved premium brands at a fraction of standard international costs. Save up to 50% on your smile transformation with transparent, affordable luxury packages.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-4">
              <a
                href="tel:+919510397046"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-[#081C3A] text-xs font-black rounded-xl shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <Phone className="h-4.5 w-4.5 text-[#0D9488]" />
                Call Now: +91 9510397046
              </a>
              
              <a
                href="https://wa.me/919510397046?text=Hi%20Patel%20Dental%20Hospital,%20I'm%20interested%20in%20learning%20more%20about%20the%20Cost%20of%20Dental%20Implants."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black rounded-xl shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4.5 w-4.5" />
                WhatsApp Us: +91 9510397046
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 9: Hospital/Team Photograph Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center px-3 py-1 bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-xs font-bold uppercase tracking-widest rounded-full">
                Hospital / Team
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
                Our Specialist Implantology Panel
              </h2>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                Led by master implantologist Dr. Vipul Patel and supported by our highly trained surgical dental staff, our hospital handles some of the most complex clinical full mouth rehabilitation and sinus lift bone grafts in the region. We are fully committed to returning a beautiful, functional, healthy smile to you.
              </p>
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Full In-house Digital CBCT Diagnostic Suite</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Class 100 Laminar Flow Advanced Surgical Operatory</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">International Bio-Titanium Implants & Components Only</span>
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
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#0D9488]">DR. VIPUL PATEL & EXPERT MEDICAL TEAM</p>
                  <p className="text-xs font-sans text-gray-300 mt-1">Providing state-of-the-art dental care since generations</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 10: Patient Review Testimonial Video */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Patient Reviews</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Patient Reviews
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Listen to the actual life-changing experience shared directly by our happy dental implant patient.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-6 shadow-xl max-w-3xl mx-auto">
            <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
              {activeVideos['patient-review-vid'] ? (
                <iframe
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  src="https://www.youtube.com/embed/cyai6CjMD0s?autoplay=1&rel=0"
                  title="Dental Implant Patient Testimonial"
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
              Find professional answers to common questions about our ultra-modern dental implant treatments.
            </p>
          </div>

          <div className="space-y-3">
            {implantFaqs.map((faq) => {
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

      {/* SECTION 12: Related Services Section */}
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

      {/* SECTION 13: BOTTOM CTA */}
      <section className="py-16 md:py-20 bg-[#081C3A] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#081C3A] via-[#0F2F5E] to-[#081C3A] opacity-90" />
        <div className="max-w-2xl mx-auto px-4 relative z-10 space-y-6">
          <HeartHandshake className="h-10 w-10 text-[#0D9488] mx-auto animate-pulse" />
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
            Book Appointment
          </h2>
          <p className="text-gray-350 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
            Experience world-class, premium dental implant treatment customized to your unique facial profile by our master implantologist. Reach out directly via phone or WhatsApp.
          </p>
          
          {/* Direct call / WhatsApp / Appointment actions specified exactly */}
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
