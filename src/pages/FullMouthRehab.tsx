/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Calendar, Shield, Sparkles, HeartHandshake, CheckCircle2, 
  Phone, MessageSquare, Star, Eye, ShieldCheck, Users,
  HelpCircle, ArrowRight, ChevronDown, ChevronUp, Heart, Activity, Award, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { serviceService } from '../utils/serviceData';

// Images
import imgFullMouthRehab from '../assets/images/full_mouth_rehab_1780659100244.png';
import imgRehabBefore from '../assets/images/rehab_teeth_before_1780687516367.png';
import imgRehabAfter from '../assets/images/rehab_teeth_after_1780687532302.png';
import imgCrownsBefore from '../assets/images/crowns_teeth_before_1780687451589.png';
import imgCrownsAfter from '../assets/images/crowns_teeth_after_1780687466941.png';
import imgCase2Before from '../assets/images/gallery_case2_before_1780611481933.png';
import imgCase2After from '../assets/images/gallery_case2_after_1780611494535.png';
import patelDentalDoctors from '../assets/images/patel_doctors_hero_1781166043226.png';
import happyPatient from '../assets/images/happy_patient_1780608079560.png';

interface FullMouthRehabProps {
  setCurrentPage: (page: PageId) => void;
  openAppointmentModal: (preselectedTreatment?: string) => void;
}

