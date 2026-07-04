/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, History, ShieldAlert, Award, Star, Heart, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import patelClinicInterior from '../assets/images/patel_clinic_interior_1781166076431.png';
import patelCbctImaging from '../assets/images/patel_cbct_imaging_1781166123983.png';
import patelReceptionLounge from '../assets/images/patel_reception_lounge_1781166095656.png';
import patelSterilizationZone from '../assets/images/patel_sterilization_zone_1781166142899.png';

interface AboutProps {
  openAppointmentModal: () => void;
}

export default function About({ openAppointmentModal }: AboutProps) {
  const facilityCards = [
    {
      title: 'Modern Infrastructure',
      desc: 'Surgical operatory rooms built with high-efficacy air filters, clinical isolation positive-pressure setups, and orthopedic ergonomic comfort standards.',
    },
    {
      title: 'In-House CBCT Scan',
      desc: 'State-of-the-art 3D Computed Tomography sweep scanner located inside the hospital to instantly map bone density and provide dynamic volumetric views.',
    },
    {
      title: 'Advanced Implant Technology',
      desc: 'Premium computer-guided robotic micromodels and digital customized smile mockups mapping the exact millimeter of restorative accuracy beforehand.',
    },
    {
      title: 'USA Standard Sterilization Protocol',
      desc: 'Surgical safety with Grade B vacuum autoclaving, continuous UV-C storage cabinets, and rigorous multi-stage ultrasonic instruments cleansing.',
    },
  ];

  const galleryImages = [
    {
      url: patelReceptionLounge,
      caption: 'Reception & Patient Lounge',
      desc: 'Premium foyer with comfortable orthopedic seating and calming acoustics.',
    },
    {
      url: patelClinicInterior,
      caption: 'Modern Dental Clinic Interior',
      desc: 'Highly clinical surgical environment with advanced memory-foam dental chair units.',
    },
    {
      url: patelCbctImaging,
      caption: 'CBCT & Digital Imaging Suite',
      desc: 'Computerized tomography machine providing in-house panoramic 3D scan analytics.',
    },
    {
      url: patelSterilizationZone,
      caption: 'Sterilization & Treatment Facilities',
      desc: 'Strict USA-standard multi-stage sanitization equipment and vacuum autoclaves.',
    },
  ];

  return (
    <div id="about-page-view" className="relative pt-[72px] bg-[#FAFAFC]">
      {/* Editorial Header */}
      <section className="relative py-16 lg:py-24 bg-linear-to-b from-brand-sky/40 via-white to-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-3.5 py-1.5 rounded-full border border-brand-cyan/20 inline-flex items-center mb-4">
              <History className="h-3.5 w-3.5 mr-1.5" /> Established 2012
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight">
              A Legacy Of Advanced Care & Sterile Facility Excellence
            </h1>
            <p className="text-gray-600 mt-4 text-base sm:text-lg font-sans leading-relaxed">
              Serving patients with state-of-the-art infrastructure, class-leading diagnostic tools, and uncompromising hygiene protocols to ensure premium clinical care.
            </p>
          </div>
        </div>
      </section>

      {/* Hospital Story Grid */}
      <section className="py-12 bg-white border-y border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Text (Left Side: Hospital story and achievements) */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
                Our Hospital Story & Achievements
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans">
                Patel Dental Hospital has been proudly serving Rajkot, Gujarat and surrounding communities since 2012. Over the last decade, we have remained committed to a single, powerful vision: bringing advanced, painless, and completely reliable dental services under one immaculate roof.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans">
                Recognizing that dental appointments traditionally invite stress, we restructured every segment of our clinical environment. By embedding our core diagnostic technology—including OPG scanners and high-precision CBCT sweeps—directly inside our facility, we eliminate external travel and scanning lab wait times completely.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans">
                Our operatory units are maintained with clinical positive-pressure air filtration and sanitized constantly with industrial multi-step procedures, delivering a safe medical standard suited for complex oral rehabs.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <span className="text-brand-cyan text-xl sm:text-2xl font-extrabold block">20,000+</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5 font-semibold uppercase tracking-wider">Happy Patients</span>
                </div>
                <div>
                  <span className="text-brand-teal text-xl sm:text-2xl font-extrabold block">15,000+</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5 font-semibold uppercase tracking-wider">Same Day Teeth</span>
                </div>
                <div>
                  <span className="text-blue-600 text-xl sm:text-2xl font-extrabold block">7,000+</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5 font-semibold uppercase tracking-wider">Full Mouth Rehab</span>
                </div>
                <div>
                  <span className="text-amber-500 text-xl sm:text-2xl font-extrabold block">12+ Years</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5 font-semibold uppercase tracking-wider">Experience</span>
                </div>
              </div>
            </div>

            {/* Clinic Interior Image (Right Side: Clinic interior image) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white p-2 max-w-md mx-auto group">
                <img
                  src="/6.jpeg"
                  alt="Patel Dental Hospital Premium Clinic Interior"
                  className="w-full aspect-[4/3] object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Advanced Infrastructure Features (4 facility cards below) */}
      <section className="py-20 bg-linear-to-b from-brand-sky/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-brand-cyan tracking-widest uppercase text-xs font-bold block mb-2">
              Advanced Standards
            </span>
            <h2 className="font-display text-3xl font-extrabold text-brand-navy tracking-tight">
              Hospital Features & Infrastructure
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-lg mx-auto font-sans">
              Take a closer look at the advanced diagnostics and high-performance safety standards built inside Patel Dental Hospital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {facilityCards.map((feat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6.5 border border-slate-100 shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-3.5">
                    <div className="h-7 w-7 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan font-bold text-sm">
                      ✓
                    </div>
                    <h3 className="font-display text-base font-extrabold text-brand-navy">{feat.title}</h3>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm font-sans leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery of clinic interiors (Visual Tour) */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-brand-teal tracking-widest uppercase text-xs font-bold block mb-2">
              Visual Tour
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
              Our Clinic Interiors & Operatories
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-2 font-sans">
              Explore our state-of-the-art facilities designed for patient comfort, diagnostics accuracy, and sterile precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col sm:flex-row bg-[#FAFAFC]/60 hover:bg-white transition-all duration-300"
              >
                <div className="sm:w-1/2 aspect-[4/3] overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 sm:w-1/2 flex flex-col justify-center">
                  <h3 className="font-display text-base font-bold text-brand-navy mb-2 lg:mb-3">
                    {img.caption}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed font-sans">
                    {img.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Simple action prompt */}
          <div className="text-center pt-16">
            <button
              onClick={openAppointmentModal}
              className="px-8 py-4 bg-brand-navy hover:bg-brand-cyan text-white hover:text-brand-navy text-xs font-bold rounded-2xl shadow-lg cursor-pointer transition duration-300 uppercase tracking-widest"
            >
              Request a Guided Campus Tour & Appointment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
