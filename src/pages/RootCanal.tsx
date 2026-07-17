/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Calendar, Shield, Sparkles, HeartHandshake, CheckCircle2, 
  Phone, MessageSquare, Star, Eye, ShieldCheck,
  HelpCircle, ArrowRight, ChevronDown, ChevronUp, Heart, Activity, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { serviceService } from '../utils/serviceData';

// Images
import imgRootCanal from '../assets/images/root_canal_rct_1780659131735.png';
import imgCrownsBefore from '../assets/images/crowns_teeth_before_1780687451589.png';
import imgCrownsAfter from '../assets/images/crowns_teeth_after_1780687466941.png';
import imgCase1Before from '../assets/images/gallery_case1_before_1780611450331.png';
import imgCase1After from '../assets/images/gallery_case1_after_1780611466649.png';
import imgCase2Before from '../assets/images/gallery_case2_before_1780611481933.png';
import imgCase2After from '../assets/images/gallery_case2_after_1780611494535.png';
import imgRehabBefore from '../assets/images/rehab_teeth_before_1780687516367.png';
import imgRehabAfter from '../assets/images/rehab_teeth_after_1780687532302.png';
import patelDentalDoctors from '../assets/images/patel_doctors_hero_1781166043226.png';

interface RootCanalProps {
  setCurrentPage: (page: PageId) => void;
  openAppointmentModal: (preselectedTreatment?: string) => void;
}

