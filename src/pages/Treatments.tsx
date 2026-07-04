/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, Check, ArrowRight, Star, HeartCrack, 
  Layers, Activity, Grid, Smile, Heart, Clock, Award, Shield, Sparkles, X, Info, CalendarCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TREATMENTS } from '../data/treatments';
import { Treatment } from '../types';

interface TreatmentsProps {
  openAppointmentModal: (preselectedTreatment?: string) => void;
}

export default function Treatments({ openAppointmentModal }: TreatmentsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'implants' | 'general' | 'ortho' | 'cosmetic' | 'special'>('all');
  const [activeDetailTreatment, setActiveDetailTreatment] = useState<Treatment | null>(null);

  // Define Category definitions matching user prompt
  const CATEGORIES = [
    {
      id: 'implants',
      title: 'Implant Solutions',
      description: 'Permanent, functional, and natural root-to-crown tooth replacements.',
      icon: Layers,
      itemIds: ['implants', 'sameday', 'fullmouth']
    },
    {
      id: 'general',
      title: 'General Dentistry',
      description: 'Essential preventive and pain-free solutions to preserve natural teeth.',
      icon: Shield,
      itemIds: ['rct', 'cleaning', 'gum']
    },
    {
      id: 'ortho',
      title: 'Orthodontics',
      description: 'Modern bracket and invisible correction systems for perfectly aligned bites.',
      icon: Grid,
      itemIds: ['braces', 'aligners']
    },
    {
      id: 'cosmetic',
      title: 'Cosmetic Dentistry',
      description: 'State-of-the-art biological tooth shaping, veneers, and smile enhancements.',
      icon: Smile,
      itemIds: ['smilemakeover', 'cosmetic', 'crowns', 'dentures']
    },
    {
      id: 'special',
      title: 'Special Care',
      description: 'Dedicated pediatric, surgical extraction, and complex maxillofacial care.',
      icon: Heart,
      itemIds: ['kids', 'wisdom', 'oralsurgery']
    }
  ];

  // Specific service icon assignment
  const getTreatmentIcon = (id: string) => {
    switch (id) {
      case 'implants':
        return Award;
      case 'sameday':
        return Clock;
      case 'fullmouth':
        return Layers;
      case 'rct':
        return Activity;
      case 'braces':
        return Grid;
      case 'aligners':
        return Smile;
      case 'kids':
        return Heart;
      case 'cosmetic':
        return Sparkles;
      case 'gum':
        return Shield;
      case 'cleaning':
        return Sparkles;
      case 'wisdom':
        return Shield;
      case 'dentures':
        return Layers;
      case 'crowns':
        return Award;
      case 'smilemakeover':
        return Smile;
      case 'oralsurgery':
        return Activity;
      default:
        return Activity;
    }
  };

  // Safe category title resolution
  const getCategoryTitle = (treatmentId: string) => {
    const parent = CATEGORIES.find(cat => cat.itemIds.includes(treatmentId));
    return parent ? parent.title : 'General Dentistry';
  };

  // Handle flat-list searching
  const matchesSearch = (t: Treatment) => {
    return (
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const searchFilteredTreatments = TREATMENTS.filter(matchesSearch);

  // Render a Single Premium Treatment Card
  const renderTreatmentCard = (t: Treatment, categoryTitle: string) => {
    const CardIcon = getTreatmentIcon(t.id);
    return (
      <div
        key={t.id}
        id={`treatment-card-${t.id}`}
        className="group relative bg-white rounded-2xl border border-slate-100 hover:border-brand-cyan/30 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1.5"
      >
        {/* Card Header Media Chassis */}
        <div className="relative w-full aspect-[16/10] bg-slate-50 overflow-hidden shrink-0">
          <img
            src={t.image}
            alt={t.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          
          {/* Subtle elegant gradient filter over image */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-95" />

          {/* Treatment Duration Badge */}
          {t.duration && (
            <div className="absolute bottom-4 right-4 bg-brand-navy/85 text-white text-[10px] font-mono px-3 py-1 rounded-md flex items-center space-x-1.5 backdrop-blur-xs border border-white/5">
              <Clock className="h-3.5 w-3.5 text-brand-cyan" />
              <span>{t.duration}</span>
            </div>
          )}
        </div>

        {/* Card Content Core */}
        <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            {/* Treatment Title with Brand SVG Icon */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display font-extrabold text-brand-navy text-base sm:text-lg leading-tight group-hover:text-brand-cyan transition-colors duration-300">
                {t.title}
              </h3>
              <div className="h-8.5 w-8.5 rounded-lg bg-brand-cyan/10 text-brand-cyan flex items-center justify-center shrink-0 group-hover:bg-brand-cyan group-hover:text-white transition-all duration-300">
                <CardIcon className="h-4 w-4 stroke-[2]" />
              </div>
            </div>

            {/* Micro description with line restriction to preserve symmetry */}
            <p className="text-slate-550 font-sans text-xs sm:text-sm leading-relaxed line-clamp-3">
              {t.shortDesc}
            </p>
          </div>

          {/* Double Dynamic Call to Action buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-50">
            <button
              onClick={() => setActiveDetailTreatment(t)}
              className="px-3 py-3 bg-slate-50 hover:bg-slate-100 text-brand-navy font-bold text-xs rounded-xl transition duration-200 cursor-pointer flex items-center justify-center space-x-1 border border-slate-100 focus:outline-hidden"
              title="Learn detailed treatment procedures"
            >
              <Info className="h-3.5 w-3.5 text-brand-cyan stroke-[2]" />
              <span>Learn More</span>
            </button>
            <button
              onClick={() => openAppointmentModal(t.title)}
              className="px-3 py-3 bg-brand-navy hover:bg-brand-cyan text-white hover:text-brand-navy font-extrabold text-xs rounded-xl transition-all duration-300 flex items-center justify-center space-x-1 cursor-pointer border border-transparent focus:outline-hidden group/btn"
            >
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="treatments-page-view" className="relative pt-[72px] bg-[#FAFAFC]">
      {/* Page Title Section */}
      <section className="py-16 bg-linear-to-b from-brand-sky/40 via-white to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-cyan font-black block">
              PATEL HOSPITAL SPECIALITIES
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
              Clinical Specialities & Orthotic Treatments
            </h1>
            <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed">
              We operate under pristine dental protocols. Every category represents high-end implants, painless rotary endodontic canals, and aesthetic smile transformations in Rajkot.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar Section */}
      <section className="py-6 bg-white border-y border-gray-100 sticky top-[72px] z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Category tabs */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className={`px-4 py-2.5 text-xs font-black rounded-xl shrink-0 transition-all duration-300 cursor-pointer ${
                  selectedCategory === 'all' && !searchQuery
                    ? 'bg-brand-cyan text-white shadow-md shadow-brand-cyan/20'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                All Departments
              </button>
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => { setSelectedCategory(category.id as any); setSearchQuery(''); }}
                  className={`px-4 py-2.5 text-xs font-black rounded-xl shrink-0 transition-all duration-300 cursor-pointer ${
                    selectedCategory === category.id && !searchQuery
                      ? 'bg-brand-navy text-white shadow-md'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full lg:w-72">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) {
                    setSelectedCategory('all');
                  }
                }}
                placeholder="Search treatment keyword..."
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan rounded-xl focus:outline-none placeholder-gray-450"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Treatments Display Groups */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatePresence mode="popLayout">
            {searchQuery ? (
              // Search view state
              <div>
                <div className="mb-8 font-sans text-xs text-gray-450 font-extrabold tracking-widest uppercase">
                  Search Results Matching &quot;{searchQuery}&quot; — {searchFilteredTreatments.length} Available
                </div>
                {searchFilteredTreatments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {searchFilteredTreatments.map((t) => renderTreatmentCard(t, getCategoryTitle(t.id)))}
                  </div>
                ) : (
                  <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 max-w-xl mx-auto p-8 shadow-xs">
                    <HeartCrack className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="font-display font-bold text-lg text-brand-navy">No match found</h3>
                    <p className="text-gray-500 text-sm mt-1">Please try searching with alternatives or change filters.</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="mt-5 px-5 py-2.5 bg-brand-cyan text-white text-xs font-bold rounded-xl cursor-pointer shadow-md shadow-brand-cyan/20"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Grouped by user category requests
              <div className="space-y-16">
                {CATEGORIES.filter(cat => selectedCategory === 'all' || cat.id === selectedCategory).map((cat) => {
                  const CategoryIcon = cat.icon;
                  const catTreatments = TREATMENTS.filter(t => cat.itemIds.includes(t.id));

                  if (catTreatments.length === 0) return null;

                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.6 }}
                      className="space-y-8 animate-fade-in"
                    >
                      {/* Big elegant Group Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-5 gap-3">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0">
                            <CategoryIcon className="h-6 w-6 stroke-[1.8]" />
                          </div>
                          <div>
                            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-brand-navy">
                              {cat.title}
                            </h2>
                            <p className="text-gray-400 text-xs sm:text-xs font-sans mt-0.5 max-w-xl leading-normal">
                              {cat.description}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] sm:text-xs font-black text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                          {catTreatments.length} Specialized Services
                        </span>
                      </div>

                      {/* Service Cards Grid inside this Category */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {catTreatments.map((t) => renderTreatmentCard(t, cat.title))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* Immersive interactive Details Modal backdrop & chassis */}
      <AnimatePresence>
        {activeDetailTreatment && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="treatment-detail-modal-overlay">
            {/* Modal backdrop glass overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDetailTreatment(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />

            <div className="min-h-screen px-4 text-center flex items-center justify-center py-6">
              {/* Animated Modal Body Chassis */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="inline-block w-full max-w-3xl bg-white rounded-3xl text-left overflow-hidden shadow-2xl relative border border-slate-100 z-10"
              >
                {/* Image hero on top of detail panel */}
                <div className="relative h-64 sm:h-80 bg-slate-100">
                  <img
                    src={activeDetailTreatment.image}
                    alt={activeDetailTreatment.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                  
                  {/* Close absolute button */}
                  <button
                    onClick={() => setActiveDetailTreatment(null)}
                    className="absolute top-4 right-4 bg-slate-950/50 hover:bg-slate-950 text-white p-2 rounded-full cursor-pointer transition border border-white/10"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[10px] sm:text-xs font-black uppercase text-brand-cyan tracking-widest block mb-1">
                      {getCategoryTitle(activeDetailTreatment.id)}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {activeDetailTreatment.title}
                    </h2>
                  </div>
                </div>

                {/* Body Content of Detail Grid */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Long Description and timing card */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                      <h4 className="text-xs uppercase font-black tracking-widest text-slate-400">
                        Treatment Overview
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        {activeDetailTreatment.longDesc}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs uppercase font-black tracking-widest text-slate-400">
                        Operational Metrics
                      </h4>
                      <div className="bg-[#FAFAFC] border border-slate-100 p-4 rounded-2xl space-y-3.5">
                        <div className="flex items-center space-x-2.5">
                          <Clock className="h-5 w-5 text-brand-cyan" />
                          <div>
                            <span className="text-[10px] text-slate-400 font-extrabold uppercase block tracking-wider leading-none">Expected Duration</span>
                            <span className="text-xs sm:text-xs font-black text-brand-navy block mt-1">{activeDetailTreatment.duration || 'Varies on Appointment'}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2.5 border-t border-slate-100 pt-3">
                          <Shield className="h-5 w-5 text-emerald-500" />
                          <div>
                            <span className="text-[10px] text-slate-400 font-extrabold uppercase block tracking-wider leading-none">Anxiety Controlled</span>
                            <span className="text-xs sm:text-xs font-black text-emerald-600 block mt-1">100% Guaranteed Painless</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fully detailed item benefits array */}
                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-xs uppercase font-black tracking-widest text-slate-400 mb-4">
                      Guaranteed Medical & Clinical Benefits
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {activeDetailTreatment.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start bg-brand-sky/15 border border-brand-sky/20 p-3.5 rounded-xl">
                          <Check className="h-5 w-5 text-brand-cyan shrink-0 mr-3 mt-0.5" />
                          <span className="text-xs sm:text-sm font-sans font-semibold text-brand-navy leading-normal">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Checkout Call-to-action bar */}
                  <div className="bg-[#0F172A] p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/[0.05]">
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[9px] uppercase tracking-widest text-brand-cyan font-black block">Patel Clinic Direct Booking</span>
                      <p className="text-xs text-white font-sans max-w-sm">Reserve a clinical diagnosis chair session with Dr. Kinjal Patel.</p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveDetailTreatment(null);
                        openAppointmentModal(activeDetailTreatment.title);
                      }}
                      className="w-full sm:w-auto px-5 py-3 bg-brand-cyan hover:bg-brand-teal text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition flex items-center justify-center space-x-2"
                    >
                      <CalendarCheck className="h-4 w-4" />
                      <span>Reserve treatment slot</span>
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Quality reassurance summary */}
      <section className="py-16 bg-[#F0F9FF] border-t border-brand-sky">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <h2 className="font-display font-extrabold text-brand-navy text-xl sm:text-2xl mb-3">
            Looking for customized full-jaw restorations?
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm font-sans mb-6">
            If you need customized full-mouth surgery or are dealing with dental trauma, please talk directly to our consulting surgeon. We offer bespoke rehabilitative treatments.
          </p>
          <button
            onClick={() => openAppointmentModal()}
            className="px-6 py-3 bg-brand-navy hover:bg-brand-teal text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            Direct Specialist Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
