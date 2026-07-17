/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Calendar, Shield, Sparkles, HeartHandshake, CheckCircle2, 
  Phone, MessageSquare, Star, Eye, ShieldCheck,
  HelpCircle, ArrowRight, ChevronDown, ChevronUp, Heart, Sparkle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { serviceService } from '../utils/serviceData';

// Images
import imgSmileMakeover from '../assets/images/smile_makeover_1780610947126.png';
import imgSmileBefore from '../assets/images/smile_before_1780608028713.png';
import imgSmileAfter from '../assets/images/smile_after_1780608044346.png';
import imgCase1Before from '../assets/images/gallery_case1_before_1780611450331.png';
import imgCase1After from '../assets/images/gallery_case1_after_1780611466649.png';
import imgCase2Before from '../assets/images/gallery_case2_before_1780611481933.png';
import imgCase2After from '../assets/images/gallery_case2_after_1780611494535.png';
import imgCrownsBefore from '../assets/images/crowns_teeth_before_1780687451589.png';
import imgCrownsAfter from '../assets/images/crowns_teeth_after_1780687466941.png';
import patelDentalDoctors from '../assets/images/patel_doctors_hero_1781166043226.png';

interface SmileMakeoverProps {
  setCurrentPage: (page: PageId) => void;
  openAppointmentModal: (preselectedTreatment?: string) => void;
}

