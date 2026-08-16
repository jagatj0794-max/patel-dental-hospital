/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, ImageIcon, Cpu } from 'lucide-react';
import { TechnologyItem } from '../types';
import { technologyService } from '../utils/technologyData';
import { useSEO } from '../utils/seo';

// Helper function to deduplicate text that may have been concatenated or duplicated in the database fallback
function deduplicateText(text: string): string {
  if (!text) return '';
  const trimmed = text.trim();
  
  // Case 1: Split by double newline or multiple newlines and check if they are identical
  const paragraphs = trimmed.split(/\n+/).map(p => p.trim()).filter(Boolean);
  if (paragraphs.length === 2 && paragraphs[0] === paragraphs[1]) {
    return paragraphs[0];
  }
  
  // Case 2: Standard exact half-and-half check
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

export default function Technology() {
  useSEO({
    title: 'Advanced Digital Dentistry & Technology | Patel Dental Hospital',
    description: 'Explore the cutting-edge dental technology at Patel Dental Hospital, Rajkot. From high-resolution 3D CBCT diagnostics and intraoral scanners to advanced laser dentistry for painless treatments.',
    keywords: 'Digital Dentistry, Dental Technology Rajkot, 3D CBCT Scan Rajkot, Laser Dentistry, CAD CAM Dental, Intraoral Scanner, Advanced Dental Care, Patel Dental Hospital Technology'
  });

  const [items, setItems] = useState<TechnologyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    const fetchTechnologyItems = async () => {
      try {
        const data = await technologyService.getTechnology();
        if (active) {
          // Show only active items, sorted by display_order ASC
          const activeSorted = data
            .filter(item => item && item.is_active !== false && (item as any).is_active !== 'false')
            .sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
          setItems(activeSorted);
        }
      } catch (e) {
        console.warn('Failed to fetch technology items on mount:', e);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    fetchTechnologyItems();
    return () => {
      active = false;
    };
  }, []);

  const currentLightboxImg = lightboxIndex !== null ? items[lightboxIndex] : null;

  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && items.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % items.length);
    }
  };

  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && items.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
    }
  };

  return (
    <div id="technology-page-view" className="bg-[#FAFAFC] min-h-screen">
      
      {/* Hero Header Section */}
      <section className="pt-[160px] sm:pt-[180px] lg:pt-[210px] pb-12 bg-white border-b border-slate-100 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-indigo-600 font-extrabold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5 mb-1">
              <Cpu className="h-4 w-4 text-indigo-600 animate-pulse" /> ADVANCED DENTAL CARE IN RAJKOT
            </span>
            <h1 className="stat-heading-premium text-[#081C3A] text-2xl sm:text-3xl lg:text-4xl font-black tracking-wider uppercase leading-tight">
              Our Technology
            </h1>
            <div className="h-[3.5px] w-16 bg-gradient-to-r from-indigo-500 to-[#11B5D8] mx-auto rounded-full mt-4" />
          </div>
        </div>
      </section>

      {/* Main Responsive Photo Gallery Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Technology...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="bg-white rounded-[24px] p-12 text-center border border-slate-100 shadow-3xs max-w-md mx-auto">
              <ImageIcon className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-700 font-bold text-sm">No technology items available yet.</p>
              <p className="text-slate-400 text-xs mt-1">Please check back later or configure items via the Admin Panel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center items-stretch">
              {items.map((item, index) => {
                const shortText = deduplicateText(item.short_description || item.shortDesc || item.description || '');

                return (
                  <motion.div
                    key={item.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: (index % 3) * 0.05 }}
                    onClick={() => setLightboxIndex(index)}
                    className="bg-white rounded-[24px] overflow-hidden border border-slate-200/70 shadow-[0_4px_20px_rgba(8,28,58,0.03)] hover:shadow-[0_16px_35px_rgba(8,28,58,0.08)] transition-all duration-300 group cursor-pointer flex flex-col p-6 sm:p-7"
                  >
                    {/* 1. Technology Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F8FAFC] rounded-2xl flex items-center justify-center p-5 border border-slate-100">
                      <img
                        src={item.image_url}
                        alt={item.title || 'Advanced Dental Technology'}
                        className="max-w-full max-h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105 mx-auto block"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>

                    {/* 2. Technology Title */}
                    <h3 className="font-display font-extrabold text-[#081C3A] text-xl sm:text-2xl mt-6 mb-2.5 leading-snug">
                      {item.title || 'Advanced Technology'}
                    </h3>

                    {/* 3. Short Description */}
                    {shortText ? (
                      <p className="text-slate-600 text-sm font-sans leading-relaxed whitespace-pre-line">
                        {shortText}
                      </p>
                    ) : null}
                  </motion.div>
                );
              })}
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
                className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Prev Button */}
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevLightbox}
                  className="absolute left-2 sm:left-4 p-3 text-white/90 hover:text-white bg-black/40 hover:bg-black/70 rounded-full backdrop-blur-xs transition cursor-pointer z-10 animate-fade-in"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              {/* Next Button */}
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextLightbox}
                  className="absolute right-2 sm:right-4 p-3 text-white/90 hover:text-white bg-black/40 hover:bg-black/70 rounded-full backdrop-blur-xs transition cursor-pointer z-10 animate-fade-in"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}

              {/* Image Container with details */}
              <div 
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-h-[85vh] flex flex-col w-full max-w-3xl"
              >
                <div className="relative overflow-hidden flex items-center justify-center bg-black/80 p-6 min-h-[260px] max-h-[55vh]">
                  <img
                    src={currentLightboxImg.image_url}
                    alt={currentLightboxImg.title || 'Technology Detail'}
                    className="max-h-[50vh] w-auto max-w-full object-contain mx-auto"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="p-6 bg-slate-900 border-t border-white/10 text-white space-y-2 overflow-y-auto max-h-[30vh]">
                  <h3 className="font-display font-extrabold text-xl text-white">
                    {currentLightboxImg.title || 'Advanced Technology Equipment'}
                  </h3>

                  {(currentLightboxImg.short_description || currentLightboxImg.shortDesc || currentLightboxImg.description) && (
                    <p className="text-slate-300 text-sm font-sans leading-relaxed whitespace-pre-line">
                      {deduplicateText(currentLightboxImg.short_description || currentLightboxImg.shortDesc || currentLightboxImg.description)}
                    </p>
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