export default function FullMouthRehab({ setCurrentPage, openAppointmentModal }: FullMouthRehabProps) {
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
            .filter(item => item.slug !== 'full-mouth-rehabilitation' && item.is_active)
            .slice(0, 3);
          setRelatedServices(filtered);
        }
      } catch (err) {
        console.error('Failed to load related services in FullMouthRehab page:', err);
      }
    };
    fetchRelated();
    return () => {
      active = false;
    };
  }, []);

  const handleBookClick = () => {
    openAppointmentModal('Full Mouth Rehabilitation');
  };

  const getWhatsAppUrl = () => {
    const text = `Hi Patel Dental Hospital, I'm interested in booking a consultation for Full Mouth Rehabilitation. Please let me know the next available slot!`;
    return `https://wa.me/919510397046?text=${encodeURIComponent(text)}`;
  };

  const handleNavigateToService = (targetSlug: string) => {
    window.location.hash = `#services/${targetSlug}`;
    setCurrentPage(`services/${targetSlug}` as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 6 pillars of Full Mouth Rehabilitation
  const pillars = [
    {
      num: '01',
      title: 'Teeth Restoration',
      body: 'Complete restoration of missing, broken, or decayed teeth using bio-compatible advanced crowns, bridges, or fillings.'
    },
    {
      num: '02',
      title: 'Gum Rehabilitation',
      body: 'Restoring firm, pink, healthy gum tissues to create a strong protective biological foundation for your reconstructed teeth.'
    },
    {
      num: '03',
      title: 'TMJ Rehabilitation',
      body: 'Restoring healthy jaw joint (temporomandibular joint) alignment to eliminate painful headaches, clicking, and chewing distress.'
    },
    {
      num: '04',
      title: 'Smile Restoration',
      body: 'Rebuilding your natural smile using micro-thin ceramic veneers and CAD/CAM custom digital crowns.'
    },
    {
      num: '05',
      title: 'Functional Rehabilitation',
      body: 'Optimizing chewing forces, speech articulation, and overall digestive health by correcting structural bite imbalances.'
    },
    {
      num: '06',
      title: 'Aesthetic Rehabilitation',
      body: 'Restoring facial heights, facial volume, and natural lip support to reverse premature signs of aging.'
    }
  ];

  // 4 Planning steps
  const planningSteps = [
    {
      num: '01',
      title: 'Clinical Examination',
      body: 'A meticulous physical check of oral tissue, bite heights, muscles, and joint health.'
    },
    {
      num: '02',
      title: 'Full Mouth OPG Scan',
      body: 'In-depth panoramic radiological analysis to inspect jaw bones, root systems, and internal structural health.'
    },
    {
      num: '03',
      title: 'Digital Diagnostics',
      body: 'Capturing intraoral and extraoral digital dental records to carefully study exact aesthetic coordinates.'
    },
    {
      num: '04',
      title: 'Specialist Panel Plan',
      body: 'A personalized treatment blueprint by Dr. Vipul Patel and our multidisciplinary specialist board.'
    }
  ];

  // Specialist panel roles
  const specialistPanel = [
    { role: 'Oral Surgeon', description: 'Handles complex, precise bone preparation and strategic surgical extractions.' },
    { role: 'Implantologist', description: 'Inserts premium biological titanium implants to act as permanent roots.' },
    { role: 'Periodontist', description: 'Treats critical bone support levels and provides advanced laser therapy for pyorrhea.' },
    { role: 'Prosthodontist', description: 'Styles, designs, and secures the final high-strength zirconia prosthetic teeth.' },
    { role: 'Endodontist', description: 'Saves natural tooth structures with painless single-sitting root canals.' }
  ];

  // 8 Treatment features
  const treatmentFeatures = [
    { title: 'Tooth Coloured Composite Fillings', desc: 'Restores minor tooth decay invisibly with medical-grade resin.' },
    { title: 'Root Canal Treatment', desc: 'Saves heavily infected teeth with advanced micro-endodontics.' },
    { title: 'Crowns & Bridges', desc: 'Restores multiple missing gaps with strong ceramic teeth bridges.' },
    { title: 'E-Max Veneers & Crowns', desc: 'Delivers ultimate light-reflecting glass-ceramic smile aesthetics.' },
    { title: 'Dental Implants', desc: 'Provides lifetime stable foundation with titanium posts.' },
    { title: 'Wisdom Tooth Surgery', desc: 'Surgically resolves painful, impacted wisdom teeth gently.' },
    { title: 'Laser Gum Treatment', desc: 'Eradicates persistent pyorrhea bacteria without stitches or surgery.' },
    { title: 'Braces / Invisible Aligners', desc: 'Re-aligns crooked teeth into perfect functional coordinates.' }
  ];

  // 4 Candidate profiles
  const candidateProfiles = [
    {
      num: '01',
      title: 'Severe Wear & Erosion',
      body: 'Worn-out teeth due to chronic pan masala, betel nut, or tobacco chewing.'
    },
    {
      num: '02',
      title: 'Trauma & Damage',
      body: 'Teeth lost, cracked, or severely damaged because of trauma, sporting injuries, or accidents.'
    },
    {
      num: '03',
      title: 'Acid & Erosion Issues',
      body: 'Enamel lost due to acid reflux, frequent acidity, carbonated cold drinks, or citrus juice erosion.'
    },
    {
      num: '04',
      title: 'TMJ Joint Disorders',
      body: 'Experiencing headaches, jaw joint pain, clicking noises, muscle stiffness, or recurring earaches.'
    }
  ];

  // 5 FAQs
  const fmrFaqs = [
    {
      id: 1,
      question: "What is Full Mouth Rehabilitation?",
      answer: "Full Mouth Rehabilitation (FMR) is an advanced multi-disciplinary treatment process where we rebuild, restore, and re-align all the teeth in both the upper and lower jaws. It restores chewing function, joint health, dental aesthetics, and returns the patient's smile and confidence."
    },
    {
      id: 2,
      question: "How long does a Full Mouth Rehabilitation take?",
      answer: "The duration depends on the specific treatments required. If using our advanced immediate loading dental implant system and computerized crowns, a full rehabilitation can be successfully completed in just 1 to 2 weeks. Complex orthodontics or tissue healing cases may require staging over several months."
    },
    {
      id: 3,
      question: "Is the treatment painful?",
      answer: "Not at all. Every phase of Full Mouth Rehabilitation at Patel Dental Hospital is performed under state-of-the-art computerized local anesthesia and modern painless protocols. We ensure absolute clinical comfort, using active sedation support for highly anxious patients."
    },
    {
      id: 4,
      question: "Who is a candidate for Full Mouth Rehabilitation?",
      answer: "FMR is ideal for individuals with multiple missing teeth, severely worn-out teeth from chewing pan masala, teeth damaged by severe acid erosion/reflux, or patients suffering from painful TMJ jaw joint disorders causing chronic headaches and neck stiffness."
    },
    {
      id: 5,
      question: "Are the reconstructed teeth durable?",
      answer: "Yes. We use premium, US FDA-approved high-performance materials such as Zirconia, E-Max glass ceramics, and biological titanium implants. Combined with Dr. Vipul Patel's precise planning, these restorations are designed to comfortably last a lifetime with standard oral hygiene."
    }
  ];

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', color: 'hover:bg-blue-600' },
    { name: 'Instagram', url: 'https://instagram.com', color: 'hover:bg-pink-600' },
    { name: 'Twitter', url: 'https://twitter.com', color: 'hover:bg-sky-500' },
    { name: 'YouTube', url: 'https://youtube.com', color: 'hover:bg-red-600' },
    { name: 'WhatsApp', url: getWhatsAppUrl(), color: 'hover:bg-green-500' },
    { name: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:bg-blue-700' }
  ];

  return (
    <div id="fmr-page-view" className="relative pt-[72px] bg-[#FAFAFC]">
      
      {/* SECTION 1: Hero Intro Section */}
      <section className="py-16 sm:py-24 bg-white relative z-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              PREMIUM RECONSTRUCTION TREATMENT
            </span>
            <h2 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-3">
              Full Mouth Rehabilitation
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            
            {/* Left Side: Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2.5">
                <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-wider uppercase block">
                  PATEL DENTAL HOSPITAL – MASTER REHABILITATION CENTER
                </span>
                <h3 className="font-display font-[900] text-[#081C3A] text-[24px] sm:text-[30px] md:text-[34px] leading-tight tracking-tight">
                  Full Mouth Rehabilitation
                </h3>
              </div>

              <div className="text-slate-600 text-[14.5px] sm:text-[15.5px] font-medium leading-relaxed space-y-4">
                <p>
                  Full Mouth Rehabilitation is the process of rebuilding or restoring all teeth, gums, and the temporomandibular joints of both the upper and lower jaws.
                </p>
                <p>
                  At Patel Dental Hospital, Dr. Vipul Patel and the multidisciplinary dental team carefully evaluate every patient using clinical examination and full-mouth OPG X-ray before preparing a personalized rehabilitation plan that restores function, aesthetics, comfort, and confidence.
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
                  src={imgFullMouthRehab}
                  alt="Full Mouth Rehabilitation"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-center text-slate-500 text-xs sm:text-sm font-semibold font-sans leading-relaxed italic bg-teal-50/40 py-2.5 px-4 rounded-xl border border-teal-500/10">
                Complete Full Mouth Rehabilitation with Advanced Multidisciplinary Dental Care.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* SECTION 2: What is Full Mouth Rehabilitation? (Pillars Grid) */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Scope of Treatment</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              What is Full Mouth Rehabilitation?
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.05 }}
                className="bg-[#FAFAFC] p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs hover:shadow-lg transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4.5">
                    <span className="text-2xl font-black text-[#0D9488]/30 font-mono">
                      {pillar.num}
                    </span>
                    <span className="text-[10px] uppercase font-black tracking-wider text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md">
                      Pillar of Health
                    </span>
                  </div>
                  
                  <h3 className="font-display font-extrabold text-[#081C3A] text-base tracking-tight mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-slate-600 text-[13px] sm:text-[14px] leading-relaxed font-sans font-medium">
                    {pillar.body}
                  </p>
                </div>
                
                <div className="text-[9px] font-mono text-gray-400 mt-6 pt-2 border-t border-gray-50 uppercase tracking-widest">
                  Patel Hospital standard: FMR-PLR-0{pillar.num}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Our Treatment Planning */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Scientific Diagnosis</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Our Treatment Planning Process
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          {/* Process step cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {planningSteps.map((step, idx) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300"
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
                <div className="text-[9px] font-mono text-gray-400 mt-6 pt-2 border-t border-gray-100 uppercase tracking-wider">
                  Planning Stage
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team Approach Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-md max-w-4xl mx-auto">
            <h3 className="font-display font-black text-[#081C3A] text-lg sm:text-xl tracking-tight text-center mb-2">
              Multidisciplinary Specialist Team Approach
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm text-center font-sans font-medium mb-8 max-w-2xl mx-auto">
              We employ a collaborative team board where every specialist plays their specific role to restore absolute chewing function, bite heights, aesthetics, and lasting oral health.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {specialistPanel.map((sp, idx) => (
                <div key={idx} className="bg-[#FAFAFC] p-4 rounded-xl border border-slate-100 text-center space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="h-6 w-6 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center mx-auto text-[10px] font-black font-mono">
                      {idx + 1}
                    </span>
                    <h4 className="font-display font-extrabold text-[#081C3A] text-xs">
                      {sp.role}
                    </h4>
                  </div>
                  <p className="text-[10px] text-gray-500 font-medium font-sans leading-relaxed">
                    {sp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: Treatment May Include */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Therapeutic Scope</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Rehabilitation Treatment Modules
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {treatmentFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-[#FAFAFC] p-6 rounded-2xl border border-slate-100 shadow-3xs hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="h-7 w-7 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                  <h3 className="font-display font-extrabold text-[#081C3A] text-sm tracking-tight leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-gray-500 font-sans text-xs leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block pt-2 border-t border-gray-200/40">
                  PDH Module {idx + 1}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Who is the Candidate? */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#0ea5c6]/5 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Indications & Diagnosis</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Who is the Candidate for FMR?
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {candidateProfiles.map((item, idx) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-3xs hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black text-[#0ea5c6]/30 font-mono block mb-4">
                    {item.num}
                  </span>
                  <h3 className="font-display font-extrabold text-[#081C3A] text-sm sm:text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed font-medium">
                    {item.body}
                  </p>
                </div>
                <div className="text-[9px] font-mono text-[#0ea5c6] uppercase tracking-widest pt-6 mt-4 border-t border-slate-50">
                  PDH Profile Check
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Clinical Gallery */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Clinical Restorations</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Clinical Gallery
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Drag each slider left or right to inspect the exact real clinical before and after outcome of our multidisciplinary cases.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Case 1: Full Mouth Rehabilitation (Lilaben Kakadiya) */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgRehabBefore}
                afterImg={imgRehabAfter}
                beforeLabel="Terminal Mobility (Before)"
                afterLabel="Perfect Reconstruction (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Patient Case: Lilaben Kakadiya
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Full Mouth Reconstruction
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Excellent fixed full arch reconstruction. Restored lost chewing support, proper bite coordinates, facial height, and a radiant smile inside a single week.
                </p>
              </div>
            </div>

            {/* Case 2: Dental Implant Rehabilitation */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCase2Before}
                afterImg={imgCase2After}
                beforeLabel="Missing Front Gaps (Before)"
                afterLabel="Strategic Implant Crowns (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Dental Implant Cases
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Implant-Supported Bridge Rehabilitation
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Permanently addressing missing teeth gaps using computer-guided biological implant posts and high-strength custom ceramic bridges.
                </p>
              </div>
            </div>

            {/* Case 3: Crowns & Bridges */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCrownsBefore}
                afterImg={imgCrownsAfter}
                beforeLabel="Broken / Decayed Teeth (Before)"
                afterLabel="Custom CAD/CAM Crowns (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Crowns & Bridges
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Comprehensive Crown Restoration
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Rebuilding heavily decayed, fractured, or root canal-treated teeth utilizing computerized CAD/CAM monolithic Zirconia crowns.
                </p>
              </div>
            </div>

            {/* Case 4: Root Canal Cases */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCrownsBefore}
                afterImg={imgCrownsAfter}
                beforeLabel="Deep Internal Pulp Decay (Before)"
                afterLabel="Anatomic Preservation (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Root Canal Cases
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Salvaging Decayed Chewing Roots
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Removing internal bacterial pulp infections using high-precision endodontic rotary motors and completely sealing the tooth.
                </p>
              </div>
            </div>
          </div>

          {/* Tooth Extraction Cases & Extra Info */}
          <div className="bg-[#FAFAFC] p-6 rounded-3xl border border-slate-100 max-w-3xl mx-auto text-center space-y-2.5">
            <span className="text-[10px] font-mono text-[#0D9488] uppercase tracking-widest font-bold">Clinical Extraction Cases</span>
            <h4 className="font-display font-extrabold text-sm sm:text-base text-[#081C3A]">Painless Structural Tooth Extractions</h4>
            <p className="text-gray-500 font-sans text-xs leading-relaxed max-w-xl mx-auto">
              In cases where teeth are fractured beyond salvaging, our panel oral surgeon performs fast, atraumatic, painless tooth extractions to prepare the bone structure for immediate dental implants.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 7: Procedure / Case Videos */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0EA5C6]/5 to-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Patient Case Studies</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Procedure & Case Videos
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Watch our educational full mouth clinical restoration videos and live success stories.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Video 1: Full Mouth Testimonial Video */}
            <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-md hover:shadow-lg transition">
              <h3 className="font-display font-bold text-slate-800 text-sm mb-3 text-center">Rehabilitation Testimonial</h3>
              <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
                {activeVideos['fmr-testimonial-vid'] ? (
                  <iframe
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    src="https://www.youtube.com/embed/SnOxxv_S2ew?autoplay=1&rel=0"
                    title="Full Mouth Rehabilitation Success Story Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                ) : (
                  <button
                    onClick={() => setActiveVideos(prev => ({ ...prev, 'fmr-testimonial-vid': true }))}
                    className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                    aria-label="Play Full Mouth Rehabilitation Success Video"
                  >
                    <img
                      src="https://img.youtube.com/vi/SnOxxv_S2ew/hqdefault.jpg"
                      alt="Full Mouth Rehabilitation Success Story"
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
                Full-arch immediate loading client testimonial.
              </p>
            </div>

            {/* Video 2: Treatment Procedure Video */}
            <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-md hover:shadow-lg transition">
              <h3 className="font-display font-bold text-slate-800 text-sm mb-3 text-center">FMR Procedure Overview</h3>
              <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
                {activeVideos['fmr-proc-vid'] ? (
                  <iframe
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    src="https://www.youtube.com/embed/cbVcmy53KBs?autoplay=1&rel=0"
                    title="Full Mouth Rehab Procedure Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                ) : (
                  <button
                    onClick={() => setActiveVideos(prev => ({ ...prev, 'fmr-proc-vid': true }))}
                    className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                    aria-label="Play Treatment Procedure Video"
                  >
                    <img
                      src="https://img.youtube.com/vi/cbVcmy53KBs/hqdefault.jpg"
                      alt="Full Mouth Rehab Procedure"
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
                Rebuilding teeth heights, chewing bite, and alignment.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8: Cost of FMR - Premium CTA Banner */}
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
                Full Mouth Rehabilitation
              </h2>
              <p className="text-slate-350 text-xs sm:text-sm leading-relaxed">
                Save up to 50% on complete smile and chew reconstruction compared to international standard packages. Get comprehensive full-mouth clinical care with transparent pricing and premium materials.
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
                href="https://wa.me/919510397046?text=Hi%20Patel%20Dental%20Hospital,%20I'm%20interested%20in%20learning%20more%20about%20the%20Cost%20of%20Full%20Mouth%20Rehabilitation."
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

      {/* SECTION 9: Hospital / Team Photography Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center px-3 py-1 bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-xs font-bold uppercase tracking-widest rounded-full">
                Hospital / Team
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
                Expert Clinicians & Happy Patients
              </h2>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                Led by Dr. Vipul Patel, our panel handles complex bone-grafts, dental implants, laser periodontal therapies, and aesthetic full arch veneers. We treat international and local families with ultimate hospitality.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-[#FAFAFC] p-4 rounded-2xl border border-slate-100 text-center">
                  <span className="block text-xl font-black text-[#0D9488] font-mono">350+</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider font-sans">FMR CASES SUCCESSFULLY SOLVED</span>
                </div>
                <div className="bg-[#FAFAFC] p-4 rounded-2xl border border-slate-100 text-center">
                  <span className="block text-xl font-black text-[#0ea5c6] font-mono">100%</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider font-sans">STERILE BARRIER HYGIENE CONTROL</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Team Photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50">
                <img
                  src={patelDentalDoctors}
                  alt="Patel Dental Hospital Medical Panel"
                  className="w-full aspect-[4/3] object-cover hover:scale-102 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#081C3A]/95 p-3 rounded-lg text-white">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-[#0D9488] font-bold">PDH SPECIALIST TEAM</p>
                  <p className="text-[10px] text-gray-300 font-medium">Expert medical faculty</p>
                </div>
              </div>

              {/* Patient Lilaben Photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50">
                <img
                  src={happyPatient}
                  alt="Happy Full Mouth Rehab Patient"
                  className="w-full aspect-[4/3] object-cover hover:scale-102 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#081C3A]/95 p-3 rounded-lg text-white">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-[#0D9488] font-bold">CLIENT SATISFACTION</p>
                  <p className="text-[10px] text-gray-300 font-medium">Smiling with Full Reconstruction</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 10: Patient Reviews */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Patient Reviews</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Patient Testimonials
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
            {/* Written Review */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 font-sans text-xs sm:text-sm italic leading-relaxed">
                "I was unable to chew or smile for years. Dr. Vipul Patel and his team rehabilitated my entire upper and lower teeth within a week. I feel young and healthy again. Truly the best dental hospital in India!"
              </p>
              <div>
                <h4 className="font-display font-extrabold text-xs text-[#081C3A]">Lilaben Kakadiya</h4>
                <p className="text-[10px] text-slate-400 font-mono">FMR Patient</p>
              </div>
            </div>

            {/* Video Review */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-4 shadow-md">
              <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
                {activeVideos['patient-fmr-review-vid'] ? (
                  <iframe
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    src="https://www.youtube.com/embed/cyai6CjMD0s?autoplay=1&rel=0"
                    title="FMR Patient Review"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                ) : (
                  <button
                    onClick={() => setActiveVideos(prev => ({ ...prev, 'patient-fmr-review-vid': true }))}
                    className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                    aria-label="Play Written Patient Review Video"
                  >
                    <img
                      src="https://img.youtube.com/vi/cyai6CjMD0s/hqdefault.jpg"
                      alt="FMR Testimonial Review video"
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
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: Follow Us (Social Media Links) */}
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

      {/* SECTION 12: Hospital Information (FAMDENT Award) */}
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
              FAMDENT: Best Highly Commended Dental Hospital in India
            </span>
            <p className="text-slate-600 font-sans text-xs sm:text-sm font-medium leading-relaxed">
              Patel Dental Hospital is one of the top dental hospitals in India, awarded by FAMDENT as the Best Highly Commended Dental Hospital in India. We offer flexible timings, individualized attention, affordability, accurate explanations of treatment, excellent patient care, a world-class experience, and strict hygiene control.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 13: FAQs Accordion */}
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
              Find professional answers to common questions about our Full Mouth Rehabilitation.
            </p>
          </div>

          <div className="space-y-3">
            {fmrFaqs.map((faq) => {
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

      {/* SECTION 14: Related Services Section */}
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

      {/* SECTION 15: BOTTOM CTA */}
      <section className="py-16 md:py-20 bg-[#081C3A] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#081C3A] via-[#0F2F5E] to-[#081C3A] opacity-90" />
        <div className="max-w-2xl mx-auto px-4 relative z-10 space-y-6">
          <HeartHandshake className="h-10 w-10 text-[#0D9488] mx-auto animate-pulse" />
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
            Book Appointment
          </h2>
          <p className="text-gray-350 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
            Experience world-class, premium full mouth reconstruction customized to your unique facial profile by our expert panel. Reach out directly via phone or WhatsApp.
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