export default function SmileMakeover({ setCurrentPage, openAppointmentModal }: SmileMakeoverProps) {
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
            .filter(item => item.slug !== 'smile-makeover' && item.is_active)
            .slice(0, 3);
          setRelatedServices(filtered);
        }
      } catch (err) {
        console.error('Failed to load related services in Smile Makeover page:', err);
      }
    };
    fetchRelated();
    return () => {
      active = false;
    };
  }, []);

  const handleBookClick = () => {
    openAppointmentModal('Smile Makeover');
  };

  const getWhatsAppUrl = () => {
    const text = `Hi Patel Dental Hospital, I'm interested in booking a consultation for a Smile Makeover. Please let me know the next available slot!`;
    return `https://wa.me/919510397046?text=${encodeURIComponent(text)}`;
  };

  const handleNavigateToService = (targetSlug: string) => {
    window.location.hash = `#services/${targetSlug}`;
    setCurrentPage(`services/${targetSlug}` as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatIsPoints = [
    {
      num: '01',
      title: 'Smile Beautification',
      body: 'Designing and refining the symmetry, proportions, and spacing of your teeth to complement your natural facial features.'
    },
    {
      num: '02',
      title: 'Teeth Whitening',
      body: 'Professional, state-of-the-art bleaching techniques to lift years of deep stains and bring back brilliant whiteness.'
    },
    {
      num: '03',
      title: 'Veneers',
      body: 'Custom-designed, ultra-thin porcelain or composite shells that bond seamlessly to the front of teeth, correcting shape, size, and color.'
    },
    {
      num: '04',
      title: 'Composite Restorations',
      body: 'High-aesthetic resin composite bonding to instantly repair chips, cracks, gaps, and worn down edges with master precision.'
    },
    {
      num: '05',
      title: 'Dental Jewellery',
      body: 'Adding an elegant, sparkling touch of premium diamonds or crystals safely bonded to the tooth surface for a unique, dazzling accent.'
    },
    {
      num: '06',
      title: 'Improved Confidence & Personality',
      body: 'Reclaiming your self-esteem and facial youthfulness with a radiant, flawless smile that allows your true personality to shine.'
    }
  ];

  const planningSteps = [
    {
      num: '01',
      title: 'Smile Analysis',
      body: 'Detailed clinical assessment of your teeth, gums, lip line, facial symmetry, and skin tone to establish the ideal balance.'
    },
    {
      num: '02',
      title: 'DSLR Face & Smile Photography',
      body: 'High-resolution professional DSLR studio photography capturing your facial dynamics, laughter, and teeth profiles from multiple angles.'
    },
    {
      num: '03',
      title: 'Primary Impression of Teeth',
      body: 'Highly accurate impressions or digital scans of your current arch structures to serve as the physical foundation for the design.'
    },
    {
      num: '04',
      title: 'Digital Smile Design (DSD)',
      body: 'Using cutting-edge aesthetic smile design software to digitally plan, simulate, and visually preview your customized dream smile.'
    },
    {
      num: '05',
      title: 'Temporary Smile Trial',
      body: 'Creating a physical "wax-up" mock-up to temporarily place on your teeth, letting you see and feel the future smile inside your mouth.'
    },
    {
      num: '06',
      title: 'Patient Feedback Integration',
      body: 'We listen to your feedback, fine-tuning individual teeth shapes, alignments, and shade options before proceeding to final fabrication.'
    },
    {
      num: '07',
      title: 'Customized Smile Execution',
      body: 'Flawless cosmetic preparation and permanent placement of your bespoke veneers, crowns, or bonding for the ultimate transformation.'
    }
  ];

  const treatmentOptions = [
    {
      title: 'Composite Bonding',
      badge: 'Minor Corrections',
      body: 'An excellent, non-invasive treatment that uses tooth-colored composite resins to repair minor chips, close small gaps, and refine teeth shapes in a single appointment.'
    },
    {
      title: 'Porcelain Veneers',
      badge: 'Hollywood Smile',
      body: 'Bespoke, ultra-thin ceramic shells made from top-tier glass ceramics that are permanently bonded to the front of teeth to deliver the ultimate Hollywood star aesthetic.'
    },
    {
      title: 'Braces & Invisible Aligners',
      badge: 'Perfect Alignment',
      body: 'Straighten crooked, crowded, or spaced teeth using modern clear orthodontics. Invisible aligners offer a highly discrete, comfortable path to alignment.'
    },
    {
      title: 'Teeth Whitening',
      badge: 'Brilliant Brightness',
      body: 'Professional in-office whitening protocols that utilize safe, clinically validated activating light and medical-grade gels to safely brighten your shade by multiple tones.'
    },
    {
      title: 'Bespoke Smile Design',
      badge: 'Custom Facial Harmony',
      body: 'A comprehensive, multi-modality approach tailored entirely to your unique lip line, jaw alignment, eye symmetry, and personality traits.'
    }
  ];

  const makeoverFaqs = [
    {
      id: 1,
      question: "What is a Smile Makeover and what does it involve?",
      answer: "A Smile Makeover is a personalized combination of cosmetic dental treatments designed to restore and beautify your teeth, gums, and smile. It can involve teeth whitening, custom porcelain or composite veneers, aesthetic crowns, composite bonding, and dental jewelry. At Patel Dental Hospital, each smile is engineered to harmoniously match your unique facial features."
    },
    {
      id: 2,
      question: "How long does a Smile Makeover treatment usually take?",
      answer: "The duration depends on the specific treatments selected. Composite bonding and professional teeth whitening can be completed in just one or two visits. If your plan includes custom porcelain veneers or aesthetic crowns, the process typically takes about 1 to 2 weeks to design, trial, and permanently place your custom-fabricated restorations."
    },
    {
      id: 3,
      question: "Are Smile Makeover procedures painful?",
      answer: "No, most cosmetic dental procedures are completely painless. For treatments like veneers or tooth reshaping, we use advanced localized anesthesia to ensure absolute comfort. We also prioritize gentle, minimally invasive dental techniques to minimize post-treatment sensitivity and provide a highly relaxed experience."
    },
    {
      id: 4,
      question: "How do I choose between porcelain veneers and composite bonding?",
      answer: "Composite bonding is ideal for minor chips, small spaces, and quick single-day repairs. Porcelain veneers are premium, long-term restorations that offer superior stain-resistance, translucent natural light reflection, exceptional durability, and are ideal for more comprehensive transformations. Dr. Vipul Patel will guide you to the perfect choice during your initial consultation."
    },
    {
      id: 5,
      question: "How do I maintain and care for my new smile makeover?",
      answer: "Maintaining your new smile is straightforward! Brush twice daily with a non-abrasive fluoride toothpaste, floss regularly, and attend standard dental cleans every six months. If you have custom porcelain veneers, we recommend avoiding biting directly into extremely hard materials and wearing a nightguard if you tend to grind your teeth."
    }
  ];

  return (
    <div id="smile-makeover-page-view" className="relative pt-[72px] bg-[#FAFAFC]">
      
      {/* SECTION 1: Hero Section */}
      <section className="py-16 sm:py-24 bg-white relative z-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              PREMIUM CARE TREATMENT
            </span>
            <h2 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-3">
              Smile Makeover
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            
            {/* Left Side: Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2.5">
                <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-wider uppercase block">
                  PATEL DENTAL HOSPITAL – ADVANCED COSMETIC CENTER
                </span>
                <h3 className="font-display font-[900] text-[#081C3A] text-[24px] sm:text-[30px] md:text-[34px] leading-tight tracking-tight">
                  Smile Makeover
                </h3>
              </div>

              <div className="text-slate-600 text-[14.5px] sm:text-[15.5px] font-medium leading-relaxed space-y-4 font-sans">
                <p>
                  Smile Makeover is a comprehensive cosmetic dental treatment that enhances your smile using teeth whitening, veneers, composite restorations, and dental jewellery.
                </p>
                <p>
                  At Patel Dental Hospital, every smile makeover is individually designed to match your facial appearance, personality, and expectations, helping you achieve a beautiful and confident smile.
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
                  src={imgSmileMakeover}
                  alt="Smile Makeover Treatment"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-center text-slate-500 text-xs sm:text-sm font-semibold font-sans leading-relaxed italic bg-teal-50/40 py-2.5 px-4 rounded-xl border border-teal-500/10">
                Transform Your Smile with Personalized Smile Makeover Treatment.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* SECTION 2: What is Smile Makeover? (Display as premium introduction section) */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Scope of Treatment</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              What is Smile Makeover?
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatIsPoints.map((point, idx) => (
              <motion.div
                key={point.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.05 }}
                className="bg-[#FAFAFC] p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-3xs hover:shadow-lg transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4.5">
                    <span className="text-2xl font-black text-[#0D9488]/30 font-mono">
                      {point.num}
                    </span>
                    <span className="text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                      Beautification Component
                    </span>
                  </div>
                  
                  <h3 className="font-display font-extrabold text-[#081C3A] text-base tracking-tight mb-3">
                    {point.title}
                  </h3>

                  <p className="text-slate-600 text-[13px] sm:text-[14px] leading-relaxed font-sans font-medium">
                    {point.body}
                  </p>
                </div>
                
                <div className="text-[9px] font-mono text-gray-400 mt-6 pt-2 border-t border-gray-50 uppercase tracking-widest">
                  Patel Hospital standard: SMK-COMP-0{point.num}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Smile Makeover Treatment Planning */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Scientific Workflow</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Smile Makeover Treatment Planning
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {planningSteps.map((step, idx) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
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
        </div>
      </section>

      {/* SECTION 4: Smile Makeover Options */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Cosmetic Options</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Smile Makeover Options
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatmentOptions.map((opt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-[#FAFAFC] p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-3xs hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="h-8 w-8 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                      {opt.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-[#081C3A] text-base tracking-tight leading-snug">
                    {opt.title}
                  </h3>
                  <p className="text-slate-600 text-[13px] sm:text-[14px] leading-relaxed font-sans font-medium">
                    {opt.body}
                  </p>
                </div>
                
                <div className="text-[9px] font-mono text-gray-400 pt-3 border-t border-slate-200/50 uppercase tracking-widest">
                  Patel Aesthetics Code: OPT-{idx + 1}
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
            {/* Case 1: Smile Design Cases */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgSmileBefore}
                afterImg={imgSmileAfter}
                beforeLabel="Uneven Gaps & Shades (Before)"
                afterLabel="Symmetric Bright Smile (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Case 1
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Smile Design Cases
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Full aesthetic correction adjusting tooth shapes, shade alignment, and spacing to design a natural, beautifully contoured smile.
                </p>
              </div>
            </div>

            {/* Case 2: Charmi Smile Makeover Case */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCase1Before}
                afterImg={imgCase1After}
                beforeLabel="Spaced & Worn Teeth (Before)"
                afterLabel="Premium Porcelain Veneers (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Case 2
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Charmi Smile Makeover Case
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Bespoke porcelain laminate veneers placed to close mid-line spacing, enhance facial symmetry, and deliver a brilliant Hollywood Smile.
                </p>
              </div>
            </div>

            {/* Case 3: Jayshree Taraviya Case */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCase2Before}
                afterImg={imgCase2After}
                beforeLabel="Damaged Front Structures (Before)"
                afterLabel="Flawless Zirconia Crowns (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Case 3
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Jayshree Taraviya Case
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Full restoration of severely fractured and discolored anterior teeth utilizing ultra-strong, highly translucent zirconia crowns.
                </p>
              </div>
            </div>

            {/* Case 4: Composite Smile Cases */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCrownsBefore}
                afterImg={imgCrownsAfter}
                beforeLabel="Worn & Chipped Edges (Before)"
                afterLabel="Aesthetic Composite Bonding (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Case 4
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Composite Smile Cases
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Conservative, micro-invasive composite bonding used to close minor dental gaps, correct chips, and level the smile bite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Procedure Video */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0EA5C6]/5 to-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Procedure Video</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Procedure Video
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Watch this premium aesthetic case study to see how our customized veneers and designs create a beautiful, balanced smile.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-6 shadow-xl max-w-3xl mx-auto">
            <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
              {activeVideos['makeover-procedure-vid'] ? (
                <iframe
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&rel=0"
                  title="Smile Makeover Procedure"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              ) : (
                <button
                  onClick={() => setActiveVideos(prev => ({ ...prev, 'makeover-procedure-vid': true }))}
                  className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                  aria-label="Play Smile Makeover Procedure Video"
                >
                  <img
                    src="https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg"
                    alt="Smile Makeover Procedure"
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

      {/* SECTION 7: Cost Banner */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#081C3A] text-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl relative overflow-hidden space-y-6 max-w-5xl mx-auto">
            {/* Subtle background glows */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0D9488]/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

            <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10">
              <span className="inline-flex items-center gap-1 bg-[#0D9488] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full leading-none">
                Aesthetic Luxury Packages
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Smile Makeover
              </h2>
              <p className="text-slate-350 text-xs sm:text-sm leading-relaxed">
                Unlock your dream smile using premium porcelain veneers and cosmetic restorations. Enjoy transparent pricing, highly custom CAD/CAM technologies, and flexible treatment bundles.
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
                href="https://wa.me/919510397046?text=Hi%20Patel%20Dental%20Hospital,%20I'm%20interested%20in%20learning%20more%20about%20the%20Smile%20Makeover%20treatments%20and%20costs."
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

      {/* SECTION 8: Hospital / Team */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center px-3 py-1 bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-xs font-bold uppercase tracking-widest rounded-full">
                Hospital / Team
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
                Our Specialist Cosmetic Team
              </h2>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                Led by Dr. Vipul Patel and our skilled dental specialists, our clinic combines dental art with clinical science. We leverage fully in-house state-of-the-art diagnostics and the finest digital design software to craft a smile that perfectly matches your eyes, lips, jawline, and natural expressions.
              </p>
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Full In-house Digital Smile Preview Support</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Advanced CAD/CAM Computer-Fabricated Crowns & Veneers</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Premium, Stain-Resistant Glass Ceramic Materials Only</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-50">
                <img
                  src={patelDentalDoctors}
                  alt="Patel Dental Hospital Medical Team"
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

      {/* SECTION 9: Patient Reviews */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Patient Reviews</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Patient Reviews
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Listen to the actual life-changing experience shared directly by our happy cosmetic dental patients.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-6 shadow-xl max-w-3xl mx-auto">
            <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
              {activeVideos['patient-review-vid'] ? (
                <iframe
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  src="https://www.youtube.com/embed/cyai6CjMD0s?autoplay=1&rel=0"
                  title="Smile Makeover Patient Testimonial"
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

      {/* SECTION 10: FAQs */}
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
              Find professional answers to common questions about our customized smile makeover treatments.
            </p>
          </div>

          <div className="space-y-3">
            {makeoverFaqs.map((faq) => {
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
            Experience world-class, premium smile makeover treatment customized to your unique facial profile. Reach out directly via phone or WhatsApp.
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
