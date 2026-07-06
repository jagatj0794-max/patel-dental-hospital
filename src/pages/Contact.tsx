/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Phone, MapPin, Clock, MessageSquare, Check, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TREATMENTS } from '../data/treatments';
import { appointmentService } from '../utils/appointmentData';

import { ContactInfo } from '../types';

interface ContactProps {
  preselectedTreatment?: string;
  onBookAppointment: (appointment: {
    name: string;
    phone: string;
    treatment: string;
    branch: string;
    date: string;
    timeSlot: string;
    message?: string;
  }) => Promise<boolean>;
  contactInfo?: ContactInfo;
}

export default function Contact({ 
  preselectedTreatment = 'General Consultation', 
  onBookAppointment, 
  contactInfo 
}: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: preselectedTreatment,
    branch: 'Gayatrinagar Branch',
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

  // Dynamic slot lookup
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

    // Form Validation rules
    if (!formData.name.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setValidationError('Please enter your mobile phone number.');
      return;
    }
    if (!/^\d{10}$/.test(formData.phone.replace(/[\s\-\+]/g, ''))) {
      setValidationError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.date) {
      setValidationError('Please select a preferred appointment date.');
      return;
    }

    try {
      const success = await onBookAppointment({
        name: formData.name,
        phone: formData.phone,
        treatment: formData.treatment,
        branch: formData.branch,
        date: formData.date,
        timeSlot: formData.timeSlot,
        message: formData.message,
      });

      if (success) {
        setFormSubmitted(true);
      } else {
        setValidationError('This appointment slot has already been booked. Please select another available time.');
      }
    } catch (err) {
      setValidationError('This appointment slot has already been booked. Please select another available time.');
    }
  };

  return (
    <div id="contact-page-view" className="relative pt-[72px] bg-[#FAFAFC]">
      {/* Intro section */}
      <section className="py-16 bg-linear-to-b from-brand-sky/40 via-white to-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-cyan font-bold block animate-pulse">
              Connect With Patel Clinic Desk
            </span>
            <h1 className="font-display text-4xl font-extrabold text-brand-navy tracking-tight">
              Get In Touch & Schedule Treatment
            </h1>
            <p className="text-gray-500 font-sans text-xs sm:text-sm">
              Speak directly with our clinical secretaries or book your digital-guided diagnostics session instantly.
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
                  Book Clinical Appointment
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  Once submitted, our consulting desk will call back to confirm your specific hour slot.
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
                        <span>⚠️ Error: {validationError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name input */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Priyank Patel"
                          className="w-full px-4 py-3 text-sm bg-[#FAFAFC] border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                        />
                      </div>

                      {/* Phone input */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 XXXXX XXXXX"
                          className="w-full px-4 py-3 text-sm bg-[#FAFAFC] border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Treatment dropdown */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Required Specialty *
                        </label>
                        <select
                          value={formData.treatment}
                          onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                          className="w-full px-4 py-3 text-sm bg-[#FAFAFC] border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                        >
                          <option value="General Consultation">General Consultation</option>
                          {TREATMENTS.map((t) => (
                            <option key={t.id} value={t.title}>
                              {t.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Preferred Branch dropdown */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Preferred Clinic Branch *
                        </label>
                        <select
                          value={formData.branch}
                          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                          className="w-full px-4 py-3 text-sm bg-[#FAFAFC] border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                        >
                          <option value="Gayatrinagar Branch">Gayatrinagar Branch</option>
                          <option value="Mavdi Branch">Mavdi Branch</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Preferred Date */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Preferred Date *
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
                          Preferred Timings Slot *
                        </label>
                        <select
                          value={formData.timeSlot}
                          onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                          disabled={timeSlots.filter(slot => !bookedSlots.includes(slot)).length === 0}
                          className="w-full px-4 py-3 text-sm bg-[#FAFAFC] border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none disabled:opacity-60"
                        >
                          {timeSlots.filter(slot => !bookedSlots.includes(slot)).map((slot, i) => (
                            <option key={i} value={slot}>
                              {slot}
                            </option>
                          ))}
                          {timeSlots.filter(slot => !bookedSlots.includes(slot)).length === 0 && (
                            <option value="">No slots available</option>
                          )}
                        </select>
                      </div>
                    </div>

                    {/* Private message */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Message or Case history (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please write down any symptoms or dental history..."
                        className="w-full px-4 py-3 text-sm bg-[#FAFAFC] border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      id="contact-form-submit"
                      className="w-full py-4 bg-brand-navy hover:bg-brand-cyan text-white text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
                    >
                      <Send className="h-4 w-4" />
                      <span>Submit Appointment Booking &rarr;</span>
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
                        Appointment Booking Request Received!
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-sans max-w-sm mx-auto leading-relaxed">
                        Thank you, <span className="font-semibold text-brand-navy">{formData.name}</span>! Dr. Kinjal Patel's clinic secretary has registered your ticket for <span className="font-semibold text-brand-cyan">{formData.treatment}</span> on <span className="font-semibold">{formData.date}</span>.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-150 max-w-xs mx-auto space-y-2 text-left text-xs font-sans text-gray-400">
                      <div>
                        <strong>Selected Branch:</strong> {formData.branch}
                      </div>
                      <div>
                        <strong>Time Indicator:</strong> {formData.timeSlot}
                      </div>
                      <div>
                        <strong>Confirmation:</strong> Our office will call your cell: {formData.phone} shortly.
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
                            branch: 'Gayatrinagar Branch',
                            date: '',
                            timeSlot: '09:00 AM - 10:00 AM',
                            message: '',
                          });
                        }}
                        className="px-6 py-2.5 bg-brand-cyan hover:bg-brand-teal text-white text-xs font-bold rounded-lg transition"
                      >
                        Book Another Appointment
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
                  Clinic Operating Timings
                </h3>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-gray-400">Monday - Saturday (Morning)</span>
                    <span className="font-semibold">09:00 AM - 01:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-gray-400">Monday - Saturday (Evening)</span>
                    <span className="font-semibold">04:00 PM - 08:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-amber-400">
                    <span>Sunday Availability</span>
                    <span className="font-semibold">Emergency / Custom Booking Only</span>
                  </div>
                </div>
              </div>

              {/* Branch 1 details */}
              <div className="bg-white rounded-2xl p-6.5 border border-gray-150 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider block mb-1">
                  MAIN SPECIALTY BRANCH
                </span>
                <h3 className="font-display font-bold text-brand-navy text-lg mb-2">
                  Gayatrinagar Branch
                </h3>
                <div className="space-y-3.5 text-xs sm:text-sm font-sans text-gray-600">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-brand-teal mr-2 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      {contactInfo?.address || 'Rameshwar Complex, 1st Floor, Opp SBI Bank, Gayatrinagar Main Road, Jalaram Chowk, Bhaktinagar Circle, Rajkot'}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4.5 w-4.5 text-brand-cyan mr-2 shrink-0" />
                    <a href={`tel:${contactInfo?.phoneRaw || '+917990062009'}`} className="text-brand-navy hover:text-brand-cyan font-bold transition">
                      {contactInfo?.phone || '+91 79900 62009'}
                    </a>
                  </div>
                </div>
              </div>

              {/* Branch 2 details */}
              <div className="bg-white rounded-2xl p-6.5 border border-gray-150 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider block mb-1">
                  RECOVERY & IMPLANT CENTER
                </span>
                <h3 className="font-display font-bold text-brand-navy text-lg mb-2">
                  Mavdi Branch
                </h3>
                <div className="space-y-3.5 text-xs sm:text-sm font-sans text-gray-600">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-brand-teal mr-2 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Business Centrum Complex, 1st Floor, Near Golden Super Market, Opp Fitness Hospital, Mavdi Main Road, Rajkot
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4.5 w-4.5 text-brand-cyan mr-2 shrink-0" />
                    <a href={`tel:${contactInfo?.phoneRaw || '+917990062009'}`} className="text-brand-navy hover:text-brand-cyan font-bold transition">
                      {contactInfo?.phone || '+91 79900 62009'}
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
              <h3 className="font-display font-bold text-lg text-brand-navy">Google Maps Direct Navigation</h3>
              <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed">
                Connect your device directly to your preferred branch GPS maps. Click below to load routing.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={contactInfo?.mapsLink || "https://maps.google.com/?q=Rameshwar+Complex+Gayatrinagar+Main+Road+Rajkot"}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-brand-navy hover:bg-brand-cyan text-white text-xs font-bold rounded-xl transition shadow"
                >
                  Gayatrinagar Branch Map
                </a>
                <a
                  href="https://maps.google.com/?q=Business+Centrum+Mavdi+Main+Road+Rajkot"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold rounded-xl transition shadow"
                >
                  Mavdi Road Branch Map
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
