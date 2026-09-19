/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Phone, MapPin, Clock, MessageSquare, Check, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TREATMENTS } from '../data/treatments';
import { appointmentService } from '../utils/appointmentData';
import { useSEO } from '../utils/seo';

import { ContactInfo } from '../types';

interface ContactProps {
  preselectedTreatment?: string;
  onBookAppointment: (
    appointment: {
      name: string;
      phone: string;
      treatment: string;
      branch: string;
      date: string;
      timeSlot: string;
      message?: string;
    },
    preOpenedWindow?: Window | null
  ) => Promise<boolean>;
  contactInfo?: ContactInfo;
}

// Medical translation mapping for treatments dropdown options in Gujarati
const TREATMENT_TRANSLATIONS: Record<string, string> = {
  'General Consultation': 'જનરલ કન્સલ્ટેશન (સામાન્ય તપાસ)',
  'Dental Implants': 'ડેન્ટલ ઇમ્પ્લાન્ટ્સ (ફિક્સ દાંત)',
  'Same Day Fix Teeth': 'સેમ ડે ફિક્સ ટીથ (૨૪ કલાકમાં ફિક્સ દાંત)',
  'Full Mouth Rehabilitation': 'ફુલ માઉથ રિહેબિલિટેશન (આખા મોંની સારવાર)',
  'Single Sitting Root Canal Treatment': 'સિંગલ સીટિંગ રૂટ કેનાલ ટ્રીટમેન્ટ',
  'Braces Treatment': 'બ્રેસીસ ટ્રીટમેન્ટ (દાંતના તાર)',
  'Invisible Aligners': 'ઇનવિઝિબલ એલાઇનર્સ (અદ્રશ્ય તાર)',
  'Kids Dentistry': 'બાળકોની ડેન્ટિસ્ટ્રી (બાળકોના દાંતની સારવાર)',
  'Cosmetic Dentistry': 'કોસ્મેટિક ડેન્ટિસ્ટ્રી (સ્મિત સુધારણા)',
  'Gum Treatment': 'પેઢાની સારવાર (પાયોરિયાની સારવાર)',
  'Teeth Cleaning': 'દાંતની સફાઈ અને પોલિશિંગ',
  'Wisdom Tooth Removal': 'ડાઢ કઢાવવી (શાણપણની ડાઢની સારવાર)',
  'Dentures': 'ચોકઠું (નવા કૃત્રિમ દાંત)',
  'Crowns & Bridges': 'ક્રોન અને બ્રિજ (દાંત પર કેપ બેસાડવી)',
  'Smile Makeover': 'સ્માઈલ મેકઓવર (સંપૂર્ણ સ્મિત સુધારણા)',
  'Oral Surgery': 'ઓરલ સર્જરી (મોંની શસ્ત્રક્રિયા)'
};

// Localized time-slot formatting for Gujarati display
const DISPLAY_TIME_SLOTS: Record<string, string> = {
  '09:00 AM - 10:00 AM': 'સવારે ૦૯:૦૦ - ૧૦:૦૦',
  '10:00 AM - 11:00 AM': 'સવારે ૧૦:૦૦ - ૧૧:૦૦',
  '11:00 AM - 12:00 PM': 'સવારે ૧૧:૦૦ - બપોરે ૧૨:૦૦',
  '12:00 PM - 01:00 PM': 'બપોરે ૧૨:૦૦ - ૦૧:૦૦',
  '04:00 PM - 05:00 PM': 'સાંજે ૦૪:૦૦ - ૦૫:૦૦',
  '05:00 PM - 06:00 PM': 'સાંજે ૦૫:૦૦ - ૦૬:૦૦',
  '06:00 PM - 07:00 PM': 'સાંજે ૦૬:૦૦ - ૦૭:૦૦',
  '07:00 PM - 08:00 PM': 'સાંજે ૦૭:૦૦ - રાત્રે ૦૮:૦૦',
};

