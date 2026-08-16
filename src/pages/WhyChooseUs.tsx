/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, Award, Cpu, Play, CheckCircle2, UserCheck, ShieldCheck, 
  MessageCircle, HeartHandshake, Sparkles, Star
} from 'lucide-react';
import { useSEO } from '../utils/seo';
import { Doctor, DentalVideo, TechnologyItem } from '../types';
import { DEFAULT_DOCTORS } from '../data/doctors';
import { doctorService } from '../utils/doctorData';
import { technologyService } from '../utils/technologyData';
import { videoService, DEFAULT_VIDEOS } from '../utils/videoData';
import { getWhatsAppUrl } from '../utils/contactData';
import { DoctorBioRenderer } from '../components/DoctorBioRenderer';
import { InstagramEmbed } from '../components/InstagramEmbed';
import { Mp4ReelPlayer } from '../components/Mp4ReelPlayer';

interface WhyChooseUsProps {
  openAppointmentModal: (preselectedTreatment?: string) => void;
  doctorsList?: Doctor[];
  videosList?: DentalVideo[];
}

// Helper function to deduplicate text that may have been concatenated or duplicated
function deduplicateText(text: string): string {
  if (!text) return '';
  const trimmed = text.trim();
  const paragraphs = trimmed.split(/\n+/).map(p => p.trim()).filter(Boolean);
  if (paragraphs.length === 2 && paragraphs[0] === paragraphs[1]) {
    return paragraphs[0];
  }
  const len = trimmed.length;
  if (len % 2 === 0) {
    const half = len / 2;
    const firstHalf = trimmed.substring(0, half).trim();
    const secondHalf = trimmed.substring(half).trim();
    if (firstHalf === secondHalf) {
      return firstHalf;
    }
  }
  return trimmed;
}

