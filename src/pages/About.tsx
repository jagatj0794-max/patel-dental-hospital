/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  History, Award, Star, Heart, CheckCircle2, ShieldCheck, 
  Microscope, Users, HeartHandshake, Sparkles, GraduationCap, Quote, Calendar, ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import patelClinicInterior from '../assets/images/patel_clinic_interior_1781166076431.png';
import patelCbctImaging from '../assets/images/patel_cbct_imaging_1781166123983.png';
import patelReceptionLounge from '../assets/images/patel_reception_lounge_1781166095656.png';
import patelSterilizationZone from '../assets/images/patel_sterilization_zone_1781166142899.png';

interface AboutProps {
  openAppointmentModal: () => void;
}

export default function About({ openAppointmentModal }: AboutProps) {
  // Existing facility features
  const facilityCards = [
    {
      title: 'Modern Infrastructure',
      desc: 'Surgical operatory rooms built with high-efficacy air filters, clinical isolation positive-pressure setups, and orthopedic ergonomic comfort standards.',
      img: patelClinicInterior
    },
    {
      title: 'In-House CBCT Scan',
      desc: 'State-of-the-art 3D Computed Tomography sweep scanner located inside the hospital to instantly map bone density and provide dynamic volumetric views.',
      img: patelCbctImaging
    },
    {
      title: 'Advanced Implant Technology',
      desc: 'Premium computer-guided robotic micromodels and digital customized smile mockups mapping the exact millimeter of restorative accuracy beforehand.',
      img: patelReceptionLounge // Using existing imported asset elegantly
    },
    {
      title: 'USA Standard Sterilization Protocol',
      desc: 'Surgical safety with Grade B vacuum autoclaving, continuous UV-C storage cabinets, and rigorous multi-stage ultrasonic instruments cleansing.',
      img: patelSterilizationZone
    },
  ];

  const stats = [
    { value: '18+', label: 'Years Experience' },
    { value: '20,000+', label: 'Happy Patients' },
    { value: '15,000+', label: 'Same Day Teeth' },
    { value: '7,000+', label: 'Full Mouth Rehab' }
  ];

  // Commitment to Philosophy using existing content
  const philosophyPillars = [
    {
      title: 'Patient First Care',
      desc: 'Recognizing that dental appointments traditionally invite stress, we restructured every segment of our clinical environment to prioritize ultimate client peace, comfort, and zero anxiety.',
      icon: Heart,
      bg: 'bg-rose-50/50',
      text: 'text-rose-600',
      border: 'border-rose-100/50'
    },
    {
      title: 'Modern Technology',
      desc: 'By embedding our core diagnostic technology—including high-precision in-house 3D CBCT scans and OPG scanners—directly inside our facility, we eliminate scanning lab wait times.',
      icon: Microscope,
      bg: 'bg-emerald-50/50',
      text: 'text-emerald-600',
      border: 'border-emerald-100/50'
    },
    {
      title: 'Quality Treatment',
      desc: 'Delivering advanced, painless, and completely reliable dental treatments with meticulous computerized guided templates and digital customized smile mockups mapped to exact millimeter accuracy.',
      icon: Sparkles,
      bg: 'bg-indigo-50/50',
      text: 'text-indigo-600',
      border: 'border-indigo-100/50'
    },
    {
      title: 'Safety & Hygiene',
      desc: 'Uncompromising USA Standard Sterilization Protocol maintained constantly with Grade B vacuum autoclaving, continuous UV-C storage cabinets, and clinical positive-pressure air filtration.',
      icon: ShieldCheck,
      bg: 'bg-[#0D9488]/5',
      text: 'text-[#0D9488]',
      border: 'border-teal-100/50'
    }
  ];

  // Why Patients Trust Patel Dental Hospital features
  const trustFeatures = [
    {
      title: 'Advanced Dental Care',
      desc: 'Pioneering advanced, painless immediate loading implants and complete fixed-teeth replacement treatments under one immaculate roof with over a decade of dedicated clinical excellence.',
      icon: Sparkles
    },
    {
      title: 'Experienced Team',
      desc: 'Led by Dr. Vipul Patel with 18+ years of expertise, alongside highly qualified senior specialist clinicians driving high clinical success, precise restorative guidelines, and elite care.',
      icon: Users
    },
    {
      title: 'Modern Equipment',
      desc: 'Fully loaded with cutting-edge dental tech, featuring high-efficacy positive-pressure operatory air filters, OPG scanners, and state-of-the-art inside-facility CBCT scanners.',
      icon: Microscope
    },
    {
      title: 'Personalized Treatment',
      desc: 'Custom-designed biological restorations, customized titanium templates, and digital smile makeovers structured individually around your unique facial and bone structure.',
      icon: HeartHandshake
    },
    {
      title: 'Strict Sterilization',
      desc: 'Unwavering commitment to patient health through Grade B vacuum sterilization, UV-C preservation cabinets, and a multi-stage ultrasonic instruments sanitizing sequence.',
      icon: ShieldCheck
    }
  ];

  // Doctor Highlight details from doctors.ts
  const drVipul = {
    name: 'Dr. Vipul Patel',
    titles: 'BDS',
    designation: 'Cosmetic/Aesthetic Dentist & Implantologist',
    img: '/dr. patel.png',
    briefIntro: 'Dr. Vipul Patel is a highly experienced Cosmetic/Aesthetic Dentist, Implantologist and Dental Surgeon practicing at Patel Dental Hospital, Rajkot. He has extensive experience in Implant Dentistry, Full Mouth Rehabilitation, Smile Makeovers, Root Canal Treatments and Advanced Restorative Dentistry. His focus is on precision, patient comfort and long-term treatment success.',
    quote: 'Dr. Vipul Patel is committed to delivering advanced dental care with personalized treatment planning and modern technology.',
    bdsYear: '2006',
    bdsInstitution: 'Dental College Graduate',
    experience: '18+ Years Experience',
    expertises: [
      {
        title: 'Advanced Oral Implantology',
        desc: 'Senior-level immediate loading dental implants and complete fixed-teeth replacement surgeries. Guided custom computer templates minimizing surgical trauma.'
      },
      {
        title: 'Full Mouth Rehabilitation',
        desc: 'Multi-disciplinary correction of severely damaged, ground-down, or missing dentition. Restoring ideal masticatory vectors and healthy chewing functionality.'
      },
      {
        title: 'Aesthetic Crowns & Bridges',
        desc: 'Premium zirconia, metal-free CAD/CAM ceramic bridges, and precise crown fittings that withstand deep pressures and mimic adjacent enamel gradients.'
      },
      {
        title: 'Microscopic Endodontics',
        desc: 'Highly structured single-sitting root canal treatments, utilizing high-torque precision rotary equipment and deep sterile sealing protocols.'
      }
    ]
  };

  const teamMembers = [
    {
      name: 'Dr. Vipul Patel',
      designation: 'Cosmetic/Aesthetic Dentist & Implantologist',
      img: '/dr. patel.png'
    },
    {
      name: 'Dr. Kinjal Patel',
      designation: 'Cosmetic/Aesthetic Dentist & Implantologist',
      img: '/Dr kinjal patel 2.png'
    },
    {
      img: '/patel dental hospital doctors.png'
    },
    {
      img: '/patel dental doctors.jpeg'
    },
    {
      img: '/photo_2026-07-13_09-49-40.jpg'
    }
  ];

  return (
    <div id="about-page-view" className="relative pt-[72px] bg-white text-[#081C3A] overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-slate-50/50 via-white to-transparent" id="about-hero">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Professional introduction using ONLY existing content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 bg-teal-50 text-[#0D9488] px-4 py-1.5 rounded-full border border-teal-100/50 font-sans text-xs font-semibold uppercase tracking-wider"
              >
                <History className="h-4 w-4 mr-1 text-[#0D9488]" />
                <span>Established 2012</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-[900] text-[#081C3A] text-[36px] sm:text-[48px] md:text-[56px] tracking-tight leading-none uppercase"
              >
                About Patel <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D9488] to-[#0EA5C6]">
                  Dental Hospital
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-500 font-sans text-base sm:text-lg lg:text-xl font-medium tracking-tight leading-relaxed max-w-2xl"
              >
                Creating Healthy & Confident Smiles with Advanced Dentistry
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-[3px] w-20 bg-gradient-to-r from-[#0D9488] to-[#0EA5C6] rounded-full" 
              />

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="space-y-5 text-gray-600 font-sans text-sm sm:text-base leading-relaxed"
              >
                <p>
                  Patel Dental Hospital has been proudly serving Rajkot, Gujarat and surrounding communities since 2012. Over the last decade, we have remained committed to a single, powerful vision: bringing advanced, painless, and completely reliable dental services under one immaculate roof.
                </p>
                <p>
                  Recognizing that dental appointments traditionally invite stress, we restructured every segment of our clinical environment. By embedding our core diagnostic technology—including OPG scanners and high-precision CBCT sweeps—directly inside our facility, we eliminate external travel and scanning lab wait times completely.
                </p>
                <p>
                  Our operatory units are maintained with clinical positive-pressure air filtration and sanitized constantly with industrial multi-step procedures, delivering a safe medical standard suited for complex oral rehabs.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="pt-6 flex flex-wrap gap-4"
              >
                <button
                  onClick={openAppointmentModal}
                  className="px-8 py-4 bg-[#081C3A] hover:bg-[#0D9488] text-white text-xs font-bold rounded-[16px] shadow-[0_8px_30px_rgba(8,28,58,0.1)] transition-all duration-300 uppercase tracking-wider flex items-center space-x-2 group cursor-pointer"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => { window.location.hash = 'contact'; }}
                  className="px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-[#081C3A] text-xs font-bold rounded-[16px] shadow-sm transition-all duration-300 uppercase tracking-wider cursor-pointer"
                >
                  Contact Us
                </button>
              </motion.div>
            </div>

            {/* Right Side: Dr. Vipul Patel's original professional photograph */}
            <div className="lg:col-span-5 flex justify-center relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative w-full max-w-[420px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(8,28,58,0.08)] border border-slate-100 group bg-slate-50"
              >
                {/* Decorative teal background panel for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <img
                  src={drVipul.img}
                  alt={drVipul.name}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay card info */}
                <div className="absolute bottom-8 left-8 right-8 z-20 text-white text-left">
                  <span className="text-[#0D9488] font-bold text-[10px] tracking-widest uppercase block mb-1">
                    Senior Clinical Director
                  </span>
                  <h3 className="font-display font-black text-2xl tracking-tight leading-none uppercase">
                    {drVipul.name}
                  </h3>
                  <p className="text-white/80 font-sans text-xs mt-1.5">
                    {drVipul.designation} · {drVipul.titles}
                  </p>
                </div>
              </motion.div>

              {/* Decorative background shape */}
              <div className="absolute -top-6 -right-6 h-32 w-32 bg-teal-50 rounded-full blur-2xl -z-10 opacity-70" />
              <div className="absolute -bottom-8 -left-8 h-44 w-44 bg-sky-50 rounded-full blur-3xl -z-10 opacity-50" />
            </div>

          </div>
        </div>
      </section>

      {/* About Hospital Section (Premium Bento Stats Grid & Facility Info) */}
      <section className="py-24 bg-[#FAFAFC] relative border-t border-slate-100" id="about-hospital-highlights">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <span className="text-[#0D9488] font-bold text-xs tracking-widest uppercase block mb-3">
              Hospital Achievements
            </span>
            <h2 className="font-display font-[900] text-[#081C3A] text-[36px] sm:text-[44px] md:text-[52px] tracking-tight leading-none uppercase">
              ABOUT HOSPITAL
            </h2>
            <div className="h-[3px] w-16 bg-gradient-to-r from-[#0D9488] to-[#11B5D8] mx-auto mt-4 rounded-full" />
          </div>

          {/* Premium stats display */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-[24px] p-8 text-center border border-slate-100 shadow-[0_8px_30px_rgba(8,28,58,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <span className="block font-display font-[900] text-[36px] sm:text-[44px] text-[#081C3A] leading-none mb-2">
                  {stat.value}
                </span>
                <span className="block text-xs font-bold text-[#0D9488] uppercase tracking-wider leading-none">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Redesigned reading layout with premium facility cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {facilityCards.map((feat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgba(8,28,58,0.03)] hover:shadow-[0_20px_50px_rgba(8,28,58,0.06)] transition-all duration-350 flex flex-col group"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-50">
                  <img
                    src={feat.img}
                    alt={feat.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-8 flex-grow flex flex-col justify-between text-left">
                  <div className="space-y-3">
                    <h3 className="font-display font-[900] text-[#081C3A] text-[20px] sm:text-[22px] leading-tight group-hover:text-[#0D9488] transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-gray-500 text-sm font-sans leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Our Philosophy Section (Commitment to Excellence) */}
      <section className="py-24 bg-white relative border-t border-slate-100" id="our-philosophy">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <span className="text-[#0D9488] font-bold text-xs tracking-widest uppercase block mb-3">
              Our Core Principles
            </span>
            <h2 className="font-display font-[900] text-[#081C3A] text-[36px] sm:text-[44px] md:text-[52px] tracking-tight leading-none uppercase">
              OUR PHILOSOPHY
            </h2>
            <div className="h-[3px] w-16 bg-gradient-to-r from-[#0D9488] to-[#11B5D8] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {philosophyPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`bg-white rounded-[24px] p-8 border ${pillar.border} shadow-[0_8px_30px_rgba(8,28,58,0.02)] hover:shadow-[0_20px_50px_rgba(8,28,58,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left group`}
                >
                  <div className="space-y-6">
                    <div className={`h-14 w-14 rounded-2xl ${pillar.bg} flex items-center justify-center ${pillar.text} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 stroke-[2]" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-display font-[900] text-[#081C3A] text-[20px] leading-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-sans leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Why Patients Trust Patel Dental Hospital */}
      <section className="py-24 bg-[#FAFAFC] relative border-t border-slate-100" id="why-patients-trust">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <span className="text-[#0D9488] font-bold text-xs tracking-widest uppercase block mb-3">
              Uncompromised Standards
            </span>
            <h2 className="font-display font-[900] text-[#081C3A] text-[36px] sm:text-[44px] md:text-[52px] tracking-tight leading-none uppercase">
              WHY PATIENTS TRUST US
            </h2>
            <div className="h-[3px] w-16 bg-gradient-to-r from-[#0D9488] to-[#11B5D8] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {trustFeatures.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-white rounded-[24px] p-8 sm:p-10 border border-slate-100 shadow-[0_8px_30px_rgba(8,28,58,0.03)] hover:shadow-[0_20px_50px_rgba(8,28,58,0.06)] hover:-translate-y-1.5 transition-all duration-350 flex flex-col justify-between text-left group"
                >
                  <div className="space-y-5">
                    <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] group-hover:bg-[#0D9488] group-hover:text-white transition-all duration-300">
                      <Icon className="h-5.5 w-5.5 stroke-[2.5]" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-display font-[900] text-[#081C3A] text-[18px] sm:text-[20px] leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-sans leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Doctor Highlight Section (Dr. Vipul Patel) */}
      <section className="py-24 bg-white relative border-t border-slate-100" id="doctor-highlight">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <span className="text-[#0D9488] font-bold text-xs tracking-widest uppercase block mb-3">
              Senior Specialist Profile
            </span>
            <h2 className="font-display font-[900] text-[#081C3A] text-[36px] sm:text-[44px] md:text-[52px] tracking-tight leading-none uppercase">
              DOCTOR HIGHLIGHT
            </h2>
            <div className="h-[3px] w-16 bg-gradient-to-r from-[#0D9488] to-[#11B5D8] mx-auto mt-4 rounded-full" />
          </div>

          <div className="max-w-6xl mx-auto bg-slate-50/50 border border-slate-100/80 rounded-[32px] p-8 sm:p-12 lg:p-16 shadow-[0_15px_45px_rgba(8,28,58,0.02)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
              
              {/* Doctor Photo & Basic Metadata */}
              <div className="lg:col-span-5 space-y-6">
                <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden shadow-md border-2 border-white bg-slate-100">
                  <img
                    src={drVipul.img}
                    alt={drVipul.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 bg-[#081C3A]/95 backdrop-blur-md text-white text-[10px] font-bold px-3.5 py-2 rounded-xl flex items-center space-x-1.5 shadow-sm border border-white/10 tracking-wider">
                    <Award className="h-4 w-4 text-[#11B5D8]" />
                    <span>SENIOR SPECIALIST</span>
                  </span>
                  
                  <span className="absolute bottom-4 right-4 bg-[#081C3A]/85 backdrop-blur-md text-[#11B5D8] text-[10.5px] font-bold px-3 py-1.5 rounded-lg border border-teal-500/10">
                    Degree: {drVipul.titles}
                  </span>
                </div>

                <div className="bg-white p-6 rounded-[20px] border border-slate-100 flex items-start space-x-3 shadow-xs">
                  <GraduationCap className="h-5.5 w-5.5 text-[#0D9488] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-display font-black text-sm text-[#081C3A]">Credentials & Education</h5>
                    <p className="text-gray-400 text-[10px] uppercase font-bold leading-relaxed">{drVipul.bdsInstitution} ({drVipul.bdsYear})</p>
                    <p className="text-gray-500 text-xs font-sans mt-1">Official Dental Council practitioner certified in leading advanced surgical protocols.</p>
                  </div>
                </div>
              </div>

              {/* Bio, Experience, & Clinical Focus */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#0D9488] tracking-widest uppercase block leading-none">
                    {drVipul.designation}
                  </span>
                  <h3 className="font-display font-[900] text-[#081C3A] text-[32px] sm:text-[38px] tracking-tight leading-none">
                    {drVipul.name}
                  </h3>
                  <p className="inline-block bg-teal-50 text-[#0D9488] border border-teal-100/50 text-xs font-bold px-3 py-1.5 rounded-lg">
                    {drVipul.experience}
                  </p>
                </div>

                <p className="text-gray-650 font-sans text-sm sm:text-base leading-relaxed">
                  {drVipul.briefIntro}
                </p>

                {/* Quote Block */}
                <div className="bg-teal-50/50 border border-teal-100/50 p-6 rounded-[20px] relative">
                  <Quote className="h-6 w-6 text-[#0D9488] mb-2.5 scale-x-[-1]" />
                  <p className="text-gray-650 font-sans text-xs sm:text-sm leading-relaxed italic font-medium">
                    "{drVipul.quote}"
                  </p>
                </div>

                {/* Specializations & Expertises */}
                <div className="space-y-4">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400">Clinical Focus Areas</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {drVipul.expertises.slice(0, 2).map((exp, idx) => (
                      <div key={idx} className="bg-white p-5 rounded-xl border border-slate-100 flex items-start space-x-3 shadow-2xs">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-display font-bold text-sm text-[#081C3A]">{exp.title}</h5>
                          <p className="text-gray-500 text-xs font-sans mt-1.5 leading-relaxed">{exp.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-24 bg-[#FAFAFC] relative border-t border-slate-100" id="our-team">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <span className="text-[#0D9488] font-bold text-xs tracking-widest uppercase block mb-3">
              Meet Our Dental Professionals & Staff
            </span>
            <h2 className="font-display font-[900] text-[#081C3A] text-[36px] sm:text-[44px] md:text-[52px] tracking-tight leading-none uppercase">
              OUR TEAM
            </h2>
            <div className="h-[3px] w-16 bg-gradient-to-r from-[#0D9488] to-[#11B5D8] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgba(8,28,58,0.03)] hover:shadow-[0_20px_50px_rgba(8,28,58,0.06)] hover:-translate-y-1.5 transition-all duration-350 flex flex-col justify-between group"
              >
                {/* Image Area */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                  <img
                    src={member.img}
                    alt={member.name || 'Patel Dental Hospital Team Member'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Info block (only if name is available) */}
                {member.name ? (
                  <div className="p-6 text-left space-y-2">
                    <span className="text-[10px] font-black text-[#0D9488] tracking-widest uppercase block leading-none">
                      {member.designation}
                    </span>
                    <h3 className="font-display font-[900] text-[#081C3A] text-[18px] sm:text-[20px] leading-tight">
                      {member.name}
                    </h3>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50/50 text-center flex-grow flex items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Clinical Team Photo
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Action buttons at the bottom of the page */}
          <div className="text-center pt-20 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={openAppointmentModal}
              className="w-full sm:w-auto px-8 py-4 bg-[#081C3A] hover:bg-[#0D9488] text-white text-xs font-bold rounded-2xl shadow-lg cursor-pointer transition duration-300 uppercase tracking-widest"
            >
              Book Appointment
            </button>
            <button
              onClick={() => { window.location.hash = 'contact'; }}
              className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-[#081C3A] text-xs font-bold rounded-2xl shadow-sm cursor-pointer transition duration-300 uppercase tracking-widest"
            >
              Contact Us
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
