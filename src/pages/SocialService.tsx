/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, ImageIcon, Sparkles, Heart } from 'lucide-react';
import { SocialServiceItem } from '../types';
import { socialServiceService } from '../utils/socialServiceData';

export default function SocialService() {
  const [items, setItems] = useState<SocialServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    const fetchSocialServices = async () => {
      try {
        const data = await socialServiceService.getSocialServices();
        if (active) {
          // Show only active items, sorted by display_order ASC
          const activeSorted = data
            .filter(item => item && item.is_active !== false && (item as any).is_active !== 'false')
            .sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
          setItems(activeSorted);
        }
      } catch (e) {
        console.warn('Failed to fetch social service items on mount:', e);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    fetchSocialServices();
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
    <div id="social-service-page-view" className="bg-[#FAFAFC] min-h-screen">
      
      {/* Hero Header Section */}
      <section className="pt-[108px] sm:pt-[124px] lg:pt-[140px] pb-12 bg-white border-b border-slate-100 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#0D9488] font-extrabold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5 mb-1">
              <Heart className="h-4 w-4 fill-[#0D9488]/10 animate-pulse" /> Community Care • Social Responsibility
            </span>
            <h1 className="stat-heading-premium text-[#081C3A] text-2xl sm:text-3xl lg:text-4xl font-black tracking-wider uppercase leading-tight">
              Social Service
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-sans leading-relaxed">
              Patel Dental Hospital is committed to serving society through various health awareness programs, free dental camps, educational activities, community outreach, and public welfare initiatives.
            </p>
            <div className="h-[3.5px] w-16 bg-gradient-to-r from-[#0D9488] to-[#11B5D8] mx-auto rounded-full mt-4" />
          </div>
        </div>
      </section>

      {/* Main Responsive Photo Gallery Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D9488]"></div>
              <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Social Gallery...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="bg-white rounded-[24px] p-12 text-center border border-slate-100 shadow-3xs max-w-md mx-auto">
              <ImageIcon className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-700 font-bold text-sm">No social service photos available yet.</p>
              <p className="text-slate-400 text-xs mt-1">Please check back later or configure photos via the Admin Panel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center items-stretch">
              {items.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: (index % 3) * 0.05 }}
                  onClick={() => setLightboxIndex(index)}
                  className="bg-white rounded-[20px] sm:rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(8,28,58,0.02)] hover:shadow-[0_16px_35px_rgba(8,28,58,0.08)] transition-all duration-300 group cursor-pointer flex flex-col justify-between p-3 sm:p-4"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 rounded-xl sm:rounded-2xl flex items-center justify-center p-2">
                    <img
                      src={item.image_url}
                      alt={item.title || 'Social Service Action'}
                      className="max-w-full max-h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105 mx-auto block"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl sm:rounded-2xl">
                      <div className="bg-white/95 backdrop-blur-xs p-3 rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                        <Maximize2 className="h-5 w-5 text-[#0D9488]" />
                      </div>
                    </div>
                  </div>

                  {/* Title / Description footer */}
                  {item.title && (
                    <div className="mt-3 px-1 pb-1 text-center">
                      <h3 className="font-display font-semibold text-slate-800 text-xs sm:text-sm line-clamp-2 group-hover:text-[#0D9488] transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  )}
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
                className="bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-h-[80vh] flex flex-col w-full max-w-4xl"
              >
                <div className="relative overflow-hidden flex items-center justify-center max-h-[70vh] bg-black p-4">
                  <img
                    src={currentLightboxImg.image_url}
                    alt={currentLightboxImg.title || 'Social Service Detail'}
                    className="max-h-[60vh] w-auto max-w-full object-contain mx-auto"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {currentLightboxImg.title && (
                  <div className="p-4 bg-slate-900 border-t border-white/10 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-sm sm:text-base text-white">
                      {currentLightboxImg.title}
                    </h3>
                    {lightboxIndex !== null && (
                      <span className="text-xs font-bold text-white/50 whitespace-nowrap">
                        {lightboxIndex + 1} / {items.length}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