export default function WhyChooseUs({ openAppointmentModal, doctorsList = [], videosList = [] }: WhyChooseUsProps) {
  useSEO({
    title: 'Why Choose Us | Patel Dental Hospital Rajkot',
    description: 'Discover why Patel Dental Hospital is the leading dental clinic in Rajkot. Meet our senior specialists Dr. Vipul Patel and Dr. Kinjal Patel, explore our advanced digital dentistry technology, and view real patient testimonial videos.',
    keywords: 'Why Choose Patel Dental Hospital, Best Dentist Rajkot, Dr Vipul Patel Rajkot, Dr Kinjal Patel Rajkot, Digital Dentistry Rajkot, Dental Testimonial Videos'
  });

  // --- State for Doctors ---
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    return doctorsList.length > 0 ? doctorsList : DEFAULT_DOCTORS;
  });

  // --- State for Technology ---
  const [techItems, setTechItems] = useState<TechnologyItem[]>([]);
  const [techLoading, setTechLoading] = useState(true);

  // --- State for Testimonial Videos ---
  const [videos, setVideos] = useState<DentalVideo[]>(() => {
    return videosList.length > 0 ? videosList : DEFAULT_VIDEOS;
  });
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});

  // Fetch doctors, tech, and videos dynamically to ensure complete CMS sync
  useEffect(() => {
    let active = true;

    const loadData = async () => {
      // 1. Fetch Doctors (Fallback if doctorsList prop is empty or outdated)
      if (doctorsList.length === 0) {
        try {
          const dbDocs = await doctorService.getDoctors();
          if (active && dbDocs && dbDocs.length > 0) {
            setDoctors(dbDocs);
          }
        } catch (err) {
          console.warn('Error loading doctors in WhyChooseUs page:', err);
        }
      }

      // 2. Fetch Advanced Technology (Directly from CMS technologyService)
      try {
        const dbTech = await technologyService.getTechnology();
        if (active) {
          // Filter active and sort by display_order
          const activeSortedTech = dbTech
            .filter(item => item && item.is_active !== false && (item as any).is_active !== 'false')
            .sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
          setTechItems(activeSortedTech);
        }
      } catch (err) {
        console.warn('Error loading technology in WhyChooseUs page:', err);
      } finally {
        if (active) setTechLoading(false);
      }

      // 3. Fetch Testimonial Videos (Fallback if videosList prop is empty or outdated)
      if (videosList.length === 0) {
        try {
          const dbVideos = await videoService.getVideos();
          if (active && dbVideos && dbVideos.length > 0) {
            setVideos(dbVideos);
          }
        } catch (err) {
          console.warn('Error loading videos in WhyChooseUs page:', err);
        }
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [doctorsList, videosList]);

  // Sort doctors so Dr. Vipul Patel is 1st and Dr. Kinjal Patel is 2nd
  const sortedDoctors = [...doctors].sort((a, b) => {
    const isVipulA = (a.id === 'vipul' || a.name.toLowerCase().includes('vipul'));
    const isVipulB = (b.id === 'vipul' || b.name.toLowerCase().includes('vipul'));
    if (isVipulA && !isVipulB) return -1;
    if (!isVipulA && isVipulB) return 1;
    return 0;
  });

  // Sync videos state with videosList prop if it updates
  useEffect(() => {
    if (videosList && videosList.length > 0) {
      setVideos(videosList);
    }
  }, [videosList]);

  // Filter and map only the Instagram/MP4 Reels from the available list, keeping the exact sequence
  const mappedReels = videos.map(v => {
    const isMp4 = v.videoPlatform === 'mp4' || v.platform === 'mp4' || v.id.endsWith('.mp4') || v.id.includes('supabase.co');
    const isInstagram = !isMp4 && (v.videoPlatform === 'instagram' || v.platform === 'instagram' || v.id === 'DbS7_fJMTYC' || (v.title && v.title.toLowerCase().includes('instagram')));
    const platform = isMp4 ? ('mp4' as const) : (isInstagram ? ('instagram' as const) : ('youtube' as const));
    const url = platform === 'mp4' ? v.id : (platform === 'instagram' ? `https://www.instagram.com/p/${v.id}/` : `https://www.youtube.com/watch?v=${v.id}`);
    return {
      ...v,
      videoPlatform: platform,
      platform: platform,
      url: url
    };
  }).filter(v => v.videoPlatform === 'instagram' || v.videoPlatform === 'mp4');

  // Fallback to all videos if no Instagram reels are present
  const displayVideos = mappedReels.length > 0 ? mappedReels : videos.map(v => {
    const isMp4 = v.videoPlatform === 'mp4' || v.platform === 'mp4' || v.id.endsWith('.mp4') || v.id.includes('supabase.co');
    const isInstagram = !isMp4 && (v.videoPlatform === 'instagram' || v.platform === 'instagram' || v.id === 'DbS7_fJMTYC' || (v.title && v.title.toLowerCase().includes('instagram')));
    const platform = isMp4 ? ('mp4' as const) : (isInstagram ? ('instagram' as const) : ('youtube' as const));
    const url = platform === 'mp4' ? v.id : (platform === 'instagram' ? `https://www.instagram.com/p/${v.id}/` : `https://www.youtube.com/watch?v=${v.id}`);
    return {
      ...v,
      videoPlatform: platform,
      platform: platform,
      url: url
    };
  }).slice(0, 6);

  return (
    <div id="why-choose-us-page-view" className="bg-[#FAF9FB] min-h-screen">
      
      {/* Dynamic Cover Header Banner */}
      <section className="pt-[160px] sm:pt-[180px] lg:pt-[210px] pb-16 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0ea5e9]/5 via-[#0D9488]/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-[#0D9488] font-black text-xs tracking-widest uppercase flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="h-4 w-4 text-[#0ea5e9] animate-pulse" /> BEST DENTAL CLINIC IN RAJKOT
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B33] tracking-tight leading-tight uppercase">
            Why Choose Patel Dental Hospital
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#0ea5e9] to-[#0D9488] mx-auto rounded-full mt-4" />
          <p className="mt-4 text-gray-500 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Discover our commitment to world-class clinical standards, featuring senior expert clinicians, advanced digital technology, and a legacy of genuine patient trust.
          </p>
        </div>
      </section>

      {/* ==================================================
          SECTION 1 — OUR DOCTORS
          ================================================== */}
      <section id="why-choose-doctors-section" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {sortedDoctors.map((doctor, index) => {
            const qualificationText = doctor.id === 'vipul' 
              ? 'MDS, Masters in Implantology (USA)' 
              : `${doctor.titles} (${doctor.bdsInstitution})`;

            const isKinjal = (doctor.id === 'kinjal' || doctor.name.toLowerCase().includes('kinjal'));
            const isVipul = (doctor.id === 'vipul' || doctor.name.toLowerCase().includes('vipul'));
            const imageSrc = isKinjal 
              ? '/Dr. Kinjal Patel.JPG' 
              : isVipul 
                ? '/Dr. Vipul Patel.jpg' 
                : doctor.img;

            return (
              <motion.div
                key={doctor.id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 sm:p-8 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Top area displaying only Doctor Image, Doctor Name, and Qualification */}
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                    <div className="w-[150px] shrink-0">
                      <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-50 border border-slate-100 shadow-sm">
                        <img
                          src={imageSrc}
                          alt={doctor.name}
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 flex-grow mt-3 sm:mt-0">
                      <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#0B1B33] tracking-tight">
                        {doctor.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
                        <strong className="text-slate-700 font-bold">Qualification:</strong> {qualificationText}
                      </p>
                    </div>
                  </div>

                  {/* Professional Biography Info (Restored Lower Content) */}
                  <div className="border-t border-slate-100 pt-6 text-left">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <UserCheck className="h-4 w-4 text-[#0D9488]" /> Professional Background & Expertise
                    </p>
                    <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                      <DoctorBioRenderer bioText={doctor.briefIntro} doctorName={doctor.name} />
                    </div>
                  </div>
                </div>

                {/* Patient booking CTAs (Restored Buttons) */}
                <div className="mt-6 pt-6 border-t border-slate-100 flex gap-3">
                  <button
                    onClick={() => openAppointmentModal(doctor.id === 'vipul' ? 'Full Mouth Rehab' : 'Smile Makeover')}
                    className="flex-1 bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-extrabold py-3.5 px-4 rounded-xl transition duration-300 uppercase tracking-wider cursor-pointer text-center shadow-sm"
                  >
                    Request Free Consultation
                  </button>
                  <a
                    href={getWhatsAppUrl(`Hello Patel Dental Hospital, I would like to book a free consultation with ${doctor.name}. Please share the available appointment slots.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-[#0B1B33] text-xs font-extrabold py-3.5 px-4 rounded-xl transition duration-300 uppercase tracking-wider cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp Us
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          SECTION 2 — ADVANCED TECHNOLOGY
          ================================================== */}
      <section id="why-choose-technology-section" className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1B33] tracking-tight leading-tight uppercase">
              Advanced Diagnostics & Dental Technology
            </h2>
            <div className="h-1 w-16 bg-[#0ea5e9] mx-auto rounded-full mt-3" />
            <p className="text-gray-500 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              We invest in state-of-the-art digital dentistry equipment to ensure highly accurate treatment planning, predictable outcomes, and absolute patient comfort.
            </p>
          </div>

          {techLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <span className="animate-spin text-[#0D9488] rounded-full h-8 w-8 border-b-2 border-slate-900"></span>
              <p className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Loading Digital Assets...</p>
            </div>
          ) : techItems.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-sans italic text-sm border border-dashed border-slate-200 rounded-2xl">
              No technology records returned from the database. Customize technology items inside the CMS Admin Panel.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {techItems.map((item, index) => {
                const shortDescription = deduplicateText(item.short_description || item.shortDesc || '');
                const detailedDescription = deduplicateText(item.description || '');
                const displayedText = shortDescription || detailedDescription;

                // Split into clean sentence points
                const rawSentences = displayedText
                  .split(/[.!?]+/)
                  .map(s => s.trim())
                  .filter(s => s.length > 3);
                
                const sentences = rawSentences.length > 0 ? rawSentences : [displayedText];

                return (
                  <motion.div
                    key={item.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_rgba(8,28,58,0.02)] hover:shadow-[0_12px_30px_rgba(8,28,58,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                  >
                    {/* Machine Image */}
                    <div className="aspect-video w-full bg-slate-50 relative overflow-hidden shrink-0 border-b border-slate-100 flex items-center justify-center p-4">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Machine Content */}
                    <div className="p-6 flex-grow flex flex-col justify-start">
                      <h3 className="font-display font-extrabold text-[#0B1B33] text-lg sm:text-xl leading-snug group-hover:text-[#0D9488] transition-colors duration-300 mb-4">
                        {item.title}
                      </h3>

                      <ul className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed space-y-2.5">
                        {sentences.slice(0, 3).map((sentence, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2 text-left">
                            <span className="text-[#0D9488] font-bold select-none mt-0.5">•</span>
                            <span>{sentence}.</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ==================================================
          SECTION 3 — PATIENT TESTIMONIAL VIDEOS
          ================================================== */}
      <section id="why-choose-testimonials-section" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1B33] tracking-tight leading-tight uppercase">
            Genuine Patient Testimonial Videos
          </h2>
          <div className="h-1 w-16 bg-[#0D9488] mx-auto rounded-full mt-3" />
          <p className="text-gray-500 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Listen to verified clinical outcomes and personal reviews directly from patients who completed their treatments at our hospital.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 justify-center items-start">
          {displayVideos.map((video, index) => (
            <motion.div
              key={video.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={video.videoPlatform === 'instagram' || video.videoPlatform === 'mp4' ? "w-full max-w-[240px] mx-auto flex flex-col items-center" : "bg-white rounded-[16px] overflow-hidden border border-slate-100 shadow-[0_6px_18px_rgba(0,0,0,0.22)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col"}
            >
              {video.videoPlatform === 'instagram' ? (
                <InstagramEmbed
                  url={video.url || `https://www.instagram.com/p/${video.id}/`}
                  title={video.title}
                  thumbnail={video.thumbnail}
                />
              ) : video.videoPlatform === 'mp4' ? (
                <div className="w-full max-w-[240px] mx-auto flex justify-center">
                  <Mp4ReelPlayer src={video.url || video.id} />
                </div>
              ) : (
                <>
                  <div className="aspect-video w-full bg-slate-950 relative overflow-hidden shrink-0">
                    {activeVideos[video.id] ? (
                      <iframe
                        className="w-full h-full border-0 absolute inset-0 z-10"
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    ) : (
                      <button
                        onClick={() => setActiveVideos(prev => ({ ...prev, [video.id]: true }))}
                        className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer group/video focus:outline-none"
                        aria-label={`Play ${video.title}`}
                      >
                        <img
                          src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-[1.03]"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        {/* Centered Play Trigger Icon */}
                        <div className="absolute z-20 flex items-center justify-center w-14 h-14 rounded-full bg-white/95 text-[#0D9488] shadow-md group-hover/video:scale-110 group-hover/video:bg-[#0D9488] group-hover/video:text-white transition-all duration-300 pointer-events-none">
                          <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                        </div>
                      </button>
                    )}
                  </div>

                  {/* Video metadata */}
                  <div className="p-4 sm:p-5 flex-grow flex flex-col justify-center">
                    <h4 className="font-display font-bold text-[#0B1B33] text-[14px] sm:text-[15px] leading-snug group-hover:text-[#0D9488] transition-colors duration-300">
                      {video.title}
                    </h4>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Seal CTA Footer Panel */}
      <section className="bg-gradient-to-r from-[#0B1B33] to-[#081528] text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <ShieldCheck className="h-12 w-12 text-[#0D9488] mx-auto" />
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Experience the Patel Dental Hospital Standard?
          </h2>
          <p className="text-slate-300 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Schedule your risk-free online consultation. Let our senior doctors formulate a customized treatment plan using our advanced digital dentistry solutions.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => openAppointmentModal()}
              className="w-full sm:w-auto bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-black py-4 px-8 rounded-xl transition duration-300 uppercase tracking-widest cursor-pointer shadow-md"
            >
              Book Free Appointment
            </button>
            <a
              href={getWhatsAppUrl("Hello Patel Dental Hospital, I am interested in visiting your clinic. Please share the next available appointment slots.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-black py-4 px-8 rounded-xl transition duration-300 uppercase tracking-widest cursor-pointer text-center flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
