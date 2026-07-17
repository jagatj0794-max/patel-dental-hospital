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
import { serviceService } from '../utils/serviceData';

// Images
import kidsDentistryImg from '../assets/images/kids_dentistry_1780610850929.png';
import kidsDentistryAltImg from '../assets/images/kids_dentistry_1780659150873.png';
import clinicInterior from '../assets/images/patel_clinic_interior_1781166076431.png';
import patelDentalDoctors from '../assets/images/patel_doctors_hero_1781166043226.png';

interface PediatricDentistryProps {
  setCurrentPage: (page: PageId) => void;
  openAppointmentModal: (preselectedTreatment?: string) => void;
}

export default function PediatricDentistry({ setCurrentPage, openAppointmentModal }: PediatricDentistryProps) {
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
            .filter(item => item.slug !== 'pediatric-dentistry' && item.slug !== 'kids-dentistry' && item.is_active)
            .slice(0, 3);
          setRelatedServices(filtered);
        }
      } catch (err) {
        console.error('Failed to load related services in Pediatric Dentistry page:', err);
      }
    };
    fetchRelated();
    return () => {
      active = false;
    };
  }, []);

  const handleBookClick = () => {
    openAppointmentModal('Pediatric Dentistry');
  };

  const getWhatsAppUrl = (messageText?: string) => {
    const text = messageText || `Hi Patel Dental Hospital, I'm interested in booking a consultation for Pediatric Dentistry. Please let me know the next available slot!`;
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

  const faqData = [
    {
      id: 1,
      question: "At what age should my child first visit a pediatric dentist?",
      answer: "The American Academy of Pediatric Dentistry recommends scheduling your child's first dental visit by their first birthday or within six months after their first baby tooth erupts. Early visits help children become familiar with the dental environment and allow our pediatric specialists to monitor early development."
    },
    {
      id: 2,
      question: "Why are primary (milk) teeth so important if they eventually fall out?",
      answer: "Primary teeth play a vital role in your child's development. They allow for proper chewing and nutrition, assist in correct speech development, and maintain essential space in the jawbone to guide permanent adult teeth into their correct positions. Untreated decay in primary teeth can lead to painful infections and damage developing adult teeth underneath."
    },
    {
      id: 3,
      question: "What is a pulpectomy and when is it necessary?",
      answer: "A pulpectomy is essentially a root canal treatment specifically designed for children's primary teeth. It becomes necessary when deep decay or dental trauma infects the inner nerve (pulp) of the tooth. By removing the infected pulp, sanitizing the canal, and placing a resorbable therapeutic filling, we can successfully save the tooth from extraction and avoid space loss."
    },
    {
      id: 4,
      question: "Are dental x-rays safe for children?",
      answer: "Absolutely. At Patel Dental Hospital, we utilize modern digital radiography which emits extremely low levels of radiation. We also apply specialized protective lead aprons and thyroid shields. Dental x-rays are essential diagnostic tools that allow our specialists to find hidden decay between teeth and assess permanent tooth development below the gums."
    },
    {
      id: 5,
      question: "Can children receive treatment under general anesthesia?",
      answer: "Yes. For selected children with extreme dental anxiety, extensive treatment needs, or special healthcare needs, Dr. Vipul Patel may recommend performing treatment under general anesthesia. This safe, fully monitored medical protocol ensures your child receives comprehensive, high-quality restorative care in a completely anxiety-free, comfortable, and controlled hospital environment."
    }
  ];

  return (
    <div id="pediatric-dentistry-page-view" className="relative pt-[72px] bg-[#FAFAFC]">
      
      {/* SECTION 1: Hero Section */}
      <section className="py-16 sm:py-24 bg-white relative z-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              PREMIUM CARE PEDIATRIC TREATMENT
            </span>
            <h1 className="font-display font-[900] text-[#081C3A] text-[26px] sm:text-[32px] md:text-[36px] tracking-tight leading-tight mb-3">
              Pediatric Dentistry
            </h1>
            <div className="h-[3px] w-14 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto mb-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            
            {/* Left Side: Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2.5">
                <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-wider uppercase block">
                  PATEL DENTAL HOSPITAL – SPECIALIZED CHILDREN'S DENTAL CARE
                </span>
                <h2 className="font-display font-[900] text-[#081C3A] text-[24px] sm:text-[30px] md:text-[34px] leading-tight tracking-tight">
                  Pediatric Dentistry
                </h2>
              </div>

              <div className="text-slate-600 text-[14.5px] sm:text-[15.5px] font-medium leading-relaxed space-y-4">
                <p>
                  Pediatric Dentistry is dedicated to maintaining children's oral health from infancy through adolescence.
                </p>
                <p>
                  At Patel Dental Hospital, we provide a comfortable, friendly and child-friendly environment where every child receives gentle, safe and anxiety-free dental care from experienced pediatric dental specialists.
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
                  src={kidsDentistryImg}
                  alt="Pediatric Dentistry Hero"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-center text-slate-500 text-xs sm:text-sm font-semibold font-sans leading-relaxed italic bg-teal-50/40 py-2.5 px-4 rounded-xl border border-teal-500/10">
                Gentle & Child-Friendly Dental Care for Healthy Growing Smiles.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* SECTION 2: What is Pediatric Dentistry? (Premium Introduction) */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center px-3 py-1 bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-xs font-bold uppercase tracking-widest rounded-full">
                Premium Introduction
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
                What is Pediatric Dentistry?
              </h2>
              <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed">
                Children's mouths grow and change very rapidly. Pediatric dentistry is a specialized branch of dental healthcare designed specifically to safeguard the unique development of milk teeth and adult teeth from infancy all the way through adolescence.
              </p>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                At Patel Dental Hospital, our approach focuses on setting positive, anxiety-free psychological foundations early on. We deliver specialized diagnostic and preventive treatments in a comforting, playful atmosphere so children enjoy visiting the dentist and establish healthy, lifelong oral hygiene habits.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_15px_40px_rgba(8,28,58,0.03)] space-y-4">
                <h3 className="font-display font-black text-slate-800 text-lg border-b border-slate-100 pb-3">
                  Comprehensive Care Pillars
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Children's Oral Healthcare</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Advanced preventative tracking of dental arch development</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Infant to Adolescent Care</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Tailored restorative solutions for every stage of development</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Child-Friendly Environment</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">A warm space with toys to make dental visits highly enjoyable</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Experienced Pediatric Team</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Nurturing specialist dentists trained to guide growing smiles</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Anxiety-Free Treatments</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Gentle touch with complete sedation or sleep protocols</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Painless Dental Tech</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs">Modern pain-free delivery of pediatric treatment</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Why Choose Patel Dental Hospital for Children? */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">ADVANCED ADVANTAGES</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Why Choose Patel Dental Hospital for Children?
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {[
              {
                num: '01',
                title: 'Friendly Pediatric Dental Team',
                body: 'Experienced, caring dentists trained specifically to understand children\'s psychology and handle their needs with patience.'
              },
              {
                num: '02',
                title: 'Comfortable Atmosphere',
                body: 'A bright, welcoming clinical layout with warm aesthetics designed to minimize standard medical anxieties instantly.'
              },
              {
                num: '03',
                title: 'Special Children\'s Dental Chair',
                body: 'Custom-designed, child-friendly operatory chairs providing maximum physical comfort and a playful, unintimidating setup.'
              },
              {
                num: '04',
                title: 'Playful Environment',
                body: 'Fun wall graphics and visual designs that keep young minds fully engaged, relaxed, and happy throughout their visit.'
              },
              {
                num: '05',
                title: 'Dental Toys for Children',
                body: 'Special reward gifts and interactive dental toys given after appointments to foster positive, pleasant associations with dental health.'
              },
              {
                num: '06',
                title: 'Hygiene Awareness Activities',
                body: 'Fun, active teeth-brushing demonstrations and interactive games that build strong clinical hygiene awareness.'
              },
              {
                num: '07',
                title: 'Selected General Anesthesia Care',
                body: 'Complete therapeutic treatment performed safely under general anesthesia for highly anxious, sensitive, or complex pediatric cases.'
              }
            ].map((pt, idx) => (
              <motion.div
                key={pt.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.05 }}
                className="bg-[#FAFAFC] p-6 sm:p-8 rounded-3xl border border-gray-150 shadow-3xs hover:shadow-lg transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4.5">
                    <span className="text-2xl font-black text-[#0D9488]/30 font-mono">
                      {pt.num}
                    </span>
                    <span className="text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-2.5 py-1 rounded-md">
                      PEDIATRIC EDGE
                    </span>
                  </div>
                  
                  <h3 className="font-display font-extrabold text-[#081C3A] text-base tracking-tight mb-3">
                    {pt.title}
                  </h3>

                  <p className="text-slate-600 text-[13px] sm:text-[14px] leading-relaxed font-sans font-medium">
                    {pt.body}
                  </p>
                </div>
                
                <div className="text-[9px] font-mono text-gray-400 mt-6 pt-2 border-t border-gray-100 uppercase tracking-widest">
                  Patel Dental Child Code: PD-C0{pt.num}
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* SECTION 4: Pediatric Dentistry Treatment Planning */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">TREATMENT PROTOCOLS</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Pediatric Dentistry Treatment Planning
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Preventative Pediatric Care */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black text-[#0D9488]/30 font-mono">
                    01
                  </span>
                  <span className="text-[10px] uppercase font-black tracking-wider text-[#0D9488] bg-[#0D9488]/5 px-3 py-1.5 rounded-full">
                    Preventative Care
                  </span>
                </div>
                
                <h3 className="font-display font-extrabold text-[#081C3A] text-lg tracking-tight mb-4">
                  Preventative & Diagnostic Solutions
                </h3>
                
                <p className="text-slate-500 text-xs sm:text-sm font-medium font-sans mb-6">
                  Our core clinical objective is to shield your child's developing jaw structure and prevent tooth decay before it ever begins.
                </p>

                <ul className="space-y-3.5">
                  {[
                    'Comprehensive caries assessment for mother and child',
                    'Ultrasonic teeth cleaning and polishing',
                    'Protective clinical fluoride application',
                    'Early childhood preventive appliances',
                    'Advanced early developmental orthodontic evaluation',
                    'Interactive oral hygiene maintenance activities',
                    'Special care dentistry for differently-abled children'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-slate-700">
                      <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold font-sans">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-250/50 uppercase">
                Pediatric Preventative Code: PD-PREV
              </div>
            </motion.div>

            {/* Restorative & Therapeutic */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black text-[#0D9488]/30 font-mono">
                    02
                  </span>
                  <span className="text-[10px] uppercase font-black tracking-wider text-[#11B5D8] bg-[#11B5D8]/5 px-3 py-1.5 rounded-full">
                    Restorative & habit
                  </span>
                </div>
                
                <h3 className="font-display font-extrabold text-[#081C3A] text-lg tracking-tight mb-4">
                  Restorative & Habit Counseling Protocols
                </h3>
                
                <p className="text-slate-500 text-xs sm:text-sm font-medium font-sans mb-6">
                  Advanced aesthetic restoration, trauma management, and pediatric corrective therapy under strict hospital standards.
                </p>

                <ul className="space-y-3.5">
                  {[
                    'Advanced pediatric pulpectomy (nerve treatment)',
                    'Highly durable Stainless Steel (SS) Crown placement',
                    'Comprehensive tooth cavity filling and defect repair',
                    'Emergency dental trauma treatments (accidental falls)',
                    'Specialized lip cyst removal surgery',
                    'Treatment under general anesthesia for selected children',
                    'Habit counseling (Thumb, Lip, Tongue, Nails, Pacifiers)'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-slate-700">
                      <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold font-sans">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mt-8 pt-3 border-t border-gray-250/50 uppercase">
                Pediatric Restorative Code: PD-REST
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 5: Clinical Gallery */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">CLINICAL SPACES</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Clinical Gallery
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Explore our modern child-friendly hospital spaces designed to deliver premium, painless dental experiences.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Pediatric Dental Clinic',
                desc: 'Cheerful, warm clinical operatory layout promoting positive kid behavior.',
                img: kidsDentistryAltImg
              },
              {
                title: 'Child Dental Chair',
                desc: 'Special ergonomic colorful chairs offering comfortable patient positioning.',
                img: kidsDentistryImg
              },
              {
                title: 'Pediatric Treatment Cases',
                desc: 'Precision clinical procedures performed by experienced experts.',
                img: clinicInterior
              },
              {
                title: 'Preventive Dental Care',
                desc: 'Custom medical sealants, fluoride shields, and oral education.',
                img: kidsDentistryAltImg
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-[#FAFAFC] rounded-2xl overflow-hidden border border-slate-150 shadow-3xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                    <img 
                      src={item.img} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
                    <span className="absolute bottom-3 left-3 text-white text-xs font-bold tracking-wide">
                      {item.title}
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="font-display font-bold text-slate-800 text-xs sm:text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <span className="text-[10px] font-mono text-[#0D9488]/70 block font-semibold uppercase">
                    PATEL DENTAL PROTOCOL
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Procedure Video */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0EA5C6]/5 to-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">EDUCATIONAL GUIDE</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
              Pediatric Dentistry Procedure Video
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Watch this gentle clinical video guide explaining our friendly pediatric procedures and preventative child tooth therapy.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-6 shadow-xl max-w-3xl mx-auto">
            <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
              {activeVideos['pediatric-proc-vid'] ? (
                <iframe
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  src="https://www.youtube.com/embed/cbVcmy53KBs?autoplay=1&rel=0"
                  title="Pediatric Dentistry Treatment Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              ) : (
                <button
                  onClick={() => setActiveVideos(prev => ({ ...prev, 'pediatric-proc-vid': true }))}
                  className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                  aria-label="Play Pediatric Dentistry Procedure Video"
                >
                  <img
                    src="https://img.youtube.com/vi/cbVcmy53KBs/hqdefault.jpg"
                    alt="Pediatric Treatment Overview"
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

      {/* SECTION 7: Hospital / Team */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center px-3 py-1 bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-xs font-bold uppercase tracking-widest rounded-full">
                Pediatric Specialists
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#081C3A] tracking-tight">
                Our Pediatric Specialist Team
              </h2>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">
                Led by chief restorative dental surgeon Dr. Vipul Patel, our specialized pediatric wing is backed by top clinical professionals dedicated to children's dentistry. We combine soft-mannered patient communication, modern German clinic design, and international dental protocols to treat your children safely and with the utmost happiness.
              </p>
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Pediatric and Preventative Dental Specialists</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Full Sedation, Sleep Dentistry, and General Anesthesia Rooms</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold font-sans">Highly Strict International Hygienic Autoclave Control</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-50">
                <img
                  src={patelDentalDoctors}
                  alt="Patel Dental Hospital Pediatric Team"
                  className="w-full aspect-[4/3] object-cover hover:scale-101 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#081C3A]/90 backdrop-blur-xs p-4 rounded-xl text-white text-center">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#0D9488]">PATEL DENTAL CLINICAL TEAM</p>
                  <p className="text-xs font-sans text-gray-300 mt-1">Nurturing bright young smiles with generation-spanning clinical trust</p>
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
              What Parents Say About Our Care
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
              Read real patient experiences from mothers and fathers who trusted Dr. Vipul Patel for their children's dental care.
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
                  "Dr. Vipul Patel and his team are absolutely amazing! My 6-year-old daughter was terrified of dental chairs, but the colorful toys, friendly team, and playful environment made her so happy. Her tooth filling was completed with zero pain or anxiety!"
                </p>
                <div className="border-t border-slate-50 pt-3">
                  <span className="block text-xs font-bold text-[#081C3A]">Priya Sharma</span>
                  <span className="text-[10px] text-slate-400">Mother of Aarohi (6 years)</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs">
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed italic mb-4">
                  "Highly recommend Patel Dental Hospital for pediatric pulpectomies. They explain the entire plan with patience, the sterilization standards are impeccable, and the treatment was incredibly fast and safe. Best children's dentist in Rajkot!"
                </p>
                <div className="border-t border-slate-50 pt-3">
                  <span className="block text-xs font-bold text-[#081C3A]">Rajesh Mehta</span>
                  <span className="text-[10px] text-slate-400">Father of Kabir (8 years)</span>
                </div>
              </div>
            </div>

            {/* Testimonial Video */}
            <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-6 shadow-xl max-w-3xl mx-auto mt-8">
              <div className="aspect-video w-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner">
                {activeVideos['patient-review-vid'] ? (
                  <iframe
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    src="https://www.youtube.com/embed/cyai6CjMD0s?autoplay=1&rel=0"
                    title="Pediatric Patient Review Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                ) : (
                  <button
                    onClick={() => setActiveVideos(prev => ({ ...prev, 'patient-review-vid': true }))}
                    className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group focus:outline-none"
                    aria-label="Play Pediatric Patient Review Video"
                  >
                    <img
                      src="https://img.youtube.com/vi/cyai6CjMD0s/hqdefault.jpg"
                      alt="Pediatric Patient Review Video Overview"
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

                    {/* Timings */}
                    <div className="flex items-start gap-3 pt-4 border-t border-slate-100">
                      <Clock className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
                          HOSPITAL TIMINGS
                        </span>
                        <div className="text-slate-600 font-semibold text-[13px] leading-relaxed space-y-1">
                          <p><span className="text-[#081C3A] font-bold">Monday - Saturday:</span> 9:00 AM to 1:00 PM & 4:00 PM to 8:00 PM</p>
                          <p><span className="text-[#0D9488] font-bold">Sunday:</span> Emergency Only</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleBookClick}
                  className="flex-1 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4.5 w-4.5" />
                  Book Instant Visit
                </button>
                <a
                  href={`tel:${phoneRaw}`}
                  className="flex-1 py-4 bg-[#081C3A] hover:bg-[#0E2D58] text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Phone className="h-4.5 w-4.5" />
                  Call Hospital
                </a>
              </div>
            </div>

            {/* Right Side: Responsive Google Maps Embed */}
            <div className="lg:col-span-6 rounded-[24px] overflow-hidden border border-slate-150 min-h-[350px] shadow-sm relative">
              <AnimatePresence mode="wait">
                {activeMapBranch === 'gayatrinagar' ? (
                  <motion.iframe
                    key="gayatrinagar-map"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full border-0"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.834460361001!2d70.80373077604473!3d22.284242643324647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca187ab62867%3A0xc39f88f244192661!2sPatel%20Dental%20Hospital!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></motion.iframe>
                ) : (
                  <motion.iframe
                    key="mavdi-map"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full border-0"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.1158673327663!2d70.78168127604443!3d22.273641043708892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cb9e9f654b9d%3A0x7d6560bcbeee34ef!2sPatel%20Dental%20Hospital%20-%20Mavdi%20Branch!5e0!3m2!1sen!2sin!4v1711200000001!5m2!1sen!2sin"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></motion.iframe>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13: FAQs */}
      <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#0D9488] font-bold text-xs uppercase tracking-widest block mb-2">
              Common Questions
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#081C3A] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2">
              Find immediate, expert clinical answers to the most common queries about pediatric dental treatments.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full mt-4" />
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isExpanded = expandedFaqId === index;
              return (
                <div 
                  key={faq.id} 
                  className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-3xs transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaqId(isExpanded ? null : index)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <span className="font-display font-bold text-slate-800 text-sm sm:text-base pr-4">
                      {faq.question}
                    </span>
                    <span className="shrink-0 p-1 bg-slate-50 text-slate-500 rounded-lg">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-5 text-slate-600 text-xs sm:text-sm font-medium leading-relaxed font-sans border-t border-slate-50 pt-3 bg-slate-50/20">
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

      {/* SECTION 14: Bottom CTA Banner */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#081C3A] text-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl relative overflow-hidden space-y-6 max-w-5xl mx-auto">
            {/* Background glows */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0D9488]/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

            <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10">
              <span className="inline-flex items-center gap-1 bg-[#0D9488] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full leading-none">
                PREMIUM CARE
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Pediatric Dentistry
              </h2>
              <p className="text-slate-350 text-xs sm:text-sm leading-relaxed">
                Nurture your child's confidence with Gujarat's leading gentle, child-friendly pediatric dental center. Secure an appointment today or get in touch for prompt medical advice.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-4">
              <button
                onClick={handleBookClick}
                className="w-full sm:w-auto px-8 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-xl shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <Calendar className="h-4.5 w-4.5" />
                Book Appointment
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <a
                href={`tel:${phoneRaw}`}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-[#081C3A] text-xs font-black rounded-xl shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <Phone className="h-4.5 w-4.5 text-[#0D9488]" />
                Call Now: {displayPhone}
              </a>
              
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black rounded-xl shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4.5 w-4.5" />
                WhatsApp Us
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
