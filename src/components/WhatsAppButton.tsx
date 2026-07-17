/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageSquareShare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show a helpful tip above the WhatsApp button after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);

    const closeTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, []);

  const whatsappUrl = "https://wa.me/919510397046?text=Hello%20Patel%20Dental%20Hospital,%20I%20would%20like%20to%20book%20a%20consultation%20appointment.%20Please%20guide%20me.";

  return (
    <div id="whatsapp-floating-trigger" className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            id="whatsapp-tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-2 bg-white text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl border border-gray-100 flex items-center space-x-2 max-w-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Connect with Dr. Kinjal Patel on WhatsApp!</span>
            <button 
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-600 text-sm ml-1 font-bold"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        id="whatsapp-anchor"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:shadow-emerald-500/20 transition-colors duration-300 relative group cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
      >
        <MessageSquareShare className="h-6 w-6 stroke-[2.2]" />
        
        {/* Subtle pulsating outer aura */}
        <span className="absolute inset-0 rounded-full border-4 border-emerald-500/30 animate-pulse group-hover:scale-105 transition-all"></span>
      </motion.a>
    </div>
  );
}
