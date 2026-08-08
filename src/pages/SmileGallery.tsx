/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, Eye, X, ChevronLeft, ChevronRight, ImageIcon, Sparkles } from 'lucide-react';
import { PatientMoment } from '../types';
import PatientMomentsGallery from '../components/PatientMomentsGallery';
import { useSEO } from '../utils/seo';

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
}

export default function SmileGallery({ patientMoments, mediaImages = [] }: SmileGalleryProps) {
  useSEO({
    title: 'Patient Smile & Clinical Gallery | Patel Dental Hospital Rajkot',
    description: 'Browse our smile gallery at Patel Dental Hospital, Rajkot. View life-changing smile makeovers, clinical cases, and state-of-the-art infrastructure of our advanced dental clinics.',
    keywords: 'Smile Gallery, Dental Clinic in Rajkot, Smile Makeover in Rajkot, Smile Designing, Before After Dental, Patient Moments, Dental Hospital Rajkot, Patel Dental Hospital Gallery'
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Extract unique categories from mediaImages
  const rawCategories = Array.from(new Set((mediaImages || []).map(img => img.category).filter(Boolean)));
  const categories = ['All', ...rawCategories];

  // Filtered images based on active category selection
  const filteredImages = (mediaImages || []).filter(img => {
    if (selectedCategory === 'All') return true;
    return img.category === selectedCategory;
  });

  const currentLightboxImg = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && filteredImages.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && filteredImages.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <div id="smile-gallery-page-view" className="bg-[#FAFAFC] min-h-screen">
      {/* Patient Smile Moments Gallery */}
      <PatientMomentsGallery patientMoments={patientMoments} isStandalonePage={true} />
      
      {/* About Us Hospital & Clinical Gallery Header */}
      <section className="pt-16 sm:pt-20 pb-12 bg-white border-t border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[#0D9488] font-bold text-xs tracking-widest uppercase block">
              Patel Dental Hospital • Hospital Infrastructure & Clinical Excellence
            </span>
            <h1 className="stat-heading-premium text-[#081C3A] text-2xl sm:text-3xl lg:text-4xl font-black tracking-wider uppercase leading-tight">
              Hospital Gallery
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
              Explore our modern dental operatories, advanced 3D CBCT imaging suites, sterile surgical zones, and clinical treatment highlights.
            </p>
            <div className="h-[3px] w-16 bg-gradient-to-r from-[#0D9488] to-[#11B5D8] mx-auto rounded-full mt-4" />
          </div>

          {/* Category Filter Pills */}
          {categories.length > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-[#081C3A] text-white shadow-md shadow-[#081C3A]/10 scale-105'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Gallery Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredImages.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-3xs max-w-lg mx-auto">
              <ImageIcon className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-700 font-bold text-sm">No gallery photos available in this category.</p>
              <p className="text-slate-400 text-xs mt-1">Select another category or view all images.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((img, index) => (
                <motion.div
                  key={img.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
                  onClick={() => setLightboxIndex(index)}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(8,28,58,0.02)] hover:shadow-[0_16px_35px_rgba(8,28,58,0.08)] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
                    <img
                      src={img.url}
                      alt={img.altText || img.title || 'Patel Dental Hospital Gallery'}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    
                    {/* Category Badge */}
                    {img.category && (
                      <span className="absolute top-3 left-3 bg-[#081C3A]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/10 shadow-sm">
                        {img.category}
                      </span>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/95 backdrop-blur-xs p-3 rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                        <Maximize2 className="h-5 w-5 text-[#0D9488]" />
                      </div>
                    </div>
                  </div>

                  {/* Title & Branch footer */}
                  <div className="p-4 bg-white border-t border-slate-50 space-y-1">
                    <h3 className="font-display font-bold text-slate-800 text-xs sm:text-sm line-clamp-1 group-hover:text-[#0D9488] transition-colors">
                      {img.title || 'Clinic Asset'}
                    </h3>
                    {img.branch && img.branch !== 'All Branches' && (
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {img.branch}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {currentLightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-12 right-0 sm:right-0 p-2 text-white/80 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Prev Button */}
              {filteredImages.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevLightbox}
                  className="absolute left-2 sm:left-4 p-3 text-white/90 hover:text-white bg-black/40 hover:bg-black/70 rounded-full backdrop-blur-xs transition cursor-pointer z-10"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              {/* Next Button */}
              {filteredImages.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextLightbox}
                  className="absolute right-2 sm:right-4 p-3 text-white/90 hover:text-white bg-black/40 hover:bg-black/70 rounded-full backdrop-blur-xs transition cursor-pointer z-10"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}

              {/* Image & Details */}
              <div 
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-h-[80vh] flex flex-col"
              >
                <div className="relative overflow-hidden flex items-center justify-center max-h-[70vh] bg-black">
                  <img
                    src={currentLightboxImg.url}
                    alt={currentLightboxImg.altText || currentLightboxImg.title || 'Gallery View'}
                    className="max-h-[70vh] w-auto max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 bg-slate-900 border-t border-white/10 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white">
                      {currentLightboxImg.title}
                    </h3>
                    {currentLightboxImg.category && (
                      <span className="text-[10px] font-bold text-[#11B5D8] tracking-wider uppercase">
                        {currentLightboxImg.category} {currentLightboxImg.branch ? `• ${currentLightboxImg.branch}` : ''}
                      </span>
                    )}
                  </div>
                  {lightboxIndex !== null && (
                    <span className="text-xs font-bold text-white/50">
                      {lightboxIndex + 1} / {filteredImages.length}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

