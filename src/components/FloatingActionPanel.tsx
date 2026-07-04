/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Calendar, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactInfo } from '../types';

interface FloatingActionPanelProps {
  openAppointmentModal: (preselectedTreatment?: string) => void;
  contactInfo?: ContactInfo;
}

export default function FloatingActionPanel({ openAppointmentModal, contactInfo }: FloatingActionPanelProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const phoneRaw = contactInfo?.phoneRaw || '+917990062009';
  const whatsappRaw = contactInfo?.whatsappRaw || '917990062009';
  const displayPhone = contactInfo?.phone || '+91 79900 62009';

  const whatsappUrl = `https://wa.me/${whatsappRaw}?text=Hello%20Patel%20Dental%20Hospital,%20I%20would%20like%20to%20book%20a%20consultation%20appointment.%20Please%20guide%20me.`;
  const telephoneUrl = `tel:${phoneRaw}`;

  return (
    <>
      {/* 1. DESKTOP: Compact Floating Contact Buttons (Bottom Right Corner) */}
      <div 
        id="desktop-floating-actions" 
        className="hidden md:flex flex-col items-end space-y-3 fixed bottom-6 right-6 z-45"
      >
        {/* Call Button */}
        <div className="flex items-center space-x-3 group">
          <AnimatePresence>
            {hoveredButton === 'call' && (
              <motion.div
                initial={{ opacity: 0, x: 15, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 15, scale: 0.95 }}
                className="bg-slate-900/95 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl shadow-xl text-right shrink-0 pointer-events-none"
              >
                <span className="block text-[11px] font-black text-white uppercase tracking-wider">Call Dental Desk</span>
                <span className="block text-[9px] text-gray-400 font-mono mt-0.5">{displayPhone}</span>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.a
            href={telephoneUrl}
            onMouseEnter={() => setHoveredButton('call')}
            onMouseLeave={() => setHoveredButton(null)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="h-11 w-11 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/10 text-white flex items-center justify-center shadow-lg cursor-pointer transition-colors duration-250"
          >
            <Phone className="h-4.5 w-4.5 text-brand-cyan fill-brand-cyan/10" />
          </motion.a>
        </div>

        {/* WhatsApp Button */}
        <div className="flex items-center space-x-3 group">
          <AnimatePresence>
            {hoveredButton === 'whatsapp' && (
              <motion.div
                initial={{ opacity: 0, x: 15, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 15, scale: 0.95 }}
                className="bg-slate-900/95 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl shadow-xl text-right shrink-0 pointer-events-none"
              >
                <span className="block text-[11px] font-black text-white uppercase tracking-wider">WhatsApp Implants Info</span>
                <span className="block text-[9px] text-emerald-400 font-bold mt-0.5">Online • Direct Desk</span>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredButton('whatsapp')}
            onMouseLeave={() => setHoveredButton(null)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="h-11 w-11 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg cursor-pointer transition-colors duration-250"
          >
            <MessageCircle className="h-5 w-5 fill-white/10" />
          </motion.a>
        </div>

        {/* Book Appointment CTA */}
        <div className="flex items-center space-x-3 group">
          <AnimatePresence>
            {hoveredButton === 'book' && (
              <motion.div
                initial={{ opacity: 0, x: 15, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 15, scale: 0.95 }}
                className="bg-slate-900/95 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl shadow-xl text-right shrink-0 pointer-events-none"
              >
                <span className="block text-[11px] font-black text-brand-cyan uppercase tracking-wider">Book Consultation</span>
                <span className="block text-[9px] text-gray-300 mt-0.5">Free Clinical Visit</span>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            onClick={() => openAppointmentModal()}
            onMouseEnter={() => setHoveredButton('book')}
            onMouseLeave={() => setHoveredButton(null)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="h-11 w-11 rounded-full bg-brand-cyan hover:bg-brand-teal text-brand-navy flex items-center justify-center shadow-lg cursor-pointer transition-colors duration-250"
          >
            <Calendar className="h-5 w-5 stroke-[2.2]" />
          </motion.button>
        </div>
      </div>

      {/* 2. MOBILE: Solid, Sticky Bottom Full Action Hub Bar (Compact & cleanly aligned with viewport bottom) */}
      <div 
        id="mobile-sticky-action-bar" 
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-905/98 backdrop-blur-md border-t border-slate-800 shadow-[0_-4px_25px_rgba(0,0,0,0.30)]"
      >
        <div className="p-2.5 flex items-center justify-between gap-2.5">
          {/* Action Call */}
          <a
            id="mobile-call-action"
            href={telephoneUrl}
            className="flex-1 flex items-center justify-center space-x-1.5 py-3 px-2.5 bg-slate-800/[0.4] active:bg-slate-800/80 border border-slate-700 rounded-xl text-white transition-all text-center cursor-pointer"
          >
            <Phone className="h-3.5 w-3.5 text-brand-cyan fill-brand-cyan/5" />
            <span className="text-[10px] uppercase font-black tracking-wider leading-none">
              Call Now
            </span>
          </a>

          {/* Action WhatsApp */}
          <a
            id="mobile-whatsapp-action"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-1.5 py-3 px-2.5 bg-emerald-500/10 active:bg-emerald-500/20 border border-emerald-500/15 rounded-xl text-emerald-400 transition-all text-center cursor-pointer"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[10px] uppercase font-black tracking-wider leading-none">
              WhatsApp
            </span>
          </a>

          {/* Action Book Slot */}
          <button
            id="mobile-book-action"
            onClick={() => openAppointmentModal()}
            className="flex-1.2 flex items-center justify-center space-x-1.5 py-3 px-2.5 bg-brand-cyan active:bg-brand-teal rounded-xl text-brand-navy transition-all text-center cursor-pointer font-black"
          >
            <Calendar className="h-3.5 w-3.5 stroke-[2.2]" />
            <span className="text-[10px] uppercase font-black tracking-wider leading-none">
              Book Slot
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