export default function ContactGujarati({ 
  preselectedTreatment = 'General Consultation', 
  onBookAppointment, 
  contactInfo 
}: ContactProps) {
  useSEO({
    title: 'સંપર્ક કરો અને એપોઇન્ટમેન્ટ બુક કરો | પટેલ ડેન્ટલ હોસ્પિટલ રાજકોટ',
    description: 'પટેલ ડેન્ટલ હોસ્પિટલ, રાજકોટ ખાતે સંપર્ક કરો અથવા ઓનલાઇન ડેન્ટલ એપોઇન્ટમેન્ટ બુક કરો. શ્રેષ્ઠ ડેન્ટલ કેર, સલાહ અને ઇમરજન્સી ડેન્ટલ સેવાઓ માટે અમારા અમીન માર્ગ અથવા ગાયત્રીનગર બ્રાન્ચની મુલાકાત લો.',
    keywords: 'સંપર્ક પટેલ ડેન્ટલ હોસ્પિટલ, ડેન્ટિસ્ટ એપોઇન્ટમેન્ટ બુક રાજકોટ, રાજકોટમાં ડેન્ટલ ક્લિનિક, રાજકોટના શ્રેષ્ઠ ડેન્ટિસ્ટ, રાજકોટમાં ડેન્ટલ હોસ્પિટલ, ઇમરજન્સી ડેન્ટિસ્ટ રાજકોટ, ડેન્ટલ કન્સલ્ટેશન રાજકોટ'
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: preselectedTreatment,
    branch: 'Amin Marg Branch',
    date: '',
    timeSlot: '09:00 AM - 10:00 AM',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM',
    '04:00 PM - 05:00 PM',
    '05:00 PM - 06:00 PM',
    '06:00 PM - 07:00 PM',
    '07:00 PM - 08:00 PM',
  ];

  // Dynamic slot lookup to prevent double-bookings
  useEffect(() => {
    let active = true;
    const loadBookedSlots = async () => {
      if (!formData.date || !formData.branch) return;
      try {
        const booked = await appointmentService.getBookedSlots(formData.date, formData.branch);
        if (active) {
          setBookedSlots(booked);
          
          // Auto select first available if currently selected slot is booked
          const available = timeSlots.filter(s => !booked.includes(s));
          if (available.length > 0 && !available.includes(formData.timeSlot)) {
            setFormData(prev => ({ ...prev, timeSlot: available[0] }));
          }
        }
      } catch (err) {
        console.error('Error loading booked slots for Contact page:', err);
      }
    };
    loadBookedSlots();
    return () => {
      active = false;
    };
  }, [formData.date, formData.branch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Form Validation rules (translated into natural Gujarati)
    if (!formData.name.trim()) {
      setValidationError('કૃપા કરીને તમારું પૂરું નામ દાખલ કરો.');
      return;
    }
    if (!formData.phone.trim()) {
      setValidationError('કૃપા કરીને તમારો મોબાઈલ નંબર દાખલ કરો.');
      return;
    }
    if (!/^\d{10}$/.test(formData.phone.replace(/[\s\-\+]/g, ''))) {
      setValidationError('કૃપા કરીને ૧૦-આંકડાનો માન્ય મોબાઈલ નંબર દાખલ કરો.');
      return;
    }
    if (!formData.date) {
      setValidationError('કૃપા કરીને તમારી પસંદગીની તારીખ પસંદ કરો.');
      return;
    }

    const whatsappWindow = window.open('about:blank', '_blank');

    try {
      // 1. Live database check to prevent booking an already booked slot
      const isAvailable = await appointmentService.isSlotAvailable(formData.date, formData.timeSlot, formData.branch, 'To Be Assigned');
      if (!isAvailable) {
        setValidationError('આ સમય પહેલેથી જ બુક થઈ ગયો છે. કૃપા કરીને બીજો ઉપલબ્ધ સમય પસંદ કરો.');
        if (whatsappWindow) whatsappWindow.close();
        return;
      }

      const success = await onBookAppointment({
        name: formData.name,
        phone: formData.phone,
        treatment: formData.treatment,
        branch: formData.branch,
        date: formData.date,
        timeSlot: formData.timeSlot,
        message: formData.message,
      }, whatsappWindow);

      if (success) {
        // Refresh available slots immediately
        const booked = await appointmentService.getBookedSlots(formData.date, formData.branch);
        setBookedSlots(booked);
        setFormSubmitted(true);
      } else {
        setValidationError('આ સમય પહેલેથી જ બુક થઈ ગયો છે. કૃપા કરીને બીજો ઉપલબ્ધ સમય પસંદ કરો.');
        if (whatsappWindow) whatsappWindow.close();
      }
    } catch (err) {
      setValidationError('આ સમય પહેલેથી જ બુક થઈ ગયો છે. કૃપા કરીને બીજો ઉપલબ્ધ સમય પસંદ કરો.');
      if (whatsappWindow) whatsappWindow.close();
    }
  };

  return (
    <div id="contact-page-view" className="relative pt-[108px] sm:pt-[124px] lg:pt-[140px] bg-[#FAFAFC]">
      {/* Intro section */}
      <section className="py-16 bg-linear-to-b from-brand-sky/40 via-white to-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-cyan font-bold block animate-pulse">
              પટેલ ડેન્ટલ હોસ્પિટલ ક્લિનિક ડેસ્ક સાથે જોડાઓ
            </span>
            <h1 className="font-display text-4xl font-extrabold text-brand-navy tracking-tight">
              સંપર્ક કરો અને સારવાર મેળવો
            </h1>
            <p className="text-slate-700 font-semibold font-sans text-xs sm:text-sm">
              અમારી ક્લિનિકલ સેક્રેટરીઓ સાથે સીધી વાત કરો અથવા તમારી ડિજિટલી-ગાઇડેડ એપોઇન્ટમેન્ટ તરત જ બુક કરો.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Location Split Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Slot */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-150 p-6 md:p-10 shadow-sm relative">
              <div className="mb-8">
                <h2 className="font-display font-extrabold text-brand-navy text-xl sm:text-2xl tracking-tight">
                  મફત કન્સલ્ટેશન (ફ્રી તપાસ)
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  એપોઇન્ટમેન્ટ વિનંતી મોકલ્યા પછી, અમારું ક્લિનિકલ ડેસ્ક સમયની પુષ્ટિ કરવા માટે તમને ટૂંક સમયમાં કૉલ કરશે.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="appointment-input-form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {validationError && (
                      <div className="p-4 bg-rose-50 text-rose-600 text-xs font-semibold rounded-xl border border-rose-100 flex items-center space-x-2">
                        <span>⚠️ ભૂલ: {validationError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name input */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          તમારું પૂરું નામ *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="દા.ત. પ્રિયાંક પટેલ"
                          className="w-full px-4 py-3 text-sm bg-[#FAFAFC] border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                        />
                      </div>

                      {/* Phone input */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          મોબાઈલ નંબર *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="દા.ત. +91 XXXXX XXXXX"
                          className="w-full px-4 py-3 text-sm bg-[#FAFAFC] border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Treatment dropdown */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          જરૂરી વિશેષતા / સારવાર *
                        </label>
                        <select
                          value={formData.treatment}
                          onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                          className="w-full px-4 py-3 text-sm bg-[#FAFAFC] border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                        >
                          <option value="General Consultation">
                            {TREATMENT_TRANSLATIONS['General Consultation'] || 'General Consultation'}
                          </option>
                          {TREATMENTS.map((t) => (
                            <option key={t.id} value={t.title}>
                              {TREATMENT_TRANSLATIONS[t.title] || t.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Preferred Branch dropdown */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          પસંદગીની ક્લિનિક બ્રાન્ચ *
                        </label>
                        <select
                          value={formData.branch}
                          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                          className="w-full px-4 py-3 text-sm bg-[#FAFAFC] border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                        >
                          <option value="Amin Marg Branch">એમિન માર્ગ બ્રાન્ચ (મુખ્ય બ્રાન્ચ)</option>
                          <option value="Gayatrinagar Branch">ગાયત્રીનગર બ્રાન્ચ</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Preferred Date */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          પસંદગીની તારીખ *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-4 py-3 text-sm bg-[#FAFAFC] border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                        />
                      </div>

                      {/* Preferred TimeSlot */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          પસંદગીનો સમય *
                        </label>
                        <select
                          value={formData.timeSlot}
                          onChange={(e) => {
                            if (bookedSlots.includes(e.target.value)) {
                              setValidationError('આ સમય પહેલેથી જ બુક થઈ ગયો છે. કૃપા કરીને બીજો સમય પસંદ કરો.');
                              return;
                            }
                            setFormData({ ...formData, timeSlot: e.target.value });
                          }}
                          className="w-full px-4 py-3 text-sm bg-[#FAFAFC] border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                        >
                          {timeSlots.map((slot, i) => {
                            const isBooked = bookedSlots.includes(slot);
                            return (
                              <option key={i} value={slot} disabled={isBooked} className={isBooked ? 'text-gray-400 bg-gray-100 font-normal line-through' : ''}>
                                {DISPLAY_TIME_SLOTS[slot] || slot}{isBooked ? ' (પહેલેથી જ બુક થયેલ છે)' : ''}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    {/* Private message */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        સંદેશ અથવા કેસ હિસ્ટ્રી (વૈકલ્પિક)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="કૃપા કરીને તમારા દાંતની સમસ્યા અથવા કેસ હિસ્ટ્રી અહીં લખો..."
                        className="w-full px-4 py-3 text-sm bg-[#FAFAFC] border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      id="contact-form-submit"
                      className="w-full py-4 bg-brand-navy hover:bg-brand-cyan text-white text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
                    >
                      <Send className="h-4 w-4" />
                      <span>મફત કન્સલ્ટેશન માટે વિનંતી કરો &rarr;</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="submission-success-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 text-center bg-brand-sky/20 border border-brand-sky rounded-2xl space-y-4"
                  >
                    <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
                      <Check className="h-7 w-7 stroke-[2.5]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-display text-lg font-bold text-brand-navy flex items-center justify-center">
                        <Sparkles className="h-4.5 w-4.5 text-brand-cyan mr-1.5 animate-pulse" />
                        એપોઇન્ટમેન્ટ બુકિંગની વિનંતી સફળતાપૂર્વક મળી ગઈ છે!
                      </h3>
                      <p className="text-slate-700 font-semibold font-sans text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                        ખૂબ ખૂબ આભાર, <span className="font-semibold text-brand-navy">{formData.name}</span>! ડૉ. વિપુલ પટેલના ક્લિનિક સેક્રેટરીએ તમારી એપોઇન્ટમેન્ટ ટિકિટ <span className="font-semibold text-brand-cyan">{TREATMENT_TRANSLATIONS[formData.treatment] || formData.treatment}</span> માટે તારીખ <span className="font-semibold">{formData.date}</span> પર સફળતાપૂર્વક નોંધી લીધી છે.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-150 max-w-xs mx-auto space-y-2 text-left text-xs font-sans text-gray-500">
                      <div>
                        <strong>પસંદ કરેલી બ્રાન્ચ:</strong> {formData.branch === 'Amin Marg Branch' ? 'એમિન માર્ગ બ્રાન્ચ' : 'ગાયત્રીનગર બ્રાન્ચ'}
                      </div>
                      <div>
                        <strong>સમયનો ગાળો:</strong> {DISPLAY_TIME_SLOTS[formData.timeSlot] || formData.timeSlot}
                      </div>
                      <div>
                        <strong>પુષ્ટિ:</strong> અમારું ક્લિનિકલ ડેસ્ક ટૂંક સમયમાં તમારા આ મોબાઈલ નંબર પર સંપર્ક કરશે: {formData.phone}
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({
                            name: '',
                            phone: '',
                            treatment: preselectedTreatment,
                            branch: 'Amin Marg Branch',
                            date: '',
                            timeSlot: '09:00 AM - 10:00 AM',
                            message: '',
                          });
                        }}
                        className="px-6 py-2.5 bg-brand-cyan hover:bg-brand-teal text-white text-xs font-bold rounded-lg transition"
                      >
                        નવી એપોઇન્ટમેન્ટ બુક કરો
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Clinic Addresses Slot */}
            <div className="lg:col-span-5 space-y-8 self-stretch flex flex-col justify-between">
              
              {/* Timing hours summary */}
              <div className="bg-brand-navy text-white p-7 rounded-2xl space-y-4 shadow-md">
                <h3 className="font-display font-bold text-lg flex items-center">
                  <Clock className="h-5 w-5 text-brand-teal mr-2" />
                  ક્લિનિકનો સમય
                </h3>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-gray-400">સોમવાર - શનિવાર (સવારનો સમય)</span>
                    <span className="font-semibold">સવારે ૦૯:૦૦ - બપોરે ૦૧:૦૦</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-gray-400">સોમવાર - શનિવાર (સાંજનો સમય)</span>
                    <span className="font-semibold">સાંજે ૦૪:૦૦ - રાત્રે ૦૮:૦૦</span>
                  </div>
                  <div className="flex justify-between items-center text-red-400">
                    <span>રવિવાર</span>
                    <span className="font-semibold text-rose-500">બંધ</span>
                  </div>
                </div>
              </div>

              {/* Branch 1 details */}
              <div className="bg-white rounded-2xl p-6.5 border border-gray-150 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider block mb-1">
                  મુખ્ય બ્રાન્ચ
                </span>
                <h3 className="font-display font-bold text-brand-navy text-lg mb-2">
                  એમિન માર્ગ બ્રાન્ચ (Amin Marg)
                </h3>
                <div className="space-y-3.5 text-xs sm:text-sm font-sans text-gray-600">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-brand-teal mr-2 shrink-0 mt-0.5" />
                    <p className="leading-relaxed whitespace-pre-line text-slate-700 font-semibold font-sans">
                      {`પટેલ ડેન્ટલ હોસ્પિટલ બિઝનેસ સેન્ટ્રમ કોમ્પ્લેક્સ, 1st ફ્લોર,
કિંગ્સ હાઇટ્સની સામે, ગોલ્ડન સુપર માર્કેટની બાજુમાં,
પંડિત દીનદયાળ ઉપાધ્યાય રોડ, રાજનગર ચોકથી એમિન માર્ગ તરફ,
રાજકોટ – 360001, ગુજરાત, ભારત.`}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4.5 w-4.5 text-brand-cyan mr-2 shrink-0" />
                    <a href={`tel:${contactInfo?.phoneRaw || '+919510397046'}`} className="text-brand-navy hover:text-brand-cyan font-bold transition">
                      {contactInfo?.phone || '+91 9510397046'}
                    </a>
                  </div>
                </div>
              </div>

              {/* Branch 2 details */}
              <div className="bg-white rounded-2xl p-6.5 border border-gray-150 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider block mb-1">
                  બીજી બ્રાન્ચ
                </span>
                <h3 className="font-display font-bold text-brand-navy text-lg mb-2">
                  ગાયત્રીનગર બ્રાન્ચ (Gayatrinagar)
                </h3>
                <div className="space-y-3.5 text-xs sm:text-sm font-sans text-gray-600">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-brand-teal mr-2 shrink-0 mt-0.5" />
                    <p className="leading-relaxed whitespace-pre-line text-slate-700 font-semibold font-sans">
                      {`ડૉ. વિપુલ પટેલ, પટેલ ડેન્ટલ હોસ્પિટલ,
1st ફ્લોર, રામેશ્વર કોમ્પ્લેક્સ, SBI બેંકની સામે,
ગાયત્રીનગર રોડ, જલારામ ચોક, ભક્તિનગર સર્કલ,
રાજકોટ, ગુજરાત, ભારત.`}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4.5 w-4.5 text-brand-cyan mr-2 shrink-0" />
                    <a href={`tel:${contactInfo?.phoneRaw || '+919510397046'}`} className="text-brand-navy hover:text-brand-cyan font-bold transition">
                      {contactInfo?.phone || '+91 9510397046'}
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Styled Map Placeholder Section */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-100 rounded-3xl p-6 md:p-10 border border-gray-200 text-center relative overflow-hidden h-[320px] flex flex-col justify-center items-center">
            
            {/* Visual background grid depicting streets */}
            <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
            
            <div className="relative z-10 max-w-sm space-y-4">
              <div className="h-10 w-10 bg-brand-cyan/20 rounded-full flex items-center justify-center text-brand-cyan mx-auto">
                <MapPin className="h-5 w-5 animate-bounce" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-navy">ગૂગલ મેપ્સ સીધું નેવિગેશન</h3>
              <p className="text-slate-700 font-semibold font-sans text-xs sm:text-sm leading-relaxed">
                તમારા ડિવાઇસને સીધા જ તમારી મનપસંદ બ્રાન્ચના GPS મેપ્સ સાથે કનેક્ટ કરો. રસ્તો જોવા માટે નીચે ક્લિક કરો.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={contactInfo?.mapsLink || "https://maps.app.goo.gl/AmSRutz2HjsBh6CX9?g_st=ic"}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-brand-navy hover:bg-brand-cyan text-white text-xs font-bold rounded-xl transition shadow"
                >
                  એમિન માર્ગ બ્રાન્ચ નકશો
                </a>
                <a
                  href="https://maps.app.goo.gl/5L8euDj9U4AiedgCA?g_st=ic"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold rounded-xl transition shadow"
                >
                  ગાયત્રીનગર બ્રાન્ચ નકશો
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
