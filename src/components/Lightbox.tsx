/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Eye, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../types';
import BeforeAfterSlider from './BeforeAfterSlider';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  items: GalleryItem[];
  setCurrentIndex: (index: number) => void;
}

export default function Lightbox({ item, onClose, items, setCurrentIndex }: LightboxProps) {
  if (!item) return null;

  const [compareMode, setCompareMode] = useState<'slider' | 'side-by-side'>('slider');

  const itemIndex = items.findIndex((i) => i.id === item.id);

  const prevItem = () => {
    if (itemIndex > 0) {
      setCurrentIndex(itemIndex - 1);
    } else {
      setCurrentIndex(items.length - 1);
    }
  };

  const nextItem = () => {
    if (itemIndex < items.length - 1) {
      setCurrentIndex(itemIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <AnimatePresence>
      <div
        id="lightbox-backdrop"
        className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
      >
        {/* Close trigger anchor */}
        <div className="absolute inset-0 cursor-default" onClick={onClose} />

        <div className="relative bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl z-10 overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] md:h-auto max-h-[90vh]">
          {/* Main Visual Arena */}
          <div className="flex-1 bg-slate-950 p-6 flex flex-col justify-between relative min-h-[300px] md:min-h-[500px]">
            {/* Header controls inside visual arena */}
            <div className="flex items-center justify-between z-10 mb-4">
              <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest bg-brand-cyan/10 px-3 py-1 rounded-full">
                Interactive Case Presentation
              </span>

              {/* Compare Mode Toggler */}
              <div className="flex items-center bg-slate-900/80 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setCompareMode('slider')}
                  className={`px-3 py-1 text-xs rounded-md transition ${
                    compareMode === 'slider'
                      ? 'bg-brand-cyan text-white font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Overlay Swap
                </button>
                <button
                  onClick={() => setCompareMode('side-by-side')}
                  className={`px-3 py-1 text-xs rounded-md transition ${
                    compareMode === 'side-by-side'
                      ? 'bg-brand-cyan text-white font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Side-By-Side
                </button>
              </div>
            </div>

            {/* Display Zone */}
            <div className="flex-1 flex items-center justify-center relative select-none">
              {compareMode === 'slider' ? (
                <div className="w-full max-w-md h-[250px] md:h-[350px]">
                  <BeforeAfterSlider
                    beforeImg={item.beforeImg}
                    afterImg={item.afterImg}
                    beforeLabel="Before Treatment"
                    afterLabel="Completed After"
                    aspectRatioClassName="h-full w-full"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 h-[180px] md:h-[300px]">
                    <img
                      src={item.beforeImg}
                      alt="Before"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-rose-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                      BEFORE TREATMENT
                    </div>
                  </div>
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 h-[180px] md:h-[300px]">
                    <img
                      src={item.afterImg}
                      alt="After"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                      COMPLETED AFTER
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Arrows */}
              <button
                onClick={prevItem}
                className="absolute left-2 p-2 rounded-full bg-slate-900/80 border border-slate-800 text-gray-400 hover:text-white cursor-pointer z-10"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextItem}
                className="absolute right-2 p-2 rounded-full bg-slate-900/80 border border-slate-800 text-gray-400 hover:text-white cursor-pointer z-10"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Hint overlay */}
            <div className="text-center text-xs text-gray-500 mt-2">
              Use the overlays and comparison switches to examine structural recoveries.
            </div>
          </div>

          {/* Sidebar explanation details */}
          <div className="w-full md:w-[320px] bg-slate-900 p-6 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display text-white text-lg font-bold leading-snug">
                  {item.title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-gray-400 hover:text-white transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-4">
                <span className="text-[10px] font-bold tracking-widest text-brand-teal uppercase bg-brand-teal/10 px-2.5 py-0.5 rounded-md">
                  {item.category === 'sameday'
                    ? 'Same Day Fix'
                    : item.category === 'implant'
                    ? 'Implant Mastery'
                    : item.category === 'smile'
                    ? 'Smile Makeover'
                    : item.category === 'rehab'
                    ? 'Full Rehabilitation'
                    : item.category === 'ortho'
                    ? 'Orthodontics'
                    : item.category === 'cosmetic'
                    ? 'Crowns & Bridges'
                    : 'Gum Care'}
                </span>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed font-sans mb-6">
                {item.description}
              </p>
            </div>

            <div className="space-y-3 border-t border-slate-800 pt-6">
              <span className="text-xs font-mono text-gray-500 block">
                Case Code: PDH-2026-0{itemIndex + 1}
              </span>
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-xl transition cursor-pointer"
              >
                Return to Smile Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
