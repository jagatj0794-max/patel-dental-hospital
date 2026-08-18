/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, Calendar, MessageCircle, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactInfo } from '../types';
import { getWhatsAppUrl } from '../utils/contactData';

interface FloatingActionPanelProps {
  openAppointmentModal: (preselectedTreatment?: string) => void;
  contactInfo?: ContactInfo;
  currentPage?: string;
}

export default function FloatingActionPanel({ openAppointmentModal, contactInfo, currentPage }: FloatingActionPanelProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [showIcons, setShowIcons] = useState(currentPage !== 'home');

  useEffect(() => {
    if (currentPage !== 'home') {
      setShowIcons(true);
      return;
    }

    const handleScroll = () => {
      const heroElement = document.getElementById('immersive-clinical-hero');
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        // Visible only after scrolled past the complete hero section
        if (rect.bottom <= 50) {
          setShowIcons(true);
        } else {
          setShowIcons(false);
        }
      } else {
        if (window.scrollY > 600) {
          setShowIcons(true);
        } else {
          setShowIcons(false);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const phoneRaw = contactInfo?.phoneRaw || '+919510397046';
  const whatsappRaw = contactInfo?.whatsappRaw || '919510397046';
  const displayPhone = contactInfo?.phone || '+91 9510397046';

  const whatsappUrl = getWhatsAppUrl();
  const telephoneUrl = `tel:${phoneRaw}`;

  return (
    <>
      {/* 1. DESKTOP & MOBILE: Bottom-Left Floating Contact Buttons (Visible after scrolling past Home Hero) */}
      <AnimatePresence>
        {showIcons && (
          <motion.div 
            id="desktop-floating-actions" 
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex flex-col items-start space-y-3.5 fixed left-4 md:left-6 bottom-[76px] md:bottom-10 z-45"
          >
            {/* Instagram Button */}
            <div className="flex items-center space-x-3 group">
              <motion.a
                href="https://www.instagram.com/pateldentalhospital_rj?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredButton('instagram')}
                onMouseLeave={() => setHoveredButton(null)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="h-11 w-11 rounded-full bg-[#E1306C] hover:bg-[#C13584] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(225,48,108,0.4)] cursor-pointer transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <AnimatePresence>
                {hoveredButton === 'instagram' && (
                  <motion.div
                    initial={{ opacity: 0, x: -15, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -15, scale: 0.95 }}
                    className="hidden md:block bg-slate-900/95 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl shadow-xl text-left shrink-0 pointer-events-none"
                  >
                    <span className="block text-[11px] font-black text-white uppercase tracking-wider">Instagram Feed</span>
                    <span className="block text-[9px] text-pink-400 font-bold mt-0.5">@pateldentalhospital</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Call Button */}
            <div className="flex items-center space-x-3 group">
              <motion.a
                href={telephoneUrl}
                onMouseEnter={() => setHoveredButton('call')}
                onMouseLeave={() => setHoveredButton(null)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="h-11 w-11 rounded-full bg-[#081C3A] hover:bg-[#0B2545] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(8,28,58,0.3)] cursor-pointer transition-all duration-300"
              >
                <Phone className="h-5 w-5 text-brand-cyan fill-brand-cyan/10" />
              </motion.a>
              <AnimatePresence>
                {hoveredButton === 'call' && (
                  <motion.div
                    initial={{ opacity: 0, x: -15, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -15, scale: 0.95 }}
                    className="hidden md:block bg-slate-900/95 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl shadow-xl text-left shrink-0 pointer-events-none"
                  >
                    <span className="block text-[11px] font-black text-white uppercase tracking-wider">Call Dental Desk</span>
                    <span className="block text-[9px] text-gray-400 font-mono mt-0.5">{displayPhone}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* WhatsApp Button */}
            <div className="flex items-center space-x-3 group">
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredButton('whatsapp')}
                onMouseLeave={() => setHoveredButton(null)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="h-11 w-11 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(37,211,102,0.4)] cursor-pointer transition-all duration-300"
              >
                <MessageCircle className="h-5 w-5 fill-white/10" />
              </motion.a>
              <AnimatePresence>
                {hoveredButton === 'whatsapp' && (
                  <motion.div
                    initial={{ opacity: 0, x: -15, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -15, scale: 0.95 }}
                    className="hidden md:block bg-slate-900/95 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl shadow-xl text-left shrink-0 pointer-events-none"
                  >
                    <span className="block text-[11px] font-black text-white uppercase tracking-wider">WhatsApp Implants Info</span>
                    <span className="block text-[9px] text-emerald-400 font-bold mt-0.5">Online • Direct Desk</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Book Appointment CTA */}
            <div className="flex items-center space-x-3 group">
              <motion.button
                onClick={() => openAppointmentModal()}
                onMouseEnter={() => setHoveredButton('book')}
                onMouseLeave={() => setHoveredButton(null)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="h-11 w-11 rounded-full bg-[#11B5D8] hover:bg-[#0ea5e9] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(17,181,216,0.4)] cursor-pointer transition-all duration-300"
              >
                <Calendar className="h-5 w-5 stroke-[2.2]" />
              </motion.button>
              <AnimatePresence>
                {hoveredButton === 'book' && (
                  <motion.div
                    initial={{ opacity: 0, x: -15, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -15, scale: 0.95 }}
                    className="hidden md:block bg-slate-900/95 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl shadow-xl text-left shrink-0 pointer-events-none"
                  >
                    <span className="block text-[11px] font-black text-[#11B5D8] uppercase tracking-wider">Free Consultation</span>
                    <span className="block text-[9px] text-gray-300 mt-0.5">Free Clinical Visit</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MOBILE: Solid, Sticky Bottom Full Action Hub Bar (Compact & cleanly aligned with viewport bottom) */}
      <div 
        id="mobile-sticky-action-bar" 
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/98 backdrop-blur-md border-t border-slate-800 shadow-[0_-4px_25px_rgba(0,0,0,0.30)]"
      >
        <div className="p-2.5 flex items-center justify-between gap-2.5">
          {/* Action Call */}
          <motion.a
            id="mobile-call-action"
            href={telephoneUrl}
            whileTap={{ scale: 0.95 }}
            className="flex-1 h-11 flex items-center justify-center space-x-1 px-1 bg-gradient-to-r from-[#081C3A] via-[#0B2545] to-[#13315C] text-white font-extrabold rounded-xl border border-white/5 shadow-[0_2px_10px_rgba(8,28,58,0.25)] text-center cursor-pointer"
          >
            <Phone className="h-4 w-4 text-white fill-white/10 shrink-0" />
            <span className="text-[10px] min-[370px]:text-[11px] uppercase font-black tracking-wider leading-none">
              Call Now
            </span>
          </motion.a>

          {/* Action WhatsApp */}
          <motion.a
            id="mobile-whatsapp-action"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="flex-1 h-11 flex items-center justify-center space-x-1 px-1 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-extrabold rounded-xl border border-white/5 shadow-[0_2px_10px_rgba(37,211,102,0.25)] text-center cursor-pointer"
          >
            <MessageCircle className="h-4 w-4 text-white fill-white/10 shrink-0" />
            <span className="text-[10px] min-[370px]:text-[11px] uppercase font-black tracking-wider leading-none">
              WhatsApp
            </span>
          </motion.a>

          {/* Action Book Slot */}
          <motion.button
            id="mobile-book-action"
            onClick={() => openAppointmentModal()}
            whileTap={{ scale: 0.95 }}
            className="flex-1 h-11 flex items-center justify-center space-x-1 px-1 bg-gradient-to-r from-[#11B5D8] to-[#0ea5e9] text-white font-extrabold rounded-xl border border-white/5 shadow-[0_2px_10px_rgba(17,181,216,0.25)] text-center cursor-pointer"
          >
            <Calendar className="h-4 w-4 text-white shrink-0" />
            <span className="text-[10px] min-[370px]:text-[11px] uppercase font-black tracking-wider leading-none">
              Free Consultation
            </span>
          </motion.button>
        </div>
      </div>
    </>
  );
}
