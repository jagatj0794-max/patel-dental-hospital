/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye } from 'lucide-react';
import { PatientMoment, DentalVideo } from '../types';
import PatientMomentsGallery from '../components/PatientMomentsGallery';
import HospitalGallery from '../components/HospitalGallery';
import { useSEO } from '../utils/seo';
import { InstagramEmbed } from '../components/InstagramEmbed';
import { Mp4ReelPlayer } from '../components/Mp4ReelPlayer';
import { DEFAULT_VIDEOS } from '../utils/videoData';

export interface MediaImage {
  id: string;
  url: string;
  title: string;
  category: string;
  branch: string;
  altText?: string;
}

interface SmileGalleryProps {
  patientMoments?: PatientMoment[];
  mediaImages?: MediaImage[];
  onSelectItem?: (item: any, index: number) => void;
  openAppointmentModal?: (preselectedTreatment?: string) => void;
  galleryItems?: any[];
  videosList?: DentalVideo[];
}

export default function SmileGallery({ patientMoments, mediaImages = [], videosList = [] }: SmileGalleryProps) {
  useSEO({
    title: 'Patient Smile & Clinical Gallery | Patel Dental Hospital Rajkot',
    description: 'Browse our smile gallery at Patel Dental Hospital, Rajkot. View life-changing smile makeovers, clinical cases, and state-of-the-art infrastructure of our advanced dental clinics.',
    keywords: 'Smile Gallery, Dental Clinic in Rajkot, Smile Makeover in Rajkot, Smile Designing, Before After Dental, Patient Moments, Dental Hospital Rajkot, Patel Dental Hospital Gallery'
  });

  const rawVideos = videosList && videosList.length > 0 ? videosList : DEFAULT_VIDEOS;

  const videosToRender = rawVideos.map(v => {
    const isMp4 = v.videoPlatform === 'mp4' || v.platform === 'mp4' || v.id.endsWith('.mp4') || v.id.includes('supabase.co');
    const isInstagram = !isMp4 && (v.videoPlatform === 'instagram' || v.platform === 'instagram' || v.id === 'DbS7_fJMTYC' || (v.title && v.title.toLowerCase().includes('instagram')));
    const platform = isMp4 ? ('mp4' as const) : (isInstagram ? ('instagram' as const) : ('instagram' as const));
    const url = platform === 'mp4' ? v.id : `https://www.instagram.com/p/${v.id}/`;
    return {
      ...v,
      videoPlatform: platform,
      platform: platform,
      url: url,
      thumbnail: v.thumbnail
    };
  });

  return (
    <div id="smile-gallery-page-view" className="bg-[#FAFAFC] min-h-screen">
      {/* Patient Smile Moments Gallery */}
      <PatientMomentsGallery patientMoments={patientMoments} isStandalonePage={true} />
      
      {/* Hospital Gallery (reusable section) */}
      <HospitalGallery mediaImages={mediaImages} />

      {/* 4. Patient Video Testimonials */}
      <section className="py-12 sm:py-20 bg-white relative z-10 border-t border-sky-100/30" id="patient-success-stories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
              PATIENT SUCCESS STORIES
            </span>
            <h2 className="stat-heading-premium text-[#081C3A] text-[15px] sm:text-[18px] md:text-[24px] lg:text-[26px] tracking-wider leading-snug uppercase mb-3">
              Real Experiences from Patients at the Best Dental Hospital in Rajkot
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 justify-center items-start">
            {videosToRender.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="w-full max-w-[240px] mx-auto flex flex-col items-center"
              >
                {video.videoPlatform === 'instagram' ? (
                  <InstagramEmbed
                    url={video.url || `https://www.instagram.com/p/${video.id}/`}
                    title={video.title}
                    thumbnail={video.thumbnail}
                  />
                ) : (
                  <div className="w-full max-w-[240px] mx-auto flex justify-center">
                    <Mp4ReelPlayer src={video.url || video.id} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

