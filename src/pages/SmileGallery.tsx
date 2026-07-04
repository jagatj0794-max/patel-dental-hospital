/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Eye, ShieldCheck, Heart, Sparkles, Star, ChevronRight, Check, Activity, Award, Info, Columns
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../types';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

interface SmileGalleryProps {
  onSelectItem: (item: GalleryItem, index: number) => void;
  openAppointmentModal: (preselectedTreatment?: string) => void;
  galleryItems: GalleryItem[];
}

export default function SmileGallery({ onSelectItem, openAppointmentModal, galleryItems }: SmileGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'implant' | 'sameday' | 'smile' | 'rehab' | 'ortho' | 'cosmetic' | 'general'>('all');

  const filteredItems = galleryItems.filter((item) => {
    return activeFilter === 'all' || item.category === activeFilter;
  });

  // Comprehensive categories fitting all 10 clinical treatments
  const categoriesMap = [
    { id: 'all', label: 'All Cases' },
    { id: 'sameday', label: 'Same Day Teeth' },
    { id: 'implant', label: 'Implantology' },
    { id: 'rehab', label: 'Full Mouth Rehab' },
    { id: 'ortho', label: 'Orthodontics' },
    { id: 'smile', label: 'Smile Makeovers' },
    { id: 'cosmetic', label: 'Crowns & Bridges' },
    { id: 'general', label: 'Gum Care' }
  ];

  // Specific label renderer for treatment tags
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'sameday':
        return 'Same Day Fix Teeth';
      case 'implant':
        return 'Dental Implant';
      case 'rehab':
        return 'Full Mouth Rehabilitation';
      case 'ortho':
        return 'Orthodontics';
      case 'smile':
        return 'Smile Makeover';
      case 'cosmetic':
        return 'Crowns & Bridges';
      case 'general':
        return 'Gum Treatment';
      default:
        return 'Cosmetic Dentistry';
    }
  };

  // Flagship item for the giant demonstration slider at the top
  const flagshipItem = galleryItems.find(item => item.id === 'case-sameday-1') || galleryItems[0];

  return (
    <div id="smile-gallery-page-view" className="relative pt-[72px] bg-[#FAFAFC]">
      
      {/* Visual Subheader Header */}
      <section className="pt-8 pb-12 bg-linear-to-b from-brand-sky/40 via-white to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-black text-brand-cyan tracking-widest uppercase block">
              100% Raw Un-retouched Clinical Records
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
              Clinical Success & Smile Portfolio
            </h1>
            <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed">
              Explore authentic transformations completed by our lead implantologist. Drag each slider left or right to inspect real-time before and after outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Flagship Case Before/After Slider Presentation Area */}
      {flagshipItem && (
        <section className="pb-10 md:pb-16 pt-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Flagship text credentials */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-brand-cyan/10 text-brand-cyan px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wide">
                    <Star className="h-4 w-4 fill-brand-cyan text-brand-cyan" />
                    <span>FLAGSHIP CASE FILE</span>
                  </div>
                  
                  <div className="space-y-3">
                    <span className="text-xs text-brand-teal uppercase font-black tracking-wider block">
                      Immediate-Load Fixed Arches
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-black text-brand-navy tracking-tight leading-tight">
                      Same Day Fix Teeth - Complete Restorative Rehabilitation
                    </h2>
                    <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed">
                      This featured patient case demonstrates our advanced immediate-loading implant protocols in action. The patient presented with failing, highly mobile terminal dentition. We extracted, placed high-suction implant posts, and loaded gorgeous fixed acrylic-reinforced hybrid prosthetic arches inside 24 hours.
                    </p>
                  </div>

                  {/* Patient clinical parameters */}
                  <div className="grid grid-cols-2 gap-3.5 pt-2">
                    <div className="bg-[#FAFAFC] border border-slate-100 p-3.5 rounded-2xl">
                      <span className="block text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Methodology</span>
                      <span className="block font-display font-black text-brand-navy text-xs sm:text-sm mt-1">Immediate Loading</span>
                    </div>
                    <div className="bg-[#FAFAFC] border border-slate-100 p-3.5 rounded-2xl">
                      <span className="block text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Bone-Integration</span>
                      <span className="block font-display font-black text-brand-navy text-xs sm:text-sm mt-1">Excellent (CBCT Guided)</span>
                    </div>
                    <div className="bg-[#FAFAFC] border border-slate-100 p-3.5 rounded-2xl col-span-2 flex items-center space-x-2.5">
                      <div className="h-7 w-7 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs shrink-0 font-black">✓</div>
                      <span className="text-xs font-semibold font-sans text-slate-700">100% Pain-Controlled Conscious Sedation</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => openAppointmentModal('Same Day Fix Teeth')}
                      className="px-5 py-3.5 bg-brand-navy hover:bg-brand-cyan text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition flex items-center justify-center space-x-1.5"
                    >
                      <span>Check eligibility for Same Day Fix</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Responsive comparison slider widget */}
                <div className="lg:col-span-7">
                  <div className="bg-[#FAFAFC] p-4 md:p-6 rounded-3xl border border-slate-100 shadow-inner">
                    <BeforeAfterSlider
                      beforeImg={flagshipItem.beforeImg}
                      afterImg={flagshipItem.afterImg}
                      beforeLabel="Terminal Decay & High Mobility (Before)"
                      afterLabel="Fixed Anatomical Implants (After 24 Hours)"
                      aspectRatioClassName="aspect-[4/3] sm:aspect-[16/11]"
                    />
                    <div className="flex items-center justify-between mt-4 text-[10px] text-gray-400 font-mono px-1">
                      <span>CASE CODE: PDH-01-SAMEDAY</span>
                      <span className="flex items-center">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 mr-1" />
                        FDA Approved Bio-Titanium Implants
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter Selector Row */}
      <section className="py-4 md:py-6 bg-white border-y border-gray-100 sticky top-[72px] z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <span className="text-gray-400 text-xs font-black uppercase tracking-widest block">
                Filter by treatment specialization
              </span>
            </div>
            <div className="flex items-center justify-start space-x-1.5 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none">
              {categoriesMap.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id as any)}
                  className={`px-4 py-2.5 text-xs font-black rounded-xl shrink-0 transition-all duration-300 cursor-pointer ${
                    activeFilter === cat.id
                      ? 'bg-brand-navy text-white shadow-md'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Cases Masonry Column Grid */}
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatePresence mode="popLayout">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 [column-fill:_balance]">
              {filteredItems.map((item) => {
                // Find index coordinate of item inside universal static array for global lightbox nav
                const globalIndex = galleryItems.findIndex((gi) => gi.id === item.id);
                
                // Helper to render human readable layout perspective
                const getLayoutLabel = (type: string) => {
                  switch (type) {
                    case 'full-smile':
                      return 'Full Smiling Portrait';
                    case 'face-profile':
                      return 'Facial Profile Perspective';
                    case 'cosmetic-makeover':
                      return 'Aesthetic Smile Redesign';
                    case 'macro-implant':
                      return 'Surgical Macro Implantology';
                    case 'close-up':
                    default:
                      return 'Macro Intraoral Close-up';
                  }
                };

                return (
                  <motion.div
                    key={item.id}
                    id={`gallery-tile-${item.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4 }}
                    className="break-inside-avoid bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-2xl hover:border-brand-sky/30 transition-all duration-500 flex flex-col justify-between group transform hover:-translate-y-1.5"
                  >
                    {/* Embedded interactive touch/slide before-after slider inside card */}
                    <div className="p-4 bg-slate-50 border-b border-slate-100 relative">
                      <BeforeAfterSlider
                        beforeImg={item.beforeImg}
                        afterImg={item.afterImg}
                        aspectRatioClassName="aspect-[4/3]"
                      />
                      
                      {/* Interactive click overlay indicator to trigger Lightbox */}
                      <div className="absolute inset-x-8 bottom-8 z-30 transition-all duration-300 pointer-events-auto">
                        <button
                          onClick={() => onSelectItem(item, globalIndex)}
                          className="w-full bg-[#1e293b]/90 backdrop-blur-xs text-white hover:bg-brand-cyan hover:text-white transition-all py-2 rounded-xl text-[11px] font-black tracking-wider flex items-center justify-center space-x-2 shadow-lg scale-95 group-hover:scale-100 cursor-pointer"
                        >
                          <Eye className="h-4 w-4 text-brand-cyan group-hover:text-white" />
                          <span>Compare Full Screen</span>
                        </button>
                      </div>

                      {/* Perspective Type badge on image bottom-left */}
                      <span className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-mono px-3 py-1 rounded-md tracking-wide">
                        {getLayoutLabel(item.layoutType)}
                      </span>

                      {/* Flagship Highlight Star badge on first case */}
                      {globalIndex === 0 ? (
                        <div className="absolute top-6 right-6 bg-amber-400 text-slate-900 text-[9px] font-extrabold px-3 py-1 rounded-full flex items-center space-x-1 shadow-md z-30">
                          <Star className="h-3 w-3 fill-slate-900" />
                          <span>FEATURED CASE</span>
                        </div>
                      ) : item.privacyProtection ? (
                        <div className="absolute top-6 right-6 bg-slate-100/90 text-slate-600 text-[9px] font-semibold px-2.5 py-1 rounded-md flex items-center space-x-1 shadow-xs z-30 backdrop-blur-xs">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                          <span>Identity Cloaked</span>
                        </div>
                      ) : null}
                    </div>

                    {/* Metadata summary and clinical findings - Entire component acts as a trigger */}
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => onSelectItem(item, globalIndex)}
                    >
                      <div className="flex items-center justify-between mb-3.5">
                        <span className="text-[10px] uppercase font-black tracking-wider text-brand-cyan bg-brand-cyan/5 px-2.5 py-1 rounded-md">
                          {getCategoryLabel(item.category)}
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono uppercase bg-slate-50 px-2 py-0.5 rounded-md">
                          ID: CASE-0{globalIndex + 1}
                        </span>
                      </div>
                      
                      <h3 className="font-display font-black text-brand-navy text-base leading-snug mb-2 group-hover:text-brand-cyan transition-colors duration-300">
                        {item.title}
                      </h3>

                      {/* Patient profile strip */}
                      <div className="flex flex-wrap gap-2 mb-3.5 items-center">
                        <span className="text-[11px] font-semibold text-slate-500 font-sans">
                          {item.patientTag}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                          item.difficulty === 'Expert Level' 
                            ? 'bg-rose-50 text-rose-600 border border-rose-100'
                            : item.difficulty === 'High'
                            ? 'bg-amber-50 text-amber-700 border border-amber-100'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {item.difficulty}
                        </span>
                      </div>
                      
                      <p className="text-gray-500 font-sans text-xs sm:text-xs leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="border-t border-slate-100 pt-4 mt-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-brand-cyan group-hover:text-brand-teal flex items-center space-x-1">
                          <span>Inspect details</span>
                          <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="text-[10px] text-emerald-600 font-extrabold flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse mr-1"></span>
                          Clinical Record
                        </span>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>

        </div>
      </section>

      {/* Trust reassurance and dynamic consult call to action */}
      <section className="py-10 md:py-16 bg-[#FAFAFC] border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-brand-navy rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 h-44 w-44 bg-brand-cyan/10 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-3.5 max-w-lg relative z-10">
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                Not sure which solution matches your teeth anatomy?
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm font-sans leading-relaxed">
                Schedule a diagnostic consult with our expert team today. Get computer-guided scanner feedback based on real teeth shapes.
              </p>
            </div>
            <button
              onClick={() => openAppointmentModal()}
              className="px-6 py-3.5 bg-brand-cyan hover:bg-brand-teal text-white font-extrabold text-xs rounded-xl shadow-lg transition shrink-0 cursor-pointer relative z-10"
            >
              Get Professional Diagnosis
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
