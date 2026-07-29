/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PatientMoment } from '../types';
import { PATIENT_MOMENTS } from '../data/patientMoments';

interface PatientMomentsGalleryProps {
  patientMoments?: PatientMoment[];
  isStandalonePage?: boolean;
  onNavigate?: (page: string) => void;
}

export default function PatientMomentsGallery({
  patientMoments,
  isStandalonePage = false,
  onNavigate
}: PatientMomentsGalleryProps) {
  const momentsToRender = patientMoments !== undefined && patientMoments.length > 0
    ? patientMoments
    : PATIENT_MOMENTS;

  const [visibleCount, setVisibleCount] = useState(isStandalonePage ? momentsToRender.length : 12);
  const [selectedMomentIndex, setSelectedMomentIndex] = useState<number | null>(null);

  const handleViewMore = () => {
    if (!isStandalonePage) {
      if (onNavigate) {
        onNavigate('gallery');
      }
      window.location.hash = 'gallery';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setVisibleCount(momentsToRender.length);
    }
  };

  return (
    <section 
      className={`bg-white relative z-10 ${
        isStandalonePage 
          ? 'pt-[108px] sm:pt-[124px] lg:pt-[140px] pb-16 sm:pb-24' 
          : 'py-16 sm:py-20 border-t border-slate-100'
      }`} 
      id="happy-smiles-gallery"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[#0D9488] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase mb-2 block">
            PATEL DENTAL HOSPITAL - DENTAL CLINIC IN RAJKOT
          </span>
          <h2 className="stat-heading-premium text-[#081C3A] text-[18px] sm:text-[22px] md:text-[28px] lg:text-[32px] font-black tracking-wider leading-snug uppercase mb-3">
            Happy Smiles & Patient Moments
          </h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-[#11B5D8] to-[#0EA5C6] mx-auto rounded-full" />
        </div>

        {/* Masonry pure-image layout columns */}
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-5 space-y-5 [column-fill:_balance]">
          {momentsToRender.slice(0, visibleCount).map((moment, index) => (
            <motion.div
              key={moment.id}
              id={`patient-moment-card-${moment.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (index % 4) * 0.05 }}
              onClick={() => setSelectedMomentIndex(index)}
              className="break-inside-avoid bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(8,28,58,0.015)] hover:shadow-[0_16px_35px_rgba(8,28,58,0.08)] transition-all duration-300 group cursor-pointer relative"
            >
              <div className="overflow-hidden relative bg-slate-50">
                <img
                  src={moment.image}
                  alt="Patel Dental Hospital Patient Moment"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur-xs p-3.5 rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                    <Maximize2 className="h-5 w-5 text-[#0D9488]" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Photos toggle controls */}
        {(!isStandalonePage || visibleCount < momentsToRender.length) && (
          <div className="mt-12 sm:mt-16 flex justify-center">
            <button
              id="btn-view-more-photos"
              onClick={handleViewMore}
              className="flex items-center text-[13px] sm:text-[14px] font-bold text-white bg-gradient-to-r from-[#0D9488] to-[#0ea5e9] hover:from-[#0F766E] hover:to-[#0284c7] px-8 py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(13,148,136,0.25)] hover:shadow-lg cursor-pointer transition-all duration-300 transform active:scale-95"
            >
              <Eye className="h-4 w-4 mr-2" />
              View More Photos
            </button>
          </div>
        )}

      </div>

      {/* Lightbox Modal overlay specifically designed for smiling patient moments */}
      <AnimatePresence>
        {selectedMomentIndex !== null && (() => {
          const currentItem = momentsToRender[selectedMomentIndex];
          
          const handlePrev = (e?: React.MouseEvent) => {
            e?.stopPropagation();
            setSelectedMomentIndex((prev) => 
              prev !== null ? (prev === 0 ? momentsToRender.length - 1 : prev - 1) : null
            );
          };

          const handleNext = (e?: React.MouseEvent) => {
            e?.stopPropagation();
            setSelectedMomentIndex((prev) => 
              prev !== null ? (prev === momentsToRender.length - 1 ? 0 : prev + 1) : null
            );
          };

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-[200] flex items-center justify-center p-3 sm:p-6 md:p-10 select-none cursor-default"
              onClick={() => setSelectedMomentIndex(null)}
            >
              <button
                id="lightbox-close-button"
                onClick={() => setSelectedMomentIndex(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-all duration-200 cursor-pointer z-[210] shadow-md hover:scale-105 flex items-center justify-center"
                title="Close Gallery"
              >
                <X className="h-5 w-5" />
              </button>

              <button
                id="lightbox-prev-button"
                onClick={handlePrev}
                className="absolute left-3 sm:left-6 bg-white/10 hover:bg-white/20 text-white p-3 sm:p-4 rounded-full transition-all duration-200 cursor-pointer z-[210] shadow-md hover:scale-105 flex items-center justify-center"
                title="Previous Photo"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl max-h-[85vh] z-[205] overflow-hidden rounded-3xl relative flex flex-col justify-center items-center"
              >
                <img
                  src={currentItem.image}
                  alt="Patient Moment Zoomed"
                  className="max-w-full max-h-[85vh] object-contain rounded-3xl shadow-2xl pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 bg-[#081C3A]/70 backdrop-blur-md px-4 py-1.5 rounded-full text-white/90 font-mono text-[11px] tracking-wider uppercase select-none">
                  Photo {selectedMomentIndex + 1} of {momentsToRender.length}
                </div>
              </motion.div>

              <button
                id="lightbox-next-button"
                onClick={handleNext}
                className="absolute right-3 sm:right-6 bg-white/10 hover:bg-white/20 text-white p-3 sm:p-4 rounded-full transition-all duration-200 cursor-pointer z-[210] shadow-md hover:scale-105 flex items-center justify-center"
                title="Next Photo"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
