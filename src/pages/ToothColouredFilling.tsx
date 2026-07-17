/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Calendar, Shield, Sparkles, HeartHandshake, CheckCircle2, 
  Phone, MessageSquare, Star, ArrowRight, ChevronDown, ChevronUp,
  MapPin, Clock, Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

// Images
import imgCosmetic from '../assets/images/cosmetic_dentistry_1780610862769.png';
import imgCase1Before from '../assets/images/gallery_case1_before_1780611450331.png';
import imgCase1After from '../assets/images/gallery_case1_after_1780611466649.png';
import imgCase2Before from '../assets/images/gallery_case2_before_1780611481933.png';
import imgCase2After from '../assets/images/gallery_case2_after_1780611494535.png';
import patelDentalDoctors from '../assets/images/patel_doctors_hero_1781166043226.png';

interface ToothColouredFillingProps {
  setCurrentPage: (page: PageId) => void;
  openAppointmentModal: (preselectedTreatment?: string) => void;
}

export default function ToothColouredFilling({ setCurrentPage, openAppointmentModal }: ToothColouredFillingProps) {
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(0);
  const [activeMapBranch, setActiveMapBranch] = useState<'gayatrinagar' | 'mavdi'>('gayatrinagar');

  const phoneRaw = "+919510397046";
  const displayPhone = "+91 95103 97046";
  const whatsappRaw = "919510397046";

  const handleBookClick = () => {
    openAppointmentModal('Tooth Coloured Filling');
  };

  const getWhatsAppUrl = (messageText?: string) => {
    const text = messageText || `Hi Patel Dental Hospital, I'm interested in booking a consultation for Tooth Coloured Filling (Composite Filling). Please let me know the next available slot!`;
    return `https://wa.me/919510397046?text=${encodeURIComponent(text)}`;
  };

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', color: 'hover:bg-blue-600' },
    { name: 'Instagram', url: 'https://instagram.com', color: 'hover:bg-pink-600' },
    { name: 'Twitter', url: 'https://twitter.com', color: 'hover:bg-sky-500' },
    { name: 'YouTube', url: 'https://youtube.com', color: 'hover:bg-red-600' },
    { name: 'WhatsApp', url: getWhatsAppUrl(), color: 'hover:bg-green-500' },
    { name: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:bg-blue-700' }
  ];

  // Professional FAQs generated based ONLY on Tooth Coloured Filling
  const fillingFaqs = [
    {
      id: 1,
      question: "What is a composite (tooth-coloured) filling?",
      answer: "A composite filling is a highly durable, aesthetic mixture of tooth-coloured plastic resin and silica/ceramic fillers. It is used to restore teeth damaged by decay, fractures, or chips, blending seamlessly with your natural tooth color to look entirely natural."
    },
    {
      id: 2,
      question: "How long do tooth-coloured fillings last?",
      answer: "On average, high-quality composite fillings last between 7 to 10 years, or even longer with excellent oral hygiene, regular dental checkups, and by avoiding biting down on extremely hard objects."
    },
    {
      id: 3,
      question: "Are composite fillings better than silver amalgam fillings?",
      answer: "Yes, composite fillings are superior because they are mercury-free, chemically bond directly to the tooth structure (which strengthens the tooth), require less removal of healthy tooth structure, and match the exact natural color of your teeth."
    },
    {
      id: 4,
      question: "Is the composite filling procedure painful?",
      answer: "Not at all. The tooth is completely numbed with local anesthesia before removing any decay. Once numbed, you will feel absolutely no pain or discomfort. The resin is then carefully placed, cured with a specialized light, and polished to perfection."
    },
    {
      id: 5,
      question: "How should I care for my tooth-coloured fillings?",
      answer: "You should maintain optimal oral hygiene by brushing twice daily, flossing regularly, and visiting Patel Dental Hospital for routine cleanings. Avoid biting on hard ice, candy, or using your teeth as tools to prevent chipping the resin."
    }
  ];

  // Exact treatment list provided by the doctor
  const doctorServicesList = [
    {
      title: "Tooth Coloured Filling",
      shortDesc: "Natural-looking composite restoration and cavity filling.",
      img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Laser Treatment for Bleeding Gums",
      shortDesc: "Advanced painless laser treatment to heal and strengthen gums.",
      img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Teeth Cleaning",
      shortDesc: "Thorough plaque, tartar removal, and professional scaling.",
      img: "https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Pit and Fissure Sealant",
      shortDesc: "Protective clinical coatings to prevent childhood cavities.",
      img: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "High Quality & Premium Denture",
      shortDesc: "Comfortable and durable dentures to fully restore your smile.",
      img: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "TMJ Disorder Treatment",
      shortDesc: "Specialist jaw joint, clicking, and facial pain therapy.",
      img: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Dental Jewelry",
      shortDesc: "Add a sparkling, safe crystal to your smile.",
      img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Gums Depigmentation",
      shortDesc: "Cosmetic laser correction of dark gums to natural pink.",
      img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "PRP Treatment for Hair Fall",
      shortDesc: "Advanced Platelet-Rich Plasma cellular hair restoration.",
      img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Laser Removal of Mole / Tissue Tag / Warts",
      shortDesc: "Quick, painless, scar-free carbon dioxide laser removal.",
      img: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Lip Filler",
      shortDesc: "Hyaluronic acid fillers for plump, symmetric, and natural lips.",
      img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Botox for Wrinkle",
      shortDesc: "Smooth out fine lines, forehead wrinkles, and crow's feet.",
      img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div id="tooth-coloured-filling-page" className="relative pt-[72px] bg-[#FAFAFC]">
      
      {/* SECTION 1: Hero Section */}
      <section className="py-16 sm:py-24 bg-white relative z-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              PREMIUM CARE TREATMENT
            </span>
            <h1 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-3">
              Tooth Coloured Filling (Composite Filling)
            </h1>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            
            {/* Left Side: Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2.5">
                <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-wider uppercase block">
                  PATEL DENTAL HOSPITAL – COSMETIC RESTORATIVE CARE
                </span>
                <h2 className="font-display font-[900] text-[#081C3A] text-[24px] sm:text-[30px] md:text-[34px] leading-tight tracking-tight">
                  Tooth Coloured Filling (Composite Filling)
                </h2>
              </div>

              <div className="text-slate-600 text-[14.5px] sm:text-[15.5px] font-medium leading-relaxed space-y-4">
                <p>
                  Composite Filling, also known as Tooth Coloured Filling, is a long-lasting and natural-looking restoration used to repair decayed, chipped or broken teeth.
                </p>
                <p>
                  Composite fillings are made from advanced ceramic and resin materials that chemically bond to the natural tooth, restoring both function and aesthetics.
                </p>
                <p>
                  Broken teeth, stained teeth, black gums, unwanted gaps or crooked teeth can all be improved with modern cosmetic dentistry at Patel Dental Hospital.
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
                  src={imgCosmetic}
                  alt="Tooth Coloured Filling"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-center text-slate-500 text-xs sm:text-sm font-semibold font-sans leading-relaxed italic bg-teal-50/40 py-2.5 px-4 rounded-xl border border-teal-500/10">
                Natural Looking Tooth Coloured Fillings for a Healthy & Beautiful Smile.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* SECTION 2: What is Tooth Coloured Filling? (Premium Introduction) */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center px-3 py-1 bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-xs font-bold uppercase tracking-widest rounded-full">
                Premium Introduction
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
                What is Tooth Coloured Filling?
              </h2>
              <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed">
                A tooth-coloured composite filling is an advanced dental restoration technique that replaces decayed, eroded, or structurally damaged tooth layers with medical-grade resin composite. This composite material mimics the exact light refraction, texture, and structural elasticity of your original tooth enamel.
              </p>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                Unlike outdated dark metal or silver amalgam fillings, modern composite resins do not expand or contract with temperature variations, effectively preventing micro-fractures in your teeth. This treatment is highly conservative, allowing Dr. Vipul Patel to preserve maximum healthy natural enamel while establishing a strong, durable, chemical-level bond to support the tooth's chewing forces.
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
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Natural-Looking Composite Restoration</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Matches the precise tooth shade, translucent gloss, and shape of adjacent teeth.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Long-Lasting Cavity Filling</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Blocks bacterial entry to prevent dental nerve decay and structural damage.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Repair of Chipped & Broken Teeth</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Rebuilds broken dental layers seamlessly to restore ideal chewing function.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Cosmetic Improvement of the Smile</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Closes unwanted gaps and hides dark stains to give a confident, bright smile.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Composite Filling Treatment Planning (Process Cards) */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Scientific Workflow</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Composite Filling Treatment Planning
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            
            {/* Card 1 */}
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
                  Clinical Care Environment
                </h3>
                <ul className="space-y-2 text-slate-600 text-[13px] sm:text-[14px] font-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Comfortable and friendly environment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Suitable for both adults and children</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Treatment options for anxious patients</span>
                  </li>
                </ul>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-200/50">
                PATEL COMFORT STANDARDS
              </div>
            </motion.div>

            {/* Card 2 */}
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
                  Advanced Technology
                </h3>
                <ul className="space-y-2 text-slate-600 text-[13px] sm:text-[14px] font-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>State-of-the-art dental equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Advanced USA-made composite materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Multi-shade blending kits</span>
                  </li>
                </ul>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-200/50">
                FDA-APPROVED MATERIALS
              </div>
            </motion.div>

            {/* Card 3 */}
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
                  Chemical Bio-Bonding
                </h3>
                <ul className="space-y-2 text-slate-600 text-[13px] sm:text-[14px] font-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Strong chemical bonding to teeth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Conserves healthy enamel layer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Secures tooth structural integrity</span>
                  </li>
                </ul>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-200/50">
                RESTORES NATURAL STRENGTH
              </div>
            </motion.div>

            {/* Card 4 */}
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
                  Aesthetic Excellence
                </h3>
                <ul className="space-y-2 text-slate-600 text-[13px] sm:text-[14px] font-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>High-quality aesthetic results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Long-lasting polished restoration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>Completely invisible composite edges</span>
                  </li>
                </ul>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-200/50">
                FLAWLESS SMILE DESIGN
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 4: Clinical Gallery Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#0EA5C6]/5 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Cosmetic Gallery</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Clinical Gallery
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Drag each slider left or right to inspect the flawless results of our composite tooth restorations.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case 1: Composite Filling Cases */}
            <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCase2Before}
                afterImg={imgCase2After}
                beforeLabel="Decayed Cavity (Before)"
                afterLabel="Composite Filling (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Composite Filling Cases
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Posterior Cavity Restoration
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Complete elimination of dental decay followed by structural reconstruction using durable multi-layered composite resin.
                </p>
              </div>
            </div>

            {/* Case 2: Before & After Cases */}
            <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCase1Before}
                afterImg={imgCase1After}
                beforeLabel="Damaged Tooth Layers (Before)"
                afterLabel="Aesthetic Restoration (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Before & After Cases
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Pre-molar Layer Rebuilding
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Restoring broken structural enamel margins beautifully to support natural occlusion forces and chewing comfort.
                </p>
              </div>
            </div>

            {/* Case 3: Chipped Tooth Repair */}
            <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCase2Before}
                afterImg={imgCase2After}
                beforeLabel="Chipped Front Margin (Before)"
                afterLabel="Seamless Resin Bonded (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Chipped Tooth Repair
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Anterior Chipped Tooth Repair
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Re-sculpting chipped tooth corners invisibly with high-aesthetic dental resins matching natural shade gradients.
                </p>
              </div>
            </div>

            {/* Case 4: Cosmetic Filling Cases */}
            <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <BeforeAfterSlider
                beforeImg={imgCase1Before}
                afterImg={imgCase1After}
                beforeLabel="Black Cavity Line (Before)"
                afterLabel="Invisible Cosmetic Filled (After)"
                aspectRatioClassName="aspect-[4/3]"
              />
              <div className="mt-5 space-y-2">
                <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                  Cosmetic Filling Cases
                </span>
                <h3 className="font-display font-extrabold text-[#081C3A] text-base">
                  Cosmetic Enamel Realignment
                </h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">
                  Restoring black cavity spots on highly visible smiles safely using high-gloss composite materials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Procedure Video Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Procedure Video</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Procedure Video
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Watch this educational guide video to see how composite fillings chemically bond to the natural tooth structure.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-6 shadow-xl max-w-3xl mx-auto">
            <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
              {activeVideos['composite-proc-vid'] ? (
                <iframe
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  src="https://www.youtube.com/embed/cbVcmy53KBs?autoplay=1&rel=0"
                  title="Tooth Coloured Filling Procedure Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              ) : (
                <button
                  onClick={() => setActiveVideos(prev => ({ ...prev, 'composite-proc-vid': true }))}
                  className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                  aria-label="Play Tooth Coloured Filling Procedure Video"
                >
                  <img
                    src="https://img.youtube.com/vi/cbVcmy53KBs/hqdefault.jpg"
                    alt="Tooth Coloured Filling"
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

      {/* SECTION 6: Hospital / Team Photograph Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0EA5C6]/5 to-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center px-3 py-1 bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-xs font-bold uppercase tracking-widest rounded-full">
                Hospital / Team
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
                Our Specialist Restorative Panel
              </h2>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                Led by chief dentist Dr. Vipul Patel and supported by our highly experienced team, we utilize state-of-the-art curing lights, professional isolation dams, and US-imported composite resin materials to deliver perfect, long-lasting, invisible dental restorations.
              </p>
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Full In-house Digital Tooth shade analysis</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Ultra-Sterile Modern Treatment Rooms</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">USA FDA-Approved High-Strength Bio-Composite Materials Only</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-50">
                <img
                  src={patelDentalDoctors}
                  alt="Patel Dental Hospital Restorative Team"
                  className="w-full aspect-[4/3] object-cover hover:scale-101 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#081C3A]/90 backdrop-blur-xs p-4 rounded-xl text-white text-center">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#0D9488]">DR. VIPUL PATEL & RESTORATIVE FACULTY</p>
                  <p className="text-xs font-sans text-gray-300 mt-1">Providing state-of-the-art dental care since generations</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: Patient Reviews */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">Patient Reviews</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Patient Reviews
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Listen to the actual clinical satisfaction shared directly by our happy composite filling patients.
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
                  "I had two heavily decayed teeth filled with tooth-coloured composite resins at Patel Dental Hospital. Dr. Vipul Patel did an outstanding job! The color matches my other teeth perfectly, and I can chew completely normally. Zero pain during the whole procedure!"
                </p>
                <div className="border-t border-slate-50 pt-3">
                  <span className="block text-xs font-bold text-[#081C3A]">Aarav Mehta</span>
                  <span className="text-[10px] text-slate-400">Patient (Tooth Coloured Filling)</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs">
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed italic mb-4">
                  "I chipped my front tooth in an accident, but they restored it so beautifully that even I cannot tell where the filling begins! Truly modern, high-quality cosmetic care."
                </p>
                <div className="border-t border-slate-50 pt-3">
                  <span className="block text-xs font-bold text-[#081C3A]">Kirti Sharma</span>
                  <span className="text-[10px] text-slate-400">Patient (Chipped Tooth Repair)</span>
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
                    title="Tooth Coloured Filling Patient Testimonial"
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

      {/* SECTION 8: Follow Us */}
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

      {/* SECTION 9: Hospital Information (Logo and stats) */}
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
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Years Experience</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-black text-[#081C3A]">50k+</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Happy Patients</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-black text-[#081C3A]">15+</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Clinical Faculty</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-black text-[#081C3A]">2</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Modern Branches</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: Our Services (Dynamic but static mapping of doctor's specified treatment list) */}
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
              Learn about our complete medical-grade cosmetic, aesthetic, and general skin/hair treatments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {doctorServicesList.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-3xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                    <img 
                      src={item.img} 
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
                      {item.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={handleBookClick}
                    className="w-full py-2 bg-slate-50 hover:bg-[#0D9488]/5 border border-slate-150 text-[#081C3A] hover:text-[#0D9488] text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Inquire Details
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: Location & Contact */}
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
                  href={`https://wa.me/${whatsappRaw}`}
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
                      title="Patel Dental Hospital Gayatrinagar HQ Location Map"
                    ></iframe>
                  ) : (
                    <iframe
                      id="google-map-iframe-mavdi"
                      className="w-full h-full border-0 absolute inset-0 z-10 animate-fade-in"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.115865485499!2d70.7749035!3d22.2735999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959caa1fa4d03df%3A0x8929e7c4fdfbe831!2sPatel%20Dental%20Hospital%20-%20Amin%20Marg%20Branch!5e0!3m2!1sen!2sin!4v1718060100000!5m2!1sen!2sin"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Patel Dental Hospital Amin Marg Location Map"
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: FAQs Accordion */}
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
              Find professional answers to common questions about our aesthetic Tooth Coloured Filling treatments.
            </p>
          </div>

          <div className="space-y-3">
            {fillingFaqs.map((faq) => {
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
            Experience premium aesthetic tooth-coloured composite fillings customized beautifully to restore your confident smile. Reach out via phone or WhatsApp.
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
        </div>
      </section>

    </div>
  );
}
