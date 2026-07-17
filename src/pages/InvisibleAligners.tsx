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
import imgClearAlignersHero from '../assets/images/clear_aligners_1780659117253.png';
import imgAlignersBefore from '../assets/images/aligners_teeth_before_1780687415680.png';
import imgAlignersAfter from '../assets/images/aligners_teeth_after_1780687432806.png';
import imgCrownsBefore from '../assets/images/crowns_teeth_before_1780687451589.png';
import imgCrownsAfter from '../assets/images/crowns_teeth_after_1780687466941.png';
import imgCase1Before from '../assets/images/gallery_case1_before_1780611450331.png';
import imgCase1After from '../assets/images/gallery_case1_after_1780611466649.png';
import patelDentalDoctors from '../assets/images/patel_doctors_hero_1781166043226.png';
import drKinjalPortrait from '../assets/images/dr_kinjal_patel_portrait_1780662446908.png';

interface InvisibleAlignersProps {
  setCurrentPage: (page: PageId) => void;
  openAppointmentModal: (preselectedTreatment?: string) => void;
}

export default function InvisibleAligners({ setCurrentPage, openAppointmentModal }: InvisibleAlignersProps) {
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
            .filter(item => item.slug !== 'invisible-aligners' && item.is_active)
            .slice(0, 3);
          setRelatedServices(filtered);
        }
      } catch (err) {
        console.error('Failed to load related services in InvisibleAligners page:', err);
      }
    };
    fetchRelated();
    return () => {
      active = false;
    };
  }, []);

  const handleBookClick = () => {
    openAppointmentModal('Invisible Aligners');
  };

  const getWhatsAppUrl = () => {
    const text = `Hi Patel Dental Hospital, I'm interested in booking a consultation for Invisible Aligners. Please let me know the next available slot!`;
    return `https://wa.me/919510397046?text=${encodeURIComponent(text)}`;
  };

  const handleNavigateToService = (targetSlug: string) => {
    window.location.hash = `#services/${targetSlug}`;
    setCurrentPage(`services/${targetSlug}` as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 5 features of Invisible Aligners
  const alignerIntroPoints = [
    {
      num: '01',
      title: 'Clear Custom Aligners',
      body: 'Individually fabricated from state-of-the-art medical-grade polymers to match your mouth coordinates.'
    },
    {
      num: '02',
      title: 'Comfortable & Removable',
      body: 'Soft, custom-fitting transparent trays that can be removed effortlessly for meals and active hygiene.'
    },
    {
      num: '03',
      title: 'Wire-Free Treatment',
      body: 'Completely free of painful metal brackets, poking wires, or frequent emergency clinic visits.'
    },
    {
      num: '04',
      title: 'Gradual Teeth Alignment',
      body: 'Employs constant, low, biocompatible orthodontic force to gently guide teeth into desired alignment.'
    },
    {
      num: '05',
      title: 'Advanced Digital Planning',
      body: 'Allows you to visualize the final outcome of your smile shift using 3D digital simulation software.'
    }
  ];

  // 7 Planning Steps
  const planningSteps = [
    {
      num: '01',
      title: 'Clinical Examination',
      body: 'A thorough dental check by Dr. Kinjal Patel to verify your suitability for clear aligners.'
    },
    {
      num: '02',
      title: 'CBCT Scan',
      body: 'Ultra-low radiation bone scanning to inspect dental roots, bone volumes, and skeletal symmetry.'
    },
    {
      num: '03',
      title: 'Intraoral Scan',
      body: 'Direct 3D optical scanning to map your entire bite in full color without messy impression paste.'
    },
    {
      num: '04',
      title: 'DSLR Face & Smile Pics',
      body: 'Capturing aesthetic studio photos of your face, lips, and smile angles to guide the software design.'
    },
    {
      num: '05',
      title: '3D Digital Planning',
      body: 'Creating a highly personalized virtual simulation of each step of your teeth transition.'
    },
    {
      num: '06',
      title: 'Custom Fabrication',
      body: 'US FDA-approved medical clear plastics are laser-cut and molded into your custom aligner tray sets.'
    },
    {
      num: '07',
      title: 'Bi-Weekly Aligner Swap',
      body: 'Progress to the next set of clear trays approximately every 14 days until your smile is beautifully straight.'
    }
  ];

  // 6 Premium Features of Clear Aligners
  const whyChoosePoints = [
    {
      num: '01',
      title: 'Virtually Invisible',
      body: 'So completely clear and transparent that nobody will ever notice you are undergoing orthodontic care.'
    },
    {
      num: '02',
      title: 'Ultimate Comfort',
      body: 'Sleek, rounded edges that do not cut or irritate sensitive inner lips, gums, or oral tissues.'
    },
    {
      num: '03',
      title: 'No Metal Or Wires',
      body: 'Enjoy absolute dental peace with zero risk of metal brackets snapping or wires injuring cheeks.'
    },
    {
      num: '04',
      title: 'Customized 3D Treatment',
      body: 'Every single micromovement is mathematically mapped to achieve highly stable clinical outcomes.'
    },
    {
      num: '05',
      title: 'Improved Confidence',
      body: 'Smile proudly in photographs and speak seamlessly during business presentations with confidence.'
    },
    {
      num: '06',
      title: 'Excellent Smile Aesthetics',
      body: 'Combines beautiful vertical tooth alignment with facial harmony for stunning life-long results.'
    }
  ];

  const alignerFaqs = [
    {
      id: 1,
      question: "How do Invisible Aligners straighten teeth?",
      answer: "Invisible Aligners use a series of custom-made, clear, medical-grade plastic trays. Each set of trays applies a slight, calibrated force to specific teeth, gradually and gently moving them into their correct positions as planned by our advanced 3D digital software."
    },
    {
      id: 2,
      question: "How many hours a day must I wear my clear aligners?",
      answer: "For optimal, predictable clinical results, aligners must be worn for 20 to 22 hours every day. You should only remove them when eating, drinking hot liquids, brushing, or flossing."
    },
    {
      id: 3,
      question: "Is the Invisible Aligner treatment painful?",
      answer: "No, aligners are much more comfortable than traditional metal braces. You may feel a mild sensation of pressure for the first day or two after switching to a new set of trays, which is a healthy sign that your teeth are moving successfully."
    },
    {
      id: 4,
      question: "How do I clean my clear aligners?",
      answer: "Simply rinse them with cold or lukewarm water and brush them gently with a soft-bristled toothbrush. Never use hot water, as it can warp and ruin the custom medical plastic."
    },
    {
      id: 5,
      question: "How much does Invisible Aligner treatment cost?",
      answer: "At Patel Dental Hospital, we offer world-class digital aligners at highly affordable packages, saving you up to 50% compared to typical international clinics. We provide complete transparency with flexible payment options."
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
    <div id="aligners-page-view" className="relative pt-[72px] bg-[#FAFAFC]">
      
      {/* SECTION 1: Hero Intro Section */}
      <section className="py-16 sm:py-24 bg-white relative z-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              PREMIUM ESTHETIC TREATMENT
            </span>
            <h2 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-3">
              Invisible Aligners
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            
            {/* Left Side: Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2.5">
                <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-wider uppercase block">
                  PATEL DENTAL HOSPITAL – SMILE DESIGN CENTER
                </span>
                <h3 className="font-display font-[900] text-[#081C3A] text-[24px] sm:text-[30px] md:text-[34px] leading-tight tracking-tight">
                  Invisible Aligners
                </h3>
              </div>

              <div className="text-slate-600 text-[14.5px] sm:text-[15.5px] font-medium leading-relaxed space-y-4">
                <p>
                  Invisible Aligners are a modern solution to straighten and align teeth using a custom-made series of clear aligners designed with advanced digital technology.
                </p>
                <p>
                  The aligners are smooth, comfortable, and virtually invisible. They gradually move your teeth into the correct position without the use of metal wires or brackets.
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
                  src={imgClearAlignersHero}
                  alt="Invisible Aligners Smile"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-center text-slate-500 text-xs sm:text-sm font-semibold font-sans leading-relaxed italic bg-teal-50/40 py-2.5 px-4 rounded-xl border border-teal-500/10">
                Straighten Your Smile Comfortably with Virtually Invisible Aligners.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* SECTION 2: What are Invisible Aligners? (Horizontal Features) */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Modern Orthodontics</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              What are Invisible Aligners?
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {alignerIntroPoints.map((pt, idx) => (
              <motion.div 
                key={pt.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-[#FAFAFC] p-6 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-md transition duration-300"
              >
                <div>
                  <span className="block text-3xl font-black text-[#0D9488]/30 font-mono mb-4">
                    {pt.num}
                  </span>
                  <h3 className="font-display font-extrabold text-[#081C3A] text-sm tracking-tight mb-2">
                    {pt.title}
                  </h3>
                  <p className="text-slate-600 text-[12.5px] sm:text-[13.5px] font-medium leading-relaxed font-sans">
                    {pt.body}
                  </p>
                </div>
                <div className="text-[9px] font-mono text-gray-400 mt-6 pt-2 border-t border-gray-200/50 uppercase tracking-wider">
                  Aligner Feature
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Invisible Aligners Treatment Planning */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Scientific Planning</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Aligner Treatment Planning
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {planningSteps.map((step, idx) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-white p-5 rounded-2xl border border-gray-150 flex flex-col justify-between shadow-xs hover:shadow-sm transition"
              >
                <div>
                  <span className="block text-2xl font-black text-[#0D9488]/30 font-mono mb-3">
                    {step.num}
                  </span>
                  <h3 className="font-display font-extrabold text-[#081C3A] text-xs mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-[11px] sm:text-[12px] leading-relaxed font-sans">
                    {step.body}
                  </p>
                </div>
                <div className="text-[8px] font-mono text-gray-400 mt-5 pt-1.5 border-t border-gray-100 uppercase tracking-widest">
                  Step {step.num}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Why Choose Our Invisible Aligners */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Patient Benefits</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Why Choose Our Invisible Aligners
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoosePoints.map((pt, idx) => (
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
                      Benefit
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
                  Patel Orthodontic Standard: ALN-0{pt.num}
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
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Aligner Transits</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Clinical Gallery
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Drag each slider left or right to inspect the exact real clinical before and after outcome of our Aligner treatments.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case 1: Kinjal Aligner Case */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgAlignersBefore}
                afterImg={imgAlignersAfter}
                beforeLabel="Crooked Alignment (Before)"
                afterLabel="Perfect Straight Teeth (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Kinjal Aligner Case
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Orthodontic Crowding Resolved
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Resolving overlapping teeth and structural narrow arch crowding using custom series of 3D clear aligners.
                </p>
              </div>
            </div>

            {/* Case 2: Before & After Orthodontic Case */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCase1Before}
                afterImg={imgCase1After}
                beforeLabel="Structural Gaps (Before)"
                afterLabel="Closed Alignment (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Orthodontic Case
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Teeth Spacing & Gaps Closed
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Closing wide gaps between the front chewing teeth safely in 8 months without braces.
                </p>
              </div>
            </div>

            {/* Case 3: Smile Transformation */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCrownsBefore}
                afterImg={imgCrownsAfter}
                beforeLabel="Uneven Coordinates (Before)"
                afterLabel="Symmetrical Coordinate (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Esthetic Transformation
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Deep Bite & Overjet Alignment
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Re-aligning deep bites and severe teeth protrusion to restore a natural profile with optimal chewing forces.
                </p>
              </div>
            </div>

            {/* Case 4: Aesthetic Restorations */}
            <div className="bg-[#FAFAFC] p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgAlignersBefore}
                afterImg={imgAlignersAfter}
                beforeLabel="Narrow Smile Arch (Before)"
                afterLabel="Broad Symmetrical Smile (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Smile Transformation
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Aesthetic Smile Expansion
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Expanding the visible buccal corridors of the smile to produce a wider, more radiant smile appearance.
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
              Watch our educational clinical treatment and case videos explaining how 3D clear aligners work.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-md max-w-3xl mx-auto">
            <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
              {activeVideos['aligner-proc-vid'] ? (
                <iframe
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  src="https://www.youtube.com/embed/2okui6RFf_k?autoplay=1&rel=0"
                  title="Invisible Aligners Treatment Explanation"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              ) : (
                <button
                  onClick={() => setActiveVideos(prev => ({ ...prev, 'aligner-proc-vid': true }))}
                  className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                  aria-label="Play Aligner Procedure Video"
                >
                  <img
                    src="https://img.youtube.com/vi/2okui6RFf_k/hqdefault.jpg"
                    alt="Invisible Aligners Treatment Explanation"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300 pointer-events-none" />
                  <div className="absolute z-20 flex items-center justify-center w-16 h-16 rounded-full bg-white/95 text-[#0D9488] shadow-md group-hover:scale-110 group-hover:bg-[#0D9488] group-hover:text-white transition-all duration-300 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 translate-x-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Cost of Invisible Aligners - Premium CTA Banner */}
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
                Cost of Invisible Aligners
              </h2>
              <p className="text-slate-350 text-xs sm:text-sm leading-relaxed">
                Enjoy world-class, premium transparent digital aligners custom designed in-house at a fraction of standard international pricing. Save up to 50% with our competitive packages, transparent billing, and interest-free installment options.
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
                href="https://wa.me/919510397046?text=Hi%20Patel%20Dental%20Hospital,%20I'm%20interested%20in%20learning%20more%20about%20the%20Cost%20of%20Invisible%20Aligners."
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
                Our Digital Orthodontics Center
              </h2>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                Led by expert orthodontists and supported by Patel Dental Hospital's state-of-the-art dental imaging technology, our modern center utilizes high-end intraoral scanners and advanced modeling software to craft highly accurate alignment sets.
              </p>
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">100% In-house Digital Intraoral 3D Scanning Suite</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Personalized Aligner Set Planning & Laser Calibration</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">FDA-Approved Safe Medical Biopolymers Only</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-50 bg-slate-100">
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

      {/* SECTION 9: Patient Review Testimonial with Photo */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Patient Reviews</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Patient Testimonials
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Listen to the real aligner experience and view photos shared by our happy smile design patients.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
            {/* Left Column: Aligner Specialist Dr. Kinjal Patel & Happy Patient Photo */}
            <div className="lg:col-span-5 bg-white p-4 rounded-3xl border border-slate-100 shadow-md">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] relative bg-slate-50 shadow-inner">
                <img
                  src={drKinjalPortrait}
                  alt="Dr. Kinjal Patel Clear Aligner Treatment"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#081C3A]/95 p-3 rounded-xl text-white">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-[#0D9488] font-black">DR. KINJAL PATEL</p>
                  <p className="text-[10px] text-gray-300 font-sans font-medium mt-0.5">SMILE DESIGN & ALIGNERS SPECIALIST</p>
                </div>
              </div>
            </div>

            {/* Right Column: Video & Written Testimonial */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 font-sans text-xs sm:text-sm italic leading-relaxed">
                  "I was highly conscious of my crowded teeth, but I didn't want to wear metal braces at my job. Dr. Kinjal Patel designed a set of completely clear aligners for me. I wore them easily every day, and within 10 months my smile became perfectly straight! Highly recommended."
                </p>
                <div>
                  <h4 className="font-display font-extrabold text-xs text-[#081C3A]">Kinjal Aligner Patient</h4>
                  <p className="text-[10px] text-slate-400 font-mono">Smile Design Case Study</p>
                </div>
              </div>

              {/* Patient Testimonial video */}
              <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-md">
                <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
                  {activeVideos['patient-aligner-review-vid'] ? (
                    <iframe
                      className="w-full h-full border-0 absolute inset-0 z-10"
                      src="https://www.youtube.com/embed/cyai6CjMD0s?autoplay=1&rel=0"
                      title="Clear Aligner Patient Review"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  ) : (
                    <button
                      onClick={() => setActiveVideos(prev => ({ ...prev, 'patient-aligner-review-vid': true }))}
                      className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                      aria-label="Play Written Aligner Review Video"
                    >
                      <img
                        src="https://img.youtube.com/vi/cyai6CjMD0s/hqdefault.jpg"
                        alt="Clear Aligner Testimonial Review"
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
              Find professional answers to common questions about our Invisible Aligners.
            </p>
          </div>

          <div className="space-y-3">
            {alignerFaqs.map((faq) => {
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

      {/* SECTION 11: Follow Us (Social Media Links) */}
      <section className="py-12 md:py-16 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-1.5">
            <span className="text-[10px] text-[#0D9488] font-black uppercase tracking-widest block">Stay Connected</span>
            <h2 className="font-display font-extrabold text-xl text-[#081C3A]">Follow Us</h2>
            <p className="text-gray-400 font-sans text-xs max-w-md mx-auto">
              Follow Patel Dental Hospital on your favorite social channels for live cases, patient moments, and dental hygiene tips.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3.5 max-w-xl mx-auto">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-3 rounded-xl bg-white border border-slate-150 text-slate-700 text-xs font-black shadow-3xs transition-all duration-300 hover:text-white ${social.color} cursor-pointer`}
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: Hospital Information Panel */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-150">
            <span className="h-2 w-2 rounded-full bg-[#0D9488] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-slate-600 uppercase font-bold">Patel Dental Hospital</span>
          </div>
          
          <h2 className="font-display font-[900] text-xl sm:text-2xl text-[#081C3A] tracking-tight leading-tight max-w-xl mx-auto">
            India's Leading Highly Commended Dental Hospital
          </h2>

          <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Patel Dental Hospital is one of the top dental hospitals in India, awarded by FAMDENT as the Best Highly Commended Dental Hospital in India. We offer flexible timings, individualized attention, affordability, accurate explanations of treatments, excellent patient care, a world-class experience, and strict hygiene control.
          </p>

          <div className="h-[1px] w-12 bg-slate-200 mx-auto" />
        </div>
      </section>

      {/* SECTION 13: Related Services Section */}
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
                      <h3 className="font-display font-black text-slate-800 text-sm leading-tight line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 font-sans text-xs leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => handleNavigateToService(item.slug)}
                      className="w-full py-2.5 bg-slate-50 hover:bg-[#0D9488] hover:text-white border border-slate-150 text-slate-700 text-[10.5px] font-black rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1"
                    >
                      View Details
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 14: BOTTOM FIX CTA BAR (Always floating or elegantly presented at end) */}
      <section className="bg-[#081C3A] text-white py-12 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-2">
            <h3 className="font-display font-[900] text-xl sm:text-2xl tracking-tight text-white">
              Ready to Design Your Dream Smile?
            </h3>
            <p className="text-slate-400 font-sans text-xs sm:text-sm max-w-md mx-auto">
              Book a digital dental scanning session with Dr. Kinjal Patel today and see your 3D transformation instantly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleBookClick}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
            </button>
            <a
              href="tel:+919510397046"
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-100 text-[#081C3A] text-xs font-black rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4 text-[#0D9488]" />
              Call Now: +91 9510397046
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
