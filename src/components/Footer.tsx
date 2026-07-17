/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Phone, MapPin, Clock, Heart, Shield, Mail, 
  Facebook, Instagram, Youtube, Calendar, 
  ChevronRight, ExternalLink, ShieldCheck, HeartHandshake, Award
} from 'lucide-react';
import { PageId, ContactInfo } from '../types';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
  openAppointmentModal: () => void;
  contactInfo?: ContactInfo;
}

export default function Footer({ setCurrentPage, openAppointmentModal, contactInfo }: FooterProps) {
  const handleLinkClick = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = page;
  };

  const currentYear = new Date().getFullYear();

  const isDev = import.meta.env.DEV || 
                (typeof window !== 'undefined' && (
                  window.location.hostname.includes('localhost') || 
                  window.location.hostname.includes('127.0.0.1') || 
                  window.location.hostname.includes('run.app') || 
                  window.location.hostname.includes('ais-dev')
                ));

  // Social handles
  const socials = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com', hoverColor: 'hover:bg-blue-600' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com', hoverColor: 'hover:bg-pink-600' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com', hoverColor: 'hover:bg-red-600' }
  ];

  return (
    <footer id="hospital-premium-footer" className="bg-slate-950 text-slate-300 pt-12 md:pt-16 pb-6 md:pb-8 border-t border-slate-900 font-sans relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 h-64 w-64 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/4 bottom-0 h-64 w-64 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        


        {/* Master Four Column Content Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8 mb-10 md:mb-16">
          
          {/* Column 1: Clinic Overview & Credentials */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img 
                id="footer-brand-logo-img"
                src="/LOGO 3D FULL NAME WHITE (3).png" 
                alt="Patel Dental Hospital Logo"
                className="h-[55px] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Serving Rajkot with uncompromising diagnostic accuracy, immediate loading titanium basal systems, and active anxiety protection protocols. Directed by expert clinician Dr. Kinjal Patel BDS.
            </p>

            {/* Certifications and Accreditations badge widgets */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-900 border border-white/[0.04] p-2.5 rounded-lg">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="font-semibold tracking-wide text-[10px] uppercase">ISO 9001:2015 Approved sterilization</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-900 border border-white/[0.04] p-2.5 rounded-lg">
                <Award className="h-4 w-4 text-amber-500 shrink-0" />
                <span className="font-semibold tracking-wide text-[10px] uppercase">Elite Same Day Loading Fellowship</span>
              </div>
            </div>

            {/* Premium Custom Socials follow strip */}
            <div className="space-y-2.5 pt-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">Follow Our Hospital updates</span>
              <div className="flex items-center space-x-2">
                {socials.map((soc, i) => {
                  const IconComponent = soc.icon;
                  return (
                    <a
                      key={i}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`h-8 w-8 bg-slate-900 border border-white/[0.06] hover:border-transparent rounded-lg flex items-center justify-center text-slate-400 hover:text-white ${soc.hoverColor} transition-all duration-300`}
                      title={soc.name}
                    >
                      <IconComponent className="h-4.5 w-4.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links Navigation Map */}
          <div>
            <h4 className="font-display text-white text-xs font-black tracking-widest uppercase mb-6 pb-2 border-b border-white/[0.05]">
              Quick Navigation
            </h4>
            <ul className="space-y-3 text-xs">
              {[
                { label: 'Home / Overview', target: 'home' },
                { label: 'About Patel Hospital', target: 'about' },
                { label: 'Dental Treatments', target: 'treatments' },
                { label: 'Same Day Fixed Teeth', target: 'sameday' },
                { label: 'Dental Implants', target: 'implants' },
                { label: 'Smile Success Gallery', target: 'gallery' },
                { label: 'Specialist Clinicians', target: 'doctors' },
                { label: 'Contact & Directions', target: 'contact' },
                { label: 'Admin Portal', target: 'admin' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(link.target as PageId)}
                    className="text-slate-400 hover:text-brand-cyan transition duration-200 cursor-pointer text-left flex items-center space-x-1.5 focus:outline-hidden"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-brand-cyan shrink-0 opacity-60" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Diagnostic Treatments Quick Indexes */}
          <div>
            <h4 className="font-display text-white text-xs font-black tracking-widest uppercase mb-6 pb-2 border-b border-white/[0.05]">
              Oral Treatments
            </h4>
            <ul className="space-y-3 text-xs">
              {[
                { label: 'Same Day Teeth Restorations', target: 'sameday' },
                { label: 'Computerized 3D Guided Implants', target: 'implants' },
                { label: 'Full Mouth Bite Rehabilitation', target: 'treatments' },
                { label: 'Micro Rotary Endodontics (RCT)', target: 'treatments' },
                { label: 'Pediatric Anxiety Controlled Care', target: 'treatments' },
                { label: 'Smile Design & Cosmetic Veneers', target: 'treatments' },
                { label: 'Biological Bone-Save Extractions', target: 'treatments' },
              ].map((treatment, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(treatment.target as PageId)}
                    className="text-slate-400 hover:text-brand-teal transition duration-200 cursor-pointer text-left flex items-center space-x-1.5 focus:outline-hidden"
                  >
                    <span className="h-1 w-1 bg-brand-teal rounded-full shrink-0" />
                    <span>{treatment.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Hospital Timing & Emergency Helpline */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-display text-white text-xs font-black tracking-widest uppercase pb-2 border-b border-white/[0.05]">
                Operational Hours
              </h4>
              <div className="bg-slate-900 border border-white/[0.04] p-4 rounded-xl flex items-start gap-3">
                <Clock className="h-5 w-5 text-brand-cyan shrink-0 mt-0.5" />
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-brand-cyan font-bold block uppercase tracking-wider">Monday to Saturday</span>
                    <span className="text-white font-medium block mt-0.5">09:00 AM – 01:00 PM</span>
                    <span className="text-white font-medium block">04:00 PM – 08:00 PM</span>
                  </div>
                  <div className="pt-1.5 border-t border-white/[0.06]">
                    <span className="text-[10px] text-amber-400 font-bold block uppercase tracking-wider">Sunday Schedule</span>
                    <span className="text-slate-400 block mt-0.5 font-medium italic">Prior Appointments Only</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">Headquarters Contact</span>
              <a 
                href={`mailto:${contactInfo?.email || 'info@pateldentalrajkot.com'}`} 
                className="flex items-center space-x-2 text-xs text-slate-400 hover:text-brand-cyan transition"
              >
                <Mail className="h-4 w-4 text-slate-500" />
                <span>{contactInfo?.email || 'info@pateldentalrajkot.com'}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Both Branch Addresses - Interactive Bento Grid Deck */}
        <div className="pt-8 md:pt-12 border-t border-white/[0.06] mb-8 md:mb-12">
          <div className="mb-6">
            <span className="text-[10px] uppercase font-black tracking-widest text-brand-cyan block">
              Dual Branch Network Locations
            </span>
            <p className="text-slate-400 text-xs font-sans mt-0.5">
              Locate our sterile-certified operatory clinics strategically situated across Rajkot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Branch 1 Location Card */}
            <div id="branch-footer-card-1" className="bg-slate-900/40 hover:bg-slate-900 border border-white/[0.05] hover:border-brand-sky/20 p-5 rounded-2xl flex flex-col justify-between gap-4 transition-all duration-300 group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-white font-extrabold text-sm uppercase tracking-wide group-hover:text-brand-cyan transition-colors">
                    Gayatrinagar Branch
                  </span>
                  <span className="text-[9px] bg-brand-cyan/10 text-brand-cyan px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                    Main HQ
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {contactInfo?.address || 'Rameshwar Complex, 1st Floor, Opp SBI Bank, Gayatrinagar Main Road, Jalaram Chowk, Bhaktinagar Circle, Rajkot, Gujarat 360002.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.04]">
                <a 
                  href={`tel:${contactInfo?.phoneRaw || '+919510397046'}`} 
                  className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-white hover:text-brand-cyan transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#11B5D8]" />
                  <span>{contactInfo?.phone || '+91 9510397046'}</span>
                </a>
                <a 
                  href={contactInfo?.mapsLink || 'https://maps.google.com/?q=Patel+Dental+Hospital+Gayatrinagar+Rajkot'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-brand-teal hover:text-white font-bold transition-colors group-hover:underline"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Navigate in Google Maps</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Branch 2 Location Card */}
            <div id="branch-footer-card-2" className="bg-slate-900/40 hover:bg-slate-900 border border-white/[0.05] hover:border-brand-sky/20 p-5 rounded-2xl flex flex-col justify-between gap-4 transition-all duration-300 group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-white font-extrabold text-sm uppercase tracking-wide group-hover:text-brand-cyan transition-colors">
                    Amin Marg Branch
                  </span>
                  <span className="text-[9px] bg-brand-teal/10 text-brand-teal px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                    Regional Center
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Business Centrum Complex, 1st Floor, Near Golden Super Market, Opp Fitness Hospital, Mavdi Main Road, Rajkot, Gujarat 360004.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.04]">
                <a 
                  href={`tel:${contactInfo?.phoneRaw || '+919510397046'}`} 
                  className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-white hover:text-brand-cyan transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#11B5D8]" />
                  <span>{contactInfo?.phone || '+91 9510397046'}</span>
                </a>
                <a 
                  href="https://maps.google.com/?q=Patel+Dental+Hospital+Mavdi+Rajkot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-brand-teal hover:text-white font-bold transition-colors group-hover:underline"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Navigate in Google Maps</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Horizontal Base Bar */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-sans font-medium">
          <div className="space-y-1 text-center md:text-left">
            <p>© {currentYear} Patel Dental Hospital. All rights reserved.</p>
            <p className="text-slate-600">All medical/surgical procedures conform perfectly to authorized state standards & sterile procedures.</p>
          </div>
          <div className="text-center md:text-right space-y-2 flex flex-col items-center md:items-end">
            <div>
              <p>Designed under clean sanitization protocols in Rajkot.</p>
              <p>Chief Dental Surgeon: <span className="text-brand-cyan font-bold">Dr. Kinjal Patel BDS</span></p>
            </div>
            <button
              type="button"
              onClick={() => handleLinkClick('admin')}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 border border-slate-700"
              id="admin-demo-access-btn"
            >
              <span>🔐 Admin Demo</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
