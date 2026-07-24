/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Calendar, Award, Check, GraduationCap, Heart, Shield, Sparkles, 
  Clock, Microscope, BookOpen, Quote, ShieldCheck, HeartHandshake, UserCheck, CheckCircle2, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Unified images with clear paths
const drKinjalPatelImg = '/Dr kinjal patel 2.png';
const drVipulPatelImg = '/dr. patel.png';

import { Doctor } from '../types';
import { DoctorBioRenderer } from '../components/DoctorBioRenderer';

interface DoctorsProps {
  openAppointmentModal: () => void;
  doctorsList: Doctor[];
}

export default function Doctors({ openAppointmentModal, doctorsList }: DoctorsProps) {
  const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null);

  // Ensure Dr. Vipul Patel appears first, followed by Dr. Kinjal Patel, then any other doctors
  const doctorsData = [...doctorsList].sort((a, b) => {
    const nameA = (a.name || '').toLowerCase();
    const nameB = (b.name || '').toLowerCase();
    if (nameA.includes('vipul')) return -1;
    if (nameB.includes('vipul')) return 1;
    if (nameA.includes('kinjal')) return -1;
    if (nameB.includes('kinjal')) return 1;
    return 0;
  });

  return (
    <div id="doctors-page-view" className="relative pt-[72px] bg-slate-50/50 min-h-screen">
      
      {/* 1. Header Hero Banner */}
      <section className="bg-gradient-to-b from-[#0ea5e9]/10 via-[#0D9488]/5 to-transparent py-12 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-black text-[#0ea5e9] tracking-widest uppercase block">
            Meet Our Senior Expert Clinicians
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B33] tracking-tight leading-tight">
            MEET OUR SPECIALIST DOCTORS
          </h1>
          <div className="h-1.5 w-20 bg-gradient-to-r from-[#0ea5e9] to-[#0D9488] mx-auto rounded-full mt-3" />
          <p className="text-gray-500 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed pt-2">
            Meet our highly qualified senior dentists driving top clinical standards, strict sterile safety protocols, and advanced painless treatments at Patel Dental Hospital.
          </p>
        </div>
      </section>

      {/* 2. Full-Width Doctor Sections */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12 sm:space-y-16 -mt-4">
        {doctorsData.map((doctor, index) => (
          <motion.div 
            key={doctor.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 p-6 sm:p-8 lg:p-10 relative overflow-hidden group"
          >
            {/* Top Header Area: Desktop (Image left 35-40%, Info right 60-65%), Mobile (Stacked) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Doctor Image Column (Desktop: 35-40% / 4-5 cols out of 12) */}
              <div className="lg:col-span-5 xl:col-span-4 w-full">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 w-full border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={doctor.img}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {doctor.titles && (
                    <span className="absolute bottom-4 right-4 bg-[#0B1B33]/85 backdrop-blur-md text-[#00E5FF] text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm border border-[#00E5FF]/20">
                      Degree: {doctor.titles}
                    </span>
                  )}

                  {doctor.branch && (
                    <span className="absolute bottom-4 left-4 bg-emerald-900/90 backdrop-blur-md text-white text-[10.5px] font-bold px-3 py-1.5 rounded-lg shadow-sm border border-emerald-500/20">
                      📍 {doctor.branch}
                    </span>
                  )}
                </div>
              </div>

              {/* Doctor Info Column (Desktop: 60-65% / 7-8 cols out of 12) */}
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between space-y-5">
                
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-[#0D9488] tracking-widest uppercase block leading-none">
                      {doctor.designation}
                    </span>
                    {doctor.experience && (
                      <span className="text-[10px] bg-sky-50 text-sky-700 border border-sky-100 px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider">
                        {doctor.experience}+ Years Exp.
                      </span>
                    )}
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1B33] tracking-tight">
                    {doctor.name}
                  </h2>
                  <div className="h-1.5 w-16 bg-gradient-to-r from-[#0ea5e9] to-[#0D9488] rounded-full mt-2" />

                  {/* Highlights & Qualifications */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {doctor.bdsInstitution && (
                      <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 flex items-start space-x-2.5">
                        <GraduationCap className="h-4.5 w-4.5 text-[#0ea5e9] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-extrabold text-[#0B1B33]">Qualification</p>
                          <p className="text-xs text-gray-500 font-sans">{doctor.titles} ({doctor.bdsInstitution})</p>
                        </div>
                      </div>
                    )}
                    {doctor.branch && (
                      <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 flex items-start space-x-2.5">
                        <ShieldCheck className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-extrabold text-[#0B1B33]">Hospital Branch</p>
                          <p className="text-xs text-gray-500 font-sans">{doctor.branch}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Stats Grid */}
                  {doctor.stats && doctor.stats.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {doctor.stats.map((stat, i) => (
                        <div key={i} className="p-3 bg-slate-50/80 rounded-xl text-center border border-slate-100">
                          <span className="block font-display font-black text-lg sm:text-xl text-[#0B1B33]">
                            {stat.value}
                          </span>
                          <span className="block text-[9px] text-gray-400 font-black uppercase tracking-wider mt-1 leading-none">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <button
                    onClick={openAppointmentModal}
                    className="flex-1 bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-extrabold py-3.5 px-6 rounded-xl transition duration-300 uppercase tracking-widest cursor-pointer text-center shadow-sm hover:shadow-md"
                  >
                    Book Consultation
                  </button>
                  <button
                    onClick={() => setActiveDoctor(doctor)}
                    className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-[#0B1B33] text-xs font-extrabold py-3.5 px-6 rounded-xl transition duration-300 uppercase tracking-widest cursor-pointer text-center"
                  >
                    View Full Profile Modal
                  </button>
                </div>

              </div>
            </div>

            {/* Full Biography Below Header Area Across Full Width */}
            <div className="mt-8 pt-8 border-t border-slate-150">
              <DoctorBioRenderer bioText={doctor.briefIntro} doctorName={doctor.name} />

              {/* Clinical Specializations & Expertises */}
              {doctor.expertises && doctor.expertises.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-slate-400 mb-3">
                    Specialized Procedures & Clinical Expertise
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {doctor.expertises.map((exp, idx) => (
                      <div key={idx} className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 flex items-start space-x-3">
                        <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-display font-bold text-xs text-[#0B1B33]">{exp.title}</h5>
                          <p className="text-gray-500 text-[11px] font-sans mt-0.5 leading-normal">{exp.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        ))}
      </section>

      {/* 3. Detailed Full Profile Modal with AnimatePresence */}
      <AnimatePresence>
        {activeDoctor && (
          <div className="fixed inset-0 z-100 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              
              {/* Backdrop Glow & Blur */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveDoctor(null)}
                className="fixed inset-0 bg-[#0B1B33]/70 backdrop-blur-md transition-opacity" 
              />

              {/* Spacing alignment helper */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              {/* Modal Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', duration: 0.45 }}
                className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full relative border border-slate-100 text-[#0B1B33]"
              >
                {/* Close Button Pin */}
                <button
                  type="button"
                  onClick={() => setActiveDoctor(null)}
                  className="absolute top-5 right-5 z-20 h-10 w-10 bg-white hover:bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 transition duration-200 cursor-pointer shadow-sm"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="overflow-y-auto max-h-[90vh]">
                  
                  {/* Doctor Profile Banner Cover */}
                  <div className="relative bg-gradient-to-b from-[#0ea5e9]/10 via-[#0D9488]/5 to-transparent p-6 sm:p-10 border-b border-slate-105">
                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                      {/* Detailed Img Card */}
                      <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-2xl overflow-hidden border-2 border-white shadow-md relative shrink-0 bg-slate-50">
                        <img 
                          src={activeDoctor.img} 
                          alt={activeDoctor.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="text-center sm:text-left space-y-2">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                          <span className="text-[10px] font-black text-[#0D9488] tracking-widest uppercase block leading-none">
                            {activeDoctor.designation}
                          </span>
                          {activeDoctor.branch && (
                            <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              📍 {activeDoctor.branch}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1B33] tracking-tight">
                          {activeDoctor.name}, <span className="text-[#0ea5e9] font-black">{activeDoctor.titles}</span>
                        </h3>
                        <p className="text-gray-500 font-sans text-xs sm:text-sm font-medium leading-relaxed max-w-xl">
                          Senior dental practitioner leading cosmetic restoration and immediate implant loading procedures at Patel Dental Hospital.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-10 space-y-8">
                    
                    {/* Clinical Biography */}
                    <DoctorBioRenderer bioText={activeDoctor.briefIntro} doctorName={activeDoctor.name} />

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                      {activeDoctor.stats.map((stat, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-xl text-center border border-slate-100">
                          <span className="block font-display font-black text-xl sm:text-2xl text-[#0B1B33]">
                            {stat.value}
                          </span>
                          <span className="block text-[9px] text-gray-400 font-black uppercase tracking-wider mt-1.5 leading-none">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Qualifications */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-slate-400">Qualifications & Credentials</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-100 flex items-start space-x-3">
                          <GraduationCap className="h-5 w-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                          <div>
                            <h5 className="font-display font-bold text-sm text-[#0B1B33]">Bachelor of Dental Surgery (BDS)</h5>
                            <p className="text-gray-400 text-[10px] uppercase font-bold leading-relaxed">{activeDoctor.bdsInstitution}</p>
                            <p className="text-gray-500 text-xs font-sans mt-1">Certified dentist with meticulous medical training and senior clinical practice credentials.</p>
                          </div>
                        </div>

                        <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-100 flex items-start space-x-3">
                          <ShieldCheck className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                          <div>
                            <h5 className="font-display font-bold text-sm text-[#0B1B33]">Authorized Practicing License</h5>
                            <p className="text-gray-400 text-[10px] uppercase font-bold leading-relaxed">Official Dental Council Register</p>
                            <p className="text-gray-500 text-xs font-sans mt-1">Registered Senior Dental clinician maintaining fully sterile Class-B operatory center standards.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Clinical Expertises */}
                    <div className="space-y-4 pt-4 border-t border-slate-100 animate-fade-in">
                      <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-slate-400">Clinical Focus & Specializations</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activeDoctor.expertises.map((exp, idx) => (
                          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-105 flex items-start space-x-3.5 shadow-2xs">
                            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                            <div>
                              <h5 className="font-display font-bold text-sm text-[#0B1B33]">{exp.title}</h5>
                              <p className="text-gray-500 text-xs font-sans mt-1.5 leading-relaxed">{exp.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Close CTA */}
                    <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                      <p className="text-[10px] text-gray-400 font-sans max-w-sm text-center sm:text-left">
                        Treatment protocols are customized uniquely based on dental CBCT 3D computed tomography diagnostics at the hospital unit.
                      </p>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setActiveDoctor(null);
                            openAppointmentModal();
                          }}
                          className="px-6 py-3 bg-[#0B1B33] hover:bg-[#0ea5e9] text-white text-xs font-bold rounded-xl transition duration-200 uppercase tracking-widest text-center cursor-pointer"
                        >
                          Book Priority Consult
                        </button>
                        <button
                          onClick={() => setActiveDoctor(null)}
                          className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-gray-700 text-xs font-bold rounded-xl transition duration-200 uppercase tracking-widest text-center cursor-pointer"
                        >
                          Close Profile
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>

            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
