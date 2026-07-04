/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calendar, CheckCircle2, ChevronDown, ChevronUp, Clock, ShieldCheck, Star, Users, Video } from 'lucide-react';
import { motion } from 'motion/react';
import samedayFix from '../assets/images/sameday_fix_1780608011497.png';
import { ContactInfo } from '../types';

interface SameDayFixProps {
  openAppointmentModal: (preselectedTreatment?: string) => void;
  contactInfo?: ContactInfo;
}

export default function SameDayFix({ openAppointmentModal, contactInfo }: SameDayFixProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const phoneRaw = contactInfo?.phoneRaw || '+917990062009';

  const benefits = [
    {
      title: 'Full Function Restored in 24 Hours',
      desc: 'No more waiting weeks or months without teeth. Enjoy a complete light dinner on the very evening of your procedure.',
    },
    {
      title: 'Immediate Loading Technology',
      desc: 'By locking ultra-robust implants into high-density basal bone, we can immediately mount structural teeth without wait cycles.',
    },
    {
      title: 'USA FDA Approved Materials',
      desc: 'Every crown, bridge, and titanium post holds verified safety certificates from leading American and European medical labs.',
    },
    {
      title: 'Digitally Guided Micro-Incision',
      desc: 'Guided templates reduce soft-tissue exposure, ensuring almost zero bleeding, tiny scars, and robust healing speeds.',
    },
  ];

  const timelineSteps = [
    {
      hour: '09:00 AM',
      title: '3D CBCT Diagnostic Sweep',
      desc: 'We perform a high-resolution 3D radiographic scan to map out your underlying bone density, sinuses, and nerve pathways.',
    },
    {
      hour: '11:00 AM',
      title: 'Surgical Implant Placement',
      desc: 'Under absolute localized comfort or sedation, implants are placed snugly using precision guided keys.',
    },
    {
      hour: '01:00 PM',
      title: 'Digital Scan & CAD/CAM Design',
      desc: 'Our in-house digital scanner captures your exact facial alignment. We model and mill your permanent teeth.',
    },
    {
      hour: '05:00 PM',
      title: 'Fixed Prosthesis Loading',
      desc: 'Your custom-designed, strong bridge is securely mounted onto the implants. You walk away with a brilliant restored smile!',
    },
  ];

  const faqs = [
    {
      q: 'Will the procedure suffer from pain?',
      a: 'Absolutely not. Same Day Fix Teeth utilizes advanced micro-incisions and computerized localized safety nodes. Most patients describe the sensation as minor pressure. We also integrate mild sedation comfort option for anxious patients.',
    },
    {
      q: 'Am I a candidate if I have severe bone loss?',
      a: 'Yes! Due to tilted cortical anchorage techniques (like All-on-4 or basal fixation), we tap into the hard, structural cortical bone of your jaw, completely bypassing the need for expensive and painful bone grafts.',
    },
    {
      q: 'How long do these fixed teeth last?',
      a: 'The titanium implants fuse with your biological jawbone permanently. With regular dental hygiene maintenance and yearly clinical checkups, these teeth are built to last a lifetime.',
    },
    {
      q: 'Are the prosthetic materials certified?',
      a: 'Yes. Patel Dental Hospital utilizes strictly USA FDA & CE approved zirconia, PEEK, and titanium alloys purchased from standard global manufacturers. We offer full material assurance tracking.',
    },
  ];

  const handleBookClick = () => {
    openAppointmentModal('Same Day Fix Teeth');
  };

  return (
    <div id="sameday-page-view" className="relative pt-[72px] bg-[#FAFAFC]">
      {/* High-Impact Hero Banner */}
      <section className="relative pt-8 pb-12 md:py-20 lg:py-24 bg-linear-to-b from-brand-sky/50 via-white to-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Promo Copy */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-widest rounded-full">
                <Clock className="h-3.5 w-3.5 mr-1" /> Single-Visit Smile Restoration
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight">
                Get Your Fixed Teeth In <span className="text-brand-cyan">Just One Day</span>
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
                Tired of uncomfortable removable dentures or long, painful multi-step implant procedures? Walk into Patel Dental Hospital and walk out in under 24 hours with a beautiful, fully functional smile.
              </p>

              <div className="flex items-center space-x-6 text-xs text-gray-500 font-medium py-3 border-y border-gray-100 max-w-lg">
                <span className="flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-1 text-emerald-500" />
                  USA FDA Approved
                </span>
                <span className="flex items-center">
                  <Video className="h-4 w-4 mr-1 text-emerald-500" />
                  CBCT Guided Planning
                </span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-emerald-500" />
                  99% Clinical Success Rate
                </span>
              </div>

              <div className="pt-2">
                <button
                  id="sameday-hero-cta"
                  onClick={handleBookClick}
                  className="px-8 py-4 bg-brand-cyan hover:bg-brand-navy text-white text-sm font-bold rounded-2xl shadow-xl shadow-brand-cyan/20 cursor-pointer transform active:scale-98 transition duration-300"
                >
                  Book Priority Assessment Now
                </button>
              </div>
            </div>

            {/* Immersive Graphics */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-video max-w-md mx-auto">
                <img
                  src={samedayFix}
                  alt="Restored patient smile comparison illustration"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="py-12 md:py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-brand-teal text-xs font-bold uppercase tracking-wider block mb-2">Scientific Benefits</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
              Bypassing Month-Long Healing Cycles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-[#FAFAFC] p-6.5 rounded-2xl border border-gray-100 shadow-xs flex items-start space-x-4"
              >
                <div className="h-9 w-9 bg-brand-cyan/10 rounded-xl flex items-center justify-center text-brand-cyan shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-brand-navy text-base tracking-tight mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Process Timeline */}
      <section className="py-16 md:py-20 bg-linear-to-b from-white to-brand-sky/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-brand-cyan text-xs font-semibold uppercase tracking-widest block mb-2">Patient Journey</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
              How Same Day Restoration Unfolds
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
              Our streamlined single-day schedule engineered for optimal security and recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-[11px] font-mono font-bold bg-brand-cyan/10 text-brand-cyan px-2.5 py-1 rounded-sm mb-4">
                    {step.hour}
                  </span>
                  <h3 className="font-display font-bold text-sm tracking-tight text-brand-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-xs font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mt-6 pt-2 border-t border-gray-50">
                  Phase 0{idx + 1} Done
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-brand-teal text-xs font-bold uppercase tracking-widest block mb-2 text-center">Faq Section</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy text-center tracking-tight">
              Frequently Asked Questions (Faq)
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-gray-100 rounded-xl overflow-hidden transition duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-4.5 bg-[#FAFAFC] flex items-center justify-between font-display font-semibold text-sm sm:text-base text-brand-navy cursor-pointer hover:bg-gray-50"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-brand-cyan" /> : <ChevronDown className="h-4 w-4 text-brand-cyan" />}
                  </button>
                  {isOpen && (
                    <div className="px-6 py-4.5 bg-white text-sm text-gray-500 font-sans leading-relaxed border-t border-gray-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Consultation Intake Action */}
      <section className="py-12 md:py-16 bg-[#FAFAFC] border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-brand-navy rounded-3xl p-8 md:p-12 text-white relative text-center space-y-6 overflow-hidden shadow-2xl">
            <div className="absolute inset-y-0 right-0 left-0 bg-gradient-to-br from-brand-cyan/20 to-transparent pointer-events-none" />
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight relative z-10">
              Claim Your Same-Day Smile Assessment Today
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto font-sans relative z-10">
              Schedule your diagnostic CBCT setup. Meet with Dr. Kinjal Patel to determine your eligibility for immediate fixed teeth in just 24 hours.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleBookClick}
                className="px-8 py-3.5 bg-brand-cyan hover:bg-brand-teal text-white font-bold text-xs rounded-xl shadow-lg transition cursor-pointer"
              >
                Inquire For Same-Day Procedure
              </button>
              <a
                href={`tel:${phoneRaw}`}
                className="px-8 py-3.5 bg-brand-slate text-white border border-brand-slate hover:bg-slate-700 text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1"
              >
                <span>Speak to Clinic Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
