/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
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

interface SmileGalleryGujaratiProps {
  patientMoments?: PatientMoment[];
  mediaImages?: MediaImage[];
  onSelectItem?: (item: any, index: number) => void;
  openAppointmentModal?: (preselectedTreatment?: string) => void;
  galleryItems?: any[];
  videosList?: DentalVideo[];
}

export default function SmileGalleryGujarati({ patientMoments, mediaImages = [], videosList = [] }: SmileGalleryGujaratiProps) {
  useSEO({
    title: 'દર્દીઓના સ્માઇલ અને ક્લિનિકલ ગેલેરી | પટેલ ડેન્ટલ હોસ્પિટલ રાજકોટ',
    description: 'પટેલ ડેન્ટલ હોસ્પિટલ, રાજકોટમાં અમારા સ્માઇલ મેકઓવર, ક્લિનિકલ કેસો અને હોસ્પિટલ ગેલેરી જુઓ.',
    keywords: 'સ્માઇલ ગેલેરી, ડેન્ટલ ક્લિનિક રાજકોટ, પટેલ ડેન્ટલ હોસ્પિટલ ગેલેરી'
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
    <div id="smile-gallery-page-view-gujarati" className="bg-[#FAFAFC] min-h-screen gujarati-text">
      {/* SECTION 1 — HAPPY SMILES & PATIENT MOMENTS */}
      <PatientMomentsGallery 
        patientMoments={patientMoments} 
        isStandalonePage={true} 
        customBadge="પટેલ ડેન્ટલ હોસ્પિટલ - રાજકોટમાં ડેન્ટલ ક્લિનિક"
        customTitle="હેપ્પી સ્માઇલ્સ અને દર્દીઓની યાદગાર પળો"
      />
      
      {/* SECTION 2 — HOSPITAL GALLERY */}
      <HospitalGallery 
        mediaImages={mediaImages} 
        customBadge="પટેલ ડેન્ટલ હોસ્પિટલ • હોસ્પિટલ ઈન્ફ્રાસ્ટ્રક્ચર અને ક્લિનિકલ શ્રેષ્ઠતા"
        customTitle="હોસ્પિટલ ગેલેરી"
        customDescription="અમારા આધુનિક ડેન્ટલ ઓપરેટરીઝ, અદ્યતન 3D CBCT ઇમેજિંગ સુટ્સ, સ્ટેરાઇલ સર્જિકલ ઝોન અને ક્લિનિકલ સારવારની ઝલક જુઓ."
        isGujarati={true}
      />

      {/* SECTION 3 — PATIENT SUCCESS STORIES */}
      <section className="py-12 sm:py-20 bg-white relative z-10 border-t border-sky-100/30" id="patient-success-stories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
            <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block gujarati-text">
              દર્દીઓની સફળતાની કહાનીઓ
            </span>
            <h2 className="stat-heading-premium text-[#081C3A] text-[15px] sm:text-[18px] md:text-[24px] lg:text-[26px] tracking-wider leading-snug uppercase mb-3 gujarati-text">
              રાજકોટની શ્રેષ્ઠ ડેન્ટલ હોસ્પિટલમાં દર્દીઓના વાસ્તવિક અનુભવો
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