export default function RootCanal({ setCurrentPage, openAppointmentModal }: RootCanalProps) {
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
            .filter(item => item.slug !== 'root-canal-treatment' && item.is_active)
            .slice(0, 3);
          setRelatedServices(filtered);
        }
      } catch (err) {
        console.error('Failed to load related services in RootCanal page:', err);
      }
    };
    fetchRelated();
    return () => {
      active = false;
    };
  }, []);

  const handleBookClick = () => {
    openAppointmentModal('Root Canal Treatment');
  };

  const getWhatsAppUrl = () => {
    const text = `Hi Patel Dental Hospital, I'm interested in booking a consultation for Single Sitting Root Canal Treatment. Please let me know the next available slot!`;
    return `https://wa.me/919510397046?text=${encodeURIComponent(text)}`;
  };

  const handleNavigateToService = (targetSlug: string) => {
    window.location.hash = `#services/${targetSlug}`;
    setCurrentPage(`services/${targetSlug}` as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 5 premium workflow steps of Root Canal Treatment
  const rctWorkflowSteps = [
    {
      num: '01',
      title: 'Nerve Removal',
      subtitle: 'PATEL ENDODONTIC CARE',
      body: 'Removal of infected tooth nerve with high-precision instruments to relieve pain instantly.'
    },
    {
      num: '02',
      title: 'Canal Shaping',
      subtitle: 'PRECISION PREPARATION',
      body: 'Cleaning and shaping of root canals utilizing premium flexible rotary instruments.'
    },
    {
      num: '03',
      title: 'Deep Disinfection',
      subtitle: 'STERILIZATION PROTOCOLS',
      body: 'Disinfection of canals using modern irrigation and ultrasonic sterilization techniques.'
    },
    {
      num: '04',
      title: 'Biocompatible Filling',
      subtitle: 'SEAL AND SECURE',
      body: 'Three-dimensional filling of canals with advanced materials like Gutta Percha and MTA.'
    },
    {
      num: '05',
      title: 'Crown / Restoration',
      subtitle: 'RESTORE AND PROTECT',
      body: 'Final protection using a customized high-strength Crown or permanent aesthetic Filling.'
    }
  ];

  // 6 advanced technology cards
  const technologyPoints = [
    {
      num: '01',
      title: 'Apex Locator',
      body: 'Ensures micro-precise measurement of root canals for highly accurate cleaning and sealing.'
    },
    {
      num: '02',
      title: 'Made in Japan Endo Motor',
      body: 'Advanced rotary endodontic motor for swift, noiseless, and exceptionally precise treatment.'
    },
    {
      num: '03',
      title: 'Digital X-Ray',
      body: 'Instantly produces ultra-high definition, low-radiation digital scans for accurate clinical diagnostics.'
    },
    {
      num: '04',
      title: 'Biocompatible Bioceramic MTA Sealer',
      body: 'Medical-grade sealers that form an airtight seal to completely prevent future bacterial leakage.'
    },
    {
      num: '05',
      title: 'Single Sitting Treatment',
      body: 'Advanced endodontic protocols that make complete root canal therapy possible in a single visit.'
    },
    {
      num: '06',
      title: 'Affordable Luxury',
      body: 'High-quality dental care with international standard equipment at highly competitive pricing.'
    }
  ];

  // 6 advantage cards
  const advantagePoints = [
    {
      num: '01',
      title: 'No Multiple Clinic Visits',
      body: 'Complete your entire root canal therapy in just one sitting and avoid repeated appointments.'
    },
    {
      num: '02',
      title: 'Saves Valuable Time',
      body: 'Perfect for busy professionals, elderly patients, or out-of-town visitors looking for fast care.'
    },
    {
      num: '03',
      title: 'Local Anesthesia Only Once',
      body: 'Anesthetic is administered only once, minimizing anxiety and maximizing physical comfort.'
    },
    {
      num: '04',
      title: 'Less Medicine Required',
      body: 'Reduced post-treatment pharmaceutical requirements and fewer antibiotics or pain relievers.'
    },
    {
      num: '05',
      title: 'Reduced Cross Infection',
      body: 'Minimizes exposure to saliva contamination and bacterial leakage between multi-stage sessions.'
    },
    {
      num: '06',
      title: 'Better Long-Term Success',
      body: 'Immediate sealing of sterile canals protects root integrity and yields excellent survival rates.'
    }
  ];

  const rctFaqs = [
    {
      id: 1,
      question: "What is Single Sitting Root Canal Treatment?",
      answer: "It is an advanced endodontic procedure where the entire root canal therapy—including nerve removal, canal cleaning, disinfection, and sealing—is completed in a single clinical visit of about 45-60 minutes, instead of multiple painful visits."
    },
    {
      id: 2,
      question: "Is Root Canal Treatment painful?",
      answer: "No. With our computerized local anesthesia and modern techniques, the procedure is completely painless. Most patients feel immediate relief from their toothache after the treatment begins."
    },
    {
      id: 3,
      question: "Why do I need a crown after a Root Canal?",
      answer: "After a root canal, the tooth loses its natural blood and nerve supply, making it brittle and more prone to cracking under chewing forces. A crown acts as a protective shield, restoring full chewing strength and ensuring the tooth lasts a lifetime."
    },
    {
      id: 4,
      question: "Is Single Sitting RCT suitable for everyone?",
      answer: "Most patients are perfect candidates for single-sitting RCT. However, in cases of severe swelling, active pus drainage, or complex canal anatomy, our specialist might recommend an additional dressing visit to ensure absolute safety and success."
    },
    {
      id: 5,
      question: "What materials are used to seal the canals?",
      answer: "We use premium, US FDA-approved biocompatible bioceramic sealers along with Gutta Percha and MTA. These materials form an airtight, sterile seal inside the root canals to prevent any future bacterial leakage or infection."
    }
  ];

  return (
    <div id="rct-page-view" className="relative pt-[72px] bg-[#FAFAFC]">
      
      {/* SECTION 1: Hero Intro Section */}
      <section className="py-16 sm:py-24 bg-white relative z-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              PREMIUM CARE TREATMENT
            </span>
            <h2 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-3">
              Single Sitting Root Canal Treatment
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            
            {/* Left Side: Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2.5">
                <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-wider uppercase block">
                  PATEL DENTAL HOSPITAL – ENDODONTIC EXCELLENCE
                </span>
                <h3 className="font-display font-[900] text-[#081C3A] text-[24px] sm:text-[30px] md:text-[34px] leading-tight tracking-tight">
                  Single Sitting Root Canal Treatment
                </h3>
              </div>

              <div className="text-slate-600 text-[14.5px] sm:text-[15.5px] font-medium leading-relaxed space-y-4">
                <p>
                  When tooth decay reaches the nerve, it causes severe pain and infection. During Root Canal Treatment, the infected tissue is removed, the canals are cleaned and disinfected, and then sealed using advanced biocompatible materials such as Gutta Percha and MTA.
                </p>
                <p>
                  At Patel Dental Hospital, we complete most Root Canal Treatments in just one visit using advanced technology, helping patients save valuable time while receiving world-class dental care.
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
                  src={imgRootCanal}
                  alt="Single Sitting Root Canal Treatment"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-center text-slate-500 text-xs sm:text-sm font-semibold font-sans leading-relaxed italic bg-teal-50/40 py-2.5 px-4 rounded-xl border border-teal-500/10">
                Single Sitting Root Canal Treatment with Advanced Technology.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* SECTION 2: What is Root Canal Treatment? Numbered Steps Procedure */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Scientific Treatment Steps</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              What is Root Canal Treatment?
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {rctWorkflowSteps.map((step, idx) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-[#FAFAFC] p-6 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-300"
              >
                <div>
                  <span className="block text-3xl font-black text-[#0D9488]/30 font-mono mb-4">
                    {step.num}
                  </span>
                  <h3 className="font-display font-extrabold text-[#081C3A] text-sm tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-[12.5px] sm:text-[13.5px] font-medium leading-relaxed font-sans">
                    {step.body}
                  </p>
                </div>
                <div className="text-[9px] font-mono text-gray-400 mt-6 pt-2 border-t border-gray-200/50 uppercase tracking-wider">
                  {step.subtitle}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Advanced Technology We Use */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#0EA5C6]/5 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Endodontic Tech Suite</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Advanced Technology We Use
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologyPoints.map((pt, idx) => (
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
                      Tech Standard
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
                  Patel Dental Code: RCT-TECH-0{pt.num}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Advantages of Single Sitting Root Canal Treatment */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Patient Benefits</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Advantages of Single Sitting Root Canal Treatment
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantagePoints.map((pt, idx) => (
              <motion.div
                key={pt.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.05 }}
                className="bg-[#FAFAFC] p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs hover:shadow-lg transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4.5">
                    <span className="text-2xl font-black text-[#0D9488]/30 font-mono">
                      {pt.num}
                    </span>
                    <span className="text-[10px] uppercase font-black tracking-wider text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md">
                      Advantage
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
                  Patel Clinical Benefit: RCT-ADV-0{pt.num}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Clinical Gallery */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Aesthetics & Restoration</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Clinical Gallery
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Drag each slider left or right to inspect the exact real clinical before and after outcome of our Endodontic treatments.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case 1: Crowns & Bridges */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCrownsBefore}
                afterImg={imgCrownsAfter}
                beforeLabel="Decayed & Broken Gaps (Before)"
                afterLabel="Perfect Crown Restoration (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  RCT Crown Protection
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Infected Tooth Decay Restoration
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Removing deep bacterial decay and sealing the tooth permanently with a computerized custom zirconia crown after single sitting Root Canal Therapy.
                </p>
              </div>
            </div>

            {/* Case 2: Attrition Restoration */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCase1Before}
                afterImg={imgCase1After}
                beforeLabel="Structural Cracks & Wear (Before)"
                afterLabel="Reconstructed Aesthetic Teeth (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Restorative Endodontics
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Tooth Attrition & Nerve Therapy
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Addressing structural tooth attrition and painful internal micro-cracks using specialized single-sitting endodontic reinforcement.
                </p>
              </div>
            </div>

            {/* Case 3: Infected Molar */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCase2Before}
                afterImg={imgCase2After}
                beforeLabel="Infected Root Gaps (Before)"
                afterLabel="Perfect Custom Crown (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Molar Salvage Case
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Deep Posterior Root Infection
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Salvaging a severely infected chewing molar using high-precision Root Canal Therapy followed by computerized ceramic crown placement.
                </p>
              </div>
            </div>

            {/* Case 4: Full Mouth Endodontic Reconstruction */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgRehabBefore}
                afterImg={imgRehabAfter}
                beforeLabel="Broken Chewing Units (Before)"
                afterLabel="Complete Fixed Restoration (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Comprehensive Reconstruction
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Full Mouth Endodontic Rehabilitation
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Reconstruction of multiple severely broken chewing units completed with root canals and aesthetic zirconia bridge restorations inside one week.
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
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Procedure Video Suite</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Procedure Videos
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Watch our educational clinical treatment and case videos explaining the advanced single-sitting root treatments.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Video 1: Procedure Explanation */}
            <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-md hover:shadow-lg transition">
              <h3 className="font-display font-bold text-slate-800 text-sm mb-3 text-center">Root Canal Procedure</h3>
              <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
                {activeVideos['rct-proc-vid'] ? (
                  <iframe
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    src="https://www.youtube.com/embed/DBejq69FOGI?autoplay=1&rel=0"
                    title="Root Canal Treatment Explanation Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                ) : (
                  <button
                    onClick={() => setActiveVideos(prev => ({ ...prev, 'rct-proc-vid': true }))}
                    className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                    aria-label="Play Root Canal Treatment Explanation"
                  >
                    <img
                      src="https://img.youtube.com/vi/DBejq69FOGI/hqdefault.jpg"
                      alt="Root Canal Treatment Explanation"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300 pointer-events-none" />
                    <div className="absolute z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/95 text-[#0D9488] shadow-md group-hover:scale-110 group-hover:bg-[#0D9488] group-hover:text-white transition-all duration-300 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 translate-x-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
              <p className="text-center text-xs text-slate-500 font-medium mt-3 leading-relaxed">
                Treatment explanation & painless technology details.
              </p>
            </div>

            {/* Video 2: Single Sitting Case */}
            <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-md hover:shadow-lg transition">
              <h3 className="font-display font-bold text-slate-800 text-sm mb-3 text-center">Single Sitting Case</h3>
              <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
                {activeVideos['rct-case-vid'] ? (
                  <iframe
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    src="https://www.youtube.com/embed/-eoVpGDqCRs?autoplay=1&rel=0"
                    title="Single Sitting Case Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                ) : (
                  <button
                    onClick={() => setActiveVideos(prev => ({ ...prev, 'rct-case-vid': true }))}
                    className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                    aria-label="Play Single Sitting Case Video"
                  >
                    <img
                      src="https://img.youtube.com/vi/-eoVpGDqCRs/hqdefault.jpg"
                      alt="Single Sitting Case"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300 pointer-events-none" />
                    <div className="absolute z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/95 text-[#0D9488] shadow-md group-hover:scale-110 group-hover:bg-[#0D9488] group-hover:text-white transition-all duration-300 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 translate-x-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
              <p className="text-center text-xs text-slate-500 font-medium mt-3 leading-relaxed">
                Step-by-step single-visit treatment flow analysis.
              </p>
            </div>

            {/* Video 3: FMR Related Case */}
            <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-md hover:shadow-lg transition">
              <h3 className="font-display font-bold text-slate-800 text-sm mb-3 text-center">FMR Rehabilitation Case</h3>
              <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
                {activeVideos['rct-fmr-vid'] ? (
                  <iframe
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    src="https://www.youtube.com/embed/SnOxxv_S2ew?autoplay=1&rel=0"
                    title="FMR Rehab Case Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                ) : (
                  <button
                    onClick={() => setActiveVideos(prev => ({ ...prev, 'rct-fmr-vid': true }))}
                    className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                    aria-label="Play FMR Case Video"
                  >
                    <img
                      src="https://img.youtube.com/vi/SnOxxv_S2ew/hqdefault.jpg"
                      alt="Full Mouth Rehabilitation Case study"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300 pointer-events-none" />
                    <div className="absolute z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/95 text-[#0D9488] shadow-md group-hover:scale-110 group-hover:bg-[#0D9488] group-hover:text-white transition-all duration-300 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 translate-x-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
              <p className="text-center text-xs text-slate-500 font-medium mt-3 leading-relaxed">
                Full-arch reconstruction with root canal systems.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: Cost of Root Canal Treatment - Premium CTA Banner */}
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
                Cost of Root Canal Treatment
              </h2>
              <p className="text-slate-350 text-xs sm:text-sm leading-relaxed">
                We provide world-class, premium single-sitting root canal treatments using Japanese Endo Motors and computerized Apex Locators at a fraction of standard international costs. Save up to 50% on your therapy with transparent, painless, and affordable dental care packages.
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
                href="https://wa.me/919510397046?text=Hi%20Patel%20Dental%20Hospital,%20I'm%20interested%20in%20learning%20more%20about%20the%20Cost%20of%20Root%20Canal%20Treatment."
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

      {/* SECTION 8: Hospital/Team Photograph Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center px-3 py-1 bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-xs font-bold uppercase tracking-widest rounded-full">
                Hospital / Team
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
                Our Specialist Endodontic Panel
              </h2>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                Led by master endodontist Dr. Vipul Patel and supported by our highly trained medical staff, our hospital handles some of the most complex clinical single-sitting root canals, full arch reconstructions, and restorative cases. We are committed to pain-free, fast, and permanent dental restoration.
              </p>
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Full In-house Digital CBCT Diagnostic Suite</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Advanced Rotary Endo Motors & Sealed MTA Systems</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Strict Sterile Isolation & Infection Barriers Only</span>
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

      {/* SECTION 9: Patient Review Testimonial Video */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Patient Reviews</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Patient Reviews
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Listen to the actual life-changing experience shared directly by our happy Root Canal treatment patient.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-6 shadow-xl max-w-3xl mx-auto">
            <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
              {activeVideos['patient-review-vid'] ? (
                <iframe
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  src="https://www.youtube.com/embed/cyai6CjMD0s?autoplay=1&rel=0"
                  title="Dental Patient Testimonial"
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

      {/* SECTION 10: FAQs Accordion */}
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
              Find professional answers to common questions about our single-sitting Root Canal Treatments.
            </p>
          </div>

          <div className="space-y-3">
            {rctFaqs.map((faq) => {
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

      {/* SECTION 11: Related Services Section */}
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

      {/* SECTION 12: BOTTOM CTA */}
      <section className="py-16 md:py-20 bg-[#081C3A] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#081C3A] via-[#0F2F5E] to-[#081C3A] opacity-90" />
        <div className="max-w-2xl mx-auto px-4 relative z-10 space-y-6">
          <HeartHandshake className="h-10 w-10 text-[#0D9488] mx-auto animate-pulse" />
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
            Book Appointment
          </h2>
          <p className="text-gray-350 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
            Experience world-class, premium single sitting Root Canal treatment customized to your clinical needs. Reach out directly via phone or WhatsApp.
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
